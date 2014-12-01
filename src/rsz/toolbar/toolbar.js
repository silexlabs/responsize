goog.provide('rsz.Toolbar');

/**
 * @enum {number}
 */
var Device = {
  mobile: 0,
  mobileH: 1,
  tablet: 2,
  desktop: 3
};


/**
 * @type {Array.<{width: number, height: number}>}
 */
var DeviceData = [
  {name: 'mobile', width: 320, height: 480},
  {name: 'mobile-h', width: 476, height: 320},
  {name: 'tablet', width: 768, height: 1024},
  {name: 'desktop', width: 1280, height: 800},
]


/**
 * This class handles the tools selection
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
    this.moveButtonsElement = this.element.querySelector('.move-element');
    

    /**
     * @type {Element}
     */
    this.responsizerElement = this.element.querySelector('.responsizer');
    

    /**
     * callback
     * @type {function()|null}
     */
    this.onMoveUp = null;


    /**
     * callback
     * @type {function()|null}
     */
    this.onMoveDown = null;


    /**
     * callback
     * @type {function(number, number)|null}
     */
    this.onSize = null;


    /**
     * callback
     * @type {function()|null}
     */
    this.onResponsize = null;


    // handle click
    this.element.addEventListener('click', (e) => this.onClick(e));

    // handle move buttons
    var up = this.element.querySelector('.move-element .up');
    up.addEventListener('click', () => {if(this.onMoveUp) this.onMoveUp()});
    var down = this.element.querySelector('.move-element .down');
    down.addEventListener('click', () => {if(this.onMoveDown) this.onMoveDown()});

    // responsizer button
    this.responsizerElement.addEventListener('click', () => {if(this.onResponsize) this.onResponsize()});
  }


  /**
   * @param {Event} e
   */
  onClick(e) {
    var element = e.target;
    if(element.classList.contains('mobile')) {
      this.setDevice(Device.mobile);
    }
    if(element.classList.contains('mobile-h')) {
      this.setDevice(Device.mobileH);
    }
    if(element.classList.contains('tablet')) {
      this.setDevice(Device.tablet);
    }
    if(element.classList.contains('desktop')) {
      this.setDevice(Device.desktop);
    }
  }


  /**
   * @param {number} device
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
   */
  setSelection(elements) {
    if (elements && elements.length>0) {
      this.moveButtonsElement.classList.remove('disabled');
    }
    else {
      this.moveButtonsElement.classList.add('disabled');
    }
  }
}
