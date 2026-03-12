FROM node:18

WORKDIR /app

COPY Agille/package*.json ./

RUN npm install

COPY Agille .

EXPOSE 5173

CMD ["npm","run","dev"]
