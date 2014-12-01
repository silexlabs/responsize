goog.require('rsz.App');

window.addEventListener('load', (e) => {
  var appElement = document.getElementById('app');
  var app = new App(appElement);
  var query = getQueryParams(document.location.search);
  var url = query.url || 'test/silex/';
  app.importWebsite(url);
});

function getQueryParams(qs) {
  qs = qs.split("+").join(" ");
  var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;
  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }
  return params;
}
