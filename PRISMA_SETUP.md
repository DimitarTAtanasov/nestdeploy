# Prisma ORM Setup with PostgreSQL

This document provides instructions for setting up the PostgreSQL database and running Prisma migrations for the NestJS application.

## Prerequisites

- PostgreSQL installed and running (version 10 or higher)
- Node.js (version 16 or higher)
- npm (comes with Node.js)

## Database Setup

1. Make sure PostgreSQL is running on port 5432
2. Create a new database for the application:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create a new database
CREATE DATABASE nestdeploy;

# Exit psql
\q
```

3. Update the `.env` file with your PostgreSQL credentials:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nestdeploy?schema=public"
```

Replace `postgres:postgres` with your actual PostgreSQL username and password if needed.

## Running Migrations

After setting up the database, run the following commands to create the database schema:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init
```

## Database Commands

```bash
# View the database in Prisma Studio
npx prisma studio

# Create a new migration after schema changes
npx prisma migrate dev --name <migration-name>

# Reset the database (caution: deletes all data)
npx prisma migrate reset
```

## Message Model

The `Message` model has the following structure:

```prisma
model Message {
  id      Int     @id @default(autoincrement())
  message String
}
```

## API Endpoints

Once the application is running, you can use the following endpoints to interact with the messages:

- `GET /messages` - Get all messages
- `GET /messages/:id` - Get a message by ID
- `POST /messages` - Create a new message (body: `{ "message": "Your message text" }`)
- `PUT /messages/:id` - Update a message (body: `{ "message": "Updated message text" }`)
- `DELETE /messages/:id` - Delete a message
