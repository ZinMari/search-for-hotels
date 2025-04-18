class Dropdown {
  constructor(dropdownElement) {
    this.$dropdown = dropdownElement;

    this._render();
  }

  _init() {
    this.$dropdownOpenBtn = this.$dropdown.find(".js-dropdown__btn");
    this.$dropdownInputs = this.$dropdown.find(".js-dropdown__input");
    this.$dropClearBtn = this.$dropdown.find(".dropdown__clear button");
    this.$dropClearBtnText = this.$dropdown.find(".dropdown__clear span");
    this.$labels = this.$dropdown.find(".dropdown__label");
    this.$title = this.$dropdown.find(".js-dropdown__btn span");
  }

  _handelDropClearBtnClick = (e) => {
    e.preventDefault();

    this.$dropdownInputs.each((index, input) => {
      $(input).val("0");
      $(input).prev().addClass("nice-number__button_disabed");
    });

    this.$title.text("Выберете количество");

    $("span", this.$dropClearBtn).attr("hidden", true);
  };

  _handleDropdownOpenBtnClick = (e) => {
    e.preventDefault();
    e.currentTarget.closest(".js-dropdown").classList.toggle("dropdown_opened");
  };

  _initNiceNumber() {
    this.$dropdownInputs.niceNumber({
      autoSize: false,
      onIncrement: (currentInput, amount) => {
        currentInput.prev().removeClass("nice-number__button_disabed");

        if (amount == currentInput.attr("max")) {
          currentInput.next().addClass("nice-number__button_disabed");
        }
        this._setTitle(this._getData());
        this._setButtonClear();
      },

      onDecrement: (currentInput, amount) => {
        currentInput.next().removeClass("nice-number__button_disabed");
        if (amount == currentInput.attr("min")) {
          currentInput.prev().addClass("nice-number__button_disabed");
        }

        this._setTitle(this._getData());
        this._setButtonClear();
      },
    });
  }

  _setAvaibleInputs() {
    this.$dropdownInputs.each(function () {
      const currentInput = $(this);
      const currentValue = currentInput.attr("value");

      if (currentValue == currentInput.attr("min")) {
        currentInput.prev().addClass("nice-number__button_disabed");
      }

      if (currentValue == currentInput.attr("max")) {
        currentInput.next().addClass("nice-number__button_disabed");
      }
    });
  }

  _setTitle(values) {
    let text = [];
    $.each(values, (key, value) => {
      if (+value !== 0) {
        const declension = this._definitionOfDeclension(value);
        text.push(`${value} ${this._dictionary[key][declension]}`);
      }
    });

    this.$title.text(
      text.length === 0 ? "Выберете количество" : text.join(", "),
    );
  }

  _definitionOfDeclension(count) {
    let declension;
    if (count == 1) {
      declension = 0;
    } else if (count >= 2 && count <= 4) {
      declension = 1;
    } else if (count == 0 || count >= 4) {
      declension = 2;
    }
    return declension;
  }

  _dictionary = {
    спальни: ["спальня", "спальни", "спален"],
    кровати: ["кровать", "кровати", "кроватей"],
    "ванные комнаты": ["ванная комната", "ванные комнаты", "ванных комнат"],
    взрослые: ["гость", "гостя", "гостей"],
    младенцы: ["младенец", "младенца", "младенцев"],
  };

  _setButtonClear() {
    const isShowBtnClear = this._isEmptyValues();
    this.$dropClearBtnText.attr("hidden", isShowBtnClear);
  }

  _getData() {
    const values = {};
    this.$labels.each(function (index, elem) {
      const elemText = $("span", elem).text();

      if (elemText === "дети" || elemText === "взрослые") {
        values["взрослые"] =
          "взрослые" in values
            ? Number(values["взрослые"]) +
              Number($(".js-dropdown__input", elem).val())
            : Number($(".js-dropdown__input", elem).val());
      } else {
        values[elemText] = $(".js-dropdown__input", elem).val();
      }
    });

    return values;
  }

  _isEmptyValues() {
    const sum = Object.values(this._getData()).reduce(
      (a, b) => Number(a) + Number(b),
      0,
    );
    return sum === 0;
  }

  _render() {
    this._init();

    this.$dropClearBtn.on("click.dropdown", this._handelDropClearBtnClick);
    this.$dropdownOpenBtn.on(
      "click.dropdown",
      this._handleDropdownOpenBtnClick,
    );
    this._initNiceNumber();
    this._setButtonClear();
    this._setAvaibleInputs();
    this._setTitle(this._getData());
  }
}

export default Dropdown;
