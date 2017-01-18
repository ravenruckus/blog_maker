(function() {
  'use strict';

  $('#newUserForm').submit((event) => {
    event.preventDefault();

    const email = $('#email').val().trim();
    const password = $('#password').val().trim();

    if(!email) {
      return Materialize.toast('Please provide an email', 3000);
    }

    if(!password) {
      return Materialize.toast('Password must be >8 characters', 3000);
    }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify({
        email: email,
        password: password
          }),
        dataType: 'json',
        type: 'POST',
        url: 'users'
    };

    $.ajax(options)
      .done(() => {
        window.location.href = '/users.html';
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000)
      });
  });

  $.getJSON('/users')
    .done((users) => {

      const $allUsers = $('#allUsers');

      // <li class="collection-item">
      // <div>Alvin
      // <a href="#!" class="secondary-content">
      // <i class="material-icons">delete</i>
      // </a>
      // </div>
      // </li>

      for (const user of users) {
        const $li = $('<li>').addClass('collection-item');
        const $div = $('<div>').text(user.email);
        const $a = $('<a>').addClass('secondary-content');
        const $i = $('<i>').addClass('material-icons').text('delete');

        $a.append($i);
        $div.append($a);
        $li.append($div);
        $allUsers.append($li);

      }
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve users', 3000);
    })
})();
