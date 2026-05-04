const express = require('express');
const router = express.Router();
const labController = require('../controllers/labController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', labController.getAllLabs);
router.post('/', labController.createLab);
router.put('/:id', labController.updateLab);
router.delete('/:id', labController.deleteLab);

module.exports = router;
