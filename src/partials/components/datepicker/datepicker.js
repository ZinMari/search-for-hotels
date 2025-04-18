import AirDatepicker from "air-datepicker";

class Datepicker {
  constructor($calendarInput) {
    this.$calendarInput = $calendarInput;
    this.$showCalendarBtns = $("button[data-identifier]");
    this.calendarObjects = [];

    this._render();
  }

  _handleApplyBtn = (datepicker) => {
    if (datepicker.selectedDates.length) {
      const identifierCalendar = datepicker.$el.dataset.identifier;
      const templateDate = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
      const startDate = datepicker.selectedDates[0].toLocaleString(
        "ru",
        templateDate,
      );
      const endDate = datepicker.selectedDates[1].toLocaleString(
        "ru",
        templateDate,
      );

      const $showDateBtns = $(`button[data-identifier=${identifierCalendar}]`);

      $showDateBtns.each(function () {
        if (this.dataset.value === "start") {
          this.firstElementChild.textContent = startDate;
        } else {
          if (datepicker.selectedDates[1]) {
            this.firstElementChild.textContent = endDate;
          }
        }
      });
    }
  };

  _handleClearBtn = (datepicker) => {
    const identifierCalendar = datepicker.$el.dataset.identifier;
    const $showDateBtns = $(
      `button[data-identifier=${identifierCalendar}] span`,
    );
    datepicker.clear();
    $showDateBtns.text("ДД.ММ.ГГГГ");
  };

  _handleShowCalendarBtnClick = (e) => {
    e.preventDefault();
    const currentBtn = e.currentTarget;

    this.calendarObjects.forEach((calendar) => {
      if (calendar) {
        if (calendar.$el.classList.contains(currentBtn.dataset.identifier)) {
          if (calendar.visible) {
            calendar.hide();
          } else {
            calendar.show();
          }
        }
      }
    });
  };

  _applyBtn = {
    content: "Применить",
    className: "applyBtn .date-dropdown__action-btn",
    onClick: this._handleApplyBtn,
  };

  _clearBtn = {
    content: "Очистить",
    className: "clearBtn",
    onClick: this._handleClearBtn,
  };

  _commonCalendarOptions = {
    range: true,
    nextHtml: "",
    prevHtml: "",
    navTitles: {
      days: "MMMM yyyy",
    },
    showOtherMonths: false,
    onRenderCell({ date, cellType }) {
      if (cellType === "day") {
        return {
          html: `<span>${date.getDate()}</span>`,
        };
      }
    },
  };

  _defineCalendarOptions(typeCalendar) {
    const staticCalendarOptions = {
      inline: true,
      buttons: [this._clearBtn, this._applyBtn],
    };

    const dropdownCalendarOptions = {
      buttons: [this._clearBtn, this._applyBtn],
      classes: "date-calendar__dropdown",
    };

    const filterCalendarOptions = {
      classes: "date-calendar__filter",
      multipleDatesSeparator: " - ",
      altFieldDateFormat: "dd MMM",
      altField: document.querySelector(".filter-date-dropdown__input"),
    };

    let calendarOptions;

    if (typeCalendar === "dropdown") {
      calendarOptions = Object.assign(
        {},
        this._commonCalendarOptions,
        dropdownCalendarOptions,
      );
    } else if (typeCalendar === "filter") {
      calendarOptions = Object.assign(
        {},
        this._commonCalendarOptions,
        filterCalendarOptions,
      );
    } else if (typeCalendar === "static") {
      calendarOptions = Object.assign(
        {},
        this._commonCalendarOptions,
        staticCalendarOptions,
      );
    }

    return calendarOptions;
  }

  _init() {
    const calendarElement = new AirDatepicker(
      this.$calendarInput[0],
      this._defineCalendarOptions(this.$calendarInput[0].dataset.typecalendar),
    );
    this.calendarObjects.push(calendarElement);
  }

  _render() {
    this._init();

    this.$showCalendarBtns.on(
      "click.datepicker",
      this._handleShowCalendarBtnClick,
    );
  }
}

export default Datepicker;
