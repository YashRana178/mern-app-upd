import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/login", form);
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={submit}>
        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">Login</button>

        <span className="auth-link">
          Don't have an account? <a href="/">Register</a>
        </span>
      </form>
    </div>
  );
}
