const playerService = require('../services/playerService');

const validStats = ['opp', 'dpp', 'touches', 'goals', 'assists', 'defense', 'hucks', 'turnovers', 'rzto', 'hto', 'resetTo', 'receiverErr', 'throwerErr'];

class PlayerController {
  async getAllPlayers(req, res) {
    try {
      console.log('Players route hit!');
      const players = await playerService.getAllPlayers();
      res.json(players);
    } catch (error) {
      console.error('Error fetching players:', error);
      res.status(500).json({ error: 'Failed to fetch players' });
    }
  }

  async createPlayer(req, res) {
    try {
      const { name, team } = req.body;
      console.log('Player added successfully');
      const player = await playerService.createPlayer(name, team);
      res.json(player);
    } catch (error) {
      console.error('Error creating player:', error);
      res.status(400).json({ error: 'Failed to create player' });
    }
  }

  async updatePlayerStat(req, res) {
    try {
      const { id, stat } = req.params;
      const { value = 1 } = req.body;

      if (!validStats.includes(stat)) {
        return res.status(400).json({ error: 'Invalid stat name' });
      }

      const player = await playerService.updatePlayerStat(id, stat, value);
      res.json(player);
    } catch (error) {
      console.error('Error updating stat:', error);
      res.status(400).json({ error: 'Failed to update stat' });
    }
  }

  async addTurnover(req, res) {
    try {
      const { id } = req.params;
      const { type, timestamp } = req.body;

      const player = await playerService.addTurnover(id, type, timestamp);
      res.json(player);
    } catch (error) {
      console.error('Error adding turnover:', error);
      res.status(400).json({ error: 'Failed to add turnover' });
    }
  }

  async deletePlayer(req, res) {
    try {
      const { id } = req.params;
      await playerService.deletePlayer(id);
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting player:', error);
      res.status(400).json({ error: 'Failed to delete player' });
    }
  }
}

module.exports = new PlayerController();