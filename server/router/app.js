const express = require("express");
const { pug } = require("../util/pug");
const { getRootPath } = require("../util/path");
const rootPath = getRootPath();
const path = require("path");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  const mainPath = path.join(rootPath, "web", "main.pug");
  const html = pug(mainPath, {});
  res.status(200).send(html);
});

app.listen(3000);
