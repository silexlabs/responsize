goog.provide('rsz.wysiwyg.RszDom');

/**
 * This class prepares/unprepare the dom for the wysiwyg class
 * It handles the cleanup of the dom before it can be saved
 *
 * @class
 * @export rsz.wysiwyg.RszDom
 */
class RszDom {
  /**
   * constructor
   */
  constructor() {
    /**
     * @type {Array.<Element>}
     */
    this.tempElements = [];


    /**
     * @type {number}
     */
    this.nextId = 0;
  }


  /**
   * unprepare the doc for editing
   * @param {Element} doc
   */
  unprepare(doc) {
    // add all temp tags
    this.tempElements.forEach((element) => {
      var clone = doc.querySelector('#' + element.id);
     clone.parentNode.removeChild(clone);
    });
    // remove css classes used to 
    let elements = doc.querySelectorAll('.rsz-select-candidate, .rsz-selected');
    for (let idx=0; idx<elements.length; idx++) {
      elements[idx].classList.remove('rsz-selected');
      elements[idx].classList.remove('rsz-select-candidate');
    }
  }


  /**
   * prepare the doc for editing
   * @param {Element} doc
   */
  prepare(doc) {
    // add all temp tags
    this.tempElements.forEach((element) => doc.querySelector('head').appendChild(element.cloneNode(true)));
  }


  /**
   * Add a DOM element to the stage
   * This element will be added again after setHtml is called
   * This element will be removed before getHtml returns the html
   * @param {HTMLDocument|null} doc
   * @param {Element} element
   * @export
   */
  addTempElement(doc, element) {
    // give it a unique id
    element.id = 'rsz-' + (this.nextId++);
    // store the element
    this.tempElements.push(element);
    // add it to the iframe
    if (doc) {
      doc.head.appendChild(element.cloneNode(true));
    }
  }
}
