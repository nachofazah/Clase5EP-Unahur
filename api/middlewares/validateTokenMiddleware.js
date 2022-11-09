const axios = require('axios');

const validateTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  const request = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FIREBASE_API_KEY}`;
  axios.post(request, { idToken: token.substr(7) })
    .then(next())
    .catch(() => {
      res.status(403).send({ message: 'invalid token' })
    })
}

module.exports = validateTokenMiddleware;
