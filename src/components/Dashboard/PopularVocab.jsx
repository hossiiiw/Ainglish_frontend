function PopularVocab() {
  return (
    <>
      <div className="panel-animation rounded-3xl border border-app-border bg-app-surface p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-extrabold">واژگان محبوب من</h2>
            <p className="mt-1 text-xs text-app-text-muted">
              آخرین واژه‌های ذخیره‌شده
            </p>
          </div>
          <a
            href="#"
            className="text-sm font-bold text-app-primary transition hover:underline"
          >
            مشاهده همه ←
          </a>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-2xl bg-app-background p-4 transition hover:bg-app-surface-hover">
            <div>
              <p className="font-bold" dir="ltr">
                Technology
              </p>
              <p className="mt-1 text-xs text-app-text-muted">فناوری</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-app-warning">★</span>
              <span className="text-app-text-muted">◖))</span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-app-background p-4 transition hover:bg-app-surface-hover">
            <div>
              <p className="font-bold" dir="ltr">
                Success
              </p>
              <p className="mt-1 text-xs text-app-text-muted">موفقیت</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-app-warning">★</span>
              <span className="text-app-text-muted">◖))</span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-app-background p-4 transition hover:bg-app-surface-hover">
            <div>
              <p className="font-bold" dir="ltr">
                Opportunity
              </p>
              <p className="mt-1 text-xs text-app-text-muted">فرصت</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-app-warning">★</span>
              <span className="text-app-text-muted">◖))</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopularVocab;
