import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import AiTranslator from "../pages/AiTranslator";
import Vocabulary from "../pages/Vocabulary";
import AddVocabulary from "../pages/AddVocabulary ";
import Profile from "../pages/Profile";
import AdminDashboard from "../pages/AdminDashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

function AppRoute() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}></Route>

      <Route element={<PublicRoute />}>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-translator" element={<AiTranslator />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="add-vocab" element={<AddVocabulary />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default AppRoute;
