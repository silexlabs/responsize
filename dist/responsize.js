var $jscomp={scope:{},IteratorResult:function(){},Iterator:function(){},Iterable:function(){}};$jscomp.Iterable.prototype.$$iterator=function(){};$jscomp.makeIterator=function(a){if(a.$$iterator)return a.$$iterator();if(!(a instanceof Array))throw Error();var b=0;return{next:function(){return b==a.length?{done:!0}:{done:!1,value:a[b++]}}}};$jscomp.copyProperties=function(a,b){for(var c in b)a[c]=b[c]};
$jscomp.inherits=function(a,b){function c(){}c.prototype=b.prototype;a.superClass_=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.base=function(a,c,f){var g=Array.prototype.slice.call(arguments,2);return b.prototype[c].apply(a,g)}};var COMPILED=!0,goog=goog||{};goog.global=this;goog.isDef=function(a){return void 0!==a};
goog.exportPath_=function(a,b,c){a=a.split(".");c=c||goog.global;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)!a.length&&goog.isDef(b)?c[d]=b:c=c[d]?c[d]:c[d]={}};
goog.define=function(a,b){var c=b;COMPILED||(goog.global.CLOSURE_UNCOMPILED_DEFINES&&Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES,a)?c=goog.global.CLOSURE_UNCOMPILED_DEFINES[a]:goog.global.CLOSURE_DEFINES&&Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES,a)&&(c=goog.global.CLOSURE_DEFINES[a]));goog.exportPath_(a,c)};goog.DEBUG=!0;goog.LOCALE="en";goog.TRUSTED_SITE=!0;goog.STRICT_MODE_COMPATIBLE=!1;
goog.provide=function(a){if(!COMPILED){if(goog.isProvided_(a))throw Error('Namespace "'+a+'" already declared.');delete goog.implicitNamespaces_[a];for(var b=a;(b=b.substring(0,b.lastIndexOf(".")))&&!goog.getObjectByName(b);)goog.implicitNamespaces_[b]=!0}goog.exportPath_(a)};
goog.module=function(a){if(!goog.isString(a)||!a)throw Error("Invalid module identifier");if(!goog.isInModuleLoader_())throw Error("Module "+a+" has been loaded incorrectly.");if(goog.moduleLoaderState_.moduleName)throw Error("goog.module may only be called once per module.");goog.moduleLoaderState_.moduleName=a;if(!COMPILED){if(goog.isProvided_(a))throw Error('Namespace "'+a+'" already declared.');delete goog.implicitNamespaces_[a]}};goog.module.get=function(a){return goog.module.getInternal_(a)};
goog.module.getInternal_=function(a){if(!COMPILED)return goog.isProvided_(a)?a in goog.loadedModules_?goog.loadedModules_[a]:goog.getObjectByName(a):null};goog.moduleLoaderState_=null;goog.isInModuleLoader_=function(){return null!=goog.moduleLoaderState_};goog.module.declareTestMethods=function(){if(!goog.isInModuleLoader_())throw Error("goog.module.declareTestMethods must be called from within a goog.module");goog.moduleLoaderState_.declareTestMethods=!0};
goog.setTestOnly=function(a){if(COMPILED&&!goog.DEBUG)throw a=a||"",Error("Importing test-only code into non-debug environment"+(a?": "+a:"."));};goog.forwardDeclare=function(a){};COMPILED||(goog.isProvided_=function(a){return a in goog.loadedModules_||!goog.implicitNamespaces_[a]&&goog.isDefAndNotNull(goog.getObjectByName(a))},goog.implicitNamespaces_={"goog.module":!0});
goog.getObjectByName=function(a,b){for(var c=a.split("."),d=b||goog.global,e;e=c.shift();)if(goog.isDefAndNotNull(d[e]))d=d[e];else return null;return d};goog.globalize=function(a,b){var c=b||goog.global,d;for(d in a)c[d]=a[d]};goog.addDependency=function(a,b,c,d){if(goog.DEPENDENCIES_ENABLED){var e;a=a.replace(/\\/g,"/");for(var f=goog.dependencies_,g=0;e=b[g];g++)f.nameToPath[e]=a,f.pathIsModule[a]=!!d;for(d=0;b=c[d];d++)a in f.requires||(f.requires[a]={}),f.requires[a][b]=!0}};
goog.ENABLE_DEBUG_LOADER=!0;goog.logToConsole_=function(a){goog.global.console&&goog.global.console.error(a)};goog.require=function(a){if(!COMPILED){if(goog.isProvided_(a))return goog.isInModuleLoader_()?goog.module.getInternal_(a):null;if(goog.ENABLE_DEBUG_LOADER){var b=goog.getPathFromDeps_(a);if(b)return goog.included_[b]=!0,goog.writeScripts_(),null}a="goog.require could not find: "+a;goog.logToConsole_(a);throw Error(a);}};goog.basePath="";goog.nullFunction=function(){};
goog.identityFunction=function(a,b){return a};goog.abstractMethod=function(){throw Error("unimplemented abstract method");};goog.addSingletonGetter=function(a){a.getInstance=function(){if(a.instance_)return a.instance_;goog.DEBUG&&(goog.instantiatedSingletons_[goog.instantiatedSingletons_.length]=a);return a.instance_=new a}};goog.instantiatedSingletons_=[];goog.LOAD_MODULE_USING_EVAL=!0;goog.SEAL_MODULE_EXPORTS=goog.DEBUG;goog.loadedModules_={};goog.DEPENDENCIES_ENABLED=!COMPILED&&goog.ENABLE_DEBUG_LOADER;
goog.DEPENDENCIES_ENABLED&&(goog.included_={},goog.dependencies_={pathIsModule:{},nameToPath:{},requires:{},visited:{},written:{}},goog.inHtmlDocument_=function(){var a=goog.global.document;return"undefined"!=typeof a&&"write"in a},goog.findBasePath_=function(){if(goog.global.CLOSURE_BASE_PATH)goog.basePath=goog.global.CLOSURE_BASE_PATH;else if(goog.inHtmlDocument_())for(var a=goog.global.document.getElementsByTagName("script"),b=a.length-1;0<=b;--b){var c=a[b].src,d=c.lastIndexOf("?"),d=-1==d?c.length:
d;if("base.js"==c.substr(d-7,7)){goog.basePath=c.substr(0,d-7);break}}},goog.importScript_=function(a,b){(goog.global.CLOSURE_IMPORT_SCRIPT||goog.writeScriptTag_)(a,b)&&(goog.dependencies_.written[a]=!0)},goog.IS_OLD_IE_=goog.global.document&&goog.global.document.all&&!goog.global.atob,goog.importModule_=function(a){goog.importScript_("",'goog.retrieveAndExecModule_("'+a+'");')&&(goog.dependencies_.written[a]=!0)},goog.queuedModules_=[],goog.retrieveAndExecModule_=function(a){var b=goog.global.CLOSURE_IMPORT_SCRIPT||
goog.writeScriptTag_,c=null,d=new goog.global.XMLHttpRequest;d.onload=function(){c=this.responseText};d.open("get",a,!1);d.send();c=d.responseText;if(null!=c)d=goog.wrapModule_(a,c),goog.IS_OLD_IE_?goog.queuedModules_.push(d):b(a,d),goog.dependencies_.written[a]=!0;else throw Error("load of "+a+"failed");},goog.wrapModule_=function(a,b){return goog.LOAD_MODULE_USING_EVAL&&goog.isDef(goog.global.JSON)?"goog.loadModule("+goog.global.JSON.stringify(b+"\n//# sourceURL="+a+"\n")+");":'goog.loadModule(function(exports) {"use strict";'+
b+"\n;return exports});\n//# sourceURL="+a+"\n"},goog.loadQueuedModules_=function(){var a=goog.queuedModules_.length;if(0<a){var b=goog.queuedModules_;goog.queuedModules_=[];for(var c=0;c<a;c++)goog.globalEval(b[c])}},goog.loadModule=function(a){try{goog.moduleLoaderState_={moduleName:void 0,declareTestMethods:!1};var b;if(goog.isFunction(a))b=a.call(goog.global,{});else if(goog.isString(a))b=goog.loadModuleFromSource_.call(goog.global,a);else throw Error("Invalid module definition");goog.SEAL_MODULE_EXPORTS&&
Object.seal&&Object.seal(b);var c=goog.moduleLoaderState_.moduleName;if(!goog.isString(c)||!c)throw Error('Invalid module name "'+c+'"');goog.loadedModules_[c]=b;if(goog.moduleLoaderState_.declareTestMethods)for(var d in b)if(0===d.indexOf("test",0)||"tearDown"==d||"setup"==d)goog.global[d]=b[d]}finally{goog.moduleLoaderState_=null}},goog.loadModuleFromSource_=function(a){eval(a);return{}},goog.writeScriptTag_=function(a,b){if(goog.inHtmlDocument_()){var c=goog.global.document;if("complete"==c.readyState){if(/\bdeps.js$/.test(a))return!1;
throw Error('Cannot write "'+a+'" after document load');}var d=goog.IS_OLD_IE_;void 0===b?d?(d=" onreadystatechange='goog.onScriptLoad_(this, "+ ++goog.lastNonModuleScriptIndex_+")' ",c.write('<script type="text/javascript" src="'+a+'"'+d+">\x3c/script>")):c.write('<script type="text/javascript" src="'+a+'">\x3c/script>'):c.write('<script type="text/javascript">'+b+"\x3c/script>");return!0}return!1},goog.lastNonModuleScriptIndex_=0,goog.onScriptLoad_=function(a,b){"complete"==a.readyState&&goog.lastNonModuleScriptIndex_==
b&&goog.loadQueuedModules_();return!0},goog.writeScripts_=function(){function a(e){if(!(e in d.written)){if(!(e in d.visited)&&(d.visited[e]=!0,e in d.requires))for(var f in d.requires[e])if(!goog.isProvided_(f))if(f in d.nameToPath)a(d.nameToPath[f]);else throw Error("Undefined nameToPath for "+f);e in c||(c[e]=!0,b.push(e))}}var b=[],c={},d=goog.dependencies_,e;for(e in goog.included_)d.written[e]||a(e);for(var f=0;f<b.length;f++)e=b[f],goog.dependencies_.written[e]=!0;var g=goog.moduleLoaderState_;
goog.moduleLoaderState_=null;for(f=0;f<b.length;f++)if(e=b[f])d.pathIsModule[e]?goog.importModule_(goog.basePath+e):goog.importScript_(goog.basePath+e);else throw goog.moduleLoaderState_=g,Error("Undefined script input");goog.moduleLoaderState_=g},goog.getPathFromDeps_=function(a){return a in goog.dependencies_.nameToPath?goog.dependencies_.nameToPath[a]:null},goog.findBasePath_(),goog.global.CLOSURE_NO_DEPS||goog.importScript_(goog.basePath+"deps.js"));
goog.typeOf=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b};goog.isNull=function(a){return null===a};goog.isDefAndNotNull=function(a){return null!=a};goog.isArray=function(a){return"array"==goog.typeOf(a)};goog.isArrayLike=function(a){var b=goog.typeOf(a);return"array"==b||"object"==b&&"number"==typeof a.length};goog.isDateLike=function(a){return goog.isObject(a)&&"function"==typeof a.getFullYear};goog.isString=function(a){return"string"==typeof a};
goog.isBoolean=function(a){return"boolean"==typeof a};goog.isNumber=function(a){return"number"==typeof a};goog.isFunction=function(a){return"function"==goog.typeOf(a)};goog.isObject=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b};goog.getUid=function(a){return a[goog.UID_PROPERTY_]||(a[goog.UID_PROPERTY_]=++goog.uidCounter_)};goog.hasUid=function(a){return!!a[goog.UID_PROPERTY_]};goog.removeUid=function(a){"removeAttribute"in a&&a.removeAttribute(goog.UID_PROPERTY_);try{delete a[goog.UID_PROPERTY_]}catch(b){}};
goog.UID_PROPERTY_="closure_uid_"+(1E9*Math.random()>>>0);goog.uidCounter_=0;goog.getHashCode=goog.getUid;goog.removeHashCode=goog.removeUid;goog.cloneObject=function(a){var b=goog.typeOf(a);if("object"==b||"array"==b){if(a.clone)return a.clone();var b="array"==b?[]:{},c;for(c in a)b[c]=goog.cloneObject(a[c]);return b}return a};goog.bindNative_=function(a,b,c){return a.call.apply(a.bind,arguments)};
goog.bindJs_=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}};goog.bind=function(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?goog.bind=goog.bindNative_:goog.bind=goog.bindJs_;return goog.bind.apply(null,arguments)};
goog.partial=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}};goog.mixin=function(a,b){for(var c in b)a[c]=b[c]};goog.now=goog.TRUSTED_SITE&&Date.now||function(){return+new Date};
goog.globalEval=function(a){if(goog.global.execScript)goog.global.execScript(a,"JavaScript");else if(goog.global.eval)if(null==goog.evalWorksForGlobals_&&(goog.global.eval("var _et_ = 1;"),"undefined"!=typeof goog.global._et_?(delete goog.global._et_,goog.evalWorksForGlobals_=!0):goog.evalWorksForGlobals_=!1),goog.evalWorksForGlobals_)goog.global.eval(a);else{var b=goog.global.document,c=b.createElement("script");c.type="text/javascript";c.defer=!1;c.appendChild(b.createTextNode(a));b.body.appendChild(c);
b.body.removeChild(c)}else throw Error("goog.globalEval not available");};goog.evalWorksForGlobals_=null;goog.getCssName=function(a,b){var c=function(a){return goog.cssNameMapping_[a]||a},d=function(a){a=a.split("-");for(var b=[],d=0;d<a.length;d++)b.push(c(a[d]));return b.join("-")},d=goog.cssNameMapping_?"BY_WHOLE"==goog.cssNameMappingStyle_?c:d:function(a){return a};return b?a+"-"+d(b):d(a)};goog.setCssNameMapping=function(a,b){goog.cssNameMapping_=a;goog.cssNameMappingStyle_=b};
!COMPILED&&goog.global.CLOSURE_CSS_NAME_MAPPING&&(goog.cssNameMapping_=goog.global.CLOSURE_CSS_NAME_MAPPING);goog.getMsg=function(a,b){b&&(a=a.replace(/\{\$([^}]+)}/g,function(a,d){return d in b?b[d]:a}));return a};goog.getMsgWithFallback=function(a,b){return a};goog.exportSymbol=function(a,b,c){goog.exportPath_(a,b,c)};goog.exportProperty=function(a,b,c){a[b]=c};
goog.inherits=function(a,b){function c(){}c.prototype=b.prototype;a.superClass_=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.base=function(a,c,f){var g=Array.prototype.slice.call(arguments,2);return b.prototype[c].apply(a,g)}};
goog.base=function(a,b,c){var d=arguments.callee.caller;if(goog.STRICT_MODE_COMPATIBLE||goog.DEBUG&&!d)throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");if(d.superClass_)return d.superClass_.constructor.apply(a,Array.prototype.slice.call(arguments,1));for(var e=Array.prototype.slice.call(arguments,2),f=!1,g=a.constructor;g;g=g.superClass_&&g.superClass_.constructor)if(g.prototype[b]===d)f=!0;else if(f)return g.prototype[b].apply(a,
e);if(a[b]===d)return a.constructor.prototype[b].apply(a,e);throw Error("goog.base called from a method of one name to a method of a different name");};goog.scope=function(a){a.call(goog.global)};COMPILED||(goog.global.COMPILED=COMPILED);
goog.defineClass=function(a,b){var c=b.constructor,d=b.statics;c&&c!=Object.prototype.constructor||(c=function(){throw Error("cannot instantiate an interface (no constructor defined).");});c=goog.defineClass.createSealingConstructor_(c,a);a&&goog.inherits(c,a);delete b.constructor;delete b.statics;goog.defineClass.applyProperties_(c.prototype,b);null!=d&&(d instanceof Function?d(c):goog.defineClass.applyProperties_(c,d));return c};goog.defineClass.SEAL_CLASS_INSTANCES=goog.DEBUG;
goog.defineClass.createSealingConstructor_=function(a,b){if(goog.defineClass.SEAL_CLASS_INSTANCES&&Object.seal instanceof Function){if(b&&b.prototype&&b.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_])return a;var c=function(){var b=a.apply(this,arguments)||this;b[goog.UID_PROPERTY_]=b[goog.UID_PROPERTY_];this.constructor===c&&Object.seal(b);return b};return c}return a};goog.defineClass.OBJECT_PROTOTYPE_FIELDS_="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_=function(a,b){for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c]);for(var d=0;d<goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length;d++)c=goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d],Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c])};goog.tagUnsealableClass=function(a){!COMPILED&&goog.defineClass.SEAL_CLASS_INSTANCES&&(a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]=!0)};goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_="goog_defineClass_legacy_unsealable";var rsz={FileService:{}},FileService=function(){this.cloudExplorer=window.ce.api.CloudExplorer.get("ce-js");this.currentBlob=null};goog.exportSymbol("FileService",FileService);FileService.prototype.open=function(){var a=this;return new Promise(function(b,c){a.cloudExplorer.pick(function(c){console.log("my Blob: "+JSON.stringify(c));a.currentBlob=c;b(c.url)},function(a){console.log("error "+JSON.stringify(a));c(a)})})};goog.exportProperty(FileService.prototype,"open",FileService.prototype.open);
FileService.prototype.save=function(a){var b=this;return new Promise(function(c,d){console.log("fileService save",a,b.currentBlob);b.cloudExplorer.write(b.currentBlob,a,function(a){console.log("my Blob: "+JSON.stringify(a));b.currentBlob=a;c(a.url)},function(a){console.log("error "+JSON.stringify(a));d(a)})})};goog.exportProperty(FileService.prototype,"save",FileService.prototype.save);rsz.Responsizer={};var Responsizer=function(){this.gutter=30};Responsizer.prototype.importSilex=function(a,b){a.querySelector("meta[content~=Silex]")&&(this.reorderDom(a),this.preventAbsoluteLayout(a));this.addBootstrapImports(a);this.addBootstrapContainer(a.body);this.addBootstrapRows(a.body);this.addBootstrapCols(a.body)};
Responsizer.prototype.reorderDom=function(a,b){b||(b=a.body);var c=[],d;for(d in b.childNodes)1===b.childNodes[d].nodeType&&c.push({el:b.childNodes[d],rect:b.childNodes[d].getBoundingClientRect()});d=c.length;var e=!1;do for(var e=!1,f=0;++f<d&&!1===e;){var g=c[f].el,h=c[f-1].el,k=c[f].rect,l=c[f-1].rect,n=l.top>k.top&&l.top<k.bottom||l.top<k.top&&l.bottom>k.top,p=l.left>k.right;if(l.top>k.bottom||n&&p)b.insertBefore(g,h),e=c[f-1],c[f-1]=c[f],c[f]=e,e=!0}while(!0===e);for(var m in c)0<c[m].el.childNodes.length&&
this.reorderDom(a,c[m].el)};
Responsizer.prototype.preventAbsoluteLayout=function(a){if(null===a.querySelector("head style#responsize-style")){var b=a.createElement("style");b.innerHTML='        @media (max-width: 1024px) {          body, .container .editable-style{            position: relative;            max-width: 100%;            top: auto;            left: auto;            height: auto;            top: initial;            left: initial;            height: initial;            box-sizing: inherit;          }          .container .editable-style::before{            content: "\\00A0";          }          .container .editable-style .silex-element-content{            height: auto;            height: initial;          }          body {            width: 100%;          }        }      ';b.id=
"responsize-style";a.head.appendChild(b)}};Responsizer.prototype.addBootstrapContainer=function(a){a.classList.add("container")};Responsizer.prototype.addBootstrapRows=function(a){a=a.querySelectorAll(".container-element");for(var b=0;b<a.length;b++)a[b].classList.add("row")};
Responsizer.prototype.addBootstrapCols=function(a){a=a.querySelectorAll(".row");for(var b=0;b<a.length;b++){for(var c=a[b],d=c.getBoundingClientRect(),e=d.left-this.gutter,f=Math.round((d.right-d.left-2*this.gutter)/12),d=[],g=0;g<c.childNodes.length;g++){var h=c.childNodes[g];if(1===h.nodeType){var k=h.getBoundingClientRect(),l=k.left-e,k=Math.max(1,Math.round((k.right-k.left)/f)),k=Math.min(12,k),l=Math.max(0,Math.round(l/f)),l=Math.min(11,l);d.push({element:h,widthCol:k,leftCol:l})}}var f=e=c=
0,n;for(n in d){g=d[n];h=g.widthCol;l=Math.min(12,2*g.widthCol);k=Math.min(12,4*g.widthCol);g.element.classList.add("col-md-"+h);g.element.classList.add("col-sm-"+l);g.element.classList.add("col-xs-"+k);var p=Math.max(0,Math.min(11,g.leftCol-c%12)),m=Math.max(0,Math.min(11,Math.round((g.leftCol-e%12)/2))),q=Math.max(0,Math.min(11,Math.round((g.leftCol-f%12)/4)));g.element.classList.add("col-md-offset-"+p);g.element.classList.add("col-sm-offset-"+m);g.element.classList.add("col-xs-offset-"+q);c+=h+
p;e+=l+m;f+=k+q}}};Responsizer.prototype.addBootstrapImports=function(a){if(null===a.querySelector("link[href*=bootstrap]")){var b=a.createElement("link");b.rel="stylesheet";b.href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css";b.media="(max-width: 1024px)";a.head.appendChild(b)}null===a.querySelector("script[src*=bootstrap]")&&(b=a.createElement("script"),b.src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js",a.head.appendChild(b))};
Responsizer.prototype.hasSiblings=function(a){var b=0,c;for(c in a.parentNode.childNodes)1===a.parentNode.childNodes[c].nodeType&&b++;return 1<b};Responsizer.prototype.clearFormatting=function(a,b){for(var c=this.getPrefix(b),d=1;12>=d;d++)a.classList.remove(c+d)};Responsizer.prototype.getPrefix=function(a){var b="col-xs-";1200<=a?b="col-lg-":992<=a?b="col-md-":768<=a&&(b="col-sm-");return b};
Responsizer.prototype.setWidth=function(a,b,c){var d=a.parentNode.getBoundingClientRect(),d=Math.round((d.right-d.left)/12);b=Math.max(1,Math.round(b/d));b=Math.min(12,b);this.clearFormatting(a,c);c=this.getPrefix(c);a.classList.add(c+b)};rsz.Stage={};var Stage=function(a){this.element=a;this.iframe=a.getElementsByTagName("iframe")[0];this.height=this.width=1;this.autoSize=!0;window.addEventListener("resize",this.redraw.bind(this))};goog.exportSymbol("Stage",Stage);Stage.prototype.setSize=function(a,b){this.autoSize=!1;this.width=a;this.height=b;this.redraw()};goog.exportProperty(Stage.prototype,"setSize",Stage.prototype.setSize);Stage.prototype.getSize=function(){return{width:this.width,height:this.height}};
goog.exportProperty(Stage.prototype,"getSize",Stage.prototype.getSize);
Stage.prototype.getContentSize=function(){var a=null,b=null,c=null,d=null,e=null;try{e=this.iframe.contentDocument.querySelectorAll("*")}catch(f){return console.error("Could not acces the iframe content, probably due to a cross domain issue."),{w:800,h:600}}for(var g=0;g<e.length;g++){var h=e[g];if(null===a||h.offsetLeft<a)a=h.offsetLeft;if(null===c||h.offsetTop<c)c=h.offsetTop;h.offsetLeft+h.offsetWidth>b&&(b=h.offsetLeft+h.offsetWidth);h.offsetTop+h.offsetHeight>d&&(d=h.offsetTop+h.offsetHeight)}return{w:b-
a,h:d-c}};goog.exportProperty(Stage.prototype,"getContentSize",Stage.prototype.getContentSize);
Stage.prototype.redraw=function(){if(this.autoSize){var a=this.getContentSize();this.width=a.w;this.height=a.h}this.iframe.style.width=this.width+"px";this.iframe.style.height=this.height+"px";var a=this.element.offsetWidth,b=this.element.offsetHeight,c=Math.min(1,a/this.width,b/this.height);this.iframe.style.transform="scale("+c+")";this.iframe.style.transformOrigin="0 0";b=(b-this.height*c)/2;this.iframe.style.left=(a-this.width*c)/2+"px";this.iframe.style.top=b+"px"};
goog.exportProperty(Stage.prototype,"redraw",Stage.prototype.redraw);Stage.prototype.setLoading=function(a){a?this.iframe.parentNode.classList.add("rsz-loading"):this.iframe.parentNode.classList.remove("rsz-loading")};goog.exportProperty(Stage.prototype,"setLoading",Stage.prototype.setLoading);
Stage.prototype.setUrl=function(a){var b=this;return new Promise(function(c,d){b.setLoading(!0);b.iframe.onload=function(){b.setLoading(!1);b.redraw();try{c(b.iframe.contentDocument)}catch(a){console.error("Could not acces the iframe content, probably due to a cross domain issue."),c(null)}};b.iframe.onerror=function(a){b.setLoading(!1);d(a)};b.iframe.src=a})};goog.exportProperty(Stage.prototype,"setUrl",Stage.prototype.setUrl);
Stage.prototype.getHtml=function(){try{return this.iframe.contentDocument.documentElement.outerHTML}catch(a){return console.error("Could not acces the iframe content, probably due to a cross domain issue."),null}};goog.exportProperty(Stage.prototype,"getHtml",Stage.prototype.getHtml);
Stage.prototype.setHtml=function(a){var b=this;return new Promise(function(c,d){b.setLoading(!0);b.iframe.onload=function(){b.setLoading(!1);if(""!==a){b.iframe.src="";try{b.iframe.contentDocument.write(a)}catch(d){console.error("Could not acces the iframe content, probably due to a cross domain issue.")}}b.redraw();try{c(b.iframe.contentDocument)}catch(f){console.error("Could not acces the iframe content, probably due to a cross domain issue."),c(null)}};b.iframe.onerror=function(a){b.setLoading(!1);
d(a)};b.iframe.src="about:blank"})};goog.exportProperty(Stage.prototype,"setHtml",Stage.prototype.setHtml);rsz.Toolbar={};var Device={mobile:0,mobileH:1,tablet:2,tabletH:3,desktop:4};goog.exportSymbol("Device",Device);var DeviceData=[{name:"mobile",width:320,height:480},{name:"mobile-h",width:480,height:320},{name:"tablet",width:769,height:1024},{name:"tablet-h",width:1024,height:769},{name:"desktop",width:1920,height:1080}];goog.exportSymbol("DeviceData",DeviceData);
var Toolbar=function(a){var b=this;this.element=a;this.selectedDevice=Device.desktop;this.openElement=this.element.querySelector(".open");this.selection=[];this.onSize=this.onClearFormatting=this.onSave=this.onOpen=null;this.element.addEventListener("click",function(a){return b.onClick(a)})};goog.exportSymbol("Toolbar",Toolbar);Toolbar.prototype.setDirty=function(a){};
Toolbar.prototype.onClick=function(a){var b=a.target;if(b.classList.contains("open")){if(this.onOpen)this.onOpen();this.element.querySelector(".tooltip.open").classList.remove("visible")}if(b.classList.contains("save")&&this.onSave)this.onSave();if(b.classList.contains("clear-formatting")){if(this.onClearFormatting){var c=this;this.selection.forEach(function(a){return c.onClearFormatting(a)})}}else b.classList.contains("mobile")?this.setDevice(Device.mobile):b.classList.contains("mobile-h")?this.setDevice(Device.mobileH):
b.classList.contains("tablet")?this.setDevice(Device.tablet):b.classList.contains("tablet-h")?this.setDevice(Device.tabletH):b.classList.contains("desktop")&&this.setDevice(Device.desktop);a.preventDefault();return!1};
Toolbar.prototype.setDevice=function(a){this.selectedDevice=a;for(var b=this.element.querySelectorAll(".selected"),c=0;c<b.length;c++)b.item(c).classList.remove("selected");this.element.querySelector("."+DeviceData[a].name).classList.add("selected");if(this.onSize)this.onSize(DeviceData[a].width,DeviceData[a].height)};goog.exportProperty(Toolbar.prototype,"setDevice",Toolbar.prototype.setDevice);Toolbar.prototype.setSelection=function(a){this.selection=a;this.redraw();this.element.querySelector(".tooltip.open").classList.remove("visible")};
goog.exportProperty(Toolbar.prototype,"setSelection",Toolbar.prototype.setSelection);Toolbar.prototype.redraw=function(){};goog.exportProperty(Toolbar.prototype,"redraw",Toolbar.prototype.redraw);rsz.App={};
var App=function(a){var b=this;this.toolbar=new Toolbar(a.querySelector("#toolbar"));this.stage=new Stage(a.querySelector("#stage"));this.url="";this.toolbar.onSize=function(a,c){try{window.sessionStorage.setItem("rsz-device",b.toolbar.selectedDevice.toString())}catch(d){}b.stage.setSize(a,c)};this.toolbar.onOpen=function(){var a=prompt("Website URL",b.url);a&&(window.location.href="?url="+escape(a))};try{var c=parseInt(window.sessionStorage.getItem("rsz-device"),10);c?this.toolbar.setDevice(c):this.toolbar.setDevice(Device.desktop)}catch(d){this.toolbar.setDevice(Device.desktop)}};
App.prototype.hasSiblings=function(a){if(a&&a.parentNode&&a.parentNode.childNodes){var b=0,c;for(c in a.parentNode.childNodes)1===a.parentNode.childNodes[c].nodeType&&b++;return 1<b}return!1};goog.exportSymbol("App.prototype.hasSiblings",App.prototype.hasSiblings);App.prototype.isBootstrapCol=function(a){return a&&a.parentNode&&a.parentNode.classList&&a.parentNode.classList.contains("row")};goog.exportSymbol("App.prototype.isBootstrapCol",App.prototype.isBootstrapCol);
App.prototype.onOpen=function(a){var b=this;this.url=a;this.stage.setUrl(a).then(function(a){b.toolbar.setSelection([])},function(a){console.error("Error loading website:",a)})};App.prototype.onSave=function(){this.toolbar.setDirty(!1)};rsz.wysiwyg={};rsz.wysiwyg.RszDom={};var RszDom=function(){this.tempElements=[];this.nextId=0};goog.exportSymbol("RszDom",RszDom);RszDom.prototype.unprepare=function(a){this.tempElements.forEach(function(b){b=a.querySelector("#"+b.id);b.parentNode.removeChild(b)});for(var b=a.querySelectorAll(".rsz-select-candidate, .rsz-selected"),c=0;c<b.length;c++)b[c].classList.remove("rsz-selected"),b[c].classList.remove("rsz-select-candidate")};RszDom.prototype.prepare=function(a){this.tempElements.forEach(function(b){return a.querySelector("head").appendChild(b.cloneNode(!0))})};
RszDom.prototype.addTempElement=function(a,b){b.id="rsz-"+this.nextId++;this.tempElements.push(b);a&&a.head.appendChild(b.cloneNode(!0))};goog.exportProperty(RszDom.prototype,"addTempElement",RszDom.prototype.addTempElement);rsz.wysiwyg.RszSelection={};var RszSelection=function(){this.onChanged=null;this.isDragging=this.isDown=!1};goog.exportSymbol("RszSelection",RszSelection);RszSelection.prototype.reset=function(a){this.isDown=!1;this.unSelectAll(a,!1)};RszSelection.prototype.onMouseDown=function(a,b,c,d,e){this.isDown=!0;return!1};RszSelection.prototype.onMouseMove=function(a,b,c,d,e){this.isDown?this.isDragging||(this.isDragging=!0):(this.resetCandidates(a),b.classList.add("rsz-select-candidate"));return!1};
RszSelection.prototype.onMouseUp=function(a,b,c,d,e){this.isDown=!1;if(this.isDragging)this.isDragging=!1;else{if(!e){var f=this;this.getSelected(a).forEach(function(a){a!=b&&f.unSelect(a,!1)})}this.select(b);return!0}return!1};RszSelection.prototype.getSelected=function(a){if(a){a=a.querySelectorAll(".rsz-selected");for(var b=[],c=0;c<a.length;c++)b.push(a[c]);return b}return[]};goog.exportProperty(RszSelection.prototype,"getSelected",RszSelection.prototype.getSelected);
RszSelection.prototype.resetCandidates=function(a){a=a.querySelectorAll(".rsz-select-candidate");for(var b=0;b<a.length;b++)a[b].classList.remove("rsz-select-candidate")};RszSelection.prototype.isSelected=function(a){return a.classList.contains(".rsz-selected")};RszSelection.prototype.select=function(a,b){if(!a.classList.contains("rsz-selected")&&(a.classList.add("rsz-selected"),!1!==b&&this.onChanged))this.onChanged()};
RszSelection.prototype.unSelect=function(a,b){if(a.classList.contains("rsz-selected")&&(a.classList.remove("rsz-selected"),!1!==b&&this.onChanged))this.onChanged()};RszSelection.prototype.unSelectAll=function(a,b){var c=this;this.getSelected(a).forEach(function(a){c.unSelect(a,b)})};RszSelection.prototype.toggleSelect=function(a,b){a.classList.toggle("rsz-selected");if(!1!==b&&this.onChanged)this.onChanged()};rsz.wysiwyg.RszResize={};rsz.wysiwyg.Side={NONE:-1,TOP:0,LEFT:1,BOTTOM:2,RIGHT:3};var RszResize=function(){this.RESIZE_HANDLE_SIZE=15;this.onChanged=null;this.isDragging=!1;this.currentElement=null;this.currentSide=rsz.wysiwyg.Side.NONE};goog.exportSymbol("RszResize",RszResize);RszResize.prototype.onMouseDown=function(a,b,c,d,e){a=b.getBoundingClientRect();this.currentSide=this.getSide(a,c,d);this.currentElement=this.currentSide!==rsz.wysiwyg.Side.NONE?b:null;return!1};
RszResize.prototype.onMouseMove=function(a,b,c,d,e,f){this.updateCursor(a,this.getSide(b.getBoundingClientRect(),c,d));return null!==this.currentElement?(this.isDragging||(this.isDragging=!0),a=this.currentElement.getBoundingClientRect(),c=this.updateRect(this.currentSide,a,c,d),f&&(c=f(this.currentElement,c)),f=this.currentElement.parentNode.getBoundingClientRect(),c&&(this.currentElement.style.left=c.left-f.left+"px",this.currentElement.style.top=c.top-f.top+"px",this.currentElement.style.width=
c.right-c.left+"px",this.currentElement.style.height=c.bottom-c.top+"px"),!0):!1};RszResize.prototype.onMouseUp=function(a,b,c,d,e){if(this.currentElement&&this.isDragging){this.isDragging=!1;this.currentElement=null;if(this.onChanged)this.onChanged(this.currentElement);return!0}return!1};
RszResize.prototype.getSide=function(a,b,c){b-=a.left;c-=a.top;var d=a.right-a.left;a=a.bottom-a.top;var e=rsz.wysiwyg.Side.NONE;b<this.RESIZE_HANDLE_SIZE&&0<b&&c<a&&0<c?e=rsz.wysiwyg.Side.LEFT:b<d&&b>d-this.RESIZE_HANDLE_SIZE&&c<a&&0<c?e=rsz.wysiwyg.Side.RIGHT:c<this.RESIZE_HANDLE_SIZE&&0<c&&b<d&&0<b?e=rsz.wysiwyg.Side.TOP:c<a&&c>a-this.RESIZE_HANDLE_SIZE&&b<d&&0<b&&(e=rsz.wysiwyg.Side.BOTTOM);return e};
RszResize.prototype.updateCursor=function(a,b){switch(b){case rsz.wysiwyg.Side.LEFT:case rsz.wysiwyg.Side.RIGHT:a.body.classList.add("rsz-resize-ew");break;case rsz.wysiwyg.Side.TOP:case rsz.wysiwyg.Side.BOTTOM:a.body.classList.add("rsz-resize-ns");break;case rsz.wysiwyg.Side.NONE:a.body.classList.remove("rsz-resize-ew"),a.body.classList.remove("rsz-resize-ns")}};
RszResize.prototype.updateRect=function(a,b,c,d){a={left:b.left,right:b.right,top:b.top,bottom:b.bottom};switch(this.currentSide){case rsz.wysiwyg.Side.LEFT:a.left=c;break;case rsz.wysiwyg.Side.RIGHT:a.right=c;break;case rsz.wysiwyg.Side.TOP:a.top=d;break;case rsz.wysiwyg.Side.BOTTOM:a.bottom=d}return a};rsz.Wysiwyg={};var Wysiwyg=function(){this.filterBoundingBox=this.selectFilter=this.document=this.onResized=this.onSelect=null;this.onMouseDownBinded=this.onMouseDown.bind(this);this.onMouseUpBinded=this.onMouseUp.bind(this);this.onMouseMoveBinded=this.onMouseMove.bind(this);this.preventDefaultBinded=this.preventDefault.bind(this);this.rszSelection=new RszSelection;this.rszResize=new RszResize;this.resizeMode=this.selectionMode=!1;this.rszDom=new RszDom};goog.exportSymbol("Wysiwyg",Wysiwyg);
Wysiwyg.prototype.setOnSelect=function(a){return this.rszSelection.onChanged=a};goog.exportProperty(Wysiwyg.prototype,"setOnSelect",Wysiwyg.prototype.setOnSelect);Wysiwyg.prototype.getOnSelect=function(){return this.rszSelection.onChanged};goog.exportProperty(Wysiwyg.prototype,"getOnSelect",Wysiwyg.prototype.getOnSelect);Wysiwyg.prototype.setSelectFilter=function(a){return this.selectFilter=a};goog.exportProperty(Wysiwyg.prototype,"setSelectFilter",Wysiwyg.prototype.setSelectFilter);
Wysiwyg.prototype.getSelectFilter=function(){return this.selectFilter};goog.exportProperty(Wysiwyg.prototype,"getSelectFilter",Wysiwyg.prototype.getSelectFilter);Wysiwyg.prototype.getCleanHtml=function(){var a=this.document.documentElement.cloneNode(!0);this.rszDom.unprepare(a);return a.outerHTML};goog.exportProperty(Wysiwyg.prototype,"getCleanHtml",Wysiwyg.prototype.getCleanHtml);
Wysiwyg.prototype.setDocument=function(a){this.document&&(this.document.removeEventListener("mousedown",this.onMouseDownBinded),this.document.removeEventListener("mouseup",this.onMouseUpBinded),this.document.removeEventListener("mousemove",this.onMouseMoveBinded),this.document.removeEventListener("click",this.preventDefaultBinded,!0),this.rszDom.unprepare(this.document.documentElement));this.rszSelection.reset(this.document);this.document=a;this.setSelectionMode(this.selectionMode);this.document.addEventListener("mouseup",
this.onMouseUpBinded,!0);this.document.addEventListener("mousedown",this.onMouseDownBinded);this.document.addEventListener("mousemove",this.onMouseMoveBinded);this.document.addEventListener("click",this.preventDefaultBinded,!0);this.rszDom.prepare(this.document.documentElement)};goog.exportProperty(Wysiwyg.prototype,"setDocument",Wysiwyg.prototype.setDocument);Wysiwyg.prototype.setSelectionMode=function(a){this.selectionMode=a};goog.exportProperty(Wysiwyg.prototype,"setSelectionMode",Wysiwyg.prototype.setSelectionMode);
Wysiwyg.prototype.setResizeMode=function(a){this.resizeMode=a};goog.exportProperty(Wysiwyg.prototype,"setResizeMode",Wysiwyg.prototype.setResizeMode);Wysiwyg.prototype.getBestElement=function(a){for(;a&&this.selectFilter&&!this.selectFilter(a);)a=a.parentNode;return a};goog.exportProperty(Wysiwyg.prototype,"getBestElement",Wysiwyg.prototype.getBestElement);
Wysiwyg.prototype.getSibling=function(a,b){for(var c=null,d=a.parentNode.childNodes.length,e=0;e<d;e++){var f=a.parentNode.childNodes[e];!1===b&&(f=a.parentNode.childNodes[d-1-e]);if(1===f.nodeType){if(f===a)return c;c=f}}return null};Wysiwyg.prototype.addTempStyle=function(a){var b=document.createElement("link");b.setAttribute("rel","stylesheet");b.setAttribute("type","text/css");b.setAttribute("href",a);this.rszDom.addTempElement(this.document,b)};
goog.exportProperty(Wysiwyg.prototype,"addTempStyle",Wysiwyg.prototype.addTempStyle);Wysiwyg.prototype.addTempScript=function(a){var b=document.createElement("script");b.setAttribute("type","text/javascript");b.setAttribute("src",a);this.rszDom.addTempElement(this.document,b)};goog.exportProperty(Wysiwyg.prototype,"addTempScript",Wysiwyg.prototype.addTempScript);Wysiwyg.prototype.preventDefault=function(a){if(this.selectionMode||this.resizeMode)a.stopPropagation(),a.preventDefault()};
Wysiwyg.prototype.onMouseUp=function(a){if(this.document){var b=this.getBestElement(a.target);if(b){if(this.selectionMode&&this.rszSelection.onMouseUp(this.document,b,a.clientX,a.clientY,a.shiftKey)&&this.onSelect)this.onSelect();if(this.resizeMode&&(a=this.rszResize.onMouseUp(this.document,b,a.clientX,a.clientY,a.shiftKey),this.onResized&&a))this.onResized()}else this.rszSelection.unSelectAll(this.document)}};
Wysiwyg.prototype.onMouseDown=function(a){if(this.document){var b=this.getBestElement(a.target);if(b){if(this.selectionMode)this.rszSelection.onMouseDown(this.document,b,a.clientX,a.clientY,a.shiftKey);if(this.resizeMode)this.rszResize.onMouseDown(this.document,b,a.clientX,a.clientY,a.shiftKey)}}};
Wysiwyg.prototype.onMouseMove=function(a){if(this.document){var b=!1,c=this.getBestElement(a.target);c?(this.selectionMode&&(b=b||this.rszSelection.onMouseMove(this.document,c,a.clientX,a.clientY,a.shiftKey)),this.resizeMode&&(b=b||this.rszResize.onMouseMove(this.document,c,a.clientX,a.clientY,a.shiftKey,this.filterBoundingBox)),b&&this.preventDefault(a)):(this.rszResize.updateCursor(this.document,rsz.wysiwyg.Side.NONE),this.rszSelection.resetCandidates(this.document))}};
Wysiwyg.prototype.getSelected=function(){return this.rszSelection.getSelected(this.document)};goog.exportProperty(Wysiwyg.prototype,"getSelected",Wysiwyg.prototype.getSelected);Wysiwyg.prototype.setSelected=function(a){this.rszSelection.unSelectAll(this.document,!1);return this.rszSelection.select(a,!1)};goog.exportProperty(Wysiwyg.prototype,"setSelected",Wysiwyg.prototype.setSelected);window.responsize=window.responsize||{init:function(){var a=document.getElementById("rsz-app");window.responsize.app=new App(a);var b=function(a){a=a.split("+").join(" ");for(var b={},e,f=/[?&]?([^=]+)=([^&]*)/g;e=f.exec(a);)b[decodeURIComponent(e[1])]=decodeURIComponent(e[2]);return b}(document.location.search);b.url&&setTimeout(function(){return window.responsize.app.onOpen(b.url)},1E3)}};
//# sourceMappingURL=/responsize.js.map