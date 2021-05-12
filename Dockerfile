# Start with a Node.js base image that uses Node v13
FROM node:14
WORKDIR /app

COPY .npmrc .npmrc

# Copy the package.json file to the container and install fresh node_modules
COPY package*.json tsconfig*.json ./
RUN npm install

# Remove .npmrc file
RUN rm -f .npmrc

# Transpile typescript and bundle the project
RUN npm run build

# Expose the service to the docker network
EXPOSE 3005

# Assign `npm run start:prod` as the default command to run when booting the container
CMD ["npm", "run", "start:debug"]