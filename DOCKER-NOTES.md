# Docker and Prisma Migration Notes

## Running Migrations

The Docker Compose setup is configured to automatically run migrations when the containers start.

## Creating a New Migration Manually

If you need to create a new migration after modifying the Prisma schema, you can do it in two ways:

### Option 1: Using Docker Compose exec

```bash
# Run this command to create a new migration
docker-compose exec api npx prisma migrate dev --name your_migration_name
```

### Option 2: On Local Machine

If you have PostgreSQL running locally:

1. Update your `.env` file with your local database connection
2. Run the migration command:

```bash
npx prisma migrate dev --name your_migration_name
```

3. Commit the generated migration files to your repository

## Troubleshooting

### If Migrations Fail

1. Check database connections:

```bash
# Check if PostgreSQL container is running
docker-compose ps

# View PostgreSQL logs
docker-compose logs postgres
```

2. Try manual migration:

```bash
docker-compose exec api npx prisma migrate deploy
```

3. Reset the database (caution: deletes all data):

```bash
docker-compose exec api npx prisma migrate reset --force
```

### Regenerating Prisma Client

If you encounter type issues:

```bash
docker-compose exec api npx prisma generate
```

## Important Docker Compose Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose build

# Stop services
docker-compose down

# Stop and remove volumes (caution: deletes database data)
docker-compose down -v
```
