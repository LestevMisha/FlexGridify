!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.FlexGridify=t():e.FlexGridify=t()}(self,(()=>(()=>{"use strict";var e={568:(e,t,i)=>{i.d(t,{A:()=>a});var r=i(601),n=i.n(r),o=i(314),s=i.n(o)()(n());s.push([e.id,':root {\n    --flexGridify-row-gap: 1em;\n    --flexGridify-column-gap: 0.5em;\n    --flexGridify-column-width-calc: auto;\n}\n\n.flexGridify {\n    display: flex;\n    flex-flow: column wrap;\n    column-gap: var(--flexGridify-column-gap);\n    row-gap: var(--flexGridify-row-gap);\n}\n\n.flexGridify.flexGridify-init {\n    opacity: 0;\n    visibility: hidden;\n}\n\n.flexGridify-item { width: 100%; transition-property: opacity, transform; transition-duration: .225s; transition-timing-function: ease-in-out; }\n.flexGridify-cols-2 .flexGridify-item { width: var(--flexGridify-column-width-calc) }\n.flexGridify-cols-3 .flexGridify-item { width: var(--flexGridify-column-width-calc) }\n.flexGridify-cols-4 .flexGridify-item { width: var(--flexGridify-column-width-calc) }\n.flexGridify-cols-5 .flexGridify-item { width: var(--flexGridify-column-width-calc) }\n.flexGridify-cols-6 .flexGridify-item { width: var(--flexGridify-column-width-calc) }\n.flexGridify-cols-7 .flexGridify-item { width: var(--flexGridify-column-width-calc) }\n.flexGridify-cols-8 .flexGridify-item { width: var(--flexGridify-column-width-calc) }\n\n.flexGridify-cols-2 .flexGridify-item:nth-child(2n+1) { order: 1; }\n.flexGridify-cols-2 .flexGridify-item:nth-child(2n)   { order: 2; }\n\n.flexGridify-cols-3 .flexGridify-item:nth-child(3n+1) { order: 1; }\n.flexGridify-cols-3 .flexGridify-item:nth-child(3n+2) { order: 2; }\n.flexGridify-cols-3 .flexGridify-item:nth-child(3n)   { order: 3; }\n\n.flexGridify-cols-4 .flexGridify-item:nth-child(4n+1) { order: 1; }\n.flexGridify-cols-4 .flexGridify-item:nth-child(4n+2) { order: 2; }\n.flexGridify-cols-4 .flexGridify-item:nth-child(4n+3) { order: 3; }\n.flexGridify-cols-4 .flexGridify-item:nth-child(4n)   { order: 4; }\n\n.flexGridify-cols-5 .flexGridify-item:nth-child(5n+1) { order: 1; }\n.flexGridify-cols-5 .flexGridify-item:nth-child(5n+2) { order: 2; }\n.flexGridify-cols-5 .flexGridify-item:nth-child(5n+3) { order: 3; }\n.flexGridify-cols-5 .flexGridify-item:nth-child(5n+4) { order: 4; }\n.flexGridify-cols-5 .flexGridify-item:nth-child(5n)   { order: 5; }\n\n.flexGridify-cols-6 .flexGridify-item:nth-child(6n+1) { order: 1; }\n.flexGridify-cols-6 .flexGridify-item:nth-child(6n+2) { order: 2; }\n.flexGridify-cols-6 .flexGridify-item:nth-child(6n+3) { order: 3; }\n.flexGridify-cols-6 .flexGridify-item:nth-child(6n+4) { order: 4; }\n.flexGridify-cols-6 .flexGridify-item:nth-child(6n+5) { order: 5; }\n.flexGridify-cols-6 .flexGridify-item:nth-child(6n)   { order: 6; }\n\n.flexGridify-cols-7 .flexGridify-item:nth-child(7n+1) { order: 1; }\n.flexGridify-cols-7 .flexGridify-item:nth-child(7n+2) { order: 2; }\n.flexGridify-cols-7 .flexGridify-item:nth-child(7n+3) { order: 3; }\n.flexGridify-cols-7 .flexGridify-item:nth-child(7n+4) { order: 4; }\n.flexGridify-cols-7 .flexGridify-item:nth-child(7n+5) { order: 5; }\n.flexGridify-cols-7 .flexGridify-item:nth-child(7n+6) { order: 6; }\n.flexGridify-cols-7 .flexGridify-item:nth-child(7n)   { order: 7; }\n\n.flexGridify-cols-8 .flexGridify-item:nth-child(8n+1) { order: 1; }\n.flexGridify-cols-8 .flexGridify-item:nth-child(8n+2) { order: 2; }\n.flexGridify-cols-8 .flexGridify-item:nth-child(8n+3) { order: 3; }\n.flexGridify-cols-8 .flexGridify-item:nth-child(8n+4) { order: 4; }\n.flexGridify-cols-8 .flexGridify-item:nth-child(8n+5) { order: 5; }\n.flexGridify-cols-8 .flexGridify-item:nth-child(8n+6) { order: 6; }\n.flexGridify-cols-8 .flexGridify-item:nth-child(8n+7) { order: 7; }\n.flexGridify-cols-8 .flexGridify-item:nth-child(8n)   { order: 8; }\n\n.flexGridify-break {\n    content: "";\n    flex-basis: 100%;\n    width: 0 !important;\n    margin: 0;\n}\n.flexGridify-break-1 { order: 1; }\n.flexGridify-break-2 { order: 2; }\n.flexGridify-break-3 { order: 3; }\n.flexGridify-break-4 { order: 4; }\n.flexGridify-break-5 { order: 5; }\n.flexGridify-break-6 { order: 6; }\n.flexGridify-break-7 { order: 7; }\n\n\n',""]);const a=s},314:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var i="",r=void 0!==t[5];return t[4]&&(i+="@supports (".concat(t[4],") {")),t[2]&&(i+="@media ".concat(t[2]," {")),r&&(i+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),i+=e(t),r&&(i+="}"),t[2]&&(i+="}"),t[4]&&(i+="}"),i})).join("")},t.i=function(e,i,r,n,o){"string"==typeof e&&(e=[[null,e,void 0]]);var s={};if(r)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(s[l]=!0)}for(var d=0;d<e.length;d++){var c=[].concat(e[d]);r&&s[c[0]]||(void 0!==o&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=o),i&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=i):c[2]=i),n&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=n):c[4]="".concat(n)),t.push(c))}},t}},601:e=>{e.exports=function(e){return e[1]}},72:e=>{var t=[];function i(e){for(var i=-1,r=0;r<t.length;r++)if(t[r].identifier===e){i=r;break}return i}function r(e,r){for(var o={},s=[],a=0;a<e.length;a++){var l=e[a],d=r.base?l[0]+r.base:l[0],c=o[d]||0,f="".concat(d," ").concat(c);o[d]=c+1;var h=i(f),m={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==h)t[h].references++,t[h].updater(m);else{var p=n(m,r);r.byIndex=a,t.splice(a,0,{identifier:f,updater:p,references:1})}s.push(f)}return s}function n(e,t){var i=t.domAPI(t);return i.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;i.update(e=t)}else i.remove()}}e.exports=function(e,n){var o=r(e=e||[],n=n||{});return function(e){e=e||[];for(var s=0;s<o.length;s++){var a=i(o[s]);t[a].references--}for(var l=r(e,n),d=0;d<o.length;d++){var c=i(o[d]);0===t[c].references&&(t[c].updater(),t.splice(c,1))}o=l}}},659:e=>{var t={};e.exports=function(e,i){var r=function(e){if(void 0===t[e]){var i=document.querySelector(e);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(e){i=null}t[e]=i}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(i)}},540:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},56:(e,t,i)=>{e.exports=function(e){var t=i.nc;t&&e.setAttribute("nonce",t)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(i){!function(e,t,i){var r="";i.supports&&(r+="@supports (".concat(i.supports,") {")),i.media&&(r+="@media ".concat(i.media," {"));var n=void 0!==i.layer;n&&(r+="@layer".concat(i.layer.length>0?" ".concat(i.layer):""," {")),r+=i.css,n&&(r+="}"),i.media&&(r+="}"),i.supports&&(r+="}");var o=i.sourceMap;o&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,i)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},113:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function i(r){var n=t[r];if(void 0!==n)return n.exports;var o=t[r]={id:r,exports:{}};return e[r](o,o.exports,i),o.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.nc=void 0;var r={};i.d(r,{default:()=>G});function n(e,t){for(const i of t)e.style.removeProperty(i)}var o=i(72),s=i.n(o),a=i(825),l=i.n(a),d=i(659),c=i.n(d),f=i(56),h=i.n(f),m=i(540),p=i.n(m),u=i(113),y=i.n(u),g=i(568),x={};x.styleTagTransform=y(),x.setAttributes=h(),x.insert=c().bind(null,"head"),x.domAPI=l(),x.insertStyleElement=p(),s()(g.A,x),g.A&&g.A.locals&&g.A.locals;const G=class{constructor(e=null,t={}){e&&t&&this.initialize(e,t)}getDefaultOptions(){return{enableLogQuery:!1,enableResponsiveLayout:!0,enableSmoothLoading:!1,enableDynamicHeight:!0,enableDragAndDrop:!1,rememberDragAndDropPosition:!0,dragAndDropAnimation:{opacity:.5,transform:"translate(0.25em, -0.25em)"},columnBreakpoints:{1500:6,1200:5,992:4,768:3,576:2,0:1},onDragAndDropChange:null,onBreakpointChange:null,gap:1,marginTop:0,marginBottom:0,defaultColumnCount:1,sizeUnit:"em",breakpointSelector:"window",dragAndDropSelector:"default"}}initialize(e,t){this.defaultOptions=this.getDefaultOptions(),this.options={...this.defaultOptions,...t},e&&(this.element=document.querySelector(e),this.#e(),this.#t(),this.#i(),this.#r(),this.enableSmoothLoading&&setTimeout((()=>{this.element.classList.remove(this.#n)}),12))}getBreakpointQuery(e="columns"){const t="columns"===e?this.defaultColumnCount:"No query, `responsive` is set to `false`";if(!this.enableResponsiveLayout)return t;return this.#o(((t,[i,r,n],o,s)=>{if("object"==typeof t){const o=parseFloat(window.getComputedStyle(t).width);if(o>i&&!(o>r))return"columns"===e?n:i}else if(o.matches&&!s.matches)return"columns"===e?n:i}))||t}applyHeightChange(e){if(e||(e=this.getBreakpointQuery("columns")),e<2)return void this.element.style.removeProperty("height");const t=Array.from(this.element.children),i=new Array(e).fill(0),r=t.map((e=>window.getComputedStyle(e))),n=parseFloat(r[0].getPropertyValue("font-size")),o=this.#s(n);for(let e=0;e<t.length;e++){if(t[e].classList.contains(this.#a))continue;const s=r[e],a=parseFloat(s.getPropertyValue("order"),10),l=parseFloat(s.getPropertyValue("height")),d="em"===this.sizeUnit?this.gap*n:this.gap;i[a-1]+=Math.ceil(l)+o+d}this.element.style.height=`${Math.max(...i)}px`}applyMarginTop(){this.#l(this.marginTop,"number"),Array.from(this.element.children).forEach((e=>{e.style.marginTop=`${this.marginTop}${this.sizeUnit}`}))}applyMarginBottom(){this.#l(this.marginBottom,"number"),Array.from(this.element.children).forEach((e=>{e.style.marginBottom=`${this.marginBottom}${this.sizeUnit}`}))}applyMargins(){this.#l(this.marginTop,"number"),this.#l(this.marginBottom,"number"),Array.from(this.element.children).forEach((e=>{e.style.marginTop=`${this.marginTop}${this.sizeUnit}`,e.style.marginBottom=`${this.marginBottom}${this.sizeUnit}`}))}applyGap(e){this.#l(this.gap,"number"),e||(e=this.getBreakpointQuery("columns"));const t=this.sizeUnit,i=this.gap,r=i/2,n=r*(e+(e-1)-1)/e;document.documentElement.style.setProperty("--flexGridify-row-gap",`${i}${t}`),document.documentElement.style.setProperty("--flexGridify-column-gap",`${r}${t}`),document.documentElement.style.setProperty("--flexGridify-column-width-calc",`calc((100% / ${e}) - ${n}${t})`)}applyColumnClass(e){e||(e=this.getBreakpointQuery("columns"));const t=`flexGridify-cols-${e}`;this.element.classList.contains(t)||(this.element.className=this.element.className.replace(/flexGridify-cols-\d+/,""),this.element.classList.add(t))}applyColumnBreaks(e){if(e||(e=this.getBreakpointQuery("columns")),this.element.querySelectorAll(`.${this.#a}`).length!==e-1){this.#d();for(let t=1;t<e;t++){const e=document.createElement("div");e.classList.add(this.#a,`${this.#a}-${t}`),this.element.appendChild(e)}}}reset(){this.#c();const e=this.getBreakpointQuery("columns");this.applyMargins(),this.applyGap(e),this.applyColumnClass(e),this.applyColumnBreaks(e),this.applyHeightChange(e)}resetBreakpoints(){this.cleanupBreakpointListeners(),this.#i()}disconnectDynamicObservers(){for(const[e,t]of this.#f)t.unobserve(e),t.disconnect();this.#f.clear()}connectDynamicObservers(){Array.from(this.element.children).forEach((e=>{this.enableDynamicHeight&&this.#h(e)}))}cleanupBreakpointListeners(){0!==this.#m.size&&(this.#m.forEach(((e,t)=>{t.removeEventListener("change",e)})),this.#m.clear()),this.#p&&(this.#p(),this.#p=null)}cleanupDragAndDropListeners(){this.#u.forEach(((e,t)=>{this.element.removeEventListener(t,e)})),this.#u.clear(),Array.from(this.element.children).forEach((e=>{e.classList.contains("flexGridify-break")||("default"!==this.dragAndDropSelector&&e.querySelector(this.dragAndDropSelector).removeAttribute("draggable"),e.removeAttribute("draggable"))}))}reinitDragAndDrop(){if(!this.enableDragAndDrop)return;const e=this.getBreakpointQuery("columns"),t=document.createDocumentFragment(),i=Array.from(this.element.children),r=Array.from({length:i.length},((e,t)=>t));(this.rememberDragAndDropPosition?JSON.parse(localStorage.getItem("gridOrder"))??r:r).forEach((e=>{const r=i.find((t=>parseInt(t.getAttribute("data-draggable-id"))===e));r&&("default"===this.dragAndDropSelector?r.setAttribute("draggable","true"):r.querySelector(this.dragAndDropSelector).setAttribute("draggable","true"),r.setAttribute("data-draggable-id",e),t.appendChild(r))})),this.element.innerHTML="",this.element.appendChild(t),this.applyColumnBreaks(e),this.#r()}#d(){this.element.querySelectorAll(".flexGridify-break").forEach((e=>e.remove()))}#l(e,t){if(typeof e!==t)throw TypeError(`Incorrect type for '${e}' property. It is '${t}'.`)}#s(e){let t=0;return this.marginBottom&&(t+="em"===this.sizeUnit?this.marginBottom*e:this.marginBottom),this.marginTop&&(t+="em"===this.sizeUnit?this.marginTop*e:this.marginTop),t}#y(e=!1,t=null){e&&this.onBreakpointChange?(this.enableLogQuery&&t&&console.log("%cThreshold:","color: #0d6efd;",t),this.onBreakpointChange()):this.enableLogQuery&&t&&console.log("%cThreshold:","color: #0d6efd;",t);const i=this.getBreakpointQuery("columns");this.applyMargins(),this.applyGap(i),this.applyColumnClass(i),this.applyColumnBreaks(i),this.applyHeightChange(i)}#t(){this.element.classList.add(this.#g);const e=document.createDocumentFragment(),t=Array.from(this.element.children),i=Array.from({length:t.length},((e,t)=>t));(this.rememberDragAndDropPosition?JSON.parse(localStorage.getItem("gridOrder"))??i:i).forEach((i=>{const r=t[i];r&&(r.classList.add(this.#x),"default"===this.dragAndDropSelector?r.setAttribute("draggable",this.enableDragAndDrop?"true":"false"):r.querySelector(this.dragAndDropSelector).setAttribute("draggable",this.enableDragAndDrop?"true":"false"),r.setAttribute("data-draggable-id",i),this.enableDynamicHeight&&this.#h(r),e.appendChild(r))})),this.element.innerHTML="",this.element.appendChild(e)}#i(){const e=this.#y.bind(this);this.#o(((t,[i,r,n],o,s)=>{if("object"==typeof t){const n=parseFloat(window.getComputedStyle(t).width);if(n>i&&!(n>r)){const i=function(e,t,i=null){if(!e||!Array.isArray(t)||0===t.length)return void console.warn("Invalid element or breakpoints");const r=new Map(t.map((e=>[e,!1]))),n=new ResizeObserver((n=>{for(let o of n)o.target===e&&requestAnimationFrame((()=>{var e;e=o.target.clientWidth,t.forEach(((n,o)=>{const s=e>n;if(s!==r.get(n)){r.set(n,s);const a=e>t[o+1];i&&!0!==a&&i(!0,n)}}))}))}));return n.observe(e),()=>{n.unobserve(e),n.disconnect()}}(t,Object.keys(this.columnBreakpoints),e);this.#p=i}}else{const t=()=>{e(!0,i)};o.addEventListener("change",t),o.matches&&!s.matches&&t(),this.#m.set(o,t)}}))}#h(e){let t=new Map;const i=new ResizeObserver((e=>{requestAnimationFrame((()=>{for(let i of e){const e=i.target,r=i.contentRect.height;if(t.has(e)){if(t.get(e)!==r){const i=this.getBreakpointQuery("columns");i>1&&this.applyHeightChange(i),t.set(e,r)}}else t.set(e,r)}}))}));i.observe(e),this.#f.set(e,i)}#r(){if(!this.enableDragAndDrop)return;let e,t,i;[["dragstart",i=>{const r=i.target.closest(`.${this.#x}`)??i.target;if(i.dataTransfer.setDragImage(r,i.offsetX,i.offsetY),"default"!==this.dragAndDropSelector){const t=r.querySelector(this.dragAndDropSelector);e!==t&&e!==this.element&&(i.preventDefault(),i.stopPropagation(),i.stopImmediatePropagation())}t=i.target.closest(`.${this.#x}`)}],["dragenter",e=>{var t,r;i=e.target.closest(`.${this.#x}`),i&&(t=i,r=this.dragAndDropAnimation,Object.entries(r).forEach((([e,i])=>{t.style.setProperty(e,i)})))}],["dragleave",e=>{const r=e.target.closest(`.${this.#x}`);null!==r&&r!==i&&r!==t&&n(r,Object.keys(this.dragAndDropAnimation))}],["dragover",e=>{e.preventDefault()}],["drop",e=>{const i=e.target.closest(`.${this.#x}`);null!==i&&(n(i,Object.keys(this.dragAndDropAnimation)),function(e,t){const i=e.nextElementSibling;i===t?t.parentNode.insertBefore(t,e):e.previousElementSibling===t?t.parentNode.insertBefore(e,t):(t.parentNode.insertBefore(e,t),e.parentNode.insertBefore(t,i))}(t,i),this.applyHeightChange(),this.#G())}],["dragend",e=>{n(t,Object.keys(this.dragAndDropAnimation))}],"default"!==this.dragAndDropSelector?["mousedown",t=>{e=t.target}]:null].filter(Boolean).forEach((([e,t])=>{this.element.addEventListener(e,t),this.#u.set(e,t)}))}#G(){if(!this.rememberDragAndDropPosition)return;const e=Array.from(this.element.querySelectorAll(`.${this.#x}`)).map((e=>parseInt(e.getAttribute("data-draggable-id"))));localStorage.setItem("gridOrder",JSON.stringify(e)),this.onDragAndDropChange&&this.onDragAndDropChange(e)}#o(e){const t=Object.entries(this.columnBreakpoints).sort(((e,t)=>e-t)),i="window"!==this.breakpointSelector?document.querySelector(this.breakpointSelector):this.breakpointSelector;for(var r=0;t.length>r;r++){const n=t[r],o=t[r+1]??[],s=n[0],a=o[0],l=window.matchMedia(`(min-width: ${s}px)`),d=!!a&&window.matchMedia(`(min-width: ${a}px)`),c=e(i,[s,a,n[1]],l,d);if(c)return c}return null}#c(){if("px"!==this.sizeUnit&&"em"!==this.sizeUnit)throw TypeError("Incorrect input. 'sizeUnit' has to be either 'em' or 'px'");if(this.defaultColumnCount>8)throw TypeError(`${this.defaultColumnCount} columns is restricted. Maximum amount of columns 'FlexGridify' can have by default is 8, if more is needed consider to change it manually`)}#u;#m;#f;#p;#x;#a;#n;#g;#e(){const{gap:e,sizeUnit:t,enableSmoothLoading:i,enableDragAndDrop:r,dragAndDropAnimation:n,rememberDragAndDropPosition:o,marginTop:s,marginBottom:a,enableLogQuery:l,enableDynamicHeight:d,breakpointSelector:c,dragAndDropSelector:f,defaultColumnCount:h,enableResponsiveLayout:m,columnBreakpoints:p,onBreakpointChange:u,onDragAndDropChange:y}=this.options;this.sizeUnit=t,this.enableSmoothLoading=i,this.enableDragAndDrop=r,this.rememberDragAndDropPosition=o,this.dragAndDropAnimation=n,this.gap=e,this.marginTop=s,this.marginBottom=a,this.enableLogQuery=l,this.enableDynamicHeight=d,this.breakpointSelector=c,this.dragAndDropSelector=f,this.defaultColumnCount=h,this.enableResponsiveLayout=m,this.onBreakpointChange=u,this.onDragAndDropChange=y,this.columnBreakpoints=p,this.#u=new Map,this.#m=new Map,this.#f=new Map,this.#p=null,this.#x="flexGridify-item",this.#a="flexGridify-break",this.#n="flexGridify-init",this.#g="flexGridify"}};return r.default})()));