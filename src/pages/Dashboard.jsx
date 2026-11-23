import DashboardHeader from "../components/Dashboard/DashboardHeader";
import PopularVocab from "../components/Dashboard/PopularVocab";
import Sidebar from "../components/Sidebar";
import VocabHstory from "../components/Dashboard/VocabHstory";
import Translator from "../components/Dashboard/translator/Translator";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div dir="rtl" className="min-h-screen bg-app-background text-app-text">
      {/* Mobile Sidebar Toggle */}
      <input type="checkbox" id="sidebar-toggle" className="peer hidden" />

      {/* Mobile Overlay */}
      <label
        htmlFor="sidebar-toggle"
        className="fixed inset-0 z-40 hidden bg-black/50 backdrop-blur-sm peer-checked:block lg:hidden"
      />

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <DashboardHeader />

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
                  to="/"
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
                    +۱۲٪
                  </span>
                </div>
                <p className="mb-1 text-sm text-app-text-muted">
                  واژگان ذخیره‌شده
                </p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-black">۱۲۸</h3>
                  <span className="text-xs text-app-text-muted">واژه</span>
                </div>
              </div>

              <div className="stat-card panel-animation rounded-3xl border border-app-border bg-app-surface p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl text-blue-500">
                    ⇄
                  </div>
                  <span className="rounded-full bg-app-success/10 px-3 py-1 text-xs font-bold text-app-success">
                    +۸٪
                  </span>
                </div>
                <p className="mb-1 text-sm text-app-text-muted">
                  ترجمه‌های انجام‌شده
                </p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-black">۳۵۶</h3>
                  <span className="text-xs text-app-text-muted">ترجمه</span>
                </div>
              </div>

              <div className="stat-card panel-animation rounded-3xl border border-app-border bg-app-surface p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-2xl text-orange-500">
                    ☆
                  </div>
                  <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-500">
                    فعال
                  </span>
                </div>
                <p className="mb-1 text-sm text-app-text-muted">
                  روزهای یادگیری متوالی
                </p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-black">۷ روز</h3>
                  <span className="text-xs text-app-text-muted">پشت سر هم</span>
                </div>
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
                <p className="mb-1 text-sm text-app-text-muted">فعالیت امروز</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-black">۲۴</h3>
                  <span className="text-xs text-app-text-muted">دقیقه</span>
                </div>
              </div>
            </section>

            {/* Translator + Activity */}
            <section className="mb-7 grid grid-cols-1 gap-5 xl:grid-cols-3">
              {/* Translator */}

              <Translator/>
              {/* Daily Goal */}
              <div className="relative overflow-hidden rounded-3xl border border-app-border bg-app-surface p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-extrabold">هدف روزانه</h2>
                  <span className="text-xl text-app-primary">◎</span>
                </div>

                <div className="relative mx-auto mb-6 flex h-40 w-40 items-center justify-center">
                  <svg
                    viewBox="0 0 160 160"
                    className="absolute inset-0 h-full w-full -rotate-90"
                  >
                    <circle
                      cx="80"
                      cy="80"
                      r="65"
                      fill="none"
                      stroke="var(--app-border)"
                      strokeWidth="12"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="65"
                      fill="none"
                      stroke="var(--app-primary)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray="408"
                      strokeDashoffset="122"
                    />
                  </svg>
                  <div className="text-center">
                    <p className="text-4xl font-black">۷۰٪</p>
                    <p className="mt-1 text-xs text-app-text-muted">
                      تکمیل شده
                    </p>
                  </div>
                </div>

                <p className="mb-2 text-center font-bold">عالی پیش می‌ری! 🎉</p>
                <p className="text-center text-xs leading-6 text-app-text-muted">
                  فقط کمی دیگه تا رسیدن به هدف امروزت باقی مونده.
                </p>
              </div>
            </section>

            {/* Bottom Sections */}
            <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {/* Vocabulary */}
              <PopularVocab />

              {/* History */}
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
}
