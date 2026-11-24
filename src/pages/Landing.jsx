import { Link } from "react-router-dom";
import Header from "../components/Header";

const features = [
  {
    icon: "✧",
    color: "bg-app-primary/10 text-app-primary",
    title: "مترجم هوشمند AI",
    description:
      "ترجمه سریع متن‌های فارسی و انگلیسی با کمک هوش مصنوعی و درک بهتر عبارت‌ها.",
  },
  {
    icon: "▤",
    color: "bg-blue-500/10 text-blue-500",
    title: "واژگان شخصی",
    description:
      "واژه‌ها و جمله‌های موردنیازت را ذخیره کن و همیشه به مجموعه شخصی خودت دسترسی داشته باش.",
  },
  {
    icon: "◷",
    color: "bg-orange-500/10 text-orange-500",
    title: "تاریخچه ترجمه",
    description:
      "به ترجمه‌های قبلی خودت دسترسی داشته باش و هر زمان خواستی آن‌ها را مرور کن.",
  },
  {
    icon: "⊕",
    color: "bg-green-500/10 text-green-500",
    title: "افزودن واژه و جمله",
    description:
      "واژه‌های جدید را به‌صورت دستی یا با کمک مترجم هوشمند به دیکشنری خودت اضافه کن.",
  },
  {
    icon: "◈",
    color: "bg-pink-500/10 text-pink-500",
    title: "محیط شخصی",
    description: "اطلاعات و واژگان خودت را در یک فضای اختصاصی مدیریت کن.",
  },
  {
    icon: "◐",
    color: "bg-yellow-500/10 text-yellow-500",
    title: "تجربه شخصی‌سازی‌شده",
    description:
      "با رابط کاربری روشن و تاریک، تجربه‌ای راحت و متناسب با سلیقه خودت داشته باش.",
  },
];

const steps = [
  {
    number: "۰۱",
    title: "ثبت‌نام کن",
    description: "حساب کاربری خودت را بساز و وارد محیط اختصاصی Ainglish شو.",
  },
  {
    number: "۰۲",
    title: "یاد بگیر و ترجمه کن",
    description:
      "از مترجم هوشمند استفاده کن و واژه‌ها و عبارت‌های جدید یاد بگیر.",
  },
  {
    number: "۰۳",
    title: "پیشرفت کن",
    description:
      "واژگان خودت را ذخیره کن و با مرور مداوم، مهارت زبانت را تقویت کن.",
  },
];

