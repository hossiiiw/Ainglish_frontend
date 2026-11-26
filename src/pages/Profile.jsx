import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // دریافت تم ذخیره‌شده
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }

    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  });

  // اعمال تم روی کل پروژه
  useEffect(() => {
    const isDark = theme === "dark";

    document.documentElement.classList.toggle("dark", isDark);

    localStorage.setItem("theme", theme);
  }, [theme]);

  const closeSidebar = () => setSidebarOpen(false);

  const username = user?.username || "کاربر";
  const email = user?.email || "ثبت نشده";
  const phone = user?.phone || "ثبت نشده";
  const avatarLetter = username.charAt(0);

  const isSuperAdmin = user?.role === "super_admin";
  const isAdmin = isSuperAdmin || user?.role === "admin" || user?.is_admin === true;

  const accountTitle = isSuperAdmin
    ? "مدیر ارشد Ainglish"
    : isAdmin
      ? "مدیر Ainglish"
      : "عضو Ainglish";

  const accountType = isSuperAdmin
    ? "مدیر ارشد"
    : isAdmin
      ? "مدیر"
      : "کاربر عادی";

  const isDark = theme === "dark";

  return (
    <main dir="rtl" className="min-h-screen bg-app-background text-app-text">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        {/* Main Content */}
        <div className="min-w-0 flex-1 px-4 py-6 md:px-8 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <DashboardHeader
              onMenuClick={() => setSidebarOpen((prev) => !prev)}
            />

            <div className="space-y-7 pb-12">
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
                  {/* User Identity */}
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-app-primary to-purple-400 text-3xl font-black text-white shadow-lg shadow-app-primary/20">
                      {avatarLetter}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-xl font-black">{username}</h3>

                      <p className="mt-1 text-sm text-app-text-muted">
                        {accountTitle}
                      </p>
                    </div>
                  </div>

                  {/* User Details */}
                  <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-app-background p-4">
                      <p className="mb-2 text-xs font-semibold text-app-text-muted">
                        نام کاربری
                      </p>

                      <p className="text-sm font-bold">{username}</p>
                    </div>

                    <div className="rounded-2xl bg-app-background p-4">
                      <p className="mb-2 text-xs font-semibold text-app-text-muted">
                        ایمیل
                      </p>

                      <p className="break-all text-sm font-bold" dir="ltr">
                        {email}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-app-background p-4">
                      <p className="mb-2 text-xs font-semibold text-app-text-muted">
                        شماره موبایل
                      </p>

                      <p className="text-sm font-bold" dir="ltr">
                        {phone}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-app-background p-4">
                      <p className="mb-2 text-xs font-semibold text-app-text-muted">
                        نوع حساب
                      </p>

                      <span className="inline-flex items-center gap-2 text-sm font-bold text-app-success">
                        <span className="h-2 w-2 rounded-full bg-app-success" />
                        {accountType}
                      </span>
                    </div>
                  </div>
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
                  <div className="flex items-center gap-3 rounded-2xl border-2 border-app-primary bg-app-primary/5 p-4">
                    <span className="text-2xl">🇮🇷</span>

                    <div className="flex-1">
                      <p className="font-bold">فارسی</p>
                      <p className="mt-1 text-xs text-app-text-muted">
                        Persian
                      </p>
                    </div>

                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-app-primary text-xs text-white">
                      ✓
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-app-border bg-app-background p-4 opacity-60">
                    <span className="text-2xl">🇬🇧</span>

                    <div className="flex-1">
                      <p className="font-bold">English</p>
                      <p className="mt-1 text-xs text-app-text-muted">
                        English
                      </p>
                    </div>

                    <span className="text-xs text-app-text-muted">به‌زودی</span>
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
                  <button
                    type="button"
                    onClick={() => setTheme("light")}
                    aria-pressed={!isDark}
                    className={`overflow-hidden rounded-2xl border-2 p-2 text-right transition ${
                      !isDark
                        ? "border-app-primary bg-app-primary/5"
                        : "border-app-border hover:border-app-primary/50"
                    }`}
                  >
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

                      {theme === "light" && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-app-primary text-xs text-white">
                          ✓
                        </span>
                      )}
                    </div>
                  </button>

                  {/* Dark Theme */}
                  <button
                    type="button"
                    onClick={() => setTheme("dark")}
                    aria-pressed={isDark}
                    className={`overflow-hidden rounded-2xl border-2 p-2 text-right transition ${
                      isDark
                        ? "border-app-primary bg-app-primary/5"
                        : "border-app-border hover:border-app-primary/50"
                    }`}
                  >
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

                      {theme === "dark" && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-app-primary text-xs text-white">
                          ✓
                        </span>
                      )}
                    </div>
                  </button>
                </div>

                <p className="mt-4 text-xs text-app-text-muted">
                  تغییر تم بلافاصله روی تمام بخش‌های برنامه اعمال و ذخیره
                  می‌شود.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
