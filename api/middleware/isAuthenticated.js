const fs = require('fs');
const jwt = require('jsonwebtoken');
const { pick } = require('lodash');

const { FIREBASE_PROJECT_NAME } = process.env;
const firebasePublicKey = fs.readFileSync('./api/firebase.pub');

module.exports = (req, res, next) => {
  let payload;

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403);
  }

  const token = authorization.slice(7);

  try {
    payload = jwt.verify(token, firebasePublicKey);
  } catch (e) {
    return res.status(403);
  }

  if (payload.aud !== FIREBASE_PROJECT_NAME) {
    return res.status(403);
  }

  req.user = pick(payload, [
    'user_id',
    'name',
    'email',
    'email_verified',
    'picture',
  ]);

  return next();
};
