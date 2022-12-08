FROM node:16.16.0

WORKDIR /front-end
COPY ["package.json", "package-lock.json", "./"]
EXPOSE 3000
RUN npm install

COPY . .
CMD ["npm", "run", "start"]