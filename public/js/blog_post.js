(function() {
    'use strict';

    const postId = window.QUERY_PARAMETERS.id;
    if (!postId) {
      window.location.href = '/blog.html';
    }

    const renderPost = function(post) {
      $('#title').val(post.title);
      $('#img').val(post.img);
      $('#content').val(post.content);

      Materialize.updateTextFields();
    }

    $.getJSON(`/posts/${postId}`)
      .done((post) => {
        renderPost(post);
        console.log(post.title);
        const $post = $('#blog_post');
        const $col = $('<div>').addClass('col s12 ind_post');
        const $title = $('<h2>').text(post.title);
        const $img = $('<img>').attr({ src: post.img, alt: post.title });
        const $p = $('<p>').text(post.content);

        $col.append($title);
        $col.append($img);
        $col.append($p);
        $post.append($col);
      })
      .fail(() => {
        Materialize.toast('Unable to retrieve post', 3000);
      });

})();
