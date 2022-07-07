const express = require("express");
const { pug } = require("../util/pug");
const { ROOT_PATH, join } = require("../util/path");
const signupRouter = require("./signup");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  const mainPath = join(ROOT_PATH, "web", "main.pug");
  const html = pug(mainPath, {});
  res.status(200).type("html").send(html);
});

app.get("/login", (req, res) => {
  const loginPath = join(ROOT_PATH, "web", "login.pug");
  const html = pug(loginPath, {});

  res.status(200).type("html").send(html);
});

app.use("/signup", signupRouter);

app.listen(3000);
