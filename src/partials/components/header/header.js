const burgerBtn = $('.js-header__burger');
const headerMenu = $('.js-header__menu');

function handleBurgerClick(){
  burgerBtn.toggleClass('header__burger--open');
  burgerBtn.children().toggleClass('header__burger-line--open');
  headerMenu.toggleClass('header__menu--open');
  $('html').toggleClass('page--menu-open');
}

burgerBtn.on('click', handleBurgerClick)
