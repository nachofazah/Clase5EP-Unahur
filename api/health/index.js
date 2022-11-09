const express = require("express");
const router = express.Router();
const db = require('../models')

router.get('/', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    dbStatus: db.sequelize.authenticate(),
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
