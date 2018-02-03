const express = require('express');
const articles = require('./articles');
const path = require('path');
const md = require('markdown-it')();

const app = express();
/**
 * Kemur í veg fyrir að það sé hægt að sjá .md skjölin.
 * teiknar 403 villu ef aðili reynir að skoða.
*/
app.all('/*.md', (req, res) => {
  res.render('index', {
    title: '403',
    h1: 'Meinaður aðgangur',
    p: md.render('# Þú hefur ekki aðgang að .md skjölum'),
    a: '<a href=\' / \'>Til baka</a>',
  });
});
/**
 * gefur aðgang að skjölum/myndum
 */
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
