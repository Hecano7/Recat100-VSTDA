const PORT = process.env.PORT || 5000;
const express = require('express');
const morgan = require('morgan');
const router = express.Router();
const app = express();

app.listen(PORT, () => {
  console.log('listening at http://localhost:5000');
});

app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.use(router);
