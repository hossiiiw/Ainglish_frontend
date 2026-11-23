import { useState } from "react";
import api from "../../../services/api";

const MAX_LENGTH = 10000;

const getErrorMessage = (err) => {
  const data = err?.data ?? err?.response?.data;
  const detail = data?.detail;

  if (Array.isArray(detail)) {
    return detail.map((item) => item.msg).join(" | ");
  }

  if (typeof detail === "string") {
    if (detail.includes("already exists")) {
      return "این متن قبلاً در واژگان شما ذخیره شده است.";
    }

    return detail;
  }

  return err?.message || "خطایی رخ داده است. لطفاً دوباره تلاش کنید.";
};

const isPersian = (text) => /[\u0600-\u06FF]/.test(text);

function Translator() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const persianInput = isPersian(text);

  const handleTranslate = async () => {
    const cleanText = text.trim();

    if (!cleanText) {
      setError("لطفاً متن موردنظر خود را وارد کنید.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setResult(null);
    setSaved(false);
    setCopied(false);

    try {
      const response = await api.post("/translator/translate", {
        text: cleanText,
      });

      setResult({
        original: cleanText,
        translation: response.translation,
        technicalTerms: response.technical_terms || [],
        model: response.model,
      });

      window.dispatchEvent(new Event("ainglish:history-updated"));
    } catch (err) {
      console.error("Translation error:", {
        status: err.status,
        data: err.data,
        message: err.message,
      });

      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleAddToVocabulary = async () => {
    if (!result || saving || saved) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/words", {
        word: result.original.trim(),
        meaning: result.translation.trim(),
      });

      setSaved(true);
      setSuccess("ترجمه با موفقیت به واژگان شما اضافه شد.");

      window.dispatchEvent(new Event("ainglish:vocabulary-updated"));
    } catch (err) {
      console.error("Add vocabulary error:", {
        status: err.status,
        data: err.data,
        message: err.message,
      });

      const message = getErrorMessage(err);

      if (message.includes("قبلاً") || message.includes("already exists")) {
        setSaved(true);
        setSuccess("این متن قبلاً در واژگان شما ذخیره شده است.");
      } else {
        setError(message);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = async () => {
    if (!result?.translation) return;

    try {
      await navigator.clipboard.writeText(result.translation);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError("کپی کردن متن امکان‌پذیر نیست.");
    }
  };

  const handleClear = () => {
    setText("");
    setResult(null);
    setError("");
    setSuccess("");
    setSaved(false);
    setCopied(false);
  };

  return (
    <section
      dir="rtl"
      className="w-full rounded-2xl border border-app-border bg-app-surface p-4 shadow-sm sm:p-6"
    >
      {/* Header */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-app-text">مترجم هوشمند</h2>

          <p className="mt-1 text-sm text-app-muted">
            متن خود را وارد کنید و ترجمه هوشمند آن را دریافت کنید.
          </p>
        </div>

        <span className="w-fit rounded-full bg-app-primary/10 px-3 py-1.5 text-xs font-medium text-app-primary">
          AI Translator
        </span>
      </div>

      {/* Language direction */}
      <div className="mb-4 flex items-center justify-center gap-3">
        <span
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            persianInput
              ? "bg-app-primary text-white"
              : "bg-app-background text-app-muted"
          }`}
        >
          {persianInput ? "فارسی" : "English"}
        </span>

        <span className="text-app-muted">⇄</span>

        <span
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            persianInput
              ? "bg-app-background text-app-muted"
              : "bg-app-primary text-white"
          }`}
        >
          {persianInput ? "English" : "فارسی"}
        </span>
      </div>

      {/* Input */}
      <div className="rounded-xl border border-app-border bg-app-background p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between">
          <label
            htmlFor="translator-input"
            className="text-sm font-semibold text-app-text"
          >
            متن ورودی
          </label>

          <span className="text-xs text-app-muted" dir="ltr">
            {text.length}/{MAX_LENGTH}
          </span>
        </div>

        <textarea
          id="translator-input"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError("");
          }}
          maxLength={MAX_LENGTH}
          rows={6}
          placeholder="متن فارسی یا انگلیسی خود را اینجا وارد کنید..."
          className="w-full resize-y bg-transparent text-sm leading-8 text-app-text outline-none placeholder:text-app-muted"
        />

        <div className="mt-3 flex items-center justify-between border-t border-app-border pt-3">
          <button
            type="button"
            onClick={handleClear}
            disabled={!text && !result}
            className="text-xs text-app-muted transition hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            پاک کردن متن
          </button>

          <button
            type="button"
            onClick={handleTranslate}
            disabled={loading || !text.trim()}
            className="rounded-xl bg-app-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "در حال ترجمه..." : "ترجمه کن"}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="mt-4 rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-600">
          {success}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mt-6 flex items-center justify-center gap-3 rounded-xl border border-app-border p-6 text-sm text-app-muted">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-app-primary border-t-transparent" />
          هوش مصنوعی در حال پردازش متن شماست...
        </div>
      )}

      {/* Result */}
      {result && !loading && (
        <div className="mt-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-app-text">نتیجه ترجمه</h3>

            {result.model && (
              <span className="text-xs text-app-muted">
                مدل: {result.model}
              </span>
            )}
          </div>

          <div className="rounded-xl border border-app-border bg-app-background p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-app-text">ترجمه</span>

              <button
                type="button"
                onClick={handleCopy}
                className="text-xs font-medium text-app-primary transition hover:opacity-70"
              >
                {copied ? "کپی شد ✓" : "کپی ترجمه"}
              </button>
            </div>

            <p
              dir="auto"
              className="whitespace-pre-wrap text-sm leading-8 text-app-text"
            >
              {result.translation}
            </p>
          </div>

          {/* Technical Terms */}
          {result.technicalTerms.length > 0 && (
            <div>
              <h3 className="mb-3 font-bold text-app-text">اصطلاحات تخصصی</h3>

              <div className="space-y-3">
                {result.technicalTerms.map((item, index) => (
                  <div
                    key={`${item.term}-${index}`}
                    className="rounded-xl border border-app-border bg-app-background p-4"
                  >
                    <p
                      dir="auto"
                      className="mb-2 text-sm font-bold text-app-primary"
                    >
                      {item.term}
                    </p>

                    <p className="text-sm leading-7 text-app-muted">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add to Vocabulary */}
          <div className="flex flex-col gap-3 border-t border-app-border pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-6 text-app-muted">
              می‌توانید این ترجمه را برای مرورهای بعدی در واژگان خود ذخیره کنید.
            </p>

            <button
              type="button"
              onClick={handleAddToVocabulary}
              disabled={saving || saved}
              className={`shrink-0 rounded-xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed ${
                saved
                  ? "bg-green-500/10 text-green-600"
                  : "bg-app-primary text-white hover:opacity-90 disabled:opacity-50"
              }`}
            >
              {saving
                ? "در حال ذخیره..."
                : saved
                  ? "افزوده شد ✓"
                  : "افزودن به واژگانم"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Translator;
