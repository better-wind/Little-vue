const path = require('path');

module.exports = {
  'better-views': {
    enable: true,
    options: {
      path: path.join(process.cwd(), '/app/views'),
    }
  },
}
