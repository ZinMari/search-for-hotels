import AirDatepicker from 'air-datepicker';

const calendarInputs = $('.js-date-calendar');
const activateCalendarBtns = $('button[data-identifier]');

const handleApplyBtn = (datepicker) => {
  if(datepicker.selectedDates.length) {
    const identifierCalendar = datepicker.$el.dataset.identifier;
    const templateDate = {day: '2-digit', month: '2-digit', year: 'numeric'};
    const startDate = datepicker.selectedDates[0].toLocaleString('ru', templateDate);
    const endDate = datepicker.selectedDates[1].toLocaleString('ru', templateDate);

    const showDateBtns = $(`button[data-identifier=${identifierCalendar}]`)

    showDateBtns.each(function(){
      if(this.dataset.value === "start") {
        this.firstElementChild.textContent = startDate;
      } else {
        if(datepicker.selectedDates[1]) {
          this.firstElementChild.textContent = endDate;
        }
      }
    })
  }
}

const handleClearBtn = (datepicker) => {
  const identifierCalendar = datepicker.$el.dataset.identifier;
  const showDateBtns = $(`button[data-identifier=${identifierCalendar}] span`)
  datepicker.clear();
  showDateBtns.text('ДД.ММ.ГГГГ');
}

const applyBtn = {
  content: 'Применить',
  className: 'applyBtn .date-dropdown__action-btn',
  onClick: handleApplyBtn
}

const clearBtn = {
  content: 'Очистить',
  className: 'clearBtn',
  onClick: handleClearBtn
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

  let calendarOptions;

  if(typeCalendar === 'dropdown'){
    calendarOptions = Object.assign({}, commonCalendarOptions, dropdownCalendarOptions)
  } else if (typeCalendar === 'filter') {
    calendarOptions = Object.assign({}, commonCalendarOptions, filterCalendarOptions)
  } else if (typeCalendar === 'static') {
    calendarOptions = Object.assign({}, commonCalendarOptions, staticCalendarOptions)
  }

  return calendarOptions;
}

const calendarObjects = [];

calendarInputs.each(function(){
  const calendarElement = new AirDatepicker(this, defineCalendarOptions(this.dataset.typecalendar));
  calendarObjects.push(calendarElement)
})

function showCalendar(e) {
  e.preventDefault();
  calendarObjects.forEach(calendar=>{
    if(calendar) {
      if(calendar.$el.classList.contains(this.dataset.identifier)){
        if(calendar.visible){
          calendar.hide();
        } else {
          calendar.show();
        }
      }
    }
  })
}

activateCalendarBtns.on('click', showCalendar);
