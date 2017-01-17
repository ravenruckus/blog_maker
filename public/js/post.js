(function() {
    'use strict';

    const postId = window.QUERY_PARAMETERS.id;

    if (!postId) {
      window.location.href = '/all_posts.html';
    }

    const renderPost = function(post) {
      $('#title').val(post.title);
      $('#img').val(post.img);
      $('#content').val(post.content);

      Materialize.updateTextFields();
    };

    const attachListeners = function(post) {
      // console.log(post.id);
      $('#deletePost').click((event) => {
        // console.log(event);
        event.preventDefault();

      //   $('#deleteModal').openModal();
      // });
      //
      // $('#confirmDelete').click((event) => {
      //   event.preventDefault();

        const options = {
          dataType: 'json',
          type: 'DELETE',
          url: `/posts/${post.id}`
        };

        $.ajax(options)
          .done(() => {
            window.location.href = '/all_posts.html';
          })
          .fail(() => {
            Materialize.toast('Unable to delete post', 3000);
          });
      });


    };

    $.getJSON(`/posts/${postId}`)
      .done((post) => {
        renderPost(post);
        attachListeners(post);
        const $post = $('#post');
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
