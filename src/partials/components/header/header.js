class Header {
  constructor($header) {
    this.$header = $header;

    this._render();
  }

  _init() {
    this.$burgerBtn = this.$header.find(".js-header__burger");
    this.$headerMenu = this.$header.find(".js-header__menu");
    this.$btnLogin = this.$header.find(".js-header__login button");
    this.$btnRegistration = this.$header.find(
      ".js-header__registration button",
    );
  }

  _handleBurgerClick = () => {
    this.$burgerBtn.toggleClass("header__burger_opened");
    this.$burgerBtn.children().toggleClass("header__burger-line_opened");
    this.$headerMenu.toggleClass("header__menu_opened");
    $("html").toggleClass("page_menu_opened");
  };

  _handleBtnLoginClick = () => {
    document.location = "./user-login.html";
  };

  _handleBtnRegistrationClick = () => {
    document.location = "./user-registration.html";
  };

  _render() {
    this._init();

    this.$burgerBtn.on("click.header", this._handleBurgerClick);
    this.$btnLogin.on("click.header", this._handleBtnLoginClick);
    this.$btnRegistration.on("click.header", this._handleBtnRegistrationClick);
  }
}

export default Header;
