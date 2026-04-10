import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:5000/api/profile", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      setUser(res.data);
    };
    fetchUser();
  }, []);

  if (!user) return (
    <div className="dash-loading">
      <div className="dash-spinner" />
      <p>Loading profile...</p>
    </div>
  );

  return (
    <div className="dash-page">
      <header className="dash-topbar">
        <span className="dash-topbar-title">Dashboard</span>
        <div className="dash-topbar-actions">
          <button className="btn-ghost" onClick={() => navigate("/home")}>Home</button>
          <button className="btn-accent" onClick={() => navigate("/login")}>Logout</button>
        </div>
      </header>

      <div className="dash-content">
        <div className="dash-profile-card">
          <div className="dash-avatar">{user.name?.charAt(0).toUpperCase()}</div>
          <div className="dash-profile-info">
            <h2 className="dash-welcome">Welcome back,</h2>
            <h1 className="dash-name">{user.name}</h1>
          </div>
        </div>

        <div className="dash-grid">
          <div className="dash-info-card">
            <div>
              <p className="info-label">Email</p>
              <p className="info-value">{user.email}</p>
            </div>
          </div>
          <div className="dash-info-card">
            <div>
              <p className="info-label">Age</p>
              <p className="info-value">{user.age}</p>
            </div>
          </div>
        </div>

        <div className="dash-actions">
          <button className="btn-nav-card" onClick={() => navigate("/user")}>Users</button>
          <button className="btn-nav-card" onClick={() => navigate("/category")}>Category</button>
          <button className="btn-nav-card" onClick={() => navigate("/settings")}>Settings</button>
        </div>
      </div>
    </div>
  );
}
