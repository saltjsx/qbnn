import { Link } from "react-router-dom";

const categories = ["Investing", "Guides", "Opinion", "Updates"];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <img src="/qbnn.png" alt="QBNN Logo" className="footer-logo" />
              <span className="footer-name">QBNN</span>
            </div>
            <p className="footer-text">
              Your trusted source for financial news and analysis.
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              {categories.map((category) => (
                <li key={category}>
                  <Link to={`/category/${category.toLowerCase()}`}>
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">About</h4>
            <ul className="footer-links">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Use</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Quicbuck News Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
