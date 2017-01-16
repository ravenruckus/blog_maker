(function() {
    'use strict';

    $('.parallax').parallax();

    $.getJSON('/posts')
      .done((posts) => {
        console.log(posts);
        const $posts = $('#posts');

        for (const post of posts) {
          const $anchor = $('<a>')
            .attr({
              href: `/blog.html?id=${post.id}`,
              'data-delay': '50',
              'data-tooltip': post.title
            })
            .tooltip();


            const $col = $('<div>'.addClass('col s12 m6'));
            const $card = $('<div>').addClass('card medium');
            const $cardImage = $('<div>').addClass('card-image');
            const $img = $('<img>').attr({ src: post.imgUrl, alt: post.title });
            const $cardContent = $('<div>').addClass('card-content');
            const $cardAction = $('<div>').addClass('card-action');

            const $actionSection = $anchor.text(`${post.title} - ${post.created_at}`).appendTo($cardAction);
            const $content = $('<p>').text(`${post.content}`).appendTo($cardContent);
            const $imgSection = $img.appendTo($cardImage).appendTo($anchor);

            $col.append($imgSection);
            $col.append($content);
            $col.append($actionSection);
            $col.appendTo($posts);

        }
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve posts', 3000);
    })


})();
