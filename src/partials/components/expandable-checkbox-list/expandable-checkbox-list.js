function handleListClick (e){
  $(e.currentTarget).closest('.js-expandable-checkbox-list').toggleClass('expandable-checkbox-list_open');
}

$('.expandable-checkbox-list__btn').on('click.expandableCheckboxList', handleListClick)
