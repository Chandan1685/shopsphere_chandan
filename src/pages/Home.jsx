import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowDownWideNarrow,
  PackageCheck,
  Truck,
  ShieldCheck,
} from "lucide-react";

import { products } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

const categories = ["All", ...new Set(products.map((p) => p.category))];

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  const perPage = 8;

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        `${p.name} ${p.category} ${p.description}`
          .toLowerCase()
          .includes(search.toLowerCase()),
    );

    if (sort === "low") {
      list.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      list.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [search, category, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));

  const visible = filtered.slice((page - 1) * perPage, page * perPage);

  const changeCategory = (value) => {
    setCategory(value);
    setPage(1);
  };

  const changeSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              YOUR NEXT FAVORITE THING
            </span>

            <h1>
              Little things.
              <br />
              <em>Big everyday joy.</em>
            </h1>

            <p>
              Thoughtful finds for your space, your style, and everything in
              between. Meet the things you'll wonder how you lived without.
            </p>

            <a href="#products" className="primary-btn">
              Explore the collection <span>↘</span>
            </a>

            <div className="hero-proof">
              <div className="avatar-stack">
                <span>😊</span>
                <span>🧑🏽</span>
                <span>👩🏻</span>
              </div>

              <span>
                <strong>4.8/5</strong> from happy shoppers
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />

            <div className="hero-center">
              <span>🛍️</span>
              <small>
                GOOD THINGS
                <br />
                ARE HERE
              </small>
            </div>

            <div className="floating-product float-one">
              🎧
              <small>For your focus</small>
            </div>

            <div className="floating-product float-two">
              ☕<small>Slow mornings</small>
            </div>

            <div className="floating-product float-three">
              🎒
              <small>Out the door</small>
            </div>

            <span className="sparkle sparkle-one">✳</span>
            <span className="sparkle sparkle-two">✦</span>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container benefit-grid">
          <div>
            <PackageCheck />
            <span>
              <strong>Thoughtful picks</strong>
              <small>Curated everyday essentials</small>
            </span>
          </div>

          <div>
            <Truck />
            <span>
              <strong>Easy delivery</strong>
              <small>Simple, stress-free shopping</small>
            </span>
          </div>

          <div>
            <ShieldCheck />
            <span>
              <strong>Secure checkout demo</strong>
              <small>Practice storefront experience</small>
            </span>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section className="container catalog" id="products">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE GOOD STUFF</span>

            <h2>
              Find your <em>everyday favorite.</em>
            </h2>

            <p>
              Useful things, lovely details, and a little something for you.
            </p>
          </div>

          <div className="result-count">
            {filtered.length} products <span>↗</span>
          </div>
        </div>

        {/* Search, Filters and Sorting */}
        <div className="toolbar">
          <div className="search-box">
            <Search size={18} />

            <input
              aria-label="Search products"
              placeholder="Search products..."
              value={search}
              onChange={(e) => changeSearch(e.target.value)}
            />

            {search && (
              <button
                onClick={() => changeSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className="category-filters" aria-label="Filter by category">
            {categories.map((c) => (
              <button
                key={c}
                className={category === c ? "active" : ""}
                onClick={() => changeCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <label className="sort-select">
            <ArrowDownWideNarrow size={16} />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </label>
        </div>

        {/* Product Grid or Empty State */}
        {visible.length ? (
          <div className="product-grid">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <SlidersHorizontal size={28} />
            <h3>No products found</h3>
            <p>Try another search or clear your filters.</p>

            <button
              className="secondary-btn"
              onClick={() => {
                changeSearch("");
                changeCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {filtered.length > perPage && (
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              ← Previous
            </button>

            <span>
              Page {page} of {pages}
            </span>

            <button disabled={page === pages} onClick={() => setPage(page + 1)}>
              Next →
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container newsletter-inner">
          <div>
            <span className="eyebrow">A LITTLE GOOD IN YOUR INBOX</span>

            <h2>Good finds. No noise.</h2>

            <p>Be the first to discover what's new at ShopSphere.</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              alert(
                "Thanks for subscribing to ShopSphere. We'll keep you updated on new arrivals and offers.",
              );

              e.currentTarget.reset();
            }}
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              aria-label="Your email address"
            />

            <button className="primary-btn">Subscribe ↗</button>
          </form>
        </div>
      </section>
    </main>
  );
}
