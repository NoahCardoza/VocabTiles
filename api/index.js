const express = require('express');
const app = express();
const port = 1337;

app.use('/api/users', require('./routers/api/users'));
app.use('/api/quizzes', require('./routers/api/quizzes'));

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Example app listening at http://localhost:${port}`);
});
