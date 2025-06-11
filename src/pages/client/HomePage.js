import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import "animate.css";

export default function HomePage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("last_recommendations");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRecommendations(parsed);
      } catch (e) {
        console.error(" Gagal parse rekomendasi dari localStorage:", e);
      }
    }
    setLoading(false);
  }, []);

  return (
    <>
      <div className="jumbotron text-white text-center py-5 bg-dark animate__animated animate__fadeInDown">
        <h1 className="display-4">Selamat Datang di Coffee Macth!</h1>
        <p className="lead">Nikmati kopi dan camilan terbaik hanya dalam genggaman</p>
        <hr className="my-4" />
        <p>Jelajahi menu kami dan temukan pilihan terbaik untuk Anda!</p>
        <a className="btn btn-light btn-lg" href="/menu">
          Lihat Menu
        </a>
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
                    <img src={typeof item.image === "string" && item.image.trim() !== "" ? `https://coffee-macth.shop/static/upload/${item.image}` : "/default-image.jpg"} alt={item.nama} />
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
}
