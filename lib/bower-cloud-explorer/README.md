## About

This is a compiled "bowered" version of [Cloud Explorer](http://cloud-explorer.org/). You will find complete instructions for it use in the readme](https://github.com/silexlabs/cloud-explorer).

Note that you have to have a [unifile server](https://github.com/silexlabs/unifile) instance runing somewhere.

![Cloud Explorer UI](https://camo.githubusercontent.com/00555346e8d2156198ae7ddeb6589c690df0dcc0/68747470733a2f2f7261772e6769746875622e636f6d2f73696c65786c6162732f636c6f75642d6578706c6f7265722f6d61737465722f73637265656e73686f7430332e706e67)

## Install

```
$ bower install bower-cloud-explorer
```

## Use

The html page. Note that you have to have a [unifile server](https://github.com/silexlabs/unifile) instance runing somewhere.

```html
<!DOCTYPE html>
<html>
    <head>
      <title>My project</title>
      <script src="bower_components/bower-cloud-explorer/app/scripts/cloud-explorer.js"></script>
    </head>
    <body>
      <iframe id="ce-js"
        frameborder="no" 
        scrolling="no"
        allowfullscreen="yes"
        data-ce-unifile-url="http://cloud-explorer.herokuapp.com/api/1.0/">
    </body>
</html>
```