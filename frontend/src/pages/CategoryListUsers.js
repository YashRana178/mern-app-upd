import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Category.css";

export default function CategoryListUsers() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    rashi: "", name: "", place: "", email: "", number: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/category");
    setData(res.data);
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditForm({ rashi: item.rashi, name: item.name, place: item.place, email: item.email, number: item.number });
  };

  const handleUpdate = async (id) => {
    await axios.put(`http://localhost:5000/api/category/${id}`, editForm);
    setEditId(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this entry?")) {
      await axios.delete(`http://localhost:5000/api/category/${id}`);
      fetchData();
    }
  };

  return (
    <div className="category-container">
      <div className="list-header">
        <h2 className="category-title">Category Users</h2>
        <div className="header-actions">
          <button className="btn-add" onClick={() => navigate("/category")}>+ Add New</button>
          <button className="btn-menu" onClick={() => navigate("/home")}>Home</button>
        </div>
      </div>

      {data.length === 0 ? (
        <p className="empty-msg">No entries yet. <span onClick={() => navigate("/category")}>Add one →</span></p>
      ) : (
        <div className="table-wrapper">
          <table className="category-table">
            <thead>
              <tr>
                <th>Rashi</th>
                <th>Name</th>
                <th>Place</th>
                <th>Email</th>
                <th>Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) =>
                editId === item._id ? (
                  <tr key={item._id} className="edit-row">
                    <td><input value={editForm.rashi} onChange={e => setEditForm({...editForm, rashi: e.target.value})} /></td>
                    <td><input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} /></td>
                    <td><input value={editForm.place} onChange={e => setEditForm({...editForm, place: e.target.value})} /></td>
                    <td><input value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} /></td>
                    <td><input value={editForm.number} onChange={e => setEditForm({...editForm, number: e.target.value})} /></td>
                    <td>
                      <button className="btn-save" onClick={() => handleUpdate(item._id)}>Save</button>
                      <button className="btn-cancel" onClick={() => setEditId(null)}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={item._id}>
                    <td>{item.rashi}</td>
                    <td>{item.name}</td>
                    <td>{item.place}</td>
                    <td>{item.email}</td>
                    <td>{item.number}</td>
                    <td>
                      <button className="btn-edit" onClick={() => handleEdit(item)}>Edit</button>
                      <button className="btn-delete" onClick={() => handleDelete(item._id)}>Delete</button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
