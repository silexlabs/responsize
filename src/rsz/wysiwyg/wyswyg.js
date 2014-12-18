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
     * callback to be notified when selection changes
     * use getSelected() to retrive the selection
     * @type {function()|null}
     */
    this.onSelect = null;


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

    // reset mouse
    this.isDown = false;

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
        // reset all candidates
        var candidates = this.container.querySelectorAll('.rsz-select-candidate');
        for (let idx=0; idx<candidates.length; idx++) {
          candidates[idx].classList.remove('rsz-select-candidate');
        }
        
        // reset the container
        this.container.classList.remove('rsz-select-candidate');
        
        // new candidate
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
        // handle multiple selection
        if (!isShift) {
          this.getSelected().forEach((element) => {
            if (element != target) this.unSelect(element, false)
          });
        }
        // select the element
        this.select(target);
      }
    }
  }


  /**
   * handle selection
   * @return {Array.<Element>}
   * @export
   */
  getSelected() {
    // retrieve the selected elements
    let nodeList = this.container.querySelectorAll('.rsz-selected');
    
    // convert to array
    let selected = [];
    for (let idx=0; idx<nodeList.length; idx++) {
      let element = nodeList[idx];
      selected.push(element);
    }
    // handle the container
    if(this.container.classList.contains('.rsz-selected')) {
      selected.push(this.container);
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

