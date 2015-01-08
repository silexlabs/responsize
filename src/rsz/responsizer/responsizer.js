goog.provide('rsz.Responsizer');


/**
 * @class
 */
class Responsizer {
  /**
   * @constructor
   */
  constructor() {
  }


  /**
   * add responsize styles to the iframe dom
   * convert silex website to responsive
   * add bootstrap when needed
   */
  importSilex(doc, windowWidth){
    var generator = doc.querySelector('meta[content~=Silex]');
    if (generator) {
      let style = doc.querySelector('head style#responsize-style');
      console.log('importSilex', style);
      if(style === null) {
        let link = doc.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css';
        link.media="(max-width: 1024px)";
        doc.head.appendChild(link);

        let script = doc.createElement('script');
        script.src = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js';
        doc.head.appendChild(script);

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
              margin: 0;\
              padding: 0;\
            }\
            .container .editable-style .silex-element-content{\
              height: auto !important;\
              height: initial !important;\
            }\
            .container .element-5, body, .container .element-6{\
              width: 100%;\
            }\
          }\
        '
        style.id = 'responsize-style';
        doc.head.appendChild(style);

        // compute the size of a column
        let colWidth = Math.round(windowWidth / 12);
        let elements = [];
        let editableElements = doc.querySelectorAll('.editable-style');
        for(let idx=0; idx<editableElements.length; idx++) {
          let element = editableElements[idx];
          // get the element bounding box
          let elementRect = element.getBoundingClientRect();

          // compute the element width
          let width = elementRect.right - elementRect.left;

          // get the container bounding box
          let parentRect = element.parentNode.getBoundingClientRect();

          // compute the width in term of columns
          let numCol = Math.max(1, Math.round(width / colWidth));
          numCol = Math.min(12, numCol);

          elements.push({
              element: element,
              numCol: numCol
          });
        }
        console.log('importSilex elements', elements);
        for(let idx in elements){
          let elementObj = elements[idx];
          if(!elementObj.element.classList.contains('background')) {
      /*
            elementObj.element.classList.add('col-xs-' + Math.max(1, Math.round(elementObj.numCol/4)));
            elementObj.element.classList.add('col-sm-' + Math.max(1, Math.round(elementObj.numCol/2)));
            elementObj.element.classList.add('col-md-' + Math.max(1, Math.round(elementObj.numCol)));
    */
  /*
            elementObj.element.classList.add('col-sm-' + elementObj.numCol);
            elementObj.element.classList.add('col-md-' + Math.max(1, Math.round(elementObj.numCol/2)));
            elementObj.element.classList.add('col-xs-' + Math.min(12, elementObj.numCol*2));
  */
            elementObj.element.classList.add('col-md-' + elementObj.numCol);
          }
          if(elementObj.element.classList.contains('container-element') &&
              elementObj.element.tagName.toLowerCase() !== 'body') {
            elementObj.element.classList.add('row');
          }
        }
        doc.body.classList.add('container');
      }
    }
    console.log('importSilex done', doc.body);
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
    let numCol = Math.max(1, Math.round(width / colWidth));
    numCol = Math.min(12, numCol);

    // remove all bootstrap classes for the given screen size
    this.clearFormatting(element, containerWidth);

    // retrieve bootstrap prefix for the given width
    let prefix = this.getPrefix(containerWidth);

    // apply the new bootstrap class
    element.classList.add(prefix + numCol);
  }
}

