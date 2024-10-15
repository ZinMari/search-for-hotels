import Glide from '@glidejs/glide'

const glides = $('.glide');

glides.each(function(){
  new Glide(this).mount();
})

