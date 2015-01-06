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
  convert(doc){
    /*
    // find the body
    let parent = element;
    while(parent && parent.parentNode && parent.tagName.toLowerCase() !== 'html') {
      parent = parent.parentNode;
    }
    if (parent && parent.tagName.toLowerCase() === 'html') {
      let style = parent.querySelector('head style#responsize-styles');
      console.log('init', parent, style);
      if(style === null) {
        document.
      }
    }
    */
    // FIXME: do this only for silex sites
    // and call this.responsize for each silex-editable element
    let style = doc.querySelector('head style#responsize-style');
    if(style === null) {
      let style = doc.createElement('style');
      style.innerHTML = '\
        .rsz-responsized, .rsz-responsized * {\
          position: relative !important;\
          max-width: 100% !important;\
          top: auto !important;\
          left: auto !important;\
          width: auto !important;\
          height: auto !important;\
          top: initial !important;\
          left: initial !important;\
          width: initial !important;\
          height: initial !important;\
          margin: 0 !important;\
          padding: 0 !important;\
        }\
      ';
      style.id = 'responsize-style';
      doc.head.appendChild(style);

      let link = doc.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css';
      doc.head.appendChild(link);

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
   * responsize an element
   * @param {Array.<Element>} elements
   */
  responsize(elements) {
    console.log('responsize', elements);
    // loop on the selection
    elements.forEach((element) => {
      element.classList.toggle('rsz-responsized');
    });
    var totalWidth = window.innerWidth;
    var colWidth = Math.round(totalWidth / 12);
    elements.forEach((container) => {
      var all = container.querySelectorAll('*');
      for(let idx=0; idx<all.length; idx++){
        let element = all[idx];
        console.log('aaa', element);
        if (this.hasSiblings(element)) {
          var numCol = Math.max(1, Math.round(element.offsetWidth / colWidth));
          element.classList.add('col-sm-' + numCol);
          element.classList.add('col-md-' + Math.max(1, Math.round(numCol/2)));
          element.classList.add('col-xs-' + Math.min(12, numCol*2));
        }
        console.log('bbb', element);
      }
    });
  }


  /**
   * set a size to an element using bootstrap classes
   * @param {Element} element
   * @param {number} width
   * @param {number} screenWidth
   */
  setWidth(element, width, screenWidth) {
    // get the container bounding box
    let parentRect = element.parentNode.getBoundingClientRect();

    // compute the size of a column
    var totalWidth = parentRect.right - parentRect.left;
    var colWidth = Math.round(totalWidth / 12);

    // compute the width in term of columns
    var numCol = Math.max(1, Math.round(width / colWidth));

    // compute bootstrap prefix
    let prefix = 'col-xs-';
    if(screenWidth > 1200) {
      prefix = 'col-lg-';
    }
    else if(screenWidth > 970) {
      prefix = 'col-md-';
    }
    else if(screenWidth > 750) {
      prefix = 'col-sm-';
    }

    // remove all bootstrap classes for the given screen size
    for (let idx=1; idx<=12; idx++) {
      element.classList.remove(prefix + idx);
    }

    // apply the new bootstrap class
    element.classList.add(prefix + numCol);
  }
}

