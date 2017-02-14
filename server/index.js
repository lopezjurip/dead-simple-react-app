'use strict';

const Mongoose = require('mongoose').Mongoose;
const Bluebird = require('bluebird');

const app = require('./app');
const configuration = require('./configuration');


// Load configuration.
const config = configuration();

// Connect to MongoDB.
const mongoose = new Mongoose();
mongoose.Promise = Bluebird;
mongoose.connect(config.MONGO_URI);

// Create options.
const options = {
  config,
  mongoose,
};

// Create server instance with options. No singletons :)
const instance = app(options);

// Start app!
const server = instance.listen(config.PORT, config.HOST, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`> (${config.ENV}) Express.js server listening on ${config.HOST}:${config.PORT}`);
  }
});

// On termination.
process.on('SIGINT', () => {
  const operations = [
    server.close(), // Sync operation, but it's not a problem.
    mongoose.disconnect(),
  ];

  return Bluebird.all(operations)
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
});
