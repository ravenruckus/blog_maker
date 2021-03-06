(function() {
  'use strict';

  window.QUERY_PARAMETERS = {};

  if (window.location.search) {
    window.location.search.substr(1).split('&').forEach((paramStr) => {
      const param = paramStr.split('=');

      window.QUERY_PARAMETERS[param[0]] = param[1];
    });
  }

  $('.button-collapse').sideNav();

  $.getJSON('/token')
  .done((loggedIn) => {
    if (!loggedIn) {
      window.location.href = '/login.html';
    }
  });

  $.getJSON('/token')
  .done((loggedIn) => {
    if (loggedIn) {
      const $logout = $('<a>').text('Log out');

      $('#login').append($logout);

      const $logoutMobile = $('<a>').text('Log out');

      $('#login2').append($logoutMobile);

      $logout.click((event) => {
        event.preventDefault();

        const options = {
          type: 'DELETE',
          url: '/token'
        };

        $.ajax(options)
          .done(() => {
            window.location.href = '/login.html';
          })
          .fail((err) => {
            Materialize.toast('Unable to log out. Please try again.', 3000);
          });
      });

      $logoutMobile.click((event) => {
        event.preventDefault();

        const options = {
          type: 'DELETE',
          url: '/token'
        };

        $.ajax(options)
          .done(() => {
            window.location.href = '/login.html';
          })
          .fail((err) => {
            Materialize.toast('Unable to log out. Please try again.', 3000);
          });
      });
    }
  });
})();
