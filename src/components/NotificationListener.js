import { useEffect } from "react";
import socket from "../sockets/socket";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notifsound from "../assets/sound/notif.mp3";
import "../styles/notifikasi/notifToast.css"

const NotificationListener = () => {
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (userId) {
      socket.emit("join", { user_id: userId });
    }

    const handleTransaksiUpdate = (data) => {
      // Buat instance baru setiap kali agar bisa diputar berulang kali
      const audio = new Audio(notifsound);
      audio.volume = 0.8; // bisa disesuaikan 0.0 - 1.0
      audio.play().catch((err) => {
        console.warn("Autoplay blocked or error playing sound:", err);
      });

      // Tampilkan toast
      toast.info(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    };

    socket.on("transaksi_update", handleTransaksiUpdate);

    return () => {
      socket.off("transaksi_update", handleTransaksiUpdate);
    };
  }, [userId]);

  return <ToastContainer />;
};

export default NotificationListener;
