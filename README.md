# Ultimate Stats Tracker

A web application for tracking statistics in ultimate frisbee games.

## Architecture Overview

This is a full-stack web application with a React frontend, Express.js backend, and PostgreSQL database, all containerized with Docker.

### Tech Stack
- **Frontend**: React 19.1.0 with drag-and-drop functionality (@dnd-kit)
- **Backend**: Express.js 5.1.0 with CORS support
- **Database**: PostgreSQL with Prisma ORM
- **Containerization**: Docker Compose for multi-service deployment
- **Logging**: Winston for server-side logging

## Project Structure

```
ultimate-stats-tracker/
├── client/                     # React frontend application
│   ├── Dockerfile.client       # Client container configuration
│   ├── nginx.conf              # Nginx configuration for production
│   ├── public/                 # Static assets (favicon, manifest, etc.)
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── AddPlayerForm.jsx    # Form for adding new players
│   │   │   ├── Header.jsx           # Application header
│   │   │   ├── PlayerTable.jsx     # Table displaying player stats
│   │   │   └── TurnoverModal.jsx    # Modal for turnover details
│   │   ├── utils/
│   │   │   └── logger.js            # Client-side logging utility
│   │   ├── App.js              # Main application component
│   │   └── index.js            # Application entry point
│   └── package.json            # Client dependencies and scripts
├── server/                     # Express.js backend
│   ├── server.js               # Main server file with API routes
│   ├── logger.js               # Winston logging configuration
│   └── logs/                   # Server log files
├── prisma/                     # Database layer
│   ├── schema.prisma           # Database schema definition
│   └── migrations/             # Database migration files
│       ├── 20250415062509_init/
│       ├── 20250415090346_add_turnover_timestamps/
│       ├── 20250416070347_add_to_turnover_types/
│       ├── 20250418024059_add_team_model/
│       └── 20250418040644_simplify_team_field/
├── generated/                  # Generated Prisma client files
│   └── prisma/                # Auto-generated database client
├── docker-compose.yml          # Multi-service container orchestration
├── Dockerfile.api             # Backend container configuration
├── logs/                      # Application logs
└── package.json               # Root project dependencies and scripts
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
- `npm run dev` - Start both client and server in development mode
- `npm run server` - Start backend server with nodemon
- `npm run client` - Start React development server
- `npm run setup` - Install dependencies for both client and server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run studio` - Open Prisma Studio

### Client
- `npm start` - Start React development server
- `npm run build` - Build production React app
- `npm test` - Run React tests

## Docker Services

- **api**: Backend service (port 5002:5000, 5555:5555)
- **client**: Frontend service (port 3000:80)
- **db**: PostgreSQL database (port 5434:5432)

All services are connected via Docker network with logging configuration.