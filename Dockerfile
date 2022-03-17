FROM node:15.2.1-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

ARG URL
COPY package.json /app/
COPY package-lock.json /app/
RUN echo "NEXT_PUBLIC_API_URL=${URL}" > /app/.env

RUN npm install

COPY . /app
RUN npm run build

CMD [ "npm", "start" ]