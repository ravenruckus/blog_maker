(function() {
    'use strict';

    // window.QUERY_PARAMETERS = {};


    const id = window.QUERY_PARAMETERS.id;
    if (!id) {
      window.location.href = '/blog.html';
    }

// *******

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

$.getJSON(`/posts_tags/${id}`)
  .done((posts) => {
  console.log(posts);

    const $posts = $('#posts');

    for (const post of posts) {
console.log(post.id);
console.log(post['postId']);
      const shortDate = post.createdAt.substring(0,10);
      const thePostId = post['postId'];
      const $anchor = $('<a>')
        .attr({
          href: `/blog_post.html?id=${thePostId}`,
          'data-delay': '50',
          'data-tooltip': post.title
        })
      const $anchor2 = $('<a>')
        .attr({
          href: `/blog_post.html?id=${thePostId}`,
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
        $cardAction.append($anchor.text(`${post.title} - ${shortDate}`));
        $card.append($cardAction);
        $col.append($card);
        $posts.append($col);

   }
})
.fail(() => {
  Materialize.toast('Unable to retrieve posts', 3000);
})

$.getJSON(`/tags/${id}`)
  .done((tag) => {
    console.log(tag.name);
    const $tagTitle = $('#tagTitle');
    const $h3 = $('<h3>').text(tag.name);

    $tagTitle.append($h3);


})
.fail(() => {
  Materialize.toast('Unable to retrieve tags', 3000);
});



})();
