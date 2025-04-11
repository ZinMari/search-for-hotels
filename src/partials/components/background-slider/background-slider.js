export default class Backgroundparent {
  constructor(targetElement, images) {
    this.$parent = $(targetElement);
    this.images = images;
    this.numberImage = this.getNumberImage();

    this.createSlider();
  }
  createSlider() {
    this.$slider = $("<div>", { class: "bg-slider", opacity: 0 });

    this.$parent.addClass("parent__postion");
    this.$parent.prepend(this.$slider);

    this.$slider.css(
      "background-image",
      `url('${this.images[this.numberImage]}')`,
    );
  }

  start() {
    setInterval(() => {
      this.animation();
    }, 4000);
  }

  animation = () => {
    this.$slider.css(
      "background-image",
      `url('${this.images[this.getNumberImage()]}')`,
    );
  };

  getNumberImage = () => {
    return Math.floor(Math.random() * this.images.length);
  };
}
