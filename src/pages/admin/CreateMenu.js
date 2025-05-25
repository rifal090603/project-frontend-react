import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMenu } from "../../utils/dsahboard-api"; 
// import "../../styles/dashboard/tambah_menu.css";

const CreateMenu = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    harga: "",
    stock: "",
    category: "Coffee",
    deskripsi: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          formPayload.append(key, formData[key]);
        }
      }

      // Panggil API createMenu untuk mengirim data form ke backend
      await createMenu(formPayload);

      navigate("/dashboard"); 
    } catch (error) {
      console.error("Error creating menu:", error);
      alert("Gagal menambahkan menu");
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Tambah Menu Baru</h1>

      <form onSubmit={handleSubmit} className="form-tambah-menu p-4 rounded shadow">
        {/* Nama Menu */}
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama Menu:
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            className="form-control"
            value={formData.nama}
            onChange={handleChange}
            required
          />
        </div>

        {/* Harga */}
        <div className="mb-3">
          <label htmlFor="harga" className="form-label">
            Harga:
          </label>
          <input
            type="number"
            id="harga"
            name="harga"
            className="form-control"
            value={formData.harga}
            onChange={handleChange}
            required
          />
        </div>

        {/* Stock */}
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Stock:
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            className="form-control"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>

        {/* Kategori */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Kategori:
          </label>
          <select
            id="category"
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Coffee">Coffee</option>
            <option value="Non-Coffee">Non-Coffee</option>
            <option value="Foods">Foods</option>
          </select>
        </div>

        {/* Deskripsi Menu */}
        <div className="mb-3">
          <label htmlFor="deskripsi" className="form-label">
            Deskripsi:
          </label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            className="form-control"
            rows="4"
            placeholder="Tulis deskripsi menu di sini..."
            value={formData.deskripsi}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Gambar Menu */}
        <div className="mb-4">
          <label htmlFor="image" className="form-label">
            Gambar Menu:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>

        {/* Tombol Submit */}
        <div className="text-center">
          <button type="submit" className="btn btn-success">
            Tambah Menu
          </button>
        </div>
      </form>

      <div className="text-center mt-4">
        <button onClick={() => navigate("/dashboard")} className="btn btn-secondary">
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
};

export default CreateMenu;
