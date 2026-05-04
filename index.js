require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');

const authRoutes = require('./routes/authRoutes');
const barangRoutes = require('./routes/barangRoutes');
const labRoutes = require('./routes/labRoutes');
const lokasiRoutes = require('./routes/lokasiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup folder statis untuk file upload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', authRoutes); // /api/login, /api/register
app.use('/api/barang', barangRoutes);
app.use('/api/laboratorium', labRoutes);
app.use('/api/lokasi', lokasiRoutes);

// Route fallback untuk endpoint yang tidak ada
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan' });
});

// Jalankan server dan koneksi DB
app.listen(PORT, async () => {
  console.log(`Server berjalan pada port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Koneksi ke database berhasil.');
  } catch (error) {
    console.error('Tidak bisa terhubung ke database:', error);
  }
});
