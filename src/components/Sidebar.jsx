import { NavLink } from "react-router-dom";

function Sidebar() {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-200 ${
      isActive
        ? "bg-app-primary font-semibold text-white shadow-lg shadow-app-primary/20"
        : "text-app-text-muted hover:bg-app-surface-hover hover:text-app-primary"
    }`;

  return (
    <aside className="fixed right-0 top-0 z-50 flex h-screen w-72 translate-x-full flex-col border-l border-app-border bg-app-surface p-5 transition-transform duration-300 peer-checked:translate-x-0 lg:sticky lg:top-0 lg:translate-x-0">
      {/* Logo */}
      <div className="mb-10 flex items-center justify-between px-2">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-app-primary text-white shadow-lg shadow-app-primary/25">
            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
              <path
                d="M4 5.5C4 4.67 4.67 4 5.5 4H11V20H6C4.9 20 4 19.1 4 18V5.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M20 5.5C20 4.67 19.33 4 18.5 4H13V20H18C19.1 20 20 19.1 20 18V5.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path d="M12 7V20" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight">Ainglish</h1>
            <p className="text-[10px] tracking-[3px] text-app-text-muted">
              LEARN SMARTER
            </p>
          </div>
        </NavLink>

        <label
          htmlFor="sidebar-toggle"
          className="cursor-pointer text-app-text-muted lg:hidden"
        >
          ✕
        </label>
      </div>

      {/* Main Navigation */}
      <div className="mb-3 px-3 text-xs font-bold text-app-text-muted">
        منوی اصلی
      </div>

      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" end className={navLinkClass}>
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <rect
              x="3"
              y="3"
              width="8"
              height="8"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <rect
              x="13"
              y="3"
              width="8"
              height="5"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <rect
              x="13"
              y="10"
              width="8"
              height="11"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <rect
              x="3"
              y="13"
              width="8"
              height="8"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
          داشبورد
          <span className="mr-auto h-2 w-2 rounded-full bg-current" />
        </NavLink>

        <NavLink to="/ai-translator" className={navLinkClass}>
          <span className="text-xl">✧</span>
          مترجم هوشمند AI
        </NavLink>

        <NavLink to="/vocabulary" className={navLinkClass}>
          <span className="text-xl">▤</span>
          واژگان من
        </NavLink>

        <NavLink to="/" className={navLinkClass}>
          <span className="text-xl">◷</span>
          تاریخچه ترجمه <span className="text-xs text-app-success">(به زودی)</span>
        </NavLink>

        <NavLink to="/add-vocab" className={navLinkClass}>
          <span className="text-xl">⊕</span>
          افزودن واژه یا جمله
        </NavLink>
      </nav>

      <div className="my-6 border-t border-app-border" />

      {/* Account Navigation */}
      <div className="mb-3 px-3 text-xs font-bold text-app-text-muted">
        حساب کاربری
      </div>

      <nav className="flex flex-col gap-2">
        <NavLink to="/profile" className={navLinkClass}>
          <span>⚙</span>
          پروفایل
        </NavLink>

        <NavLink to="/" className={navLinkClass}>
          <span>⇥</span>
          خروج از حساب
        </NavLink>
      </nav>

      {/* Coming Soon Card */}
      <div className="mt-auto overflow-hidden rounded-3xl border border-app-border bg-app-background p-5">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-app-primary/10 text-2xl">
          🚀
        </div>

        <h3 className="mb-2 font-bold">امکانات جدید در راه‌اند!</h3>

        <p className="text-xs leading-6 text-app-text-muted">
          قابلیت‌های جذاب‌تری برای تجربه بهتر یادگیری زبان به‌زودی اضافه
          می‌شوند.
        </p>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-app-border">
          <div className="h-full w-2/3 rounded-full bg-app-primary" />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
