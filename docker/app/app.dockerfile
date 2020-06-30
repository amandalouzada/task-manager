FROM node:12.18-alpine
COPY ./ /root/task-manager
WORKDIR /root/task-manager

RUN npm install 

COPY . ./

EXPOSE 3000

CMD npm run dev