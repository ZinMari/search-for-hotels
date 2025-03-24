import AirDatepicker from 'air-datepicker';

const calendarInputs = $('.date-calendar');
const activateCalendarBtns = $('button[data-identifier]');

const applyBtn = {
  content: 'Применить',
  className: 'applyBtn .date-dropdown__action-btn',
  onClick: (dp) => {
    if(dp.selectedDates.length) {
      const identifierCalendar = dp.$el.dataset.identifier;
      const templateDate = {day: '2-digit', month: '2-digit', year: 'numeric'};
      const startDate = dp.selectedDates[0].toLocaleString('ru', templateDate);
      const endDate = dp.selectedDates[1].toLocaleString('ru', templateDate);

      const showDateBtns = $(`button[data-identifier=${identifierCalendar}]`)

      showDateBtns.each(function(){
        if(this.dataset.value === "start") {
          this.firstElementChild.textContent = startDate;
        } else {
          if(dp.selectedDates[1]) {
            this.firstElementChild.textContent = endDate;
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
    const showDateBtns = $(`button[data-identifier=${identifierCalendar}] span`)
    dp.clear();
    showDateBtns.text('ДД.ММ.ГГГГ');
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

function defineCalendarOptions(typeCalendar){
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

  let options;

  if(typeCalendar === 'dropdown'){
    options = Object.assign({}, commonCalendarOptions, dropdownCalendarOptions)
  } else if (typeCalendar === 'filter') {
    options = Object.assign({}, commonCalendarOptions, filterCalendarOptions)
  } else if (typeCalendar === 'static') {
    options = Object.assign({}, commonCalendarOptions, staticCalendarOptions)
  }

  return options;
}

const calendarObjects = [];

calendarInputs.each(function(){
  const calendarElement = new AirDatepicker(this, defineCalendarOptions(this.dataset.typecalendar));
  calendarObjects.push(calendarElement)
})

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

activateCalendarBtns.on('click', showCalendar);
