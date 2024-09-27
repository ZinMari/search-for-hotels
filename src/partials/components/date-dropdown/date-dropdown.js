import AirDatepicker from 'air-datepicker';

const dateBtns = document.querySelectorAll('.date-dropdown__btn');
const calendarInput = document.querySelector('.date-dropdown__calendar');

const applyBtn = {
  content: 'Применить',
  className: 'applyBtn .date-dropdown__action-btn',
  onClick: (dp) => {
    if(dp.selectedDates.length) {
      dateBtns.forEach(btn => {
        const templateDate = {day: '2-digit', month: '2-digit', year: 'numeric'};

        const startDate = dp.selectedDates[0].toLocaleString('ru', templateDate);
        const endDate = dp.selectedDates[1].toLocaleString('ru', templateDate);

        if(btn.dataset.value === "start") {
          btn.firstElementChild.textContent = startDate;
        } else {
          if(dp.selectedDates[1]) {
            btn.firstElementChild.textContent = endDate;
          }
        }
      })
    }
  }
}

const clearBtn = {
  content: 'Очистить',
  className: 'clearBtn',
  onClick: (dp) => {
    dp.clear();
    dateBtns.forEach(btn => {
      btn.firstElementChild.textContent = 'ДД.ММ.ГГГГ'
    })
  }
}

const calendarOptions = {
  range: true,
  buttons: [clearBtn, applyBtn],
  nextHtml: '',
  prevHtml: '',
  navTitles: {
    days: 'MMMM yyyy'
  },
  showOtherMonths: false,
  onRenderCell({date, cellType}) {
    if (cellType === 'day') {
      return {
        html: `<span>${date.getDate()}</span>`
      }
    }
  },
  // minDate: new Date(),
  classes: 'date-dropdown__datepicker',
};

const calendarElement = new AirDatepicker(calendarInput, calendarOptions);

function showCalendar() {
  if(calendarElement.visible){
    calendarElement.hide();
  } else {
    calendarElement.show();
  }
}

dateBtns.forEach(btn => {
  btn.addEventListener('click', showCalendar)
})
