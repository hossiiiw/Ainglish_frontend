
function VocabHstory() {
  return (
    <>
      <div className="panel-animation rounded-3xl border border-app-border bg-app-surface p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-extrabold">تاریخچه ترجمه</h2>
            <p className="mt-1 text-xs text-app-text-muted">
              آخرین ترجمه‌های شما
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
          <div className="flex items-center justify-between rounded-2xl bg-app-background p-4">
            <div>
              <p className="font-bold" dir="ltr">
                Artificial Intelligence
              </p>
              <p className="mt-1 text-xs text-app-text-muted">هوش مصنوعی</p>
            </div>
            <span className="text-xs text-app-text-muted">EN → FA</span>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-app-background p-4">
            <div>
              <p className="font-bold" dir="ltr">
                Good morning
              </p>
              <p className="mt-1 text-xs text-app-text-muted">صبح بخیر</p>
            </div>
            <span className="text-xs text-app-text-muted">EN → FA</span>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-app-background p-4">
            <div>
              <p className="font-bold" dir="ltr">
                سلام، حالت چطوره؟
              </p>
              <p className="mt-1 text-xs text-app-text-muted">
                Hello, how are you?
              </p>
            </div>
            <span className="text-xs text-app-text-muted">FA → EN</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default VocabHstory;
