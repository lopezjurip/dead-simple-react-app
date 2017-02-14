const Router = require('express').Router;


module.exports = (options) => {
  const { Message } = options.mongoose.models;

  const router = new Router();

  router.get('/', (req, res) => {
    res.json({
      status: 'ok',
    });
  });

  router.get('/messages', (req, res, next) => {
    Message.find().lean()
      .then(items => res.json(items))
      .catch(next);
  });

  router.use('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
  })

  router.use((err, req, res, next) => {
    if (options.config.ENV !== 'production') {
      console.error(err.stack);
      res.status(500).error(err);
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })

  return router;
};
