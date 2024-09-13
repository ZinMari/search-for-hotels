const dropBtns = document.querySelectorAll('.dropdown__btn');
const dropInputs = document.querySelectorAll('.dropdown__input');


dropBtns.forEach(dropBtn => {
  dropBtn.addEventListener('click', function(){
    this.ariaExpanded = this.ariaExpanded === 'false' ? true : false;
    this.closest('.dropdown').classList.toggle('dropdown--open');
  })
})

$('.dropdown__input').niceNumber({
  autoSize: false,
  onIncrement: function (currentInput, amount) {
    currentInput.prev().removeClass('nice-number__button--disabed')
    if (amount == currentInput.attr('max')) {
      currentInput.next().addClass('nice-number__button--disabed')
    }
  },
  onDecrement: function (currentInput, amount) {
    currentInput.next().removeClass('nice-number__button--disabed')
    if (amount == currentInput.attr('min')) {
      currentInput.prev().addClass('nice-number__button--disabed')
    }
  },
});

dropInputs.forEach(dropInput => {
  switch (dropInput.value) {
    case dropInput.min:
      dropInput.previousElementSibling.classList.add('nice-number__button--disabed')
      break;
    case dropInput.max:
      dropInput.nextElementSibling.classList.add('nice-number__button--disabed')
      break;
  }
})
