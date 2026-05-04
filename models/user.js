'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Laboratorium, { foreignKey: 'laboran_id', as: 'laboranLabs' });
      User.hasMany(models.Laboratorium, { foreignKey: 'asisten_id', as: 'asistenLabs' });
      User.hasMany(models.BarangHilang, { foreignKey: 'pelapor_id', as: 'laporanBarang' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('laboran', 'asisten'),
      allowNull: false
    },
    nama_lengkap: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};