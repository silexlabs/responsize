goog.require('rsz.App');

goog.require('rsz.Toolbar');
goog.require('rsz.Stage');
goog.require('rsz.Wysiwyg');
goog.require('rsz.Responsizer');


window['initResponsizeApp'] = function initResponsizeApp() {
  var appElement = document.getElementById('rsz-app');
  var app = new App(appElement);
}

