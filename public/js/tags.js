(function() {
    'use strict';

    const attachListener = function(tags) {
      $('#tagsForm').submit((event) => {
        event.preventDefault();

        const options = {
          dataType: 'json',
          type: 'DELETE',
          url: `/tags/${tag.id}`
        };

        $.ajax(options)
          .done(() => {
            window.location.href = '/tags.html';
          })
          .fail(() => {
            Materialize.toast('Unable to delete', 3000);
          });
        });
    };

    $.getJSON('/tags')
      .done((tags) => {
        attachListener(tags);

        const $tagsForm = $('#tagsForm');

        for (const tag of tags) {
            const $p = $('<p>');
            const $input = $('<input type="checkbox">').attr('id', tag.id);
            const $label = $('<label>').attr('for', tag.id).text(tag.name);

            $p.append($input);
            $p.append($label);
            $tagsForm.append($p);

       }
       const $button = $('<a>').addClass('waves-effect waves-light btn-large').text('Delete').attr('id', 'deleteButton');
       $tagsForm.append($button);

    })
    .fail(() => {
      Materialize.toast('Unable to retrieve tags', 3000);
    })
})();
