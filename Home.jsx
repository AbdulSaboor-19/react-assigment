import { useState } from "react";
import products from "../data/Product.js";
import ProductCard from "../components/ProductCard.jsx";
function Home({ addToCart }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="container">
      <section className="hero">
        <p className="hero-label">WELCOME TO SHOPPULSE</p>
        <h1>Find Your Next Favorite Thing.</h1>
        <p>
          Discover quality products at prices you'll love.
        </p>
      </section>

      <section className="shop-section">
        <div className="section-heading">
          <div>
            <h2>Our Products</h2>
            <p>Explore our latest collection.</p>
          </div>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))
          ) : (
            <p className="empty-message">
              No products found.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;