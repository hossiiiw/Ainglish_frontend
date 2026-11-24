import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-app-border/70 bg-app-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-app-primary text-white shadow-lg shadow-app-primary/25">
            <img
              src="/logo.png.png"
              alt="Ainglish"
              className="h-12 w-12 rounded-xl object-contain"
            />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight">Ainglish</h1>
            <p className="text-[9px] tracking-[3px] text-app-text-muted">
              LEARN SMARTER
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-app-text-muted lg:flex">
          <a href="#features" className="transition hover:text-app-primary">
            امکانات
          </a>

          <a href="#how-it-works" className="transition hover:text-app-primary">
            نحوه استفاده
          </a>

          <a href="#translator" className="transition hover:text-app-primary">
            مترجم هوشمند
          </a>

          <a href="#about" className="transition hover:text-app-primary">
            درباره ما
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden text-sm font-medium text-app-text sm:block">
                {user?.username}
              </span>

              <Link
                to="/dashboard"
                className="rounded-xl bg-app-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-app-primary-hover"
              >
                داشبورد
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-xl px-3 py-2.5 text-sm font-bold text-app-text transition hover:bg-app-surface-hover"
              >
                خروج
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-xl px-4 py-2.5 text-sm font-bold text-app-text transition hover:bg-app-surface-hover sm:block"
              >
                ورود
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-app-primary px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-app-primary/20 transition hover:-translate-y-0.5 hover:bg-app-primary-hover sm:px-5"
              >
                شروع رایگان
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
