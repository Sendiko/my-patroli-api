'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kategori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Kategori.hasMany(models.BarangHilang, { foreignKey: 'kategori_id', as: 'barangHilang' });
    }
  }
  Kategori.init({
    nama_kategori: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Kategori',
  });
  return Kategori;
};
