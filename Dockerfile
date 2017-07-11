FROM 995892470641.dkr.ecr.eu-west-1.amazonaws.com/vador-base:latest

# Create app directory
RUN mkdir -p /usr/src/app

# Bundle app source
COPY . /usr/src/app/
WORKDIR /usr/src/app/

# Install app dependencies
RUN npm install --production

EXPOSE 80

CMD ["npm", "start", "--production"]
