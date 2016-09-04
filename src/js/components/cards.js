import api from './api-client';

$(function () {
  api.likes.get(function (data) {
    if (!$.isEmptyObject(data)) {
      var article_id = null;
      $('.card').each(function(idx, el) {
        article_id = $(el).data('id');
        if (data[article_id]) {
          $(el).find('.likeButton').addClass('liked');
        }
      });
    }
  });
});

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
