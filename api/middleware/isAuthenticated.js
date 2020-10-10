const fs = require('fs');
const jwt = require('jsonwebtoken');
const { pick } = require('lodash');

const { selectUserFromFirebaseId } = require('../db/user');

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
    payload = jwt.verify(token, firebasePublicKey);
  } catch (e) {
    return res.status(403).send();
  }

  if (payload.aud !== FIREBASE_PROJECT_NAME) {
    return res.status(403).send();
  }

  req.user = {
    firebase_id: payload.user_id,
    ...pick(payload, ['name', 'email', 'email_verified', 'picture']),
    id: () => selectUserFromFirebaseId(payload.user_id),
  };

  return next();
};
