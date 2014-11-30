goog.provide('rsz.App');

goog.require('rsz.Toolbar');
goog.require('rsz.Stage');
goog.require('rsz.Wysiwyg');


/**
 * @class
 */
class App {
  /**
   * @constructor
   * @param {Element} element
   */
  constructor(element) {

    /**
     * @type {Toolbar}
     */
    this.toolbar= new Toolbar(element.querySelector('#toolbar'));


    /**
     * @type {Stage}
     */
    this.stage = new Stage(element.querySelector('#stage'));


    /**
     * @type {Wysiwyg}
     */
    this.wysiwyg = new Wysiwyg(element.querySelector('#stage'));


    // bind components together
    this.toolbar.onSize = this.setSize.bind(this);
    // init
    this.toolbar.setDevice(Device.desktop);
  }


  /**
   * load the file
   * @param {string} url
   */
  importWebsite(url) {
    this.stage.setUrl(url).then((doc) => this.wysiwyg.init(doc));
  }


  /**
   * change the rendering size of the website
   * @param {number} w
   * @param {number} h
   */
  setSize(w, h) {
    this.stage.setSize(w, h);
  }
}

