import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMenuById, addToCart } from "../../utils/api";
import { getRecommendationsById } from "../../utils/recommendation-api";
import Swal from "sweetalert2";
import "../../styles/menu/detail.css";

const MenuDetail = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("last_recommendations");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        console.log("📦 Rekomendasi dari localStorage:", parsed);
        setRecommendations(parsed);
      } catch (e) {
        console.error("Gagal parse rekomendasi dari localStorage:", e);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenuById(id);
        setMenu(data);

        const recs = await getRecommendationsById(parseInt(id));
        console.log("Rekomendasi dari API (MenuDetail):", recs);

        if (recs.length > 0) {
          localStorage.setItem("last_recommendations", JSON.stringify(recs));
          setRecommendations(recs);
        }
      } catch (err) {
        console.error(err);
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
    <>
      <div className="detail-container-macth">
        <img src={typeof menu.image === "string" && menu.image.trim() !== "" ? `http://localhost:5000/static/upload/${menu.image}` : "/default-image.jpg"} alt={menu.nama} />

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

      <section className="section-rekomendasi py-5">
        <div className="container">
          <h2 className="text-center mb-5 animate__animated animate__fadeInUp">Rekomendasi Menu</h2>

          {loading && <p>Loading rekomendasi...</p>}

          {!loading && recommendations.length === 0 && <p className="text-center">Tidak ada rekomendasi untuk ditampilkan.</p>}

          <div className="row">
            {!loading &&
              recommendations.map((item) => (
                <div key={item.id} className="col-6 col-md-4 col-lg-3">
                  <div className="recommendation-card h-100">
                    <img src={typeof item.image === "string" && item.image.trim() !== "" ? `http://localhost:5000/static/upload/${item.image}` : "/default-image.jpg"} alt={item.nama} />
                    <div className="card-body">
                      <h5 className="card-title">{item.nama}</h5>
                      <p className="card-text">Rp {item.harga}</p>
                      <a href={`/menu/detail/${item.id}`} className="btn-home">
                        Lihat Detail
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MenuDetail;
