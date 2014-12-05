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
  desktop: 4
};


/**
 * @type {Array.<{width: number, height: number}>}
 * @export
 */
var DeviceData = [
  {name: 'mobile', width: 320, height: 480}, // bootstrap xs
  {name: 'mobile-h', width: 476, height: 320}, // xs
  {name: 'tablet', width: 768, height: 1024}, // sm
  {name: 'tablet-h', width: 1024, height: 768}, // md
  {name: 'desktop', width: 1280, height: 800}, // lg
]


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
  constructor(element, toolbarElement) {
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
    this.devicesElement = toolbarElement.querySelector('#devicesElement');
    

     /**
     * @type {Element}
     */
    this.moveButtonsElement = toolbarElement.querySelector('#moveButtonsElement');
    

    /**
     * @type {Element}
     */
    this.responsizerElement = toolbarElement.querySelector('#responsizerElement');
    

    /**
     * @type {Element}
     */
    this.widthElement = toolbarElement.querySelector('#widthElement');
    

    /**
     * @type {Array.<Element>}
     */
    this.selection = [];
    

    /**
     * callback for the app to be notified that the selection tool
     * has been activated - onSelectionTool(true)
     * or deactivated
     * @type {function(boolean)|null}
     */
    this.onSelectionTool = null;


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
    this.devicesElement.addEventListener('click', (e) => this.onClickDevice(e));

    // handle move buttons
    var up = this.moveButtonsElement.querySelector('.move-element .up');
    up.addEventListener('click', () => {if(this.onMoveUp) this.onMoveUp()});
    var down = this.moveButtonsElement.querySelector('.move-element .down');
    down.addEventListener('click', () => {if(this.onMoveDown) this.onMoveDown()});
  }


  /**
   * a new document is loaded
   * @param {HTMLDocument} doc
   * @export
   */
  init(doc) {
    console.log('init');
    // reset selection tool
    this.widthElement.classList.add('off');
  }


  /**
   * @param {Event} e
   */
  onClickDevice(e) {
    console.log('click', e);
    var element = e.target;
    if(element.classList.contains('mobile')) {
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
    else if(element.classList.contains('responsizer')) {
      if(this.onResponsize) this.onResponsize();
      this.redraw();
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
    let oldSelection = this.devicesElement.querySelectorAll('.selected');
    for (let idx=0; idx<oldSelection.length; idx++) {
      let element = oldSelection.item(idx);
      element.classList.remove('selected');
    }
    // apply new selection
    this.devicesElement.querySelector('.' + DeviceData[device].name).classList.add('selected');
    // notify the controller
    if (this.onSize) {
      this.onSize(DeviceData[device].width, DeviceData[device].height);
    }
    this.redraw();
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
      this.moveButtonsElement.classList.remove('disabled');
      // is responsized
      this.responsizerElement.classList.remove('disabled');
      let isResponsized = false;
      this.selection.forEach((element) => {
        if (element.classList.contains('rsz-responsized')) {
          isResponsized = true;
        }
      });
    console.log('xxx', this.selection);
      if (isResponsized) {
        this.responsizerElement.classList.remove('off');
      }
      else {
        this.responsizerElement.classList.add('off');
      }
    }
    else {
      this.moveButtonsElement.classList.add('disabled');
      this.responsizerElement.classList.add('disabled');
    }
  }
}
