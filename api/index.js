const express = require('express');
const isAuthenticatedGuard = require('./middleware/isAuthenticated');

const app = express();

app.use(isAuthenticatedGuard);
app.use('/user', require('./routers/user'));
app.use('/quiz', require('./routers/quiz'));

const port = 1337;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
