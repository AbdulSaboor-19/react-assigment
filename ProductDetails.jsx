import { Link, useParams } from "react-router-dom";
import products from "../data/Product.js";

function ProductDetails({ addToCart }) {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <main className="container">
        <h1>Product Not Found</h1>
        <Link to="/">Back to Home</Link>
      </main>
    );
  }

  return (
    <main className="container">
      <section className="product-details">
        <div className="details-image">
          <span>{product.emoji}</span>
        </div>

        <div className="details-content">
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>

          <p className="details-price">
            Rs. {product.price.toLocaleString()}
          </p>

          <p>{product.description}</p>

          <button
            className="primary-button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <p>
            <Link to="/">Back to Products</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;