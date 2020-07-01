FROM node:12.18-alpine
COPY ./ /root/task-manager
WORKDIR /root/task-manager

RUN npm install 
RUN npm run typeorm migration:run

COPY . ./
