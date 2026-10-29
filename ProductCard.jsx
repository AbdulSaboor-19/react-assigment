import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">
      <Link
        to={`/product/${product.id}`}
        className="product-image"
      >
        <span>{product.emoji}</span>
      </Link>

      <p className="product-category">{product.category}</p>

      <h3>{product.name}</h3>

      <p className="product-price">
        Rs. {product.price.toLocaleString()}
      </p>

      <div className="product-actions">
        <Link
          to={`/product/${product.id}`}
          className="details-button"
        >
          View Details
        </Link>

        <button onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;