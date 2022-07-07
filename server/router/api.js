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

module.exports = router;
