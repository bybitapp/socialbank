FROM node:8.5.0-alpine

ENV PORT 8000

ADD . .

RUN npm install

EXPOSE "${PORT}"

CMD ["npm", "start"]
