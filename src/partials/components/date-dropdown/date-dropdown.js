import AirDatepicker from 'air-datepicker';

const dateBtns = document.querySelectorAll('.date-dropdown__btn');
const calendarInputs = document.querySelectorAll('.date-dropdown__calendar');

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
  classes: 'date-dropdown__datepicker',
};

const filterCalendarOptions = {
  multipleDatesSeparator: ' - ',
  dateFormat: 'dd MMM',
}

const calendars = [];

calendarInputs.forEach(calendar => {
  calendar.classList.add(calendar.dataset.identifier)
  const calendarElement = new AirDatepicker(calendar, commonCalendarOptions);
  calendars.push(calendarElement)
})


function showCalendar() {
  for(let calendar of calendars) {
    if(calendar.$el.classList.contains(this.dataset.identifier)){
      if(calendar.visible){
        calendar.hide();
      } else {
        calendar.show();
      }
    }
  }
}

dateBtns.forEach(btn => {
  btn.addEventListener('click', showCalendar)
})
