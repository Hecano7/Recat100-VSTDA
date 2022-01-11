const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));

const path = require('path');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('listening at http://localhost:4000');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get('*', (req, res) => {
    req.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

module.exports = app;
