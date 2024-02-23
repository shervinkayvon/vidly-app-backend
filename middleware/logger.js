const winston = require('winston');
const config = require('config');
require('winston-mongodb');

const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
  ),
    transports: [
      new winston.transports.File({
        filename: 'combined.log',
      }),
      new winston.transports.MongoDB({
        db: config.get('db'),
        collection: 'logs',
        options: { useUnifiedTopology: true }
      }),
      new winston.transports.Console()
    ],
  });

module.exports = {
  logger,
  logErrors: function(err, req, res, next) {
    // the helper methods are
    // error, warn, info, verbose, debug, silly
    // below we are using error
    // we are passing the error message and the error object(stack trace)
    const metadata = { error: err };
    logger.error(err.message, { metadata });
    res.status(500).send("Something went wrong");
  }
}