
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import AdminRoute from "./AdminRoute";

import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import AiTranslator from "../pages/AiTranslator";
import Vocabulary from "../pages/Vocabulary";
import AddVocabulary from "../pages/AddVocabulary";
import Profile from "../pages/Profile";
import AdminDashboard from "../pages/AdminDashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

function AppRoute() {
  return (
    <Routes>

      {/* صفحات عمومی */}
      <Route path="/" element={<Landing />} />

      {/* صفحات مخصوص کاربران خارج‌شده */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* صفحات مخصوص کاربران واردشده */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-translator" element={<AiTranslator />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/add-vocab" element={<AddVocabulary />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* صفحات مخصوص مدیر */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      {/* صفحه پیدا نشد */}
      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center bg-app-bg text-app-text">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-app-primary">404</h1>
              <p className="mt-3 text-app-muted">
                صفحه موردنظر پیدا نشد
              </p>
            </div>
          </div>
        }
      />

    </Routes>
  );
}

export default AppRoute;
