var e=this;function f(a,b){var c=a.split("."),d=e;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var k;c.length&&(k=c.shift());)c.length||void 0===b?d=d[k]?d[k]:d[k]={}:d[k]=b};function l(){this.N=window.ce.api.CloudExplorer.get("ce-js");this.v=null}f("FileService",l);l.prototype.open=function(){var a=this;return new Promise(function(b,c){a.N.pick(function(c){console.log("my Blob: "+JSON.stringify(c));a.v=c;b(c.url)},function(a){console.log("error "+JSON.stringify(a));c(a)})})};l.prototype.open=l.prototype.open;
l.prototype.save=function(a){var b=this;return new Promise(function(c,d){console.log("fileService save",a,b.v);b.N.write(b.v,a,function(a){console.log("my Blob: "+JSON.stringify(a));b.v=a;c(a.url)},function(a){console.log("error "+JSON.stringify(a));d(a)})})};l.prototype.save=l.prototype.save;function m(a){this.element=a;this.a=a.getElementsByTagName("iframe")[0];this.height=this.width=1;this.M=!0;window.addEventListener("resize",this.e.bind(this))}f("Stage",m);m.prototype.aa=function(a,b){this.M=!1;this.width=a;this.height=b;this.e()};m.prototype.setSize=m.prototype.aa;m.prototype.S=function(){return{width:this.width,height:this.height}};m.prototype.getSize=m.prototype.S;
m.prototype.R=function(){for(var a=null,b=null,c=null,d=null,k=this.a.contentDocument.querySelectorAll("*"),g=0;g<k.length;g++){var h=k[g];if(null===a||h.offsetLeft<a)a=h.offsetLeft;if(null===c||h.offsetTop<c)c=h.offsetTop;h.offsetLeft+h.offsetWidth>b&&(b=h.offsetLeft+h.offsetWidth);h.offsetTop+h.offsetHeight>d&&(d=h.offsetTop+h.offsetHeight)}return{ma:b-a,ga:d-c}};m.prototype.getContentSize=m.prototype.R;
m.prototype.e=function(){if(this.M){var a=this.R();this.width=a.ma;this.height=a.ga}this.a.style.width=this.width+"px";this.a.style.height=this.height+"px";var a=this.element.offsetWidth,b=this.element.offsetHeight,c=Math.min(1,a/this.width,b/this.height);this.a.style.transform="scale("+c+")";this.a.style.transformOrigin="0 0";b=(b-this.height*c)/2;this.a.style.left=(a-this.width*c)/2+"px";this.a.style.top=b+"px"};m.prototype.redraw=m.prototype.e;
m.prototype.j=function(a){a?this.a.parentNode.classList.add("rsz-loading"):this.a.parentNode.classList.remove("rsz-loading")};m.prototype.setLoading=m.prototype.j;m.prototype.ba=function(a){var b=this;return new Promise(function(c,d){b.j(!0);b.a.onload=function(){b.j(!1);b.e();c(b.a.contentDocument)};b.a.onerror=function(a){b.j(!1);d(a)};b.a.src=a})};m.prototype.setUrl=m.prototype.ba;m.prototype.da=function(){return this.a.contentDocument.documentElement.outerHTML};m.prototype.getHtml=m.prototype.da;
m.prototype.ja=function(a){var b=this;return new Promise(function(c,d){b.j(!0);b.a.onload=function(){b.j(!1);""!==a&&(b.a.src="",b.a.contentDocument.write(a));b.e();c(b.a.contentDocument)};b.a.onerror=function(a){b.j(!1);d(a)};b.a.src="about:blank"})};m.prototype.setHtml=m.prototype.ja;f("Device",{oa:0,pa:1,qa:2,ra:3,na:4});var n=[{name:"mobile",width:320,height:480},{name:"mobile-h",width:476,height:320},{name:"tablet",width:769,height:1024},{name:"tablet-h",width:1024,height:769},{name:"desktop",width:1280,height:800}];f("DeviceData",n);
function p(a){var b=this;this.element=a;this.element.querySelector(".open");this.Y=this.element.querySelector(".save");this.selection=[];this.F=this.q=this.k=null;this.element.addEventListener("click",function(a){var d=a.target;d.classList.contains("open")&&b.k&&b.k();d.classList.contains("save")?b.q&&b.q():d.classList.contains("mobile")?b.i(0):d.classList.contains("mobile-h")?b.i(1):d.classList.contains("tablet")?b.i(2):d.classList.contains("tablet-h")?b.i(3):d.classList.contains("desktop")&&b.i(4);
a.preventDefault();return!1})}f("Toolbar",p);function q(a,b){b?a.Y.classList.remove("off"):a.Y.classList.add("off")}p.prototype.i=function(a){for(var b=this.element.querySelectorAll(".selected"),c=0;c<b.length;c++)b.item(c).classList.remove("selected");this.element.querySelector("."+n[a].name).classList.add("selected");this.F&&this.F(n[a].width,n[a].height)};p.prototype.setDevice=p.prototype.i;p.prototype.H=function(a){this.selection=a;this.e()};p.prototype.setSelection=p.prototype.H;
p.prototype.e=function(){};p.prototype.redraw=p.prototype.e;function r(){this.K=[];this.ia=0}f("RszDom",r);function s(a,b){a.K.forEach(function(a){a=b.querySelector("#"+a.id);a.parentNode.removeChild(a)});for(var c=b.querySelectorAll(".rsz-select-candidate, .rsz-selected"),d=0;d<c.length;d++)c[d].classList.remove("rsz-selected"),c[d].classList.remove("rsz-select-candidate")}function t(a,b){a.K.forEach(function(a){return b.querySelector("head").appendChild(a.cloneNode(!0))})}r.prototype.A=function(a,b){b.id="rsz-"+this.ia++;this.K.push(b);a&&a.head.appendChild(b.cloneNode(!0))};
r.prototype.addTempElement=r.prototype.A;function u(){this.g=null;this.d=this.w=!1}f("RszSelection",u);u.prototype.reset=function(a){this.w=!1;v(this,a)};u.prototype.n=function(){this.w=!0;return!1};u.prototype.o=function(a,b){if(this.w)this.d||(this.d=!0);else{for(var c=a.querySelectorAll(".rsz-select-candidate"),d=0;d<c.length;d++)c[d].classList.remove("rsz-select-candidate");b.classList.add("rsz-select-candidate")}return!1};
u.prototype.p=function(a,b,c,d,k){this.w=!1;if(this.d)this.d=!1;else return k||this.f(a).forEach(function(a){a!=b&&w(a)}),this.select(b),!0;return!1};u.prototype.f=function(a){if(a){a=a.querySelectorAll(".rsz-selected");for(var b=[],c=0;c<a.length;c++)b.push(a[c]);return b}return[]};u.prototype.getSelected=u.prototype.f;u.prototype.select=function(a,b){a.classList.contains("rsz-selected")||(a.classList.add("rsz-selected"),!1!==b&&this.g&&this.g())};
function w(a){a.classList.contains("rsz-selected")&&a.classList.remove("rsz-selected")}function v(a,b){a.f(b).forEach(function(a){w(a)})};function x(){this.u=5;this.g=null;this.d=!1;this.b=null;this.B=-1}f("RszResize",x);x.prototype.n=function(a,b,c,d){a=b.getBoundingClientRect();this.B=y(this,a,c,d);this.b=-1!==this.B?b:null;return!1};
x.prototype.o=function(a,b,c,d,k,g){switch(y(this,b.getBoundingClientRect(),c,d)){case 1:case 3:a.body.classList.add("rsz-resize-ew");break;case 0:case 2:a.body.classList.add("rsz-resize-ns");break;case -1:a.body.classList.remove("rsz-resize-ew"),a.body.classList.remove("rsz-resize-ns")}if(null!==this.b){this.d||(this.d=!0);a=this.b.getBoundingClientRect();a={left:a.left,right:a.right,top:a.top,bottom:a.bottom};switch(this.B){case 1:a.left=c;break;case 3:a.right=c;break;case 0:a.top=d;break;case 2:a.bottom=
d}c=a;g&&(c=g(this.b,c));g=this.b.parentNode.getBoundingClientRect();c&&(this.b.style.left=c.left-g.left+"px",this.b.style.top=c.top-g.top+"px",this.b.style.width=c.right-c.left+"px",this.b.style.height=c.bottom-c.top+"px");return!0}return!1};x.prototype.p=function(){return this.b&&this.d?(this.d=!1,this.b=null,this.g&&this.g(this.b),!0):!1};
function y(a,b,c,d){c-=b.left;d-=b.top;var k=b.right-b.left;b=b.bottom-b.top;var g=-1;c<a.u&&0<c&&d<b&&0<d?g=1:c<k&&c>k-a.u&&d<b&&0<d?g=3:d<a.u&&0<d&&c<k&&0<c?g=0:d<b&&d>b-a.u&&c<k&&0<c&&(g=2);return g};function z(){this.P=this.t=this.document=this.C=this.D=null;this.U=this.n.bind(this);this.W=this.p.bind(this);this.V=this.o.bind(this);this.X=this.preventDefault.bind(this);this.h=new u;this.G=new x;this.r=this.l=!1;this.s=new r}f("Wysiwyg",z);z.prototype.ka=function(a){return this.h.g=a};z.prototype.setOnSelect=z.prototype.ka;z.prototype.ea=function(){return this.h.g};z.prototype.getOnSelect=z.prototype.ea;z.prototype.la=function(a){return this.t=a};z.prototype.setSelectFilter=z.prototype.la;
z.prototype.fa=function(){return this.t};z.prototype.getSelectFilter=z.prototype.fa;z.prototype.Q=function(){var a=this.document.documentElement.cloneNode(!0);s(this.s,a);return a.outerHTML};z.prototype.getCleanHtml=z.prototype.Q;
z.prototype.Z=function(a){this.document&&(this.document.removeEventListener("mousedown",this.U),this.document.removeEventListener("mouseup",this.W),this.document.removeEventListener("mousemove",this.V),this.document.removeEventListener("click",this.X,!0),s(this.s,this.document.documentElement));this.h.reset(this.document);this.document=a;this.I(this.l);this.document.addEventListener("mouseup",this.W,!0);this.document.addEventListener("mousedown",this.U);this.document.addEventListener("mousemove",
this.V);this.document.addEventListener("click",this.X,!0);t(this.s,this.document.documentElement)};z.prototype.setDocument=z.prototype.Z;z.prototype.I=function(a){this.l=a};z.prototype.setSelectionMode=z.prototype.I;z.prototype.$=function(a){this.r=a};z.prototype.setResizeMode=z.prototype.$;z.prototype.m=function(a){for(var b=a;b&&this.t&&!this.t(b);)b=b.parentNode;return b||a};z.prototype.getBestElement=z.prototype.m;
z.prototype.L=function(a){var b=document.createElement("link");b.setAttribute("rel","stylesheet");b.setAttribute("type","text/css");b.setAttribute("href",a);this.s.A(this.document,b)};z.prototype.addTempStyle=z.prototype.L;z.prototype.ca=function(a){var b=document.createElement("script");b.setAttribute("type","text/javascript");b.setAttribute("src",a);this.s.A(this.document,b)};z.prototype.addTempScript=z.prototype.ca;z.prototype.preventDefault=function(a){if(this.l||this.r)a.stopPropagation(),a.preventDefault()};
z.prototype.p=function(a){if(this.document){var b=this.m(a.target);this.l&&this.h.p(this.document,this.m(a.target),a.clientX,a.clientY,a.shiftKey)&&this.D&&this.D();this.r&&(a=this.G.p(this.document,b,a.clientX,a.clientY,a.shiftKey),this.C&&a&&this.C())}};z.prototype.n=function(a){if(this.document){var b=this.m(a.target);this.l&&this.h.n(this.document,b,a.clientX,a.clientY,a.shiftKey);this.r&&this.G.n(this.document,b,a.clientX,a.clientY,a.shiftKey)}};
z.prototype.o=function(a){if(this.document){var b=!1,c=this.m(a.target);this.l&&(b=b||this.h.o(this.document,c,a.clientX,a.clientY,a.shiftKey));this.r&&(b=b||this.G.o(this.document,c,a.clientX,a.clientY,a.shiftKey,this.P));b&&this.preventDefault(a)}};z.prototype.f=function(){return this.h.f(this.document)};z.prototype.getSelected=z.prototype.f;function A(a){var b=this;this.toolbar=new p(a.querySelector("#toolbar"));this.J=new m(a.querySelector("#stage"));this.c=new z;this.O=new l;this.toolbar.F=function(a,d){return b.J.aa(a,d)};this.toolbar.k=function(){return b.O.open().then(function(a){return b.k(a)})};this.toolbar.q=function(){return b.O.save(b.c.Q()).then(function(){return b.q()})};this.c.t=function(a){return b.T(a)};this.c.D=function(){b.toolbar.H(b.c.f());q(b.toolbar,!0)};this.c.P=function(a,d){q(b.toolbar,!0);var k=d.right-d.left,
g=b.J.S().width,h=a.parentNode.getBoundingClientRect(),k=Math.max(1,Math.round(k/Math.round((h.right-h.left)/12))),h="col-xs-";1200<=g?h="col-lg-":992<=g?h="col-md-":768<=g&&(h="col-sm-");for(g=1;12>=g;g++)a.classList.remove(h+g);a.classList.add(h+k);return null};this.c.C=function(){};this.c.I(!0);this.c.$(!0);this.toolbar.i(4);this.c.L(window.location.href+"iframe.css")}
A.prototype.ha=function(a){if(a&&a.parentNode&&a.parentNode.childNodes){var b=0,c;for(c in a.parentNode.childNodes)1===a.parentNode.childNodes[c].nodeType&&b++;return 1<b}return!1};f("App.prototype.hasSiblings",A.prototype.ha);A.prototype.T=function(a){return a&&a.parentNode&&a.parentNode.classList&&a.parentNode.classList.contains("row")};f("App.prototype.isBootstrapCol",A.prototype.T);A.prototype.k=function(a){var b=this;this.J.ba(a).then(function(a){b.c.Z(a);b.toolbar.H([])})};
A.prototype.q=function(){q(this.toolbar,!1)};window.initResponsizeApp=function(){var a=new A(document.getElementById("rsz-app")),b=B();b.url&&setTimeout(function(){return a.k(b.url)},1E3)};function B(){for(var a=document.location.search,a=a.split("+").join(" "),b={},c,d=/[?&]?([^=]+)=([^&]*)/g;c=d.exec(a);)b[decodeURIComponent(c[1])]=decodeURIComponent(c[2]);return b};
/*
//@ sourceMappingURL=responsize.js.map
*/