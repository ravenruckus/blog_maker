(function() {
    'use strict';

    // window.QUERY_PARAMETERS = {};
    //
    // if (window.location.search) {
    //   window.location.search.substr(1).split('&').forEach((paramStr) => {
    //     const param = paramStr.split('=');
    //
    //     window.QUERY_PARAMETERS[param[0]] = param[1];
    //   });
    // }

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
      .then((data) => {
        const blogId = data.id;
        // console.log(data.id);
      })
      .fail(() => {
        Materialize.toast('Unable to retrieve post', 3000);
      });

})();
