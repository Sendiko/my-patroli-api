const { BarangHilang, Laboratorium, User, LokasiPenyimpanan, Kategori } = require('../models');
const { Op } = require('sequelize');

const createBarang = async (req, res) => {
  try {
    const {
      kategori_id,
      sumber_lokasi,
      lab_id,
      deskripsi,
      lokasi_id,
      detail_penyimpanan,
      tanggal_waktu
    } = req.body;

    let foto_url = null;

    if (req.file) {
      foto_url = `/uploads/${req.file.filename}`;
    } else if (req.body.foto_url) {
      foto_url = req.body.foto_url;
    }

    const barang = await BarangHilang.create({
      kategori_id,
      sumber_lokasi,
      lab_id: sumber_lokasi === 'laboratorium' ? lab_id : null,
      deskripsi,
      lokasi_id: lokasi_id || null,
      detail_penyimpanan: !lokasi_id ? detail_penyimpanan : null,
      foto_url,
      status: 'belum_diambil',
      tanggal_waktu: tanggal_waktu || new Date(),
      pelapor_id: req.user.id // Dari JWT
    });

    res.status(201).json({
      message: 'Data barang hilang berhasil ditambahkan',
      data: barang
    });
  } catch (error) {
    console.error('Error creating barang:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

const getAllBarang = async (req, res) => {
  try {
    const { status, lab_id } = req.query;

    let whereClause = {};

    if (status) {
      whereClause.status = status;
    }

    if (lab_id) {
      whereClause.lab_id = lab_id;
    }

    const barangList = await BarangHilang.findAll({
      where: whereClause,
      include: [
        {
          model: Kategori,
          as: 'kategori',
          attributes: ['id', 'nama_kategori']
        },
        {
          model: Laboratorium,
          as: 'laboratorium',
          attributes: ['id', 'kode_lab', 'nama_lab']
        },
        {
          model: LokasiPenyimpanan,
          as: 'lokasiPenyimpanan',
          attributes: ['id', 'nama_lokasi']
        },
        {
          model: User,
          as: 'pelapor',
          attributes: ['id', 'username', 'nama_lengkap', 'role']
        }
      ],
      order: [['tanggal_waktu', 'DESC']]
    });

    res.status(200).json({
      message: 'Berhasil mengambil data barang hilang',
      data: barangList
    });
  } catch (error) {
    console.error('Error getting barang:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const barang = await BarangHilang.findByPk(id);

    if (!barang) {
      return res.status(404).json({ message: 'Data barang tidak ditemukan' });
    }

    barang.status = 'sudah_diambil';
    await barang.save();

    res.status(200).json({
      message: 'Status barang berhasil diupdate menjadi sudah_diambil',
      data: barang
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

const getBarangById = async (req, res) => {
  try {
    const { id } = req.params;

    const barang = await BarangHilang.findByPk(id, {
      include: [
        {
          model: Kategori,
          as: 'kategori',
          attributes: ['id', 'nama_kategori']
        },
        {
          model: Laboratorium,
          as: 'laboratorium',
          attributes: ['id', 'kode_lab', 'nama_lab']
        },
        {
          model: LokasiPenyimpanan,
          as: 'lokasiPenyimpanan',
          attributes: ['id', 'nama_lokasi']
        },
        {
          model: User,
          as: 'pelapor',
          attributes: ['id', 'username', 'nama_lengkap', 'role']
        }
      ]
    });

    if (!barang) {
      return res.status(404).json({ message: 'Data barang tidak ditemukan' });
    }

    res.status(200).json({
      message: 'Berhasil mengambil data barang',
      data: barang
    });
  } catch (error) {
    console.error('Error getting barang by id:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = {
  createBarang,
  getAllBarang,
  getBarangById,
  updateStatus
};
