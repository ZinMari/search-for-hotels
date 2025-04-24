class Pagination {
  constructor(pagination) {
    this.paginationPanel = pagination;

    this._render();
  }

  _init() {
    this.roomCards = [...document.querySelectorAll(".js-search-room__room")];
    this.roomCardsContainer = document.querySelector(
      ".js-search-room__rooms-elements",
    );

    if (!this.roomCards.length) {
      return;
    }

    this.paginationNumList = this.paginationPanel.querySelector(
      ".js-pagination__numbers",
    );
    this.startArrowBtn = this.paginationPanel.querySelector(
      ".js-pagination__btn_type_left",
    );
    this.endArrowBtn = this.paginationPanel.querySelector(
      ".js-pagination__btn_type_right",
    );
    this.paginationInfo = this.paginationPanel.querySelector(
      ".js-pagination__info span",
    );
    this.cardsCount = 12;
    this.nuberLastPage = Math.ceil(this.roomCards.length / this.cardsCount);
    this.currentPage = 1;
  }

  _sliceCards(cardsCount, currentPage) {
    this.roomCardsContainer.innerHTML = "";
    const firstCardsIndex = cardsCount * currentPage - cardsCount;
    const lastCardsIndex = firstCardsIndex + cardsCount;
    const cardsOnPage = this.roomCards.slice(firstCardsIndex, lastCardsIndex);
    this.paginationInfo.textContent = `${firstCardsIndex + 1} - ${lastCardsIndex} `;

    return cardsOnPage;
  }

  _createBtnPagination(currentPage) {
    const startBtn = currentPage == 1 ? 1 : currentPage - 1;

    this.paginationNumList.innerHTML = "";

    for (let i = startBtn; i < startBtn + 3 && i <= this.nuberLastPage; i++) {
      let li = document.createElement("li");
      li.classList.add(
        "pagination__num-element",
        "pagination__num-element_type_number",
      );
      li.textContent = i;
      if (i == currentPage) {
        li.classList.add("pagination__num-element_activated");
      }
      this.paginationNumList.append(li);
    }

    this._createEllipses(startBtn, this.nuberLastPage);
    this._showArrowBtns(currentPage, this.nuberLastPage);
    this._showlinkOnFirstPage(currentPage);
    this._showlinkOnLastPage(currentPage, this.nuberLastPage);
  }

  _showlinkOnFirstPage(currentPage) {
    if (currentPage > 2) {
      let li = document.createElement("li");
      li.classList.add(
        "pagination__num-element",
        "pagination__num-element_type_number",
      );
      li.textContent = 1;
      this.paginationNumList.prepend(li);
    }
  }

  _showlinkOnLastPage(currentPage, nuberLastPage) {
    if (currentPage < nuberLastPage - 1) {
      let li = document.createElement("li");
      li.classList.add(
        "pagination__num-element",
        "pagination__num-element_type_number",
      );
      li.textContent = nuberLastPage;
      this.paginationNumList.append(li);
    }
  }

  _showArrowBtns(currentPage, nuberLastPage) {
    this.startArrowBtn.hidden = currentPage == 1;
    this.endArrowBtn.hidden = currentPage == nuberLastPage;
  }

  _createEllipses(startBtn, nuberLastPage) {
    const ellipses = document.createElement("li");
    ellipses.classList.add(
      "pagination__num-element",
      "pagination__num-element_type_ellipses",
    );
    ellipses.textContent = "...";

    if (startBtn != 1) {
      this.paginationNumList.insertAdjacentElement("afterbegin", ellipses);
    }
    if (this.currentPage < nuberLastPage - 1) {
      this.paginationNumList.insertAdjacentElement(
        "beforeend",
        ellipses.cloneNode(true),
      );
    }
  }

  _createPagination(cardsCount, currentPage) {
    this.roomCardsContainer.append(
      ...this._sliceCards(cardsCount, currentPage),
    );
    this._createBtnPagination(currentPage);
  }

  _handlerPaginationNumListClick = (e) => {
    const btn = e.target;

    if (!btn.closest(".pagination__num-element_type_number")) {
      return;
    }
    this.currentPage = btn.textContent;

    this._createPagination(this.cardsCount, this.currentPage);
  };

  _handlerStartArrowBtnClick = () => {
    this._createPagination(this.cardsCount, --this.currentPage);
  };

  _handlerendArrowBtnClick = () => {
    this._createPagination(this.cardsCount, ++this.currentPage);
  };

  _render() {
    this._init();

    if (!this.roomCards.length) {
      return;
    }

    this.paginationNumList.addEventListener(
      "click",
      this._handlerPaginationNumListClick,
    );

    this.startArrowBtn.addEventListener(
      "click",
      this._handlerStartArrowBtnClick,
    );

    this._createPagination(this.cardsCount, this.currentPage);
  }
}

export default Pagination;
