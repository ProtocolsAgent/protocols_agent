const logger = require('../../utils/logger');
const { responseFormatter } = require('../../utils/responseFormatter');

const errorHandler = (err, req, res, next) => {
    logger.error('Error:', err);

    if (err.type === 'validation') {
        return res.status(400).json(
            responseFormatter.error(err.message)
        );
    }

    return res.status(500).json(
        responseFormatter.error('Internal server error')
    );
};

module.exports = errorHandler;
