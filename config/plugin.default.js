const path = require('path');

module.exports = {
  'better-logger': {
    enable: true,
    path: path.resolve(__dirname, '../plugins/better-logger')
  },
  'better-global': {
    enable: true,
    path: path.resolve(__dirname, '../plugins/better-global')
  },
}
