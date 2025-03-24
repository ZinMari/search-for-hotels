const likeBtns = $('.like-button___btn');

function handlelikeBtnsClick(){
  this.classList.toggle('like-button___btn--like');
  this.classList.contains('like-button___btn--like') ? this.textContent++ : this.textContent--
}

likeBtns.on('click', handlelikeBtnsClick)
