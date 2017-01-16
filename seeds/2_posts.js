'use strict';

exports.seed = function(knex) {
  return knex('posts').del()
    .then(() => {
      return knex('posts').insert([{
  id: 1,
  user_id: 1,
  content: 'Chocolate bar wafer gummi bears sugar plum I love I love cotton candy toffee. Wafer liquorice gingerbread tart cupcake cookie carrot cake caramels. Cupcake candy apple pie I love soufflé sesame snaps cake gingerbread cake. I love sweet candy canes fruitcake tootsie roll. Lollipop pudding I love apple pie jujubes topping cheesecake cheesecake muffin. Bear claw chupa chups chupa chups cake candy I love icing oat cake powder. Muffin jelly-o I love powder halvah. Cookie toffee donut cotton candy sweet toffee. Wafer sweet cake I love cupcake. Gummi bears sweet brownie gummies I love.',
  img: 'https://static.pexels.com/photos/8382/pexels-photo.jpg',
  title: 'Chocolate Bar Wafer',
  created_at: new Date('2016-07-09 14:26:16 UTC'),
  updated_at: new Date('2016-09-07 14:26:16 UTC')
  }, {
    id: 2,
    user_id: 1,
    content: 'Sweet ice cream muffin tiramisu pudding soufflé I love brownie sugar plum. Tootsie roll gingerbread brownie I love oat cake sweet brownie. Sesame snaps tootsie roll marzipan caramels bonbon biscuit marshmallow danish. Donut carrot cake chocolate bar halvah. Lollipop chocolate cake sesame snaps pie soufflé tart. Sesame snaps tootsie roll cotton candy tart bear claw I love. Halvah cake jujubes wafer donut. Gummies gingerbread donut topping cookie cake candy canes. Jelly-o halvah pudding sweet.',
    img: 'https://static.pexels.com/photos/132694/pexels-photo-132694.jpeg',
    title: 'Sweet Ice Cream',
    created_at: new Date('2016-07-09 14:26:16 UTC'),
    updated_at: new Date('2016-09-07 14:26:16 UTC')
  }, {
    id: 3,
    user_id: 1,
    content: 'Chocolate cake oat cake powder ice cream. Ice cream caramels cotton candy muffin marshmallow brownie marzipan croissant chocolate. Candy chocolate cake lemon drops oat cake soufflé powder I love pie liquorice. Bonbon bonbon toffee jelly. Halvah gingerbread I love. Biscuit apple pie marzipan I love gummies I love candy canes. Biscuit tootsie roll cookie chocolate bar ice cream biscuit I love cake. Halvah jujubes chocolate liquorice muffin dessert I love. I love brownie chocolate jelly jelly beans wafer jelly beans carrot cake. Marshmallow liquorice candy candy muffin chocolate bar topping pie. Chocolate cake chocolate cake I love cupcake oat cake. I love jelly beans gummies danish. I love chocolate bar caramels toffee. Candy canes caramels gummi bears. Sweet roll cake candy canes I love marshmallow donut cake donut.',
    img: 'https://static.pexels.com/photos/106243/pexels-photo-106243.jpeg',
    title: 'Chocolate Cupcake',
    created_at: new Date('2016-07-09 14:26:16 UTC'),
    updated_at: new Date('2016-09-07 14:26:16 UTC')
  }, {
    id: 4,
    user_id: 1,
    content: 'Cupcake ipsum dolor sit. Amet danish I love chocolate cake apple pie chocolate cake I love jelly chocolate. Dessert icing soufflé tootsie roll tootsie roll wafer chocolate cheesecake sugar plum. Gingerbread chocolate cake sesame snaps brownie. Chocolate bar wafer danish cupcake sugar plum croissant cookie ice cream jelly-o. I love wafer icing. Biscuit I love pastry pie tootsie roll cake gummi bears jujubes macaroon. Fruitcake candy soufflé. Cake carrot cake I love tiramisu. Sugar plum sugar plum sweet roll ice cream sesame snaps fruitcake chocolate cake marzipan pie. Sugar plum brownie oat cake biscuit. Cotton candy sweet bear claw dragée caramels oat cake halvah I love. Candy bear claw fruitcake lollipop I love sugar plum liquorice. Muffin caramels cupcake gingerbread.',
    img: 'https://static.pexels.com/photos/24553/pexels-photo-24553.jpg',
    title: 'Cupcakes',
    created_at: new Date('2016-07-09 14:26:16 UTC'),
    updated_at: new Date('2016-09-07 14:26:16 UTC')
  }, {
    id: 5,
    user_id: 1,
    content: 'Lollipop pastry I love candy ice cream I love dessert soufflé lemon drops. Sweet roll cake pastry. I love jelly powder I love cotton candy caramels lemon drops I love marshmallow. Dragée candy cheesecake toffee cookie candy tootsie roll halvah. I love liquorice candy icing cupcake bonbon. Pudding sweet roll gummi bears oat cake. Marzipan jelly beans sesame snaps. Donut muffin candy. Muffin I love soufflé fruitcake fruitcake gingerbread. Gummies lollipop ice cream carrot cake topping pie. Pudding candy cake gummies pie. Ice cream I love candy canes liquorice pastry. Marzipan jelly-o tart chocolate cake. Bonbon bonbon candy canes chocolate bar candy canes chocolate cake sesame snaps icing biscuit.',
    img: 'https://static.pexels.com/photos/37537/cake-pops-candies-chocolate-food-37537.jpeg',
    title: 'Lollipop Pasty',
    created_at: new Date('2016-07-09 14:26:16 UTC'),
    updated_at: new Date('2016-09-07 14:26:16 UTC')
  }, {
    id: 6,
    user_id: 1,
    content: 'Pie marzipan lollipop wafer. Marzipan halvah pastry cake gummies bear claw dragée cake. Tart pudding biscuit tart. Candy canes pie gingerbread lemon drops gingerbread I love. Lemon drops brownie jujubes apple pie carrot cake icing cookie wafer chocolate. Sweet roll icing fruitcake tart ice cream. Toffee I love croissant liquorice halvah. Pie ice cream bonbon danish lemon drops. Wafer tiramisu I love wafer. Dessert ice cream sweet roll. Lemon drops gummies sweet pastry powder chocolate bar brownie croissant. Tart oat cake dragée cheesecake tootsie r',
    img: 'https://static.pexels.com/photos/159887/pexels-photo-159887.jpeg',
    title: 'Marzipan',
    created_at: new Date('2016-07-09 14:26:16 UTC'),
    updated_at: new Date('2016-09-07 14:26:16 UTC')
  }])
  })
    .then(function(){
     return knex.raw("SELECT setval('posts_id_seq', (SELECT MAX(id) FROM posts));");
   });
};
