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
instance.listen(config.PORT, config.HOST, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`> (${config.ENV}) Express.js server listening on ${config.HOST}:${config.PORT}`);
  }
});
