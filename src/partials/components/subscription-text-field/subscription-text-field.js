$("#subscr-form").validate({
  errorPlacement: function(error) {
    error.insertAfter($('.subscr-form__wrapp'));
  },

  errorClass: 'subscr-form__error',

  // highlight: function(element, validClass) {
  //   $(element).addClass('sdfsdfsdfsdf').removeClass(validClass);
  // },

  // unhighlight: function(element, errorClass, validClass) {
  //   $(element).removeClass(errorClass).addClass(validClass);
  // },
  debug: true,
  rules: {
    email_subscr: {
       required: true,
       email: true,
    }
  },
  messages: {
    email_subscr: {
      required: "Введите e-mail!",
      email: "Адрес должен быть вида name@domain.com"
    },
  },
});
