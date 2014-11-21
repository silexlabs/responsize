goog.provide('rsz.App');

goog.require('rsz.Stage')

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
     * Stage component
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
  }
}

