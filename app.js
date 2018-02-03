const express = require('express')
  , app = express()
  , articles = require('./articles')
  , path = require('path')
  , md = require('markdown-it')();
app.all('/*.md', function (req, res) {
  res.render('index', {
    title: '403',
    h1: 'Meinaður aðgangur',
    p: md.render('# Þú hefur ekki aðgang að .md skjölum'),
    a: '<a href=\' / \'>Til baka</a>'
  });
});

const hostname = '127.0.0.1';
const port = 3000;


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'articles')));
app.set('view engine', 'ejs');
app.use(articles);
app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});


