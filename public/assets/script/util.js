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

function checkPassword(text) {
  if (text.length < 10) return false;

  // 대문자, 소문자, 숫자, 특수문자 2개 이상 조합
  const passCount = ["[A-Z]", "[a-z]", "[0-9]", "[^0-9^a-z^A-Z]"].reduce(
    (acc, val) => {
      let temp = text;
      temp = temp.replace(new RegExp(val, "g"), "");

      return text.length !== temp.length ? acc + 1 : acc;
    },
    0
  );

  if (passCount < 2) return false;

  // 연속된 숫자 3연속 X, 같은 숫자 3연속X
  let temp = text;
  while (temp.match(/[0-9]{3,}/)) {
    const numberText = temp.match(/[0-9]{3,}/)[0];
    const numberArray = numberText.split("").map((item) => +item);

    let positiveAdjacentCount = 0;
    let negativeAdjacentCount = 0;
    let sameNumberCount = 0;
    for (let i = 0; i < numberArray.length; i++) {
      if (i === 0) continue;

      const prev = numberArray[i - 1];
      const curr = numberArray[i];

      if (curr - prev === 1) positiveAdjacentCount += 1;
      else positiveAdjacentCount = 0;

      if (prev - curr === 1) negativeAdjacentCount += 1;
      else negativeAdjacentCount = 0;

      if (prev === curr) sameNumberCount += 1;
      else sameNumberCount = 0;

      if (positiveAdjacentCount >= 2) return false;
      if (negativeAdjacentCount >= 2) return false;
      if (sameNumberCount >= 2) return false;
    }
    temp = temp.replace(numberText, "");
  }

  return true;
}

function checkBirth(text) {
  return !isNaN(new Date(text).valueOf());
}

function formatBirth(text) {
  const numberString = text.replace(/[^0-9]/g, "").slice(0, 8);
  if (numberString.length >= 8) {
    return numberString.replace(/^([0-9]{4})([0-9]{2})([0-9]{2})$/, "$1.$2.$3");
  } else if (numberString.length >= 7) {
    return numberString.replace(/^([0-9]{4})([0-9]{2})([0-9]*)$/, "$1.$2.$3");
  } else if (numberString.length >= 5) {
    return numberString.replace(/^([0-9]{4})([0-9]*)$/, "$1.$2");
  } else {
    return numberString;
  }
}

export {
  generateRandomAuthCode,
  formatPhoneNumber,
  checkPhoneNumber,
  checkPassword,
  checkBirth,
  formatBirth,
};
