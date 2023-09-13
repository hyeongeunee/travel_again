# Stage 1: Build the React application
FROM node:14 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend application
COPY . .

# Build the frontend application
RUN npm run build

# Stage 2: Serve the application using a simple HTTP server
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the built frontend files from the build stage
COPY --from=build /app/build ./public

# Expose port 80 (you can change this if needed)
EXPOSE 80

# Install a simple HTTP server to serve the static files
RUN npm install -g http-server

# Start the HTTP server to serve the static files
CMD ["http-server", "-p", "80", "public"]
