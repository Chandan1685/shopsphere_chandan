import { Link, NavLink } from "react-router-dom";
import { Heart, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
export default function Header() {
  const { itemCount, wishlistCount } = useCart();
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="brand">
          <span className="brand-icon">
            <Sparkles size={20} />
          </span>
          <span>
            shop<span className="brand-accent">sphere</span>
            <small>GOOD FINDS, EVERY DAY</small>
          </span>
        </Link>
        <nav>
          <NavLink to="/wishlist" className="cart-link">
            <Heart size={18} /> Wishlist{" "}
            <span className="cart-count">{wishlistCount}</span>
          </NavLink>
          <NavLink to="/cart" className="cart-link">
            <ShoppingBag size={18} /> Cart{" "}
            <span className="cart-count">{itemCount}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
