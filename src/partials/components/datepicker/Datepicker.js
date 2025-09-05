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
    const params = {
      static: {
        inline: true,
        buttons: [this._clearBtn, this._applyBtn],
      },
      dropdown: {
        buttons: [this._clearBtn, this._applyBtn],
        classes: "date-calendar__dropdown",
      },
      filter: {
        classes: "date-calendar__filter",
        multipleDatesSeparator: " - ",
        altFieldDateFormat: "dd MMM",
        altField: document.querySelector(".datepicker__filter-input"),
      },
    };

    let calendarOptions = Object.assign(
      {},
      this._commonCalendarOptions,
      params[typeCalendar],
    );

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
