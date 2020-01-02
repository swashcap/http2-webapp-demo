FROM node:13.5-alpine as builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn

COPY . ./
RUN yarn build
RUN scripts/prune.sh

VOLUME /usr/src/app

FROM node:13.5-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist dist
COPY --from=builder /usr/src/app/node_modules node_modules
COPY --from=builder /usr/src/app/package.json ./

EXPOSE 3000
CMD ["node", "dist/server"]
