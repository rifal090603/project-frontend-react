import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import myDana from "../../assets/images/mydana.jpg";
import "../../styles/menu/checkout.css";
import "animate.css";

const CheckoutPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { client_name, transaction_id, total_amount } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(() => {
    if (transaction_id) {
      localStorage.setItem("transaction_id", transaction_id);
    }
    if (!client_name || !transaction_id || !total_amount) {
      navigate("/");
    }
  }, [transaction_id, client_name, total_amount, navigate]);

  const handleOnlinePayment = () => {
    setPaymentMethod("online");
  };

  const handleSendProof = () => {
    const message = encodeURIComponent(
      `Halo, saya ${client_name}. Ini bukti pembayaran untuk transaksi ID ${transaction_id} sebesar Rp ${parseInt(
        total_amount
      ).toLocaleString("id-ID")}`
    );
    window.open(`https://wa.me/6282267421648?text=${message}`, "_blank");
  };

  const backToHome = () => {
    navigate("/");
  };

  return (
    <div className="container my-5">
      <div className="checkout-container animate__animated animate__fadeInUp text-center">
        <h2 className="checkout-title">Pilih Metode Pembayaran</h2>

        <button className="payment-btn payment-btn-success" onClick={handleOnlinePayment}>
          Bayar dengan DANA
        </button>

        {paymentMethod === "online" && (
          <div className="qr-section animate__animated animate__fadeIn">
            <h4 className="mt-4">Silakan Scan QR DANA di bawah:</h4>
            <p>Bayar ke No- <strong>082267421648</strong></p>
            <img
              src={myDana}
              alt="QR DANA"
              className="qr-image"
            />
            <p>Kirim bukti pembayaran ke WhatsApp:</p>
            <button className="payment-btn payment-btn-outline" onClick={handleSendProof}>
              Kirim Bukti via WhatsApp
            </button>
          </div>
        )}

        <button className="payment-btn payment-btn-primary mt-4" onClick={backToHome}>
          Kembali ke Home
        </button>
      </div>
    </div>
  );
};

export default CheckoutPayment;
