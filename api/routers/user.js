const express = require('express');
const db = require('../DBrouters/dbRouter');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await res.json(db.getUserByID(parseInt(await req.user.id())));
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get('/all', async (_req, res) => {
  try {
    await res.json(db.getAllUsers());
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get('/stats/', async (req, res) => {
  const userId = parseInt(await req.user.id());
  try {
    res.json(await db.getUserStatsByID(userId));
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.put('/', async (req, res) => {
  try {
    // const userObj = req.body;
    // userObj.
    res.json(await db.insertNewUser(req.body));
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
