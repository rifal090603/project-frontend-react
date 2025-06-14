# Coffee Match - Frontend

Ini adalah frontend dari aplikasi **Coffee Match**, dibangun dengan React menggunakan Create React App.

##  Fitur Utama
- Autentikasi pengguna (Login)
- Halaman daftar menu makanan/minuman
- Halaman detail menu dengan sistem rekomendasi berbasis deskripsi produk
- Terintegrasi dengan backend Flask + ML
- Desain responsif dan ringan

##  Cara Menjalankan
1. Clone repositori:
   ```bash
   git clone https://github.com/rifal090603/project-frontend-react.git
   cd project-frontend-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan aplikasi:
   ```bash
   npm start
   ```

> Secara default akan berjalan di `http://localhost:3000`

## Admin
- masuk ke http://localhost:3000/auth/register-admin
- buat admin, lalu login seperti biasa

## Koneksi ke Backend
Pastikan backend sudah dijalankan di `http://localhost:5000` (default Flask).
Jika perlu, atur URL backend di file konfigurasi API.

## Api
- Ubah api.js, dsahboard-api.js,HomePage.js, Menu.js, SeacrcingResult.js dan DatailMenu.js dengan http://localhost:5000
- ubah bagian rekomemndation-api.js dengan http://localhost:5000


##  Teknologi yang Digunakan
- React (CRA)
- Axios
- CSS

