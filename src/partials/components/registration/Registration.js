class Registration {
  constructor($registrationForm) {
    this.$registrationForm = $registrationForm;

    this._render();
  }

  _init() {
    this.$btnLogin = this.$registrationForm.find(".registration__enter");
  }

  _handleBtnLogin = () => {
    document.location = "./user-login.html";
  };

  _render() {
    this._init();
    this.$btnLogin.on("click.header", this._handleBtnLogin);
  }
}

export default Registration;
