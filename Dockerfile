FROM node:14.17.0-alpine

WORKDIR /usr/app
COPY . .

ENV NODE_ENV production

ARG URL
RUN echo "NEXT_PUBLIC_URL=${URL}" > .env

RUN npm ci --only=production

RUN npm run build

CMD [ "npm", "start" ]