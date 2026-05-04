const { Laboratorium } = require('../models');

const getAllLabs = async (req, res) => {
  try {
    const labs = await Laboratorium.findAll({
      attributes: ['id', 'kode_lab', 'nama_lab']
    });

    res.status(200).json({
      message: 'Berhasil mengambil daftar laboratorium',
      data: labs
    });
  } catch (error) {
    console.error('Error getting labs:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

const createLab = async (req, res) => {
  try {
    const { kode_lab, nama_lab, laboran_id, asisten_id } = req.body;

    const newLab = await Laboratorium.create({
      kode_lab,
      nama_lab,
      laboran_id: laboran_id || null,
      asisten_id: asisten_id || null
    });

    res.status(201).json({
      message: 'Laboratorium berhasil ditambahkan',
      data: newLab
    });
  } catch (error) {
    console.error('Error creating lab:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

const updateLab = async (req, res) => {
  try {
    const { id } = req.params;
    const { kode_lab, nama_lab, laboran_id, asisten_id } = req.body;

    const lab = await Laboratorium.findByPk(id);

    if (!lab) {
      return res.status(404).json({ message: 'Laboratorium tidak ditemukan' });
    }

    lab.kode_lab = kode_lab || lab.kode_lab;
    lab.nama_lab = nama_lab || lab.nama_lab;
    lab.laboran_id = laboran_id !== undefined ? laboran_id : lab.laboran_id;
    lab.asisten_id = asisten_id !== undefined ? asisten_id : lab.asisten_id;
    
    await lab.save();

    res.status(200).json({
      message: 'Laboratorium berhasil diupdate',
      data: lab
    });
  } catch (error) {
    console.error('Error updating lab:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

const deleteLab = async (req, res) => {
  try {
    const { id } = req.params;

    const lab = await Laboratorium.findByPk(id);

    if (!lab) {
      return res.status(404).json({ message: 'Laboratorium tidak ditemukan' });
    }

    await lab.destroy();

    res.status(200).json({
      message: 'Laboratorium berhasil dihapus'
    });
  } catch (error) {
    console.error('Error deleting lab:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = {
  getAllLabs,
  createLab,
  updateLab,
  deleteLab
};
