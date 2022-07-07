function getRandomNumber() {
  const nums = "0123456789";

  return nums[Math.floor(Math.random() * nums.length)];
}

function generateRandomAuthCode() {
  let code = "";

  for (let i = 0; i < 4; i++) code += getRandomNumber();

  return code;
}

function checkPhoneNumber(text) {
  return /^010-[0-9]{4}-[0-9]{4}$/.test(text);
}

function formatPhoneNumber(text) {
  const numberString = text.replace(/[^0-9]/gi, "").slice(0, 11);

  if (numberString.length >= 11) {
    return numberString.replace(/^([0-9]{3})([0-9]{4})([0-9]{4})$/, "$1-$2-$3");
  } else if (numberString.length >= 8) {
    return numberString.replace(/^([0-9]{3})([0-9]{4})([0-9]*)$/, "$1-$2-$3");
  } else if (numberString.length >= 4) {
    return numberString.replace(/^([0-9]{3})([0-9]*)$/, "$1-$2");
  } else {
    return numberString;
  }
}

export { generateRandomAuthCode, formatPhoneNumber, checkPhoneNumber };
