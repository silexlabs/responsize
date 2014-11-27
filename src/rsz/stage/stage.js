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
     * the container for this component
     */
    this.element = element;
    /**
     * @type {HTMLIFrameElement}
     */
    this.iframe = /** @type {HTMLIFrameElement} */ (document.getElementById('iframe'));
  }
  /**
   * @param {string} url
   */
  setUrl(url) {
    this.iframe.src = url;
  }
}
