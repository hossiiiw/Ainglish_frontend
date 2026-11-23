function Translator() {
  return (
    <div
      id="translator"
      className="panel-animation rounded-3xl border border-app-border bg-app-surface p-5 sm:p-6 xl:col-span-2"
    >
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-app-primary/10 text-xl text-app-primary">
              ✧
            </div>
            <h2 className="text-lg font-extrabold">مترجم هوشمند AI</h2>
          </div>

          <p className="mt-2 text-xs text-app-text-muted">
            ترجمه سریع و دقیق با هوش مصنوعی
          </p>
        </div>

        <span className="rounded-xl bg-app-primary/10 px-3 py-2 text-xs font-semibold text-app-primary">
          ۵ / ۱۰ درخواست امروز
        </span>
      </div>

      {/* Language Selector */}
      <div className="mb-4 flex items-center justify-between rounded-xl bg-app-background p-3">
        <span className="text-sm font-semibold">فارسی</span>

        <button
          type="button"
          className="text-xl text-app-primary transition hover:rotate-180"
          aria-label="تغییر زبان"
        >
          ⇄
        </button>

        <span className="text-sm font-semibold">English</span>
      </div>

      {/* Input */}
      <div>
        <label className="mb-2 block text-sm font-semibold">متن موردنظر</label>

        <textarea
          maxLength={2000}
          className="min-h-36 w-full resize-y rounded-2xl border border-app-border bg-app-input p-4 text-sm text-app-text outline-none transition placeholder:text-app-text-muted focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
          placeholder="کلمه یا جمله مورد نظر خود را وارد کنید..."
        />

        <div className="mt-2 flex justify-between text-xs text-app-text-muted">
          <span>ترجمه دوطرفه فارسی و انگلیسی</span>
          <span>حداکثر ۲۰۰۰ کاراکتر</span>
        </div>
      </div>

      {/* Translate Button */}
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-app-primary px-6 py-3 font-bold text-white shadow-lg shadow-app-primary/20 transition hover:-translate-y-1 hover:bg-app-primary-hover"
        >
          ترجمه کن
          <span>✧</span>
        </button>
      </div>

      {/* Translation Result */}
      <div className="mt-7 border-t border-app-border pt-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-app-success/10 text-app-success">
              ✓
            </div>

            <div>
              <h3 className="font-bold">نتیجه ترجمه</h3>
              <p className="text-xs text-app-text-muted">
                ترجمه انجام‌شده توسط هوش مصنوعی
              </p>
            </div>
          </div>

          <span className="rounded-lg bg-app-success/10 px-3 py-1.5 text-xs font-semibold text-app-success">
            موفق
          </span>
        </div>

        {/* Result Card */}
        <div className="rounded-2xl border border-app-border bg-app-background p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-app-text-muted">
              ترجمه فارسی
            </span>

            <span className="text-xs text-app-primary">AI Translation</span>
          </div>

          <p
            dir="rtl"
            className="text-base font-semibold leading-8 text-app-text"
          >
            یادگیری مداوم یکی از مهم‌ترین عوامل موفقیت در زندگی است.
          </p>

          <div className="my-4 border-t border-app-border" />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-app-text-muted">
              ترجمه تخصصی و روان
            </span>

            <button
              type="button"
              className="text-xs font-semibold text-app-primary transition hover:underline"
            >
              کپی ترجمه
            </button>
          </div>
        </div>

        {/* Add to Vocabulary */}
        <div className="mt-4 flex flex-col justify-between gap-3 rounded-2xl border border-app-primary/20 bg-app-primary/5 p-4 sm:flex-row sm:items-center">
          <div>
            <h4 className="text-sm font-bold">این ترجمه رو ذخیره کن!</h4>

            <p className="mt-1 text-xs leading-6 text-app-text-muted">
              ترجمه رو به واژگان شخصی خودت اضافه کن تا بعداً بهش دسترسی داشته
              باشی.
            </p>
          </div>

          <a
            href="/add-entry"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-app-primary px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-app-primary-hover"
          >
            <span className="text-lg">+</span>
            افزودن به واژگان من
          </a>
        </div>
      </div>
    </div>
  );
}

export default Translator;
