function init() {
  const appContainer = document.getElementById("app-container");

  appContainer.addEventListener("input", (e) => {
    console.log(e);
  });
}

init();
