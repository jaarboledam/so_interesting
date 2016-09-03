var api = {
  comments: {
    get: function (article_id, callback) {
      $.get(`/api/${article_id}/comments/`)
        .done(function (data) {
          if (callback)
            callback(data);
        })
        .fail(function (err) {
          if (callback)
            callback(`{error: ${err}}`);
        });
    },
    post: function (article_id, data, callback) {
      $.post({
        url: `/api/${article_id}/comments/`,
        data: data,
        contentType: "application/json; charset=utf-8",
      })
      .done(function (data) {
        if (callback)
          callback(data);
      })
      .fail(function (err) {
        if (callback)
          callback(`{error: ${err}}`);
      });
    }
  },
  likes: {
    get: function (article_id, callback) {
      try {
        var likes    = localStorage.getItem('soInterestingArticlelikes');
        var likesObj = likes ? $.parseJSON(likes) : {};

        if (callback)
          callback(likesObj);
      } catch (err) {
        if (callback)
          callback({'error': err});
      }
    },
    post: function (article_id, data, callback) {
      if (window.localStorage) {
        try {
          this.get(article_id, function (obj) {
            obj[article_id] = data || '';

            localStorage.setItem('soInterestingArticlelikes', JSON.stringify(obj));
            if (callback)
              callback({'status': 'OK'});
          });
        } catch (err) {
          if (callback)
            callback({'error': err});
        }
      }
    },
    delete: function (article_id) {
      this.get(article_id, function (obj) {
        delete obj[article_id];
        localStorage.setItem('soInterestingArticlelikes', JSON.stringify(obj));
      });
    }
  }
};

export default api;
