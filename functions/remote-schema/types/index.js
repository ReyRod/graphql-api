const fs = require('fs');

const types = fs.readdirSync('./functions/remote-schema/types')
  .reduce((p, f) => {
    if (f === 'index.js') return p;
    p += require(`./${f}`).default;
    return p;
  },
  ''
  );

exports.types = types;
