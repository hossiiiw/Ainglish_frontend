import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function DashboardHeader({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);

  const username = user?.username || "کاربر";
  const avatarLetter = username.charAt(0).toUpperCase();

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setProfileMenuOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="mb-8 flex items-center justify-between gap-4">
      {/* Welcome */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="باز کردن منوی کناری"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-app-border bg-app-surface text-xl text-app-text transition hover:bg-app-surface-hover lg:hidden"
        >
          ☰
        </button>

        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold text-app-text sm:text-xl">
            سلام، {username} 👋
          </h2>

          <p className="mt-1 text-xs text-app-text-muted sm:text-sm">
            آماده‌ای امروز چیز جدیدی یاد بگیری؟
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {/* Search */}
        <div className="hidden h-11 items-center gap-2 rounded-xl border border-app-border bg-app-surface px-4 text-sm text-app-text-muted sm:flex">
          <span className="text-lg">⌕</span>
          <span>جستجو...</span>
        </div>

        {/* Notifications */}
        <button
          type="button"
          title="اعلان‌ها"
          aria-label="اعلان‌ها"
          className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-app-border bg-app-surface text-app-text transition hover:bg-app-surface-hover"
        >
          <span className="text-lg">♧</span>
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-app-danger" />
        </button>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={() => setProfileMenuOpen((prev) => !prev)}
            aria-expanded={profileMenuOpen}
            aria-haspopup="true"
            className="flex items-center gap-2 rounded-xl border border-app-border bg-app-surface p-1.5 pl-3 transition hover:bg-app-surface-hover"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-app-primary/10 font-bold text-app-primary">
              {avatarLetter}
            </div>

            <span className="hidden max-w-28 truncate text-sm font-semibold text-app-text sm:block">
              {username}
            </span>

            <span className="text-app-text-muted ">
              {profileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M 12 2 L 12 22" />
                  <path d="M12 2 L15 5" />
                  <path d="M12 2 L9 5" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M12 2V22" />
                  <path d="M8 18L12 22L16 18" />
                </svg>
              )}
            </span>
          </button>

          {profileMenuOpen && (
            <div className="absolute left-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-app-border bg-app-surface p-2 shadow-xl">
              <Link
                to="/profile"
                onClick={() => setProfileMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-app-text transition hover:bg-app-surface-hover"
              >
                پروفایل من
              </Link>

              {user?.is_admin && (
                <Link
                  to="/admin"
                  onClick={() => setProfileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-app-text transition hover:bg-app-surface-hover"
                >
                  پنل مدیریت
                </Link>
              )}

              <div className="my-1 border-t border-app-border" />

              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-lg px-3 py-2.5 text-right text-sm text-app-danger transition hover:bg-app-danger/10"
              >
                خروج از حساب
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
