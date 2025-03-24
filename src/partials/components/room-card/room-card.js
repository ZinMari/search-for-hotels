import Glide from '@glidejs/glide'

const glides = $('.js-glide');

glides.each(function(){
  new Glide(this).mount();
})

