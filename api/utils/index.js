const errorControl = (req, res, error) => {
  console.error(`ERROR ${error.service} - ${error.feature}: ${error.message} | ${error.status}`);
  res.status(error.status).send({
    method: req.method,
    path: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
    ...error
  });
};

module.exports = {
  errorControl
};
