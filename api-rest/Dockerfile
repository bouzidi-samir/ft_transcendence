FROM node:16.16.0

WORKDIR /api-rest
COPY package.json .
RUN npm install
EXPOSE 4000
EXPOSE 8000
COPY . .
CMD ["npm", "run", "start:dev"]