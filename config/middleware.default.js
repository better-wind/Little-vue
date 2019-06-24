const path = require('path');

module.exports = {
  'better-static': {
    enable: true,
    options: {
      path: path.join(__dirname, '../client'),
    }
  }
}
