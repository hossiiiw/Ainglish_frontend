import { useCallback, useEffect, useState } from "react";
import api from "../../services/api";

function VocabHstory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const getResponseData = (response) => {
    return response?.data ?? response;
  };

  const formatDate = (value) => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/translator/history?limit=5&offset=0");

      const data = getResponseData(response);

      setHistory(Array.isArray(data?.items) ? data.items : []);
    } catch (err) {
      console.error("History error:", err);
      setError("دریافت تاریخچه ترجمه با مشکل مواجه شد.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();

    const handleHistoryUpdate = () => {
      fetchHistory();
    };

    window.addEventListener("ainglish:history-updated", handleHistoryUpdate);

    return () => {
      window.removeEventListener(
        "ainglish:history-updated",
        handleHistoryUpdate,
      );
    };
  }, [fetchHistory]);

  const handleDelete = async (id) => {
    setDeletingId(id);
    setError("");

    try {
      await api.delete(`/translator/history/${id}`);

      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete history error:", err);
      setError("حذف ترجمه با مشکل مواجه شد.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="panel-animation rounded-3xl border border-app-border bg-app-surface p-5 sm:p-6">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-extrabold">تاریخچه ترجمه</h2>

          <p className="mt-1 text-xs text-app-text-muted">
            آخرین ترجمه‌های شما
          </p>
        </div>

        <button
          type="button"
          onClick={fetchHistory}
          disabled={loading}
          className="rounded-xl bg-app-primary/10 px-3 py-2 text-xs font-bold text-app-primary transition hover:bg-app-primary/20 disabled:opacity-50"
        >
          بروزرسانی
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-xl border border-app-danger/20 bg-app-danger/10 p-3 text-xs leading-6 text-app-danger">
          {error}

          <button
            type="button"
            onClick={fetchHistory}
            className="mr-2 font-bold underline"
          >
            تلاش مجدد
          </button>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-12">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-app-primary/20 border-t-app-primary" />

          <p className="text-sm text-app-text-muted">
            در حال دریافت تاریخچه...
          </p>
        </div>
      ) : history.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-app-primary/10 text-3xl text-app-primary">
            ⇄
          </div>

          <h3 className="mb-2 font-bold">هنوز ترجمه‌ای ندارید</h3>

          <p className="max-w-xs text-xs leading-7 text-app-text-muted">
            اولین متن خود را ترجمه کنید تا تاریخچه ترجمه‌های شما اینجا نمایش
            داده شود.
          </p>
        </div>
      ) : (
        /* History List */
        <div className="space-y-3">
          {history.map((item) => {
            const isPersian = /[\u0600-\u06FF]/.test(item.original_text || "");

            return (
              <div
                key={item.id}
                className="group rounded-2xl border border-app-border bg-app-background p-4 transition hover:border-app-primary/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p
                      dir="auto"
                      className="line-clamp-2 break-words text-sm font-bold text-app-text"
                    >
                      {item.original_text}
                    </p>

                    <p
                      dir="auto"
                      className="mt-2 line-clamp-2 break-words text-xs leading-6 text-app-text-muted"
                    >
                      {item.translated_text}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    title="حذف از تاریخچه"
                    aria-label="حذف ترجمه"
                    className="shrink-0 rounded-lg p-2 text-app-text-muted transition hover:bg-app-danger/10 hover:text-app-danger disabled:opacity-40"
                  >
                    {deletingId === item.id ? (
                      <span className="block h-4 w-4 animate-spin rounded-full border-2 border-app-primary/20 border-t-app-primary" />
                    ) : (
                      "✕"
                    )}
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-app-border pt-3">
                  <span className="rounded-lg bg-app-primary/10 px-2.5 py-1 text-[10px] font-bold text-app-primary">
                    {isPersian ? "FA → EN" : "EN → FA"}
                  </span>

                  <span className="text-[10px] text-app-text-muted">
                    {formatDate(item.created_at)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default VocabHstory;
