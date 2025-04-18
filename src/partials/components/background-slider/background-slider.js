export default class BackgroundSlider {
  constructor() {
    this.$slider = $(".background-slider");
    if (this.$slider[0]) {
      this.typeSlider = this.$slider.attr("data-background-slider-type");
      this.numberImage = this.getNumberImage();

      this.createSlider();
    }
  }

  images = {
    "user-registration": ["/assets/slide-1.jpg", "/assets/slide-2.jpg"],
    index: [
      "./assets/main-slider-1.jpg",
      "./assets/main-slider-2.jpg",
      "./assets/main-slider-3.jpg",
    ],
  };

  createSlider() {
    this.$slider.css(
      "background-image",
      `url('${this.images[this.typeSlider][this.numberImage]}')`,
    );

    this.start();
  }

  start() {
    setInterval(() => {
      this.animation();
    }, 4000);
  }

  animation = () => {
    this.$slider.css(
      "background-image",
      `url('${this.images[this.typeSlider][this.getNumberImage()]}')`,
    );
  };

  getNumberImage = () => {
    return Math.floor(Math.random() * this.images[this.typeSlider].length);
  };
}

new BackgroundSlider();
