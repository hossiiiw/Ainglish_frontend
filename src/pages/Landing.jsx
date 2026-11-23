import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Landing() {
  return (
    <div
      dir="rtl"
      className="min-h-screen overflow-hidden bg-app-background text-app-text"
    >
      {/* Navbar */}
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:pt-24 lg:px-8 lg:pb-28">
          {/* Background Decorations */}
          <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-app-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-app-primary/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
            {/* Hero Content */}
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
                با Ainglish فقط ترجمه نکن؛ یاد بگیر، تمرین کن و دایره واژگان
                خودت رو گسترش بده. همه ابزارهای موردنیاز برای یادگیری بهتر زبان
                انگلیسی در یک محیط ساده و هوشمند.
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

                <Link
                  to="/"
                  className="flex items-center gap-2 rounded-2xl border border-app-border bg-app-surface px-6 py-4 font-bold transition hover:border-app-primary hover:text-app-primary"
                >
                  آشنایی با امکانات
                  <span>⌄</span>
                </Link>
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
                {/* Fake App Header */}
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

                {/* Translation Box */}
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

                  <div className="mt-5 flex items-center justify-between">
                    <span className="rounded-lg bg-app-primary/10 px-3 py-2 text-xs text-app-primary">
                      ترجمه هوشمند AI
                    </span>
                    <span className="text-xs text-app-text-muted">
                      ✧ Ainglish
                    </span>
                  </div>
                </div>

                {/* AI Message */}
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

                {/* Floating Vocabulary Card */}
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

                {/* Floating Progress Card */}
                <div className="absolute -bottom-8 -right-6 hidden rounded-2xl border border-app-border bg-app-surface p-4 shadow-xl sm:block">
                  <p className="text-xs text-app-text-muted">پیشرفت یادگیری</p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-2 w-28 overflow-hidden rounded-full bg-app-border">
                      <div className="h-full w-3/4 rounded-full bg-app-primary" />
                    </div>
                    <span className="text-xs font-bold text-app-primary">
                      ۷۵٪
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-12 -left-8 -z-10 h-40 w-40 rounded-full border border-app-primary/20" />
              <div className="absolute -right-12 -top-12 -z-10 h-32 w-32 rounded-full border border-app-primary/20" />
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="bg-app-surface py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
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
              {/* Feature 1 */}
              <div className="feature-card rounded-3xl border border-app-border bg-app-background p-7">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-app-primary/10 text-3xl text-app-primary">
                  ✧
                </div>
                <h3 className="mb-3 text-lg font-extrabold">مترجم هوشمند AI</h3>
                <p className="text-sm leading-8 text-app-text-muted">
                  ترجمه سریع متن‌های فارسی و انگلیسی با کمک هوش مصنوعی و درک
                  بهتر عبارت‌ها.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="feature-card rounded-3xl border border-app-border bg-app-background p-7">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-3xl text-blue-500">
                  ▤
                </div>
                <h3 className="mb-3 text-lg font-extrabold">واژگان شخصی</h3>
                <p className="text-sm leading-8 text-app-text-muted">
                  واژه‌ها و جمله‌های موردعلاقه‌ات رو ذخیره کن و همیشه به مجموعه
                  شخصی خودت دسترسی داشته باش.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="feature-card rounded-3xl border border-app-border bg-app-background p-7">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-3xl text-orange-500">
                  ◷
                </div>
                <h3 className="mb-3 text-lg font-extrabold">تاریخچه ترجمه</h3>
                <p className="text-sm leading-8 text-app-text-muted">
                  به ترجمه‌های قبلی خودت دسترسی داشته باش و هر زمان خواستی آن‌ها
                  رو مرور کن.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="feature-card rounded-3xl border border-app-border bg-app-background p-7">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 text-3xl text-green-500">
                  ⊕
                </div>
                <h3 className="mb-3 text-lg font-extrabold">
                  افزودن واژه و جمله
                </h3>
                <p className="text-sm leading-8 text-app-text-muted">
                  واژه‌های جدید رو به‌صورت دستی یا با کمک مترجم هوشمند به
                  دیکشنری خودت اضافه کن.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="feature-card rounded-3xl border border-app-border bg-app-background p-7">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10 text-3xl text-pink-500">
                  ◈
                </div>
                <h3 className="mb-3 text-lg font-extrabold">محیط شخصی</h3>
                <p className="text-sm leading-8 text-app-text-muted">
                  اطلاعات، واژگان و فعالیت‌های یادگیری خودت رو در یک فضای
                  اختصاصی مدیریت کن.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="feature-card rounded-3xl border border-app-border bg-app-background p-7">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10 text-3xl text-yellow-500">
                  ◐
                </div>
                <h3 className="mb-3 text-lg font-extrabold">
                  تجربه شخصی‌سازی‌شده
                </h3>
                <p className="text-sm leading-8 text-app-text-muted">
                  با رابط کاربری روشن و تاریک، تجربه‌ای راحت و متناسب با سلیقه
                  خودت داشته باش.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="px-5 py-20 sm:py-24 lg:px-8">
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
              <div className="relative rounded-3xl border border-app-border bg-app-surface p-7 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-app-primary text-2xl font-black text-white shadow-lg shadow-app-primary/20">
                  ۰۱
                </div>
                <h3 className="mb-3 text-lg font-extrabold">ثبت‌نام کن</h3>
                <p className="text-sm leading-8 text-app-text-muted">
                  حساب کاربری خودت رو بساز و وارد محیط اختصاصی Ainglish شو.
                </p>
              </div>

              <div className="relative rounded-3xl border border-app-border bg-app-surface p-7 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-app-primary text-2xl font-black text-white shadow-lg shadow-app-primary/20">
                  ۰۲
                </div>
                <h3 className="mb-3 text-lg font-extrabold">
                  یاد بگیر و ترجمه کن
                </h3>
                <p className="text-sm leading-8 text-app-text-muted">
                  از مترجم هوشمند استفاده کن و واژه‌ها و عبارت‌های جدید یاد
                  بگیر.
                </p>
              </div>

              <div className="relative rounded-3xl border border-app-border bg-app-surface p-7 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-app-primary text-2xl font-black text-white shadow-lg shadow-app-primary/20">
                  ۰۳
                </div>
                <h3 className="mb-3 text-lg font-extrabold">پیشرفت کن</h3>
                <p className="text-sm leading-8 text-app-text-muted">
                  واژگان خودت رو ذخیره کن و با مرور مداوم، مهارت زبانت رو تقویت
                  کن.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Translator CTA */}
        <section id="translator" className="px-5 pb-20 lg:px-8">
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
        className="border-t border-app-border bg-app-surface px-5 py-12 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-app-primary text-xl text-white">
                  ▤
                </div>
                <h2 className="text-2xl font-black">Ainglish</h2>
              </div>

              <p className="max-w-sm text-sm leading-8 text-app-text-muted">
                Ainglish همراه هوشمند تو برای یادگیری زبان انگلیسی، گسترش دایره
                واژگان و تجربه بهتر ترجمه است.
              </p>
            </div>

            <div>
              <h3 className="mb-5 font-extrabold">دسترسی سریع</h3>
              <div className="flex flex-col gap-3 text-sm text-app-text-muted">
                <Link
                  to="#features"
                  className="transition hover:text-app-primary"
                >
                  امکانات
                </Link>
                <Link
                  href="#how-it-works"
                  className="transition hover:text-app-primary"
                >
                  نحوه استفاده
                </Link>
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

            <div>
              <h3 className="mb-5 font-extrabold">شروع یادگیری</h3>
              <p className="text-sm leading-8 text-app-text-muted">
                قدم اول رو بردار و یادگیری زبان انگلیسی رو به یک عادت روزانه
                تبدیل کن.
              </p>
              <Link
                to="/register"
                className="mt-4 inline-block font-bold text-app-primary hover:underline"
              >
                شروع رایگان ←
              </Link>
            </div>
          </div>

          <div className="mt-12 border-t border-app-border pt-6 text-center text-xs text-app-text-muted">
            © 2026 Ainglish. تمام حقوق محفوظ است.
          </div>
        </div>
      </footer>
    </div>
  );
}
