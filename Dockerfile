# from base image node
FROM node:16-alpine3.14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# copying all the files from your file system to container file system
COPY package.json .
COPY package-lock.json .

# install all dependencies
RUN npm ci

# copy oter files as well
COPY ./ .

#expose the port
EXPOSE 3000

# command to run when intantiate an image
CMD ["npm", "run", "dev"]