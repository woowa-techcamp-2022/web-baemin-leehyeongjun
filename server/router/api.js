const express = require("express");
const router = express.Router();
const { getSession } = require("../middleware/session");
const { getDB, setDB } = require("../util/db");

router.post("/user", (req, res) => {
  const session = getSession(req);
  const { email, password, nickname } = req.body;
  session["email"] = email;
  session["nickname"] = nickname;
  const db = getDB();
  db[email] = { password, nickname };
  setDB(db);

  res.redirect("/");
});

router.post("/login", (req, res) => {
  const session = getSession(req);
  const { email, password } = req.body;
  const db = getDB();

  if (!db[email]) {
    return res.status(400).send({ error: "아이디가 존재하지 않습니다." });
  }

  if (db[email].password !== password) {
    return res.status(400).send({ error: "비밀번호가 일치하지 않습니다." });
  }

  session["nickname"] = db[email].nickname;
  res.status(200).send({ status: "success" });
});

module.exports = router;
