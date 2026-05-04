'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BarangHilangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kategori_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Kategoris',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      sumber_lokasi: {
        type: Sequelize.ENUM('laboratorium', 'cleaning_service', 'mahasiswa'),
        allowNull: false
      },
      lab_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Laboratoria',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      deskripsi: {
        type: Sequelize.TEXT
      },
      lokasi_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'LokasiPenyimpanans',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      detail_penyimpanan: {
        type: Sequelize.STRING
      },
      foto_url: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('belum_diambil', 'sudah_diambil'),
        defaultValue: 'belum_diambil'
      },
      tanggal_waktu: {
        type: Sequelize.DATE
      },
      pelapor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BarangHilangs');
  }
};