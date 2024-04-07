# Stage 1: Build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
COPY . .
RUN npm install

RUN npm run build:all:prod;


# Stage 2: cu-std-plat
FROM nginx:1.21-alpine AS plat

WORKDIR /usr/share/nginx/html

EXPOSE 80

COPY --from=builder /app/dist/apps/cu-std-plat .

RUN rm /etc/nginx/conf.d/default.conf

COPY /Ops/mf-new.conf /etc/nginx/conf.d/nginx.conf

CMD ["nginx", "-g", "daemon off;"]


# Stage 3: cu-std-forms
FROM nginx:1.21-alpine AS forms

WORKDIR /usr/share/nginx/html

EXPOSE 80

COPY --from=builder /app/dist/apps/cu-std-forms .

RUN rm /etc/nginx/conf.d/default.conf

COPY /Ops/mf-forms.conf /etc/nginx/conf.d/nginx.conf

CMD ["nginx", "-g", "daemon off;"]


# Stage 4: home
FROM nginx:1.21-alpine AS home

WORKDIR /usr/share/nginx/html

EXPOSE 80

COPY --from=builder /app/dist/apps/cu-std-home .

RUN rm /etc/nginx/conf.d/default.conf

COPY /Ops/mf-home.conf /etc/nginx/conf.d/nginx.conf

CMD ["nginx", "-g", "daemon off;"]


# Stage 5: ocr
FROM nginx:1.21-alpine AS ocr

WORKDIR /usr/share/nginx/html

EXPOSE 80

COPY --from=builder /app/dist/apps/cu-std-ocr .

RUN rm /etc/nginx/conf.d/default.conf

COPY Ops/mf-ocr.conf /etc/nginx/conf.d/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
