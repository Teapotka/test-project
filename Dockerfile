#Stage 1
FROM node:16-alpine as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build && \
    mkdir -p /usr/share/nginx/html/test-project && \
    cp -r build/* /usr/share/nginx/html/test-project && \
    rm -rf /app

#Stage 2
FROM nginx:1.19.0
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
