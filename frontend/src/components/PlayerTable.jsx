import React, { useState } from 'react';
import playerService from '../services/playerService';

const PlayerTable = ({ players, team, onPlayerUpdated, onPlayerDeleted }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const teamPlayers = players.filter(player => player.team === team);

  const handleStatUpdate = async (playerId, stat, value) => {
    setIsUpdating(true);
    try {
      const updatedPlayer = await playerService.updatePlayerStat(playerId, stat, value);
      onPlayerUpdated(updatedPlayer);
    } catch (error) {
      console.error('Error updating stat:', error);
      alert('Failed to update stat');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleTurnover = async (playerId, type) => {
    setIsUpdating(true);
    try {
      const updatedPlayer = await playerService.addTurnover(playerId, type);
      onPlayerUpdated(updatedPlayer);
    } catch (error) {
      console.error('Error adding turnover:', error);
      alert('Failed to add turnover');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (playerId, playerName) => {
    if (!window.confirm(`Are you sure you want to delete ${playerName}?`)) {
      return;
    }

    try {
      await playerService.deletePlayer(playerId);
      onPlayerDeleted(playerId);
    } catch (error) {
      console.error('Error deleting player:', error);
      alert('Failed to delete player');
    }
  };


  if (teamPlayers.length === 0) {
    return (
      <div className="team-section">
        <div className="team-header">
          <h2 className="team-title">{team} ({teamPlayers.length})</h2>
        </div>
        <div className="no-players">
          <h3>No {team.toLowerCase()} players yet</h3>
          <p>Add players using the form above.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="team-section">
      <div className="team-header">
        <h2 className="team-title">{team} ({teamPlayers.length})</h2>
      </div>
      
      <table className="players-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>O Points</th>
            <th>D Points</th>
            <th>Touches</th>
            <th>Goals</th>
            <th>Assists</th>
            <th>Defense</th>
            <th>Hucks</th>
            <th>Total TO</th>
            <th>Actions</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {teamPlayers.map(player => (
            <tr key={player.id}>
              <td>
                <strong>{player.name}</strong>
              </td>
              
              <td className="stat-cell">
                <div className="compact-stat-cell">
                  <button 
                    className="stat-btn decrement"
                    onClick={() => handleStatUpdate(player.id, 'opp', -1)}
                    disabled={isUpdating || player.opp === 0}
                    title="Decrease O Points"
                  >
                    -
                  </button>
                  <span className="stat-value">{player.opp}</span>
                  <button 
                    className="stat-btn increment"
                    onClick={() => handleStatUpdate(player.id, 'opp', 1)}
                    disabled={isUpdating}
                    title="Increase O Points"
                  >
                    +
                  </button>
                </div>
              </td>
              
              <td className="stat-cell">
                <div className="compact-stat-cell">
                  <button 
                    className="stat-btn decrement"
                    onClick={() => handleStatUpdate(player.id, 'dpp', -1)}
                    disabled={isUpdating || player.dpp === 0}
                    title="Decrease D Points"
                  >
                    -
                  </button>
                  <span className="stat-value">{player.dpp}</span>
                  <button 
                    className="stat-btn increment"
                    onClick={() => handleStatUpdate(player.id, 'dpp', 1)}
                    disabled={isUpdating}
                    title="Increase D Points"
                  >
                    +
                  </button>
                </div>
              </td>
              
              <td className="stat-cell">
                <div className="compact-stat-cell">
                  <button 
                    className="stat-btn decrement"
                    onClick={() => handleStatUpdate(player.id, 'touches', -1)}
                    disabled={isUpdating || player.touches === 0}
                    title="Decrease Touches"
                  >
                    -
                  </button>
                  <span className="stat-value">{player.touches}</span>
                  <button 
                    className="stat-btn increment"
                    onClick={() => handleStatUpdate(player.id, 'touches', 1)}
                    disabled={isUpdating}
                    title="Increase Touches"
                  >
                    +
                  </button>
                </div>
              </td>
              
              <td className="stat-cell">
                <span className="stat-value">{player.goals}</span>
              </td>
              
              <td className="stat-cell">
                <span className="stat-value">{player.assists}</span>
              </td>
              
              <td className="stat-cell">
                <span className="stat-value">{player.defense}</span>
              </td>
              
              <td className="stat-cell">
                <span className="stat-value">{player.hucks}</span>
              </td>
              
              <td className="stat-cell">
                <span className="stat-value">{player.turnovers}</span>
              </td>
              
              <td>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1px', maxWidth: '120px' }}>
                  <button 
                    className="action-btn goal"
                    onClick={() => handleStatUpdate(player.id, 'goals', 1)}
                    disabled={isUpdating}
                  >
                    G
                  </button>
                  <button 
                    className="action-btn assist"
                    onClick={() => handleStatUpdate(player.id, 'assists', 1)}
                    disabled={isUpdating}
                  >
                    A
                  </button>
                  <button 
                    className="action-btn defense"
                    onClick={() => handleStatUpdate(player.id, 'defense', 1)}
                    disabled={isUpdating}
                  >
                    D
                  </button>
                  <button 
                    className="action-btn huck"
                    onClick={() => handleStatUpdate(player.id, 'hucks', 1)}
                    disabled={isUpdating}
                  >
                    H
                  </button>
                  <button 
                    className="action-btn turnover-btn"
                    onClick={() => handleTurnover(player.id, 'RZTO')}
                    disabled={isUpdating}
                    title="Red Zone Turnover"
                  >
                    RZ
                  </button>
                  <button 
                    className="action-btn turnover-btn"
                    onClick={() => handleTurnover(player.id, 'HTO')}
                    disabled={isUpdating}
                    title="Huck Turnover"
                  >
                    HT
                  </button>
                  <button 
                    className="action-btn turnover-btn"
                    onClick={() => handleTurnover(player.id, 'Reset TO')}
                    disabled={isUpdating}
                    title="Reset Turnover"
                  >
                    RT
                  </button>
                  <button 
                    className="action-btn turnover-btn"
                    onClick={() => handleTurnover(player.id, 'Turnover')}
                    disabled={isUpdating}
                    title="General Turnover"
                  >
                    T
                  </button>
                </div>
              </td>
              
              <td>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(player.id, player.name)}
                  disabled={isUpdating}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerTable;