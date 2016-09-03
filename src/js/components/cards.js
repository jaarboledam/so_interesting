import api from './api-client';

$(function () {

  function like () {
    var $article   = $(this).closest('article');
    var article_id = $article.data('id');

    if ($(this).hasClass('liked')) {
      api.likes.delete(article_id);
      $(this).removeClass('liked')
    } else {
      $(this).addClass('liked')
      api.likes.post(article_id, null, function (data) {
        console.log(data);
      });
    }
  }

  $('.likeButton').on('click', like);
});
