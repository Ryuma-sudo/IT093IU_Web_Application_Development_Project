FROM node:18-alpine
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./

RUN npm install

# Copy source code (bind-mounted in docker-compose for auto-reload)
COPY . .

# Expose Vite's port (default is 5173)
EXPOSE 5173

# Start Vite development server (supports HMR)
CMD ["npm", "run", "dev"]
