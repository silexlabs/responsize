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
    this.onChanged = null;


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
   * @param {HTMLDocument} doc
   */
  reset(doc) {
     // reset mouse
    this.isDown = false;
    // selection
    this.unSelectAll(doc, false);
  }

  /**
   * memorise mouse state
   * @param {HTMLDocument} doc
   * @param {Element} target
   * @param {number} x
   * @param {number} y
   * @param {boolean} isShift
   * @return {boolean} true if the selection has changed
   */
  onMouseDown(doc, target, x, y, isShift) {
    this.isDown = true;
    return false;
  }


  /**
   * start the process of drag
   * @param {HTMLDocument} doc
   * @param {Element} target
   * @param {number} x
   * @param {number} y
   * @param {boolean} isShift
   * @return {boolean} true if the selection has changed
   */
  onMouseMove(doc, target, x, y, isShift) {
    if (this.isDown) {
      if (!this.isDragging) {
        // start dragging
        this.isDragging = true;
      }
    }
    else {
      // reset all candidates
      this.resetCandidates(doc);

      // new candidate
      target.classList.add('rsz-select-candidate');
    }
    return false;
  }


  /**
   * ends the process of drag, drop the target
   * handle selection too
   * @param {HTMLDocument} doc
   * @param {Element} target
   * @param {number} x
   * @param {number} y
   * @param {boolean} isShift
   * @return {boolean} true if the selection has changed
   */
  onMouseUp(doc, target, x, y, isShift) {
    this.isDown = false;
    if (this.isDragging) {
      // drop the element
      this.isDragging = false;
    }
    else {
      // handle multiple selection
      if (!isShift) {
        this.getSelected(doc).forEach((element) => {
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
   * @param {HTMLDocument|null} doc
   * @return {Array.<Element>}
   * @export
   */
  getSelected(doc) {
    if (doc) {
      // retrieve the selected elements
      let nodeList = doc.querySelectorAll('.rsz-selected');

      // convert to array
      let selected = [];
      for (let idx=0; idx<nodeList.length; idx++) {
        let element = nodeList[idx];
        selected.push(element);
      }
      return selected;
    }
    return [];
  }


  /**
   * reset hover effect
   * @param {HTMLDocument} doc
   */
  resetCandidates(doc) {
    var candidates = doc.querySelectorAll('.rsz-select-candidate');
    for (let idx=0; idx<candidates.length; idx++) {
      candidates[idx].classList.remove('rsz-select-candidate');
    }
  }


  /**
   * handle selection
   * @param {Element} element
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
      if(notify !== false && this.onChanged) {
        this.onChanged();
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
      if(notify !== false && this.onChanged) {
        this.onChanged();
      }
    }
  }


  /**
   * handle selection
   * @param {?boolean=} notify (defaults to true)
   */
  unSelectAll(doc, notify) {
    this.getSelected(doc).forEach((element) => {
      this.unSelect(element, notify);
    });
  }


  /**
   * handle selection
   * @param {Element} element
   * @param {?boolean=} notify (defaults to true)
   */
  toggleSelect(element, notify) {
    element.classList.toggle('rsz-selected');
    if(notify !== false && this.onChanged) {
      this.onChanged();
    }
  }
}

