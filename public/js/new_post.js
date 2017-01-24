(function() {
  'use strict';

  const tagIds = [];

  $.getJSON('/tags')
     .done((tags) => {
       const $blogTags = $('#blogTags');

       for (const tag of tags) {
         const $li = $('<li>').attr('data-id', tag.id).text(tag.name);

         $blogTags.append($li);
       }
     })
     .fail(() => {
       Materialize.toast('Unable to retrieve tags', 3000);
     });

  $('#blogTags').on('click', 'li', (event) => {

    const tagId = parseInt($(event.target).attr('data-id'));
    const highlight = $(event.target);

    highlight.addClass('highlight');

    const ind = tagIds.indexOf(tagId);

    if (ind === -1) {
      tagIds.push(tagId);
    }
    else {
      tagIds.splice(ind, 1);
      highlight.removeClass('highlight');
    }
  });

  $('#submit').click((event) => {
    event.preventDefault();

    const title = $('#title').val().trim();
    const img = $('#img').val().trim();
    const content = $('#content').val().trim();

    if (!title) {
      return Materialize.toast('Title must not be blank', 3000);
    }

    if (!img) {
      return Materialize.toast('Please provide an image URL', 3000);
    }

    if (!content) {
      return Materialize.toast('Please provide some content', 3000);
    }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify({ title, img, content, tagIds }),
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
