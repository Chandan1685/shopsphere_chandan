import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Wishlist from "./pages/Wishlist.jsx";
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>
          © 2026 ShopSphere. All rights reserved. Designed and developed by
          Chandan Kumar.
        </span>
        <span className="brand footer-brand">
          shop<span className="brand-accent">sphere</span>
        </span>
        <span>Thoughtful finds for everyday life.</span>
      </div>
    </footer>
  );
}
export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="*"
          element={
            <main className="container not-found">
              <h1>Page not found</h1>
              <a href="/" className="primary-btn">
                Go home
              </a>
            </main>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}
