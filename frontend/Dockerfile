FROM node:12-alpine

WORKDIR /app

COPY package.json /app

COPY package-lock.json /app

RUN npm install

RUN npm install react-router-dom

RUN npm install react-data-table-component styled-components bootstrap

EXPOSE 3000

CMD ["npm", "start"]