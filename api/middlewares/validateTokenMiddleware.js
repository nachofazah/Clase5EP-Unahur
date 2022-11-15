const axios = require('axios');

const validateTokenMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const request = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FIREBASE_API_KEY}`;
    axios.post(request, { idToken: token.substr(7) })
      .then(next())
      .catch(() => {
        res.status(403).send({ message: 'invalid token' });
      })
  } catch (error) {
    res.status(500).send({ messege: 'error on validation middleware' });
  }
}

module.exports = validateTokenMiddleware;
