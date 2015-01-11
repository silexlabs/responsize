goog.provide('rsz.Responsizer');


/**
 * @class
 */
class Responsizer {
  /**
   * @constructor
   */
  constructor() {
    /**
     * gutter size
     * @type {number}
     */
    this.gutter = 30;
  }


  /**
   * add responsize styles to the iframe dom
   * convert silex website to responsive
   * add bootstrap when needed
   * @param {HTMLDocument} doc
   * @param {number} windowWidth
   */
  importSilex(doc, windowWidth){
    // absolute websites only
    var generator = doc.querySelector('meta[content~=Silex]');
    if (generator) {
      this.reorderDom(doc);
      this.preventAbsoluteLayout(doc);
    }
    // non bootstrap websites only
    this.addBootstrapImports(doc);
    this.addBootstrapContainer(doc.body);
    this.addBootstrapRows(doc.body);
    this.addBootstrapCols(doc.body);
  }


  /**
   * reorder the DOM of an absolute positioned website
   * compute each position of each element
   * the higher position in the page, the higher in the DOM
   * this is a recursive method, which sorts all children before sorting their children
   * @param {HTMLDocument} doc
   * @param {?Element=} opt_container
   */
  reorderDom(doc, opt_container){
    // default container is body
    if (!opt_container) {
      opt_container = doc.body;
    }
    // build an element array from the child nodes
    let elements = [];
    for (let idx in opt_container.childNodes) {
      if (opt_container.childNodes[idx].nodeType === 1) {
        elements.push({
          el: opt_container.childNodes[idx],
          rect: opt_container.childNodes[idx].getBoundingClientRect()
        });
      }
    }
    // init loop vars
    let length = elements.length;
    let changed = false;
    // sort until there is nothing left to sort in this container
    do {
      changed = false;
      let idx=0;
      // compare the current element with the previous one
      while (++idx < length && changed === false) {
        // store useful references
        let currentElement = elements[idx].el;
        let prevElement = elements[idx-1].el;
        let currentRect = elements[idx].rect;
        let prevRect = elements[idx-1].rect;

        // compute useful positionning data
        let isCurrentOnTop = prevRect.top > currentRect.bottom;
        let doOverlapVertically = (prevRect.top > currentRect.top && prevRect.top < currentRect.bottom)
          || (prevRect.top < currentRect.top && prevRect.bottom > currentRect.top);
        let isCurrentOnLeft = prevRect.left > currentRect.right;

        // do the comparison and check if the order is right
        if(isCurrentOnTop || (doOverlapVertically && isCurrentOnLeft)) {
          console.log('swap', currentRect, prevRect);
          // swap positions
          opt_container.insertBefore(currentElement, prevElement);
          let tmp = elements[idx-1];
          elements[idx-1] = elements[idx];
          elements[idx] = tmp;
          // update flag
          changed = true;
        }
      }
    } while (changed === true);

    // recursive sort of all children
    for(let idx in elements) {
      if(elements[idx].el.childNodes.length > 0) {
        this.reorderDom(doc, elements[idx].el);
      }
    }
  }


  /**
   *
   * @param {HTMLDocument} doc
   */
  preventAbsoluteLayout(doc) {
    let style = doc.querySelector('head style#responsize-style');
    console.log('importSilex', style);
    if(style === null) {
      let style = doc.createElement('style');
      style.innerHTML = '\
        @media (max-width: 1024px) {\
          .bg{\
            opacity: 1 !important;\
          }\
          body, .container .editable-style{\
            position: relative;\
            max-width: 100%;\
            top: auto;\
            left: auto;\
            height: auto;\
            top: initial;\
            left: initial;\
            height: initial;\
            padding: 0;\
          }\
          .container .editable-style::before{\
            content: "\\00A0";\
          }\
          .container .editable-style .silex-element-content{\
            height: auto !important;\
            height: initial !important;\
          }\
          body {\
            width: 100% !important;\
          }\
        }\
      ';
      style.id = 'responsize-style';
      doc.head.appendChild(style);
    }
  }


  /**
   * add bootstrap class 'container' on the body
   * @param {Element} container
   */
  addBootstrapContainer(container){
    container.classList.add('container');
  }


  /**
   * add bootstrap class 'row'
   * on the elements which have .container-element class
   * @param {Element} container
   */
  addBootstrapRows(container){
    let rows = container.querySelectorAll('.container-element');
    console.log('addBootstrapContainer', rows);
    for(let idx=0; idx<rows.length; idx++) {
      let element = rows[idx];
      element.classList.add('row');
    }
  }


