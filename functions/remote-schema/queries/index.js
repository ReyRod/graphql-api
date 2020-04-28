const fs = require('fs');

const queries = fs.readdirSync('./functions/remote-schema/queries')
  .reduce((p, f) => {
    if (f === 'index.js') return p;
    p[f.replace('.js', '')] = require(`./${f}`).default;
    return p;
  },
  {}
  );

exports.queries = queries;
