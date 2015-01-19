goog.provide('rsz.Toolbar');

/**
 * @enum {number}
 * @export
 */
var Device = {
  mobile: 0,
  mobileH: 1,
  tablet: 2,
  tabletH: 3,
  desktop: 4,
};


/**
 * @type {Array.<{width: number, height: number}>}
 * @export
 */
var DeviceData = [
  {name: 'mobile', width: 320, height: 480}, // bootstrap xs
  {name: 'mobile-h', width: 480, height: 320}, // xs
  {name: 'tablet', width: 769, height: 1024}, // sm (769 not 768 because website need to display the sm version)
  {name: 'tablet-h', width: 1024, height: 769}, // md
  {name: 'desktop', width: 1920, height: 1080}, // lg
];


/**
 * This class handles the tools selection
 * @export
 * @class
 */
class Toolbar {
  /**
   * constructor
   * @param {Element} element in which to display the website
   */
  constructor(element) {
    /**
     * the container for this component
     * @type {Element};
     */
    this.element = element;


    /**
     * @type {number}
     */
    this.selectedDevice = Device.desktop;


    /**
     * @type {Element}
     */
    this.openElement = this.element.querySelector('.open');



    /**
     * @type {Element}
     */
    this.saveElement = this.element.querySelector('.save');


    /**
     * @type {Element}
     */
    this.clearFormattingElement = this.element.querySelector('.clear-formatting');


    /**
     * @type {Array.<Element>}
     */
    this.selection = [];


    /**
     * callback for the app to be notified that the user wants to open a file
     * @type {function()|null}
     */
    this.onOpen = null;


    /**
    * callback for the app to be notified that the user wants to save the current file
     * @type {function()|null}
     */
    this.onSave = null;


    /**
     * callback for the app to be notified that the user wants to clear the formatting
     * of the current selection
     * @type {function(Element)|null}
     */
    this.onClearFormatting = null;


    /**
     * callback
     * @type {function(number, number)|null}
     */
    this.onSize = null;


    // handle click
    this.element.addEventListener('click', (e) => this.onClick(e));
  }


  /**
   * the current file has been modified but changes are not saved
   */
  setDirty(isDirty) {
    if(isDirty) {
      this.saveElement.classList.remove('off');
    }
    else {
      this.saveElement.classList.add('off');
    }
  }


  /**
   * @param {Event} e
   */
  onClick(e) {
    var element = e.target;
    if(element.classList.contains('open')) {
      if (this.onOpen) {
        this.onOpen();
      }
      // remove the tooltip
      this.element.querySelector('.tooltip.open').classList.remove('visible');
    }
    if(element.classList.contains('save')) {
      if (this.onSave) {
        this.onSave();
      }
    }
    if(element.classList.contains('clear-formatting')) {
      if (this.onClearFormatting) {
        this.selection.forEach((element) => this.onClearFormatting(element));
      }
    }
    else if(element.classList.contains('mobile')) {
      this.setDevice(Device.mobile);
    }
    else if(element.classList.contains('mobile-h')) {
      this.setDevice(Device.mobileH);
    }
    else if(element.classList.contains('tablet')) {
      this.setDevice(Device.tablet);
    }
    else if(element.classList.contains('tablet-h')) {
      this.setDevice(Device.tabletH);
    }
    else if(element.classList.contains('desktop')) {
      this.setDevice(Device.desktop);
    }
    e.preventDefault();
    return false;
  }


  /**
   * @param {number} device
   * @export
   */
  setDevice(device) {
    this.selectedDevice = device;
    // remove old selection
    let oldSelection = this.element.querySelectorAll('.selected');
    for (let idx=0; idx<oldSelection.length; idx++) {
      let element = oldSelection.item(idx);
      element.classList.remove('selected');
    }
    // apply new selection
    this.element.querySelector('.' + DeviceData[device].name).classList.add('selected');
    // notify the controller
    if (this.onSize) {
      this.onSize(DeviceData[device].width, DeviceData[device].height);
    }
  }


  /**
   * the selection has changed
   * @export
   */
  setSelection(elements) {
    this.selection = elements;
    this.redraw();
  }

  /**
   * redraw the elements depending on the selection
   * @export
   */
  redraw() {
    if (this.selection && this.selection.length>0) {
      this.clearFormattingElement.classList.remove('off');
    }
    else {
      this.clearFormattingElement.classList.add('off');
    }
  }
}
