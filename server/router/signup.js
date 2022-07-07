const express = require("express");
const router = express.Router();
const { ROOT_PATH, join } = require("../util/path");

router.get("/agreement", (req, res) => {
  const loginPath = join(ROOT_PATH, "web", "login.pug");
  const html = pug(loginPath, {});

  res.status(200).type("html").send(html);
});

module.exports = router;
