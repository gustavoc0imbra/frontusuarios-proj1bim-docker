#Build
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

#Server HTTP
FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80