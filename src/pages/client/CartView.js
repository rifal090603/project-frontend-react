import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "animate.css";
import { viewCart, removeFromCart, checkoutCart } from "../../utils/api";

const CartView = () => {
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    client_name: "",
    order_type: "",
    phone_number: "",
    alamat: "",
    no_meja: "",
    payment_method: "",
    pickup_date: "",
    pickup_time: "",
  });
  const [totalAmount, setTotalAmount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await viewCart();
        setCartItems(data.cart_items);
        const total = data.cart_items.reduce((acc, item) => acc + item.menu.harga * item.quantity, 0);
        setTotalAmount(total);
      } catch (err) {
        console.error("Gagal mengambil keranjang:", err.message);
      }
    };
    fetchCartItems();
  }, []);

  const handleRemove = async (menuId) => {
    try {
      await removeFromCart(menuId);
      const updated = cartItems.filter((item) => item.menu.id !== menuId);
      setCartItems(updated);
      const total = updated.reduce((acc, item) => acc + item.menu.harga * item.quantity, 0);
      setTotalAmount(total);
    } catch (err) {
      console.error("Gagal menghapus item:", err.message);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal menghapus item dari keranjang.",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };

    // Jika order_type delivery atau takeaway, metode pembayaran auto "dana"
    if (name === "order_type") {
      updatedForm.payment_method = value === "delivery" || value === "takeaway" ? "dana" : "";
    }

    setForm(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cartItems.length) {
      Swal.fire({
        icon: "warning",
        title: "Keranjang Kosong",
        text: "Tambahkan menu terlebih dahulu sebelum checkout.",
      });
      return;
    }

    try {
      let pickup_datetime = null;
      if (form.order_type === "takeaway" && form.pickup_date && form.pickup_time) {
        pickup_datetime = new Date(`${form.pickup_date}T${form.pickup_time}`);
      }

      const dataToSend = {
        ...form,
        total_amount: totalAmount,
        pickup_datetime: pickup_datetime ? pickup_datetime.toISOString() : null,
      };

      const response = await checkoutCart(dataToSend);
      const { transaction_id } = response;

      if (!transaction_id) {
        throw new Error("Checkout berhasil, tapi ID transaksi tidak ditemukan");
      }

      Swal.fire({
        icon: "success",
        title: "Checkout Berhasil",
        text: "Pesanan Anda telah berhasil diproses!",
        timer: 1500,
        showConfirmButton: false,
      });

      // Redirect sesuai payment_method
      if (form.payment_method === "tunai") {
        navigate("/cart/checkout", {
          state: {
            client_name: form.client_name,
            transaction_id,
            total_amount: totalAmount,
            method: "cash",
          },
        });
      } else if (form.payment_method === "dana") {
        navigate("/cart/checkout-payment", {
          state: {
            client_name: form.client_name,
            transaction_id,
            total_amount: totalAmount,
          },
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Metode Pembayaran Tidak Valid",
          text: "Silakan pilih metode pembayaran yang benar.",
        });
      }

      setCartItems([]);
    } catch (err) {
      console.error("Checkout gagal:", err.response?.data || err.message);
      Swal.fire({
        icon: "error",
        title: "Checkout Gagal",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  const isDeliveryOrTakeaway = form.order_type === "delivery" || form.order_type === "takeaway";

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4" style={{ color: "#6f4e37" }}>
        Keranjang Anda
      </h1>

      {cartItems.length > 0 ? (
        <>
          <div className="table-responsive animate__animated animate__fadeIn">
            <table className="table cart-table">
              <thead>
                <tr>
                  <th>Nama Menu</th>
                  <th>Harga</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.menu.id}>
                    <td>{item.menu.nama}</td>
                    <td>Rp {item.menu.harga}</td>
                    <td>{item.quantity}</td>
                    <td>Rp {item.menu.harga * item.quantity}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.menu.id)}>
                        Batalkan
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="text-end mb-4" style={{ color: "#6f4e37" }}>
            Total: Rp {totalAmount}
          </h4>

          <form onSubmit={handleSubmit} className="cart-form animate__animated animate__fadeInUp">
            <div className="mb-3">
              <label className="form-label" style={{ color: "#6f4e37" }}>
                Nama Anda
              </label>
              <input type="text" className="form-control" name="client_name" value={form.client_name} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: "#6f4e37" }}>
                Jenis Pesanan
              </label>
              <select className="form-select" name="order_type" value={form.order_type} onChange={handleChange} required>
                <option value="">-- Pilih --</option>
                <option value="dine-in">Dine-In</option>
                <option value="delivery">Delivery</option>
                <option value="takeaway">Takeaway</option>
              </select>

              {form.order_type === "delivery" && <p className="text-danger mt-2">* Layanan delivery hanya tersedia dalam radius 4 km dari lokasi toko.</p>}
            </div>

            {form.order_type === "delivery" && (
              <div className="mb-3">
                <label className="form-label" style={{ color: "#6f4e37" }}>
                  Alamat
                </label>
                <input type="text" className="form-control" name="alamat" value={form.alamat} onChange={handleChange} required />
              </div>
            )}

            {form.order_type === "dine-in" && (
              <div className="mb-3">
                <label className="form-label" style={{ color: "#6f4e37" }}>
                  Nomor Meja
                </label>
                <input type="text" className="form-control" name="no_meja" value={form.no_meja} onChange={handleChange} required />
              </div>
            )}

            {isDeliveryOrTakeaway && (
              <div className="mb-3">
                <label className="form-label" style={{ color: "#6f4e37" }}>
                  Nomor WhatsApp
                </label>
                <input type="tel" className="form-control" name="phone_number" value={form.phone_number} onChange={handleChange} required />
              </div>
            )}

            {form.order_type === "takeaway" && (
              <>
                <div className="mb-3">
                  <label className="form-label" style={{ color: "#6f4e37" }}>
                    Tanggal Ambil
                  </label>
                  <input type="date" className="form-control" name="pickup_date" value={form.pickup_date} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{ color: "#6f4e37" }}>
                    Jam Ambil
                  </label>
                  <input type="time" className="form-control" name="pickup_time" value={form.pickup_time} onChange={handleChange} required />
                </div>
              </>
            )}

            <div className="mb-3">
              <label className="form-label" style={{ color: "#6f4e37" }}>
                Metode Pembayaran
              </label>
              <select
                className="form-select"
                name="payment_method"
                value={form.payment_method}
                onChange={handleChange}
                required
                disabled={isDeliveryOrTakeaway} // disable di delivery/takeaway, harus Dana
              >
                <option value="">-- Pilih --</option>
                <option value="dana">Dana</option>
                {form.order_type === "dine-in" && <option value="tunai">Tunai</option>}
              </select>
              {isDeliveryOrTakeaway && <small className="text-danger">Pembayaran hanya dapat dilakukan melalui Dana untuk {form.order_type}</small>}
            </div>

            <button type="submit" className="btn btn-success w-100">
              Checkout
            </button>
          </form>
        </>
      ) : (
        <p className="text-center fs-5 animate__animated animate__fadeIn">Keranjang Anda kosong.</p>
      )}
    </div>
  );
};

export default CartView;
