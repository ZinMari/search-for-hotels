const likeBtns = $('.js-like-button___btn');

function handlelikeBtnsClick(e){
  e.currentTarget.classList.toggle('like-button___btn--like');
  e.currentTarget.classList.contains('like-button___btn--like') ? this.textContent++ : this.textContent--
}

likeBtns.on('click', handlelikeBtnsClick)
