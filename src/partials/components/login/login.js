const $btnRegistration = $(".login__create-btn button");

function handleBtnRegistration() {
  document.location = "./user-registration.html";
}

$btnRegistration.on("click.header", handleBtnRegistration);
