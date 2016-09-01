var api = {
  comments: {
    get: function (article_id, callback) {
      $.get(`/api/${article_id}/comments/`)
        .done(callback)
        .fail(function (err) {
          callback(`{error: ${err}}`);
        });
    },
    post: function (article_id, data, callback) {
      $.post({
        url: `/api/${article_id}/comments/`,
        data: data,
        contentType: "application/json; charset=utf-8",
      })
      .done(callback)
      .fail(function (err) {
        callback(`{error: ${err}}`);
      });
    }
  },
  likes: {
    get: function (article_id, callback) {
      $.get(`/api/${article_id}/likes/`)
        .done(callback)
        .fail(function (err) {
          callback(`{error: ${err}}`);
        });
    },
    post: function (article_id, data, callback) {
      $.post({
        url: `/api/${article_id}/likes/`,
        data: data,
        contentType: "application/json; charset=utf-8",
      })
      .done(callback)
      .fail(function (err) {
        callback(`{error: ${err}}`);
      });
    }
  }
};

export default api;
