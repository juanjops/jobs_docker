FROM node:12

WORKDIR /datasciences

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

RUN dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "datasciences.js"]
