import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookContext } from "../context/books";
import { CartContext } from "../context/cart";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

type OrderDetails = {
  cart: { id: string; title: string; price: number; image: string; amount: number }[];
  total: number;
  address: string | null;
  token: string | null;
};

const CheckoutForm: React.FC = () => {
  const { cart, total, clearCart } = useContext(CartContext);
  const { checkout } = useContext(BookContext);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    cart,
    total,
    address: null,
    token: null,
  });
  const [error, setError] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    if (orderDetails.token) {
      checkout(orderDetails);
      clearCart();
      navigate("/");
    }
  }, [orderDetails, checkout, clearCart, navigate]);

  const handleChange = (event: any) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cardElement = elements?.getElement(CardElement);
    if (!cardElement || !stripe) {
      setError("Stripe.js has not loaded yet. Please try again later.");
      return;
    }
    const result = await stripe.createToken(cardElement);
    if (result.error) {
      setError(result.error.message || "An error occurred.");
    } else {
      setError(null);
      setOrderDetails({ ...orderDetails, token: result.token.id });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="checkout-form">
        <label htmlFor="checkout-address">Shipping Address</label>
        <input
          id="checkout-address"
          type="text"
          onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
        />
        <div className="stripe-section">
          <label htmlFor="stripe-element">Credit or debit card</label>
          <CardElement id="stripe-element" options={CARD_ELEMENT_OPTIONS} onChange={handleChange} />
        </div>
        <div className="card-errors" role="alert">
          {error}
        </div>
      </div>
      <button type="submit" className="btn">
        Submit Payment
      </button>
    </form>
  );
};

export default CheckoutForm;
