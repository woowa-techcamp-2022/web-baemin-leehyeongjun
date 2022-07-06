function getRandomString() {
  const selection = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

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