export default function Landing() {
  return (
    <div
      dir="rtl"
      className="min-h-screen overflow-hidden bg-app-background text-app-text"
    >
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:pt-24 lg:px-8 lg:pb-28">
          <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-app-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-app-primary/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
            <div className="landing-fade-up">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-app-primary/20 bg-app-primary/5 px-4 py-2 text-xs font-semibold text-app-primary">
                <span className="h-2 w-2 animate-pulse rounded-full bg-app-primary" />
                تجربه‌ای متفاوت برای یادگیری زبان انگلیسی
              </div>

              <h1 className="max-w-2xl text-4xl font-black leading-[1.7] sm:text-5xl lg:text-6xl">
                انگلیسی رو
                <span className="relative mx-2 inline-block text-app-primary">
                  هوشمندانه
                  <span className="absolute -bottom-1 right-0 h-2 w-full rounded-full bg-app-primary/20" />
                </span>
                یاد بگیر!
              </h1>

              <p className="mt-7 max-w-xl text-base leading-9 text-app-text-muted sm:text-lg">
                با Ainglish فقط ترجمه نکن؛ یاد بگیر و دایره واژگان خودت رو گسترش
                بده. همه ابزارهای موردنیاز برای یادگیری بهتر زبان انگلیسی در یک
                محیط ساده و هوشمند.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  to="/register"
                  className="group flex items-center gap-3 rounded-2xl bg-app-primary px-7 py-4 font-bold text-white shadow-xl shadow-app-primary/25 transition duration-300 hover:-translate-y-1 hover:bg-app-primary-hover"
                >
                  همین حالا شروع کن
                  <span className="transition-transform group-hover:-translate-x-1">
                    ←
                  </span>
                </Link>

                <a
                  href="#features"
                  className="flex items-center gap-2 rounded-2xl border border-app-border bg-app-surface px-6 py-4 font-bold transition hover:border-app-primary hover:text-app-primary"
                >
                  آشنایی با امکانات
                </a>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-app-border pt-7">
                <div>
                  <p className="text-2xl font-black text-app-primary">AI</p>
                  <p className="mt-1 text-xs text-app-text-muted">
                    مترجم هوشمند
                  </p>
                </div>

                <div className="h-10 w-px bg-app-border" />

                <div>
                  <p className="text-2xl font-black">۲۴/۷</p>
                  <p className="mt-1 text-xs text-app-text-muted">
                    همیشه در دسترس
                  </p>
                </div>

                <div className="h-10 w-px bg-app-border" />

                <div>
                  <p className="text-2xl font-black">شخصی</p>
                  <p className="mt-1 text-xs text-app-text-muted">
                    واژگان اختصاصی تو
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="landing-visual relative mx-auto w-full max-w-xl">
              <div className="absolute -right-8 top-10 h-32 w-32 rounded-full bg-app-primary/20 blur-3xl" />

              <div className="relative rounded-[2rem] border border-app-border bg-app-surface p-4 shadow-2xl shadow-app-primary/10 sm:p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-app-primary text-white">
                      ✧
                    </div>
                    <div>
                      <p className="text-sm font-bold">مترجم هوشمند</p>
                      <p className="text-[10px] text-app-text-muted">
                        AI Translator
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-app-success/10 px-3 py-1.5 text-xs font-bold text-app-success">
                    آنلاین
                  </span>
                </div>

                <div className="rounded-2xl border border-app-border bg-app-background p-4 sm:p-5">
                  <div className="mb-4 flex items-center justify-between text-xs text-app-text-muted">
                    <span>English</span>
                    <span>⇄</span>
                    <span>فارسی</span>
                  </div>

                  <p dir="ltr" className="text-lg font-bold sm:text-xl">
                    Never stop learning.
                  </p>

                  <div className="my-5 border-t border-app-border" />

                  <p className="text-base font-bold text-app-primary sm:text-lg">
                    هرگز یادگیری را متوقف نکن.
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-2">
                    <span className="rounded-lg bg-app-primary/10 px-3 py-2 text-xs text-app-primary">
                      ترجمه هوشمند AI
                    </span>
                    <span className="text-xs text-app-text-muted">
                      ✧ Ainglish
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-3 rounded-2xl bg-app-primary/5 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-app-primary text-xl text-white">
                    ✦
                  </div>
                  <div>
                    <p className="text-sm font-bold">نکته یادگیری</p>
                    <p className="mt-1 text-xs leading-6 text-app-text-muted">
                      عبارت Never stop learning یک عبارت انگیزشی برای ادامه دادن
                      مسیر یادگیری است.
                    </p>
                  </div>
                </div>

                <div className="absolute -left-7 top-28 hidden rounded-2xl border border-app-border bg-app-surface p-4 shadow-xl sm:block">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-app-warning">★</span>
                    <span className="text-xs font-bold">واژه جدید</span>
                  </div>
                  <p dir="ltr" className="font-bold">
                    Opportunity
                  </p>
                  <p className="mt-1 text-xs text-app-text-muted">فرصت</p>
                </div>

                <div className="absolute -bottom-8 -right-6 hidden rounded-2xl border border-app-border bg-app-surface p-4 shadow-xl sm:block">
                  <p className="text-xs text-app-text-muted">واژگان شخصی</p>
                  <p className="mt-2 text-lg font-black text-app-primary">
                    My Vocabulary
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-12 -left-8 -z-10 h-40 w-40 rounded-full border border-app-primary/20" />
              <div className="absolute -right-12 -top-12 -z-10 h-32 w-32 rounded-full border border-app-primary/20" />
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="scroll-mt-20 bg-app-surface px-5 py-20 sm:py-24 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <span className="text-sm font-bold text-app-primary">
                امکانات AINGLISH
              </span>
              <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                هر چیزی که برای یادگیری نیاز داری
              </h2>
              <p className="mt-5 leading-8 text-app-text-muted">
                ابزارهای کاربردی برای اینکه مسیر یادگیری زبان انگلیسی ساده‌تر و
                هدفمندتر بشه.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="feature-card rounded-3xl border border-app-border bg-app-background p-7"
                >
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${feature.color}`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-lg font-extrabold">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-8 text-app-text-muted">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="scroll-mt-20 px-5 py-20 sm:py-24 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <span className="text-sm font-bold text-app-primary">
                شروع یادگیری
              </span>
              <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                یادگیری فقط در سه قدم
              </h2>
              <p className="mt-5 leading-8 text-app-text-muted">
                شروع کار با Ainglish ساده‌تر از چیزیه که فکر می‌کنی.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="relative rounded-3xl border border-app-border bg-app-surface p-7 text-center"
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-app-primary text-2xl font-black text-white shadow-lg shadow-app-primary/20">
                    {step.number}
                  </div>
                  <h3 className="mb-3 text-lg font-extrabold">{step.title}</h3>
                  <p className="text-sm leading-8 text-app-text-muted">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Translator CTA */}
        <section id="translator" className="scroll-mt-20 px-5 pb-20 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-l from-app-primary-dark via-app-primary to-[#a78bfa] px-7 py-14 text-center text-white sm:px-12 sm:py-20">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10" />
            <div className="absolute -bottom-32 -left-10 h-80 w-80 rounded-full border border-white/10" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-3xl backdrop-blur">
                ✧
              </div>

              <h2 className="text-3xl font-black leading-relaxed sm:text-4xl">
                آماده‌ای هوشمندانه‌تر یاد بگیری؟
              </h2>

              <p className="mt-5 leading-8 text-white/80">
                همین امروز مسیر یادگیری زبان انگلیسی رو با Ainglish شروع کن.
              </p>

              <Link
                to="/register"
                className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-bold text-app-primary-dark shadow-xl transition duration-300 hover:-translate-y-1"
              >
                ساخت حساب رایگان
                <span>←</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        id="about"
        className="scroll-mt-20 border-t border-app-border bg-app-surface px-5 py-12 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-app-primary text-xl text-white">
                  <img
                    src="./../../public/logo.png.png"
                    alt="Ainglish"
                    className="h-12 w-12 rounded-xl object-contain"
                  />
                </div>
                <h2 className="text-2xl font-black">Ainglish</h2>
              </div>

              <p className="max-w-sm text-sm leading-8 text-app-text-muted">
                Ainglish همراه هوشمند تو برای یادگیری زبان انگلیسی، گسترش دایره
                واژگان و تجربه بهتر ترجمه است.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-5 font-extrabold">دسترسی سریع</h3>

              <div className="flex flex-col gap-3 text-sm text-app-text-muted">
                <a
                  href="#features"
                  className="transition hover:text-app-primary"
                >
                  امکانات
                </a>
                <a
                  href="#how-it-works"
                  className="transition hover:text-app-primary"
                >
                  نحوه استفاده
                </a>
                <a
                  href="#translator"
                  className="transition hover:text-app-primary"
                >
                  مترجم هوشمند
                </a>
                <Link to="/login" className="transition hover:text-app-primary">
                  ورود
                </Link>
                <Link
                  to="/register"
                  className="transition hover:text-app-primary"
                >
                  ثبت‌نام
                </Link>
              </div>
            </div>

            {/* Developer */}
            <div>
              <h3 className="mb-5 font-extrabold">ارتباط با سازنده</h3>

              <p className="text-sm leading-8 text-app-text-muted">
                طراحی و توسعه Ainglish توسط حسین ایمانی انجام شده است.
              </p>

              <div className="mt-5 flex flex-col gap-4">
                <Link
                  to="https://github.com/hossiiiw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-app-text-muted transition hover:text-app-primary"
                >
                  <span className="text-lg">⌘</span>
                  GitHub
                </Link>

                <Link
                  to="https://www.linkedin.com/in/hossein-imani-98a40b1a5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-app-text-muted transition hover:text-app-primary"
                >
                  <span className="text-lg font-bold">in</span>
                  LinkedIn
                </Link>

                <Link
                  to="tel:09338709245"
                  dir="rtl"
                  className="flex items-center gap-3 text-sm text-app-text-muted transition hover:text-app-primary"
                >
                  <span className="text-lg">☎</span>
                  09338709245
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-app-border pt-6 text-center text-xs text-app-text-muted sm:flex-row">
            <p>© 2026 Ainglish. تمام حقوق محفوظ است.</p>
            <p>
              طراحی و توسعه با ❤️ توسط{" "}
              <span className="font-bold text-app-primary">حسین ایمانی</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
