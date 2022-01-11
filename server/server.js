var PORT = process.env.PORT || 5000;
const express = require('express');
const morgan = require('morgan');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();

app.listen(PORT, () => {
  console.log('listening at http://localhost:5000');
});

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile('public/index.html', { root: __dirname });
});


app.use(router);

