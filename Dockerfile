FROM mongo:latest

# Install node
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential
RUN node -v
RUN npm -v

# Install git
RUN apt-get install git

# Create app directory
RUN mkdir -p /opt/app
WORKDIR /opt/app

# Bundle app source
COPY . /opt/app

# Install app dependencies
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]
