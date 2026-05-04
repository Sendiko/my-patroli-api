'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    await queryInterface.bulkInsert('Users', [
      {
        username: 'laboran_1',
        password: hashedPassword,
        role: 'laboran',
        nama_lengkap: 'Budi Laboran',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'asisten_1',
        password: hashedPassword,
        role: 'asisten',
        nama_lengkap: 'Siti Asisten',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
