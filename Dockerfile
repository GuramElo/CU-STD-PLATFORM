# Step 1: Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Bundle app source inside Docker image
COPY . .

# Step 6: Build your application if needed
RUN npm run build:prod

# Step 7: Expose port 3000 for the application
EXPOSE 3000

# Step 8: Define the command to run your app
CMD ["node", "dist/apps/cu-std-platform/main.js"]
