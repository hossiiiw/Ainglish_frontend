import { Link } from "react-router-dom";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import Sidebar from "../components/Sidebar";

const AddVocabulary = () => {
  return (
    <main dir="rtl" className="min-h-screen bg-app-background text-app-text">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 lg:block">
          <Sidebar />
        </aside>

        <div className="min-w-0 flex-1 px-4 py-6 md:px-8 lg:px-10">
          <DashboardHeader />

          <div className="mx-auto max-w-5xl space-y-7 pb-12">
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
                  <h2 className="text-lg font-black">افزودن با هوش مصنوعی</h2>
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
                  <div className="space-y-2">
                    <label className="text-sm font-bold">متن ورودی</label>

                    <textarea
                      dir="auto"
                      rows="5"
                      placeholder="واژه یا عبارت موردنظرت رو وارد کن..."
                      className="w-full resize-none rounded-2xl border border-app-border bg-app-input p-4 text-sm text-app-text outline-none transition placeholder:text-app-text-muted/60 focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold">ترجمه</label>

                    <div className="flex min-h-[132px] flex-col justify-between rounded-2xl border border-app-primary/30 bg-app-primary/5 p-4">
                      <p className="text-sm leading-7 text-app-text-muted">
                        ترجمه در این قسمت نمایش داده می‌شود...
                      </p>

                      <span className="mt-3 text-xs text-app-primary">
                        نتیجه ترجمه هوش مصنوعی
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-6 text-app-text-muted">
                    ترجمه می‌تواند از انگلیسی به فارسی یا برعکس باشد.
                  </p>

                  <button
                    type="button"
                    className="rounded-xl bg-app-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-app-primary-hover"
                  >
                    ✨ ترجمه با هوش مصنوعی
                  </button>
                </div>

                <div className="flex flex-col gap-3 rounded-xl border border-app-border bg-app-background p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold">
                      ذخیره ترجمه در واژگان من
                    </p>
                    <p className="mt-1 text-xs text-app-text-muted">
                      بعد از دریافت ترجمه، می‌تونی اون رو به لیست واژگانت اضافه
                      کنی.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="shrink-0 rounded-xl border border-app-primary/40 px-5 py-2.5 text-sm font-bold text-app-primary transition hover:bg-app-primary/10"
                  >
                    افزودن به واژگان
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
                  <h2 className="text-lg font-black">افزودن دستی</h2>
                  <p className="mt-1 text-sm text-app-text-muted">
                    واژه و معنی فارسی اون رو وارد کن.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Word */}
                <div className="space-y-2">
                  <label className="text-sm font-bold">
                    واژه یا عبارت انگلیسی
                    <span className="mr-1 text-app-danger">*</span>
                  </label>

                  <input
                    type="text"
                    dir="ltr"
                    maxLength={50}
                    placeholder="مثلاً: Opportunity"
                    className="w-full rounded-xl border border-app-border bg-app-input px-4 py-3.5 text-left text-sm text-app-text outline-none transition placeholder:text-app-text-muted/60 focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
                  />

                  <p className="text-xs text-app-text-muted">
                    حداقل ۲ و حداکثر ۵۰ کاراکتر
                  </p>
                </div>

                {/* Meaning */}
                <div className="space-y-2">
                  <label className="text-sm font-bold">
                    معنی فارسی
                    <span className="mr-1 text-app-danger">*</span>
                  </label>

                  <textarea
                    rows="3"
                    maxLength={200}
                    dir="rtl"
                    placeholder="معنی فارسی واژه یا عبارت رو وارد کن..."
                    className="w-full resize-none rounded-xl border border-app-border bg-app-input px-4 py-3.5 text-sm text-app-text outline-none transition placeholder:text-app-text-muted/60 focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
                  />

                  <p className="text-xs text-app-text-muted">
                    حداقل ۲ و حداکثر ۲۰۰ کاراکتر
                  </p>
                </div>

                {/* Submit */}
                <div className="flex flex-col-reverse gap-3 border-t border-app-border pt-5 sm:flex-row sm:justify-end">
                  <Link
                    href="/vocabulary"
                    className="rounded-xl border border-app-border px-6 py-3 text-center text-sm font-bold transition hover:bg-app-surface-hover"
                  >
                    انصراف
                  </Link>

                  <button
                    type="button"
                    className="rounded-xl bg-app-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-app-primary/20 transition hover:bg-app-primary-hover"
                  >
                    + ذخیره واژه
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddVocabulary;
