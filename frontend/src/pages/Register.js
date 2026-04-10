import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/register", form);
    alert("Registered!");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={submit}>
        <h2>Register</h2>

        <input
          placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Age"
          onChange={e => setForm({ ...form, age: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">Create Account</button>

        <span className="auth-link">
          Already have an account? <a href="/login">Login</a>
        </span>
      </form>
    </div>
  );
}
