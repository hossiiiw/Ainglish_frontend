import { Link } from "react-router-dom";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  return (
    <main dir="rtl" className="min-h-screen bg-app-background text-app-text">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <div className="min-w-0 flex-1 px-4 py-6 md:px-8 lg:px-10">
          <DashboardHeader />

          <div className="mx-auto max-w-5xl space-y-7 pb-12">
            {/* Page Header */}
            <section className="pt-5">
              <div className="mb-3 flex items-center gap-2 text-sm text-app-text-muted">
                <Link
                  to="/dashboard"
                  className="transition hover:text-app-primary"
                >
                  داشبورد
                </Link>
                <span>/</span>
                <span className="text-app-primary">تنظیمات</span>
              </div>

              <h1 className="text-2xl font-black sm:text-3xl">
                تنظیمات حساب کاربری
              </h1>

              <p className="mt-2 text-sm text-app-text-muted">
                اطلاعات حساب و ظاهر برنامه رو مطابق سلیقه خودت تنظیم کن.
              </p>
            </section>

            {/* Profile Information */}
            <section className="overflow-hidden rounded-3xl border border-app-border bg-app-surface">
              <div className="border-b border-app-border p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-primary/10 text-xl text-app-primary">
                    👤
                  </div>

                  <div>
                    <h2 className="font-black">اطلاعات کاربری</h2>
                    <p className="mt-1 text-xs text-app-text-muted">
                      اطلاعات حساب کاربری شما
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-app-primary to-purple-400 text-3xl font-black text-white shadow-lg shadow-app-primary/20">
                    A
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xl font-black">نام کاربر</h3>
                    <p className="mt-1 text-sm text-app-text-muted">
                      عضو Ainglish
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-app-background p-4">
                    <p className="mb-2 text-xs font-semibold text-app-text-muted">
                      نام کاربری
                    </p>
                    <p className="text-sm font-bold">username</p>
                  </div>

                  <div className="rounded-2xl bg-app-background p-4">
                    <p className="mb-2 text-xs font-semibold text-app-text-muted">
                      ایمیل
                    </p>
                    <p className="text-sm font-bold" dir="ltr">
                      user@example.com
                    </p>
                  </div>

                  <div className="rounded-2xl bg-app-background p-4">
                    <p className="mb-2 text-xs font-semibold text-app-text-muted">
                      شماره موبایل
                    </p>
                    <p className="text-sm font-bold" dir="ltr">
                      09123456789
                    </p>
                  </div>

                  <div className="rounded-2xl bg-app-background p-4">
                    <p className="mb-2 text-xs font-semibold text-app-text-muted">
                      وضعیت حساب
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-app-success">
                      <span className="h-2 w-2 rounded-full bg-app-success" />
                      فعال
                    </span>
                  </div>
                </div>

                <p className="mt-5 text-xs leading-6 text-app-text-muted">
                  اطلاعات بالا به صورت نمایشی قرار گرفته‌اند و در مرحله اتصال
                  فرانت‌اند از اطلاعات واقعی کاربر دریافت خواهند شد.
                </p>
              </div>
            </section>

            {/* Language Settings */}
            <section className="rounded-3xl border border-app-border bg-app-surface p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-primary/10 text-xl">
                  🌐
                </div>

                <div>
                  <h2 className="font-black">زبان برنامه</h2>
                  <p className="mt-1 text-xs text-app-text-muted">
                    زبان موردنظر برای نمایش محیط برنامه رو انتخاب کن.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Persian */}
                <div className="flex items-center gap-3 rounded-2xl border-2 border-app-primary bg-app-primary/5 p-4">
                  <span className="text-2xl">🇮🇷</span>

                  <div className="flex-1">
                    <p className="font-bold">فارسی</p>
                    <p className="mt-1 text-xs text-app-text-muted">Persian</p>
                  </div>

                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-app-primary text-xs text-white">
                    ✓
                  </span>
                </div>

                {/* English */}
                <div className="flex items-center gap-3 rounded-2xl border border-app-border bg-app-background p-4 transition hover:border-app-primary/50">
                  <span className="text-2xl">🇬🇧</span>

                  <div className="flex-1">
                    <p className="font-bold">English</p>
                    <p className="mt-1 text-xs text-app-text-muted">English</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Theme Settings */}
            <section className="rounded-3xl border border-app-border bg-app-surface p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-primary/10 text-xl">
                  🎨
                </div>

                <div>
                  <h2 className="font-black">ظاهر برنامه</h2>
                  <p className="mt-1 text-xs text-app-text-muted">
                    تم موردعلاقه خودت رو انتخاب کن.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Light Theme */}
                <div className="overflow-hidden rounded-2xl border-2 border-app-primary p-2">
                  <div className="overflow-hidden rounded-xl border border-[#e4ddf3] bg-[#f8f7fc]">
                    <div className="flex h-8 items-center justify-between border-b border-[#e4ddf3] bg-white px-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#8b5cf6]" />
                        <span className="h-2 w-2 rounded-full bg-[#d8c9f5]" />
                        <span className="h-2 w-2 rounded-full bg-[#ede9fe]" />
                      </div>
                      <div className="h-2 w-12 rounded-full bg-[#e9e3f5]" />
                    </div>

                    <div className="flex gap-2 p-3">
                      <div className="w-1/4 space-y-2 rounded-lg bg-white p-2">
                        <div className="h-3 rounded bg-[#8b5cf6]" />
                        <div className="h-2 rounded bg-[#eeeaf7]" />
                        <div className="h-2 rounded bg-[#eeeaf7]" />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="h-8 rounded-lg bg-[#8b5cf6]" />
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-9 rounded-lg bg-white" />
                          <div className="h-9 rounded-lg bg-white" />
                        </div>
                        <div className="h-8 rounded-lg bg-white" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-2 py-3">
                    <div>
                      <p className="text-sm font-bold">روشن</p>
                      <p className="mt-1 text-xs text-app-text-muted">
                        Light Mode
                      </p>
                    </div>

                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-app-primary text-xs text-white">
                      ✓
                    </span>
                  </div>
                </div>

                {/* Dark Theme */}
                <div className="overflow-hidden rounded-2xl border border-app-border p-2 transition hover:border-app-primary/50">
                  <div className="overflow-hidden rounded-xl border border-[#493c79] bg-[#010026]">
                    <div className="flex h-8 items-center justify-between border-b border-[#493c79] bg-[#221b4d] px-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#8b5cf6]" />
                        <span className="h-2 w-2 rounded-full bg-[#724bda]" />
                        <span className="h-2 w-2 rounded-full bg-[#493c79]" />
                      </div>
                      <div className="h-2 w-12 rounded-full bg-[#493c79]" />
                    </div>

                    <div className="flex gap-2 p-3">
                      <div className="w-1/4 space-y-2 rounded-lg bg-[#221b4d] p-2">
                        <div className="h-3 rounded bg-[#8b5cf6]" />
                        <div className="h-2 rounded bg-[#493c79]" />
                        <div className="h-2 rounded bg-[#493c79]" />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="h-8 rounded-lg bg-[#5531a8]" />
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-9 rounded-lg bg-[#221b4d]" />
                          <div className="h-9 rounded-lg bg-[#221b4d]" />
                        </div>
                        <div className="h-8 rounded-lg bg-[#221b4d]" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-2 py-3">
                    <div>
                      <p className="text-sm font-bold">تاریک</p>
                      <p className="mt-1 text-xs text-app-text-muted">
                        Dark Mode
                      </p>
                    </div>

                    <span className="h-6 w-6 rounded-full border border-app-border" />
                  </div>
                </div>
              </div>
            </section>

            {/* Save */}
            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-xl bg-app-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-app-primary/20 transition hover:bg-app-primary-hover"
              >
                ذخیره تنظیمات
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
