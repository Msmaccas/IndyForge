# Base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* pnpm-lock.yaml* ./

# Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source and prisma schema
COPY tsconfig.json ./
COPY prisma ./prisma
RUN npx prisma generate

COPY src ./src

# Build TypeScript into JavaScript
RUN pnpm run build

# Expose port
EXPOSE 3000

# Default command (API server)
CMD ["node", "dist/index.js"]