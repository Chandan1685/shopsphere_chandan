import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, ShoppingBag, Star } from "lucide-react";
import { products } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  if (!product)
    return (
      <main className="container not-found">
        <h2>Product not found</h2>
        <Link to="/" className="primary-btn">
          Back to shop
        </Link>
      </main>
    );
  return (
    <main className="container detail-page">
      <Link to="/" className="back-link">
        <ArrowLeft size={16} /> Back to all products
      </Link>
      <div className="detail-grid">
        <div className={`detail-art bg-gradient-to-br ${product.color}`}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="detail-image"
            />
          ) : (
            <span>{product.emoji}</span>
          )}
        </div>
        <div className="detail-copy">
          <span className="eyebrow">{product.category.toUpperCase()}</span>
          <h1>{product.name}</h1>
          <div className="detail-rating">
            <Star size={16} fill="currentColor" /> {product.rating}{" "}
            <span>·</span> Customer favorite
          </div>
          <strong className="detail-price">₹{product.price.toFixed(2)}</strong>
          <p>{product.description}</p>
          <ul>
            <li>
              <Check size={16} /> Carefully selected everyday design
            </li>
            <li>
              <Check size={16} /> Easy-to-use, practical features
            </li>
            <li>
              <Check size={16} /> Simple demo shopping experience
            </li>
          </ul>
          <button
            className="primary-btn detail-add"
            onClick={() => addToCart(product)}
          >
            <ShoppingBag size={18} /> Add to cart
          </button>
        </div>
      </div>
    </main>
  );
}
