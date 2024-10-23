FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN ls -al

RUN npm build

EXPOSE 5000

CMD ["npm", "start"]

