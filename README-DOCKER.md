# NestJS with PostgreSQL using Docker

This guide explains how to run the NestJS application with PostgreSQL using Docker Compose.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

The easiest way to run the application is using Docker Compose, which will set up both the NestJS server and PostgreSQL database.

### Running with Docker Compose

1. Clone the repository and navigate to the project directory

2. Start the services:

```bash
docker-compose up -d
```

This command will:

- Start PostgreSQL with the correct configuration
- Start the NestJS application
- Run database migrations
- Expose the API on port 3000

3. To see the logs:

```bash
docker-compose logs -f
```

4. To stop the services:

```bash
docker-compose down
```

## API Endpoints

Once the application is running, you can access the following endpoints:

- `GET http://localhost:3000/messages` - List all messages
- `GET http://localhost:3000/messages/:id` - Get a specific message
- `POST http://localhost:3000/messages` - Create a new message
- `PUT http://localhost:3000/messages/:id` - Update a message
- `DELETE http://localhost:3000/messages/:id` - Delete a message

## Example API Requests

### Create a new message

```bash
curl -X POST http://localhost:3000/messages \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from Docker!"}'
```

### Get all messages

```bash
curl http://localhost:3000/messages
```

## Additional Commands

### Rebuild containers after making changes

```bash
docker-compose build
docker-compose up -d
```

### View database data

You can connect to the database using:

```bash
docker exec -it nestdeploy-postgres psql -U postgres -d nestdeploy
```

Once connected, you can view messages:

```sql
SELECT * FROM "Message";
```
