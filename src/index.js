goog.require('rsz.App');

window.addEventListener('load', (e) => {
  var appElement = document.getElementById('app');
  var app = new App(appElement);
  app.importWebsite('https://ie7-js.googlecode.com/svn/test/child.html');
});
