var express = require("express");
var router = express.Router();

router.get('/', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: 'OK',
    timestamp: Date.now()
  };
  try {
      res.send(healthcheck);
  } catch (error) {
      healthcheck.message = error;
      res.status(503).send();
  }
});

module.exports = router;
