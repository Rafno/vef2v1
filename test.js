///* útfæra greina virkni */
///*const fs = require('fs')
//  , fm = require('front-matter')
//  , matter = require('gray-matter')
//  , markdown = require('markdown-it')
//  , util = require('util')
//  , express = require('express')
//  , router = express.Router();

//const readFileAsync = util.promisify(fs.readFile);
////í async falli, const fileList = await readdir('slóð/á/möppu');
//const filename = ['articles/batman-ipsum.md', 'articles/corporate-ipsum.md', 'articles/deloren-ipsum.md', 'articles/lorem-ipsum.md'];
////gögnin úr skránni skoða fs.readdir

//function read(file) {
//  return readFileAsync(file)
//    .then(data => data.toString());
//},

///*
//1.Batman ipsum Jan 18
//2.Lorem Ipsum Jan 17
//3.Corporate Ipsum Jan 16
//4.Delorean Ipsum Jan 10
//*/

//function createJsObject(filename) {
//  read(filename)
//    .then(data => {
//      let content = fm(data);
//      const object = {
//        title: content.title,
//        slug: content.slug,
//        date: content.date
//      };
//      return object;
//    });
//}

///*
//function readArr(filename){
//  let sorted = [];
//  for (let i = 0; i < filename.length; i++) {
//    read(filename[i])
//      .then(data => {
//        let content = fm(data);
//        sorted.push(content.attributes);
//        if (sorted.length === filename.length) {
//          sorted = sorted.sort(function (a, b) {
//            return Date.parse(a.date) < Date.parse(b.date);
//          });
//        }
//        return sorted;
//      });
//  }
  
//}
//*/
//const files = readArr(filename);
//console.log(files);
//router.get('/:slug', (req, res) => {
//  res.send(`já þú kemst samt inná þetta =`);
//});
//module.exports = router;
//*/