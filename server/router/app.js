const express = require("express");
const { pug } = require("../util/pug");
const { ROOT_PATH, join } = require("../util/path");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  const mainPath = join(ROOT_PATH, "web", "main.pug");
  const html = pug(mainPath, {});
  res.status(200).type("html").send(html);
});

app.listen(3000);
