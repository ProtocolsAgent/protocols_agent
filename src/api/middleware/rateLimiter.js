const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS || 900000, // 15 minutes
    max: process.env.RATE_LIMIT_MAX_REQUESTS || 100,
    message: {
        status: 'error',
        message: 'Too many requests, please try again later.'
    }
});

module.exports = limiter;
