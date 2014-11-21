
/**
 * @class App
 * @struct
 */
class App extends Object{
  /**
   * @constructor
   */
  constructor(){
    console.log('App');
  }
  /**
   * load the file
   * @param {string} url
   */
  import(url){
    console.log('import', url);
  }
}


export default App;
