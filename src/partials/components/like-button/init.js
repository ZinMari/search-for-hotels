import LikeButton from "./LikeButton";

$.each($(".js-like-button__btn"), function () {
  new LikeButton($(this));
});
