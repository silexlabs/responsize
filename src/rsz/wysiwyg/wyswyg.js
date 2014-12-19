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
     * css style sheet url, which will be loaded in the iframe (and reloaded after setContainer)
     * This style sheet should handle the css classes of Responsize e.g. .rsz-selected
     * @type {string|null} url
     */
    this.styleUrl = null;


    /**
     * @type {Element|null}
     * the current container
     */
    this.container = null;


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
    this.preventClickBinded = this.onMouseUpCallback.bind(this);

  
    /**
     * selection component
     * @type {RszSelection|null}
     */
    this.selection = new RszSelection();
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
   * Set/get the css style sheet url, which will be loaded in the iframe (and reloaded after setContainer)
   * This style sheet should handle the css classes of Responsize e.g. .rsz-selected
   * @param {string|null} url
   * @export
   */
  setStyleUrl(url) {
    // store the value
    this.styleUrl = url;
    // load the style sheet in the iframe
    if (this.container) {
      var tag = this.container.querySelector('#rsz-stylesheet');
      if(!url) {
        if (tag) {
          this.container.removeChild(tag);
        }
      }
      else {
        if(!tag) {
          // create a new tag if needed
          tag = document.createElement('link');
          tag.setAttribute('rel', 'stylesheet');
          tag.setAttribute('type', 'text/css');
          tag.setAttribute('id', 'rsz-stylesheet');
          // insert the tag
          if(this.container.firstChild) {
            this.container.insertBefore(tag, this.container.firstChild);
          }
          else {
            this.container.appendChild(tag);
          }
        }
        // update the href attribute
        tag.setAttribute('href', url);
      }
    }
  }


  /**
   * Set/get the css style sheet url, which will be loaded in the iframe (and reloaded after setContainer)
   * This style sheet should handle the css classes of Responsize e.g. .rsz-selected
   * @return {string|null} url of the current style sheet
   * @export
   */
  getStyleUrl() {
    return this.styleUrl;
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
      // prevent links
      let doc = element.ownerDocument;
      let anchors = doc.getElementsByTagName("a");
      for (let i = 0; i < anchors.length ; i++) {
        anchors[i].removeEventListener("click", this.preventClickBinded);
      }
    }

    // reset selection
    this.selection.reset(this.container);

    // store for later use
    this.container = element;

    // update selection mode
    this.setSelectionMode(this.selectionMode);

    // add the mouse events
    this.container.addEventListener('mouseup', this.onMouseUpBinded, true);
    this.container.addEventListener('mousedown', this.onMouseDownBinded);
    this.container.addEventListener('mousemove', this.onMouseMoveBinded);

    // prevent links
    let doc = element.ownerDocument;
    let anchors = doc.getElementsByTagName("a");
    for (let i = 0; i < anchors.length ; i++) {
      anchors[i].addEventListener("click", this.preventClickBinded);
    }

    // load style for the new container
    this.setStyleUrl(this.styleUrl);
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
   * callback for mouse events
   * @param {Event} e
   * @return {boolean}
   */
  onMouseUpCallback(e) {
    if (this.selectionMode && this.container) {
      var selectionChanged = this.selection.onMouseUp(
        this.container,
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
      return false;
    }
    return true;
  }


  /**
   * callback for mouse events
   * @param {Event} e
   * @return {boolean}
   */
  onMouseDownCallback(e) {
    if (this.selectionMode && this.container) {
      this.selection.onMouseDown(
        this.container,
        this.getBestElement(/** @type {Element} */ (e.target)),
        e.clientX,
        e.clientY,
        e.shiftKey
      )
      e.preventDefault();
      return false;
    }
    return true;
  }


  /**
   * callback for mouse events
   * @param {Event} e
   * @return {boolean}
   */
  onMouseMoveCallback(e) {
    if (this.selectionMode && this.container) {
      this.selection.onMouseMove(
        this.container,
        this.getBestElement(/** @type {Element} */ (e.target)),
        e.clientX,
        e.clientY,
        e.shiftKey
      )
      e.preventDefault();
      return false;
    }
    return true;
  }


  /**
   * handle selection
   * @return {Array.<Element>}
   * @export
   */
  getSelected() {
    return this.selection.getSelected(this.container);
  }
}

