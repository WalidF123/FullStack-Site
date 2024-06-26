import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { deleteUser, fetchUserFromBackend, getUser, updateUser } from "../data/repo";
import Subscription from './Subscription';
 
export default function MyProfile(props) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = getUser();
        if (storedUser && storedUser.userID) {
          const userData = await fetchUserFromBackend(storedUser.userID);
          if (userData) {
            setUser(userData);
            setFormData(userData); // Initialize form data with user data
          } else {
            setError("No user found. Please log in again.");
          }
        } else {
          setError("No user found. Please log in again.");
        }
      } catch (err) {
        setError("Error fetching user data.");
      } finally {
        setLoading(false);
      }
    };
 
    fetchUserData();
  }, []);
 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updated = await updateUser(user.id, formData);
      if (updated) {
        setUser(updated);
        setEditMode(false);
      }
    } catch (error) {
      setError("Error updating user data.");
    }
  };
 
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (confirmed) {
      try {
        const deleted = await deleteUser(user.id);
        if (deleted) {
          window.alert("Your account has been deleted.");
          window.location.href = "/";
        } else {
          window.alert("Error deleting your account. Please try again.");
        }
      } catch (error) {
        setError("Error deleting user data.");
      }
    }
  };
 
  if (loading) {
    return <div>Loading...</div>;
  }
 
  if (error) {
    return <div style={{ color: "#f67280" }}>{error}</div>;
  }
 
  return (
    <div style={{ backgroundColor: "#f5f5f5", padding: "30px", borderRadius: "15px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", border: "1px solid #ccc", maxWidth: "600px", margin: "auto" }}>
      <div style={{ backgroundColor: "#87A96B", padding: "15px", borderRadius: "10px", textAlign: "center", marginBottom: "30px", fontSize: "24px", fontWeight: "bold" }}>{user.username}</div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
        <div style={{ width: "80px", height: "80px", backgroundColor: "#87A96B", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "20px" }}>
          <FaUser size={60} />
        </div>
        <div>
          {user ? (
            <>
              {editMode ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="first_name">First Name:</label>
                    <input type="text" id="first_name" name="first_name" value={formData.first_name || ''} onChange={handleInputChange} placeholder="Enter your first name" style={{ width: "100%", padding: "8px", marginBottom: "15px", borderRadius: "5px" }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="last_name">Last Name:</label>
                    <input type="text" id="last_name" name="last_name" value={formData.last_name || ''} onChange={handleInputChange} placeholder="Enter your last name" style={{ width: "100%", padding: "8px", marginBottom: "15px", borderRadius: "5px" }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email || ''} readOnly placeholder="Enter your email" style={{ width: "100%", padding: "8px", marginBottom: "15px", borderRadius: "5px" }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={formData.username || ''} readOnly placeholder="Enter your username" style={{ width: "100%", padding: "8px", marginBottom: "15px", borderRadius: "5px" }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date_of_birth">Date of Birth:</label>
                    <input type="date" id="date_of_birth" name="date_of_birth" value={formData.date_of_birth || ''} readOnly style={{ width: "100%", padding: "8px", marginBottom: "15px", borderRadius: "5px" }} />
                  </div>
                  <div className="form-group">
                    <label>Date Joined:</label>
                    <input type="text" value={user.date_joined ? new Date(user.date_joined).toLocaleDateString() : ''} readOnly style={{ width: "100%", padding: "8px", marginBottom: "15px", borderRadius: "5px" }} />
                  </div>
                  <div className="form-group" style={{ display: "flex", justifyContent: "space-between" }}>
                    <button type="submit" style={{ backgroundColor: "#8bd8b3", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none" }}>Save</button>
                    <button type="button" onClick={() => setEditMode(false)} style={{ backgroundColor: "#f67280", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none" }}>Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <h2>{user.first_name} {user.last_name}</h2>
                  <p>Email: {user.email}</p>
                  <p>Username: {user.username}</p>
                  <p>Date Of Birth: {new Date(user.date_of_birth).toLocaleDateString('en-GB')}</p>
                  <p>Date Joined: {new Date(user.date_joined).toLocaleDateString()}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
                    <button onClick={() => setEditMode(true)} style={{ backgroundColor: "#87A96B", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none" }}>Edit</button>
                    <button onClick={handleDelete} style={{ backgroundColor: "#f67280", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none" }}>Delete</button>
                  </div>
                </>
              )}
            </>
          ) : (
            <p style={{ color: "#f67280" }}>No user found. Please log in again.</p>
          )}
        </div>
      </div>
      <Subscription />
      <hr />
      {/* Include other components or sections here */}
    </div>
  );
}