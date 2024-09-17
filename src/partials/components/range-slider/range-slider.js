$( '.range-slider__slider' ).slider({
  animate: true,
  range: true,
  min: 0,
  max: 15000,
  values: ['5000', '10000'],
  slide: function(event, ui) {
    $('#min').val(ui.values[0]);
    $('#max').val(ui.values[1]);
  }
});
