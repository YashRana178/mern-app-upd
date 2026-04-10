import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserPage.css";

function UserPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios.get("http://localhost:5000/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => { fetchUsers(); }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (error) { console.log(error); }
  };

  const editUser = async (user) => {
    const newName  = prompt("Enter new name",  user.name);
    const newEmail = prompt("Enter new email", user.email);
    const newAge   = prompt("Enter new age",   user.age);
    try {
      await axios.put(`http://localhost:5000/api/users/${user._id}`, { name: newName, email: newEmail, age: newAge });
      fetchUsers();
    } catch (error) { console.log(error); }
  };

  return (
    <div className="up-page">
      <header className="up-topbar">
        <span className="up-topbar-title">Users</span>
        <button className="up-btn-ghost" onClick={() => navigate("/home")}>Home</button>
      </header>

      <div className="up-content">
        <div className="up-header-row">
          <h2 className="up-heading">User List</h2>
          <span className="up-count">{users.length} users</span>
        </div>

        <div className="up-table-wrap">
          <table className="up-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan="5" className="up-empty">No users found.</td></tr>
              ) : (
                users.map((user, i) => (
                  <tr key={user._id}>
                    <td className="up-num">{i + 1}</td>
                    <td className="up-name">
                      <div className="up-avatar">{user.name?.charAt(0).toUpperCase()}</div>
                      {user.name}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>
                      <button className="up-edit-btn" onClick={() => editUser(user)}>Edit</button>
                      <button className="up-del-btn"  onClick={() => deleteUser(user._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
