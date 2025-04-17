class ExpandableCheckboxList {
  constructor(expandableCheckboxListElement){
    this.$expandableCheckboxListElement = expandableCheckboxListElement;

    this._render();
  }

  _initialize(){
    this.$expandableCheckboxListBtn = this.$expandableCheckboxListElement.find('.expandable-checkbox-list__btn');
  }

  _handlerExpandableCheckboxListClick(event){
    $(event.currentTarget).closest('.js-expandable-checkbox-list').toggleClass('expandable-checkbox-list_opened');
  }

  _setEventHandlers(){
    this.$expandableCheckboxListBtn.on('click.expandableCheckboxList', this._handlerExpandableCheckboxListClick)
  }

  _render(){
    this._initialize();
    this._setEventHandlers()
  }
}

export default ExpandableCheckboxList;