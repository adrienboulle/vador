FROM debian:jessie

RUN apt-get check -y
RUN apt-get update -y
RUN apt-get install -y curl build-essential git

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -

RUN apt-get install -y nodejs

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app/

# Install app dependencies
RUN npm install --production

EXPOSE 80

CMD ["npm", "start", "--production"]
