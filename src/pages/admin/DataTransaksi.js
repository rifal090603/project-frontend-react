import React, { useEffect, useState } from "react";
import { getTransactions, completeTransaction, cancelTransaction } from "../../utils/dsahboard-api";
import Swal from "sweetalert2";
import "../../styles/dashboard/data_transaksi.css";

const DataTransaksi = () => {
  const [transaksiList, setTransaksiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tanggalFilter, setTanggalFilter] = useState("");

  const fetchCartData = async () => {
    setLoading(true);
    try {
      const data = await getTransactions(tanggalFilter);
      setTransaksiList(data.transactions || []);
    } catch (error) {
      console.error("Gagal memuat data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
    const interval = setInterval(fetchCartData, 20000);
    return () => clearInterval(interval);
  }, [tanggalFilter]);

  const handleTanggalChange = (e) => setTanggalFilter(e.target.value);

  const handleDone = async (id) => {
    const result = await Swal.fire({
      title: "Selesaikan Transaksi?",
      text: "Transaksi akan ditandai sebagai selesai.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, selesai",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await completeTransaction(id);
        await fetchCartData();
        Swal.fire({
          icon: "success",
          title: "Transaksi selesai",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal menyelesaikan transaksi",
          text: error.message || "Terjadi kesalahan.",
        });
      }
    }
  };

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Batalkan Transaksi?",
      text: "Tindakan ini tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, batalkan",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await cancelTransaction(id);
        await fetchCartData();
        Swal.fire({
          icon: "success",
          title: "Transaksi dibatalkan",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal membatalkan transaksi",
          text: error.message || "Terjadi kesalahan.",
        });
      }
    }
  };

  const formatCurrency = (amount) => "Rp " + amount.toLocaleString("id-ID", { maximumFractionDigits: 0 });

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID");
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="container-transaksi">
      <h1 className="transaksi-tilte">Keranjang Transaksi</h1>

      <div className="tanggal-transaksi">
        <label htmlFor="tanggal" className="filter-tanggal">
          Filter Tanggal
        </label>
        <input type="date" id="tanggal" value={tanggalFilter} onChange={handleTanggalChange} className="filter-input-tanggal" />
      </div>

      {loading ? (
        <p className="status-message-transaksi">Memuat data transaksi...</p>
      ) : transaksiList.length === 0 ? (
        <p className="status-message-transaksi">Tidak ada transaksi aktif.</p>
      ) : (
        <div className="transaksi-data-parent">
          {transaksiList.map((transaksi) => (
            <div key={transaksi.id} className="data-transaksi">
              <div className="transaksi-info">
                <p>
                  <strong>Client:</strong> {transaksi.client_name}
                </p>
                <p>
                  <strong>Jenis Pesanan:</strong> {transaksi.order_type}
                </p>
                <p>
                  <strong>Metode Bayar:</strong> {transaksi.payment_method}
                </p>

                {transaksi.order_type === "dine-in" && (
                  <p>
                    <strong>No Meja:</strong> {transaksi.no_meja}
                  </p>
                )}

                {transaksi.order_type === "delivery" && (
                  <>
                    <p>
                      <strong>Alamat:</strong> {transaksi.alamat}
                    </p>
                    <p>
                      <strong>No HP:</strong> {transaksi.phone_number}
                    </p>
                    <p>
                      <strong>Tanggal Ambil:</strong> {formatDate(transaksi.pickup_datetime)}
                    </p>
                    <p>
                      <strong>Jam Ambil:</strong> {formatTime(transaksi.pickup_datetime)}
                    </p>
                  </>
                )}

                {transaksi.order_type === "takeaway" && (
                  <>
                    <p>
                      <strong>Tanggal Ambil:</strong> {formatDate(transaksi.pickup_datetime)}
                    </p>
                    <p>
                      <strong>Jam Ambil:</strong> {formatTime(transaksi.pickup_datetime)}
                    </p>
                    <p>
                      <strong>No HP:</strong> {transaksi.phone_number}
                    </p>
                  </>
                )}

                <p>
                  <strong>Total:</strong> {formatCurrency(transaksi.total_amount)}
                </p>
                <p>
                  <strong>Status:</strong> <span className={`status-${transaksi.status}`}>{transaksi.status.replace("_", " ")}</span>
                </p>
              </div>

              <div className="item-menu">
                <p>
                  <strong>Item:</strong>
                </p>
                <ul>
                  {transaksi.items?.map((item) => (
                    <li key={item.id}>
                      <strong>{item.nama_menu}</strong> x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              {transaksi.status === "pending_payment" && (
                <div className="transaksi-actions">
                  <button className="btn-transaksi done-btn" onClick={() => handleDone(transaksi.id)}>
                    Selesaikan
                  </button>
                  <button className="btn-transaksi cancel-btn" onClick={() => handleCancel(transaksi.id)}>
                    Batalkan
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataTransaksi;
