const getExpeditiousCache = require('express-expeditious');

const defaultOptions = {
    namespace: 'epersistencias_cache',
    defaultTtl: '1 minute',
    statusCodeExpires: {
        404: '5 minutes',
        500: 0
    }
};

const cacheInit = getExpeditiousCache(defaultOptions);

module.exports = { cacheInit };
