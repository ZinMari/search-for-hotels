import ExpandableCheckboxList from "./ExpandableCheckboxList";

$.each($('.js-expandable-checkbox-list'), function(){
    new ExpandableCheckboxList($(this))
})