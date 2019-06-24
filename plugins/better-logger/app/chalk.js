const chalk = require('chalk');

/**
 * datetime
 * @param { Date } date
 * @param { String } format
 * @return {string}
 */
const datetime = (date = new Date(), format = 'HH:mm:ss') => {
  let fn = (d) => {
    return ('0' + d).slice(-2);
  };
  if (date && typeof date === 'string') {
    date = new Date(Date.parse(date));
  }
  const formats = {
    YYYY: date.getFullYear(),
    MM: fn(date.getMonth() + 1),
    DD: fn(date.getDate()),
    HH: fn(date.getHours()),
    mm: fn(date.getMinutes()),
    ss: fn(date.getSeconds())
  };
  return format.replace(/([a-z])\1+/ig, function (a) {
    return formats[a] || a;
  });
};

/**
 * log
 * @param args
 */
const log = (...args) => {
  let time =chalk.gray.bold( '[' + datetime() + ']');
  if (args.length === 1) {
    args = [''].concat(args);
  }
  console.log.apply(console.log, [time].concat(args));
}

/**
 * info 普通日志样式
 * @param tag
 * @param msg
 */
const info = (tag = 'info', msg) => {
  log(chalk.hex('#DEADED').bgGreen.bold(`[${tag}]`) + ' ' + msg);
}

/**
 * 更新文件日志样式
 * @param msg
 * @param type
 */
const update = (msg, type = '') => {
  log(chalk.green.bold('[Update]') + ' ' + chalk.hex('#DEADED').bgGreen.bold('['+ type + ']') + ' ' +chalk.blue.underline.bold(msg));
}

module.exports = {
  info,
  update,
}
