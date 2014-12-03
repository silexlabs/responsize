goog.require('rsz.App');

goog.require('rsz.Toolbar');
goog.require('rsz.Stage');
goog.require('rsz.Wysiwyg');
goog.require('rsz.Responsizer');


window['initResponsizeApp'] = function initResponsizeApp() {
  var appElement = document.getElementById('app');
  var app = new App(appElement);
  var query = getQueryParams(document.location.search);
  var url = query.url || 'test/silex/';
  app.importWebsite(url);
}

function getQueryParams(qs) {
  qs = qs.split("+").join(" ");
  var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;
  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }
  return params;
}
