FROM node:8.5.0-alpine

ENV PORT 8000

ADD . .

RUN yarn install --pure-lockfile --ignore-optional

EXPOSE "${PORT}"

CMD ["npm", "start"]
