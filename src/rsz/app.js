goog.provide('rsz.App');

goog.require('rsz.Toolbar');
goog.require('rsz.Stage');
goog.require('rsz.Wysiwyg');
goog.require('rsz.Responsizer');


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


    /**
     * @type {Responsizer}
     */
    this.responsizer = new Responsizer();


    // bind components together
    this.toolbar.onSize = (w, h) => this.stage.setSize(w, h);
    this.toolbar.onSelectionTool = (activated) => this.wysiwyg.setSelectionMode(activated);
    this.toolbar.onMoveDown = () => this.wysiwyg.moveDown();
    this.toolbar.onMoveUp = () => this.wysiwyg.moveUp();
    this.toolbar.onResponsize = () => this.responsizer.responsize(this.wysiwyg.getSelected());
    this.wysiwyg.onSelect = () => this.toolbar.setSelection(this.wysiwyg.getSelected());

    // init
    this.toolbar.setDevice(Device.desktop);
  }


  /**
   * load the file
   * @param {string} url
   */
  importWebsite(url) {
    this.stage.setUrl(url).then((doc) => {
      this.wysiwyg.init(doc);
      this.responsizer.init(doc);
      this.toolbar.init(doc);
    });
  }
}

