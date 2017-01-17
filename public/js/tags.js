(function() {
    'use strict';

    $.getJSON('/tags')
      .done((tags) => {

        const $tags = $('#tags');

        for (const tag of tags) {


          // <p>
          //   <input type="checkbox" id="test6" />
          //   <label for="test6">Yellow</label>
          // </p>
            const $p = $('<p>');
            const $input = $('<input type="checkbox">').attr('id', tag.id);
            const $label = $('<label>').attr('for', tag.id).text(tag.name);


            $p.append($input);
            $p.append($label);
            $tags.append($p);

       }
       const $button = $('<a>').addClass('waves-effect waves-light btn-large').text('Delete');
       $tags.append($button);
       
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve tags', 3000);
    })

})();
