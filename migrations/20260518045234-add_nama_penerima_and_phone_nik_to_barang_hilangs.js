'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('BarangHilangs', 'nama_penerima', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('BarangHilangs', 'phone_nik', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('BarangHilangs', 'nama_penerima');
    await queryInterface.removeColumn('BarangHilangs', 'phone_nik');
  }
};
