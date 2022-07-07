const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { pug } = require("../util/pug");
const { ROOT_PATH, join } = require("../util/path");
const { setSession, getSession } = require("../middleware/session");
const { redirectLoginUser } = require("../middleware/login-redirect");
const signupRouter = require("./signup");
const apiRouter = require("./api");

const app = express();

app.use(cookieParser());
app.use(bodyParser());
app.use(express.static("public"));
app.use(setSession);

app.get("/", (req, res) => {
  const session = getSession(req);
  const mainPath = join(ROOT_PATH, "web", "main.pug");
  const html = pug(mainPath, { nickname: session["nickname"] });
  res.status(200).type("html").send(html);
});

app.get("/login", redirectLoginUser, (req, res) => {
  const loginPath = join(ROOT_PATH, "web", "login.pug");
  const html = pug(loginPath, {});

  res.status(200).type("html").send(html);
});

app.get("/logout", (req, res) => {
  const session = getSession(req);
  session["nickname"] = null;
  res.redirect("/");
});

app.use("/signup", signupRouter);
app.use("/api", apiRouter);

app.listen(3000);
