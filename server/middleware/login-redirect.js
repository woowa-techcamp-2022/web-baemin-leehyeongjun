const { getSession } = require("./session");

function redirectLoginUser(req, res, next) {
  const session = getSession(req);

  if (session["nickname"]) {
    res.redirect("/");
  } else {
    next();
  }
}

module.exports = {
  redirectLoginUser,
};
