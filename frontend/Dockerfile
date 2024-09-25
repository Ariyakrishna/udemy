FROM node:14 as node 
WORKDIR /app
COPY package.json .
RUN npm install 
COPY . .
RUN npm run build 

FROM nginx:alpine 
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/build /usr/share/nginx/html
EXPOSE 80