import Login from "./LoginClass";

$.each($(".login"), function () {
  new Login($(this));
});
