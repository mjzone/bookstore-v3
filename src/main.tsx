import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BookProvider } from "./context/books";
import { CartProvider } from "./context/cart";
import "./index.css";
import App from "./App";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container missing in the DOM");
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <CartProvider>
      <BookProvider>
        <App />
      </BookProvider>
    </CartProvider>
  </StrictMode>
);
