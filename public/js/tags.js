(function() {
    'use strict';

    $.getJSON('/tags')
      .done((tags) => {

        const $tags = $('#tags');

        for (const tag of tags) {

          console.log(tags);

            const $p = $('<p>').text(tag.name);
            const $input = $( "type", "checkbox").attr('id', tag.id).addClass("checkbox");
            const $label = $(tag.name);

            $tags.append($p);
            $p.append($input);
            $p.append($label);

       }
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve tags', 3000);
    })


})();
