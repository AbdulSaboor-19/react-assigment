

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";

import "./App.css";

function AppContent() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("shoppulse-cart") || "[]"
      );
    } catch {
      return [];
    }
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("shoppulse-theme") === "dark"
      ? "dark"
      : "light";
  });

  useEffect(() => {
    localStorage.setItem("shoppulse-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("shoppulse-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((current) =>
      current === "light" ? "dark" : "light"
    );
  }

  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function increaseQty(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQty(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  }

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className={`app ${theme}`}>
      <Navbar
        cartCount={cartCount}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <Routes>
        <Route
          path="/"
          element={<Home addToCart={addToCart} />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails addToCart={addToCart} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              removeFromCart={removeFromCart}
            />
          }
        />

        <Route
          path="*"
          element={
            <main className="container">
              <h1>404 - Page Not Found</h1>
            </main>
          }
        />
      </Routes>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} ShopPulse. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;