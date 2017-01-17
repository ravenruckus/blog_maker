(function() {
  'use strict';
  const postId = window.QUERY_PARAMETERS.id;
  console.log(postId);

  if (!postId) {
    window.location.href = '/all_posts.html';
  }

  const renderPost = function(post) {
    $('#title').val(post.title);
    $('#img').val(post.img);
    $('#content').val(post.content);

  };

  $.getJSON(`/posts/${postId}`)
    .done((post) => {
      renderPost(post);
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve post', 3000);
    });

    $('#updatePost').click((event) => {
      console.log(postId);
      event.preventDefault();

      const title = $('#title').val().trim();
      const img = $('#img').val().trim();
      const content = $('#content').val().trim();

      if(!title) {
        return Materialize.toast('Title must not be blank', 3000);
      }

      if(!img) {
        return Materialize.toast('Please provide an image URL', 3000);
      }

      if(!content) {
        return Materialize.toast('Please provide some content', 3000);
      }

      const options = {
        contentType: 'application/json',
        data: JSON.stringify({ title, img, content}),
        dataType: 'json',
        type: 'PATCH',
        url: `posts/${postId}`
      };
      console.log(options);

      $.ajax(options)
        .done(() => {
          console.log(postId);
          window.location.href = `/post.html?id=${postId}`;
        })
        .fail(($xhr) => {
          Materialize.toast($xhr.responseText, 3000)
        });
      });

    })();
