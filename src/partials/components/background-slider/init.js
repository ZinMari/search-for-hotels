import BackgroundSlider from "./BackgroundSlider";

new BackgroundSlider();

$.each($(".background-slider"), function () {
  new BackgroundSlider(this);
});
