const express = require('express');
const db = require('../DBrouters/dbRouter');
const verifyJSON = require('../schema/verifyJSON');

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(db.getAllUsers());
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = db.getOneUserByID(id);
  if (data.length === 0) {
    res.status(400).json({ msg: `No user with id ${id}` });
  } else {
    res.json(data);
  }
});

router.get('/:id/scores', (req, res) => {
  const id = parseInt(req.params.id);
  const data = db.getScoresByUser(id);
  if (data.length === 0) {
    if (db.getOneUserByID(id).some((user) => user.id === id)) {
      res.json(data);
    } else {
      res.status(400).json({ msg: `No user with id ${id}` });
    }
  } else {
    res.json(data);
  }
});

router.post('/', (req, res) => {
  const newUser = req.body;
  const valid = verifyJSON('users', newUser);
  if (valid) {
    res.json(db.addUser(newUser));
  } else {
    res.status(400).json({ msg: `sent data does not match schema` });
  }
});

router.post('/:id/scores', (req, res) => {
  const newScore = req.body;
  if (verifyJSON('scores', newScore)) {
    if (parseInt(req.params.id) === newScore.user_id) {
      res.json(db.addScore(newScore));
    } else {
      res.status(400).json({
        msg: `URI ID (${req.params.id}) and sent ID (${newScore.user_id}) do not match`,
      });
    }
  } else {
    res.status(400).json({ msg: `sent data was does not match schema` });
  }
});

router.put('/:id', (req, res) => {
  const user = req.body;
  if (verifyJSON('users', user)) {
    if (parseInt(req.params.id) === user.id) {
      res.json(db.updateUser(user));
    } else {
      res.status(400).json({
        msg: `URI ID (${req.params.id}) and sent ID (${user.id}) do not match`,
      });
    }
  } else {
    res.status(400).json({ msg: `sent data was does not match schema` });
  }
});

router.put('/:id/scores', (req, res) => {
  const newScore = req.body;
  if (verifyJSON('scores', newScore)) {
    if (parseInt(req.params.id) === newScore.user_id) {
      res.json(db.updateScore(newScore));
    } else {
      res.status(400).json({
        msg: `URI ID (${req.params.id}) and sent ID (${newScore.user_id}) do not match`,
      });
    }
  } else {
    res.status(400).json({ msg: `sent data was does not match schema` });
  }
});

module.exports = router;