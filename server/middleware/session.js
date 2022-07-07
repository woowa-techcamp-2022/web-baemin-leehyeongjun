const { makeRandomSessionId } = require("../util/session");

const sessions = new Map();
const SESSION_LIFETIME = 1000 * 60 * 10;

function setSession(req, res, next) {
  if (!req.cookies["sid"]) {
    const sid = makeRandomSessionId();
    sessions.set(sid, {
      timer: setTimeout(() => {
        sessions.delete(sid);
      }, SESSION_LIFETIME),
    });

    res.cookie("sid", sid, {
      expires: 0,
      httpOnly: true,
    });
  } else {
    const sid = req.cookies["sid"];
    if (!sessions.has(sid)) {
      sessions.set(sid, {
        timer: setTimeout(() => {
          sessions.delete(sid);
        }, SESSION_LIFETIME),
      });
    } else {
      const sid = req.cookies["sid"];
      const session = sessions.get(sid);

      clearTimeout(session.timer);
      session.timer = setTimeout(() => {
        sessions.delete(sid);
      }, SESSION_LIFETIME);
    }
  }
  next();
}

function getSession(req) {
  const sid = req.cookies["sid"];
  return sessions.get(sid);
}

module.exports = {
  setSession,
  getSession,
};
