const express = require('express');

const app = express();

const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get('*', (req, res) => {
    req.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

module.exports = app;
