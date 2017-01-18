(function() {
    'use strict';

    // const attachListener = function(tag) {
    //   $('#tagsForm').submit((event) => {
    //     event.preventDefault();
    //
    //     const options = {
    //       dataType: 'json',
    //       type: 'DELETE',
    //       url: `/tags/${tag.id}`
    //     };
    //
    //     $.ajax(options)
    //       .done(() => {
    //         window.location.href = '/tags.html';
    //       })
    //       .fail(() => {
    //         Materialize.toast('Unable to delete', 3000);
    //       });
    //     });
    // };
    // const attachListener = function(tag) {
    //   $('#deleteTag').click((event) => {
    //     event.preventDefault();
    //
    //     const options = {
    //       dataType: 'json',
    //       type: 'DELETE',
    //       url: `/tags/${tags.id}`
    //     };
    //
    //     $.ajax(options)
    //       .done(() => {
    //         window.location.href = '/tags.html';
    //       })
    //       .fail(() => {
    //         Materialize.toast('Unable to delete', 3000);
    //       });
    //     });
    // };

    const attachListener = function(tag) {
      $('#new_tag').click((event) => {
        event.preventDefault();

        const options = {
          dataType: 'json',
          type: 'POST',
          url: `/tags/${tags.id}`
        };

        $.ajax(options)
          .done(() => {
            window.location.herf = '/tags.html';
          })
          .fail(() => {
            Materialize.toast('Unable')
          })
      })
    }


    $.getJSON('/tags')
      .done((tags) => {
        // attachListener(tag);

        const $tagsForm = $('#tagsForm');

        for (const tag of tags) {
            const $p = $('<p>');
            const $input = $('<input type="checkbox">').attr('id', tag.id);
            const $label = $('<label>').attr('for', tag.id).text(tag.name);

            $p.append($input);
            $p.append($label);
            $tagsForm.append($p);

       }

    })
    .fail(() => {
      Materialize.toast('Unable to retrieve tags', 3000);
    });


    const delTags = [];
    $('#tagsForm').on('click', 'input', (event) => {

      const ind = delTags.indexOf(event.target.id);
      if ( ind === -1 ) {
        console.log(ind);
        delTags.push(event.target.id);
      }
      else {
        delTags.splice(ind,1);
      }


      });

    $('#deleteTag').click((event) => {
      console.log(delTags);

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
