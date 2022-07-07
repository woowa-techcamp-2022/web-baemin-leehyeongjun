function init() {
  const handler = {
    get: function (target, key) {
      return target[key];
    },
    set: function (target, key, value) {
      target[key] = value;

      ["id", "pw"].forEach((key) => {
        target[`${key}Error`] =
          target[`${key}Blured`] && target[`${key}`] === "";
      });
      notify(target);
      return true;
    },
  };

  const proxy = new Proxy(
    {
      id: "",
      pw: "",
      idBlured: false,
      pwBlured: false,
      idError: false,
      pwError: false,
    },
    handler
  );
  const loginForm = document.querySelector(".login-form");

  loginForm.addEventListener("input", (e) => {
    const key = e.target.name;
    const value = e.target.value;
    proxy[`${key}`] = value;
  });

  loginForm.addEventListener("focusout", (e) => {
    const key = e.target.name;
    proxy[`${key}Blured`] = true;
  });

  loginForm.addEventListener("focusin", (e) => {
    const key = e.target.name;
    proxy[`${key}Blured`] = false;
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    proxy["idBlured"] = true;
    proxy["pwBlured"] = true;
  });
}

function notify(proxy) {
  const idContainer = document.querySelector(".id-container");
  const pwContainer = document.querySelector(".pw-container");
  const { idError, pwError } = proxy;

  if (idError) {
    idContainer.classList.add("error");
  } else {
    idContainer.classList.remove("error");
  }

  if (pwError) {
    pwContainer.classList.add("error");
  } else {
    pwContainer.classList.remove("error");
  }
}

init();
