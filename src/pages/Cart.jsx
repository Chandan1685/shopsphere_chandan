import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
export default function Cart() {
  const { cart, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const shipping = total === 0 || total >= 75 ? 0 : 5.99;
  return (
    <main className="container cart-page">
      <Link to="/" className="back-link">
        <ArrowLeft size={16} /> Continue shopping
      </Link>
      <div className="cart-heading">
        <div>
          <span className="eyebrow">YOUR BAG</span>
          <h1>
            Shopping <em>cart.</em>
          </h1>
        </div>
        <span>{cart.reduce((s, i) => s + i.quantity, 0)} items</span>
      </div>
      {!cart.length ? (
        <div className="empty-state cart-empty">
          <ShoppingBag size={36} />
          <h2>Your cart is taking a little break.</h2>
          <p>Find something useful, lovely, or just fun.</p>
          <Link to="/" className="primary-btn">
            Explore products ↗
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className={`cart-art bg-gradient-to-br ${item.color}`}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-image"
                    />
                  ) : (
                    item.emoji
                  )}
                </div>
                <div className="cart-item-info">
                  <span className="eyebrow">{item.category}</span>
                  <h3>{item.name}</h3>
                  <strong>₹{item.price.toFixed(2)}</strong>
                  <div className="quantity-control">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={17} />
                </button>
              </article>
            ))}
            <button className="text-btn" onClick={clearCart}>
              Clear cart
            </button>
          </div>
          <aside className="order-summary">
            <h2>Order summary</h2>
            <div>
              <span>Subtotal</span>
              <strong>₹{total.toFixed(2)}</strong>
            </div>
            <div>
              <span>Shipping</span>
              <strong>
                {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
              </strong>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>₹{(total + shipping).toFixed(2)}</strong>
            </div>
            <button
              className="primary-btn checkout-btn"
              onClick={() =>
                alert("Checkout is a demo only. No payment was taken.")
              }
            >
              Continue to checkout ↗
            </button>
            <small>Demo checkout only. No real order or payment.</small>
          </aside>
        </div>
      )}
    </main>
  );
}
