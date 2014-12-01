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
   * init the iframe dom with responsize styles
   */
  init(doc){
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
}

