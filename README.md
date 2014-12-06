# About Responsize

Copyright Silex Labs 2014. Licensed under the MIT license.

ResponSize is an amazing tool that enables the user to generate a responsive style sheet for a website. ResponSize can help you to have an optimal viewing experience for your website!

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
stage.setUrl('http://www.silexlabs.org').then(function(doc){
  // here, the website is loaded,
  // and the param `doc` is set to the iframe's document

  // if you use the Wysiwyg class along with the Stage class
  // you need to update the container to which to appy the Wysiwyg feature
  wysiwyg.setContainer(doc.body);
});

// set the stage size to 1920x1024
// if your screen is smaller than that,
// Resonsize will load it with the desired size 
// and then scale it using css3 transform, to fit the #stage element.
stage.setSize(1920, 1024);

// add WYSIWYG feature (optional)
var wysiwyg = new Wysiwyg(element.querySelector('#stage'));

// activate the mode where the user clicks are used to select elements
wysiwyg.setSelectionMode(true);

// optional: you can provide a function
// to determine if the element can be selected by the user
wysiwyg.onBeforeSelect = function(element) {
  return element.classList.has('my-selectable-css-class');
};

// provide a callback in order to be notified when the user has selected an element
wysiwyg.onSelect = function() {
  // retrieve the selected elements
  var selection = wysiwyg.getSelected();
  console.log('Selected elements: ', selection);
}

```

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
```

# Develop

```
$ grunt serve
```

Then open a browser at http://0.0.0.0:6969


