# Ticket System

A ticket management system with frontend and backend components.

## Docker Setup

This project is containerized using Docker, making it easy to deploy and run in any environment.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Configuration

The application can be configured using environment variables in the `.env` file at the root of the project:

```
# Frontend Configuration
FRONTEND_PORT=80

# Backend Configuration
BACKEND_PORT=5001
```

You can modify these values to change the ports on which the services are exposed.

### Building and Running

To build and start the application:

```bash
# Build and start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

### Accessing the Application

- Frontend: http://localhost:80 (or the port specified in FRONTEND_PORT)
- Backend API: http://localhost:5001/api (or the port specified in BACKEND_PORT)