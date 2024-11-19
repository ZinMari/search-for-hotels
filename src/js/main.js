import $ from 'jquery';

import './_jquery-libraries.js';
import './_components.js';



(function backgroundSlider(){
  const indexPageSection = document.querySelector('.start');
  const registrationPageSection = document.querySelector('.user-registration');
  const signInPageSection = document.querySelector('.user-login');

  const sliderIndex = ['./img/index-background/main-slider-1.jpg', './img/index-background/main-slider-2.jpg', './img/index-background/main-slider-3.jpg'];
  const sliderRegistrationSignIn = ['./img/registration-sign-in-background/slide-1.jpg', './img/registration-sign-in-background/slide-2.jpg'];



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
