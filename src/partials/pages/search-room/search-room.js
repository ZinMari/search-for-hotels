const paginate = ()=> {
  const roomCards = Array.from(document.querySelectorAll('.search-room__room'));
  const roomCardsContainer = document.querySelector('.search-room__rooms-elements');
  const pagination = document.querySelector('.search-room__rooms-pagination');
  const cardsCount = 11;
  let currentPage = 1;

  const renderCards = (cards, container, numberOfCards, page) => {
    roomCardsContainer.innerHTML = '';

    const firstCardsIndex = numberOfCards * page - numberOfCards;
    const lastCardsIndex = firstCardsIndex + numberOfCards;
    const cardsOnPage = roomCards.slice(firstCardsIndex, lastCardsIndex);

    roomCardsContainer.append(...cardsOnPage)
  }

  const renderPagination = (cards, numberOfCards) => {
    const pagesCount = Math.ceil(cards.length / numberOfCards);
    const paginationNumbersContainer = document.querySelector('.pagination__numbers');

    for(let i = currentPage; i < currentPage+3; i++) {
      const btn = renderPaginationBtn(i);
      paginationNumbersContainer.append(btn)
    }
  }

  const renderPaginationBtn = (page) => {
    const li = document.createElement('li');
    li.classList.add('pagination__num-element')
    li.textContent = page;

    if(currentPage === page) {
      li.classList.add('pagination__num-element--active')
    }
    return li;
  }

  const updatePagination = () => {
    pagination.addEventListener('click', (e)=> {
      if(!e.target.closest('.pagination__num-element')) {
        return;
      } else {
        currentPage = e.target.textContent;
        renderCards(roomCards, roomCardsContainer, cardsCount, currentPage);

        let currentLi = document.querySelector('.pagination__num-element--active');
        currentLi.classList.remove('pagination__num-element--active');
        e.target.classList.add('pagination__num-element--active');
      }
    })
  }

  renderCards(roomCards, roomCardsContainer, cardsCount, currentPage);
  renderPagination(roomCards, cardsCount);
  updatePagination();
}

paginate()
