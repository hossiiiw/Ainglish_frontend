import { NavLink } from "react-router-dom";

function Login() {
  return (
    <main
      dir="rtl"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-app-background px-4 py-10 sm:px-6"
    >
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-app-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-app-border bg-app-surface shadow-2xl shadow-app-primary/5 lg:grid-cols-2">
        {/* Login Form */}
        <section className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
          {/* Logo */}
          <NavLink to="/" className="mb-10 flex w-fit items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-app-primary text-white shadow-lg shadow-app-primary/25">
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
              <h1 className="text-2xl font-black tracking-tight text-app-text">
                Ainglish
              </h1>
              <p className="text-[10px] tracking-[3px] text-app-text-muted">
                LEARN SMARTER
              </p>
            </div>
          </NavLink>

          {/* Heading */}
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-app-primary/20 bg-app-primary/10 px-3 py-1.5 text-xs font-semibold text-app-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-app-primary" />
              خوش برگشتی!
            </div>

            <h2 className="mb-3 text-3xl font-black text-app-text sm:text-4xl">
              ورود به حساب کاربری
            </h2>

            <p className="text-sm leading-7 text-app-text-muted">
              برای ادامه مسیر یادگیری و دسترسی به واژگان خود وارد حساب کاربری
              شوید.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-app-text"
              >
                شماره موبایل
              </label>

              <div className="flex h-14 items-center gap-3 rounded-2xl border border-app-border bg-app-input px-4 transition focus-within:border-app-primary focus-within:ring-4 focus-within:ring-app-primary/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 shrink-0 text-app-text-muted"
                >
                  <rect
                    x="6"
                    y="2.5"
                    width="12"
                    height="19"
                    rx="2.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M10 18.5H14"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>

                <input
                  id="phone"
                  type="tel"
                  placeholder="09123456789"
                  className="h-full w-full bg-transparent text-sm text-app-text outline-none placeholder:text-app-text-muted/60"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-app-text"
                >
                  رمز عبور
                </label>

                <NavLink
                  to="/forgot-password"
                  className="text-xs font-semibold text-app-primary transition hover:text-app-primary-hover"
                >
                  فراموشی رمز عبور؟
                </NavLink>
              </div>

              <div className="flex h-14 items-center gap-3 rounded-2xl border border-app-border bg-app-input px-4 transition focus-within:border-app-primary focus-within:ring-4 focus-within:ring-app-primary/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 shrink-0 text-app-text-muted"
                >
                  <rect
                    x="4"
                    y="10"
                    width="16"
                    height="11"
                    rx="2.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M8 10V7a4 4 0 1 1 8 0v3"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="15.5" r="1" fill="currentColor" />
                </svg>

                <input
                  id="password"
                  type="password"
                  placeholder="رمز عبور خود را وارد کنید"
                  className="h-full w-full bg-transparent text-sm text-app-text outline-none placeholder:text-app-text-muted/60"
                />

                <span className="cursor-pointer text-app-text-muted">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <path
                      d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="2.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-app-text-muted">
                <input type="checkbox" className="h-4 w-4 accent-app-primary" />
                مرا به خاطر بسپار
              </label>

              <span className="text-xs text-app-text-muted">
                ورود امن و سریع
              </span>
            </div>

            {/* Submit */}
            <button
              type="button"
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-app-primary font-bold text-white shadow-lg shadow-app-primary/25 transition hover:-translate-y-0.5 hover:bg-app-primary-hover hover:shadow-xl hover:shadow-app-primary/30"
            >
              ورود به حساب
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>

          {/* Register */}
          <div className="mt-8 text-center text-sm text-app-text-muted">
            هنوز حساب کاربری نداری؟
            <NavLink
              to="/register"
              className="mr-2 font-bold text-app-primary transition hover:text-app-primary-hover"
            >
              ثبت‌نام کن
            </NavLink>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-app-text-muted">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d="M12 22S20 18 20 11V5L12 2 4 5V11C4 18 12 22 12 22Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="M9 12L11 14L15 10"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            اطلاعات شما با امنیت محافظت می‌شوند.
          </div>
        </section>

        {/* Visual Section */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-app-primary via-[#7040d5] to-[#39206f] p-10 text-white lg:flex xl:p-14">
          {/* Decorative Circles */}
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-white/5 blur-2xl" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-md">
              ✨ یادگیری هوشمند با Ainglish
            </span>

            <h2 className="mt-8 max-w-md text-4xl font-black leading-[1.5] xl:text-5xl">
              هر روز یک قدم
              <br />
              به انگلیسی مسلط‌تر شو!
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-8 text-white/75">
              واژگان خودت را مدیریت کن، از مترجم هوشمند کمک بگیر و با یک مسیر
              منظم، مهارت زبان انگلیسی‌ات را تقویت کن.
            </p>
          </div>

          {/* Preview Card */}
          <div className="relative z-10 my-12 rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-white/60">واژه امروز</p>
                <h3 className="mt-1 text-2xl font-black">Consistency</h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl">
                📚
              </div>
            </div>

            <p className="text-sm text-white/80">/kənˈsɪstənsi/</p>

            <div className="my-5 h-px bg-white/15" />

            <p className="text-sm font-semibold">معنی:</p>
            <p className="mt-2 text-sm text-white/80">
              استمرار، پیوستگی و ثبات در انجام کارها
            </p>

            <div className="mt-5 rounded-2xl bg-white/10 p-4">
              <p className="text-xs leading-7 text-white/80">
                "Consistency is the key to success."
              </p>
              <p className="mt-2 text-xs text-white/60">
                استمرار، کلید موفقیت است.
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="relative z-10 flex items-center justify-between gap-4 text-xs text-white/60">
            <span>© 2026 Ainglish</span>
            <span>Learn smarter, not harder.</span>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
