FROM node:8.12.0-alpine

WORKDIR /usr/src/app/server

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
