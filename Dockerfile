# ------------------------------------------------------------------
#
# 						   Microservice [Nama MSA]
#
# ------------------------------------------------------------------
# Set Node version
FROM node:12
# ------------------------------------------------------------------
# Create app directory
WORKDIR /usr/src/app
# ------------------------------------------------------------------
# Install app dependencies
COPY package.json /usr/src/app
# ------------------------------------------------------------------
# Install required packages
RUN npm install
# ------------------------------------------------------------------
# Bundle app source
COPY . /usr/src/app
# ------------------------------------------------------------------
# Setup port
# EXPOSE [PORT]
# ------------------------------------------------------------------
# Running command
CMD [ "node", "server.js" ]
# ------------------------------------------------------------------
#
 
