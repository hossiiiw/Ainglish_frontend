import { Link } from "react-router-dom";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import Sidebar from "../components/Sidebar";

const AiTranslator = () => {
  return (
    <main dir="rtl" className="min-h-screen bg-app-background text-app-text">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <div className="min-w-0 flex-1 px-4 py-6 md:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Dashboard Header */}
            <DashboardHeader />

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

            {/* Usage */}
            <section className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-2xl border border-app-border bg-app-surface p-5">
                <div>
                  <p className="text-sm text-app-text-muted">
                    درخواست‌های امروز
                  </p>

                  <p className="mt-2 text-2xl font-black">
                    ۲۴
                    <span className="text-sm font-medium text-app-text-muted">
                      {" "}
                      از ۱۰۰
                    </span>
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-app-primary/10 text-2xl text-app-primary">
                  ↗
                </div>
              </div>

              <div className="rounded-2xl border border-app-border bg-app-surface p-5">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="font-semibold">سهمیه روزانه</span>
                  <span className="font-bold text-app-primary">۲۴٪</span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-app-input">
                  <div className="h-full w-[24%] rounded-full bg-gradient-to-l from-app-primary to-app-primary-light" />
                </div>

                <p className="mt-2 text-xs text-app-text-muted">
                  مقدار نمایش‌داده‌شده نمونه است.
                </p>
              </div>
            </section>

            {/* Translator Workspace */}
            <section className="overflow-hidden rounded-[28px] border border-app-border bg-app-surface shadow-sm">
              {/* Workspace Header */}
              <div className="flex flex-col gap-3 border-b border-app-border px-5 py-5 md:flex-row md:items-center md:justify-between md:px-7">
                <div>
                  <h2 className="text-lg font-extrabold">فضای ترجمه</h2>

                  <p className="mt-1 text-xs text-app-text-muted">
                    متن خود را وارد کنید و نتیجه را دریافت کنید.
                  </p>
                </div>

                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-app-success/10 px-3 py-1.5 text-xs font-semibold text-app-success">
                  <span className="h-2 w-2 rounded-full bg-app-success" />
                  مترجم آماده است
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

                  {/* Source Languages */}
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
                    placeholder="متن انگلیسی یا فارسی خود را اینجا وارد کنید..."
                    className="min-h-52 w-full resize-y rounded-2xl border border-app-border bg-app-input p-4 text-sm leading-8 text-app-text outline-none transition placeholder:text-app-text-muted/70 focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
                  />

                  <div className="mt-3 flex items-center justify-between text-xs text-app-text-muted">
                    <span>متن خود را وارد کنید</span>
                    <span>۰ کاراکتر</span>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="rounded-xl border border-app-border px-4 py-2.5 text-sm font-semibold text-app-text-muted transition hover:bg-app-surface-hover"
                    >
                      پاک کردن متن
                    </button>

                    <button
                      type="button"
                      className="rounded-xl bg-app-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-app-primary/20 transition hover:bg-app-primary-hover"
                    >
                      <span className="ml-2">✦</span>
                      ترجمه هوشمند
                    </button>
                  </div>
                </div>

                {/* Translation Result */}
                <div className="bg-app-input/50 p-5 md:p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <label className="text-sm font-bold">ترجمه</label>

                    <span className="text-xs text-app-text-muted">
                      زبان مقصد
                    </span>
                  </div>

                  {/* Target Languages */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-xl border border-app-border bg-app-surface px-4 py-2 text-sm font-semibold text-app-text-muted">
                      English
                    </span>

                    <span className="rounded-xl bg-app-primary px-4 py-2 text-sm font-bold text-white">
                      فارسی
                    </span>
                  </div>

                  {/* Result */}
                  <div className="min-h-52 rounded-2xl border border-app-border bg-app-surface p-4">
                    <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-app-success">
                      <span className="h-2 w-2 rounded-full bg-app-success" />
                      نمونه نتیجه ترجمه
                    </div>

                    <p className="text-sm leading-9 text-app-text">
                      یادگیری مداوم یکی از مهم‌ترین عوامل موفقیت در زندگی است.
                      با تمرین و پشتکار می‌توان مهارت‌های جدیدی آموخت و به اهداف
                      بزرگ‌تری دست یافت.
                    </p>
                  </div>

                  {/* Result Actions */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="rounded-xl border border-app-border bg-app-surface px-4 py-2.5 text-sm font-semibold text-app-text transition hover:bg-app-surface-hover"
                    >
                      <span className="ml-2">▣</span>
                      کپی ترجمه
                    </button>

                    <Link
                      to="/add-vocab"
                      className="rounded-xl bg-app-primary/10 px-4 py-2.5 text-sm font-bold text-app-primary transition hover:bg-app-primary/20"
                    >
                      <span className="ml-2">＋</span>
                      افزودن به واژگان من
                    </Link>
                  </div>
                </div>
              </div>
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
                  کمک به ترجمه اصطلاحات تخصصی و عبارت‌های رایج در متن.
                </p>
              </div>

              <div className="rounded-2xl border border-app-border bg-app-surface p-5">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-app-warning/10 text-xl text-app-warning">
                  ◈
                </div>

                <h3 className="font-bold">ترجمه دوطرفه</h3>

                <p className="mt-2 text-sm leading-7 text-app-text-muted">
                  ترجمه متن از فارسی به انگلیسی و از انگلیسی به فارسی.
                </p>
              </div>
            </section>

            {/* Bottom Note */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AiTranslator;
