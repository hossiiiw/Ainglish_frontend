
import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const MAX_LENGTH = 10000;

const getErrorMessage = (err) => {
  const data = err?.data ?? err?.response?.data;
  const detail = data?.detail;

  if (Array.isArray(detail)) {
    return detail.map((item) => item.msg).join(" | ");
  }

  if (typeof detail === "string") {
    if (detail.toLowerCase().includes("already exists")) {
      return "این واژه یا عبارت قبلاً در واژگان شما ثبت شده است.";
    }

    return detail;
  }

  return err?.message || "خطایی رخ داده است. لطفاً دوباره تلاش کنید.";
};

const AddVocabulary = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // AI Translator
  const [aiText, setAiText] = useState("");
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSaving, setAiSaving] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiSuccess, setAiSuccess] = useState("");
  const [aiSaved, setAiSaved] = useState(false);

  // Manual Vocabulary
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [manualLoading, setManualLoading] = useState(false);
  const [manualError, setManualError] = useState("");
  const [manualSuccess, setManualSuccess] = useState("");

  const closeSidebar = () => setSidebarOpen(false);

  // AI Translation
  const handleTranslate = async () => {
    const cleanText = aiText.trim();

    if (!cleanText) {
      setAiError("لطفاً متن موردنظر خود را وارد کنید.");
      return;
    }

    setAiLoading(true);
    setAiError("");
    setAiSuccess("");
    setAiResult(null);
    setAiSaved(false);

    try {
      const response = await api.post("/translator/translate", {
        text: cleanText,
      });

      setAiResult({
        original: cleanText,
        translation: response.translation,
        technicalTerms: response.technical_terms || [],
        model: response.model,
      });
    } catch (err) {
      console.error("AI Translation Error:", err);
      setAiError(getErrorMessage(err));
    } finally {
      setAiLoading(false);
    }
  };

  // Save AI Translation
  const handleSaveAI = async () => {
    if (!aiResult || aiSaving || aiSaved) return;

    setAiSaving(true);
    setAiError("");
    setAiSuccess("");

    try {
      await api.post("/words", {
        word: aiResult.original.trim(),
        meaning: aiResult.translation.trim(),
      });

      setAiSaved(true);
      setAiSuccess("ترجمه با موفقیت به واژگان شما اضافه شد.");

      window.dispatchEvent(new Event("ainglish:vocabulary-updated"));
    } catch (err) {
      console.error("AI Vocabulary Save Error:", err);

      const message = getErrorMessage(err);

      if (message.includes("قبلاً")) {
        setAiSaved(true);
        setAiSuccess(message);
      } else {
        setAiError(message);
      }
    } finally {
      setAiSaving(false);
    }
  };

  // Manual Save
  const handleManualSave = async (e) => {
    e.preventDefault();

    const cleanWord = word.trim();
    const cleanMeaning = meaning.trim();

    setManualError("");
    setManualSuccess("");

    if (!cleanWord || !cleanMeaning) {
      setManualError("لطفاً هر دو فیلد واژه و معنی را تکمیل کنید.");
      return;
    }

    if (cleanWord.length > MAX_LENGTH || cleanMeaning.length > MAX_LENGTH) {
      setManualError("طول متن واردشده بیش از حد مجاز است.");
      return;
    }

    setManualLoading(true);

    try {
      await api.post("/words", {
        word: cleanWord,
        meaning: cleanMeaning,
      });

      setManualSuccess("واژه با موفقیت به واژگان شما اضافه شد.");

      setWord("");
      setMeaning("");

      window.dispatchEvent(new Event("ainglish:vocabulary-updated"));
    } catch (err) {
      console.error("Manual Vocabulary Save Error:", err);
      setManualError(getErrorMessage(err));
    } finally {
      setManualLoading(false);
    }
  };

  return (
    <main dir="rtl" className="min-h-screen bg-app-background text-app-text">
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        <div className="min-w-0 flex-1 px-4 py-6 md:px-8 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <DashboardHeader
              onMenuClick={() => setSidebarOpen((prev) => !prev)}
            />

            <div className="space-y-7 pb-12">
              {/* Header */}
              <section className="flex flex-col justify-between gap-4 pt-5 sm:flex-row sm:items-center">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-sm text-app-text-muted">
                    <Link to="/dashboard" className="hover:text-app-primary">
                      داشبورد
                    </Link>
                    <span>/</span>
                    <Link to="/vocabulary" className="hover:text-app-primary">
                      واژگان من
                    </Link>
                    <span>/</span>
                    <span className="text-app-primary">افزودن واژه</span>
                  </div>

                  <h1 className="text-2xl font-black sm:text-3xl">
                    افزودن واژه یا عبارت
                  </h1>

                  <p className="mt-2 text-sm text-app-text-muted">
                    واژه‌های جدیدت رو به واژگان شخصی خودت اضافه کن.
                  </p>
                </div>

                <Link
                  to="/vocabulary"
                  className="w-fit rounded-xl border border-app-border bg-app-surface px-4 py-2.5 text-sm font-semibold transition hover:bg-app-surface-hover"
                >
                  بازگشت به واژگان
                </Link>
              </section>

              {/* AI Translator */}
              <section className="overflow-hidden rounded-3xl border border-app-border bg-app-surface">
                <div className="flex flex-col gap-4 border-b border-app-border bg-gradient-to-l from-app-primary/15 to-transparent p-5 sm:flex-row sm:items-center sm:p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-app-primary text-2xl text-white">
                    ✨
                  </div>

                  <div>
                    <h2 className="text-lg font-black">
                      افزودن با هوش مصنوعی
                    </h2>
                    <p className="mt-1 text-sm text-app-text-muted">
                      متن خودت رو وارد کن و ترجمه‌ش رو با هوش مصنوعی دریافت کن.
                    </p>
                  </div>

                  <span className="rounded-lg bg-app-primary/10 px-3 py-1.5 text-xs font-bold text-app-primary sm:mr-auto">
                    AI Translator
                  </span>
                </div>

                <div className="space-y-5 p-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Input */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="ai-input"
                          className="text-sm font-bold"
                        >
                          متن ورودی
                        </label>

                        <span className="text-xs text-app-text-muted">
                          {aiText.length}/{MAX_LENGTH}
                        </span>
                      </div>

                      <textarea
                        id="ai-input"
                        dir="auto"
                        rows="5"
                        maxLength={MAX_LENGTH}
                        value={aiText}
                        onChange={(e) => {
                          setAiText(e.target.value);
                          setAiError("");
                          setAiSuccess("");
                        }}
                        placeholder="واژه یا عبارت موردنظرت رو وارد کن..."
                        className="w-full resize-none rounded-2xl border border-app-border bg-app-input p-4 text-sm text-app-text outline-none transition placeholder:text-app-text-muted/60 focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
                      />
                    </div>

                    {/* Translation Result */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold">
                        ترجمه
                      </label>

                      <div className="flex min-h-[132px] flex-col rounded-2xl border border-app-primary/30 bg-app-primary/5 p-4">
                        {aiLoading ? (
                          <div className="flex flex-1 items-center justify-center gap-3 text-sm text-app-text-muted">
                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-app-primary border-t-transparent" />
                            در حال دریافت ترجمه...
                          </div>
                        ) : aiResult ? (
                          <>
                            <p
                              dir="auto"
                              className="whitespace-pre-wrap text-sm leading-8 text-app-text"
                            >
                              {aiResult.translation}
                            </p>

                            {aiResult.model && (
                              <span className="mt-3 text-xs text-app-primary">
                                مدل: {aiResult.model}
                              </span>
                            )}
                          </>
                        ) : (
                          <p className="flex flex-1 items-center justify-center text-center text-sm leading-7 text-app-text-muted">
                            ترجمه در این قسمت نمایش داده می‌شود...
                          </p>
                        )}

                        <span className="mt-3 text-xs text-app-primary">
                          نتیجه ترجمه هوش مصنوعی
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* AI Errors */}
                  {aiError && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
                      {aiError}
                    </div>
                  )}

                  {aiSuccess && (
                    <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-600">
                      {aiSuccess}
                    </div>
                  )}

                  {/* Technical Terms */}
                  {aiResult?.technicalTerms?.length > 0 && (
                    <div className="rounded-xl border border-app-border bg-app-background p-4">
                      <h3 className="mb-3 text-sm font-bold">
                        اصطلاحات تخصصی
                      </h3>

                      <div className="space-y-3">
                        {aiResult.technicalTerms.map((item, index) => (
                          <div
                            key={`${item.term}-${index}`}
                            className="border-b border-app-border pb-3 last:border-0 last:pb-0"
                          >
                            <p
                              dir="auto"
                              className="text-sm font-bold text-app-primary"
                            >
                              {item.term}
                            </p>

                            <p className="mt-1 text-sm leading-7 text-app-text-muted">
                              {item.explanation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Translate Button */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-6 text-app-text-muted">
                      ترجمه می‌تواند از انگلیسی به فارسی یا برعکس باشد.
                    </p>

                    <button
                      type="button"
                      onClick={handleTranslate}
                      disabled={aiLoading || !aiText.trim()}
                      className="rounded-xl bg-app-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-app-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {aiLoading
                        ? "در حال ترجمه..."
                        : "✨ ترجمه با هوش مصنوعی"}
                    </button>
                  </div>

                  {/* Save AI Translation */}
                  <div className="flex flex-col gap-3 rounded-xl border border-app-border bg-app-background p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-bold">
                        ذخیره ترجمه در واژگان من
                      </p>

                      <p className="mt-1 text-xs text-app-text-muted">
                        بعد از دریافت ترجمه، می‌تونی اون رو به لیست واژگانت
                        اضافه کنی.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveAI}
                      disabled={!aiResult || aiSaving || aiSaved}
                      className={`shrink-0 rounded-xl border px-5 py-2.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                        aiSaved
                          ? "border-green-500/30 bg-green-500/10 text-green-600"
                          : "border-app-primary/40 text-app-primary hover:bg-app-primary/10"
                      }`}
                    >
                      {aiSaving
                        ? "در حال ذخیره..."
                        : aiSaved
                          ? "افزوده شد ✓"
                          : "افزودن به واژگان"}
                    </button>
                  </div>
                </div>
              </section>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-app-border" />

                <span className="text-xs font-semibold text-app-text-muted">
                  یا به صورت دستی اضافه کن
                </span>

                <div className="h-px flex-1 bg-app-border" />
              </div>

              {/* Manual Add */}
              <section className="rounded-3xl border border-app-border bg-app-surface p-5 sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-surface-hover text-xl">
                    ✏️
                  </div>

                  <div>
                    <h2 className="text-lg font-black">
                      افزودن دستی
                    </h2>

                    <p className="mt-1 text-sm text-app-text-muted">
                      واژه و معنی فارسی اون رو وارد کن.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleManualSave} className="space-y-5">
                  {/* Word */}
                  <div className="space-y-2">
                    <label
                      htmlFor="manual-word"
                      className="text-sm font-bold"
                    >
                      واژه یا عبارت انگلیسی
                      <span className="mr-1 text-app-danger">*</span>
                    </label>

                    <input
                      id="manual-word"
                      type="text"
                      dir="auto"
                      maxLength={MAX_LENGTH}
                      value={word}
                      onChange={(e) => {
                        setWord(e.target.value);
                        setManualError("");
                        setManualSuccess("");
                      }}
                      placeholder="مثلاً: Opportunity"
                      className="w-full rounded-xl border border-app-border bg-app-input px-4 py-3.5 text-left text-sm text-app-text outline-none transition placeholder:text-app-text-muted/60 focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
                    />

                    <p className="text-xs text-app-text-muted">
                      حداکثر ۱۰۰۰۰ کاراکتر
                    </p>
                  </div>

                  {/* Meaning */}
                  <div className="space-y-2">
                    <label
                      htmlFor="manual-meaning"
                      className="text-sm font-bold"
                    >
                      معنی فارسی
                      <span className="mr-1 text-app-danger">*</span>
                    </label>

                    <textarea
                      id="manual-meaning"
                      rows="3"
                      maxLength={MAX_LENGTH}
                      dir="rtl"
                      value={meaning}
                      onChange={(e) => {
                        setMeaning(e.target.value);
                        setManualError("");
                        setManualSuccess("");
                      }}
                      placeholder="معنی فارسی واژه یا عبارت رو وارد کن..."
                      className="w-full resize-none rounded-xl border border-app-border bg-app-input px-4 py-3.5 text-sm text-app-text outline-none transition placeholder:text-app-text-muted/60 focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
                    />

                    <p className="text-xs text-app-text-muted">
                      حداکثر ۱۰۰۰۰ کاراکتر
                    </p>
                  </div>

                  {/* Manual Messages */}
                  {manualError && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
                      {manualError}
                    </div>
                  )}

                  {manualSuccess && (
                    <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-600">
                      {manualSuccess}
                    </div>
                  )}

                  {/* Submit */}
                  <div className="flex flex-col-reverse gap-3 border-t border-app-border pt-5 sm:flex-row sm:justify-end">
                    <Link
                      to="/vocabulary"
                      className="rounded-xl border border-app-border px-6 py-3 text-center text-sm font-bold transition hover:bg-app-surface-hover"
                    >
                      انصراف
                    </Link>

                    <button
                      type="submit"
                      disabled={manualLoading || !word.trim() || !meaning.trim()}
                      className="rounded-xl bg-app-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-app-primary/20 transition hover:bg-app-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {manualLoading
                        ? "در حال ذخیره..."
                        : "+ ذخیره واژه"}
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddVocabulary;
