# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
# Use npm ci for clean, reproducible installs and omit dev deps in prod
RUN npm ci --omit=dev

# Bundle app source
COPY . .

# Set environment
ENV NODE_ENV=production
# Default port inside the container; can be overridden by -e PORT=...
ENV PORT=8000

# Expose the port the app listens on
EXPOSE 8000

# Start the server
CMD ["npm", "start"]
