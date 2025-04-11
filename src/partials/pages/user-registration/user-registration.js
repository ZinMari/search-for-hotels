import BackgroundSlider from "../../components/background-slider/background-slider";

const ImagesArr = ["./assets/slide-1.jpg", "./assets/slide-2.jpg"];
const targetElement = document.querySelector(".user-registration");

targetElement && new BackgroundSlider(targetElement, ImagesArr).start();
