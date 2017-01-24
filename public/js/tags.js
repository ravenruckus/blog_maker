(function() {
  'use strict';

  $('#newTag').submit((event) => {
    event.preventDefault();

    const tagName = $('#tagName').val().trim();

    if (!tagName) {
      return Materialize.toast('A tag name must be entered', 3000);
    }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify({ name: tagName }),
      dataType: 'json',
      type: 'POST',
      url: 'tags'
    };

    $.ajax(options)
          .done(() => {
            window.location.href = '/tags.html';
          })
          .fail(($xhr) => {
            Materialize.toast($xhr.responseText, 3000)
          });
  });

  $.getJSON('/tags')
      .done((tags) => {
        const $tagsForm = $('#tagsForm');

        for (const tag of tags) {
          const $p = $('<p>').addClass('left-align');
          const $input = $('<input type="checkbox">').attr('id', tag.id);
          const $label = $('<label>').attr('for', tag.id).text(tag.name);

          $p.prepend($label);
          $p.prepend($input);
          $tagsForm.prepend($p);
        }
      })
    .fail(() => {
      Materialize.toast('Unable to retrieve tags', 3000);
    });

  const delTags = [];

  $('#tagsForm').on('click', 'input', (event) => {

    const ind = delTags.indexOf(event.target.id);

    if (ind === -1) {
      delTags.push(event.target.id);
    }
    else {
      delTags.splice(ind, 1);
    }
  });

  $('#deleteTag').click((event) => {

    for (const tag of delTags) {
      const options = {
        dataType: 'json',
        type: 'DELETE',
        url: `/tags/${tag}`
      };

      $.ajax(options)
          .done(() => {
            window.location.href = '/tags.html';
          })

          .fail(() => {
            Materialize.toast('Unable to delete', 3000);          })
    }
  });
})();
