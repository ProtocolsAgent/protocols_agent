const jwt = require('jsonwebtoken');
const { responseFormatter } = require('../../utils/responseFormatter');

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json(
                responseFormatter.error('Authentication required')
            );
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json(
            responseFormatter.error('Invalid authentication token')
        );
    }
};

module.exports = auth;
