const expandableBtns = document.querySelectorAll('.expandable-checkbox-list__btn');

expandableBtns.forEach(btn => {
  btn.addEventListener('click', function(){
    this.ariaExpanded = this.ariaExpanded === 'false' ? true : false;
    this.closest('.expandable-checkbox-list').classList.toggle('expandable-checkbox-list--open');
  })
})
