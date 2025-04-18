class LikeButton {
  constructor($likeBtn) {
    this.$likeBtn = $likeBtn;

    this._render();
  }

  _handlelikeBtnsClick = (e) => {
    e.currentTarget.classList.toggle("like-button__btn_liked");
    e.currentTarget.classList.contains("like-button__btn_liked")
      ? this.textContent++
      : this.textContent--;
  };

  _render() {
    this.$likeBtn.on("click.likeBtn", this._handlelikeBtnsClick);
  }
}

export default LikeButton;
