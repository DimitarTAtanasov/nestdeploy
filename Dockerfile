FROM node:20-alpine AS build

WORKDIR /app

# Copy package files for better layer caching
COPY package*.json ./
RUN npm ci

# Copy prisma files separately for better caching
COPY prisma ./prisma/
RUN npx prisma generate

# Copy the rest of the application
COPY . .
RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# Copy the startup script
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["./start.sh"] 