(function() {
  'use strict';

  $('.parallax').parallax();
  const truncateString = function(str, num) {
    if (num > str.length) {
      return str;
    }
    else if (num >= 3) {
      return str.slice(0, num - 3) + '...';
    }
    else if (num < 3) {
      return str.slice(0, num) + '...';
    }
  }

  $.getJSON('/posts')
      .done((posts) => {

        const $posts = $('#posts');

        for (const post of posts) {
          const shortDate = post.createdAt.substring(0, 10);

          const $anchor = $('<a>')

            .attr({
              href: `/blog_post.html?id=${post.id}`,
              'data-delay': '50',
              'data-tooltip': post.title
            });

          const $anchor2 = $('<a>')

            .attr({
              href: `/blog_post.html?id=${post.id}`,
              'data-delay': '50',
              'data-tooltip': post.title
            })
            .tooltip();
          const postBlurb = truncateString(post.content, 150);
          const $col = $('<div>').addClass('col s12 m6');
          const $card = $('<div>').addClass('card medium');
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
          $cardAction.append($anchor.text(`${post.title} * ${shortDate}`));
          $card.append($cardAction);
          $col.append($card);
          $posts.append($col);
        }
      })
    .fail(() => {
      Materialize.toast('Unable to retrieve posts', 3000);
    });

  $.getJSON('/tags')
      .done((tags) => {
        const $blogTags = $('#blogTags');

        for (const tag of tags) {
          const $anchor = $('<a>')
            .attr({
              href: `posts_tags.html?id=${tag.id}`,
              'data-delay': '50'
            });

          const $li = $('<li>').attr('id', tag.id).text(tag.name);

          $anchor.append($li);
          $blogTags.append($anchor);
        }
      })
    .fail(() => {
      Materialize.toast('Unable to retrieve tags', 3000);
    });
})();
