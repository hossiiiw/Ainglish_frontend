import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function PasswordToggle({ visible, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={visible ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
      aria-pressed={visible}
      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-app-text-muted transition hover:bg-app-primary/10 hover:text-app-primary"
    >
      {visible ? (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M3 3L21 21"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M10.6 10.6A2 2 0 0013.4 13.4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.5 4.5 9 7-.2 1-1 2.2-2.1 3.3M6.2 6.2C3.9 7.7 2.3 10 2 12c.5 2.5 4 7 10 7 1.2 0 2.3-.2 3.3-.6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle
            cx="12"
            cy="12"
            r="3"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      )}
    </button>
  );
}

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const { username, email, phone, password, confirmPassword } = formData;

    if (username.trim().length < 3 || username.trim().length > 50) {
      setError("نام کاربری باید بین ۳ تا ۵۰ کاراکتر باشد.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("لطفاً یک ایمیل معتبر وارد کنید.");
      return;
    }

    if (!/^09\d{9}$/.test(phone)) {
      setError("شماره موبایل باید با 09 شروع شده و ۱۱ رقم باشد.");
      return;
    }

    if (password.length < 8 || password.length > 128) {
      setError("رمز عبور باید حداقل ۸ و حداکثر ۱۲۸ کاراکتر باشد.");
      return;
    }

    if (password !== confirmPassword) {
      setError("رمز عبور و تکرار آن یکسان نیستند.");
      return;
    }

    if (!acceptedTerms) {
      setError("برای ثبت‌نام باید قوانین و مقررات را بپذیرید.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim().toLowerCase(),
          phone,
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error(
            data.detail ||
              "این ایمیل، شماره موبایل یا نام کاربری قبلاً ثبت شده است.",
          );
        }

        if (response.status === 422) {
          const detail = data.detail;

          if (Array.isArray(detail)) {
            throw new Error(detail.map((item) => item.msg).join("، "));
          }

          throw new Error(detail || "اطلاعات واردشده معتبر نیست.");
        }

        throw new Error(data.detail || "ثبت‌نام انجام نشد. دوباره تلاش کنید.");
      }

      setSuccess("حساب کاربری با موفقیت ساخته شد.");

      setTimeout(() => {
        navigate("/login", {
          replace: true,
          state: {
            registered: true,
            email: email.trim().toLowerCase(),
          },
        });
      }, 1000);
    } catch (error) {
      setError(error.message || "ارتباط با سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "h-11 w-full rounded-xl border border-app-border bg-app-input px-3 text-sm text-app-text outline-none transition placeholder:text-app-text-muted/60 focus:border-app-primary focus:ring-4 focus:ring-app-primary/10";

  return (
    <main
      dir="rtl"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-app-background px-3 py-4 sm:px-5 lg:h-screen lg:min-h-0 lg:py-3"
    >
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
              <img
                src="./../../public/logo.png.png"
                alt="Ainglish"
                className="h-12 w-12 rounded-xl object-contain"
              />
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
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-xs font-semibold text-app-text"
              >
                نام کاربری
              </label>

              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="نام کاربری خود را وارد کنید"
                value={formData.username}
                onChange={handleChange}
                required
                minLength={3}
                maxLength={50}
                className={inputClass}
                dir="auto"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-semibold text-app-text"
              >
                ایمیل
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
                dir="ltr"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-xs font-semibold text-app-text"
              >
                شماره موبایل
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="09123456789"
                value={formData.phone}
                onChange={handleChange}
                required
                maxLength={11}
                className={inputClass}
                dir="ltr"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-semibold text-app-text"
              >
                رمز عبور
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="حداقل ۸ کاراکتر"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  maxLength={128}
                  className={`${inputClass} pl-12`}
                  dir="ltr"
                />

                <PasswordToggle
                  visible={showPassword}
                  onToggle={() => setShowPassword((prev) => !prev)}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-xs font-semibold text-app-text"
              >
                تکرار رمز عبور
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="رمز عبور را مجدداً وارد کنید"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`${inputClass} pl-12`}
                  dir="ltr"
                />

                <PasswordToggle
                  visible={showConfirmPassword}
                  onToggle={() => setShowConfirmPassword((prev) => !prev)}
                />
              </div>
            </div>

            {/* Terms */}
            <label className="flex cursor-pointer items-start gap-2 pt-0.5 text-[11px] leading-5 text-app-text-muted">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
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

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-xs leading-6 text-red-500"
              >
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div
                role="status"
                className="rounded-xl border border-green-500/20 bg-green-500/10 px-3 py-2.5 text-xs leading-6 text-green-600"
              >
                {success}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-app-primary text-sm font-bold text-white shadow-lg shadow-app-primary/25 transition hover:-translate-y-0.5 hover:bg-app-primary-hover hover:shadow-xl hover:shadow-app-primary/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  در حال ساخت حساب...
                </>
              ) : (
                <>
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
                </>
              )}
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
            اطلاعات شما با امنیت محافظت می‌شود.
          </div>
        </section>

        {/* Visual Section */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-app-primary via-[#7040d5] to-[#39206f] p-9 text-white lg:flex xl:p-12">
          <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full border border-white/10" />
          <div className="absolute -bottom-40 -right-20 h-80 w-80 rounded-full bg-white/5 blur-2xl" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-md">
              ✨ به خانواده Ainglish خوش آمدی
            </span>

            <h2 className="mt-6 max-w-md text-3xl font-black leading-[1.5] xl:text-4xl">
              یادگیری زبان انگلیسی
              <br />
              از همین امروز!
            </h2>

            <p className="mt-3 max-w-sm text-xs leading-7 text-white/75 xl:text-sm">
              با ابزارهای هوشمند، مدیریت واژگان و تمرین مستمر، مسیر یادگیری
              انگلیسی را برای خودت ساده‌تر و جذاب‌تر کن.
            </p>
          </div>

          <div className="relative z-10 my-6 space-y-3">
            {[
              ["🧠", "مترجم هوشمند", "ترجمه سریع و دقیق با کمک هوش مصنوعی"],
              [
                "📚",
                "مدیریت واژگان",
                "واژگان مورد علاقه‌ات را همیشه همراه داشته باش",
              ],
              ["🎯", "یادگیری هدفمند", "هر روز یک قدم به تسلط بیشتر نزدیک شو"],
            ].map(([icon, title, description]) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-xl"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-xl">
                  {icon}
                </div>

                <div>
                  <h3 className="text-sm font-bold">{title}</h3>
                  <p className="mt-1 text-[11px] text-white/65">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

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
