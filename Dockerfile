# Use the official Node.js LTS image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port (Cloud Run uses $PORT)
ENV PORT=8080
EXPOSE 8080

# Start the app
CMD ["node", "src/app.js"]
