function updateInputs (data) {
  $('.js-range-slider__values').html(`${data.from}₽ - ${data.to}₽`)
}

$(".js-range-slider__slider").ionRangeSlider({
  type: "double",
  hide_min_max: true,
  hide_from_to: true,
  onStart: updateInputs,
  onChange: updateInputs,
});
