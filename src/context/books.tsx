import React, { useEffect, useState, createContext, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

type Book = {
  id: string;
  title: string;
  author: string;
  featured: boolean;
};

type OrderDetails = {
  bookId: string;
  quantity: number;
  [key: string]: any; // Add flexibility for additional properties
};

type BookContextType = {
  books: Book[];
  featured: Book[];
  loading: boolean;
  checkout: (orderDetails: OrderDetails) => Promise<void>;
};

const BookContext = createContext<BookContextType | undefined>(undefined);

type BookProviderProps = {
  children: ReactNode;
};

const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [featured, setFeatured] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const checkout = async (orderDetails: OrderDetails) => {
    const payload = {
      id: uuidv4(),
      ...orderDetails,
    };
    try {
      // Simulate API call
      console.log("Order is successful", payload);
    } catch (err) {
      console.error("Error processing order:", err);
    }
  };

  const fetchBooks = async () => {
    try {
      setLoading(true);
      // Simulate fetching data
      const books: Book[] = []; // Replace with actual data fetching logic
      const featuredBooks = books.filter((book) => book.featured);
      setBooks(books);
      setFeatured(featuredBooks);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookContext.Provider value={{ books, featured, loading, checkout }}>
      {children}
    </BookContext.Provider>
  );
};

export { BookContext, BookProvider };
