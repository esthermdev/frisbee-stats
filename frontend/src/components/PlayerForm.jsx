import { useState } from 'react';
import playerService from '../services/playerService';

const PlayerForm = ({ onPlayerCreated }) => {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('Offence');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const newPlayer = await playerService.createPlayer(name.trim(), team);
      onPlayerCreated(newPlayer);
      setName('');
      setTeam('Offence');
    } catch (error) {
      console.error('Error creating player:', error);
      alert('Failed to create player');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="enhanced-player-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>
          <span className="form-icon">👤</span>
          Add New Player
        </h2>
      </div>
      
      <div className="form-fields">
        <div className="input-group">
          <label htmlFor="player-name">Player Name</label>
          <input
            id="player-name"
            type="text"
            placeholder="Enter player name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="enhanced-input"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="team-select">Team</label>
          <div className="enhanced-select-wrapper">
            <select 
              id="team-select"
              value={team} 
              onChange={(e) => setTeam(e.target.value)}
              className="enhanced-select"
            >
              <option value="Offence">Offence</option>
              <option value="Defence">Defence</option>
            </select>
            <div className="select-arrow">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="enhanced-button"
        >
          <span className="button-text">
            {isSubmitting ? 'Adding...' : 'Add Player'}
          </span>
        </button>
      </div>
    </form>
  );
};

export default PlayerForm;