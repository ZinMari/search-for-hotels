import Datepicker from "./Datepicker";

$.each($(".js-date-calendar"), function () {
  new Datepicker($(this));
});
