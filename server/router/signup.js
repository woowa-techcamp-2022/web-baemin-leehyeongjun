const express = require("express");
const { pug } = require("../util/pug");
const { ROOT_PATH, join } = require("../util/path");

const router = express.Router();

router.get("/agreement", (req, res) => {
  const agreementPath = join(ROOT_PATH, "web", "signup-agreement.pug");
  const html = pug(agreementPath, {});

  res.status(200).type("html").send(html);
});

module.exports = router;
