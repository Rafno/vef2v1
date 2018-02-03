const fs = require('fs');
const fm = require('front-matter');
const md = require('markdown-it')();
const util = require('util');
const express = require('express');

/**
 * Global breytur
 */
const router = express.Router();
const articles = './articles/';

// **************FILES********************//
/**
 * Async les inn skjöl eftir að directory les inn ./articles
 */
const readFileAsync = util.promisify(fs.readFile);
/**
 * @param {any} file
 * Tekur inn hvaða skjöl sem er, skilar þeim í strengjaformi.
 */
function read(file) {
  return readFileAsync(file)
    .then(data => data.toString());
}
/**
 * readFiles tekur inn skjöl og ýtir þeim í read(),
 * eftir að skjalið er búið að lesa, setur það í fylki og skilar því.
 * @param {any} files
 * @returns {object} result
 */
async function readFiles(files) {
  const result = [];
  // Hver hafði hugmyndina að láta eslint banna ++?
  for (let i = 0; i < files.length; i += 1) {
    result.push(read(files[i]));
  }

  return Promise.all(result);
}
// ***************DIRECTORY******************//
const readDirAsync = util.promisify(fs.readdir);
/**
 * Les inn aðeins þau skjöl í directory sem enda á .md, hunsar þannig með img skjalið.
 * @param {any} directory
 * @returns {string} files
 */
function readDir(directory) {
  let results = [];
  return readDirAsync(directory)
    .then((data) => {
      results = data.filter(file => file.substring(file.length - 3) === '.md');
      for (let i = 0; i < results.length; i += 1) {
        results[i] = articles.concat(results[i]);
      }
      return results;
    });
}
/**
 * Slug er slóðin á vefsíðunni, fallið byrjar á að búa til 404 síðu en ef
 * sluggið matchar við skjölin sem við erum að nota þá tekur það frekar
 * data úr þeim og teiknar það í staðinn.
 * @param {any} slug
 * @param {any} file
 * @returns {object} rétta slóð/404 slóð.
 */
function slugFinder(slug, file) {
  let answer = {
    attributes:
    {
      title: '404',
      slug: '404',
    },
    body: '# Error 404 not found',
  };
  for (let i = 0; i < file.length; i += 1) {
    if (file[i].attributes.slug === slug) {
      answer = file[i];
    }
  }
  return answer;
}
/**
 * Router EF slug er notað.
 * Main fall.
 * Byrjar á að lesa directory, senda það í files, lesa skjölin.
 * Ef allt gengur upp, hendir skjölunum í frontmatter,
 * Þá er hægt að skoða hvort sluggið passar við skjölin okkar.
 * Ef svo, þá eru upplýsingunum í skjalinu breytt í markdown og send í render.
 * Býr til error 500 ef eitthvað fer virkilega úrskeiðis.
*/
router.get('/:slug', (req, res) => {
  const { slug } = req.params;
  readDir(articles).then((filename) => {
    readFiles(filename)
      .then((data) => {
        const mapped = data.map(file => fm(file));
        const map = slugFinder(slug, mapped);
        const markdown = md.render(map.body);
        res.render('index', {
          title: `${map.attributes.title}`,
          h1: `${map.attributes.title}`,
          p: `<p> ${markdown}</p>`,
          a: '<a href=\' / \'>Til baka</a>',
        });
      })
      .catch((error) => {
        res.render('index', {
          title: 'Error 500',
          h1: 'Villa kom upp',
          p: error,
          a: '<a href=\' / \'>Til baka</a>',
        });
      });
  });
});
/**
 * Teiknar upp indexið. Tekur inn lesin skjöl og raðar þeim eftir dagsetningu.
 * Byrjar að teikna kassann(row) utan um allt, hoppar svo inn í nokkrar for each
 * til að búta niður verkefnið.
 * @param {any} filename
 * @returns {string} langur html kóði.
 */
function readList(filename) {
  const sorted = [];
  let image;
  let row = '<div class="row">';
  let date;
  // Þurfum ekki body/textann, tökum það bara út.
  filename.forEach((file) => {
    sorted.push(file.attributes);
  });
  // sorterað eftir dagsetningu.
  sorted.sort((a, b) => Date.parse(a.date) < Date.parse(b.date));
  sorted.forEach((file) => {
    date = new Date(file.date);
    date = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    if (typeof (file.image) === 'undefined') {
      image = '<div class="photo"></div>';
    } else {
      image = `<img src =${file.image}>`;
    }
    // Breytan heitir row en í rauninni er hvert svona 'item'. 4 í heild sinni.
    row +=
      `<a class="item"
      href=" ${file.slug}"
      <div class="pic">
        ${image}
      <div class="text">
      <h1>
          ${file.title}
      </h1>
      <p>
       ${date} 
      </p>
      </div>
      </a>`;
  });
  row += '</div>';
  return row;
}
/**
* Router fyrir heimasvæði, kallar á readList sem teiknar indexið.
*/
router.get('/', (req, res) => {
  readDir(articles).then((filename) => {
    readFiles(filename)
      .then((data) => {
        const mapped = data.map(file => fm(file));
        const sorted = readList(mapped);
        res.render('index', {
          title: 'Gagnasafn',
          h1: 'Gagnasafnið',
          p: sorted,
          a: '',
        });
      })
      .catch((error) => {
        res.render('index', {
          title: 'Error 500',
          h1: 'Villa kom upp',
          p: `<p> ${error}</p>`,
          a: '<a href=\' / \'>Til baka</a>',
        });
      });
  });
});

module.exports = router;
