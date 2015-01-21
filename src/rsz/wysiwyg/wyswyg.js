goog.provide('rsz.Wysiwyg');

goog.require('rsz.wysiwyg.RszSelection');
goog.require('rsz.wysiwyg.RszResize');
goog.require('rsz.wysiwyg.RszDom');

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
     * callback to be notified when selection changes
     * use getSelected() to retrive the selection
     * alternative to the use of setOnSelected
     * @type {function()|null}
     */
    this.onSelect = null;


    /**
     * callback to be notified when an element has been resized
     * use getSelected() to retrive the selection
     * alternative to the use of setOnResized
     * @type {function()|null}
     */
    this.onResized = null;


    /**
     * @type {HTMLDocument|null}
     * the current document
     */
    this.document = null;


   /**
     * callback to be notified when an element is about to be selected
     * the callback can return true to confirm or false to prevent it
     * @type {function(Element): boolean|null}
     */
    this.selectFilter = null;


   /**
     * callback to apply the given size to the element
     * let you implement your app logic here
     * you are expected to return a rect object with left, right, top, bottom
     * or null if you apply the size to the element by yourself
     * @type {function(Element, Object.<number>):Object.<number>|null}
     */
    this.filterBoundingBox = null;


    /**
     * binded reference to use to attach / detach to events
     */
    this.onMouseDownBinded = this.onMouseDown.bind(this);


    /**
     * binded reference to use to attach / detach to events
     */
    this.onMouseUpBinded = this.onMouseUp.bind(this);


    /**
     * binded reference to use to attach / detach to events
     */
    this.onMouseMoveBinded = this.onMouseMove.bind(this);


    /**
     * prevent click on links
     */
    this.preventDefaultBinded = this.preventDefault.bind(this);


    /**
     * selection component
     * @type {RszSelection|null}
     */
    this.rszSelection = new RszSelection();


    /**
     * resize component
     * @type {RszResize|null}
     */
    this.rszResize = new RszResize();


    /**
     * selection mode on/off
     * @type {boolean}
     */
    this.selectionMode = false;


    /**
     * allow resize feature
     * @type {boolean}
     */
    this.resizeMode = false;


    /**
     * Dom component
     * @type {RszDom}
     */
    this.rszDom = new RszDom();
  }


  /**
   * callback to be notified when selection changes
   * use getSelected() to retrive the selection
   * @param {function()|null} onSelect
   * @export
   */
  setOnSelect(onSelect) {
    return this.rszSelection.onChanged = onSelect;
  }


  /**
   * callback to be notified when selection changes
   * use getSelected() to retrive the selection
   * @return {function()|null}
   * @export
   */
  getOnSelect() {
    return this.rszSelection.onChanged;
  }


  /**
   * callback to be notified when an element is about to be selected
   * the callback can return true to confirm selection or false to prevent it
   * @param {function(Element): boolean|null} selectFilter
   * @export
   */
  setSelectFilter(selectFilter) {
    return this.selectFilter = selectFilter;
  }


  /**
   * callback to be notified when an element is about to be selected
   * the callback can return true to confirm selection or false to prevent it
   * @return {function(Element): boolean|null}
   * @export
   */
  getSelectFilter() {
    return this.selectFilter;
  }


  /**
   * remove data needed for editing
   * @return {string}
   * @export
   */
  getCleanHtml() {
    var doc = this.document.documentElement.cloneNode(true);
    this.rszDom.unprepare(doc);
    return doc.outerHTML;
  }


  /**
   * init the drag and drop events
   * @param {HTMLDocument} doc
   * @export
   */
  setDocument(doc) {
    // reset the previous container
    if (this.document) {
      this.document.removeEventListener('mousedown', this.onMouseDownBinded);
      this.document.removeEventListener('mouseup', this.onMouseUpBinded);
      this.document.removeEventListener('mousemove', this.onMouseMoveBinded);

      // prevent links
      this.document.removeEventListener("click", this.preventDefaultBinded, true);

      // cleanup
      this.rszDom.unprepare(this.document.documentElement);
    }

    // reset selection
    this.rszSelection.reset(this.document);

    // store for later use
    this.document = doc;

    // update selection mode
    this.setSelectionMode(this.selectionMode);

    // add the mouse events
    this.document.addEventListener('mouseup', this.onMouseUpBinded, true);
    this.document.addEventListener('mousedown', this.onMouseDownBinded);
    this.document.addEventListener('mousemove', this.onMouseMoveBinded);

    // prevent links
    this.document.addEventListener("click", this.preventDefaultBinded, true);

    // prepare for edit
    this.rszDom.prepare(this.document.documentElement);
  }


  /**
   * selection mode
   * @param {boolean} activated
   * @export
   */
  setSelectionMode(activated) {
    this.selectionMode = activated;
  }


  /**
   * resize mode
   * @param {boolean} activated
   * @export
   */
  setResizeMode(activated) {
    this.resizeMode = activated;
  }


  /**
   * get the best element to be selected
   * i.e. the elements under the cursor, with the filter applied
   * @param {Element} target
   * @return {Element}
   * @export
   */
  getBestElement(target) {
    /** @type {Element} */
    let best = target;
    // loop while we have no siblings
    while(best && this.selectFilter && !this.selectFilter(best)) {
      best = /** @type {Element} */ (best.parentNode);
    }
    return best || target;
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
   * Add a style element to the stage
   * This element will be added again after setHtml is called
   * This element will be removed before getHtml returns the html
   * @param {string} url
   * @export
   */
  addTempStyle(url) {
    var element = document.createElement('link');
    element.setAttribute('rel', 'stylesheet');
    element.setAttribute('type', 'text/css');
    element.setAttribute('href', url);
    this.rszDom.addTempElement(this.document, element);
  }


  /**
   * Add a script element to the stage
   * This element will be added again after setHtml is called
   * This element will be removed before getHtml returns the html
   * @param {string} url
   * @export
   */
  addTempScript(url) {
    var element = document.createElement('script');
    element.setAttribute('type', 'text/javascript');
    element.setAttribute('src', url);
    this.rszDom.addTempElement(this.document, element);
  }


  /**
   * prevent click
   */
  preventDefault(e) {
    if (this.selectionMode || this.resizeMode) {
      // prevent default behaviour
      e.stopPropagation();
      e.preventDefault();
    }
  }


  /**
   * callback for mouse events
   * @param {Event} e
   */
  onMouseUp(e) {
    if (this.document) {
      /** @type {Element} */
      let bestElement = this.getBestElement(/** @type {Element} */ (e.target));

      // handle selection
      if (this.selectionMode) {
        var selectionChanged = this.rszSelection.onMouseUp(
          this.document,
          this.getBestElement(/** @type {Element} */ (e.target)),
          e.clientX,
          e.clientY,
          e.shiftKey
        );
        if (selectionChanged && this.onSelect) {
          this.onSelect();
        }
      }

      // handle resize
      if (this.resizeMode) {
        var sizeChanged = this.rszResize.onMouseUp(
          this.document,
          bestElement,
          e.clientX,
          e.clientY,
          e.shiftKey
        );
        if(this.onResized && sizeChanged) {
          this.onResized();
        }
      }
    }
  }


  /**
   * callback for mouse events
   * @param {Event} e
   */
  onMouseDown(e) {
    if (this.document) {
      /** @type {Element} */
      let bestElement = this.getBestElement(/** @type {Element} */ (e.target));
      // handle selection
      if (this.selectionMode) {
        this.rszSelection.onMouseDown(
          this.document,
          bestElement,
          e.clientX,
          e.clientY,
          e.shiftKey
        );
      }
      // handle resize
      if (this.resizeMode) {
        this.rszResize.onMouseDown(
          this.document,
          bestElement,
          e.clientX,
          e.clientY,
          e.shiftKey
        );
      }
    }
  }


  /**
   * callback for mouse events
   * @param {Event} e
   */
  onMouseMove(e) {
    if (this.document) {
      let hasChanged = false;

      /** @type {Element} */
      let bestElement = this.getBestElement(/** @type {Element} */ (e.target));
      // handle selection
      if (this.selectionMode) {
        hasChanged = hasChanged || this.rszSelection.onMouseMove(
          this.document,
          bestElement,
          e.clientX,
          e.clientY,
          e.shiftKey
        );
      }
      // handle resize
      if (this.resizeMode) {
        hasChanged = hasChanged || this.rszResize.onMouseMove(
          this.document,
          bestElement,
          e.clientX,
          e.clientY,
          e.shiftKey,
          this.filterBoundingBox
        );
      }
      if(hasChanged) {
        this.preventDefault(e);
      }
    }
  }


  /**
   * handle selection
   * @return {Array.<Element>}
   * @export
   */
  getSelected() {
    return this.rszSelection.getSelected(this.document);
  }
  
  /**
   * handle selection
   * @param {Element} node
   * @export
   */
  setSelected( node ) {
    return this.rszSelection.select(node, this.document);
  }
}

