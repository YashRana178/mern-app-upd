import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Users",     path: "/user" },
    { label: "Category",  path: "/category" },
    { label: "Settings",  path: "/settings" },
    { label: "Logout",    path: "/login" },
  ];

  return (
    <div className="home-page">
      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}

      <div className={`sidebar ${open ? "active" : ""}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo">Admin</span>
          <button className="sidebar-close" onClick={() => setOpen(false)}>X</button>
        </div>
        <ul className="sidebar-nav">
          {menuItems.map((item) => (
            <li key={item.path} onClick={() => { navigate(item.path); setOpen(false); }}>
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <header className="home-topbar">
        <button className="menu-toggle" onClick={() => setOpen(true)}>☰ Menu</button>
        <span className="home-topbar-title">Admin Panel</span>
        <button className="btn-nav" onClick={() => navigate("/dashboard")}>Dashboard</button>
      </header>

      <main className="home-hero">
        <div className="hero-badge">Welcome back</div>
        <h1 className="hero-title">Admin Dashboard</h1>
        <p className="hero-sub">Manage your app from one central place.</p>

        <div className="quick-cards">
          {menuItems.filter(i => i.label !== "Logout").map((item) => (
            <div key={item.path} className="quick-card" onClick={() => navigate(item.path)}>
              <span className="quick-label">{item.label}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
