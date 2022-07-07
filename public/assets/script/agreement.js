function init() {
  const handler = {
    get: function (target, key) {
      return target[key];
    },
    set: function (target, key, value) {
      target[key] = value;
      if (key === "check-all") {
        [
          "usage-agreement",
          "e-trade-agreement",
          "personal-info-collect-agreement",
          "personal-info-share-agreement",
          "marketing-agreement",
        ].forEach((v) => {
          target[v] = target["check-all"];
        });
      }

      target["check-all"] = [
        "usage-agreement",
        "e-trade-agreement",
        "personal-info-collect-agreement",
        "personal-info-share-agreement",
        "marketing-agreement",
      ].reduce((prev, v) => {
        return prev && target[v];
      }, true);

      target["canGoNext"] = [
        "usage-agreement",
        "e-trade-agreement",
        "personal-info-collect-agreement",
      ].reduce((prev, value) => {
        return prev && target[value];
      }, true);

      notify(target);
      return true;
    },
  };

  const proxy = new Proxy(
    {
      "check-all": false,
      "usage-agreement": false,
      "e-trade-agreement": false,
      "personal-info-collect-agreement": false,
      "personal-info-share-agreement": false,
      "marketing-agreement": false,
      "age-over-14": false,
      "age-under-14": false,
      canGoNext: false,
    },
    handler
  );

  const appContainer = document.querySelector(".app-container");
  appContainer.addEventListener("change", (e) => {
    if (e.target.tagName === "INPUT") {
      const key = e.target.id;
      const value = e.target.checked;
      proxy[key] = value;
    }
  });
}

function notify(proxy) {
  [
    "check-all",
    "usage-agreement",
    "e-trade-agreement",
    "personal-info-collect-agreement",
    "personal-info-share-agreement",
    "marketing-agreement",
  ].forEach((id) => {
    const el = document.getElementById(id);

    el.checked = proxy[id];
  });

  const nextButtonValidChecker = document.getElementById("valid-check");
  nextButtonValidChecker.checked = proxy["canGoNext"];
}

init();
