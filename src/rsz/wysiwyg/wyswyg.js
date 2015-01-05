goog.provide('rsz.Wysiwyg');

goog.require('rsz.wysiwyg.RszSelection');

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
     * selection mode on/off
     * @type {boolean}
     */
    this.selectionMode = false;


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
     * prevent click on links
     */
    this.preventClickBinded = this.perventClick.bind(this);


    /**
     * selection component
     * @type {RszSelection|null}
     */
    this.selection = new RszSelection();


    /**
     * Dm component
     * @type {RszDom}
     */
    this.dom = new RszDom();
  }


  /**
   * callback to be notified when selection changes
   * use getSelected() to retrive the selection
   * @param {function()|null} onSelect
   * @export
   */
  setOnSelect(onSelect) {
    return this.selection.onSelect = onSelect;
  }


  /**
   * callback to be notified when selection changes
   * use getSelected() to retrive the selection
   * @return {function()|null}
   * @export
   */
  getOnSelect() {
    return this.selection.onSelect;
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
    this.dom.unprepare(doc);
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
      this.document.removeEventListener("click", this.preventClickBinded, true);

      // cleanup
      this.dom.unprepare(this.document.documentElement);
    }

    // reset selection
    this.selection.reset(this.document);

    // store for later use
    this.document = doc;

    // update selection mode
    this.setSelectionMode(this.selectionMode);

    // add the mouse events
    this.document.addEventListener('mouseup', this.onMouseUpBinded, true);
    this.document.addEventListener('mousedown', this.onMouseDownBinded);
    this.document.addEventListener('mousemove', this.onMouseMoveBinded);

    // prevent links
    this.document.addEventListener("click", this.preventClickBinded, true);

    // prepare for edit
    this.dom.prepare(this.document.documentElement);
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
    this.dom.addTempElement(this.document, element);
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
    this.dom.addTempElement(this.document, element);
  }


  /**
   * prevent click
   */
  perventClick(e) {
    if (this.selectionMode) {
      // prevent default behaviour
      e.stopPropagation();
      e.preventDefault();
    }
  }


  /**
   * callback for mouse events
   * @param {Event} e
   */
  onMouseUpCallback(e) {
    if (this.selectionMode && this.document) {
      var selectionChanged = this.selection.onMouseUp(
        this.document,
        this.getBestElement(/** @type {Element} */ (e.target)),
        e.clientX,
        e.clientY,
        e.shiftKey
      );
      if (selectionChanged && this.onSelect) {
        this.onSelect();
      }
      // prevent default behaviour
      e.preventDefault();
    }
  }


  /**
   * callback for mouse events
   * @param {Event} e
   */
  onMouseDownCallback(e) {
    if (this.selectionMode && this.document) {
      this.selection.onMouseDown(
        this.document,
        this.getBestElement(/** @type {Element} */ (e.target)),
        e.clientX,
        e.clientY,
        e.shiftKey
      )
      e.preventDefault();
    }
  }


  /**
   * callback for mouse events
   * @param {Event} e
   */
  onMouseMoveCallback(e) {
    if (this.selectionMode && this.document) {
      this.selection.onMouseMove(
        this.document,
        this.getBestElement(/** @type {Element} */ (e.target)),
        e.clientX,
        e.clientY,
        e.shiftKey
      )
      e.preventDefault();
    }
  }


  /**
   * handle selection
   * @return {Array.<Element>}
   * @export
   */
  getSelected() {
    return this.selection.getSelected(this.document);
  }
}

