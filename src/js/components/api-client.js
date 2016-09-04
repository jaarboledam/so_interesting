var api = {
  comments: {
    get: function (article_id, callback) {
      $.get({
        url: `/api/${article_id}`,
        processData: false,
        contentType: false
      })
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
      var formData = new FormData();
      formData.append("name", data.name);
      formData.append("lastname", data.lastname);
      formData.append("comment", data.comment);

      $.post({
        url: `/api/${article_id}`,
        data: formData,
        processData: false,
        contentType: false
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
    get: function (callback) {
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
          this.get(function (obj) {
            obj[article_id] = data || article_id;

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
      this.get(function (obj) {
        delete obj[article_id];
        localStorage.setItem('soInterestingArticlelikes', JSON.stringify(obj));
      });
    }
  }
};

export default api;
