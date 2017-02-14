const message = require('./models/message');


module.exports = (options) => ({
  Message: message(options),
});
