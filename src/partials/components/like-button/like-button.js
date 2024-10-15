const likeBtns = $('.like-button___btn');

likeBtns.on('click', function(){
    this.classList.toggle('like-button___btn--like');
    this.classList.contains('like-button___btn--like') ? this.textContent++ : this.textContent--
  })
