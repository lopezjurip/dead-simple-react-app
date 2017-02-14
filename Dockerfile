# Node.js 6.9.x LTS
FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock /usr/src/app/
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN $HOME/.yarn/bin/yarn global add pm2 && $HOME/.yarn/bin/yarn --pure-lockfile

# Bundle app source
COPY . /usr/src/app

# Build and optimize react app
RUN $HOME/.yarn/bin/yarn build

EXPOSE 4000

CMD ["pm2-docker", "process.yml"]
