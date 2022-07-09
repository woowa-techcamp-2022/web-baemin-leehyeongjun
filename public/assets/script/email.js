/**
 * 이메일 및 패스워드 입력 페이지
 */

import {
  select,
  setElementError,
  setElementHidden,
  setElementValidation,
} from "./dom.js";
import { checkBirth, checkPassword, formatBirth, hash } from "./util.js";

{
  const [
    appContainer,
    dupCheckButton,
    emailClearButton,
    emailContainer,
    emailInput,
    nicknameClearButton,
    nicknameContainer,
    nicknameInput,
    passwordClearButton,
    passwordContainer,
    passwordInput,
    birthClearButton,
    birthContainer,
    birthInput,
    completeButton,
  ] = select([
    ".app-container",
    ".dup-check-button",
    '*[role="email-clear-button"]',
    "#email-container",
    'input[name="email"]',
    '*[role="nickname-clear-button"]',
    "#nickname-container",
    'input[name="nickname"]',
    '*[role="password-clear-button"]',
    "#password-container",
    'input[name="password"]',
    '*[role="birth-clear-button"]',
    "#birth-container",
    'input[name="birth"]',
    "#complete-button",
  ]);

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
      const element = e.target;
      switch (element) {
        case dupCheckButton:
          proxy.emailChecked = proxy.email.length > 0;
          break;
        case emailClearButton:
          if (!proxy.emailChecked) proxy.email = "";
          break;
        case nicknameClearButton:
          proxy.nickname = "";
          break;
        case passwordClearButton:
          proxy.password = "";
          break;
        case birthClearButton:
          proxy.birth = "";
          break;
        case completeButton:
          postUser(proxy.email, proxy.password, proxy.nickname);
          break;
      }
    });
  }

  function notify(proxy) {
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
    setElementHidden(emailClearButton, !email);
    setElementHidden(nicknameContainer, !emailChecked);
    setElementHidden(passwordContainer, !emailChecked);
    setElementHidden(birthContainer, !emailChecked);
    setElementValidation(emailContainer, emailChecked);

    nicknameInput.value = nickname;
    setElementHidden(nicknameClearButton, !nickname);
    setElementValidation(nicknameContainer, !!nickname);

    passwordInput.value = password;
    setElementHidden(passwordClearButton, !password);

    if (passwordBlurred) {
      setElementError(passwordContainer, !passwordChecked);
      setElementValidation(passwordContainer, passwordChecked);
    }

    birthInput.value = birth;
    setElementHidden(birthClearButton, !birth);

    if (birthBlurred) {
      setElementValidation(birthContainer, birthChecked);
      setElementError(birthContainer, !birthChecked);
    }
    setElementHidden(completeButton, !canComplete);
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
    passwordInput.value = hash(password);
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
}
