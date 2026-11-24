import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const PAGE_SIZE = 20;

const inputClass =
  "w-full rounded-xl border border-app-border bg-app-input px-4 py-3 text-sm outline-none transition focus:border-app-primary focus:ring-4 focus:ring-app-primary/10";

const buttonClass =
  "rounded-xl bg-app-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-app-primary-hover disabled:cursor-not-allowed disabled:opacity-50";

const secondaryButtonClass =
  "rounded-xl border border-app-border px-4 py-2.5 text-xs font-semibold transition hover:bg-app-background disabled:cursor-not-allowed disabled:opacity-40";

const getErrorMessage = (error) => {
  const detail = error?.data?.detail;

  if (typeof detail === "string") {
    const messages = {
      "User not found": "کاربر موردنظر پیدا نشد.",
      "Word not found": "واژه موردنظر پیدا نشد.",
      "Super admin access required": "فقط مدیر ارشد به این بخش دسترسی دارد.",
      "You cannot delete your own admin account":
        "امکان حذف حساب مدیریت خودتان وجود ندارد.",
      "You cannot delete the last admin account":
        "امکان حذف آخرین حساب مدیر وجود ندارد.",
      "At least one field must be provided":
        "حداقل یکی از فیلدها باید وارد شود.",
      "Word and meaning cannot be empty or null":
        "واژه و معنی نمی‌توانند خالی باشند.",
    };

    return messages[detail] || detail;
  }

  return error?.message || "خطایی رخ داده است. دوباره تلاش کنید.";
};

const formatNumber = (number) =>
  new Intl.NumberFormat("fa-IR").format(number || 0);

const formatDate = (date) => {
  if (!date) return "ثبت نشده";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "نامشخص";

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsedDate);
};

const getRoleLabel = (role) => {
  if (role === "super_admin") return "مدیر ارشد";
  if (role === "admin") return "مدیر";
  return "کاربر";
};

const RoleBadge = ({ role }) => {
  const styles = {
    super_admin: "bg-app-warning/10 text-app-warning",
    admin: "bg-app-primary/10 text-app-primary",
    user: "bg-app-background text-app-text-muted",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-bold ${
        styles[role] || styles.user
      }`}
    >
      {getRoleLabel(role)}
    </span>
  );
};

const OnlineBadge = ({ online }) => (
  <span
    className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-bold ${
      online
        ? "bg-app-success/10 text-app-success"
        : "bg-app-background text-app-text-muted"
    }`}
  >
    <span
      className={`h-2 w-2 rounded-full ${
        online ? "bg-app-success" : "bg-app-text-muted"
      }`}
    />
    {online ? "آنلاین" : "آفلاین"}
  </span>
);

