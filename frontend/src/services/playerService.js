import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

class PlayerService {
  async getAllPlayers() {
    const response = await axios.get(`${API_BASE_URL}/players`);
    return response.data;
  }

  async createPlayer(name, team) {
    const response = await axios.post(`${API_BASE_URL}/players`, { name, team });
    return response.data;
  }

  async updatePlayerStat(playerId, stat, value = 1) {
    const response = await axios.patch(`${API_BASE_URL}/players/${playerId}/stat/${stat}`, { value });
    return response.data;
  }

  async addTurnover(playerId, type, timestamp = null) {
    const response = await axios.post(`${API_BASE_URL}/players/${playerId}/turnover`, { 
      type, 
      timestamp 
    });
    return response.data;
  }

  async removeTurnover(playerId, type) {
    const response = await axios.delete(`${API_BASE_URL}/players/${playerId}/turnover/remove`, {
      data: { type }
    });
    return response.data;
  }

  async deletePlayer(playerId) {
    await axios.delete(`${API_BASE_URL}/players/${playerId}`);
    return true;
  }
}

const playerServiceInstance = new PlayerService();
export default playerServiceInstance;