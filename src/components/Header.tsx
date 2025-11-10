import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const categories = ["Investing", "Guides", "Opinion", "Updates"];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-content">
            <div className="logo-section">
              <img src="/qbnn.png" alt="QBNN Logo" className="logo" />
              <div className="brand">
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h1 className="brand-name">Quicbuck News Network</h1>
                  <p className="brand-tagline">
                    Your Source for Financial News
                  </p>
                </Link>
              </div>
            </div>
            <div className="header-actions">
              {showSearch ? (
                <form onSubmit={handleSearch} className="search-form">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="search-input"
                    autoFocus
                  />
                  <button type="submit" className="search-submit-btn">
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowSearch(false);
                      setSearchQuery("");
                    }}
                    className="search-cancel-btn"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <button
                  className="search-btn"
                  onClick={() => setShowSearch(true)}
                >
                  Search
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <nav className="nav">
        <div className="container">
          <ul className="nav-list">
            <li>
              <Link
                to="/"
                className={`nav-link ${isActive("/") ? "active" : ""}`}
              >
                Home
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <Link
                  to={`/category/${category.toLowerCase()}`}
                  className={`nav-link ${isActive(`/category/${category.toLowerCase()}`) ? "active" : ""}`}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
