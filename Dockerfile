FROM node:18-alpine

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy your application code
COPY . .

# Set the working directory
WORKDIR /app

# Expose the port your application listens on (if applicable)
EXPOSE 3000

# Define the command to run when the container starts
CMD ["npm", "start"]