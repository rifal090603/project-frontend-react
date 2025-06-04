import React from "react";
import coffeeImage from "../../assets/images/image.png";
import foundedImage from "../../assets/images/jejak.png";
import "../../styles/about.css";
import { FaInstagram, FaTiktok, FaFacebook, FaWhatsapp } from "react-icons/fa";
import "animate.css";

const About = () => {
  return (
    <div className="container my-5 px-3 px-md-5 container-awal">
      {/* Tentang Kami */}
      <div className="text-center mb-5 deskripsi animate__animated animate__fadeInUp">
        <h1 className="display-4 fw-bold mb-3">Tentang Coffee Macth</h1>
        <p className="lead text-muted">
          Selamat datang di <strong>Coffee Macth</strong> — bukan sekadar kedai kopi, tapi tempat di mana cerita dimulai dan koneksi tercipta.
          Kami percaya bahwa setiap cangkir kopi memiliki kisahnya sendiri, diseduh dengan sepenuh hati untuk menciptakan momen berkesan bagi siapa pun yang datang.
          Dari aroma biji kopi pilihan hingga kenyamanan suasana, kami hadir untuk menjadi rumah kedua bagi para pecinta kopi sejati.
        </p>
        <img
          src={coffeeImage}
          alt="Coffee Match"
          className="img-fluid rounded shadow my-4 gambar-1 animate__animated animate__zoomIn"
          style={{ maxWidth: "600px" }}
        />
      </div>

      {/* Misi Kami */}
      <div className="my-5 text-center misi-coffe animate__animated animate__fadeInLeft">
        <h2 className="mb-3">Misi Kami</h2>
        <p className="fs-5 text-muted w-75 mx-auto">
          Menjadi kedai kopi pilihan utama yang mengedepankan kualitas, kenyamanan, dan kehangatan interaksi — tempat di mana kopi menjadi jembatan untuk cerita dan kebersamaan.
        </p>
      </div>

      {/* Tahun Berdiri */}
      <div className="my-5 text-center tahun-berdiri animate__animated animate__fadeInRight">
        <h3 className="mb-3">Berdiri Sejak 2 Juni 2018</h3>
        <img
          src={foundedImage}
          alt="Founded in 2018"
          className="img-fluid rounded shadow gambar-2 animate__animated animate__zoomIn"
          style={{ maxWidth: "500px" }}
        />
      </div>

      {/* Jam Operasional */}
      <div className="my-5 text-center jam-operasi animate__animated animate__fadeInUp">
        <h3 className="mb-3">Jam Operasional</h3>
        <p className="fs-5 mb-1 text-muted">
          <strong>Senin - Jumat:</strong> 08.00 - 22.00
        </p>
        <p className="fs-5 text-muted">
          <strong>Sabtu - Minggu:</strong> 09.00 - 23.00
        </p>
      </div>

      {/* Layanan Kami */}
      <div className="text-center my-5 layanan-kami animate__animated animate__fadeInUp">
        <h3 className="mb-3">Layanan yang Tersedia</h3>
        <p className="fs-5 text-muted w-75 mx-auto">
          Kami menyediakan berbagai layanan untuk kenyamanan dan kebutuhan Anda:
        </p>
        <ul className="list-unstyled fs-5 text-muted">
          <li><strong>Dine-In</strong> – Nikmati suasana nyaman dan hangat di tempat kami</li>
          <li><strong>Delivery</strong> – Pengantaran cepat hingga radius <strong>10 km</strong> dari lokasi kami</li>
          <li><strong>Takeaway</strong> – Pesan dan ambil langsung, cocok untuk yang punya aktivitas padat</li>
        </ul>
      </div>

      {/* Sosial Media */}
      <div className="text-center my-5 sosial-media animate__animated animate__bounceIn">
        <h4 className="mb-4">Temukan Kami di Sosial Media</h4>
        <div className="d-flex justify-content-center gap-4 flex-wrap">
          <a href="https://instagram.com/coffeematch" target="_blank" rel="noreferrer" className="text-dark fs-2">
            <FaInstagram className="hover-opacity" />
          </a>
          <a href="https://tiktok.com/@coffeematch" target="_blank" rel="noreferrer" className="text-dark fs-2">
            <FaTiktok className="hover-opacity" />
          </a>
          <a href="https://facebook.com/coffeematch" target="_blank" rel="noreferrer" className="text-dark fs-2">
            <FaFacebook className="hover-opacity" />
          </a>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="text-success fs-2">
            <FaWhatsapp className="hover-opacity" />
          </a>
        </div>
      </div>

      {/* Lokasi */}
      <div className="text-center my-5 map-lokasi animate__animated animate__fadeIn">
        <h4 className="mb-3">Lokasi Kami</h4>
        <div className="ratio ratio-16x9">
          <iframe
            title="Lokasi Coffee Match"
            src="https://www.google.com/maps/embed?pb=..."
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default About;
