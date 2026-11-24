
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const PAGE_SIZE = 7;

const normalizeText = (value) => {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/ۀ/g, "ه")
    .replace(/ة/g, "ه")
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[\u200c\u200f\u200e]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const Vocabulary = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [deletingId, setDeletingId] = useState(null);

  const [editingWord, setEditingWord] = useState(null);
  const [editWord, setEditWord] = useState("");
  const [editMeaning, setEditMeaning] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  const getResponseData = (response) => {
    return response?.data ?? response;
  };

  const getErrorMessage = (err, fallback) => {
    if (err?.status === 401) {
      return "نشست شما منقضی شده است. لطفاً دوباره وارد شوید.";
    }

    return (
      err?.data?.detail ||
      err?.response?.data?.detail ||
      err?.message ||
      fallback
    );
  };

  // -------------------- FETCH WORDS --------------------

  const fetchWords = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/words?limit=100");
      const result = getResponseData(response);

      setWords(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Fetch vocabulary error:", err);
      setError(getErrorMessage(err, "دریافت واژگان با خطا مواجه شد."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  // -------------------- SEARCH --------------------

  const normalizedSearch = useMemo(
    () => normalizeText(search),
    [search],
  );

  const filteredWords = useMemo(() => {
    if (!normalizedSearch) return words;

    const searchTerms = normalizedSearch
      .split(" ")
      .filter(Boolean);

    return words.filter((item) => {
      const word = normalizeText(item.word);
      const meaning = normalizeText(item.meaning);

      const searchableText = `${word} ${meaning}`;

      return searchTerms.every((term) =>
        searchableText.includes(term),
      );
    });
  }, [words, normalizedSearch]);

  // -------------------- PAGINATION --------------------

  const totalPages = Math.max(
    1,
    Math.ceil(filteredWords.length / PAGE_SIZE),
  );

  const currentWords = filteredWords.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // -------------------- DELETE --------------------

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "آیا از حذف این مورد از واژگان خود مطمئن هستید؟",
    );

    if (!confirmed) return;

    setDeletingId(id);
    setError("");

    try {
      await api.delete(`/words/${id}`);

      setWords((prev) =>
        prev.filter((item) => item.id !== id),
      );
    } catch (err) {
      console.error("Delete vocabulary error:", err);
      setError(getErrorMessage(err, "حذف واژه انجام نشد."));
    } finally {
      setDeletingId(null);
    }
  };

  // -------------------- EDIT --------------------

  const openEditModal = (item) => {
    setEditingWord(item);
    setEditWord(item.word || "");
    setEditMeaning(item.meaning || "");
    setError("");
  };

  const closeEditModal = () => {
    if (savingEdit) return;

    setEditingWord(null);
    setEditWord("");
    setEditMeaning("");
    setError("");
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const cleanWord = editWord.trim();
    const cleanMeaning = editMeaning.trim();

    if (!cleanWord || !cleanMeaning) {
      setError("هر دو فیلد واژه و معنی باید تکمیل شوند.");
      return;
    }

    setSavingEdit(true);
    setError("");

    try {
      const response = await api.put(
        `/words/${editingWord.id}`,
        {
          word: cleanWord,
          meaning: cleanMeaning,
        },
      );

      const updatedWord = getResponseData(response);

      setWords((prev) =>
        prev.map((item) =>
          item.id === editingWord.id
            ? updatedWord
            : item,
        ),
      );

      setEditingWord(null);
      setEditWord("");
      setEditMeaning("");
    } catch (err) {
      console.error("Update vocabulary error:", err);
      setError(getErrorMessage(err, "ویرایش واژه انجام نشد."));
    } finally {
      setSavingEdit(false);
    }
  };

  // -------------------- HELPERS --------------------

  const isLongText = (value) => {
    return String(value || "").trim().includes(" ");
  };

  const formatCount = (value) => {
    return Number(value || 0).toLocaleString("fa-IR");
  };

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

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

            {/* Page Heading */}
            <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm text-app-primary">
                  <span className="h-2 w-2 rounded-full bg-app-primary" />
                  فضای یادگیری
                  <span className="text-app-text-muted">/</span>
                  واژگان من
                </div>

                <h1 className="text-2xl font-black md:text-3xl">
                  واژگان <span className="text-app-primary">من</span>
                </h1>

                <p className="mt-2 text-sm text-app-text-muted">
                  دایره لغاتت را گسترش بده و واژه‌ها و جمله‌های مهم را ذخیره کن.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={fetchWords}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-app-border bg-app-surface px-4 py-3 text-sm font-bold text-app-text-muted transition hover:bg-app-surface-hover disabled:opacity-50"
                >
                  ↻ بروزرسانی
                </button>

                <Link
                  to="/add-vocab"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-app-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-app-primary/20 transition hover:bg-app-primary-hover"
                >
                  <span className="text-lg">＋</span>
                  افزودن واژه جدید
                </Link>
              </div>
            </section>

            {/* Error */}
            {error && (
              <div className="flex flex-col gap-3 rounded-2xl border border-app-danger/20 bg-app-danger/10 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-7 text-app-danger">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => setError("")}
                  className="self-start rounded-lg px-3 py-1 text-xs font-bold text-app-danger hover:bg-app-danger/10"
                >
                  بستن
                </button>
              </div>
            )}

            {/* Statistics */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl border border-app-border bg-app-surface p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-app-text-muted">
                    کل موارد ذخیره‌شده
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-primary/10 text-xl text-app-primary">
                    ◈
                  </span>
                </div>

                <p className="mt-4 text-3xl font-black">
                  {loading ? "..." : formatCount(words.length)}
                </p>

                <p className="mt-2 text-xs text-app-text-muted">
                  مجموع واژه‌ها و جمله‌های شخصی شما
                </p>
              </div>

              <div className="rounded-2xl border border-app-border bg-app-surface p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-app-text-muted">
                    واژه‌ها و اصطلاحات
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-success/10 text-xl text-app-success">
                    ✓
                  </span>
                </div>

                <p className="mt-4 text-3xl font-black">
                  {loading
                    ? "..."
                    : formatCount(
                        words.filter((item) => !isLongText(item.word)).length,
                      )}
                </p>

                <p className="mt-2 text-xs text-app-text-muted">
                  موارد کوتاه ذخیره‌شده
                </p>
              </div>

              <div className="rounded-2xl border border-app-border bg-app-surface p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-app-text-muted">
                    جمله‌های ذخیره‌شده
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-warning/10 text-xl text-app-warning">
                    ◷
                  </span>
                </div>

                <p className="mt-4 text-3xl font-black">
                  {loading
                    ? "..."
                    : formatCount(
                        words.filter((item) => isLongText(item.word)).length,
                      )}
                </p>

                <p className="mt-2 text-xs text-app-text-muted">
                  جمله‌های اصلی و ترجمه‌های ذخیره‌شده
                </p>
              </div>
            </section>

            {/* Learning Progress */}
            <section className="grid gap-5 xl:grid-cols-3">
              <div className="rounded-2xl border border-app-border bg-app-surface p-6 xl:col-span-2">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-extrabold">مجموعه یادگیری من</h2>
                    <p className="mt-1 text-xs text-app-text-muted">
                      وضعیت فعلی اطلاعات ذخیره‌شده در حساب شما
                    </p>
                  </div>

                  <span className="rounded-full bg-app-primary/10 px-3 py-1.5 text-xs font-bold text-app-primary">
                    {loading ? "در حال دریافت" : "اطلاعات واقعی"}
                  </span>
                </div>

                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between text-xs">
                    <span className="text-app-text-muted">
                      تعداد موارد ذخیره‌شده
                    </span>
                    <span className="font-bold text-app-primary">
                      {formatCount(words.length)} مورد
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-app-input">
                    <div
                      className="h-full rounded-full bg-app-primary transition-all duration-500"
                      style={{
                        width: words.length > 0 ? "100%" : "0%",
                      }}
                    />
                  </div>

                  <p className="mt-4 text-xs leading-7 text-app-text-muted">
                    می‌توانی واژه‌ها، اصطلاحات تخصصی و حتی جمله‌های کامل را از
                    مترجم هوشمند به این مجموعه اضافه کنی.
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#5531a8] p-6 text-white">
                <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

                <div className="relative">
                  <span className="text-3xl">✦</span>
                  <h3 className="mt-4 text-lg font-black">
                    واژه جدید یاد بگیر!
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-white/75">
                    هر متن مهمی را که ترجمه می‌کنی ذخیره کن تا همیشه به آن
                    دسترسی داشته باشی.
                  </p>

                  <Link
                    to="/translator"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#5531a8] transition hover:bg-white/90"
                  >
                    مترجم هوشمند
                    <span>←</span>
                  </Link>
                </div>
              </div>
            </section>

           
{/* Vocabulary Section */}
<section className="space-y-4">

  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h2 className="text-lg font-bold">واژگان من</h2>
      <p className="mt-1 text-xs text-app-text-muted">
        مدیریت واژه‌ها و جمله‌های ذخیره‌شده
      </p>
    </div>

    <span className="text-xs text-app-text-muted">
      {formatCount(filteredWords.length)} مورد
    </span>
  </div>

  {/* Search */}
  <div className="rounded-xl border border-app-border bg-app-surface p-3">
    <div className="relative">
      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base text-app-text-muted">
        ⌕
      </span>

      <input
        type="search"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="جست‌وجوی واژه یا معنی..."
        autoComplete="off"
        className="w-full rounded-lg border border-app-border bg-app-input py-2.5 pr-10 pl-10 text-sm text-app-text outline-none transition placeholder:text-app-text-muted focus:border-app-primary focus:ring-2 focus:ring-app-primary/10"
      />

      {search && (
        <button
          type="button"
          onClick={() => handleSearch("")}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-app-text-muted hover:text-app-text"
        >
          ×
        </button>
      )}
    </div>
  </div>

  {/* Loading */}
  {loading ? (
    <div className="flex items-center justify-center gap-3 rounded-xl border border-app-border bg-app-surface py-12">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-app-primary/20 border-t-app-primary" />
      <span className="text-xs text-app-text-muted">
        در حال دریافت واژگان...
      </span>
    </div>
  ) : currentWords.length === 0 ? (
    <div className="rounded-xl border border-dashed border-app-border bg-app-surface px-4 py-12 text-center">
      <p className="text-3xl text-app-text-muted">◈</p>

      <h3 className="mt-3 text-sm font-bold">
        {search.trim()
          ? "موردی پیدا نشد"
          : "هنوز واژه‌ای ذخیره نکرده‌ای"}
      </h3>

      <p className="mt-2 text-xs text-app-text-muted">
        {search.trim()
          ? "عبارت جست‌وجو را تغییر بده."
          : "اولین واژه خودت را به مجموعه اضافه کن."}
      </p>

      {!search.trim() && (
        <Link
          to="/add-vocab"
          className="mt-4 inline-flex rounded-lg bg-app-primary px-4 py-2.5 text-xs font-bold text-white transition hover:bg-app-primary-hover"
        >
          افزودن واژه جدید
        </Link>
      )}
    </div>
  ) : (
    <>
      {/* Vocabulary List */}
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        {currentWords.map((item) => {
          const isSentence = isLongText(item.word);

          return (
            <article
              key={item.id}
              className="min-w-0 rounded-xl border border-app-border bg-app-surface p-4 transition-colors hover:border-app-primary/40"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-md bg-app-primary/10 px-2 py-1 text-[10px] font-semibold text-app-primary">
                      {isSentence ? "جمله" : "واژه"}
                    </span>
                  </div>

                  <h3
                    dir="auto"
                    className="break-words text-base font-bold leading-7 text-app-text"
                  >
                    {item.word}
                  </h3>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    title="ویرایش"
                    aria-label="ویرایش"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-sm text-app-text-muted transition hover:bg-app-primary/10 hover:text-app-primary"
                  >
                    ✎
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    title="حذف"
                    aria-label="حذف"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-base text-app-text-muted transition hover:bg-app-danger/10 hover:text-app-danger disabled:opacity-50"
                  >
                    {deletingId === item.id ? "..." : "×"}
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="my-3 border-t border-app-border" />

              {/* Meaning */}
              <div>
                <p className="mb-1 text-[10px] font-semibold text-app-text-muted">
                  معنی / ترجمه
                </p>

                <p
                  dir="auto"
                  className="break-words whitespace-pre-wrap text-sm leading-7 text-app-text-muted"
                >
                  {item.meaning}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-3 flex justify-end border-t border-app-border pt-2">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(
                        `${item.word}\n${item.meaning}`
                      );
                    } catch (err) {
                      console.error("Copy error:", err);
                      setError("کپی متن انجام نشد.");
                    }
                  }}
                  className="rounded-lg px-3 py-1.5 text-[11px] font-semibold text-app-text-muted transition hover:bg-app-primary/10 hover:text-app-primary"
                >
                  کپی متن
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col gap-3 rounded-xl border border-app-border bg-app-surface px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-app-text-muted">
            نمایش{" "}
            {formatCount((currentPage - 1) * PAGE_SIZE + 1)}
            {" تا "}
            {formatCount(
              Math.min(currentPage * PAGE_SIZE, filteredWords.length)
            )}
            {" از "}
            {formatCount(filteredWords.length)} مورد
          </p>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() =>
                setCurrentPage((prev) => Math.max(1, prev - 1))
              }
              disabled={currentPage === 1}
              className="rounded-lg border border-app-border px-3 py-2 text-xs text-app-text-muted transition hover:bg-app-surface-hover disabled:opacity-40"
            >
              قبلی
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-bold transition ${
                  currentPage === page
                    ? "bg-app-primary text-white"
                    : "border border-app-border text-app-text-muted hover:bg-app-surface-hover"
                }`}
              >
                {formatCount(page)}
              </button>
            ))}

            <button
              type="button"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="rounded-lg border border-app-border px-3 py-2 text-xs text-app-text-muted transition hover:bg-app-surface-hover disabled:opacity-40"
            >
              بعدی
            </button>
          </div>
        </div>
      )}
    </>
  )}
</section>

            {/* Bottom Info */}
            <section className="flex items-start gap-3 rounded-2xl border border-app-primary/20 bg-app-primary/5 p-5">
              <span className="text-xl text-app-primary">ⓘ</span>

              <p className="text-xs leading-7 text-app-text-muted">
                واژه‌ها و جمله‌های ذخیره‌شده به حساب کاربری شما متصل هستند.
                می‌توانی هر مورد را ویرایش یا حذف کنی و برای مرورهای بعدی از
                آن‌ها استفاده کنی.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingWord && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeEditModal();
            }
          }}
        >
          <form
            onSubmit={handleEdit}
            className="w-full max-w-xl space-y-5 rounded-3xl border border-app-border bg-app-surface p-5 shadow-2xl sm:p-7"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black">ویرایش واژه</h2>
                <p className="mt-1 text-xs text-app-text-muted">
                  اطلاعات موردنظر را ویرایش کن.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                disabled={savingEdit}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-app-border text-lg text-app-text-muted transition hover:bg-app-surface-hover disabled:opacity-50"
              >
                ×
              </button>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">
                واژه یا جمله اصلی
              </label>

              <textarea
                dir="auto"
                rows={3}
                maxLength={10000}
                value={editWord}
                onChange={(e) => setEditWord(e.target.value)}
                className="w-full resize-y rounded-xl border border-app-border bg-app-input p-4 text-sm leading-7 text-app-text outline-none transition focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
                placeholder="واژه یا جمله را وارد کن..."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">
                معنی یا ترجمه
              </label>

              <textarea
                dir="auto"
                rows={4}
                maxLength={10000}
                value={editMeaning}
                onChange={(e) => setEditMeaning(e.target.value)}
                className="w-full resize-y rounded-xl border border-app-border bg-app-input p-4 text-sm leading-7 text-app-text outline-none transition focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
                placeholder="معنی یا ترجمه را وارد کن..."
              />
            </div>

            {error && (
              <div className="rounded-xl border border-app-danger/20 bg-app-danger/10 p-3 text-sm text-app-danger">
                {error}
              </div>
            )}

            <div className="flex flex-wrap justify-end gap-2 border-t border-app-border pt-4">
              <button
                type="button"
                onClick={closeEditModal}
                disabled={savingEdit}
                className="rounded-xl border border-app-border px-5 py-3 text-sm font-bold text-app-text-muted transition hover:bg-app-surface-hover disabled:opacity-50"
              >
                انصراف
              </button>

              <button
                type="submit"
                disabled={
                  savingEdit ||
                  !editWord.trim() ||
                  !editMeaning.trim()
                }
                className="rounded-xl bg-app-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-app-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                {savingEdit ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};

export default Vocabulary;
