# Use a Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the package.json files and install dependencies for both services
COPY api/package.json api/package-lock.json ./api/
RUN cd api && npm install

COPY ui/package.json ui/package-lock.json ./ui/
RUN cd ui && npm install

# Copy the .env file (add this line)
COPY api/.env ./api/

# Copy the rest of the application code
COPY . .

# Build the UI
RUN cd ui && npm run build

# Expose necessary ports (if needed)
EXPOSE 3000
EXPOSE 5000

# Use concurrently to run both services
RUN npm install -g concurrently

# Start both services using concurrently
CMD concurrently "npm start --prefix ./ui" "npm start --prefix ./api"
