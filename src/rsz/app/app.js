goog.provide('rsz.App');

goog.require('rsz.Toolbar');
goog.require('rsz.Stage');
goog.require('rsz.Wysiwyg');
goog.require('rsz.Responsizer');


/**
 * @class
 * @suppress {checkStructDictInheritance}
 * @export
 */
class App {
  /**
   * @constructor
   * @param {HTMLElement} element
   */
  constructor(element) {
    /**
     * @type {HTMLElement}
     */
    this.element = element;

    // wait for components to be initialized
  window.addEventListener('polymer-ready', (e) => {
    console.log('start');
    this.initComponents();
  });
}


  /**
   *
   */
  initComponents() {
    /**
     * @type {Object.<*>|null}
     */
    this.toolbarComponent = this.element.getElementsByTagName('rsz-toolbar')[0];


    /**
     * @type {Object.<*>|null}
     */
    this.stageComponent = this.element.getElementsByTagName('rsz-stage')[0];


    /**
     * @type {Object.<*>|null}
     */
    this.wysiwygComponent = this.element.getElementsByTagName('rsz-wysiwyg')[0];


    /**
     * @type {Object.<*>|null}
     */
    this.responsizerComponent = this.element.getElementsByTagName('rsz-responsizer')[0];


    /**
     * @type {Toolbar|null}
     */
    this.toolbar = null;
    if (this.toolbarComponent) {
      this.toolbar = /** @type {Toolbar|null} */ (this.toolbarComponent['controller']);
    }


    /**
     * @type {Stage|null}
     */
    this.stage = null;
    if (this.stageComponent) {
      this.stage = /** @type {Stage|null} */ (this.stageComponent['controller']);
      console.log('aaabbb', this.stage);
    }


    /**
     * @type {Wysiwyg|null}
     */
    this.wysiwyg = null;
    if (this.wysiwygComponent) {
      this.wysiwyg = /** @type {Wysiwyg|null} */ (this.wysiwygComponent['controller']);
    }


    /**
     * @type {Responsizer|null}
     */
    this.responsizer= null;
    if (this.responsizerComponent) {
      this.responsizer = /** @type {Responsizer|null} */ (this.responsizerComponent['controller']);
    }


    // bind components together
    if(this.toolbar && this.stage) {
      this.toolbar.onSize = (w, h) => this.stage.setSize(w, h);
    }

    if (this.toolbar && this.wysiwyg) {
      this.toolbar.onSelectionTool = (activated) => this.wysiwyg.setSelectionMode(activated);
      this.toolbar.onMoveDown = () => this.wysiwyg.moveDown();
      this.toolbar.onMoveUp = () => this.wysiwyg.moveUp();
      this.wysiwyg.onSelect = () => this.toolbar.setSelection(this.wysiwyg.getSelected());
    }

    if (this.toolbar && this.wysiwyg && this.responsizer) {
      this.toolbar.onResponsize = () => this.responsizer.responsize(this.wysiwyg.getSelected());
    }
console.log('app ', this.toolbar, this.stage, this.stageComponent);
console.dir(this.stageComponent);
    // init components
    if (this.toolbar) {
      this.toolbar.setDevice(Device.desktop);
    }
  }


  /**
   * load the file
   * @param {string} url
   * @export
   */
  importWebsite(url) {
    var stage = /** @type {Stage} */ (this.element.getElementsByTagName('rsz-stage')[0]);
    if (stage) {
      stage.setUrl(url).then((doc) => {
        if (this.wysiwyg) this.wysiwyg.init(doc);
        if (this.responsizer) this.responsizer.init(doc);
        if (this.toolbar) this.toolbar.init(doc);
      });
    }
  }
}

