import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Mengambil data dari location.state
  const { client_name, transaction_id, total_amount, method } = location.state || {};

  // Validasi jika ada data yang hilang
  if (!client_name || !transaction_id || !total_amount) {
    navigate('/');
    return null;
  }

  return (
    <div className="container my-5 text-center">
      <div className="checkout-success p-5 rounded shadow-sm border">
        <h1 className="mb-4 text-success">Terima Kasih, {client_name}!</h1>
        <p className="fs-5">Transaksi Anda berhasil diproses.</p>
        <p><strong>ID Transaksi:</strong> {transaction_id}</p>
        <p><strong>Total Belanja:</strong> Rp {parseInt(total_amount).toLocaleString()}</p>
        {method === 'cash' ? (
          <p>Silakan lakukan pembayaran di kasir.</p>
        ) : (
          <p>Pembayaran Anda sedang diverifikasi.</p>
        )}
        <button className="btn btn-primary mt-4" onClick={() => navigate('/')}>
          Kembali ke Home
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
