import BackgroundSlider from "../../components/background-slider/background-slider";

const ImagesArr = [
  "./assets/main-slider-1.jpg",
  "./assets/main-slider-2.jpg",
  "./assets/main-slider-3.jpg",
];
const targetElement = document.querySelector(".start");

targetElement && new BackgroundSlider(targetElement, ImagesArr).start();
