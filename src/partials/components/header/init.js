import Header from "./Header";

$.each($(".js-header"), function () {
  new Header($(this));
});
