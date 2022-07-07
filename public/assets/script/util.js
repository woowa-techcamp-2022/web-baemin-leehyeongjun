function getRandomNumber() {
  const nums = "0123456789";

  return nums[Math.floor(Math.random() * nums.length)];
}

function generateRandomAuthCode() {
  let code = "";

  for (let i = 0; i < 4; i++) code += getRandomNumber();

  return code;
}

export { generateRandomAuthCode };
