FROM node:lts
WORKDIR /app
COPY . .
RUN npm i --legacy-peer-deps
CMD ["npm", "run", "dev"]
EXPOSE 9999