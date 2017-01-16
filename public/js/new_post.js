(function() {
  'use strict';

$('#newPost').submit((event) => {
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
    type: 'POST',
    url: 'posts'
  };

  $.ajax(options)
    .done(() => {
      window.location.href = '/all_posts.html';
    })
    .fail(($xhr) => {
      Materialize.toast($xhr.responseText, 3000)
    });
  });
})();
