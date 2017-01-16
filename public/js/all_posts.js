(function() {
    'use strict';

    $('.parallax').parallax();
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
        // for (const post of posts) {
        //   console.log(post.content);
        //   const $p = $('<p>');
        //   $p.append(post.content).appendTo($posts)
        //
        //   const $col = $('<div>')
        // }

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
            // const postBlurb = post.slice(0,20);
            const $col = $('<div>').addClass('col s12');
            const $card = $('<div>').addClass('card small');
            const $cardImage = $('<div>').addClass('card-image');
            const $img = $('<img>').attr({ src: post.img, alt: post.title });
            const $cardContent = $('<div>').addClass('card-content');
            const $p = $('<p>').text(postBlurb);
            // const $p = $('<p>').text(post.content);
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

            //
            // const $col = $('div').addClass('col s12 m6');
            // const $content = $('<p>').text(post.content);
            //
            // $col.append($content);
            // $posts.append($col);

            // const $col = $('<div>').addClass('col s12 m6');
            // const $card = $('<div>').addClass('card medium');
            // const $cardImage = $('<div>').addClass('card-image');
            // const $img = $('<img>').attr({ src: post.img, alt: post.title });
            // const $cardContent = $('<div>').addClass('card-content');
            // const $cardAction = $('<div>').addClass('card-action');
            //
            // const $actionSection = $anchor.text(`${post.title} - ${post.created_at}`).appendTo($cardAction);
            // const $content = $('<p>').text(`${post.content}`).appendTo($cardContent);
            // const $imgSection = $img.appendTo($cardImage).appendTo($anchor);
            //
            //
            // $col.append($imgSection);
            // $col.append($content);
            // $col.append($actionSection);
            // $col.appendTo($posts);

       }
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve posts', 3000);
    })


})();
