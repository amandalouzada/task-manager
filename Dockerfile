FROM node:lts-alpine
COPY ./ /root/task-manager
WORKDIR /root/task-manager
RUN npm install 
COPY . ./
ENTRYPOINT npm run dev
