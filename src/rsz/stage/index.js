goog.provide('rsz.Stage');

/**
 * Stage class handles the website in the iframe
 * @class
 */
class Stage {
  /**
   * constructor
   * @param {Element} element in which to display the website
   */
  constructor(element) {
    /**
     * @type {HTMLIFrameElement}
     */
    this.iframe = /** @type {HTMLIFrameElement} */ (document.createElement('iframe'));
    element.appendChild(this.iframe);
  }
}
