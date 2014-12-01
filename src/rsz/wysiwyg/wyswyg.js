goog.provide('rsz.Wysiwyg');

/**
 * This class gives the user the ability to drag and drop the elements on the stage
 * @class
 */
class Wysiwyg {
  /**
   * constructor
   * @param {Element} element the stage element
   */
  constructor(element) {
    /**
     * @type {Element}
     * the stage element
     */
    this.element = element;


    /**
     * @type {HTMLIFrameElement}
     */
    this.iframe = /** @type {HTMLIFrameElement} */ (document.getElementById('iframe'));


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
     * @type {HTMLDocument|null}
     * the current document
     */
    this.doc = null;
  }


  /**
   * init the drag and drop events
   * @param {HTMLDocument} doc
   */
  init(doc) {
    // store for later use
    this.doc= doc;
    // add the mouse events
    doc.addEventListener('mouseup', (e) => {
      this.onMouseUp(
        this.getBestElement(/** @type {Element} */ (e.target)),
        e.clientX,
        e.clientY,
        e.shiftKey
      );
      e.preventDefault();
      return false;
    });
    doc.addEventListener('mousedown', (e) => {
      this.onMouseDown(
        this.getBestElement(/** @type {Element} */ (e.target)),
        e.clientX,
        e.clientY
      )
      e.preventDefault();
      return false;
    });
    doc.addEventListener('mousemove', (e) => {
      this.onMouseMove(
        this.getBestElement(/** @type {Element} */ (e.target)),
        e.clientX,
        e.clientY
      )
      e.preventDefault();
      return false;
    });
    // reset mouse
    this.isDown = false;
    // insert styles
    let styles = doc.createElement('style');
    styles.innerHTML = '\
      .rsz-dragging {\
      }\
      .rsz-selected {\
        border: 1 solid red !important;\
      }\
      .rsz-select-candidate {\
        border: 1 solid orange !important;\
      }\
    ';
    doc.head.appendChild(styles);
  }


  /**
   * get the best element to be selected
   * i.e. the first parent with siblings
   * @param {Element} target
   * @return {Element}
   */
  getBestElement(target) {
    /** @type {Element} */ 
    let best = target;
    // loop while we have no siblings
    while(best && !this.hasSiblings(best)) {
      best = /** @type {Element} */ (best.parentNode);
    }
    return best || target;
  }


  /**
   * counts the number of siblings of type Element
   * @return {boolean} true if the element has siblings
   */
  hasSiblings(element) {
    let numChildren = 0;
    for(let idx in element.parentNode.childNodes) {
      let el = element.parentNode.childNodes[idx];
      if(el.nodeType === 1) {
        numChildren++;
      }
    }
    return numChildren > 1;
  }


  /**
   * memorise mouse state
   * @param {Element} target
   * @param {number} x
   * @param {number} y
   */
  onMouseDown(target, x, y) {
    this.isDown = true;
  }


  /**
   * start the process of drag
   * @param {Element} target
   * @param {number} x
   * @param {number} y
   */
  onMouseMove(target, x, y) {
    if (this.isDown) {
      if (!this.isDragging) {
        // start dragging
        this.isDragging = true;
      }
    }
    else {
      var candidates = this.doc.querySelectorAll('.rsz-select-candidate');
      for (let idx=0; idx<candidates.length; idx++) {
        console.log(candidates);
        candidates[idx].classList.remove('rsz-select-candidate');
      }
      target.classList.add('rsz-select-candidate');
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


  /**
   * handle selection
   * @return {Array.<Element>}
   */
  getSelected() {
    let selected = [];
    let nodeList = this.doc.querySelectorAll('.rsz-selected');
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
    console.log('select', element);
    element.classList.add('rsz-selected');
  }


  /**
   * handle selection
   */
  unSelect(element) {
    console.log('unselect', element);
    element.classList.remove('rsz-selected');
  }


  /**
   * handle selection
   */
  toggleSelect(element) {
    console.log('toggle', element);
    element.classList.toggle('rsz-selected');
  }
}
