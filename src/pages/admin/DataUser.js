import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getUsers, deleteUser } from "../../utils/dsahboard-api";

const DataUser = () => {
  const [admins, setAdmins] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setAdmins(data.admins || []);
        setClients(data.clients || []);
      } catch (err) {
        setError("Gagal memuat data pengguna.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data user akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(userId);
        setAdmins((prev) => prev.filter((user) => user.id !== userId));
        setClients((prev) => prev.filter((user) => user.id !== userId));

        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "User berhasil dihapus.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal menghapus user.",
        });
        console.error(error);
      }
    }
  };

  if (loading) return <p>Memuat data...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Data User</h1>
      <h2>Admin</h2>
      <div className="table-responsive">
        {" "}
        {/* Tambahkan ini */}
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-success">
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>{admin.username}</td>
                <td>{admin.email}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(admin.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{" "}
      {/* Tutup table-responsive */}
      <h2 className="mt-5">Client</h2>
      <div className="table-responsive">
        {" "}
        {/* Tambahkan ini juga */}
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-success">
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.username}</td>
                <td>{client.email}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(client.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{" "}
      {/* Tutup table-responsive */}
    </div>
  );
};

export default DataUser;
