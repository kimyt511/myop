const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const searchRouter = require('./routers/searchRouter');

app.set('port', process.env.PORT || 8080);
app.use(cors());
app.use('/summoners', searchRouter);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.response.status).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log('server is running on 8080');
});
