/**
 * 로그인 페이지
 */

import { setElementError } from "./dom.js";
import { hash } from "./util.js";

{
  const loginForm = document.querySelector(".login-form");
  const idContainer = document.querySelector(".id-container");
  const pwContainer = document.querySelector(".pw-container");

  function init() {
    const handler = {
      get: function (target, key) {
        return target[key];
      },
      set: function (target, key, value) {
        target[key] = value;
        ["id", "pw"].forEach((key) => {
          target[`${key}Error`] =
            target[`${key}Blurred`] && target[`${key}`] === "";
        });
        notify(target);
        return true;
      },
    };

    const proxy = new Proxy(
      {
        id: "",
        pw: "",
        idBlurred: false,
        pwBlurred: false,
        idError: false,
        pwError: false,
      },
      handler
    );

    loginForm.addEventListener("input", (e) => {
      const key = e.target.name;
      const value = e.target.value;
      proxy[`${key}`] = value;
    });

    loginForm.addEventListener("focusout", (e) => {
      const key = e.target.name;
      proxy[`${key}Blurred`] = true;
    });

    loginForm.addEventListener("focusin", (e) => {
      const key = e.target.name;
      proxy[`${key}Blurred`] = false;
    });

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      proxy["idBlurred"] = true;
      proxy["pwBlurred"] = true;

      login(proxy["id"], proxy["pw"]);
    });
  }

  function notify(proxy) {
    const { idError, pwError } = proxy;
    setElementError(idContainer, idError);
    setElementError(pwContainer, pwError);
  }

  async function login(id, pw) {
    const res = await fetch("/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: id, password: hash(pw) }),
    });

    if (res.status === 200) {
      window.location.href = "/";
      return;
    }
    const json = await res.json();
    alert(json.error);
  }

  init();
}
