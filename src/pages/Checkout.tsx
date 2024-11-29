import React from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise: Promise<Stripe | null> = loadStripe("<stripe_public_key>");

const Checkout: React.FC = () => {
  return (
    <section className="checkout-wrapper">
      {/* <AmplifyAuthenticator> */}
      <Elements stripe={stripePromise}>
        <section>
          <h2>Time to Checkout?</h2>
          <CheckoutForm />
        </section>
      </Elements>
      {/* </AmplifyAuthenticator> */}
    </section>
  );
};

export default Checkout;
