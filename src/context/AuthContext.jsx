import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || "";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(() =>
    localStorage.getItem("access_token"),
  );

  const [loading, setLoading] = useState(true);

  // دریافت اطلاعات کاربر
  const fetchCurrentUser = async (accessToken) => {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("دریافت اطلاعات کاربر ناموفق بود");
    }

    return await response.json();
  };

  // ارسال heartbeat
  const sendHeartbeat = async (accessToken) => {
    try {
      await fetch(`${API_URL}/auth/heartbeat`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error("Heartbeat failed:", error);
    }
  };

  // بررسی وضعیت ورود هنگام بارگذاری برنامه
  useEffect(() => {
    const initializeAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await fetchCurrentUser(token);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem("access_token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // ثبت فعالیت کاربر هر ۶۰ ثانیه
  useEffect(() => {
    if (!token || !user) return;

    sendHeartbeat(token);

    const heartbeatInterval = setInterval(() => {
      sendHeartbeat(token);
    }, 60 * 1000);

    return () => {
      clearInterval(heartbeatInterval);
    };
  }, [token, user]);

  // ورود کاربر
  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "ایمیل یا رمز عبور اشتباه است");
    }

    if (!data.access_token) {
      throw new Error("توکن ورود از سرور دریافت نشد");
    }

    localStorage.setItem("access_token", data.access_token);
    setToken(data.access_token);

    try {
      const userData = await fetchCurrentUser(data.access_token);
      setUser(userData);

      return userData;
    } catch (error) {
      localStorage.removeItem("access_token");
      setToken(null);
      setUser(null);
      throw error;
    }
  };

  // خروج کاربر
  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user && !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
