import './_jquery-libraries.js';
import './_components.js';

import '../scss/main.scss'



(function backgroundSlider(){
  const indexPageSection = document.querySelector('.start');
  const registrationPageSection = document.querySelector('.user-registration');
  const signInPageSection = document.querySelector('.user-login');

  const sliderIndex = ['./assets/main-slider-1.jpg', './assets/main-slider-2.jpg', './assets/main-slider-3.jpg'];
  const sliderRegistrationSignIn = ['./assets/slide-1.jpg', './assets/slide-2.jpg'];



  function slider(elem, imagesArr) {
    let index = 0;

    setInterval(()=>{
      elem.style.backgroundImage = `url('${imagesArr[index]}')`;
      index++;
      if(index === imagesArr.length) index = 0;
    }, 5000)
  }

  if(indexPageSection)slider(indexPageSection, sliderIndex)
  if(registrationPageSection)slider(registrationPageSection, sliderRegistrationSignIn)
  if(signInPageSection)slider(signInPageSection, sliderIndex)
})()
