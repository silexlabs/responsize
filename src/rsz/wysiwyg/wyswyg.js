goog.provide('rsz.Wysiwyg');

/**
 * This class gives the user the ability to drag and drop the elements on the stage
 * @class
 * @export
 */
class Wysiwyg {
  /**
   * constructor
   */
  constructor() {
    /**
     * selection mode on/off
     * @type {boolean}
     */
    this.selectionMode = false;


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


    /**
     * @type {Element|null}
     * the current container
     */
    this.container = null;


    /**
     * callback to be notified when selection changes
     * use getSelected() to retrive the selection
     * @type {function()|null}
     */
    this.onSelect = null;


    /**
     * binded reference to use to attach / detach to events
     */
    this.onMouseDownBinded = this.onMouseDownCallback.bind(this);


    /**
     * binded reference to use to attach / detach to events
     */
    this.onMouseUpBinded = this.onMouseUpCallback.bind(this);


    /**
     * binded reference to use to attach / detach to events
     */
    this.onMouseMoveBinded = this.onMouseMoveCallback.bind(this);


    /**
     * callback to be notified when an element is about to be selected
     * the callback can return true to confirm selection or false to prevent it
     * @type {function(Element): boolean|null}
     */
    this.onBeforeSelect = null;
  }


  /**
   * callback to be notified when selection changes
   * use getSelected() to retrive the selection
   * @param {function()|null} onSelect
   * @export
   */
  setOnSelect(onSelect) {
    return this.onSelect = onSelect;
  }


  /**
   * callback to be notified when selection changes
   * use getSelected() to retrive the selection
   * @return {function()|null}
   * @export
   */
  getOnSelect() {
    return this.onSelect;
  }


  /**
   * callback to be notified when an element is about to be selected
   * the callback can return true to confirm selection or false to prevent it
   * @param {function(Element): boolean|null} onBeforeSelect
   * @export
   */
  setOnBeforeSelect(onBeforeSelect) {
    return this.onBeforeSelect = onBeforeSelect;
  }


  /**
   * callback to be notified when an element is about to be selected
   * the callback can return true to confirm selection or false to prevent it
   * @return {function(Element): boolean|null}
   * @export
   */
  getOnBeforeSelect() {
    return this.onBeforeSelect;
  }


  /**
   * init the drag and drop events
   * @param {Element} element
   * @export
   */
  setContainer(element) {
    // reset the previous container
    if (this.container) {
      this.container.removeEventListener('mousedown', this.onMouseDownBinded);
      this.container.removeEventListener('mouseup', this.onMouseUpBinded);
      this.container.removeEventListener('mousemove', this.onMouseMoveBinded);
    }

    // store for later use
    this.container = element;

    // update selection mode
    this.setSelectionMode(this.selectionMode);

    // add the mouse events
    this.container.addEventListener('mouseup', this.onMouseUpBinded);
    this.container.addEventListener('mousedown', this.onMouseDownBinded);
    this.container.addEventListener('mousemove', this.onMouseMoveBinded);

    // reset mouse
    this.isDown = false;
    // insert styles
    let styles = document.createElement('style');
    styles.innerHTML = '\
      .rsz-select-mode * {\
        min-width: 20px !important;\
        min-height: 20px !important;\
        opacity: 1 !important;\
        box-shadow: 0px 0px 2px rgba(51, 51, 51, 0.2);\
        cursor: pointer;\
      }\
      .rsz-dragging {\
      }\
      .rsz-selected {\
        box-shadow: 0 0 4px #333333;\
      }\
      .rsz-select-candidate {\
      }\
    ';
    this.container.appendChild(styles);
  }


  /**
   * selection mode
   * @param {boolean} activated
   * @export
   */
  setSelectionMode(activated) {
    this.selectionMode = activated;
    if(this.container) {
      if(activated) {
        this.container.classList.add('rsz-select-mode');
      }
      else {
        this.container.classList.remove('rsz-select-mode');
      }
    }
  }

  /**
   * get the best element to be selected
   * i.e. the first parent with siblings
   * @param {Element} target
   * @return {Element}
   * @export
   */
  getBestElement(target) {
    /** @type {Element} */ 
    let best = target;
    // loop while we have no siblings
    while(best && this.onBeforeSelect && !this.onBeforeSelect(best)) {
      best = /** @type {Element} */ (best.parentNode);
    }
    return best || target;
  }


  /**
   * get the next sibling for the element
   * @param {Element} target
   * @return {Element|null}
   */
  getNextSibling(target) {
    return this.getSibling(target, true);
  }


  /**
   * get the previous sibling for the element
   * @param {Element} target
   * @return {Element|null}
   */
  getPreviousSibling(target) {
    return this.getSibling(target, false);
  }


