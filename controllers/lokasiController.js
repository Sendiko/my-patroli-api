const { LokasiPenyimpanan } = require('../models');

const getAllLokasi = async (req, res) => {
  try {
    const lokasi = await LokasiPenyimpanan.findAll({
      order: [['nama_lokasi', 'ASC']]
    });

    res.status(200).json({
      message: 'Berhasil mengambil daftar lokasi penyimpanan',
      data: lokasi
    });
  } catch (error) {
    console.error('Error getting lokasi:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

const createLokasi = async (req, res) => {
  try {
    const { nama_lokasi, deskripsi } = req.body;

    const newLokasi = await LokasiPenyimpanan.create({
      nama_lokasi,
      deskripsi
    });

    res.status(201).json({
      message: 'Lokasi penyimpanan berhasil ditambahkan',
      data: newLokasi
    });
  } catch (error) {
    console.error('Error creating lokasi:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

const updateLokasi = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_lokasi, deskripsi } = req.body;

    const lokasi = await LokasiPenyimpanan.findByPk(id);

    if (!lokasi) {
      return res.status(404).json({ message: 'Lokasi penyimpanan tidak ditemukan' });
    }

    lokasi.nama_lokasi = nama_lokasi;
    lokasi.deskripsi = deskripsi;
    await lokasi.save();

    res.status(200).json({
      message: 'Lokasi penyimpanan berhasil diupdate',
      data: lokasi
    });
  } catch (error) {
    console.error('Error updating lokasi:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

const deleteLokasi = async (req, res) => {
  try {
    const { id } = req.params;

    const lokasi = await LokasiPenyimpanan.findByPk(id);

    if (!lokasi) {
      return res.status(404).json({ message: 'Lokasi penyimpanan tidak ditemukan' });
    }

    await lokasi.destroy();

    res.status(200).json({
      message: 'Lokasi penyimpanan berhasil dihapus'
    });
  } catch (error) {
    console.error('Error deleting lokasi:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = {
  getAllLokasi,
  createLokasi,
  updateLokasi,
  deleteLokasi
};
