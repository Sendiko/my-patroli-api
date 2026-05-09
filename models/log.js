'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Log.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Log.init({
    userId: DataTypes.INTEGER,
    action: DataTypes.STRING,
    tableName: DataTypes.STRING,
    endpoint: DataTypes.STRING,
    method: DataTypes.STRING,
    payload: DataTypes.TEXT,
    ipAddress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Log',
  });
  return Log;
};
