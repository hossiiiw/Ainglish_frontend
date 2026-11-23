import { Link } from "react-router-dom";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import Sidebar from "../components/Sidebar";

const words = [
  {
    word: "Consistent",
    pronunciation: "/kənˈsɪstənt/",
    meaning: "مداوم، پیوسته، باثبات",
    example: "You need to be consistent to improve.",
    translation: "برای پیشرفت باید مداومت داشته باشی.",
    category: "عمومی",
    level: "متوسط",
    status: "یادگرفته‌شده",
    color: "success",
    date: "امروز",
  },
  {
    word: "Allocate",
    pronunciation: "/ˈæləkeɪt/",
    meaning: "اختصاص دادن، تخصیص دادن",
    example: "We allocate time for learning.",
    translation: "ما برای یادگیری زمان اختصاص می‌دهیم.",
    category: "تخصصی",
    level: "پیشرفته",
    status: "در حال یادگیری",
    color: "warning",
    date: "دیروز",
  },
  {
    word: "Opportunity",
    pronunciation: "/ˌɑːpərˈtuːnəti/",
    meaning: "فرصت، موقعیت مناسب",
    example: "This is a great opportunity.",
    translation: "این یک فرصت عالی است.",
    category: "عمومی",
    level: "متوسط",
    status: "یادگرفته‌شده",
    color: "success",
    date: "۲ روز پیش",
  },
  {
    word: "Implement",
    pronunciation: "/ˈɪmplɪment/",
    meaning: "اجرا کردن، پیاده‌سازی کردن",
    example: "We need to implement this feature.",
    translation: "باید این قابلیت را پیاده‌سازی کنیم.",
    category: "برنامه‌نویسی",
    level: "پیشرفته",
    status: "در حال یادگیری",
    color: "warning",
    date: "۳ روز پیش",
  },
  {
    word: "Reliable",
    pronunciation: "/rɪˈlaɪəbl/",
    meaning: "قابل اعتماد، مطمئن",
    example: "We need a reliable solution.",
    translation: "ما به یک راهکار قابل اعتماد نیاز داریم.",
    category: "عمومی",
    level: "متوسط",
    status: "یادگرفته‌شده",
    color: "success",
    date: "۴ روز پیش",
  },
];

