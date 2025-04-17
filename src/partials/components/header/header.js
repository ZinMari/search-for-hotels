const $burgerBtn = $(".js-header__burger");
const $headerMenu = $(".js-header__menu");
const $btnLogin = $(".js-header__login button");
const $btnRegistration = $(".js-header__registration button");

function handleBurgerClick() {
  $burgerBtn.toggleClass("header__burger_opened");
  $burgerBtn.children().toggleClass("header__burger-line_opened");
  $headerMenu.toggleClass("header__menu_opened");
  $("html").toggleClass("page_menu_opened");
}

function handleBtnLoginClick() {
  document.location = "./user-login.html";
}

function handleBtnRegistrationClick() {
  document.location = "./user-registration.html";
}

$burgerBtn.on("click.header", handleBurgerClick);
$btnLogin.on("click.header", handleBtnLoginClick);
$btnRegistration.on("click.header", handleBtnRegistrationClick);
