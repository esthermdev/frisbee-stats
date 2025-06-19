import React, { useState } from 'react';
import playerService from '../services/playerService';

const PlayerTable = ({ players, team, onPlayerUpdated, onPlayerDeleted }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [timestampInput, setTimestampInput] = useState('');

  const teamPlayers = players.filter(player => player.team === team);

  const handleStatUpdate = async (playerId, stat, value) => {
    setIsUpdating(true);
    try {
      const updatedPlayer = await playerService.updatePlayerStat(playerId, stat, value);
      onPlayerUpdated(updatedPlayer);
      
      // Update selected player if it's the same player being updated
      if (selectedPlayer && selectedPlayer.id === playerId) {
        setSelectedPlayer(updatedPlayer);
      }
    } catch (error) {
      console.error('Error updating stat:', error);
      alert('Failed to update stat');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleTurnoverAdd = async (playerId, turnoverType) => {
    setIsUpdating(true);
    try {
      const updatedPlayer = await playerService.addTurnover(playerId, turnoverType, timestampInput.trim() || null);
      onPlayerUpdated(updatedPlayer);
      
      // Update selected player if it's the same player being updated
      if (selectedPlayer && selectedPlayer.id === playerId) {
        setSelectedPlayer(updatedPlayer);
      }
      
      // Clear timestamp input after successful addition
      setTimestampInput('');
    } catch (error) {
      console.error('Error adding turnover:', error);
      alert('Failed to add turnover');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleTurnoverRemove = async (playerId, turnoverType) => {
    setIsUpdating(true);
    try {
      const updatedPlayer = await playerService.removeTurnover(playerId, turnoverType);
      onPlayerUpdated(updatedPlayer);
      
      // Update selected player if it's the same player being updated
      if (selectedPlayer && selectedPlayer.id === playerId) {
        setSelectedPlayer(updatedPlayer);
      }
    } catch (error) {
      console.error('Error removing turnover:', error);
      alert('Failed to remove turnover: ' + error.response?.data?.error || error.message);
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
      
      // Close modal if the deleted player was selected
      if (selectedPlayer && selectedPlayer.id === playerId) {
        setSelectedPlayer(null);
      }
    } catch (error) {
      console.error('Error deleting player:', error);
      alert('Failed to delete player');
    }
  };

  // Close modal on Escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedPlayer(null);
      }
    };

    if (selectedPlayer) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [selectedPlayer]);

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
            <th>Manage TO</th>
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
                  <span 
                    className="stat-value"
                    onClick={() => handleStatUpdate(player.id, 'opp', 1)}
                    title="Click to increase O Points"
                  >
                    {player.opp}
                  </span>
                  <button 
                    className="stat-btn decrement"
                    onClick={() => handleStatUpdate(player.id, 'opp', -1)}
                    disabled={isUpdating || player.opp === 0}
                    title="Decrease O Points"
                  >
                    -
                  </button>
                </div>
              </td>
              
              <td className="stat-cell">
                <div className="compact-stat-cell">
                  <span 
                    className="stat-value"
                    onClick={() => handleStatUpdate(player.id, 'dpp', 1)}
                    title="Click to increase D Points"
                  >
                    {player.dpp}
                  </span>
                  <button 
                    className="stat-btn decrement"
                    onClick={() => handleStatUpdate(player.id, 'dpp', -1)}
                    disabled={isUpdating || player.dpp === 0}
                    title="Decrease D Points"
                  >
                    -
                  </button>
                </div>
              </td>
              
              <td className="stat-cell">
                <div className="compact-stat-cell">
                  <span 
                    className="stat-value"
                    onClick={() => handleStatUpdate(player.id, 'touches', 1)}
                    title="Click to increase Touches"
                  >
                    {player.touches}
                  </span>
                  <button 
                    className="stat-btn decrement"
                    onClick={() => handleStatUpdate(player.id, 'touches', -1)}
                    disabled={isUpdating || player.touches === 0}
                    title="Decrease Touches"
                  >
                    -
                  </button>
                </div>
              </td>
              
              <td className="stat-cell">
                <div className="compact-stat-cell">
                  <span 
                    className="stat-value"
                    onClick={() => handleStatUpdate(player.id, 'goals', 1)}
                    title="Click to increase Goals"
                  >
                    {player.goals}
                  </span>
                  <button 
                    className="stat-btn decrement"
                    onClick={() => handleStatUpdate(player.id, 'goals', -1)}
                    disabled={isUpdating || player.goals === 0}
                    title="Decrease Goals"
                  >
                    -
                  </button>
                </div>
              </td>
              
              <td className="stat-cell">
                <div className="compact-stat-cell">
                  <span 
                    className="stat-value"
                    onClick={() => handleStatUpdate(player.id, 'assists', 1)}
                    title="Click to increase Assists"
                  >
                    {player.assists}
                  </span>
                  <button 
                    className="stat-btn decrement"
                    onClick={() => handleStatUpdate(player.id, 'assists', -1)}
                    disabled={isUpdating || player.assists === 0}
                    title="Decrease Assists"
                  >
                    -
                  </button>
                </div>
              </td>
              
              <td className="stat-cell">
                <div className="compact-stat-cell">
                  <span 
                    className="stat-value"
                    onClick={() => handleStatUpdate(player.id, 'defense', 1)}
                    title="Click to increase Defense"
                  >
                    {player.defense}
                  </span>
                  <button 
                    className="stat-btn decrement"
                    onClick={() => handleStatUpdate(player.id, 'defense', -1)}
                    disabled={isUpdating || player.defense === 0}
                    title="Decrease Defense"
                  >
                    -
                  </button>
                </div>
              </td>
              
              <td className="stat-cell">
                <div className="compact-stat-cell">
                  <span 
                    className="stat-value"
                    onClick={() => handleStatUpdate(player.id, 'hucks', 1)}
                    title="Click to increase Hucks"
                  >
                    {player.hucks}
                  </span>
                  <button 
                    className="stat-btn decrement"
                    onClick={() => handleStatUpdate(player.id, 'hucks', -1)}
                    disabled={isUpdating || player.hucks === 0}
                    title="Decrease Hucks"
                  >
                    -
                  </button>
                </div>
              </td>
              
              <td className="stat-cell">
                <span className="stat-value">{player.turnovers}</span>
              </td>
              
              <td>
                <button 
                  className="manage-turnover-btn"
                  onClick={() => setSelectedPlayer(player)}
                  disabled={isUpdating}
                  title="Manage Turnovers"
                >
                  Manage TO
                </button>
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
      
      {/* Simplified Turnover Management Modal */}
      {selectedPlayer && (
        <div className="modal-overlay" onClick={() => setSelectedPlayer(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Manage Turnovers - {selectedPlayer.name}</h3>
              <button className="modal-close" onClick={() => setSelectedPlayer(null)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="turnover-stats">
                <div className="turnover-summary">
                  <h4>Current Turnover Stats</h4>
                  <p>Total Turnovers: <strong>{selectedPlayer.turnovers}</strong></p>
                </div>
                
                <div className="timestamp-input">
                  <label htmlFor="timestamp">Timestamp (optional):</label>
                  <input
                    id="timestamp"
                    type="text"
                    value={timestampInput}
                    onChange={(e) => setTimestampInput(e.target.value)}
                    placeholder="e.g., 1:23:45 or Quarter 2 - 5:30"
                    disabled={isUpdating}
                  />
                </div>
                
                <div className="turnover-types">
                  <div className="turnover-row">
                    <span className="turnover-label">Red Zone TO:</span>
                    <div className="turnover-controls">
                      <span 
                        className="stat-value"
                        onClick={() => handleTurnoverAdd(selectedPlayer.id, 'RZTO')}
                        title="Click to add Red Zone TO"
                      >
                        {selectedPlayer.rzto}
                      </span>
                      <button 
                        className="stat-btn decrement turnover-remove"
                        onClick={() => handleTurnoverRemove(selectedPlayer.id, 'RZTO')}
                        disabled={isUpdating || selectedPlayer.rzto === 0}
                        title="Remove Red Zone TO"
                      >
                        -
                      </button>
                    </div>
                  </div>
                  
                  <div className="turnover-row">
                    <span className="turnover-label">Huck TO:</span>
                    <div className="turnover-controls">
                      <span 
                        className="stat-value"
                        onClick={() => handleTurnoverAdd(selectedPlayer.id, 'HTO')}
                        title="Click to add Huck TO"
                      >
                        {selectedPlayer.hto}
                      </span>
                      <button 
                        className="stat-btn decrement turnover-remove"
                        onClick={() => handleTurnoverRemove(selectedPlayer.id, 'HTO')}
                        disabled={isUpdating || selectedPlayer.hto === 0}
                        title="Remove Huck TO"
                      >
                        -
                      </button>
                    </div>
                  </div>
                  
                  <div className="turnover-row">
                    <span className="turnover-label">Reset TO:</span>
                    <div className="turnover-controls">
                      <span 
                        className="stat-value"
                        onClick={() => handleTurnoverAdd(selectedPlayer.id, 'Reset TO')}
                        title="Click to add Reset TO"
                      >
                        {selectedPlayer.resetTo}
                      </span>
                      <button 
                        className="stat-btn decrement turnover-remove"
                        onClick={() => handleTurnoverRemove(selectedPlayer.id, 'Reset TO')}
                        disabled={isUpdating || selectedPlayer.resetTo === 0}
                        title="Remove Reset TO"
                      >
                        -
                      </button>
                    </div>
                  </div>
                  
                  <div className="turnover-row">
                    <span className="turnover-label">Receiver Error:</span>
                    <div className="turnover-controls">
                      <span 
                        className="stat-value"
                        onClick={() => handleTurnoverAdd(selectedPlayer.id, 'Receiver Err')}
                        title="Click to add Receiver Error"
                      >
                        {selectedPlayer.receiverErr}
                      </span>
                      <button 
                        className="stat-btn decrement turnover-remove"
                        onClick={() => handleTurnoverRemove(selectedPlayer.id, 'Receiver Err')}
                        disabled={isUpdating || selectedPlayer.receiverErr === 0}
                        title="Remove Receiver Error"
                      >
                        -
                      </button>
                    </div>
                  </div>
                  
                  <div className="turnover-row">
                    <span className="turnover-label">Thrower Error:</span>
                    <div className="turnover-controls">
                      <span 
                        className="stat-value"
                        onClick={() => handleTurnoverAdd(selectedPlayer.id, 'Thrower Err')}
                        title="Click to add Thrower Error"
                      >
                        {selectedPlayer.throwerErr}
                      </span>
                      <button 
                        className="stat-btn decrement turnover-remove"
                        onClick={() => handleTurnoverRemove(selectedPlayer.id, 'Thrower Err')}
                        disabled={isUpdating || selectedPlayer.throwerErr === 0}
                        title="Remove Thrower Error"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerTable;