import dictionary from "../../../data/lang.json";

class Dropdown {
  constructor(dropdownElement) {
    this.$dropdown = dropdownElement;
    this.dropdownType = this.$dropdown.attr("data-type");

    this._createItems();

    this.$dropdownOpenBtn = this.$dropdown.find(".js-dropdown__btn");
    this.$dropdownInputs = this.$dropdown.find(".js-dropdown__input");
    this.$dropClearBtn = this.$dropdown.find(".js-dropdown__clear-btn");
    this.$labels = this.$dropdown.find(".js-dropdown__label");

    this.$dropClearBtn.on("click.dropdown", this._handelDropClearBtnClick);
    this.$dropdownOpenBtn.on(
      "click.dropdown",
      this._handleDropdownOpenBtnClick,
    );
    this._initNiceNumber();
    this._setButtonClear();
    this._setAvailableInputs();
    this._setTitle(this._getData());
  }

  _createItems() {
    const list = this.$dropdown.find(".js-dropdown__list");
    const values = JSON.parse(this.$dropdown.attr("data-values"));

    for (let element in dictionary["ru"][this.dropdownType]) {
      const index = Object.keys(dictionary["ru"][this.dropdownType]).indexOf(
        element,
      );

      $("<li>")
        .addClass("dropdown__item")
        .append(
          $("<label>")
            .addClass("dropdown__label js-dropdown__label")
            .append(
              $("<span>").addClass("dropdown__label-title").text(element),
              $("<input>")
                .attr({ type: "number", min: 0, max: 5, value: values[index] })
                .addClass("dropdown__input js-dropdown__input"),
            ),
        )
        .appendTo(list);
    }
  }

  _handelDropClearBtnClick = (e) => {
    e.preventDefault();

    this.$dropdownInputs.each((index, input) => {
      $(input).val("0");
      $(input).prev().addClass("nice-number__button_disabled");
    });

    this.$dropdownOpenBtn.html("Выберете количество");
    this.$dropClearBtn.addClass("dropdown__clear-btn_hidden");
  };

  _handleDropdownOpenBtnClick = (e) => {
    e.preventDefault();
    e.currentTarget.closest(".js-dropdown").classList.toggle("dropdown_opened");
  };

  _initNiceNumber() {
    this.$dropdownInputs.niceNumber({
      autoSize: false,
      onIncrement: (currentInput, amount) => {
        currentInput.prev().removeClass("nice-number__button_disabled");

        if (amount == currentInput.attr("max")) {
          currentInput.next().addClass("nice-number__button_disabled");
        }
        this._setTitle(this._getData());
        this._setButtonClear();
      },

      onDecrement: (currentInput, amount) => {
        currentInput.next().removeClass("nice-number__button_disabled");
        if (amount == currentInput.attr("min")) {
          currentInput.prev().addClass("nice-number__button_disabled");
        }

        this._setTitle(this._getData());
        this._setButtonClear();
      },
    });
  }

  _setAvailableInputs() {
    this.$dropdownInputs.each(function () {
      const currentInput = $(this);
      const currentValue = currentInput.attr("value");

      if (currentValue == currentInput.attr("min")) {
        currentInput.prev().addClass("nice-number__button_disabled");
      }

      if (currentValue == currentInput.attr("max")) {
        currentInput.next().addClass("nice-number__button_disabled");
      }
    });
  }

  _setTitle(values) {
    let text = [];
    $.each(values, (key, value) => {
      if (+value !== 0) {
        const declension = this._definitionOfDeclension(value);
        text.push(
          `${value} ${dictionary.ru[this.dropdownType][key][declension]}`,
        );
      }
    });

    this.$dropdownOpenBtn.html(
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

  _setButtonClear() {
    const isShowBtnClear = this._isEmptyValues();
    if (isShowBtnClear) {
      this.$dropClearBtn.addClass("dropdown__clear-btn_hidden");
    } else {
      this.$dropClearBtn.removeClass("dropdown__clear-btn_hidden");
    }
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
}

export default Dropdown;
