import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Category.css";

export default function Category() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    rashi: "",
    name: "",
    place: "",
    email: "",
    number: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/category", form);
    setForm({ rashi: "", name: "", place: "", email: "", number: "" });
    navigate("/categorylistusers");
  };

  return (
    <div className="category-container">
      <h2 className="category-title">Add Category</h2>

      <form className="category-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Rashi</label>
          <input
            name="rashi"
            placeholder="Enter Rashi"
            value={form.rashi}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Place</label>
          <input
            name="place"
            placeholder="Birth Place"
            value={form.place}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Number</label>
          <input
            name="number"
            placeholder="Phone Number"
            value={form.number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-add">Add Entry</button>
          <button type="button" className="btn-view" onClick={() => navigate("/categorylistusers")}>View All</button>
          <button type="button" className="btn-menu" onClick={() => navigate("/home")}>Home</button>
        </div>
      </form>
    </div>
  );
}
