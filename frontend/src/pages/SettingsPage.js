import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SettingsPage.css";

function SettingsPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/api/settings");
    setItems(res.data);
  };

  const updateItem = async (item) => {
    try {
      await axios.put(`http://localhost:5000/api/settings/${item._id}`, item);
      alert("Saved");
      fetchItems();
    } catch (error) {
      alert("Error saving");
    }
  };

  const addItem = async () => {
    await axios.post("http://localhost:5000/api/settings", { title: "", image: "", isActive: false });
    fetchItems();
  };

  const handleImage = (e, index) => {
    const file = e.target.files[0];
    const updated = [...items];
    updated[index].image = URL.createObjectURL(file);
    setItems(updated);
  };

  const toggleStatus = (index) => {
    const updated = [...items];
    updated[index].isActive = !updated[index].isActive;
    setItems(updated);
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/settings/${id}`);
      fetchItems();
    } catch (error) { console.log(error); }
  };

  return (
    <div className="sp-page">
      <header className="sp-topbar">
        <span className="sp-topbar-title">Settings</span>
        <button className="sp-btn-ghost" onClick={() => navigate("/home")}>Home</button>
      </header>

      <div className="sp-content">
        <div className="sp-header-row">
          <h2 className="sp-heading">Admin Settings</h2>
          <div className="sp-header-actions">
            <button className="sp-btn-add" onClick={addItem}>+ Add Section</button>
            <button className="sp-btn-remove" onClick={() => { if (items.length > 0) removeItem(items[items.length - 1]._id); }}>
              - Remove Last
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="sp-empty">No sections yet. Click "+ Add Section" to begin.</div>
        ) : (
          <div className="sp-list">
            {items.map((item, index) => (
              <div className="sp-card" key={item._id}>
                <div className="sp-card-num">{index + 1}</div>
                <div className="sp-card-body">
                  <div className="sp-field">
                    <label>Title</label>
                    <input type="text" value={item.title} placeholder="Section title..."
                      onChange={(e) => { const u = [...items]; u[index].title = e.target.value; setItems(u); }}
                    />
                  </div>
                  <div className="sp-field">
                    <label>Image</label>
                    <input type="file" onChange={(e) => handleImage(e, index)} />
                    {item.image && <img src={item.image} alt="preview" className="sp-preview" />}
                  </div>
                </div>
                <div className="sp-card-right">
                  <div className="sp-toggle-row">
                    <span className="sp-toggle-label">{item.isActive ? "Active" : "Inactive"}</span>
                    <label className="sp-switch">
                      <input type="checkbox" checked={item.isActive} onChange={() => toggleStatus(index)} />
                      <span className="sp-slider" />
                    </label>
                  </div>
                  <button className="sp-btn-save" onClick={() => updateItem(item)}>Save</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsPage;