  /**
   * get the previous or next sibling for the element
   * @param {Element} element
   * @param {boolean} wantNext true if the next sibling is wanted, false for the previous one
   * @return {Element|null}
   */
  getSibling(element, wantNext) {
    let prev = null;
    let len = element.parentNode.childNodes.length;
    for(let idx=0; idx<len; idx++) {
      //forward
      let el = element.parentNode.childNodes[idx];
      // backward
      if(wantNext === false) {
        el = element.parentNode.childNodes[(len - 1) - idx];
      }
      if(el.nodeType === 1) {
        if(el === element) {
          return prev;
        }
        prev = el;
      }
    }
    return null;
  }


  /**
   * callback for mouse events
   */
  onMouseUpCallback(e) {
    this.onMouseUp(
      this.getBestElement(/** @type {Element} */ (e.target)),
      e.clientX,
      e.clientY,
      e.shiftKey
    );
    e.preventDefault();
    return false;
  }


  /**
   * callback for mouse events
   */
  onMouseDownCallback(e) {
    this.onMouseDown(
      this.getBestElement(/** @type {Element} */ (e.target)),
      e.clientX,
      e.clientY,
      e.shiftKey
    )
    e.preventDefault();
    return false;
  }


  /**
   * callback for mouse events
   */
  onMouseMoveCallback(e) {
    this.onMouseMove(
      this.getBestElement(/** @type {Element} */ (e.target)),
      e.clientX,
      e.clientY,
      e.shiftKey
    )
    e.preventDefault();
    return false;
  }


  /**
   * memorise mouse state
   * @param {Element} target
   * @param {number} x
   * @param {number} y
   * @param {boolean} isShift
   */
  onMouseDown(target, x, y, isShift) {
    this.isDown = true;
  }


  /**
   * start the process of drag
   * @param {Element} target
   * @param {number} x
   * @param {number} y
   * @param {boolean} isShift
   */
  onMouseMove(target, x, y, isShift) {
    if (this.selectionMode) {
      if (this.isDown) {
        if (!this.isDragging) {
          // start dragging
          this.isDragging = true;
        }
      }
      else {
        var candidates = this.container.querySelectorAll('.rsz-select-candidate');
        for (let idx=0; idx<candidates.length; idx++) {
          candidates[idx].classList.remove('rsz-select-candidate');
        }
        target.classList.add('rsz-select-candidate');
      }
    }
  }


  /**
   * ends the process of drag, drop the target
   * handle selection too
   * @param {Element} target
   * @param {number} x
   * @param {number} y
   * @param {boolean} isShift
   */
  onMouseUp(target, x, y, isShift) {
    this.isDown = false;
    if (this.selectionMode) {
      if (this.isDragging) {
        // drop the element
        this.isDragging = false;
      }
      else {
        /*
        // handle multiple selection
        if (!isShift) {
          this.getSelected().forEach((element) => this.unSelect(element));
        }
        // select / unselect the element
        this.toggleSelect(target);
        */
        // no multiple selection for now
        this.getSelected().forEach((element) => {
          if (element != target) this.unSelect(element)
        });
        this.toggleSelect(target);
      }
    }
  }


  /**
   * handle selection
   * @return {Array.<Element>}
   * @export
   */
  getSelected() {
    let selected = [];
    let nodeList = this.container.querySelectorAll('.rsz-selected');
    for (let idx=0; idx<nodeList.length; idx++) {
      let element = nodeList[idx];
      selected.push(element);
    }
    return selected;
  }


   /**
   * handle selection
   */
  isSelected(element) {
    return element.classList.contains('.rsz-selected');
  }


  /**
   * handle selection
   */
  select(element) {
    element.classList.add('rsz-selected');
    if(this.onSelect) {
      this.onSelect();
    }
  }


  /**
   * handle selection
   */
  unSelect(element) {
    element.classList.remove('rsz-selected');
    if(this.onSelect) {
      this.onSelect();
    }
}


  /**
   * handle selection
   */
  toggleSelect(element) {
    element.classList.toggle('rsz-selected');
    if(this.onSelect) {
      this.onSelect();
    }
  }


  /**
   * move up the selected elements in the Dom
   * FIXME: will not handle multi selection properly like this
   */
  moveUp() {
    this.getSelected().forEach((element) => {
      let sibling = this.getNextSibling(element);
      if(sibling) {
        element.parentNode.insertBefore(element, sibling);
      }
    });
  }


  /**
   * move down the selected elements in the Dom
   * FIXME: will not handle multi selection properly like this
   */
  moveDown() {
    this.getSelected().forEach((element) => {
      let sibling = this.getPreviousSibling(element);
      if(sibling) {
        element.parentNode.insertBefore(sibling, element);
      }
    });
  }
}

