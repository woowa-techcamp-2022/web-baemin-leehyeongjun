const pug = require("pug");

/**
 * @param {string} path
 * @param {object} data
 * @return {string}
 */
const render = (path, data) => {
  return pug.renderFile(path, data);
};

module.exports = {
  pug: render,
};
