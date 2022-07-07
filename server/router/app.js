const express = require("express");
const cookieParser = require("cookie-parser");
const { pug } = require("../util/pug");
const { ROOT_PATH, join } = require("../util/path");
const { setSession } = require("../middleware/session");
const signupRouter = require("./signup");

const app = express();

app.use(cookieParser());
app.use(express.static("public"));
app.use(setSession);

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
