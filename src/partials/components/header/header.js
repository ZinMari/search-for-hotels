const burgerBtn = $('.header__burger');
const headerMenu = $('.header__menu');

burgerBtn.on('click', function(){
  burgerBtn.toggleClass('header__burger--open');
  burgerBtn.children().toggleClass('header__burger-line--open');
  headerMenu.toggleClass('header__menu--open');
  $('html').toggleClass('page--menu-open');
})
