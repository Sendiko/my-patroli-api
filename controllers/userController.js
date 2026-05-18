const bcrypt = require('bcrypt');
const { User } = require('../models');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'role', 'nama_lengkap', 'createdAt', 'updatedAt']
    });

    res.status(200).json({
      message: 'Berhasil mengambil daftar user',
      data: users
    });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ['id', 'username', 'role', 'nama_lengkap', 'createdAt', 'updatedAt']
    });

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    res.status(200).json({
      message: 'Berhasil mengambil detail user',
      data: user
    });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, password, role, nama_lengkap } = req.body;

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username sudah digunakan' });
    }

    if (!['laboran', 'asisten'].includes(role)) {
      return res.status(400).json({ message: 'Role harus laboran atau asisten' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      role,
      nama_lengkap
    });

    res.status(201).json({
      message: 'User berhasil ditambahkan',
      data: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
        nama_lengkap: newUser.nama_lengkap
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, role, nama_lengkap } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    if (username && username !== user.username) {
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username sudah digunakan' });
      }
      user.username = username;
    }

    if (role) {
      if (!['laboran', 'asisten'].includes(role)) {
        return res.status(400).json({ message: 'Role harus laboran atau asisten' });
      }
      user.role = role;
    }

    if (nama_lengkap) {
      user.nama_lengkap = nama_lengkap;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json({
      message: 'User berhasil diupdate',
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        nama_lengkap: user.nama_lengkap
      }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    // Mencegah user menghapus diri sendiri (opsional tapi disarankan)
    if (user.id === req.user.id) {
      return res.status(400).json({ message: 'Anda tidak bisa menghapus diri sendiri' });
    }

    await user.destroy();

    res.status(200).json({
      message: 'User berhasil dihapus'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
