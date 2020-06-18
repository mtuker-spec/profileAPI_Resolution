# Use the node image
FROM node:latest

# Create tests directory
WORKDIR /usr/src/app

RUN mkdir /usr/src/app/test-results/

COPY /test/* ./

RUN npm install --silent

CMD ["npm", "test"]
