FROM node:15.2.1-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/
COPY package-lock.json /app/
RUN touch /app/.env.production

RUN npm install

COPY . /app
RUN npm run build

CMD [ "npm", "start" ]