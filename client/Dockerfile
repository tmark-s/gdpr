FROM node:8.12.0-alpine

WORKDIR /usr/src/app/client

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 8080

CMD ["yarn", "serve"]
