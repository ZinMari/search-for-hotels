import Glide from '@glidejs/glide'


const slider = new Glide('.background-slider',{
  type: 'carousel',
  gap: 0,
  autoplay: 10000,
  animationTimingFunc: 'ease',
  touchAngle: 0,
  animationDuration: 3000,
  hoverpause: false,
}).mount();
