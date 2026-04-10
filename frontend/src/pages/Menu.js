import { useNavigate } from "react-router-dom";
import "./Menu.css";

const menuItems = [
  { label: "Home",          desc: "Admin panel home",        path: "/home" },
  { label: "Dashboard",     desc: "Your profile & overview", path: "/dashboard" },
  { label: "Users",         desc: "Manage all users",        path: "/user" },
  { label: "Category",      desc: "Add category entries",    path: "/category" },
  { label: "Category List", desc: "View all category users", path: "/categorylistusers" },
  { label: "Settings",      desc: "App settings & sections", path: "/settings" },
  { label: "Logout",        desc: "Sign out of your account",path: "/login" },
];

export default function Menu() {
  const navigate = useNavigate();

  return (
    <div className="menu-page">
      <header className="menu-topbar">
        <span className="menu-topbar-title">Admin Panel</span>
        <button className="menu-back-btn" onClick={() => navigate(-1)}>Back</button>
      </header>

      <div className="menu-content">
        <h1 className="menu-heading">Navigation</h1>
        <p className="menu-sub">Where would you like to go?</p>

        <div className="menu-grid">
          {menuItems.map((item) => (
            <div
              key={item.path}
              className={`menu-card ${item.label === "Logout" ? "menu-card-danger" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <div>
                <p className="menu-card-label">{item.label}</p>
                <p className="menu-card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
