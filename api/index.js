const express = require('express');
const isAuthenticatedGuard = require('./middleware/isAuthenticated');

const app = express();

app.use(isAuthenticatedGuard);
app.use('/users', require('./routers/users'));
app.use('/quizzes', require('./routers/quizzes'));

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

const port = 1337;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
