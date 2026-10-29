import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

function Navbar({ cartCount, theme, toggleTheme }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        ShopPulse<span>.</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/cart">
          Cart ({cartCount})
        </Link>

        <ThemeToggle
          theme={theme}
          toggleTheme={toggleTheme}
        />
      </div>
    </nav>
  );
}

export default Navbar;