  /**
   * add bootstrap class cols-*-*
   * on the elements which are in .row containers
   * depending on the container width and initial width of the element
   * @param {Element} container
   */
  addBootstrapCols(container){
    // browse all rows
    let rows = container.querySelectorAll('.row');
    console.log('addBootstrapCols', rows);
    for(let idx=0; idx<rows.length; idx++) {
      let row = rows[idx];

      // compute container width
      let rowRect = row.getBoundingClientRect();
      let rowWidth = rowRect.right - rowRect.left - (this.gutter * 2);
      let rowLeft = rowRect.left - this.gutter;
      let colWidth = Math.round(rowWidth / 12);

      // make an array of the elements to resize
      let elements = [];
      for(let idx=0; idx<row.childNodes.length; idx++) {
        let element = row.childNodes[idx];
        if(element.nodeType === 1) {
          // compute the element width and left offset
          let elementRect = element.getBoundingClientRect();
          let width = elementRect.right - elementRect.left;
          let left = elementRect.left - rowLeft;

          // compute the width and left offset in term of columns
          let widthCol = Math.max(1, Math.round(width / colWidth));
          widthCol = Math.min(12, widthCol);
          let leftCol = Math.max(0, Math.round(left / colWidth));
          leftCol = Math.min(11, leftCol);

          // store the element
          elements.push({
              element: element,
              widthCol: widthCol,
              leftCol: leftCol
          });
        }
      }
      // set position and size of each element
      let sumWidth = {
        md: 0,
        sm: 0,
        xs: 0
      };
try {
      for(let idx in elements){
        let elementObj = elements[idx];

        // handle width
        let md = elementObj.widthCol;
        let sm = Math.min(12, elementObj.widthCol*2);
        let xs = Math.min(12, elementObj.widthCol*4);
        elementObj.element.classList.add('col-md-' + md);
        elementObj.element.classList.add('col-sm-' + sm);
        elementObj.element.classList.add('col-xs-' + xs);

        // handle offset
        let mdOffset = Math.max(0, Math.min(11, elementObj.leftCol - (sumWidth.md % 12)));
        let smOffset = Math.max(0, Math.min(11, Math.round((elementObj.leftCol - (sumWidth.sm % 12))/2)));
        let xsOffset = Math.max(0, Math.min(11, Math.round((elementObj.leftCol - (sumWidth.xs % 12))/4)));
        elementObj.element.classList.add('col-md-offset-' + mdOffset);
        elementObj.element.classList.add('col-sm-offset-' + smOffset);
        elementObj.element.classList.add('col-xs-offset-' + xsOffset);

        // update width count
        sumWidth.md += md + mdOffset;
        sumWidth.sm += sm + smOffset;
        sumWidth.xs += xs + xsOffset;
      }
}
catch(e){
  console.log('Error', e);
}
    }
  }


  /**
   * add bootstrap css and js when needed
   * @param {HTMLDocument} doc
   */
  addBootstrapImports(doc) {
    // add bootstrap CSS
    let bootstrapCss = doc.querySelector('link[href*=bootstrap]');
    if(bootstrapCss === null) {
      console.log('addBootstrapImports add style');
      let link = doc.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css';
      link.media="(max-width: 1024px)";
      doc.head.appendChild(link);
    }

    // add bootstrap JS
    let bootstrapJs = doc.querySelector('script[src*=bootstrap]');
    if(bootstrapJs === null) {
      console.log('addBootstrapImports add script');
      let script = doc.createElement('script');
      script.src = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js';
      doc.head.appendChild(script);
    }
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
   * remove bootstrap classes from the element
   * @param {Element} element
   * @param {number} containerWidth
   */
  clearFormatting(element, containerWidth) {
    // retrieve bootstrap prefix for the given width
    let prefix = this.getPrefix(containerWidth);

    // remove all bootstrap classes for the given screen size
    for (let idx=1; idx<=12; idx++) {
      element.classList.remove(prefix + idx);
    }
  }


  /**
   * @param {number} containerWidth
   * @returns {string} the bootstrap prefix corresponding to the containerWidth
   */
  getPrefix(containerWidth) {
    // compute bootstrap prefix
    let prefix = 'col-xs-';
    if(containerWidth >= 1200) {
      prefix = 'col-lg-';
    }
    else if(containerWidth >= 992) {
      prefix = 'col-md-';
    }
    else if(containerWidth >= 768) {
      prefix = 'col-sm-';
    }
    return prefix;
  }

  /**
   * set a size to an element using bootstrap classes
   * @param {Element} element
   * @param {number} width
   * @param {number} containerWidth
   */
  setWidth(element, width, containerWidth) {
    // get the container bounding box
    let parentRect = element.parentNode.getBoundingClientRect();

    // compute the size of a column
    let totalWidth = parentRect.right - parentRect.left;
    let colWidth = Math.round(totalWidth / 12);

    // compute the width in term of columns
    let widthCol = Math.max(1, Math.round(width / colWidth));
    widthCol = Math.min(12, widthCol);

    // remove all bootstrap classes for the given screen size
    this.clearFormatting(element, containerWidth);

    // retrieve bootstrap prefix for the given width
    let prefix = this.getPrefix(containerWidth);

    // apply the new bootstrap class
    element.classList.add(prefix + widthCol);
  }
}

