import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExportButton = ({ players }) => {
  const exportToExcel = () => {
    if (players.length === 0) {
      alert('No players to export');
      return;
    }

    // Separate players by team
    const offencePlayers = players.filter(player => player.team === 'Offence');
    const defencePlayers = players.filter(player => player.team === 'Defence');

    // Create export data for both teams
    const createExportData = (teamPlayers) => {
      const playerData = [];
      
      teamPlayers.forEach(player => {
        // Add player stats row
        playerData.push({
          Name: player.name,
          Team: player.team,
          'O Points': player.opp,
          'D Points': player.dpp,
          Touches: player.touches,
          Goals: player.goals,
          Assists: player.assists,
          Defense: player.defense,
          Hucks: player.hucks,
          'Total Turnovers': player.turnovers,
          'Red Zone TO': player.rzto,
          'Huck TO': player.hto,
          'Reset TO': player.resetTo,
          'Receiver Errors': player.receiverErr,
          'Thrower Errors': player.throwerErr
        });
        
        // Add turnover details if they exist
        if (player.turnoverDetails && player.turnoverDetails.length > 0) {
          player.turnoverDetails.forEach(turnover => {
            playerData.push({
              Name: `  └ ${player.name} Turnover`,
              Team: '',
              'O Points': '',
              'D Points': '',
              Touches: '',
              Goals: '',
              Assists: '',
              Defense: '',
              Hucks: '',
              'Total Turnovers': '',
              'Red Zone TO': '',
              'Huck TO': '',
              'Reset TO': '',
              'Receiver Errors': '',
              'Thrower Errors': '',
              'Turnover Type': turnover.type,
              'Timestamp': turnover.timestamp || 'No timestamp'
            });
          });
        }
      });
      
      return playerData;
    };

    // Create workbook
    const workbook = XLSX.utils.book_new();

    // Add Offence sheet
    if (offencePlayers.length > 0) {
      const offenceData = createExportData(offencePlayers);
      const offenceWorksheet = XLSX.utils.json_to_sheet(offenceData);
      XLSX.utils.book_append_sheet(workbook, offenceWorksheet, 'Offence');
    }

    // Add Defence sheet
    if (defencePlayers.length > 0) {
      const defenceData = createExportData(defencePlayers);
      const defenceWorksheet = XLSX.utils.json_to_sheet(defenceData);
      XLSX.utils.book_append_sheet(workbook, defenceWorksheet, 'Defence');
    }

    // Add combined sheet
    const allData = createExportData(players);
    const allWorksheet = XLSX.utils.json_to_sheet(allData);
    XLSX.utils.book_append_sheet(workbook, allWorksheet, 'All Players');

    // Create separate turnovers sheet
    const turnoversData = [];
    players.forEach(player => {
      if (player.turnoverDetails && player.turnoverDetails.length > 0) {
        player.turnoverDetails.forEach(turnover => {
          turnoversData.push({
            'Player Name': player.name,
            'Team': player.team,
            'Turnover Type': turnover.type,
            'Timestamp': turnover.timestamp || 'No timestamp'
          });
        });
      }
    });

    if (turnoversData.length > 0) {
      const turnoversWorksheet = XLSX.utils.json_to_sheet(turnoversData);
      XLSX.utils.book_append_sheet(workbook, turnoversWorksheet, 'Turnovers');
    }

    // Export the file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    saveAs(data, `ultimate_stats_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <button className="export-btn" onClick={exportToExcel}>
      Export Stats
    </button>
  );
};

export default ExportButton;