const Vocabulary = () => {
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
            <DashboardHeader />

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
                  دایره لغاتت را گسترش بده و پیشرفت خودت را دنبال کن.
                </p>
              </div>

              <Link
                to="/add-vocab"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-app-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-app-primary/20 transition hover:bg-app-primary-hover"
              >
                <span className="text-lg">＋</span>
                افزودن واژه جدید
              </Link>
            </section>

            {/* Statistics */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-app-border bg-app-surface p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-app-text-muted">کل واژگان</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-primary/10 text-xl text-app-primary">
                    ◈
                  </span>
                </div>
                <p className="mt-4 text-3xl font-black">۱۲۸</p>
                <p className="mt-2 text-xs text-app-text-muted">
                  تمام واژه‌های ذخیره‌شده
                </p>
              </div>

              <div className="rounded-2xl border border-app-border bg-app-surface p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-app-text-muted">
                    یادگرفته‌شده
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-success/10 text-xl text-app-success">
                    ✓
                  </span>
                </div>
                <p className="mt-4 text-3xl font-black">۸۶</p>
                <p className="mt-2 text-xs text-app-success">
                  ۶۷٪ از کل واژگان
                </p>
              </div>

              <div className="rounded-2xl border border-app-border bg-app-surface p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-app-text-muted">
                    در حال یادگیری
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-warning/10 text-xl text-app-warning">
                    ◷
                  </span>
                </div>
                <p className="mt-4 text-3xl font-black">۴۲</p>
                <p className="mt-2 text-xs text-app-text-muted">
                  واژگانی که نیاز به تمرین دارند
                </p>
              </div>

              <div className="rounded-2xl border border-app-border bg-app-surface p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-app-text-muted">
                    افزوده‌شده امروز
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-xl text-sky-500">
                    ✦
                  </span>
                </div>
                <p className="mt-4 text-3xl font-black">۵</p>
                <p className="mt-2 text-xs text-app-text-muted">
                  واژه‌های جدید امروز
                </p>
              </div>
            </section>

            {/* Learning Progress */}
            <section className="grid gap-5 xl:grid-cols-3">
              <div className="rounded-2xl border border-app-border bg-app-surface p-6 xl:col-span-2">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-extrabold">پیشرفت یادگیری</h2>
                    <p className="mt-1 text-xs text-app-text-muted">
                      وضعیت کلی واژگان ذخیره‌شده
                    </p>
                  </div>
                  <span className="rounded-full bg-app-success/10 px-3 py-1.5 text-xs font-bold text-app-success">
                    عملکرد خوب
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-5">
                  <div
                    className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background:
                        "conic-gradient(var(--app-success) 0% 67%, var(--app-input) 67% 100%)",
                    }}
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-app-surface text-center">
                      <div>
                        <p className="text-2xl font-black">۶۷٪</p>
                        <p className="text-[10px] text-app-text-muted">
                          یادگیری
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 space-y-4">
                    <div>
                      <div className="mb-2 flex justify-between text-xs">
                        <span className="text-app-text-muted">
                          یادگرفته‌شده
                        </span>
                        <span className="font-bold text-app-success">
                          ۸۶ واژه
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-app-input">
                        <div className="h-full w-[67%] rounded-full bg-app-success" />
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex justify-between text-xs">
                        <span className="text-app-text-muted">
                          در حال یادگیری
                        </span>
                        <span className="font-bold text-app-warning">
                          ۴۲ واژه
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-app-input">
                        <div className="h-full w-[33%] rounded-full bg-app-warning" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#5531a8] p-6 text-white">
                <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

                <div className="relative">
                  <span className="text-3xl">✦</span>
                  <h3 className="mt-4 text-lg font-black">وقت مرور واژگان!</h3>
                  <p className="mt-2 text-sm leading-7 text-white/75">
                    مرور منظم کلمات به تثبیت آن‌ها در حافظه بلندمدت کمک می‌کند.
                  </p>

                  <Link
                    to="/"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#5531a8] transition hover:bg-white/90"
                  >
                    شروع مرور
                    <span>←</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* Vocabulary Section */}
            <section className="space-y-5">
              {/* Section Heading */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-xl font-black">مجموعه واژگان من</h2>
                  <p className="mt-2 text-sm text-app-text-muted">
                    واژه‌ها و اصطلاحاتی که برای یادگیری ذخیره کرده‌ای.
                  </p>
                </div>

                <span className="text-xs font-semibold text-app-text-muted">
                  ۱۲۸ واژه ثبت‌شده
                </span>
              </div>

              {/* Search & Filters */}
              <div className="rounded-2xl border border-app-border bg-app-surface p-4">
                <div className="flex flex-col gap-3 xl:flex-row">
                  <div className="relative min-w-0 flex-1">
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-app-text-muted">
                      ⌕
                    </span>
                    <input
                      type="search"
                      placeholder="جست‌وجوی واژه یا معنی..."
                      className="w-full rounded-xl border border-app-border bg-app-input py-3 pr-11 pl-4 text-sm text-app-text outline-none transition placeholder:text-app-text-muted focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <select className="min-w-32 flex-1 rounded-xl border border-app-border bg-app-input px-3 py-3 text-sm text-app-text outline-none focus:border-app-primary">
                      <option>همه دسته‌ها</option>
                      <option>عمومی</option>
                      <option>تخصصی</option>
                      <option>برنامه‌نویسی</option>
                    </select>

                    <select className="min-w-32 flex-1 rounded-xl border border-app-border bg-app-input px-3 py-3 text-sm text-app-text outline-none focus:border-app-primary">
                      <option>همه سطح‌ها</option>
                      <option>مبتدی</option>
                      <option>متوسط</option>
                      <option>پیشرفته</option>
                    </select>

                    <select className="min-w-32 flex-1 rounded-xl border border-app-border bg-app-input px-3 py-3 text-sm text-app-text outline-none focus:border-app-primary">
                      <option>همه وضعیت‌ها</option>
                      <option>یادگرفته‌شده</option>
                      <option>در حال یادگیری</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Vocabulary Cards */}
              <div className="grid gap-4 xl:grid-cols-2">
                {words.map((item ,index) => (
                  <article
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-app-border bg-app-surface p-5 transition duration-300 hover:-translate-y-1 hover:border-app-primary/50 hover:shadow-xl hover:shadow-app-primary/5 sm:p-6"
                  >
                    {/* Decorative */}
                    <div className="absolute -left-12 -top-12 h-32 w-32 rounded-full bg-app-primary/5 blur-2xl transition group-hover:bg-app-primary/10" />

                    <div className="relative">
                      {/* Card Top */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-lg bg-app-primary/10 px-2.5 py-1 text-[10px] font-bold text-app-primary">
                              {item.category}
                            </span>

                            <span className="text-[10px] text-app-text-muted">
                              {item.date}
                            </span>
                          </div>

                          <h3
                            dir="ltr"
                            className="mt-4 text-2xl font-black tracking-tight text-app-text sm:text-3xl"
                          >
                            {item.word}
                          </h3>

                          <p
                            dir="ltr"
                            className="mt-1 text-xs tracking-wide text-app-text-muted"
                          >
                            {item.pronunciation}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          <span
                            className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${
                              item.color === "success"
                                ? "bg-app-success/10 text-app-success"
                                : "bg-app-warning/10 text-app-warning"
                            }`}
                          >
                            {item.status}
                          </span>

                          <button
                            type="button"
                            aria-label="گزینه‌های واژه"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-app-border text-lg text-app-text-muted transition hover:bg-app-surface-hover hover:text-app-primary"
                          >
                            ⋯
                          </button>
                        </div>
                      </div>

                      {/* Meaning */}
                      <div className="mt-5 rounded-xl bg-app-input/70 p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-app-primary" />
                          <span className="text-[11px] font-bold text-app-text-muted">
                            معنی واژه
                          </span>
                        </div>

                        <p className="text-sm font-bold leading-7 text-app-text">
                          {item.meaning}
                        </p>
                      </div>

                      {/* Example */}
                      <div className="mt-4">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="text-sm text-app-primary">❝</span>
                          <span className="text-[11px] font-bold text-app-text-muted">
                            مثال در جمله
                          </span>
                        </div>

                        <p
                          dir="ltr"
                          className="text-sm font-medium leading-7 text-app-text"
                        >
                          {item.example}
                        </p>

                        <p className="mt-1 text-xs leading-6 text-app-text-muted">
                          {item.translation}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-app-border pt-4">
                        <div className="flex items-center gap-2 text-xs text-app-text-muted">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-app-primary/10 text-app-primary">
                            ◈
                          </span>
                          سطح {item.level}
                        </div>

                        <Link
                          href={`/vocabulary/${encodeURIComponent(item.word)}`}
                          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-app-primary transition hover:bg-app-primary/10"
                        >
                          مشاهده جزئیات
                          <span>←</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-col gap-3 rounded-2xl border border-app-border bg-app-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-app-text-muted">
                  نمایش ۵ واژه از ۱۲۸ واژه
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-lg border border-app-border px-3 py-2 text-xs text-app-text-muted transition hover:bg-app-surface-hover"
                  >
                    قبلی
                  </button>

                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-app-primary text-xs font-bold text-white">
                    ۱
                  </span>

                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-app-border text-xs text-app-text-muted transition hover:bg-app-surface-hover"
                  >
                    ۲
                  </button>

                  <button
                    type="button"
                    className="rounded-lg border border-app-border px-3 py-2 text-xs text-app-text-muted transition hover:bg-app-surface-hover"
                  >
                    بعدی
                  </button>
                </div>
              </div>
            </section>

            {/* Bottom Info */}
            <section className="flex items-start gap-3 rounded-2xl border border-app-primary/20 bg-app-primary/5 p-5">
              <span className="text-xl text-app-primary">ⓘ</span>

              <p className="text-xs leading-7 text-app-text-muted">
                برای یادگیری بهتر، واژه‌های جدید را همراه با مثال ذخیره کن و
                به‌صورت منظم آن‌ها را مرور کن. اطلاعات فعلی این صفحه نمونه
                نمایشی هستند و در مرحله اتصال به API با اطلاعات واقعی کاربر
                جایگزین خواهند شد.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Vocabulary;
