function handleListClick (e){
  $(e.currentTarget).closest('.js-expandable-checkbox-list').toggleClass('expandable-checkbox-list_opened');
}

$('.expandable-checkbox-list__btn').on('click.expandableCheckboxList', handleListClick)
