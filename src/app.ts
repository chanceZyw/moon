const express = require('express');
const app = express();

const { loginRouter } = require('./router/login');
const { reptileRouter } = require('./router/reptile');

loginRouter(app);
reptileRouter(app);

app.listen(process.env.PORT || 5000, console.log('success'));
