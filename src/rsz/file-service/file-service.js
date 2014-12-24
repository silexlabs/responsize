goog.provide('rsz.FileService');


/**
 * @class
 * @export
 * this is a service to load and save files
 * it uses cloud explorer as a UI to do that
 */
class FileService {
  /**
   * @constructor
   */
  constructor() {
    /**
     * @type {Object.<*>}
     * the cloud explorer instance
     */
    this.cloudExplorer = window.ce.api.CloudExplorer.get("ce-js");
    /**
     * @type {string|null}
     * the current opened file
     */
    this.currentBlob = null;
  }


  /**
   * open a file
   * returns a promise
   * @return {Promise}
   * @export
   */
  open() {
    return new Promise((resolve, reject) => {
      this.cloudExplorer.pick(
        (blob) => {
          console.log("my Blob: " + JSON.stringify(blob));
          this.currentBlob = blob;
          resolve(blob.url);
        },
        (e) => {
          console.log("error " + JSON.stringify(e));
          reject(e);
        });
    });
  }


  /**
   * save a file
   * returns a promise
   * @param {string} html
   * @return {Promise}
   * @export
   */
  save(html) {
    return new Promise((resolve, reject) => {
      console.log('fileService save', html, this.currentBlob);
      this.cloudExplorer.write(this.currentBlob,
      html,
      (blob) => {
        console.log("my Blob: " + JSON.stringify(blob));
        this.currentBlob = blob;
        resolve(blob.url);
      },
      (e) => {
        console.log("error " + JSON.stringify(e));
        reject(e);
      });
    });
  }
}

