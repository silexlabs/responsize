goog.require('rsz.App');

goog.require('rsz.Toolbar');
goog.require('rsz.Stage');
goog.require('rsz.Wysiwyg');
goog.require('rsz.Responsizer');


window['initResponsizeApp'] = function initResponsizeApp() {
  var appElement = document.getElementById('rsz-app');
  var app = new App(appElement);
  // debug:
  var query = getQueryParams(document.location.search);
  if (query.url) {
    app.onOpen({'url': query.url});
  }
}


function getQueryParams(qs) {
  qs = qs.split("+").join(" ");
  var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;
  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }
  return params;
}

