import { useCallback, useEffect, useState } from "react";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const PAGE_SIZE = 7;

const AiTranslator = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Translator
  const [sourceText, setSourceText] = useState("");
  const [translation, setTranslation] = useState("");
  const [technicalTerms, setTechnicalTerms] = useState([]);
  const [loading, setLoading] = useState(false);

  // Messages
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // History
  const [history, setHistory] = useState([]);
  const [historyTotal, setHistoryTotal] = useState(0);
  const [historyOffset, setHistoryOffset] = useState(0);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState("");
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Vocabulary
  const [addingWords, setAddingWords] = useState({});
  const [addedWords, setAddedWords] = useState({});

  const closeSidebar = () => setSidebarOpen(false);

  // -------------------- HELPERS --------------------

  const getResponseData = (response) => {
    return response?.data ?? response;
  };

  const getTermValue = (term) => {
    if (typeof term === "string") return term;

    return term?.term || term?.word || term?.expression || term?.name || "";
  };

  const getTermDescription = (term) => {
    if (typeof term === "string") return "";

    return (
      term?.meaning ||
      term?.translation ||
      term?.explanation ||
      term?.description ||
      ""
    );
  };

  const normalizeTerms = (terms) => {
    if (!Array.isArray(terms)) return [];

    return terms.filter(
      (term) => typeof term === "string" || (term && typeof term === "object"),
    );
  };

  const isEnglish = (value) => /[a-zA-Z]/.test(value || "");
  const isPersian = (value) => /[\u0600-\u06FF]/.test(value || "");

  const showError = (err, fallback) => {
    if (err?.status === 401) {
      return "نشست شما منقضی شده است. لطفاً دوباره وارد شوید.";
    }

    return err?.data?.detail || err?.message || fallback;
  };

  // -------------------- HISTORY --------------------

  const fetchHistory = useCallback(async (offset = 0) => {
    setHistoryLoading(true);
    setHistoryError("");

    try {
      const response = await api.get(
        `/translator/history?limit=${PAGE_SIZE}&offset=${offset}`,
      );

      const result = getResponseData(response);

      setHistory(result?.items || []);
      setHistoryTotal(result?.total || 0);
      setHistoryOffset(offset);
    } catch (err) {
      console.error("History error:", err);

      setHistoryError(
        showError(err, "دریافت تاریخچه ترجمه‌ها با خطا مواجه شد."),
      );
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory(0);
  }, [fetchHistory]);

  const handleHistoryDetail = async (id) => {
    if (selectedHistory?.id === id) {
      setSelectedHistory(null);
      return;
    }

    setSelectedHistory(null);
    setHistoryError("");

    try {
      const response = await api.get(`/translator/history/${id}`);

      setSelectedHistory(getResponseData(response));
    } catch (err) {
      console.error("History detail error:", err);

      setHistoryError(showError(err, "دریافت جزئیات ترجمه با خطا مواجه شد."));
    }
  };

  const handleDeleteHistory = async (id) => {
    const confirmed = window.confirm(
      "آیا از حذف این ترجمه از تاریخچه مطمئن هستید؟",
    );

    if (!confirmed) return;

    setDeletingId(id);
    setHistoryError("");

    try {
      await api.delete(`/translator/history/${id}`);

      if (selectedHistory?.id === id) {
        setSelectedHistory(null);
      }

      const remainingItems = history.length - 1;

      const nextOffset =
        remainingItems === 0 && historyOffset > 0
          ? Math.max(0, historyOffset - PAGE_SIZE)
          : historyOffset;

      await fetchHistory(nextOffset);
    } catch (err) {
      console.error("Delete history error:", err);

      setHistoryError(showError(err, "حذف ترجمه از تاریخچه انجام نشد."));
    } finally {
      setDeletingId(null);
    }
  };

  const handleHistoryPage = (direction) => {
    const nextOffset =
      direction === "next"
        ? historyOffset + PAGE_SIZE
        : Math.max(0, historyOffset - PAGE_SIZE);

    setSelectedHistory(null);
    fetchHistory(nextOffset);
  };

  // -------------------- TRANSLATOR --------------------

  const handleTranslate = async () => {
    const text = sourceText.trim();

    if (!text) {
      setError("لطفاً ابتدا متنی برای ترجمه وارد کنید.");
      return;
    }

    if (loading) return;

    setLoading(true);
    setError("");
    setSuccessMessage("");
    setTranslation("");
    setTechnicalTerms([]);
    setAddedWords({});

    try {
      const response = await api.post("/translator/translate", {
        text,
      });

      const result = getResponseData(response);

      const translatedText =
        typeof result === "string"
          ? result
          : (result?.translation ??
            result?.translated_text ??
            result?.result ??
            result?.data?.translation ??
            "");

      if (!translatedText || typeof translatedText !== "string") {
        throw new Error("پاسخ دریافتی از سرور معتبر نیست.");
      }

      const terms =
        result?.technical_terms ??
        result?.terms ??
        result?.data?.technical_terms ??
        [];

      setTranslation(translatedText);
      setTechnicalTerms(normalizeTerms(terms));
      setSuccessMessage("ترجمه با موفقیت انجام شد.");

      await fetchHistory(0);
    } catch (err) {
      console.error("Translation error:", err);

      if (err?.status === 429) {
        setError(
          "محدودیت درخواست ترجمه فعال شده است. لطفاً کمی بعد دوباره تلاش کنید.",
        );
      } else {
        setError(
          showError(err, "خطایی هنگام ترجمه رخ داد. لطفاً دوباره تلاش کنید."),
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSourceText("");
    setTranslation("");
    setTechnicalTerms([]);
    setError("");
    setSuccessMessage("");
    setAddedWords({});
  };

  const handleCopy = async (text) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setSuccessMessage("متن با موفقیت کپی شد.");
      setError("");
    } catch {
      setError("امکان کپی کردن متن وجود ندارد.");
    }
  };

  // -------------------- VOCABULARY --------------------

  const handleAddWord = async (word, meaning, key) => {
    const cleanWord = String(word || "").trim();
    const cleanMeaning = String(meaning || "").trim();

    if (!cleanWord || !cleanMeaning) {
      setError("واژه و معنی آن نمی‌توانند خالی باشند.");
      return;
    }

    if (addingWords[key] || addedWords[key]) return;

    setAddingWords((prev) => ({
      ...prev,
      [key]: true,
    }));

    setError("");
    setSuccessMessage("");

    try {
      await api.post("/words", {
        word: cleanWord,
        meaning: cleanMeaning,
      });

      setAddedWords((prev) => ({
        ...prev,
        [key]: true,
      }));

      setSuccessMessage(`«${cleanWord}» با موفقیت به واژگان شما اضافه شد.`);
    } catch (err) {
      console.error("Add vocabulary error:", err);

      setError(showError(err, "افزودن واژه به فهرست شخصی انجام نشد."));
    } finally {
      setAddingWords((prev) => ({
        ...prev,
        [key]: false,
      }));
    }
  };

  // افزودن جمله اصلی و ترجمه آن
  const getTranslationVocabularyPayload = () => {
    const source = sourceText.trim();
    const target = translation.trim();

    if (!source || !target) return null;

    if (isEnglish(source) && isPersian(target)) {
      return {
        word: source,
        meaning: target,
      };
    }

    if (isPersian(source) && isEnglish(target)) {
      return {
        word: target,
        meaning: source,
      };
    }

    return null;
  };

  const handleAddTranslation = async () => {
    const payload = getTranslationVocabularyPayload();

    if (!payload) {
      setError("متن اصلی و ترجمه معتبر نیستند.");
      return;
    }

    if (addingWords.translation || addedWords.translation) return;

    setAddingWords((prev) => ({
      ...prev,
      translation: true,
    }));

    setError("");
    setSuccessMessage("");

    try {
      await api.post("/words", payload);

      setAddedWords((prev) => ({
        ...prev,
        translation: true,
      }));

      setSuccessMessage(
        "جمله اصلی و ترجمه آن با موفقیت به واژگان شما اضافه شدند.",
      );
    } catch (err) {
      console.error("Add translation error:", err);

      setError(showError(err, "افزودن جمله و ترجمه به واژگان انجام نشد."));
    } finally {
      setAddingWords((prev) => ({
        ...prev,
        translation: false,
      }));
    }
  };

  // -------------------- DATE --------------------

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "";

    return parsedDate.toLocaleString("fa-IR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // -------------------- TERMS --------------------

  const renderTerms = (terms, prefix = "term") => {
    if (!Array.isArray(terms) || terms.length === 0) {
      return (
        <p className="text-sm text-app-text-muted">
          اصطلاح تخصصی‌ای برای این ترجمه ثبت نشده است.
        </p>
      );
    }

    return (
      <div className="space-y-3">
        {terms.map((term, index) => {
          const word = getTermValue(term);
          const meaning = getTermDescription(term);
          const key = `${prefix}-${index}-${word}`;

          return (
            <div
              key={key}
              className="flex flex-col gap-3 rounded-2xl border border-app-border bg-app-background p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="break-words font-bold text-app-primary">
                  {word || "اصطلاح"}
                </p>

                {meaning && (
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-app-text-muted">
                    {meaning}
                  </p>
                )}
              </div>

              <button
                type="button"
                disabled={
                  !word || !meaning || addingWords[key] || addedWords[key]
                }
                onClick={() => handleAddWord(word, meaning, key)}
                className="shrink-0 rounded-xl bg-app-primary/10 px-4 py-2.5 text-xs font-bold text-app-primary transition hover:bg-app-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {addingWords[key]
                  ? "در حال افزودن..."
                  : addedWords[key]
                    ? "✓ اضافه شد"
                    : "＋ افزودن به واژگان"}
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  const translationPayload = getTranslationVocabularyPayload();

  // -------------------- RENDER --------------------

  return (
    <main dir="rtl" className="min-h-screen bg-app-background text-app-text">
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        <div className="min-w-0 flex-1 px-4 py-6 md:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl space-y-8">
            <DashboardHeader
              onMenuClick={() => setSidebarOpen((prev) => !prev)}
            />

            {/* Page Title */}
            <section>
              <div className="mb-2 flex items-center gap-2 text-sm text-app-primary">
                <span className="h-2 w-2 rounded-full bg-app-primary" />
                ابزارهای یادگیری
                <span className="text-app-text-muted">/</span>
                مترجم هوشمند
              </div>

              <h1 className="text-2xl font-black tracking-tight md:text-3xl">
                مترجم هوشمند <span className="text-app-primary">AI</span>
              </h1>

              <p className="mt-2 text-sm text-app-text-muted md:text-base">
                فراتر از ترجمه کلمات؛ مفهوم متن را درک کن و طبیعی ترجمه کن.
              </p>
            </section>

            {/* AI Intro */}
            <section className="relative isolate overflow-hidden rounded-[28px] border border-app-border bg-gradient-to-l from-[#8b5cf6] via-[#7650d8] to-[#5531a8] p-6 text-white shadow-[0_18px_50px_rgba(107,72,190,0.18)] md:p-8">
              <div className="pointer-events-none absolute -left-16 -top-24 -z-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-32 right-1/3 -z-10 h-64 w-64 rounded-full bg-fuchsia-300/20 blur-3xl" />

              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                    <span>✦</span>
                    قدرت گرفته از هوش مصنوعی
                  </div>

                  <h2 className="text-2xl font-black leading-relaxed md:text-3xl">
                    هر متنی را با درک عمیق‌تر ترجمه کن.
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/75 md:text-base">
                    ترجمه‌ای روان، دقیق و متناسب با مفهوم جمله دریافت کن؛ حتی
                    برای متن‌های تخصصی و اصطلاحات روزمره.
                  </p>
                </div>

                <div className="hidden h-36 w-36 shrink-0 items-center justify-center rounded-[32px] border border-white/20 bg-white/10 shadow-inner backdrop-blur-sm md:flex">
                  <div className="text-center">
                    <div className="text-5xl">✧</div>
                    <div className="mt-2 text-xs font-bold tracking-widest text-white/80">
                      AI TRANSLATOR
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Usage Information */}
            <section className="rounded-2xl border border-app-border bg-app-surface p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-app-primary/10 text-2xl text-app-primary">
                  ✦
                </div>

                <div>
                  <p className="font-bold">مترجم هوشمند آماده استفاده است</p>
                  <p className="mt-1 text-sm text-app-text-muted">
                    ترجمه‌های موفق به‌صورت خودکار در تاریخچه حساب شما ذخیره
                    می‌شوند.
                  </p>
                </div>
              </div>
            </section>

            {/* Translator Workspace */}
            <section className="overflow-hidden rounded-[28px] border border-app-border bg-app-surface shadow-sm">
              <div className="flex flex-col gap-3 border-b border-app-border px-5 py-5 md:flex-row md:items-center md:justify-between md:px-7">
                <div>
                  <h2 className="text-lg font-extrabold">فضای ترجمه</h2>
                  <p className="mt-1 text-xs text-app-text-muted">
                    متن خود را وارد کنید و نتیجه را دریافت کنید.
                  </p>
                </div>

                <span
                  className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                    loading
                      ? "bg-app-warning/10 text-app-warning"
                      : "bg-app-success/10 text-app-success"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      loading
                        ? "animate-pulse bg-app-warning"
                        : "bg-app-success"
                    }`}
                  />
                  {loading ? "در حال ترجمه..." : "مترجم آماده است"}
                </span>
              </div>

              <div className="grid md:grid-cols-2">
                {/* Source */}
                <div className="border-b border-app-border p-5 md:border-b-0 md:border-l md:p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <label className="text-sm font-bold">متن اصلی</label>
                    <span className="text-xs text-app-text-muted">
                      زبان مبدأ
                    </span>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-xl bg-app-primary px-4 py-2 text-sm font-bold text-white">
                      English
                    </span>
                    <span className="rounded-xl border border-app-border bg-app-input px-4 py-2 text-sm font-semibold text-app-text-muted">
                      فارسی
                    </span>
                  </div>

                  <textarea
                    dir="auto"
                    rows="8"
                    value={sourceText}
                    onChange={(e) => {
                      setSourceText(e.target.value);
                      setError("");
                      setSuccessMessage("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                        handleTranslate();
                      }
                    }}
                    maxLength={10000}
                    placeholder="متن انگلیسی یا فارسی خود را اینجا وارد کنید..."
                    className="min-h-52 w-full resize-y rounded-2xl border border-app-border bg-app-input p-4 text-sm leading-8 text-app-text outline-none transition placeholder:text-app-text-muted/70 focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
                  />

                  <div className="mt-3 flex items-center justify-between text-xs text-app-text-muted">
                    <span>متن خود را وارد کنید</span>
                    <span>
                      {sourceText.length.toLocaleString("fa-IR")} / ۱۰٬۰۰۰
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleClear}
                      disabled={loading || (!sourceText && !translation)}
                      className="rounded-xl border border-app-border px-4 py-2.5 text-sm font-semibold text-app-text-muted transition hover:bg-app-surface-hover disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      پاک کردن متن
                    </button>

                    <button
                      type="button"
                      onClick={handleTranslate}
                      disabled={loading || !sourceText.trim()}
                      className="rounded-xl bg-app-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-app-primary/20 transition hover:bg-app-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <span className="ml-2">✦</span>
                      {loading ? "در حال ترجمه..." : "ترجمه هوشمند"}
                    </button>
                  </div>

                  <p className="mt-3 text-xs text-app-text-muted">
                    میانبر ترجمه: Ctrl + Enter
                  </p>
                </div>

                {/* Result */}
                <div className="bg-app-input/50 p-5 md:p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <label className="text-sm font-bold">ترجمه</label>
                    <span className="text-xs text-app-text-muted">
                      زبان مقصد
                    </span>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-xl border border-app-border bg-app-surface px-4 py-2 text-sm font-semibold text-app-text-muted">
                      English
                    </span>
                    <span className="rounded-xl bg-app-primary px-4 py-2 text-sm font-bold text-white">
                      فارسی
                    </span>
                  </div>

                  <div className="min-h-52 rounded-2xl border border-app-border bg-app-surface p-4">
                    {loading ? (
                      <div className="flex min-h-44 flex-col items-center justify-center gap-4 text-app-text-muted">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-app-primary/20 border-t-app-primary" />
                        <p className="text-sm">
                          هوش مصنوعی در حال ترجمه متن شماست...
                        </p>
                      </div>
                    ) : translation ? (
                      <>
                        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-app-success">
                          <span className="h-2 w-2 rounded-full bg-app-success" />
                          ترجمه با موفقیت انجام شد
                        </div>
                        <p className="whitespace-pre-wrap text-sm leading-9 text-app-text">
                          {translation}
                        </p>
                      </>
                    ) : (
                      <div className="flex min-h-44 flex-col items-center justify-center text-center">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-app-primary/10 text-2xl text-app-primary">
                          ✧
                        </div>
                        <p className="text-sm font-bold">
                          نتیجه ترجمه اینجا نمایش داده می‌شود
                        </p>
                        <p className="mt-2 text-xs text-app-text-muted">
                          متن خود را وارد کنید و روی ترجمه هوشمند بزنید.
                        </p>
                      </div>
                    )}
                  </div>

                  {translation && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopy(translation)}
                        className="rounded-xl border border-app-border bg-app-surface px-4 py-2.5 text-sm font-semibold text-app-text transition hover:bg-app-surface-hover"
                      >
                        <span className="ml-2">▣</span>
                        کپی ترجمه
                      </button>

                      <button
                        type="button"
                        disabled={
                          addingWords.translation || addedWords.translation
                        }
                        onClick={handleAddTranslation}
                        className="rounded-xl bg-app-primary/10 px-4 py-2.5 text-sm font-bold text-app-primary transition hover:bg-app-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {addingWords.translation
                          ? "در حال افزودن..."
                          : addedWords.translation
                            ? "✓ اضافه شد"
                            : "＋ افزودن جمله و ترجمه به واژگان من"}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {(error || successMessage) && (
                <div className="border-t border-app-border px-5 py-4 md:px-7">
                  {error && (
                    <div className="rounded-xl border border-app-danger/20 bg-app-danger/10 p-3 text-sm text-app-danger">
                      {error}
                    </div>
                  )}

                  {!error && successMessage && (
                    <div className="rounded-xl border border-app-success/20 bg-app-success/10 p-3 text-sm text-app-success">
                      {successMessage}
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Technical Terms */}
            {technicalTerms.length > 0 && (
              <section className="rounded-3xl border border-app-border bg-app-surface p-5 sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-primary/10 text-xl text-app-primary">
                    ⌘
                  </div>
                  <div>
                    <h2 className="font-black">اصطلاحات تخصصی متن</h2>
                    <p className="mt-1 text-xs text-app-text-muted">
                      اصطلاحات استخراج‌شده توسط هوش مصنوعی
                    </p>
                  </div>
                </div>

                {renderTerms(technicalTerms, "current")}
              </section>
            )}

            {/* History */}
            <section
              id="translation-history"
              className="rounded-3xl border border-app-border bg-app-surface p-5 sm:p-7"
            >
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-primary/10 text-xl text-app-primary">
                    ◷
                  </div>
                  <div>
                    <h2 className="font-black">تاریخچه ترجمه‌ها</h2>
                    <p className="mt-1 text-xs text-app-text-muted">
                      ترجمه‌های قبلی خود را مشاهده و مدیریت کنید.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-app-primary/10 px-3 py-1.5 text-xs font-bold text-app-primary">
                    {historyTotal.toLocaleString("fa-IR")} ترجمه
                  </span>
                  <button
                    type="button"
                    onClick={() => fetchHistory(historyOffset)}
                    disabled={historyLoading}
                    className="rounded-xl border border-app-border px-3 py-2 text-xs font-semibold text-app-text-muted transition hover:bg-app-surface-hover disabled:opacity-50"
                  >
                    ↻ بروزرسانی
                  </button>
                </div>
              </div>

              {historyError && (
                <div className="mb-4 rounded-xl border border-app-danger/20 bg-app-danger/10 p-3 text-sm text-app-danger">
                  {historyError}
                </div>
              )}

              {historyLoading ? (
                <div className="flex flex-col items-center justify-center gap-3 py-12 text-app-text-muted">
                  <div className="h-7 w-7 animate-spin rounded-full border-4 border-app-primary/20 border-t-app-primary" />
                  <p className="text-sm">در حال دریافت تاریخچه...</p>
                </div>
              ) : history.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-app-border bg-app-background px-4 py-12 text-center">
                  <div className="mb-3 text-4xl text-app-text-muted">◷</div>
                  <p className="font-bold">هنوز ترجمه‌ای ثبت نکرده‌اید.</p>
                  <p className="mt-2 text-sm text-app-text-muted">
                    بعد از اولین ترجمه، تاریخچه شما در این قسمت نمایش داده
                    می‌شود.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {history.map((item) => {
                      const isSelected = selectedHistory?.id === item.id;

                      return (
                        <div
                          key={item.id}
                          className={`overflow-hidden rounded-2xl border transition ${
                            isSelected
                              ? "border-app-primary/50 bg-app-primary/5"
                              : "border-app-border bg-app-background"
                          }`}
                        >
                          <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <button
                              type="button"
                              onClick={() => handleHistoryDetail(item.id)}
                              className="min-w-0 flex-1 text-right"
                            >
                              <p className="line-clamp-2 break-words text-sm font-semibold leading-7">
                                {item.original_text}
                              </p>
                              <p className="mt-2 line-clamp-1 text-xs leading-6 text-app-text-muted">
                                {item.translated_text}
                              </p>
                              <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-app-text-muted">
                                <span>{formatDate(item.created_at)}</span>
                                <span>
                                  {Array.isArray(item.technical_terms)
                                    ? `${item.technical_terms.length.toLocaleString("fa-IR")} اصطلاح`
                                    : "بدون اصطلاح"}
                                </span>
                              </div>
                            </button>

                            <div className="flex shrink-0 items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleHistoryDetail(item.id)}
                                className="rounded-xl bg-app-primary/10 px-3 py-2 text-xs font-bold text-app-primary transition hover:bg-app-primary/20"
                              >
                                {isSelected ? "بستن جزئیات" : "مشاهده"}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteHistory(item.id)}
                                disabled={deletingId === item.id}
                                className="rounded-xl bg-app-danger/10 px-3 py-2 text-xs font-bold text-app-danger transition hover:bg-app-danger/20 disabled:opacity-50"
                              >
                                {deletingId === item.id ? "..." : "حذف"}
                              </button>
                            </div>
                          </div>

                          {isSelected && (
                            <div className="space-y-5 border-t border-app-border p-4">
                              <div>
                                <p className="mb-2 text-xs font-bold text-app-text-muted">
                                  متن اصلی
                                </p>
                                <div className="rounded-xl border border-app-border bg-app-surface p-4">
                                  <p className="whitespace-pre-wrap text-sm leading-8">
                                    {selectedHistory.original_text}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <div className="mb-2 flex items-center justify-between">
                                  <p className="text-xs font-bold text-app-text-muted">
                                    ترجمه
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleCopy(
                                        selectedHistory.translated_text,
                                      )
                                    }
                                    className="text-xs font-semibold text-app-primary hover:underline"
                                  >
                                    کپی ترجمه
                                  </button>
                                </div>
                                <div className="rounded-xl border border-app-border bg-app-surface p-4">
                                  <p className="whitespace-pre-wrap text-sm leading-8">
                                    {selectedHistory.translated_text}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <p className="mb-3 text-xs font-bold text-app-text-muted">
                                  اصطلاحات تخصصی
                                </p>
                                {renderTerms(
                                  selectedHistory.technical_terms,
                                  `history-${selectedHistory.id}`,
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  <div className="mt-6 flex flex-col gap-3 border-t border-app-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-app-text-muted">
                      نمایش {(historyOffset + 1).toLocaleString("fa-IR")}
                      {" تا "}
                      {Math.min(
                        historyOffset + history.length,
                        historyTotal,
                      ).toLocaleString("fa-IR")}
                      {" از "}
                      {historyTotal.toLocaleString("fa-IR")}
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleHistoryPage("previous")}
                        disabled={historyOffset === 0 || historyLoading}
                        className="rounded-xl border border-app-border px-4 py-2 text-xs font-bold transition hover:bg-app-surface-hover disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        قبلی
                      </button>

                      <button
                        type="button"
                        onClick={() => handleHistoryPage("next")}
                        disabled={
                          historyOffset + PAGE_SIZE >= historyTotal ||
                          historyLoading
                        }
                        className="rounded-xl border border-app-border px-4 py-2 text-xs font-bold transition hover:bg-app-surface-hover disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        بعدی
                      </button>
                    </div>
                  </div>
                </>
              )}
            </section>

            {/* Tips */}
            <section className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-app-border bg-app-surface p-5">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-app-primary/10 text-xl text-app-primary">
                  ✦
                </div>
                <h3 className="font-bold">درک مفهوم</h3>
                <p className="mt-2 text-sm leading-7 text-app-text-muted">
                  ترجمه با توجه به مفهوم جمله، نه صرفاً جایگزینی کلمه به کلمه.
                </p>
              </div>

              <div className="rounded-2xl border border-app-border bg-app-surface p-5">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-app-success/10 text-xl text-app-success">
                  ⌘
                </div>
                <h3 className="font-bold">اصطلاحات تخصصی</h3>
                <p className="mt-2 text-sm leading-7 text-app-text-muted">
                  اصطلاحات تخصصی را استخراج کن و مستقیماً به واژگان شخصی خود
                  اضافه کن.
                </p>
              </div>

              <div className="rounded-2xl border border-app-border bg-app-surface p-5">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-app-warning/10 text-xl text-app-warning">
                  ◈
                </div>
                <h3 className="font-bold">تاریخچه هوشمند</h3>
                <p className="mt-2 text-sm leading-7 text-app-text-muted">
                  ترجمه‌های قبلی را مشاهده کن، جزئیاتشان را بخوان و موارد
                  غیرضروری را حذف کن.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AiTranslator;
