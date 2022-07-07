const fs = require("fs");
const { ROOT_PATH, join } = require("./path");
const dbFilePath = join(ROOT_PATH, "server", "db", "user.txt");

function getDB() {
  const contents = fs.readFileSync(dbFilePath);

  return JSON.parse(contents);
}

function setDB(object) {
  const contents = JSON.stringify(object);

  fs.writeFileSync(dbFilePath, contents);
}

module.exports = {
  getDB,
  setDB,
};
