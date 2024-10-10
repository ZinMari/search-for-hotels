import AirDatepicker from 'air-datepicker';

const calendarInputs = document.querySelectorAll('.date-calendar');
const activateCalendarBtns = document.querySelectorAll('button[data-identifier]');

const applyBtn = {
  content: 'Применить',
  className: 'applyBtn .date-dropdown__action-btn',
  onClick: (dp) => {
    if(dp.selectedDates.length) {
      const identifierCalendar = dp.$el.dataset.identifier;
      const templateDate = {day: '2-digit', month: '2-digit', year: 'numeric'};
      const startDate = dp.selectedDates[0].toLocaleString('ru', templateDate);
      const endDate = dp.selectedDates[1].toLocaleString('ru', templateDate);

      const showDateBtns = document.querySelectorAll(`button[data-identifier=${identifierCalendar}]`)
      showDateBtns.forEach(btn=>{
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
    const identifierCalendar = dp.$el.dataset.identifier;
    const showDateBtns = document.querySelectorAll(`button[data-identifier=${identifierCalendar}]`)
    dp.clear();

    showDateBtns.forEach(btn => {
      btn.firstElementChild.textContent = 'ДД.ММ.ГГГГ'
    })
  }
}

const commonCalendarOptions = {
  range: true,
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
};

const staticCalendarOptions = {
  inline: true,
  buttons: [clearBtn, applyBtn],
}

const dropdownCalendarOptions = {
  buttons: [clearBtn, applyBtn],
  classes: 'date-calendar__dropdown',
}

const filterCalendarOptions = {
  classes: 'date-calendar__filter',
  multipleDatesSeparator: ' - ',
  altFieldDateFormat: 'dd MMM',
  altField: document.querySelector('.filter-date-dropdown__input'),
}

//проинициализируем календари и соберем их в массив
const calendarObjects = [];

calendarInputs.forEach(calendar=> {
  let options;
  const typeCalendar = calendar.dataset.typecalendar;

  if(typeCalendar === 'dropdown'){
    options = Object.assign({}, commonCalendarOptions, dropdownCalendarOptions)
  } else if (typeCalendar === 'filter') {
    options = Object.assign({}, commonCalendarOptions, filterCalendarOptions)
  } else if (typeCalendar === 'static') {
    options = Object.assign({}, commonCalendarOptions, staticCalendarOptions)
  }
  const calendarElement = new AirDatepicker(calendar, options);
  calendarObjects.push(calendarElement)
})


//по клику на кнопку открывается соответсвующий календарь
function showCalendar() {
  for(let calendar of calendarObjects) {
    if(calendar) {
      if(calendar.$el.classList.contains(this.dataset.identifier)){
        if(calendar.visible){
          calendar.hide();
        } else {
          calendar.show();
        }
      }
    }
  }
}

activateCalendarBtns.forEach(btn => {
  btn.addEventListener('click', showCalendar)
})




