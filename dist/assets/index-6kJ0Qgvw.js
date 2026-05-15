(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();function fd(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var el={exports:{}},us={},tl={exports:{}},W={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sn=Symbol.for("react.element"),hd=Symbol.for("react.portal"),md=Symbol.for("react.fragment"),yd=Symbol.for("react.strict_mode"),gd=Symbol.for("react.profiler"),xd=Symbol.for("react.provider"),vd=Symbol.for("react.context"),wd=Symbol.for("react.forward_ref"),bd=Symbol.for("react.suspense"),jd=Symbol.for("react.memo"),Sd=Symbol.for("react.lazy"),Hi=Symbol.iterator;function kd(e){return e===null||typeof e!="object"?null:(e=Hi&&e[Hi]||e["@@iterator"],typeof e=="function"?e:null)}var rl={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},nl=Object.assign,sl={};function mr(e,t,r){this.props=e,this.context=t,this.refs=sl,this.updater=r||rl}mr.prototype.isReactComponent={};mr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};mr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function ol(){}ol.prototype=mr.prototype;function Yo(e,t,r){this.props=e,this.context=t,this.refs=sl,this.updater=r||rl}var Ko=Yo.prototype=new ol;Ko.constructor=Yo;nl(Ko,mr.prototype);Ko.isPureReactComponent=!0;var Ji=Array.isArray,il=Object.prototype.hasOwnProperty,Xo={current:null},al={key:!0,ref:!0,__self:!0,__source:!0};function ll(e,t,r){var n,o={},i=null,a=null;if(t!=null)for(n in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(i=""+t.key),t)il.call(t,n)&&!al.hasOwnProperty(n)&&(o[n]=t[n]);var c=arguments.length-2;if(c===1)o.children=r;else if(1<c){for(var d=Array(c),u=0;u<c;u++)d[u]=arguments[u+2];o.children=d}if(e&&e.defaultProps)for(n in c=e.defaultProps,c)o[n]===void 0&&(o[n]=c[n]);return{$$typeof:sn,type:e,key:i,ref:a,props:o,_owner:Xo.current}}function Td(e,t){return{$$typeof:sn,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Zo(e){return typeof e=="object"&&e!==null&&e.$$typeof===sn}function Ed(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var Qi=/\/+/g;function Rs(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Ed(""+e.key):t.toString(36)}function Nn(e,t,r,n,o){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(i){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case sn:case hd:a=!0}}if(a)return a=e,o=o(a),e=n===""?"."+Rs(a,0):n,Ji(o)?(r="",e!=null&&(r=e.replace(Qi,"$&/")+"/"),Nn(o,t,r,"",function(u){return u})):o!=null&&(Zo(o)&&(o=Td(o,r+(!o.key||a&&a.key===o.key?"":(""+o.key).replace(Qi,"$&/")+"/")+e)),t.push(o)),1;if(a=0,n=n===""?".":n+":",Ji(e))for(var c=0;c<e.length;c++){i=e[c];var d=n+Rs(i,c);a+=Nn(i,t,r,d,o)}else if(d=kd(e),typeof d=="function")for(e=d.call(e),c=0;!(i=e.next()).done;)i=i.value,d=n+Rs(i,c++),a+=Nn(i,t,r,d,o);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function pn(e,t,r){if(e==null)return e;var n=[],o=0;return Nn(e,n,"","",function(i){return t.call(r,i,o++)}),n}function Cd(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ge={current:null},Rn={transition:null},Id={ReactCurrentDispatcher:ge,ReactCurrentBatchConfig:Rn,ReactCurrentOwner:Xo};function cl(){throw Error("act(...) is not supported in production builds of React.")}W.Children={map:pn,forEach:function(e,t,r){pn(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return pn(e,function(){t++}),t},toArray:function(e){return pn(e,function(t){return t})||[]},only:function(e){if(!Zo(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};W.Component=mr;W.Fragment=md;W.Profiler=gd;W.PureComponent=Yo;W.StrictMode=yd;W.Suspense=bd;W.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Id;W.act=cl;W.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var n=nl({},e.props),o=e.key,i=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,a=Xo.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(d in t)il.call(t,d)&&!al.hasOwnProperty(d)&&(n[d]=t[d]===void 0&&c!==void 0?c[d]:t[d])}var d=arguments.length-2;if(d===1)n.children=r;else if(1<d){c=Array(d);for(var u=0;u<d;u++)c[u]=arguments[u+2];n.children=c}return{$$typeof:sn,type:e.type,key:o,ref:i,props:n,_owner:a}};W.createContext=function(e){return e={$$typeof:vd,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:xd,_context:e},e.Consumer=e};W.createElement=ll;W.createFactory=function(e){var t=ll.bind(null,e);return t.type=e,t};W.createRef=function(){return{current:null}};W.forwardRef=function(e){return{$$typeof:wd,render:e}};W.isValidElement=Zo;W.lazy=function(e){return{$$typeof:Sd,_payload:{_status:-1,_result:e},_init:Cd}};W.memo=function(e,t){return{$$typeof:jd,type:e,compare:t===void 0?null:t}};W.startTransition=function(e){var t=Rn.transition;Rn.transition={};try{e()}finally{Rn.transition=t}};W.unstable_act=cl;W.useCallback=function(e,t){return ge.current.useCallback(e,t)};W.useContext=function(e){return ge.current.useContext(e)};W.useDebugValue=function(){};W.useDeferredValue=function(e){return ge.current.useDeferredValue(e)};W.useEffect=function(e,t){return ge.current.useEffect(e,t)};W.useId=function(){return ge.current.useId()};W.useImperativeHandle=function(e,t,r){return ge.current.useImperativeHandle(e,t,r)};W.useInsertionEffect=function(e,t){return ge.current.useInsertionEffect(e,t)};W.useLayoutEffect=function(e,t){return ge.current.useLayoutEffect(e,t)};W.useMemo=function(e,t){return ge.current.useMemo(e,t)};W.useReducer=function(e,t,r){return ge.current.useReducer(e,t,r)};W.useRef=function(e){return ge.current.useRef(e)};W.useState=function(e){return ge.current.useState(e)};W.useSyncExternalStore=function(e,t,r){return ge.current.useSyncExternalStore(e,t,r)};W.useTransition=function(){return ge.current.useTransition()};W.version="18.3.1";tl.exports=W;var N=tl.exports;const Nd=fd(N);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Rd=N,Ad=Symbol.for("react.element"),Pd=Symbol.for("react.fragment"),qd=Object.prototype.hasOwnProperty,zd=Rd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Ld={key:!0,ref:!0,__self:!0,__source:!0};function dl(e,t,r){var n,o={},i=null,a=null;r!==void 0&&(i=""+r),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(a=t.ref);for(n in t)qd.call(t,n)&&!Ld.hasOwnProperty(n)&&(o[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps,t)o[n]===void 0&&(o[n]=t[n]);return{$$typeof:Ad,type:e,key:i,ref:a,props:o,_owner:zd.current}}us.Fragment=Pd;us.jsx=dl;us.jsxs=dl;el.exports=us;var s=el.exports,ro={},ul={exports:{}},Ie={},pl={exports:{}},fl={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(I,O){var F=I.length;I.push(O);e:for(;0<F;){var ee=F-1>>>1,oe=I[ee];if(0<o(oe,O))I[ee]=O,I[F]=oe,F=ee;else break e}}function r(I){return I.length===0?null:I[0]}function n(I){if(I.length===0)return null;var O=I[0],F=I.pop();if(F!==O){I[0]=F;e:for(var ee=0,oe=I.length,dn=oe>>>1;ee<dn;){var Et=2*(ee+1)-1,Ns=I[Et],Ct=Et+1,un=I[Ct];if(0>o(Ns,F))Ct<oe&&0>o(un,Ns)?(I[ee]=un,I[Ct]=F,ee=Ct):(I[ee]=Ns,I[Et]=F,ee=Et);else if(Ct<oe&&0>o(un,F))I[ee]=un,I[Ct]=F,ee=Ct;else break e}}return O}function o(I,O){var F=I.sortIndex-O.sortIndex;return F!==0?F:I.id-O.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var a=Date,c=a.now();e.unstable_now=function(){return a.now()-c}}var d=[],u=[],v=1,x=null,y=3,w=!1,k=!1,T=!1,Q=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,p=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function h(I){for(var O=r(u);O!==null;){if(O.callback===null)n(u);else if(O.startTime<=I)n(u),O.sortIndex=O.expirationTime,t(d,O);else break;O=r(u)}}function j(I){if(T=!1,h(I),!k)if(r(d)!==null)k=!0,Cs(C);else{var O=r(u);O!==null&&Is(j,O.startTime-I)}}function C(I,O){k=!1,T&&(T=!1,f(q),q=-1),w=!0;var F=y;try{for(h(O),x=r(d);x!==null&&(!(x.expirationTime>O)||I&&!Oe());){var ee=x.callback;if(typeof ee=="function"){x.callback=null,y=x.priorityLevel;var oe=ee(x.expirationTime<=O);O=e.unstable_now(),typeof oe=="function"?x.callback=oe:x===r(d)&&n(d),h(O)}else n(d);x=r(d)}if(x!==null)var dn=!0;else{var Et=r(u);Et!==null&&Is(j,Et.startTime-O),dn=!1}return dn}finally{x=null,y=F,w=!1}}var R=!1,A=null,q=-1,Z=5,_=-1;function Oe(){return!(e.unstable_now()-_<Z)}function xr(){if(A!==null){var I=e.unstable_now();_=I;var O=!0;try{O=A(!0,I)}finally{O?vr():(R=!1,A=null)}}else R=!1}var vr;if(typeof p=="function")vr=function(){p(xr)};else if(typeof MessageChannel<"u"){var $i=new MessageChannel,pd=$i.port2;$i.port1.onmessage=xr,vr=function(){pd.postMessage(null)}}else vr=function(){Q(xr,0)};function Cs(I){A=I,R||(R=!0,vr())}function Is(I,O){q=Q(function(){I(e.unstable_now())},O)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(I){I.callback=null},e.unstable_continueExecution=function(){k||w||(k=!0,Cs(C))},e.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Z=0<I?Math.floor(1e3/I):5},e.unstable_getCurrentPriorityLevel=function(){return y},e.unstable_getFirstCallbackNode=function(){return r(d)},e.unstable_next=function(I){switch(y){case 1:case 2:case 3:var O=3;break;default:O=y}var F=y;y=O;try{return I()}finally{y=F}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(I,O){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var F=y;y=I;try{return O()}finally{y=F}},e.unstable_scheduleCallback=function(I,O,F){var ee=e.unstable_now();switch(typeof F=="object"&&F!==null?(F=F.delay,F=typeof F=="number"&&0<F?ee+F:ee):F=ee,I){case 1:var oe=-1;break;case 2:oe=250;break;case 5:oe=1073741823;break;case 4:oe=1e4;break;default:oe=5e3}return oe=F+oe,I={id:v++,callback:O,priorityLevel:I,startTime:F,expirationTime:oe,sortIndex:-1},F>ee?(I.sortIndex=F,t(u,I),r(d)===null&&I===r(u)&&(T?(f(q),q=-1):T=!0,Is(j,F-ee))):(I.sortIndex=oe,t(d,I),k||w||(k=!0,Cs(C))),I},e.unstable_shouldYield=Oe,e.unstable_wrapCallback=function(I){var O=y;return function(){var F=y;y=O;try{return I.apply(this,arguments)}finally{y=F}}}})(fl);pl.exports=fl;var Od=pl.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dd=N,Ce=Od;function S(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var hl=new Set,_r={};function Wt(e,t){lr(e,t),lr(e+"Capture",t)}function lr(e,t){for(_r[e]=t,e=0;e<t.length;e++)hl.add(t[e])}var et=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),no=Object.prototype.hasOwnProperty,Md=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Vi={},Gi={};function Fd(e){return no.call(Gi,e)?!0:no.call(Vi,e)?!1:Md.test(e)?Gi[e]=!0:(Vi[e]=!0,!1)}function Wd(e,t,r,n){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return n?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function _d(e,t,r,n){if(t===null||typeof t>"u"||Wd(e,t,r,n))return!0;if(n)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function xe(e,t,r,n,o,i,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=n,this.attributeNamespace=o,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=a}var de={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){de[e]=new xe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];de[t]=new xe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){de[e]=new xe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){de[e]=new xe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){de[e]=new xe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){de[e]=new xe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){de[e]=new xe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){de[e]=new xe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){de[e]=new xe(e,5,!1,e.toLowerCase(),null,!1,!1)});var ei=/[\-:]([a-z])/g;function ti(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(ei,ti);de[t]=new xe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(ei,ti);de[t]=new xe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(ei,ti);de[t]=new xe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){de[e]=new xe(e,1,!1,e.toLowerCase(),null,!1,!1)});de.xlinkHref=new xe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){de[e]=new xe(e,1,!1,e.toLowerCase(),null,!0,!0)});function ri(e,t,r,n){var o=de.hasOwnProperty(t)?de[t]:null;(o!==null?o.type!==0:n||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(_d(t,r,o,n)&&(r=null),n||o===null?Fd(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):o.mustUseProperty?e[o.propertyName]=r===null?o.type===3?!1:"":r:(t=o.attributeName,n=o.attributeNamespace,r===null?e.removeAttribute(t):(o=o.type,r=o===3||o===4&&r===!0?"":""+r,n?e.setAttributeNS(n,t,r):e.setAttribute(t,r))))}var st=Dd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,fn=Symbol.for("react.element"),Ut=Symbol.for("react.portal"),$t=Symbol.for("react.fragment"),ni=Symbol.for("react.strict_mode"),so=Symbol.for("react.profiler"),ml=Symbol.for("react.provider"),yl=Symbol.for("react.context"),si=Symbol.for("react.forward_ref"),oo=Symbol.for("react.suspense"),io=Symbol.for("react.suspense_list"),oi=Symbol.for("react.memo"),at=Symbol.for("react.lazy"),gl=Symbol.for("react.offscreen"),Yi=Symbol.iterator;function wr(e){return e===null||typeof e!="object"?null:(e=Yi&&e[Yi]||e["@@iterator"],typeof e=="function"?e:null)}var K=Object.assign,As;function Ir(e){if(As===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);As=t&&t[1]||""}return`
`+As+e}var Ps=!1;function qs(e,t){if(!e||Ps)return"";Ps=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var n=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){n=u}e.call(t.prototype)}else{try{throw Error()}catch(u){n=u}e()}}catch(u){if(u&&n&&typeof u.stack=="string"){for(var o=u.stack.split(`
`),i=n.stack.split(`
`),a=o.length-1,c=i.length-1;1<=a&&0<=c&&o[a]!==i[c];)c--;for(;1<=a&&0<=c;a--,c--)if(o[a]!==i[c]){if(a!==1||c!==1)do if(a--,c--,0>c||o[a]!==i[c]){var d=`
`+o[a].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}while(1<=a&&0<=c);break}}}finally{Ps=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?Ir(e):""}function Bd(e){switch(e.tag){case 5:return Ir(e.type);case 16:return Ir("Lazy");case 13:return Ir("Suspense");case 19:return Ir("SuspenseList");case 0:case 2:case 15:return e=qs(e.type,!1),e;case 11:return e=qs(e.type.render,!1),e;case 1:return e=qs(e.type,!0),e;default:return""}}function ao(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case $t:return"Fragment";case Ut:return"Portal";case so:return"Profiler";case ni:return"StrictMode";case oo:return"Suspense";case io:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case yl:return(e.displayName||"Context")+".Consumer";case ml:return(e._context.displayName||"Context")+".Provider";case si:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case oi:return t=e.displayName||null,t!==null?t:ao(e.type)||"Memo";case at:t=e._payload,e=e._init;try{return ao(e(t))}catch{}}return null}function Ud(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ao(t);case 8:return t===ni?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function bt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function xl(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function $d(e){var t=xl(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),n=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var o=r.get,i=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(a){n=""+a,i.call(this,a)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(a){n=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function hn(e){e._valueTracker||(e._valueTracker=$d(e))}function vl(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),n="";return e&&(n=xl(e)?e.checked?"true":"false":e.value),e=n,e!==r?(t.setValue(e),!0):!1}function _n(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function lo(e,t){var r=t.checked;return K({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function Ki(e,t){var r=t.defaultValue==null?"":t.defaultValue,n=t.checked!=null?t.checked:t.defaultChecked;r=bt(t.value!=null?t.value:r),e._wrapperState={initialChecked:n,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function wl(e,t){t=t.checked,t!=null&&ri(e,"checked",t,!1)}function co(e,t){wl(e,t);var r=bt(t.value),n=t.type;if(r!=null)n==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(n==="submit"||n==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?uo(e,t.type,r):t.hasOwnProperty("defaultValue")&&uo(e,t.type,bt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Xi(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var n=t.type;if(!(n!=="submit"&&n!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function uo(e,t,r){(t!=="number"||_n(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var Nr=Array.isArray;function tr(e,t,r,n){if(e=e.options,t){t={};for(var o=0;o<r.length;o++)t["$"+r[o]]=!0;for(r=0;r<e.length;r++)o=t.hasOwnProperty("$"+e[r].value),e[r].selected!==o&&(e[r].selected=o),o&&n&&(e[r].defaultSelected=!0)}else{for(r=""+bt(r),t=null,o=0;o<e.length;o++){if(e[o].value===r){e[o].selected=!0,n&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function po(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(S(91));return K({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Zi(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(S(92));if(Nr(r)){if(1<r.length)throw Error(S(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:bt(r)}}function bl(e,t){var r=bt(t.value),n=bt(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),n!=null&&(e.defaultValue=""+n)}function ea(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function jl(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function fo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?jl(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var mn,Sl=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,n,o){MSApp.execUnsafeLocalFunction(function(){return e(t,r,n,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(mn=mn||document.createElement("div"),mn.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=mn.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Br(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var Pr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Hd=["Webkit","ms","Moz","O"];Object.keys(Pr).forEach(function(e){Hd.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Pr[t]=Pr[e]})});function kl(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||Pr.hasOwnProperty(e)&&Pr[e]?(""+t).trim():t+"px"}function Tl(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var n=r.indexOf("--")===0,o=kl(r,t[r],n);r==="float"&&(r="cssFloat"),n?e.setProperty(r,o):e[r]=o}}var Jd=K({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ho(e,t){if(t){if(Jd[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(S(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(S(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(S(61))}if(t.style!=null&&typeof t.style!="object")throw Error(S(62))}}function mo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var yo=null;function ii(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var go=null,rr=null,nr=null;function ta(e){if(e=ln(e)){if(typeof go!="function")throw Error(S(280));var t=e.stateNode;t&&(t=ys(t),go(e.stateNode,e.type,t))}}function El(e){rr?nr?nr.push(e):nr=[e]:rr=e}function Cl(){if(rr){var e=rr,t=nr;if(nr=rr=null,ta(e),t)for(e=0;e<t.length;e++)ta(t[e])}}function Il(e,t){return e(t)}function Nl(){}var zs=!1;function Rl(e,t,r){if(zs)return e(t,r);zs=!0;try{return Il(e,t,r)}finally{zs=!1,(rr!==null||nr!==null)&&(Nl(),Cl())}}function Ur(e,t){var r=e.stateNode;if(r===null)return null;var n=ys(r);if(n===null)return null;r=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(S(231,t,typeof r));return r}var xo=!1;if(et)try{var br={};Object.defineProperty(br,"passive",{get:function(){xo=!0}}),window.addEventListener("test",br,br),window.removeEventListener("test",br,br)}catch{xo=!1}function Qd(e,t,r,n,o,i,a,c,d){var u=Array.prototype.slice.call(arguments,3);try{t.apply(r,u)}catch(v){this.onError(v)}}var qr=!1,Bn=null,Un=!1,vo=null,Vd={onError:function(e){qr=!0,Bn=e}};function Gd(e,t,r,n,o,i,a,c,d){qr=!1,Bn=null,Qd.apply(Vd,arguments)}function Yd(e,t,r,n,o,i,a,c,d){if(Gd.apply(this,arguments),qr){if(qr){var u=Bn;qr=!1,Bn=null}else throw Error(S(198));Un||(Un=!0,vo=u)}}function _t(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function Al(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function ra(e){if(_t(e)!==e)throw Error(S(188))}function Kd(e){var t=e.alternate;if(!t){if(t=_t(e),t===null)throw Error(S(188));return t!==e?null:e}for(var r=e,n=t;;){var o=r.return;if(o===null)break;var i=o.alternate;if(i===null){if(n=o.return,n!==null){r=n;continue}break}if(o.child===i.child){for(i=o.child;i;){if(i===r)return ra(o),e;if(i===n)return ra(o),t;i=i.sibling}throw Error(S(188))}if(r.return!==n.return)r=o,n=i;else{for(var a=!1,c=o.child;c;){if(c===r){a=!0,r=o,n=i;break}if(c===n){a=!0,n=o,r=i;break}c=c.sibling}if(!a){for(c=i.child;c;){if(c===r){a=!0,r=i,n=o;break}if(c===n){a=!0,n=i,r=o;break}c=c.sibling}if(!a)throw Error(S(189))}}if(r.alternate!==n)throw Error(S(190))}if(r.tag!==3)throw Error(S(188));return r.stateNode.current===r?e:t}function Pl(e){return e=Kd(e),e!==null?ql(e):null}function ql(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=ql(e);if(t!==null)return t;e=e.sibling}return null}var zl=Ce.unstable_scheduleCallback,na=Ce.unstable_cancelCallback,Xd=Ce.unstable_shouldYield,Zd=Ce.unstable_requestPaint,te=Ce.unstable_now,eu=Ce.unstable_getCurrentPriorityLevel,ai=Ce.unstable_ImmediatePriority,Ll=Ce.unstable_UserBlockingPriority,$n=Ce.unstable_NormalPriority,tu=Ce.unstable_LowPriority,Ol=Ce.unstable_IdlePriority,ps=null,Qe=null;function ru(e){if(Qe&&typeof Qe.onCommitFiberRoot=="function")try{Qe.onCommitFiberRoot(ps,e,void 0,(e.current.flags&128)===128)}catch{}}var _e=Math.clz32?Math.clz32:ou,nu=Math.log,su=Math.LN2;function ou(e){return e>>>=0,e===0?32:31-(nu(e)/su|0)|0}var yn=64,gn=4194304;function Rr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Hn(e,t){var r=e.pendingLanes;if(r===0)return 0;var n=0,o=e.suspendedLanes,i=e.pingedLanes,a=r&268435455;if(a!==0){var c=a&~o;c!==0?n=Rr(c):(i&=a,i!==0&&(n=Rr(i)))}else a=r&~o,a!==0?n=Rr(a):i!==0&&(n=Rr(i));if(n===0)return 0;if(t!==0&&t!==n&&!(t&o)&&(o=n&-n,i=t&-t,o>=i||o===16&&(i&4194240)!==0))return t;if(n&4&&(n|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=n;0<t;)r=31-_e(t),o=1<<r,n|=e[r],t&=~o;return n}function iu(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function au(e,t){for(var r=e.suspendedLanes,n=e.pingedLanes,o=e.expirationTimes,i=e.pendingLanes;0<i;){var a=31-_e(i),c=1<<a,d=o[a];d===-1?(!(c&r)||c&n)&&(o[a]=iu(c,t)):d<=t&&(e.expiredLanes|=c),i&=~c}}function wo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Dl(){var e=yn;return yn<<=1,!(yn&4194240)&&(yn=64),e}function Ls(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function on(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-_e(t),e[t]=r}function lu(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var n=e.eventTimes;for(e=e.expirationTimes;0<r;){var o=31-_e(r),i=1<<o;t[o]=0,n[o]=-1,e[o]=-1,r&=~i}}function li(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var n=31-_e(r),o=1<<n;o&t|e[n]&t&&(e[n]|=t),r&=~o}}var U=0;function Ml(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Fl,ci,Wl,_l,Bl,bo=!1,xn=[],ft=null,ht=null,mt=null,$r=new Map,Hr=new Map,ct=[],cu="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function sa(e,t){switch(e){case"focusin":case"focusout":ft=null;break;case"dragenter":case"dragleave":ht=null;break;case"mouseover":case"mouseout":mt=null;break;case"pointerover":case"pointerout":$r.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Hr.delete(t.pointerId)}}function jr(e,t,r,n,o,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:r,eventSystemFlags:n,nativeEvent:i,targetContainers:[o]},t!==null&&(t=ln(t),t!==null&&ci(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function du(e,t,r,n,o){switch(t){case"focusin":return ft=jr(ft,e,t,r,n,o),!0;case"dragenter":return ht=jr(ht,e,t,r,n,o),!0;case"mouseover":return mt=jr(mt,e,t,r,n,o),!0;case"pointerover":var i=o.pointerId;return $r.set(i,jr($r.get(i)||null,e,t,r,n,o)),!0;case"gotpointercapture":return i=o.pointerId,Hr.set(i,jr(Hr.get(i)||null,e,t,r,n,o)),!0}return!1}function Ul(e){var t=Rt(e.target);if(t!==null){var r=_t(t);if(r!==null){if(t=r.tag,t===13){if(t=Al(r),t!==null){e.blockedOn=t,Bl(e.priority,function(){Wl(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function An(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=jo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var n=new r.constructor(r.type,r);yo=n,r.target.dispatchEvent(n),yo=null}else return t=ln(r),t!==null&&ci(t),e.blockedOn=r,!1;t.shift()}return!0}function oa(e,t,r){An(e)&&r.delete(t)}function uu(){bo=!1,ft!==null&&An(ft)&&(ft=null),ht!==null&&An(ht)&&(ht=null),mt!==null&&An(mt)&&(mt=null),$r.forEach(oa),Hr.forEach(oa)}function Sr(e,t){e.blockedOn===t&&(e.blockedOn=null,bo||(bo=!0,Ce.unstable_scheduleCallback(Ce.unstable_NormalPriority,uu)))}function Jr(e){function t(o){return Sr(o,e)}if(0<xn.length){Sr(xn[0],e);for(var r=1;r<xn.length;r++){var n=xn[r];n.blockedOn===e&&(n.blockedOn=null)}}for(ft!==null&&Sr(ft,e),ht!==null&&Sr(ht,e),mt!==null&&Sr(mt,e),$r.forEach(t),Hr.forEach(t),r=0;r<ct.length;r++)n=ct[r],n.blockedOn===e&&(n.blockedOn=null);for(;0<ct.length&&(r=ct[0],r.blockedOn===null);)Ul(r),r.blockedOn===null&&ct.shift()}var sr=st.ReactCurrentBatchConfig,Jn=!0;function pu(e,t,r,n){var o=U,i=sr.transition;sr.transition=null;try{U=1,di(e,t,r,n)}finally{U=o,sr.transition=i}}function fu(e,t,r,n){var o=U,i=sr.transition;sr.transition=null;try{U=4,di(e,t,r,n)}finally{U=o,sr.transition=i}}function di(e,t,r,n){if(Jn){var o=jo(e,t,r,n);if(o===null)Hs(e,t,n,Qn,r),sa(e,n);else if(du(o,e,t,r,n))n.stopPropagation();else if(sa(e,n),t&4&&-1<cu.indexOf(e)){for(;o!==null;){var i=ln(o);if(i!==null&&Fl(i),i=jo(e,t,r,n),i===null&&Hs(e,t,n,Qn,r),i===o)break;o=i}o!==null&&n.stopPropagation()}else Hs(e,t,n,null,r)}}var Qn=null;function jo(e,t,r,n){if(Qn=null,e=ii(n),e=Rt(e),e!==null)if(t=_t(e),t===null)e=null;else if(r=t.tag,r===13){if(e=Al(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Qn=e,null}function $l(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(eu()){case ai:return 1;case Ll:return 4;case $n:case tu:return 16;case Ol:return 536870912;default:return 16}default:return 16}}var ut=null,ui=null,Pn=null;function Hl(){if(Pn)return Pn;var e,t=ui,r=t.length,n,o="value"in ut?ut.value:ut.textContent,i=o.length;for(e=0;e<r&&t[e]===o[e];e++);var a=r-e;for(n=1;n<=a&&t[r-n]===o[i-n];n++);return Pn=o.slice(e,1<n?1-n:void 0)}function qn(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function vn(){return!0}function ia(){return!1}function Ne(e){function t(r,n,o,i,a){this._reactName=r,this._targetInst=o,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(r=e[c],this[c]=r?r(i):i[c]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?vn:ia,this.isPropagationStopped=ia,this}return K(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=vn)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=vn)},persist:function(){},isPersistent:vn}),t}var yr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},pi=Ne(yr),an=K({},yr,{view:0,detail:0}),hu=Ne(an),Os,Ds,kr,fs=K({},an,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:fi,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==kr&&(kr&&e.type==="mousemove"?(Os=e.screenX-kr.screenX,Ds=e.screenY-kr.screenY):Ds=Os=0,kr=e),Os)},movementY:function(e){return"movementY"in e?e.movementY:Ds}}),aa=Ne(fs),mu=K({},fs,{dataTransfer:0}),yu=Ne(mu),gu=K({},an,{relatedTarget:0}),Ms=Ne(gu),xu=K({},yr,{animationName:0,elapsedTime:0,pseudoElement:0}),vu=Ne(xu),wu=K({},yr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),bu=Ne(wu),ju=K({},yr,{data:0}),la=Ne(ju),Su={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ku={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Tu={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Eu(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Tu[e])?!!t[e]:!1}function fi(){return Eu}var Cu=K({},an,{key:function(e){if(e.key){var t=Su[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=qn(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?ku[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:fi,charCode:function(e){return e.type==="keypress"?qn(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?qn(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Iu=Ne(Cu),Nu=K({},fs,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ca=Ne(Nu),Ru=K({},an,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:fi}),Au=Ne(Ru),Pu=K({},yr,{propertyName:0,elapsedTime:0,pseudoElement:0}),qu=Ne(Pu),zu=K({},fs,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Lu=Ne(zu),Ou=[9,13,27,32],hi=et&&"CompositionEvent"in window,zr=null;et&&"documentMode"in document&&(zr=document.documentMode);var Du=et&&"TextEvent"in window&&!zr,Jl=et&&(!hi||zr&&8<zr&&11>=zr),da=" ",ua=!1;function Ql(e,t){switch(e){case"keyup":return Ou.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Vl(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ht=!1;function Mu(e,t){switch(e){case"compositionend":return Vl(t);case"keypress":return t.which!==32?null:(ua=!0,da);case"textInput":return e=t.data,e===da&&ua?null:e;default:return null}}function Fu(e,t){if(Ht)return e==="compositionend"||!hi&&Ql(e,t)?(e=Hl(),Pn=ui=ut=null,Ht=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Jl&&t.locale!=="ko"?null:t.data;default:return null}}var Wu={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function pa(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Wu[e.type]:t==="textarea"}function Gl(e,t,r,n){El(n),t=Vn(t,"onChange"),0<t.length&&(r=new pi("onChange","change",null,r,n),e.push({event:r,listeners:t}))}var Lr=null,Qr=null;function _u(e){ic(e,0)}function hs(e){var t=Vt(e);if(vl(t))return e}function Bu(e,t){if(e==="change")return t}var Yl=!1;if(et){var Fs;if(et){var Ws="oninput"in document;if(!Ws){var fa=document.createElement("div");fa.setAttribute("oninput","return;"),Ws=typeof fa.oninput=="function"}Fs=Ws}else Fs=!1;Yl=Fs&&(!document.documentMode||9<document.documentMode)}function ha(){Lr&&(Lr.detachEvent("onpropertychange",Kl),Qr=Lr=null)}function Kl(e){if(e.propertyName==="value"&&hs(Qr)){var t=[];Gl(t,Qr,e,ii(e)),Rl(_u,t)}}function Uu(e,t,r){e==="focusin"?(ha(),Lr=t,Qr=r,Lr.attachEvent("onpropertychange",Kl)):e==="focusout"&&ha()}function $u(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return hs(Qr)}function Hu(e,t){if(e==="click")return hs(t)}function Ju(e,t){if(e==="input"||e==="change")return hs(t)}function Qu(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ue=typeof Object.is=="function"?Object.is:Qu;function Vr(e,t){if(Ue(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(n=0;n<r.length;n++){var o=r[n];if(!no.call(t,o)||!Ue(e[o],t[o]))return!1}return!0}function ma(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ya(e,t){var r=ma(e);e=0;for(var n;r;){if(r.nodeType===3){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=ma(r)}}function Xl(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Xl(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Zl(){for(var e=window,t=_n();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=_n(e.document)}return t}function mi(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Vu(e){var t=Zl(),r=e.focusedElem,n=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&Xl(r.ownerDocument.documentElement,r)){if(n!==null&&mi(r)){if(t=n.start,e=n.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=r.textContent.length,i=Math.min(n.start,o);n=n.end===void 0?i:Math.min(n.end,o),!e.extend&&i>n&&(o=n,n=i,i=o),o=ya(r,i);var a=ya(r,n);o&&a&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),i>n?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Gu=et&&"documentMode"in document&&11>=document.documentMode,Jt=null,So=null,Or=null,ko=!1;function ga(e,t,r){var n=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;ko||Jt==null||Jt!==_n(n)||(n=Jt,"selectionStart"in n&&mi(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),Or&&Vr(Or,n)||(Or=n,n=Vn(So,"onSelect"),0<n.length&&(t=new pi("onSelect","select",null,t,r),e.push({event:t,listeners:n}),t.target=Jt)))}function wn(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var Qt={animationend:wn("Animation","AnimationEnd"),animationiteration:wn("Animation","AnimationIteration"),animationstart:wn("Animation","AnimationStart"),transitionend:wn("Transition","TransitionEnd")},_s={},ec={};et&&(ec=document.createElement("div").style,"AnimationEvent"in window||(delete Qt.animationend.animation,delete Qt.animationiteration.animation,delete Qt.animationstart.animation),"TransitionEvent"in window||delete Qt.transitionend.transition);function ms(e){if(_s[e])return _s[e];if(!Qt[e])return e;var t=Qt[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in ec)return _s[e]=t[r];return e}var tc=ms("animationend"),rc=ms("animationiteration"),nc=ms("animationstart"),sc=ms("transitionend"),oc=new Map,xa="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function St(e,t){oc.set(e,t),Wt(t,[e])}for(var Bs=0;Bs<xa.length;Bs++){var Us=xa[Bs],Yu=Us.toLowerCase(),Ku=Us[0].toUpperCase()+Us.slice(1);St(Yu,"on"+Ku)}St(tc,"onAnimationEnd");St(rc,"onAnimationIteration");St(nc,"onAnimationStart");St("dblclick","onDoubleClick");St("focusin","onFocus");St("focusout","onBlur");St(sc,"onTransitionEnd");lr("onMouseEnter",["mouseout","mouseover"]);lr("onMouseLeave",["mouseout","mouseover"]);lr("onPointerEnter",["pointerout","pointerover"]);lr("onPointerLeave",["pointerout","pointerover"]);Wt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Wt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Wt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Wt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Wt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Wt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ar="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Xu=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ar));function va(e,t,r){var n=e.type||"unknown-event";e.currentTarget=r,Yd(n,t,void 0,e),e.currentTarget=null}function ic(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var n=e[r],o=n.event;n=n.listeners;e:{var i=void 0;if(t)for(var a=n.length-1;0<=a;a--){var c=n[a],d=c.instance,u=c.currentTarget;if(c=c.listener,d!==i&&o.isPropagationStopped())break e;va(o,c,u),i=d}else for(a=0;a<n.length;a++){if(c=n[a],d=c.instance,u=c.currentTarget,c=c.listener,d!==i&&o.isPropagationStopped())break e;va(o,c,u),i=d}}}if(Un)throw e=vo,Un=!1,vo=null,e}function H(e,t){var r=t[No];r===void 0&&(r=t[No]=new Set);var n=e+"__bubble";r.has(n)||(ac(t,e,2,!1),r.add(n))}function $s(e,t,r){var n=0;t&&(n|=4),ac(r,e,n,t)}var bn="_reactListening"+Math.random().toString(36).slice(2);function Gr(e){if(!e[bn]){e[bn]=!0,hl.forEach(function(r){r!=="selectionchange"&&(Xu.has(r)||$s(r,!1,e),$s(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[bn]||(t[bn]=!0,$s("selectionchange",!1,t))}}function ac(e,t,r,n){switch($l(t)){case 1:var o=pu;break;case 4:o=fu;break;default:o=di}r=o.bind(null,t,r,e),o=void 0,!xo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),n?o!==void 0?e.addEventListener(t,r,{capture:!0,passive:o}):e.addEventListener(t,r,!0):o!==void 0?e.addEventListener(t,r,{passive:o}):e.addEventListener(t,r,!1)}function Hs(e,t,r,n,o){var i=n;if(!(t&1)&&!(t&2)&&n!==null)e:for(;;){if(n===null)return;var a=n.tag;if(a===3||a===4){var c=n.stateNode.containerInfo;if(c===o||c.nodeType===8&&c.parentNode===o)break;if(a===4)for(a=n.return;a!==null;){var d=a.tag;if((d===3||d===4)&&(d=a.stateNode.containerInfo,d===o||d.nodeType===8&&d.parentNode===o))return;a=a.return}for(;c!==null;){if(a=Rt(c),a===null)return;if(d=a.tag,d===5||d===6){n=i=a;continue e}c=c.parentNode}}n=n.return}Rl(function(){var u=i,v=ii(r),x=[];e:{var y=oc.get(e);if(y!==void 0){var w=pi,k=e;switch(e){case"keypress":if(qn(r)===0)break e;case"keydown":case"keyup":w=Iu;break;case"focusin":k="focus",w=Ms;break;case"focusout":k="blur",w=Ms;break;case"beforeblur":case"afterblur":w=Ms;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":w=aa;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":w=yu;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":w=Au;break;case tc:case rc:case nc:w=vu;break;case sc:w=qu;break;case"scroll":w=hu;break;case"wheel":w=Lu;break;case"copy":case"cut":case"paste":w=bu;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":w=ca}var T=(t&4)!==0,Q=!T&&e==="scroll",f=T?y!==null?y+"Capture":null:y;T=[];for(var p=u,h;p!==null;){h=p;var j=h.stateNode;if(h.tag===5&&j!==null&&(h=j,f!==null&&(j=Ur(p,f),j!=null&&T.push(Yr(p,j,h)))),Q)break;p=p.return}0<T.length&&(y=new w(y,k,null,r,v),x.push({event:y,listeners:T}))}}if(!(t&7)){e:{if(y=e==="mouseover"||e==="pointerover",w=e==="mouseout"||e==="pointerout",y&&r!==yo&&(k=r.relatedTarget||r.fromElement)&&(Rt(k)||k[tt]))break e;if((w||y)&&(y=v.window===v?v:(y=v.ownerDocument)?y.defaultView||y.parentWindow:window,w?(k=r.relatedTarget||r.toElement,w=u,k=k?Rt(k):null,k!==null&&(Q=_t(k),k!==Q||k.tag!==5&&k.tag!==6)&&(k=null)):(w=null,k=u),w!==k)){if(T=aa,j="onMouseLeave",f="onMouseEnter",p="mouse",(e==="pointerout"||e==="pointerover")&&(T=ca,j="onPointerLeave",f="onPointerEnter",p="pointer"),Q=w==null?y:Vt(w),h=k==null?y:Vt(k),y=new T(j,p+"leave",w,r,v),y.target=Q,y.relatedTarget=h,j=null,Rt(v)===u&&(T=new T(f,p+"enter",k,r,v),T.target=h,T.relatedTarget=Q,j=T),Q=j,w&&k)t:{for(T=w,f=k,p=0,h=T;h;h=Bt(h))p++;for(h=0,j=f;j;j=Bt(j))h++;for(;0<p-h;)T=Bt(T),p--;for(;0<h-p;)f=Bt(f),h--;for(;p--;){if(T===f||f!==null&&T===f.alternate)break t;T=Bt(T),f=Bt(f)}T=null}else T=null;w!==null&&wa(x,y,w,T,!1),k!==null&&Q!==null&&wa(x,Q,k,T,!0)}}e:{if(y=u?Vt(u):window,w=y.nodeName&&y.nodeName.toLowerCase(),w==="select"||w==="input"&&y.type==="file")var C=Bu;else if(pa(y))if(Yl)C=Ju;else{C=$u;var R=Uu}else(w=y.nodeName)&&w.toLowerCase()==="input"&&(y.type==="checkbox"||y.type==="radio")&&(C=Hu);if(C&&(C=C(e,u))){Gl(x,C,r,v);break e}R&&R(e,y,u),e==="focusout"&&(R=y._wrapperState)&&R.controlled&&y.type==="number"&&uo(y,"number",y.value)}switch(R=u?Vt(u):window,e){case"focusin":(pa(R)||R.contentEditable==="true")&&(Jt=R,So=u,Or=null);break;case"focusout":Or=So=Jt=null;break;case"mousedown":ko=!0;break;case"contextmenu":case"mouseup":case"dragend":ko=!1,ga(x,r,v);break;case"selectionchange":if(Gu)break;case"keydown":case"keyup":ga(x,r,v)}var A;if(hi)e:{switch(e){case"compositionstart":var q="onCompositionStart";break e;case"compositionend":q="onCompositionEnd";break e;case"compositionupdate":q="onCompositionUpdate";break e}q=void 0}else Ht?Ql(e,r)&&(q="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(q="onCompositionStart");q&&(Jl&&r.locale!=="ko"&&(Ht||q!=="onCompositionStart"?q==="onCompositionEnd"&&Ht&&(A=Hl()):(ut=v,ui="value"in ut?ut.value:ut.textContent,Ht=!0)),R=Vn(u,q),0<R.length&&(q=new la(q,e,null,r,v),x.push({event:q,listeners:R}),A?q.data=A:(A=Vl(r),A!==null&&(q.data=A)))),(A=Du?Mu(e,r):Fu(e,r))&&(u=Vn(u,"onBeforeInput"),0<u.length&&(v=new la("onBeforeInput","beforeinput",null,r,v),x.push({event:v,listeners:u}),v.data=A))}ic(x,t)})}function Yr(e,t,r){return{instance:e,listener:t,currentTarget:r}}function Vn(e,t){for(var r=t+"Capture",n=[];e!==null;){var o=e,i=o.stateNode;o.tag===5&&i!==null&&(o=i,i=Ur(e,r),i!=null&&n.unshift(Yr(e,i,o)),i=Ur(e,t),i!=null&&n.push(Yr(e,i,o))),e=e.return}return n}function Bt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function wa(e,t,r,n,o){for(var i=t._reactName,a=[];r!==null&&r!==n;){var c=r,d=c.alternate,u=c.stateNode;if(d!==null&&d===n)break;c.tag===5&&u!==null&&(c=u,o?(d=Ur(r,i),d!=null&&a.unshift(Yr(r,d,c))):o||(d=Ur(r,i),d!=null&&a.push(Yr(r,d,c)))),r=r.return}a.length!==0&&e.push({event:t,listeners:a})}var Zu=/\r\n?/g,ep=/\u0000|\uFFFD/g;function ba(e){return(typeof e=="string"?e:""+e).replace(Zu,`
`).replace(ep,"")}function jn(e,t,r){if(t=ba(t),ba(e)!==t&&r)throw Error(S(425))}function Gn(){}var To=null,Eo=null;function Co(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Io=typeof setTimeout=="function"?setTimeout:void 0,tp=typeof clearTimeout=="function"?clearTimeout:void 0,ja=typeof Promise=="function"?Promise:void 0,rp=typeof queueMicrotask=="function"?queueMicrotask:typeof ja<"u"?function(e){return ja.resolve(null).then(e).catch(np)}:Io;function np(e){setTimeout(function(){throw e})}function Js(e,t){var r=t,n=0;do{var o=r.nextSibling;if(e.removeChild(r),o&&o.nodeType===8)if(r=o.data,r==="/$"){if(n===0){e.removeChild(o),Jr(t);return}n--}else r!=="$"&&r!=="$?"&&r!=="$!"||n++;r=o}while(r);Jr(t)}function yt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Sa(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var gr=Math.random().toString(36).slice(2),Je="__reactFiber$"+gr,Kr="__reactProps$"+gr,tt="__reactContainer$"+gr,No="__reactEvents$"+gr,sp="__reactListeners$"+gr,op="__reactHandles$"+gr;function Rt(e){var t=e[Je];if(t)return t;for(var r=e.parentNode;r;){if(t=r[tt]||r[Je]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Sa(e);e!==null;){if(r=e[Je])return r;e=Sa(e)}return t}e=r,r=e.parentNode}return null}function ln(e){return e=e[Je]||e[tt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Vt(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(S(33))}function ys(e){return e[Kr]||null}var Ro=[],Gt=-1;function kt(e){return{current:e}}function J(e){0>Gt||(e.current=Ro[Gt],Ro[Gt]=null,Gt--)}function $(e,t){Gt++,Ro[Gt]=e.current,e.current=t}var jt={},he=kt(jt),be=kt(!1),Lt=jt;function cr(e,t){var r=e.type.contextTypes;if(!r)return jt;var n=e.stateNode;if(n&&n.__reactInternalMemoizedUnmaskedChildContext===t)return n.__reactInternalMemoizedMaskedChildContext;var o={},i;for(i in r)o[i]=t[i];return n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function je(e){return e=e.childContextTypes,e!=null}function Yn(){J(be),J(he)}function ka(e,t,r){if(he.current!==jt)throw Error(S(168));$(he,t),$(be,r)}function lc(e,t,r){var n=e.stateNode;if(t=t.childContextTypes,typeof n.getChildContext!="function")return r;n=n.getChildContext();for(var o in n)if(!(o in t))throw Error(S(108,Ud(e)||"Unknown",o));return K({},r,n)}function Kn(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||jt,Lt=he.current,$(he,e),$(be,be.current),!0}function Ta(e,t,r){var n=e.stateNode;if(!n)throw Error(S(169));r?(e=lc(e,t,Lt),n.__reactInternalMemoizedMergedChildContext=e,J(be),J(he),$(he,e)):J(be),$(be,r)}var Ye=null,gs=!1,Qs=!1;function cc(e){Ye===null?Ye=[e]:Ye.push(e)}function ip(e){gs=!0,cc(e)}function Tt(){if(!Qs&&Ye!==null){Qs=!0;var e=0,t=U;try{var r=Ye;for(U=1;e<r.length;e++){var n=r[e];do n=n(!0);while(n!==null)}Ye=null,gs=!1}catch(o){throw Ye!==null&&(Ye=Ye.slice(e+1)),zl(ai,Tt),o}finally{U=t,Qs=!1}}return null}var Yt=[],Kt=0,Xn=null,Zn=0,Re=[],Ae=0,Ot=null,Ke=1,Xe="";function It(e,t){Yt[Kt++]=Zn,Yt[Kt++]=Xn,Xn=e,Zn=t}function dc(e,t,r){Re[Ae++]=Ke,Re[Ae++]=Xe,Re[Ae++]=Ot,Ot=e;var n=Ke;e=Xe;var o=32-_e(n)-1;n&=~(1<<o),r+=1;var i=32-_e(t)+o;if(30<i){var a=o-o%5;i=(n&(1<<a)-1).toString(32),n>>=a,o-=a,Ke=1<<32-_e(t)+o|r<<o|n,Xe=i+e}else Ke=1<<i|r<<o|n,Xe=e}function yi(e){e.return!==null&&(It(e,1),dc(e,1,0))}function gi(e){for(;e===Xn;)Xn=Yt[--Kt],Yt[Kt]=null,Zn=Yt[--Kt],Yt[Kt]=null;for(;e===Ot;)Ot=Re[--Ae],Re[Ae]=null,Xe=Re[--Ae],Re[Ae]=null,Ke=Re[--Ae],Re[Ae]=null}var Ee=null,Te=null,V=!1,We=null;function uc(e,t){var r=Pe(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function Ea(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ee=e,Te=yt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ee=e,Te=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=Ot!==null?{id:Ke,overflow:Xe}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=Pe(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,Ee=e,Te=null,!0):!1;default:return!1}}function Ao(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Po(e){if(V){var t=Te;if(t){var r=t;if(!Ea(e,t)){if(Ao(e))throw Error(S(418));t=yt(r.nextSibling);var n=Ee;t&&Ea(e,t)?uc(n,r):(e.flags=e.flags&-4097|2,V=!1,Ee=e)}}else{if(Ao(e))throw Error(S(418));e.flags=e.flags&-4097|2,V=!1,Ee=e}}}function Ca(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ee=e}function Sn(e){if(e!==Ee)return!1;if(!V)return Ca(e),V=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Co(e.type,e.memoizedProps)),t&&(t=Te)){if(Ao(e))throw pc(),Error(S(418));for(;t;)uc(e,t),t=yt(t.nextSibling)}if(Ca(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(S(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){Te=yt(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}Te=null}}else Te=Ee?yt(e.stateNode.nextSibling):null;return!0}function pc(){for(var e=Te;e;)e=yt(e.nextSibling)}function dr(){Te=Ee=null,V=!1}function xi(e){We===null?We=[e]:We.push(e)}var ap=st.ReactCurrentBatchConfig;function Tr(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(S(309));var n=r.stateNode}if(!n)throw Error(S(147,e));var o=n,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(a){var c=o.refs;a===null?delete c[i]:c[i]=a},t._stringRef=i,t)}if(typeof e!="string")throw Error(S(284));if(!r._owner)throw Error(S(290,e))}return e}function kn(e,t){throw e=Object.prototype.toString.call(t),Error(S(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Ia(e){var t=e._init;return t(e._payload)}function fc(e){function t(f,p){if(e){var h=f.deletions;h===null?(f.deletions=[p],f.flags|=16):h.push(p)}}function r(f,p){if(!e)return null;for(;p!==null;)t(f,p),p=p.sibling;return null}function n(f,p){for(f=new Map;p!==null;)p.key!==null?f.set(p.key,p):f.set(p.index,p),p=p.sibling;return f}function o(f,p){return f=wt(f,p),f.index=0,f.sibling=null,f}function i(f,p,h){return f.index=h,e?(h=f.alternate,h!==null?(h=h.index,h<p?(f.flags|=2,p):h):(f.flags|=2,p)):(f.flags|=1048576,p)}function a(f){return e&&f.alternate===null&&(f.flags|=2),f}function c(f,p,h,j){return p===null||p.tag!==6?(p=eo(h,f.mode,j),p.return=f,p):(p=o(p,h),p.return=f,p)}function d(f,p,h,j){var C=h.type;return C===$t?v(f,p,h.props.children,j,h.key):p!==null&&(p.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===at&&Ia(C)===p.type)?(j=o(p,h.props),j.ref=Tr(f,p,h),j.return=f,j):(j=Wn(h.type,h.key,h.props,null,f.mode,j),j.ref=Tr(f,p,h),j.return=f,j)}function u(f,p,h,j){return p===null||p.tag!==4||p.stateNode.containerInfo!==h.containerInfo||p.stateNode.implementation!==h.implementation?(p=to(h,f.mode,j),p.return=f,p):(p=o(p,h.children||[]),p.return=f,p)}function v(f,p,h,j,C){return p===null||p.tag!==7?(p=zt(h,f.mode,j,C),p.return=f,p):(p=o(p,h),p.return=f,p)}function x(f,p,h){if(typeof p=="string"&&p!==""||typeof p=="number")return p=eo(""+p,f.mode,h),p.return=f,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case fn:return h=Wn(p.type,p.key,p.props,null,f.mode,h),h.ref=Tr(f,null,p),h.return=f,h;case Ut:return p=to(p,f.mode,h),p.return=f,p;case at:var j=p._init;return x(f,j(p._payload),h)}if(Nr(p)||wr(p))return p=zt(p,f.mode,h,null),p.return=f,p;kn(f,p)}return null}function y(f,p,h,j){var C=p!==null?p.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return C!==null?null:c(f,p,""+h,j);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case fn:return h.key===C?d(f,p,h,j):null;case Ut:return h.key===C?u(f,p,h,j):null;case at:return C=h._init,y(f,p,C(h._payload),j)}if(Nr(h)||wr(h))return C!==null?null:v(f,p,h,j,null);kn(f,h)}return null}function w(f,p,h,j,C){if(typeof j=="string"&&j!==""||typeof j=="number")return f=f.get(h)||null,c(p,f,""+j,C);if(typeof j=="object"&&j!==null){switch(j.$$typeof){case fn:return f=f.get(j.key===null?h:j.key)||null,d(p,f,j,C);case Ut:return f=f.get(j.key===null?h:j.key)||null,u(p,f,j,C);case at:var R=j._init;return w(f,p,h,R(j._payload),C)}if(Nr(j)||wr(j))return f=f.get(h)||null,v(p,f,j,C,null);kn(p,j)}return null}function k(f,p,h,j){for(var C=null,R=null,A=p,q=p=0,Z=null;A!==null&&q<h.length;q++){A.index>q?(Z=A,A=null):Z=A.sibling;var _=y(f,A,h[q],j);if(_===null){A===null&&(A=Z);break}e&&A&&_.alternate===null&&t(f,A),p=i(_,p,q),R===null?C=_:R.sibling=_,R=_,A=Z}if(q===h.length)return r(f,A),V&&It(f,q),C;if(A===null){for(;q<h.length;q++)A=x(f,h[q],j),A!==null&&(p=i(A,p,q),R===null?C=A:R.sibling=A,R=A);return V&&It(f,q),C}for(A=n(f,A);q<h.length;q++)Z=w(A,f,q,h[q],j),Z!==null&&(e&&Z.alternate!==null&&A.delete(Z.key===null?q:Z.key),p=i(Z,p,q),R===null?C=Z:R.sibling=Z,R=Z);return e&&A.forEach(function(Oe){return t(f,Oe)}),V&&It(f,q),C}function T(f,p,h,j){var C=wr(h);if(typeof C!="function")throw Error(S(150));if(h=C.call(h),h==null)throw Error(S(151));for(var R=C=null,A=p,q=p=0,Z=null,_=h.next();A!==null&&!_.done;q++,_=h.next()){A.index>q?(Z=A,A=null):Z=A.sibling;var Oe=y(f,A,_.value,j);if(Oe===null){A===null&&(A=Z);break}e&&A&&Oe.alternate===null&&t(f,A),p=i(Oe,p,q),R===null?C=Oe:R.sibling=Oe,R=Oe,A=Z}if(_.done)return r(f,A),V&&It(f,q),C;if(A===null){for(;!_.done;q++,_=h.next())_=x(f,_.value,j),_!==null&&(p=i(_,p,q),R===null?C=_:R.sibling=_,R=_);return V&&It(f,q),C}for(A=n(f,A);!_.done;q++,_=h.next())_=w(A,f,q,_.value,j),_!==null&&(e&&_.alternate!==null&&A.delete(_.key===null?q:_.key),p=i(_,p,q),R===null?C=_:R.sibling=_,R=_);return e&&A.forEach(function(xr){return t(f,xr)}),V&&It(f,q),C}function Q(f,p,h,j){if(typeof h=="object"&&h!==null&&h.type===$t&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case fn:e:{for(var C=h.key,R=p;R!==null;){if(R.key===C){if(C=h.type,C===$t){if(R.tag===7){r(f,R.sibling),p=o(R,h.props.children),p.return=f,f=p;break e}}else if(R.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===at&&Ia(C)===R.type){r(f,R.sibling),p=o(R,h.props),p.ref=Tr(f,R,h),p.return=f,f=p;break e}r(f,R);break}else t(f,R);R=R.sibling}h.type===$t?(p=zt(h.props.children,f.mode,j,h.key),p.return=f,f=p):(j=Wn(h.type,h.key,h.props,null,f.mode,j),j.ref=Tr(f,p,h),j.return=f,f=j)}return a(f);case Ut:e:{for(R=h.key;p!==null;){if(p.key===R)if(p.tag===4&&p.stateNode.containerInfo===h.containerInfo&&p.stateNode.implementation===h.implementation){r(f,p.sibling),p=o(p,h.children||[]),p.return=f,f=p;break e}else{r(f,p);break}else t(f,p);p=p.sibling}p=to(h,f.mode,j),p.return=f,f=p}return a(f);case at:return R=h._init,Q(f,p,R(h._payload),j)}if(Nr(h))return k(f,p,h,j);if(wr(h))return T(f,p,h,j);kn(f,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,p!==null&&p.tag===6?(r(f,p.sibling),p=o(p,h),p.return=f,f=p):(r(f,p),p=eo(h,f.mode,j),p.return=f,f=p),a(f)):r(f,p)}return Q}var ur=fc(!0),hc=fc(!1),es=kt(null),ts=null,Xt=null,vi=null;function wi(){vi=Xt=ts=null}function bi(e){var t=es.current;J(es),e._currentValue=t}function qo(e,t,r){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===r)break;e=e.return}}function or(e,t){ts=e,vi=Xt=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(we=!0),e.firstContext=null)}function ze(e){var t=e._currentValue;if(vi!==e)if(e={context:e,memoizedValue:t,next:null},Xt===null){if(ts===null)throw Error(S(308));Xt=e,ts.dependencies={lanes:0,firstContext:e}}else Xt=Xt.next=e;return t}var At=null;function ji(e){At===null?At=[e]:At.push(e)}function mc(e,t,r,n){var o=t.interleaved;return o===null?(r.next=r,ji(t)):(r.next=o.next,o.next=r),t.interleaved=r,rt(e,n)}function rt(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var lt=!1;function Si(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function yc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ze(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function gt(e,t,r){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,B&2){var o=n.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),n.pending=t,rt(e,r)}return o=n.interleaved,o===null?(t.next=t,ji(n)):(t.next=o.next,o.next=t),n.interleaved=t,rt(e,r)}function zn(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var n=t.lanes;n&=e.pendingLanes,r|=n,t.lanes=r,li(e,r)}}function Na(e,t){var r=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,r===n)){var o=null,i=null;if(r=r.firstBaseUpdate,r!==null){do{var a={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};i===null?o=i=a:i=i.next=a,r=r.next}while(r!==null);i===null?o=i=t:i=i.next=t}else o=i=t;r={baseState:n.baseState,firstBaseUpdate:o,lastBaseUpdate:i,shared:n.shared,effects:n.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function rs(e,t,r,n){var o=e.updateQueue;lt=!1;var i=o.firstBaseUpdate,a=o.lastBaseUpdate,c=o.shared.pending;if(c!==null){o.shared.pending=null;var d=c,u=d.next;d.next=null,a===null?i=u:a.next=u,a=d;var v=e.alternate;v!==null&&(v=v.updateQueue,c=v.lastBaseUpdate,c!==a&&(c===null?v.firstBaseUpdate=u:c.next=u,v.lastBaseUpdate=d))}if(i!==null){var x=o.baseState;a=0,v=u=d=null,c=i;do{var y=c.lane,w=c.eventTime;if((n&y)===y){v!==null&&(v=v.next={eventTime:w,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var k=e,T=c;switch(y=t,w=r,T.tag){case 1:if(k=T.payload,typeof k=="function"){x=k.call(w,x,y);break e}x=k;break e;case 3:k.flags=k.flags&-65537|128;case 0:if(k=T.payload,y=typeof k=="function"?k.call(w,x,y):k,y==null)break e;x=K({},x,y);break e;case 2:lt=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,y=o.effects,y===null?o.effects=[c]:y.push(c))}else w={eventTime:w,lane:y,tag:c.tag,payload:c.payload,callback:c.callback,next:null},v===null?(u=v=w,d=x):v=v.next=w,a|=y;if(c=c.next,c===null){if(c=o.shared.pending,c===null)break;y=c,c=y.next,y.next=null,o.lastBaseUpdate=y,o.shared.pending=null}}while(!0);if(v===null&&(d=x),o.baseState=d,o.firstBaseUpdate=u,o.lastBaseUpdate=v,t=o.shared.interleaved,t!==null){o=t;do a|=o.lane,o=o.next;while(o!==t)}else i===null&&(o.shared.lanes=0);Mt|=a,e.lanes=a,e.memoizedState=x}}function Ra(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var n=e[t],o=n.callback;if(o!==null){if(n.callback=null,n=r,typeof o!="function")throw Error(S(191,o));o.call(n)}}}var cn={},Ve=kt(cn),Xr=kt(cn),Zr=kt(cn);function Pt(e){if(e===cn)throw Error(S(174));return e}function ki(e,t){switch($(Zr,t),$(Xr,e),$(Ve,cn),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:fo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=fo(t,e)}J(Ve),$(Ve,t)}function pr(){J(Ve),J(Xr),J(Zr)}function gc(e){Pt(Zr.current);var t=Pt(Ve.current),r=fo(t,e.type);t!==r&&($(Xr,e),$(Ve,r))}function Ti(e){Xr.current===e&&(J(Ve),J(Xr))}var G=kt(0);function ns(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Vs=[];function Ei(){for(var e=0;e<Vs.length;e++)Vs[e]._workInProgressVersionPrimary=null;Vs.length=0}var Ln=st.ReactCurrentDispatcher,Gs=st.ReactCurrentBatchConfig,Dt=0,Y=null,ne=null,ie=null,ss=!1,Dr=!1,en=0,lp=0;function ue(){throw Error(S(321))}function Ci(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Ue(e[r],t[r]))return!1;return!0}function Ii(e,t,r,n,o,i){if(Dt=i,Y=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ln.current=e===null||e.memoizedState===null?pp:fp,e=r(n,o),Dr){i=0;do{if(Dr=!1,en=0,25<=i)throw Error(S(301));i+=1,ie=ne=null,t.updateQueue=null,Ln.current=hp,e=r(n,o)}while(Dr)}if(Ln.current=os,t=ne!==null&&ne.next!==null,Dt=0,ie=ne=Y=null,ss=!1,t)throw Error(S(300));return e}function Ni(){var e=en!==0;return en=0,e}function He(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ie===null?Y.memoizedState=ie=e:ie=ie.next=e,ie}function Le(){if(ne===null){var e=Y.alternate;e=e!==null?e.memoizedState:null}else e=ne.next;var t=ie===null?Y.memoizedState:ie.next;if(t!==null)ie=t,ne=e;else{if(e===null)throw Error(S(310));ne=e,e={memoizedState:ne.memoizedState,baseState:ne.baseState,baseQueue:ne.baseQueue,queue:ne.queue,next:null},ie===null?Y.memoizedState=ie=e:ie=ie.next=e}return ie}function tn(e,t){return typeof t=="function"?t(e):t}function Ys(e){var t=Le(),r=t.queue;if(r===null)throw Error(S(311));r.lastRenderedReducer=e;var n=ne,o=n.baseQueue,i=r.pending;if(i!==null){if(o!==null){var a=o.next;o.next=i.next,i.next=a}n.baseQueue=o=i,r.pending=null}if(o!==null){i=o.next,n=n.baseState;var c=a=null,d=null,u=i;do{var v=u.lane;if((Dt&v)===v)d!==null&&(d=d.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),n=u.hasEagerState?u.eagerState:e(n,u.action);else{var x={lane:v,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};d===null?(c=d=x,a=n):d=d.next=x,Y.lanes|=v,Mt|=v}u=u.next}while(u!==null&&u!==i);d===null?a=n:d.next=c,Ue(n,t.memoizedState)||(we=!0),t.memoizedState=n,t.baseState=a,t.baseQueue=d,r.lastRenderedState=n}if(e=r.interleaved,e!==null){o=e;do i=o.lane,Y.lanes|=i,Mt|=i,o=o.next;while(o!==e)}else o===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function Ks(e){var t=Le(),r=t.queue;if(r===null)throw Error(S(311));r.lastRenderedReducer=e;var n=r.dispatch,o=r.pending,i=t.memoizedState;if(o!==null){r.pending=null;var a=o=o.next;do i=e(i,a.action),a=a.next;while(a!==o);Ue(i,t.memoizedState)||(we=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),r.lastRenderedState=i}return[i,n]}function xc(){}function vc(e,t){var r=Y,n=Le(),o=t(),i=!Ue(n.memoizedState,o);if(i&&(n.memoizedState=o,we=!0),n=n.queue,Ri(jc.bind(null,r,n,e),[e]),n.getSnapshot!==t||i||ie!==null&&ie.memoizedState.tag&1){if(r.flags|=2048,rn(9,bc.bind(null,r,n,o,t),void 0,null),ae===null)throw Error(S(349));Dt&30||wc(r,t,o)}return o}function wc(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=Y.updateQueue,t===null?(t={lastEffect:null,stores:null},Y.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function bc(e,t,r,n){t.value=r,t.getSnapshot=n,Sc(t)&&kc(e)}function jc(e,t,r){return r(function(){Sc(t)&&kc(e)})}function Sc(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Ue(e,r)}catch{return!0}}function kc(e){var t=rt(e,1);t!==null&&Be(t,e,1,-1)}function Aa(e){var t=He();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:tn,lastRenderedState:e},t.queue=e,e=e.dispatch=up.bind(null,Y,e),[t.memoizedState,e]}function rn(e,t,r,n){return e={tag:e,create:t,destroy:r,deps:n,next:null},t=Y.updateQueue,t===null?(t={lastEffect:null,stores:null},Y.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(n=r.next,r.next=e,e.next=n,t.lastEffect=e)),e}function Tc(){return Le().memoizedState}function On(e,t,r,n){var o=He();Y.flags|=e,o.memoizedState=rn(1|t,r,void 0,n===void 0?null:n)}function xs(e,t,r,n){var o=Le();n=n===void 0?null:n;var i=void 0;if(ne!==null){var a=ne.memoizedState;if(i=a.destroy,n!==null&&Ci(n,a.deps)){o.memoizedState=rn(t,r,i,n);return}}Y.flags|=e,o.memoizedState=rn(1|t,r,i,n)}function Pa(e,t){return On(8390656,8,e,t)}function Ri(e,t){return xs(2048,8,e,t)}function Ec(e,t){return xs(4,2,e,t)}function Cc(e,t){return xs(4,4,e,t)}function Ic(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Nc(e,t,r){return r=r!=null?r.concat([e]):null,xs(4,4,Ic.bind(null,t,e),r)}function Ai(){}function Rc(e,t){var r=Le();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&Ci(t,n[1])?n[0]:(r.memoizedState=[e,t],e)}function Ac(e,t){var r=Le();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&Ci(t,n[1])?n[0]:(e=e(),r.memoizedState=[e,t],e)}function Pc(e,t,r){return Dt&21?(Ue(r,t)||(r=Dl(),Y.lanes|=r,Mt|=r,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,we=!0),e.memoizedState=r)}function cp(e,t){var r=U;U=r!==0&&4>r?r:4,e(!0);var n=Gs.transition;Gs.transition={};try{e(!1),t()}finally{U=r,Gs.transition=n}}function qc(){return Le().memoizedState}function dp(e,t,r){var n=vt(e);if(r={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null},zc(e))Lc(t,r);else if(r=mc(e,t,r,n),r!==null){var o=ye();Be(r,e,n,o),Oc(r,t,n)}}function up(e,t,r){var n=vt(e),o={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null};if(zc(e))Lc(t,o);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var a=t.lastRenderedState,c=i(a,r);if(o.hasEagerState=!0,o.eagerState=c,Ue(c,a)){var d=t.interleaved;d===null?(o.next=o,ji(t)):(o.next=d.next,d.next=o),t.interleaved=o;return}}catch{}finally{}r=mc(e,t,o,n),r!==null&&(o=ye(),Be(r,e,n,o),Oc(r,t,n))}}function zc(e){var t=e.alternate;return e===Y||t!==null&&t===Y}function Lc(e,t){Dr=ss=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function Oc(e,t,r){if(r&4194240){var n=t.lanes;n&=e.pendingLanes,r|=n,t.lanes=r,li(e,r)}}var os={readContext:ze,useCallback:ue,useContext:ue,useEffect:ue,useImperativeHandle:ue,useInsertionEffect:ue,useLayoutEffect:ue,useMemo:ue,useReducer:ue,useRef:ue,useState:ue,useDebugValue:ue,useDeferredValue:ue,useTransition:ue,useMutableSource:ue,useSyncExternalStore:ue,useId:ue,unstable_isNewReconciler:!1},pp={readContext:ze,useCallback:function(e,t){return He().memoizedState=[e,t===void 0?null:t],e},useContext:ze,useEffect:Pa,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,On(4194308,4,Ic.bind(null,t,e),r)},useLayoutEffect:function(e,t){return On(4194308,4,e,t)},useInsertionEffect:function(e,t){return On(4,2,e,t)},useMemo:function(e,t){var r=He();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var n=He();return t=r!==void 0?r(t):t,n.memoizedState=n.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},n.queue=e,e=e.dispatch=dp.bind(null,Y,e),[n.memoizedState,e]},useRef:function(e){var t=He();return e={current:e},t.memoizedState=e},useState:Aa,useDebugValue:Ai,useDeferredValue:function(e){return He().memoizedState=e},useTransition:function(){var e=Aa(!1),t=e[0];return e=cp.bind(null,e[1]),He().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var n=Y,o=He();if(V){if(r===void 0)throw Error(S(407));r=r()}else{if(r=t(),ae===null)throw Error(S(349));Dt&30||wc(n,t,r)}o.memoizedState=r;var i={value:r,getSnapshot:t};return o.queue=i,Pa(jc.bind(null,n,i,e),[e]),n.flags|=2048,rn(9,bc.bind(null,n,i,r,t),void 0,null),r},useId:function(){var e=He(),t=ae.identifierPrefix;if(V){var r=Xe,n=Ke;r=(n&~(1<<32-_e(n)-1)).toString(32)+r,t=":"+t+"R"+r,r=en++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=lp++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},fp={readContext:ze,useCallback:Rc,useContext:ze,useEffect:Ri,useImperativeHandle:Nc,useInsertionEffect:Ec,useLayoutEffect:Cc,useMemo:Ac,useReducer:Ys,useRef:Tc,useState:function(){return Ys(tn)},useDebugValue:Ai,useDeferredValue:function(e){var t=Le();return Pc(t,ne.memoizedState,e)},useTransition:function(){var e=Ys(tn)[0],t=Le().memoizedState;return[e,t]},useMutableSource:xc,useSyncExternalStore:vc,useId:qc,unstable_isNewReconciler:!1},hp={readContext:ze,useCallback:Rc,useContext:ze,useEffect:Ri,useImperativeHandle:Nc,useInsertionEffect:Ec,useLayoutEffect:Cc,useMemo:Ac,useReducer:Ks,useRef:Tc,useState:function(){return Ks(tn)},useDebugValue:Ai,useDeferredValue:function(e){var t=Le();return ne===null?t.memoizedState=e:Pc(t,ne.memoizedState,e)},useTransition:function(){var e=Ks(tn)[0],t=Le().memoizedState;return[e,t]},useMutableSource:xc,useSyncExternalStore:vc,useId:qc,unstable_isNewReconciler:!1};function Me(e,t){if(e&&e.defaultProps){t=K({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}function zo(e,t,r,n){t=e.memoizedState,r=r(n,t),r=r==null?t:K({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var vs={isMounted:function(e){return(e=e._reactInternals)?_t(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var n=ye(),o=vt(e),i=Ze(n,o);i.payload=t,r!=null&&(i.callback=r),t=gt(e,i,o),t!==null&&(Be(t,e,o,n),zn(t,e,o))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var n=ye(),o=vt(e),i=Ze(n,o);i.tag=1,i.payload=t,r!=null&&(i.callback=r),t=gt(e,i,o),t!==null&&(Be(t,e,o,n),zn(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=ye(),n=vt(e),o=Ze(r,n);o.tag=2,t!=null&&(o.callback=t),t=gt(e,o,n),t!==null&&(Be(t,e,n,r),zn(t,e,n))}};function qa(e,t,r,n,o,i,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,i,a):t.prototype&&t.prototype.isPureReactComponent?!Vr(r,n)||!Vr(o,i):!0}function Dc(e,t,r){var n=!1,o=jt,i=t.contextType;return typeof i=="object"&&i!==null?i=ze(i):(o=je(t)?Lt:he.current,n=t.contextTypes,i=(n=n!=null)?cr(e,o):jt),t=new t(r,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=vs,e.stateNode=t,t._reactInternals=e,n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=i),t}function za(e,t,r,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,n),t.state!==e&&vs.enqueueReplaceState(t,t.state,null)}function Lo(e,t,r,n){var o=e.stateNode;o.props=r,o.state=e.memoizedState,o.refs={},Si(e);var i=t.contextType;typeof i=="object"&&i!==null?o.context=ze(i):(i=je(t)?Lt:he.current,o.context=cr(e,i)),o.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(zo(e,t,i,r),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&vs.enqueueReplaceState(o,o.state,null),rs(e,r,o,n),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function fr(e,t){try{var r="",n=t;do r+=Bd(n),n=n.return;while(n);var o=r}catch(i){o=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:o,digest:null}}function Xs(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function Oo(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var mp=typeof WeakMap=="function"?WeakMap:Map;function Mc(e,t,r){r=Ze(-1,r),r.tag=3,r.payload={element:null};var n=t.value;return r.callback=function(){as||(as=!0,Jo=n),Oo(e,t)},r}function Fc(e,t,r){r=Ze(-1,r),r.tag=3;var n=e.type.getDerivedStateFromError;if(typeof n=="function"){var o=t.value;r.payload=function(){return n(o)},r.callback=function(){Oo(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(r.callback=function(){Oo(e,t),typeof n!="function"&&(xt===null?xt=new Set([this]):xt.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),r}function La(e,t,r){var n=e.pingCache;if(n===null){n=e.pingCache=new mp;var o=new Set;n.set(t,o)}else o=n.get(t),o===void 0&&(o=new Set,n.set(t,o));o.has(r)||(o.add(r),e=Np.bind(null,e,t,r),t.then(e,e))}function Oa(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Da(e,t,r,n,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=Ze(-1,1),t.tag=2,gt(r,t,1))),r.lanes|=1),e)}var yp=st.ReactCurrentOwner,we=!1;function me(e,t,r,n){t.child=e===null?hc(t,null,r,n):ur(t,e.child,r,n)}function Ma(e,t,r,n,o){r=r.render;var i=t.ref;return or(t,o),n=Ii(e,t,r,n,i,o),r=Ni(),e!==null&&!we?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,nt(e,t,o)):(V&&r&&yi(t),t.flags|=1,me(e,t,n,o),t.child)}function Fa(e,t,r,n,o){if(e===null){var i=r.type;return typeof i=="function"&&!Fi(i)&&i.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=i,Wc(e,t,i,n,o)):(e=Wn(r.type,null,n,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&o)){var a=i.memoizedProps;if(r=r.compare,r=r!==null?r:Vr,r(a,n)&&e.ref===t.ref)return nt(e,t,o)}return t.flags|=1,e=wt(i,n),e.ref=t.ref,e.return=t,t.child=e}function Wc(e,t,r,n,o){if(e!==null){var i=e.memoizedProps;if(Vr(i,n)&&e.ref===t.ref)if(we=!1,t.pendingProps=n=i,(e.lanes&o)!==0)e.flags&131072&&(we=!0);else return t.lanes=e.lanes,nt(e,t,o)}return Do(e,t,r,n,o)}function _c(e,t,r){var n=t.pendingProps,o=n.children,i=e!==null?e.memoizedState:null;if(n.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},$(er,ke),ke|=r;else{if(!(r&1073741824))return e=i!==null?i.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,$(er,ke),ke|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},n=i!==null?i.baseLanes:r,$(er,ke),ke|=n}else i!==null?(n=i.baseLanes|r,t.memoizedState=null):n=r,$(er,ke),ke|=n;return me(e,t,o,r),t.child}function Bc(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function Do(e,t,r,n,o){var i=je(r)?Lt:he.current;return i=cr(t,i),or(t,o),r=Ii(e,t,r,n,i,o),n=Ni(),e!==null&&!we?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,nt(e,t,o)):(V&&n&&yi(t),t.flags|=1,me(e,t,r,o),t.child)}function Wa(e,t,r,n,o){if(je(r)){var i=!0;Kn(t)}else i=!1;if(or(t,o),t.stateNode===null)Dn(e,t),Dc(t,r,n),Lo(t,r,n,o),n=!0;else if(e===null){var a=t.stateNode,c=t.memoizedProps;a.props=c;var d=a.context,u=r.contextType;typeof u=="object"&&u!==null?u=ze(u):(u=je(r)?Lt:he.current,u=cr(t,u));var v=r.getDerivedStateFromProps,x=typeof v=="function"||typeof a.getSnapshotBeforeUpdate=="function";x||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(c!==n||d!==u)&&za(t,a,n,u),lt=!1;var y=t.memoizedState;a.state=y,rs(t,n,a,o),d=t.memoizedState,c!==n||y!==d||be.current||lt?(typeof v=="function"&&(zo(t,r,v,n),d=t.memoizedState),(c=lt||qa(t,r,c,n,y,d,u))?(x||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=d),a.props=n,a.state=d,a.context=u,n=c):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{a=t.stateNode,yc(e,t),c=t.memoizedProps,u=t.type===t.elementType?c:Me(t.type,c),a.props=u,x=t.pendingProps,y=a.context,d=r.contextType,typeof d=="object"&&d!==null?d=ze(d):(d=je(r)?Lt:he.current,d=cr(t,d));var w=r.getDerivedStateFromProps;(v=typeof w=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(c!==x||y!==d)&&za(t,a,n,d),lt=!1,y=t.memoizedState,a.state=y,rs(t,n,a,o);var k=t.memoizedState;c!==x||y!==k||be.current||lt?(typeof w=="function"&&(zo(t,r,w,n),k=t.memoizedState),(u=lt||qa(t,r,u,n,y,k,d)||!1)?(v||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(n,k,d),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(n,k,d)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||c===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=k),a.props=n,a.state=k,a.context=d,n=u):(typeof a.componentDidUpdate!="function"||c===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),n=!1)}return Mo(e,t,r,n,i,o)}function Mo(e,t,r,n,o,i){Bc(e,t);var a=(t.flags&128)!==0;if(!n&&!a)return o&&Ta(t,r,!1),nt(e,t,i);n=t.stateNode,yp.current=t;var c=a&&typeof r.getDerivedStateFromError!="function"?null:n.render();return t.flags|=1,e!==null&&a?(t.child=ur(t,e.child,null,i),t.child=ur(t,null,c,i)):me(e,t,c,i),t.memoizedState=n.state,o&&Ta(t,r,!0),t.child}function Uc(e){var t=e.stateNode;t.pendingContext?ka(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ka(e,t.context,!1),ki(e,t.containerInfo)}function _a(e,t,r,n,o){return dr(),xi(o),t.flags|=256,me(e,t,r,n),t.child}var Fo={dehydrated:null,treeContext:null,retryLane:0};function Wo(e){return{baseLanes:e,cachePool:null,transitions:null}}function $c(e,t,r){var n=t.pendingProps,o=G.current,i=!1,a=(t.flags&128)!==0,c;if((c=a)||(c=e!==null&&e.memoizedState===null?!1:(o&2)!==0),c?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),$(G,o&1),e===null)return Po(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=n.children,e=n.fallback,i?(n=t.mode,i=t.child,a={mode:"hidden",children:a},!(n&1)&&i!==null?(i.childLanes=0,i.pendingProps=a):i=js(a,n,0,null),e=zt(e,n,r,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Wo(r),t.memoizedState=Fo,e):Pi(t,a));if(o=e.memoizedState,o!==null&&(c=o.dehydrated,c!==null))return gp(e,t,a,n,c,o,r);if(i){i=n.fallback,a=t.mode,o=e.child,c=o.sibling;var d={mode:"hidden",children:n.children};return!(a&1)&&t.child!==o?(n=t.child,n.childLanes=0,n.pendingProps=d,t.deletions=null):(n=wt(o,d),n.subtreeFlags=o.subtreeFlags&14680064),c!==null?i=wt(c,i):(i=zt(i,a,r,null),i.flags|=2),i.return=t,n.return=t,n.sibling=i,t.child=n,n=i,i=t.child,a=e.child.memoizedState,a=a===null?Wo(r):{baseLanes:a.baseLanes|r,cachePool:null,transitions:a.transitions},i.memoizedState=a,i.childLanes=e.childLanes&~r,t.memoizedState=Fo,n}return i=e.child,e=i.sibling,n=wt(i,{mode:"visible",children:n.children}),!(t.mode&1)&&(n.lanes=r),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n}function Pi(e,t){return t=js({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Tn(e,t,r,n){return n!==null&&xi(n),ur(t,e.child,null,r),e=Pi(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function gp(e,t,r,n,o,i,a){if(r)return t.flags&256?(t.flags&=-257,n=Xs(Error(S(422))),Tn(e,t,a,n)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=n.fallback,o=t.mode,n=js({mode:"visible",children:n.children},o,0,null),i=zt(i,o,a,null),i.flags|=2,n.return=t,i.return=t,n.sibling=i,t.child=n,t.mode&1&&ur(t,e.child,null,a),t.child.memoizedState=Wo(a),t.memoizedState=Fo,i);if(!(t.mode&1))return Tn(e,t,a,null);if(o.data==="$!"){if(n=o.nextSibling&&o.nextSibling.dataset,n)var c=n.dgst;return n=c,i=Error(S(419)),n=Xs(i,n,void 0),Tn(e,t,a,n)}if(c=(a&e.childLanes)!==0,we||c){if(n=ae,n!==null){switch(a&-a){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(n.suspendedLanes|a)?0:o,o!==0&&o!==i.retryLane&&(i.retryLane=o,rt(e,o),Be(n,e,o,-1))}return Mi(),n=Xs(Error(S(421))),Tn(e,t,a,n)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=Rp.bind(null,e),o._reactRetry=t,null):(e=i.treeContext,Te=yt(o.nextSibling),Ee=t,V=!0,We=null,e!==null&&(Re[Ae++]=Ke,Re[Ae++]=Xe,Re[Ae++]=Ot,Ke=e.id,Xe=e.overflow,Ot=t),t=Pi(t,n.children),t.flags|=4096,t)}function Ba(e,t,r){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),qo(e.return,t,r)}function Zs(e,t,r,n,o){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:r,tailMode:o}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=n,i.tail=r,i.tailMode=o)}function Hc(e,t,r){var n=t.pendingProps,o=n.revealOrder,i=n.tail;if(me(e,t,n.children,r),n=G.current,n&2)n=n&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ba(e,r,t);else if(e.tag===19)Ba(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}n&=1}if($(G,n),!(t.mode&1))t.memoizedState=null;else switch(o){case"forwards":for(r=t.child,o=null;r!==null;)e=r.alternate,e!==null&&ns(e)===null&&(o=r),r=r.sibling;r=o,r===null?(o=t.child,t.child=null):(o=r.sibling,r.sibling=null),Zs(t,!1,o,r,i);break;case"backwards":for(r=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&ns(e)===null){t.child=o;break}e=o.sibling,o.sibling=r,r=o,o=e}Zs(t,!0,r,null,i);break;case"together":Zs(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Dn(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function nt(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),Mt|=t.lanes,!(r&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(S(153));if(t.child!==null){for(e=t.child,r=wt(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=wt(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function xp(e,t,r){switch(t.tag){case 3:Uc(t),dr();break;case 5:gc(t);break;case 1:je(t.type)&&Kn(t);break;case 4:ki(t,t.stateNode.containerInfo);break;case 10:var n=t.type._context,o=t.memoizedProps.value;$(es,n._currentValue),n._currentValue=o;break;case 13:if(n=t.memoizedState,n!==null)return n.dehydrated!==null?($(G,G.current&1),t.flags|=128,null):r&t.child.childLanes?$c(e,t,r):($(G,G.current&1),e=nt(e,t,r),e!==null?e.sibling:null);$(G,G.current&1);break;case 19:if(n=(r&t.childLanes)!==0,e.flags&128){if(n)return Hc(e,t,r);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),$(G,G.current),n)break;return null;case 22:case 23:return t.lanes=0,_c(e,t,r)}return nt(e,t,r)}var Jc,_o,Qc,Vc;Jc=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};_o=function(){};Qc=function(e,t,r,n){var o=e.memoizedProps;if(o!==n){e=t.stateNode,Pt(Ve.current);var i=null;switch(r){case"input":o=lo(e,o),n=lo(e,n),i=[];break;case"select":o=K({},o,{value:void 0}),n=K({},n,{value:void 0}),i=[];break;case"textarea":o=po(e,o),n=po(e,n),i=[];break;default:typeof o.onClick!="function"&&typeof n.onClick=="function"&&(e.onclick=Gn)}ho(r,n);var a;r=null;for(u in o)if(!n.hasOwnProperty(u)&&o.hasOwnProperty(u)&&o[u]!=null)if(u==="style"){var c=o[u];for(a in c)c.hasOwnProperty(a)&&(r||(r={}),r[a]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(_r.hasOwnProperty(u)?i||(i=[]):(i=i||[]).push(u,null));for(u in n){var d=n[u];if(c=o!=null?o[u]:void 0,n.hasOwnProperty(u)&&d!==c&&(d!=null||c!=null))if(u==="style")if(c){for(a in c)!c.hasOwnProperty(a)||d&&d.hasOwnProperty(a)||(r||(r={}),r[a]="");for(a in d)d.hasOwnProperty(a)&&c[a]!==d[a]&&(r||(r={}),r[a]=d[a])}else r||(i||(i=[]),i.push(u,r)),r=d;else u==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,c=c?c.__html:void 0,d!=null&&c!==d&&(i=i||[]).push(u,d)):u==="children"?typeof d!="string"&&typeof d!="number"||(i=i||[]).push(u,""+d):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(_r.hasOwnProperty(u)?(d!=null&&u==="onScroll"&&H("scroll",e),i||c===d||(i=[])):(i=i||[]).push(u,d))}r&&(i=i||[]).push("style",r);var u=i;(t.updateQueue=u)&&(t.flags|=4)}};Vc=function(e,t,r,n){r!==n&&(t.flags|=4)};function Er(e,t){if(!V)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var n=null;r!==null;)r.alternate!==null&&(n=r),r=r.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function pe(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,n=0;if(t)for(var o=e.child;o!==null;)r|=o.lanes|o.childLanes,n|=o.subtreeFlags&14680064,n|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)r|=o.lanes|o.childLanes,n|=o.subtreeFlags,n|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=n,e.childLanes=r,t}function vp(e,t,r){var n=t.pendingProps;switch(gi(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return pe(t),null;case 1:return je(t.type)&&Yn(),pe(t),null;case 3:return n=t.stateNode,pr(),J(be),J(he),Ei(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Sn(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,We!==null&&(Go(We),We=null))),_o(e,t),pe(t),null;case 5:Ti(t);var o=Pt(Zr.current);if(r=t.type,e!==null&&t.stateNode!=null)Qc(e,t,r,n,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!n){if(t.stateNode===null)throw Error(S(166));return pe(t),null}if(e=Pt(Ve.current),Sn(t)){n=t.stateNode,r=t.type;var i=t.memoizedProps;switch(n[Je]=t,n[Kr]=i,e=(t.mode&1)!==0,r){case"dialog":H("cancel",n),H("close",n);break;case"iframe":case"object":case"embed":H("load",n);break;case"video":case"audio":for(o=0;o<Ar.length;o++)H(Ar[o],n);break;case"source":H("error",n);break;case"img":case"image":case"link":H("error",n),H("load",n);break;case"details":H("toggle",n);break;case"input":Ki(n,i),H("invalid",n);break;case"select":n._wrapperState={wasMultiple:!!i.multiple},H("invalid",n);break;case"textarea":Zi(n,i),H("invalid",n)}ho(r,i),o=null;for(var a in i)if(i.hasOwnProperty(a)){var c=i[a];a==="children"?typeof c=="string"?n.textContent!==c&&(i.suppressHydrationWarning!==!0&&jn(n.textContent,c,e),o=["children",c]):typeof c=="number"&&n.textContent!==""+c&&(i.suppressHydrationWarning!==!0&&jn(n.textContent,c,e),o=["children",""+c]):_r.hasOwnProperty(a)&&c!=null&&a==="onScroll"&&H("scroll",n)}switch(r){case"input":hn(n),Xi(n,i,!0);break;case"textarea":hn(n),ea(n);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(n.onclick=Gn)}n=o,t.updateQueue=n,n!==null&&(t.flags|=4)}else{a=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=jl(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof n.is=="string"?e=a.createElement(r,{is:n.is}):(e=a.createElement(r),r==="select"&&(a=e,n.multiple?a.multiple=!0:n.size&&(a.size=n.size))):e=a.createElementNS(e,r),e[Je]=t,e[Kr]=n,Jc(e,t,!1,!1),t.stateNode=e;e:{switch(a=mo(r,n),r){case"dialog":H("cancel",e),H("close",e),o=n;break;case"iframe":case"object":case"embed":H("load",e),o=n;break;case"video":case"audio":for(o=0;o<Ar.length;o++)H(Ar[o],e);o=n;break;case"source":H("error",e),o=n;break;case"img":case"image":case"link":H("error",e),H("load",e),o=n;break;case"details":H("toggle",e),o=n;break;case"input":Ki(e,n),o=lo(e,n),H("invalid",e);break;case"option":o=n;break;case"select":e._wrapperState={wasMultiple:!!n.multiple},o=K({},n,{value:void 0}),H("invalid",e);break;case"textarea":Zi(e,n),o=po(e,n),H("invalid",e);break;default:o=n}ho(r,o),c=o;for(i in c)if(c.hasOwnProperty(i)){var d=c[i];i==="style"?Tl(e,d):i==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,d!=null&&Sl(e,d)):i==="children"?typeof d=="string"?(r!=="textarea"||d!=="")&&Br(e,d):typeof d=="number"&&Br(e,""+d):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(_r.hasOwnProperty(i)?d!=null&&i==="onScroll"&&H("scroll",e):d!=null&&ri(e,i,d,a))}switch(r){case"input":hn(e),Xi(e,n,!1);break;case"textarea":hn(e),ea(e);break;case"option":n.value!=null&&e.setAttribute("value",""+bt(n.value));break;case"select":e.multiple=!!n.multiple,i=n.value,i!=null?tr(e,!!n.multiple,i,!1):n.defaultValue!=null&&tr(e,!!n.multiple,n.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Gn)}switch(r){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}}n&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return pe(t),null;case 6:if(e&&t.stateNode!=null)Vc(e,t,e.memoizedProps,n);else{if(typeof n!="string"&&t.stateNode===null)throw Error(S(166));if(r=Pt(Zr.current),Pt(Ve.current),Sn(t)){if(n=t.stateNode,r=t.memoizedProps,n[Je]=t,(i=n.nodeValue!==r)&&(e=Ee,e!==null))switch(e.tag){case 3:jn(n.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&jn(n.nodeValue,r,(e.mode&1)!==0)}i&&(t.flags|=4)}else n=(r.nodeType===9?r:r.ownerDocument).createTextNode(n),n[Je]=t,t.stateNode=n}return pe(t),null;case 13:if(J(G),n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(V&&Te!==null&&t.mode&1&&!(t.flags&128))pc(),dr(),t.flags|=98560,i=!1;else if(i=Sn(t),n!==null&&n.dehydrated!==null){if(e===null){if(!i)throw Error(S(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(S(317));i[Je]=t}else dr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;pe(t),i=!1}else We!==null&&(Go(We),We=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=r,t):(n=n!==null,n!==(e!==null&&e.memoizedState!==null)&&n&&(t.child.flags|=8192,t.mode&1&&(e===null||G.current&1?se===0&&(se=3):Mi())),t.updateQueue!==null&&(t.flags|=4),pe(t),null);case 4:return pr(),_o(e,t),e===null&&Gr(t.stateNode.containerInfo),pe(t),null;case 10:return bi(t.type._context),pe(t),null;case 17:return je(t.type)&&Yn(),pe(t),null;case 19:if(J(G),i=t.memoizedState,i===null)return pe(t),null;if(n=(t.flags&128)!==0,a=i.rendering,a===null)if(n)Er(i,!1);else{if(se!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=ns(e),a!==null){for(t.flags|=128,Er(i,!1),n=a.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),t.subtreeFlags=0,n=r,r=t.child;r!==null;)i=r,e=n,i.flags&=14680066,a=i.alternate,a===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=a.childLanes,i.lanes=a.lanes,i.child=a.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=a.memoizedProps,i.memoizedState=a.memoizedState,i.updateQueue=a.updateQueue,i.type=a.type,e=a.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return $(G,G.current&1|2),t.child}e=e.sibling}i.tail!==null&&te()>hr&&(t.flags|=128,n=!0,Er(i,!1),t.lanes=4194304)}else{if(!n)if(e=ns(a),e!==null){if(t.flags|=128,n=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),Er(i,!0),i.tail===null&&i.tailMode==="hidden"&&!a.alternate&&!V)return pe(t),null}else 2*te()-i.renderingStartTime>hr&&r!==1073741824&&(t.flags|=128,n=!0,Er(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(r=i.last,r!==null?r.sibling=a:t.child=a,i.last=a)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=te(),t.sibling=null,r=G.current,$(G,n?r&1|2:r&1),t):(pe(t),null);case 22:case 23:return Di(),n=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==n&&(t.flags|=8192),n&&t.mode&1?ke&1073741824&&(pe(t),t.subtreeFlags&6&&(t.flags|=8192)):pe(t),null;case 24:return null;case 25:return null}throw Error(S(156,t.tag))}function wp(e,t){switch(gi(t),t.tag){case 1:return je(t.type)&&Yn(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return pr(),J(be),J(he),Ei(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ti(t),null;case 13:if(J(G),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(S(340));dr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return J(G),null;case 4:return pr(),null;case 10:return bi(t.type._context),null;case 22:case 23:return Di(),null;case 24:return null;default:return null}}var En=!1,fe=!1,bp=typeof WeakSet=="function"?WeakSet:Set,E=null;function Zt(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(n){X(e,t,n)}else r.current=null}function Bo(e,t,r){try{r()}catch(n){X(e,t,n)}}var Ua=!1;function jp(e,t){if(To=Jn,e=Zl(),mi(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var n=r.getSelection&&r.getSelection();if(n&&n.rangeCount!==0){r=n.anchorNode;var o=n.anchorOffset,i=n.focusNode;n=n.focusOffset;try{r.nodeType,i.nodeType}catch{r=null;break e}var a=0,c=-1,d=-1,u=0,v=0,x=e,y=null;t:for(;;){for(var w;x!==r||o!==0&&x.nodeType!==3||(c=a+o),x!==i||n!==0&&x.nodeType!==3||(d=a+n),x.nodeType===3&&(a+=x.nodeValue.length),(w=x.firstChild)!==null;)y=x,x=w;for(;;){if(x===e)break t;if(y===r&&++u===o&&(c=a),y===i&&++v===n&&(d=a),(w=x.nextSibling)!==null)break;x=y,y=x.parentNode}x=w}r=c===-1||d===-1?null:{start:c,end:d}}else r=null}r=r||{start:0,end:0}}else r=null;for(Eo={focusedElem:e,selectionRange:r},Jn=!1,E=t;E!==null;)if(t=E,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,E=e;else for(;E!==null;){t=E;try{var k=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(k!==null){var T=k.memoizedProps,Q=k.memoizedState,f=t.stateNode,p=f.getSnapshotBeforeUpdate(t.elementType===t.type?T:Me(t.type,T),Q);f.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var h=t.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(S(163))}}catch(j){X(t,t.return,j)}if(e=t.sibling,e!==null){e.return=t.return,E=e;break}E=t.return}return k=Ua,Ua=!1,k}function Mr(e,t,r){var n=t.updateQueue;if(n=n!==null?n.lastEffect:null,n!==null){var o=n=n.next;do{if((o.tag&e)===e){var i=o.destroy;o.destroy=void 0,i!==void 0&&Bo(t,r,i)}o=o.next}while(o!==n)}}function ws(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var n=r.create;r.destroy=n()}r=r.next}while(r!==t)}}function Uo(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function Gc(e){var t=e.alternate;t!==null&&(e.alternate=null,Gc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Je],delete t[Kr],delete t[No],delete t[sp],delete t[op])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Yc(e){return e.tag===5||e.tag===3||e.tag===4}function $a(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Yc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function $o(e,t,r){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=Gn));else if(n!==4&&(e=e.child,e!==null))for($o(e,t,r),e=e.sibling;e!==null;)$o(e,t,r),e=e.sibling}function Ho(e,t,r){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(n!==4&&(e=e.child,e!==null))for(Ho(e,t,r),e=e.sibling;e!==null;)Ho(e,t,r),e=e.sibling}var le=null,Fe=!1;function ot(e,t,r){for(r=r.child;r!==null;)Kc(e,t,r),r=r.sibling}function Kc(e,t,r){if(Qe&&typeof Qe.onCommitFiberUnmount=="function")try{Qe.onCommitFiberUnmount(ps,r)}catch{}switch(r.tag){case 5:fe||Zt(r,t);case 6:var n=le,o=Fe;le=null,ot(e,t,r),le=n,Fe=o,le!==null&&(Fe?(e=le,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):le.removeChild(r.stateNode));break;case 18:le!==null&&(Fe?(e=le,r=r.stateNode,e.nodeType===8?Js(e.parentNode,r):e.nodeType===1&&Js(e,r),Jr(e)):Js(le,r.stateNode));break;case 4:n=le,o=Fe,le=r.stateNode.containerInfo,Fe=!0,ot(e,t,r),le=n,Fe=o;break;case 0:case 11:case 14:case 15:if(!fe&&(n=r.updateQueue,n!==null&&(n=n.lastEffect,n!==null))){o=n=n.next;do{var i=o,a=i.destroy;i=i.tag,a!==void 0&&(i&2||i&4)&&Bo(r,t,a),o=o.next}while(o!==n)}ot(e,t,r);break;case 1:if(!fe&&(Zt(r,t),n=r.stateNode,typeof n.componentWillUnmount=="function"))try{n.props=r.memoizedProps,n.state=r.memoizedState,n.componentWillUnmount()}catch(c){X(r,t,c)}ot(e,t,r);break;case 21:ot(e,t,r);break;case 22:r.mode&1?(fe=(n=fe)||r.memoizedState!==null,ot(e,t,r),fe=n):ot(e,t,r);break;default:ot(e,t,r)}}function Ha(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new bp),t.forEach(function(n){var o=Ap.bind(null,e,n);r.has(n)||(r.add(n),n.then(o,o))})}}function De(e,t){var r=t.deletions;if(r!==null)for(var n=0;n<r.length;n++){var o=r[n];try{var i=e,a=t,c=a;e:for(;c!==null;){switch(c.tag){case 5:le=c.stateNode,Fe=!1;break e;case 3:le=c.stateNode.containerInfo,Fe=!0;break e;case 4:le=c.stateNode.containerInfo,Fe=!0;break e}c=c.return}if(le===null)throw Error(S(160));Kc(i,a,o),le=null,Fe=!1;var d=o.alternate;d!==null&&(d.return=null),o.return=null}catch(u){X(o,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Xc(t,e),t=t.sibling}function Xc(e,t){var r=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(De(t,e),$e(e),n&4){try{Mr(3,e,e.return),ws(3,e)}catch(T){X(e,e.return,T)}try{Mr(5,e,e.return)}catch(T){X(e,e.return,T)}}break;case 1:De(t,e),$e(e),n&512&&r!==null&&Zt(r,r.return);break;case 5:if(De(t,e),$e(e),n&512&&r!==null&&Zt(r,r.return),e.flags&32){var o=e.stateNode;try{Br(o,"")}catch(T){X(e,e.return,T)}}if(n&4&&(o=e.stateNode,o!=null)){var i=e.memoizedProps,a=r!==null?r.memoizedProps:i,c=e.type,d=e.updateQueue;if(e.updateQueue=null,d!==null)try{c==="input"&&i.type==="radio"&&i.name!=null&&wl(o,i),mo(c,a);var u=mo(c,i);for(a=0;a<d.length;a+=2){var v=d[a],x=d[a+1];v==="style"?Tl(o,x):v==="dangerouslySetInnerHTML"?Sl(o,x):v==="children"?Br(o,x):ri(o,v,x,u)}switch(c){case"input":co(o,i);break;case"textarea":bl(o,i);break;case"select":var y=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!i.multiple;var w=i.value;w!=null?tr(o,!!i.multiple,w,!1):y!==!!i.multiple&&(i.defaultValue!=null?tr(o,!!i.multiple,i.defaultValue,!0):tr(o,!!i.multiple,i.multiple?[]:"",!1))}o[Kr]=i}catch(T){X(e,e.return,T)}}break;case 6:if(De(t,e),$e(e),n&4){if(e.stateNode===null)throw Error(S(162));o=e.stateNode,i=e.memoizedProps;try{o.nodeValue=i}catch(T){X(e,e.return,T)}}break;case 3:if(De(t,e),$e(e),n&4&&r!==null&&r.memoizedState.isDehydrated)try{Jr(t.containerInfo)}catch(T){X(e,e.return,T)}break;case 4:De(t,e),$e(e);break;case 13:De(t,e),$e(e),o=e.child,o.flags&8192&&(i=o.memoizedState!==null,o.stateNode.isHidden=i,!i||o.alternate!==null&&o.alternate.memoizedState!==null||(Li=te())),n&4&&Ha(e);break;case 22:if(v=r!==null&&r.memoizedState!==null,e.mode&1?(fe=(u=fe)||v,De(t,e),fe=u):De(t,e),$e(e),n&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!v&&e.mode&1)for(E=e,v=e.child;v!==null;){for(x=E=v;E!==null;){switch(y=E,w=y.child,y.tag){case 0:case 11:case 14:case 15:Mr(4,y,y.return);break;case 1:Zt(y,y.return);var k=y.stateNode;if(typeof k.componentWillUnmount=="function"){n=y,r=y.return;try{t=n,k.props=t.memoizedProps,k.state=t.memoizedState,k.componentWillUnmount()}catch(T){X(n,r,T)}}break;case 5:Zt(y,y.return);break;case 22:if(y.memoizedState!==null){Qa(x);continue}}w!==null?(w.return=y,E=w):Qa(x)}v=v.sibling}e:for(v=null,x=e;;){if(x.tag===5){if(v===null){v=x;try{o=x.stateNode,u?(i=o.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(c=x.stateNode,d=x.memoizedProps.style,a=d!=null&&d.hasOwnProperty("display")?d.display:null,c.style.display=kl("display",a))}catch(T){X(e,e.return,T)}}}else if(x.tag===6){if(v===null)try{x.stateNode.nodeValue=u?"":x.memoizedProps}catch(T){X(e,e.return,T)}}else if((x.tag!==22&&x.tag!==23||x.memoizedState===null||x===e)&&x.child!==null){x.child.return=x,x=x.child;continue}if(x===e)break e;for(;x.sibling===null;){if(x.return===null||x.return===e)break e;v===x&&(v=null),x=x.return}v===x&&(v=null),x.sibling.return=x.return,x=x.sibling}}break;case 19:De(t,e),$e(e),n&4&&Ha(e);break;case 21:break;default:De(t,e),$e(e)}}function $e(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(Yc(r)){var n=r;break e}r=r.return}throw Error(S(160))}switch(n.tag){case 5:var o=n.stateNode;n.flags&32&&(Br(o,""),n.flags&=-33);var i=$a(e);Ho(e,i,o);break;case 3:case 4:var a=n.stateNode.containerInfo,c=$a(e);$o(e,c,a);break;default:throw Error(S(161))}}catch(d){X(e,e.return,d)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Sp(e,t,r){E=e,Zc(e)}function Zc(e,t,r){for(var n=(e.mode&1)!==0;E!==null;){var o=E,i=o.child;if(o.tag===22&&n){var a=o.memoizedState!==null||En;if(!a){var c=o.alternate,d=c!==null&&c.memoizedState!==null||fe;c=En;var u=fe;if(En=a,(fe=d)&&!u)for(E=o;E!==null;)a=E,d=a.child,a.tag===22&&a.memoizedState!==null?Va(o):d!==null?(d.return=a,E=d):Va(o);for(;i!==null;)E=i,Zc(i),i=i.sibling;E=o,En=c,fe=u}Ja(e)}else o.subtreeFlags&8772&&i!==null?(i.return=o,E=i):Ja(e)}}function Ja(e){for(;E!==null;){var t=E;if(t.flags&8772){var r=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:fe||ws(5,t);break;case 1:var n=t.stateNode;if(t.flags&4&&!fe)if(r===null)n.componentDidMount();else{var o=t.elementType===t.type?r.memoizedProps:Me(t.type,r.memoizedProps);n.componentDidUpdate(o,r.memoizedState,n.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&Ra(t,i,n);break;case 3:var a=t.updateQueue;if(a!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}Ra(t,a,r)}break;case 5:var c=t.stateNode;if(r===null&&t.flags&4){r=c;var d=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":d.autoFocus&&r.focus();break;case"img":d.src&&(r.src=d.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var v=u.memoizedState;if(v!==null){var x=v.dehydrated;x!==null&&Jr(x)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(S(163))}fe||t.flags&512&&Uo(t)}catch(y){X(t,t.return,y)}}if(t===e){E=null;break}if(r=t.sibling,r!==null){r.return=t.return,E=r;break}E=t.return}}function Qa(e){for(;E!==null;){var t=E;if(t===e){E=null;break}var r=t.sibling;if(r!==null){r.return=t.return,E=r;break}E=t.return}}function Va(e){for(;E!==null;){var t=E;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{ws(4,t)}catch(d){X(t,r,d)}break;case 1:var n=t.stateNode;if(typeof n.componentDidMount=="function"){var o=t.return;try{n.componentDidMount()}catch(d){X(t,o,d)}}var i=t.return;try{Uo(t)}catch(d){X(t,i,d)}break;case 5:var a=t.return;try{Uo(t)}catch(d){X(t,a,d)}}}catch(d){X(t,t.return,d)}if(t===e){E=null;break}var c=t.sibling;if(c!==null){c.return=t.return,E=c;break}E=t.return}}var kp=Math.ceil,is=st.ReactCurrentDispatcher,qi=st.ReactCurrentOwner,qe=st.ReactCurrentBatchConfig,B=0,ae=null,re=null,ce=0,ke=0,er=kt(0),se=0,nn=null,Mt=0,bs=0,zi=0,Fr=null,ve=null,Li=0,hr=1/0,Ge=null,as=!1,Jo=null,xt=null,Cn=!1,pt=null,ls=0,Wr=0,Qo=null,Mn=-1,Fn=0;function ye(){return B&6?te():Mn!==-1?Mn:Mn=te()}function vt(e){return e.mode&1?B&2&&ce!==0?ce&-ce:ap.transition!==null?(Fn===0&&(Fn=Dl()),Fn):(e=U,e!==0||(e=window.event,e=e===void 0?16:$l(e.type)),e):1}function Be(e,t,r,n){if(50<Wr)throw Wr=0,Qo=null,Error(S(185));on(e,r,n),(!(B&2)||e!==ae)&&(e===ae&&(!(B&2)&&(bs|=r),se===4&&dt(e,ce)),Se(e,n),r===1&&B===0&&!(t.mode&1)&&(hr=te()+500,gs&&Tt()))}function Se(e,t){var r=e.callbackNode;au(e,t);var n=Hn(e,e===ae?ce:0);if(n===0)r!==null&&na(r),e.callbackNode=null,e.callbackPriority=0;else if(t=n&-n,e.callbackPriority!==t){if(r!=null&&na(r),t===1)e.tag===0?ip(Ga.bind(null,e)):cc(Ga.bind(null,e)),rp(function(){!(B&6)&&Tt()}),r=null;else{switch(Ml(n)){case 1:r=ai;break;case 4:r=Ll;break;case 16:r=$n;break;case 536870912:r=Ol;break;default:r=$n}r=ad(r,ed.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function ed(e,t){if(Mn=-1,Fn=0,B&6)throw Error(S(327));var r=e.callbackNode;if(ir()&&e.callbackNode!==r)return null;var n=Hn(e,e===ae?ce:0);if(n===0)return null;if(n&30||n&e.expiredLanes||t)t=cs(e,n);else{t=n;var o=B;B|=2;var i=rd();(ae!==e||ce!==t)&&(Ge=null,hr=te()+500,qt(e,t));do try{Cp();break}catch(c){td(e,c)}while(!0);wi(),is.current=i,B=o,re!==null?t=0:(ae=null,ce=0,t=se)}if(t!==0){if(t===2&&(o=wo(e),o!==0&&(n=o,t=Vo(e,o))),t===1)throw r=nn,qt(e,0),dt(e,n),Se(e,te()),r;if(t===6)dt(e,n);else{if(o=e.current.alternate,!(n&30)&&!Tp(o)&&(t=cs(e,n),t===2&&(i=wo(e),i!==0&&(n=i,t=Vo(e,i))),t===1))throw r=nn,qt(e,0),dt(e,n),Se(e,te()),r;switch(e.finishedWork=o,e.finishedLanes=n,t){case 0:case 1:throw Error(S(345));case 2:Nt(e,ve,Ge);break;case 3:if(dt(e,n),(n&130023424)===n&&(t=Li+500-te(),10<t)){if(Hn(e,0)!==0)break;if(o=e.suspendedLanes,(o&n)!==n){ye(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=Io(Nt.bind(null,e,ve,Ge),t);break}Nt(e,ve,Ge);break;case 4:if(dt(e,n),(n&4194240)===n)break;for(t=e.eventTimes,o=-1;0<n;){var a=31-_e(n);i=1<<a,a=t[a],a>o&&(o=a),n&=~i}if(n=o,n=te()-n,n=(120>n?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*kp(n/1960))-n,10<n){e.timeoutHandle=Io(Nt.bind(null,e,ve,Ge),n);break}Nt(e,ve,Ge);break;case 5:Nt(e,ve,Ge);break;default:throw Error(S(329))}}}return Se(e,te()),e.callbackNode===r?ed.bind(null,e):null}function Vo(e,t){var r=Fr;return e.current.memoizedState.isDehydrated&&(qt(e,t).flags|=256),e=cs(e,t),e!==2&&(t=ve,ve=r,t!==null&&Go(t)),e}function Go(e){ve===null?ve=e:ve.push.apply(ve,e)}function Tp(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var n=0;n<r.length;n++){var o=r[n],i=o.getSnapshot;o=o.value;try{if(!Ue(i(),o))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function dt(e,t){for(t&=~zi,t&=~bs,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-_e(t),n=1<<r;e[r]=-1,t&=~n}}function Ga(e){if(B&6)throw Error(S(327));ir();var t=Hn(e,0);if(!(t&1))return Se(e,te()),null;var r=cs(e,t);if(e.tag!==0&&r===2){var n=wo(e);n!==0&&(t=n,r=Vo(e,n))}if(r===1)throw r=nn,qt(e,0),dt(e,t),Se(e,te()),r;if(r===6)throw Error(S(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Nt(e,ve,Ge),Se(e,te()),null}function Oi(e,t){var r=B;B|=1;try{return e(t)}finally{B=r,B===0&&(hr=te()+500,gs&&Tt())}}function Ft(e){pt!==null&&pt.tag===0&&!(B&6)&&ir();var t=B;B|=1;var r=qe.transition,n=U;try{if(qe.transition=null,U=1,e)return e()}finally{U=n,qe.transition=r,B=t,!(B&6)&&Tt()}}function Di(){ke=er.current,J(er)}function qt(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,tp(r)),re!==null)for(r=re.return;r!==null;){var n=r;switch(gi(n),n.tag){case 1:n=n.type.childContextTypes,n!=null&&Yn();break;case 3:pr(),J(be),J(he),Ei();break;case 5:Ti(n);break;case 4:pr();break;case 13:J(G);break;case 19:J(G);break;case 10:bi(n.type._context);break;case 22:case 23:Di()}r=r.return}if(ae=e,re=e=wt(e.current,null),ce=ke=t,se=0,nn=null,zi=bs=Mt=0,ve=Fr=null,At!==null){for(t=0;t<At.length;t++)if(r=At[t],n=r.interleaved,n!==null){r.interleaved=null;var o=n.next,i=r.pending;if(i!==null){var a=i.next;i.next=o,n.next=a}r.pending=n}At=null}return e}function td(e,t){do{var r=re;try{if(wi(),Ln.current=os,ss){for(var n=Y.memoizedState;n!==null;){var o=n.queue;o!==null&&(o.pending=null),n=n.next}ss=!1}if(Dt=0,ie=ne=Y=null,Dr=!1,en=0,qi.current=null,r===null||r.return===null){se=1,nn=t,re=null;break}e:{var i=e,a=r.return,c=r,d=t;if(t=ce,c.flags|=32768,d!==null&&typeof d=="object"&&typeof d.then=="function"){var u=d,v=c,x=v.tag;if(!(v.mode&1)&&(x===0||x===11||x===15)){var y=v.alternate;y?(v.updateQueue=y.updateQueue,v.memoizedState=y.memoizedState,v.lanes=y.lanes):(v.updateQueue=null,v.memoizedState=null)}var w=Oa(a);if(w!==null){w.flags&=-257,Da(w,a,c,i,t),w.mode&1&&La(i,u,t),t=w,d=u;var k=t.updateQueue;if(k===null){var T=new Set;T.add(d),t.updateQueue=T}else k.add(d);break e}else{if(!(t&1)){La(i,u,t),Mi();break e}d=Error(S(426))}}else if(V&&c.mode&1){var Q=Oa(a);if(Q!==null){!(Q.flags&65536)&&(Q.flags|=256),Da(Q,a,c,i,t),xi(fr(d,c));break e}}i=d=fr(d,c),se!==4&&(se=2),Fr===null?Fr=[i]:Fr.push(i),i=a;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var f=Mc(i,d,t);Na(i,f);break e;case 1:c=d;var p=i.type,h=i.stateNode;if(!(i.flags&128)&&(typeof p.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(xt===null||!xt.has(h)))){i.flags|=65536,t&=-t,i.lanes|=t;var j=Fc(i,c,t);Na(i,j);break e}}i=i.return}while(i!==null)}sd(r)}catch(C){t=C,re===r&&r!==null&&(re=r=r.return);continue}break}while(!0)}function rd(){var e=is.current;return is.current=os,e===null?os:e}function Mi(){(se===0||se===3||se===2)&&(se=4),ae===null||!(Mt&268435455)&&!(bs&268435455)||dt(ae,ce)}function cs(e,t){var r=B;B|=2;var n=rd();(ae!==e||ce!==t)&&(Ge=null,qt(e,t));do try{Ep();break}catch(o){td(e,o)}while(!0);if(wi(),B=r,is.current=n,re!==null)throw Error(S(261));return ae=null,ce=0,se}function Ep(){for(;re!==null;)nd(re)}function Cp(){for(;re!==null&&!Xd();)nd(re)}function nd(e){var t=id(e.alternate,e,ke);e.memoizedProps=e.pendingProps,t===null?sd(e):re=t,qi.current=null}function sd(e){var t=e;do{var r=t.alternate;if(e=t.return,t.flags&32768){if(r=wp(r,t),r!==null){r.flags&=32767,re=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{se=6,re=null;return}}else if(r=vp(r,t,ke),r!==null){re=r;return}if(t=t.sibling,t!==null){re=t;return}re=t=e}while(t!==null);se===0&&(se=5)}function Nt(e,t,r){var n=U,o=qe.transition;try{qe.transition=null,U=1,Ip(e,t,r,n)}finally{qe.transition=o,U=n}return null}function Ip(e,t,r,n){do ir();while(pt!==null);if(B&6)throw Error(S(327));r=e.finishedWork;var o=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(S(177));e.callbackNode=null,e.callbackPriority=0;var i=r.lanes|r.childLanes;if(lu(e,i),e===ae&&(re=ae=null,ce=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||Cn||(Cn=!0,ad($n,function(){return ir(),null})),i=(r.flags&15990)!==0,r.subtreeFlags&15990||i){i=qe.transition,qe.transition=null;var a=U;U=1;var c=B;B|=4,qi.current=null,jp(e,r),Xc(r,e),Vu(Eo),Jn=!!To,Eo=To=null,e.current=r,Sp(r),Zd(),B=c,U=a,qe.transition=i}else e.current=r;if(Cn&&(Cn=!1,pt=e,ls=o),i=e.pendingLanes,i===0&&(xt=null),ru(r.stateNode),Se(e,te()),t!==null)for(n=e.onRecoverableError,r=0;r<t.length;r++)o=t[r],n(o.value,{componentStack:o.stack,digest:o.digest});if(as)throw as=!1,e=Jo,Jo=null,e;return ls&1&&e.tag!==0&&ir(),i=e.pendingLanes,i&1?e===Qo?Wr++:(Wr=0,Qo=e):Wr=0,Tt(),null}function ir(){if(pt!==null){var e=Ml(ls),t=qe.transition,r=U;try{if(qe.transition=null,U=16>e?16:e,pt===null)var n=!1;else{if(e=pt,pt=null,ls=0,B&6)throw Error(S(331));var o=B;for(B|=4,E=e.current;E!==null;){var i=E,a=i.child;if(E.flags&16){var c=i.deletions;if(c!==null){for(var d=0;d<c.length;d++){var u=c[d];for(E=u;E!==null;){var v=E;switch(v.tag){case 0:case 11:case 15:Mr(8,v,i)}var x=v.child;if(x!==null)x.return=v,E=x;else for(;E!==null;){v=E;var y=v.sibling,w=v.return;if(Gc(v),v===u){E=null;break}if(y!==null){y.return=w,E=y;break}E=w}}}var k=i.alternate;if(k!==null){var T=k.child;if(T!==null){k.child=null;do{var Q=T.sibling;T.sibling=null,T=Q}while(T!==null)}}E=i}}if(i.subtreeFlags&2064&&a!==null)a.return=i,E=a;else e:for(;E!==null;){if(i=E,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Mr(9,i,i.return)}var f=i.sibling;if(f!==null){f.return=i.return,E=f;break e}E=i.return}}var p=e.current;for(E=p;E!==null;){a=E;var h=a.child;if(a.subtreeFlags&2064&&h!==null)h.return=a,E=h;else e:for(a=p;E!==null;){if(c=E,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:ws(9,c)}}catch(C){X(c,c.return,C)}if(c===a){E=null;break e}var j=c.sibling;if(j!==null){j.return=c.return,E=j;break e}E=c.return}}if(B=o,Tt(),Qe&&typeof Qe.onPostCommitFiberRoot=="function")try{Qe.onPostCommitFiberRoot(ps,e)}catch{}n=!0}return n}finally{U=r,qe.transition=t}}return!1}function Ya(e,t,r){t=fr(r,t),t=Mc(e,t,1),e=gt(e,t,1),t=ye(),e!==null&&(on(e,1,t),Se(e,t))}function X(e,t,r){if(e.tag===3)Ya(e,e,r);else for(;t!==null;){if(t.tag===3){Ya(t,e,r);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(xt===null||!xt.has(n))){e=fr(r,e),e=Fc(t,e,1),t=gt(t,e,1),e=ye(),t!==null&&(on(t,1,e),Se(t,e));break}}t=t.return}}function Np(e,t,r){var n=e.pingCache;n!==null&&n.delete(t),t=ye(),e.pingedLanes|=e.suspendedLanes&r,ae===e&&(ce&r)===r&&(se===4||se===3&&(ce&130023424)===ce&&500>te()-Li?qt(e,0):zi|=r),Se(e,t)}function od(e,t){t===0&&(e.mode&1?(t=gn,gn<<=1,!(gn&130023424)&&(gn=4194304)):t=1);var r=ye();e=rt(e,t),e!==null&&(on(e,t,r),Se(e,r))}function Rp(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),od(e,r)}function Ap(e,t){var r=0;switch(e.tag){case 13:var n=e.stateNode,o=e.memoizedState;o!==null&&(r=o.retryLane);break;case 19:n=e.stateNode;break;default:throw Error(S(314))}n!==null&&n.delete(t),od(e,r)}var id;id=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||be.current)we=!0;else{if(!(e.lanes&r)&&!(t.flags&128))return we=!1,xp(e,t,r);we=!!(e.flags&131072)}else we=!1,V&&t.flags&1048576&&dc(t,Zn,t.index);switch(t.lanes=0,t.tag){case 2:var n=t.type;Dn(e,t),e=t.pendingProps;var o=cr(t,he.current);or(t,r),o=Ii(null,t,n,e,o,r);var i=Ni();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,je(n)?(i=!0,Kn(t)):i=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Si(t),o.updater=vs,t.stateNode=o,o._reactInternals=t,Lo(t,n,e,r),t=Mo(null,t,n,!0,i,r)):(t.tag=0,V&&i&&yi(t),me(null,t,o,r),t=t.child),t;case 16:n=t.elementType;e:{switch(Dn(e,t),e=t.pendingProps,o=n._init,n=o(n._payload),t.type=n,o=t.tag=qp(n),e=Me(n,e),o){case 0:t=Do(null,t,n,e,r);break e;case 1:t=Wa(null,t,n,e,r);break e;case 11:t=Ma(null,t,n,e,r);break e;case 14:t=Fa(null,t,n,Me(n.type,e),r);break e}throw Error(S(306,n,""))}return t;case 0:return n=t.type,o=t.pendingProps,o=t.elementType===n?o:Me(n,o),Do(e,t,n,o,r);case 1:return n=t.type,o=t.pendingProps,o=t.elementType===n?o:Me(n,o),Wa(e,t,n,o,r);case 3:e:{if(Uc(t),e===null)throw Error(S(387));n=t.pendingProps,i=t.memoizedState,o=i.element,yc(e,t),rs(t,n,null,r);var a=t.memoizedState;if(n=a.element,i.isDehydrated)if(i={element:n,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){o=fr(Error(S(423)),t),t=_a(e,t,n,r,o);break e}else if(n!==o){o=fr(Error(S(424)),t),t=_a(e,t,n,r,o);break e}else for(Te=yt(t.stateNode.containerInfo.firstChild),Ee=t,V=!0,We=null,r=hc(t,null,n,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(dr(),n===o){t=nt(e,t,r);break e}me(e,t,n,r)}t=t.child}return t;case 5:return gc(t),e===null&&Po(t),n=t.type,o=t.pendingProps,i=e!==null?e.memoizedProps:null,a=o.children,Co(n,o)?a=null:i!==null&&Co(n,i)&&(t.flags|=32),Bc(e,t),me(e,t,a,r),t.child;case 6:return e===null&&Po(t),null;case 13:return $c(e,t,r);case 4:return ki(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=ur(t,null,n,r):me(e,t,n,r),t.child;case 11:return n=t.type,o=t.pendingProps,o=t.elementType===n?o:Me(n,o),Ma(e,t,n,o,r);case 7:return me(e,t,t.pendingProps,r),t.child;case 8:return me(e,t,t.pendingProps.children,r),t.child;case 12:return me(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(n=t.type._context,o=t.pendingProps,i=t.memoizedProps,a=o.value,$(es,n._currentValue),n._currentValue=a,i!==null)if(Ue(i.value,a)){if(i.children===o.children&&!be.current){t=nt(e,t,r);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var c=i.dependencies;if(c!==null){a=i.child;for(var d=c.firstContext;d!==null;){if(d.context===n){if(i.tag===1){d=Ze(-1,r&-r),d.tag=2;var u=i.updateQueue;if(u!==null){u=u.shared;var v=u.pending;v===null?d.next=d:(d.next=v.next,v.next=d),u.pending=d}}i.lanes|=r,d=i.alternate,d!==null&&(d.lanes|=r),qo(i.return,r,t),c.lanes|=r;break}d=d.next}}else if(i.tag===10)a=i.type===t.type?null:i.child;else if(i.tag===18){if(a=i.return,a===null)throw Error(S(341));a.lanes|=r,c=a.alternate,c!==null&&(c.lanes|=r),qo(a,r,t),a=i.sibling}else a=i.child;if(a!==null)a.return=i;else for(a=i;a!==null;){if(a===t){a=null;break}if(i=a.sibling,i!==null){i.return=a.return,a=i;break}a=a.return}i=a}me(e,t,o.children,r),t=t.child}return t;case 9:return o=t.type,n=t.pendingProps.children,or(t,r),o=ze(o),n=n(o),t.flags|=1,me(e,t,n,r),t.child;case 14:return n=t.type,o=Me(n,t.pendingProps),o=Me(n.type,o),Fa(e,t,n,o,r);case 15:return Wc(e,t,t.type,t.pendingProps,r);case 17:return n=t.type,o=t.pendingProps,o=t.elementType===n?o:Me(n,o),Dn(e,t),t.tag=1,je(n)?(e=!0,Kn(t)):e=!1,or(t,r),Dc(t,n,o),Lo(t,n,o,r),Mo(null,t,n,!0,e,r);case 19:return Hc(e,t,r);case 22:return _c(e,t,r)}throw Error(S(156,t.tag))};function ad(e,t){return zl(e,t)}function Pp(e,t,r,n){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Pe(e,t,r,n){return new Pp(e,t,r,n)}function Fi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function qp(e){if(typeof e=="function")return Fi(e)?1:0;if(e!=null){if(e=e.$$typeof,e===si)return 11;if(e===oi)return 14}return 2}function wt(e,t){var r=e.alternate;return r===null?(r=Pe(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function Wn(e,t,r,n,o,i){var a=2;if(n=e,typeof e=="function")Fi(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case $t:return zt(r.children,o,i,t);case ni:a=8,o|=8;break;case so:return e=Pe(12,r,t,o|2),e.elementType=so,e.lanes=i,e;case oo:return e=Pe(13,r,t,o),e.elementType=oo,e.lanes=i,e;case io:return e=Pe(19,r,t,o),e.elementType=io,e.lanes=i,e;case gl:return js(r,o,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ml:a=10;break e;case yl:a=9;break e;case si:a=11;break e;case oi:a=14;break e;case at:a=16,n=null;break e}throw Error(S(130,e==null?e:typeof e,""))}return t=Pe(a,r,t,o),t.elementType=e,t.type=n,t.lanes=i,t}function zt(e,t,r,n){return e=Pe(7,e,n,t),e.lanes=r,e}function js(e,t,r,n){return e=Pe(22,e,n,t),e.elementType=gl,e.lanes=r,e.stateNode={isHidden:!1},e}function eo(e,t,r){return e=Pe(6,e,null,t),e.lanes=r,e}function to(e,t,r){return t=Pe(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function zp(e,t,r,n,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ls(0),this.expirationTimes=Ls(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ls(0),this.identifierPrefix=n,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function Wi(e,t,r,n,o,i,a,c,d){return e=new zp(e,t,r,c,d),t===1?(t=1,i===!0&&(t|=8)):t=0,i=Pe(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:n,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},Si(i),e}function Lp(e,t,r){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ut,key:n==null?null:""+n,children:e,containerInfo:t,implementation:r}}function ld(e){if(!e)return jt;e=e._reactInternals;e:{if(_t(e)!==e||e.tag!==1)throw Error(S(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(je(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(S(171))}if(e.tag===1){var r=e.type;if(je(r))return lc(e,r,t)}return t}function cd(e,t,r,n,o,i,a,c,d){return e=Wi(r,n,!0,e,o,i,a,c,d),e.context=ld(null),r=e.current,n=ye(),o=vt(r),i=Ze(n,o),i.callback=t??null,gt(r,i,o),e.current.lanes=o,on(e,o,n),Se(e,n),e}function Ss(e,t,r,n){var o=t.current,i=ye(),a=vt(o);return r=ld(r),t.context===null?t.context=r:t.pendingContext=r,t=Ze(i,a),t.payload={element:e},n=n===void 0?null:n,n!==null&&(t.callback=n),e=gt(o,t,a),e!==null&&(Be(e,o,a,i),zn(e,o,a)),a}function ds(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Ka(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function _i(e,t){Ka(e,t),(e=e.alternate)&&Ka(e,t)}function Op(){return null}var dd=typeof reportError=="function"?reportError:function(e){console.error(e)};function Bi(e){this._internalRoot=e}ks.prototype.render=Bi.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(S(409));Ss(e,t,null,null)};ks.prototype.unmount=Bi.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ft(function(){Ss(null,e,null,null)}),t[tt]=null}};function ks(e){this._internalRoot=e}ks.prototype.unstable_scheduleHydration=function(e){if(e){var t=_l();e={blockedOn:null,target:e,priority:t};for(var r=0;r<ct.length&&t!==0&&t<ct[r].priority;r++);ct.splice(r,0,e),r===0&&Ul(e)}};function Ui(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ts(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Xa(){}function Dp(e,t,r,n,o){if(o){if(typeof n=="function"){var i=n;n=function(){var u=ds(a);i.call(u)}}var a=cd(t,n,e,0,null,!1,!1,"",Xa);return e._reactRootContainer=a,e[tt]=a.current,Gr(e.nodeType===8?e.parentNode:e),Ft(),a}for(;o=e.lastChild;)e.removeChild(o);if(typeof n=="function"){var c=n;n=function(){var u=ds(d);c.call(u)}}var d=Wi(e,0,!1,null,null,!1,!1,"",Xa);return e._reactRootContainer=d,e[tt]=d.current,Gr(e.nodeType===8?e.parentNode:e),Ft(function(){Ss(t,d,r,n)}),d}function Es(e,t,r,n,o){var i=r._reactRootContainer;if(i){var a=i;if(typeof o=="function"){var c=o;o=function(){var d=ds(a);c.call(d)}}Ss(t,a,e,o)}else a=Dp(r,t,e,o,n);return ds(a)}Fl=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=Rr(t.pendingLanes);r!==0&&(li(t,r|1),Se(t,te()),!(B&6)&&(hr=te()+500,Tt()))}break;case 13:Ft(function(){var n=rt(e,1);if(n!==null){var o=ye();Be(n,e,1,o)}}),_i(e,1)}};ci=function(e){if(e.tag===13){var t=rt(e,134217728);if(t!==null){var r=ye();Be(t,e,134217728,r)}_i(e,134217728)}};Wl=function(e){if(e.tag===13){var t=vt(e),r=rt(e,t);if(r!==null){var n=ye();Be(r,e,t,n)}_i(e,t)}};_l=function(){return U};Bl=function(e,t){var r=U;try{return U=e,t()}finally{U=r}};go=function(e,t,r){switch(t){case"input":if(co(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var n=r[t];if(n!==e&&n.form===e.form){var o=ys(n);if(!o)throw Error(S(90));vl(n),co(n,o)}}}break;case"textarea":bl(e,r);break;case"select":t=r.value,t!=null&&tr(e,!!r.multiple,t,!1)}};Il=Oi;Nl=Ft;var Mp={usingClientEntryPoint:!1,Events:[ln,Vt,ys,El,Cl,Oi]},Cr={findFiberByHostInstance:Rt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Fp={bundleType:Cr.bundleType,version:Cr.version,rendererPackageName:Cr.rendererPackageName,rendererConfig:Cr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:st.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Pl(e),e===null?null:e.stateNode},findFiberByHostInstance:Cr.findFiberByHostInstance||Op,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var In=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!In.isDisabled&&In.supportsFiber)try{ps=In.inject(Fp),Qe=In}catch{}}Ie.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Mp;Ie.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ui(t))throw Error(S(200));return Lp(e,t,null,r)};Ie.createRoot=function(e,t){if(!Ui(e))throw Error(S(299));var r=!1,n="",o=dd;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=Wi(e,1,!1,null,null,r,!1,n,o),e[tt]=t.current,Gr(e.nodeType===8?e.parentNode:e),new Bi(t)};Ie.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(S(188)):(e=Object.keys(e).join(","),Error(S(268,e)));return e=Pl(t),e=e===null?null:e.stateNode,e};Ie.flushSync=function(e){return Ft(e)};Ie.hydrate=function(e,t,r){if(!Ts(t))throw Error(S(200));return Es(null,e,t,!0,r)};Ie.hydrateRoot=function(e,t,r){if(!Ui(e))throw Error(S(405));var n=r!=null&&r.hydratedSources||null,o=!1,i="",a=dd;if(r!=null&&(r.unstable_strictMode===!0&&(o=!0),r.identifierPrefix!==void 0&&(i=r.identifierPrefix),r.onRecoverableError!==void 0&&(a=r.onRecoverableError)),t=cd(t,null,e,1,r??null,o,!1,i,a),e[tt]=t.current,Gr(e),n)for(e=0;e<n.length;e++)r=n[e],o=r._getVersion,o=o(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,o]:t.mutableSourceEagerHydrationData.push(r,o);return new ks(t)};Ie.render=function(e,t,r){if(!Ts(t))throw Error(S(200));return Es(null,e,t,!1,r)};Ie.unmountComponentAtNode=function(e){if(!Ts(e))throw Error(S(40));return e._reactRootContainer?(Ft(function(){Es(null,null,e,!1,function(){e._reactRootContainer=null,e[tt]=null})}),!0):!1};Ie.unstable_batchedUpdates=Oi;Ie.unstable_renderSubtreeIntoContainer=function(e,t,r,n){if(!Ts(r))throw Error(S(200));if(e==null||e._reactInternals===void 0)throw Error(S(38));return Es(e,t,r,!1,n)};Ie.version="18.3.1-next-f1338f8080-20240426";function ud(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ud)}catch(e){console.error(e)}}ud(),ul.exports=Ie;var Wp=ul.exports,Za=Wp;ro.createRoot=Za.createRoot,ro.hydrateRoot=Za.hydrateRoot;const l={bg:"var(--surface)",surface:"var(--surface-container-low)",surfaceLowest:"var(--surface-container-lowest)",muted:"var(--on-surface-variant)",text:"var(--on-surface)",green:"var(--secondary)",greenBg:"var(--secondary-container)",greenText:"var(--on-secondary-container)",yellow:"var(--tertiary)",red:"var(--error)",outline:"var(--outline-variant)"},m="'Inter', monospace",ar="'Manrope', sans-serif",D="'Inter', sans-serif",P={margin:"0 0 12px",fontSize:13,color:l.muted,lineHeight:1.95,fontFamily:D};function g({label:e,code:t}){const[r,n]=N.useState(!1);return s.jsxs("div",{style:{margin:"10px 0"},children:[s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:3},children:[s.jsx("span",{style:{fontSize:10,color:l.muted,letterSpacing:2,textTransform:"uppercase",fontFamily:m},children:e}),s.jsx("button",{onClick:()=>{navigator.clipboard.writeText(t),n(!0),setTimeout(()=>n(!1),1800)},style:{background:"transparent",border:`1px solid ${r?l.green:l.outline}`,color:r?l.green:l.muted,borderRadius:3,padding:"2px 9px",fontSize:10,cursor:"pointer",fontFamily:m},children:r?"✓ copied":"copy"})]}),s.jsx("pre",{style:{margin:0,padding:"12px 14px",background:l.surfaceLowest,border:`1px solid ${l.outline}`,borderRadius:7,fontSize:11,lineHeight:1.9,overflowX:"auto",color:l.text,fontFamily:m,whiteSpace:"pre-wrap",wordBreak:"break-word"},children:s.jsx("code",{children:t})})]})}function z({icon:e="💡",color:t=l.yellow,title:r,children:n}){return s.jsxs("div",{style:{margin:"10px 0",padding:"10px 14px",background:t+"10",border:`1px solid ${t}40`,borderLeft:`4px solid ${t}`,borderRadius:"0 7px 7px 0"},children:[s.jsxs("div",{style:{fontSize:11,fontWeight:700,color:t,marginBottom:3,fontFamily:m},children:[e," ",r]}),s.jsx("div",{style:{fontSize:12,color:l.muted,lineHeight:1.75,fontFamily:D},children:n})]})}function M({emoji:e,title:t,color:r,children:n}){return s.jsxs("div",{style:{margin:"12px 0",padding:"13px 16px",background:r+"09",border:`1px solid ${r}35`,borderRadius:10},children:[s.jsxs("div",{style:{fontSize:13,fontWeight:700,color:r,fontFamily:m,marginBottom:7},children:[e," ",t]}),s.jsx("div",{style:{fontSize:12,color:l.muted,lineHeight:1.95,fontFamily:D},children:n})]})}function L({number:e,title:t,color:r,children:n}){return s.jsxs("div",{style:{margin:"12px 0",padding:"14px 16px",background:l.surfaceLowest,border:`1px solid ${r}33`,borderRadius:10,borderLeft:`4px solid ${r}`},children:[s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:8},children:[s.jsx("div",{style:{width:28,height:28,borderRadius:"50%",background:r+"22",border:`1px solid ${r}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:r,fontFamily:m,flexShrink:0},children:e}),s.jsx("div",{style:{fontSize:13,fontWeight:700,color:r,fontFamily:m},children:t})]}),s.jsx("div",{style:{fontSize:12,color:l.muted,lineHeight:1.9,fontFamily:D},children:n})]})}function b({question:e,options:t,correct:r,explain:n}){const[o,i]=N.useState(null);return s.jsxs("div",{style:{margin:"12px 0",padding:"13px 16px",background:l.surfaceLowest,border:`1px solid ${l.outline}`,borderRadius:9},children:[s.jsxs("div",{style:{fontSize:12,fontWeight:700,color:l.text,fontFamily:D,marginBottom:10},children:["❓ ",e]}),s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:5},children:t.map((a,c)=>{const d=o===c,u=c===r,v=o!==null;let x="transparent",y=l.outline,w=l.muted;return v&&u?(x=l.greenBg,y=l.green,w=l.greenText):v&&d&&!u&&(x=l.red+"18",y=l.red,w=l.red),s.jsxs("button",{onClick:()=>o===null&&i(c),style:{padding:"7px 12px",background:x,border:`1px solid ${y}`,borderRadius:5,cursor:o===null?"pointer":"default",textAlign:"left",fontSize:12,color:w,fontFamily:D,transition:"all 0.2s"},children:[v&&u?"✅ ":v&&d?"❌ ":"○ ",a]},c)})}),o!==null&&s.jsxs("div",{style:{marginTop:10,padding:"8px 10px",background:l.greenBg,border:`1px solid ${l.green}22`,borderRadius:5,fontSize:11,color:l.muted,fontFamily:D,lineHeight:1.7},children:["💬 ",n]}),o!==null&&s.jsx("button",{onClick:()=>i(null),style:{marginTop:8,padding:"3px 10px",background:"transparent",border:`1px solid ${l.outline}`,borderRadius:4,cursor:"pointer",fontSize:10,color:l.muted,fontFamily:m},children:"reset"})]})}function _p(){const[e,t]=N.useState(-1),[r,n]=N.useState(!1),[o,i]=N.useState([]),a=[{label:"console.log('1 — sync') executes",phase:"sync",color:"#3b82f6",out:"1 — sync",desc:"Synchronous code always runs first. It goes straight onto the Call Stack and executes immediately."},{label:"setTimeout(fn, 0) is registered",phase:"sync",color:"#3b82f6",out:null,desc:"Node hands the timer to the OS. It says 'run this callback after 0ms'. Node does NOT wait — it moves on immediately."},{label:"Promise.resolve().then(fn) queued",phase:"sync",color:"#3b82f6",out:null,desc:"The Promise callback is added to the Microtask Queue — a high-priority queue that runs before any timers."},{label:"console.log('2 — sync') executes",phase:"sync",color:"#3b82f6",out:"2 — sync",desc:"Still synchronous. All sync code on the Call Stack finishes before ANY async callback can run."},{label:"▶ Call Stack empty — check Microtask Queue",phase:"micro",color:"#8b5cf6",out:null,desc:"The Call Stack is now empty. The Event Loop checks: are there any Microtasks (Promises, nextTick)? Yes!"},{label:"Promise .then callback fires",phase:"micro",color:"#8b5cf6",out:"3 — promise",desc:"ALL microtasks drain completely. Promises always beat setTimeout. This is critical to understand."},{label:"▶ Microtasks empty — check Timer Queue",phase:"macro",color:"#f59e0b",out:null,desc:"No more microtasks. The Event Loop moves to the Timer phase — checking for expired setTimeouts."},{label:"setTimeout callback finally fires",phase:"macro",color:"#f59e0b",out:"4 — timeout",desc:"Only now does the setTimeout run. Even though we said 0ms, it had to wait for all sync code AND all microtasks first."}],c=async()=>{n(!0),t(-1),i([]);for(let d=0;d<a.length;d++)await new Promise(u=>setTimeout(u,800)),t(d),a[d].out&&i(u=>[...u,{text:a[d].out,color:a[d].color}]);n(!1)};return s.jsxs("div",{style:{padding:14,background:l.surfaceLowest,border:`1px solid ${l.outline}`,borderRadius:10},children:[s.jsx("div",{style:{fontSize:10,color:l.muted,fontFamily:m,letterSpacing:1,marginBottom:10},children:"🧪 LIVE — watch exactly what runs and when"}),s.jsxs("div",{style:{background:l.surface,borderRadius:7,padding:"10px 14px",marginBottom:12,fontFamily:m,fontSize:11},children:[s.jsx("div",{style:{color:l.muted},children:"// What does this print? And in what order?"}),[{t:"console.log('1 — sync');",c:"#3b82f6"},{t:"setTimeout(() => console.log('4 — timeout'), 0);",c:"#f59e0b"},{t:"Promise.resolve().then(() => console.log('3 — promise'));",c:"#8b5cf6"},{t:"console.log('2 — sync');",c:"#3b82f6"}].map((d,u)=>s.jsx("div",{style:{color:d.c,padding:"1px 0"},children:d.t},u))]}),s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:4,marginBottom:12},children:a.map((d,u)=>s.jsxs("div",{style:{display:"flex",gap:10,padding:"7px 10px",background:e===u?d.color+"15":e>u?d.color+"07":l.surface,border:`1px solid ${e>=u?d.color+"40":l.outline}`,borderRadius:6,transition:"all 0.35s"},children:[s.jsx("span",{style:{fontSize:14,width:20,flexShrink:0},children:e>u?"✅":e===u?"⏳":"○"}),s.jsxs("div",{style:{flex:1},children:[s.jsx("div",{style:{fontSize:11,color:e>=u?d.color:l.muted,fontFamily:m,fontWeight:e===u?700:400},children:d.label}),e===u&&s.jsx("div",{style:{fontSize:11,color:l.muted,fontFamily:D,marginTop:4,lineHeight:1.6},children:d.desc})]}),s.jsx("span",{style:{fontSize:9,padding:"2px 7px",background:(e>=u?d.color:l.muted)+"18",borderRadius:3,color:e>=u?d.color:l.muted,fontFamily:m,flexShrink:0,alignSelf:"flex-start"},children:d.phase})]},u))}),s.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"},children:[s.jsx("button",{onClick:c,disabled:r,style:{padding:"6px 16px",background:r?l.muted+"18":l.greenBg,border:`1px solid ${r?l.outline:l.green}`,color:r?l.muted:l.greenText,borderRadius:5,cursor:r?"default":"pointer",fontSize:11,fontFamily:m},children:r?"● running...":"▶ Run it"}),s.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"},children:[s.jsx("span",{style:{fontSize:10,color:l.muted,fontFamily:m},children:"console output:"}),o.length===0?s.jsx("span",{style:{fontSize:10,color:l.muted,fontFamily:m},children:"press Run ▶"}):o.map((d,u)=>s.jsx("span",{style:{fontSize:11,fontWeight:700,color:d.color,fontFamily:m,padding:"2px 8px",background:d.color+"18",borderRadius:3},children:d.text},u))]})]})]})}function Bp(){const[e,t]=N.useState("stream"),[r,n]=N.useState([]),[o,i]=N.useState(!1),a=8,c=async()=>{if(i(!0),n([]),e==="buffer"){for(let d=0;d<a;d++)await new Promise(u=>setTimeout(u,120));n(Array.from({length:a},(d,u)=>u))}else for(let d=0;d<a;d++)await new Promise(u=>setTimeout(u,300)),n(u=>[...u,d]);i(!1)};return s.jsxs("div",{style:{padding:14,background:l.surfaceLowest,border:`1px solid ${l.outline}`,borderRadius:10},children:[s.jsx("div",{style:{fontSize:10,color:l.muted,fontFamily:m,letterSpacing:1,marginBottom:10},children:"🧪 LIVE — compare: buffer (load all) vs stream (chunk by chunk)"}),s.jsxs("div",{style:{display:"flex",gap:6,marginBottom:10},children:[["stream","buffer"].map(d=>s.jsx("button",{onClick:()=>{t(d),n([])},style:{padding:"4px 12px",background:e===d?l.greenBg:"transparent",border:`1px solid ${e===d?l.green:l.outline}`,color:e===d?l.greenText:l.muted,borderRadius:4,cursor:"pointer",fontSize:11,fontFamily:m},children:d},d)),s.jsx("button",{onClick:c,disabled:o,style:{padding:"4px 14px",background:o?l.muted+"18":l.greenBg,border:`1px solid ${o?l.outline:l.green}`,color:o?l.muted:l.greenText,borderRadius:4,cursor:o?"default":"pointer",fontSize:11,fontFamily:m},children:o?"● loading...":"▶ Run"})]}),s.jsx("div",{style:{fontSize:11,color:l.muted,fontFamily:D,marginBottom:8},children:e==="stream"?"Each chunk appears as it arrives — you can start processing immediately ↓":"Nothing appears until ALL chunks are loaded — then everything at once ↓"}),s.jsx("div",{style:{display:"flex",gap:4,flexWrap:"wrap",minHeight:44,marginBottom:10},children:e==="stream"?r.map(d=>s.jsx("div",{style:{width:38,height:38,background:l.greenBg,border:`1px solid ${l.green}`,borderRadius:5,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:l.greenText,fontFamily:m},children:d+1},d)):o?s.jsxs("div",{style:{fontSize:12,color:l.yellow,fontFamily:m,padding:"8px 0"},children:["⏳ loading all ",a," chunks... you are stuck waiting"]}):r.map(d=>s.jsx("div",{style:{width:38,height:38,background:l.yellow+"22",border:`1px solid ${l.yellow}55`,borderRadius:5,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:l.yellow,fontFamily:m},children:d+1},d))}),s.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[s.jsxs("div",{style:{flex:1,minWidth:160,padding:"8px 10px",background:l.greenBg,border:`1px solid ${l.green}22`,borderRadius:6},children:[s.jsx("div",{style:{fontSize:10,color:l.greenText,fontFamily:m,marginBottom:3},children:"✅ STREAM — always use for large data"}),s.jsx("div",{style:{fontSize:11,color:l.muted,fontFamily:D},children:"64KB at a time. A 4GB file uses ~100KB RAM. Can start processing immediately."})]}),s.jsxs("div",{style:{flex:1,minWidth:160,padding:"8px 10px",background:l.red+"08",border:`1px solid ${l.red}22`,borderRadius:6},children:[s.jsx("div",{style:{fontSize:10,color:l.red,fontFamily:m,marginBottom:3},children:"❌ BUFFER — dangerous for large files"}),s.jsx("div",{style:{fontSize:11,color:l.muted,fontFamily:D},children:"Loads everything into RAM first. A 4GB file needs 4GB RAM — process crashes."})]})]})]})}function Up(){const[e,t]=N.useState("story"),r=[{id:"story",label:"📖 The Story"},{id:"how",label:"⚙️ How it works"},{id:"browser",label:"🔀 Browser vs Node"},{id:"why",label:"🎯 Why use it?"},{id:"quiz",label:"🧠 Quick Quiz"}];return s.jsxs("div",{children:[s.jsxs("p",{style:P,children:["Before we write a single line of Node.js code, you need to understand ",s.jsx("em",{children:"what it actually is"}),", ",s.jsx("em",{children:"how it came to exist"}),", and ",s.jsx("em",{children:"why it works the way it does"}),"."]}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?l.greenBg:"transparent",border:`1px solid ${e===n.id?l.green:l.outline}`,color:e===n.id?l.greenText:l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="story"&&s.jsxs("div",{children:[s.jsxs(L,{number:"1",title:"JavaScript was only for browsers",color:"#3b82f6",children:["When JavaScript was invented in 1995, it had one job: run inside web browsers to make web pages interactive. If you wanted to do anything on a ",s.jsx("em",{children:"server"})," — read files, handle HTTP requests, talk to a database — you used a completely different language. Python. Ruby. Java. PHP. JavaScript couldn't do any of that. It was trapped inside the browser."]}),s.jsx(L,{number:"2",title:"Ryan Dahl had a problem in 2009",color:"#f59e0b",children:"A developer named Ryan Dahl was frustrated. Traditional server languages handled each incoming request by creating a new thread — imagine a bank with one teller per customer. Threads are expensive (each costs ~1MB of RAM). When traffic spikes, you run out of threads and new requests wait in line. The server slows to a crawl."}),s.jsx(L,{number:"3",title:"His insight: JavaScript was already async",color:"#8b5cf6",children:"Ryan noticed that JavaScript in the browser was already designed around asynchronous, non-blocking patterns. You don't freeze the page waiting for an image to load — you set a callback and move on. What if you took that model and put it on a server?"}),s.jsxs(L,{number:"4",title:"Node.js was born",color:l.green,children:["In 2009, Ryan Dahl took Google's V8 engine, combined it with a C library called libuv, added built-in modules for file system, networking, and HTTP, and called it ",s.jsx("strong",{children:"Node.js"}),". JavaScript could now run on servers — and it was ",s.jsx("em",{children:"fast"}),"."]}),s.jsxs(M,{emoji:"🎯",title:"What Node.js actually is — one sentence",color:l.green,children:[s.jsx("strong",{children:"Node.js is a runtime environment"})," — a program on your computer that can read and execute JavaScript files, giving that JavaScript access to your computer's file system, network, and other operating system features that browsers would never allow."]}),s.jsx(z,{icon:"🔑",color:l.yellow,title:"Key insight",children:"Node.js is NOT a framework and NOT a programming language. It's a runtime — like how the JVM lets you run Java on your computer, Node.js lets you run JavaScript on your computer (or server) outside of any browser."})]}),e==="how"&&s.jsxs("div",{children:[s.jsx("p",{style:P,children:"Node.js has three main layers working together."}),[{layer:"Layer 1 — V8 Engine",color:"#3b82f6",icon:"⚙️",what:"Google's JavaScript engine, written in C++. This is the exact same engine inside Chrome. It takes your JavaScript code and compiles it to machine code that your CPU can run directly.",analogy:"V8 is like a translator who takes your JavaScript words and speaks them in the CPU's native language in real time.",facts:["Written in C++ for maximum performance","Uses JIT compilation — watches which code runs often and optimises it","Handles garbage collection automatically","You never interact with V8 directly"]},{layer:"Layer 2 — libuv",color:"#f59e0b",icon:"🔄",what:"A C library that gives Node its async superpowers. It provides the Event Loop, a thread pool for expensive I/O operations, and cross-platform support.",analogy:"libuv is the factory floor manager. When a task like reading a file comes in, libuv hands it to a worker and keeps a note. When the worker finishes, libuv delivers the result back to your JavaScript.",facts:["Thread pool has 4 threads by default","File reads, DNS lookups, and crypto operations use the thread pool","The Event Loop itself runs on the main thread","Network I/O uses OS-level async (epoll/kqueue)"]},{layer:"Layer 3 — Node.js APIs",color:"#3b82f6",icon:"📦",what:"The built-in modules you use daily — fs, http, path, crypto, os, events, stream, child_process. These are JavaScript wrappers around V8 and libuv.",analogy:"If V8 is the engine and libuv is the transmission, Node.js APIs are the steering wheel and pedals.",facts:["All built-in — no npm install needed","fs wraps libuv file operations","http wraps libuv TCP/networking","crypto wraps OpenSSL","child_process wraps OS process creation"]}].map((n,o)=>s.jsxs("div",{style:{marginBottom:12,padding:"14px 16px",background:n.color+"08",border:`1px solid ${n.color}25`,borderRadius:10},children:[s.jsxs("div",{style:{fontSize:14,fontWeight:700,color:n.color,fontFamily:m,marginBottom:8},children:[n.icon," ",n.layer]}),s.jsx("p",{style:{...P,marginBottom:8},children:n.what}),s.jsxs("div",{style:{padding:"7px 10px",background:n.color+"0a",border:`1px solid ${n.color}22`,borderRadius:6,marginBottom:8},children:[s.jsx("div",{style:{fontSize:11,color:n.color,fontFamily:m,marginBottom:3},children:"🧠 Mental model"}),s.jsx("div",{style:{fontSize:12,color:l.muted,fontFamily:D,lineHeight:1.7},children:n.analogy})]}),s.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:4},children:n.facts.map((i,a)=>s.jsxs("div",{style:{display:"flex",gap:7},children:[s.jsx("span",{style:{color:n.color,fontSize:10,marginTop:3,flexShrink:0},children:"▸"}),s.jsx("span",{style:{fontSize:11,color:l.muted,fontFamily:D,lineHeight:1.6},children:i})]},a))})]},o)),s.jsx(g,{label:"the full architecture",code:`Your JavaScript Code (app.js)
         ↓
Node.js Built-in APIs  ← fs, http, crypto, path, os...
         ↓
V8 Engine              ← parses + compiles your JavaScript
         ↓
libuv                  ← Event Loop + thread pool + async I/O
         ↓
Operating System       ← Linux / macOS / Windows kernel`})]}),e==="browser"&&s.jsxs("div",{children:[s.jsxs("p",{style:P,children:["JavaScript runs in two very different environments. The ",s.jsx("em",{children:"language itself"})," is identical in both. But the environment gives them completely different powers."]}),s.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap",marginBottom:14},children:[s.jsxs("div",{style:{flex:1,minWidth:200,padding:"14px 16px",background:"#3b82f608",border:"1px solid #3b82f625",borderRadius:10},children:[s.jsx("div",{style:{fontSize:14,fontWeight:700,color:"#3b82f6",fontFamily:m,marginBottom:10},children:"🌐 Browser JavaScript"}),["window → browser tab size, URL, history","document → HTML page elements","localStorage → store small data","fetch() → HTTP requests","navigator → browser info, GPS, camera"].map((n,o)=>s.jsxs("div",{style:{display:"flex",gap:8,padding:"4px 0",borderBottom:`1px solid ${l.outline}`},children:[s.jsx("code",{style:{fontSize:11,color:"#3b82f6",fontFamily:m,minWidth:130},children:n.split(" → ")[0]}),s.jsx("span",{style:{fontSize:11,color:l.muted},children:n.split(" → ")[1]})]},o)),s.jsx("div",{style:{marginTop:8,fontSize:11,color:l.red+"aa"},children:"❌ Cannot access files, cannot create servers"})]}),s.jsxs("div",{style:{flex:1,minWidth:200,padding:"14px 16px",background:l.greenBg,border:`1px solid ${l.green}25`,borderRadius:10},children:[s.jsx("div",{style:{fontSize:14,fontWeight:700,color:l.greenText,fontFamily:m,marginBottom:10},children:"🟢 Node.js JavaScript"}),["fs → read, write, delete files","http → create servers","path → build file paths","os → CPU info, RAM, hostname","crypto → hashing, encryption","child_process → run shell commands","stream → process large data chunk by chunk"].map((n,o)=>s.jsxs("div",{style:{display:"flex",gap:8,padding:"4px 0",borderBottom:`1px solid ${l.outline}`},children:[s.jsx("code",{style:{fontSize:11,color:l.greenText,fontFamily:m,minWidth:130},children:n.split(" → ")[0]}),s.jsx("span",{style:{fontSize:11,color:l.muted},children:n.split(" → ")[1]})]},o)),s.jsx("div",{style:{marginTop:8,fontSize:11,color:l.red+"aa"},children:"❌ No window, no document, no DOM"})]})]})]}),e==="why"&&s.jsx("div",{children:[{title:"One language for everything",color:"#06b6d4",icon:"🔗",desc:"Before Node.js, you'd write Python or Ruby on the server and JavaScript in the browser. Two languages, two mental contexts. With Node.js, your entire stack can all be JavaScript."},{title:"Non-blocking I/O",color:"#f59e0b",icon:"⚡",desc:"A Node.js server with a single thread can handle 10,000+ simultaneous connections. A traditional threaded server might create 10,000 threads (~1MB each = 10GB RAM). Node hands each connection's I/O to the OS and immediately moves on."},{title:"npm ecosystem",color:"#8b5cf6",icon:"📦",desc:"npm has over 2 million packages. Need to send emails? Validate forms? Connect to a database? Almost every problem has a ready-made package."},{title:"Perfect for APIs and real-time",color:l.green,icon:"🌐",desc:"Node.js excels at I/O-heavy workloads — REST APIs, GraphQL, WebSocket servers, microservices, streaming. Netflix, LinkedIn, Uber, and PayPal all use Node.js."},{title:"When NOT to use Node.js",color:l.red,icon:"⚠️",desc:"Node.js is NOT good at CPU-intensive work — image processing, machine learning, video encoding. Because JS runs on one thread, a heavy CPU task blocks ALL other requests."}].map((n,o)=>s.jsxs("div",{style:{marginBottom:10,padding:"13px 16px",background:n.color+"08",border:`1px solid ${n.color}25`,borderRadius:9},children:[s.jsxs("div",{style:{fontSize:13,fontWeight:700,color:n.color,fontFamily:m,marginBottom:7},children:[n.icon," ",n.title]}),s.jsx("p",{style:{...P,marginBottom:0},children:n.desc})]},o))}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"What is Node.js?",options:["A JavaScript framework like React","A runtime environment that runs JavaScript outside the browser","A database for JavaScript applications","A JavaScript version newer than ES6"],correct:1,explain:"Node.js is a runtime — a program that can execute JavaScript files on your computer or server, outside any browser. It's not a framework, not a language, not a database."}),s.jsx(b,{question:"Which company created the V8 engine?",options:["Microsoft","Mozilla","Google","Ryan Dahl"],correct:2,explain:"Google created V8 as the engine for Chrome. Ryan Dahl took V8 and wrapped it with libuv and Node APIs to create Node.js in 2009."}),s.jsx(b,{question:"Which can you do in Node.js but NOT in browser JS?",options:["Use Promises","Read files from the hard drive","Use async/await","Create arrays and objects"],correct:1,explain:"Reading files requires access to the OS file system — something browsers block for security. Node.js provides the fs module for this."}),s.jsx(b,{question:"What does 'non-blocking I/O' mean?",options:["Node.js runs I/O operations very quickly","Node.js doesn't wait for I/O to finish before continuing","Node.js prevents I/O errors","Node.js uses multiple threads for I/O"],correct:1,explain:"Non-blocking means Node hands the I/O task to the OS and immediately moves on to the next line of code. When the I/O finishes, Node runs your callback."}),s.jsx(b,{question:"When should you NOT use Node.js?",options:["For building REST APIs","For real-time chat applications","For CPU-intensive tasks like image processing or ML","For handling many concurrent connections"],correct:2,explain:"Node's single-threaded JS execution means CPU-heavy work blocks all other requests. For image processing, video encoding, or ML — use Python, Go, or worker_threads."})]})]})}function $p(){const[e,t]=N.useState("problem"),r=[{id:"problem",label:"😩 The Problem"},{id:"solution",label:"💡 The Solution"},{id:"phases",label:"🔄 Loop Phases"},{id:"order",label:"📊 Execution Order"},{id:"demo",label:"🧪 Live Demo"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"The Event Loop is the single most important concept in Node.js. If you understand this deeply, everything else makes sense."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?l.yellow+"22":"transparent",border:`1px solid ${e===n.id?l.yellow:l.outline}`,color:e===n.id?l.yellow:l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="problem"&&s.jsxs("div",{children:[s.jsx(L,{number:"1",title:"Traditional servers: one thread per request",color:l.red,children:'Imagine a restaurant where every customer gets their own dedicated waiter who stands with them the entire meal and does nothing else. The waiter is "blocked". If 1,000 customers arrive, you need 1,000 waiters. Each waiter costs about 1MB of RAM. 1,000 threads = 1GB RAM just for waiting.'}),s.jsx(L,{number:"2",title:"The problem with threads for I/O",color:"#f59e0b",children:"In a web server, most of the time is spent doing I/O — waiting for a database, waiting for a file read. The actual CPU work takes microseconds. But the thread is blocked the entire time, doing nothing, consuming resources. This is catastrophically wasteful."}),s.jsx(g,{label:"the traditional blocking model",code:`// Request 1 arrives → create Thread 1
Thread 1: SELECT * FROM users WHERE id = 1;
Thread 1: waiting... waiting... (50ms doing nothing)
Thread 1: got result → send response → thread freed

// Request 10,000 arrives → create Thread 10,000
// System runs out of memory. New requests time out. Server dies.

// Each thread costs: ~1MB RAM
// 10,000 concurrent users = 10GB RAM just for threads`})]}),e==="solution"&&s.jsxs("div",{children:[s.jsx(L,{number:"1",title:"Node's answer: one smart waiter",color:l.green,children:"There's ONE extremely efficient waiter. When a customer orders, the waiter writes it down, gives the order to the kitchen, and immediately walks to the next customer. The waiter never waits. One waiter serves hundreds of customers because they never block."}),s.jsx(L,{number:"2",title:"How Node.js does this",color:"#3b82f6",children:"Node.js has one JavaScript thread. When you call fs.readFile(), Node writes down your callback, hands the actual file read to the OS, and immediately runs the next line of code. When the OS finishes, it puts your callback in a queue. The Event Loop picks it up and runs it. No blocking. No waiting."}),s.jsxs(M,{emoji:"🔄",title:"The Event Loop in plain English",color:"#f59e0b",children:["The Event Loop is just a loop that keeps asking: ",s.jsx("strong",{children:'"Is the Call Stack empty?"'})," → If yes: ",s.jsx("strong",{children:'"Is there anything in the Microtask Queue?"'})," → If yes: run it. → ",s.jsx("strong",{children:'"Any setTimeout callbacks ready?"'})," → repeat forever. That's it."]})]}),e==="phases"&&s.jsx("div",{children:[{phase:"timers",color:"#f59e0b",icon:"⏰",desc:"Runs callbacks from setTimeout() and setInterval() whose time has expired. Note: only guarantees a MINIMUM delay.",example:"setTimeout(fn, 100) → runs here, after ≥100ms"},{phase:"pending I/O",color:"#3b82f6",icon:"📥",desc:"I/O callbacks deferred from the previous loop iteration. Rarely something you interact with directly.",example:"Internal: certain system errors"},{phase:"idle / prepare",color:l.muted,icon:"💤",desc:"Internal use only. Node uses this internally between phases.",example:"Internal Node.js mechanics only"},{phase:"poll",color:l.green,icon:"🔍",desc:"The most important phase. Retrieves new I/O events. Executes their callbacks. If queue is empty and no timers, Node WAITS here for new I/O events.",example:"fs.readFile callback runs here, HTTP responses run here"},{phase:"check",color:"#8b5cf6",icon:"✓",desc:"Runs setImmediate() callbacks. Always runs after the poll phase completes.",example:"setImmediate(fn) → runs here"},{phase:"close events",color:l.red,icon:"🔒",desc:"Close event callbacks — when a socket or file handle is abruptly closed.",example:"socket.on('close', ...) runs here"},{phase:"⚡ microtasks",color:"#06b6d4",icon:"⚡",desc:"Microtasks run BETWEEN every phase, draining completely before the next phase starts. process.nextTick() runs first, then Promise .then/.catch.",example:"Highest priority — always beats setTimeout and setImmediate"}].map((n,o)=>s.jsxs("div",{style:{display:"flex",gap:12,padding:"10px 13px",background:n.color+"08",border:`1px solid ${n.color}22`,borderRadius:8,marginBottom:6},children:[s.jsx("span",{style:{fontSize:18,flexShrink:0},children:n.icon}),s.jsxs("div",{style:{flex:1},children:[s.jsx("div",{style:{fontSize:12,fontWeight:700,color:n.color,fontFamily:m,marginBottom:4},children:n.phase}),s.jsx("div",{style:{fontSize:12,color:l.muted,fontFamily:D,lineHeight:1.7,marginBottom:4},children:n.desc}),s.jsxs("div",{style:{fontSize:10,color:n.color+"99",fontFamily:m},children:["→ ",n.example]})]})]},o))}),e==="order"&&s.jsxs("div",{children:[[{order:"1st",label:"Synchronous code",color:"#3b82f6",detail:"Everything on the call stack right now. Always runs first, no exceptions."},{order:"2nd",label:"process.nextTick()",color:"#06b6d4",detail:"Highest priority async. Runs before Promises. Use sparingly — mainly for library authors."},{order:"3rd",label:"Promise .then / .catch",color:"#8b5cf6",detail:"Microtasks. ALL microtasks drain completely — if a .then() creates another .then(), that also runs before any setTimeout."},{order:"4th",label:"setTimeout() / setInterval()",color:"#f59e0b",detail:"Macrotasks. Even setTimeout(fn, 0) waits for ALL sync code and ALL microtasks first."},{order:"5th",label:"setImmediate()",color:l.yellow,detail:"Runs in check phase, after poll phase. Similar to setTimeout(fn, 0) but always runs before setTimeout in I/O context."},{order:"6th",label:"I/O callbacks (fs, network)",color:l.green,detail:"File read callbacks, HTTP response callbacks — run in poll phase."}].map((n,o)=>s.jsxs("div",{style:{display:"flex",gap:12,marginBottom:6,alignItems:"flex-start"},children:[s.jsx("div",{style:{width:36,height:36,borderRadius:"50%",background:n.color+"22",border:`1px solid ${n.color}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:n.color,fontFamily:m,flexShrink:0},children:n.order}),s.jsxs("div",{style:{flex:1,padding:"7px 11px",background:n.color+"08",border:`1px solid ${n.color}22`,borderRadius:7},children:[s.jsx("div",{style:{fontSize:12,fontWeight:700,color:n.color,fontFamily:m,marginBottom:3},children:n.label}),s.jsx("div",{style:{fontSize:12,color:l.muted,fontFamily:D,lineHeight:1.7},children:n.detail})]})]},o)),s.jsx(g,{label:"classic interview question",code:`console.log('A');                          // sync
setTimeout(() => console.log('E'), 0);    // macrotask
Promise.resolve()
  .then(() => console.log('C'))           // microtask
  .then(() => console.log('D'));          // microtask
process.nextTick(() => console.log('B')); // microtask (nextTick first)
console.log('A2');                        // sync

// Output: A → A2 → B → C → D → E`})]}),e==="demo"&&s.jsx(_p,{}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"What is the Event Loop?",options:["A for loop that processes requests","A mechanism that checks queues and runs callbacks when the call stack is empty","The V8 engine's JavaScript compiler","A thread pool for handling I/O"],correct:1,explain:"The Event Loop is a continuous loop that checks the Call Stack and various callback queues, running callbacks in order of priority when the stack is empty."}),s.jsx(b,{question:"Which runs FIRST after synchronous code finishes?",options:["setTimeout callback","setImmediate callback","process.nextTick callback","I/O callback"],correct:2,explain:"process.nextTick has the highest priority of any async callback — it runs before even Promise .then callbacks."}),s.jsx(b,{question:"setTimeout(fn, 0) means the function runs...",options:["Immediately, in the current tick","After 0 milliseconds exactly","After all sync code AND all microtasks finish","Before Promise callbacks"],correct:2,explain:"Even with 0ms delay, setTimeout must wait for all synchronous code to finish AND for all microtasks to drain completely."}),s.jsx(b,{question:"Why can Node.js handle 10,000 connections on a single thread?",options:["It creates threads automatically","It runs JS faster than other languages","I/O operations are handed to the OS — the single thread never blocks waiting","It uses multiple CPU cores"],correct:2,explain:"Non-blocking I/O: Node hands file reads, network calls, etc. to the OS, then immediately continues. The single thread is always busy doing JS work, never waiting for I/O."})]})]})}function Hp(){const[e,t]=N.useState("what"),r=[{id:"what",label:"🤔 What & Why"},{id:"cjs",label:"📦 CommonJS"},{id:"esm",label:"🔷 ES Modules"},{id:"wrapper",label:"🎁 Module Wrapper"},{id:"compare",label:"⚖️ Compare"}];return s.jsxs("div",{children:[s.jsxs("p",{style:P,children:["Every file in Node.js is a module. Understanding modules is essential because ",s.jsx("em",{children:"every single line of Node.js code you write"})," lives inside a module."]}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?l.yellow+"22":"transparent",border:`1px solid ${e===n.id?l.yellow:l.outline}`,color:e===n.id?l.yellow:l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="what"&&s.jsxs("div",{children:[s.jsxs(L,{number:"1",title:"What is a module?",color:"#f59e0b",children:["A module is just a file. But a special kind of file: its variables and functions are ",s.jsx("em",{children:"private by default"}),". Nothing leaks out to other files. If you create a variable in one file, no other file can see it — unless you explicitly choose to export it."]}),s.jsxs(M,{emoji:"🔒",title:"Why private by default?",color:"#3b82f6",children:["Imagine you're building a large app with 50 files. Without modules, if any file creates a variable named ",s.jsx("code",{children:"user"}),", it could accidentally overwrite another file's ",s.jsx("code",{children:"user"})," variable. Chaos. Modules prevent this — each file has its own private scope."]}),s.jsx(g,{label:"without modules — global scope chaos",code:`// file1.js
var user = 'Alice';  // global!

// file2.js
var user = 'Bob';    // overwrites Alice's user!

// file3.js
console.log(user);   // 'Bob' — but you expected 'Alice'`}),s.jsx(g,{label:"with modules — private by default",code:`// file1.js
const user = 'Alice';  // private to this file

// file2.js
const user = 'Bob';    // completely separate variable

// To share, you must explicitly export:
export const user = 'Alice';  // intentionally shared
import { user } from './file1.js';
console.log(user); // 'Alice'`})]}),e==="cjs"&&s.jsxs("div",{children:[s.jsxs(M,{emoji:"📦",title:"CommonJS — the original Node module system",color:"#f59e0b",children:["CommonJS (CJS) was created specifically for Node.js in 2009. It uses ",s.jsx("code",{children:"require()"})," to import and ",s.jsx("code",{children:"module.exports"})," to export. It loads modules ",s.jsx("strong",{children:"synchronously"})," — when you call require(), Node reads and executes that file right now, blocking until done."]}),s.jsx(g,{label:"exporting from a module",code:`// PATTERN 1: Export an object with multiple things
module.exports = {
  add:      (a, b) => a + b,
  subtract: (a, b) => a - b,
  PI:       3.14159,
};

// PATTERN 2: Export a single thing
module.exports = function add(a, b) { return a + b; };

// PATTERN 3: Add exports one at a time
exports.add = (a, b) => a + b;

// ⚠️ THE TRAP — never do this:
exports = { add, subtract };
// This BREAKS because exports is a reference to module.exports.
// Reassigning exports creates a NEW object, disconnecting it.`}),s.jsx(g,{label:"importing with require()",code:`// Get everything as an object:
const math = require('./math');
console.log(math.add(2, 3));     // 5

// Destructure on import:
const { add, subtract, PI } = require('./math');

// Import a Node CORE module (no path needed):
const fs   = require('fs');
const path = require('path');
const http = require('http');

// Import an NPM package:
const express = require('express');

// require() CACHES results:
// Second call returns the SAME object — file is NOT re-executed.`})]}),e==="esm"&&s.jsxs("div",{children:[s.jsxs(M,{emoji:"🔷",title:"ES Modules — the modern standard",color:"#3b82f6",children:["ES Modules (ESM) were standardised in 2015. They use ",s.jsx("code",{children:"import"})," and ",s.jsx("code",{children:"export"}),". Unlike CJS which loads synchronously, ESM is designed to be asynchronous and ",s.jsx("strong",{children:"statically analyzable"})," — enabling tree-shaking (removing unused code). Use ",s.jsx("code",{children:".mjs"})," extension or add ",s.jsx("code",{children:'"type": "module"'})," to package.json."]}),s.jsx(g,{label:"exporting with ES modules",code:`// Named exports:
export const PI = 3.14159;
export function add(a, b) { return a + b; }

// Default export — one per file:
export default function mainAdd(a, b) { return a + b; }

// Re-export from another file:
export { add, subtract } from './basic-math.mjs';
export * from './advanced-math.mjs';`}),s.jsx(g,{label:"importing with ES modules",code:`// Named imports:
import { add, PI } from './math.mjs';

// Default import:
import myAdd from './math.mjs';

// Both default AND named:
import Calculator, { add, PI } from './math.mjs';

// Rename on import:
import { add as mathAdd } from './math.mjs';

// Import everything as namespace:
import * as math from './math.mjs';

// Dynamic import:
const { add } = await import('./math.mjs');

// TOP-LEVEL AWAIT — ESM only:
const config = JSON.parse(await fs.promises.readFile('./config.json', 'utf8'));`}),s.jsxs(z,{icon:"⚠️",color:l.yellow,title:"No __dirname in ES Modules",children:["CommonJS gives you ",s.jsx("code",{children:"__dirname"})," and ",s.jsx("code",{children:"__filename"})," for free. ES Modules don't have these. You need to build them from ",s.jsx("code",{children:"import.meta.url"}),"."]}),s.jsx(g,{label:"__dirname replacement in ESM",code:`import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));`})]}),e==="wrapper"&&s.jsxs("div",{children:[s.jsxs(M,{emoji:"🎁",title:"The Module Wrapper Function",color:"#8b5cf6",children:["Before running any CommonJS file, Node.js wraps the entire file contents inside a function. This is why ",s.jsx("code",{children:"require"}),", ",s.jsx("code",{children:"module"}),", ",s.jsx("code",{children:"exports"}),", ",s.jsx("code",{children:"__filename"}),", ",s.jsx("code",{children:"__dirname"})," exist in every file without importing them — they're injected as function parameters."]}),s.jsx(g,{label:"what Node actually runs",code:`// Node wraps your ENTIRE file in this function:
(function(exports, require, module, __filename, __dirname) {

  // ← YOUR CODE IS PLACED HERE BY NODE
  const PI = 3.14159;
  module.exports = { PI };

});

// The 5 injected parameters:
// exports   → shortcut reference to module.exports
// require   → the require() function
// module    → the current module object
// __filename → full absolute path to this file
// __dirname  → full absolute path to this file's directory`}),s.jsx(g,{label:"why exports = {} doesn't work",code:`// exports is initially === module.exports
exports.PI = 3.14;        // ✅ modifies shared object
exports = { PI: 3.14 };   // ❌ creates NEW local variable
                          // module.exports still points to {}
module.exports = { PI };  // ✅ replaces module.exports directly`})]}),e==="compare"&&s.jsxs("div",{children:[s.jsx("div",{style:{overflowX:"auto",marginBottom:14},children:s.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontFamily:m,fontSize:11},children:[s.jsx("thead",{children:s.jsx("tr",{children:["Feature","CommonJS (require)","ES Modules (import)"].map((n,o)=>s.jsx("th",{style:{padding:"9px 12px",background:l.surface,color:[l.muted,"#f59e0b","#3b82f6"][o],textAlign:"left",borderBottom:`1px solid ${l.outline}`,fontSize:10},children:n},o))})}),s.jsx("tbody",{children:[["Syntax","require() / module.exports","import / export"],["Loading","Synchronous (blocks)","Asynchronous"],["Top-level await","❌ Cannot do this","✅ Works natively"],["Tree-shaking","❌ Bundlers struggle","✅ Bundlers remove unused"],["__dirname","✅ Free, always available","❌ Must build from import.meta.url"],["Use in new projects","Legacy codebases","Yes — this is the standard now"]].map((n,o)=>s.jsx("tr",{style:{background:o%2===0?"transparent":l.surface+"06"},children:n.map((i,a)=>s.jsx("td",{style:{padding:"8px 12px",borderBottom:`1px solid ${l.outline}`,color:a===0?l.text:l.muted},children:i},a))},o))})]})}),s.jsxs(z,{icon:"🎯",color:"#3b82f6",title:"Simple rule for 2025",children:["New project: use ES Modules. Add ",s.jsx("code",{children:'"type": "module"'})," to package.json. Learn CommonJS because you'll read it in older codebases daily — but write ESM."]})]})]})}function it({name:e,color:t,icon:r,tagline:n,children:o}){const[i,a]=N.useState(!1);return s.jsxs("div",{style:{border:`1px solid ${t}33`,borderRadius:10,overflow:"hidden",marginBottom:10},children:[s.jsxs("button",{onClick:()=>a(c=>!c),style:{width:"100%",padding:"13px 16px",background:i?t+"12":t+"07",border:"none",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:12},children:[s.jsx("span",{style:{fontSize:24},children:r}),s.jsxs("div",{style:{flex:1},children:[s.jsxs("div",{style:{fontSize:14,fontWeight:900,color:t,fontFamily:m},children:["require('",e,"')"]}),s.jsx("div",{style:{fontSize:12,color:l.muted,fontFamily:D,marginTop:2},children:n})]}),s.jsx("span",{style:{fontSize:11,color:t,fontFamily:m,flexShrink:0},children:i?"▲ collapse":"▼ expand"})]}),i&&s.jsx("div",{style:{padding:"16px 18px",borderTop:`1px solid ${t}22`},children:o})]})}function Jp(){return s.jsxs("div",{children:[s.jsxs("p",{style:P,children:["Node.js ships with ",s.jsx("strong",{style:{color:"#06b6d4"},children:"built-in modules"})," — ready to use with no npm install needed. Click any module to expand."]}),s.jsxs(it,{name:"fs",color:l.green,icon:"📁",tagline:"File System — read, write, copy, delete, watch files",children:[s.jsxs(M,{emoji:"📁",title:"What is fs?",color:l.green,children:["The ",s.jsx("code",{children:"fs"})," module gives your JavaScript program access to the computer's file system. ",s.jsx("strong",{children:"The #1 rule:"})," always use ",s.jsx("code",{children:"fs.promises"})," (async) in servers. The synchronous versions block the entire Event Loop."]}),s.jsx(g,{label:"reading files — the right way",code:`import fs from 'fs';
const fsp = fs.promises;

// READ a text file:
const text = await fsp.readFile('./data.txt', 'utf8');

// READ a binary file:
const imageBuffer = await fsp.readFile('./photo.jpg');

// READ and parse JSON:
const config = JSON.parse(await fsp.readFile('./config.json', 'utf8'));

// ❌ NEVER use readFileSync in a server:
const text = fs.readFileSync('./data.txt', 'utf8'); // blocks ALL requests!`}),s.jsx(g,{label:"writing, appending, deleting",code:`await fsp.writeFile('./output.txt', 'Hello Node!', 'utf8');
await fsp.appendFile('./server.log', line + '\\n');
await fsp.unlink('./temp.txt');
await fsp.mkdir('./logs/2024', { recursive: true });
const files = await fsp.readdir('./src');
const exists = await fsp.access('./file.txt').then(() => true).catch(() => false);`}),s.jsx(g,{label:"directories and file info",code:`const stats = await fsp.stat('./app.js');
stats.size;          // 4096 (bytes)
stats.mtime;         // Date — when last modified
stats.isFile();      // true
stats.isDirectory(); // false

await fsp.copyFile('./a.txt', './b.txt');
await fsp.rename('./old.txt', './new.txt');

fs.watch('./src', { recursive: true }, (event, filename) => {
  console.log(\`\${filename} was \${event}d\`);
});`})]}),s.jsxs(it,{name:"path",color:"#3b82f6",icon:"🛤️",tagline:"File paths — build them safely across OSes",children:[s.jsxs(M,{emoji:"⚠️",title:"Why you must use path",color:l.red,children:["On Mac/Linux, paths use ",s.jsx("code",{children:"/"}),". On Windows, they use ",s.jsx("code",{children:"\\\\"}),". If you build paths by string concatenation, your code works on your Mac, breaks on Windows. The ",s.jsx("code",{children:"path"})," module handles this automatically."]}),s.jsx(g,{label:"path methods",code:`import path from 'path';

path.join('/home', 'user', 'file.txt');   // '/home/user/file.txt'
path.resolve('src', 'app.js');            // '/cwd/src/app.js'
path.basename('/a/file.txt');             // 'file.txt'
path.basename('/a/file.txt', '.txt');     // 'file'
path.dirname('/a/file.txt');              // '/a'
path.extname('photo.jpg');                // '.jpg'
path.parse('/a/file.txt');                // { root, dir, base, name, ext }

// Most used pattern:
const cfg = path.join(__dirname, '..', 'config', 'db.json');`})]}),s.jsx(it,{name:"os",color:"#8b5cf6",icon:"💻",tagline:"Operating System info — CPU, memory, hostname",children:s.jsx(g,{label:"os methods",code:`import os from 'os';

os.platform();     // 'linux' | 'darwin' | 'win32'
os.arch();         // 'x64' | 'arm64'
os.hostname();     // 'my-server-prod-1'
os.uptime();       // 86400 (seconds since reboot)
os.totalmem();     // 17179869184 → 17.2 GB
os.freemem();      // 4294967296  → 4.3 GB free
os.cpus().length;  // 8 (logical CPU cores)

// System health object:
function systemHealth() {
  const mem = os.totalmem(), free = os.freemem();
  return {
    cpuCores: os.cpus().length,
    totalRAM: (mem / 1e9).toFixed(1) + ' GB',
    usedRAM: ((1 - free / mem) * 100).toFixed(1) + '%',
    uptime: Math.floor(os.uptime() / 3600) + ' hours',
  };
}`})}),s.jsx(it,{name:"events",color:"#f59e0b",icon:"📡",tagline:"EventEmitter — pub/sub, the foundation of Node.js I/O",children:s.jsx(g,{label:"eventemitter basics",code:`import { EventEmitter } from 'events';

class OrderSystem extends EventEmitter {
  placeOrder(item, price) {
    this.emit('order', { item, price, time: new Date() });
    if (price > 100) this.emit('bigOrder', item);
  }
}

const shop = new OrderSystem();

// .on() — runs EVERY time:
shop.on('order', (data) => console.log(data));

// .once() — runs only the FIRST time:
shop.once('bigOrder', (item) => console.log('First big order!', item));

// ❗ ALWAYS handle 'error' events:
// Unhandled 'error' events crash Node IMMEDIATELY!
shop.on('error', (err) => console.error(err));`})}),s.jsx(it,{name:"http",color:"#06b6d4",icon:"🌐",tagline:"Create HTTP servers — foundation under Express",children:s.jsx(g,{label:"raw http server",code:`import http from 'http';

const server = http.createServer(async (req, res) => {
  const url  = new URL(req.url, \`http://\${req.headers.host}\`);
  const path = url.pathname;

  const body = await new Promise((resolve) => {
    let raw = '';
    req.on('data', c => raw += c);
    req.on('end', () => resolve(raw ? JSON.parse(raw) : null));
  });

  const json = (data, s = 200) => {
    res.writeHead(s, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  if (req.method === 'GET' && path === '/') {
    return json({ message: 'Hello from Node.js!' });
  }

  json({ error: 'Not found' }, 404);
});

server.listen(3000, () => console.log('🚀 http://localhost:3000'));`})}),s.jsxs(it,{name:"crypto",color:"#f43f5e",icon:"🔐",tagline:"Hashing, encryption, HMAC, secure random",children:[s.jsx(g,{label:"secure random & hashing",code:`import crypto from 'crypto';

// CRYPTOGRAPHICALLY SECURE random bytes:
const token = crypto.randomBytes(32).toString('hex');
const id    = crypto.randomUUID(); // built-in since Node 15

// SHA-256 hash:
const sha = s => crypto.createHash('sha256').update(s).digest('hex');

// ⚠️ NEVER hash passwords with SHA256 — use bcrypt or argon2!
// SHA-256 is fine for: checksums, cache keys, ETags`}),s.jsx(g,{label:"HMAC — webhook verification",code:`const hmac = crypto.createHmac('sha256', process.env.SECRET)
  .update(rawRequestBody)
  .digest('hex');

// Use timingSafeEqual to compare — prevents timing attacks!
const valid = crypto.timingSafeEqual(
  Buffer.from(hmac),
  Buffer.from(req.headers['x-signature'])
);`})]}),s.jsx(it,{name:"child_process",color:"#f59e0b",icon:"🔀",tagline:"Run shell commands, scripts, other programs",children:s.jsx(g,{label:"exec, spawn, fork",code:`import { exec, spawn, fork } from 'child_process';
import { promisify } from 'util';

// exec — buffers output in memory (1MB limit):
const execAsync = promisify(exec);
const { stdout } = await execAsync('git log --oneline -5');

// spawn — streams stdout/stderr, no size limit:
const proc = spawn('find', ['.', '-name', '*.ts']);
proc.stdout.on('data', c => process.stdout.write(c));

// fork — separate Node.js process with IPC:
const worker = fork('./worker.js');
worker.send({ task: 'resize', file: './img.jpg' });
worker.on('message', result => console.log(result));`})}),s.jsxs(it,{name:"stream",color:"#14b8a6",icon:"🌊",tagline:"Process data chunk by chunk — essential for large files",children:[s.jsx(M,{emoji:"🌊",title:"Why streams exist",color:"#14b8a6",children:"Reading a 4GB file loads 4GB into RAM. Most servers don't have 4GB free. The process crashes. Streams process data in ~64KB chunks. A 4GB file uses ~100KB RAM. Constant memory regardless of file size."}),s.jsx(g,{label:"pipeline — the safe way to chain streams",code:`import { pipeline } from 'stream';
import { promisify } from 'util';
const pipe = promisify(pipeline);

// ✅ Use pipeline() — it handles errors properly!
// pipe() doesn't clean up on error → memory leak
await pipe(
  fs.createReadStream('./data.json'),
  createGzip(),
  fs.createWriteStream('./data.json.gz')
);

// Process a 10GB file:
await pipe(
  fs.createReadStream('./10gb-export.csv'),
  new TransformCSVtoJSON(),
  fs.createWriteStream('./output.json')
);
// RAM used: ~200KB total. Not 10GB. ✅`}),s.jsx(Bp,{})]})]})}function Qp(){const e=[{title:"What is Node.js",color:l.green,icon:"🟢",kills:["Node.js is a runtime environment — runs JavaScript outside the browser using V8 + libuv + Node APIs.","Created in 2009 by Ryan Dahl. Motivation: traditional servers wasted resources with one thread per connection.","Node.js is NOT a framework, NOT a language — it's a runtime like the JVM for Java.","Same V8 engine as Chrome — your JS knowledge transfers; only the APIs differ.","Perfect for: APIs, real-time apps, microservices, CLI tools. Bad for: CPU-heavy tasks.","npm has 2M+ packages — the largest package ecosystem in software."]},{title:"V8 + libuv + Architecture",color:"#f59e0b",icon:"⚙️",kills:["V8 = Google's JS engine in C++. Compiles JS to native machine code via JIT.","JIT = Just-In-Time compilation. V8 watches hot code paths and optimises them.","libuv = C library providing the Event Loop, thread pool (4 threads default), and cross-platform async I/O.","Thread pool handles: file reads, DNS lookups, crypto. Network I/O uses OS-level async.","V8 handles garbage collection automatically — mark-and-sweep algorithm.","UV_THREADPOOL_SIZE=8 increases the libuv thread pool size."]},{title:"Event Loop",color:"#f59e0b",icon:"🔄",kills:["Order: sync → process.nextTick → Promise .then → setTimeout → setImmediate → I/O callbacks","Microtasks (nextTick + Promises) drain COMPLETELY before ANY macrotask runs.","process.nextTick fires before Promises — use sparingly, mainly for library authors.","setTimeout(fn, 0) still runs AFTER all microtasks — '0ms' means 'minimum 0ms, after microtasks'.","The poll phase is where Node WAITS for new I/O events.","NEVER block the Event Loop: no readFileSync in servers, no heavy CPU loops.","For CPU work: use worker_threads or child_process.fork()."]},{title:"CommonJS vs ES Modules",color:"#3b82f6",icon:"📦",kills:["CJS: require() is synchronous and blocking. ESM: import is asynchronous and statically analyzed.","exports is a reference to module.exports. NEVER do exports = {...} — creates a new object, breaks the link.","require() caches modules — second require() returns the exact same cached object.","ESM has no __dirname or __filename — must construct from dirname(fileURLToPath(import.meta.url)).","Module Wrapper: Node wraps every CJS file in (function(exports, require, module, __filename, __dirname){}).","Top-level await works ONLY in ES Modules. Cannot use in CommonJS.","package.json 'type': 'module' makes all .js files ESM. Use .cjs to override per-file."]},{title:"fs module",color:l.green,icon:"📁",kills:["Always use fs.promises (async). fs.readFileSync BLOCKS the Event Loop — never use in HTTP servers.","Without 'utf8', readFile returns a Buffer (raw bytes). Always pass encoding for text.","fsp.mkdir({ recursive: true }) — safe, no error if directory already exists.","fsp.access() to check existence (no throw). Check err.code === 'ENOENT' for file-not-found.","fs.createReadStream() for large files — constant memory usage regardless of file size.","fs.watch() is unreliable cross-platform — use chokidar (npm) in production.","fsp.rename() also MOVES files when you change the directory part of the path."]},{title:"path module",color:"#3b82f6",icon:"🛤️",kills:["Mac/Linux uses / separators. Windows uses \\. path.join() picks the right one automatically.","path.join() concatenates safely. path.resolve() makes an absolute path from CWD.","__dirname (CJS) = directory of current file. Must be constructed in ESM from import.meta.url.","path.basename(p) → filename. path.dirname(p) → directory. path.extname(p) → '.jpg'.","path.normalize() removes .. and . and double slashes.","path.parse() splits into { root, dir, base, name, ext }. path.format() is the reverse."]},{title:"events module",color:"#f59e0b",icon:"📡",kills:["ALWAYS add an 'error' listener — unhandled 'error' events crash Node IMMEDIATELY.",".once() auto-removes after first call. .on() stays until you call .off().","Default max listeners = 10 per event. Getting a warning? Probably a listener leak.","EventEmitter is the base class for streams, http.Server, net.Socket, child processes.","emit() returns true if there were listeners, false if nobody was listening.","Listeners fire synchronously in registration order."]},{title:"http module",color:"#06b6d4",icon:"🌐",kills:["req.method, req.url, req.headers — your three tools to understand any incoming request.","For POST body: collect chunks in req.on('data') → parse in req.on('end'). req is a stream.","res.writeHead() MUST be called before res.end(). Sets status + headers.","res.end() MUST always be called — browser hangs forever if you forget it.","Use new URL(req.url, 'http://'+req.headers.host) to safely parse paths and query strings.","req and res are streams — you can pipe req directly to a file for upload handling."]},{title:"crypto module",color:"#f43f5e",icon:"🔐",kills:["NEVER hash passwords with SHA256 — use bcrypt or argon2 (npm). They're slow by design + salted.","crypto.randomBytes(32) is cryptographically secure. Math.random() is not — never for security.","HMAC = hash + secret key. Use for webhook verification. Use timingSafeEqual to compare signatures.","timingSafeEqual prevents timing attacks — comparison time doesn't reveal key info.","AES-256-GCM: always generate a fresh random IV for each encryption. Never reuse IVs.","crypto.randomUUID() is built-in since Node 15 — no uuid npm package needed."]},{title:"child_process module",color:"#f59e0b",icon:"🔀",kills:["exec() buffers ALL output in memory (1MB default). For large output use spawn().","spawn() streams stdout/stderr — no size limit, handles large/long-running processes.","execSync() BLOCKS the Event Loop — CLI scripts only. Never in HTTP servers.","fork() creates a separate Node.js process with IPC channel. Use for CPU-heavy work.","shell: true enables pipes/globs but is a security risk with any user input.","Always handle child.on('error') and child.on('close'). Clean up processes on exit."]},{title:"stream module",color:"#14b8a6",icon:"🌊",kills:["4 types: Readable (source), Writable (dest), Duplex (read+write), Transform (read+modify+write).","Always use pipeline() not pipe() — pipeline properly destroys all streams on any error.","Backpressure: when writable.write() returns false, pause readable until 'drain' event fires.","highWaterMark controls buffer size (default 16KB). Tune per use case.","objectMode: true — stream JS objects instead of Buffers.","ALL HTTP req/res, net.Socket, fs.createRead/WriteStream, zlib, crypto cipher are streams."]}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"One card per topic. The precise facts that matter most — for interviews, for debugging, for real work."}),s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:e.map(t=>s.jsxs("div",{style:{border:`1px solid ${t.color}33`,borderRadius:10,overflow:"hidden"},children:[s.jsxs("div",{style:{padding:"10px 14px",background:t.color+"0d",borderBottom:`1px solid ${t.color}22`,display:"flex",alignItems:"center",gap:8},children:[s.jsx("span",{style:{fontSize:16},children:t.icon}),s.jsx("span",{style:{fontSize:13,fontWeight:900,color:t.color,fontFamily:m},children:t.title})]}),s.jsx("div",{style:{padding:"10px 14px",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:6},children:t.kills.map((r,n)=>s.jsxs("div",{style:{display:"flex",gap:8},children:[s.jsx("span",{style:{color:t.color,fontSize:10,marginTop:3,flexShrink:0},children:"▸"}),s.jsx("span",{style:{fontSize:11,color:l.muted,lineHeight:1.65,fontFamily:D},children:r})]},n))})]},t.title))})]})}function Vp(){const[e,t]=N.useState("runtime"),r=[{id:"runtime",label:"⚙️ Runtime"},{id:"modules",label:"📦 Modules"},{id:"fs-path",label:"📁 fs + path"},{id:"net",label:"🌐 http + events"},{id:"power",label:"🔐 crypto + child + stream"},{id:"mistakes",label:"💀 Mistakes"}],n={runtime:s.jsxs("div",{children:[s.jsx(g,{label:"execution order",code:`console.log('1');
process.nextTick(() => console.log('2'));
Promise.resolve().then(() => console.log('3'));
setTimeout(() => console.log('4'), 0);
setImmediate(() => console.log('5'));
console.log('6');
// Output: 1 → 6 → 2 → 3 → 4 → 5`}),s.jsx(g,{label:"process — global reference",code:`process.env.NODE_ENV    // 'production' | 'development'
process.env.PORT        // '3000'
process.argv            // ['node', 'app.js', '--flag', 'value']
process.cwd()           // working directory
process.exit(0)         // success. process.exit(1) = error
process.uptime()        // seconds running
process.memoryUsage()   // { heapUsed, heapTotal, rss }
process.pid             // 12345
process.version         // 'v20.11.0'
process.platform        // 'linux' | 'darwin' | 'win32'

process.on('SIGTERM', async () => {
  server.close();
  await db.disconnect();
  process.exit(0);
});
process.on('uncaughtException',  err => { log(err); process.exit(1); });
process.on('unhandledRejection', err => { log(err); process.exit(1); });`})]}),modules:s.jsxs("div",{children:[s.jsx(g,{label:"commonjs",code:`// Export:
module.exports = { fn1, fn2, VALUE };  // ✅ recommended
exports.fn1 = fn1;                     // ✅ one at a time
// exports = {...}                      // ❌ NEVER — breaks ref

// Import:
const { fn1 }   = require('./mod');
const fs        = require('fs');       // core
const express   = require('express'); // npm`}),s.jsx(g,{label:"es modules",code:`// Export:
export const PI = 3.14;
export function add(a, b) { return a + b; }
export default class Calc {}

// Import:
import Calc             from './math.mjs';
import { add, PI }      from './math.mjs';
import { add as sum }   from './math.mjs';
import * as math        from './math.mjs';

// __dirname in ESM:
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Dynamic import:
const { add } = await import('./math.mjs');`})]}),"fs-path":s.jsxs("div",{children:[s.jsx(g,{label:"fs.promises",code:`import { readFile, writeFile, appendFile, unlink,
         mkdir, readdir, stat, copyFile, rename, access } from 'fs/promises';

const text  = await readFile('./file.txt', 'utf8');
const buf   = await readFile('./img.png');

await writeFile('./out.txt', content, 'utf8');
await appendFile('./log.txt', line + '\\n');
await unlink('./tmp.txt');
await mkdir('./logs', { recursive: true });
const files = await readdir('./src');
const s     = await stat('./file.txt');
// s.isFile() s.isDirectory() s.size s.mtime

await copyFile('./a.txt', './b.txt');
await rename('./old.txt', './new.txt');
const ok = await access('./f.txt').then(() => true).catch(() => false);`}),s.jsx(g,{label:"path",code:`import path from 'path';
path.join('/home', 'user', 'file.txt')  // '/home/user/file.txt'
path.resolve('src', 'app.js')           // '/cwd/src/app.js'
path.basename('/a/file.txt')            // 'file.txt'
path.basename('/a/file.txt', '.txt')    // 'file'
path.dirname('/a/file.txt')             // '/a'
path.extname('photo.jpg')               // '.jpg'
path.parse('/a/file.txt')               // { root, dir, base, name, ext }
path.normalize('/foo//bar/../baz')      // '/foo/baz'
const cfg = path.join(__dirname, '..', 'config', 'db.json');`})]}),net:s.jsxs("div",{children:[s.jsx(g,{label:"http server",code:`const server = http.createServer(async (req, res) => {
  const url    = new URL(req.url, \`http://\${req.headers.host}\`);
  const path   = url.pathname;
  const params = url.searchParams;

  const body = await new Promise(r => {
    let raw = '';
    req.on('data', c => raw += c);
    req.on('end', () => r(raw ? JSON.parse(raw) : null));
  });

  const json = (data, s = 200) => {
    res.writeHead(s, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  if (req.method === 'GET' && path === '/') return json({ ok: true });
  json({ error: 'Not found' }, 404);
});
server.listen(3000);`}),s.jsx(g,{label:"events",code:`import { EventEmitter, once } from 'events';
const em = new EventEmitter();

em.on('data', payload => handle(payload));
em.once('ready', ()   => console.log('Connected once!'));
em.emit('data', { value: 42 });
em.off('data', handler);

// ALWAYS:
em.on('error', err => console.error(err));

// Promisify an event:
const [data] = await once(em, 'result');`})]}),power:s.jsxs("div",{children:[s.jsx(g,{label:"crypto",code:`import crypto from 'crypto';
const token = crypto.randomBytes(32).toString('hex');
const id    = crypto.randomUUID();
const sha   = s => crypto.createHash('sha256').update(s).digest('hex');
const hmac  = crypto.createHmac('sha256', secret).update(body).digest('hex');
const valid = crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));

function encrypt(text, key) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([c.update(text, 'utf8'), c.final()]);
  return { iv: iv.toString('hex'), data: enc.toString('hex'), tag: c.getAuthTag().toString('hex') };
}`}),s.jsx(g,{label:"child_process + stream",code:`import { spawn, fork } from 'child_process';
import { pipeline } from 'stream';
import { promisify } from 'util';

const execAsync = promisify(require('child_process').exec);
const pipe      = promisify(pipeline);

const { stdout } = await execAsync('git log --oneline -5');

const proc = spawn('find', ['.', '-name', '*.ts']);
proc.stdout.on('data', c => process.stdout.write(c));

const worker = fork('./worker.js');
worker.send({ task: 'resize', file: './img.jpg' });
const result = await new Promise(r => worker.once('message', r));

await pipe(
  createReadStream('./data.json'),
  createGzip(),
  createWriteStream('./data.json.gz')
);`})]}),mistakes:s.jsx("div",{children:[{color:l.red,title:"readFileSync in a server — blocks ALL requests",bad:`app.get('/data', (req, res) => {
  const data = fs.readFileSync('./huge.json'); // ❌ blocks!
  res.json(JSON.parse(data));
});`,good:`app.get('/data', async (req, res) => {
  const data = await fs.promises.readFile('./huge.json', 'utf8');
  res.json(JSON.parse(data)); // ✅ event loop free
});`},{color:"#f59e0b",title:"exports = {} instead of module.exports",bad:`exports = { add, subtract };
// ❌ disconnects from module.exports
// require('./math') returns {} — nothing!`,good:"module.exports = { add, subtract }; // ✅"},{color:"#8b5cf6",title:"No 'error' listener on EventEmitter",bad:`const em = new EventEmitter();
em.emit('error', new Error('Oops'));
// ❌ Unhandled 'error' event → Node crashes!`,good:`em.on('error', err => {
  console.error('Caught:', err.message); // ✅ survives
});`},{color:"#f59e0b",title:"exec() for large command output",bad:`exec('find / -name "*.log"', (err, stdout) => {
  // ❌ stdout = gigabytes → crash
});`,good:`const proc = spawn('find', ['/', '-name', '*.log']);
proc.stdout.on('data', c => process.stdout.write(c)); // ✅`},{color:"#14b8a6",title:"pipe() instead of pipeline()",bad:`readStream.pipe(transform).pipe(writeStream);
// ❌ Error in transform → streams stay open → leak`,good:`const pipe = promisify(pipeline);
await pipe(readStream, transform, writeStream); // ✅`}].map((o,i)=>s.jsxs("div",{style:{border:`1px solid ${o.color}28`,borderRadius:8,overflow:"hidden",marginBottom:10},children:[s.jsxs("div",{style:{padding:"8px 14px",background:o.color+"0d",fontSize:11,fontWeight:700,color:o.color,fontFamily:m},children:["💀 ",o.title]}),s.jsxs("div",{style:{display:"flex",flexWrap:"wrap"},children:[s.jsxs("div",{style:{flex:1,minWidth:160,padding:"10px 14px",borderRight:`1px solid ${l.outline}`,borderTop:`1px solid ${l.outline}`},children:[s.jsx("div",{style:{fontSize:9,color:l.red,fontFamily:m,marginBottom:4},children:"❌ WRONG"}),s.jsx("pre",{style:{margin:0,fontSize:10,color:l.red+"bb",fontFamily:m,lineHeight:1.7,whiteSpace:"pre-wrap"},children:o.bad})]}),s.jsxs("div",{style:{flex:1,minWidth:160,padding:"10px 14px",borderTop:`1px solid ${l.outline}`},children:[s.jsx("div",{style:{fontSize:9,color:l.greenText,fontFamily:m,marginBottom:4},children:"✅ CORRECT"}),s.jsx("pre",{style:{margin:0,fontSize:10,color:l.greenText+"bb",fontFamily:m,lineHeight:1.7,whiteSpace:"pre-wrap"},children:o.good})]})]})]},i))})};return s.jsxs("div",{children:[s.jsxs("p",{style:P,children:["Everything on one page. ",s.jsx("strong",{style:{color:"#ec4899"},children:"Bookmark this."})]}),s.jsx("div",{style:{display:"flex",gap:5,marginBottom:14,flexWrap:"wrap"},children:r.map(o=>s.jsx("button",{onClick:()=>t(o.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===o.id?"#ec489922":"transparent",border:`1px solid ${e===o.id?"#ec4899":l.outline}`,color:e===o.id?"#ec4899":l.muted,borderRadius:5,cursor:"pointer",fontWeight:e===o.id?700:400},children:o.label},o.id))}),n[e]]})}function Gp(){const[e,t]=N.useState(null),r=[{q:"What is Node.js? Explain it to someone who has never heard of it.",level:"Junior",color:l.green,a:`Node.js is a runtime environment — a program installed on a computer that can read and execute JavaScript files, giving that JavaScript access to the computer's file system, network, and operating system.

Before Node.js (created in 2009), JavaScript could only run inside web browsers. You couldn't use JavaScript to build servers, read files, or create CLI tools. Node.js changed that.

It uses Google's V8 engine (the same engine inside Chrome) plus a C library called libuv to handle async I/O efficiently.

Key distinction: Node.js is NOT a framework and NOT a programming language. It's a runtime — like how the JVM lets you run Java, Node.js lets you run JavaScript on servers.`,code:`// Browser only:
document.getElementById('btn').click();

// With Node.js:
import fs from 'fs';
const data = await fs.promises.readFile('./data.json', 'utf8');

// Same language. Completely different powers.`},{q:"What is the Event Loop and why is it important?",level:"Junior",color:l.green,a:`The Event Loop is the mechanism that allows Node.js to handle many concurrent operations on a single JavaScript thread.

When you call an async operation (like reading a file), Node hands the work to the OS via libuv and immediately continues running other code. When the OS finishes, it puts your callback in a queue. The Event Loop continuously checks this queue and runs callbacks when the Call Stack is empty.

Why it matters: traditional servers create one thread per request (~1MB RAM each). At 10,000 concurrent users, that's 10GB just for threads. Node handles the same traffic with a single thread because it never blocks waiting.

The danger: any synchronous code that takes a long time (heavy loops, readFileSync) blocks the entire Event Loop. Every other request waits.`,code:`// Node can handle thousands of connections:
for (const request of 10000Requests) {
  db.query('SELECT * FROM users', callback);
  // Node doesn't wait — immediately starts next query
}

// The danger — blocking the Event Loop:
app.get('/slow', (req, res) => {
  for (let i = 0; i < 1e9; i++) {} // blocks 10 SECONDS!
  res.send('done');
});`},{q:"What is the execution order of async code in Node.js?",level:"Mid",color:"#3b82f6",a:`The exact order:

1. Synchronous code — runs first, always, no exceptions
2. process.nextTick() — highest priority async. Runs before Promises.
3. Promise .then/.catch callbacks — microtasks. ALL microtasks drain before any macrotask.
4. setTimeout() / setInterval() — macrotasks. Timer phase of Event Loop.
5. setImmediate() — runs in check phase, after poll phase.
6. I/O callbacks (fs, network) — run in poll phase.

The critical rule: ALL microtasks (nextTick + Promises) drain completely after each sync block and after each macrotask. If a .then() creates another .then(), that second one also runs before any setTimeout.`,code:`console.log('1');                            // sync
setTimeout(() => console.log('4'), 0);       // macrotask
Promise.resolve()
  .then(() => console.log('3'))              // microtask
  .then(() => console.log('D'));             // microtask
process.nextTick(() => console.log('2'));     // nextTick
console.log('1b');                           // sync

// Output: 1 → 1b → 2 → 3 → D → 4`},{q:"What is the difference between CommonJS and ES Modules?",level:"Junior",color:l.green,a:`CommonJS (CJS): Node's original system (2009). Uses require()/module.exports. Loads synchronously — require() blocks while reading and executing the file. Dynamic — you can require() inside if statements. Default for .js files.

ES Modules (ESM): The modern standard (2015). Uses import/export. Loads asynchronously. Static — imports must be at the top level, enabling tree-shaking. Requires .mjs or "type":"module" in package.json.

Key differences:
1. exports = {} BREAKS in CJS — use module.exports instead
2. __dirname doesn't exist in ESM — build it from import.meta.url
3. Top-level await only works in ESM
4. Dynamic import() is async in ESM`,code:`// CommonJS trap:
exports = { add };    // ❌ disconnects from module.exports
module.exports = { add }; // ✅ correct

// ESM __dirname:
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Top-level await — ESM only:
const config = await fs.promises.readFile('./config.json', 'utf8');
// Impossible in CommonJS!`},{q:"When and why would you use streams?",level:"Mid",color:"#3b82f6",a:`Streams solve the memory problem with large data.

Without streams: reading a 4GB file loads 4GB into RAM. Most servers don't have 4GB free. The process crashes.

With streams: data is processed in small chunks (~64KB at a time). A 4GB file uses ~100KB of RAM. Constant memory regardless of file size.

Additionally, streams allow you to START processing before the entire data arrives. With fs.readFile(), you wait for the complete file. With createReadStream(), you start processing after the first 64KB.

Always use pipeline() not pipe(). pipeline() properly destroys all streams on error — pipe() doesn't, which causes memory leaks.`,code:`// Without streams — dangerous:
const data = await fs.promises.readFile('./4gb-log.txt');
// Loads 4GB into RAM → process likely crashes

// With streams — safe:
import { pipeline } from 'stream';
import { promisify } from 'util';

await promisify(pipeline)(
  createReadStream('./4gb-log.txt'),
  createGzip(),
  createWriteStream('./log.gz')
);
// RAM used: ~200KB total, regardless of file size`},{q:"What is the Module Wrapper Function?",level:"Mid",color:"#3b82f6",a:`Before running any CommonJS file, Node.js wraps the entire file contents in a function:
(function(exports, require, module, __filename, __dirname) { /* your code */ })

This explains three mysteries:
1. Why require, module, exports, __filename, __dirname exist in every file without importing them — they're injected as function parameters.
2. Why variables don't leak between files — they're inside a function scope.
3. Why exports = {} doesn't work — you're reassigning a local function parameter, disconnecting it from module.exports.`,code:`// Your math.js file:
const PI = 3.14;
module.exports = { PI };

// What Node ACTUALLY executes:
(function(exports, require, module, __filename, __dirname) {
  const PI = 3.14; // scoped — doesn't leak!
  module.exports = { PI }; // sets the actual exports ✅
});

// The exports trap:
(function(exports, require, module, ...) {
  exports = { PI }; // ❌ reassigns LOCAL variable
                    // module.exports is still {}
});`},{q:"How do you handle errors properly in Node.js?",level:"Senior",color:"#8b5cf6",a:`Three categories of errors need different handling:

1. Async errors (try/catch with await): wrap await calls, check error codes like err.code === 'ENOENT'. Return defaults for expected errors, rethrow unexpected ones.

2. EventEmitter errors: ALWAYS add an 'error' event listener. Unhandled 'error' events crash Node immediately — no try/catch helps.

3. Process-level safety nets: process.on('uncaughtException') and process.on('unhandledRejection') for errors that slip through. Log and exit — don't try to recover.

For production servers: implement graceful shutdown on SIGTERM. Stop accepting new connections, let in-flight requests finish, close database connections, then exit cleanly.`,code:`// 1. Async — specific error codes:
async function loadFile(path) {
  try {
    return await fs.promises.readFile(path, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') return null; // expected → default
    throw err; // unexpected → let caller handle
  }
}

// 2. EventEmitter — ALWAYS:
server.on('error', err => { console.error(err); process.exit(1); });

// 3. Process safety nets:
process.on('uncaughtException',  err => { log(err); process.exit(1); });
process.on('unhandledRejection', err => { log(err); process.exit(1); });

// 4. Graceful shutdown:
process.on('SIGTERM', async () => {
  server.close();
  await db.disconnect();
  process.exit(0);
});`}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:'These questions cover everything from "what is Node.js" to deep internals. Know these for any backend or full-stack interview.'}),s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:7},children:r.map((n,o)=>s.jsxs("div",{style:{border:`1px solid ${e===o?n.color+"55":l.outline}`,borderRadius:9,overflow:"hidden",transition:"border-color 0.2s"},children:[s.jsxs("button",{onClick:()=>t(e===o?null:o),style:{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"11px 14px",background:e===o?n.color+"0d":"transparent",border:"none",cursor:"pointer",textAlign:"left"},children:[s.jsx("span",{style:{fontSize:9,padding:"2px 6px",background:n.color+"22",border:`1px solid ${n.color}44`,borderRadius:3,color:n.color,fontFamily:m,fontWeight:700,flexShrink:0},children:n.level}),s.jsx("span",{style:{fontSize:12,color:e===o?n.color:l.text,fontFamily:D,flex:1,lineHeight:1.4},children:n.q}),s.jsx("span",{style:{color:n.color,fontSize:13,flexShrink:0},children:e===o?"▲":"▼"})]}),e===o&&s.jsxs("div",{style:{padding:"0 14px 14px",borderTop:`1px solid ${n.color}22`},children:[s.jsx("pre",{style:{margin:"10px 0 0",fontSize:12,color:l.muted,fontFamily:D,lineHeight:1.9,whiteSpace:"pre-wrap",wordBreak:"break-word"},children:n.a}),s.jsx(g,{label:"code",code:n.code})]})]},o))})]})}function Yp(){const[e,t]=N.useState(0),[r,n]=N.useState(!1),o=[{label:"Request arrives at /users",who:"Client",color:"#3b82f6",req:"GET /users",res:""},{label:"app.use(logger) → logs request",who:"Middleware 1",color:"#f59e0b",req:"GET /users",res:""},{label:"app.use(auth) → checks token",who:"Middleware 2",color:"#f59e0b",req:"GET /users",res:""},{label:"app.use(express.json) → parse body",who:"Middleware 3",color:"#f59e0b",req:"GET /users",res:""},{label:"app.get('/users') → route handler",who:"Route Handler",color:"#8b5cf6",req:"GET /users",res:"{ users: [...] }"},{label:"Response sent back to client",who:"Client",color:"#3b82f6",req:"",res:"{ users: [...] }"}],i=async()=>{n(!0),t(0);for(let a=1;a<=o.length;a++)await new Promise(c=>setTimeout(c,700)),t(a);n(!1)};return s.jsxs("div",{style:{padding:14,background:l.surfaceLowest,border:`1px solid ${l.outline}`,borderRadius:10},children:[s.jsx("div",{style:{fontSize:10,color:l.muted,fontFamily:m,letterSpacing:1,marginBottom:10},children:"🧪 LIVE — step through the middleware chain"}),s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:4,marginBottom:12},children:o.map((a,c)=>s.jsxs("div",{style:{display:"flex",gap:10,padding:"7px 10px",background:e>c?a.color+"15":e===c?a.color+"22":l.surface,border:`1px solid ${e>=c?a.color+"40":l.outline}`,borderRadius:6,transition:"all 0.35s",opacity:e>=c?1:.45},children:[s.jsx("span",{style:{fontSize:14,width:20,flexShrink:0},children:e>c?"✅":e===c?"⏳":"○"}),s.jsx("div",{style:{flex:1},children:s.jsxs("div",{style:{fontSize:11,color:e>=c?a.color:l.muted,fontFamily:m,fontWeight:e===c?700:400},children:[a.who,": ",a.label]})})]},c))}),s.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"},children:[s.jsx("button",{onClick:i,disabled:r,style:{padding:"6px 16px",background:r?l.muted+"18":l.greenBg,border:`1px solid ${r?l.outline:l.green}`,color:r?l.muted:l.greenText,borderRadius:5,cursor:r?"default":"pointer",fontSize:11,fontFamily:m},children:r?"● running...":"▶ Run it"}),s.jsx("div",{style:{fontSize:10,color:l.muted,fontFamily:m},children:e===0?"press Run to watch middleware execute in order":e>=o.length?"Done! Notice middleware runs BEFORE the route handler.":`step ${e} of ${o.length}`})]})]})}function Kp(){const[e,t]=N.useState("story"),r=[{id:"story",label:"📖 The Story"},{id:"server",label:"🖥️ First Server"},{id:"why",label:"🎯 Why Express?"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"Express.js is the de facto standard web framework for Node.js. It is minimal, unopinionated, and powers millions of production APIs."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#8b5cf622":"transparent",border:`1px solid ${e===n.id?"#8b5cf6":l.outline}`,color:e===n.id?"#8b5cf6":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="story"&&s.jsxs("div",{children:[s.jsxs(L,{number:"1",title:"Node.js gave JavaScript superpowers",color:"#3b82f6",children:["In 2009, Node.js let JavaScript run on servers. But the built-in ",s.jsx("code",{children:"http"})," module was verbose. You had to manually parse URLs, handle routing, and manage headers. Every developer was rewriting the same boilerplate."]}),s.jsxs(L,{number:"2",title:"TJ Holowaychuk built Express in 2010",color:"#f59e0b",children:["TJ Holowaychuk created Express.js as a thin layer on top of Node's ",s.jsx("code",{children:"http"})," module. His insight: routing and middleware are the only primitives a web framework truly needs. Everything else is optional."]}),s.jsxs(L,{number:"3",title:"The middleware pattern changed everything",color:"#8b5cf6",children:["Instead of one giant request handler, Express broke processing into small, composable functions called ",s.jsx("strong",{children:"middleware"}),". Each middleware can inspect the request, modify it, or terminate it. This pattern became the standard for Node.js servers."]}),s.jsxs(M,{emoji:"🎯",title:"What Express actually is — one sentence",color:"#8b5cf6",children:[s.jsx("strong",{children:"Express is a minimal, unopinionated web framework"})," that provides a robust set of features for web and mobile applications: routing, middleware, template engine integration, and HTTP utility methods."]}),s.jsx(z,{icon:"🔑",color:l.yellow,title:"Key insight",children:"Express is NOT a full-stack framework like Django or Laravel. It does not dictate your database, ORM, or folder structure. It gives you routing + middleware — you choose everything else."})]}),e==="server"&&s.jsxs("div",{children:[s.jsx(g,{label:"the simplest express server",code:`const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`}),s.jsxs("p",{style:P,children:["Four lines of logic, one route, one response. Compare this to the raw ",s.jsx("code",{children:"http"})," module which needs ~20 lines just to parse the request body and route."]}),s.jsx(g,{label:"run it",code:`node server.js
# Then visit http://localhost:3000 in your browser`}),s.jsxs(z,{icon:"💡",color:l.yellow,title:"req and res",children:["Every route handler receives ",s.jsx("code",{children:"req"})," (the request object) and ",s.jsx("code",{children:"res"})," (the response object). Express extends Node's native objects with helpful methods like ",s.jsx("code",{children:"res.json()"}),", ",s.jsx("code",{children:"res.status()"}),", and ",s.jsx("code",{children:"res.send()"}),"."]})]}),e==="why"&&s.jsx("div",{children:[{title:"Minimal and fast",color:"#06b6d4",icon:"⚡",desc:"Express adds almost zero overhead. A hello-world Express app can handle 20,000+ requests per second on modest hardware. It is one of the fastest web frameworks in any language."},{title:"Middleware ecosystem",color:"#f59e0b",icon:"🧩",desc:"Thousands of middleware packages on npm: CORS, body parsing, compression, rate limiting, authentication. Drop them in with app.use() and they just work."},{title:"Unopinionated flexibility",color:l.green,icon:"🔧",desc:"Want MongoDB? Use Mongoose. Want PostgreSQL? Use Prisma. Want MVC? Organize your folders that way. Express does not care — it only handles HTTP."},{title:"Industry standard",color:"#8b5cf6",icon:"🏢",desc:"Express is used by Netflix, Uber, IBM, and countless startups. When a job posting says 'Node.js backend experience,' they almost always mean Express experience."},{title:"Foundation for bigger frameworks",color:"#f43f5e",icon:"🏗️",desc:"NestJS, Sails, LoopBack, and Feathers are all built on top of Express. Learning Express deeply makes every other Node framework easier to understand."}].map((n,o)=>s.jsxs("div",{style:{marginBottom:10,padding:"13px 16px",background:n.color+"08",border:`1px solid ${n.color}25`,borderRadius:9},children:[s.jsxs("div",{style:{fontSize:13,fontWeight:700,color:n.color,fontFamily:m,marginBottom:7},children:[n.icon," ",n.title]}),s.jsx("p",{style:{...P,marginBottom:0},children:n.desc})]},o))}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"What is Express.js?",options:["A database for Node.js applications","A minimal web framework for Node.js","A frontend JavaScript library like React","A replacement for the V8 engine"],correct:1,explain:"Express is a minimal, unopinionated web framework for Node.js. It provides routing, middleware, and HTTP utilities."}),s.jsx(b,{question:"Which Node.js module does Express build on top of?",options:["fs (file system)","path","http","crypto"],correct:2,explain:"Express is built on top of Node's built-in http module. It adds routing, middleware, and convenience methods."}),s.jsx(b,{question:"What makes Express 'unopinionated'?",options:["It forces you to use MongoDB","It does not dictate your database, ORM, or folder structure","It has no opinions about HTTP methods","It only works with certain frontend frameworks"],correct:1,explain:"Unopinionated means Express gives you the HTTP layer and lets you choose everything else: database, architecture, folder structure, etc."})]})]})}function Xp(){const[e,t]=N.useState("methods"),r=[{id:"methods",label:"📬 HTTP Methods"},{id:"params",label:"🔗 URL Params"},{id:"query",label:"❓ Query Strings"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"Routing determines how an application responds to a client request at a particular endpoint (URI) and HTTP method."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#3b82f622":"transparent",border:`1px solid ${e===n.id?"#3b82f6":l.outline}`,color:e===n.id?"#3b82f6":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="methods"&&s.jsxs("div",{children:[s.jsx(g,{label:"all HTTP methods",code:`const express = require('express');
const app = express();

// GET — retrieve data
app.get('/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

// POST — create data
app.post('/users', (req, res) => {
  res.status(201).json({ message: 'User created' });
});

// PUT — full update
app.put('/users/:id', (req, res) => {
  res.json({ message: \`User \${req.params.id} updated\` });
});

// PATCH — partial update
app.patch('/users/:id', (req, res) => {
  res.json({ message: \`User \${req.params.id} partially updated\` });
});

// DELETE — remove data
app.delete('/users/:id', (req, res) => {
  res.json({ message: \`User \${req.params.id} deleted\` });
});

app.listen(3000);`}),s.jsx(z,{icon:"🎯",color:l.yellow,title:"REST mapping",children:"GET = read, POST = create, PUT = replace, PATCH = modify, DELETE = remove. Using the correct HTTP method makes your API predictable and cacheable."}),s.jsx(g,{label:"test with curl",code:`curl http://localhost:3000/users              # GET
curl -X POST http://localhost:3000/users      # POST
curl -X PUT http://localhost:3000/users/5     # PUT
curl -X PATCH http://localhost:3000/users/5   # PATCH
curl -X DELETE http://localhost:3000/users/5  # DELETE`})]}),e==="params"&&s.jsxs("div",{children:[s.jsx(g,{label:"route parameters",code:`// :id is a route parameter
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;  // always a string
  res.json({ userId });
});

// Multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

// Optional parameter
app.get('/users/:id?', (req, res) => {
  if (req.params.id) {
    res.json({ message: \`User \${req.params.id}\` });
  } else {
    res.json({ message: 'All users' });
  }
});`}),s.jsxs(M,{emoji:"⚠️",title:"req.params values are ALWAYS strings",color:l.red,children:["Even if the URL is ",s.jsx("code",{children:"/users/42"}),", ",s.jsx("code",{children:"req.params.id"})," is the string ",s.jsx("code",{children:'"42"'}),". If you need a number, use ",s.jsx("code",{children:"parseInt(req.params.id)"})," or ",s.jsx("code",{children:"Number(req.params.id)"}),"."]})]}),e==="query"&&s.jsxs("div",{children:[s.jsx(g,{label:"query strings",code:`// GET /search?q=express&limit=10
app.get('/search', (req, res) => {
  const query = req.query.q;      // 'express'
  const limit = req.query.limit;  // '10' (string!)
  res.json({ query, limit });
});

// Express automatically parses query strings
// No middleware needed for basic query parsing`}),s.jsxs(z,{icon:"💡",color:l.yellow,title:"req.query is also strings",children:["Just like ",s.jsx("code",{children:"req.params"}),", values in ",s.jsx("code",{children:"req.query"})," are strings. ",s.jsx("code",{children:"?limit=10"})," gives ",s.jsx("code",{children:'"10"'}),", not ",s.jsx("code",{children:"10"}),". Convert with ",s.jsx("code",{children:"parseInt()"})," when needed."]})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"Which HTTP method should you use to create a new resource?",options:["GET","POST","PUT","DELETE"],correct:1,explain:"POST is the standard HTTP method for creating new resources. GET reads, PUT updates, DELETE removes."}),s.jsx(b,{question:"What is the value of req.params.id for the URL /users/42?",options:["42 (number)","'42' (string)","undefined","null"],correct:1,explain:"req.params values are ALWAYS strings. req.params.id would be '42', not the number 42."}),s.jsx(b,{question:"How do you access query string ?page=2 in Express?",options:["req.query.page","req.params.page","req.body.page","req.headers.page"],correct:0,explain:"Express parses query strings automatically into req.query. req.query.page would be '2'."})]})]})}function Zp(){const[e,t]=N.useState("concept"),r=[{id:"concept",label:"🧠 Concept"},{id:"examples",label:"💡 Examples"},{id:"order",label:"📊 Execution Order"},{id:"demo",label:"🧪 Live Demo"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"Middleware functions have access to the request object, the response object, and the next middleware function in the cycle. They are the heart of Express."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#f59e0b22":"transparent",border:`1px solid ${e===n.id?"#f59e0b":l.outline}`,color:e===n.id?"#f59e0b":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="concept"&&s.jsxs("div",{children:[s.jsxs(L,{number:"1",title:"Middleware is just a function with (req, res, next)",color:"#f59e0b",children:["A middleware function takes three arguments: the request object, the response object, and ",s.jsx("code",{children:"next"})," — a function that passes control to the next middleware. If you forget to call ",s.jsx("code",{children:"next()"}),", the request hangs forever."]}),s.jsx(g,{label:"middleware anatomy",code:`function myMiddleware(req, res, next) {
  // Do something with req or res
  console.log('Request URL:', req.url);
  
  // Pass control to next middleware
  next();
  
  // OR terminate the request
  // res.status(403).send('Forbidden');
}`}),s.jsxs(L,{number:"2",title:"Middleware can modify req and res",color:"#3b82f6",children:["Middleware functions can add properties to ",s.jsx("code",{children:"req"})," or ",s.jsx("code",{children:"res"})," that later middleware can read. This is how authentication middleware attaches ",s.jsx("code",{children:"req.user"})," for route handlers to use."]}),s.jsxs(M,{emoji:"🔄",title:"The middleware cycle",color:"#f59e0b",children:["Request → Middleware 1 → Middleware 2 → Route Handler → Response. Each middleware can either call ",s.jsx("code",{children:"next()"})," to continue, or call ",s.jsx("code",{children:"res.send()"})," to end the response early."]})]}),e==="examples"&&s.jsxs("div",{children:[s.jsx(g,{label:"request logger middleware",code:"const logger = (req, res, next) => {\n  console.log(`${new Date().toISOString()} — ${req.method} ${req.path}`);\n  next(); // pass control\n};\n\napp.use(logger); // applies to ALL routes"}),s.jsx(g,{label:"body parser middleware (built-in)",code:`// Parse JSON request bodies
app.use(express.json());

// Now req.body contains parsed JSON
app.post('/users', (req, res) => {
  console.log(req.body); // { name: 'John', age: 30 }
  res.json({ received: req.body });
});`}),s.jsx(g,{label:"authentication middleware",code:`const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === 'secret-key-123') {
    next(); // authorized, continue
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Apply to specific route
app.get('/protected', checkApiKey, (req, res) => {
  res.json({ message: 'Secret data' });
});`}),s.jsxs(z,{icon:"🔑",color:l.yellow,title:"Order matters",children:["Middleware is executed in the order it is registered with ",s.jsx("code",{children:"app.use()"}),". Put ",s.jsx("code",{children:"express.json()"})," before routes that need ",s.jsx("code",{children:"req.body"}),". Put authentication before protected routes."]})]}),e==="order"&&s.jsxs("div",{children:[s.jsx(g,{label:"middleware runs in definition order",code:`app.use((req, res, next) => {
  console.log('1. First');
  next();
});

app.use((req, res, next) => {
  console.log('2. Second');
  next();
});

app.get('/', (req, res) => {
  console.log('3. Route handler');
  res.send('Done');
});

// Output when visiting /:
// 1. First
// 2. Second
// 3. Route handler`}),s.jsx(g,{label:"conditional middleware",code:`const auth = (req, res, next) => { ... };

// No middleware
app.get('/public', (req, res) => res.send('Public'));

// Single middleware
app.get('/dashboard', auth, (req, res) => res.send('Dashboard'));

// Multiple middleware
app.post('/admin', auth, adminOnly, (req, res) => {
  res.send('Admin panel');
});`}),s.jsxs(M,{emoji:"⚠️",title:"Missing next() hangs the request",color:l.red,children:["If a middleware does not call ",s.jsx("code",{children:"next()"})," AND does not send a response, the client will wait forever. Always end the request or call next()."]})]}),e==="demo"&&s.jsx(Yp,{}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"What happens if middleware does NOT call next() or res.send()?",options:["The server crashes","The request hangs forever","Express skips to the route handler","The next middleware runs anyway"],correct:1,explain:"If middleware doesn't call next() and doesn't send a response, the client's request will hang indefinitely with no response."}),s.jsx(b,{question:"How do you make middleware run on every route?",options:["app.get(middleware)","app.use(middleware)","app.all(middleware)","app.route(middleware)"],correct:1,explain:"app.use(middleware) registers middleware globally — it runs on every incoming request, in the order it was defined."}),s.jsx(b,{question:"What are the three arguments of a middleware function?",options:["(req, res, done)","(req, res, next)","(request, response, continue)","(req, res, callback)"],correct:1,explain:"Express middleware takes (req, res, next). Call next() to pass control to the next middleware in the chain."})]})]})}function ef(){const[e,t]=N.useState("sync"),r=[{id:"sync",label:"⚡ Sync Errors"},{id:"async",label:"🔄 Async Errors"},{id:"patterns",label:"📐 Patterns"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"Error handling in Express is done via special middleware with four arguments: (err, req, res, next). This catches errors from any preceding middleware or route handler."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#f43f5e22":"transparent",border:`1px solid ${e===n.id?"#f43f5e":l.outline}`,color:e===n.id?"#f43f5e":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="sync"&&s.jsxs("div",{children:[s.jsx(g,{label:"basic error handling middleware",code:`app.get('/divide/:a/:b', (req, res, next) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);
  
  if (b === 0) {
    return next(new Error('Cannot divide by zero'));
  }
  
  res.json({ result: a / b });
});

// Error handler MUST have 4 parameters!
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});`}),s.jsxs(z,{icon:"⚠️",color:l.yellow,title:"The 4-parameter rule",children:["Express identifies error-handling middleware by checking if the function has exactly 4 parameters. If you write ",s.jsx("code",{children:"(err, req, res)"})," with only 3, Express treats it as regular middleware and errors will crash your app."]}),s.jsx(g,{label:"test it",code:`curl http://localhost:3000/divide/10/2   # { result: 5 }
curl http://localhost:3000/divide/10/0   # { error: "Cannot divide by zero" }`})]}),e==="async"&&s.jsxs("div",{children:[s.jsx(g,{label:"async errors must be passed to next()",code:`app.get('/user/:id', async (req, res, next) => {
  try {
    const user = await db.findUser(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    next(err); // pass to error handler
  }
});`}),s.jsx(M,{emoji:"🎯",title:"Async/await trap",color:l.red,children:"If an async route handler throws and you don't catch it, the error is lost and the request hangs. ALWAYS wrap async code in try/catch and call next(err), OR use an async wrapper utility."}),s.jsx(g,{label:"async wrapper utility (recommended)",code:`const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Now you can write clean async routes:
app.get('/user/:id', asyncHandler(async (req, res) => {
  const user = await db.findUser(req.params.id);
  res.json(user); // errors auto-caught!
}));`}),s.jsxs(z,{icon:"💡",color:l.yellow,title:"express-async-errors",children:["The npm package ",s.jsx("code",{children:"express-async-errors"})," patches Express to automatically catch async errors. Just require it at the top: ",s.jsx("code",{children:"require('express-async-errors')"}),". Then you never need try/catch or wrappers."]})]}),e==="patterns"&&s.jsxs("div",{children:[s.jsx(g,{label:"production error handler",code:`app.use((err, req, res, next) => {
  // Log the full error for debugging
  console.error(err.stack);
  
  // Don't leak stack traces in production
  const isDev = process.env.NODE_ENV === 'development';
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(isDev && { stack: err.stack }),
  });
});`}),s.jsx(g,{label:"custom error class",code:`class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Usage:
if (!user) throw new AppError('User not found', 404);

// Error handler checks:
if (err.isOperational) {
  res.status(err.statusCode).json({ error: err.message });
} else {
  res.status(500).json({ error: 'Something went wrong' });
}`})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"How many parameters does an error-handling middleware have?",options:["2","3","4","5"],correct:2,explain:"Express error-handling middleware MUST have exactly 4 parameters: (err, req, res, next). Express uses the arity (parameter count) to identify it."}),s.jsx(b,{question:"What happens if an async route handler throws without try/catch?",options:["Express catches it automatically","The error is lost and the request hangs","The server crashes immediately","The error handler middleware catches it"],correct:1,explain:"Without try/catch or an async wrapper, thrown errors in async handlers are lost promises. The request hangs and the client gets no response."}),s.jsx(b,{question:"What does the asyncHandler utility do?",options:["Makes sync functions async","Wraps the route so .catch(next) handles errors","Replaces express.json()","Creates a new Express app"],correct:1,explain:"asyncHandler catches any rejected promise from the async function and passes the error to next(err), which routes it to your error-handling middleware."})]})]})}function tf(){const[e,t]=N.useState("jwt"),r=[{id:"jwt",label:"🔑 JWT Basics"},{id:"middleware",label:"🛡️ Auth Middleware"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"Authentication verifies who a user is. In Express APIs, JSON Web Tokens (JWT) are the most common authentication mechanism."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#06b6d422":"transparent",border:`1px solid ${e===n.id?"#06b6d4":l.outline}`,color:e===n.id?"#06b6d4":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="jwt"&&s.jsxs("div",{children:[s.jsxs(L,{number:"1",title:"JWT = JSON Web Token",color:"#06b6d4",children:["A JWT is a signed string that contains user information. It has three parts separated by dots: ",s.jsx("strong",{children:"Header.Payload.Signature"}),". The server signs the token with a secret key. If someone tampers with the payload, the signature no longer matches and the token is rejected."]}),s.jsx(g,{label:"JWT login flow",code:`const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET; // keep this secret!

// 1. User logs in — server creates a token
app.post('/login', (req, res) => {
  // Verify username/password...
  const user = { id: 1, name: 'Alice' };
  const token = jwt.sign(user, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// 2. Client sends token in every request:
// Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

// 3. Server verifies token on protected routes`}),s.jsx(z,{icon:"🔒",color:l.yellow,title:"Never put secrets in JWT",children:"The JWT payload is Base64-encoded, not encrypted. Anyone can read it. Never put passwords, credit cards, or other secrets in the payload. Only put user ID and permissions."})]}),e==="middleware"&&s.jsxs("div",{children:[s.jsx(g,{label:"verify token middleware",code:`const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token.' });
  }
  
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = decoded; // attach user to request
    next();
  });
};

// Public route
app.get('/public', (req, res) => {
  res.json({ message: 'Anyone can see this' });
});

// Protected route
app.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Your profile', user: req.user });
});`}),s.jsx(g,{label:"test with curl",code:`# 1. Login to get token
curl -X POST http://localhost:3000/login
# → { "token": "eyJhbGc..." }

# 2. Use token to access protected route
curl -H "Authorization: Bearer eyJhbGc..."   http://localhost:3000/profile`}),s.jsxs(M,{emoji:"🎯",title:"req.user pattern",color:"#06b6d4",children:["Authentication middleware attaches ",s.jsx("code",{children:"req.user"})," so downstream route handlers know who is logged in. This pattern is used in virtually every Express authentication system."]})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"What does JWT stand for?",options:["JavaScript Web Token","JSON Web Token","Java Web Transfer","Joint Web Token"],correct:1,explain:"JWT = JSON Web Token. It's a signed JSON payload used to transmit user identity between client and server."}),s.jsx(b,{question:"Where should the client send the JWT on each request?",options:["In the request body","In the Authorization header","In the URL query string","In a cookie only"],correct:1,explain:"The standard is the Authorization header with the Bearer scheme: Authorization: Bearer <token>. This keeps tokens out of URLs (which get logged) and bodies (which are for data)."}),s.jsx(b,{question:"Why is it safe to put userId in a JWT payload?",options:["Because JWTs are encrypted","Because the payload is signed — tampering invalidates the signature","Because only the server can read it","Because userId is not sensitive"],correct:1,explain:"JWT payloads are Base64-encoded (readable by anyone) but cryptographically signed. If you change the payload, the signature verification fails."})]})]})}function rf(){const[e,t]=N.useState("crud"),r=[{id:"crud",label:"📝 CRUD"},{id:"design",label:"🏗️ Design"},{id:"example",label:"💻 Full Example"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"A well-designed REST API uses HTTP methods and status codes consistently. Express makes building these APIs straightforward."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#14b8a622":"transparent",border:`1px solid ${e===n.id?"#14b8a6":l.outline}`,color:e===n.id?"#14b8a6":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="crud"&&s.jsxs("div",{children:[s.jsx("div",{style:{overflowX:"auto",marginBottom:14},children:s.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontFamily:m,fontSize:11},children:[s.jsx("thead",{children:s.jsx("tr",{children:["Action","HTTP Method","Endpoint","Status"].map((n,o)=>s.jsx("th",{style:{padding:"9px 12px",background:l.surface,color:[l.muted,l.muted,l.muted,l.muted][o],textAlign:"left",borderBottom:`1px solid ${l.outline}`,fontSize:10},children:n},o))})}),s.jsx("tbody",{children:[["Create","POST","/api/users","201 Created"],["Read all","GET","/api/users","200 OK"],["Read one","GET","/api/users/:id","200 OK"],["Update","PUT","/api/users/:id","200 OK"],["Delete","DELETE","/api/users/:id","200 OK"]].map((n,o)=>s.jsx("tr",{style:{background:o%2===0?"transparent":l.surface+"06"},children:n.map((i,a)=>s.jsx("td",{style:{padding:"8px 12px",borderBottom:`1px solid ${l.outline}`,color:a===3?l.greenText:l.muted},children:i},a))},o))})]})}),s.jsxs(z,{icon:"🎯",color:l.yellow,title:"Use plural nouns",children:["REST endpoints should be nouns, not verbs. Use ",s.jsx("code",{children:"/users"})," not ",s.jsx("code",{children:"/getUsers"}),". The HTTP method tells you the action."]})]}),e==="design"&&s.jsxs("div",{children:[s.jsx(L,{number:"1",title:"Status codes communicate outcome",color:"#14b8a6",children:"200 = success, 201 = created, 204 = no content, 400 = bad request, 401 = unauthorized, 403 = forbidden, 404 = not found, 500 = server error. Always send the correct status code so clients can handle responses properly."}),s.jsx(g,{label:"proper status codes",code:`res.status(200).json(data);      // OK (default)
res.status(201).json(newItem);   // Created
res.status(204).send();          // No content (deleted)
res.status(400).json({ error }); // Bad request (validation)
res.status(404).json({ error }); // Not found
res.status(500).json({ error }); // Server error`}),s.jsxs(L,{number:"2",title:"Consistent response shape",color:"#3b82f6",children:["Clients should be able to predict the response structure. A common pattern: always return JSON with either a ",s.jsx("code",{children:"data"})," key or an ",s.jsx("code",{children:"error"})," key. Never mix shapes."]}),s.jsx(g,{label:"consistent response envelope",code:`// Success:
{ "data": { "id": 1, "name": "Alice" } }

// Error:
{ "error": "User not found", "code": "USER_NOT_FOUND" }

// Never do this — different shapes for success/error:
res.json(user);        // success → object
res.json({ error });   // error → object with error key`})]}),e==="example"&&s.jsxs("div",{children:[s.jsx(g,{label:"complete REST API",code:`const express = require('express');
const app = express();
app.use(express.json());

let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// GET all
app.get('/api/users', (req, res) => {
  res.json({ data: users });
});

// GET one
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ data: user });
});

// POST — create
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json({ data: newUser });
});

// PUT — update
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;
  res.json({ data: user });
});

// DELETE
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  const deleted = users.splice(index, 1);
  res.json({ data: deleted[0] });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(3000, () => console.log('API running'));`}),s.jsx(z,{icon:"💡",color:l.yellow,title:"In production",children:"Use a real database (PostgreSQL, MongoDB), validation library (Zod, Joi), and an ORM (Prisma, Mongoose). This in-memory example is for learning the REST pattern."})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"Which status code means 'Created successfully'?",options:["200","201","204","400"],correct:1,explain:"201 Created is the correct status code when a new resource is successfully created. 200 is generic OK, 204 is no content, 400 is bad request."}),s.jsx(b,{question:"What is wrong with the endpoint GET /getAllUsers?",options:["GET is the wrong method","The endpoint should use a noun, not a verb","It needs a status code","It should be POST"],correct:1,explain:"REST endpoints should be nouns (/users) not verbs (/getAllUsers). The HTTP method (GET) already indicates the action."}),s.jsx(b,{question:"What status code should you return if a resource is not found?",options:["200","400","404","500"],correct:2,explain:"404 Not Found is the standard status code when the requested resource does not exist. 400 is for bad requests, 500 is for server errors."})]})]})}function nf(){const e=[{title:"Express Basics",color:"#8b5cf6",icon:"🚂",kills:["Express is a minimal web framework built on Node's http module.","app.listen(PORT) starts the server. app.use() registers middleware.","req = request object, res = response object, next = pass to next middleware.","res.send() can send strings, objects, or buffers. res.json() always sends JSON.","res.status(code) sets the HTTP status. Must call before res.send() or res.json().","Express routes are matched in the order they are defined. First match wins."]},{title:"Routing",color:"#3b82f6",icon:"🛣️",kills:["app.get('/', handler) — match GET requests to the root path.","Route parameters: '/users/:id' → req.params.id (always a string).","Query strings: '?page=2' → req.query.page (always a string).","app.all('/path', handler) — matches ALL HTTP methods.","app.route('/path').get(...).post(...).put(...) — chain methods for same path.","Use express.Router() to modularize routes into separate files."]},{title:"Middleware",color:"#f59e0b",icon:"🧩",kills:["Middleware = function(req, res, next). Must call next() or end the response.","app.use(middleware) — global. app.get('/path', middleware, handler) — route-specific.","express.json() parses JSON bodies. express.urlencoded() parses form data.","Middleware runs in definition order. Order matters deeply.","Error middleware has 4 args: (err, req, res, next). Express checks arity = 4.","You can have multiple middleware per route: app.get('/', auth, validate, handler)."]},{title:"Error Handling",color:"#f43f5e",icon:"🛡️",kills:["Sync errors in route handlers are caught by Express automatically.","Async errors MUST be passed to next(err) or the request hangs.","Use an async wrapper: fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next).","The error handler should be the LAST middleware registered.","Never leak stack traces in production. Check NODE_ENV before sending stack.","Custom error classes (AppError) let you distinguish operational vs programming errors."]},{title:"Authentication",color:"#06b6d4",icon:"🔐",kills:["JWT = JSON Web Token. Signed, not encrypted. Don't put secrets in the payload.","Login: jwt.sign(payload, SECRET, { expiresIn: '1h' }).","Verify: jwt.verify(token, SECRET, callback) or use a try/catch wrapper.","Standard header: Authorization: Bearer <token>.","Auth middleware attaches req.user so routes know who is logged in.","Always return 401 for missing/invalid tokens, 403 for valid token but insufficient permissions."]},{title:"REST API Design",color:"#14b8a6",icon:"🌐",kills:["Use plural nouns for resources: /users, /posts, /orders.","HTTP methods define actions: GET=read, POST=create, PUT=replace, PATCH=modify, DELETE=remove.","Return proper status codes: 200, 201, 204, 400, 401, 403, 404, 500.","Use consistent response envelopes: { data: ... } for success, { error: ... } for failure.","Validate input before processing. Return 400 for validation errors.","Paginate list endpoints: GET /users?page=2&limit=20."]}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"The precise facts that matter most — for building APIs, for debugging, for interviews."}),s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:e.map(t=>s.jsxs("div",{style:{border:`1px solid ${t.color}33`,borderRadius:10,overflow:"hidden"},children:[s.jsxs("div",{style:{padding:"10px 14px",background:t.color+"0d",borderBottom:`1px solid ${t.color}22`,display:"flex",alignItems:"center",gap:8},children:[s.jsx("span",{style:{fontSize:16},children:t.icon}),s.jsx("span",{style:{fontSize:13,fontWeight:900,color:t.color,fontFamily:m},children:t.title})]}),s.jsx("div",{style:{padding:"10px 14px",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:6},children:t.kills.map((r,n)=>s.jsxs("div",{style:{display:"flex",gap:8},children:[s.jsx("span",{style:{color:t.color,fontSize:10,marginTop:3,flexShrink:0},children:"▸"}),s.jsx("span",{style:{fontSize:11,color:l.muted,lineHeight:1.65,fontFamily:D},children:r})]},n))})]},t.title))})]})}function sf(){const[e,t]=N.useState(null),r=[{q:"What is Express.js and why is it popular?",level:"Junior",color:l.green,a:`Express.js is a minimal, unopinionated web framework for Node.js. It provides a thin layer of fundamental web application features on top of Node's built-in http module.

Why it's popular:
1. Minimal overhead — one of the fastest frameworks available
2. Middleware ecosystem — thousands of reusable middleware packages
3. Unopinionated — you choose your database, ORM, and architecture
4. Industry standard — virtually every Node.js job expects Express knowledge
5. Foundation for larger frameworks like NestJS and Sails

Key distinction: Express is not a full-stack framework. It only handles HTTP routing and middleware. You bring everything else.`,code:`// Express vs raw Node http:

// Raw Node (20+ lines for basic routing)
http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.end('Hello');
  }
});

// Express (3 lines)
app.get('/', (req, res) => res.send('Hello'));`},{q:"Explain the middleware pattern in Express.",level:"Junior",color:l.green,a:`Middleware functions are functions that have access to the request object, response object, and the next middleware function.

They can:
1. Execute any code
2. Modify the request and response objects
3. End the request-response cycle
4. Call the next middleware with next()

The execution order is determined by the order middleware is registered with app.use(). Each middleware either calls next() to pass control, or sends a response to terminate.

Error-handling middleware is special: it has 4 parameters (err, req, res, next) and Express routes errors to it automatically.`,code:`function logger(req, res, next) {
  console.log(req.method, req.path);
  next(); // pass to next middleware
}

function auth(req, res, next) {
  if (!req.headers.token) {
    return res.status(401).send('Unauthorized');
  }
  req.user = decodeToken(req.headers.token);
  next();
}

app.use(logger);  // global
app.use(auth);    // global
app.get('/data', (req, res) => {
  res.json({ user: req.user }); // req.user set by auth
});`},{q:"How do you handle errors in asynchronous Express route handlers?",level:"Mid",color:"#3b82f6",a:`Express does NOT automatically catch errors from async functions. If an async route handler throws and you don't catch it, the error is lost and the request hangs.

Three solutions:

1. try/catch + next(err):
   Wrap async code in try/catch and pass errors to next().

2. async wrapper utility:
   A higher-order function that catches promise rejections and calls next(err).

3. express-async-errors:
   A patch that makes Express catch async errors automatically. Just require it once.`,code:`// Solution 1: try/catch
app.get('/user/:id', async (req, res, next) => {
  try {
    const user = await db.findUser(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Solution 2: async wrapper (recommended)
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
app.get('/user/:id', asyncHandler(async (req, res) => {
  const user = await db.findUser(req.params.id);
  res.json(user);
}));

// Solution 3: express-async-errors
require('express-async-errors');
// Now all async errors are caught automatically`},{q:"What is the difference between app.use() and app.get()?",level:"Junior",color:l.green,a:`app.use(middleware) registers middleware that runs on EVERY HTTP method and path that matches (or all paths if no path is given). It's for global middleware like body parsers, loggers, and CORS.

app.get(path, handler) registers a route handler specifically for GET requests to the exact path. It's for defining API endpoints.

Key differences:
- app.use() matches the BEGINNING of the path. app.use('/api', handler) matches /api, /api/users, /api/anything.
- app.get() matches the EXACT path (unless using parameters like /users/:id).
- app.use() is for middleware. app.get/post/put/delete() are for route handlers.

You can combine them: app.get('/protected', authMiddleware, routeHandler).`,code:`app.use(express.json());       // runs on all routes, all methods
app.use('/api', apiRouter);    // runs on /api/*

app.get('/users', handler);    // only GET /users
app.post('/users', handler);   // only POST /users

// Combined:
app.get('/admin', checkAuth, checkAdmin, getAdminData);`},{q:"How does JWT authentication work in an Express API?",level:"Mid",color:"#3b82f6",a:`JWT (JSON Web Token) authentication in Express follows a three-step flow:

1. Login: The client sends credentials. The server verifies them and creates a JWT using jwt.sign(payload, SECRET, options). The token contains the user ID and is cryptographically signed.

2. Storage: The client stores the token (usually in memory or localStorage for SPAs, or httpOnly cookies for better security).

3. Verification: On every protected request, the client sends the token in the Authorization: Bearer <token> header. The server verifies the signature with jwt.verify() and attaches the decoded user to req.user.

Security notes: JWT payloads are Base64-encoded (readable by anyone), so never put secrets inside. Always use HTTPS in production to prevent token interception.`,code:`// Login — create token
app.post('/login', async (req, res) => {
  const user = await verifyCredentials(req.body);
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token });
});

// Middleware — verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

// Protected route
app.get('/profile', verifyToken, (req, res) => {
  res.json({ user: req.user });
});`},{q:"What makes a REST API 'RESTful'? Give Express examples.",level:"Mid",color:"#3b82f6",a:`A RESTful API follows these principles:

1. Resources identified by URIs: /users, /posts/42
2. HTTP methods define operations: GET=read, POST=create, PUT=replace, PATCH=modify, DELETE=remove
3. Stateless: each request contains all info needed. No server-side session.
4. Consistent status codes: 200 OK, 201 Created, 400 Bad Request, 404 Not Found
5. Representation: resources are returned as JSON (or XML)

In Express, this means using app.get('/users'), app.post('/users'), app.put('/users/:id'), etc., with proper status codes and JSON responses.`,code:`// RESTful Express API
app.get('/api/users', getAllUsers);          // Read all
app.get('/api/users/:id', getUser);          // Read one
app.post('/api/users', createUser);          // Create
app.put('/api/users/:id', updateUser);       // Full update
app.patch('/api/users/:id', patchUser);      // Partial update
app.delete('/api/users/:id', deleteUser);    // Delete

// Status codes
res.status(200).json({ data: users });       // OK
res.status(201).json({ data: newUser });     // Created
res.status(400).json({ error: 'Invalid' });  // Bad request
res.status(404).json({ error: 'Not found' }); // Not found`}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"These questions cover Express fundamentals, middleware internals, authentication, and API design. Know these for any backend interview."}),s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:7},children:r.map((n,o)=>s.jsxs("div",{style:{border:`1px solid ${e===o?n.color+"55":l.outline}`,borderRadius:9,overflow:"hidden",transition:"border-color 0.2s"},children:[s.jsxs("button",{onClick:()=>t(e===o?null:o),style:{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"11px 14px",background:e===o?n.color+"0d":"transparent",border:"none",cursor:"pointer",textAlign:"left"},children:[s.jsx("span",{style:{fontSize:9,padding:"2px 6px",background:n.color+"22",border:`1px solid ${n.color}44`,borderRadius:3,color:n.color,fontFamily:m,fontWeight:700,flexShrink:0},children:n.level}),s.jsx("span",{style:{fontSize:12,color:e===o?n.color:l.text,fontFamily:D,flex:1,lineHeight:1.4},children:n.q}),s.jsx("span",{style:{color:n.color,fontSize:13,flexShrink:0},children:e===o?"▲":"▼"})]}),e===o&&s.jsxs("div",{style:{padding:"0 14px 14px",borderTop:`1px solid ${n.color}22`},children:[s.jsx("pre",{style:{margin:"10px 0 0",fontSize:12,color:l.muted,fontFamily:D,lineHeight:1.9,whiteSpace:"pre-wrap",wordBreak:"break-word"},children:n.a}),s.jsx(g,{label:"code",code:n.code})]})]},o))})]})}const of=[{id:"what-express",icon:"🚂",title:"What is Express?",color:"#8b5cf6",render:()=>s.jsx(Kp,{})},{id:"routing",icon:"🛣️",title:"Routing",color:"#3b82f6",render:()=>s.jsx(Xp,{})},{id:"middleware",icon:"🧩",title:"Middleware",color:"#f59e0b",render:()=>s.jsx(Zp,{})},{id:"errors",icon:"🛡️",title:"Error Handling",color:"#f43f5e",render:()=>s.jsx(ef,{})},{id:"auth",icon:"🔐",title:"Authentication",color:"#06b6d4",render:()=>s.jsx(tf,{})},{id:"rest",icon:"🌐",title:"REST API Design",color:"#14b8a6",render:()=>s.jsx(rf,{})},{id:"killnotes",icon:"⚡",title:"Kill Notes",color:"#f59e0b",render:()=>s.jsx(nf,{})},{id:"interview",icon:"🎤",title:"Interview Q&A",color:"#ec4899",render:()=>s.jsx(sf,{})}],af=[{id:"what-db",icon:"🗄️",title:"What are Databases?",color:"#3b82f6",render:()=>s.jsx(cf,{})},{id:"mongodb",icon:"🍃",title:"MongoDB & Mongoose",color:"#14b8a6",render:()=>s.jsx(df,{})},{id:"postgres",icon:"🐘",title:"PostgreSQL",color:"#3b82f6",render:()=>s.jsx(uf,{})},{id:"prisma",icon:"🔷",title:"Prisma ORM",color:"#8b5cf6",render:()=>s.jsx(pf,{})},{id:"redis",icon:"🔴",title:"Redis",color:"#f43f5e",render:()=>s.jsx(ff,{})},{id:"pooling",icon:"🏊",title:"Connection Pooling",color:"#06b6d4",render:()=>s.jsx(hf,{})},{id:"killnotes",icon:"⚡",title:"Kill Notes",color:"#f59e0b",render:()=>s.jsx(mf,{})},{id:"interview",icon:"🎤",title:"Interview Q&A",color:"#ec4899",render:()=>s.jsx(yf,{})}];function lf(){const[e,t]=N.useState(5),[r,n]=N.useState([]),[o,i]=N.useState(!1),a=async()=>{i(!0),n([]);const c=12,d=400,u=new Set,v=[];for(let x=0;x<c;x++){await new Promise(w=>setTimeout(w,d));const y=x+1;u.size<e?(u.add(y),n(w=>[...w,{id:y,status:"active",conn:Array.from(u).indexOf(y)+1}]),setTimeout(()=>{if(n(w=>w.map(k=>k.id===y?{...k,status:"done"}:k)),u.delete(y),v.length>0){const w=v.shift();u.add(w),n(k=>k.map(T=>T.id===w?{...T,status:"active",conn:Array.from(u).indexOf(w)+1}:T)),setTimeout(()=>{n(k=>k.map(T=>T.id===w?{...T,status:"done"}:T)),u.delete(w)},600)}},600)):(v.push(y),n(w=>[...w,{id:y,status:"waiting"}]),setTimeout(()=>{n(w=>w.map(k=>k.id===y?{...k,status:"active",conn:Array.from(u).indexOf(y)+1}:k)),setTimeout(()=>{n(w=>w.map(k=>k.id===y?{...k,status:"done"}:k)),u.delete(y)},600)},v.length*600))}await new Promise(x=>setTimeout(x,3e3)),i(!1)};return s.jsxs("div",{style:{padding:14,background:l.surfaceLowest,border:`1px solid ${l.outline}`,borderRadius:10},children:[s.jsx("div",{style:{fontSize:10,color:l.muted,fontFamily:m,letterSpacing:1,marginBottom:10},children:"🧪 LIVE — connection pool simulator"}),s.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center",marginBottom:12,flexWrap:"wrap"},children:[s.jsx("span",{style:{fontSize:11,color:l.muted,fontFamily:m},children:"Pool size:"}),[3,5,10].map(c=>s.jsx("button",{onClick:()=>{t(c),n([])},disabled:o,style:{padding:"3px 10px",background:e===c?l.greenBg:"transparent",border:`1px solid ${e===c?l.green:l.outline}`,color:e===c?l.greenText:l.muted,borderRadius:4,cursor:"pointer",fontSize:11,fontFamily:m},children:c},c)),s.jsx("button",{onClick:a,disabled:o,style:{padding:"4px 14px",background:o?l.muted+"18":l.greenBg,border:`1px solid ${o?l.outline:l.green}`,color:o?l.muted:l.greenText,borderRadius:4,cursor:o?"default":"pointer",fontSize:11,fontFamily:m},children:o?"● running...":"▶ Simulate 12 requests"})]}),s.jsxs("div",{style:{display:"flex",gap:4,flexWrap:"wrap",minHeight:60,marginBottom:10},children:[r.map((c,d)=>s.jsx("div",{style:{width:50,height:50,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontFamily:m,fontWeight:700,border:`1px solid ${c.status==="active"?l.green:c.status==="waiting"?l.yellow:l.outline}`,background:c.status==="active"?l.greenBg:c.status==="waiting"?l.yellow+"18":l.muted+"08",color:c.status==="active"?l.greenText:c.status==="waiting"?l.yellow:l.muted},children:c.status==="active"?`C${c.conn}`:c.status==="waiting"?"⏳":"✓"},d)),r.length===0&&s.jsx("span",{style:{fontSize:11,color:l.muted,fontFamily:m},children:"press Simulate to watch pool behavior"})]}),s.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap"},children:[s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5},children:[s.jsx("div",{style:{width:12,height:12,background:l.greenBg,border:`1px solid ${l.green}`,borderRadius:3}}),s.jsx("span",{style:{fontSize:10,color:l.muted,fontFamily:m},children:"Active connection"})]}),s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5},children:[s.jsx("div",{style:{width:12,height:12,background:l.yellow+"18",border:`1px solid ${l.yellow}`,borderRadius:3}}),s.jsx("span",{style:{fontSize:10,color:l.muted,fontFamily:m},children:"Waiting in queue"})]}),s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5},children:[s.jsx("div",{style:{width:12,height:12,background:l.muted+"08",border:`1px solid ${l.outline}`,borderRadius:3}}),s.jsx("span",{style:{fontSize:10,color:l.muted,fontFamily:m},children:"Done"})]})]})]})}function cf(){const[e,t]=N.useState("story"),r=[{id:"story",label:"📖 The Story"},{id:"sql-nosql",label:"🔀 SQL vs NoSQL"},{id:"acid",label:"🔒 ACID"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"Every real application needs a database. Without one, your data vanishes when the server restarts. Understanding databases is what separates toy projects from production software."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#3b82f622":"transparent",border:`1px solid ${e===n.id?"#3b82f6":l.outline}`,color:e===n.id?"#3b82f6":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="story"&&s.jsxs("div",{children:[s.jsx(L,{number:"1",title:"Memory is temporary",color:l.red,children:"When your Node.js server restarts, everything in RAM is wiped. Variables, arrays, objects — all gone. A database is persistent storage: data survives restarts, crashes, and deployments."}),s.jsx(L,{number:"2",title:"Files don't scale",color:"#f59e0b",children:"You could store data in JSON files. But what happens when two users write at the same time? What happens when the file is 10GB? Files lack concurrency control, indexing, and query languages. Databases solve all of this."}),s.jsx(L,{number:"3",title:"The database is the source of truth",color:"#3b82f6",children:"In any application, the database is the single source of truth. Your API reads from it, your background jobs write to it, your analytics query it. Everything else — caches, frontend state, message queues — are derived from the database."}),s.jsxs(M,{emoji:"🎯",title:"One sentence",color:"#3b82f6",children:[s.jsx("strong",{children:"A database is organized, persistent storage"})," with built-in tools for querying, concurrency, and reliability. An ORM (Object-Relational Mapper) or ODM (Object-Document Mapper) lets you interact with the database using code objects instead of raw SQL or queries."]})]}),e==="sql-nosql"&&s.jsxs("div",{children:[s.jsx("div",{style:{overflowX:"auto",marginBottom:14},children:s.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontFamily:m,fontSize:11},children:[s.jsx("thead",{children:s.jsx("tr",{children:["Feature","SQL (PostgreSQL)","NoSQL (MongoDB)"].map((n,o)=>s.jsx("th",{style:{padding:"9px 12px",background:l.surface,color:[l.muted,"#3b82f6","#14b8a6"][o],textAlign:"left",borderBottom:`1px solid ${l.outline}`,fontSize:10},children:n},o))})}),s.jsx("tbody",{children:[["Structure","Tables, rows, columns","Collections, documents, fields"],["Schema","Rigid — defined upfront","Flexible — dynamic"],["Relationships","Foreign keys, JOINs","Embedded docs, references"],["Scaling","Vertical (bigger machine)","Horizontal (more machines)"],["Best for","Complex queries, transactions","Rapid dev, unstructured data"],["Examples","PostgreSQL, MySQL, SQLite","MongoDB, Redis, DynamoDB"]].map((n,o)=>s.jsx("tr",{style:{background:o%2===0?"transparent":l.surface+"06"},children:n.map((i,a)=>s.jsx("td",{style:{padding:"8px 12px",borderBottom:`1px solid ${l.outline}`,color:a===0?l.text:l.muted},children:i},a))},o))})]})}),s.jsxs(z,{icon:"🎯",color:l.yellow,title:"When to choose what",children:["Use ",s.jsx("strong",{children:"SQL"})," when data is structured, relationships are complex, and you need strong consistency (banks, e-commerce). Use ",s.jsx("strong",{children:"NoSQL"})," when schemas evolve rapidly, you need horizontal scaling, or data is document-like (CMS, IoT, real-time analytics)."]})]}),e==="acid"&&s.jsxs("div",{children:[s.jsx(L,{number:"1",title:"ACID = reliability",color:"#f43f5e",children:"ACID is a set of properties that guarantee reliable processing of database transactions. Without ACID, a payment could debit one account without crediting another — money vanishes into thin air."}),[{letter:"A",word:"Atomicity",color:"#f43f5e",desc:"A transaction is all-or-nothing. If any part fails, the entire transaction rolls back. Transfer $100: debit AND credit both happen, or neither happens."},{letter:"C",word:"Consistency",color:"#f59e0b",desc:"A transaction brings the database from one valid state to another. Constraints, triggers, and cascades are enforced. You cannot create an order for a non-existent customer."},{letter:"I",word:"Isolation",color:"#3b82f6",desc:"Concurrent transactions don't interfere with each other. If Alice and Bob both read a bank balance of $1000 and try to withdraw $600, isolation prevents both from succeeding."},{letter:"D",word:"Durability",color:l.green,desc:"Once a transaction commits, it survives forever — even if the server crashes immediately after. Data is written to disk (and often replicated)."}].map((n,o)=>s.jsxs("div",{style:{display:"flex",gap:12,marginBottom:8,alignItems:"flex-start"},children:[s.jsx("div",{style:{width:32,height:32,borderRadius:"50%",background:n.color+"22",border:`1px solid ${n.color}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900,color:n.color,fontFamily:m,flexShrink:0},children:n.letter}),s.jsxs("div",{style:{flex:1,padding:"7px 11px",background:n.color+"08",border:`1px solid ${n.color}22`,borderRadius:7},children:[s.jsx("div",{style:{fontSize:12,fontWeight:700,color:n.color,fontFamily:m,marginBottom:3},children:n.word}),s.jsx("div",{style:{fontSize:12,color:l.muted,fontFamily:D,lineHeight:1.7},children:n.desc})]})]},o))]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"What happens to in-memory data when a Node.js server restarts?",options:["It is saved to disk automatically","It is wiped — everything in RAM is lost","It persists in the V8 engine","It moves to the event loop"],correct:1,explain:"RAM is volatile. When the process restarts, all variables, arrays, and objects are destroyed. Only persistent storage (databases, files) survives."}),s.jsx(b,{question:"Which database type uses tables with rows and columns?",options:["NoSQL","Document DB","SQL","Key-value store"],correct:2,explain:"SQL databases (PostgreSQL, MySQL) use tables with predefined schemas, rows, and columns. NoSQL databases use documents, key-value pairs, or graphs."}),s.jsx(b,{question:"What does the 'A' in ACID stand for?",options:["Availability","Atomicity","Aggregation","Asynchronous"],correct:1,explain:"Atomicity means a transaction is all-or-nothing. Either every operation in the transaction succeeds, or the entire transaction is rolled back."})]})]})}function df(){const[e,t]=N.useState("documents"),r=[{id:"documents",label:"📄 Documents"},{id:"mongoose",label:"🦁 Mongoose"},{id:"crud",label:"📝 CRUD"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"MongoDB is the most popular NoSQL database. It stores data as flexible JSON-like documents instead of rigid tables."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#14b8a622":"transparent",border:`1px solid ${e===n.id?"#14b8a6":l.outline}`,color:e===n.id?"#14b8a6":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="documents"&&s.jsxs("div",{children:[s.jsx(g,{label:"a MongoDB document",code:`{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "Alice",
  email: "alice@example.com",
  age: 30,
  tags: ["developer", "blogger"],
  address: {
    city: "San Francisco",
    zip: "94102"
  },
  orders: [
    { product: "Laptop", price: 999, qty: 1 },
    { product: "Mouse", price: 29, qty: 2 }
  ],
  createdAt: ISODate("2024-01-15T10:30:00Z")
}`}),s.jsx(L,{number:"1",title:"Documents are self-contained",color:"#14b8a6",children:"Unlike SQL where you need JOINs to fetch related data, MongoDB documents can embed related data directly. An order document can contain the customer info, shipping address, and line items — all in one place. One read, one document."}),s.jsx(z,{icon:"🎯",color:l.yellow,title:"Embed vs Reference",children:"Embed when data is read together (user + profile). Reference when data is shared across documents (user + company). Embedding is faster to read but harder to update consistently."})]}),e==="mongoose"&&s.jsxs("div",{children:[s.jsx(g,{label:"Mongoose schema & model",code:`const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  age:      { type: Number, min: 0, max: 150 },
  role:     { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt:{ type: Date, default: Date.now }
});

// Create model
const User = mongoose.model('User', userSchema);

// Connect
await mongoose.connect('mongodb://localhost:27017/myapp');`}),s.jsx(M,{emoji:"🦁",title:"Why Mongoose?",color:"#14b8a6",children:"Mongoose adds structure to MongoDB's flexibility. It gives you schemas, validation, middleware (pre/post hooks), and query building. Without Mongoose, MongoDB accepts any JSON — typos in field names silently create new fields."}),s.jsx(g,{label:"schema types",code:`String, Number, Date, Buffer, Boolean,
Mixed, ObjectId, Array, Map, Decimal128

// Advanced options
{ type: String, required: true, trim: true, lowercase: true }
{ type: Number, default: 0, min: 0 }
{ type: Date, default: Date.now, immutable: true }`})]}),e==="crud"&&s.jsxs("div",{children:[s.jsx(g,{label:"Mongoose CRUD",code:`// CREATE
const user = await User.create({ name: 'Alice', email: 'alice@example.com' });

// READ ONE
const found = await User.findOne({ email: 'alice@example.com' });

// READ MANY with filter, sort, limit
const users = await User
  .find({ age: { $gte: 18 } })
  .sort({ createdAt: -1 })
  .limit(10)
  .select('name email');

// UPDATE
await User.updateOne({ _id: user._id }, { age: 31 });
await User.findByIdAndUpdate(id, { age: 31 }, { new: true });

// DELETE
await User.deleteOne({ _id: user._id });
await User.findByIdAndDelete(id);`}),s.jsx(z,{icon:"💡",color:l.yellow,title:"Query operators",children:"$eq, $ne, $gt, $gte, $lt, $lte, $in, $nin, $regex, $exists, $or, $and, $not. Use them to build powerful queries without writing raw JavaScript filters."})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"What data format does MongoDB store?",options:["CSV","XML","JSON-like documents","Binary files"],correct:2,explain:"MongoDB stores data as BSON (Binary JSON) documents — flexible, nested objects that map directly to JavaScript objects."}),s.jsx(b,{question:"What does Mongoose add to MongoDB?",options:["A SQL interface","Schemas, validation, and middleware","A GUI admin panel","Automatic backups"],correct:1,explain:"Mongoose is an ODM that adds schemas, validation, type casting, query building, and middleware hooks to MongoDB."}),s.jsx(b,{question:"When should you EMBED data vs REFERENCE it?",options:["Always embed","Always reference","Embed when read together, reference when shared","It does not matter"],correct:2,explain:"Embed related data that is always read together (faster reads). Reference data that is shared across many documents (avoids duplication and inconsistency)."})]})]})}function uf(){const[e,t]=N.useState("basics"),r=[{id:"basics",label:"📐 Basics"},{id:"joins",label:"🔗 JOINs"},{id:"node",label:"🟢 Node.js"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"PostgreSQL is the gold standard of open-source relational databases. It is ACID-compliant, feature-rich, and handles complex queries better than any other database."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#3b82f622":"transparent",border:`1px solid ${e===n.id?"#3b82f6":l.outline}`,color:e===n.id?"#3b82f6":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="basics"&&s.jsxs("div",{children:[s.jsx(g,{label:"SQL fundamentals",code:`-- Create table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  age INTEGER CHECK (age >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert
INSERT INTO users (name, email, age) VALUES ('Alice', 'alice@example.com', 30);

-- Query
SELECT name, email FROM users WHERE age > 18 ORDER BY created_at DESC LIMIT 10;

-- Update
UPDATE users SET age = 31 WHERE id = 1;

-- Delete
DELETE FROM users WHERE id = 1;

-- Aggregation
SELECT COUNT(*) as total, AVG(age) as avg_age FROM users;`}),s.jsx(z,{icon:"🔑",color:l.yellow,title:"Primary keys",children:"SERIAL auto-increments. But for distributed systems, use UUID ( Universally Unique Identifier ) to avoid collision when merging databases."})]}),e==="joins"&&s.jsxs("div",{children:[s.jsx(g,{label:"JOIN types",code:`-- INNER JOIN: only matching rows
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;

-- LEFT JOIN: all users, even without orders
SELECT users.name, orders.total
FROM users
LEFT JOIN orders ON users.id = orders.user_id;

-- Multiple joins
SELECT u.name, o.total, p.title
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN products p ON o.product_id = p.id
WHERE o.total > 100;`}),s.jsxs(M,{emoji:"🔗",title:"JOIN visualization",color:"#3b82f6",children:[s.jsx("strong",{children:"INNER JOIN"})," = intersection (only matches). ",s.jsx("strong",{children:"LEFT JOIN"})," = all from left table + matches from right (NULL if no match). ",s.jsx("strong",{children:"RIGHT JOIN"})," = opposite of LEFT. ",s.jsx("strong",{children:"FULL OUTER JOIN"})," = union of both (all rows from both tables)."]})]}),e==="node"&&s.jsxs("div",{children:[s.jsx(g,{label:"pg driver with Pool",code:`const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost', user: 'postgres',
  password: 'secret', database: 'myapp', port: 5432
});

// Parameterized query — prevents SQL injection!
const result = await pool.query(
  'SELECT * FROM users WHERE email = $1 AND age > $2',
  ['alice@example.com', 18]
);
console.log(result.rows);

// Transaction
const client = await pool.connect();
try {
  await client.query('BEGIN');
  await client.query('UPDATE accounts SET balance = balance - 100 WHERE id = 1');
  await client.query('UPDATE accounts SET balance = balance + 100 WHERE id = 2');
  await client.query('COMMIT');
} catch (err) {
  await client.query('ROLLBACK');
  throw err;
} finally {
  client.release();
}`}),s.jsxs(z,{icon:"⚠️",color:l.red,title:"NEVER concatenate SQL",children:["`SELECT * FROM users WHERE email = '$",email,"'` is vulnerable to SQL injection. Always use parameterized queries with `$1, $2` placeholders."]})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"What does SQL stand for?",options:["Structured Query Language","Simple Query Language","System Query Logic","Schema Query Language"],correct:0,explain:"SQL = Structured Query Language. It is the standard language for interacting with relational databases."}),s.jsx(b,{question:"Which JOIN returns only rows that exist in BOTH tables?",options:["LEFT JOIN","RIGHT JOIN","INNER JOIN","FULL JOIN"],correct:2,explain:"INNER JOIN returns only rows where the join condition matches in both tables. LEFT JOIN returns all rows from the left table regardless of matches."}),s.jsx(b,{question:"Why use parameterized queries ($1, $2)?",options:["They are faster","They prevent SQL injection","They look cleaner","They support more data types"],correct:1,explain:"Parameterized queries separate code from data. The database treats parameters as data, not executable code, preventing attackers from injecting malicious SQL."})]})]})}function pf(){const[e,t]=N.useState("schema"),r=[{id:"schema",label:"📝 Schema"},{id:"queries",label:"🔍 Queries"},{id:"migrate",label:"🔄 Migrations"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"Prisma is a modern ORM for Node.js and TypeScript. Unlike traditional ORMs, Prisma uses a declarative schema file and generates a type-safe client."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#8b5cf622":"transparent",border:`1px solid ${e===n.id?"#8b5cf6":l.outline}`,color:e===n.id?"#8b5cf6":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="schema"&&s.jsxs("div",{children:[s.jsx(g,{label:"schema.prisma",code:`generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  posts     Post[]
  profile   Profile?
  createdAt DateTime @default(now()) @map("created_at")

  @@map("users")
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  content  String
  published Boolean @default(false)
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int    @map("author_id")
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String?
  user   User   @relation(fields: [userId], references: [id])
  userId Int    @unique
}`}),s.jsx(z,{icon:"🎯",color:l.yellow,title:"Prisma advantages",children:"Type-safe queries, auto-generated migrations, excellent VS Code extension, raw SQL fallback when needed, and support for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB."})]}),e==="queries"&&s.jsxs("div",{children:[s.jsx(g,{label:"Prisma Client queries",code:`const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create with relation
const user = await prisma.user.create({
  data: {
    email: 'alice@example.com',
    name: 'Alice',
    profile: { create: { bio: 'Full-stack dev' } },
    posts: {
      create: [
        { title: 'Hello World', content: 'First post' },
        { title: 'Why Prisma', content: 'Type safety rocks' }
      ]
    }
  }
});

// Read with nested include
const users = await prisma.user.findMany({
  where: { email: { endsWith: '@example.com' } },
  include: {
    posts: { where: { published: true } },
    profile: true
  },
  orderBy: { createdAt: 'desc' },
  take: 10
});

// Update
await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Alice Updated' }
});

// Transaction
await prisma.$transaction([
  prisma.post.create({ data: { title: 'A', authorId: 1 } }),
  prisma.post.create({ data: { title: 'B', authorId: 1 } })
]);`}),s.jsx(M,{emoji:"✨",title:"Type safety",color:"#8b5cf6",children:"Prisma generates TypeScript types from your schema. If you rename a field, your code breaks at compile time — not at runtime. No more typos in query field names."})]}),e==="migrate"&&s.jsxs("div",{children:[s.jsx(g,{label:"Prisma workflow",code:`# 1. Update schema.prisma
# 2. Generate migration
npx prisma migrate dev --name add_user_role

# 3. Generate client (updates types)
npx prisma generate

# 4. Deploy to production
npx prisma migrate deploy

# 5. Studio — visual database admin
npx prisma studio`}),s.jsx(z,{icon:"💡",color:l.yellow,title:"Migrations are version control for your database",children:"Every migration is a SQL file that can be reviewed, tested, and rolled back. Never modify production databases manually — always use migrations."})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"What file does Prisma use to define your data model?",options:["database.json","schema.prisma","models.js","prisma.config"],correct:1,explain:"Prisma uses schema.prisma — a declarative file where you define models, fields, relations, and database connection settings."}),s.jsx(b,{question:"What does prisma.$transaction() do?",options:["Connects to multiple databases","Runs multiple operations atomically","Caches query results","Creates a backup"],correct:1,explain:"$transaction runs multiple Prisma operations in a single database transaction. Either all succeed, or all are rolled back."}),s.jsx(b,{question:"Why is Prisma considered 'type-safe'?",options:["It uses TypeScript for the schema file","It generates types from the schema, catching errors at compile time","It validates data at runtime","It only works with TypeScript"],correct:1,explain:"Prisma generates TypeScript types from schema.prisma. If you mistype a field name or pass wrong types, TypeScript catches it before you even run the code."})]})]})}function ff(){const[e,t]=N.useState("usecases"),r=[{id:"usecases",label:"🎯 Use Cases"},{id:"commands",label:"⌨️ Commands"},{id:"caching",label:"💾 Caching Pattern"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"Redis is an in-memory data structure store used as a database, cache, message broker, and streaming engine. It is incredibly fast because everything lives in RAM."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#f43f5e22":"transparent",border:`1px solid ${e===n.id?"#f43f5e":l.outline}`,color:e===n.id?"#f43f5e":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="usecases"&&s.jsx("div",{children:[{title:"Session storage",color:"#f43f5e",icon:"🔑",desc:"Store user login sessions in Redis with TTL (time-to-live). When a user logs out or the session expires, Redis automatically removes it."},{title:"API response caching",color:"#f59e0b",icon:"⚡",desc:"Cache expensive database query results. A complex report that takes 2 seconds to generate from PostgreSQL can be served from Redis in 2 milliseconds."},{title:"Rate limiting",color:"#3b82f6",icon:"🚦",desc:"Track request counts per IP address using Redis counters with expiry. Block IPs that exceed 100 requests per minute."},{title:"Real-time leaderboards",color:"#8b5cf6",icon:"🏆",desc:"Redis Sorted Sets (ZADD, ZRANGE) are perfect for leaderboards. Add scores in O(log n) and fetch top 10 in O(log n + m)."},{title:"Pub/Sub messaging",color:"#14b8a6",icon:"📡",desc:"Redis Pub/Sub enables real-time messaging between servers. Perfect for WebSocket broadcasts, notifications, and chat systems."}].map((n,o)=>s.jsxs("div",{style:{marginBottom:10,padding:"13px 16px",background:n.color+"08",border:`1px solid ${n.color}25`,borderRadius:9},children:[s.jsxs("div",{style:{fontSize:13,fontWeight:700,color:n.color,fontFamily:m,marginBottom:7},children:[n.icon," ",n.title]}),s.jsx("p",{style:{...P,marginBottom:0},children:n.desc})]},o))}),e==="commands"&&s.jsxs("div",{children:[s.jsx(g,{label:"essential Redis commands",code:`// Strings
SET user:1 '{"name":"Alice"}'
GET user:1
SETEX session:abc 3600 'logged_in'  // set with expiry (seconds)

// Hashes (objects)
HSET user:1 name Alice email alice@example.com
HGETALL user:1

// Lists (queues)
LPUSH queue:jobs 'send_email'
RPOP queue:jobs

// Sets (unique items)
SADD tags:post:1 'javascript' 'nodejs'
SMEMBERS tags:post:1

// Sorted Sets (leaderboards)
ZADD leaderboard 1500 'Alice'
ZADD leaderboard 2300 'Bob'
ZRANGE leaderboard 0 2 WITHSCORES  // top 3

// Pub/Sub
PUBLISH notifications 'New message!'
SUBSCRIBE notifications`}),s.jsx(z,{icon:"💡",color:l.yellow,title:"TTL is your friend",children:"Always set an expiry (EXPIRE, SETEX) on cache keys. Without TTL, your Redis memory fills up until it crashes. A good default: cache for 5-15 minutes."})]}),e==="caching"&&s.jsxs("div",{children:[s.jsx(g,{label:"cache-aside pattern",code:`const redis = require('redis');
const client = redis.createClient();
await client.connect();

async function getUser(id) {
  const cacheKey = \`user:\${id}\`;
  
  // 1. Check cache
  const cached = await client.get(cacheKey);
  if (cached) {
    console.log('Cache hit!');
    return JSON.parse(cached);
  }
  
  // 2. Cache miss — fetch from database
  console.log('Cache miss — querying DB');
  const user = await db.findUser(id);
  
  // 3. Store in cache with TTL
  await client.setEx(cacheKey, 300, JSON.stringify(user));
  
  return user;
}`}),s.jsx(M,{emoji:"🎯",title:"Cache invalidation",color:"#f43f5e",children:"There are only two hard things in Computer Science: cache invalidation and naming things. When a user updates their profile, you MUST delete or update the cache key — or stale data will be served."}),s.jsx(g,{label:"invalidate on update",code:"async function updateUser(id, data) {\n  await db.updateUser(id, data);\n  await client.del(`user:${id}`); // invalidate cache\n}"})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"Why is Redis so fast?",options:["It uses a faster programming language","All data lives in RAM (memory)","It compresses all data","It has fewer features"],correct:1,explain:"Redis stores everything in RAM (random access memory). RAM is ~100,000x faster than SSD disk access. That's why Redis can handle millions of operations per second."}),s.jsx(b,{question:"What happens if you don't set TTL on cache keys?",options:["Nothing — Redis handles it","Memory fills up until Redis crashes","Keys automatically expire in 1 hour","Data becomes corrupted"],correct:1,explain:"Without TTL (time-to-live), cache keys accumulate forever. Redis runs out of RAM and either crashes or starts evicting random keys. Always set expiries."}),s.jsx(b,{question:"Which Redis data structure is best for a leaderboard?",options:["List","Hash","Sorted Set","String"],correct:2,explain:"Sorted Sets (ZADD, ZRANGE) maintain elements in ranked order by score. They're perfect for leaderboards, priority queues, and time-series data."})]})]})}function hf(){const[e,t]=N.useState("concept"),r=[{id:"concept",label:"🧠 Concept"},{id:"config",label:"⚙️ Configuration"},{id:"demo",label:"🧪 Live Demo"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"Opening a database connection is expensive. It requires TCP handshake, authentication, and memory allocation. Connection pools reuse connections to eliminate this overhead."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#06b6d422":"transparent",border:`1px solid ${e===n.id?"#06b6d4":l.outline}`,color:e===n.id?"#06b6d4":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="concept"&&s.jsxs("div",{children:[s.jsx(L,{number:"1",title:"Creating connections is slow",color:"#f59e0b",children:"A database connection requires: TCP handshake (~20ms), TLS negotiation (~50ms), authentication query (~10ms), and memory allocation on the database server (~5ms). That's ~85ms before you run a single query. With a pool, you pay this cost once and reuse the connection."}),s.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap",marginBottom:14},children:[s.jsxs("div",{style:{flex:1,minWidth:160,padding:"12px 14px",background:l.red+"08",border:`1px solid ${l.red}22`,borderRadius:8},children:[s.jsx("div",{style:{fontSize:10,color:l.red,fontFamily:m,marginBottom:6},children:"❌ WITHOUT POOLING"}),s.jsxs("div",{style:{fontSize:11,color:l.muted,fontFamily:D,lineHeight:1.7},children:["Request 1: Open → Query → Close (85ms + 5ms)",s.jsx("br",{}),"Request 2: Open → Query → Close (85ms + 5ms)",s.jsx("br",{}),"Request 3: Open → Query → Close (85ms + 5ms)",s.jsx("br",{}),s.jsx("strong",{children:"Total: 270ms for 3 queries"}),s.jsx("br",{}),"Max concurrent: ~100 (DB connection limit)"]})]}),s.jsxs("div",{style:{flex:1,minWidth:160,padding:"12px 14px",background:l.greenBg,border:`1px solid ${l.green}22`,borderRadius:8},children:[s.jsx("div",{style:{fontSize:10,color:l.greenText,fontFamily:m,marginBottom:6},children:"✅ WITH POOLING"}),s.jsxs("div",{style:{fontSize:11,color:l.muted,fontFamily:D,lineHeight:1.7},children:["Startup: Open 10 connections (850ms once)",s.jsx("br",{}),"Request 1: Reuse → Query (5ms)",s.jsx("br",{}),"Request 2: Reuse → Query (5ms)",s.jsx("br",{}),"Request 3: Reuse → Query (5ms)",s.jsx("br",{}),s.jsx("strong",{children:"Total: 15ms for 3 queries"}),s.jsx("br",{}),"Max concurrent: thousands (queue + reuse)"]})]})]}),s.jsx(M,{emoji:"🎯",title:"The math",color:"#06b6d4",children:"A pool of 20 connections can serve thousands of requests per second. How? Most requests take milliseconds. One connection handles 50+ requests/second. 20 connections × 50 = 1,000 requests/second."})]}),e==="config"&&s.jsxs("div",{children:[s.jsx(g,{label:"PostgreSQL pool (pg)",code:`const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'myapp',
  user: 'postgres',
  password: 'secret',
  port: 5432,
  
  // Pool settings
  max: 20,                    // maximum connections in pool
  idleTimeoutMillis: 30000,   // close idle connections after 30s
  connectionTimeoutMillis: 2000, // fail if no connection available in 2s
});

// Query — pool auto-manages connections
const result = await pool.query('SELECT * FROM users');

// For transactions, explicitly acquire and release
const client = await pool.connect();
try {
  await client.query('BEGIN');
  // ... queries ...
  await client.query('COMMIT');
} finally {
  client.release(); // ALWAYS release back to pool!
}`}),s.jsx(g,{label:"Mongoose connection pooling",code:`await mongoose.connect('mongodb://localhost:27017/myapp', {
  maxPoolSize: 20,        // default: 100
  minPoolSize: 5,         // keep at least 5 connections ready
  serverSelectionTimeoutMS: 5000,
});

// Mongoose handles pooling automatically
// No need to manually release connections`}),s.jsx(z,{icon:"⚠️",color:l.red,title:"Always release",children:"If you acquire a connection from the pool for a transaction, you MUST call `client.release()` in a finally block. Otherwise the connection leaks and the pool eventually empties — all requests start failing."})]}),e==="demo"&&s.jsx(lf,{}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"Why is opening a database connection expensive?",options:["It uses a lot of CPU","TCP handshake + auth + memory allocation","It requires reading from disk","It blocks the event loop"],correct:1,explain:"Each connection requires TCP handshake, TLS negotiation, authentication, and server-side memory allocation. This takes 50-100ms — an eternity for a web request."}),s.jsx(b,{question:"What happens if you forget client.release() in a transaction?",options:["Nothing — the pool auto-releases","The connection leaks and the pool eventually empties","The transaction auto-commits","The query runs twice"],correct:1,explain:"Failing to release a connection removes it from the pool permanently. After enough leaks, the pool has zero available connections and every new request times out."}),s.jsx(b,{question:"How many requests can a 20-connection pool handle?",options:["Exactly 20","About 50-100","Thousands per second","It depends on the database size"],correct:2,explain:"A single connection can handle 50+ requests/second (each query takes ~1-5ms). 20 connections × 50 = 1,000+ requests/second. The pool queues excess requests."})]})]})}function mf(){const e=[{title:"SQL vs NoSQL",color:"#3b82f6",icon:"🔀",kills:["SQL = tables, rows, rigid schema, ACID, vertical scaling.","NoSQL = documents/key-value/graph, flexible schema, horizontal scaling.","Use SQL for complex relationships and strong consistency.","Use NoSQL for rapid development and unstructured data.","PostgreSQL is the gold standard of open-source SQL databases.","MongoDB is the most popular document database."]},{title:"MongoDB & Mongoose",color:"#14b8a6",icon:"🍃",kills:["MongoDB stores JSON-like documents in collections.","Mongoose adds schemas, validation, middleware, and query building.","Embed data read together; reference data shared across documents.","findOne(), find(), create(), updateOne(), deleteOne() are core methods.","Query operators: $eq, $gt, $gte, $lt, $in, $regex, $or, $and.","Mongoose middleware: pre('save'), post('remove'), etc."]},{title:"PostgreSQL",color:"#3b82f6",icon:"🐘",kills:["PostgreSQL is ACID-compliant, feature-rich, and open-source.","Always use parameterized queries ($1, $2) to prevent SQL injection.","JOINs: INNER (matches only), LEFT (all left + matches), FULL (union).","Use Pool from 'pg' for connection management in Node.js.","Transactions: BEGIN → queries → COMMIT/ROLLBACK.","SERIAL for auto-increment; UUID for distributed systems."]},{title:"Prisma",color:"#8b5cf6",icon:"🔷",kills:["Prisma uses schema.prisma to define models and relations declaratively.","Generates type-safe client from schema — catches errors at compile time.","prisma migrate dev creates versioned migrations.","prisma generate updates the client after schema changes.","$transaction runs multiple operations atomically.","Supports PostgreSQL, MySQL, SQLite, SQL Server, and MongoDB."]},{title:"Redis",color:"#f43f5e",icon:"🔴",kills:["Redis is an in-memory key-value store — ~100,000x faster than disk.","Common uses: sessions, API caching, rate limiting, leaderboards, pub/sub.","Always set TTL (EXPIRE/SETEX) on cache keys to prevent memory exhaustion.","Cache-aside pattern: check cache → miss? query DB → store in cache.","Invalidate cache on update: del(key) after writing to the database.","Data types: String, Hash, List, Set, Sorted Set, Stream, Bitmap."]},{title:"Connection Pooling",color:"#06b6d4",icon:"🏊",kills:["Opening a DB connection costs 50-100ms (TCP + auth + alloc).","Pools reuse connections — reducing per-query overhead to ~1-5ms.","Default pg Pool max = 10. Mongoose default max = 100.","Always release pooled connections in a finally block.","idleTimeoutMillis closes unused connections to save memory.","connectionTimeoutMillis prevents requests from waiting forever."]}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"The precise facts that matter most — for building data layers, for debugging, for interviews."}),s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:e.map(t=>s.jsxs("div",{style:{border:`1px solid ${t.color}33`,borderRadius:10,overflow:"hidden"},children:[s.jsxs("div",{style:{padding:"10px 14px",background:t.color+"0d",borderBottom:`1px solid ${t.color}22`,display:"flex",alignItems:"center",gap:8},children:[s.jsx("span",{style:{fontSize:16},children:t.icon}),s.jsx("span",{style:{fontSize:13,fontWeight:900,color:t.color,fontFamily:m},children:t.title})]}),s.jsx("div",{style:{padding:"10px 14px",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:6},children:t.kills.map((r,n)=>s.jsxs("div",{style:{display:"flex",gap:8},children:[s.jsx("span",{style:{color:t.color,fontSize:10,marginTop:3,flexShrink:0},children:"▸"}),s.jsx("span",{style:{fontSize:11,color:l.muted,lineHeight:1.65,fontFamily:D},children:r})]},n))})]},t.title))})]})}function yf(){const[e,t]=N.useState(null),r=[{q:"What is the difference between SQL and NoSQL databases?",level:"Junior",color:l.green,a:`SQL databases are relational. They store data in tables with predefined schemas, use SQL for queries, support ACID transactions, and scale vertically (bigger machines). Examples: PostgreSQL, MySQL.

NoSQL databases are non-relational. They store data as documents, key-value pairs, graphs, or wide-columns. They have flexible schemas, scale horizontally (more machines), and sacrifice some consistency for availability and partition tolerance. Examples: MongoDB, Redis, DynamoDB.

When to choose:
- SQL: Complex relationships, financial data, strong consistency requirements.
- NoSQL: Rapid prototyping, unstructured data, massive scale, real-time analytics.`,code:`// SQL — rigid schema
CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100));

// NoSQL (MongoDB) — flexible schema
{ name: "Alice", email: "alice@example.com", anything: "goes" }`},{q:"What is connection pooling and why does it matter?",level:"Junior",color:l.green,a:`Opening a database connection is expensive. It requires TCP handshake, TLS negotiation, authentication, and memory allocation on the database server. This takes 50-100ms.

A connection pool maintains a set of reusable connections. When your app needs to query, it borrows a connection from the pool, runs the query, and returns it. The next request reuses the same connection.

Without pooling: 1000 requests = 1000 connection openings = 85 seconds of overhead.
With pooling (size 20): 1000 requests reuse 20 connections = negligible overhead.

Key settings: max (pool size), idleTimeoutMillis, connectionTimeoutMillis.`,code:`const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  database: 'myapp',
  max: 20,                    // max connections
  idleTimeoutMillis: 30000,   // close idle after 30s
  connectionTimeoutMillis: 2000
});

// Connection reused automatically
const result = await pool.query('SELECT * FROM users');`},{q:"Explain the cache-aside pattern with Redis.",level:"Mid",color:"#3b82f6",a:`Cache-aside (lazy loading) is the most common caching strategy:

1. Check cache first: Look up the data in Redis by key.
2. Cache hit: Return the cached data immediately.
3. Cache miss: Query the database for the data.
4. Populate cache: Store the result in Redis with a TTL.
5. Return data: Return the freshly fetched data.

Invalidation: When data is updated in the database, delete or update the corresponding cache key. Otherwise stale data will be served.

This pattern is simple and resilient. If Redis goes down, the app falls back to the database — slower, but functional.`,code:`async function getUser(id) {
  const key = \`user:\${id}\`;
  
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached); // hit
  
  const user = await db.findUser(id);    // miss
  await redis.setEx(key, 300, JSON.stringify(user));
  return user;
}

async function updateUser(id, data) {
  await db.updateUser(id, data);
  await redis.del(\`user:\${id}\`); // invalidate
}`},{q:"What are database migrations and why are they important?",level:"Mid",color:"#3b82f6",a:`A database migration is a version-controlled script that changes your database schema. It is the Git of database structure.

Why they matter:
1. Reproducibility: Any developer can run migrations and get the exact same schema.
2. Team collaboration: Two developers changing the schema don't conflict — migrations are ordered and versioned.
3. Production safety: Migrations are reviewed, tested, and run automatically in CI/CD.
4. Rollbacks: Bad migration? Roll it back to the previous state.

Without migrations, developers manually modify databases, leading to "it works on my machine" bugs and production disasters.`,code:`// Prisma migration example
// 1. Edit schema.prisma
model User {
  id   Int    @id @default(autoincrement())
  name String
  role String @default("user")  // added this field
}

// 2. Generate migration
npx prisma migrate dev --name add_user_role

// 3. Apply to production
npx prisma migrate deploy`},{q:"How does MongoDB handle relationships compared to PostgreSQL?",level:"Mid",color:"#3b82f6",a:`PostgreSQL uses foreign keys and JOINs. Relationships are defined by IDs in separate tables. To fetch a user with their orders, you JOIN the users and orders tables. This is normalized — no data duplication, but requires multiple reads or JOINs.

MongoDB uses embedding and references. A user document can contain an array of order sub-documents (embedded). One read gets everything. Alternatively, orders can reference a user_id (denormalized references).

Embedding pros: Fast reads, atomic updates within the document.
Embedding cons: Large documents, harder to query embedded arrays, data duplication.

Reference pros: No duplication, flexible querying.
Reference cons: Multiple queries needed (no JOINs), no atomic multi-document transactions (before MongoDB 4.0).`,code:`// MongoDB — embedded (one read gets everything)
{
  name: "Alice",
  orders: [
    { product: "Laptop", price: 999 },
    { product: "Mouse", price: 29 }
  ]
}

// PostgreSQL — normalized (JOIN required)
-- users table: id, name
-- orders table: id, user_id, product, price
SELECT u.name, o.product, o.price
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.name = 'Alice';`},{q:"What is ACID and why is it important?",level:"Junior",color:l.green,a:`ACID is a set of properties that guarantee reliable database transactions:

Atomicity: A transaction is all-or-nothing. If a bank transfer debits one account but fails to credit another, the entire transaction rolls back. No partial changes.

Consistency: A transaction must leave the database in a valid state. All constraints, foreign keys, and triggers are satisfied after the transaction completes.

Isolation: Concurrent transactions don't interfere. If two users simultaneously read a balance of $1000 and try to withdraw $600, isolation ensures only one succeeds.

Durability: Once committed, a transaction survives forever — even if the server crashes the next millisecond. Data is written to disk (and usually replicated).

Without ACID, financial systems, inventory systems, and reservation systems would lose data and create impossible states.`,code:`// PostgreSQL transaction
const client = await pool.connect();
try {
  await client.query('BEGIN');
  await client.query('UPDATE accounts SET balance = balance - 100 WHERE id = 1');
  await client.query('UPDATE accounts SET balance = balance + 100 WHERE id = 2');
  await client.query('COMMIT');         // all changes persist
} catch (err) {
  await client.query('ROLLBACK');       // nothing changes
} finally {
  client.release();
}`}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"These questions cover database fundamentals, caching, connection pooling, and schema design. Know these for any backend interview."}),s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:7},children:r.map((n,o)=>s.jsxs("div",{style:{border:`1px solid ${e===o?n.color+"55":l.outline}`,borderRadius:9,overflow:"hidden",transition:"border-color 0.2s"},children:[s.jsxs("button",{onClick:()=>t(e===o?null:o),style:{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"11px 14px",background:e===o?n.color+"0d":"transparent",border:"none",cursor:"pointer",textAlign:"left"},children:[s.jsx("span",{style:{fontSize:9,padding:"2px 6px",background:n.color+"22",border:`1px solid ${n.color}44`,borderRadius:3,color:n.color,fontFamily:m,fontWeight:700,flexShrink:0},children:n.level}),s.jsx("span",{style:{fontSize:12,color:e===o?n.color:l.text,fontFamily:D,flex:1,lineHeight:1.4},children:n.q}),s.jsx("span",{style:{color:n.color,fontSize:13,flexShrink:0},children:e===o?"▲":"▼"})]}),e===o&&s.jsxs("div",{style:{padding:"0 14px 14px",borderTop:`1px solid ${n.color}22`},children:[s.jsx("pre",{style:{margin:"10px 0 0",fontSize:12,color:l.muted,fontFamily:D,lineHeight:1.9,whiteSpace:"pre-wrap",wordBreak:"break-word"},children:n.a}),s.jsx(g,{label:"code",code:n.code})]})]},o))})]})}const gf=[{id:"what-testing",icon:"🧪",title:"Why Test?",color:"#f59e0b",render:()=>s.jsx(xf,{})},{id:"jest",icon:"🃏",title:"Jest",color:"#f43f5e",render:()=>s.jsx(vf,{})},{id:"supertest",icon:"🌐",title:"Supertest",color:"#8b5cf6",render:()=>s.jsx(wf,{})},{id:"integration",icon:"🔗",title:"Integration Tests",color:"#14b8a6",render:()=>s.jsx(bf,{})},{id:"debugging",icon:"🐛",title:"Debugging",color:"#06b6d4",render:()=>s.jsx(jf,{})},{id:"killnotes",icon:"⚡",title:"Kill Notes",color:"#f59e0b",render:()=>s.jsx(Sf,{})},{id:"interview",icon:"🎤",title:"Interview Q&A",color:"#ec4899",render:()=>s.jsx(kf,{})}];function xf(){const[e,t]=N.useState("story"),r=[{id:"story",label:"📖 Why Test?"},{id:"pyramid",label:"🔺 Test Pyramid"},{id:"types",label:"📋 Test Types"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"Testing is not about finding bugs — it is about preventing them. A good test suite gives you confidence to refactor, deploy on Fridays, and sleep at night."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#f59e0b22":"transparent",border:`1px solid ${e===n.id?"#f59e0b":l.outline}`,color:e===n.id?"#f59e0b":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="story"&&s.jsxs("div",{children:[s.jsx(L,{number:"1",title:"Untested code is broken code",color:l.red,children:"If you have not tested it, you do not know if it works. It might work on your machine, with your data, today. But will it work on the production server, with 10,000 users, after the next refactor? Testing is the only way to know."}),s.jsx(L,{number:"2",title:"Tests are documentation",color:"#3b82f6",children:"A well-written test describes what the code SHOULD do better than any comment. New developers can read tests to understand the system. When requirements change, tests show exactly what behavior must be preserved."}),s.jsx(L,{number:"3",title:"Tests enable refactoring",color:l.green,children:"Without tests, changing code is terrifying. You might break something and not know for weeks. With tests, you refactor fearlessly. If the tests pass, the system works. This is how codebases stay healthy over years."}),s.jsxs(M,{emoji:"🎯",title:"One sentence",color:"#f59e0b",children:[s.jsx("strong",{children:"Tests are a safety net"})," that lets you move fast without breaking things. They are not optional — they are a professional requirement."]})]}),e==="pyramid"&&s.jsxs("div",{children:[s.jsx(g,{label:"the test pyramid",code:`        /\\
       /  \\     E2E Tests     (slow, expensive, few)
      /----\\
     /      \\   Integration   (medium, medium)
    /--------\\
   /          \\ Unit Tests    (fast, cheap, many)
  --------------`}),s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:6,marginBottom:14},children:[{type:"Unit Tests",pct:"70%",speed:"< 10ms",cost:"Cheap",color:l.green,desc:"Test a single function in isolation. Mock all dependencies. Run thousands in seconds."},{type:"Integration Tests",pct:"20%",speed:"~100ms",cost:"Medium",color:"#f59e0b",desc:"Test multiple components together. Hit the database. Verify APIs."},{type:"E2E Tests",pct:"10%",speed:"> 1s",cost:"Expensive",color:"#f43f5e",desc:"Test the entire app like a real user. Open browser, click buttons, fill forms."}].map((n,o)=>s.jsxs("div",{style:{display:"flex",gap:10,padding:"8px 12px",background:n.color+"08",border:`1px solid ${n.color}22`,borderRadius:7},children:[s.jsx("div",{style:{width:40,flexShrink:0,textAlign:"center"},children:s.jsx("div",{style:{fontSize:14,fontWeight:900,color:n.color,fontFamily:m},children:n.pct})}),s.jsxs("div",{style:{flex:1},children:[s.jsx("div",{style:{fontSize:12,fontWeight:700,color:n.color,fontFamily:m,marginBottom:2},children:n.type}),s.jsxs("div",{style:{fontSize:11,color:l.muted,fontFamily:D,lineHeight:1.6},children:[n.desc," ",s.jsxs("span",{style:{color:n.color+"99",fontFamily:m},children:["(",n.speed,", ",n.cost,")"]})]})]})]},o))}),s.jsx(z,{icon:"🎯",color:l.yellow,title:"The pyramid rule",children:"Most of your tests should be fast unit tests. Fewer integration tests. Very few E2E tests. Inverting the pyramid (many E2E, few unit) makes your test suite slow and brittle."})]}),e==="types"&&s.jsxs("div",{children:[s.jsx(g,{label:"test types explained",code:`// UNIT TEST — test one function
expect(add(2, 3)).toBe(5);

// INTEGRATION TEST — test API + database
const res = await request(app).post('/users').send({ name: 'Alice' });
expect(res.status).toBe(201);

// E2E TEST — test like a real user
await page.goto('http://localhost:3000');
await page.click('[data-testid="login"]');
await page.fill('[name="email"]', 'alice@example.com');`}),s.jsx(L,{number:"1",title:"AAA Pattern",color:"#8b5cf6",children:"Arrange — set up the test data and mocks. Act — call the function under test. Assert — verify the outcome. Every test should follow this structure. If you can't split a test into these three parts, it is probably testing too much."}),s.jsx(M,{emoji:"🎯",title:"TDD: Test-Driven Development",color:l.green,children:"Write the test FIRST, watch it fail, then write the minimum code to make it pass, then refactor. TDD forces you to think about requirements before implementation and guarantees every line of code has a test."})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"What is the main purpose of tests?",options:["To find bugs after they happen","To prevent bugs and enable confident refactoring","To make code run faster","To replace documentation"],correct:1,explain:"Tests primarily prevent bugs by catching them before they reach production. They also give developers confidence to refactor and change code without fear."}),s.jsx(b,{question:"According to the test pyramid, what percentage should be unit tests?",options:["10%","30%","70%","90%"],correct:2,explain:"The test pyramid recommends ~70% unit tests (fast, cheap), ~20% integration tests, and ~10% E2E tests (slow, expensive)."}),s.jsx(b,{question:"What does AAA stand for in test structure?",options:["Always Assert Always","Arrange, Act, Assert","Async, Await, Assert","Add, Apply, Assert"],correct:1,explain:"AAA = Arrange (set up), Act (execute), Assert (verify). This structure makes tests readable and maintainable."})]})]})}function vf(){const[e,t]=N.useState("basics"),r=[{id:"basics",label:"📝 Basics"},{id:"matchers",label:"✅ Matchers"},{id:"mocking",label:"🎭 Mocking"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"Jest is the most popular JavaScript testing framework. It works out of the box with zero configuration and provides everything you need: test running, assertions, mocking, and coverage."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#f43f5e22":"transparent",border:`1px solid ${e===n.id?"#f43f5e":l.outline}`,color:e===n.id?"#f43f5e":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="basics"&&s.jsxs("div",{children:[s.jsx(g,{label:"first Jest test",code:`// math.js
const add = (a, b) => a + b;
const divide = (a, b) => {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
};
module.exports = { add, divide };

// math.test.js
const { add, divide } = require('./math');

describe('math', () => {
  test('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('throws on divide by zero', () => {
    expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
  });
});`}),s.jsx(g,{label:"run tests",code:`npx jest                    # run all tests once
npx jest --watch            # watch mode — rerun on file change
npx jest --coverage         # generate coverage report
npx jest math.test.js       # run single file
npx jest --testNamePattern="adds"  # run matching tests`}),s.jsx(z,{icon:"🎯",color:l.yellow,title:"File naming",children:"Jest discovers files ending in `.test.js` or `.spec.js`, and files inside `__tests__` folders. Name your tests after the file they test: `user.js` → `user.test.js`."})]}),e==="matchers"&&s.jsxs("div",{children:[s.jsx(g,{label:"common matchers",code:`expect(value).toBe(5);                    // strict equality (===)
expect(value).toEqual({ a: 1 });          // deep equality (objects/arrays)
expect(value).toBeTruthy();               // any truthy value
expect(value).toBeNull();                 // null specifically
expect(value).toBeUndefined();            // undefined
expect(array).toContain('item');          // array contains item
expect(array).toHaveLength(3);            // array length
expect(fn).toHaveBeenCalled();            // mock was called
expect(fn).toHaveBeenCalledTimes(2);      // called exactly twice
expect(fn).toHaveBeenCalledWith('arg');   // called with specific arg
expect(promise).resolves.toBe('ok');      // async resolve
expect(promise).rejects.toThrow('err');   // async reject`}),s.jsxs(M,{emoji:"⚠️",title:"toBe vs toEqual",color:l.red,children:[s.jsx("code",{children:"toBe"})," uses ",s.jsx("code",{children:"==="})," — it fails for objects even if they look identical: ",s.jsxs("code",{children:["expect(","{a:1}",").toBe(","{a:1}",")"]})," FAILS. Use ",s.jsx("code",{children:"toEqual"})," for objects and arrays. Use ",s.jsx("code",{children:"toBe"})," for primitives."]})]}),e==="mocking"&&s.jsxs("div",{children:[s.jsx(g,{label:"mocking with Jest",code:`// Mock a module
jest.mock('./api', () => ({
  fetchUser: jest.fn(() => Promise.resolve({ id: 1, name: 'Alice' }))
}));

// Spy on a function
const spy = jest.spyOn(console, 'log');
myFunction();
expect(spy).toHaveBeenCalledWith('hello');
spy.mockRestore();

// Mock implementations
const mockFn = jest.fn();
mockFn.mockReturnValue(42);
mockFn.mockResolvedValue({ data: [] });   // for async
mockFn.mockRejectedValue(new Error('fail'));

// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks();  // reset call counts
});`}),s.jsx(z,{icon:"🎯",color:l.yellow,title:"When to mock",children:"Mock external dependencies (APIs, databases, file system) in unit tests. Do NOT mock the code you are testing. If you find yourself mocking everything, you are writing an integration test — use the real dependencies instead."})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"Which matcher should you use for object equality?",options:["toBe","toEqual","toContain","toMatch"],correct:1,explain:"toEqual performs deep equality comparison for objects and arrays. toBe uses === which fails for objects because they have different references."}),s.jsx(b,{question:"What does jest.fn() create?",options:["A real function","A mock/spy function","A test suite","A module"],correct:1,explain:"jest.fn() creates a mock function that tracks how it was called. You can inspect calls, set return values, and verify it was invoked correctly."}),s.jsx(b,{question:"Which command runs tests and watches for file changes?",options:["npx jest --run","npx jest --watch","npx jest --dev","npx jest --live"],correct:1,explain:"npx jest --watch enters watch mode, automatically rerunning tests when files change. It's the standard workflow during development."})]})]})}function wf(){const[e,t]=N.useState("intro"),r=[{id:"intro",label:"🌐 Intro"},{id:"crud",label:"📝 CRUD Tests"},{id:"auth",label:"🔐 Auth Tests"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"Supertest lets you test Express APIs without starting a real server on a port. It sends HTTP requests to your app directly and gives you powerful assertions on the response."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#8b5cf622":"transparent",border:`1px solid ${e===n.id?"#8b5cf6":l.outline}`,color:e===n.id?"#8b5cf6":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="intro"&&s.jsxs("div",{children:[s.jsx(g,{label:"basic supertest setup",code:`const request = require('supertest');
const app = require('./app');  // your Express app (NOT app.listen!)

describe('GET /users', () => {
  test('returns all users as JSON', async () => {
    const response = await request(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200);
    
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});`}),s.jsx(L,{number:"1",title:"No server required",color:"#8b5cf6",children:"Supertest hooks directly into Express's request handling. You don't call app.listen(). You don't need a running server. This makes tests fast, isolated, and parallelizable. No port conflicts, no cleanup."}),s.jsxs(M,{emoji:"🎯",title:"Chainable API",color:"#8b5cf6",children:["Supertest uses a fluent API: ",s.jsx("code",{children:"request(app).get('/').set('Authorization', token).send(body).expect(200)"}),". Each method returns the request object for chaining."]})]}),e==="crud"&&s.jsxs("div",{children:[s.jsx(g,{label:"full CRUD test suite",code:`describe('Users API', () => {
  test('POST /users creates a user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Alice', email: 'alice@example.com' })
      .expect(201);
    
    expect(res.body.data.name).toBe('Alice');
    expect(res.body.data).toHaveProperty('id');
  });

  test('GET /users/:id returns a user', async () => {
    const res = await request(app)
      .get('/users/1')
      .expect(200);
    
    expect(res.body.data.id).toBe(1);
  });

  test('PUT /users/:id updates a user', async () => {
    const res = await request(app)
      .put('/users/1')
      .send({ name: 'Alice Updated' })
      .expect(200);
    
    expect(res.body.data.name).toBe('Alice Updated');
  });

  test('DELETE /users/:id removes a user', async () => {
    await request(app)
      .delete('/users/1')
      .expect(200);
    
    await request(app)
      .get('/users/1')
      .expect(404);
  });
});`}),s.jsx(z,{icon:"💡",color:l.yellow,title:"Test isolation",children:"Each test should create its own data and clean up after itself. Never assume data from another test exists. Use beforeEach to reset the database state."})]}),e==="auth"&&s.jsxs("div",{children:[s.jsx(g,{label:"testing authenticated endpoints",code:`describe('Protected Routes', () => {
  test('returns 401 without token', async () => {
    await request(app)
      .get('/profile')
      .expect(401);
  });

  test('returns user with valid token', async () => {
    // 1. Login to get token
    const login = await request(app)
      .post('/login')
      .send({ email: 'alice@example.com', password: 'secret' });
    
    const token = login.body.token;
    
    // 2. Use token on protected route
    const res = await request(app)
      .get('/profile')
      .set('Authorization', \`Bearer \${token}\`)
      .expect(200);
    
    expect(res.body.user.email).toBe('alice@example.com');
  });
});`}),s.jsx(M,{emoji:"🔐",title:"Test the unhappy path",color:l.red,children:"Don't just test success cases. Test 401 Unauthorized, 403 Forbidden, 404 Not Found, 400 Bad Request, and 500 errors. Your API's error responses are part of its contract — test them."})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"What is the main advantage of Supertest over manual HTTP requests?",options:["It is faster to write","It tests the app directly without starting a server","It only works with Express","It generates API documentation"],correct:1,explain:"Supertest hooks into Express directly. No server startup, no port binding, no cleanup. Tests run faster and can execute in parallel."}),s.jsx(b,{question:"How do you send a JSON body in Supertest?",options:[".body({})",".send({})",".json({})",".data({})"],correct:1,explain:".send({}) sends a JSON body. Supertest automatically sets Content-Type: application/json when you pass an object."}),s.jsx(b,{question:"What status code should you test for a missing resource?",options:["200","400","404","500"],correct:2,explain:"404 Not Found is the correct status when a requested resource does not exist. Test this to ensure your API returns meaningful errors."})]})]})}function bf(){const[e,t]=N.useState("setup"),r=[{id:"setup",label:"⚙️ Test Setup"},{id:"db",label:"🗄️ Test Database"},{id:"patterns",label:"📐 Patterns"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"Integration tests verify that your API, database, and middleware work together. They are slower than unit tests but catch bugs that unit tests miss."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#14b8a622":"transparent",border:`1px solid ${e===n.id?"#14b8a6":l.outline}`,color:e===n.id?"#14b8a6":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="setup"&&s.jsxs("div",{children:[s.jsx(g,{label:"Jest lifecycle hooks",code:`describe('User API', () => {
  beforeAll(async () => {
    // Run once before all tests
    await connectToTestDatabase();
    await runMigrations();
  });

  beforeEach(async () => {
    // Run before EACH test
    await cleanDatabase();
  });

  afterEach(async () => {
    // Run after EACH test
    await cleanDatabase();
  });

  afterAll(async () => {
    // Run once after all tests
    await disconnectDatabase();
  });

  test('creates a user', async () => {
    // Test runs with a clean database
  });
});`}),s.jsx(z,{icon:"🎯",color:l.yellow,title:"Clean state",children:"Each test should start with a clean database. Never let test data leak between tests. Use TRUNCATE or transactions to reset state in beforeEach."})]}),e==="db"&&s.jsxs("div",{children:[s.jsx(g,{label:"test database setup",code:`// config.js
const DB_NAME = process.env.NODE_ENV === 'test' ? 'myapp_test' : 'myapp';

// test-helper.js
const { Pool } = require('pg');
const pool = new Pool({ database: 'myapp_test' });

async function cleanDatabase() {
  await pool.query('TRUNCATE users, orders RESTART IDENTITY CASCADE');
}

async function setupTestDB() {
  await pool.query('BEGIN');
  // insert seed data
  await pool.query("INSERT INTO users (name, email) VALUES ('Seed', 'seed@test.com')");
  await pool.query('COMMIT');
}

module.exports = { pool, cleanDatabase, setupTestDB };`}),s.jsx(M,{emoji:"⚠️",title:"Never test on production",color:l.red,children:"Your test suite should connect to a separate test database. Testing on production or development databases destroys real data. Use `NODE_ENV=test` to switch databases automatically."}),s.jsx(g,{label:"package.json scripts",code:`{
  "scripts": {
    "test": "NODE_ENV=test jest",
    "test:watch": "NODE_ENV=test jest --watch",
    "test:coverage": "NODE_ENV=test jest --coverage"
  }
}`})]}),e==="patterns"&&s.jsxs("div",{children:[s.jsx(g,{label:"factory pattern for test data",code:`// factories/user.js
const { User } = require('../models');

function createUser(overrides = {}) {
  return User.create({
    name: 'Test User',
    email: \`test+\${Date.now()}@example.com\`,
    ...overrides
  });
}

// In tests
const user = await createUser({ name: 'Alice', role: 'admin' });
const user2 = await createUser(); // uses defaults`}),s.jsx(g,{label:"transaction rollback pattern",code:`beforeEach(async () => {
  // Start transaction before each test
  await db.query('BEGIN');
});

afterEach(async () => {
  // Roll back all changes after each test
  await db.query('ROLLBACK');
});

// Fastest cleanup — no TRUNCATE needed!
// But only works if your app uses the same connection`}),s.jsx(z,{icon:"💡",color:l.yellow,title:"Factories > Fixtures",children:"Factories generate test data programmatically. Fixtures are static JSON files. Factories are more flexible — you can override specific fields per test without modifying shared files."})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"Which hook runs BEFORE EACH test?",options:["beforeAll","beforeEach","afterEach","afterAll"],correct:1,explain:"beforeEach runs before every single test in a describe block. Use it to reset database state and ensure test isolation."}),s.jsx(b,{question:"Why should you use a separate test database?",options:["It is faster","It prevents destroying real data","It has more features","It is required by Jest"],correct:1,explain:"Tests create, modify, and delete data. Running tests on a production or development database would destroy real data and cause data corruption."}),s.jsx(b,{question:"What is the factory pattern in testing?",options:["A design pattern for building APIs","A function that creates test data with defaults and overrides","A way to mock external services","A tool for measuring code coverage"],correct:1,explain:"A factory is a helper function that creates test objects with sensible defaults. You pass overrides for specific fields, keeping tests concise and readable."})]})]})}function jf(){const[e,t]=N.useState("console"),r=[{id:"console",label:"🖨️ Console"},{id:"inspect",label:"🔍 Inspect"},{id:"vscode",label:"🆚 VS Code"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"Debugging is the art of finding out why your code does not do what you think it does. Professional developers debug systematically — they do not guess."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#06b6d422":"transparent",border:`1px solid ${e===n.id?"#06b6d4":l.outline}`,color:e===n.id?"#06b6d4":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="console"&&s.jsxs("div",{children:[s.jsx(g,{label:"advanced console methods",code:`console.log('basic output');
console.table([
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
]);

console.time('query');
await db.query('SELECT * FROM users');
console.timeEnd('query');  // query: 45.2ms

console.trace('where was this called?');  // full stack trace
console.group('User Processing');
console.log('Step 1: validate');
console.log('Step 2: save');
console.groupEnd();`}),s.jsxs(z,{icon:"🎯",color:l.yellow,title:"Use console.dir for objects",children:["`console.dir(obj, ","{ depth: null }",")` prints the full object tree without truncation. Use it when `console.log` cuts off nested properties."]})]}),e==="inspect"&&s.jsxs("div",{children:[s.jsx(g,{label:"node --inspect",code:`// Add debugger statement
function calculate(a, b) {
  debugger;  // execution pauses here
  return a / b;
}

// Run with inspector
node --inspect-brk app.js   // pause on first line
node --inspect app.js       // start inspector, run until debugger

// Then open chrome://inspect in Chrome
// Click "Open dedicated DevTools for Node"`}),s.jsx(L,{number:"1",title:"debugger > console.log",color:"#06b6d4",children:"console.log tells you what happened. The debugger shows you WHY it happened. You can inspect variables at every step, set conditional breakpoints, and watch expressions. When you are stuck for more than 10 minutes, stop adding logs and use the debugger."}),s.jsx(M,{emoji:"🎯",title:"ndb — enhanced debugger",color:"#06b6d4",children:"`npm install -g ndb` gives you Chrome DevTools with Node-specific features. It handles source maps better and provides a cleaner experience than raw `--inspect`."})]}),e==="vscode"&&s.jsxs("div",{children:[s.jsx(g,{label:"VS Code launch.json",code:`{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Server",
      "program": "\${workspaceFolder}/server.js",
      "env": { "NODE_ENV": "development" },
      "console": "integratedTerminal"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Jest Tests",
      "program": "\${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand"],
      "console": "integratedTerminal"
    }
  ]
}`}),s.jsx(z,{icon:"💡",color:l.yellow,title:"Breakpoints in VS Code",children:'Click the gutter to set breakpoints. Right-click → "Edit Breakpoint" to add conditions like `i === 5`. Use F5 to start debugging, F10 to step over, F11 to step into, Shift+F11 to step out.'})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"What does the `debugger;` statement do?",options:["Logs debug info","Pauses execution for inspection","Starts a new thread","Enables verbose logging"],correct:1,explain:"The debugger statement pauses JavaScript execution when a debugger is attached (Chrome DevTools, VS Code, ndb). You can then inspect variables, step through code, and set breakpoints."}),s.jsx(b,{question:"Which is better for complex debugging?",options:["Adding 20 console.log statements","Using a debugger with breakpoints","Reading the source code","Restarting the server"],correct:1,explain:"A debugger lets you pause execution, inspect variables, and step through code line by line. It is far more powerful and faster than adding logs for complex issues."}),s.jsx(b,{question:"How do you start Node.js with the inspector?",options:["node --debug app.js","node --inspect app.js","node --dev app.js","node --watch app.js"],correct:1,explain:"node --inspect starts the V8 inspector. You can then connect Chrome DevTools (chrome://inspect) or VS Code to debug your Node.js application."})]})]})}function Sf(){const e=[{title:"Testing Fundamentals",color:"#f59e0b",icon:"🧪",kills:["Unit tests: fast, isolated, many (70%).","Integration tests: test components together (20%).","E2E tests: test like a real user (10%).","AAA: Arrange, Act, Assert.","TDD: write tests BEFORE code.","Untested code is technical debt."]},{title:"Jest",color:"#f43f5e",icon:"🃏",kills:["Jest discovers .test.js and __tests__ folders automatically.","describe() groups tests. test() or it() defines a test.","expect(value).toBe(5) for primitives. toEqual({}) for objects.","jest.fn() creates mock functions. jest.spyOn() watches real functions.","jest.mock() replaces entire modules.","--watch reruns tests on file change. --coverage generates reports.","beforeEach/afterEach for setup and cleanup."]},{title:"Supertest",color:"#8b5cf6",icon:"🌐",kills:["Supertest tests Express apps without starting a real server.","request(app).get('/').expect(200) is the basic pattern.",".send({}) sends JSON body. .set() sets headers.","Test both happy paths AND error paths (401, 404, 400, 500).","Each test should create its own data — never depend on other tests.","Use async/await — Supertest returns promises."]},{title:"Integration Testing",color:"#14b8a6",icon:"🔗",kills:["Use a separate test database. Never test on production.","Clean database state before/after each test.","TRUNCATE tables or use transaction rollback for fast cleanup.","Factory pattern > fixtures for generating test data.","beforeAll: connect DB. afterAll: disconnect DB.","beforeEach: clean state. afterEach: clean state.","Integration tests catch bugs that unit tests miss."]},{title:"Debugging",color:"#06b6d4",icon:"🐛",kills:["console.table(), console.time(), console.trace() are powerful.","debugger; pauses execution — use with --inspect or VS Code.","node --inspect app.js starts the V8 inspector.","ndb is an enhanced Node debugger with better source maps.","VS Code launch.json configures debug profiles.","Breakpoints > console.log for complex issues.","Conditional breakpoints: pause only when a condition is met."]}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"The precise facts that matter most — for writing tests, for debugging, for interviews."}),s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:e.map(t=>s.jsxs("div",{style:{border:`1px solid ${t.color}33`,borderRadius:10,overflow:"hidden"},children:[s.jsxs("div",{style:{padding:"10px 14px",background:t.color+"0d",borderBottom:`1px solid ${t.color}22`,display:"flex",alignItems:"center",gap:8},children:[s.jsx("span",{style:{fontSize:16},children:t.icon}),s.jsx("span",{style:{fontSize:13,fontWeight:900,color:t.color,fontFamily:m},children:t.title})]}),s.jsx("div",{style:{padding:"10px 14px",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:6},children:t.kills.map((r,n)=>s.jsxs("div",{style:{display:"flex",gap:8},children:[s.jsx("span",{style:{color:t.color,fontSize:10,marginTop:3,flexShrink:0},children:"▸"}),s.jsx("span",{style:{fontSize:11,color:l.muted,lineHeight:1.65,fontFamily:D},children:r})]},n))})]},t.title))})]})}function kf(){const[e,t]=N.useState(null),r=[{q:"What is the difference between unit, integration, and E2E tests?",level:"Junior",color:l.green,a:`Unit tests verify a single function in isolation. They mock all dependencies and run in milliseconds. They are fast, cheap, and you should have many of them (~70% of your test suite).

Integration tests verify that multiple components work together — your API, database, and middleware. They are slower (~100ms) but catch bugs that unit tests miss (~20%).

E2E (End-to-End) tests verify the entire application like a real user. They open a browser, click buttons, and fill forms. They are slow (>1s), expensive to maintain, and you should have few of them (~10%).

The test pyramid: many unit tests at the bottom, fewer integration tests, very few E2E tests at the top.`,code:`// Unit — test one function
expect(add(2, 3)).toBe(5);

// Integration — test API + database
const res = await request(app).post('/users').send({ name: 'Alice' });
expect(res.status).toBe(201);

// E2E — test like a real user
await page.goto('http://localhost:3000');
await page.click('[data-testid="login"]');`},{q:"Why is mocking important in unit testing?",level:"Junior",color:l.green,a:`Unit tests should test ONE thing in isolation. If a function calls an external API, you don't want your test to actually hit that API — it would be slow, unreliable, and might fail for network reasons unrelated to your code.

Mocking replaces external dependencies with controlled fakes. You define exactly what the mock returns, then verify that your code handles that response correctly.

When NOT to mock: integration tests. In integration tests, you WANT to test the real database, the real API client, and the real middleware working together.`,code:`// Mock external API
jest.mock('./stripe', () => ({
  charge: jest.fn(() => Promise.resolve({ id: 'ch_123', status: 'succeeded' }))
}));

// Spy without changing behavior
const spy = jest.spyOn(logger, 'info');
processOrder();
expect(spy).toHaveBeenCalledWith('Order processed');
spy.mockRestore();`},{q:"How do you test an Express API endpoint?",level:"Mid",color:"#3b82f6",a:`Use Supertest. It sends HTTP requests directly to your Express app without starting a real server. This makes tests fast, isolated, and parallelizable.

Best practices:
1. Test both success and error paths (200, 201, 400, 404, 401, 500).
2. Create your own test data in beforeEach — never depend on other tests.
3. Use a separate test database with clean state before each test.
4. Assert on response status, headers, AND body structure.
5. For authenticated endpoints, log in first and use the token.`,code:`const request = require('supertest');
const app = require('./app');

describe('POST /users', () => {
  test('creates a user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Alice', email: 'alice@example.com' })
      .expect(201);
    
    expect(res.body.data).toMatchObject({
      name: 'Alice',
      email: 'alice@example.com'
    });
  });

  test('returns 400 for invalid data', async () => {
    await request(app)
      .post('/users')
      .send({ name: '' })
      .expect(400);
  });
});`},{q:"What are database migrations and why should tests use them?",level:"Mid",color:"#3b82f6",a:`Migrations are version-controlled scripts that change your database schema. They ensure every developer and every environment (local, CI, production) has the exact same database structure.

Tests should use migrations because:
1. Your test database schema must match your production schema.
2. Running migrations in CI guarantees tests run against the correct schema.
3. Migrations make schema changes reproducible and reviewable.

Test workflow: run migrations → truncate tables → run tests → truncate tables → repeat.

Never manually modify the test database schema. Always use migrations.`,code:`// test-setup.js
beforeAll(async () => {
  // Apply migrations to test database
  await exec('npx prisma migrate deploy');
});

beforeEach(async () => {
  // Clean state
  await prisma.$executeRaw\`TRUNCATE users, orders RESTART IDENTITY CASCADE\`;
});`},{q:"How do you debug a Node.js application?",level:"Junior",color:l.green,a:`Three levels of debugging:

1. Console methods: console.log, console.table, console.time, console.trace. Fast but limited.

2. debugger statement + --inspect: Add debugger; in your code, run node --inspect app.js, then open chrome://inspect. You get breakpoints, variable inspection, and step-through debugging.

3. VS Code debugger: Create .vscode/launch.json, set breakpoints in the editor, and press F5. Best for everyday development because it integrates with your workflow.

Rule: if you have added more than 3 console.logs and still don't understand the bug, switch to a real debugger.`,code:`// debugger statement
function processOrder(order) {
  debugger;  // pauses here when inspector is attached
  const total = calculateTotal(order);
  return total;
}

// Start with inspector
node --inspect app.js

// VS Code launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Debug",
  "program": "\${workspaceFolder}/app.js"
}`},{q:"What is the cache-aside pattern and how do you test it?",level:"Mid",color:"#3b82f6",a:`Cache-aside (lazy loading): check cache first, return if hit. If miss, query database, store in cache, return data.

Testing the cache-aside pattern:
1. First call: cache miss → verify database was queried → verify result was cached.
2. Second call: cache hit → verify database was NOT queried → verify result returned from cache.
3. After update: verify cache was invalidated → next call should be a miss.

You need a real Redis instance (or Redis memory server) for these tests because you are testing the integration between your code and Redis.`,code:`test('caches after first call', async () => {
  // First call — cache miss
  const r1 = await getUser(1);
  expect(r1.name).toBe('Alice');
  
  // Second call — cache hit
  const spy = jest.spyOn(db, 'findUser');
  const r2 = await getUser(1);
  expect(r2.name).toBe('Alice');
  expect(spy).not.toHaveBeenCalled();  // no DB query!
  
  // After update — invalidate
  await updateUser(1, { name: 'Bob' });
  const r3 = await getUser(1);
  expect(r3.name).toBe('Bob');
});`}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"These questions cover testing strategy, Jest patterns, API testing, and debugging techniques. Know these for any backend interview."}),s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:7},children:r.map((n,o)=>s.jsxs("div",{style:{border:`1px solid ${e===o?n.color+"55":l.outline}`,borderRadius:9,overflow:"hidden",transition:"border-color 0.2s"},children:[s.jsxs("button",{onClick:()=>t(e===o?null:o),style:{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"11px 14px",background:e===o?n.color+"0d":"transparent",border:"none",cursor:"pointer",textAlign:"left"},children:[s.jsx("span",{style:{fontSize:9,padding:"2px 6px",background:n.color+"22",border:`1px solid ${n.color}44`,borderRadius:3,color:n.color,fontFamily:m,fontWeight:700,flexShrink:0},children:n.level}),s.jsx("span",{style:{fontSize:12,color:e===o?n.color:l.text,fontFamily:D,flex:1,lineHeight:1.4},children:n.q}),s.jsx("span",{style:{color:n.color,fontSize:13,flexShrink:0},children:e===o?"▲":"▼"})]}),e===o&&s.jsxs("div",{style:{padding:"0 14px 14px",borderTop:`1px solid ${n.color}22`},children:[s.jsx("pre",{style:{margin:"10px 0 0",fontSize:12,color:l.muted,fontFamily:D,lineHeight:1.9,whiteSpace:"pre-wrap",wordBreak:"break-word"},children:n.a}),s.jsx(g,{label:"code",code:n.code})]})]},o))})]})}const Tf=[{id:"what-devops",icon:"🚀",title:"What is DevOps?",color:"#f59e0b",render:()=>s.jsx(Cf,{})},{id:"docker",icon:"🐳",title:"Docker",color:"#3b82f6",render:()=>s.jsx(If,{})},{id:"pm2",icon:"⚙️",title:"PM2",color:"#8b5cf6",render:()=>s.jsx(Nf,{})},{id:"nginx",icon:"🔄",title:"nginx",color:"#14b8a6",render:()=>s.jsx(Rf,{})},{id:"cicd",icon:"🚀",title:"CI/CD",color:"#f59e0b",render:()=>s.jsx(Af,{})},{id:"monitoring",icon:"📊",title:"Monitoring",color:"#f43f5e",render:()=>s.jsx(Pf,{})},{id:"killnotes",icon:"⚡",title:"Kill Notes",color:"#f59e0b",render:()=>s.jsx(qf,{})},{id:"interview",icon:"🎤",title:"Interview Q&A",color:"#ec4899",render:()=>s.jsx(zf,{})}];function Ef(){const[e,t]=N.useState(-1),[r,n]=N.useState(!1),[o,i]=N.useState([]),a=[{name:"Checkout",icon:"📥",color:"#3b82f6",log:"git clone https://github.com/user/api.git"},{name:"Install",icon:"📦",color:"#8b5cf6",log:"npm ci (installing 245 packages...)"},{name:"Lint",icon:"🔍",color:"#f59e0b",log:"eslint src/ (0 errors, 0 warnings)"},{name:"Test",icon:"🧪",color:"#f43f5e",log:"jest --coverage (142 tests passed)"},{name:"Build",icon:"🏗️",color:"#06b6d4",log:"vite build (dist/ 324KB)"},{name:"Deploy",icon:"🚀",color:l.green,log:"ssh prod-server 'pm2 reload api' (success)"}],c=async()=>{n(!0),t(-1),i([]);for(let d=0;d<a.length;d++)await new Promise(u=>setTimeout(u,900)),t(d),i(u=>[...u,a[d].log]);await new Promise(d=>setTimeout(d,500)),n(!1)};return s.jsxs("div",{style:{padding:14,background:l.surfaceLowest,border:`1px solid ${l.outline}`,borderRadius:10},children:[s.jsx("div",{style:{fontSize:10,color:l.muted,fontFamily:m,letterSpacing:1,marginBottom:10},children:"🧪 LIVE — CI/CD pipeline simulator"}),s.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12},children:a.map((d,u)=>s.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4,padding:"8px 10px",background:e>=u?d.color+"15":l.surface,border:`1px solid ${e>=u?d.color+"40":l.outline}`,borderRadius:6,minWidth:70,transition:"all 0.4s",opacity:e>=u?1:.45},children:[s.jsx("span",{style:{fontSize:16},children:e>u?"✅":e===u?"⏳":d.icon}),s.jsx("span",{style:{fontSize:10,color:e>=u?d.color:l.muted,fontFamily:m,fontWeight:e===u?700:400},children:d.name})]},u))}),s.jsx("div",{style:{padding:"8px 10px",background:l.surface,borderRadius:6,marginBottom:12,fontFamily:m,fontSize:10,minHeight:80,maxHeight:120,overflowY:"auto",color:l.muted},children:o.length===0?"press Run to start pipeline...":o.map((d,u)=>{var v;return s.jsxs("div",{style:{color:((v=a[u])==null?void 0:v.color)||l.muted,padding:"1px 0"},children:[s.jsx("span",{style:{opacity:.5},children:"$"})," ",d]},u)})}),s.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[s.jsx("button",{onClick:c,disabled:r,style:{padding:"6px 16px",background:r?l.muted+"18":l.greenBg,border:`1px solid ${r?l.outline:l.green}`,color:r?l.muted:l.greenText,borderRadius:5,cursor:r?"default":"pointer",fontSize:11,fontFamily:m},children:r?"● deploying...":"▶ Run Pipeline"}),s.jsx("span",{style:{fontSize:10,color:l.muted,fontFamily:m},children:e===-1?"6 stages: checkout → install → lint → test → build → deploy":e>=a.length-1?"Deployed! 🚀":`stage ${e+1} of ${a.length}`})]})]})}function Cf(){const[e,t]=N.useState("story"),r=[{id:"story",label:"📖 The Story"},{id:"concepts",label:"🎯 Key Concepts"},{id:"workflow",label:"🔄 Workflow"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"DevOps is the bridge between writing code and running it in production. It is not a job title — it is a mindset of automating everything that can be automated."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#f59e0b22":"transparent",border:`1px solid ${e===n.id?"#f59e0b":l.outline}`,color:e===n.id?"#f59e0b":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="story"&&s.jsxs("div",{children:[s.jsx(L,{number:"1",title:"It worked on my machine",color:l.red,children:"The most expensive sentence in software. A developer writes code on their Mac, it works perfectly, they push to production, and everything breaks. Why? Different Node versions, missing environment variables, wrong OS libraries. DevOps exists to eliminate this gap."}),s.jsx(L,{number:"2",title:"Manual deployment is dangerous",color:"#f43f5e",children:"In 2010, deploying meant: SSH into server, git pull, npm install, restart service, pray. If something broke at 2 AM, someone got paged. Modern DevOps replaces all of this with automated pipelines that test, build, and deploy with zero human intervention."}),s.jsx(L,{number:"3",title:"Infrastructure as Code",color:"#3b82f6",children:"Instead of configuring servers by clicking buttons in a dashboard, you write code (Dockerfiles, Terraform, Ansible) that creates and configures servers. This makes infrastructure version-controlled, reproducible, and reviewable — just like application code."}),s.jsxs(M,{emoji:"🎯",title:"DevOps in one sentence",color:"#f59e0b",children:[s.jsx("strong",{children:"DevOps is the practice of shipping code to production automatically, reliably, and observably."})," If you cannot deploy in one command and know within seconds if something broke, you do not have DevOps."]})]}),e==="concepts"&&s.jsx("div",{children:[{title:"Containerization",color:"#3b82f6",icon:"📦",desc:"Package your app with all dependencies into a container. Runs identically on your laptop, in CI, and in production. Docker is the standard."},{title:"Process Management",color:"#8b5cf6",icon:"⚙️",desc:"Node.js crashes when an unhandled error occurs. PM2 keeps it running, restarts on failure, clusters across CPU cores, and handles zero-downtime reloads."},{title:"Reverse Proxy",color:"#14b8a6",icon:"🔄",desc:"nginx sits between the internet and your app. It handles SSL, serves static files, load-balances across multiple Node processes, and blocks malicious traffic."},{title:"CI/CD",color:"#f59e0b",icon:"🚀",desc:"Continuous Integration: every push triggers automated tests. Continuous Deployment: every passing build deploys to production automatically. GitHub Actions, GitLab CI, CircleCI."},{title:"Monitoring",color:"#f43f5e",icon:"📊",desc:"You cannot fix what you cannot see. Health checks, structured logs, error tracking (Sentry), and metrics (Prometheus) tell you when things break before users complain."},{title:"Environment Management",color:l.green,icon:"🔐",desc:"Secrets and config live outside the codebase in environment variables. .env files for local, injected secrets for production. Never commit passwords to Git."}].map((n,o)=>s.jsxs("div",{style:{marginBottom:10,padding:"13px 16px",background:n.color+"08",border:`1px solid ${n.color}25`,borderRadius:9},children:[s.jsxs("div",{style:{fontSize:13,fontWeight:700,color:n.color,fontFamily:m,marginBottom:7},children:[n.icon," ",n.title]}),s.jsx("p",{style:{...P,marginBottom:0},children:n.desc})]},o))}),e==="workflow"&&s.jsxs("div",{children:[s.jsx(g,{label:"the modern deployment workflow",code:`Developer pushes code
        ↓
GitHub Actions (CI) triggers
        ↓
Run tests → Lint → Type check → Build
        ↓
All checks pass?
        ↓ YES
Build Docker image
        ↓
Push to container registry
        ↓
SSH to production server
        ↓
Pull new image
        ↓
pm2 reload (zero-downtime)
        ↓
Health check passes?
        ↓ YES
Traffic routed to new version
        ↓
Monitor logs & metrics`}),s.jsx(z,{icon:"🎯",color:l.yellow,title:"The golden rule",children:"If a step in the pipeline fails, deployment stops immediately. You never deploy code that failed tests. This is why CI/CD is a safety net, not just automation."})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"What problem does Docker solve?",options:["It makes code run faster","It packages apps so they run identically everywhere","It replaces the need for a database","It automatically writes tests"],correct:1,explain:"Docker containers include your app, runtime, and dependencies. A container runs the same on your Mac, in CI, and on the production Linux server."}),s.jsx(b,{question:"What is the purpose of a reverse proxy like nginx?",options:["To replace Node.js","To handle SSL, static files, and forward requests to Node.js","To compile JavaScript","To store session data"],correct:1,explain:"nginx sits in front of Node.js. It terminates SSL, serves static files efficiently, and proxies API requests to your Node app. It also enables load balancing across multiple Node processes."}),s.jsx(b,{question:"What does CI/CD stand for?",options:["Code Integration / Code Deployment","Continuous Integration / Continuous Deployment","Container Infrastructure / Container Delivery","Computer Intelligence / Computer Deployment"],correct:1,explain:"CI = Continuous Integration (automated tests on every push). CD = Continuous Deployment (automatic deployment when tests pass)."})]})]})}function If(){const[e,t]=N.useState("dockerfile"),r=[{id:"dockerfile",label:"🐳 Dockerfile"},{id:"compose",label:"🎼 Compose"},{id:"commands",label:"⌨️ Commands"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:'Docker containers are lightweight, portable, and isolated. They solve the "it works on my machine" problem forever.'}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#3b82f622":"transparent",border:`1px solid ${e===n.id?"#3b82f6":l.outline}`,color:e===n.id?"#3b82f6":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="dockerfile"&&s.jsxs("div",{children:[s.jsx(g,{label:"production Dockerfile",code:`FROM node:20-alpine

WORKDIR /app

# Copy dependency files first (for layer caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Create non-root user for security
USER node

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD curl -f http://localhost:3000/health || exit 1

# Start command
CMD ["node", "server.js"]`}),s.jsx(L,{number:"1",title:"Layer caching",color:"#3b82f6",children:"Docker builds images in layers. If package.json hasn't changed, Docker reuses the cached `npm ci` layer. This makes rebuilds 10x faster. Always copy package files BEFORE copying source code."}),s.jsx(z,{icon:"🔒",color:l.yellow,title:"Security",children:"Never run containers as root. Use `USER node` or create a dedicated user. A compromised root container can access the host system."})]}),e==="compose"&&s.jsxs("div",{children:[s.jsx(g,{label:"docker-compose.yml",code:`version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app

volumes:
  pgdata:`}),s.jsx(M,{emoji:"🎯",title:"Why docker-compose?",color:"#3b82f6",children:"Docker Compose defines your entire stack in one file: app, database, cache, and proxy. One command (`docker-compose up`) starts everything. One command (`docker-compose down`) stops everything. Perfect for local development and CI."})]}),e==="commands"&&s.jsxs("div",{children:[s.jsx(g,{label:"essential Docker commands",code:`docker build -t myapp .              # build image
docker run -p 3000:3000 myapp        # run container
docker run -d --name api myapp       # run detached (background)
docker ps                            # list running containers
docker logs api                      # view container logs
docker exec -it api sh               # shell into container
docker stop api && docker rm api     # stop and remove
docker-compose up -d                 # start all services
docker-compose down -v               # stop and remove volumes
docker system prune -f               # clean unused images`}),s.jsx(z,{icon:"💡",color:l.yellow,title:".dockerignore",children:"Create a `.dockerignore` file to exclude `node_modules`, `.git`, and `.env` from the build context. This makes builds faster and prevents secrets from leaking into images."})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"Why copy package.json before source code in a Dockerfile?",options:["It is required by Docker","It enables layer caching for faster rebuilds","It makes the image smaller","It improves security"],correct:1,explain:"Docker caches layers. If package.json hasn't changed, Docker skips npm install and reuses the cached layer. This makes rebuilds dramatically faster."}),s.jsx(b,{question:"What does docker-compose do?",options:["Builds a single container","Defines and runs multi-container applications","Replaces Kubernetes","Monitors container health"],correct:1,explain:"Docker Compose lets you define multiple services (app, database, cache, proxy) in one YAML file and start them all with a single command."}),s.jsx(b,{question:"Why should containers NOT run as root?",options:["Root is slower","A compromised root container can access the host system","Root uses more memory","Root cannot bind to ports"],correct:1,explain:"Running as root inside a container is a security risk. If an attacker breaks into the container, they have root access to the host system. Always use a non-root user."})]})]})}function Nf(){const[e,t]=N.useState("intro"),r=[{id:"intro",label:"⚡ Intro"},{id:"cluster",label:"🔄 Cluster Mode"},{id:"config",label:"⚙️ Config"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"PM2 is a production process manager for Node.js. It keeps your app running, restarts crashes, clusters across CPU cores, and handles zero-downtime deployments."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#8b5cf622":"transparent",border:`1px solid ${e===n.id?"#8b5cf6":l.outline}`,color:e===n.id?"#8b5cf6":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="intro"&&s.jsxs("div",{children:[s.jsx(g,{label:"PM2 basics",code:`npm install -g pm2

pm2 start server.js --name "api"
pm2 list
pm2 logs api
pm2 reload api          # zero-downtime restart
pm2 restart api         # hard restart
pm2 stop api
pm2 delete api
pm2 save                # save process list
pm2 startup             # generate startup script
pm2 monit               # real-time monitoring`}),s.jsx(L,{number:"1",title:"Node.js crashes by default",color:l.red,children:"If an unhandled error throws in Node.js, the entire process exits. In production, this means downtime until someone manually restarts it. PM2 watches your process and instantly restarts it on crash — keeping your API available."}),s.jsx(M,{emoji:"🎯",title:"Zero-downtime reload",color:"#8b5cf6",children:"`pm2 reload` starts new processes alongside old ones, then swaps traffic over. Users experience zero downtime. This is how production deployments should work."})]}),e==="cluster"&&s.jsxs("div",{children:[s.jsx(g,{label:"cluster mode",code:`# Use all CPU cores
pm2 start server.js -i max

# Or specify number of instances
pm2 start server.js -i 4

# What this does:
# Core 1: Node process #1
# Core 2: Node process #2
# Core 3: Node process #3
# Core 4: Node process #4
# All share port 3000 (PM2 load balances)`}),s.jsx(L,{number:"1",title:"One Node process = one CPU core",color:"#f59e0b",children:"Node.js is single-threaded. A single Node process can only use one CPU core. On an 8-core server, 7 cores sit idle. Cluster mode starts one process per core, multiplying your throughput by the number of cores."}),s.jsx(z,{icon:"🎯",color:l.yellow,title:"When to cluster",children:"Always cluster in production. A single core might handle 1,000 requests/second. Eight cores handle 8,000. The only exception: if your app is memory-bound (large ML models) rather than CPU-bound."})]}),e==="config"&&s.jsxs("div",{children:[s.jsx(g,{label:"ecosystem.config.js",code:`module.exports = {
  apps: [{
    name: 'api',
    script: './server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 80
    },
    // Logging
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    merge_logs: true,
    // Memory limit
    max_memory_restart: '500M',
    // Auto-restart
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};`}),s.jsx(g,{label:"run with config",code:`pm2 start ecosystem.config.js
pm2 start ecosystem.config.js --env production
pm2 reload ecosystem.config.js`})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"What happens when an unhandled error occurs in Node.js?",options:["It logs the error and continues","The process crashes and exits","It restarts automatically","It sends an email"],correct:1,explain:"By default, an unhandled exception crashes the Node.js process. Without PM2, your server goes down until someone manually restarts it."}),s.jsx(b,{question:"What does pm2 start app.js -i max do?",options:["Runs the app with maximum memory","Starts one process per CPU core","Enables debug mode","Sets the port to maximum"],correct:1,explain:"-i max starts one Node.js process for every CPU core, with PM2 load-balancing requests between them. This maximizes hardware utilization."}),s.jsx(b,{question:"What is the difference between restart and reload?",options:["They are the same","Restart stops then starts; reload swaps processes with zero downtime","Restart is faster","Reload only works in development"],correct:1,explain:"pm2 restart kills the process and starts a new one (downtime). pm2 reload starts new processes alongside old ones, then swaps traffic over (zero downtime)."})]})]})}function Rf(){const[e,t]=N.useState("proxy"),r=[{id:"proxy",label:"🔄 Reverse Proxy"},{id:"ssl",label:"🔒 SSL"},{id:"static",label:"📁 Static Files"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"nginx is the world's most popular web server and reverse proxy. It handles SSL, serves static files, load-balances traffic, and protects your Node.js app from the open internet."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#14b8a622":"transparent",border:`1px solid ${e===n.id?"#14b8a6":l.outline}`,color:e===n.id?"#14b8a6":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="proxy"&&s.jsxs("div",{children:[s.jsx(g,{label:"nginx reverse proxy",code:`server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}`}),s.jsx(L,{number:"1",title:"Why proxy through nginx?",color:"#14b8a6",children:"Node.js is excellent at handling dynamic requests but not optimized for serving static files or handling SSL encryption. nginx is written in C and handles these tasks 10x more efficiently. It also adds a layer of security — the internet talks to nginx, not directly to your Node process."}),s.jsx(z,{icon:"🎯",color:l.yellow,title:"X-Forwarded-For",children:"When nginx proxies a request, the client's real IP is in `X-Forwarded-For`. Your Express app should read this header to get the original IP for rate limiting and logging."})]}),e==="ssl"&&s.jsxs("div",{children:[s.jsx(g,{label:"free SSL with Let's Encrypt",code:`# Install certbot
sudo apt install certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d api.example.com

# Auto-renew (certbot sets this up automatically)
# Certificates expire every 90 days
# certbot renews them automatically via cron`}),s.jsx(g,{label:"nginx with SSL",code:`server {
    listen 443 ssl http2;
    server_name api.example.com;

    ssl_certificate /etc/letsencrypt/live/api.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.example.com/privkey.pem;

    # Modern SSL config
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://localhost:3000;
    }
}`}),s.jsx(M,{emoji:"🔒",title:"Always use HTTPS",color:l.red,children:"Without HTTPS, passwords and tokens travel over the internet in plain text. Anyone on the same WiFi can intercept them. Let's Encrypt provides free SSL certificates. There is no excuse for HTTP in production."})]}),e==="static"&&s.jsxs("div",{children:[s.jsx(g,{label:"serving static files",code:`server {
    listen 80;
    server_name example.com;

    # Serve static files directly (fast!)
    location /static/ {
        alias /var/www/static/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Serve uploads
    location /uploads/ {
        alias /var/www/uploads/;
        expires 7d;
    }

    # Everything else goes to Node.js
    location / {
        proxy_pass http://localhost:3000;
    }
}`}),s.jsx(z,{icon:"💡",color:l.yellow,title:"Let nginx serve static files",children:"Never serve static files from Express in production. Express reads files through the Node.js event loop, blocking other requests. nginx serves them directly from disk using sendfile — zero Node.js involvement."})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"Why use nginx in front of Node.js?",options:["To replace Node.js entirely","To handle SSL, static files, and proxy requests efficiently","To add JavaScript features","To connect to the database"],correct:1,explain:"nginx handles SSL termination, static file serving, and request proxying far more efficiently than Node.js. It also adds a security layer between the internet and your app."}),s.jsx(b,{question:"What does Let's Encrypt provide?",options:["Paid SSL certificates","Free SSL certificates","Database hosting","Docker images"],correct:1,explain:"Let's Encrypt is a nonprofit that provides free SSL certificates. certbot automates the setup and renewal process. Every production site should use HTTPS."}),s.jsx(b,{question:"Which header contains the client's real IP when using nginx?",options:["Host","X-Real-IP","Content-Type","Authorization"],correct:1,explain:"When nginx proxies a request, the client's IP is passed via X-Real-IP and X-Forwarded-For headers. Your app should read these to get the original IP address."})]})]})}function Af(){const[e,t]=N.useState("github"),r=[{id:"github",label:"🐙 GitHub Actions"},{id:"pipeline",label:"🔄 Pipeline"},{id:"strategies",label:"🎯 Strategies"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"CI/CD automates testing and deployment. Every push to your repository triggers a pipeline that verifies your code and ships it to production — without human intervention."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#f59e0b22":"transparent",border:`1px solid ${e===n.id?"#f59e0b":l.outline}`,color:e===n.id?"#f59e0b":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="github"&&s.jsxs("div",{children:[s.jsx(g,{label:"GitHub Actions workflow",code:`.github/workflows/deploy.yml

name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to server
        run: |
          ssh user@server "cd /app && git pull && npm ci && pm2 reload api"
        env:
          SSH_PRIVATE_KEY: \${{ secrets.SSH_PRIVATE_KEY }}`}),s.jsx(z,{icon:"🔑",color:l.yellow,title:"Secrets",children:"Never put passwords or SSH keys in your workflow file. Use GitHub Secrets (Settings → Secrets and variables → Actions) to store them securely."})]}),e==="pipeline"&&s.jsxs("div",{children:[s.jsx(Ef,{}),s.jsx(g,{label:"typical pipeline stages",code:`1. Checkout code
2. Install dependencies (npm ci)
3. Run linter (eslint)
4. Run type checker (tsc)
5. Run tests (jest --coverage)
6. Build application (vite build)
7. Build Docker image
8. Push image to registry
9. Deploy to staging
10. Run smoke tests
11. Deploy to production`})]}),e==="strategies"&&s.jsxs("div",{children:[s.jsx(L,{number:"1",title:"Blue-Green Deployment",color:"#3b82f6",children:"Run two identical production environments: Blue (live) and Green (idle). Deploy to Green, test it, then switch traffic from Blue to Green. If something breaks, switch back instantly. Zero downtime, instant rollback."}),s.jsx(L,{number:"2",title:"Rolling Deployment",color:"#14b8a6",children:"Replace old instances one at a time. If you have 5 servers, take one offline, deploy the new version, bring it back, then move to the next. No extra infrastructure needed, but rollback is slower."}),s.jsx(L,{number:"3",title:"Canary Deployment",color:"#f59e0b",children:"Deploy the new version to 5% of users. Monitor error rates and performance. If everything looks good, gradually increase to 25%, 50%, 100%. If errors spike, roll back the 5% instantly. Safest but most complex."})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"What does the needs keyword do in GitHub Actions?",options:["It installs npm packages","It makes one job wait for another to complete","It defines environment variables","It creates a Docker container"],correct:1,explain:"needs: test means the deploy job waits for the test job to finish successfully. If tests fail, deployment is automatically skipped."}),s.jsx(b,{question:"What is blue-green deployment?",options:["A deployment that uses Docker","Two identical environments where you switch traffic instantly","A deployment that only runs at night","A deployment strategy for mobile apps"],correct:1,explain:"Blue-green deployment maintains two identical production environments. You deploy to the idle one, test it, then switch traffic instantly. Rollback is immediate."}),s.jsx(b,{question:"Where should you store SSH keys for CI/CD?",options:["In the workflow YAML file","In GitHub Secrets","In the README","In package.json"],correct:1,explain:"GitHub Secrets encrypts sensitive values and injects them into workflows at runtime. Never commit passwords, tokens, or SSH keys to your repository."})]})]})}function Pf(){const[e,t]=N.useState("health"),r=[{id:"health",label:"❤️ Health Checks"},{id:"logs",label:"📝 Logging"},{id:"metrics",label:"📊 Metrics"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"You cannot fix what you cannot see. Monitoring tells you when things break before your users do."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#f43f5e22":"transparent",border:`1px solid ${e===n.id?"#f43f5e":l.outline}`,color:e===n.id?"#f43f5e":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="health"&&s.jsxs("div",{children:[s.jsx(g,{label:"health check endpoint",code:`app.get('/health', async (req, res) => {
  const checks = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    database: await checkDatabase(),
    redis: await checkRedis()
  };
  
  const healthy = checks.database && checks.redis;
  
  res.status(healthy ? 200 : 503)
     .json(checks);
});

async function checkDatabase() {
  try {
    await db.query('SELECT 1');
    return true;
  } catch {
    return false;
  }
}`}),s.jsx(L,{number:"1",title:"Health checks save you",color:l.green,children:"Load balancers and orchestrators (Kubernetes, AWS ELB) use health checks to know if a server is healthy. If /health returns 503, traffic is routed away from that server automatically. Without health checks, failed servers keep receiving traffic."}),s.jsx(z,{icon:"🎯",color:l.yellow,title:"Check dependencies",children:"A good health check verifies not just that the app is running, but that its dependencies (database, cache, external APIs) are accessible. An app that cannot reach its database is not healthy."})]}),e==="logs"&&s.jsxs("div",{children:[s.jsx(g,{label:"structured logging with winston",code:`const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

// Usage
logger.info('User logged in', { userId: 123, ip: '1.2.3.4' });
logger.error('Payment failed', { error: err.message, orderId: 456 });
logger.warn('Rate limit approaching', { ip: '1.2.3.4', count: 95 });`}),s.jsxs(M,{emoji:"📝",title:"Structured logs are searchable",color:"#f43f5e",children:["`console.log('error')` is useless in production. `logger.error('Payment failed', ","{ orderId: 456, userId: 123 }",")` lets you search logs by orderId, filter by severity, and build dashboards. Always use structured (JSON) logging in production."]})]}),e==="metrics"&&s.jsxs("div",{children:[s.jsx(g,{label:"key metrics to track",code:`// Request count
app.use((req, res, next) => {
  metrics.increment('http.requests', {
    method: req.method,
    route: req.route?.path,
    status: res.statusCode
  });
  next();
});

// Response time
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    metrics.timing('http.response_time', Date.now() - start);
  });
  next();
});

// Error rate
app.use((err, req, res, next) => {
  metrics.increment('http.errors', { type: err.name });
  next(err);
});`}),[{metric:"Error rate",why:"Spike = something broke"},{metric:"Response time (p95/p99)",why:"Slow = users leave"},{metric:"Throughput (req/s)",why:"Drop = traffic problem or crash"},{metric:"CPU / Memory",why:"High = scale up or optimize"},{metric:"Database query time",why:"Slow = missing index or N+1"}].map((n,o)=>s.jsxs("div",{style:{display:"flex",gap:10,padding:"6px 10px",background:l.surface,border:`1px solid ${l.outline}`,borderRadius:5,marginBottom:4},children:[s.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#f43f5e",fontFamily:m,minWidth:160},children:n.metric}),s.jsx("span",{style:{fontSize:11,color:l.muted,fontFamily:D},children:n.why})]},o))]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"What should a health check endpoint verify?",options:["Only that the app is running","That the app AND its dependencies are healthy","That the database is empty","That there are no users logged in"],correct:1,explain:"A good health check verifies the app and all critical dependencies (database, cache, external APIs). An app that cannot reach its database should return 503, not 200."}),s.jsx(b,{question:"Why use structured (JSON) logging?",options:["It looks prettier","It enables searching, filtering, and dashboard building","It is required by law","It prevents errors"],correct:1,explain:"JSON logs are machine-readable. You can search by field, filter by severity, and feed them into tools like ELK, Datadog, or CloudWatch for analysis and alerting."}),s.jsx(b,{question:"What does p95 response time mean?",options:["The average response time","95% of requests are faster than this value","The slowest request","The fastest request"],correct:1,explain:"p95 (95th percentile) means 95% of requests are faster than this value. It is more meaningful than average because it ignores outliers and shows the real user experience."})]})]})}function qf(){const e=[{title:"DevOps Fundamentals",color:"#f59e0b",icon:"🚀",kills:["DevOps = shipping code automatically, reliably, and observably.","Infrastructure as Code: configure servers with code, not clicks.","Never deploy code that failed tests.","Manual deployment is dangerous and error-prone.","Containerize everything. Orchestrate at scale.","Monitor production — you cannot fix what you cannot see."]},{title:"Docker",color:"#3b82f6",icon:"🐳",kills:["Docker packages apps with dependencies into portable containers.","Dockerfile: FROM, WORKDIR, COPY, RUN, EXPOSE, CMD.","Copy package.json BEFORE source code for layer caching.","docker-compose defines multi-container stacks in one file.","Never run containers as root. Use USER.",".dockerignore excludes node_modules, .git, .env from builds.","Volumes persist data across container restarts."]},{title:"PM2",color:"#8b5cf6",icon:"⚙️",kills:["PM2 keeps Node.js running, restarts crashes, and clusters CPUs.","pm2 start app.js -i max = one process per CPU core.","pm2 reload = zero-downtime restart. pm2 restart = hard restart.","Use ecosystem.config.js for production configuration.","pm2 save + pm2 startup = auto-restart on server boot.","max_memory_restart prevents memory leaks from crashing the server."]},{title:"nginx",color:"#14b8a6",icon:"🔄",kills:["nginx handles SSL, static files, and proxies to Node.js.","Always use HTTPS in production. Let's Encrypt is free.","X-Real-IP and X-Forwarded-For pass the client IP through the proxy.","Serve static files from nginx, not Express.","nginx is 10x more efficient at SSL and static file serving than Node.","Configure gzip compression to reduce response sizes."]},{title:"CI/CD",color:"#f59e0b",icon:"🔄",kills:["CI = automated tests on every push. CD = auto-deploy on pass.","GitHub Actions, GitLab CI, CircleCI are popular CI/CD tools.","Store secrets in GitHub Secrets, never in workflow files.","needs: test makes deploy wait for tests to pass.","Blue-green = instant rollback. Canary = gradual rollout.","A typical pipeline: lint → test → build → deploy → smoke test."]},{title:"Monitoring",color:"#f43f5e",icon:"📊",kills:["Health checks let load balancers route away from failed servers.","Structured JSON logs are searchable and dashboard-friendly.","Track: error rate, response time (p95/p99), throughput, CPU, memory.","Winston, Pino, and Bunyan are popular Node.js loggers.","Alert on symptoms (high error rate), not causes (disk full).","p95 response time shows real user experience better than average."]}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"The precise facts that matter most — for deploying apps, for debugging production, for interviews."}),s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:e.map(t=>s.jsxs("div",{style:{border:`1px solid ${t.color}33`,borderRadius:10,overflow:"hidden"},children:[s.jsxs("div",{style:{padding:"10px 14px",background:t.color+"0d",borderBottom:`1px solid ${t.color}22`,display:"flex",alignItems:"center",gap:8},children:[s.jsx("span",{style:{fontSize:16},children:t.icon}),s.jsx("span",{style:{fontSize:13,fontWeight:900,color:t.color,fontFamily:m},children:t.title})]}),s.jsx("div",{style:{padding:"10px 14px",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:6},children:t.kills.map((r,n)=>s.jsxs("div",{style:{display:"flex",gap:8},children:[s.jsx("span",{style:{color:t.color,fontSize:10,marginTop:3,flexShrink:0},children:"▸"}),s.jsx("span",{style:{fontSize:11,color:l.muted,lineHeight:1.65,fontFamily:D},children:r})]},n))})]},t.title))})]})}function zf(){const[e,t]=N.useState(null),r=[{q:"What is Docker and why is it useful?",level:"Junior",color:l.green,a:`Docker is a platform for developing, shipping, and running applications in containers. A container packages your application code together with all its dependencies (Node.js version, system libraries, environment variables) into a single, portable unit.

Why it is useful:
1. Consistency: A Docker container runs identically on your Mac, in CI, and on the production Linux server. No more "it works on my machine."
2. Isolation: Each container runs independently without interfering with others.
3. Portability: Build once, run anywhere that supports Docker.
4. Efficiency: Containers share the host OS kernel, making them much lighter than virtual machines.
5. Scalability: Easy to spin up multiple container instances behind a load balancer.`,code:`FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
USER node
EXPOSE 3000
CMD ["node", "server.js"]`},{q:"What is the difference between pm2 restart and pm2 reload?",level:"Mid",color:"#3b82f6",a:`pm2 restart stops the process and starts a new one. This causes downtime — active requests are dropped. Use it for configuration changes that require a hard reset.

pm2 reload performs a zero-downtime restart. It starts new processes alongside the old ones, waits for the new processes to be ready, then swaps traffic over and shuts down the old processes. Active requests finish on the old processes while new requests go to the new processes.

In production, always use reload for code deployments. Only use restart when absolutely necessary.`,code:`pm2 start server.js -i max     # start with cluster mode
pm2 reload api                  # zero-downtime restart ✅
pm2 restart api                 # hard restart (downtime) ⚠️`},{q:"Why should nginx sit in front of a Node.js application?",level:"Mid",color:"#3b82f6",a:`nginx is a high-performance web server and reverse proxy written in C. It handles several tasks more efficiently than Node.js:

1. SSL/TLS termination: nginx handles HTTPS encryption/decryption, freeing Node.js from this CPU-intensive work.
2. Static file serving: nginx serves images, CSS, and JS directly from disk using sendfile — zero Node.js involvement.
3. Reverse proxying: nginx forwards API requests to Node.js and passes back responses.
4. Load balancing: nginx distributes requests across multiple Node.js processes (PM2 cluster).
5. Compression: nginx can gzip responses, reducing bandwidth.
6. Security: nginx adds a layer between the open internet and your Node.js process, blocking malicious requests.

Without nginx, Node.js handles all of this itself — wasting event loop cycles on tasks it is not optimized for.`,code:`server {
    listen 443 ssl;
    server_name api.example.com;

    ssl_certificate /etc/letsencrypt/...;

    location /static/ {
        alias /var/www/static/;   # nginx serves static files
        expires 30d;
    }

    location / {
        proxy_pass http://localhost:3000;  # proxy to Node.js
        proxy_set_header Host $host;
    }
}`},{q:"Explain CI/CD and why it matters.",level:"Junior",color:l.green,a:`CI/CD stands for Continuous Integration / Continuous Deployment.

Continuous Integration means every time a developer pushes code, automated tests run automatically. If tests fail, the developer is notified immediately. This catches bugs early before they reach production.

Continuous Deployment means every passing build is automatically deployed to production. No manual SSH, no git pull, no human steps. The pipeline handles everything.

Why it matters:
1. Speed: Deploy multiple times per day instead of once per week.
2. Safety: Automated tests act as a safety net. Bad code never reaches production.
3. Consistency: Every deployment follows the exact same steps. No human error.
4. Rollback: If a deployment breaks, rollback to the previous version in seconds.

Tools: GitHub Actions, GitLab CI, CircleCI, Jenkins, Travis CI.`,code:`.github/workflows/deploy.yml

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: ssh server "cd /app && git pull && pm2 reload api"`},{q:"What is a health check and why is it important?",level:"Mid",color:"#3b82f6",a:`A health check is an endpoint (usually /health) that reports whether an application and its dependencies are functioning correctly.

A good health check verifies:
1. The application process is running
2. The database is reachable and responding
3. The cache (Redis) is accessible
4. Critical external services are available

Why it is important:
- Load balancers use health checks to route traffic only to healthy servers
- Container orchestrators (Kubernetes) restart unhealthy containers
- Monitoring systems alert when health checks fail
- Deployment pipelines verify the new version is healthy before completing

A health check that only returns 200 OK without checking dependencies is dangerous — it tells the load balancer the server is fine when it might be unable to serve requests.`,code:`app.get('/health', async (req, res) => {
  const dbHealthy = await checkDatabase();
  const redisHealthy = await checkRedis();
  const healthy = dbHealthy && redisHealthy;
  
  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'ok' : 'degraded',
    database: dbHealthy,
    redis: redisHealthy,
    uptime: process.uptime()
  });
});`},{q:"What is the difference between blue-green and canary deployment?",level:"Senior",color:"#8b5cf6",a:`Blue-green deployment maintains two identical production environments: Blue (currently live) and Green (idle). You deploy the new version to Green, run smoke tests, then instantly switch all traffic from Blue to Green. If something breaks, you switch back to Blue instantly.

Pros: Zero downtime, instant rollback, simple.
Cons: Requires double the infrastructure (two full environments).

Canary deployment rolls out the new version to a small percentage of users first — say 5%. You monitor error rates and performance metrics. If everything looks good, you gradually increase to 25%, 50%, and finally 100%. If errors spike at 5%, you roll back only that small group.

Pros: Minimal risk, real-user validation at small scale, no need for double infrastructure.
Cons: More complex to implement, requires sophisticated monitoring and traffic routing.

Blue-green is simpler and better for smaller teams. Canary is safer and better for large-scale applications with millions of users.`,code:`// Blue-green: switch traffic instantly
// Load balancer config
upstream backend {
    server green:3000;  // switch from blue to green
}

// Canary: route 5% of users to new version
if ($cookie_canary = "1") {
    proxy_pass http://new-version:3000;
}
proxy_pass http://old-version:3000;`}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"These questions cover Docker, PM2, nginx, CI/CD, and production monitoring. Know these for any backend or DevOps interview."}),s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:7},children:r.map((n,o)=>s.jsxs("div",{style:{border:`1px solid ${e===o?n.color+"55":l.outline}`,borderRadius:9,overflow:"hidden",transition:"border-color 0.2s"},children:[s.jsxs("button",{onClick:()=>t(e===o?null:o),style:{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"11px 14px",background:e===o?n.color+"0d":"transparent",border:"none",cursor:"pointer",textAlign:"left"},children:[s.jsx("span",{style:{fontSize:9,padding:"2px 6px",background:n.color+"22",border:`1px solid ${n.color}44`,borderRadius:3,color:n.color,fontFamily:m,fontWeight:700,flexShrink:0},children:n.level}),s.jsx("span",{style:{fontSize:12,color:e===o?n.color:l.text,fontFamily:D,flex:1,lineHeight:1.4},children:n.q}),s.jsx("span",{style:{color:n.color,fontSize:13,flexShrink:0},children:e===o?"▲":"▼"})]}),e===o&&s.jsxs("div",{style:{padding:"0 14px 14px",borderTop:`1px solid ${n.color}22`},children:[s.jsx("pre",{style:{margin:"10px 0 0",fontSize:12,color:l.muted,fontFamily:D,lineHeight:1.9,whiteSpace:"pre-wrap",wordBreak:"break-word"},children:n.a}),s.jsx(g,{label:"code",code:n.code})]})]},o))})]})}function Lf(){const[e,t]=N.useState(0),[r,n]=N.useState(!1),o=[{label:"Writing code with a typo",js:`const user = { name: 'Alice' };
console.log(user.nmae);`,ts:`const user = { name: 'Alice' };
console.log(user.nmae);
// ❌ Property 'nmae' does not exist on type`,type:"js",result:"error"},{label:"JavaScript runtime error",js:`undefined
// Runtime crash at line 2`,ts:"",type:"js-only",result:"runtime"},{label:"TypeScript compile-time catch",js:"",ts:`Property 'nmae' does not exist.
Did you mean 'name'?

// Fixed before deployment ✅`,type:"ts-only",result:"compile"},{label:"TypeScript with correct code",js:"",ts:`const user = { name: 'Alice' };
console.log(user.name);
// ✅ Compiles successfully`,type:"ts-only",result:"success"}],i=async()=>{n(!0),t(0);for(let a=1;a<=o.length;a++)await new Promise(c=>setTimeout(c,900)),t(a);n(!1)};return s.jsxs("div",{style:{padding:14,background:l.surfaceLowest,border:`1px solid ${l.outline}`,borderRadius:10},children:[s.jsx("div",{style:{fontSize:10,color:l.muted,fontFamily:m,letterSpacing:1,marginBottom:10},children:"🧪 LIVE — see TypeScript catch bugs before runtime"}),s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:6,marginBottom:12},children:o.map((a,c)=>s.jsxs("div",{style:{display:"flex",gap:10,padding:"8px 12px",background:e>c?a.result==="error"||a.result==="runtime"?l.red+"08":a.result==="compile"?l.yellow+"08":l.greenBg:l.surface,border:`1px solid ${e>=c?(a.result==="error"||a.result==="runtime"?l.red:a.result==="compile"?l.yellow:l.green)+"40":l.outline}`,borderRadius:7,transition:"all 0.4s",opacity:e>=c?1:.4},children:[s.jsx("span",{style:{fontSize:14,flexShrink:0,marginTop:2},children:e>c?a.result==="error"||a.result==="runtime"?"❌":a.result==="compile"?"⚠️":"✅":e===c?"⏳":"○"}),s.jsxs("div",{style:{flex:1},children:[s.jsx("div",{style:{fontSize:11,color:e>=c?a.result==="error"||a.result==="runtime"?l.red:a.result==="compile"?l.yellow:l.greenText:l.muted,fontFamily:m,fontWeight:e===c?700:400,marginBottom:4},children:a.label}),e>=c&&s.jsx("pre",{style:{margin:0,fontSize:10,lineHeight:1.7,color:l.muted,fontFamily:m,whiteSpace:"pre-wrap"},children:a.js||a.ts})]})]},c))}),s.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[s.jsx("button",{onClick:i,disabled:r,style:{padding:"6px 16px",background:r?l.muted+"18":l.greenBg,border:`1px solid ${r?l.outline:l.green}`,color:r?l.muted:l.greenText,borderRadius:5,cursor:r?"default":"pointer",fontSize:11,fontFamily:m},children:r?"● checking...":"▶ See TypeScript in action"}),s.jsx("span",{style:{fontSize:10,color:l.muted,fontFamily:m},children:e===0?"TypeScript catches typos at compile time":e>=o.length?"Bug prevented before deployment! ✅":`step ${e} of ${o.length}`})]})]})}function Of(){const[e,t]=N.useState("story"),r=[{id:"story",label:"📖 The Story"},{id:"why",label:"🎯 Why TypeScript?"},{id:"demo",label:"🧪 Live Demo"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"TypeScript is JavaScript with types. It compiles to plain JavaScript but catches bugs at compile time — before your code ever runs."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#3b82f622":"transparent",border:`1px solid ${e===n.id?"#3b82f6":l.outline}`,color:e===n.id?"#3b82f6":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="story"&&s.jsxs("div",{children:[s.jsx(L,{number:"1",title:"JavaScript is dynamically typed",color:"#f59e0b",children:"In JavaScript, a variable can hold a string, then a number, then an object, all in the same function. This flexibility is powerful but dangerous. A typo like `user.nmae` does not fail until runtime — when a real user is trying to log in."}),s.jsx(L,{number:"2",title:"Microsoft created TypeScript in 2012",color:"#3b82f6",children:"Anders Hejlsberg, the creator of C#, led the TypeScript team at Microsoft. Their goal: bring static types to JavaScript without changing how it runs. TypeScript is a superset of JavaScript — every valid JS file is valid TS. The compiler simply strips types and outputs plain JS."}),s.jsx(L,{number:"3",title:"TypeScript is now the industry standard",color:l.green,children:"In 2024, TypeScript is the #3 most popular language on GitHub. Virtually every major framework (React, Vue, Angular, Next.js, NestJS) recommends or requires TypeScript. Job postings for Node.js developers almost always list TypeScript as a requirement."}),s.jsxs(M,{emoji:"🎯",title:"One sentence",color:"#3b82f6",children:[s.jsx("strong",{children:"TypeScript is a type layer on top of JavaScript"})," that catches bugs at compile time, enables precise autocomplete, and makes refactoring safe. It compiles to plain JavaScript and runs everywhere JS runs."]})]}),e==="why"&&s.jsxs("div",{children:[s.jsx("div",{style:{overflowX:"auto",marginBottom:14},children:s.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontFamily:m,fontSize:11},children:[s.jsx("thead",{children:s.jsx("tr",{children:["","JavaScript","TypeScript"].map((n,o)=>s.jsx("th",{style:{padding:"9px 12px",background:l.surface,color:[l.muted,"#f59e0b","#3b82f6"][o],textAlign:"left",borderBottom:`1px solid ${l.outline}`,fontSize:10},children:n},o))})}),s.jsx("tbody",{children:[["Typos","Runtime crash","Compile-time error"],["Refactoring","Scary — find broken references manually","Safe — TS shows every broken reference"],["Autocomplete","Guesswork based on usage","Precise — knows every property and method"],["Documentation","Comments that go stale","Types that are always correct"],["Team scaling","Hard for new developers","Easy — types act as documentation"],["Bug catching","At runtime (user sees it)","At compile time (developer fixes it)"]].map((n,o)=>s.jsx("tr",{style:{background:o%2===0?"transparent":l.surface+"06"},children:n.map((i,a)=>s.jsx("td",{style:{padding:"8px 12px",borderBottom:`1px solid ${l.outline}`,color:a===0?l.text:l.muted},children:i},a))},o))})]})}),s.jsx(z,{icon:"🎯",color:l.yellow,title:"When NOT to use TypeScript",children:"For tiny scripts, one-off tools, or rapid prototyping where speed matters more than correctness, plain JavaScript is fine. For production applications, APIs, and team projects, TypeScript pays for itself within days."})]}),e==="demo"&&s.jsx(Lf,{}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"What does TypeScript compile to?",options:["Java bytecode","Plain JavaScript","WebAssembly","Python"],correct:1,explain:"The TypeScript compiler (tsc) strips all type annotations and outputs plain JavaScript. TypeScript is a compile-time layer — it does not exist at runtime."}),s.jsx(b,{question:"When does TypeScript catch a typo like user.nmae?",options:["At runtime","At compile time","When the user reports it","Never"],correct:1,explain:"TypeScript analyzes your code during compilation and reports 'Property nmae does not exist on type { name: string }'. You fix it before deployment."}),s.jsx(b,{question:"Is every valid JavaScript file also valid TypeScript?",options:["No — TS is a different language","Yes — TS is a superset of JS","Only if you add types","Only for ES6+ code"],correct:1,explain:"TypeScript is a superset of JavaScript. Any valid .js file is also valid .ts (though TS may warn about implicit any types). You can adopt TS incrementally."})]})]})}function Df(){const[e,t]=N.useState("primitives"),r=[{id:"primitives",label:"📦 Primitives"},{id:"advanced",label:"🔀 Unions & Literals"},{id:"inference",label:"🧠 Inference"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"TypeScript's type system starts simple and grows with your needs. Master the basics and everything else follows."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#8b5cf622":"transparent",border:`1px solid ${e===n.id?"#3b82f6":l.outline}`,color:e===n.id?"#3b82f6":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="primitives"&&s.jsxs("div",{children:[s.jsx(g,{label:"primitive types",code:`// Basic types
const name: string = "Alice";
const age: number = 30;
const isAdmin: boolean = false;

// Arrays
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["Alice", "Bob"];

// Objects
const user: { name: string; age: number } = {
  name: "Alice",
  age: 30
};

// Functions
function add(a: number, b: number): number {
  return a + b;
}

// Void (no return value)
function log(message: string): void {
  console.log(message);
}`}),s.jsx(z,{icon:"💡",color:l.yellow,title:"Type inference",children:'TypeScript can infer types when you initialize a variable: `const name = "Alice"` automatically gets type `string`. You only need explicit types for function parameters and empty declarations.'})]}),e==="advanced"&&s.jsxs("div",{children:[s.jsx(g,{label:"unions, intersections, literals",code:`// Union — value can be one of several types
let id: string | number = "abc123";
id = 123; // also valid

// Literal — value must be exactly this string
type Status = "pending" | "active" | "inactive";
const status: Status = "active";
// status = "deleted"; // ❌ Error!

// Intersection — combine types
type Employee = { name: string } & { employeeId: number };
const emp: Employee = { name: "Alice", employeeId: 42 };

// Nullable
let maybeName: string | null = null;
maybeName = "Alice";

// Any — escape hatch (avoid when possible)
let anything: any = 4;
anything = "string";
anything = {};`}),s.jsx(M,{emoji:"⚠️",title:"Avoid any",color:l.red,children:"`any` disables type checking for that variable. It is contagious — once you use `any`, TypeScript cannot check anything that touches it. Use `unknown` when you genuinely don't know the type, then narrow it with type guards."})]}),e==="inference"&&s.jsxs("div",{children:[s.jsx(g,{label:"type inference in action",code:`// TS infers: string
const name = "Alice";

// TS infers: number
const count = 42;

// TS infers: { name: string; age: number }
const user = { name: "Alice", age: 30 };

// TS infers: (a: number, b: number) => number
const add = (a: number, b: number) => a + b;

// TS infers: string[]
const names = ["Alice", "Bob"];

// TS infers the return type from the return statement
function getUser() {
  return { id: 1, name: "Alice" };
}
// Return type is automatically: { id: number; name: string }`}),s.jsx(z,{icon:"🎯",color:l.yellow,title:"When to add explicit types",children:"Add explicit types for: function parameters, public API exports, complex return types, and places where inference would give `any`. For local variables, let inference do the work."})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"What is a union type?",options:["A type that combines two objects","A type that can be one of several types","A type that is always null","A type for arrays only"],correct:1,explain:"A union type uses the | operator: string | number means the value can be either a string or a number."}),s.jsx(b,{question:"What is the difference between any and unknown?",options:["They are the same","unknown requires type narrowing before use","any is for objects, unknown is for primitives","unknown is faster"],correct:1,explain:"any disables all type checking. unknown also accepts any value but requires you to narrow the type (with typeof, instanceof, or type guards) before using it."}),s.jsx(b,{question:"What does TypeScript infer for const x = [1, 2, 3]?",options:["any[]","number[]","Array&lt;any&gt;","It requires an explicit type"],correct:1,explain:"TypeScript infers number[] because all elements are numbers. If you mix types like [1, 'hello'], it infers (number | string)[]."})]})]})}function Mf(){const[e,t]=N.useState("interface"),r=[{id:"interface",label:"📐 Interface"},{id:"vs-type",label:"⚖️ Interface vs Type"},{id:"extending",label:"🔗 Extending"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"Interfaces define the shape of objects. They are the foundation of type-safe code in TypeScript."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#14b8a622":"transparent",border:`1px solid ${e===n.id?"#14b8a6":l.outline}`,color:e===n.id?"#14b8a6":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="interface"&&s.jsxs("div",{children:[s.jsx(g,{label:"interface basics",code:`interface User {
  id: number;
  name: string;
  email: string;
  age?: number;              // optional
  readonly createdAt: Date;  // immutable after creation
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  createdAt: new Date()
};

// ❌ Error: cannot assign to readonly property
user.createdAt = new Date();

// ✅ Allowed: optional property can be omitted
const user2: User = {
  id: 2,
  name: "Bob",
  email: "bob@example.com",
  createdAt: new Date()
};`}),s.jsx(z,{icon:"🔒",color:l.yellow,title:"readonly",children:"Use `readonly` for properties that should never change after creation. This prevents accidental mutations and makes your code more predictable. It only affects the property assignment — it does not make nested objects immutable."})]}),e==="vs-type"&&s.jsxs("div",{children:[s.jsx(g,{label:"interface vs type alias",code:`// Interface
interface User {
  name: string;
}

// Type alias
type UserType = {
  name: string;
};

// Key differences:
// 1. Interface can be extended with 'extends'
// 2. Interface can be reopened (declaration merging)
// 3. Type can use unions, intersections, mapped types

// Declaration merging — interfaces only!
interface User {
  age: number;  // Adds age to the existing User interface
}`}),s.jsx("div",{style:{overflowX:"auto",marginBottom:14},children:s.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontFamily:m,fontSize:11},children:[s.jsx("thead",{children:s.jsx("tr",{children:["Feature","Interface","Type"].map((n,o)=>s.jsx("th",{style:{padding:"9px 12px",background:l.surface,color:[l.muted,"#14b8a6","#f59e0b"][o],textAlign:"left",borderBottom:`1px solid ${l.outline}`,fontSize:10},children:n},o))})}),s.jsx("tbody",{children:[["Declaration merging","✅ Yes","❌ No"],["extends","✅ Yes","❌ (use & instead)"],["Union types","❌ No","✅ Yes"],["Mapped types","❌ No","✅ Yes"],["Best for","Objects, classes, OOP","Unions, tuples, complex types"]].map((n,o)=>s.jsx("tr",{style:{background:o%2===0?"transparent":l.surface+"06"},children:n.map((i,a)=>s.jsx("td",{style:{padding:"8px 12px",borderBottom:`1px solid ${l.outline}`,color:a===0?l.text:l.muted},children:i},a))},o))})]})}),s.jsx(z,{icon:"🎯",color:l.yellow,title:"Simple rule",children:"Use `interface` for objects and class shapes. Use `type` for unions, tuples, and when you need mapped types. In modern TS, either works for most cases — consistency matters more than the choice."})]}),e==="extending"&&s.jsxs("div",{children:[s.jsx(g,{label:"extending interfaces",code:`interface User {
  id: number;
  name: string;
  email: string;
}

interface Admin extends User {
  role: "admin";
  permissions: string[];
}

const admin: Admin = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  role: "admin",
  permissions: ["users:read", "users:write"]
};

// Multiple inheritance
interface SuperAdmin extends Admin, Employee {
  superPower: boolean;
}`}),s.jsx(g,{label:"utility types",code:`// Make all properties optional
const partialUser: Partial<User> = { name: "Alice" };

// Make all properties required
const fullUser: Required<User> = { id: 1, name: "Alice", email: "a@b.com", age: 30 };

// Pick only specific properties
const userPreview: Pick<User, "id" | "name"> = { id: 1, name: "Alice" };

// Omit specific properties
const userWithoutEmail: Omit<User, "email"> = { id: 1, name: "Alice" };

// Extract the type of a property
type UserName = User["name"]; // string`}),s.jsx(M,{emoji:"✨",title:"Utility types save time",color:"#14b8a6",children:"Partial, Required, Pick, Omit, Record, and ReturnType are built into TypeScript. They let you derive new types from existing ones without repeating yourself. Learn them well."})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"What does the ? symbol mean in an interface?",options:["The property is required","The property is optional","The property is readonly","The property is private"],correct:1,explain:"The ? mark makes a property optional. Objects of that interface can include or omit the property without causing a type error."}),s.jsx(b,{question:"Which feature is unique to interfaces (not available with type)?",options:["Union types","Declaration merging","Intersection types","Mapped types"],correct:1,explain:"Interfaces support declaration merging — you can define the same interface multiple times and TypeScript merges them. Type aliases do not support this."}),s.jsx(b,{question:"What does Omit<User, 'email'> do?",options:["Keeps only the email property","Removes the email property from the type","Makes email optional","Makes email readonly"],correct:1,explain:"Omit creates a new type with all properties EXCEPT the specified ones. Omit<User, 'email'> produces a type with every User property except email."})]})]})}function Ff(){const[e,t]=N.useState("functions"),r=[{id:"functions",label:"⚙️ Functions"},{id:"constraints",label:"🔗 Constraints"},{id:"interfaces",label:"📐 Interfaces"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"Generics let you write reusable code that works with multiple types while preserving type safety. They are one of TypeScript's most powerful features."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#8b5cf622":"transparent",border:`1px solid ${e===n.id?"#8b5cf6":l.outline}`,color:e===n.id?"#8b5cf6":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="functions"&&s.jsxs("div",{children:[s.jsx(g,{label:"generic function",code:`// Without generics — duplicates code
function wrapNumber(value: number): number[] {
  return [value];
}
function wrapString(value: string): string[] {
  return [value];
}

// With generics — one function, any type
function wrap<T>(value: T): T[] {
  return [value];
}

const nums = wrap<number>(42);      // number[]
const strs = wrap<string>("hello"); // string[]

// TypeScript can even infer the type
const inferred = wrap(true);        // boolean[]`}),s.jsx(L,{number:"1",title:"Generics preserve type information",color:"#8b5cf6",children:'Without generics, you would use `any` and lose all type safety. With generics, TypeScript knows that `wrap(42)` returns `number[]` and `wrap("hello")` returns `string[]`. The type flows through the function.'})]}),e==="constraints"&&s.jsxs("div",{children:[s.jsx(g,{label:"generic constraints",code:`// Constrain T to objects with a length property
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

getLength("hello");     // ✅ string has length
getLength([1, 2, 3]);  // ✅ array has length
// getLength(42);       // ❌ number has no length

// Multiple constraints
function logAndReturn<T extends { toString(): string }>(value: T): T {
  console.log(value.toString());
  return value;
}`}),s.jsx(z,{icon:"🎯",color:l.yellow,title:"extends is your friend",children:"Use `extends` to constrain generics to types that have certain properties or methods. This gives you both flexibility (works with any matching type) and safety (rejects invalid types at compile time)."})]}),e==="interfaces"&&s.jsxs("div",{children:[s.jsx(g,{label:"generic interfaces",code:`interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Usage with User
interface User {
  id: number;
  name: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Alice" },
  status: 200,
  message: "OK"
};

// Usage with array
const listResponse: ApiResponse<User[]> = {
  data: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }],
  status: 200,
  message: "OK"
};

// Generic class
class Repository<T> {
  private items: T[] = [];
  
  add(item: T): void {
    this.items.push(item);
  }
  
  findById(id: number): T | undefined {
    return this.items.find((item: any) => item.id === id);
  }
}`}),s.jsx(M,{emoji:"🎯",title:"Real-world pattern",color:"#8b5cf6",children:"`ApiResponse<T>` is used in virtually every TypeScript API client. One interface handles all endpoints — users, posts, orders — while keeping every response fully typed."})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"What do generics allow you to do?",options:["Make code run faster","Write reusable code that preserves type safety","Replace interfaces entirely","Disable type checking"],correct:1,explain:"Generics let you write functions, interfaces, and classes that work with multiple types while preserving type information. No need for any."}),s.jsx(b,{question:"What does T extends { length: number } mean?",options:["T must be a number","T must have a length property","T must be an array","T must be a string"],correct:1,explain:"extends constrains the generic type. T must be a type that has a length property — this includes strings, arrays, and any custom object with length."}),s.jsx(b,{question:"What is the type of const x = wrap(42) if wrap is generic?",options:["any","number[]","unknown","It requires an explicit type"],correct:1,explain:"TypeScript infers the generic type from the argument. wrap(42) infers T as number, so the return type is number[]."})]})]})}function Wf(){const[e,t]=N.useState("config"),r=[{id:"config",label:"⚙️ tsconfig.json"},{id:"strict",label:"🔒 Strict Mode"},{id:"setup",label:"🚀 Project Setup"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"tsconfig.json controls how TypeScript compiles your code. A good configuration catches more bugs and produces cleaner output."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#f59e0b22":"transparent",border:`1px solid ${e===n.id?"#f59e0b":l.outline}`,color:e===n.id?"#f59e0b":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="config"&&s.jsxs("div",{children:[s.jsx(g,{label:"recommended tsconfig.json",code:`{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`}),s.jsx(L,{number:"1",title:"target vs module",color:"#f59e0b",children:"`target` is the JavaScript version TypeScript compiles TO. `module` is the module system it uses. For Node.js: target ES2022, module commonjs. For modern bundlers: target ES2022, module ESNext."}),s.jsx(z,{icon:"💡",color:l.yellow,title:"outDir and rootDir",children:"`rootDir: ./src` tells TS where your source files live. `outDir: ./dist` tells TS where to put compiled JS. Always separate source and compiled code."})]}),e==="strict"&&s.jsxs("div",{children:[s.jsx(g,{label:"what strict mode enables",code:`"strict": true  // Enables ALL of these:

// noImplicitAny — must type all parameters
function greet(name) { }        // ❌ Implicit any
function greet(name: string) { } // ✅

// strictNullChecks — null/undefined are separate types
const user: User = null;        // ❌
const user: User | null = null; // ✅

// strictFunctionTypes — function params checked strictly
type Fn = (x: string | number) => void;
const f: Fn = (x: string) => { }; // ❌ under strict

// noImplicitReturns — all paths must return
function getId(): number {
  if (Math.random() > 0.5) return 1;
  // ❌ Missing return on else branch
}`}),s.jsx(M,{emoji:"🔒",title:"Always enable strict mode",color:l.red,children:"Disabling strict mode defeats the purpose of TypeScript. It allows `any` everywhere, ignores null checks, and lets function type mismatches slide. Enable strict from day one — the initial friction is worth the bugs you prevent."})]}),e==="setup"&&s.jsxs("div",{children:[s.jsx(g,{label:"setup a TypeScript Node project",code:`# 1. Initialize project
npm init -y

# 2. Install TypeScript
npm install -D typescript @types/node

# 3. Generate tsconfig
npx tsc --init

# 4. Install runtime dependencies
npm install express
npm install -D @types/express

# 5. Add scripts to package.json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "start": "node dist/server.js"
  }
}`}),s.jsx(z,{icon:"🎯",color:l.yellow,title:"@types packages",children:"JavaScript libraries ship without TypeScript definitions. `@types/express`, `@types/node`, and `@types/pg` provide those definitions. Always install them when using TS with JS libraries."})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"What does strict: true do?",options:["Makes compilation faster","Enables all strict type-checking options","Disables type checking","Adds runtime type checks"],correct:1,explain:"strict: true enables noImplicitAny, strictNullChecks, strictFunctionTypes, and other strict options. It makes TypeScript catch significantly more bugs."}),s.jsx(b,{question:"What is the purpose of @types/node?",options:["It installs Node.js","It provides TypeScript definitions for Node.js built-ins","It replaces tsconfig.json","It compiles TypeScript"],correct:1,explain:"@types packages provide TypeScript type definitions for JavaScript libraries. @types/node defines types for fs, http, path, process, and other Node.js built-in modules."}),s.jsx(b,{question:"What is the difference between target and module in tsconfig?",options:["They are the same","target is JS version; module is module system","target is for frontend; module is for backend","target compiles faster"],correct:1,explain:"target controls which JavaScript version TS compiles to (ES2022, ES2015). module controls the module system (commonjs, ESNext, UMD)."})]})]})}function _f(){const[e,t]=N.useState("zod"),r=[{id:"zod",label:"🔷 Zod"},{id:"express",label:"🌐 Express + TS"},{id:"pattern",label:"📐 Patterns"},{id:"quiz",label:"🧠 Quiz"}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"Type-safe APIs combine TypeScript's compile-time safety with runtime validation. The result: APIs that are correct by design and protected against bad input."}),s.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14},children:r.map(n=>s.jsx("button",{onClick:()=>t(n.id),style:{padding:"5px 12px",fontSize:11,fontFamily:m,background:e===n.id?"#06b6d422":"transparent",border:`1px solid ${e===n.id?"#06b6d4":l.outline}`,color:e===n.id?"#06b6d4":l.muted,borderRadius:5,cursor:"pointer"},children:n.label},n.id))}),e==="zod"&&s.jsxs("div",{children:[s.jsx(g,{label:"runtime validation with Zod",code:`import { z } from "zod";

// Define schema
const CreateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  age: z.number().min(0).max(150).optional(),
  role: z.enum(["user", "admin"]).default("user")
});

// Infer TypeScript type from schema
type CreateUserInput = z.infer<typeof CreateUserSchema>;
// { name: string; email: string; age?: number; role: "user" | "admin" }

// Validate at runtime
const result = CreateUserSchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({
    errors: result.error.issues
  });
}
const user: CreateUserInput = result.data;`}),s.jsxs(L,{number:"1",title:"Zod bridges the type gap",color:"#06b6d4",children:["TypeScript types disappear at runtime. A malicious client can send ","{ name: 123 }"," and TypeScript cannot stop it. Zod validates the actual runtime data AND generates the TypeScript type. One source of truth, two guarantees."]}),s.jsx(z,{icon:"🎯",color:l.yellow,title:"Install Zod",children:"`npm install zod`. It has zero dependencies and works with any TypeScript project. Combine it with `z.infer` to get automatic type generation."})]}),e==="express"&&s.jsxs("div",{children:[s.jsx(g,{label:"type-safe Express handler",code:`import { Request, Response } from "express";
import { z } from "zod";

const UpdateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional()
}).refine(data => data.name || data.email, {
  message: "At least one field required"
});

type UpdateUserInput = z.infer<typeof UpdateUserSchema>;

app.put("/users/:id", async (req: Request, res: Response) => {
  const parseResult = UpdateUserSchema.safeParse(req.body);
  
  if (!parseResult.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: parseResult.error.flatten()
    });
  }
  
  const data: UpdateUserInput = parseResult.data;
  // data is fully typed — autocomplete works!
  
  const user = await prisma.user.update({
    where: { id: parseInt(req.params.id) },
    data
  });
  
  res.json({ data: user });
});`}),s.jsx(M,{emoji:"✨",title:"Full-stack type safety",color:"#06b6d4",children:"With Zod + Prisma + TypeScript, your API is type-safe from the database to the HTTP response. Change a schema field? TypeScript catches every broken reference in your handlers, tests, and frontend code."})]}),e==="pattern"&&s.jsxs("div",{children:[s.jsx(g,{label:"validated request wrapper",code:`// middleware/validate.ts
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "Invalid input",
        issues: result.error.issues
      });
    }
    req.body = result.data; // replace with validated data
    next();
  };
};

// Usage in routes
import { validate } from "./middleware/validate";

app.post("/users",
  validate(CreateUserSchema),
  async (req: Request, res: Response) => {
    // req.body is guaranteed to match CreateUserInput
    const user = await prisma.user.create({ data: req.body });
    res.status(201).json({ data: user });
  }
);`}),s.jsx(z,{icon:"🎯",color:l.yellow,title:"DRY validation",children:"Create a `validate` middleware once, reuse it on every route. No more copying validation logic. No more untyped req.body. Every endpoint gets automatic validation and type inference."})]}),e==="quiz"&&s.jsxs("div",{children:[s.jsx(b,{question:"Why use Zod when TypeScript already has types?",options:["Zod is faster","TypeScript types disappear at runtime; Zod validates actual data","Zod replaces TypeScript","Zod is required by Express"],correct:1,explain:"TypeScript types are erased during compilation. Zod validates the actual runtime data that clients send. Without Zod, a malicious client can bypass TypeScript's compile-time checks."}),s.jsx(b,{question:"What does z.infer do?",options:["It runs validation","It extracts a TypeScript type from a Zod schema","It compiles TypeScript","It creates a database table"],correct:1,explain:"z.infer<typeof Schema> generates a TypeScript type from a Zod schema. One schema serves as both runtime validator and compile-time type definition."}),s.jsx(b,{question:"What is the benefit of a validate middleware?",options:["It makes code shorter","It centralizes validation logic and guarantees typed req.body","It replaces the need for tests","It handles authentication"],correct:1,explain:"A validate middleware reuses the same validation pattern across all routes. It keeps route handlers clean and ensures req.body is always validated and correctly typed."})]})]})}function Bf(){const e=[{title:"TypeScript Basics",color:"#3b82f6",icon:"🔷",kills:["TypeScript is a superset of JavaScript that adds static types.","TS compiles to plain JS — types are erased at runtime.","Type inference means TS often guesses types without explicit annotations.","any disables type checking — avoid it. Use unknown instead.","strict: true enables all strict checking options — always use it.","@types packages provide TS definitions for JS libraries."]},{title:"Types",color:"#3b82f6",icon:"📦",kills:["Primitives: string, number, boolean, null, undefined, symbol, bigint.","Arrays: number[] or Array&lt;number&gt;.","Objects: { name: string; age: number }.","Unions: string | number means either type.","Literals: 'pending' | 'active' restricts to exact values.","Intersections: A & B combines two types.","Functions: (a: number, b: number) => number."]},{title:"Interfaces",color:"#14b8a6",icon:"📐",kills:["Interface defines the shape of an object.","? makes properties optional. readonly prevents reassignment.","Interface supports declaration merging. Type alias does not.","extends creates inheritance: interface Admin extends User.","Pick, Omit, Partial, Required are built-in utility types.","Use interface for objects and classes. Use type for unions and mapped types."]},{title:"Generics",color:"#8b5cf6",icon:"⚙️",kills:["Generics create reusable components that work with multiple types.","function wrap&lt;T&gt;(value: T): T[] preserves type information.","Constraints: T extends { length: number } limits valid types.","Generic interfaces: ApiResponse&lt;T&gt; works with any data shape.","Inference: wrap(42) automatically infers T as number.","Generics avoid any while keeping code reusable."]},{title:"tsconfig",color:"#f59e0b",icon:"⚙️",kills:["target: JS version to compile to. module: module system to use.","outDir: where compiled JS goes. rootDir: where TS source lives.","strict: true is essential — never disable it in production code.","esModuleInterop allows importing CommonJS modules cleanly.","skipLibCheck speeds up compilation by skipping .d.ts checks.","declaration: true generates .d.ts files for library consumers."]},{title:"Type-Safe APIs",color:"#06b6d4",icon:"🌐",kills:["Zod validates runtime data AND generates TypeScript types.","z.infer&lt;typeof Schema&gt; extracts the TS type from a schema.","TypeScript types disappear at runtime — always validate input.","Create a validate middleware to centralize route validation.","Combine Zod + Prisma + TS for full-stack type safety.","Never trust req.body — validate it before processing."]}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"The precise facts that matter most — for writing type-safe code, for refactoring, for interviews."}),s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:e.map(t=>s.jsxs("div",{style:{border:`1px solid ${t.color}33`,borderRadius:10,overflow:"hidden"},children:[s.jsxs("div",{style:{padding:"10px 14px",background:t.color+"0d",borderBottom:`1px solid ${t.color}22`,display:"flex",alignItems:"center",gap:8},children:[s.jsx("span",{style:{fontSize:16},children:t.icon}),s.jsx("span",{style:{fontSize:13,fontWeight:900,color:t.color,fontFamily:m},children:t.title})]}),s.jsx("div",{style:{padding:"10px 14px",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:6},children:t.kills.map((r,n)=>s.jsxs("div",{style:{display:"flex",gap:8},children:[s.jsx("span",{style:{color:t.color,fontSize:10,marginTop:3,flexShrink:0},children:"▸"}),s.jsx("span",{style:{fontSize:11,color:l.muted,lineHeight:1.65,fontFamily:D},children:r})]},n))})]},t.title))})]})}function Uf(){const[e,t]=N.useState(null),r=[{q:"What is TypeScript and why use it?",level:"Junior",color:l.green,a:`TypeScript is a superset of JavaScript that adds static type checking. It compiles to plain JavaScript, so it runs anywhere JS runs.

Why use it:
1. Catch bugs at compile time — typos, missing properties, wrong types are caught before deployment.
2. Better autocomplete — editors know exactly what properties and methods are available.
3. Safer refactoring — rename a property and TypeScript shows every file that needs updating.
4. Self-documenting code — types act as documentation that cannot go stale.
5. Team scaling — new developers can understand the codebase faster with types as guides.

Trade-off: Small upfront cost writing types. Massive long-term savings in bugs prevented and developer velocity.`,code:`// JavaScript — bug at runtime
const user = fetchUser();
console.log(user.nmae); // undefined, crash later

// TypeScript — bug at compile time
const user: User = fetchUser();
console.log(user.nmae);
// ❌ Property 'nmae' does not exist on type 'User'
// Did you mean 'name'?`},{q:"What is the difference between interface and type?",level:"Mid",color:"#3b82f6",a:`Both define the shape of objects, but they have different capabilities:

Interface:
- Can be extended with extends
- Supports declaration merging (define the same interface multiple times, TS merges them)
- Best for objects, classes, and OOP patterns
- Slightly better error messages in some cases

Type alias:
- Can define unions (string | number)
- Can define tuples ([string, number])
- Supports mapped types and conditional types
- Best for unions, complex transformations, and one-off types

Simple rule: use interface for objects and classes. Use type for unions and when you need mapped types. In practice, either works for most cases — consistency matters more.`,code:`// Interface — extensible and mergeable
interface User {
  name: string;
}
interface User {
  age: number;  // merged!
}

interface Admin extends User {
  role: "admin";
}

// Type — unions and mapped types
type Status = "pending" | "active" | "inactive";
type UserPreview = Pick<User, "id" | "name">;`},{q:"Explain generics in TypeScript.",level:"Mid",color:"#3b82f6",a:`Generics let you write reusable code that works with multiple types while preserving type safety. They are like type variables — placeholders for types that are specified when the code is used.

Without generics, you would use any and lose type information. With generics, TypeScript knows that identity(42) returns number and identity("hello") returns string.

Key concepts:
1. Generic functions: function wrap<T>(value: T): T[]
2. Generic constraints: T extends { length: number } limits what types are valid
3. Generic interfaces: ApiResponse<T> works with any data shape
4. Inference: TypeScript often guesses the generic type from the argument

Real-world use: API clients, repository patterns, and utility functions.`,code:`// Generic function
function wrap<T>(value: T): T[] {
  return [value];
}

const nums = wrap(42);        // inferred as number[]
const strs = wrap("hello");   // inferred as string[]

// Generic with constraint
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

getLength("hello");     // ✅
getLength([1, 2, 3]);  // ✅
// getLength(42);       // ❌ number has no length

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
}`},{q:"What is the strict mode in tsconfig and why does it matter?",level:"Mid",color:"#3b82f6",a:`"strict": true enables all strict type-checking options in TypeScript. It is the single most important setting in tsconfig.json.

What it enables:
- noImplicitAny: All parameters must be explicitly typed or inferrable. No implicit any.
- strictNullChecks: null and undefined are separate types. You must handle them explicitly.
- strictFunctionTypes: Function parameters are checked more strictly.
- noImplicitReturns: All code paths in a function must return a value.
- strictBindCallApply: bind, call, and apply are type-checked.

Why it matters: Disabling strict mode allows TypeScript to silently fall back to any, bypass null checks, and ignore type mismatches. This defeats the purpose of using TypeScript. The bugs you wanted to catch will slip through.

Recommendation: Enable strict from day one. The initial friction is worth the prevented bugs.`,code:`// With strict: false
function greet(name) { }  // name is implicitly 'any'
const user = null;
user.name;                // no error, crashes at runtime

// With strict: true
function greet(name: string) { }  // must be explicit
const user: User | null = null;
user.name;                        // ❌ user might be null
user?.name;                       // ✅ optional chaining`},{q:"How do you build a type-safe API with TypeScript?",level:"Mid",color:"#3b82f6",a:`A type-safe API has two layers of safety: compile-time (TypeScript types) and runtime (input validation).

1. Define schemas with Zod — Zod describes the shape of request bodies AND generates TypeScript types.
2. Validate every request — Use a validate middleware that checks req.body against the Zod schema.
3. Use typed Express handlers — Import Request and Response types from express.
4. Type your database layer — Prisma generates TypeScript types from your schema.
5. Share types between frontend and backend — Put shared types in a common package or monorepo.

The result: if you rename a field in your database schema, TypeScript immediately shows every broken reference in your API handlers, tests, and frontend code. Bugs are caught before deployment, not by users.`,code:`import { z } from "zod";

const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

type CreateUserInput = z.infer<typeof CreateUserSchema>;

app.post("/users", validate(CreateUserSchema), (req, res) => {
  const data: CreateUserInput = req.body;
  // data is fully typed and validated
});`},{q:"What is the difference between any and unknown?",level:"Junior",color:l.green,a:`any and unknown both accept any value, but they behave very differently:

any disables type checking completely. Once a variable is typed as any, TypeScript lets you do anything with it — call non-existent methods, access non-existent properties, pass it to functions expecting specific types. It is a type safety escape hatch that is contagious — anything that touches any becomes any.

unknown also accepts any value, but TypeScript prevents you from using it until you narrow the type. You cannot call methods, access properties, or pass it to typed functions without first checking what it is.

Rule: Use unknown when you genuinely do not know the type at runtime (API responses, JSON parsing). Then narrow it with typeof, instanceof, or type guards. Never use any in production code.`,code:`const a: any = fetchData();
a.whatever();  // ✅ TypeScript allows this (dangerous!)

const u: unknown = fetchData();
u.whatever();  // ❌ Error: Object is of type 'unknown'

// Narrow before use
if (typeof u === "string") {
  u.toUpperCase();  // ✅ TypeScript knows it's a string
}`}];return s.jsxs("div",{children:[s.jsx("p",{style:P,children:"These questions cover TypeScript fundamentals, generics, strict mode, and type-safe API design. Know these for any modern backend or full-stack interview."}),s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:7},children:r.map((n,o)=>s.jsxs("div",{style:{border:`1px solid ${e===o?n.color+"55":l.outline}`,borderRadius:9,overflow:"hidden",transition:"border-color 0.2s"},children:[s.jsxs("button",{onClick:()=>t(e===o?null:o),style:{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"11px 14px",background:e===o?n.color+"0d":"transparent",border:"none",cursor:"pointer",textAlign:"left"},children:[s.jsx("span",{style:{fontSize:9,padding:"2px 6px",background:n.color+"22",border:`1px solid ${n.color}44`,borderRadius:3,color:n.color,fontFamily:m,fontWeight:700,flexShrink:0},children:n.level}),s.jsx("span",{style:{fontSize:12,color:e===o?n.color:l.text,fontFamily:D,flex:1,lineHeight:1.4},children:n.q}),s.jsx("span",{style:{color:n.color,fontSize:13,flexShrink:0},children:e===o?"▲":"▼"})]}),e===o&&s.jsxs("div",{style:{padding:"0 14px 14px",borderTop:`1px solid ${n.color}22`},children:[s.jsx("pre",{style:{margin:"10px 0 0",fontSize:12,color:l.muted,fontFamily:D,lineHeight:1.9,whiteSpace:"pre-wrap",wordBreak:"break-word"},children:n.a}),s.jsx(g,{label:"code",code:n.code})]})]},o))})]})}const $f=[{id:"what",icon:"🟢",title:"What is Node.js?",color:l.green,render:()=>s.jsx(Up,{})},{id:"eventloop",icon:"🔄",title:"Event Loop",color:"#f59e0b",render:()=>s.jsx($p,{})},{id:"modules",icon:"📦",title:"Modules",color:"#3b82f6",render:()=>s.jsx(Hp,{})},{id:"core",icon:"🔧",title:"Core Modules",color:"#06b6d4",render:()=>s.jsx(Jp,{})},{id:"killnotes",icon:"⚡",title:"Kill Notes",color:"#f59e0b",render:()=>s.jsx(Qp,{})},{id:"cheatsheet",icon:"📋",title:"Cheatsheet",color:"#ec4899",render:()=>s.jsx(Vp,{})},{id:"interview",icon:"🎤",title:"Interview Q&A",color:"#14b8a6",render:()=>s.jsx(Gp,{})}],Hf=[{id:"what-ts",icon:"🔷",title:"What is TypeScript?",color:"#3b82f6",render:()=>s.jsx(Of,{})},{id:"types",icon:"📦",title:"Types & Inference",color:"#3b82f6",render:()=>s.jsx(Df,{})},{id:"interfaces",icon:"📐",title:"Interfaces",color:"#14b8a6",render:()=>s.jsx(Mf,{})},{id:"generics",icon:"⚙️",title:"Generics",color:"#8b5cf6",render:()=>s.jsx(Ff,{})},{id:"tsconfig",icon:"⚙️",title:"tsconfig.json",color:"#f59e0b",render:()=>s.jsx(Wf,{})},{id:"type-safe-api",icon:"🌐",title:"Type-Safe APIs",color:"#06b6d4",render:()=>s.jsx(_f,{})},{id:"killnotes",icon:"⚡",title:"Kill Notes",color:"#f59e0b",render:()=>s.jsx(Bf,{})},{id:"interview",icon:"🎤",title:"Interview Q&A",color:"#ec4899",render:()=>s.jsx(Uf,{})}],Jf=[{id:"node-phase1",title:"Node.js Core Fundamentals",subtitle:"Phase 1 · Deep Dive",description:"Runtime, Event Loop, Modules, Core APIs, Cheatsheets & Interview Prep",icon:"🟢",color:l.green,lessons:7,status:"active",sections:$f},{id:"express",title:"Express.js & Middleware",subtitle:"Phase 2 · Deep Dive",description:"Routing, middleware pattern, error handling, authentication, REST API design",icon:"🚂",color:"#8b5cf6",lessons:8,status:"active",sections:of},{id:"database",title:"Databases & ORMs",subtitle:"Phase 3 · Deep Dive",description:"MongoDB, PostgreSQL, Redis, Prisma, Mongoose, connection pooling",icon:"🗄️",color:"#3b82f6",lessons:8,status:"active",sections:af},{id:"testing",title:"Testing & Debugging",subtitle:"Phase 4 · Deep Dive",description:"Jest, Mocha, Supertest, integration tests, debugging with ndb",icon:"🧪",color:"#f59e0b",lessons:7,status:"active",sections:gf},{id:"deployment",title:"Deployment & DevOps",subtitle:"Phase 5 · Deep Dive",description:"Docker, PM2, nginx, CI/CD, environment management, monitoring",icon:"🚀",color:"#f43f5e",lessons:8,status:"active",sections:Tf},{id:"typescript",title:"TypeScript with Node",subtitle:"Phase 6 · Deep Dive",description:"Type safety, interfaces, generics, tsconfig, type-safe APIs with Zod",icon:"🔷",color:"#06b6d4",lessons:8,status:"active",sections:Hf}];function Qf({onSelectModule:e}){return s.jsxs("div",{style:{minHeight:"100vh",background:l.bg,fontFamily:ar,color:l.text},children:[s.jsxs("div",{style:{padding:"20px 28px",borderBottom:`1px solid ${l.outline}`,background:l.surfaceLowest},children:[s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:6},children:[s.jsx("div",{style:{width:40,height:40,borderRadius:"50%",background:l.greenBg,border:`1px solid ${l.green}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20},children:"🎓"}),s.jsxs("div",{children:[s.jsx("h1",{style:{margin:0,fontSize:"clamp(16px,2.8vw,24px)",fontFamily:ar,fontWeight:800,color:l.text},children:"LearnerModel"}),s.jsx("p",{style:{margin:0,fontSize:11,color:l.muted,fontFamily:m},children:"Full-Stack Learning Dashboard"})]})]}),s.jsx("p",{style:{margin:"8px 0 0",fontSize:13,color:l.muted,fontFamily:D,maxWidth:600,lineHeight:1.7},children:"A structured learning path from zero to production. Each module is built with interactive demos, quizzes, real code examples, and interview prep."})]}),s.jsx("div",{style:{display:"flex",gap:16,padding:"16px 28px",background:l.surface,borderBottom:`1px solid ${l.outline}`,flexWrap:"wrap"},children:[{label:"Active Modules",value:"6",color:l.green},{label:"Total Lessons",value:"46",color:"#3b82f6"},{label:"Quizzes",value:"60+",color:"#f59e0b"},{label:"Live Demos",value:"7",color:"#ec4899"},{label:"Interview Qs",value:"37",color:"#14b8a6"}].map(t=>s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",background:l.surfaceLowest,borderRadius:6},children:[s.jsx("span",{style:{fontSize:16,fontWeight:800,color:t.color,fontFamily:m},children:t.value}),s.jsx("span",{style:{fontSize:10,color:l.muted,fontFamily:m,textTransform:"uppercase",letterSpacing:1},children:t.label})]},t.label))}),s.jsxs("div",{style:{padding:"24px 28px"},children:[s.jsx("h2",{style:{margin:"0 0 16px",fontSize:14,fontWeight:700,color:l.text,fontFamily:ar},children:"Learning Modules"}),s.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:16},children:Jf.map(t=>s.jsxs("button",{onClick:()=>t.status==="active"&&e(t),disabled:t.status!=="active",style:{padding:"20px",background:t.status==="active"?l.surfaceLowest:l.surface,border:`1px solid ${t.status==="active"?t.color+"55":l.outline}`,borderRadius:10,cursor:t.status==="active"?"pointer":"default",textAlign:"left",transition:"all 0.15s ease",opacity:t.status==="active"?1:.6,position:"relative",overflow:"hidden"},onMouseEnter:r=>{t.status==="active"&&(r.currentTarget.style.transform="translateY(-2px)")},onMouseLeave:r=>{r.currentTarget.style.transform="translateY(0)"},children:[s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:10},children:[s.jsx("span",{style:{fontSize:28},children:t.icon}),s.jsxs("div",{style:{flex:1},children:[s.jsx("div",{style:{fontSize:13,fontWeight:700,color:t.status==="active"?t.color:l.muted,fontFamily:m},children:t.title}),s.jsx("div",{style:{fontSize:10,color:l.muted,fontFamily:m,marginTop:2},children:t.subtitle})]}),t.status==="coming"&&s.jsx("span",{style:{fontSize:9,padding:"2px 8px",background:l.outline+"44",color:l.muted,borderRadius:3,fontFamily:m},children:"SOON"}),t.status==="active"&&s.jsx("span",{style:{fontSize:9,padding:"2px 8px",background:t.color+"22",color:t.color,borderRadius:3,fontFamily:m},children:"OPEN"})]}),s.jsx("p",{style:{margin:"0 0 12px",fontSize:12,color:l.muted,fontFamily:D,lineHeight:1.7},children:t.description}),s.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[t.lessons>0&&s.jsxs("span",{style:{fontSize:10,color:l.muted,fontFamily:m},children:[t.lessons," lessons"]}),t.status==="active"&&s.jsx("span",{style:{marginLeft:"auto",fontSize:11,color:t.color,fontWeight:700,fontFamily:m},children:"Start Learning →"})]})]},t.id))})]})]})}function Vf({module:e,onBack:t}){var a;const[r,n]=N.useState(((a=e.sections[0])==null?void 0:a.id)||""),o=e.sections.find(c=>c.id===r)||e.sections[0],i=e.sections.findIndex(c=>c.id===r);return o?s.jsxs("div",{style:{minHeight:"100vh",background:l.bg,fontFamily:ar,color:l.text,display:"flex",flexDirection:"column"},children:[s.jsx("div",{style:{padding:"13px 20px 9px",borderBottom:`1px solid ${l.outline}`,background:l.surfaceLowest},children:s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[s.jsx("button",{onClick:t,style:{padding:"5px 12px",background:"transparent",border:`1px solid ${l.outline}`,borderRadius:5,color:l.muted,cursor:"pointer",fontSize:11,fontFamily:m},children:"← Dashboard"}),s.jsx("div",{style:{width:1,height:20,background:l.outline}}),s.jsxs("div",{children:[s.jsx("div",{style:{fontSize:10,letterSpacing:4,color:l.muted,textTransform:"uppercase",marginBottom:3,fontFamily:m},children:e.subtitle}),s.jsxs("h1",{style:{margin:0,fontSize:"clamp(13px,2.4vw,19px)",fontFamily:ar,fontWeight:800,color:l.text},children:[e.title," — ",s.jsx("span",{style:{color:o.color,transition:"color 0.3s"},children:o.title})]})]})]})}),s.jsxs("div",{style:{display:"flex",flex:1,minHeight:0,flexWrap:"wrap"},children:[s.jsx("div",{style:{width:"clamp(115px,15vw,195px)",background:l.surfaceLowest,borderRight:`1px solid ${l.outline}`,padding:"8px 0",overflowY:"auto"},children:e.sections.map(c=>s.jsxs("button",{onClick:()=>n(c.id),style:{display:"flex",alignItems:"center",gap:7,width:"100%",padding:"9px 12px",background:r===c.id?c.color+"0d":"transparent",border:"none",borderLeft:r===c.id?`3px solid ${c.color}`:"3px solid transparent",cursor:"pointer",textAlign:"left",transition:"all 0.15s"},children:[s.jsx("span",{style:{fontSize:12},children:c.icon}),s.jsx("span",{style:{fontSize:11,fontWeight:r===c.id?700:400,color:r===c.id?c.color:l.muted,fontFamily:m},children:c.title})]},c.id))}),s.jsxs("div",{style:{flex:1,overflowY:"auto",padding:"clamp(12px,3vw,24px)",minWidth:260},children:[s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:9,marginBottom:16,paddingBottom:10,borderBottom:`1px solid ${o.color}22`},children:[s.jsx("span",{style:{fontSize:20},children:o.icon}),s.jsx("h2",{style:{margin:0,fontSize:"clamp(14px,2.2vw,20px)",fontFamily:ar,color:o.color,fontWeight:800},children:o.title})]}),o.render(),s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:24,gap:8},children:[i>0&&s.jsxs("button",{onClick:()=>n(e.sections[i-1].id),style:{padding:"7px 14px",background:"transparent",border:`1px solid ${l.outline}`,borderRadius:5,color:l.muted,cursor:"pointer",fontSize:11,fontFamily:m},children:["← ",e.sections[i-1].title]}),s.jsx("div",{style:{flex:1}}),i<e.sections.length-1&&s.jsxs("button",{onClick:()=>n(e.sections[i+1].id),style:{padding:"7px 14px",background:"transparent",border:`1px solid ${o.color}`,borderRadius:5,color:o.color,cursor:"pointer",fontSize:11,fontFamily:m},children:[e.sections[i+1].title," →"]})]})]})]}),s.jsx("div",{style:{padding:"7px 14px",borderTop:`1px solid ${l.outline}`,background:l.surfaceLowest,display:"flex",gap:4,flexWrap:"wrap"},children:e.sections.map(c=>s.jsxs("button",{onClick:()=>n(c.id),style:{padding:"3px 8px",fontSize:10,background:r===c.id?c.color:"transparent",color:r===c.id?"#fff":l.muted,border:`1px solid ${r===c.id?c.color:l.outline}`,borderRadius:3,cursor:"pointer",fontWeight:r===c.id?900:400,fontFamily:m},children:[c.icon," ",c.title]},c.id))})]}):null}function Gf(){const[e,t]=N.useState(null);return e?s.jsx(Vf,{module:e,onBack:()=>t(null)}):s.jsx(Qf,{onSelectModule:t})}ro.createRoot(document.getElementById("root")).render(s.jsx(Nd.StrictMode,{children:s.jsx(Gf,{})}));
