FROM node:16
ENV TZ="Asia/Kolkata"
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm install pm2 -g
EXPOSE 8989
CMD ["pm2-runtime", "index.js"]
#CMD ["npm", "start"]