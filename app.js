const express = require('express');
const app = express();
const articles = require('./articles');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

app.use('/', articles);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');
app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
