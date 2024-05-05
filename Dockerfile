FROM --platform=linux/amd64 node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9000

CMD ["node", "index.js"]