const Pagination = ({ total, offset, limit, onPageChange }) => {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = total === 0 ? 0 : offset + 1;
  const end = Math.min(offset + limit, total);

  return (
    <div className="flex flex-col gap-3 border-t border-app-border pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-app-text-muted">
        نمایش {formatNumber(start)} تا {formatNumber(end)} از{" "}
        {formatNumber(total)} مورد
      </p>

      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 2)}
            className={secondaryButtonClass}
          >
            قبلی
          </button>

          <span className="rounded-lg bg-app-primary px-3 py-2 text-xs font-bold text-white">
            {formatNumber(currentPage)} از {formatNumber(totalPages)}
          </span>

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage)}
            className={secondaryButtonClass}
          >
            بعدی
          </button>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, description, icon }) => (
  <div className="rounded-2xl border border-app-border bg-app-surface p-5 transition hover:border-app-primary/30">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm text-app-text-muted">{title}</p>
        <h3 className="mt-3 text-3xl font-black tabular-nums">{value}</h3>
        <p className="mt-2 text-xs text-app-text-muted">{description}</p>
      </div>

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-app-primary/10 text-2xl">
        {icon}
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { user: currentUser } = useAuth();

  const isSuperAdmin = currentUser?.role === "super_admin";

  // General
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  // Users
  const [users, setUsers] = useState([]);
  const [usersTotal, setUsersTotal] = useState(0);
  const [userSearch, setUserSearch] = useState("");
  const [userSearchInput, setUserSearchInput] = useState("");
  const [usersOffset, setUsersOffset] = useState(0);
  const [usersLoading, setUsersLoading] = useState(false);

  // Selected user
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserWords, setSelectedUserWords] = useState([]);
  const [selectedUserWordsTotal, setSelectedUserWordsTotal] = useState(0);
  const [selectedUserLoading, setSelectedUserLoading] = useState(false);
  const [selectedUserSearch, setSelectedUserSearch] = useState("");
  const [selectedUserOffset, setSelectedUserOffset] = useState(0);

  // Words
  const [words, setWords] = useState([]);
  const [wordsTotal, setWordsTotal] = useState(0);
  const [wordSearch, setWordSearch] = useState("");
  const [wordSearchInput, setWordSearchInput] = useState("");
  const [wordUserId, setWordUserId] = useState("");
  const [wordsOffset, setWordsOffset] = useState(0);
  const [wordsLoading, setWordsLoading] = useState(false);

  // Edit word
  const [editingWord, setEditingWord] = useState(null);
  const [editWordValue, setEditWordValue] = useState("");
  const [editMeaningValue, setEditMeaningValue] = useState("");
  const [savingWord, setSavingWord] = useState(false);

  // Password reset
  const [passwordUserId, setPasswordUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resettingPassword, setResettingPassword] = useState(false);

  // Create manager
  const [managerForm, setManagerForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [creatingManager, setCreatingManager] = useState(false);

  const showNotice = (type, message) => {
    setNotice({ type, message });
  };

  const clearNotice = () => setNotice(null);

  // ---------------- USERS ----------------

  const fetchUsers = useCallback(async () => {
    setUsersLoading(true);

    try {
      const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        offset: String(usersOffset),
      });

      if (userSearch.trim()) {
        params.set("search", userSearch.trim());
      }

      const response = await api.get(`/admin/users?${params.toString()}`);

      setUsers(response.items || []);
      setUsersTotal(response.total || 0);
    } catch (error) {
      showNotice("error", getErrorMessage(error));
    } finally {
      setUsersLoading(false);
      setLoading(false);
    }
  }, [usersOffset, userSearch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUserSearch = (event) => {
    event.preventDefault();
    setUsersOffset(0);
    setUserSearch(userSearchInput.trim());
  };

  const canDeleteUser = (targetUser) => {
    if (targetUser.id === currentUser?.id) return false;
    if (targetUser.role === "super_admin") return false;

    if (!isSuperAdmin && targetUser.role === "admin") {
      return false;
    }

    return true;
  };

  const canResetPassword = (targetUser) => {
    if (targetUser.role === "super_admin") return false;

    if (!isSuperAdmin && targetUser.role === "admin") {
      return false;
    }

    return true;
  };

  const handleDeleteUser = async (targetUser) => {
    if (!canDeleteUser(targetUser)) {
      showNotice("error", "شما اجازه حذف این حساب را ندارید.");
      return;
    }

    const confirmed = window.confirm(
      `آیا از حذف حساب ${targetUser.username} مطمئن هستید؟`,
    );

    if (!confirmed) return;

    try {
      await api.delete(`/admin/users/${targetUser.id}`);

      showNotice("success", "حساب کاربری با موفقیت حذف شد.");

      if (selectedUser?.id === targetUser.id) {
        setSelectedUser(null);
        setSelectedUserWords([]);
        setSelectedUserWordsTotal(0);
      }

      if (passwordUserId === String(targetUser.id)) {
        setPasswordUserId("");
        setNewPassword("");
      }

      if (users.length === 1 && usersOffset > 0) {
        setUsersOffset((prev) => Math.max(0, prev - PAGE_SIZE));
      } else {
        await fetchUsers();
      }

      await fetchWords();
    } catch (error) {
      showNotice("error", getErrorMessage(error));
    }
  };

  // ---------------- USER DETAILS ----------------

  const fetchUserDetails = async (userId) => {
    setSelectedUserLoading(true);
    setSelectedUser(null);
    setSelectedUserWords([]);

    try {
      const [userResponse, wordsResponse] = await Promise.all([
        api.get(`/admin/users/${userId}`),
        api.get(`/admin/users/${userId}/words?limit=${PAGE_SIZE}&offset=0`),
      ]);

      setSelectedUser(userResponse);
      setSelectedUserWords(wordsResponse.items || []);
      setSelectedUserWordsTotal(wordsResponse.total || 0);
      setSelectedUserOffset(0);
      setSelectedUserSearch("");
    } catch (error) {
      showNotice("error", getErrorMessage(error));
    } finally {
      setSelectedUserLoading(false);
    }
  };

  const fetchSelectedUserWords = async (
    userId,
    offset = selectedUserOffset,
    search = selectedUserSearch,
  ) => {
    setSelectedUserLoading(true);

    try {
      const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        offset: String(offset),
      });

      if (search.trim()) {
        params.set("search", search.trim());
      }

      const response = await api.get(
        `/admin/users/${userId}/words?${params.toString()}`,
      );

      setSelectedUserWords(response.items || []);
      setSelectedUserWordsTotal(response.total || 0);
    } catch (error) {
      showNotice("error", getErrorMessage(error));
    } finally {
      setSelectedUserLoading(false);
    }
  };

  const handleSelectedUserSearch = (event) => {
    event.preventDefault();

    if (!selectedUser) return;

    setSelectedUserOffset(0);
    fetchSelectedUserWords(selectedUser.id, 0, selectedUserSearch);
  };

  // ---------------- ALL WORDS ----------------

  const fetchWords = useCallback(async () => {
    setWordsLoading(true);

    try {
      const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        offset: String(wordsOffset),
      });

      if (wordSearch.trim()) params.set("search", wordSearch.trim());
      if (wordUserId.trim()) params.set("user_id", wordUserId.trim());

      const response = await api.get(`/admin/words?${params.toString()}`);

      setWords(response.items || []);
      setWordsTotal(response.total || 0);
    } catch (error) {
      showNotice("error", getErrorMessage(error));
    } finally {
      setWordsLoading(false);
    }
  }, [wordsOffset, wordSearch, wordUserId]);

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  const handleWordSearch = (event) => {
    event.preventDefault();
    setWordsOffset(0);
    setWordSearch(wordSearchInput.trim());
  };

  const handleDeleteWord = async (word) => {
    const confirmed = window.confirm(
      `آیا از حذف واژه «${word.word}» مطمئن هستید؟`,
    );

    if (!confirmed) return;

    try {
      await api.delete(`/admin/words/${word.id}`);

      showNotice("success", "واژه با موفقیت حذف شد.");

      if (editingWord?.id === word.id) {
        cancelWordEdit();
      }

      if (words.length === 1 && wordsOffset > 0) {
        setWordsOffset((prev) => Math.max(0, prev - PAGE_SIZE));
      } else {
        await fetchWords();
      }

      if (selectedUser?.id === word.user_id) {
        await fetchSelectedUserWords(selectedUser.id, selectedUserOffset);
        await fetchUserDetails(selectedUser.id);
      }
    } catch (error) {
      showNotice("error", getErrorMessage(error));
    }
  };

  // ---------------- EDIT WORD ----------------

  const startWordEdit = (word) => {
    setEditingWord(word);
    setEditWordValue(word.word);
    setEditMeaningValue(word.meaning);

    document
      .getElementById("edit-word-section")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const cancelWordEdit = () => {
    setEditingWord(null);
    setEditWordValue("");
    setEditMeaningValue("");
  };

  const handleUpdateWord = async (event) => {
    event.preventDefault();

    if (!editingWord) return;

    if (!editWordValue.trim() || !editMeaningValue.trim()) {
      showNotice("error", "واژه و معنی نمی‌توانند خالی باشند.");
      return;
    }

    setSavingWord(true);

    try {
      await api.patch(`/admin/words/${editingWord.id}`, {
        word: editWordValue.trim(),
        meaning: editMeaningValue.trim(),
      });

      showNotice("success", "واژه با موفقیت ویرایش شد.");

      const editedUserId = editingWord.user_id;
      cancelWordEdit();

      await fetchWords();

      if (selectedUser?.id === editedUserId) {
        await fetchSelectedUserWords(selectedUser.id, selectedUserOffset);
      }
    } catch (error) {
      showNotice("error", getErrorMessage(error));
    } finally {
      setSavingWord(false);
    }
  };

  // ---------------- RESET PASSWORD ----------------

  const handleResetPassword = async (event) => {
    event.preventDefault();

    const userId = Number(passwordUserId);

    if (!userId || !Number.isInteger(userId) || userId < 1) {
      showNotice("error", "شناسه کاربر معتبر نیست.");
      return;
    }

    if (newPassword.length < 8 || newPassword.length > 128) {
      showNotice("error", "رمز عبور باید بین ۸ تا ۱۲۸ کاراکتر باشد.");
      return;
    }

    const targetUser = users.find((item) => item.id === userId);

    if (targetUser && !canResetPassword(targetUser)) {
      showNotice("error", "اجازه تغییر رمز عبور این حساب را ندارید.");
      return;
    }

    setResettingPassword(true);

    try {
      await api.patch(`/admin/users/${userId}/reset-password`, {
        new_password: newPassword,
      });

      showNotice(
        "success",
        "رمز عبور تغییر کرد. کاربر باید مجدداً وارد حساب شود.",
      );

      setPasswordUserId("");
      setNewPassword("");
    } catch (error) {
      showNotice("error", getErrorMessage(error));
    } finally {
      setResettingPassword(false);
    }
  };

  // ---------------- CREATE MANAGER ----------------

  const handleManagerInput = (event) => {
    const { name, value } = event.target;

    setManagerForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateManager = async (event) => {
    event.preventDefault();

    if (!isSuperAdmin) {
      showNotice("error", "فقط مدیر ارشد می‌تواند مدیر جدید بسازد.");
      return;
    }

    const { username, email, phone, password } = managerForm;

    if (username.trim().length < 3) {
      showNotice("error", "نام کاربری باید حداقل ۳ کاراکتر باشد.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      showNotice("error", "آدرس ایمیل معتبر نیست.");
      return;
    }

    if (!/^09\d{9}$/.test(phone.trim())) {
      showNotice("error", "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.");
      return;
    }

    if (password.length < 8 || password.length > 128) {
      showNotice("error", "رمز عبور باید بین ۸ تا ۱۲۸ کاراکتر باشد.");
      return;
    }

    setCreatingManager(true);

    try {
      await api.post("/admin/managers", {
        username: username.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
      });

      showNotice("success", "مدیر جدید با موفقیت ساخته شد.");

      setManagerForm({
        username: "",
        email: "",
        phone: "",
        password: "",
      });

      setUsersOffset(0);
      setUserSearch("");
      setUserSearchInput("");
      await fetchUsers();
    } catch (error) {
      showNotice("error", getErrorMessage(error));
    } finally {
      setCreatingManager(false);
    }
  };

  // ---------------- RENDER ----------------

  return (
    <main dir="rtl" className="min-h-screen bg-app-background text-app-text">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 lg:block">
          <Sidebar />
        </aside>

        <div className="min-w-0 flex-1 px-4 py-6 md:px-8 lg:px-10">
          <DashboardHeader />

          <div className="mx-auto max-w-7xl space-y-8 pb-16">
            {/* Header */}

            <section className="flex flex-col justify-between gap-5 pt-5 sm:flex-row sm:items-center">
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

                <h1 className="text-2xl font-black sm:text-3xl">
                  مرکز مدیریت Ainglish
                </h1>

                <p className="mt-2 text-sm text-app-text-muted">
                  مدیریت کاربران، مدیران و واژگان پلتفرم
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-app-border bg-app-surface px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-app-primary/10 text-xl">
                  {isSuperAdmin ? "👑" : "🛡️"}
                </div>

                <div>
                  <p className="text-sm font-bold">
                    {currentUser?.username || "مدیر"}
                  </p>
                  <p className="mt-1 text-xs text-app-primary">
                    {isSuperAdmin ? "مدیر ارشد" : "مدیر سیستم"}
                  </p>
                </div>
              </div>
            </section>

            {/* Notice */}

            {notice && (
              <div
                className={`flex items-center justify-between gap-3 rounded-2xl border p-4 text-sm ${
                  notice.type === "success"
                    ? "border-app-success/20 bg-app-success/10 text-app-success"
                    : "border-app-danger/20 bg-app-danger/10 text-app-danger"
                }`}
              >
                <p>{notice.message}</p>
                <button
                  type="button"
                  onClick={clearNotice}
                  className="text-xl"
                  aria-label="بستن پیام"
                >
                  ×
                </button>
              </div>
            )}

            {/* Statistics */}

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <StatCard
                title="تعداد کل کاربران"
                value={loading ? "..." : formatNumber(usersTotal)}
                description="حساب‌های ثبت‌نام‌شده"
                icon="👥"
              />

              <StatCard
                title="تعداد کل واژگان"
                value={loading ? "..." : formatNumber(wordsTotal)}
                description="واژه‌های ذخیره‌شده در پلتفرم"
                icon="📚"
              />
            </section>

            {/* Users */}

            <section
              id="admin-users"
              className="overflow-hidden rounded-3xl border border-app-border bg-app-surface"
            >
              <div className="flex flex-col justify-between gap-3 border-b border-app-border p-5 sm:flex-row sm:items-center sm:p-6">
                <div>
                  <h2 className="text-lg font-black">مدیریت کاربران</h2>
                  <p className="mt-1 text-xs text-app-text-muted">
                    اطلاعات حساب‌ها، وضعیت حضور و سطح دسترسی
                  </p>
                </div>

                <span className="w-fit rounded-xl bg-app-primary/10 px-3 py-2 text-xs font-bold text-app-primary">
                  {formatNumber(usersTotal)} حساب
                </span>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                <form
                  onSubmit={handleUserSearch}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <input
                    value={userSearchInput}
                    onChange={(event) => setUserSearchInput(event.target.value)}
                    placeholder="جستجو با نام کاربری، ایمیل یا موبایل..."
                    className={inputClass}
                  />

                  <button
                    type="submit"
                    disabled={usersLoading}
                    className={buttonClass}
                  >
                    {usersLoading ? "..." : "جستجو"}
                  </button>
                </form>

                <div className="overflow-x-auto rounded-2xl border border-app-border">
                  <table className="w-full min-w-[1050px] text-right text-sm">
                    <thead className="bg-app-background text-xs text-app-text-muted">
                      <tr>
                        <th className="px-4 py-4">کاربر</th>
                        <th className="px-4 py-4">اطلاعات تماس</th>
                        <th className="px-4 py-4">نقش</th>
                        <th className="px-4 py-4">وضعیت</th>
                        <th className="px-4 py-4">تاریخ ثبت‌نام</th>
                        <th className="px-4 py-4">واژگان</th>
                        <th className="px-4 py-4">عملیات</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-app-border">
                      {usersLoading ? (
                        <tr>
                          <td
                            colSpan="7"
                            className="p-10 text-center text-app-text-muted"
                          >
                            در حال دریافت اطلاعات کاربران...
                          </td>
                        </tr>
                      ) : users.length === 0 ? (
                        <tr>
                          <td
                            colSpan="7"
                            className="p-10 text-center text-app-text-muted"
                          >
                            کاربری پیدا نشد.
                          </td>
                        </tr>
                      ) : (
                        users.map((item) => (
                          <tr
                            key={item.id}
                            className="transition hover:bg-app-background/70"
                          >
                            <td className="px-4 py-4">
                              <p className="font-bold">{item.username}</p>
                              <p className="mt-1 text-xs text-app-text-muted">
                                شناسه #{item.id}
                              </p>
                            </td>

                            <td className="px-4 py-4">
                              <p dir="ltr" className="text-left text-xs">
                                {item.email}
                              </p>
                              <p
                                dir="ltr"
                                className="mt-2 text-left text-xs text-app-text-muted"
                              >
                                {item.phone || "شماره ثبت نشده"}
                              </p>
                            </td>

                            <td className="px-4 py-4">
                              <RoleBadge role={item.role} />
                            </td>

                            <td className="px-4 py-4">
                              <OnlineBadge online={item.is_online} />
                            </td>

                            <td className="px-4 py-4 text-xs text-app-text-muted">
                              {formatDate(item.created_at)}
                            </td>

                            <td className="px-4 py-4 font-bold tabular-nums">
                              {formatNumber(item.words_count)}
                            </td>

                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    fetchUserDetails(item.id);
                                    document
                                      .getElementById("user-details")
                                      ?.scrollIntoView({ behavior: "smooth" });
                                  }}
                                  className="rounded-lg bg-app-primary/10 px-3 py-2 text-xs font-bold text-app-primary transition hover:bg-app-primary/20"
                                >
                                  جزئیات
                                </button>

                                {canDeleteUser(item) && (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteUser(item)}
                                    className="rounded-lg bg-app-danger/10 px-3 py-2 text-xs font-bold text-app-danger transition hover:bg-app-danger/20"
                                  >
                                    حذف
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <Pagination
                  total={usersTotal}
                  offset={usersOffset}
                  limit={PAGE_SIZE}
                  onPageChange={(page) => setUsersOffset(page * PAGE_SIZE)}
                />
              </div>
            </section>

            {/* User Details */}

            <section
              id="user-details"
              className="rounded-3xl border border-app-border bg-app-surface p-5 sm:p-6"
            >
              <div className="mb-5">
                <h2 className="text-lg font-black">جزئیات حساب کاربر</h2>
                <p className="mt-1 text-xs text-app-text-muted">
                  مشاهده اطلاعات کامل و واژگان کاربر انتخاب‌شده
                </p>
              </div>

              {selectedUserLoading ? (
                <p className="py-8 text-center text-sm text-app-text-muted">
                  در حال دریافت اطلاعات...
                </p>
              ) : selectedUser ? (
                <>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl bg-app-background p-4">
                      <p className="text-xs text-app-text-muted">نام کاربری</p>
                      <p className="mt-2 font-bold">{selectedUser.username}</p>
                    </div>

                    <div className="rounded-xl bg-app-background p-4">
                      <p className="text-xs text-app-text-muted">ایمیل</p>
                      <p
                        dir="ltr"
                        className="mt-2 break-all text-left text-sm font-bold"
                      >
                        {selectedUser.email}
                      </p>
                    </div>

                    <div className="rounded-xl bg-app-background p-4">
                      <p className="text-xs text-app-text-muted">
                        شماره موبایل
                      </p>
                      <p dir="ltr" className="mt-2 text-left font-bold">
                        {selectedUser.phone || "ثبت نشده"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-app-background p-4">
                      <p className="text-xs text-app-text-muted">نقش</p>
                      <div className="mt-2">
                        <RoleBadge role={selectedUser.role} />
                      </div>
                    </div>

                    <div className="rounded-xl bg-app-background p-4">
                      <p className="text-xs text-app-text-muted">وضعیت حضور</p>
                      <div className="mt-2">
                        <OnlineBadge online={selectedUser.is_online} />
                      </div>
                    </div>

                    <div className="rounded-xl bg-app-background p-4">
                      <p className="text-xs text-app-text-muted">
                        تاریخ ثبت‌نام
                      </p>
                      <p className="mt-2 text-sm font-bold">
                        {formatDate(selectedUser.created_at)}
                      </p>
                    </div>

                    <div className="rounded-xl bg-app-background p-4">
                      <p className="text-xs text-app-text-muted">
                        آخرین فعالیت
                      </p>
                      <p className="mt-2 text-sm font-bold">
                        {formatDate(selectedUser.last_seen_at)}
                      </p>
                    </div>

                    <div className="rounded-xl bg-app-background p-4">
                      <p className="text-xs text-app-text-muted">
                        تعداد واژگان
                      </p>
                      <p className="mt-2 font-bold">
                        {formatNumber(selectedUser.words_count)} واژه
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 overflow-hidden rounded-2xl border border-app-border">
                    <div className="border-b border-app-border bg-app-background p-4">
                      <h3 className="font-bold">واژگان ثبت‌شده</h3>
                    </div>

                    <form
                      onSubmit={handleSelectedUserSearch}
                      className="flex flex-col gap-2 border-b border-app-border p-4 sm:flex-row"
                    >
                      <input
                        value={selectedUserSearch}
                        onChange={(event) =>
                          setSelectedUserSearch(event.target.value)
                        }
                        placeholder="جستجو در واژگان این کاربر..."
                        className={inputClass}
                      />
                      <button type="submit" className={buttonClass}>
                        جستجو
                      </button>
                    </form>

                    <div className="divide-y divide-app-border">
                      {selectedUserLoading ? (
                        <p className="p-8 text-center text-sm text-app-text-muted">
                          در حال دریافت واژگان...
                        </p>
                      ) : selectedUserWords.length === 0 ? (
                        <p className="p-8 text-center text-sm text-app-text-muted">
                          واژه‌ای برای نمایش وجود ندارد.
                        </p>
                      ) : (
                        selectedUserWords.map((word) => (
                          <div
                            key={word.id}
                            className="flex flex-wrap items-center justify-between gap-4 p-4"
                          >
                            <div className="min-w-0 flex-1">
                              <p dir="ltr" className="break-words font-bold">
                                {word.word}
                              </p>
                              <p className="mt-1 text-sm text-app-text-muted">
                                {word.meaning}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-xs text-app-text-muted">
                                #{word.id}
                              </span>
                              <button
                                type="button"
                                onClick={() => startWordEdit(word)}
                                className="rounded-lg bg-app-primary/10 px-3 py-2 text-xs font-bold text-app-primary"
                              >
                                ویرایش
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteWord(word)}
                                className="rounded-lg bg-app-danger/10 px-3 py-2 text-xs font-bold text-app-danger"
                              >
                                حذف
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="p-4">
                      <Pagination
                        total={selectedUserWordsTotal}
                        offset={selectedUserOffset}
                        limit={PAGE_SIZE}
                        onPageChange={(page) => {
                          const nextOffset = page * PAGE_SIZE;
                          setSelectedUserOffset(nextOffset);
                          fetchSelectedUserWords(selectedUser.id, nextOffset);
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-xl bg-app-background p-8 text-center text-sm text-app-text-muted">
                  برای مشاهده جزئیات، یک کاربر را از جدول انتخاب کنید.
                </div>
              )}
            </section>

            {/* Words Management */}

            <section
              id="admin-words"
              className="overflow-hidden rounded-3xl border border-app-border bg-app-surface"
            >
              <div className="border-b border-app-border p-5 sm:p-6">
                <h2 className="text-lg font-black">مدیریت واژگان</h2>
                <p className="mt-1 text-xs text-app-text-muted">
                  جستجو، ویرایش و حذف واژگان ذخیره‌شده
                </p>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                <form
                  onSubmit={handleWordSearch}
                  className="grid grid-cols-1 gap-3 md:grid-cols-3"
                >
                  <input
                    value={wordSearchInput}
                    onChange={(event) => setWordSearchInput(event.target.value)}
                    placeholder="جستجوی واژه یا معنی..."
                    className={`${inputClass} md:col-span-2`}
                  />

                  <input
                    type="number"
                    min="1"
                    value={wordUserId}
                    onChange={(event) => setWordUserId(event.target.value)}
                    placeholder="شناسه کاربر (اختیاری)"
                    className={inputClass}
                  />

                  <button
                    type="submit"
                    disabled={wordsLoading}
                    className={`${buttonClass} md:col-span-3`}
                  >
                    جستجوی واژگان
                  </button>
                </form>

                <div className="overflow-x-auto rounded-2xl border border-app-border">
                  <table className="w-full min-w-[680px] text-right text-sm">
                    <thead className="bg-app-background text-xs text-app-text-muted">
                      <tr>
                        <th className="px-4 py-4">شناسه</th>
                        <th className="px-4 py-4">واژه</th>
                        <th className="px-4 py-4">معنی</th>
                        <th className="px-4 py-4">شناسه کاربر</th>
                        <th className="px-4 py-4">عملیات</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-app-border">
                      {wordsLoading ? (
                        <tr>
                          <td
                            colSpan="5"
                            className="p-10 text-center text-app-text-muted"
                          >
                            در حال دریافت واژگان...
                          </td>
                        </tr>
                      ) : words.length === 0 ? (
                        <tr>
                          <td
                            colSpan="5"
                            className="p-10 text-center text-app-text-muted"
                          >
                            واژه‌ای پیدا نشد.
                          </td>
                        </tr>
                      ) : (
                        words.map((word) => (
                          <tr
                            key={word.id}
                            className="hover:bg-app-background/70"
                          >
                            <td className="px-4 py-4 text-app-text-muted">
                              #{word.id}
                            </td>
                            <td dir="ltr" className="px-4 py-4 font-bold">
                              {word.word}
                            </td>
                            <td className="px-4 py-4">{word.meaning}</td>
                            <td className="px-4 py-4 text-app-text-muted">
                              #{word.user_id ?? "-"}
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => startWordEdit(word)}
                                  className="rounded-lg bg-app-primary/10 px-3 py-2 text-xs font-bold text-app-primary"
                                >
                                  ویرایش
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteWord(word)}
                                  className="rounded-lg bg-app-danger/10 px-3 py-2 text-xs font-bold text-app-danger"
                                >
                                  حذف
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <Pagination
                  total={wordsTotal}
                  offset={wordsOffset}
                  limit={PAGE_SIZE}
                  onPageChange={(page) => setWordsOffset(page * PAGE_SIZE)}
                />
              </div>
            </section>

            {/* Edit Word */}

            <section
              id="edit-word-section"
              className="rounded-3xl border border-app-border bg-app-surface p-5 sm:p-6"
            >
              <h2 className="text-lg font-black">ویرایش واژه</h2>
              <p className="mt-1 text-xs text-app-text-muted">
                اصلاح واژه یا معنی آن
              </p>

              {editingWord ? (
                <form onSubmit={handleUpdateWord} className="mt-5 space-y-4">
                  <div className="rounded-xl bg-app-background p-3 text-sm">
                    در حال ویرایش واژه شماره #{editingWord.id}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      dir="ltr"
                      maxLength={10000}
                      value={editWordValue}
                      onChange={(event) => setEditWordValue(event.target.value)}
                      placeholder="English word"
                      className={`${inputClass} text-left`}
                    />

                    <textarea
                      rows={2}
                      maxLength={10000}
                      value={editMeaningValue}
                      onChange={(event) =>
                        setEditMeaningValue(event.target.value)
                      }
                      placeholder="معنی فارسی"
                      className={inputClass}
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={cancelWordEdit}
                      className={secondaryButtonClass}
                    >
                      انصراف
                    </button>
                    <button
                      type="submit"
                      disabled={savingWord}
                      className={buttonClass}
                    >
                      {savingWord ? "در حال ذخیره..." : "ذخیره تغییرات"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="mt-5 rounded-xl bg-app-background p-6 text-center text-sm text-app-text-muted">
                  برای ویرایش، از جدول مدیریت واژگان گزینه ویرایش را انتخاب
                  کنید.
                </div>
              )}
            </section>

            {/* Password Reset */}

            <section className="rounded-3xl border border-app-border bg-app-surface p-5 sm:p-6">
              <h2 className="text-lg font-black">تغییر رمز عبور</h2>
              <p className="mt-1 text-xs text-app-text-muted">
                تعیین رمز عبور جدید برای حساب کاربری
              </p>

              <form onSubmit={handleResetPassword} className="mt-5 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">شناسه کاربر</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={passwordUserId}
                      onChange={(event) =>
                        setPasswordUserId(event.target.value)
                      }
                      placeholder="مثلاً 2"
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold">رمز عبور جدید</label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      maxLength={128}
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      placeholder="رمز عبور جدید"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-app-warning/20 bg-app-warning/5 p-4 text-xs leading-6 text-app-text-muted">
                  {isSuperAdmin
                    ? "مدیر ارشد می‌تواند رمز کاربران عادی و مدیران را تغییر دهد؛ حساب مدیر ارشد قابل تغییر نیست."
                    : "مدیر معمولی فقط می‌تواند رمز کاربران عادی را تغییر دهد و اجازه تغییر رمز مدیران را ندارد."}{" "}
                  پس از تغییر رمز، نشست‌های قبلی کاربر باطل می‌شوند.
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={resettingPassword}
                    className={buttonClass}
                  >
                    {resettingPassword ? "در حال تغییر..." : "تغییر رمز عبور"}
                  </button>
                </div>
              </form>
            </section>

            {/* Create Manager - Super Admin Only */}

            {isSuperAdmin && (
              <section
                id="create-manager"
                className="overflow-hidden rounded-3xl border border-app-primary/20 bg-app-surface"
              >
                <div className="flex items-center gap-4 border-b border-app-border bg-app-primary/5 p-5 sm:p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-app-primary/10 text-2xl">
                    👑
                  </div>

                  <div>
                    <h2 className="text-lg font-black">افزودن مدیر جدید</h2>
                    <p className="mt-1 text-xs text-app-text-muted">
                      این قابلیت فقط در دسترس مدیر ارشد است.
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleCreateManager}
                  className="space-y-5 p-5 sm:p-6"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">نام کاربری</label>
                      <input
                        name="username"
                        value={managerForm.username}
                        onChange={handleManagerInput}
                        minLength={3}
                        maxLength={50}
                        required
                        placeholder="مثلاً manager01"
                        className={inputClass}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold">ایمیل</label>
                      <input
                        type="email"
                        name="email"
                        value={managerForm.email}
                        onChange={handleManagerInput}
                        required
                        placeholder="manager@example.com"
                        dir="ltr"
                        className={inputClass}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold">شماره موبایل</label>
                      <input
                        type="tel"
                        name="phone"
                        value={managerForm.phone}
                        onChange={handleManagerInput}
                        required
                        maxLength={11}
                        minLength={11}
                        pattern="09[0-9]{9}"
                        placeholder="09123456789"
                        dir="ltr"
                        className={inputClass}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold">رمز عبور</label>
                      <input
                        type="password"
                        name="password"
                        value={managerForm.password}
                        onChange={handleManagerInput}
                        required
                        minLength={8}
                        maxLength={128}
                        placeholder="حداقل ۸ کاراکتر"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-app-primary/20 bg-app-primary/5 p-4 text-xs leading-6 text-app-text-muted">
                    حساب ساخته‌شده با نقش «مدیر» ایجاد می‌شود و به امکانات
                    مدیریتی دسترسی خواهد داشت؛ اما نمی‌تواند مدیر دیگری بسازد یا
                    حساب مدیران را حذف و رمز آن‌ها را تغییر دهد.
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={creatingManager}
                      className={buttonClass}
                    >
                      {creatingManager
                        ? "در حال ساخت حساب..."
                        : "ساخت حساب مدیر"}
                    </button>
                  </div>
                </form>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
