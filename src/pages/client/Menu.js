import React, { useEffect, useState } from "react";
import { getMenus, addToCart } from "../../utils/api";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/menu/menu.css";
import "animate.css";

// Fungsi untuk memotong deskripsi menjadi 5 kata saja
const truncateWords = (text, wordLimit) => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + " ...";
};

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const rawCategory = searchParams.get("category");
  const rawPage = parseInt(searchParams.get("page") || "1");
  const category = rawCategory || "All";
  const page = rawPage;

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setIsLoggedIn(false);
      Swal.fire({
        icon: "warning",
        title: "Akses Ditolak",
        text: "Silakan login terlebih dahulu untuk melihat menu.",
        confirmButtonText: "Login",
      }).then(() => {
        navigate("/auth/login");
      });
      return;
    }

    const fetchMenus = async () => {
      try {
        const data = await getMenus(category === "All" ? null : category, page);
        setMenus(data.menus || []);
        setTotalPages(data.total_pages || 1);
        setError(null);
      } catch (error) {
        console.error("Gagal mengambil data menu:", error);
        setError("Terjadi kesalahan saat mengambil data menu");
      }
    };
    fetchMenus();
  }, [category, page, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  const handleCategoryClick = (categoryName) => {
    const params = new URLSearchParams();
    if (categoryName !== "All") params.set("category", categoryName);
    params.set("page", "1");
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    setSearchParams(params);
  };

  const handleAddToCart = async (menuId, quantity) => {
    try {
      if (!menuId || !quantity) {
        Swal.fire({ icon: "warning", title: "Input tidak valid", text: "Periksa menu dan jumlah." });
        return;
      }
      await addToCart(menuId, quantity);
      Swal.fire({ icon: "success", title: "Berhasil!", text: "Menu ditambahkan ke keranjang.", timer: 1500, showConfirmButton: false });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Gagal", text: "Gagal menambahkan ke keranjang. Coba lagi nanti." });
    }
  };

  return (
    <div className="menu-container animate__animated animate__fadeIn">
      <h1 className="menu-title animate__animated animate__fadeInDown">Daftar Menu</h1>
      {error && <p className="error-message animate__animated animate__shakeX">{error}</p>}

      <div className="menu-categories animate__animated animate__fadeInDown animate__fast">
        {["Coffee", "Non-Coffee", "Foods", "All"].map((cat) => (
          <button key={cat} onClick={() => handleCategoryClick(cat)} className={`category-button ${cat === category ? "active" : ""}`}>
            {cat}
          </button>
        ))}
      </div>

      <h2 className="menu-subtitle animate__animated animate__fadeInUp animate__slow">{category === "All" ? "Semua Menu" : category}</h2>

      <div className="menu-grid">
        {menus.length > 0 ? (
          menus.map((menu, index) => (
            <div key={menu.id} className={`menu-card animate__animated animate__fadeInUp`} style={{ animationDelay: `${index * 0.15}s` }}>
              <img src={typeof menu.image === "string" && menu.image.trim() !== "" ? `http://localhost:5000/static/upload/${menu.image}` : "/default-image.jpg"} alt={menu.nama} className="menu-image" />

              <div className="menu-content">
                <h3 className="menu-name">{menu.nama}</h3>
                <p className="menu-category">{menu.category}</p>
                {/* Deskripsi dipotong hanya 5 kata */}
                <p className="menu-description">{truncateWords(menu.deskripsi, 5) || "Tidak ada deskripsi."}</p>
                <p className="menu-price">Harga: Rp {menu.harga}</p>

                <form
                  className="add-to-cart-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const quantity = parseInt(e.target.quantity.value, 10);
                    handleAddToCart(menu.id, quantity);
                  }}
                >
                  <input type="number" name="quantity" className="quantity-input" defaultValue={1} min={1} max={menu.stock} />
                  <button type="submit" className="add-to-cart-button" title="Tambah ke Keranjang">
                    <i className="fas fa-cart-plus"></i>
                  </button>
                </form>

                {/* Tombol Lihat Detail */}
                <Link to={`/menu/detail/${menu.id}`} className="detail-button">
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>Menu kosong atau gagal memuat data.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination animate__animated animate__fadeInUp animate__slow">
        <button disabled={page <= 1} onClick={() => handlePageChange(page - 1)}>
          Sebelumnya
        </button>
        <span>
          Halaman {page} dari {totalPages}
        </span>
        <button disabled={page >= totalPages} onClick={() => handlePageChange(page + 1)}>
          Berikutnya
        </button>
      </div>
    </div>
  );
};

export default Menu;
