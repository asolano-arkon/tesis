const express = require('express');
const router = express.Router();
const vitalSignsController = require('../controllers/vitalSignsController');

router.get('/:patientId', vitalSignsController.findByPatientId);
router.post('/', vitalSignsController.createVitalSign);
router.put('/:id', vitalSignsController.updateVitalSign);
router.delete('/:id', vitalSignsController.deleteVitalSign);

module.exports = router;
