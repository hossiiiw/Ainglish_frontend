import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function LandingTranslator() {
  const { isAuthenticated } = useAuth();

  const [sourceText, setSourceText] = useState("");
  const [translation, setTranslation] = useState("");
  const [technicalTerms, setTechnicalTerms] = useState([]);
  const [remaining, setRemaining] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const wordCount = sourceText.trim()
    ? sourceText.trim().split(/\s+/).length
    : 0;

  const handleTranslate = async () => {
    const text = sourceText.trim();

    if (!text) {
      setError("ابتدا متنی برای ترجمه وارد کنید.");
      return;
    }

    if (!isAuthenticated && wordCount > 500) {
      setError("حداکثر طول متن برای کاربران مهمان ۵۰۰ کلمه است.");
      return;
    }

    if (loading) return;

    setLoading(true);
    setError("");
    setSuccess("");
    setTranslation("");
    setTechnicalTerms([]);

    try {
      const response = isAuthenticated
        ? await api.post("/translator/translate", { text })
        : await api.postGuest("/translator/translate", { text });

      const result = response?.data ?? response;
      const translatedText =
        result?.translation ?? result?.translated_text ?? result?.result ?? "";

      if (!translatedText || typeof translatedText !== "string") {
        throw new Error("پاسخ معتبری از مترجم دریافت نشد.");
      }

      setTranslation(translatedText);
      setTechnicalTerms(
        Array.isArray(result?.technical_terms)
          ? result.technical_terms
          : [],
      );

      if (!isAuthenticated && typeof result?.guest_remaining === "number") {
        setRemaining(result.guest_remaining);
      }

      setSuccess("ترجمه با موفقیت انجام شد.");
    } catch (err) {
      console.error("Landing translator error:", err);

      if (err?.status === 429) {
        setError(
          err?.data?.detail ||
            "سهمیه ترجمه شما به پایان رسیده است. لطفاً بعداً دوباره تلاش کنید.",
        );
      } else if (err?.status === 401) {
        setError("برای ادامه، لطفاً دوباره وارد حساب خود شوید.");
      } else {
        setError(
          err?.data?.detail ||
            err?.message ||
            "ترجمه انجام نشد. لطفاً دوباره تلاش کنید.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(translation);
      setSuccess("ترجمه کپی شد.");
      setError("");
    } catch {
      setError("امکان کپی ترجمه وجود ندارد.");
    }
  };

  const handleClear = () => {
    setSourceText("");
    setTranslation("");
    setTechnicalTerms([]);
    setError("");
    setSuccess("");
  };

  const getTerm = (item) =>
    typeof item === "string"
      ? item
      : item?.term || item?.word || item?.expression || "";

  const getMeaning = (item) =>
    typeof item === "string"
      ? ""
      : item?.explanation || item?.meaning || item?.translation || "";

  return (
    <section
      id="translator"
      dir="rtl"
      className="scroll-mt-24 px-5 py-16 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-app-primary/20 bg-app-primary/5 px-4 py-2 text-xs font-bold text-app-primary">
            <span className="h-2 w-2 animate-pulse rounded-full bg-app-primary" />
            تجربه رایگان ترجمه هوشمند
          </span>

          <h2 className="mt-5 text-3xl font-black leading-relaxed sm:text-4xl">
            همین‌جا ترجمه را <span className="text-app-primary">امتحان کن</span>
          </h2>

          <p className="mt-4 text-sm leading-8 text-app-text-muted sm:text-base">
            بدون نیاز به ثبت‌نام، متن خود را وارد کن و ترجمه‌ای روان و متناسب
            با مفهوم آن دریافت کن.
          </p>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-app-border bg-app-surface shadow-xl shadow-app-primary/5">
          <div className="flex flex-col gap-4 border-b border-app-border bg-app-primary/5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-app-primary text-2xl text-white shadow-lg shadow-app-primary/20">
                ✧
              </div>
              <div>
                <h3 className="font-black">مترجم هوشمند Ainglish</h3>
                <p className="mt-1 text-xs text-app-text-muted">
                  ترجمه با درک مفهوم و اصطلاحات متن
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              {isAuthenticated ? (
                <span className="rounded-full bg-app-success/10 px-3 py-2 font-bold text-app-success">
                  کاربر واردشده
                </span>
              ) : (
                <>
                  <span className="rounded-full bg-app-primary/10 px-3 py-2 font-bold text-app-primary">
                    {remaining.toLocaleString("fa-IR")} ترجمه باقی‌مانده
                  </span>
                  <span className="rounded-full bg-app-background px-3 py-2 text-app-text-muted">
                    حداکثر ۵۰۰ کلمه
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2">
            <div className="border-b border-app-border p-5 md:border-b-0 md:border-l md:p-7">
              <div className="mb-4 flex items-center justify-between">
                <label className="text-sm font-extrabold">متن ورودی</label>
                <span className="text-xs text-app-text-muted">
                  English / فارسی
                </span>
              </div>

              <textarea
                dir="auto"
                rows={8}
                maxLength={10000}
                value={sourceText}
                onChange={(event) => {
                  setSourceText(event.target.value);
                  setError("");
                  setSuccess("");
                }}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    (event.ctrlKey || event.metaKey)
                  ) {
                    handleTranslate();
                  }
                }}
                placeholder="متن موردنظر برای ترجمه را اینجا وارد کنید..."
                className="min-h-56 w-full resize-y rounded-2xl border border-app-border bg-app-input p-4 text-sm leading-8 text-app-text outline-none transition placeholder:text-app-text-muted/70 focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
              />

              <div className="mt-3 flex items-center justify-between text-xs text-app-text-muted">
                <span>
                  {wordCount.toLocaleString("fa-IR")} کلمه
                  {!isAuthenticated && " از ۵۰۰"}
                </span>
                <span>
                  {sourceText.length.toLocaleString("fa-IR")} / ۱۰٬۰۰۰
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={loading || (!sourceText && !translation)}
                  className="rounded-xl border border-app-border px-4 py-3 text-sm font-bold text-app-text-muted transition hover:bg-app-surface-hover disabled:opacity-40"
                >
                  پاک کردن
                </button>

                <button
                  type="button"
                  onClick={handleTranslate}
                  disabled={
                    loading ||
                    !sourceText.trim() ||
                    (!isAuthenticated && wordCount > 500)
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-app-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-app-primary/20 transition hover:bg-app-primary-hover disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      در حال ترجمه...
                    </>
                  ) : (
                    <>✦ ترجمه هوشمند</>
                  )}
                </button>
              </div>

              <p className="mt-3 text-xs text-app-text-muted">
                میانبر ترجمه: Ctrl + Enter
              </p>
            </div>

            <div className="bg-app-input/40 p-5 md:p-7">
              <div className="mb-4 flex items-center justify-between">
                <label className="text-sm font-extrabold">نتیجه ترجمه</label>
                <span className="text-xs text-app-text-muted">ترجمه هوشمند</span>
              </div>

              <div className="min-h-56 rounded-2xl border border-app-border bg-app-surface p-4">
                {loading ? (
                  <div className="flex min-h-48 flex-col items-center justify-center gap-4 text-app-text-muted">
                    <div className="h-9 w-9 animate-spin rounded-full border-4 border-app-primary/20 border-t-app-primary" />
                    <p className="text-sm">هوش مصنوعی در حال ترجمه است...</p>
                  </div>
                ) : translation ? (
                  <>
                    <div className="mb-4 flex items-center gap-2 text-xs font-bold text-app-success">
                      <span className="h-2 w-2 rounded-full bg-app-success" />
                      ترجمه آماده است
                    </div>
                    <p className="whitespace-pre-wrap text-sm leading-9 text-app-text">
                      {translation}
                    </p>
                  </>
                ) : (
                  <div className="flex min-h-48 flex-col items-center justify-center text-center">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-app-primary/10 text-2xl text-app-primary">
                      ✧
                    </div>
                    <p className="text-sm font-bold">
                      ترجمه شما اینجا نمایش داده می‌شود
                    </p>
                    <p className="mt-2 text-xs leading-6 text-app-text-muted">
                      متن خود را وارد کنید و روی ترجمه هوشمند بزنید.
                    </p>
                  </div>
                )}
              </div>

              {translation && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="mt-4 rounded-xl border border-app-border bg-app-surface px-4 py-2.5 text-sm font-bold text-app-text transition hover:bg-app-surface-hover"
                >
                  ▣ کپی ترجمه
                </button>
              )}
            </div>
          </div>

          {(error || success) && (
            <div className="border-t border-app-border px-5 py-4 sm:px-7">
              {error ? (
                <div className="rounded-xl border border-app-danger/20 bg-app-danger/10 p-3 text-sm text-app-danger">
                  {error}
                </div>
              ) : (
                <div className="rounded-xl border border-app-success/20 bg-app-success/10 p-3 text-sm text-app-success">
                  {success}
                </div>
              )}
            </div>
          )}
        </div>

        {technicalTerms.length > 0 && (
          <div className="mt-5 rounded-3xl border border-app-border bg-app-surface p-5 sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-primary/10 text-xl text-app-primary">
                ⌘
              </div>
              <div>
                <h3 className="font-black">اصطلاحات تخصصی متن</h3>
                <p className="mt-1 text-xs text-app-text-muted">
                  توضیح اصطلاحات استخراج‌شده توسط هوش مصنوعی
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {technicalTerms.map((item, index) => (
                <div
                  key={`${getTerm(item)}-${index}`}
                  className="rounded-2xl border border-app-border bg-app-background p-4"
                >
                  <p className="font-bold text-app-primary">
                    {getTerm(item) || "اصطلاح"}
                  </p>
                  {getMeaning(item) && (
                    <p className="mt-2 text-sm leading-7 text-app-text-muted">
                      {getMeaning(item)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!isAuthenticated && (
          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-app-primary/20 bg-app-primary/5 p-5 text-center sm:flex-row sm:text-right">
            <div>
              <p className="font-extrabold">
                می‌خواهی امکانات بیشتری داشته باشی؟
              </p>
              <p className="mt-1 text-sm leading-7 text-app-text-muted">
                با ساخت حساب رایگان، تاریخچه ترجمه‌ها و واژگان شخصی خودت را
                مدیریت کن.
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link
                to="/login"
                className="rounded-xl border border-app-border bg-app-surface px-4 py-2.5 text-sm font-bold text-app-text transition hover:bg-app-surface-hover"
              >
                ورود
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-app-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-app-primary-hover"
              >
                ثبت‌نام رایگان
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
