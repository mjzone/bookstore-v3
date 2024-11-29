import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { BookContext } from "../context/books";

type FeaturedBook = {
  id: string;
  image: string;
  title: string;
};

const Home: React.FC = () => {
  const { featured } = useContext(BookContext);

  if (!featured || !featured.length) {
    return <h3>No Featured Books</h3>;
  }

  return (
    <>
      <Hero />
      <section className="featured">
        <header className="featured-head">
          <h3>Featured Collection</h3>
        </header>
        <div className="books featured-list">
          {featured.map(({ id, image, title }: FeaturedBook) => (
            <article key={id} className="book featured-book">
              <div className="book-image">
                <img src={image} alt={title} />
              </div>
              <Link to={`books/${id}`} className="btn book-link">
                details
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
