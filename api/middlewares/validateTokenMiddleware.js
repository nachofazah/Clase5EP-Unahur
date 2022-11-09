const axios = require('axios');

const validateTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const request = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FIREBASE_API_KEY}`;
    await axios.post(request, { idToken: token.substr(7) });
    next();
  } catch (error) {
    res.status(403).send({ message: 'invalid token' });
  }
}

module.exports = validateTokenMiddleware;
