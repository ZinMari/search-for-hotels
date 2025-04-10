const $likeBtns = $(".js-like-button__btn");

function handlelikeBtnsClick(e) {
  e.currentTarget.classList.toggle("like-button__btn_like");
  e.currentTarget.classList.contains("like-button__btn_like")
    ? this.textContent++
    : this.textContent--;
}

$likeBtns.on("click.likeBtn", handlelikeBtnsClick);
