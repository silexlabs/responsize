goog.provide('rsz.wysiwyg.Side');
goog.provide('rsz.wysiwyg.RszResize');

goog.require('rsz.wysiwyg.RszSelection');


/**
 * this is an enum of the sides of an element
 * @enum
 */
rsz.wysiwyg.Side = {
  NONE: -1,
  TOP: 0,
  LEFT: 1,
  BOTTOM: 2,
  RIGHT: 3
};


/**
 * This class handles the resize feature
 * @class
 * @export
 */
class RszResize {
  /**
   * constructor
   */
  constructor() {
    /**
     * size of the resize handle
     * @type {number}
     */
    this.RESIZE_HANDLE_SIZE = 5;


    /**
     * callback to be notified when resize occured
     * @type {function(Element)|null}
     */
    this.onChanged = null;


    /**
     * @type {boolean}
     * true if the user is dragging an element
     */
    this.isDragging = false;


    /**
     * element being resized
     * @type {Element|null}
     */
    this.currentElement = null;


    /**
     * side of the element being resized
     * @type {rsz.wysiwyg.Side}
     */
    this.currentSide = rsz.wysiwyg.Side.NONE;
  }


  /**
   * memorise mouse state
   * @param {HTMLDocument} doc
   * @param {Element} target
   * @param {number} x
   * @param {number} y
   * @param {boolean} isShift
   * @return {boolean} true if the size has changed
   */
  onMouseDown(doc, target, x, y, isShift) {
    // get the bounding box of the target
    let rect = target.getBoundingClientRect();

    // get the side we grabed
    this.currentSide = this.getSide(rect, x, y);

    // store the data for onMouseMove and onMouseUp
    if(this.currentSide !== rsz.wysiwyg.Side.NONE) {
      this.currentElement = target;
    }
    else {
      this.currentElement = null;
    }
    return false;
  }


  /**
   * start the process of drag
   * @param {HTMLDocument} doc
   * @param {Element} target
   * @param {number} x
   * @param {number} y
   * @param {boolean} isShift
   * @param {?function(Element, Object.<number>):Object.<number>=} opt_filterBoundingBox
   *                callback to apply the given size to the element
   *                let you implement your app logic here
   * @return {boolean} true if the size has changed
   */
  onMouseMove(doc, target, x, y, isShift, opt_filterBoundingBox) {
    // handle cursor and compute new size
    this.updateCursor(doc, this.getSide(target.getBoundingClientRect(), x, y));

    // handle resize
    if (this.currentElement !== null) {
      if (!this.isDragging) {
        // start dragging
        this.isDragging = true;
      }

      // get the bounding box of the target
      let rect = this.currentElement.getBoundingClientRect();

      // compute the new bounding box to apply to the resize element
      let newRect = this.updateRect(this.currentSide, rect, x, y);

      // let the caller change the bounding box
      if(opt_filterBoundingBox) {
        newRect = opt_filterBoundingBox(this.currentElement, newRect);
      }

      // apply the new bounding box
      let parentRect = this.currentElement.parentNode.getBoundingClientRect();
      if(newRect) {
        this.currentElement.style.left = (newRect.left - parentRect.left) + 'px';
        this.currentElement.style.top = (newRect.top - parentRect.top) + 'px';
        this.currentElement.style.width = (newRect.right - newRect.left) + 'px';
        this.currentElement.style.height = (newRect.bottom - newRect.top) + 'px';
      }
      return true;
    }
    return false;
  }


  /**
   * ends the process of drag, drop the target
   * @param {HTMLDocument} doc
   * @param {Element} target
   * @param {number} x
   * @param {number} y
   * @param {boolean} isShift
   * @return {boolean} true if resize occured
   */
  onMouseUp(doc, target, x, y, isShift) {
    if(this.currentElement && this.isDragging) {
      // drop the element
      this.isDragging = false;
      this.currentElement = null;
      if(this.onChanged) {
        this.onChanged(this.currentElement);
      }
      return true;
    }
    // resize did not occure
    return false;
  }


  /**
   * get the side of the target over which the mouse is
   * @param {Object.<number>} targetRect
   * @param {number} x
   * @param {number} y
   * @return {rsz.wysiwyg.Side}
   */
  getSide(targetRect, x, y) {
    let relativeLeft = x - targetRect.left;
    let relativeTop = y - targetRect.top;
    let targetWidth = targetRect.right - targetRect.left;
    let targetHeight = targetRect.bottom - targetRect.top;

    // det the side
    let side = rsz.wysiwyg.Side.NONE;
    if (relativeLeft < this.RESIZE_HANDLE_SIZE && relativeLeft > 0 &&
      relativeTop < targetHeight && relativeTop > 0) {
      side = rsz.wysiwyg.Side.LEFT;
    }
    else if (relativeLeft < targetWidth && relativeLeft > targetWidth - this.RESIZE_HANDLE_SIZE &&
      relativeTop < targetHeight && relativeTop > 0) {
      side = rsz.wysiwyg.Side.RIGHT
    }
    else if (relativeTop < this.RESIZE_HANDLE_SIZE && relativeTop > 0 &&
      relativeLeft < targetWidth && relativeLeft > 0) {
      side = rsz.wysiwyg.Side.TOP;
    }
    else if (relativeTop < targetHeight && relativeTop > targetHeight - this.RESIZE_HANDLE_SIZE &&
      relativeLeft < targetWidth && relativeLeft > 0) {
      side = rsz.wysiwyg.Side.BOTTOM;
    }
    return side;
  }


  /**
   * handle mouse cursor
   * @param {HTMLDocument} doc
   * @param {rsz.wysiwyg.Side} side
   */
  updateCursor(doc, side) {
    switch (side) {
      case rsz.wysiwyg.Side.LEFT:
      case rsz.wysiwyg.Side.RIGHT:
        doc.body.classList.add('rsz-resize-ew');
      break;
      case rsz.wysiwyg.Side.TOP:
      case rsz.wysiwyg.Side.BOTTOM:
        doc.body.classList.add('rsz-resize-ns');
      break;
      case rsz.wysiwyg.Side.NONE:
        doc.body.classList.remove('rsz-resize-ew');
        doc.body.classList.remove('rsz-resize-ns');
      break;
    }
  }


  /**
   * compute the new bounding box to apply to the resize element
   * @param {rsz.wysiwyg.Side} side
   * @param {Object.<number>} targetRect
   * @param {number} x
   * @param {number} y
   * @return {Object.<number>}
   */
  updateRect(side, targetRect, x, y) {
    let newRect = {
      left: targetRect.left,
      right: targetRect.right,
      top: targetRect.top,
      bottom: targetRect.bottom
    }
    switch(this.currentSide) {
      case rsz.wysiwyg.Side.LEFT:
        newRect.left = x;
      break;
      case rsz.wysiwyg.Side.RIGHT:
        newRect.right = x;
      break;
      case rsz.wysiwyg.Side.TOP:
        newRect.top = y;
      break;
      case rsz.wysiwyg.Side.BOTTOM:
        newRect.bottom = y;
      break;
    }
    return newRect;
  }
}

