import Dropdown from "./Dropdown";

$.each($(".js-dropdown"), function () {
  new Dropdown($(this));
});
