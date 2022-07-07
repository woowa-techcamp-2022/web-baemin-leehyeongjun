import {
  generateRandomAuthCode,
  formatPhoneNumber,
  checkPhoneNumber,
} from "./util.js";

function init() {
  const handler = {
    get: function (target, key) {
      return target[key];
    },
    set: function (target, key, value) {
      target[key] = value;
      if (key === "phone") {
        target[key] = formatPhoneNumber(value);
      }
      target["isValidPhoneNumber"] = checkPhoneNumber(target["phone"]);
      target["canGoNext"] = target["isValidPhoneNumber"] && target["auth"];
      notify(target);
      return true;
    },
  };

  const proxy = new Proxy(
    {
      phone: "",
      isValidPhoneNumber: false,
      auth: "",
      authSended: false,
      canGoNext: false,
    },
    handler
  );

  const appContainer = document.querySelector(".app-container");

  appContainer.addEventListener("input", (e) => {
    if (e.target.tagName === "INPUT") {
      const key = e.target.name;
      proxy[key] = e.target.value;
    }
  });

  appContainer.addEventListener("click", (e) => {
    const name = e.target.role;
    switch (name) {
      case "auth-send-btn":
        {
          proxy["authSended"] = true;
          setTimeout(() => {
            proxy["auth"] = generateRandomAuthCode();
          }, 2000);
        }
        break;
      case "auth-clear-icon":
        proxy["auth"] = "";
        break;
      case "phone-clear-icon":
        proxy["phone"] = "";
        break;
      case "auth-re-send-btn":
        setTimeout(() => {
          proxy["auth"] = generateRandomAuthCode();
        }, 2000);
    }
  });
}

function notify(proxy) {
  const phoneContainer = document.getElementById("phone-container");
  const authContainer = document.getElementById("auth-container");
  const phoneClearIcon = document.querySelector("i[role='phone-clear-icon']");
  const authClearIcon = document.querySelector("i[role='auth-clear-icon']");
  const phoneInput = document.querySelector('input[name="phone"]');
  const authInput = document.querySelector('input[name="auth"]');
  const authSendButton = document.querySelector(".button-wrap");
  const authReSendButton = document.querySelector(".auth-re-send-wrap");
  const nextButton = document.querySelector('a[role="next-btn"]');

  const { phone, auth, isValidPhoneNumber, authSended, canGoNext } = proxy;

  phoneInput.value = phone;
  if (phone) phoneClearIcon.classList.remove("hidden");
  else phoneClearIcon.classList.add("hidden");

  authInput.value = auth;
  if (auth) {
    authClearIcon.classList.remove("hidden");
    authContainer.classList.remove("not-valid");
  } else {
    authClearIcon.classList.add("hidden");
    authContainer.classList.add("not-valid");
  }

  if (isValidPhoneNumber) phoneContainer.classList.remove("not-valid");
  else phoneContainer.classList.add("not-valid");

  if (authSended) {
    authContainer.classList.remove("hidden");
    authSendButton.classList.add("hidden");
    authReSendButton.classList.remove("hidden");
  } else {
    authContainer.classList.add("hidden");
  }

  if (canGoNext) {
    nextButton.classList.remove("hidden");
  } else {
    nextButton.classList.add("hidden");
  }
}

init();
