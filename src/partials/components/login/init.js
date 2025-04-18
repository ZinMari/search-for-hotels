import Login from "./Login";

$.each($(".login"), function () {
  new Login($(this));
});
