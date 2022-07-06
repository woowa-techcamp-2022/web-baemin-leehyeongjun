const pug = require("pug");

/**
 * @param {string} path
 * @param {object} data
 * @return {string}
 */
const render = (path, data) => {
  const html = pug.renderFile(path, data);
  return html;
};

module.exports = {
  pug: render,
};
