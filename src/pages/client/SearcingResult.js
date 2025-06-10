import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { searchMenu } from "../../utils/api";
import "../../styles/menu/menu.css";
import "animate.css";

const SearchResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("query") || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) {
      navigate("/");
    }
  }, [query, navigate]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (query) {
          const data = await searchMenu(query);
          setResults(data || []);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="menu-container animate__animated animate__fadeIn">
      <h1 className="menu-title animate__animated animate__fadeInDown">Hasil Pencarian</h1>
      <h2 className="menu-subtitle animate__animated animate__fadeInUp">
        Menampilkan hasil untuk: <strong>{query}</strong>
      </h2>

      <div className="menu-grid">
        {results.length > 0 ? (
          results.map((menu, index) => (
            <div key={menu.id} className="menu-card animate__animated animate__fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
              <img src={typeof menu.image === "string" && menu.image.trim() !== "" ? `https://coffee-macth.shop/static/upload/${menu.image}` : "/default-image.jpg"} alt={menu.nama} className="menu-image" />

              <div className="menu-content">
                <h3 className="menu-name">{menu.nama}</h3>
                <p className="menu-category">{menu.category}</p>
                <p className="menu-price">Harga: Rp {menu.harga}</p>
                <Link to={`/menu/detail/${menu.id}`} className="detail-button">
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="error-message animate__animated animate__shakeX">Tidak ada hasil ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
