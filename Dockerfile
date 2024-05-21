# Stage 1: Build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
COPY . .
RUN npm install

RUN npm run build:all:prod;

FROM nginx:1.21-alpine AS plat

WORKDIR /usr/share/nginx/html

EXPOSE 80

COPY --from=builder /app/dist/apps/cu-std-plat .
COPY --from=builder /app/dist/apps/cu-std-forms ./forms
COPY --from=builder /app/dist/apps/cu-std-ocr ./ocr
COPY --from=builder /app/dist/apps/cu-std-home ./home

RUN rm /etc/nginx/conf.d/default.conf

COPY /Ops/mf-new.conf /etc/nginx/conf.d/nginx.conf

CMD ["nginx", "-g", "daemon off;"]

