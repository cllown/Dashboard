const fs = require('fs');
const pug = require('pug');

const compiledHtml = pug.renderFile('index.pug');

fs.writeFileSync('index.html', compiledHtml);
