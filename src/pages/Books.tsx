import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BookContext } from "../context/books";

type Book = {
  id: string;
  title: string;
  image: string;
};

const Books: React.FC = () => {
  const { books } = useContext(BookContext);

  if (!books || !books.length) {
    return <h3>No Books Available</h3>;
  }

  return (
    <section className="books">
      {books.map(({ image, id, title }: Book) => (
        <article key={id} className="book">
          <div className="book-image">
            <img src={image} alt={title} />
          </div>
          <Link to={`books/${id}`} className="btn book-link">
            details
          </Link>
        </article>
      ))}
    </section>
  );
};

export default Books;
