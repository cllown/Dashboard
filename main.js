const fs = require('fs');
const pug = require('pug');

fs.writeFileSync('index.html', pug.renderFile('layout/body.pug',{basedir:'layout'}));