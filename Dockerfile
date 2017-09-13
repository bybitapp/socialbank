FROM node:8.5.0-alpine

ENV PORT    8000
ENV APP_DIR /opt/socialbank

RUN apk --no-cache add \
  build-base  \
  python      \
  git

RUN mkdir -p "${APP_DIR}"
WORKDIR "${APP_DIR}"

ADD . .
RUN yarn install --pure-lockfile

EXPOSE "${PORT}"
CMD ["npm", "start"]
