const express = require('express');
const router = express.Router();
const lokasiController = require('../controllers/lokasiController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', lokasiController.getAllLokasi);
router.post('/', lokasiController.createLokasi);
router.put('/:id', lokasiController.updateLokasi);
router.delete('/:id', lokasiController.deleteLokasi);

module.exports = router;
