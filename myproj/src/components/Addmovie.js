import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminUpload = () => {
  const [formData, setFormData] = useState({
    title: '',
    language: '',
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("title", formData.title);
    uploadData.append("language", formData.language);
    uploadData.append("image", formData.image);

    try {
      const res = await fetch("http://localhost:8080/api/admin/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: uploadData,
      });

      if (!res.ok) throw new Error(await res.text());
      alert(await res.text());
    } catch (err) {
      alert("Upload failed: " + err.message);
    }
  };

  return (
    <div className="admin-upload-container blue-theme">
      <div className="upload-card">
        <h2 className="upload-title">🎬 Upload New Movie</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <input
            type="text"
            name="title"
            placeholder="Movie Title"
            onChange={handleChange}
            required
            className="upload-input"
          />
          <input
            type="text"
            name="language"
            placeholder="Language"
            onChange={handleChange}
            required
            className="upload-input"
          />
          <div className="file-section">
            <label className="file-label">Upload Image:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="upload-file"
            />
          </div>
          <button type="submit" className="upload-button">➕ Add Movie</button>
        </form>
        <button onClick={() => navigate('/AdminHome')} className="back-button">
          ⬅ Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AdminUpload;
