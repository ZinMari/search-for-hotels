const burgerBtn = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__menu');

burgerBtn.addEventListener('click', ()=>{
  burgerBtn.classList.toggle('header__burger--open');
  burgerBtn.firstElementChild.classList.toggle('header__burger-line--open');
  headerMenu.classList.toggle('header__menu--open');
  document.documentElement.classList.toggle('page--menu-open');
})


