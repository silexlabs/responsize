goog.require('rsz.App');

window.addEventListener('load', (e) => {
  var appElement = document.getElementById('app');
  var app = new App(appElement);
  app.importWebsite('http://demo.334.proxy.ebztesting.io:80/sao-paulo/');
});
