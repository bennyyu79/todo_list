FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN rm -rf node_modules/*

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
