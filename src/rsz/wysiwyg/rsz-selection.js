goog.provide('rsz.wysiwyg.RszSelection');

/**
 * This class handle the selection for the wysiwyg
 * @class Selection
 * @export
 */
class RszSelection {
  /**
   * constructor
   */
  constructor() {
     /**
     * callback to be notified when selection changes
     * use getSelected() to retrive the selection
     * @type {function()|null}
     */
    this.onSelect = null;


    /**
     * @type {boolean}
     * true if mouse is down
     */
    this.isDown = false;


    /**
     * @type {boolean}
     * true if the user is dragging an element
     */
    this.isDragging = false;
  }

  /**
   * reset selection
   * @param {Element} container
   */
  reset(container) {
     // reset mouse
    this.isDown = false;
    // selection
    this.getSelected(container).forEach((element) => {
      this.unSelect(element, false);
    });
  }

  /**
   * memorise mouse state
   * @param {Element} container
   * @param {Element} target
   * @param {number} x
   * @param {number} y
   * @param {boolean} isShift
   */
  onMouseDown(container, target, x, y, isShift) {
    this.isDown = true;
  }


  /**
   * start the process of drag
   * @param {Element} container
   * @param {Element} target
   * @param {number} x
   * @param {number} y
   * @param {boolean} isShift
   */
  onMouseMove(container, target, x, y, isShift) {
    if (this.isDown) {
      if (!this.isDragging) {
        // start dragging
        this.isDragging = true;
      }
    }
    else {
      // reset all candidates
      var candidates = container.querySelectorAll('.rsz-select-candidate');
      for (let idx=0; idx<candidates.length; idx++) {
        candidates[idx].classList.remove('rsz-select-candidate');
      }
      
      // reset the container
      container.classList.remove('rsz-select-candidate');
      
      // new candidate
      target.classList.add('rsz-select-candidate');
    }
  }


  /**
   * ends the process of drag, drop the target
   * handle selection too
   * @param {Element} container
   * @param {Element} target
   * @param {number} x
   * @param {number} y
   * @param {boolean} isShift
   * @return {boolean} true if the selection has changed
   */
  onMouseUp(container, target, x, y, isShift) {
    this.isDown = false;
    if (this.isDragging) {
      // drop the element
      this.isDragging = false;
    }
    else {
      // handle multiple selection
      if (!isShift) {
        this.getSelected(container).forEach((element) => {
          if (element != target) this.unSelect(element, false)
        });
      }
      // select the element
      this.select(target);
      // selection changed
      return true;
    }
    // selection did not change
    return false;
  }


  /**
   * handle selection
   * @param {Element|null} container
   * @return {Array.<Element>}
   * @export
   */
  getSelected(container) {
    if (container) {
      // retrieve the selected elements
      let nodeList = container.querySelectorAll('.rsz-selected');
      
      // convert to array
      let selected = [];
      for (let idx=0; idx<nodeList.length; idx++) {
        let element = nodeList[idx];
        selected.push(element);
      }
      // handle the container
      if(container.classList.contains('.rsz-selected')) {
        selected.push(container);
      }

      return selected;
    }
    return [];
  }


   /**
   * handle selection
   */
  isSelected(element) {
    return element.classList.contains('.rsz-selected');
  }


  /**
   * handle selection
   * @param {Element} element
   * @param {?boolean=} notify (defaults to true)
   */
  select(element, notify) {
    if(!element.classList.contains('rsz-selected')) {
      element.classList.add('rsz-selected');
      if(notify !== false && this.onSelect) {
        this.onSelect();
      }
    }
  }


  /**
   * handle selection
   * @param {Element} element
   * @param {?boolean=} notify (defaults to true)
   */
  unSelect(element, notify) {
    if(element.classList.contains('rsz-selected')) {
      element.classList.remove('rsz-selected');
      if(notify !== false && this.onSelect) {
        this.onSelect();
      }
    }
}


  /**
   * handle selection
   * @param {Element} element
   * @param {?boolean=} notify (defaults to true)
   */
  toggleSelect(element, notify) {
    element.classList.toggle('rsz-selected');
    if(notify !== false && this.onSelect) {
      this.onSelect();
    }
  }
}

