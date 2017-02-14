const path = require('path');
const express = require('express');
const morgan = require('morgan');

const models = require('./models');
const apiv1 = require('./apiv1');


module.exports = (options) => {
  // Add models to new option object (does not mutate the original object).
  options = Object.assign({}, options, {
    models: models(options),
  });

  // Create Express instance.
  const app = express();

  // Setup logger.
  app.use(morgan('dev'));

  // Serve static assets.
  app.use(express.static(path.resolve(__dirname, '..', 'build')));

  app.use('/api/v1', apiv1(options));

  // Always return the main index.html, so react-router render the route in the client.
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });

  return app;
};
