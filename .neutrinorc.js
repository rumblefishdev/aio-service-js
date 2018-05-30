module.exports = {
  use: [
    "@neutrinojs/node", {
      babel: {
        presets: [
          ["babel-preset-env", {
            targets:{
              node: 'current'
            },
            exclude: ['transform-async-to-generator']
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
