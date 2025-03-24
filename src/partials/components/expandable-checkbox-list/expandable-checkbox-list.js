function handleListClick (){
  $(this).closest('.expandable-checkbox-list').toggleClass('expandable-checkbox-list--open');
}

$('.expandable-checkbox-list__btn').on('click', handleListClick)
