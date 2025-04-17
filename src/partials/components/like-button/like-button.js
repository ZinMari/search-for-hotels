const $likeBtns = $(".js-like-button__btn");

function handlelikeBtnsClick(e) {
  e.currentTarget.classList.toggle("like-button__btn_liked");
  e.currentTarget.classList.contains("like-button__btn_liked")
    ? this.textContent++
    : this.textContent--;
}

$likeBtns.on("click.likeBtn", handlelikeBtnsClick);
