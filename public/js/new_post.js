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
    .then((data2) => {
      console.log(data2.id);
    })
    //can I get the ids of the tags and post to the tags_posts? here.
    .done(() => {
      window.location.href = '/all_posts.html';
    })
    .fail(($xhr) => {
      Materialize.toast($xhr.responseText, 3000)
    });
  })


// put event listener that puts tags into an array when clicked like the delete tag page
  $.getJSON('/tags')
    .done((tags) => {
      // console.log(tags);
      const $blogTags = $('#blogTags');

      for (const tag of tags) {

        const $anchor = $('<a>')
          .attr({
            href: `#`,
            'data-delay': '50',
            // 'data-tooltip': post.title
          })

          // .tooltip();
          const $li = $('<li>').attr('id', tag.id).text(tag.name);
          $anchor.append($li);
          $blogTags.append($anchor);
     }
  })
  .then((data) =>{
    // console.log(data);
    $.getJSON('/posts')
      .done((posts) => {
        // console.log(posts);
      })

  })
  .fail(() => {
    Materialize.toast('Unable to retrieve tags', 3000);
  });

  const addTags = [];
  $('#tagsForm').on('click', 'li', (event) => {

    const ind = addTags.indexOf(event.target.id);
    if ( ind === -1 ) {
      console.log(ind);
      delTags.push(event.target.id);
    }
    else {
      delTags.splice(ind,1);
    }


    });
    
})();
