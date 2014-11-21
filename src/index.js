goog.require('rsz.App');

window.addEventListener('load', (e) => {
  var appElement = document.getElementById('app');
  var app = new App(appElement);
  app.importWebsite('http://www.google.com');
});
