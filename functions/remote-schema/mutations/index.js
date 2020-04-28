const fs = require('fs');

const mutations = fs.readdirSync('./functions/remote-schema/mutations')
  .reduce((p, f) => {
    if (f === 'index.js') return p;
    p[f.replace('.js', '')] = require(`./${f}`).default;
    return p;
  },
  {}
  );

exports.mutations = mutations;
