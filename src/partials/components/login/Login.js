class Login {
  constructor($loginForm) {
    this.$loginForm = $loginForm;

    this._render();
  }

  _init() {
    this.$btnRegistration = this.$loginForm.find(".login__create-btn button");
  }

  _handleBtnRegistration = () => {
    document.location = "./user-registration.html";
  };

  _render() {
    this._init();
    this.$btnRegistration.on("click.header", this._handleBtnRegistration);
  }
}

export default Login;
