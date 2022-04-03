FROM node:16-alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY . .

ARG URL
RUN echo "NEXT_PUBLIC_URL=${URL}" > .env

RUN npm ci
RUN npm run build

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

EXPOSE 8080

CMD ["npm", "start"]