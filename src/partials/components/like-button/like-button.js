const likeBtns = document.querySelectorAll('.like-button___btn');

likeBtns.forEach(elem => {
  elem.addEventListener('click', ()=>{
    elem.classList.toggle('like-button___btn--like');
    elem.classList.contains('like-button___btn--like') ? elem.textContent++ : elem.textContent--

  })
})
