const paginate = () => {
  const roomCards = [...document.querySelectorAll(".js-search-room__room")];
  const roomCardsContainer = document.querySelector(
    ".js-search-room__rooms-elements",
  );

  if (!roomCards.length) {
    return;
  }

  const paginationPanel = document.querySelector(".js-pagination");
  const paginationNumList = paginationPanel.querySelector(
    ".js-pagination__numbers",
  );
  const startArrowBtn = paginationPanel.querySelector(
    ".js-pagination__btn_type_left",
  );
  const endArrowBtn = paginationPanel.querySelector(
    ".js-pagination__btn_type_right",
  );
  const paginationInfo = paginationPanel.querySelector(
    ".js-pagination__info span",
  );

  const cardsCount = 12;
  const nuberLastPage = Math.ceil(roomCards.length / cardsCount);
  let currentPage = 1;

  function sliceCards(cardsCount, currentPage) {
    roomCardsContainer.innerHTML = "";
    const firstCardsIndex = cardsCount * currentPage - cardsCount;
    const lastCardsIndex = firstCardsIndex + cardsCount;
    const cardsOnPage = roomCards.slice(firstCardsIndex, lastCardsIndex);
    paginationInfo.textContent = `${firstCardsIndex + 1} - ${lastCardsIndex} `;

    return cardsOnPage;
  }

  function createBtnPagination(currentPage) {
    const startBtn = currentPage == 1 ? 1 : currentPage - 1;

    paginationNumList.innerHTML = "";

    for (let i = startBtn; i < startBtn + 3 && i <= nuberLastPage; i++) {
      let li = document.createElement("li");
      li.classList.add(
        "pagination__num-element",
        "pagination__num-element_type_number",
      );
      li.textContent = i;
      if (i == currentPage) {
        li.classList.add("pagination__num-element_active");
      }
      paginationNumList.append(li);
    }

    createEllipses(startBtn, nuberLastPage);
    showArrowBtns(currentPage, nuberLastPage);
    showlinkOnFirstPage(currentPage);
    showlinkOnLastPage(currentPage, nuberLastPage);
  }

  function showlinkOnFirstPage(currentPage) {
    if (currentPage > 2) {
      let li = document.createElement("li");
      li.classList.add(
        "pagination__num-element",
        "pagination__num-element_type_number",
      );
      li.textContent = 1;
      paginationNumList.prepend(li);
    }
  }

  function showlinkOnLastPage(currentPage, nuberLastPage) {
    if (currentPage < nuberLastPage - 1) {
      let li = document.createElement("li");
      li.classList.add(
        "pagination__num-element",
        "pagination__num-element_type_number",
      );
      li.textContent = nuberLastPage;
      paginationNumList.append(li);
    }
  }

  function showArrowBtns(currentPage, nuberLastPage) {
    startArrowBtn.hidden = currentPage == 1;
    endArrowBtn.hidden = currentPage == nuberLastPage;
  }

  function createEllipses(startBtn, nuberLastPage) {
    const ellipses = document.createElement("li");
    ellipses.classList.add(
      "pagination__num-element",
      "pagination__num-element_type_ellipses",
    );
    ellipses.textContent = "...";

    if (startBtn != 1) {
      paginationNumList.insertAdjacentElement("afterbegin", ellipses);
    }
    if (currentPage < nuberLastPage - 1) {
      paginationNumList.insertAdjacentElement(
        "beforeend",
        ellipses.cloneNode(true),
      );
    }
  }

  function createPagination(cardsCount, currentPage) {
    roomCardsContainer.append(...sliceCards(cardsCount, currentPage));
    createBtnPagination(currentPage);
  }

  paginationNumList.addEventListener("click", (e) => {
    const btn = e.target;

    if (!btn.closest(".pagination__num-element_type_number")) {
      return;
    }
    currentPage = btn.textContent;

    createPagination(cardsCount, currentPage);
  });

  startArrowBtn.addEventListener("click", () => {
    createPagination(cardsCount, --currentPage);
  });

  endArrowBtn.addEventListener("click", () => {
    createPagination(cardsCount, ++currentPage);
  });

  createPagination(cardsCount, currentPage);
};

paginate();
