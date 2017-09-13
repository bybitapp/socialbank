FROM node:8.5.0-alpine

ENV PORT 8000

RUN apk add --no-cache \
  git

ADD . .
RUN yarn install --pure-lockfile

EXPOSE "${PORT}"
CMD ["npm", "start"]
