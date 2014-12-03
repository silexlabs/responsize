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
<script src="bower_components/responsize/dist/responsize.js">
<link rel="bower_components/resonsize/dist/responsize.css" rel="stylesheet">
```

Use Responsize components in your app

```js
var stage = new rsz.Stage(element.querySelector('#stage'));
stage.setSize(1920, 1024); // this will set the iframe size to 1920x1024 but display it in the #stage element - using css3 transform to fit the #stage element.
stage.setUrl('http://www.silexlabs.org').then(function(doc){
  // loaded, with doc set to the document of the iframe
});
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


