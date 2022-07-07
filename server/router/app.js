const express = require("express");
const cookieParser = require("cookie-parser");
const { pug } = require("../util/pug");
const { ROOT_PATH, join } = require("../util/path");
const { setSession, getSession } = require("../middleware/session");
const { redirectLoginUser } = require("../middleware/login-redirect");
const signupRouter = require("./signup");
const apiRouter = require("./api");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(setSession);

app.get("/", (req, res) => {
  const session = getSession(req);
  const mainPath = join(ROOT_PATH, "web", "main.pug");
  const html = pug(mainPath, {
    nickname: session ? session["nickname"] : null,
  });
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

app.get("*", (req, res) => {
  res
    .status(404)
    .send(`<h1>페이지가 존재하지 않습니다.</h1><a href="/">홈으로</a>`);
});

app.listen(process.env.PORT || 3000);
