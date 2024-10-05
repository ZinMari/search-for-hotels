const dropBtns = document.querySelectorAll('.dropdown__btn');
const dropInputs = document.querySelectorAll('.dropdown__input');

const dictionary = [
  ['спальня', 'спальни', 'спален'],
  ['кровать', 'кровати', 'кроватей'],
  ['ванная комната', 'ванные комнаты', 'ванных комнат'],
  ['гость', 'гостя', 'гостей'],
  ['младенец', 'младенца', 'младенцев'],
]



dropBtns.forEach(dropBtn => {
  dropBtn.addEventListener('click', function(){
    this.ariaExpanded = this.ariaExpanded === 'false' ? true : false;
    this.closest('.dropdown').classList.toggle('dropdown--open');
  })
})

function setTitle(currentInput){
  const parent = currentInput.closest('.dropdown');
  const title = $('.dropdown__btn span', parent).text();
  const labels = parent.find('.dropdown__label');

  console.log(currentInput.closest('.dropdown__label').find('span').text());
}

$('.dropdown__input').niceNumber({
  autoSize: false,
  onIncrement: function (currentInput, amount) {
    currentInput.prev().removeClass('nice-number__button--disabed')

    if (amount == currentInput.attr('max')) {
      currentInput.next().addClass('nice-number__button--disabed')
    }

    setTitle(currentInput)
  },
  onDecrement: function (currentInput, amount) {
    currentInput.next().removeClass('nice-number__button--disabed')
    if (amount == currentInput.attr('min')) {
      currentInput.prev().addClass('nice-number__button--disabed')
    }
    setTitle(currentInput)
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
