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
  {name: 'mobile', width: 480, height: 320},
  {name: 'mobile-h', width: 320, height: 480},
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
     */
    this.element = element;
    /**
     * @type {number}
     */
    this.selectedDevice = Device.desktop;
    this.setDevice(Device.desktop);
    this.element.addEventListener('click', (e) => this.onClick(e));
  }


  /**
   * @param {Event} e
   */
  onClick(e) {
    var element = e.target;
    console.log('click', e, element, this.setDevice);
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
    console.log('setDevice', device, DeviceData[device].name);
    this.selectedDevice = device;
    // remove old selection
    let oldSelection = this.element.querySelectorAll('.selected');
    for (let idx=0; idx<oldSelection.length; idx++) {
      let element = oldSelection.item(idx);
      element.classList.remove('selected');
    }
    // apply new selection
    this.element.querySelector('.' + DeviceData[device].name).classList.add('selected');
  }
}
