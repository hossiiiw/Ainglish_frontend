import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const PAGE_SIZE = 20;

const inputClass =
  "w-full rounded-xl border border-app-border bg-app-input px-4 py-3 text-sm outline-none transition focus:border-app-primary focus:ring-4 focus:ring-app-primary/10";

const buttonClass =
  "rounded-xl bg-app-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-app-primary-hover disabled:cursor-not-allowed disabled:opacity-50";

const secondaryButtonClass =
  "rounded-lg border border-app-border px-3 py-2 text-xs font-semibold transition hover:bg-app-background disabled:cursor-not-allowed disabled:opacity-40";

const getErrorMessage = (error) => {
  const detail = error?.data?.detail;

  if (typeof detail === "string") {
    const messages = {
      "User not found": "کاربر موردنظر پیدا نشد.",
      "Word not found": "واژه موردنظر پیدا نشد.",
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

const Pagination = ({ total, offset, limit, onPageChange }) => {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const start = total === 0 ? 0 : offset + 1;
  const end = Math.min(offset + limit, total);

  if (totalPages <= 1) {
    return (
      <div className="border-t border-app-border pt-4">
        <p className="text-xs text-app-text-muted">
          نمایش {formatNumber(start)} تا {formatNumber(end)} از{" "}
          {formatNumber(total)} مورد
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 border-t border-app-border pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-app-text-muted">
        نمایش {formatNumber(start)} تا {formatNumber(end)} از{" "}
        {formatNumber(total)} مورد
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 2)}
          className={secondaryButtonClass}
        >
          قبلی
        </button>

        <span className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-app-primary px-3 text-xs font-bold text-white">
          {formatNumber(currentPage)}
        </span>

        <span className="text-xs text-app-text-muted">
          از {formatNumber(totalPages)}
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
    </div>
  );
};

const AdminDashboard = () => {
  // General state
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState(null);

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

  // All words
  const [words, setWords] = useState([]);
  const [wordsTotal, setWordsTotal] = useState(0);
  const [wordSearch, setWordSearch] = useState("");
  const [wordSearchInput, setWordSearchInput] = useState("");
  const [wordUserId, setWordUserId] = useState("");
  const [wordsOffset, setWordsOffset] = useState(0);
  const [wordsLoading, setWordsLoading] = useState(false);

  // Word editing
  const [editingWord, setEditingWord] = useState(null);
  const [editWordValue, setEditWordValue] = useState("");
  const [editMeaningValue, setEditMeaningValue] = useState("");
  const [savingWord, setSavingWord] = useState(false);

  // Password reset
  const [passwordUserId, setPasswordUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resettingPassword, setResettingPassword] = useState(false);

  const showNotice = (type, message) => {
    setNotice({ type, message });
  };

  const clearNotice = () => {
    setNotice(null);
  };

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

  const handleDeleteUser = async (user) => {
    const confirmed = window.confirm(
      `آیا از حذف حساب کاربری ${user.username} مطمئن هستید؟\nتمام اطلاعات مرتبط با این کاربر نیز ممکن است حذف شوند.`,
    );

    if (!confirmed) return;

    try {
      await api.delete(`/admin/users/${user.id}`);

      showNotice("success", "کاربر با موفقیت حذف شد.");

      if (selectedUser?.id === user.id) {
        setSelectedUser(null);
        setSelectedUserWords([]);
        setSelectedUserWordsTotal(0);
      }

      if (passwordUserId === String(user.id)) {
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

      if (wordSearch.trim()) {
        params.set("search", wordSearch.trim());
      }

      if (wordUserId.trim()) {
        params.set("user_id", wordUserId.trim());
      }

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

      const editedId = editingWord.id;
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
      showNotice("error", "رمز عبور باید حداقل ۸ و حداکثر ۱۲۸ کاراکتر باشد.");
      return;
    }

    setResettingPassword(true);

    try {
      await api.patch(`/admin/users/${userId}/reset-password`, {
        new_password: newPassword,
      });

      showNotice(
        "success",
        "رمز عبور کاربر با موفقیت تغییر کرد. کاربر باید مجدداً وارد حساب شود.",
      );

      setPasswordUserId("");
      setNewPassword("");
    } catch (error) {
      showNotice("error", getErrorMessage(error));
    } finally {
      setResettingPassword(false);
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

            {/* Notifications */}

            {notice && (
              <div
                className={`flex items-center justify-between gap-3 rounded-xl border p-4 text-sm ${
                  notice.type === "success"
                    ? "border-app-success/20 bg-app-success/10 text-app-success"
                    : "border-app-danger/20 bg-app-danger/10 text-app-danger"
                }`}
              >
                <p>{notice.message}</p>

                <button
                  type="button"
                  onClick={clearNotice}
                  className="shrink-0 text-lg"
                  aria-label="بستن پیام"
                >
                  ×
                </button>
              </div>
            )}

            {/* Overview */}

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-app-border bg-app-surface p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-app-text-muted">
                      تعداد کل کاربران
                    </p>

                    <h2 className="mt-3 text-3xl font-black tabular-nums">
                      {loading ? "..." : formatNumber(usersTotal)}
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
                      {loading ? "..." : formatNumber(wordsTotal)}
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
                    {formatNumber(usersTotal)} کاربر
                  </span>
                </div>
              </div>

              <div className="space-y-4 p-5 sm:p-6">
                <form
                  onSubmit={handleUserSearch}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <div className="relative flex-1">
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-app-text-muted">
                      ⌕
                    </span>

                    <input
                      type="text"
                      value={userSearchInput}
                      onChange={(event) =>
                        setUserSearchInput(event.target.value)
                      }
                      placeholder="جستجو با نام کاربری یا ایمیل..."
                      className={`${inputClass} pr-11`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={usersLoading}
                    className={buttonClass}
                  >
                    جستجو
                  </button>
                </form>

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
                      {usersLoading ? (
                        <tr>
                          <td
                            colSpan="6"
                            className="px-5 py-10 text-center text-app-text-muted"
                          >
                            در حال دریافت کاربران...
                          </td>
                        </tr>
                      ) : users.length === 0 ? (
                        <tr>
                          <td
                            colSpan="6"
                            className="px-5 py-10 text-center text-app-text-muted"
                          >
                            کاربری پیدا نشد.
                          </td>
                        </tr>
                      ) : (
                        users.map((user) => (
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
                              {formatNumber(user.words_count)}
                            </td>

                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    fetchUserDetails(user.id);
                                    document
                                      .getElementById("user-details")
                                      ?.scrollIntoView({
                                        behavior: "smooth",
                                      });
                                  }}
                                  className="rounded-lg bg-app-primary/10 px-3 py-2 text-xs font-bold text-app-primary transition hover:bg-app-primary/20"
                                >
                                  واژگان
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteUser(user)}
                                  className="rounded-lg bg-app-danger/10 px-3 py-2 text-xs font-bold text-app-danger transition hover:bg-app-danger/20"
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
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-primary/10 text-xl">
                  👤
                </div>

                <div>
                  <h2 className="font-black">جزئیات کاربر</h2>
                  <p className="mt-1 text-xs text-app-text-muted">
                    اطلاعات کاربر و واژگان ثبت‌شده توسط او
                  </p>
                </div>
              </div>

              {selectedUserLoading ? (
                <p className="py-8 text-center text-sm text-app-text-muted">
                  در حال دریافت اطلاعات کاربر...
                </p>
              ) : selectedUser ? (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl bg-app-background p-4">
                      <p className="text-xs text-app-text-muted">شناسه کاربر</p>
                      <p className="mt-2 font-bold">#{selectedUser.id}</p>
                    </div>

                    <div className="rounded-xl bg-app-background p-4">
                      <p className="text-xs text-app-text-muted">نام کاربری</p>
                      <p className="mt-2 font-bold">{selectedUser.username}</p>
                    </div>

                    <div className="rounded-xl bg-app-background p-4">
                      <p className="text-xs text-app-text-muted">ایمیل</p>
                      <p className="mt-2 break-all text-sm font-bold" dir="ltr">
                        {selectedUser.email}
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

                  <div className="mt-6 overflow-hidden rounded-xl border border-app-border">
                    <div className="flex flex-col justify-between gap-2 border-b border-app-border bg-app-background p-4 sm:flex-row sm:items-center">
                      <h3 className="text-sm font-bold">واژگان این کاربر</h3>

                      <span className="text-xs text-app-text-muted">
                        User ID: {selectedUser.id}
                      </span>
                    </div>

                    <div className="border-b border-app-border p-4">
                      <form
                        onSubmit={handleSelectedUserSearch}
                        className="flex flex-col gap-2 sm:flex-row"
                      >
                        <input
                          type="text"
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
                    </div>

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
                              <p className="break-words font-bold" dir="ltr">
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
                <div className="rounded-xl bg-app-background p-8 text-center">
                  <p className="text-sm text-app-text-muted">
                    برای مشاهده جزئیات و واژگان، یک کاربر را از جدول بالا انتخاب
                    کنید.
                  </p>
                </div>
              )}
            </section>

            {/* Words Management */}

            <section
              id="admin-words"
              className="overflow-hidden rounded-3xl border border-app-border bg-app-surface"
            >
              <div className="border-b border-app-border p-5 sm:p-6">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
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

                  <span className="w-fit rounded-lg bg-app-primary/10 px-3 py-1.5 text-xs font-bold text-app-primary">
                    {formatNumber(wordsTotal)} واژه
                  </span>
                </div>
              </div>

              <div className="space-y-4 p-5 sm:p-6">
                <form
                  onSubmit={handleWordSearch}
                  className="grid grid-cols-1 gap-3 md:grid-cols-3"
                >
                  <input
                    type="text"
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
                      {wordsLoading ? (
                        <tr>
                          <td
                            colSpan="5"
                            className="px-5 py-10 text-center text-app-text-muted"
                          >
                            در حال دریافت واژگان...
                          </td>
                        </tr>
                      ) : words.length === 0 ? (
                        <tr>
                          <td
                            colSpan="5"
                            className="px-5 py-10 text-center text-app-text-muted"
                          >
                            واژه‌ای پیدا نشد.
                          </td>
                        </tr>
                      ) : (
                        words.map((word) => (
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
                                  onClick={() => startWordEdit(word)}
                                  className="rounded-lg bg-app-primary/10 px-3 py-2 text-xs font-bold text-app-primary transition hover:bg-app-primary/20"
                                >
                                  ویرایش
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteWord(word)}
                                  className="rounded-lg bg-app-danger/10 px-3 py-2 text-xs font-bold text-app-danger transition hover:bg-app-danger/20"
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
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-primary/10 text-xl">
                  ✏️
                </div>

                <div>
                  <h2 className="font-black">ویرایش واژه</h2>
                  <p className="mt-1 text-xs text-app-text-muted">
                    تغییر واژه یا معنی آن
                  </p>
                </div>
              </div>

              {editingWord ? (
                <form onSubmit={handleUpdateWord}>
                  <div className="mb-4 flex items-center justify-between rounded-xl bg-app-background p-3">
                    <span className="text-sm text-app-text-muted">
                      در حال ویرایش واژه شماره
                    </span>
                    <span className="font-bold">#{editingWord.id}</span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">واژه انگلیسی</label>

                      <input
                        type="text"
                        dir="ltr"
                        maxLength={10000}
                        value={editWordValue}
                        onChange={(event) =>
                          setEditWordValue(event.target.value)
                        }
                        className={`${inputClass} text-left`}
                        placeholder="New word"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold">معنی فارسی</label>

                      <textarea
                        rows={2}
                        maxLength={10000}
                        value={editMeaningValue}
                        onChange={(event) =>
                          setEditMeaningValue(event.target.value)
                        }
                        placeholder="معنی جدید واژه..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap justify-end gap-3">
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
                <div className="rounded-xl bg-app-background p-6 text-center">
                  <p className="text-sm text-app-text-muted">
                    برای ویرایش، از جدول مدیریت واژگان روی دکمه ویرایش کلیک
                    کنید.
                  </p>
                </div>
              )}
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

              <form onSubmit={handleResetPassword}>
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
                      placeholder="رمز عبور جدید را وارد کنید"
                      className={inputClass}
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
                    type="submit"
                    disabled={resettingPassword}
                    className={buttonClass}
                  >
                    {resettingPassword
                      ? "در حال تغییر رمز..."
                      : "تغییر رمز عبور"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
