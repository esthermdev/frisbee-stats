import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerForm from './components/PlayerForm.jsx';
import PlayerTable from './components/PlayerTable.jsx';
import ExportButton from './components/ExportButton.jsx';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

function App() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/players`);
      setPlayers(response.data);
    } catch (err) {
      setError('Failed to fetch players');
      console.error('Error fetching players:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerCreated = (newPlayer) => {
    setPlayers(prev => [...prev, newPlayer]);
  };

  const handlePlayerUpdated = (updatedPlayer) => {
    setPlayers(prev => 
      prev.map(player => 
        player.id === updatedPlayer.id ? updatedPlayer : player
      )
    );
  };

  const handlePlayerDeleted = (playerId) => {
    setPlayers(prev => prev.filter(player => player.id !== playerId));
  };

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">Error: {error}</div>;

  return (
    <div className="container">
      <header className="header">
        <h1>Ultimate Stats Tracker</h1>
        <p>Track player statistics for Ultimate Frisbee games</p>
        <ExportButton players={players} />
      </header>
      
      <PlayerForm onPlayerCreated={handlePlayerCreated} />
      
      <PlayerTable 
        players={players}
        team="Offence"
        onPlayerUpdated={handlePlayerUpdated}
        onPlayerDeleted={handlePlayerDeleted}
      />
      
      <PlayerTable 
        players={players}
        team="Defence"
        onPlayerUpdated={handlePlayerUpdated}
        onPlayerDeleted={handlePlayerDeleted}
      />
    </div>
  );
}

export default App;