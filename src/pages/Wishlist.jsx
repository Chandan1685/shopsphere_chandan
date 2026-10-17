import { Heart } from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Wishlist() {
  const { wishlist } = useCart();

  return (
    <main className="container wishlist-page">
      <div className="section-heading">
        <div>
          <span className="eyebrow">SAVED FOR LATER</span>
          <h1 className="wishlist-title">
            Your <em>wishlist.</em>
          </h1>
        </div>
        <span className="result-count">
          {wishlist.length} saved item{wishlist.length === 1 ? "" : "s"}
        </span>
      </div>
      {wishlist.length ? (
        <div className="product-grid">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Heart size={36} />
          <h2>Your wishlist is empty.</h2>
          <p>Tap the heart on any product to save it here.</p>
        </div>
      )}
    </main>
  );
}
