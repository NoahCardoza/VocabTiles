const express = require('express');
const app = express();
const port = 1337;

app.use('/api/users', require('./routers/users'));
app.use('/api/quizzes', require('./routers/quizzes'));

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
