import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Button from "./ui/Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const links = [
    { label: "Home", to: "/" },
    { label: "Plans", to: "/plans" },
    { label: "About Us", to: "/about" },
    { label: "FAQs", to: "/faq" },
    { label: "Contact", to: "/contact" },
  ];

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <span className="rounded-lg bg-brand-navy px-3 py-2 text-xl font-bold text-white">
            NetAss
          </span>
          <span className="hidden text-xs font-semibold text-muted sm:block">
            CONNECTING YOUR WORLD
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition hover:text-brand-orange ${
                  isActive ? "text-brand-orange" : "text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link to={user?.role === "admin" ? "/admin" : "/dashboard"}>
                <span className="flex items-center gap-2 text-sm font-semibold text-brand-blue">
                  <UserRound size={18} />
                  {user?.full_name || "My Account"}
                </span>
              </Link>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="cta">Login / Register</Button>
            </Link>
          )}
        </div>

        <button
          className="rounded-lg p-2 text-brand-navy md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className="text-sm font-semibold text-ink"
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  to={user?.role === "admin" ? "/admin" : "/dashboard"}
                  onClick={closeMenu}
                  className="text-sm font-semibold text-brand-blue"
                >
                  My Account
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="text-left text-sm font-semibold text-danger"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth" onClick={closeMenu}>
                <Button variant="cta" block>
                  Login / Register
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
