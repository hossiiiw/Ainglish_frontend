function DashboardHeader() {
  return (
    <>
      <header className="mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label
            htmlFor="sidebar-toggle"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-app-border bg-app-surface text-app-text lg:hidden"
          >
            ☰
          </label>

          <div>
            <h2 className="text-lg font-bold sm:text-xl">
              سلام، خوش اومدی! 👋
            </h2>
            <p className="mt-1 text-xs text-app-text-muted sm:text-sm">
              آماده‌ای امروز چیز جدیدی یاد بگیری؟
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#"
            className="hidden h-11 items-center gap-2 rounded-xl border border-app-border bg-app-surface px-4 text-sm text-app-text-muted transition hover:border-app-primary sm:flex"
          >
            <span>⌕</span>
            جستجو...
          </a>

          <a
            href="#"
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-app-border bg-app-surface transition hover:bg-app-surface-hover"
          >
            <span className="text-lg">♧</span>
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-app-danger" />
          </a>

          <a
            href="#"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-app-border bg-app-surface transition hover:bg-app-surface-hover"
          >
            ☾
          </a>

          <div className="hidden items-center gap-2 rounded-xl border border-app-border bg-app-surface p-1.5 pl-3 sm:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-app-primary/10 font-bold text-app-primary">
              ح
            </div>
            <span className="text-sm font-semibold">کاربر</span>
            <span className="text-app-text-muted">⌄</span>
          </div>
        </div>
      </header>
    </>
  );
}

export default DashboardHeader;
