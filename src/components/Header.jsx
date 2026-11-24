import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "امکانات", href: "/#features" },
  { label: "نحوه استفاده", href: "/#how-it-works" },
  { label: "مترجم هوشمند", href: "/#translator" },
  { label: "درباره ما", href: "/#about" },
];

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";
  const isAdmin = ["admin", "super_admin"].includes(user?.role);
  const isSuperAdmin = user?.role === "super_admin";

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/", { replace: true });
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 border-b border-app-border/60 bg-app-background/80 shadow-sm shadow-black/[0.02] backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex shrink-0 items-center gap-3"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-app-primary/10 transition duration-300 group-hover:scale-105">
            <img
              src="/logo.png.png"
              alt="Ainglish"
              className="h-10 w-10 object-contain"
            />
          </div>

          <div>
            <h1 className="text-xl font-black tracking-tight text-app-text sm:text-2xl">
              Ainglish
            </h1>
            <p className="mt-0.5 text-[8px] font-bold tracking-[3px] text-app-text-muted">
              LEARN SMARTER
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        {isHomePage && (
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative py-2 text-sm font-semibold text-app-text-muted transition hover:text-app-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 sm:flex">
          {isAuthenticated ? (
            <>
              <div className="hidden items-center gap-2 xl:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-app-primary/10 font-black text-app-primary">
                  {user?.username?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="max-w-32">
                  <p className="truncate text-sm font-bold text-app-text">
                    {user?.username}
                  </p>
                  <p className="text-[10px] text-app-text-muted">
                    {isSuperAdmin
                      ? "مدیر ارشد"
                      : isAdmin
                        ? "مدیر"
                        : "عضو Ainglish"}
                  </p>
                </div>
              </div>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 rounded-xl border border-app-primary/20 bg-app-primary/5 px-4 py-2.5 text-sm font-bold text-app-primary transition hover:border-app-primary/40 hover:bg-app-primary/10"
                >
                  <span>⚙</span>
                  پنل مدیریت
                </Link>
              )}

              <Link
                to="/dashboard"
                className="rounded-xl bg-app-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-app-primary/20 transition hover:-translate-y-0.5 hover:bg-app-primary-hover"
              >
                داشبورد
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl px-3 py-2.5 text-sm font-bold text-app-text-muted transition hover:bg-app-danger/10 hover:text-app-danger"
              >
                خروج
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl px-4 py-2.5 text-sm font-bold text-app-text transition hover:bg-app-surface-hover"
              >
                ورود
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-app-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-app-primary/20 transition hover:-translate-y-0.5 hover:bg-app-primary-hover"
              >
                شروع رایگان
                <span className="mr-2">←</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-app-border bg-app-surface text-app-text transition hover:border-app-primary/30 sm:hidden"
          aria-label="باز و بسته کردن منو"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="m18 6-12 12M6 6l12 12" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-app-border bg-app-background/95 px-4 pb-5 pt-4 shadow-xl backdrop-blur-2xl sm:hidden">
          <div className="space-y-2">
            {isHomePage &&
              navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3 text-sm font-semibold text-app-text-muted transition hover:bg-app-surface-hover hover:text-app-primary"
                >
                  {item.label}
                </a>
              ))}
          </div>

          {isAuthenticated ? (
            <div className="mt-4 border-t border-app-border pt-4">
              <div className="mb-4 flex items-center gap-3 rounded-xl bg-app-surface p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-app-primary/10 font-black text-app-primary">
                  {user?.username?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-app-text">
                    {user?.username}
                  </p>
                  <p className="text-xs text-app-text-muted">
                    {isSuperAdmin
                      ? "مدیر ارشد"
                      : isAdmin
                        ? "مدیر"
                        : "عضو Ainglish"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="rounded-xl bg-app-primary px-3 py-3 text-center text-sm font-bold text-white"
                >
                  داشبورد
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={closeMenu}
                    className="rounded-xl border border-app-primary/20 bg-app-primary/5 px-3 py-3 text-center text-sm font-bold text-app-primary"
                  >
                    پنل مدیریت
                  </Link>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="col-span-2 rounded-xl bg-app-danger/10 px-3 py-3 text-sm font-bold text-app-danger"
                >
                  خروج از حساب
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-app-border pt-4">
              <Link
                to="/login"
                onClick={closeMenu}
                className="rounded-xl border border-app-border px-3 py-3 text-center text-sm font-bold text-app-text"
              >
                ورود
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="rounded-xl bg-app-primary px-3 py-3 text-center text-sm font-bold text-white"
              >
                ثبت‌نام رایگان
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
