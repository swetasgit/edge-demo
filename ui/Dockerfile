FROM registry.suse.com/bci/nodejs:14
WORKDIR /demo-ui
COPY package.json .
RUN npm install
COPY . .
CMD npm start