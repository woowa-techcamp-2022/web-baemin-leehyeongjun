const { makeRandomSessionId } = require("../util/session");

const sessions = new Map();

function setSession(req, res, next) {
  if (!req.cookies["sid"]) {
    const sid = makeRandomSessionId();
    sessions.set(sid, {});

    res.cookie("sid", sid, {
      expires: 0,
      httpOnly: true,
    });
  } else {
    if (!sessions.has(req.cookies["sid"])) {
      sessions.set(req.cookies["sid"], {});
    }
  }
  next();
}

function getSession(req) {
  return sessions.get(req.cookies["sid"]);
}

module.exports = {
  setSession,
  getSession,
};
