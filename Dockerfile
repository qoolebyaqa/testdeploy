FROM node:22-alpine AS build-stage

ARG ENV=production

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install


COPY . .
COPY .env.${ENV} .env.production
RUN npm run build

FROM nginx:stable-alpine

COPY ./.docker/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

