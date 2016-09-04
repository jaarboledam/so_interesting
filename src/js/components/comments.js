import api from './api-client';

var $form = $('#frmComment');
var article_id = $('.article').data('id');

(function () {
  api.comments.get(article_id, function (res) {
    if (res.length) {
      $.each(res, function(idx) {
        renderComment(res[idx]);
      });
    }
  });
})();

function validateForm (e) {
  var $name     = $form.find('#txtName'),
      $lastname = $form.find('#txtLastName'),
      $comment  = $form.find('#txtComment');

  if (!$name[0].checkValidity()) {
    $name.addClass('has-error');
    showAlert();
    return false;
  }

  if (!$lastname[0].checkValidity()) {
    $lastname.addClass('has-error');
    showAlert();
    return false;
  }

  if (!$comment[0].checkValidity()) {
    $comment.addClass('has-error');
    showAlert();
    return false;
  }

  e.preventDefault();

  var data = {
    name: $name.val(),
    lastname: $lastname.val(),
    comment: $comment.val()
  };

  saveComment(data);
}

function saveComment (data) {
  api.comments.post(article_id, data, function (res) {
    if (res['id']) {
      renderComment(res);
    }
  });
}

function renderComment (data) {
  var comment = `<div class="comment" data-id="${data.id}">
                  <div class="comment-author"><span class="accent">${data.name + ' ' + data.lastname}</span> wrote...</div>
                  <p class="comment-content">${data.comment}</p>
                 </div>`;

  $('.article-comments').prepend(comment);
}

function showAlert () {
  var $callout  = $('#alertMessage');
  $callout.find('.text').html('Please fill in the marked fields.');
  Foundation.Motion.animateIn($callout, 'fade-in');
}

$form.on('submit', validateForm);
