import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("لطفاً ایمیل و رمز عبور را وارد کنید.");
      return;
    }

    try {
      setLoading(true);

      await login(email.trim().toLowerCase(), password);

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "ورود ناموفق بود. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-app-background px-4 py-10"
    >
      <div className="w-full max-w-md rounded-3xl border border-app-border bg-app-surface p-7 shadow-xl sm:p-9">
        {/* Logo & Heading */}
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="mx-auto mb-5 flex w-fit flex-col items-center"
          >
            <img
              src="/logo.png.png"
              alt="Ainglish Logo"
              className="h-20 w-20 rounded-2xl object-contain drop-shadow-lg transition duration-300 hover:scale-105"
            />

            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-app-primary">
              Ainglish
            </h1>
          </Link>

          <h2 className="mt-5 text-xl font-bold text-app-text">خوش برگشتی!</h2>

          <p className="mt-2 text-sm text-app-muted">
            برای ادامه یادگیری وارد حساب کاربری خود شو
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-app-text">
              ایمیل
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              autoComplete="email"
              dir="ltr"
              className="w-full rounded-xl border border-app-border bg-app-input px-4 py-3 text-app-text outline-none transition focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-app-text">
              رمز عبور
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور خود را وارد کنید"
                autoComplete="current-password"
                dir="ltr"
                className="w-full rounded-xl border border-app-border bg-app-input px-4 py-3 pl-12 text-app-text outline-none transition focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
                required
              />

              <PasswordToggle
                visible={showPassword}
                onToggle={() => setShowPassword((prev) => !prev)}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500"
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-app-primary px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "در حال ورود..." : "ورود به حساب"}
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-7 text-center text-sm text-app-muted">
          حساب کاربری نداری؟
          <Link
            to="/register"
            className="mr-2 font-semibold text-app-primary hover:underline"
          >
            ثبت‌نام کن
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
