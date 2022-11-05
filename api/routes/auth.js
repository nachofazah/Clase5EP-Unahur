var express = require("express");
const url = require('url');
const axios = require('axios');
var router = express.Router();

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  const request = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`
  const data = {
    email,
    password,
    returnSecureToken: true
  };
  axios.post(request, data)
    .then(response => {
      res.send({
        idToken: response.data.idToken,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn
      })
    })
    .catch(error => {
      res.status(error.response.data.status || 500).send(error.response.data || error)
    })
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const request = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`
  const data = {
    email,
    password,
    returnSecureToken: true
  };
  axios.post(request, data)
    .then(response => {
      res.send({
        idToken: response.data.idToken,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn
      })
    })
    .catch(error => {
      res.status(error.response.data.status || 500).send(error.response.data || error)
    })
});

router.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;
  const request = `https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`
  const params = new url.URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  });
  axios.post(request, params.toString())
    .then(response => {
      res.send({
        accessToken: response.data.access_token,
        idToken: response.data.id_token,
        refreshToken: response.data.refresh_token,
        expiresIn: response.data.expires_in
      })
    })
    .catch(error => {
      res.status(error.response.data.status || 500).send(error.response.data || error)
    })
});

module.exports = router;
