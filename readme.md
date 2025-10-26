# Yelp Clone - Platform Review Tempat Wisata

Aplikasi web clone Yelp yang dibangun dengan Node.js, Express, dan MongoDB. Platform ini memungkinkan pengguna untuk berbagi, mereview, dan menemukan tempat-tempat menarik dengan integrasi peta interaktif.

## 📋 Fitur

- **Autentikasi Pengguna**

  - Register dan Login dengan Passport.js
  - Session management
  - Authorization untuk Create, Update, Delete

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

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**

## 📦 Instalasi

### Prerequisites

Pastikan sudah terinstall:

- Node.js (v14 atau lebih baru)
- MongoDB (v4 atau lebih baru)
- npm atau yarn

### Langkah Instalasi

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

   Jika menggunakan MongoDB Atlas atau connection string berbeda, edit di `app.js`:

   ```javascript
   mongoose.connect("mongodb://127.0.0.1/yelpclone");
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

6. **Seed Database (Opsional)**

   Jika ingin mengisi database dengan data contoh:

   ```bash
   node seeds/place.js
   ```

7. **Jalankan aplikasi**

   ```bash
   node app.js
   ```

   Atau gunakan nodemon untuk development:

   ```bash
   npm install -g nodemon
   nodemon app.js
   ```

8. **Akses aplikasi**

   Buka browser dan akses:

   ```
   http://127.0.0.1:3000
   ```

## 📁 Struktur Folder

```
yelpclone/
├── configs/              # Konfigurasi (multer, dll)
├── controller/           # Controller untuk handle logic
│   ├── AuthController.js
│   ├── PlaceController.js
│   └── ReviewController.js
├── middlewares/          # Custom middlewares
│   ├── isAuth.js         # Authentication check
│   ├── isAuthor.js       # Authorization check
│   ├── isValidObjectId.js
│   └── validator.js      # Joi validation
├── models/               # Mongoose models
│   ├── place.js
│   ├── review.js
│   └── user.js
├── public/               # Static files
│   ├── css/
│   ├── images/          # Uploaded images
│   └── js/
├── routes/              # Express routes
│   ├── auth.js
│   ├── places.js
│   └── reviews.js
├── schemas/             # Joi validation schemas
│   ├── placeSchema.js
│   └── reviewSchema.js
├── seeds/               # Database seeder
├── utils/               # Utility functions
│   ├── ExpressError.js
│   ├── hereMaps.js
│   └── wrapAsync.js
├── views/               # EJS templates
│   ├── layouts/
│   ├── auth/
│   └── places/
└── app.js              # Main application file
```

## 🚀 Penggunaan

### Membuat Akun

1. Klik "Register" di navbar
2. Isi form dengan email, username, dan password
3. Login dengan kredensial yang sudah dibuat

### Menambah Tempat

1. Login ke akun Anda
2. Klik "New Place" atau "Tambah Tempat"
3. Isi form dengan informasi tempat:
   - Judul
   - Harga
   - Deskripsi
   - Lokasi (alamat lengkap)
   - Upload gambar (multiple)
4. Submit form

### Memberikan Review

1. Buka halaman detail tempat
2. Scroll ke bagian review
3. Berikan rating dan komentar
4. Submit review

### Edit/Delete

- Anda hanya bisa edit/delete tempat dan review yang Anda buat sendiri
- Tombol edit/delete hanya muncul jika Anda adalah author

**Happy Coding! 🚀**
