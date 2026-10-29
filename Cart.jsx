import { Link } from "react-router-dom";

function Cart({
  cart,
  increaseQty,
  decreaseQty,
  removeFromCart
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleCheckout() {
    alert("Checkout demo completed successfully!");
  }

  if (cart.length === 0) {
    return (
      <main className="container cart-page">
        <h1>Your Cart</h1>
        <p>Your cart is currently empty.</p>
        <Link to="/" className="primary-button">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="container cart-page">
      <h1>Your Cart</h1>

      <div className="cart-layout">
        <section className="cart-items">
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-emoji">{item.emoji}</div>

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>Rs. {item.price.toLocaleString()}</p>

                <div className="quantity-controls">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-end">
                <strong>
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </strong>

                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>

          <div className="summary-row total-row">
            <span>Total</span>
            <strong>Rs. {total.toLocaleString()}</strong>
          </div>

          <button
            className="primary-button checkout-button"
            onClick={handleCheckout}
          >
            Checkout
          </button>

          <Link to="/" className="continue-link">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default Cart;