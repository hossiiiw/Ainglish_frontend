import { Link } from "react-router-dom";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import Sidebar from "../components/Sidebar";

const AdminDashboard = () => {
  const users = [
    {
      id: 1,
      username: "hossein",
      email: "hossein@example.com",
      is_admin: true,
      words_count: 24,
    },
    {
      id: 2,
      username: "ali_dev",
      email: "ali@example.com",
      is_admin: false,
      words_count: 18,
    },
    {
      id: 3,
      username: "sara",
      email: "sara@example.com",
      is_admin: false,
      words_count: 32,
    },
    {
      id: 4,
      username: "reza",
      email: "reza@example.com",
      is_admin: false,
      words_count: 9,
    },
  ];

  const words = [
    {
      id: 101,
      word: "Opportunity",
      meaning: "فرصت",
      user_id: 2,
    },
    {
      id: 102,
      word: "Consistent",
      meaning: "پایدار، باثبات",
      user_id: 3,
    },
    {
      id: 103,
      word: "Implement",
      meaning: "پیاده‌سازی کردن",
      user_id: 2,
    },
    {
      id: 104,
      word: "Reliable",
      meaning: "قابل اعتماد",
      user_id: 4,
    },
  ];

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

          <div className="mx-auto max-w-7xl space-y-8 pb-12">
            {/* Header */}
            <section className="flex flex-col justify-between gap-4 pt-5 sm:flex-row sm:items-center">
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm text-app-text-muted">
                  <Link
                    to="/dashboard"
                    className="transition hover:text-app-primary"
                  >
                    داشبورد
                  </Link>
                  <span>/</span>
                  <span className="text-app-primary">مدیریت</span>
                </div>

                <h1 className="text-2xl font-black sm:text-3xl">پنل مدیریت</h1>

                <p className="mt-2 text-sm text-app-text-muted">
                  مدیریت کاربران و واژگان ثبت‌شده در Ainglish
                </p>
              </div>

              <div className="flex w-fit items-center gap-2 rounded-xl border border-app-success/20 bg-app-success/10 px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-app-success" />
                <span className="text-sm font-bold text-app-success">
                  دسترسی مدیر
                </span>
              </div>
            </section>

            {/* Overview */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-app-border bg-app-surface p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-app-text-muted">
                      تعداد کل کاربران
                    </p>
                    <h2 className="mt-3 text-3xl font-black tabular-nums">
                      ۱۲۴
                    </h2>
                    <p className="mt-2 text-xs text-app-text-muted">
                      کاربران ثبت‌نام‌شده
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-app-primary/10 text-2xl">
                    👥
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-app-border bg-app-surface p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-app-text-muted">
                      تعداد کل واژگان
                    </p>
                    <h2 className="mt-3 text-3xl font-black tabular-nums">
                      ۸۶۷
                    </h2>
                    <p className="mt-2 text-xs text-app-text-muted">
                      واژه‌های ثبت‌شده توسط کاربران
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-app-primary/10 text-2xl">
                    📚
                  </div>
                </div>
              </div>
            </section>

            {/* Users Management */}
            <section
              id="admin-users"
              className="overflow-hidden rounded-3xl border border-app-border bg-app-surface"
            >
              <div className="border-b border-app-border p-5 sm:p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-primary/10 text-xl">
                      👥
                    </div>

                    <div>
                      <h2 className="font-black">مدیریت کاربران</h2>
                      <p className="mt-1 text-xs text-app-text-muted">
                        مشاهده، جستجو و مدیریت حساب کاربران
                      </p>
                    </div>
                  </div>

                  <span className="w-fit rounded-lg bg-app-primary/10 px-3 py-1.5 text-xs font-bold text-app-primary">
                    ۱۲۴ کاربر
                  </span>
                </div>
              </div>

              <div className="space-y-4 p-5 sm:p-6">
                {/* User Search */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-app-text-muted">
                      ⌕
                    </span>

                    <input
                      type="text"
                      placeholder="جستجو با نام کاربری یا ایمیل..."
                      className="w-full rounded-xl border border-app-border bg-app-input py-3 pr-11 pl-4 text-sm outline-none transition focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
                    />
                  </div>

                  <button
                    type="button"
                    className="rounded-xl bg-app-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-app-primary-hover"
                  >
                    جستجو
                  </button>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto rounded-xl border border-app-border">
                  <table className="w-full min-w-[760px] text-right text-sm">
                    <thead className="bg-app-background text-xs text-app-text-muted">
                      <tr>
                        <th className="px-5 py-4 font-bold">شناسه</th>
                        <th className="px-5 py-4 font-bold">نام کاربری</th>
                        <th className="px-5 py-4 font-bold">ایمیل</th>
                        <th className="px-5 py-4 font-bold">نقش</th>
                        <th className="px-5 py-4 font-bold">تعداد واژگان</th>
                        <th className="px-5 py-4 font-bold">عملیات</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-app-border">
                      {users.map((user) => (
                        <tr
                          key={user.id}
                          className="transition hover:bg-app-surface-hover/60"
                        >
                          <td className="px-5 py-4 text-app-text-muted">
                            #{user.id}
                          </td>

                          <td className="px-5 py-4 font-bold">
                            {user.username}
                          </td>

                          <td
                            className="px-5 py-4 text-app-text-muted"
                            dir="ltr"
                          >
                            {user.email}
                          </td>

                          <td className="px-5 py-4">
                            {user.is_admin ? (
                              <span className="rounded-lg bg-app-primary/10 px-2.5 py-1 text-xs font-bold text-app-primary">
                                مدیر
                              </span>
                            ) : (
                              <span className="rounded-lg bg-app-background px-2.5 py-1 text-xs font-semibold text-app-text-muted">
                                کاربر
                              </span>
                            )}
                          </td>

                          <td className="px-5 py-4 font-semibold tabular-nums">
                            {user.words_count}
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <Link
                                to="/"
                                className="rounded-lg bg-app-primary/10 px-3 py-2 text-xs font-bold text-app-primary transition hover:bg-app-primary/20"
                              >
                                واژگان
                              </Link>

                              <button
                                type="button"
                                className="rounded-lg bg-app-danger/10 px-3 py-2 text-xs font-bold text-app-danger transition hover:bg-app-danger/20"
                              >
                                حذف
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col gap-3 border-t border-app-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-app-text-muted">
                    نمایش ۱ تا ۴ از ۱۲۴ کاربر
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="rounded-lg border border-app-border px-3 py-2 text-xs text-app-text-muted"
                    >
                      قبلی
                    </button>

                    <span className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-app-primary px-3 text-xs font-bold text-white">
                      ۱
                    </span>

                    <button
                      type="button"
                      className="rounded-lg border border-app-border px-3 py-2 text-xs"
                    >
                      ۲
                    </button>

                    <button
                      type="button"
                      className="rounded-lg border border-app-border px-3 py-2 text-xs"
                    >
                      بعدی
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* User Details */}
            <section className="rounded-3xl border border-app-border bg-app-surface p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-primary/10 text-xl">
                  👤
                </div>

                <div>
                  <h2 className="font-black">جزئیات کاربر</h2>
                  <p className="mt-1 text-xs text-app-text-muted">
                    اطلاعات یک کاربر و واژگان ثبت‌شده توسط او
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-app-background p-4">
                  <p className="text-xs text-app-text-muted">شناسه کاربر</p>
                  <p className="mt-2 font-bold">#2</p>
                </div>

                <div className="rounded-xl bg-app-background p-4">
                  <p className="text-xs text-app-text-muted">نام کاربری</p>
                  <p className="mt-2 font-bold">ali_dev</p>
                </div>

                <div className="rounded-xl bg-app-background p-4">
                  <p className="text-xs text-app-text-muted">تعداد واژگان</p>
                  <p className="mt-2 font-bold">۱۸ واژه</p>
                </div>
              </div>

              <div
                id="user-words"
                className="mt-6 overflow-hidden rounded-xl border border-app-border"
              >
                <div className="flex flex-col justify-between gap-2 border-b border-app-border bg-app-background p-4 sm:flex-row sm:items-center">
                  <h3 className="text-sm font-bold">واژگان این کاربر</h3>

                  <span className="text-xs text-app-text-muted">
                    User ID: 2
                  </span>
                </div>

                <div className="divide-y divide-app-border">
                  <div className="flex items-center justify-between gap-4 p-4">
                    <div>
                      <p className="font-bold" dir="ltr">
                        Opportunity
                      </p>
                      <p className="mt-1 text-sm text-app-text-muted">فرصت</p>
                    </div>
                    <span className="text-xs text-app-text-muted">#101</span>
                  </div>

                  <div className="flex items-center justify-between gap-4 p-4">
                    <div>
                      <p className="font-bold" dir="ltr">
                        Implement
                      </p>
                      <p className="mt-1 text-sm text-app-text-muted">
                        پیاده‌سازی کردن
                      </p>
                    </div>
                    <span className="text-xs text-app-text-muted">#103</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Words Management */}
            <section
              id="admin-words"
              className="overflow-hidden rounded-3xl border border-app-border bg-app-surface"
            >
              <div className="border-b border-app-border p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-primary/10 text-xl">
                    📚
                  </div>

                  <div>
                    <h2 className="font-black">مدیریت واژگان</h2>
                    <p className="mt-1 text-xs text-app-text-muted">
                      مشاهده، جستجو، ویرایش و حذف واژه‌های ثبت‌شده
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-5 sm:p-6">
                {/* Word Search */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <input
                    type="text"
                    placeholder="جستجوی واژه یا معنی..."
                    className="rounded-xl border border-app-border bg-app-input px-4 py-3 text-sm outline-none transition focus:border-app-primary focus:ring-4 focus:ring-app-primary/10 md:col-span-2"
                  />

                  <input
                    type="number"
                    placeholder="شناسه کاربر (اختیاری)"
                    className="rounded-xl border border-app-border bg-app-input px-4 py-3 text-sm outline-none transition focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
                  />
                </div>

                <button
                  type="button"
                  className="rounded-xl bg-app-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-app-primary-hover"
                >
                  جستجوی واژگان
                </button>

                {/* Words Table */}
                <div className="overflow-x-auto rounded-xl border border-app-border">
                  <table className="w-full min-w-[680px] text-right text-sm">
                    <thead className="bg-app-background text-xs text-app-text-muted">
                      <tr>
                        <th className="px-5 py-4 font-bold">شناسه</th>
                        <th className="px-5 py-4 font-bold">واژه</th>
                        <th className="px-5 py-4 font-bold">معنی</th>
                        <th className="px-5 py-4 font-bold">شناسه کاربر</th>
                        <th className="px-5 py-4 font-bold">عملیات</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-app-border">
                      {words.map((word) => (
                        <tr
                          key={word.id}
                          className="transition hover:bg-app-surface-hover/60"
                        >
                          <td className="px-5 py-4 text-app-text-muted">
                            #{word.id}
                          </td>

                          <td className="px-5 py-4 font-bold" dir="ltr">
                            {word.word}
                          </td>

                          <td className="px-5 py-4">{word.meaning}</td>

                          <td className="px-5 py-4 text-app-text-muted">
                            #{word.user_id ?? "-"}
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                className="rounded-lg bg-app-primary/10 px-3 py-2 text-xs font-bold text-app-primary transition hover:bg-app-primary/20"
                              >
                                ویرایش
                              </button>

                              <button
                                type="button"
                                className="rounded-lg bg-app-danger/10 px-3 py-2 text-xs font-bold text-app-danger transition hover:bg-app-danger/20"
                              >
                                حذف
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col gap-3 border-t border-app-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-app-text-muted">
                    نمایش ۱ تا ۴ از ۸۶۷ واژه
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="rounded-lg border border-app-border px-3 py-2 text-xs text-app-text-muted"
                    >
                      قبلی
                    </button>

                    <span className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-app-primary px-3 text-xs font-bold text-white">
                      ۱
                    </span>

                    <button
                      type="button"
                      className="rounded-lg border border-app-border px-3 py-2 text-xs"
                    >
                      ۲
                    </button>

                    <button
                      type="button"
                      className="rounded-lg border border-app-border px-3 py-2 text-xs"
                    >
                      بعدی
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Edit Word */}
            <section className="rounded-3xl border border-app-border bg-app-surface p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-primary/10 text-xl">
                  ✏️
                </div>

                <div>
                  <h2 className="font-black">ویرایش واژه</h2>
                  <p className="mt-1 text-xs text-app-text-muted">
                    تغییر واژه یا معنی آن با استفاده از شناسه واژه
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold">شناسه واژه</label>
                  <input
                    type="number"
                    placeholder="مثلاً 101"
                    className="w-full rounded-xl border border-app-border bg-app-input px-4 py-3 text-sm outline-none transition focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold">واژه انگلیسی جدید</label>
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="New word"
                    className="w-full rounded-xl border border-app-border bg-app-input px-4 py-3 text-left text-sm outline-none transition focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-bold">معنی فارسی جدید</label>
                  <textarea
                    rows="2"
                    placeholder="معنی جدید واژه..."
                    className="w-full resize-none rounded-xl border border-app-border bg-app-input px-4 py-3 text-sm outline-none transition focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  className="rounded-xl bg-app-primary px-7 py-3 text-sm font-bold text-white transition hover:bg-app-primary-hover"
                >
                  ذخیره تغییرات واژه
                </button>
              </div>
            </section>

            {/* Reset Password */}
            <section className="rounded-3xl border border-app-border bg-app-surface p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-warning/10 text-xl">
                  🔑
                </div>

                <div>
                  <h2 className="font-black">تغییر رمز عبور کاربر</h2>
                  <p className="mt-1 text-xs text-app-text-muted">
                    تعیین رمز عبور جدید برای حساب یک کاربر
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold">شناسه کاربر</label>
                  <input
                    type="number"
                    placeholder="مثلاً 2"
                    className="w-full rounded-xl border border-app-border bg-app-input px-4 py-3 text-sm outline-none transition focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold">رمز عبور جدید</label>
                  <input
                    type="password"
                    placeholder="رمز عبور جدید را وارد کن"
                    className="w-full rounded-xl border border-app-border bg-app-input px-4 py-3 text-sm outline-none transition focus:border-app-primary focus:ring-4 focus:ring-app-primary/10"
                  />
                  <p className="text-xs text-app-text-muted">
                    حداقل ۸ و حداکثر ۱۲۸ کاراکتر
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-app-warning/20 bg-app-warning/5 p-4">
                <p className="text-xs leading-6 text-app-text-muted">
                  با تغییر رمز عبور، توکن‌های ورود قبلی کاربر اعتبار خود را از
                  دست می‌دهند و کاربر باید مجدداً وارد حساب شود.
                </p>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  className="rounded-xl bg-app-primary px-7 py-3 text-sm font-bold text-white transition hover:bg-app-primary-hover"
                >
                  تغییر رمز عبور
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
