import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `transition ${
      location.pathname === path
        ? "text-cyan-400 font-semibold"
        : "text-gray-300 hover:text-cyan-400"
    }`;

  return (
    <nav className="flex items-center justify-between px-10 py-6">
      <Link
        to="/"
        className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition"
      >
        🍽️ NutriLens AI
      </Link>

      <div className="flex gap-8">
        <Link to="/" className={linkClass("/")}>
          Home
        </Link>

        <Link to="/dashboard" className={linkClass("/dashboard")}>
          Dashboard
        </Link>

        <Link to="/history" className={linkClass("/history")}>
          History
        </Link>

        <Link to="/coach" className={linkClass("/coach")}>
          AI Coach
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;