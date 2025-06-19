const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

class PlayerService {
  async getAllPlayers() {
    const players = await prisma.player.findMany({
      include: {
        turnovers: true
      }
    });
    
    return players.map(player => {
      const { turnovers: playerTurnovers, ...playerStats } = player;
      
      // Map team values from DB to frontend expected values
      const teamMapping = {
        'O': 'Offence',
        'D': 'Defence',
        'Offence': 'Offence',
        'Defence': 'Defence'
      };
      
      const safePlayerStats = {
        ...playerStats,
        team: teamMapping[playerStats.team] || playerStats.team,
        turnovers: playerTurnovers?.length || 0,
        rzto: playerStats.rzto || 0,
        hto: playerStats.hto || 0,
        resetTo: playerStats.resetTo || 0,
        receiverErr: playerStats.receiverErr || 0,
        throwerErr: playerStats.throwerErr || 0
      };
      
      const turnoverDetails = playerTurnovers?.map(to => ({
        id: to.id,
        type: to.type,
        timestamp: to.timestamp || ''
      })) || [];
      
      return {
        ...safePlayerStats,
        turnoverDetails
      };
    });
  }

  async createPlayer(name, team) {
    return await prisma.player.create({
      data: { name, team }
    });
  }

  async updatePlayerStat(id, stat, value = 1) {
    const player = await prisma.player.update({
      where: { id: parseInt(id) },
      data: { [stat]: { increment: value } },
      include: {
        turnovers: true
      }
    });

    // Apply the same formatting as getAllPlayers
    const { turnovers: playerTurnovers, ...playerStats } = player;
    
    const teamMapping = {
      'O': 'Offence',
      'D': 'Defence',
      'Offence': 'Offence',
      'Defence': 'Defence'
    };
    
    const safePlayerStats = {
      ...playerStats,
      team: teamMapping[playerStats.team] || playerStats.team,
      turnovers: playerTurnovers?.length || 0,
      rzto: playerStats.rzto || 0,
      hto: playerStats.hto || 0,
      resetTo: playerStats.resetTo || 0,
      receiverErr: playerStats.receiverErr || 0,
      throwerErr: playerStats.throwerErr || 0
    };
    
    const turnoverDetails = playerTurnovers?.map(to => ({
      id: to.id,
      type: to.type,
      timestamp: to.timestamp || ''
    })) || [];
    
    return {
      ...safePlayerStats,
      turnoverDetails
    };
  }

  async addTurnover(id, type, timestamp) {
    const typeMap = {
      'RZTO': 'rzto',
      'HTO': 'hto',
      'Reset TO': 'resetTo',
      'Receiver Err': 'receiverErr',
      'Thrower Err': 'throwerErr',
      'Turnover': 'regular'
    };

    const fieldToUpdate = typeMap[type];
    if (!fieldToUpdate) {
      throw new Error('Invalid turnover type');
    }

    let player;
    if (fieldToUpdate === 'regular') {
      player = await prisma.player.update({
        where: { id: parseInt(id) },
        data: {
          turnovers: {
            create: {
              timestamp: timestamp || null,
              type: 'regular'
            }
          }
        },
        include: {
          turnovers: true
        }
      });
    } else {
      player = await prisma.player.update({
        where: { id: parseInt(id) },
        data: {
          [fieldToUpdate]: { increment: 1 },
          turnovers: {
            create: {
              timestamp: timestamp || null,
              type: fieldToUpdate
            }
          }
        },
        include: {
          turnovers: true
        }
      });
    }

    // Apply the same formatting as getAllPlayers
    const { turnovers: playerTurnovers, ...playerStats } = player;
    
    const teamMapping = {
      'O': 'Offence',
      'D': 'Defence',
      'Offence': 'Offence',
      'Defence': 'Defence'
    };
    
    const safePlayerStats = {
      ...playerStats,
      team: teamMapping[playerStats.team] || playerStats.team,
      turnovers: playerTurnovers?.length || 0,
      rzto: playerStats.rzto || 0,
      hto: playerStats.hto || 0,
      resetTo: playerStats.resetTo || 0,
      receiverErr: playerStats.receiverErr || 0,
      throwerErr: playerStats.throwerErr || 0
    };
    
    const turnoverDetails = playerTurnovers?.map(to => ({
      id: to.id,
      type: to.type,
      timestamp: to.timestamp || ''
    })) || [];
    
    return {
      ...safePlayerStats,
      turnoverDetails
    };
  }

  async deletePlayer(id) {
    return await prisma.player.delete({
      where: { id: parseInt(id) }
    });
  }
}

module.exports = new PlayerService();