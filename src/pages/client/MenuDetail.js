import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMenuById, addToCart } from "../../utils/api";
import { getRecommendationsById } from "../../utils/recommendation-api"; // ✅ tambahkan ini
import Swal from "sweetalert2";
import "../../styles/menu/detail.css";

const MenuDetail = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenuById(id);
        setMenu(data);

        const recommendations = await getRecommendationsById(parseInt(id));
        console.log("Rekomendasi dari API (MenuDetail):", recommendations);

        if (recommendations.length > 0) {
          localStorage.setItem("last_recommendations", JSON.stringify(recommendations));
        }
      } catch (err) {
        setError("Gagal memuat detail menu");
      }
    };

    fetchMenu();
  }, [id]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      await addToCart(menu.id, quantity);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Menu ditambahkan ke keranjang",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal menambahkan ke keranjang",
      });
    }
  };

  if (error) return <p>{error}</p>;
  if (!menu) return <p>Memuat menu...</p>;

  return (
    <div className="detail-container-macth">
      {menu.image && <img src={`http://localhost:5000/static/upload/${menu.image}`} alt={menu.nama} className="detail-gambar-info" />}

      <div className="info-detail-macth">
        <h1 className="macth-h1">{menu.nama}</h1>
        <p>
          <strong>Kategori:</strong> {menu.category}
        </p>
        <p>
          <strong>Deskripsi:</strong> {menu.deskripsi || "Tidak ada deskripsi."}
        </p>
        <p>
          <strong>Harga:</strong> Rp {menu.harga}
        </p>
        <p>
          <strong>Stok:</strong> {menu.stock}
        </p>

        <form onSubmit={handleAddToCart}>
          <label className="macth-label">
            Jumlah:
            <input type="number" value={quantity} min={1} max={menu.stock} onChange={(e) => setQuantity(parseInt(e.target.value))} className="quantity-input-detail-macth" />
          </label>
          <button type="submit" className="add-cart-match">
            Tambah ke Keranjang
          </button>
        </form>
      </div>
    </div>
  );
};

export default MenuDetail;
