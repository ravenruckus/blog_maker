(function() {
 'use strict';

 const tagIds = [];


 // Add event listener to get tags into array when clicked
   $.getJSON('/tags')
     .done((tags) => {
       const $blogTags = $('#blogTags');

       for (const tag of tags) {

           const $li = $('<li>').attr('data-id', tag.id).text(tag.name);
           $blogTags.append($li);
      }

     })
     .then(() =>{

     })
     .fail(() => {
       Materialize.toast('Unable to retrieve tags', 3000);
     });

   $('#blogTags').on('click', 'li', (event) => {
     const tagId = parseInt($(event.target).attr('data-id'));

     const ind = tagIds.indexOf(tagId);

     if ( ind === -1 ) {
       tagIds.push(tagId);
     }
     else {
       tagIds.splice(ind,1);
     }

     });


 $('#submit').click((event) => {
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
     data: JSON.stringify({ title, img, content, tagIds }),
     dataType: 'json',
     type: 'POST',
     url: 'posts',
   };

   $.ajax(options)
     .done((data) => {
       console.log(options);
       console.log(data);
       window.location.href = '/all_posts.html';

     })

   // $.ajax(options)
   //   .done((newPost) => {
   //     console.log(newPost.id)
   //     // for (let i=0; i<tagIds.length; i++) {
   //
   //     const options2 = {
   //       contentType: 'application/json',
   //       data: JSON.stringify({ tagId: tagIds[0], postId: newPost.id }),
   //       dataType: 'json',
   //       type: 'POST',
   //       url: 'posts_tags'
   //     };
   //
   //   $.ajax(options2)
   //     .done(() => {
   //     })
   //     .fail(() => {
   //       console.log('err')
   //     })
     .fail(($xhr) => {
       Materialize.toast($xhr.responseText, 3000)
     });
   })



})();
