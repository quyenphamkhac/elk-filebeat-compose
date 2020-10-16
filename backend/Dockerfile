FROM node:alpine3.12

WORKDIR /usr/app/

COPY ./package*.json ./
RUN npm install
COPY ./ ./ 

CMD [ "npm", "start" ]