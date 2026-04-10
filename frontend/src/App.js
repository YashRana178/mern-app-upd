import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import SettingsPage from "./pages/SettingsPage";
import Category from "./pages/Category";
import CategoryListUsers from "./pages/CategoryListUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Category: form page */}
        <Route path="/category" element={<Category />} />

        {/* Category: list/table page */}
        <Route path="/categorylistusers" element={<CategoryListUsers />} />

        {/* dashboard after login */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* admin home panel */}
        <Route path="/home" element={<Home />} />

        <Route path="/user" element={<UserPage />} />

        <Route path="/settings" element={<SettingsPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;