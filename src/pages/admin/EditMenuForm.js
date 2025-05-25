import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getMenus, updateMenu } from "../../utils/dsahboard-api";

const EditMenuForm = () => {
  const { menuId } = useParams();
  const navigate = useNavigate();

  const [menu, setMenu] = useState({
    nama: "",
    harga: "",
    stock: "",
    category: "Coffee",
    deskripsi: "",
    image: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menus = await getMenus();
        const current = menus.find((item) => String(item.id) === menuId);
        if (current) {
          setMenu(current);
          setPreviewImage(`/static/upload/${current.image}`);
        }
        console.log("data menu seharusnya", menus);
      } catch (error) {
        console.error("Gagal mengambil data menu:", error);
      }
    };

    fetchMenu();
  }, [menuId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Untuk menampilkan gambar pratinjau
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(menu.harga) || isNaN(menu.stock)) {
      Swal.fire({
        icon: "warning",
        title: "Input tidak valid",
        text: "Harga dan Stock harus berupa angka.",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nama", menu.nama);
      formData.append("harga", menu.harga);
      formData.append("stock", menu.stock);
      formData.append("category", menu.category);
      formData.append("deskripsi", menu.deskripsi);
      if (newImageFile) formData.append("image", newImageFile);

      await updateMenu(menuId, formData);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Menu berhasil diperbarui!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Gagal update menu:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal memperbarui menu.",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit Menu</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-4 shadow rounded bg-light">
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama Menu
          </label>
          <input type="text" id="nama" name="nama" value={menu.nama} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label htmlFor="harga" className="form-label">
            Harga
          </label>
          <input type="number" id="harga" name="harga" value={menu.harga} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input type="number" id="stock" name="stock" value={menu.stock} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Kategori
          </label>
          <select id="category" name="category" value={menu.category} onChange={handleChange} className="form-select" required>
            <option value="Coffee">Coffee</option>
            <option value="Non-Coffee">Non-Coffee</option>
            <option value="Foods">Foods</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="deskripsi" className="form-label">
            Deskripsi
          </label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            value={menu.deskripsi || ""} // fallback ke string kosong
            onChange={handleChange}
            className="form-control"
            rows="4"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Gambar Menu (opsional)
          </label>
          <input type="file" id="image" name="image" onChange={handleImageChange} accept="image/*" className="form-control" />
          {previewImage && (
            <div className="mt-3">
              <p>Gambar Saat Ini:</p>
              <img src={previewImage} alt="Preview" className="img-thumbnail" width="150" />
            </div>
          )}
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success">
            Update Menu
          </button>
        </div>
      </form>

      <div className="text-center mt-3">
        <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
};

export default EditMenuForm;
