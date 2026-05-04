const { Kategori } = require('../models');

const getAllKategori = async (req, res) => {
  try {
    const kategoris = await Kategori.findAll({
      order: [['nama_kategori', 'ASC']]
    });

    res.status(200).json({
      message: 'Berhasil mengambil daftar kategori',
      data: kategoris
    });
  } catch (error) {
    console.error('Error getting kategoris:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

const createKategori = async (req, res) => {
  try {
    const { nama_kategori } = req.body;

    if (!nama_kategori) {
      return res.status(400).json({ message: 'Nama kategori harus diisi' });
    }

    const newKategori = await Kategori.create({
      nama_kategori
    });

    res.status(201).json({
      message: 'Kategori berhasil ditambahkan',
      data: newKategori
    });
  } catch (error) {
    console.error('Error creating kategori:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Nama kategori sudah ada' });
    }
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

const updateKategori = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_kategori } = req.body;

    const kategori = await Kategori.findByPk(id);

    if (!kategori) {
      return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    }

    kategori.nama_kategori = nama_kategori || kategori.nama_kategori;
    await kategori.save();

    res.status(200).json({
      message: 'Kategori berhasil diupdate',
      data: kategori
    });
  } catch (error) {
    console.error('Error updating kategori:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Nama kategori sudah ada' });
    }
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

const deleteKategori = async (req, res) => {
  try {
    const { id } = req.params;

    const kategori = await Kategori.findByPk(id);

    if (!kategori) {
      return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    }

    await kategori.destroy();

    res.status(200).json({
      message: 'Kategori berhasil dihapus'
    });
  } catch (error) {
    console.error('Error deleting kategori:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = {
  getAllKategori,
  createKategori,
  updateKategori,
  deleteKategori
};
