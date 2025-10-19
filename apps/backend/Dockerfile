# Stage 1: Build
FROM node:22-alpine AS build

# Install bash, openssl (for Prisma), and build tools
RUN apk add --no-cache bash openssl

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client for Alpine + OpenSSL
RUN npx prisma generate

# Build NestJS
RUN npm run build

# Stage 2: Production
FROM node:22-alpine AS prod

# Install OpenSSL for Prisma TLS connections
RUN apk add --no-cache openssl

WORKDIR /app

# Copy build artifacts and necessary files
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/.env .

# Expose port
EXPOSE 3000

# Start NestJS
CMD ["node", "dist/main"]
