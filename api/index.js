const express = require('express');
const morgan = require('morgan');
const isAuthenticatedGuard = require('./middleware/isAuthenticated');

const app = express();

app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common'));
app.use(isAuthenticatedGuard);
app.use(express.json());
app.use('/user', require('./routers/user'));

const port = 1337;
app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
