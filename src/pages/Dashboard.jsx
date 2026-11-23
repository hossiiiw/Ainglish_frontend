
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardHeader from "../components/Dashboard/DashboardHeader";
import PopularVocab from "../components/Dashboard/PopularVocab";
import Sidebar from "../components/Sidebar";
import VocabHstory from "../components/Dashboard/VocabHstory";
import Translator from "../components/Dashboard/translator/Translator";
import api from "../services/api";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState({
    vocabularyCount: null,
    translationCount: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const closeSidebar = () => setSidebarOpen(false);

  const getResponseData = (response) => {
    return response?.data ?? response;
  };

  const formatCount = (value) => {
    if (value === null || value === undefined) return "—";
    return Number(value).toLocaleString("fa-IR");
  };

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError("");

    const results = await Promise.allSettled([
      api.get("/words?limit=100"),
      api.get("/translator/history?limit=1&offset=0"),
    ]);

    let hasError = false;

    if (results[0].status === "fulfilled") {
      const words = getResponseData(results[0].value);

      setStats((prev) => ({
        ...prev,
        vocabularyCount: Array.isArray(words) ? words.length : 0,
      }));
    } else {
      console.error("Dashboard vocabulary error:", results[0].reason);

      setStats((prev) => ({
        ...prev,
        vocabularyCount: null,
      }));

      hasError = true;
    }

    if (results[1].status === "fulfilled") {
      const history = getResponseData(results[1].value);

      setStats((prev) => ({
        ...prev,
        translationCount: Number(history?.total ?? 0),
      }));
    } else {
      console.error("Dashboard history error:", results[1].reason);

      setStats((prev) => ({
        ...prev,
        translationCount: null,
      }));

      hasError = true;
    }

    if (hasError) {
      setError("دریافت بخشی از اطلاعات داشبورد با مشکل مواجه شد.");
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <div dir="rtl" className="min-h-screen bg-app-background text-app-text">
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-[1600px]">

            {/* Header */}
            <DashboardHeader
              onMenuClick={() => setSidebarOpen((prev) => !prev)}
            />

            {/* Error */}
            {error && (
              <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-app-danger/20 bg-app-danger/10 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-7 text-app-danger">{error}</p>

                <button
                  type="button"
                  onClick={fetchDashboardData}
                  disabled={loading}
                  className="self-start rounded-xl bg-app-danger/10 px-4 py-2 text-xs font-bold text-app-danger transition hover:bg-app-danger/20 disabled:opacity-50"
                >
                  تلاش مجدد
                </button>
              </div>
            )}

            {/* Hero */}
            <section className="dashboard-hero relative mb-7 overflow-hidden rounded-[2rem] bg-gradient-to-l from-app-primary-dark via-app-primary to-[#a78bfa] p-7 text-white shadow-xl shadow-app-primary/15 sm:p-10">
              <div className="relative z-10 max-w-xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-green-300" />
                  مسیر یادگیری تو ادامه داره
                </div>

                <h1 className="mb-4 text-3xl font-black leading-relaxed sm:text-4xl lg:text-5xl">
                  هر روز یک قدم
                  <br />
                  به انگلیسی مسلط‌تر شو!
                </h1>

                <p className="mb-7 max-w-md text-sm leading-8 text-white/80 sm:text-base">
                  با Ainglish واژه‌های جدید یاد بگیر، ترجمه کن و مهارت زبان
                  انگلیسی خودت رو تقویت کن.
                </p>

                <Link
                  to="/ai-translator"
                  className="inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 font-bold text-app-primary-dark shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                >
                  شروع یادگیری
                  <span>←</span>
                </Link>
              </div>

              <div className="pointer-events-none absolute -left-10 -top-20 h-72 w-72 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -left-2 -top-12 h-56 w-56 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute bottom-[-100px] left-[30%] h-64 w-64 rounded-full bg-white/10 blur-3xl" />

              <div className="pointer-events-none absolute bottom-0 left-10 hidden text-[150px] opacity-20 lg:block">
                📚
              </div>

              <div className="pointer-events-none absolute left-[25%] top-10 hidden text-5xl opacity-30 lg:block">
                ✦
              </div>
            </section>

            {/* Statistics */}
            <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

              <div className="stat-card panel-animation rounded-3xl border border-app-border bg-app-surface p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-app-primary/10 text-2xl text-app-primary">
                    ▤
                  </div>
                  <span className="rounded-full bg-app-success/10 px-3 py-1 text-xs font-bold text-app-success">
                    شخصی
                  </span>
                </div>

                <p className="mb-1 text-sm text-app-text-muted">
                  واژگان ذخیره‌شده
                </p>

                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-black tabular-nums">
                    {loading ? "..." : formatCount(stats.vocabularyCount)}
                  </h3>
                  <span className="text-xs text-app-text-muted">مورد</span>
                </div>
              </div>

              <div className="stat-card panel-animation rounded-3xl border border-app-border bg-app-surface p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl text-blue-500">
                    ⇄
                  </div>
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-500">
                    تاریخچه
                  </span>
                </div>

                <p className="mb-1 text-sm text-app-text-muted">
                  ترجمه‌های انجام‌شده
                </p>

                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-black tabular-nums">
                    {loading ? "..." : formatCount(stats.translationCount)}
                  </h3>
                  <span className="text-xs text-app-text-muted">ترجمه</span>
                </div>
              </div>

              <div className="stat-card panel-animation rounded-3xl border border-app-border bg-app-surface p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-2xl text-orange-500">
                    ☆
                  </div>
                  <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-500">
                    به‌زودی
                  </span>
                </div>

                <p className="mb-1 text-sm text-app-text-muted">
                  روزهای یادگیری متوالی
                </p>

                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-black">—</h3>
                  <span className="text-xs text-app-text-muted">روز</span>
                </div>

                <p className="mt-2 text-[11px] text-app-text-muted">
                  نیازمند سیستم ثبت فعالیت روزانه
                </p>
              </div>

              <div className="stat-card panel-animation rounded-3xl border border-app-border bg-app-surface p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/10 text-2xl text-pink-500">
                    ✧
                  </div>
                  <span className="rounded-full bg-app-primary/10 px-3 py-1 text-xs font-bold text-app-primary">
                    امروز
                  </span>
                </div>

                <p className="mb-1 text-sm text-app-text-muted">
                  مدت فعالیت امروز
                </p>

                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-black">—</h3>
                  <span className="text-xs text-app-text-muted">دقیقه</span>
                </div>

                <p className="mt-2 text-[11px] text-app-text-muted">
                  نیازمند ثبت زمان مطالعه
                </p>
              </div>
            </section>

            {/* Full Width Translator */}
            <section className="mb-7 w-full">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black sm:text-2xl">
                    مترجم هوشمند Ainglish
                  </h2>
                  <p className="mt-2 text-sm text-app-text-muted">
                    متن خودت رو وارد کن و ترجمه دقیق و هوشمند دریافت کن.
                  </p>
                </div>

                <Link
                  to="/ai-translator"
                  className="rounded-xl border border-app-border bg-app-surface px-4 py-2.5 text-xs font-bold text-app-primary transition hover:border-app-primary"
                >
                  صفحه مترجم
                  <span className="mr-2">←</span>
                </Link>
              </div>

              <div className="w-full rounded-3xl border border-app-border bg-app-surface p-3 shadow-sm sm:p-5 lg:p-7">
                <Translator />
              </div>
            </section>

            {/* Daily Goal */}
            <section className="mb-7">
              <div className="rounded-3xl border border-app-border bg-app-surface p-6 sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-extrabold">
                      برنامه یادگیری
                    </h2>
                    <p className="mt-2 text-sm text-app-text-muted">
                      هر روز با تمرین بیشتر به هدفت نزدیک‌تر شو.
                    </p>
                  </div>

                  <span className="text-3xl text-app-primary">◎</span>
                </div>

                <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-app-primary/10 text-4xl">
                      📚
                    </div>

                    <div>
                      <p className="font-bold">
                        یادگیری از همین امروز شروع می‌شود
                      </p>
                      <p className="mt-2 max-w-xl text-sm leading-7 text-app-text-muted">
                        با ترجمه متن‌ها و ذخیره واژه‌های جدید، مجموعه یادگیری
                        خودت را بساز.
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/translator"
                    className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-app-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-app-primary-hover sm:w-auto"
                  >
                    شروع تمرین
                    <span>←</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* Bottom Sections */}
            <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <PopularVocab />
              <VocabHstory />
            </section>

            {/* Footer */}
            <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-app-border py-6 text-xs text-app-text-muted">
              <p>© 2026 Ainglish. تمام حقوق محفوظ است.</p>
              <p>ساخته‌شده برای یادگیری هوشمندانه‌تر 💜</p>
            </footer>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
