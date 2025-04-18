import Pagination from "./Pagination";

$.each($(".js-pagination"), function () {
  new Pagination(this);
});
