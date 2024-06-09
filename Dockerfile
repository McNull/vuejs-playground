
FROM node:alpine3.20

EXPOSE 3000

# Create and change to the app directory.
WORKDIR /app

COPY package*.json ./

# Install production dependencies.
RUN yarn install --production && yarn cache clean

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
CMD [ "node", "server.cjs" ]