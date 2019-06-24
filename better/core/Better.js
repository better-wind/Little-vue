const path = require('path');
const Application = require('./Application');
const Loader = require('./Loader');
const chalk = require('../common/chalk');

class Better {
  get [Symbol.for('BASE_DIR')]() {
    return path.join(__dirname, '..');
  }

  constructor(options = {}) {
    this.options = options;
    this.options.root = options.root || process.cwd();
    this.options.port = options.port || 3000;
    this.init();
    this.start();
  }
  init() {
    this.app = new Application();

    this.loader = new Loader({
      root: this.options.root,
      better: this,
      app: this.app
    });
  }
  start() {
    this.app.listen(this.options.port, () => {
      chalk.info('start', '应用启动成功');
      chalk.info('start', `访问地址：'http://127.0.0.1:' + ${this.options.port}`);
    });
  }
}
module.exports = Better;
