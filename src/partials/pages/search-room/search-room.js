const paginate = ()=> {
  const roomCards = Array.from(document.querySelectorAll('.search-room__room'));
  const roomCardsContainer = document.querySelector('.search-room__rooms-elements');
  const paginationPanel = document.querySelector('.search-room__rooms-pagination');
  const paginationNumList = paginationPanel.querySelector('.pagination__numbers');
  const startArrowBtn = paginationPanel.querySelector('.pagination__btn--first');
  const endArrowBtn = paginationPanel.querySelector('.pagination__btn--last');

  const cardsCount = 11;
  const nuberLastPage = Math.ceil(roomCards.length / cardsCount);
  let currentPage = 1;

  function sliceCards(cardsCount, currentPage){
    roomCardsContainer.innerHTML = '';
    const firstCardsIndex = cardsCount * currentPage - cardsCount;
    const lastCardsIndex = firstCardsIndex + cardsCount;
    const cardsOnPage = roomCards.slice(firstCardsIndex, lastCardsIndex);
    return cardsOnPage;
  }

  function createBtnPagination(currentPage){
    const startBtn = currentPage == 1 ? 1 : currentPage - 1;

    paginationNumList.innerHTML = '';

    for(let i = startBtn; i < startBtn+3 && i <= nuberLastPage; i++){
      let li = document.createElement('li');
      li.classList.add('pagination__num-element', 'pagination__num-element--number');
      li.textContent = i;
      if(i == currentPage){
        li.classList.add('pagination__num-element--active');
      }
      paginationNumList.append(li)
    }

    createEllipses(startBtn, nuberLastPage)
    showArrowBtns(currentPage, nuberLastPage)
  }

  function showArrowBtns(currentPage, nuberLastPage){
    if(currentPage != 1) {
      startArrowBtn.hidden = false;
    } else {
      startArrowBtn.hidden = true;
    }

    if(currentPage == nuberLastPage) {
      endArrowBtn.hidden = true;
    } else {
      endArrowBtn.hidden = false;
    }
  }

  function createEllipses(startBtn, nuberLastPage) {
    const ellipses = document.createElement('li');
    ellipses.classList.add('pagination__num-element', 'pagination__num-element--ellipses');
    ellipses.textContent = '...';

    if(startBtn != 1) {
      paginationNumList.insertAdjacentElement('afterbegin', ellipses);
    }
    if(currentPage != nuberLastPage) {
      paginationNumList.insertAdjacentElement('beforeend', ellipses.cloneNode(true));
    }
  }

  function createPagination(cardsCount, currentPage){
    roomCardsContainer.append(...sliceCards(cardsCount, currentPage));
    createBtnPagination(currentPage);
  }

  paginationNumList.addEventListener('click', (e)=>{
    const btn = e.target;

    if(!btn.closest('.pagination__num-element--number')) {
      return;
    }
    currentPage = btn.textContent;

    createPagination(cardsCount, currentPage);
  })

  startArrowBtn.addEventListener('click', ()=> {
    currentPage = 1;
    createPagination(cardsCount, currentPage);
  })

  endArrowBtn.addEventListener('click', ()=> {
    currentPage = nuberLastPage;
    createPagination(cardsCount, currentPage);
  })

  createPagination(cardsCount, currentPage);
}
paginate()
