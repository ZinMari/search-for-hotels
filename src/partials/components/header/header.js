const $burgerBtn = $(".js-header__burger");
const $headerMenu = $(".js-header__menu");
const $btnLogin = $(".js-header__login button");
const $btnRegistration = $(".js-header__registration button");

function handleBurgerClick() {
  $burgerBtn.toggleClass("header__burger_open");
  $burgerBtn.children().toggleClass("header__burger-line_open");
  $headerMenu.toggleClass("header__menu_open");
  $("html").toggleClass("page_menu_open");
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
