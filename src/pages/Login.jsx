import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("لطفاً ایمیل و رمز عبور را وارد کنید");
      return;
    }

    try {
      setLoading(true);

      await login(email.trim().toLowerCase(), password);

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "ورود ناموفق بود");
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
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-app-primary">Ainglish</h1>

          <h2 className="mt-6 text-xl font-bold text-app-text">خوش برگشتی!</h2>

          <p className="mt-2 text-sm text-app-muted">
            برای ادامه یادگیری وارد حساب کاربری خود شو
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              className="w-full rounded-xl border border-app-border bg-app-input px-4 py-3 text-app-text outline-none transition focus:border-app-primary"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-app-text">
              رمز عبور
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور خود را وارد کنید"
              autoComplete="current-password"
              className="w-full rounded-xl border border-app-border bg-app-input px-4 py-3 text-app-text outline-none transition focus:border-app-primary"
              required
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-app-primary px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "در حال ورود..." : "ورود به حساب"}
          </button>
        </form>

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
