
## Archi

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

## en cours

* add/removeTempTag dans stage au lieu de Wysiwyg::setStyleurl
* dom cleanup pour set/getHml

Stage, to be added

* Disable horizontal scrolling for Back page on Mac OS

Wysiwyg to be added

* unselect when escape key or click on the container or outside
* handle focus (invisible text field)?
* handle mouse move and mouse up over the UI / outside the iframe
* add / remove elements
* double click
* drag, drop, resize
* dragDropMode: positioned/absolute
* cleanup dom

Readme

* use wysiwyg and stage separately
* document full APIs

Other components

* copy paste
* undo redo


todo responsize

* responsize as bootstrap editor
  * display the cols of selected element + resize with mouse, same for offset, same for gutter size
  * show / hide selection for the given size
  * ?move in the DOM with drag/drop?
* catch all links
* add bootstrap script
* save
* in silex: apply magic script / export for responsize


