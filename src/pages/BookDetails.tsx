import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookContext } from "../context/books";
import { CartContext } from "../context/cart";

type Book = {
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  price: number;
};

type BookParams = {
  id: string;
};

const BookDetails: React.FC = () => {
  const { id } = useParams<BookParams>();
  const navigate = useNavigate();
  const { books } = useContext(BookContext);
  const { addToCart } = useContext(CartContext);

  const book = books.find((book: Book) => book.id === id);

  if (!book) {
    return <h3>Loading...</h3>;
  }

  const { image: url, title, description, author, price } = book;

  return (
    <section className="book-details">
      <div className="detail-image">
        <img src={url} alt={title} />
      </div>
      <div className="detail-description">
        <h2>{title}</h2>
        <p>{description}</p>
        <h3>{author}</h3>
        <h4>Price - $ {price}</h4>
        <button
          className="btn"
          onClick={() => {
            addToCart({ ...book });
            navigate("/cart");
          }}
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
};

export default BookDetails;
