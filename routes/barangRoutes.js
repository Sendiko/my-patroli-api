const express = require('express');
const router = express.Router();
const barangController = require('../controllers/barangController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

// Semua route di bawah ini diproteksi oleh authMiddleware
router.use(authMiddleware);

router.post('/', uploadMiddleware.single('foto'), barangController.createBarang);
router.get('/', barangController.getAllBarang);
router.patch('/:id/status', barangController.updateStatus);

module.exports = router;
