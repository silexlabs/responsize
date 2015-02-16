utiliser responsize uniquement pour visualiser les sites silex et BN?

technique de wix = viewport avec taille fixe

conversion site silex d'absolute à positionné
$('.editable-style.text-element, .editable-style.text-element .silex-element-content').each(function(){
    this.style.height = 'auto';
})
$('.editable-style').each(function(){
    this.style.display = 'inline-block';
    var x =  $(this).offset().left;
    var y =  $(this).offset().top;
    $(this).css({position: 'relative'});
    $(this).offset({ top: y, left: x });
})


tests lex
    viewport wix :
    <meta name="viewport" content="width=320, user-scalable=no, maximum-scale=2.2">

    .editable-style{
      max-width: 100%;
    }
    .editable-style .silex-element-content{
      max-width: 100%;
    }
    .normal{
      max-width: 100%;
    }
    body {
      width: 320px;
    }
    img{ /* ancienne version silex */
      width: inherit !important;
      height: inherit !important;
    }


http://www.catswhocode.com/blog/making-a-website-responsive-in-3-easy-steps
http://webdesignerwall.com/tutorials/responsive-design-in-3-steps
http://webdesignerwall.com/tutorials/5-useful-css-tricks-for-responsive-design


Sites silex en responsive, dans responsize ou dans silex?
- reorder dom
- height => min-height
- flow: left
- clear: both

## en cours


pouvoir désigner les rows (mode ou on peut tout select + fil d ariane, et avec un sous menu avec case a cocher "si horizontal row")
addBootstrapCols before preventAbsoluteLayout?
drag/drop offset

to do responsize App

* custom css for the current width
* row on/off
* col on/off
* container on/off
* step by step importer

  * [absolute websites only] reorder dom
  * [absolute websites only] convert layout to absolute (starting from a screen width)
  * [non bootstrap] add bootstrap scripts and styles
  * [non bootstrap] add bootstrap rows
  * [non bootstrap] add bootstrap col-*-* (at given screen widths)
    should be recursive, take container width, not window width
  * handle changes on already imported sites

* font sizes +/-
* open CE at start
* allow only html page for CE
* x resize with bootstrap classes
* move with bootstrap classes (offset) and then move in the dom

Stage, to be added

* x prevent links
* prevent scripts but not bootstrap
* Disable horizontal scrolling for Back page on Mac OS

Wysiwyg to be added

* unselect when escape key or click on the container or outside
* handle mouse move and mouse up over the UI / outside the iframe
* add / remove elements (show / hide in case of bootstrap)
* drag / drop (dragDropMode: positioned/absolute)
* x resize

Readme

* use wysiwyg and stage separately
* document full APIs

Other components

* undo redo

## todo responsize

* responsize as bootstrap editor
  * display the cols of selected element + resize with mouse, same for offset, same for gutter size
  * show / hide selection for the given size
  * ?move in the DOM with drag/drop?
* catch all links
* add bootstrap script
* save
* in silex: apply magic script / export for responsize

## ideas

### Editable

Helper class used to combine the Stage class with other classes such as Selection, Drag and Resize.

* methods to enable a functionality: enable/disableSelection(selectionFilter), enable/disableDrag(dropFilter), enable/disableResize()
* events or callbacks: onSelection, onDrag, onDrop, onResize
* other methods:
  * set/getTempStyle(url)
  * set/getTempScript(url)
  * set/getHtml

### Stage

Display a website in an iframe and apply CSS transforms to display it at a given viewport's size, in a given container's size.

* set/getHtml
* set/getViewportSize
* set/getContainer (for size)

### Selection

* addTempTag = add tags in the iframe which will be removed before returnin the html in getHtml and added each time you call setHtml
* onSelect
* cleanup(element)


