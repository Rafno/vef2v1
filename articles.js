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
async function readArr(filename) {
  let sorted = [];
  for (let i = 0; i < filename.length; i++) {
    await read(filename[i])
      .catch(error => {
        console.log(error);
      })
      .then(data => {
        let content = fm(data);
        sorted.push(content);
        if (sorted.length === filename.length) {
          sorted = sorted.sort(function (a, b) {
            return Date.parse(a.date) < Date.parse(b.date);
          });
         return Promise.all(sorted);
        }
      });
  }
}

router.get('/', (req, res) => {
  console.log(readArr(filename));
  const batman = readArr(filename)
    .then(data => { console.log(data) })
    .catch(error => { console.log(error) });
    res.render('index', { title: 'FIKK', h1: 'Gagnagrunnur' });
  });

  router.get('/', (req, res) => {
    res.render('index', { title: 'FIKK', h1: 'Lorem-ipsum' });
  });
  module.exports = router;
