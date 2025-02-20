FROM node:latest
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3010

CMD ["npm", "run", "start"]