(function() {
    'use strict';

    const truncateString = function(str, num) {
      if(num > str.length) {
        return str;
      }
      else if(num >= 3) {
        return str.slice(0,num-3) + '...';
      }
      else if(num < 3) {
        return str.slice(0,num) + '...';
      }
    }

    $.getJSON('/posts')
      .done((posts) => {

        const $posts = $('#posts');

        for (const post of posts) {
          console.log(post);
          const $anchor = $('<a>')
            .attr({
              href: `/post.html?id=${post.id}`,
              'data-delay': '50',
              'data-tooltip': post.title
            })
          const $anchor2 = $('<a>')
            .attr({
              href: `/post.html?id=${post.id}`,
              'data-delay': '50',
              'data-tooltip': post.title
            })
            .tooltip();
            const postBlurb = truncateString(post.content, 150);
            const $col = $('<div>').addClass('col s12');
            const $card = $('<div>').addClass('card small');
            const $cardImage = $('<div>').addClass('card-image');
            const $img = $('<img>').attr({ src: post.img, alt: post.title });
            const $cardContent = $('<div>').addClass('card-content');
            const $p = $('<p>').text(postBlurb);
            const $cardAction = $('<div>').addClass('card-action');

            $cardImage.append($img);
            $anchor2.append($cardImage);
            $card.append($anchor2);
            $cardContent.append($p);
            $card.append($cardContent);
            $cardAction.append($anchor.text(`${post.title} - ${post.createdAt}`));
            $card.append($cardAction);
            $col.append($card);
            $posts.append($col);

       }
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve posts', 3000);
    })


})();
