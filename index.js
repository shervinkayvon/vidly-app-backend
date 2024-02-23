// express-async-errors handles all async errors on all the route handlers
// without it you would have to use try-catch block or wrap all route handlers with async middleware function
require('express-async-errors');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express');
const app = express();

const { logger } = require('./middleware/logger');

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
// set env variable before starting server
// export vidly_jwtPrivateKey=password
require('./startup/config')();
require('./startup/prod')(app);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));

module.exports = server;