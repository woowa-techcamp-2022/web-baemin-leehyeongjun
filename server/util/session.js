function getRandomString() {
  const selection = "abcdefghijklmnopqrstuvwxyz0123456789";
  const randomNumber = Math.floor(Math.random() * selection.length);
  return selection[randomNumber];
}

function makeRandomSessionId() {
  let sid = "";

  for (let i = 0; i < 10; i++) {
    sid += getRandomString();
  }

  return sid;
}

module.exports = {
  makeRandomSessionId,
};
