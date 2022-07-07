const map = new Map();
const LOGIN_INTERVAL = 3000;

function checkLoginInterval(req, res, next) {
  const sid = req.cookies["sid"];

  if (map.get(sid)) {
    const currentTime = new Date().valueOf();

    const diff = currentTime - map.get(sid);

    if (diff < LOGIN_INTERVAL) {
      res.status(400).send({ error: "3초 후 다시 시도해주세요." });
    } else {
      map.set(sid, new Date().valueOf());
      next();
    }
  } else {
    map.set(sid, new Date().valueOf());
    next();
  }
}

module.exports = {
  checkLoginInterval,
};
