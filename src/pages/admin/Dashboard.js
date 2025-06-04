import React, { useEffect, useState } from "react";
import { getDashboardData, deleteMenu } from "../../utils/dsahboard-api";
import Swal from "sweetalert2";

export default function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const statsData = await getDashboardData();
        setStats(statsData);
        setMenus(statsData.menus || []); // Ambil menu langsung dari statsData
      } catch (error) {
        console.error("Gagal memuat data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p className="text-center my-5">Memuat data...</p>;
  if (!stats) return <p className="text-center text-danger">Data tidak tersedia</p>;

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus menu ini?",
      text: "Tindakan ini tidak dapat dibatalkan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await deleteMenu(id);
        setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== id));

        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Menu berhasil dihapus.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Gagal menghapus menu:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat menghapus menu.",
        });
      }
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Dashboard Admin</h1>

      <section className="mb-5">
        <h2>Statistik</h2>
        <ul className="list-group">
          <li className="list-group-item">Jumlah Menu: {stats.jumlah_menu}</li>
          <li className="list-group-item">Jumlah User: {stats.jumlah_user}</li>
          <li className="list-group-item">Jumlah Transaksi: {stats.jumlah_transaksi}</li>
          <li className="list-group-item">Total Pendapatan: Rp {stats.total_pendapatan}</li>
        </ul>
      </section>

      <section className="mb-5">
        <div className="text-end mb-3">
          <a href="/dashboard/create-menu" className="btn btn-success">
            Tambah Menu Baru
          </a>
        </div>

        <h2>Daftar Menu</h2>
        <div style={{ overflowX: "auto" }}>
          <table className="table table-striped table-hover table-bordered">
            <thead className="table-success">
              <tr>
                <th>ID</th>
                <th>Nama Menu</th>
                <th>Harga</th>
                <th>Stock</th>
                <th>Deskripsi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu) => (
                <tr key={menu.id}>
                  <td>{menu.id}</td>
                  <td>{menu.nama}</td>
                  <td>Rp {menu.harga}</td>
                  <td>{menu.stock}</td>
                  <td>{menu.deskripsi || "-"}</td>
                  <td>
                    <a href={`/dashboard/edit-menu/${menu.id}`} className="btn btn-warning btn-sm">
                      Edit
                    </a>
                    <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(menu.id)}>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
