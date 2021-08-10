FROM node:14 as build

WORKDIR /usr/src/app
 
COPY ["package.json", "package-lock.json", "./"]
 
RUN npm install

COPY . .