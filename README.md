# Ticket System

A ticket management system with frontend and backend components.

## Docker Setup

This project is containerized using Docker, making it easy to deploy and run in any environment.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

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