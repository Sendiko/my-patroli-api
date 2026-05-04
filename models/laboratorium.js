'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Laboratorium extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Laboratorium.belongsTo(models.User, { foreignKey: 'laboran_id', as: 'laboran' });
      Laboratorium.belongsTo(models.User, { foreignKey: 'asisten_id', as: 'asisten' });
      Laboratorium.hasMany(models.BarangHilang, { foreignKey: 'lab_id', as: 'barangHilang' });
    }
  }
  Laboratorium.init({
    kode_lab: DataTypes.STRING,
    nama_lab: DataTypes.STRING,
    laboran_id: DataTypes.INTEGER,
    asisten_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Laboratorium',
  });
  return Laboratorium;
};