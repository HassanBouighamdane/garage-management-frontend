# Step 1: Use Node.js to build and run the React application
FROM node:20-alpine3.20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the default port used by the React development server
EXPOSE 3000

# Start the React application
CMD ["npm", "start"]
