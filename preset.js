const loaderMerge = require('@neutrinojs/loader-merge');

module.exports = neutrino => {
  neutrino.use(loaderMerge('lint', 'eslint'), {
    rules: {
      'comma-dangle': 'off',
      'no-await-in-loop': 'off',
      'function-paren-newline': 'off',
      'no-constant-condition': 'off'
    }
  });
};
