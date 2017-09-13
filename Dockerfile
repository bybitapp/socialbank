FROM node:8.5.0-alpine

ENV PORT 8000

RUN apk add --no-cache \
  git

RUN npm install --global node-pre-gyp

ADD . .
RUN yarn install --pure-lockfile --ignore-optional

EXPOSE "${PORT}"
CMD ["npm", "start"]
