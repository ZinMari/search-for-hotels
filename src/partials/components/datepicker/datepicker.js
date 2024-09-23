
import AirDatepicker from 'air-datepicker';

const numericDateElems = document.querySelectorAll('.numeric');
const diapazonDateElems = document.querySelectorAll('.diapazon');
const staticDateElems = document.querySelectorAll('.static');

const diapazonDateOptions = {
  range: true,
  multipleDatesSeparator: ' - ',
  dateFormat: 'dd MMM',
}

const numericDateOptions = {
  dateFormat: 'dd.MM.yyyy'
}

const applyBtn = {
  content: 'Применить',
  className: 'applyBtn',
}
const clearBtn = {
  content: 'Очистить',
  className: 'clearBtn',
}

numericDateElems.forEach(num => {
  new AirDatepicker(`#${num.id}`, numericDateOptions);
})


diapazonDateElems.forEach(diap => {
  new AirDatepicker(`#${diap.id}`, diapazonDateOptions);
})

staticDateElems.forEach(diap => {
  new AirDatepicker(`#${diap.id}`, {
    range: true,
    buttons: [clearBtn, applyBtn],
    // prevHtml: 'prev',
    // nextHtml: 'next',
    navTitles: {
      days: 'MMMM yyyy'
    },
    fixedHeight: true,
    onRenderCell({date, cellType}) {
      if (cellType === 'day') {
        return {
          html: `<span>${date.getDate()}</span>`
        }
      }
    },
    minDate: new Date(),
  });
})
