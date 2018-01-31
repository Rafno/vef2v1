/* útfæra greina virkni */
const fs = require('fs')
  , fm = require('front-matter')
  , matter = require('gray-matter')
  , markdown = require('markdown-it')
  , util = require('util')
  , express = require('express')
  , router = express.Router();
//í async falli, const fileList = await readdir('slóð/á/möppu');
const filename = ['articles/batman-ipsum.md', 'articles/corporate-ipsum.md', 'articles/deloren-ipsum.md', 'articles/lorem-ipsum.md'];
//gögnin úr skránni skoða fs.readdir

const readFileAsync = util.promisify(fs.readFile);
/*
1.Batman ipsum Jan 18
2.Lorem Ipsum Jan 17
3.Corporate Ipsum Jan 16
4.Delorean Ipsum Jan 10
*/

function read(file) {
  return readFileAsync(file)
    .then(data => data.toString());
}

async function readFiles(files) {
  const result = [];

  for (let i = 0; i < filename.length; i++) {
    result.push(await read(files[i]));
  }

  return Promise.all(result);
}
//Vandamál her fyrir neðan
router.get('/:slug', (req, res) => {
  readFiles(filename)
    .then(data => {
      console.log(req.params);
      const mapped = data.map(file => file = fm(file));
      res.render('index', { title: 'FIKK', h1: "ey" });
      //res.send(`Data = ${req.params.data}`);
    })
    .catch(error => { console.log(error) });
});

  router.get('/', (req, res) => {
    res.render('index', { title: 'FIKK', h1: 'Lorem-ipsum' });
  });
  module.exports = router;
