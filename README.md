# About Responsize

Copyright Silex Labs 2014. Licensed under the MIT license.

Responsize can be used as an online tool, like the [Responsize app hosted by Silex Labs](http://app.responsize.org/). See the instructions bellow to host an instance on your servers.

Responsize can be used as a library, providing app developers with the individual components used in Responsize, such as the resizeable Stage component.

# Use as a library

Install with bower

```sh
$ bower install responsize
```

Link the js and css files in your app

```html

<!-- somewhere in your head tag -->
<script src="bower_components/responsize/dist/responsize.js">
<link rel="bower_components/resonsize/dist/responsize.css" rel="stylesheet">

<!-- somewhere in your body tag -->
<div id="stage">
  <iframe></iframe>
</div>
```

Use Responsize components in your app

```js
var stage = new rsz.Stage(element.querySelector('#stage'));

// load a website in the stage, beware of the cross site scripting,
// security has to be met here
// or you can load the HTML content with an ajax call
// and then use stage.setHtml() to set the iframe HTML content
// (note: use the HTML <base> tag if needed to make sure the relative paths are loaded correctly)
stage.setUrl('http://www.silexlabs.org').then(function(doc){
  // here, the website is loaded,
  // and the param `doc` is set to the iframe's document

  // if you use the Wysiwyg class along with the Stage class
  // you need to update the container to which to appy the Wysiwyg feature
  wysiwyg.setDocument(doc);
});

// set the stage size to 1920x1024
// if your screen is smaller than that,
// Resonsize will load it with the desired size
// and then scale it using css3 transform, to fit the #stage element.
// you could simply let the stage auto size to loaded content: do not call Stage::setSize
// or set stage.autoSize to true before calling stage.setUrl
stage.setSize(1920, 1024);

// add WYSIWYG feature (optional)
var wysiwyg = new Wysiwyg();

// skin the selection marker and more
wysiwyg.addTempStyle(window.location.href + '/css/wysiwyg-skin.css');

// activate the mode where the user clicks are used to select elements
wysiwyg.setSelectionMode(true);

// optional: you can provide a function
// to determine if the element can be selected by the user
wysiwyg.setSelectFilter(function(element) {
  return element.classList.has('my-selectable-css-class');
});

// provide a callback in order to be notified when the user has selected an element
wysiwyg.setOnSelect(function() {
  // retrieve the selected elements
  var selection = wysiwyg.getSelected();
  console.log('Selected elements: ', selection);
});

```

To remove the useless css classes and elements used during edition, use ```wysiwyg.getCleanHtml();```

# Installation of the online tool

Requirements

* [node.js](http://nodejs.org/) installed
* [NPM](https://npmjs.org/) installed
* [python](https://www.python.org/downloads/) (version > V2.7)
* [java](https://www.java.com/en/download/index.jsp) (version > 7)
* grunt

```
$ npm install
$ bower install
$ grunt build
$ node unifile-server.js
```

# Develop

```
$ node unifile-server.js
$ grunt watch
```

Then open a browser at http://0.0.0.0:6969

# Philosophy

Responsize has a goal: allow web designers to be more efficient at handling responsiveness.

The user opens an HTML page and manage [bootstrap css classes](http://getbootstrap.com/) or [Simple Grid ones](https://github.com/ThisIsDallas/Simple-Grid] for example. And also hides or shows elements depending on the window size, or goup them into a [hamburger menu](http://www.designfloat.com/blog/2013/09/09/hamburger-menu-prominent-ui-evolution/).

> ResponSize is an amazing tool that enables the user to generate a responsive style sheet for a website. ResponSize can help you to have an optimal viewing experience for your website!

Unlike [bootstrap builders](http://bootstrapbay.com/blog/bootstrap-editors/), Responsize does not let the user add elements or edit content. But it goes along with other free tools:

* [silex](http://www.silex.me): edit design
* [backnode](http://backnode.io): edit content
* [responsize](http://responsize.org): handle responsiveness



