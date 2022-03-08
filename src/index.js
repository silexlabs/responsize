goog.require('rsz.App');

goog.require('rsz.Toolbar');
goog.require('rsz.Stage');
goog.require('rsz.Wysiwyg');
goog.require('rsz.Responsizer');

window.responsize = window.responsize || {
  init: function() {
    function getQueryParams(qs) {
      qs = qs.split("+").join(" ");
      var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;
      while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
      }
      return params;
    }

    var appElement = document.getElementById('rsz-app');
    window.responsize.app = new App(appElement);
    // debug:
    var query = getQueryParams(document.location.search);
    if (query.url) {
      setTimeout(() => window.responsize.app.onOpen(query.url), 1000);
    }
  },
};

