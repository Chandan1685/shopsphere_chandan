import { Link } from "react-router-dom";
import { ArrowUpRight, Heart, Star } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const saved = isWishlisted(product.id);

  return (
    <article className="product-card">
      <div className={`product-art bg-gradient-to-br ${product.color}`}>
        <Link to={`/product/${product.id}`} className="product-art-link">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
              loading="lazy"
            />
          ) : (
            <span
              className="product-emoji"
              role="img"
              aria-label={product.name}
            >
              {product.emoji}
            </span>
          )}
        </Link>
        <button
          className={`heart-btn ${saved ? "saved" : ""}`}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product)}
        >
          <Heart size={17} fill={saved ? "currentColor" : "none"} />
        </button>
        <span className="category-pill">{product.category}</span>
      </div>
      <div className="product-info">
        <div className="rating">
          <Star size={14} fill="currentColor" /> {product.rating} <span>·</span>{" "}
          <span>Popular pick</span>
        </div>
        <Link to={`/product/${product.id}`} className="product-name">
          {product.name}
          <ArrowUpRight size={16} />
        </Link>
        <p className="product-desc">{product.description}</p>
        <div className="product-bottom">
          <strong>₹{product.price.toFixed(2)}</strong>
          <button className="add-btn" onClick={() => addToCart(product)}>
            Add to cart <span>+</span>
          </button>
        </div>
      </div>
    </article>
  );
}
