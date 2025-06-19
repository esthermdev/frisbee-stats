# Ultimate Stats Tracker

A web application for tracking statistics in ultimate frisbee games.

## Architecture Overview

This is a full-stack web application with a React frontend, Express.js backend, and PostgreSQL database, all containerized with Docker.

### Tech Stack
- **Frontend**: React 18.2.0 with Axios for API calls, Excel export functionality
- **Backend**: Express.js 5.1.0 with CORS support and structured routing
- **Database**: PostgreSQL 15 with Prisma 6.6.0 ORM
- **Containerization**: Docker Compose for multi-service deployment
- **Logging**: Winston 3.17.0 for comprehensive server-side logging
- **File Processing**: XLSX support for data export/import

## Project Structure

```
ultimate-stats-tracker/
├── frontend/                   # React frontend application
│   ├── Dockerfile             # Frontend container configuration
│   ├── public/
│   │   └── index.html         # Main HTML template
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ExportButton.jsx    # Excel export functionality
│   │   │   ├── PlayerForm.jsx      # Form for adding/editing players
│   │   │   └── PlayerTable.jsx     # Table displaying player stats
│   │   ├── services/
│   │   │   └── playerService.js    # API service layer
│   │   ├── App.jsx            # Main application component
│   │   ├── index.js           # Application entry point
│   │   └── index.css          # Application styles
│   └── package.json           # Frontend dependencies and scripts
├── backend/                    # Express.js backend
│   ├── Dockerfile             # Backend container configuration
│   ├── server/                # Application code
│   │   ├── server.js          # Main Express server
│   │   ├── controllers/
│   │   │   └── playerController.js  # Request handlers
│   │   ├── services/
│   │   │   └── playerService.js     # Business logic
│   │   ├── routes/            # API routing
│   │   │   ├── api/players.js      # Player endpoints
│   │   │   ├── health/index.js     # Health check
│   │   │   └── index.js            # Route aggregation
│   │   ├── middleware/
│   │   │   └── errorHandler.js     # Error handling
│   │   ├── logger.js          # Winston logging configuration
│   │   └── logs/              # Server log files
│   ├── prisma/                # Database layer
│   │   ├── schema.prisma      # Database schema definition
│   │   └── migrations/        # Database migration files
│   │       ├── 20250415062509_init/
│   │       ├── 20250415090346_add_turnover_timestamps/
│   │       ├── 20250416070347_add_to_turnover_types/
│   │       ├── 20250418024059_add_team_model/
│   │       └── 20250418040644_simplify_team_field/
│   ├── generated/             # Generated Prisma client files
│   │   └── prisma/           # Auto-generated database client
│   ├── logs/                 # Application logs
│   └── package.json          # Backend dependencies and scripts
├── docker-compose.yml         # Multi-service container orchestration
└── package.json              # Root project dependencies and scripts
```

## Data Models

### Player Model
Tracks comprehensive statistics for ultimate frisbee players:
- **Basic Info**: id, name, team (Offence/Defence)
- **Points Played**: opp (O Points), dpp (D Points)
- **Performance Stats**: touches, goals, assists, defense, hucks
- **Turnover Stats**: rzto (Red Zone), hto (Huck), resetTo, receiverErr, throwerErr
- **Relations**: Connected to detailed turnover records

### Turnover Model
Detailed turnover tracking with:
- Player association (foreign key)
- Turnover type classification
- Optional video timestamps
- Creation timestamps

## API Endpoints

- `GET /` - Server status check
- `GET /health` - Health check endpoint
- `GET /api/players` - Retrieve all players with statistics
- Additional CRUD operations for player and turnover management

## Development Scripts

### Root Level
- `npm run dev` - Start all services with Docker Compose
- `npm run setup` - Install dependencies for both frontend and backend

### Frontend
- `npm start` - Start React development server (port 3000)
- `npm run build` - Build production React app
- `npm test` - Run React tests
- `npm run eject` - Eject from Create React App

### Backend
- `npm run dev` - Start backend server with nodemon
- `npm run start` - Start backend server in production mode
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run prisma:reset` - Reset database and reseed

## Docker Services

- **backend**: Express.js API service (ports 5001:5000, 5555:5555)
- **frontend**: React application service (port 3000:3000)
- **db**: PostgreSQL 15 database service (port 5434:5432)

All services are connected via `app-network` with volume mounts for development and comprehensive logging configuration.

## Getting Started

1. **Clone the repository**
2. **Install dependencies**: `npm run setup`
3. **Start development environment**: `npm run dev`
4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001
   - Prisma Studio: http://localhost:5555
   - Database: localhost:5434