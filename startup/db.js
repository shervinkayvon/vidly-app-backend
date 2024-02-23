const mongoose = require('mongoose');
const config = require('config');

const { logger } = require('../middleware/logger');


module.exports = function() {
    const db = config.get('db');
    mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => logger.info(`Connected to ${db}...`))
}