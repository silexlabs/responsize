goog.provide('rsz.App');

goog.require('rsz.Stage');
goog.require('rsz.Toolbar');

/**
 * @class
 */
class App {
  /**
   * @constructor
   * @param {Element} element
   */
  constructor(element){
    /**
     * @type {Toolbar}
     */
    this.toolbar= new Toolbar(element.querySelector('#toolbar'));
    /**
     * @type {Stage}
     */
    this.stage = new Stage(element.querySelector('#stage'));
  }
  /**
   * load the file
   * @param {string} url
   */
  importWebsite(url){
    console.log('import', url);
    this.stage.setUrl(url);
  }
}

