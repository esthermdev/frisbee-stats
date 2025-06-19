const express = require('express');
const playerController = require('../../controllers/playerController');

const router = express.Router();

router.get('/', playerController.getAllPlayers);
router.post('/', playerController.createPlayer);
router.patch('/:id/stat/:stat', playerController.updatePlayerStat);
router.post('/:id/turnover', playerController.addTurnover);
router.delete('/:id', playerController.deletePlayer);

module.exports = router;