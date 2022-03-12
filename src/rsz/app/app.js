goog.provide('rsz.App');

goog.require('rsz.Toolbar');
goog.require('rsz.Stage');
//goog.require('rsz.Wysiwyg');
//goog.require('rsz.Responsizer');
goog.require('rsz.FileService');


/**
 * @class
 * this is the entry point of Responsize web app
 * an instance of this class is created in src/index.js at start
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
     * type {Wysiwyg}
     *
    this.wysiwyg = new Wysiwyg();


    /**
     * type {Responsizer}
     *
    this.responsizer = new Responsizer();


    /**
     * last opened URL
     * @type {string}
     */
    this.url = '';


    // **
    // bind components together
    // toolbar
    this.toolbar.onSize = (w, h) => {
      try { window.sessionStorage.setItem("rsz-device", this.toolbar.selectedDevice.toString()) }
      catch(e) {}
      this.stage.setSize(w, h);
    }
    this.toolbar.onOpen = () => {
      const url = prompt("Website URL", this.url);
      if(url) {
        // TODO: use `this.onOpen(url);` to open the website and the history API to update the GET param `url` 
        window.location.href = '?url=' + escape(url);
      }
    };
/*
    this.toolbar.onClearFormatting = (element) => this.responsizer.clearFormatting(element, this.stage.getSize().width);
    this.toolbar.onSave = () => this.fileService.save(
			this.wysiwyg.getCleanHtml()).then(() => this.onSave());
    // selection
    this.wysiwyg.selectFilter = (element) => {return this.isBootstrapCol(element)};
    this.wysiwyg.onSelect = () => {
      this.toolbar.setSelection(this.wysiwyg.getSelected());
      this.toolbar.setDirty(true);
    };

    // wysiwyg
    this.wysiwyg.filterBoundingBox = (element, rect) => {
      this.toolbar.setDirty(true);
      this.responsizer.setWidth(
        element,
        rect.right - rect.left,
        this.stage.getSize().width);
      // prevent resize from the Wysiwyg class
      return null;
    };
    this.wysiwyg.onResized = () => {
    };

    // add wysiwyg style sheet in the iframe
    this.wysiwyg.addTempStyle(window.location.href + 'iframe.css');

    // init
    this.wysiwyg.setSelectionMode(true);
    this.wysiwyg.setResizeMode(true);
*/
    try {
      const str = window.sessionStorage.getItem("rsz-device")
      if(str) {
        const device = parseInt(str, 10);
        this.toolbar.setDevice(device);
      }
      else this.toolbar.setDevice(Device.desktop);
    } catch(e) {
      this.toolbar.setDevice(Device.desktop);
    }
 }


  /**
   * counts the number of siblings of type Element
   * @return {boolean} true if the element has siblings
   * @export
   */
  hasSiblings(element) {
    if(element && element.parentNode && element.parentNode.childNodes) {
      let numChildren = 0;
      for(let idx in element.parentNode.childNodes) {
        let el = element.parentNode.childNodes[idx];
        if(el.nodeType === 1) {
          numChildren++;
        }
      }
      return numChildren > 1;
    }
    return false;
  }


  /**
   * @return {boolean} true if the element has a parent which is a row
   * @export
   */
  isBootstrapCol(element) {
    return element &&
      element.parentNode &&
      element.parentNode.classList &&
      element.parentNode.classList.contains('row');
  }


  /**
   * a file has been chosen by the user in cloud explorer
   * @param {string} url
   */
  onOpen(url) {
    this.url = url;
    this.stage.setUrl(url).then((doc) => {
      //this.responsizer.importSilex(doc, this.stage.getSize().width);
      //this.wysiwyg.setDocument(doc);
      this.toolbar.setSelection([]);
    }, (e) => {
      console.error('Error loading website:', e);
    });
  }


  /**
   * a file has been saved with cloud explorer
   */
  onSave() {
		this.toolbar.setDirty(false);
  }
}

