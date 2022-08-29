FROM node:16.13.1

WORKDIR /pong/src/app

COPY package.json ./

RUN npm run install

COPY  . .

RUN npm run build

EXPOSE 4000

