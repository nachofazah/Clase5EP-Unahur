const getExpeditiousCache = require('express-expeditious');

const defaultOptions = {
    namespace: 'epersistencias_cache',
    defaultTtl: '1 minute',
    statusCodeExpires: {
        404: '5 minutes',
        500: 0
    }
};

// const cacheMiddleware = getExpeditiousCache(defaultOptions);
const cacheMiddleware = (req, res, next) => {
  console.log('en cacheMiddleware')
  next()
};

module.exports = cacheMiddleware;
