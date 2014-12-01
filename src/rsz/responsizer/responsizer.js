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
    console.log('initDom', doc);
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
    console.log('init', style);
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
      }
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
  }
}

