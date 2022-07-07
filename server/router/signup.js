const express = require("express");
const { pug } = require("../util/pug");
const { ROOT_PATH, join } = require("../util/path");

const router = express.Router();

router.get("/agreement", (req, res) => {
  const agreementPath = join(ROOT_PATH, "web", "signup-agreement.pug");
  const html = pug(agreementPath, {});

  res.status(200).type("html").send(html);
});

router.get("/phone", (req, res) => {
  const phonePath = join(ROOT_PATH, "web", "signup-phone.pug");
  const html = pug(phonePath, {});

  res.status(200).type("html").send(html);
});

router.get("/email", (req, res) => {
  const emailPath = join(ROOT_PATH, "web", "signup-email.pug");
  const html = pug(emailPath, {});

  res.status(200).type("html").send(html);
});

module.exports = router;
