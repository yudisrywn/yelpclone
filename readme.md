# Yelp Clone - Platform Review Tempat Wisata

Aplikasi web clone Yelp yang dibangun dengan Node.js, Express, dan MongoDB.

## 📋 Fitur

- **Autentikasi Pengguna**

  - Register dan Login dengan Passport.js
  - Session management
  - Authorization

- **Manajemen Tempat (Places)**

  - Tambah tempat baru dengan foto
  - Edit dan hapus tempat
  - Upload multiple images
  - Integrasi geocoding dengan HERE Maps API
  - Tampilan detail tempat dengan peta

- **Sistem Review**

  - Tambah review dan rating bintang
  - Edit dan hapus review
  - Rating visual dengan star rating

- **Upload Gambar**
  - Multiple image upload dengan Multer
  - Penyimpanan lokal di folder public

## 🛠️ Teknologi yang Digunakan

- **Node.js**
- **Express.js**
- **MongoDB**

## 📦 Instalasi

1. **Clone repository**

   ```bash
   git clone https://github.com/yudisrywn/yelpclone.git
   cd yelpclone
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup MongoDB**

   Pastikan MongoDB sudah berjalan di sistem Anda. Default connection string:

   ```
   mongodb://127.0.0.1/yelpclone
   ```

4. **Setup HERE Maps API Key**

   Edit file `utils/hereMaps.js` dan ganti dengan API key Anda:

   ```javascript
   const apiKey = "YOUR_HERE_MAPS_API_KEY";
   ```

5. **Konfigurasi Session Secret (Opsional)**

   Edit `app.js` untuk mengubah session secret:

   ```javascript
   session({
     secret: "your-secret-key",
     // ...
   });
   ```