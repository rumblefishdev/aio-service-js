module.exports = {
  use: [
    "@neutrinojs/node", {
      babel: {
        presets: [
          ["babel-preset-env", {
            targets:{
              node: '9.11.1'
            }
          }]
        ]
      }
    },
    "@neutrinojs/airbnb-base",
    "@neutrinojs/jest",
    "preset.js"
  ],
  options: {
    tests: '.'
  }
}
