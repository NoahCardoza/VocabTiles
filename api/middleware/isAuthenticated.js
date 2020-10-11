const fs = require('fs');
const jwt = require('jsonwebtoken');
const { pick } = require('lodash');

const { FIREBASE_PROJECT_NAME } = process.env;
const firebasePublicKey = fs.readFileSync('./api/firebase.pub');

module.exports = (req, res, next) => {
  let payload;

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).send();
  }

  const token = authorization.slice(7);

  try {
    if (process.env.NODE_ENV !== 'development') {
      payload = jwt.verify(token, firebasePublicKey);
    } else {
      payload = jwt.decode(token);
    }
  } catch (e) {
    return res.status(403).send();
  }

  if (payload.aud !== FIREBASE_PROJECT_NAME) {
    return res.status(403).send();
  }

  req.user = {
    id: payload.user_id,
    ...pick(payload, ['name', 'email', 'email_verified', 'picture']),
  };

  return next();
};
