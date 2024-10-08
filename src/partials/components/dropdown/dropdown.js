const dropBtns = document.querySelectorAll('.dropdown__btn');
const dropInputs = document.querySelectorAll('.dropdown__input');
const dropdowns = $('.dropdown');
const dropClearBtns = $('.dropdown__clear button');


dropClearBtns.each(function(index, btn){
  btn.addEventListener('click', resetValues)
})


function resetValues(){
  const parent = this.closest('.dropdown');
  const inputs = $('.dropdown__input', parent);
  const title = $('.dropdown__btn span', parent);

  inputs.each((index, input)=>{
    $(input).val('0');
    $(input).prev().addClass('nice-number__button--disabed');
  })

  title.text('Выберете количество');
  $('span', this).attr('hidden', true);
}


dropdowns.each(function(index, dropdown){
  setButtonClear(dropdown)
})

function isEmptyValues(dropdown) {
  const sum = Object.values(getData(dropdown)).reduce((a,b)=> Number(a) +  Number(b), 0);
  return sum === 0;
}

const dictionary = {
  'спальни': ['спальня', 'спальни', 'спален'],
  'кровати': ['кровать', 'кровати', 'кроватей'],
  'ванные комнаты': ['ванная комната', 'ванные комнаты', 'ванных комнат'],
  'взрослые': ['гость', 'гостя', 'гостей'],
  'младенцы': ['младенец', 'младенца', 'младенцев'],
}

function definitionOfDeclension(count){
  let declension;

  if(count == 1) {
    declension = 0;
  } else if(count >= 2 && count <= 4) {
    declension = 1;
  } else if(count == 0 || count >= 4) {
    declension = 2;
  }

  return declension;
}

dropBtns.forEach(dropBtn => {
  dropBtn.addEventListener('click', function(){
    this.ariaExpanded = this.ariaExpanded === 'false' ? true : false;
    this.closest('.dropdown').classList.toggle('dropdown--open');
  })
})

function setButtonClear(currentInput){
  const parent = currentInput.closest('.dropdown');
  const buttonClear = $('.dropdown__clear button span', parent);

  if(isEmptyValues(currentInput)) {
    buttonClear.attr('hidden', true)
  } else {
    buttonClear.attr('hidden', false)
  }
}

function getData(currentInput){
  const parent = currentInput.closest('.dropdown');
  const labels = $('.dropdown__label', parent);
  const values = {};

  labels.each(function(index, elem){
    const elemText = $('span', elem).text();

    if(elemText === 'дети' || elemText === 'взрослые'){
      values['взрослые'] =
      'взрослые' in values
      ? Number(values['взрослые']) + Number($('.dropdown__input', elem).val())
      : Number($('.dropdown__input', elem).val());
    } else {
      values[elemText] = $('.dropdown__input', elem).val();
    }
  });

  return values;
}

function setTitle(elem, values){
  const parent = elem.closest('.dropdown');
  const title = $('.dropdown__btn span', parent);
  let text = [];

  $.each(values, function(key, value){
      if(+value !== 0) {
        const declension = definitionOfDeclension(value);
        text.push(`${value} ${dictionary[key][declension]}`)
      }
  })

  title.text(text.length === 0 ? 'Выберете количество' : text.join(', '))
}

$('.dropdown__input').niceNumber({
  autoSize: false,
  onIncrement: function (currentInput, amount) {
    currentInput.prev().removeClass('nice-number__button--disabed')

    if (amount == currentInput.attr('max')) {
      currentInput.next().addClass('nice-number__button--disabed')
    }

    setTitle(currentInput, getData(currentInput));
    setButtonClear(currentInput)
  },

  onDecrement: function (currentInput, amount) {
    currentInput.next().removeClass('nice-number__button--disabed')
    if (amount == currentInput.attr('min')) {
      currentInput.prev().addClass('nice-number__button--disabed');
    }

    setTitle(currentInput, getData(currentInput));
    setButtonClear(currentInput)
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
