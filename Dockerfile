FROM node:dubnium
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# COPY package.json .
# For npm@5 or later, copy package-lock.json as well
COPY package.json package-lock.json ./

RUN npm install

# Bundle app source
COPY . .

ENV NODE_ENV=production
ENV URL=metadatabase.os2geo.dk

EXPOSE 3030

CMD [ "npm", "start" ]
