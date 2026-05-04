'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BarangHilang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BarangHilang.belongsTo(models.Laboratorium, { foreignKey: 'lab_id', as: 'laboratorium' });
      BarangHilang.belongsTo(models.User, { foreignKey: 'pelapor_id', as: 'pelapor' });
    }
  }
  BarangHilang.init({
    kategori: DataTypes.STRING,
    sumber_lokasi: {
      type: DataTypes.ENUM('laboratorium', 'cleaning_service', 'mahasiswa'),
      allowNull: false
    },
    lab_id: DataTypes.INTEGER,
    deskripsi: DataTypes.TEXT,
    lokasi_penyimpanan: {
      type: DataTypes.ENUM('loker_1', 'loker_2', 'lainnya'),
      allowNull: false
    },
    detail_penyimpanan: DataTypes.STRING,
    foto_url: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('belum_diambil', 'sudah_diambil'),
      defaultValue: 'belum_diambil'
    },
    tanggal_waktu: DataTypes.DATE,
    pelapor_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BarangHilang',
  });
  return BarangHilang;
};