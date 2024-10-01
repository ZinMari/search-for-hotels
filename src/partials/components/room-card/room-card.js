import Glide from '@glidejs/glide'

const glides = document.querySelectorAll('.glide');

glides.forEach(elem => {
  new Glide(elem).mount();
})

