const $btnLogin = $(".registration__enter");

function handleBtnLogin() {
  document.location = "./user-login.html";
}

$btnLogin.on("click.header", handleBtnLogin);
