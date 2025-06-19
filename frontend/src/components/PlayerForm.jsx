import React, { useState } from 'react';
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
    <form className="player-form" onSubmit={handleSubmit}>
      <h2>Add New Player</h2>
      <div>
        <input
          type="text"
          placeholder="Player Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select 
          value={team} 
          onChange={(e) => setTeam(e.target.value)}
        >
          <option value="Offence">Offence</option>
          <option value="Defence">Defence</option>
        </select>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Player'}
        </button>
      </div>
    </form>
  );
};

export default PlayerForm;