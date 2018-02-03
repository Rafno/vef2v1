/* útfæra greina virkni */
const fs = require('fs')
  , fm = require('front-matter')
  , md = require('markdown-it')()
  , util = require('util')
  , express = require('express')
  , router = express.Router();

const readFileAsync = util.promisify(fs.readFile);

function read(file) {
  return readFileAsync(file)
    .then(data => data.toString());
}
async function readFiles(files) {
  const result = [];

  for (let i = 0; i < files.length; i++) {
    result.push(await read(files[i]));
  }

  return Promise.all(result);
}
//***************DIRECTORY******************//
const readDirAsync = util.promisify(fs.readdir);
articles = './articles/';

function readDir(directory) {
  let results = [];
  return readDirAsync(directory)
    .then(data => {
      results = data.filter(file => file.substring(file.length - 3) === '.md');
      for (let i = 0; i < results.length; i++) {
        results[i] = articles.concat(results[i]);
      }
      return results;
    });
}

function slugFinder(slug, file) {
  let answer = {
    attributes:
    {
      title: '404',
      slug: '404',
    },
    body: '# Error 404 not found',
  }
  for (let i = 0; i < file.length; i++) {
    if (file[i].attributes.slug === slug) {
      answer = file[i];

    }
  }
  return answer;
}

router.get('/:slug', (req, res) => {
  const slug = req.params.slug;
  const filename = readDir(articles).then(filename => {
    const files = readFiles(filename)
      .then(data => {
        const mapped = data.map(file => file = fm(file));
        const map = slugFinder(slug, mapped);
        const markdown = md.render(map.body);
        res.render('index', {
          title: `${map.attributes.title}`,
          h1: `${map.attributes.title}`,
          p: `${markdown}`,
          a: '<a href=\' / \'>Til baka</a>'
        });
      })
      .catch(error => {
        res.render('index', {
          title: 'Error 500',
          h1: 'Villa kom upp',
          p: '',
          a: '<a href=\' / \'>Til baka</a>'
        });
      });
  });

});
/*
<div class="grid-mid">
            <div class="row">
                <div class="col col-6 col-sm-12">
                  <p>
                  </p>
                  </div>
               <div class="col col-6 col-sm-12">
                 <p>
                 </p>
                 </div>
              </div>
*/

function readList(filename) {
  let sorted = [];
  let markdown = '';
  filename.forEach(file => {
    sorted.push(file.attributes);
  });
  sorted.sort(function (a, b) {
    return Date.parse(a.date) < Date.parse(b.date);
  });
  //Work here.
}


router.get('/', (req, res) => {
  const filename = readDir(articles).then(filename => {
    const files = readFiles(filename)
      .then(data => {
        const mapped = data.map(file => file = fm(file));
        const sorted = readList(mapped);
        console.log(sorted);
        res.render('index', {
          title: `Gagnasafn`,
          h1: `Gagnasafnið`,
          p: '',
          a: '<a href=\' / \'>Til baka</a>'
        });
      })
      .catch(error => {
        res.render('index', {
          title: 'Error 500',
          h1: 'Villa kom upp',
          p: error,
          a: '<a href=\' / \'>Til baka</a>'
        });
      });
  });
});

module.exports = router;
