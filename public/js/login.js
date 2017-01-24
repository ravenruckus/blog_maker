(function() {
  'use strict';

  $('#loginForm').submit((event) => {
    event.preventDefault();

    const email = $('#email').val().trim();
    const password = $('#password').val();

    if (!email) {
      return Materialize.toast('Please provide an Email', 3500);
    }

    if (!password) {
      return Materialize.toast('Please provide a Password', 3500);
    }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify({ email, password }),
      dataType: 'json',
      type: 'POST',
      url: '/token'
    };

    $.ajax(options)
      .done(() => {
        window.location.href = '/admin.html';
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      });
  });
})();
