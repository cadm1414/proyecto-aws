FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN apk add --no-cache curl
RUN npm install --production

COPY server.js ./
COPY src/ ./src/

EXPOSE 3000
CMD ["node", "server.js"]
