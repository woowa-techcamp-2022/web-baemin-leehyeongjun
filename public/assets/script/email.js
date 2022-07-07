/**
 * 이메일 및 패스워드 입력 페이지
 */

import { checkBirth, checkPassword, formatBirth } from "./util.js";

function init() {
  const handler = {
    get: function (target, key) {
      return target[key];
    },
    set: function (target, key, value) {
      if (key === "email" && target.emailChecked) {
        notify(target);
        return true;
      }
      target[key] = value;
      if (key === "password") {
        target.passwordChecked = checkPassword(target[key]);
      }

      if (key === "birth") {
        target.birth = formatBirth(value);
        target.birthChecked = checkBirth(target.birth);
      }

      target.canComplete =
        target.emailChecked &&
        target.nickname &&
        target.passwordChecked &&
        target.birthChecked;

      notify(target);
      return true;
    },
  };
  const proxy = new Proxy(
    {
      email: "",
      emailChecked: false,
      nickname: "",
      password: "",
      passwordChecked: false,
      passwordBlurred: false,
      birth: "",
      birthChecked: false,
      birthBlurred: false,
      canComplete: false,
    },
    handler
  );
  const appContainer = document.querySelector(".app-container");

  appContainer.addEventListener("input", (e) => {
    if (e.target.tagName === "INPUT") {
      const name = e.target.name;
      proxy[name] = e.target.value;
    }
  });

  appContainer.addEventListener("focusout", (e) => {
    if (e.target.tagName === "INPUT") {
      const name = e.target.name;
      if (name === "password" || name == "birth") {
        proxy[`${name}Blurred`] = true;
      }
    }
  });

  appContainer.addEventListener("click", (e) => {
    const role = e.target.role;

    switch (role) {
      case "dup-check-button":
        if (proxy.email) {
          proxy.emailChecked = true;
        }
        break;
      case "email-clear-button":
        {
          if (!proxy.emailChecked) {
            proxy.email = "";
          }
        }
        break;
      case "nickname-clear-button":
        proxy.nickname = "";
        break;
      case "password-clear-button":
        proxy.password = "";
        break;
      case "birth-clear-button":
        proxy.birth = "";
        break;

      case "complete-button":
        postUser(proxy.email, proxy.password, proxy.nickname);
        break;
    }
  });
}

function notify(proxy) {
  const emailClearButton = document.querySelector(
    'i[role="email-clear-button"]'
  );
  const emailContainer = document.getElementById("email-container");
  const emailInput = document.querySelector('input[name="email"]');
  const nicknameClearButton = document.querySelector(
    'i[role="nickname-clear-button"]'
  );
  const nicknameContainer = document.getElementById("nickname-container");
  const nicknameInput = document.querySelector('input[name="nickname"]');
  const passwordClearButton = document.querySelector(
    'i[role="password-clear-button"]'
  );
  const passwordContainer = document.getElementById("password-container");
  const passwordInput = document.querySelector('input[name="password"]');
  const birthClearButton = document.querySelector(
    'i[role="birth-clear-button"]'
  );
  const birthContainer = document.getElementById("birth-container");
  const birthInput = document.querySelector('input[name="birth"]');

  const completeButton = document.getElementById("complete-button");

  const {
    email,
    emailChecked,
    nickname,
    password,
    passwordChecked,
    passwordBlurred,
    birth,
    birthChecked,
    birthBlurred,
    canComplete,
  } = proxy;

  emailInput.value = email;
  if (email) {
    emailClearButton.classList.remove("hidden");
  } else {
    emailClearButton.classList.add("hidden");
  }

  if (emailChecked) {
    emailContainer.classList.remove("not-valid");
    nicknameContainer.classList.remove("hidden");
    passwordContainer.classList.remove("hidden");
    birthContainer.classList.remove("hidden");
  } else {
    emailContainer.classList.add("not-valid");
  }

  nicknameInput.value = nickname;
  if (nickname) {
    nicknameClearButton.classList.remove("hidden");
    nicknameContainer.classList.remove("not-valid");
  } else {
    nicknameClearButton.classList.add("hidden");
    nicknameContainer.classList.add("not-valid");
  }

  passwordInput.value = password;
  if (password) {
    passwordClearButton.classList.remove("hidden");
  } else {
    passwordClearButton.classList.add("hidden");
  }

  if (passwordBlurred) {
    if (passwordChecked) {
      passwordContainer.classList.remove("not-valid");
      passwordContainer.classList.remove("error");
    } else {
      passwordContainer.classList.add("not-valid");
      passwordContainer.classList.add("error");
    }
  }

  birthInput.value = birth;
  if (birth) {
    birthClearButton.classList.remove("hidden");
  } else {
    birthClearButton.classList.add("hidden");
  }

  if (birthBlurred) {
    if (birthChecked) {
      birthContainer.classList.remove("not-valid");
      birthContainer.classList.remove("error");
    } else {
      birthContainer.classList.add("not-valid");
      birthContainer.classList.add("error");
    }
  }

  if (canComplete) {
    completeButton.classList.remove("hidden");
  } else {
    completeButton.classList.add("hidden");
  }
}

function postUser(email, password, nickname) {
  const form = document.createElement("form");
  form.style.display = "none";

  const emailInput = document.createElement("input");
  const passwordInput = document.createElement("input");
  const nicknameInput = document.createElement("input");
  emailInput.value = email;
  emailInput.name = "email";
  passwordInput.type = "password";
  passwordInput.value = password;
  passwordInput.name = "password";
  nicknameInput.value = nickname;
  nicknameInput.name = "nickname";

  form.appendChild(emailInput);
  form.appendChild(passwordInput);
  form.appendChild(nicknameInput);

  form.method = "post";
  form.action = "/api/user";

  document.body.appendChild(form);
  form.submit();
}

init();
