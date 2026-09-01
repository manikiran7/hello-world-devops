FROM node:22-alpine

RUN apk add --no-cache dumb-init

ENV NODE_ENV=production

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY --chown=node:node server.js ./
COPY --chown=node:node app.js ./

USER node

EXPOSE 3000

CMD ["dumb-init", "node", "server.js"]s