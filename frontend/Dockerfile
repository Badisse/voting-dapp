FROM node:18.12.1

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

EXPOSE 3000

CMD ["yarn", "dev"]
