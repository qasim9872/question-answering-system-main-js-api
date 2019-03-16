FROM node

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app
# COPY package-lock.json /app

# install the below dependency seperately since it throws an error if installed through npm install
RUN npm install mongodb-memory-server 
RUN npm install

# Bundle app source
COPY . /app
RUN npm run build

EXPOSE 8000
CMD [ "npm", "start" ]