import { NavLink } from "react-router-dom";

function Register() {
  return (
    <main
      dir="rtl"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-app-background px-3 py-4 sm:px-5 lg:h-screen lg:min-h-0 lg:py-3"
    >
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-app-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-app-border bg-app-surface shadow-2xl shadow-app-primary/5 lg:h-full lg:max-h-[850px] lg:grid-cols-2">
        {/* Register Form */}
        <section className="flex flex-col justify-center p-5 sm:p-7 lg:px-10 lg:py-5 xl:px-14">
          {/* Logo */}
          <NavLink
            to="/"
            className="mb-5 flex w-fit items-center gap-2.5 lg:mb-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-app-primary text-white shadow-lg shadow-app-primary/25">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
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
              <h1 className="text-xl font-black tracking-tight text-app-text">
                Ainglish
              </h1>
              <p className="text-[9px] tracking-[2.5px] text-app-text-muted">
                LEARN SMARTER
              </p>
            </div>
          </NavLink>

          {/* Heading */}
          <div className="mb-5 lg:mb-4">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-app-primary/20 bg-app-primary/10 px-3 py-1 text-[11px] font-semibold text-app-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-app-primary" />
              شروع یک مسیر جدید
            </div>

            <h2 className="mb-1.5 text-2xl font-black text-app-text sm:text-3xl">
              ساخت حساب کاربری
            </h2>

            <p className="text-xs leading-6 text-app-text-muted sm:text-sm">
              به Ainglish بپیوند و یادگیری زبان انگلیسی را هوشمندانه‌تر شروع کن.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-3">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-xs font-semibold text-app-text"
              >
                نام کاربری
              </label>

              <div className="flex h-11 items-center gap-3 rounded-xl border border-app-border bg-app-input px-3 transition focus-within:border-app-primary focus-within:ring-4 focus-within:ring-app-primary/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4.5 w-4.5 shrink-0 text-app-text-muted"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M4 21C4 16.8 7.6 14 12 14C16.4 14 20 16.8 20 21"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>

                <input
                  id="username"
                  type="text"
                  placeholder="نام کاربری خود را وارد کنید"
                  className="h-full w-full bg-transparent text-xs text-app-text outline-none placeholder:text-app-text-muted/60 sm:text-sm"
                  dir="auto"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-xs font-semibold text-app-text"
              >
                شماره موبایل
              </label>

              <div className="flex h-11 items-center gap-3 rounded-xl border border-app-border bg-app-input px-3 transition focus-within:border-app-primary focus-within:ring-4 focus-within:ring-app-primary/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4.5 w-4.5 shrink-0 text-app-text-muted"
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
                  className="h-full w-full bg-transparent text-xs text-app-text outline-none placeholder:text-app-text-muted/60 sm:text-sm"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-semibold text-app-text"
              >
                رمز عبور
              </label>

              <div className="flex h-11 items-center gap-3 rounded-xl border border-app-border bg-app-input px-3 transition focus-within:border-app-primary focus-within:ring-4 focus-within:ring-app-primary/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4.5 w-4.5 shrink-0 text-app-text-muted"
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
                </svg>

                <input
                  id="password"
                  type="password"
                  placeholder="رمز عبور خود را وارد کنید"
                  className="h-full w-full bg-transparent text-xs text-app-text outline-none placeholder:text-app-text-muted/60 sm:text-sm"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirm-password"
                className="mb-1.5 block text-xs font-semibold text-app-text"
              >
                تکرار رمز عبور
              </label>

              <div className="flex h-11 items-center gap-3 rounded-xl border border-app-border bg-app-input px-3 transition focus-within:border-app-primary focus-within:ring-4 focus-within:ring-app-primary/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4.5 w-4.5 shrink-0 text-app-text-muted"
                >
                  <path
                    d="M5 12L10 17L20 7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <input
                  id="confirm-password"
                  type="password"
                  placeholder="رمز عبور را مجدداً وارد کنید"
                  className="h-full w-full bg-transparent text-xs text-app-text outline-none placeholder:text-app-text-muted/60 sm:text-sm"
                />
              </div>
            </div>

            {/* Terms */}
            <label className="flex cursor-pointer items-start gap-2 pt-0.5 text-[11px] leading-5 text-app-text-muted">
              <input
                type="checkbox"
                className="mt-1 h-3.5 w-3.5 shrink-0 accent-app-primary"
              />
              <span>
                با{" "}
                <NavLink to="/terms" className="font-semibold text-app-primary">
                  قوانین و مقررات
                </NavLink>{" "}
                و سیاست حفظ حریم خصوصی موافقم.
              </span>
            </label>

            {/* Submit */}
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-app-primary text-sm font-bold text-white shadow-lg shadow-app-primary/25 transition hover:-translate-y-0.5 hover:bg-app-primary-hover hover:shadow-xl hover:shadow-app-primary/30"
            >
              ساخت حساب کاربری
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
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

          {/* Login Link */}
          <div className="mt-5 text-center text-xs text-app-text-muted sm:text-sm lg:mt-4">
            قبلاً ثبت‌نام کرده‌ای؟
            <NavLink
              to="/login"
              className="mr-2 font-bold text-app-primary transition hover:text-app-primary-hover"
            >
              وارد حساب شو
            </NavLink>
          </div>

          {/* Security */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-app-text-muted">
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
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-app-primary via-[#7040d5] to-[#39206f] p-9 text-white lg:flex xl:p-12">
          {/* Decorations */}
          <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full border border-white/10" />
          <div className="absolute -bottom-40 -right-20 h-80 w-80 rounded-full bg-white/5 blur-2xl" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-md">
              ✨ به خانواده Ainglish خوش آمدی
            </span>

            <h2 className="mt-6 max-w-md text-3xl font-black leading-[1.5] xl:text-4xl">
              یادگیری زبان،
              <br />
              از همین امروز!
            </h2>

            <p className="mt-3 max-w-sm text-xs leading-7 text-white/75 xl:text-sm">
              با ابزارهای هوشمند، مدیریت واژگان و تمرین مستمر، مسیر یادگیری
              انگلیسی را برای خودت ساده‌تر و جذاب‌تر کن.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="relative z-10 my-6 space-y-3">
            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-xl">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-xl">
                🤖
              </div>
              <div>
                <h3 className="text-sm font-bold">مترجم هوشمند</h3>
                <p className="mt-1 text-[11px] text-white/65">
                  ترجمه سریع و دقیق با کمک هوش مصنوعی
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-xl">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-xl">
                📚
              </div>
              <div>
                <h3 className="text-sm font-bold">مدیریت واژگان</h3>
                <p className="mt-1 text-[11px] text-white/65">
                  واژگان مورد علاقه‌ات را همیشه همراه داشته باش
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-xl">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-xl">
                🎯
              </div>
              <div>
                <h3 className="text-sm font-bold">یادگیری هدفمند</h3>
                <p className="mt-1 text-[11px] text-white/65">
                  هر روز یک قدم به تسلط بیشتر نزدیک شو
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 flex items-center justify-between gap-4 text-[11px] text-white/60">
            <span>© 2026 Ainglish</span>
            <span>Learn smarter, not harder.</span>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Register;
