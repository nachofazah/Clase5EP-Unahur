const getExpeditiousCache = require('express-expeditious');

const defaultOptions = {
    namespace: 'EPersistenciasCache',
    defaultTtl: '1 minute',
    statusCodeExpires: {
        404: '5 minutes',
        500: 0
    }
};

const cacheMiddleware = getExpeditiousCache(defaultOptions);

module.exports = cacheMiddleware;
