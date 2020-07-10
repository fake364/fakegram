FROM node:latest
COPY . /webapp
WORKDIR /webapp
RUN ls
RUN npm install
RUN cat ./node_modules/sharp/vendor/platform.json
RUN npm install --global webpack
RUN npm install --global webpack-cli
RUN webpack
CMD npm run nodedocker