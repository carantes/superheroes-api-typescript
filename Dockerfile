FROM node:14-alpine

# update packages
RUN apk update

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package*.json ./
COPY tsconfig.json ./
COPY yarn.lock ./
RUN yarn

# Bundle app source
COPY . /app

EXPOSE 3000
CMD [ "yarn", "start" ]