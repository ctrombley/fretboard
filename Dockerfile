FROM node:16-alpine
RUN apk add --update \
#  python \
  build-base

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD [ "node", "src/server/index.js" ]
