import Registration from "./Registration";

$.each($(".registration"), function () {
  new Registration($(this));
});
