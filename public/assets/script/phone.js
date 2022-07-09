/**
 * 휴대폰 번호 입력 페이지
 */

import { select, setElementHidden, setElementValidation } from "./dom.js";
import {
  generateRandomAuthCode,
  formatPhoneNumber,
  checkPhoneNumber,
} from "./util.js";

{
  const [
    phoneContainer,
    authContainer,
    phoneClearIcon,
    authClearIcon,
    phoneInput,
    authInput,
    authSendButton,
    authSendButtonWrap,
    authReSendButton,
    nextButton,
  ] = select([
    "#phone-container",
    "#auth-container",
    "*[role='phone-clear-icon']",
    "*[role='auth-clear-icon']",
    'input[name="phone"]',
    'input[name="auth"]',
    ".auth-send-btn",
    ".button-wrap",
    ".auth-re-send-wrap",
    'a[role="next-btn"]',
  ]);

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
        target.phoneChecked = checkPhoneNumber(target.phone);
        target.canGoNext = target.phoneChecked && target.auth;
        notify(target);
        return true;
      },
    };

    const proxy = new Proxy(
      {
        phone: "",
        phoneChecked: false,
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
      const element = e.target;
      console.log(element);
      switch (element) {
        case authSendButton:
          proxy.authSended = true;
          setTimeout(() => {
            proxy.auth = generateRandomAuthCode();
          }, 2000);
          break;
        case authClearIcon:
          proxy.auth = "";
          break;
        case phoneClearIcon:
          proxy.phone = "";
          break;
        case authReSendButton:
          setTimeout(() => {
            proxy.auth = generateRandomAuthCode();
          }, 2000);
      }
    });
  }

  function notify(proxy) {
    const { phone, auth, phoneChecked, authSended, canGoNext } = proxy;

    phoneInput.value = phone;
    setElementHidden(phoneClearIcon, !phone);

    authInput.value = auth;
    setElementHidden(authClearIcon, !auth);
    setElementValidation(authContainer, !!auth);

    setElementValidation(phoneContainer, phoneChecked);
    setElementHidden(authContainer, !authSended);
    setElementHidden(authSendButtonWrap, authSended);
    setElementHidden(authReSendButton, !authSended);

    setElementHidden(nextButton, !canGoNext);
  }

  init();
}
