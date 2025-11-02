FROM node:18-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json* ./
RUN npm install --production

COPY server.js ./
COPY src/ ./src/

EXPOSE 3000
CMD ["node", "server.js"]
