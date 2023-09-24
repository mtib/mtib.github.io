let t,e,r,i,s,n,a;var o,h,l,u,d,c,p,f,m,g,_,y,v,x,b,E,T,A,S,w,R,I,C,P,M,D,O,B,N,F,L="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};function U(t){return t&&t.__esModule?t.default:t}function k(t,e,r,i){Object.defineProperty(t,e,{get:r,set:i,enumerable:!0,configurable:!0})}var G={},H={},j=L.parcelRequire53c9;null==j&&((j=function(t){if(t in G)return G[t].exports;if(t in H){var e=H[t];delete H[t];var r={id:t,exports:{}};return G[t]=r,e.call(r.exports,r,r.exports),r.exports}var i=Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(t,e){H[t]=e},L.parcelRequire53c9=j),j.register("jDr7D",function(t,e){!function(r){/** Detect free variables */var i=e&&!e.nodeType&&e,s=t&&!t.nodeType&&t,n="object"==typeof L&&L;(n.global===n||n.window===n||n.self===n)&&(r=n);/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */var a,/** Temporary variable */o,/** Regular expressions */h=/^xn--/,l=/[^\x20-\x7E]/,u=/[\x2E\u3002\uFF0E\uFF61]/g,/** Error messages */d={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},c=Math.floor,p=String.fromCharCode;/*--------------------------------------------------------------------------*//**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */function f(t){throw RangeError(d[t])}/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */function m(t,e){for(var r=t.length,i=[];r--;)i[r]=e(t[r]);return i}/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */function g(t,e){var r=t.split("@"),i="";return r.length>1&&(// In email addresses, only the domain name should be punycoded. Leave
// the local part (i.e. everything up to `@`) intact.
i=r[0]+"@",t=r[1]),i+m(// Avoid `split(regex)` for IE8 compatibility. See #17.
(t=t.replace(u,".")).split("."),e).join(".")}/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */function _(t){for(var e,r,i=[],s=0,n=t.length;s<n;)(e=t.charCodeAt(s++))>=55296&&e<=56319&&s<n?(64512&// high surrogate, and there is a next character
(r=t.charCodeAt(s++)))==56320?i.push(((1023&e)<<10)+(1023&r)+65536):(// unmatched surrogate; only append this code unit, in case the next
// code unit is the high surrogate of a surrogate pair
i.push(e),s--):i.push(e);return i}/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */function y(t){return m(t,function(t){var e="";return t>65535&&(t-=65536,e+=p(t>>>10&1023|55296),t=56320|1023&t),e+=p(t)}).join("")}/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */function v(t,e){//  0..25 map to ASCII a..z or A..Z
// 26..35 map to ASCII 0..9
return t+22+75*(t<26)-((0!=e)<<5)}/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */function x(t,e,r){var i=0;for(t=r?c(t/700):t>>1,t+=c(t/e);t>455;i+=36)t=c(t/35);return c(i+36*t/(t+38))}/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */function b(t){// Don't use UCS-2
var e,r,i,s,n,a,o,h,l,u,/** Cached calculation results */d,p=[],m=t.length,g=0,_=128,v=72;for(// Handle the basic code points: let `basic` be the number of input code
// points before the last delimiter, or `0` if there is none, then copy
// the first basic code points to the output.
(i=t.lastIndexOf("-"))<0&&(i=0),s=0;s<i;++s)t.charCodeAt(s)>=128&&f("not-basic"),p.push(t.charCodeAt(s));// Main decoding loop: start just after the last delimiter if any basic code
// points were copied; start at the beginning otherwise.
for(n=i>0?i+1:0;n<m;){// `index` is the index of the next character to be consumed.
// Decode a generalized variable-length integer into `delta`,
// which gets added to `i`. The overflow checking is easier
// if we increase `i` as we go, then subtract off its starting
// value at the end to obtain `delta`.
for(a=g,o=1,h=36;n>=m&&f("invalid-input"),((l=(e=t.charCodeAt(n++))-48<10?e-22:e-65<26?e-65:e-97<26?e-97:36)>=36||l>c((2147483647-g)/o))&&f("overflow"),g+=l*o,!(l<(u=h<=v?1:h>=v+26?26:h-v));h+=36)o>c(2147483647/(d=36-u))&&f("overflow"),o*=d;v=x(g-a,r=p.length+1,0==a),c(g/r)>2147483647-_&&f("overflow"),_+=c(g/r),g%=r,// Insert `n` at position `i` of the output
p.splice(g++,0,_)}return y(p)}/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */function E(t){var e,r,i,s,n,a,o,h,l,u,d,/** `inputLength` will hold the number of code points in `input`. */m,/** Cached calculation results */g,y,b,E=[];// Handle the basic code points
for(a=0,// Cache the length
m=// Convert the input in UCS-2 to Unicode
(t=_(t)).length,// Initialize the state
e=128,r=0,n=72;a<m;++a)(d=t[a])<128&&E.push(p(d));// Main encoding loop:
for(i=s=E.length,s&&E.push("-");i<m;){// All non-basic code points < n have been handled already. Find the next
// larger one:
for(o=2147483647,a=0;a<m;++a)(d=t[a])>=e&&d<o&&(o=d);for(o-e>c((2147483647-r)/// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
// but guard against overflow
(g=i+1))&&f("overflow"),r+=(o-e)*g,e=o,a=0;a<m;++a)if((d=t[a])<e&&++r>2147483647&&f("overflow"),d==e){// Represent delta as a generalized variable-length integer
for(h=r,l=36;!(h<(u=l<=n?1:l>=n+26?26:l-n));l+=36)b=h-u,y=36-u,E.push(p(v(u+b%y,0))),h=c(b/y);E.push(p(v(h,0))),n=x(r,g,i==s),r=0,++i}++r,++e}return E.join("")}/** Expose `punycode` */// Some AMD build optimizers, like r.js, check for specific condition patterns
// like the following:
if(/*--------------------------------------------------------------------------*//** Define the public API */a={/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */version:"1.4.1",/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */ucs2:{decode:_,encode:y},decode:b,encode:E,toASCII:/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */function(t){return g(t,function(t){return l.test(t)?"xn--"+E(t):t})},toUnicode:/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */function(t){return g(t,function(t){return h.test(t)?b(t.slice(4).toLowerCase()):t})}},"function"==typeof define&&"object"==typeof define.amd&&define.amd)define("punycode",function(){return a});else if(i&&s){if(t.exports==i)s.exports=a;else for(o in a)a.hasOwnProperty(o)&&(i[o]=a[o])}else r.punycode=a}(this)}),j.register("5CmBX",function(t,e){var r="undefined"!=typeof Symbol&&Symbol,i=j("fNdnD");t.exports=function(){return"function"==typeof r&&"function"==typeof Symbol&&"symbol"==typeof r("foo")&&"symbol"==typeof Symbol("bar")&&i()}}),j.register("fNdnD",function(t,e){/* eslint complexity: [2, 18], max-statements: [2, 33] */t.exports=function(){if("function"!=typeof Symbol||"function"!=typeof Object.getOwnPropertySymbols)return!1;if("symbol"==typeof Symbol.iterator)return!0;var t={},e=Symbol("test"),r=Object(e);if("string"==typeof e||"[object Symbol]"!==Object.prototype.toString.call(e)||"[object Symbol]"!==Object.prototype.toString.call(r))return!1;for(e in t[e]=42,t)return!1;// eslint-disable-line no-restricted-syntax, no-unreachable-loop
if("function"==typeof Object.keys&&0!==Object.keys(t).length||"function"==typeof Object.getOwnPropertyNames&&0!==Object.getOwnPropertyNames(t).length)return!1;var i=Object.getOwnPropertySymbols(t);if(1!==i.length||i[0]!==e||!Object.prototype.propertyIsEnumerable.call(t,e))return!1;if("function"==typeof Object.getOwnPropertyDescriptor){var s=Object.getOwnPropertyDescriptor(t,e);if(42!==s.value||!0!==s.enumerable)return!1}return!0}}),j.register("1q0DH",function(t,e){var r={foo:{}},i=Object;t.exports=function(){return({__proto__:r}).foo===r.foo&&!(({__proto__:null})instanceof i)}});var X=((o=X||{})[o.WEBGL_LEGACY=0]="WEBGL_LEGACY",o[o.WEBGL=1]="WEBGL",o[o.WEBGL2=2]="WEBGL2",o),V=((h=V||{})[h.UNKNOWN=0]="UNKNOWN",h[h.WEBGL=1]="WEBGL",h[h.CANVAS=2]="CANVAS",h),z=((l=z||{})[l.COLOR=16384]="COLOR",l[l.DEPTH=256]="DEPTH",l[l.STENCIL=1024]="STENCIL",l),W=((u=W||{})[u.NORMAL=0]="NORMAL",u[u.ADD=1]="ADD",u[u.MULTIPLY=2]="MULTIPLY",u[u.SCREEN=3]="SCREEN",u[u.OVERLAY=4]="OVERLAY",u[u.DARKEN=5]="DARKEN",u[u.LIGHTEN=6]="LIGHTEN",u[u.COLOR_DODGE=7]="COLOR_DODGE",u[u.COLOR_BURN=8]="COLOR_BURN",u[u.HARD_LIGHT=9]="HARD_LIGHT",u[u.SOFT_LIGHT=10]="SOFT_LIGHT",u[u.DIFFERENCE=11]="DIFFERENCE",u[u.EXCLUSION=12]="EXCLUSION",u[u.HUE=13]="HUE",u[u.SATURATION=14]="SATURATION",u[u.COLOR=15]="COLOR",u[u.LUMINOSITY=16]="LUMINOSITY",u[u.NORMAL_NPM=17]="NORMAL_NPM",u[u.ADD_NPM=18]="ADD_NPM",u[u.SCREEN_NPM=19]="SCREEN_NPM",u[u.NONE=20]="NONE",u[u.SRC_OVER=0]="SRC_OVER",u[u.SRC_IN=21]="SRC_IN",u[u.SRC_OUT=22]="SRC_OUT",u[u.SRC_ATOP=23]="SRC_ATOP",u[u.DST_OVER=24]="DST_OVER",u[u.DST_IN=25]="DST_IN",u[u.DST_OUT=26]="DST_OUT",u[u.DST_ATOP=27]="DST_ATOP",u[u.ERASE=26]="ERASE",u[u.SUBTRACT=28]="SUBTRACT",u[u.XOR=29]="XOR",u),$=((d=$||{})[d.POINTS=0]="POINTS",d[d.LINES=1]="LINES",d[d.LINE_LOOP=2]="LINE_LOOP",d[d.LINE_STRIP=3]="LINE_STRIP",d[d.TRIANGLES=4]="TRIANGLES",d[d.TRIANGLE_STRIP=5]="TRIANGLE_STRIP",d[d.TRIANGLE_FAN=6]="TRIANGLE_FAN",d),Y=((c=Y||{})[c.RGBA=6408]="RGBA",c[c.RGB=6407]="RGB",c[c.RG=33319]="RG",c[c.RED=6403]="RED",c[c.RGBA_INTEGER=36249]="RGBA_INTEGER",c[c.RGB_INTEGER=36248]="RGB_INTEGER",c[c.RG_INTEGER=33320]="RG_INTEGER",c[c.RED_INTEGER=36244]="RED_INTEGER",c[c.ALPHA=6406]="ALPHA",c[c.LUMINANCE=6409]="LUMINANCE",c[c.LUMINANCE_ALPHA=6410]="LUMINANCE_ALPHA",c[c.DEPTH_COMPONENT=6402]="DEPTH_COMPONENT",c[c.DEPTH_STENCIL=34041]="DEPTH_STENCIL",c),q=((p=q||{})[p.TEXTURE_2D=3553]="TEXTURE_2D",p[p.TEXTURE_CUBE_MAP=34067]="TEXTURE_CUBE_MAP",p[p.TEXTURE_2D_ARRAY=35866]="TEXTURE_2D_ARRAY",p[p.TEXTURE_CUBE_MAP_POSITIVE_X=34069]="TEXTURE_CUBE_MAP_POSITIVE_X",p[p.TEXTURE_CUBE_MAP_NEGATIVE_X=34070]="TEXTURE_CUBE_MAP_NEGATIVE_X",p[p.TEXTURE_CUBE_MAP_POSITIVE_Y=34071]="TEXTURE_CUBE_MAP_POSITIVE_Y",p[p.TEXTURE_CUBE_MAP_NEGATIVE_Y=34072]="TEXTURE_CUBE_MAP_NEGATIVE_Y",p[p.TEXTURE_CUBE_MAP_POSITIVE_Z=34073]="TEXTURE_CUBE_MAP_POSITIVE_Z",p[p.TEXTURE_CUBE_MAP_NEGATIVE_Z=34074]="TEXTURE_CUBE_MAP_NEGATIVE_Z",p),K=((f=K||{})[f.UNSIGNED_BYTE=5121]="UNSIGNED_BYTE",f[f.UNSIGNED_SHORT=5123]="UNSIGNED_SHORT",f[f.UNSIGNED_SHORT_5_6_5=33635]="UNSIGNED_SHORT_5_6_5",f[f.UNSIGNED_SHORT_4_4_4_4=32819]="UNSIGNED_SHORT_4_4_4_4",f[f.UNSIGNED_SHORT_5_5_5_1=32820]="UNSIGNED_SHORT_5_5_5_1",f[f.UNSIGNED_INT=5125]="UNSIGNED_INT",f[f.UNSIGNED_INT_10F_11F_11F_REV=35899]="UNSIGNED_INT_10F_11F_11F_REV",f[f.UNSIGNED_INT_2_10_10_10_REV=33640]="UNSIGNED_INT_2_10_10_10_REV",f[f.UNSIGNED_INT_24_8=34042]="UNSIGNED_INT_24_8",f[f.UNSIGNED_INT_5_9_9_9_REV=35902]="UNSIGNED_INT_5_9_9_9_REV",f[f.BYTE=5120]="BYTE",f[f.SHORT=5122]="SHORT",f[f.INT=5124]="INT",f[f.FLOAT=5126]="FLOAT",f[f.FLOAT_32_UNSIGNED_INT_24_8_REV=36269]="FLOAT_32_UNSIGNED_INT_24_8_REV",f[f.HALF_FLOAT=36193]="HALF_FLOAT",f),Z=((m=Z||{})[m.FLOAT=0]="FLOAT",m[m.INT=1]="INT",m[m.UINT=2]="UINT",m),Q=((g=Q||{})[g.NEAREST=0]="NEAREST",g[g.LINEAR=1]="LINEAR",g),J=((_=J||{})[_.CLAMP=33071]="CLAMP",_[_.REPEAT=10497]="REPEAT",_[_.MIRRORED_REPEAT=33648]="MIRRORED_REPEAT",_),tt=((y=tt||{})[y.OFF=0]="OFF",y[y.POW2=1]="POW2",y[y.ON=2]="ON",y[y.ON_MANUAL=3]="ON_MANUAL",y),te=((v=te||{})[v.NPM=0]="NPM",v[v.UNPACK=1]="UNPACK",v[v.PMA=2]="PMA",v[v.NO_PREMULTIPLIED_ALPHA=0]="NO_PREMULTIPLIED_ALPHA",v[v.PREMULTIPLY_ON_UPLOAD=1]="PREMULTIPLY_ON_UPLOAD",v[v.PREMULTIPLIED_ALPHA=2]="PREMULTIPLIED_ALPHA",v),tr=((x=tr||{})[x.NO=0]="NO",x[x.YES=1]="YES",x[x.AUTO=2]="AUTO",x[x.BLEND=0]="BLEND",x[x.CLEAR=1]="CLEAR",x[x.BLIT=2]="BLIT",x),ti=((b=ti||{})[b.AUTO=0]="AUTO",b[b.MANUAL=1]="MANUAL",b),ts=((E=ts||{}).LOW="lowp",E.MEDIUM="mediump",E.HIGH="highp",E),tn=((T=tn||{})[T.NONE=0]="NONE",T[T.SCISSOR=1]="SCISSOR",T[T.STENCIL=2]="STENCIL",T[T.SPRITE=3]="SPRITE",T[T.COLOR=4]="COLOR",T),ta=((A=ta||{})[A.RED=1]="RED",A[A.GREEN=2]="GREEN",A[A.BLUE=4]="BLUE",A[A.ALPHA=8]="ALPHA",A),to=((S=to||{})[S.NONE=0]="NONE",S[S.LOW=2]="LOW",S[S.MEDIUM=4]="MEDIUM",S[S.HIGH=8]="HIGH",S),th=((w=th||{})[w.ELEMENT_ARRAY_BUFFER=34963]="ELEMENT_ARRAY_BUFFER",w[w.ARRAY_BUFFER=34962]="ARRAY_BUFFER",w[w.UNIFORM_BUFFER=35345]="UNIFORM_BUFFER",w);const tl={/**
   * This adapter is used to call methods that are platform dependent.
   * For example `document.createElement` only runs on the web but fails in node environments.
   * This allows us to support more platforms by abstracting away specific implementations per platform.
   *
   * By default the adapter is set to work in the browser. However you can create your own
   * by implementing the `IAdapter` interface. See `IAdapter` for more information.
   * @name ADAPTER
   * @memberof PIXI.settings
   * @type {PIXI.IAdapter}
   * @default PIXI.BrowserAdapter
   */ADAPTER:{/**
   * Creates a canvas element of the given size.
   * This canvas is created using the browser's native canvas element.
   * @param width - width of the canvas
   * @param height - height of the canvas
   */createCanvas:(t,e)=>{let r=document.createElement("canvas");return r.width=t,r.height=e,r},getCanvasRenderingContext2D:()=>CanvasRenderingContext2D,getWebGLRenderingContext:()=>WebGLRenderingContext,getNavigator:()=>navigator,getBaseUrl:()=>document.baseURI??window.location.href,getFontFaceSet:()=>document.fonts,fetch:(t,e)=>fetch(t,e),parseXML:t=>new DOMParser().parseFromString(t,"text/xml")},/**
   * Default resolution / device pixel ratio of the renderer.
   * @static
   * @name RESOLUTION
   * @memberof PIXI.settings
   * @type {number}
   * @default 1
   */RESOLUTION:1,/**
   * Enables bitmap creation before image load. This feature is experimental.
   * @static
   * @name CREATE_IMAGE_BITMAP
   * @memberof PIXI.settings
   * @type {boolean}
   * @default false
   */CREATE_IMAGE_BITMAP:!1,/**
   * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
   * Advantages can include sharper image quality (like text) and faster rendering on canvas.
   * The main disadvantage is movement of objects may appear less smooth.
   * @static
   * @memberof PIXI.settings
   * @type {boolean}
   * @default false
   */ROUND_PIXELS:!1};var tu=/iPhone/i,td=/iPod/i,tc=/iPad/i,tp=/\biOS-universal(?:.+)Mac\b/i,tf=/\bAndroid(?:.+)Mobile\b/i,tm=/Android/i,tg=/(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i,t_=/Silk/i,ty=/Windows Phone/i,tv=/\bWindows(?:.+)ARM\b/i,tx=/BlackBerry/i,tb=/BB10/i,tE=/Opera Mini/i,tT=/\b(CriOS|Chrome)(?:.+)Mobile/i,tA=/Mobile(?:.+)Firefox\b/i,tS=function(t){return void 0!==t&&"MacIntel"===t.platform&&"number"==typeof t.maxTouchPoints&&t.maxTouchPoints>1&&"undefined"==typeof MSStream};function tw(t){var e,r={userAgent:"",platform:"",maxTouchPoints:0};t||"undefined"==typeof navigator?"string"==typeof t?r.userAgent=t:t&&t.userAgent&&(r={userAgent:t.userAgent,platform:t.platform,maxTouchPoints:t.maxTouchPoints||0}):r={userAgent:navigator.userAgent,platform:navigator.platform,maxTouchPoints:navigator.maxTouchPoints||0};var i=r.userAgent,s=i.split("[FBAN");void 0!==s[1]&&(i=s[0]),void 0!==(s=i.split("Twitter"))[1]&&(i=s[0]);var n=(e=i,function(t){return t.test(e)}),a={apple:{phone:n(tu)&&!n(ty),ipod:n(td),tablet:!n(tu)&&(n(tc)||tS(r))&&!n(ty),universal:n(tp),device:(n(tu)||n(td)||n(tc)||n(tp)||tS(r))&&!n(ty)},amazon:{phone:n(tg),tablet:!n(tg)&&n(t_),device:n(tg)||n(t_)},android:{phone:!n(ty)&&n(tg)||!n(ty)&&n(tf),tablet:!n(ty)&&!n(tg)&&!n(tf)&&(n(t_)||n(tm)),device:!n(ty)&&(n(tg)||n(t_)||n(tf)||n(tm))||n(/\bokhttp\b/i)},windows:{phone:n(ty),tablet:n(tv),device:n(ty)||n(tv)},other:{blackberry:n(tx),blackberry10:n(tb),opera:n(tE),firefox:n(tA),chrome:n(tT),device:n(tx)||n(tb)||n(tE)||n(tA)||n(tT)},any:!1,phone:!1,tablet:!1};return a.any=a.apple.device||a.android.device||a.windows.device||a.other.device,a.phone=a.apple.phone||a.android.phone||a.windows.phone,a.tablet=a.apple.tablet||a.android.tablet||a.windows.tablet,a}const tR=tw.default??tw,tI=tR(globalThis.navigator);var tC={};k(tC,"BaseTextureCache",function(){return sf}),k(tC,"BoundingBox",function(){return sd}),k(tC,"CanvasRenderTarget",function(){return s_}),k(tC,"DATA_URI",function(){return i7}),k(tC,"EventEmitter",function(){return /*@__PURE__*/U(tP)}),k(tC,"ProgramCache",function(){return sc}),k(tC,"TextureCache",function(){return sp}),k(tC,"clearTextureCache",function(){return sg}),k(tC,"correctBlendMode",function(){return i4}),k(tC,"createIndicesForQuads",function(){return i9}),k(tC,"decomposeDataUri",function(){return sE}),k(tC,"deprecation",function(){return ig}),k(tC,"destroyTextureCache",function(){return sm}),k(tC,"detectVideoAlphaMode",function(){return ib}),k(tC,"determineCrossOrigin",function(){return sT}),k(tC,"earcut",function(){return /*@__PURE__*/U(tU)}),k(tC,"getBufferType",function(){return st}),k(tC,"getCanvasBoundingBox",function(){return sx}),k(tC,"getResolutionOfUrl",function(){return sA}),k(tC,"hex2rgb",function(){return iJ}),k(tC,"hex2string",function(){return i0}),k(tC,"interleaveTypedArrays",function(){return sr}),k(tC,"isMobile",function(){return tI}),k(tC,"isPow2",function(){return ss}),k(tC,"isWebGLSupported",function(){return iA}),k(tC,"log2",function(){return sn}),k(tC,"nextPow2",function(){return si}),k(tC,"path",function(){return ix}),k(tC,"premultiplyBlendMode",function(){return i3}),k(tC,"premultiplyRgba",function(){return i5}),k(tC,"premultiplyTint",function(){return i6}),k(tC,"premultiplyTintToRgba",function(){return i8}),k(tC,"removeItems",function(){return sa}),k(tC,"rgb2hex",function(){return i2}),k(tC,"sayHello",function(){return iT}),k(tC,"sign",function(){return so}),k(tC,"skipHello",function(){return iE}),k(tC,"string2hex",function(){return i1}),k(tC,"trimCanvas",function(){return sb}),k(tC,"uid",function(){return sl}),k(tC,"url",function(){return i_}),tl.RETINA_PREFIX=/@([0-9\.]+)x/,tl.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT=!1;var tP={},tM=Object.prototype.hasOwnProperty,tD="~";/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */function tO(){}/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */function tB(t,e,r){this.fn=t,this.context=e,this.once=r||!1}/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */function tN(t,e,r,i,s){if("function"!=typeof r)throw TypeError("The listener must be a function");var n=new tB(r,i||t,s),a=tD?tD+e:e;return t._events[a]?t._events[a].fn?t._events[a]=[t._events[a],n]:t._events[a].push(n):(t._events[a]=n,t._eventsCount++),t}/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */function tF(t,e){0==--t._eventsCount?t._events=new tO:delete t._events[e]}/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */function tL(){this._events=new tO,this._eventsCount=0}Object.create&&(tO.prototype=Object.create(null),new tO().__proto__||(tD=!1)),/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */tL.prototype.eventNames=function(){var t,e,r=[];if(0===this._eventsCount)return r;for(e in t=this._events)tM.call(t,e)&&r.push(tD?e.slice(1):e);return Object.getOwnPropertySymbols?r.concat(Object.getOwnPropertySymbols(t)):r},/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */tL.prototype.listeners=function(t){var e=tD?tD+t:t,r=this._events[e];if(!r)return[];if(r.fn)return[r.fn];for(var i=0,s=r.length,n=Array(s);i<s;i++)n[i]=r[i].fn;return n},/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */tL.prototype.listenerCount=function(t){var e=tD?tD+t:t,r=this._events[e];return r?r.fn?1:r.length:0},/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */tL.prototype.emit=function(t,e,r,i,s,n){var a=tD?tD+t:t;if(!this._events[a])return!1;var o,h,l=this._events[a],u=arguments.length;if(l.fn){switch(l.once&&this.removeListener(t,l.fn,void 0,!0),u){case 1:return l.fn.call(l.context),!0;case 2:return l.fn.call(l.context,e),!0;case 3:return l.fn.call(l.context,e,r),!0;case 4:return l.fn.call(l.context,e,r,i),!0;case 5:return l.fn.call(l.context,e,r,i,s),!0;case 6:return l.fn.call(l.context,e,r,i,s,n),!0}for(h=1,o=Array(u-1);h<u;h++)o[h-1]=arguments[h];l.fn.apply(l.context,o)}else{var d,c=l.length;for(h=0;h<c;h++)switch(l[h].once&&this.removeListener(t,l[h].fn,void 0,!0),u){case 1:l[h].fn.call(l[h].context);break;case 2:l[h].fn.call(l[h].context,e);break;case 3:l[h].fn.call(l[h].context,e,r);break;case 4:l[h].fn.call(l[h].context,e,r,i);break;default:if(!o)for(d=1,o=Array(u-1);d<u;d++)o[d-1]=arguments[d];l[h].fn.apply(l[h].context,o)}}return!0},/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */tL.prototype.on=function(t,e,r){return tN(this,t,e,r,!1)},/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */tL.prototype.once=function(t,e,r){return tN(this,t,e,r,!0)},/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */tL.prototype.removeListener=function(t,e,r,i){var s=tD?tD+t:t;if(!this._events[s])return this;if(!e)return tF(this,s),this;var n=this._events[s];if(n.fn)n.fn!==e||i&&!n.once||r&&n.context!==r||tF(this,s);else{for(var a=0,o=[],h=n.length;a<h;a++)(n[a].fn!==e||i&&!n[a].once||r&&n[a].context!==r)&&o.push(n[a]);//
// Reset the array, or remove it completely if we have no more listeners.
//
o.length?this._events[s]=1===o.length?o[0]:o:tF(this,s)}return this},/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */tL.prototype.removeAllListeners=function(t){var e;return t?(e=tD?tD+t:t,this._events[e]&&tF(this,e)):(this._events=new tO,this._eventsCount=0),this},//
// Alias methods names because people roll like that.
//
tL.prototype.off=tL.prototype.removeListener,tL.prototype.addListener=tL.prototype.on,//
// Expose the prefix.
//
tL.prefixed=tD,//
// Allow `EventEmitter` to be imported as module namespace.
//
tL.EventEmitter=tL,tP=tL;var tU={};function tk(t,e,r){r=r||2;var i,s,n,a,o,h,l,u=e&&e.length,d=u?e[0]*r:t.length,c=tG(t,0,d,r,!0),p=[];if(!c||c.next===c.prev)return p;// if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
if(u&&(c=// link every hole into the outer loop, producing a single-ring polygon without holes
function(t,e,r,i){var s,n,a,o,h,l=[];for(s=0,n=e.length;s<n;s++)a=e[s]*i,o=s<n-1?e[s+1]*i:t.length,(h=tG(t,a,o,i,!1))===h.next&&(h.steiner=!0),l.push(// find the leftmost node of a polygon ring
function(t){var e=t,r=t;do(e.x<r.x||e.x===r.x&&e.y<r.y)&&(r=e),e=e.next;while(e!==t)return r}(h));// process holes from left to right
for(l.sort(tj),s=0;s<l.length;s++)r=// find a bridge between vertices that connects hole with an outer ring and and link it
function(t,e){var r=// David Eberly's algorithm for finding a bridge between hole and outer polygon
function(t,e){var r,i,s,n=e,a=t.x,o=t.y,h=-1/0;// find a segment intersected by a ray from the hole's leftmost point to the left;
// segment's endpoint with lesser x will be potential connection point
do{if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){var l=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(l<=a&&l>h&&(h=l,s=n.x<n.next.x?n:n.next,l===a))return s;// hole touches outer segment; pick leftmost endpoint
}n=n.next}while(n!==e)if(!s)return null;// look for points inside the triangle of hole point, segment intersection and endpoint;
// if there are no points found, we have a valid connection;
// otherwise choose the point of the minimum angle with the ray as connection point
var u,d=s,c=s.x,p=s.y,f=1/0;n=s;do a>=n.x&&n.x>=c&&a!==n.x&&tV(o<p?a:h,o,c,p,o<p?h:a,o,n.x,n.y)&&(u=Math.abs(o-n.y)/(a-n.x),tK(n,t)&&(u<f||u===f&&(n.x>s.x||n.x===s.x&&(r=s,i=n,0>tz(r.prev,r,i.prev)&&0>tz(i.next,r,r.next))))&&(s=n,f=u)),n=n.next;while(n!==d)return s}(t,e);if(!r)return e;var i=tZ(r,t);return(// filter collinear points around the cuts
tH(i,i.next),tH(r,r.next))}(l[s],r);return r}(t,e,c,r)),t.length>80*r){i=n=t[0],s=a=t[1];for(var f=r;f<d;f+=r)o=t[f],h=t[f+1],o<i&&(i=o),h<s&&(s=h),o>n&&(n=o),h>a&&(a=h);l=0!==// minX, minY and invSize are later used to transform coords into integers for z-order calculation
(l=Math.max(n-i,a-s))?32767/l:0}return(// main ear slicing loop which triangulates a polygon (given as a linked list)
function t(e,r,i,s,n,a,o){if(e){// interlink polygon nodes in z-order
!o&&a&&// interlink polygon nodes in z-order
function(t,e,r,i){var s=t;do 0===s.z&&(s.z=tX(s.x,s.y,e,r,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==t)s.prevZ.nextZ=null,s.prevZ=null,// Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
function(t){var e,r,i,s,n,a,o,h,l=1;do{for(r=t,t=null,n=null,a=0;r;){for(a++,i=r,o=0,e=0;e<l&&(o++,i=i.nextZ);e++);for(h=l;o>0||h>0&&i;)0!==o&&(0===h||!i||r.z<=i.z)?(s=r,r=r.nextZ,o--):(s=i,i=i.nextZ,h--),n?n.nextZ=s:t=s,s.prevZ=n,n=s;r=i}n.nextZ=null,l*=2}while(a>1)}(s)}(e,s,n,a);// iterate through ears, slicing them one by one
for(var h,l,u=e;e.prev!==e.next;){if(h=e.prev,l=e.next,a?function(t,e,r,i){var s=t.prev,n=t.next;if(tz(s,t,n)>=0)return!1;// reflex, can't be an ear
// look for points inside the triangle in both directions
for(var a=s.x,o=t.x,h=n.x,l=s.y,u=t.y,d=n.y,c=a<o?a<h?a:h:o<h?o:h,p=l<u?l<d?l:d:u<d?u:d,f=a>o?a>h?a:h:o>h?o:h,m=l>u?l>d?l:d:u>d?u:d,g=tX(c,p,e,r,i),_=tX(f,m,e,r,i),y=t.prevZ,v=t.nextZ;y&&y.z>=g&&v&&v.z<=_;){if(y.x>=c&&y.x<=f&&y.y>=p&&y.y<=m&&y!==s&&y!==n&&tV(a,l,o,u,h,d,y.x,y.y)&&tz(y.prev,y,y.next)>=0||(y=y.prevZ,v.x>=c&&v.x<=f&&v.y>=p&&v.y<=m&&v!==s&&v!==n&&tV(a,l,o,u,h,d,v.x,v.y)&&tz(v.prev,v,v.next)>=0))return!1;v=v.nextZ}// look for remaining points in decreasing z-order
for(;y&&y.z>=g;){if(y.x>=c&&y.x<=f&&y.y>=p&&y.y<=m&&y!==s&&y!==n&&tV(a,l,o,u,h,d,y.x,y.y)&&tz(y.prev,y,y.next)>=0)return!1;y=y.prevZ}// look for remaining points in increasing z-order
for(;v&&v.z<=_;){if(v.x>=c&&v.x<=f&&v.y>=p&&v.y<=m&&v!==s&&v!==n&&tV(a,l,o,u,h,d,v.x,v.y)&&tz(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}(e,s,n,a):// check whether a polygon node forms a valid ear with adjacent nodes
function(t){var e=t.prev,r=t.next;if(tz(e,t,r)>=0)return!1;// reflex, can't be an ear
for(// now make sure we don't have other points inside the potential ear
var i=e.x,s=t.x,n=r.x,a=e.y,o=t.y,h=r.y,l=i<s?i<n?i:n:s<n?s:n,u=a<o?a<h?a:h:o<h?o:h,d=i>s?i>n?i:n:s>n?s:n,c=a>o?a>h?a:h:o>h?o:h,p=r.next;p!==e;){if(p.x>=l&&p.x<=d&&p.y>=u&&p.y<=c&&tV(i,a,s,o,n,h,p.x,p.y)&&tz(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}(e)){// cut off the triangle
r.push(h.i/i|0),r.push(e.i/i|0),r.push(l.i/i|0),tJ(e),// skipping the next vertex leads to less sliver triangles
e=l.next,u=l.next;continue}// if we looped through the whole remaining polygon and can't find any more ears
if((e=l)===u){// try filtering points and slicing again
o?1===o?t(e=// go through all polygon nodes and cure small local self-intersections
function(t,e,r){var i=t;do{var s=i.prev,n=i.next.next;!tW(s,n)&&t$(s,i,i.next,n)&&tK(s,n)&&tK(n,s)&&(e.push(s.i/r|0),e.push(i.i/r|0),e.push(n.i/r|0),// remove two nodes involved
tJ(i),tJ(i.next),i=t=n),i=i.next}while(i!==t)return tH(i)}(tH(e),r,i),r,i,s,n,a,2):2===o&&// try splitting polygon into two and triangulate them independently
function(e,r,i,s,n,a){// look for a valid diagonal that divides the polygon into two
var o=e;do{for(var h,l,u=o.next.next;u!==o.prev;){if(o.i!==u.i&&(h=o,l=u,h.next.i!==l.i&&h.prev.i!==l.i&&!// check if a polygon diagonal intersects any polygon segments
function(t,e){var r=t;do{if(r.i!==t.i&&r.next.i!==t.i&&r.i!==e.i&&r.next.i!==e.i&&t$(r,r.next,t,e))return!0;r=r.next}while(r!==t)return!1}(h,l)&&// dones't intersect other edges
(tK(h,l)&&tK(l,h)&&// check if the middle point of a polygon diagonal is inside the polygon
function(t,e){var r=t,i=!1,s=(t.x+e.x)/2,n=(t.y+e.y)/2;do r.y>n!=r.next.y>n&&r.next.y!==r.y&&s<(r.next.x-r.x)*(n-r.y)/(r.next.y-r.y)+r.x&&(i=!i),r=r.next;while(r!==t)return i}(h,l)&&// locally visible
(tz(h.prev,h,l.prev)||tz(h,l.prev,l))||// does not create opposite-facing sectors
tW(h,l)&&tz(h.prev,h,h.next)>0&&tz(l.prev,l,l.next)>0))){// split the polygon in two by the diagonal
var d=tZ(o,u);// filter colinear points around the cuts
o=tH(o,o.next),d=tH(d,d.next),// run earcut on each half
t(o,r,i,s,n,a,0),t(d,r,i,s,n,a,0);return}u=u.next}o=o.next}while(o!==e)}(e,r,i,s,n,a):t(tH(e),r,i,s,n,a,1);break}}}}(c,p,r,i,s,l,0),p)}// create a circular doubly linked list from polygon points in the specified winding order
function tG(t,e,r,i,s){var n,a;if(s===t1(t,e,r,i)>0)for(n=e;n<r;n+=i)a=tQ(n,t[n],t[n+1],a);else for(n=r-i;n>=e;n-=i)a=tQ(n,t[n],t[n+1],a);return a&&tW(a,a.next)&&(tJ(a),a=a.next),a}// eliminate colinear or duplicate points
function tH(t,e){if(!t)return t;e||(e=t);var r,i=t;do if(r=!1,!i.steiner&&(tW(i,i.next)||0===tz(i.prev,i,i.next))){if(tJ(i),(i=e=i.prev)===i.next)break;r=!0}else i=i.next;while(r||i!==e)return e}function tj(t,e){return t.x-e.x}// z-order of a point given coords and inverse of the longer side of data bbox
function tX(t,e,r,i,s){return(t=((t=((t=((t=(// coords are transformed into non-negative 15-bit integer range
(t=(t-r)*s|0)|t<<8)&16711935)|t<<4)&252645135)|t<<2)&858993459)|t<<1)&1431655765)|(e=((e=((e=((e=((e=(e-i)*s|0)|e<<8)&16711935)|e<<4)&252645135)|e<<2)&858993459)|e<<1)&1431655765)<<1}// check if a point lies within a convex triangle
function tV(t,e,r,i,s,n,a,o){return(s-a)*(e-o)>=(t-a)*(n-o)&&(t-a)*(i-o)>=(r-a)*(e-o)&&(r-a)*(n-o)>=(s-a)*(i-o)}// signed area of a triangle
function tz(t,e,r){return(e.y-t.y)*(r.x-e.x)-(e.x-t.x)*(r.y-e.y)}// check if two points are equal
function tW(t,e){return t.x===e.x&&t.y===e.y}// check if two segments intersect
function t$(t,e,r,i){var s=tq(tz(t,e,r)),n=tq(tz(t,e,i)),a=tq(tz(r,i,t)),o=tq(tz(r,i,e));return!!(s!==n&&a!==o||0===s&&tY(t,r,e)||0===n&&tY(t,i,e)||0===a&&tY(r,t,i)||0===o&&tY(r,e,i))}// for collinear points p, q, r, check if point q lies on segment pr
function tY(t,e,r){return e.x<=Math.max(t.x,r.x)&&e.x>=Math.min(t.x,r.x)&&e.y<=Math.max(t.y,r.y)&&e.y>=Math.min(t.y,r.y)}function tq(t){return t>0?1:t<0?-1:0}// check if a polygon diagonal is locally inside the polygon
function tK(t,e){return 0>tz(t.prev,t,t.next)?tz(t,e,t.next)>=0&&tz(t,t.prev,e)>=0:0>tz(t,e,t.prev)||0>tz(t,t.next,e)}// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring
function tZ(t,e){var r=new t0(t.i,t.x,t.y),i=new t0(e.i,e.x,e.y),s=t.next,n=e.prev;return t.next=e,e.prev=t,r.next=s,s.prev=r,i.next=r,r.prev=i,n.next=i,i.prev=n,i}// create a node and optionally link it with previous one (in a circular doubly linked list)
function tQ(t,e,r,i){var s=new t0(t,e,r);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function tJ(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function t0(t,e,r){// vertex index in coordinates array
this.i=t,// vertex coordinates
this.x=e,this.y=r,// previous and next vertex nodes in a polygon ring
this.prev=null,this.next=null,// z-order curve value
this.z=0,// previous and next nodes in z-order
this.prevZ=null,this.nextZ=null,// indicates whether this is a steiner point
this.steiner=!1}function t1(t,e,r,i){for(var s=0,n=e,a=r-i;n<r;n+=i)s+=(t[a]-t[n])*(t[n+1]+t[a+1]),a=n;return s}(tU=tk).default=tk,// return a percentage difference between the polygon area and its triangulation area;
// used to verify correctness of triangulation
tk.deviation=function(t,e,r,i){var s=e&&e.length,n=s?e[0]*r:t.length,a=Math.abs(t1(t,0,n,r));if(s)for(var o=0,h=e.length;o<h;o++){var l=e[o]*r,u=o<h-1?e[o+1]*r:t.length;a-=Math.abs(t1(t,l,u,r))}var d=0;for(o=0;o<i.length;o+=3){var c=i[o]*r,p=i[o+1]*r,f=i[o+2]*r;d+=Math.abs((t[c]-t[f])*(t[p+1]-t[c+1])-(t[c]-t[p])*(t[f+1]-t[c+1]))}return 0===a&&0===d?0:Math.abs((d-a)/a)},// turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
tk.flatten=function(t){for(var e=t[0][0].length,r={vertices:[],holes:[],dimensions:e},i=0,s=0;s<t.length;s++){for(var n=0;n<t[s].length;n++)for(var a=0;a<e;a++)r.vertices.push(t[s][n][a]);s>0&&(i+=t[s-1].length,r.holes.push(i))}return r};var t2=j("jDr7D");function t3(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}// Reference: RFC 3986, RFC 1808, RFC 2396
/*
 * define these here so at least they only have to be
 * compiled once on the first module load.
 */var t4=/^([a-z0-9.+-]+:)/i,t5=/:[0-9]*$/,t6=/^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/,t8=["'"].concat(["{","}","|","\\","^","`"].concat(["<",">",'"',"`"," ","\r","\n","	"])),/*
   * Characters that are never ever allowed in a hostname.
   * Note that any invalid chars are also handled, but these
   * are the ones that are *expected* to be seen, so we fast-path
   * them.
   */t7=["%","/","?",";","#"].concat(t8),t9=["/","?","#"],et=/^[+a-z0-9A-Z_-]{0,63}$/,ee=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,er={javascript:!0,"javascript:":!0},ei={javascript:!0,"javascript:":!0},es={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},en={},ea={},eo={},eh={},el=SyntaxError,eu=Function,ed=TypeError,ec=function(t){try{return eu('"use strict"; return ('+t+").constructor;")()}catch(t){}},ep=Object.getOwnPropertyDescriptor;if(ep)try{ep({},"")}catch(t){ep=null;// this is IE 8, which has a broken gOPD
}var ef=function(){throw new ed},em=ep?function(){try{return(// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
arguments.callee,ef)}catch(t){try{// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
return ep(arguments,"callee").get}catch(t){return ef}}}():ef,eg=j("5CmBX")(),e_=j("1q0DH")(),ey=Object.getPrototypeOf||(e_?function(t){return t.__proto__}// eslint-disable-line no-proto
:null),ev={},ex="undefined"!=typeof Uint8Array&&ey?ey(Uint8Array):void 0,eb={"%AggregateError%":"undefined"==typeof AggregateError?void 0:AggregateError,"%Array%":Array,"%ArrayBuffer%":"undefined"==typeof ArrayBuffer?void 0:ArrayBuffer,"%ArrayIteratorPrototype%":eg&&ey?ey([][Symbol.iterator]()):void 0,"%AsyncFromSyncIteratorPrototype%":void 0,"%AsyncFunction%":ev,"%AsyncGenerator%":ev,"%AsyncGeneratorFunction%":ev,"%AsyncIteratorPrototype%":ev,"%Atomics%":"undefined"==typeof Atomics?void 0:Atomics,"%BigInt%":"undefined"==typeof BigInt?void 0:BigInt,"%BigInt64Array%":"undefined"==typeof BigInt64Array?void 0:BigInt64Array,"%BigUint64Array%":"undefined"==typeof BigUint64Array?void 0:BigUint64Array,"%Boolean%":Boolean,"%DataView%":"undefined"==typeof DataView?void 0:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":Error,"%eval%":eval,"%EvalError%":EvalError,"%Float32Array%":"undefined"==typeof Float32Array?void 0:Float32Array,"%Float64Array%":"undefined"==typeof Float64Array?void 0:Float64Array,"%FinalizationRegistry%":"undefined"==typeof FinalizationRegistry?void 0:FinalizationRegistry,"%Function%":eu,"%GeneratorFunction%":ev,"%Int8Array%":"undefined"==typeof Int8Array?void 0:Int8Array,"%Int16Array%":"undefined"==typeof Int16Array?void 0:Int16Array,"%Int32Array%":"undefined"==typeof Int32Array?void 0:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":eg&&ey?ey(ey([][Symbol.iterator]())):void 0,"%JSON%":"object"==typeof JSON?JSON:void 0,"%Map%":"undefined"==typeof Map?void 0:Map,"%MapIteratorPrototype%":"undefined"!=typeof Map&&eg&&ey?ey(new Map()[Symbol.iterator]()):void 0,"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":"undefined"==typeof Promise?void 0:Promise,"%Proxy%":"undefined"==typeof Proxy?void 0:Proxy,"%RangeError%":RangeError,"%ReferenceError%":ReferenceError,"%Reflect%":"undefined"==typeof Reflect?void 0:Reflect,"%RegExp%":RegExp,"%Set%":"undefined"==typeof Set?void 0:Set,"%SetIteratorPrototype%":"undefined"!=typeof Set&&eg&&ey?ey(new Set()[Symbol.iterator]()):void 0,"%SharedArrayBuffer%":"undefined"==typeof SharedArrayBuffer?void 0:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":eg&&ey?ey(""[Symbol.iterator]()):void 0,"%Symbol%":eg?Symbol:void 0,"%SyntaxError%":el,"%ThrowTypeError%":em,"%TypedArray%":ex,"%TypeError%":ed,"%Uint8Array%":"undefined"==typeof Uint8Array?void 0:Uint8Array,"%Uint8ClampedArray%":"undefined"==typeof Uint8ClampedArray?void 0:Uint8ClampedArray,"%Uint16Array%":"undefined"==typeof Uint16Array?void 0:Uint16Array,"%Uint32Array%":"undefined"==typeof Uint32Array?void 0:Uint32Array,"%URIError%":URIError,"%WeakMap%":"undefined"==typeof WeakMap?void 0:WeakMap,"%WeakRef%":"undefined"==typeof WeakRef?void 0:WeakRef,"%WeakSet%":"undefined"==typeof WeakSet?void 0:WeakSet};if(ey)try{null.error;// eslint-disable-line no-unused-expressions
}catch(t){// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
var eE=ey(ey(t));eb["%Error.prototype%"]=eE}var eT=function t(e){var r;if("%AsyncFunction%"===e)r=ec("async function () {}");else if("%GeneratorFunction%"===e)r=ec("function* () {}");else if("%AsyncGeneratorFunction%"===e)r=ec("async function* () {}");else if("%AsyncGenerator%"===e){var i=t("%AsyncGeneratorFunction%");i&&(r=i.prototype)}else if("%AsyncIteratorPrototype%"===e){var s=t("%AsyncGenerator%");s&&ey&&(r=ey(s.prototype))}return eb[e]=r,r},eA={"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},eS={},ew={},eR=Array.prototype.slice,eI=Object.prototype.toString;ew=function(t){var e,r=this;if("function"!=typeof r||"[object Function]"!==eI.call(r))throw TypeError("Function.prototype.bind called on incompatible "+r);for(var i=eR.call(arguments,1),s=Math.max(0,r.length-i.length),n=[],a=0;a<s;a++)n.push("$"+a);if(e=Function("binder","return function ("+n.join(",")+"){ return binder.apply(this,arguments); }")(function(){if(!(this instanceof e))return r.apply(t,i.concat(eR.call(arguments)));var s=r.apply(this,i.concat(eR.call(arguments)));return Object(s)===s?s:this}),r.prototype){var o=function(){};o.prototype=r.prototype,e.prototype=new o,o.prototype=null}return e};var eC={};eC=(eS=Function.prototype.bind||ew).call(Function.call,Object.prototype.hasOwnProperty);var eP=eS.call(Function.call,Array.prototype.concat),eM=eS.call(Function.apply,Array.prototype.splice),eD=eS.call(Function.call,String.prototype.replace),eO=eS.call(Function.call,String.prototype.slice),eB=eS.call(Function.call,RegExp.prototype.exec),eN=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,eF=/\\(\\)?/g,eL=function(t){var e=eO(t,0,1),r=eO(t,-1);if("%"===e&&"%"!==r)throw new el("invalid intrinsic syntax, expected closing `%`");if("%"===r&&"%"!==e)throw new el("invalid intrinsic syntax, expected opening `%`");var i=[];return eD(t,eN,function(t,e,r,s){i[i.length]=r?eD(s,eF,"$1"):e||t}),i},eU=function(t,e){var r,i=t;if(eC(eA,i)&&(i="%"+(r=eA[i])[0]+"%"),eC(eb,i)){var s=eb[i];if(s===ev&&(s=eT(i)),void 0===s&&!e)throw new ed("intrinsic "+t+" exists, but is not available. Please file an issue!");return{alias:r,name:i,value:s}}throw new el("intrinsic "+t+" does not exist!")},ek={},eG={},eH=(eh=function(t,e){if("string"!=typeof t||0===t.length)throw new ed("intrinsic name must be a non-empty string");if(arguments.length>1&&"boolean"!=typeof e)throw new ed('"allowMissing" argument must be a boolean');if(null===eB(/^%?[^%]*%?$/,t))throw new el("`%` may not be present anywhere but at the beginning and end of the intrinsic name");var r=eL(t),i=r.length>0?r[0]:"",s=eU("%"+i+"%",e),n=s.name,a=s.value,o=!1,h=s.alias;h&&(i=h[0],eM(r,eP([0,1],h)));for(var l=1,u=!0;l<r.length;l+=1){var d=r[l],c=eO(d,0,1),p=eO(d,-1);if(('"'===c||"'"===c||"`"===c||'"'===p||"'"===p||"`"===p)&&c!==p)throw new el("property names with quotes must have matching quotes");if("constructor"!==d&&u||(o=!0),i+="."+d,eC(eb,n="%"+i+"%"))a=eb[n];else if(null!=a){if(!(d in a)){if(!e)throw new ed("base intrinsic for "+t+" exists, but the property is not available.");return}if(ep&&l+1>=r.length){var f=ep(a,d);// By convention, when a data property is converted to an accessor
// property to emulate a data property that does not suffer from
// the override mistake, that accessor's getter is marked with
// an `originalValue` property. Here, when we detect this, we
// uphold the illusion by pretending to see that original data
// property, i.e., returning the value rather than the getter
// itself.
a=(u=!!f)&&"get"in f&&!("originalValue"in f.get)?f.get:a[d]}else u=eC(a,d),a=a[d];u&&!o&&(eb[n]=a)}}return a})("%Function.prototype.apply%"),ej=eh("%Function.prototype.call%"),eX=eh("%Reflect.apply%",!0)||eS.call(ej,eH),eV=eh("%Object.getOwnPropertyDescriptor%",!0),ez=eh("%Object.defineProperty%",!0),eW=eh("%Math.max%");if(ez)try{ez({},"a",{value:1})}catch(t){// IE 8 has a broken defineProperty
ez=null}eG=function(t){var e=eX(eS,ej,arguments);return eV&&ez&&eV(e,"length").configurable&&ez(e,"length",{value:1+eW(0,t.length-(arguments.length-1))}),e};var e$=function(){return eX(eS,eH,arguments)};ez?ez(eG,"apply",{value:e$}):eG.apply=e$;var eY=eG(eh("String.prototype.indexOf"));ek=function(t,e){var r=eh(t,!!e);return"function"==typeof r&&eY(t,".prototype.")>-1?eG(r):r};var eq={},eK="function"==typeof Map&&Map.prototype,eZ=Object.getOwnPropertyDescriptor&&eK?Object.getOwnPropertyDescriptor(Map.prototype,"size"):null,eQ=eK&&eZ&&"function"==typeof eZ.get?eZ.get:null,eJ=eK&&Map.prototype.forEach,e0="function"==typeof Set&&Set.prototype,e1=Object.getOwnPropertyDescriptor&&e0?Object.getOwnPropertyDescriptor(Set.prototype,"size"):null,e2=e0&&e1&&"function"==typeof e1.get?e1.get:null,e3=e0&&Set.prototype.forEach,e4="function"==typeof WeakMap&&WeakMap.prototype?WeakMap.prototype.has:null,e5="function"==typeof WeakSet&&WeakSet.prototype?WeakSet.prototype.has:null,e6="function"==typeof WeakRef&&WeakRef.prototype?WeakRef.prototype.deref:null,e8=Boolean.prototype.valueOf,e7=Object.prototype.toString,e9=Function.prototype.toString,rt=String.prototype.match,re=String.prototype.slice,rr=String.prototype.replace,ri=String.prototype.toUpperCase,rs=String.prototype.toLowerCase,rn=RegExp.prototype.test,ra=Array.prototype.concat,ro=Array.prototype.join,rh=Array.prototype.slice,rl=Math.floor,ru="function"==typeof BigInt?BigInt.prototype.valueOf:null,rd=Object.getOwnPropertySymbols,rc="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?Symbol.prototype.toString:null,rp="function"==typeof Symbol&&"object"==typeof Symbol.iterator,rf="function"==typeof Symbol&&Symbol.toStringTag&&(typeof Symbol.toStringTag===rp?"object":"symbol")?Symbol.toStringTag:null,rm=Object.prototype.propertyIsEnumerable,rg=("function"==typeof Reflect?Reflect.getPrototypeOf:Object.getPrototypeOf)||([].__proto__===Array.prototype// eslint-disable-line no-proto
?function(t){return t.__proto__;// eslint-disable-line no-proto
}:null);function r_(t,e){if(t===1/0||t===-1/0||t!=t||t&&t>-1e3&&t<1e3||rn.call(/e/,e))return e;var r=/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;if("number"==typeof t){var i=t<0?-rl(-t):rl(t);// trunc(num)
if(i!==t){var s=String(i),n=re.call(e,s.length+1);return rr.call(s,r,"$&_")+"."+rr.call(rr.call(n,/([0-9]{3})/g,"$&_"),/_$/,"")}}return rr.call(e,r,"$&_")}var ry={},rv=ry.custom,rx=rA(rv)?rv:null;function rb(t,e,r){var i="double"===(r.quoteStyle||e)?'"':"'";return i+t+i}function rE(t){return"[object Array]"===rR(t)&&(!rf||!("object"==typeof t&&rf in t))}function rT(t){return"[object RegExp]"===rR(t)&&(!rf||!("object"==typeof t&&rf in t))}// Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
function rA(t){if(rp)return t&&"object"==typeof t&&t instanceof Symbol;if("symbol"==typeof t)return!0;if(!t||"object"!=typeof t||!rc)return!1;try{return rc.call(t),!0}catch(t){}return!1}eq=function t(e,r,i,s){var n=r||{};if(rw(n,"quoteStyle")&&"single"!==n.quoteStyle&&"double"!==n.quoteStyle)throw TypeError('option "quoteStyle" must be "single" or "double"');if(rw(n,"maxStringLength")&&("number"==typeof n.maxStringLength?n.maxStringLength<0&&n.maxStringLength!==1/0:null!==n.maxStringLength))throw TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');var a=!rw(n,"customInspect")||n.customInspect;if("boolean"!=typeof a&&"symbol"!==a)throw TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");if(rw(n,"indent")&&null!==n.indent&&"	"!==n.indent&&!(parseInt(n.indent,10)===n.indent&&n.indent>0))throw TypeError('option "indent" must be "\\t", an integer > 0, or `null`');if(rw(n,"numericSeparator")&&"boolean"!=typeof n.numericSeparator)throw TypeError('option "numericSeparator", if provided, must be `true` or `false`');var o=n.numericSeparator;if(void 0===e)return"undefined";if(null===e)return"null";if("boolean"==typeof e)return e?"true":"false";if("string"==typeof e)return function t(e,r){if(e.length>r.maxStringLength){var i=e.length-r.maxStringLength;return t(re.call(e,0,r.maxStringLength),r)+"... "+i+" more character"+(i>1?"s":"")}return rb(rr.call(rr.call(e,/(['\\])/g,"\\$1"),/[\x00-\x1f]/g,rC),"single",r)}(e,n);if("number"==typeof e){if(0===e)return 1/0/e>0?"0":"-0";var h=String(e);return o?r_(e,h):h}if("bigint"==typeof e){var l=String(e)+"n";return o?r_(e,l):l}var u=void 0===n.depth?5:n.depth;if(void 0===i&&(i=0),i>=u&&u>0&&"object"==typeof e)return rE(e)?"[Array]":"[Object]";var d=function(t,e){var r;if("	"===t.indent)r="	";else{if("number"!=typeof t.indent||!(t.indent>0))return null;r=ro.call(Array(t.indent+1)," ")}return{base:r,prev:ro.call(Array(e+1),r)}}(n,i);if(void 0===s)s=[];else if(rI(s,e)>=0)return"[Circular]";function c(e,r,a){if(r&&(s=rh.call(s)).push(r),a){var o={depth:n.depth};return rw(n,"quoteStyle")&&(o.quoteStyle=n.quoteStyle),t(e,o,i+1,s)}return t(e,n,i+1,s)}if("function"==typeof e&&!rT(e)){var p=function(t){if(t.name)return t.name;var e=rt.call(e9.call(t),/^function\s*([\w$]+)/);return e?e[1]:null}(e),f=rB(e,c);return"[Function"+(p?": "+p:" (anonymous)")+"]"+(f.length>0?" { "+ro.call(f,", ")+" }":"")}if(rA(e)){var m=rp?rr.call(String(e),/^(Symbol\(.*\))_[^)]*$/,"$1"):rc.call(e);return"object"!=typeof e||rp?m:rP(m)}if(e&&"object"==typeof e&&("undefined"!=typeof HTMLElement&&e instanceof HTMLElement||"string"==typeof e.nodeName&&"function"==typeof e.getAttribute)){for(var g,_="<"+rs.call(String(e.nodeName)),y=e.attributes||[],v=0;v<y.length;v++)_+=" "+y[v].name+"="+rb((g=y[v].value,rr.call(String(g),/"/g,"&quot;")),"double",n);return _+=">",e.childNodes&&e.childNodes.length&&(_+="..."),_+="</"+rs.call(String(e.nodeName))+">"}if(rE(e)){if(0===e.length)return"[]";var x=rB(e,c);return d&&!function(t){for(var e=0;e<t.length;e++)if(rI(t[e],"\n")>=0)return!1;return!0}(x)?"["+rO(x,d)+"]":"[ "+ro.call(x,", ")+" ]"}if("[object Error]"===rR(e)&&(!rf||!("object"==typeof e&&rf in e))){var b=rB(e,c);return"cause"in Error.prototype||!("cause"in e)||rm.call(e,"cause")?0===b.length?"["+String(e)+"]":"{ ["+String(e)+"] "+ro.call(b,", ")+" }":"{ ["+String(e)+"] "+ro.call(ra.call("[cause]: "+c(e.cause),b),", ")+" }"}if("object"==typeof e&&a){if(rx&&"function"==typeof e[rx]&&ry)return ry(e,{depth:u-i});if("symbol"!==a&&"function"==typeof e.inspect)return e.inspect()}if(function(t){if(!eQ||!t||"object"!=typeof t)return!1;try{eQ.call(t);try{e2.call(t)}catch(t){return!0}return t instanceof Map;// core-js workaround, pre-v2.5.0
}catch(t){}return!1}(e)){var E=[];return eJ&&eJ.call(e,function(t,r){E.push(c(r,e,!0)+" => "+c(t,e))}),rD("Map",eQ.call(e),E,d)}if(function(t){if(!e2||!t||"object"!=typeof t)return!1;try{e2.call(t);try{eQ.call(t)}catch(t){return!0}return t instanceof Set;// core-js workaround, pre-v2.5.0
}catch(t){}return!1}(e)){var T=[];return e3&&e3.call(e,function(t){T.push(c(t,e))}),rD("Set",e2.call(e),T,d)}if(function(t){if(!e4||!t||"object"!=typeof t)return!1;try{e4.call(t,e4);try{e5.call(t,e5)}catch(t){return!0}return t instanceof WeakMap;// core-js workaround, pre-v2.5.0
}catch(t){}return!1}(e))return rM("WeakMap");if(function(t){if(!e5||!t||"object"!=typeof t)return!1;try{e5.call(t,e5);try{e4.call(t,e4)}catch(t){return!0}return t instanceof WeakSet;// core-js workaround, pre-v2.5.0
}catch(t){}return!1}(e))return rM("WeakSet");if(function(t){if(!e6||!t||"object"!=typeof t)return!1;try{return e6.call(t),!0}catch(t){}return!1}(e))return rM("WeakRef");if("[object Number]"===rR(e)&&(!rf||!("object"==typeof e&&rf in e)))return rP(c(Number(e)));if(function(t){if(!t||"object"!=typeof t||!ru)return!1;try{return ru.call(t),!0}catch(t){}return!1}(e))return rP(c(ru.call(e)));if("[object Boolean]"===rR(e)&&(!rf||!("object"==typeof e&&rf in e)))return rP(e8.call(e));if("[object String]"===rR(e)&&(!rf||!("object"==typeof e&&rf in e)))return rP(c(String(e)));if(!("[object Date]"===rR(e)&&(!rf||!("object"==typeof e&&rf in e)))&&!rT(e)){var A=rB(e,c),S=rg?rg(e)===Object.prototype:e instanceof Object||e.constructor===Object,w=e instanceof Object?"":"null prototype",R=!S&&rf&&Object(e)===e&&rf in e?re.call(rR(e),8,-1):w?"Object":"",I=(S||"function"!=typeof e.constructor?"":e.constructor.name?e.constructor.name+" ":"")+(R||w?"["+ro.call(ra.call([],R||[],w||[]),": ")+"] ":"");return 0===A.length?I+"{}":d?I+"{"+rO(A,d)+"}":I+"{ "+ro.call(A,", ")+" }"}return String(e)};var rS=Object.prototype.hasOwnProperty||function(t){return t in this};function rw(t,e){return rS.call(t,e)}function rR(t){return e7.call(t)}function rI(t,e){if(t.indexOf)return t.indexOf(e);for(var r=0,i=t.length;r<i;r++)if(t[r]===e)return r;return -1}function rC(t){var e=t.charCodeAt(0),r={8:"b",9:"t",10:"n",12:"f",13:"r"}[e];return r?"\\"+r:"\\x"+(e<16?"0":"")+ri.call(e.toString(16))}function rP(t){return"Object("+t+")"}function rM(t){return t+" { ? }"}function rD(t,e,r,i){return t+" ("+e+") {"+(i?rO(r,i):ro.call(r,", "))+"}"}function rO(t,e){if(0===t.length)return"";var r="\n"+e.prev+e.base;return r+ro.call(t,","+r)+"\n"+e.prev}function rB(t,e){var r,i=rE(t),s=[];if(i){s.length=t.length;for(var n=0;n<t.length;n++)s[n]=rw(t,n)?e(t[n],t):""}var a="function"==typeof rd?rd(t):[];if(rp){r={};for(var o=0;o<a.length;o++)r["$"+a[o]]=a[o]}for(var h in t)if(rw(t,h)&&(!i||String(Number(h))!==h||!(h<t.length))){// eslint-disable-line no-restricted-syntax, no-continue
if(rp&&r["$"+h]instanceof Symbol)continue;// eslint-disable-line no-restricted-syntax, no-continue
rn.call(/[^\w$]/,h)?s.push(e(h,t)+": "+e(t[h],t)):s.push(h+": "+e(t[h],t))}if("function"==typeof rd)for(var l=0;l<a.length;l++)rm.call(t,a[l])&&s.push("["+e(a[l])+"]: "+e(t[a[l]],t));return s}var rN=eh("%TypeError%"),rF=eh("%WeakMap%",!0),rL=eh("%Map%",!0),rU=ek("WeakMap.prototype.get",!0),rk=ek("WeakMap.prototype.set",!0),rG=ek("WeakMap.prototype.has",!0),rH=ek("Map.prototype.get",!0),rj=ek("Map.prototype.set",!0),rX=ek("Map.prototype.has",!0),rV=function(t,e){for(var r,i=t;null!==(r=i.next);i=r)if(r.key===e)return i.next=r.next,r.next=t.next,t.next=r,r},rz=function(t,e){var r=rV(t,e);return r&&r.value},rW=function(t,e,r){var i=rV(t,e);i?i.value=r:t.next={key:e,next:t.next,value:r}};eo=function(){var t,e,r,i={assert:function(t){if(!i.has(t))throw new rN("Side channel does not contain "+eq(t))},get:function(i){if(rF&&i&&("object"==typeof i||"function"==typeof i)){if(t)return rU(t,i)}else if(rL){if(e)return rH(e,i)}else if(r)return rz(r,i)},has:function(i){if(rF&&i&&("object"==typeof i||"function"==typeof i)){if(t)return rG(t,i)}else if(rL){if(e)return rX(e,i)}else if(r)return!!rV(r,i);return!1},set:function(i,s){rF&&i&&("object"==typeof i||"function"==typeof i)?(t||(t=new rF),rk(t,i,s)):rL?(e||(e=new rL),rj(e,i,s)):(r||/*
					 * Initialize the linked list as an empty node, so that we don't have
					 * to special-case handling of the first node: we can always refer to
					 * it as (previous node).next, instead of something like (list).head
					 */(r={key:{},next:null}),rW(r,i,s))}};return i};var r$={},rY={},rq=String.prototype.replace,rK=/%20/g,rZ={RFC1738:"RFC1738",RFC3986:"RFC3986"};rY={default:rZ.RFC3986,formatters:{RFC1738:function(t){return rq.call(t,rK,"+")},RFC3986:function(t){return String(t)}},RFC1738:rZ.RFC1738,RFC3986:rZ.RFC3986};var rQ=Object.prototype.hasOwnProperty,rJ=Array.isArray,r0=function(){for(var t=[],e=0;e<256;++e)t.push("%"+((e<16?"0":"")+e.toString(16)).toUpperCase());return t}(),r1=function(t){for(;t.length>1;){var e=t.pop(),r=e.obj[e.prop];if(rJ(r)){for(var i=[],s=0;s<r.length;++s)void 0!==r[s]&&i.push(r[s]);e.obj[e.prop]=i}}},r2=function(t,e){for(var r=e&&e.plainObjects?Object.create(null):{},i=0;i<t.length;++i)void 0!==t[i]&&(r[i]=t[i]);return r};r$={arrayToObject:r2,assign:function(t,e){return Object.keys(e).reduce(function(t,r){return t[r]=e[r],t},t)},combine:function(t,e){return[].concat(t,e)},compact:function(t){for(var e=[{obj:{o:t},prop:"o"}],r=[],i=0;i<e.length;++i)for(var s=e[i],n=s.obj[s.prop],a=Object.keys(n),o=0;o<a.length;++o){var h=a[o],l=n[h];"object"==typeof l&&null!==l&&-1===r.indexOf(l)&&(e.push({obj:n,prop:h}),r.push(l))}return r1(e),t},decode:function(t,e,r){var i=t.replace(/\+/g," ");if("iso-8859-1"===r)return i.replace(/%[0-9a-f]{2}/gi,unescape);// utf-8
try{return decodeURIComponent(i)}catch(t){return i}},encode:function(t,e,r,i,s){// This code was originally written by Brian White (mscdex) for the io.js core querystring library.
// It has been adapted here for stricter adherence to RFC 3986
if(0===t.length)return t;var n=t;if("symbol"==typeof t?n=Symbol.prototype.toString.call(t):"string"!=typeof t&&(n=String(t)),"iso-8859-1"===r)return escape(n).replace(/%u[0-9a-f]{4}/gi,function(t){return"%26%23"+parseInt(t.slice(2),16)+"%3B"});for(var a="",o=0;o<n.length;++o){var h=n.charCodeAt(o);if(45// -
===h||46// .
===h||95// _
===h||126// ~
===h||h>=48&&h<=57// 0-9
||h>=65&&h<=90// a-z
||h>=97&&h<=122// A-Z
||s===rY.RFC1738&&(40===h||41// ( )
===h)){a+=n.charAt(o);continue}if(h<128){a+=r0[h];continue}if(h<2048){a+=r0[192|h>>6]+r0[128|63&h];continue}if(h<55296||h>=57344){a+=r0[224|h>>12]+r0[128|h>>6&63]+r0[128|63&h];continue}o+=1,/* eslint operator-linebreak: [2, "before"] */a+=r0[240|(h=65536+((1023&h)<<10|1023&n.charCodeAt(o)))>>18]+r0[128|h>>12&63]+r0[128|h>>6&63]+r0[128|63&h]}return a},isBuffer:function(t){return!!t&&"object"==typeof t&&!!(t.constructor&&t.constructor.isBuffer&&t.constructor.isBuffer(t))},isRegExp:function(t){return"[object RegExp]"===Object.prototype.toString.call(t)},maybeMap:function(t,e){if(rJ(t)){for(var r=[],i=0;i<t.length;i+=1)r.push(e(t[i]));return r}return e(t)},merge:function t(e,r,i){/* eslint no-param-reassign: 0 */if(!r)return e;if("object"!=typeof r){if(rJ(e))e.push(r);else{if(!e||"object"!=typeof e)return[e,r];(i&&(i.plainObjects||i.allowPrototypes)||!rQ.call(Object.prototype,r))&&(e[r]=!0)}return e}if(!e||"object"!=typeof e)return[e].concat(r);var s=e;return(rJ(e)&&!rJ(r)&&(s=r2(e,i)),rJ(e)&&rJ(r))?(r.forEach(function(r,s){if(rQ.call(e,s)){var n=e[s];n&&"object"==typeof n&&r&&"object"==typeof r?e[s]=t(n,r,i):e.push(r)}else e[s]=r}),e):Object.keys(r).reduce(function(e,s){var n=r[s];return rQ.call(e,s)?e[s]=t(e[s],n,i):e[s]=n,e},s)}};var r3=Object.prototype.hasOwnProperty,r4={brackets:function(t){return t+"[]"},comma:"comma",indices:function(t,e){return t+"["+e+"]"},repeat:function(t){return t}},r5=Array.isArray,r6=Array.prototype.push,r8=function(t,e){r6.apply(t,r5(e)?e:[e])},r7=Date.prototype.toISOString,r9=rY.default,it={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:r$.encode,encodeValuesOnly:!1,format:r9,formatter:rY.formatters[r9],// deprecated
indices:!1,serializeDate:function(t){return r7.call(t)},skipNulls:!1,strictNullHandling:!1},ie={},ir=function t(e,r,i,s,n,a,o,h,l,u,d,c,p,f,m,g){for(var _,y,v=e,x=g,b=0,E=!1;void 0!==(x=x.get(ie))&&!E;){// Where object last appeared in the ref tree
var T=x.get(e);if(b+=1,void 0!==T){if(T===b)throw RangeError("Cyclic object value");// Break while
E=!0}void 0===x.get(ie)&&(b=0)}if("function"==typeof h?v=h(r,v):v instanceof Date?v=d(v):"comma"===i&&r5(v)&&(v=r$.maybeMap(v,function(t){return t instanceof Date?d(t):t})),null===v){if(n)return o&&!f?o(r,it.encoder,m,"key",c):r;v=""}if("string"==typeof(_=v)||"number"==typeof _||"boolean"==typeof _||"symbol"==typeof _||"bigint"==typeof _||r$.isBuffer(v))return o?[p(f?r:o(r,it.encoder,m,"key",c))+"="+p(o(v,it.encoder,m,"value",c))]:[p(r)+"="+p(String(v))];var A=[];if(void 0===v)return A;if("comma"===i&&r5(v))f&&o&&(v=r$.maybeMap(v,o)),y=[{value:v.length>0?v.join(",")||null:void 0}];else if(r5(h))y=h;else{var S=Object.keys(v);y=l?S.sort(l):S}for(var w=s&&r5(v)&&1===v.length?r+"[]":r,R=0;R<y.length;++R){var I=y[R],C="object"==typeof I&&void 0!==I.value?I.value:v[I];if(!a||null!==C){var P=r5(v)?"function"==typeof i?i(w,I):w:w+(u?"."+I:"["+I+"]");g.set(e,b);var M=eo();M.set(ie,g),r8(A,t(C,P,i,s,n,a,"comma"===i&&f&&r5(v)?null:o,h,l,u,d,c,p,f,m,M))}}return A},ii=function(t){if(!t)return it;if(null!==t.encoder&&void 0!==t.encoder&&"function"!=typeof t.encoder)throw TypeError("Encoder has to be a function.");var e=t.charset||it.charset;if(void 0!==t.charset&&"utf-8"!==t.charset&&"iso-8859-1"!==t.charset)throw TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=rY.default;if(void 0!==t.format){if(!r3.call(rY.formatters,t.format))throw TypeError("Unknown format option provided.");r=t.format}var i=rY.formatters[r],s=it.filter;return("function"==typeof t.filter||r5(t.filter))&&(s=t.filter),{addQueryPrefix:"boolean"==typeof t.addQueryPrefix?t.addQueryPrefix:it.addQueryPrefix,allowDots:void 0===t.allowDots?it.allowDots:!!t.allowDots,charset:e,charsetSentinel:"boolean"==typeof t.charsetSentinel?t.charsetSentinel:it.charsetSentinel,delimiter:void 0===t.delimiter?it.delimiter:t.delimiter,encode:"boolean"==typeof t.encode?t.encode:it.encode,encoder:"function"==typeof t.encoder?t.encoder:it.encoder,encodeValuesOnly:"boolean"==typeof t.encodeValuesOnly?t.encodeValuesOnly:it.encodeValuesOnly,filter:s,format:r,formatter:i,serializeDate:"function"==typeof t.serializeDate?t.serializeDate:it.serializeDate,skipNulls:"boolean"==typeof t.skipNulls?t.skipNulls:it.skipNulls,sort:"function"==typeof t.sort?t.sort:null,strictNullHandling:"boolean"==typeof t.strictNullHandling?t.strictNullHandling:it.strictNullHandling}};ea=function(t,e){var r,i,s=t,n=ii(e);"function"==typeof n.filter?s=(0,n.filter)("",s):r5(n.filter)&&(r=n.filter);var a=[];if("object"!=typeof s||null===s)return"";i=e&&e.arrayFormat in r4?e.arrayFormat:e&&"indices"in e?e.indices?"indices":"repeat":"indices";var o=r4[i];if(e&&"commaRoundTrip"in e&&"boolean"!=typeof e.commaRoundTrip)throw TypeError("`commaRoundTrip` must be a boolean, or absent");var h="comma"===o&&e&&e.commaRoundTrip;r||(r=Object.keys(s)),n.sort&&r.sort(n.sort);for(var l=eo(),u=0;u<r.length;++u){var d=r[u];n.skipNulls&&null===s[d]||r8(a,ir(s[d],d,o,h,n.strictNullHandling,n.skipNulls,n.encode?n.encoder:null,n.filter,n.sort,n.allowDots,n.serializeDate,n.format,n.formatter,n.encodeValuesOnly,n.charset,l))}var c=a.join(n.delimiter),p=!0===n.addQueryPrefix?"?":"";return n.charsetSentinel&&("iso-8859-1"===n.charset?p+="utf8=%26%2310003%3B&":p+="utf8=%E2%9C%93&"),c.length>0?p+c:""};var is=Object.prototype.hasOwnProperty,ia=Array.isArray,io={allowDots:!1,allowPrototypes:!1,allowSparse:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:r$.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},ih=function(t,e){return t&&"string"==typeof t&&e.comma&&t.indexOf(",")>-1?t.split(","):t},il=function(t,e){var r={__proto__:null},i=e.ignoreQueryPrefix?t.replace(/^\?/,""):t,s=e.parameterLimit===1/0?void 0:e.parameterLimit,n=i.split(e.delimiter,s),a=-1,o=e.charset;if(e.charsetSentinel)for(h=0;h<n.length;++h)0===n[h].indexOf("utf8=")&&("utf8=%E2%9C%93"===n[h]?o="utf-8":"utf8=%26%2310003%3B"===n[h]&&(o="iso-8859-1"),a=h,h=n.length);for(h=0;h<n.length;++h)if(h!==a){var h,l,u,d=n[h],c=d.indexOf("]="),p=-1===c?d.indexOf("="):c+1;-1===p?(l=e.decoder(d,io.decoder,o,"key"),u=e.strictNullHandling?null:""):(l=e.decoder(d.slice(0,p),io.decoder,o,"key"),u=r$.maybeMap(ih(d.slice(p+1),e),function(t){return e.decoder(t,io.decoder,o,"value")})),u&&e.interpretNumericEntities&&"iso-8859-1"===o&&(u=u.replace(/&#(\d+);/g,function(t,e){return String.fromCharCode(parseInt(e,10))})),d.indexOf("[]=")>-1&&(u=ia(u)?[u]:u),is.call(r,l)?r[l]=r$.combine(r[l],u):r[l]=u}return r},iu=function(t,e,r,i){for(var s=i?e:ih(e,r),n=t.length-1;n>=0;--n){var a,o=t[n];if("[]"===o&&r.parseArrays)a=[].concat(s);else{a=r.plainObjects?Object.create(null):{};var h="["===o.charAt(0)&&"]"===o.charAt(o.length-1)?o.slice(1,-1):o,l=parseInt(h,10);r.parseArrays||""!==h?!isNaN(l)&&o!==h&&String(l)===h&&l>=0&&r.parseArrays&&l<=r.arrayLimit?(a=[])[l]=s:"__proto__"!==h&&(a[h]=s):a={0:s}}s=a}return s},id=function(t,e,r,i){if(t){// Transform dot notation to bracket notation
var s=r.allowDots?t.replace(/\.([^.[]+)/g,"[$1]"):t,n=/(\[[^[\]]*])/g,a=r.depth>0&&/(\[[^[\]]*])/.exec(s),o=a?s.slice(0,a.index):s,h=[];if(o){// If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
if(!r.plainObjects&&is.call(Object.prototype,o)&&!r.allowPrototypes)return;h.push(o)}for(// Loop through children appending to the array until we hit depth
var l=0;r.depth>0&&null!==(a=n.exec(s))&&l<r.depth;){if(l+=1,!r.plainObjects&&is.call(Object.prototype,a[1].slice(1,-1))&&!r.allowPrototypes)return;h.push(a[1])}return a&&h.push("["+s.slice(a.index)+"]"),iu(h,e,r,i)}},ic=function(t){if(!t)return io;if(null!==t.decoder&&void 0!==t.decoder&&"function"!=typeof t.decoder)throw TypeError("Decoder has to be a function.");if(void 0!==t.charset&&"utf-8"!==t.charset&&"iso-8859-1"!==t.charset)throw TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var e=void 0===t.charset?io.charset:t.charset;return{allowDots:void 0===t.allowDots?io.allowDots:!!t.allowDots,allowPrototypes:"boolean"==typeof t.allowPrototypes?t.allowPrototypes:io.allowPrototypes,allowSparse:"boolean"==typeof t.allowSparse?t.allowSparse:io.allowSparse,arrayLimit:"number"==typeof t.arrayLimit?t.arrayLimit:io.arrayLimit,charset:e,charsetSentinel:"boolean"==typeof t.charsetSentinel?t.charsetSentinel:io.charsetSentinel,comma:"boolean"==typeof t.comma?t.comma:io.comma,decoder:"function"==typeof t.decoder?t.decoder:io.decoder,delimiter:"string"==typeof t.delimiter||r$.isRegExp(t.delimiter)?t.delimiter:io.delimiter,// eslint-disable-next-line no-implicit-coercion, no-extra-parens
depth:"number"==typeof t.depth||!1===t.depth?+t.depth:io.depth,ignoreQueryPrefix:!0===t.ignoreQueryPrefix,interpretNumericEntities:"boolean"==typeof t.interpretNumericEntities?t.interpretNumericEntities:io.interpretNumericEntities,parameterLimit:"number"==typeof t.parameterLimit?t.parameterLimit:io.parameterLimit,parseArrays:!1!==t.parseArrays,plainObjects:"boolean"==typeof t.plainObjects?t.plainObjects:io.plainObjects,strictNullHandling:"boolean"==typeof t.strictNullHandling?t.strictNullHandling:io.strictNullHandling}};function ip(t,e,r){if(t&&"object"==typeof t&&t instanceof t3)return t;var i=new t3;return i.parse(t,e,r),i}en={formats:rY,parse:function(t,e){var r=ic(e);if(""===t||null==t)return r.plainObjects?Object.create(null):{};for(var i="string"==typeof t?il(t,r):t,s=r.plainObjects?Object.create(null):{},n=Object.keys(i),a=0;a<n.length;++a){var o=n[a],h=id(o,i[o],r,"string"==typeof t);s=r$.merge(s,h,r)}return!0===r.allowSparse?s:r$.compact(s)},stringify:ea},t3.prototype.parse=function(t,e,r){if("string"!=typeof t)throw TypeError("Parameter 'url' must be a string, not "+typeof t);/*
   * Copy chrome, IE, opera backslash-handling behavior.
   * Back slashes before the query string get converted to forward slashes
   * See: https://code.google.com/p/chromium/issues/detail?id=25916
   */var i=t.indexOf("?"),s=-1!==i&&i<t.indexOf("#")?"?":"#",n=t.split(s);n[0]=n[0].replace(/\\/g,"/");var a=t=n.join(s);if(/*
   * trim before proceeding.
   * This is to support parse stuff like "  http://foo.com  \n"
   */a=a.trim(),!r&&1===t.split("#").length){// Try fast path regexp
var o=t6.exec(a);if(o)return this.path=a,this.href=a,this.pathname=o[1],o[2]?(this.search=o[2],e?this.query=en.parse(this.search.substr(1)):this.query=this.search.substr(1)):e&&(this.search="",this.query={}),this}var h=t4.exec(a);if(h){var l=(h=h[0]).toLowerCase();this.protocol=l,a=a.substr(h.length)}/*
   * figure out if it's got a host
   * user@server is *always* interpreted as a hostname, and url
   * resolution will treat //foo/bar as host=foo,path=bar because that's
   * how the browser resolves relative URLs.
   */if(r||h||a.match(/^\/\/[^@/]+@[^@/]+/)){var u="//"===a.substr(0,2);u&&!(h&&ei[h])&&(a=a.substr(2),this.slashes=!0)}if(!ei[h]&&(u||h&&!es[h])){for(var d,c,p=-1,f=0;f<t9.length;f++){var m=a.indexOf(t9[f]);-1!==m&&(-1===p||m<p)&&(p=m)}-1!==(c=-1===p?a.lastIndexOf("@"):a.lastIndexOf("@",p))&&(d=a.slice(0,c),a=a.slice(c+1),this.auth=decodeURIComponent(d)),// the host is the remaining to the left of the first non-host char
p=-1;for(var f=0;f<t7.length;f++){var m=a.indexOf(t7[f]);-1!==m&&(-1===p||m<p)&&(p=m)}-1===p&&(p=a.length),this.host=a.slice(0,p),a=a.slice(p),// pull out port.
this.parseHost(),/*
     * we've indicated that there is a hostname,
     * so even if it's empty, it has to be present.
     */this.hostname=this.hostname||"";/*
     * if hostname begins with [ and ends with ]
     * assume that it's an IPv6 address.
     */var g="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];// validate a little.
if(!g)for(var _=this.hostname.split(/\./),f=0,y=_.length;f<y;f++){var v=_[f];if(v&&!v.match(et)){for(var x="",b=0,E=v.length;b<E;b++)v.charCodeAt(b)>127?/*
               * we replace non-ASCII char with a temporary placeholder
               * we need this to make sure size of hostname is not
               * broken by replacing non-ASCII by nothing
               */x+="x":x+=v[b];// we test again with ASCII char only
if(!x.match(et)){var T=_.slice(0,f),A=_.slice(f+1),S=v.match(ee);S&&(T.push(S[1]),A.unshift(S[2])),A.length&&(a="/"+A.join(".")+a),this.hostname=T.join(".");break}}}this.hostname.length>255?this.hostname="":this.hostname=this.hostname.toLowerCase(),g||/*
       * IDNA Support: Returns a punycoded representation of "domain".
       * It only converts parts of the domain name that
       * have non-ASCII characters, i.e. it doesn't matter if
       * you call it with a domain that already is ASCII-only.
       */(this.hostname=t2.toASCII(this.hostname));var w=this.port?":"+this.port:"",R=this.hostname||"";this.host=R+w,this.href+=this.host,g&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==a[0]&&(a="/"+a))}/*
   * now rest is set to the post-host stuff.
   * chop off any delim chars.
   */if(!er[l])/*
     * First, make 100% sure that any "autoEscape" chars get
     * escaped, even if encodeURIComponent doesn't think they
     * need to be.
     */for(var f=0,y=t8.length;f<y;f++){var I=t8[f];if(-1!==a.indexOf(I)){var C=encodeURIComponent(I);C===I&&(C=escape(I)),a=a.split(I).join(C)}}// chop off from the tail first.
var P=a.indexOf("#");-1!==P&&(// got a fragment string.
this.hash=a.substr(P),a=a.slice(0,P));var M=a.indexOf("?");// to support http.request
if(-1!==M?(this.search=a.substr(M),this.query=a.substr(M+1),e&&(this.query=en.parse(this.query)),a=a.slice(0,M)):e&&(// no query string, but parseQueryString still requested
this.search="",this.query={}),a&&(this.pathname=a),es[l]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var w=this.pathname||"",D=this.search||"";this.path=w+D}return(// finally, reconstruct the href based on what has been validated.
this.href=this.format(),this)},t3.prototype.format=function(){var t=this.auth||"";t&&(t=(t=encodeURIComponent(t)).replace(/%3A/i,":")+"@");var e=this.protocol||"",r=this.pathname||"",i=this.hash||"",s=!1,n="";this.host?s=t+this.host:this.hostname&&(s=t+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(s+=":"+this.port)),this.query&&"object"==typeof this.query&&Object.keys(this.query).length&&(n=en.stringify(this.query,{arrayFormat:"repeat",addQueryPrefix:!1}));var a=this.search||n&&"?"+n||"";return e&&":"!==e.substr(-1)&&(e+=":"),this.slashes||(!e||es[e])&&!1!==s?(s="//"+(s||""),r&&"/"!==r.charAt(0)&&(r="/"+r)):s||(s=""),i&&"#"!==i.charAt(0)&&(i="#"+i),a&&"?"!==a.charAt(0)&&(a="?"+a),e+s+(r=r.replace(/[?#]/g,function(t){return encodeURIComponent(t)}))+(a=a.replace("#","%23"))+i},t3.prototype.resolve=function(t){return this.resolveObject(ip(t,!1,!0)).format()},t3.prototype.resolveObject=function(t){if("string"==typeof t){var e=new t3;e.parse(t,!1,!0),t=e}for(var r=new t3,i=Object.keys(this),s=0;s<i.length;s++){var n=i[s];r[n]=this[n]}// if the relative url is empty, then there's nothing left to do here.
if(/*
   * hash is always overridden, no matter what.
   * even href="" will remove it.
   */r.hash=t.hash,""===t.href)return r.href=r.format(),r;// hrefs like //foo/bar always cut to the protocol.
if(t.slashes&&!t.protocol){for(var a=Object.keys(t),o=0;o<a.length;o++){var h=a[o];"protocol"!==h&&(r[h]=t[h])}return es[r.protocol]&&r.hostname&&!r.pathname&&(r.pathname="/",r.path=r.pathname),r.href=r.format(),r}if(t.protocol&&t.protocol!==r.protocol){/*
     * if it's a known url protocol, then changing
     * the protocol does weird things
     * first, if it's not file:, then we MUST have a host,
     * and if there was a path
     * to begin with, then we MUST have a path.
     * if it is file:, then the host is dropped,
     * because that's known to be hostless.
     * anything else is assumed to be absolute.
     */if(!es[t.protocol]){for(var l=Object.keys(t),u=0;u<l.length;u++){var d=l[u];r[d]=t[d]}return r.href=r.format(),r}if(r.protocol=t.protocol,t.host||ei[t.protocol])r.pathname=t.pathname;else{for(var c=(t.pathname||"").split("/");c.length&&!(t.host=c.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==c[0]&&c.unshift(""),c.length<2&&c.unshift(""),r.pathname=c.join("/")}// to support http.request
if(r.search=t.search,r.query=t.query,r.host=t.host||"",r.auth=t.auth,r.hostname=t.hostname||t.host,r.port=t.port,r.pathname||r.search){var p=r.pathname||"",f=r.search||"";r.path=p+f}return r.slashes=r.slashes||t.slashes,r.href=r.format(),r}var m=r.pathname&&"/"===r.pathname.charAt(0),g=t.host||t.pathname&&"/"===t.pathname.charAt(0),_=g||m||r.host&&t.pathname,y=_,v=r.pathname&&r.pathname.split("/")||[],c=t.pathname&&t.pathname.split("/")||[],x=r.protocol&&!es[r.protocol];if(x&&(r.hostname="",r.port=null,r.host&&(""===v[0]?v[0]=r.host:v.unshift(r.host)),r.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===c[0]?c[0]=t.host:c.unshift(t.host)),t.host=null),_=_&&(""===c[0]||""===v[0])),g)// it's absolute.
r.host=t.host||""===t.host?t.host:r.host,r.hostname=t.hostname||""===t.hostname?t.hostname:r.hostname,r.search=t.search,r.query=t.query,v=c;else if(c.length)v||(v=[]),v.pop(),v=v.concat(c),r.search=t.search,r.query=t.query;else if(null!=t.search){/*
     * just pull out the search.
     * like href='?foo'.
     * Put this after the other two cases because it simplifies the booleans
     */if(x){r.host=v.shift(),r.hostname=r.host;/*
       * occationaly the auth can get stuck only in host
       * this especially happens in cases like
       * url.resolveObject('mailto:local1@domain1', 'local2@domain2')
       */var b=!!(r.host&&r.host.indexOf("@")>0)&&r.host.split("@");b&&(r.auth=b.shift(),r.hostname=b.shift(),r.host=r.hostname)}return r.search=t.search,r.query=t.query,(null!==r.pathname||null!==r.search)&&(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.href=r.format(),r}if(!v.length)return(/*
     * no path at all.  easy.
     * we've already handled the other stuff above.
     */r.pathname=null,r.search?r.path="/"+r.search:r.path=null,r.href=r.format(),r);for(var E=v.slice(-1)[0],T=(r.host||t.host||v.length>1)&&("."===E||".."===E)||""===E,A=0,S=v.length;S>=0;S--)"."===(E=v[S])?v.splice(S,1):".."===E?(v.splice(S,1),A++):A&&(v.splice(S,1),A--);// if the path is allowed to go above the root, restore leading ..s
if(!_&&!y)for(;A--;A)v.unshift("..");_&&""!==v[0]&&(!v[0]||"/"!==v[0].charAt(0))&&v.unshift(""),T&&"/"!==v.join("/").substr(-1)&&v.push("");var w=""===v[0]||v[0]&&"/"===v[0].charAt(0);// put the host back
if(x){r.hostname=w?"":v.length?v.shift():"",r.host=r.hostname;/*
     * occationaly the auth can get stuck only in host
     * this especially happens in cases like
     * url.resolveObject('mailto:local1@domain1', 'local2@domain2')
     */var b=!!(r.host&&r.host.indexOf("@")>0)&&r.host.split("@");b&&(r.auth=b.shift(),r.hostname=b.shift(),r.host=r.hostname)}return(_=_||r.host&&v.length)&&!w&&v.unshift(""),v.length>0?r.pathname=v.join("/"):(r.pathname=null,r.path=null),(null!==r.pathname||null!==r.search)&&(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.auth=t.auth||r.auth,r.slashes=r.slashes||t.slashes,r.href=r.format(),r},t3.prototype.parseHost=function(){var t=this.host,e=t5.exec(t);e&&(":"!==(e=e[0])&&(this.port=e.substr(1)),t=t.substr(0,t.length-e.length)),t&&(this.hostname=t)},N=function(t,e){return ip(t,!1,!0).resolve(e)},F=// format a parsed object into a url string
function(t){return("string"==typeof t&&(t=ip(t)),t instanceof t3)?t.format():t3.prototype.format.call(t)};const im={};function ig(t,e,r=3){if(im[e])return;let i=Error().stack;typeof i>"u"?console.warn("PixiJS Deprecation Warning: ",`${e}
Deprecated since v${t}`):(i=i.split(`
`).splice(r).join(`
`),console.groupCollapsed?(console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s","color:#614108;background:#fffbe6","font-weight:normal;color:#614108;background:#fffbe6",`${e}
Deprecated since v${t}`),console.warn(i),console.groupEnd()):(console.warn("PixiJS Deprecation Warning: ",`${e}
Deprecated since v${t}`),console.warn(i))),im[e]=!0}const i_={/**
   * @deprecated since 7.3.0
   */get parse(){return ig("7.3.0","utils.url.parse is deprecated, use native URL API instead."),ip},/**
   * @deprecated since 7.3.0
   */get format(){return ig("7.3.0","utils.url.format is deprecated, use native URL API instead."),F},/**
   * @deprecated since 7.3.0
   */get resolve(){return ig("7.3.0","utils.url.resolve is deprecated, use native URL API instead."),N}};function iy(t){if("string"!=typeof t)throw TypeError(`Path must be a string. Received ${JSON.stringify(t)}`)}function iv(t){return t.split("?")[0].split("#")[0]}const ix={/**
   * Converts a path to posix format.
   * @param path - The path to convert to posix
   */toPosix:t=>t.replace(RegExp("\\".replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"g"),"/"),/**
   * Checks if the path is a URL e.g. http://, https://
   * @param path - The path to check
   */isUrl(t){return/^https?:/.test(this.toPosix(t))},/**
   * Checks if the path is a data URL
   * @param path - The path to check
   */isDataUrl:t=>/^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(t),/**
   * Checks if the path is a blob URL
   * @param path - The path to check
   */isBlobUrl:t=>t.startsWith("blob:"),/**
   * Checks if the path has a protocol e.g. http://, https://, file:///, data:, blob:, C:/
   * This will return true for windows file paths
   * @param path - The path to check
   */hasProtocol(t){return/^[^/:]+:/.test(this.toPosix(t))},/**
   * Returns the protocol of the path e.g. http://, https://, file:///, data:, blob:, C:/
   * @param path - The path to get the protocol from
   */getProtocol(t){iy(t),t=this.toPosix(t);let e=/^file:\/\/\//.exec(t);if(e)return e[0];let r=/^[^/:]+:\/{0,2}/.exec(t);return r?r[0]:""},/**
   * Converts URL to an absolute path.
   * When loading from a Web Worker, we must use absolute paths.
   * If the URL is already absolute we return it as is
   * If it's not, we convert it
   * @param url - The URL to test
   * @param customBaseUrl - The base URL to use
   * @param customRootUrl - The root URL to use
   */toAbsolute(t,e,r){if(iy(t),this.isDataUrl(t)||this.isBlobUrl(t))return t;let i=iv(this.toPosix(e??tl.ADAPTER.getBaseUrl())),s=iv(this.toPosix(r??this.rootname(i)));return(t=this.toPosix(t)).startsWith("/")?ix.join(s,t.slice(1)):this.isAbsolute(t)?t:this.join(i,t)},/**
   * Normalizes the given path, resolving '..' and '.' segments
   * @param path - The path to normalize
   */normalize(t){if(iy(t),0===t.length)return".";if(this.isDataUrl(t)||this.isBlobUrl(t))return t;t=this.toPosix(t);let e="",r=t.startsWith("/");this.hasProtocol(t)&&(e=this.rootname(t),t=t.slice(e.length));let i=t.endsWith("/");return(t=function(t,e){let r="",i=0,s=-1,n=0,a=-1;for(let o=0;o<=t.length;++o){if(o<t.length)a=t.charCodeAt(o);else{if(47===a)break;a=47}if(47===a){if(!(s===o-1||1===n)){if(s!==o-1&&2===n){if(r.length<2||2!==i||46!==r.charCodeAt(r.length-1)||46!==r.charCodeAt(r.length-2)){if(r.length>2){let t=r.lastIndexOf("/");if(t!==r.length-1){-1===t?(r="",i=0):i=(r=r.slice(0,t)).length-1-r.lastIndexOf("/"),s=o,n=0;continue}}else if(2===r.length||1===r.length){r="",i=0,s=o,n=0;continue}}e&&(r.length>0?r+="/..":r="..",i=2)}else r.length>0?r+=`/${t.slice(s+1,o)}`:r=t.slice(s+1,o),i=o-s-1}s=o,n=0}else 46===a&&-1!==n?++n:n=-1}return r}(t,!1)).length>0&&i&&(t+="/"),r?`/${t}`:e+t},/**
   * Determines if path is an absolute path.
   * Absolute paths can be urls, data urls, or paths on disk
   * @param path - The path to test
   */isAbsolute(t){return iy(t),t=this.toPosix(t),!!this.hasProtocol(t)||t.startsWith("/")},/**
   * Joins all given path segments together using the platform-specific separator as a delimiter,
   * then normalizes the resulting path
   * @param segments - The segments of the path to join
   */join(...t){let e;if(0===t.length)return".";for(let r=0;r<t.length;++r){let i=t[r];if(iy(i),i.length>0){if(void 0===e)e=i;else{let s=t[r-1]??"";this.extname(s)?e+=`/../${i}`:e+=`/${i}`}}}return void 0===e?".":this.normalize(e)},/**
   * Returns the directory name of a path
   * @param path - The path to parse
   */dirname(t){if(iy(t),0===t.length)return".";let e=(t=this.toPosix(t)).charCodeAt(0),r=47===e,i=-1,s=!0,n=this.getProtocol(t),a=t;t=t.slice(n.length);for(let r=t.length-1;r>=1;--r)if(47===(e=t.charCodeAt(r))){if(!s){i=r;break}}else s=!1;return -1===i?r?"/":this.isUrl(a)?n+t:n:r&&1===i?"//":n+t.slice(0,i)},/**
   * Returns the root of the path e.g. /, C:/, file:///, http://domain.com/
   * @param path - The path to parse
   */rootname(t){iy(t);let e="";if(e=(t=this.toPosix(t)).startsWith("/")?"/":this.getProtocol(t),this.isUrl(t)){let r=t.indexOf("/",e.length);(e=-1!==r?t.slice(0,r):t).endsWith("/")||(e+="/")}return e},/**
   * Returns the last portion of a path
   * @param path - The path to test
   * @param ext - Optional extension to remove
   */basename(t,e){iy(t),e&&iy(e),t=iv(this.toPosix(t));let r=0,i=-1,s=!0,n;if(void 0!==e&&e.length>0&&e.length<=t.length){if(e.length===t.length&&e===t)return"";let a=e.length-1,o=-1;for(n=t.length-1;n>=0;--n){let h=t.charCodeAt(n);if(47===h){if(!s){r=n+1;break}}else -1===o&&(s=!1,o=n+1),a>=0&&(h===e.charCodeAt(a)?-1==--a&&(i=n):(a=-1,i=o))}return r===i?i=o:-1===i&&(i=t.length),t.slice(r,i)}for(n=t.length-1;n>=0;--n)if(47===t.charCodeAt(n)){if(!s){r=n+1;break}}else -1===i&&(s=!1,i=n+1);return -1===i?"":t.slice(r,i)},/**
   * Returns the extension of the path, from the last occurrence of the . (period) character to end of string in the last
   * portion of the path. If there is no . in the last portion of the path, or if there are no . characters other than
   * the first character of the basename of path, an empty string is returned.
   * @param path - The path to parse
   */extname(t){iy(t),t=iv(this.toPosix(t));let e=-1,r=0,i=-1,s=!0,n=0;for(let a=t.length-1;a>=0;--a){let o=t.charCodeAt(a);if(47===o){if(!s){r=a+1;break}continue}-1===i&&(s=!1,i=a+1),46===o?-1===e?e=a:1!==n&&(n=1):-1!==e&&(n=-1)}return -1===e||-1===i||0===n||1===n&&e===i-1&&e===r+1?"":t.slice(e,i)},/**
   * Parses a path into an object containing the 'root', `dir`, `base`, `ext`, and `name` properties.
   * @param path - The path to parse
   */parse(t){let e;iy(t);let r={root:"",dir:"",base:"",ext:"",name:""};if(0===t.length)return r;let i=(t=iv(this.toPosix(t))).charCodeAt(0),s=this.isAbsolute(t);r.root=this.rootname(t),e=s||this.hasProtocol(t)?1:0;let n=-1,a=0,o=-1,h=!0,l=t.length-1,u=0;for(;l>=e;--l){if(47===(i=t.charCodeAt(l))){if(!h){a=l+1;break}continue}-1===o&&(h=!1,o=l+1),46===i?-1===n?n=l:1!==u&&(u=1):-1!==n&&(u=-1)}return -1===n||-1===o||0===u||1===u&&n===o-1&&n===a+1?-1!==o&&(0===a&&s?r.base=r.name=t.slice(1,o):r.base=r.name=t.slice(a,o)):(0===a&&s?(r.name=t.slice(1,n),r.base=t.slice(1,o)):(r.name=t.slice(a,n),r.base=t.slice(a,o)),r.ext=t.slice(n,o)),r.dir=this.dirname(t),r},sep:"/",delimiter:":"};async function ib(){return t??(t=(async()=>{let t=document.createElement("canvas").getContext("webgl");if(!t)return te.UNPACK;let e=await new Promise(t=>{let e=document.createElement("video");e.onloadeddata=()=>t(e),e.onerror=()=>t(null),e.autoplay=!1,e.crossOrigin="anonymous",e.preload="auto",e.src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=",e.load()});if(!e)return te.UNPACK;let r=t.createTexture();t.bindTexture(t.TEXTURE_2D,r);let i=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,i),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,r,0),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.NONE),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e);let s=new Uint8Array(4);return t.readPixels(0,0,1,1,t.RGBA,t.UNSIGNED_BYTE,s),t.deleteFramebuffer(i),t.deleteTexture(r),t.getExtension("WEBGL_lose_context")?.loseContext(),s[0]<=s[3]?te.PMA:te.UNPACK})()),t}function iE(){ig("7.0.0","skipHello is deprecated, please use settings.RENDER_OPTIONS.hello")}function iT(){ig("7.0.0",'sayHello is deprecated, please use Renderer\'s "hello" option')}function iA(){return typeof e>"u"&&(e=function(){let t={stencil:!0,failIfMajorPerformanceCaveat:tl.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT};try{if(!tl.ADAPTER.getWebGLRenderingContext())return!1;let e=tl.ADAPTER.createCanvas(),r=e.getContext("webgl",t)||e.getContext("experimental-webgl",t),i=!!r?.getContextAttributes()?.stencil;if(r){let t=r.getExtension("WEBGL_lose_context");t&&t.loseContext()}return r=null,i}catch{return!1}}()),e}var iS={grad:.9,turn:360,rad:360/(2*Math.PI)},iw=function(t){return"string"==typeof t?t.length>0:"number"==typeof t},iR=function(t,e,r){return void 0===e&&(e=0),void 0===r&&(r=Math.pow(10,e)),Math.round(r*t)/r+0},iI=function(t,e,r){return void 0===e&&(e=0),void 0===r&&(r=1),t>r?r:t>e?t:e},iC=function(t){return(t=isFinite(t)?t%360:0)>0?t:t+360},iP=function(t){return{r:iI(t.r,0,255),g:iI(t.g,0,255),b:iI(t.b,0,255),a:iI(t.a)}},iM=function(t){return{r:iR(t.r),g:iR(t.g),b:iR(t.b),a:iR(t.a,3)}},iD=/^#([0-9a-f]{3,8})$/i,iO=function(t){var e=t.toString(16);return e.length<2?"0"+e:e},iB=function(t){var e=t.r,r=t.g,i=t.b,s=t.a,n=Math.max(e,r,i),a=n-Math.min(e,r,i),o=a?n===e?(r-i)/a:n===r?2+(i-e)/a:4+(e-r)/a:0;return{h:60*(o<0?o+6:o),s:n?a/n*100:0,v:n/255*100,a:s}},iN=function(t){var e=t.h,r=t.s,i=t.v,s=t.a;e=e/360*6,r/=100,i/=100;var n=Math.floor(e),a=i*(1-r),o=i*(1-(e-n)*r),h=i*(1-(1-e+n)*r),l=n%6;return{r:255*[i,o,a,a,h,i][l],g:255*[h,i,i,o,a,a][l],b:255*[a,a,h,i,i,o][l],a:s}},iF=function(t){return{h:iC(t.h),s:iI(t.s,0,100),l:iI(t.l,0,100),a:iI(t.a)}},iL=function(t){return{h:iR(t.h),s:iR(t.s),l:iR(t.l),a:iR(t.a,3)}},iU=function(t){var e,r;return iN((e=t.s,{h:t.h,s:(e*=((r=t.l)<50?r:100-r)/100)>0?2*e/(r+e)*100:0,v:r+e,a:t.a}))},ik=function(t){var e,r,i,s;return{h:(e=iB(t)).h,s:(s=(200-(r=e.s))*(i=e.v)/100)>0&&s<200?r*i/100/(s<=100?s:200-s)*100:0,l:s/2,a:e.a}},iG=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,iH=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,ij=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,iX=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,iV={string:[[function(t){var e=iD.exec(t);return e?(t=e[1]).length<=4?{r:parseInt(t[0]+t[0],16),g:parseInt(t[1]+t[1],16),b:parseInt(t[2]+t[2],16),a:4===t.length?iR(parseInt(t[3]+t[3],16)/255,2):1}:6===t.length||8===t.length?{r:parseInt(t.substr(0,2),16),g:parseInt(t.substr(2,2),16),b:parseInt(t.substr(4,2),16),a:8===t.length?iR(parseInt(t.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(t){var e=ij.exec(t)||iX.exec(t);return e?e[2]!==e[4]||e[4]!==e[6]?null:iP({r:Number(e[1])/(e[2]?100/255:1),g:Number(e[3])/(e[4]?100/255:1),b:Number(e[5])/(e[6]?100/255:1),a:void 0===e[7]?1:Number(e[7])/(e[8]?100:1)}):null},"rgb"],[function(t){var e,r,i=iG.exec(t)||iH.exec(t);return i?iU(iF({h:(e=i[1],void 0===(r=i[2])&&(r="deg"),Number(e)*(iS[r]||1)),s:Number(i[3]),l:Number(i[4]),a:void 0===i[5]?1:Number(i[5])/(i[6]?100:1)})):null},"hsl"]],object:[[function(t){var e=t.r,r=t.g,i=t.b,s=t.a;return iw(e)&&iw(r)&&iw(i)?iP({r:Number(e),g:Number(r),b:Number(i),a:Number(void 0===s?1:s)}):null},"rgb"],[function(t){var e=t.h,r=t.s,i=t.l,s=t.a;return iw(e)&&iw(r)&&iw(i)?iU(iF({h:Number(e),s:Number(r),l:Number(i),a:Number(void 0===s?1:s)})):null},"hsl"],[function(t){var e,r=t.h,i=t.s,s=t.v,n=t.a;return iw(r)&&iw(i)&&iw(s)?iN({h:iC((e={h:Number(r),s:Number(i),v:Number(s),a:Number(void 0===n?1:n)}).h),s:iI(e.s,0,100),v:iI(e.v,0,100),a:iI(e.a)}):null},"hsv"]]},iz=function(t,e){for(var r=0;r<e.length;r++){var i=e[r][0](t);if(i)return[i,e[r][1]]}return[null,void 0]},iW=function(t,e){var r=ik(t);return{h:r.h,s:iI(r.s+100*e,0,100),l:r.l,a:r.a}},i$=function(t){return(299*t.r+587*t.g+114*t.b)/1e3/255},iY=function(t,e){var r=ik(t);return{h:r.h,s:r.s,l:iI(r.l+100*e,0,100),a:r.a}},iq=function(){function t(t){this.parsed=("string"==typeof t?iz(t.trim(),iV.string):"object"==typeof t&&null!==t?iz(t,iV.object):[null,void 0])[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return t.prototype.isValid=function(){return null!==this.parsed},t.prototype.brightness=function(){return iR(i$(this.rgba),2)},t.prototype.isDark=function(){return .5>i$(this.rgba)},t.prototype.isLight=function(){return i$(this.rgba)>=.5},t.prototype.toHex=function(){var t,e,r,i,s,n;return e=(t=iM(this.rgba)).r,r=t.g,i=t.b,n=(s=t.a)<1?iO(iR(255*s)):"","#"+iO(e)+iO(r)+iO(i)+n},t.prototype.toRgb=function(){return iM(this.rgba)},t.prototype.toRgbString=function(){var t,e,r,i,s;return e=(t=iM(this.rgba)).r,r=t.g,i=t.b,(s=t.a)<1?"rgba("+e+", "+r+", "+i+", "+s+")":"rgb("+e+", "+r+", "+i+")"},t.prototype.toHsl=function(){return iL(ik(this.rgba))},t.prototype.toHslString=function(){var t,e,r,i,s;return e=(t=iL(ik(this.rgba))).h,r=t.s,i=t.l,(s=t.a)<1?"hsla("+e+", "+r+"%, "+i+"%, "+s+")":"hsl("+e+", "+r+"%, "+i+"%)"},t.prototype.toHsv=function(){var t;return{h:iR((t=iB(this.rgba)).h),s:iR(t.s),v:iR(t.v),a:iR(t.a,3)}},t.prototype.invert=function(){var t;return iK({r:255-(t=this.rgba).r,g:255-t.g,b:255-t.b,a:t.a})},t.prototype.saturate=function(t){return void 0===t&&(t=.1),iK(iW(this.rgba,t))},t.prototype.desaturate=function(t){return void 0===t&&(t=.1),iK(iW(this.rgba,-t))},t.prototype.grayscale=function(){return iK(iW(this.rgba,-1))},t.prototype.lighten=function(t){return void 0===t&&(t=.1),iK(iY(this.rgba,t))},t.prototype.darken=function(t){return void 0===t&&(t=.1),iK(iY(this.rgba,-t))},t.prototype.rotate=function(t){return void 0===t&&(t=15),this.hue(this.hue()+t)},t.prototype.alpha=function(t){var e;return"number"==typeof t?iK({r:(e=this.rgba).r,g:e.g,b:e.b,a:t}):iR(this.rgba.a,3)},t.prototype.hue=function(t){var e=ik(this.rgba);return"number"==typeof t?iK({h:t,s:e.s,l:e.l,a:e.a}):iR(e.h)},t.prototype.isEqual=function(t){return this.toHex()===iK(t).toHex()},t}(),iK=function(t){return t instanceof iq?t:new iq(t)},iZ=[];!function(t){t.forEach(function(t){0>iZ.indexOf(t)&&(t(iq,iV),iZ.push(t))})}([function(t,e){var r={white:"#ffffff",bisque:"#ffe4c4",blue:"#0000ff",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",antiquewhite:"#faebd7",aqua:"#00ffff",azure:"#f0ffff",whitesmoke:"#f5f5f5",papayawhip:"#ffefd5",plum:"#dda0dd",blanchedalmond:"#ffebcd",black:"#000000",gold:"#ffd700",goldenrod:"#daa520",gainsboro:"#dcdcdc",cornsilk:"#fff8dc",cornflowerblue:"#6495ed",burlywood:"#deb887",aquamarine:"#7fffd4",beige:"#f5f5dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkkhaki:"#bdb76b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",peachpuff:"#ffdab9",darkmagenta:"#8b008b",darkred:"#8b0000",darkorchid:"#9932cc",darkorange:"#ff8c00",darkslateblue:"#483d8b",gray:"#808080",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",deeppink:"#ff1493",deepskyblue:"#00bfff",wheat:"#f5deb3",firebrick:"#b22222",floralwhite:"#fffaf0",ghostwhite:"#f8f8ff",darkviolet:"#9400d3",magenta:"#ff00ff",green:"#008000",dodgerblue:"#1e90ff",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",blueviolet:"#8a2be2",forestgreen:"#228b22",lawngreen:"#7cfc00",indianred:"#cd5c5c",indigo:"#4b0082",fuchsia:"#ff00ff",brown:"#a52a2a",maroon:"#800000",mediumblue:"#0000cd",lightcoral:"#f08080",darkturquoise:"#00ced1",lightcyan:"#e0ffff",ivory:"#fffff0",lightyellow:"#ffffe0",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",linen:"#faf0e6",mediumaquamarine:"#66cdaa",lemonchiffon:"#fffacd",lime:"#00ff00",khaki:"#f0e68c",mediumseagreen:"#3cb371",limegreen:"#32cd32",mediumspringgreen:"#00fa9a",lightskyblue:"#87cefa",lightblue:"#add8e6",midnightblue:"#191970",lightpink:"#ffb6c1",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",mintcream:"#f5fffa",lightslategray:"#778899",lightslategrey:"#778899",navajowhite:"#ffdead",navy:"#000080",mediumvioletred:"#c71585",powderblue:"#b0e0e6",palegoldenrod:"#eee8aa",oldlace:"#fdf5e6",paleturquoise:"#afeeee",mediumturquoise:"#48d1cc",mediumorchid:"#ba55d3",rebeccapurple:"#663399",lightsteelblue:"#b0c4de",mediumslateblue:"#7b68ee",thistle:"#d8bfd8",tan:"#d2b48c",orchid:"#da70d6",mediumpurple:"#9370db",purple:"#800080",pink:"#ffc0cb",skyblue:"#87ceeb",springgreen:"#00ff7f",palegreen:"#98fb98",red:"#ff0000",yellow:"#ffff00",slateblue:"#6a5acd",lavenderblush:"#fff0f5",peru:"#cd853f",palevioletred:"#db7093",violet:"#ee82ee",teal:"#008080",slategray:"#708090",slategrey:"#708090",aliceblue:"#f0f8ff",darkseagreen:"#8fbc8f",darkolivegreen:"#556b2f",greenyellow:"#adff2f",seagreen:"#2e8b57",seashell:"#fff5ee",tomato:"#ff6347",silver:"#c0c0c0",sienna:"#a0522d",lavender:"#e6e6fa",lightgreen:"#90ee90",orange:"#ffa500",orangered:"#ff4500",steelblue:"#4682b4",royalblue:"#4169e1",turquoise:"#40e0d0",yellowgreen:"#9acd32",salmon:"#fa8072",saddlebrown:"#8b4513",sandybrown:"#f4a460",rosybrown:"#bc8f8f",darksalmon:"#e9967a",lightgoldenrodyellow:"#fafad2",snow:"#fffafa",lightgrey:"#d3d3d3",lightgray:"#d3d3d3",dimgray:"#696969",dimgrey:"#696969",olivedrab:"#6b8e23",olive:"#808000"},i={};for(var s in r)i[r[s]]=s;var n={};t.prototype.toName=function(e){if(!(this.rgba.a||this.rgba.r||this.rgba.g||this.rgba.b))return"transparent";var s,a=i[this.toHex()];if(a)return a;if(null==e?void 0:e.closest){var o=this.toRgb(),h=1/0,l="black";if(!n.length)for(var u in r)n[u]=new t(r[u]).toRgb();for(var d in r){var c=(s=n[d],Math.pow(o.r-s.r,2)+Math.pow(o.g-s.g,2)+Math.pow(o.b-s.b,2));c<h&&(h=c,l=d)}return l}},e.string.push([function(e){var i=e.toLowerCase(),s="transparent"===i?"#0000":r[i];return s?new t(s).toRgb():null},"name"])}]);const iQ=class t{/**
   * @param {PIXI.ColorSource} value - Optional value to use, if not provided, white is used.
   */constructor(t=16777215){this._value=null,this._components=new Float32Array(4),this._components.fill(1),this._int=16777215,this.value=t}/** Get red component (0 - 1) */get red(){return this._components[0]}/** Get green component (0 - 1) */get green(){return this._components[1]}/** Get blue component (0 - 1) */get blue(){return this._components[2]}/** Get alpha component (0 - 1) */get alpha(){return this._components[3]}/**
   * Set the value, suitable for chaining
   * @param value
   * @see PIXI.Color.value
   */setValue(t){return this.value=t,this}/**
   * The current color source.
   *
   * When setting:
   * - Setting to an instance of `Color` will copy its color source and components.
   * - Otherwise, `Color` will try to normalize the color source and set the components.
   *   If the color source is invalid, an `Error` will be thrown and the `Color` will left unchanged.
   *
   * Note: The `null` in the setter's parameter type is added to match the TypeScript rule: return type of getter
   * must be assignable to its setter's parameter type. Setting `value` to `null` will throw an `Error`.
   *
   * When getting:
   * - A return value of `null` means the previous value was overridden (e.g., {@link PIXI.Color.multiply multiply},
   *   {@link PIXI.Color.premultiply premultiply} or {@link PIXI.Color.round round}).
   * - Otherwise, the color source used when setting is returned.
   * @type {PIXI.ColorSource}
   */set value(e){if(e instanceof t)this._value=this.cloneSource(e._value),this._int=e._int,this._components.set(e._components);else{if(null===e)throw Error("Cannot set PIXI.Color#value to null");null!==this._value&&this.isSourceEqual(this._value,e)||(this.normalize(e),this._value=this.cloneSource(e))}}get value(){return this._value}/**
   * Copy a color source internally.
   * @param value - Color source
   */cloneSource(t){return"string"==typeof t||"number"==typeof t||t instanceof Number||null===t?t:Array.isArray(t)||ArrayBuffer.isView(t)?t.slice(0):"object"==typeof t&&null!==t?{...t}:t}/**
   * Equality check for color sources.
   * @param value1 - First color source
   * @param value2 - Second color source
   * @returns `true` if the color sources are equal, `false` otherwise.
   */isSourceEqual(t,e){let r=typeof t;if(r!==typeof e)return!1;if("number"===r||"string"===r||t instanceof Number)return t===e;if(Array.isArray(t)&&Array.isArray(e)||ArrayBuffer.isView(t)&&ArrayBuffer.isView(e))return t.length===e.length&&t.every((t,r)=>t===e[r]);if(null!==t&&null!==e){let r=Object.keys(t),i=Object.keys(e);return r.length===i.length&&r.every(r=>t[r]===e[r])}return t===e}/**
   * Convert to a RGBA color object.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toRgb(); // returns { r: 1, g: 1, b: 1, a: 1 }
   */toRgba(){let[t,e,r,i]=this._components;return{r:t,g:e,b:r,a:i}}/**
   * Convert to a RGB color object.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toRgb(); // returns { r: 1, g: 1, b: 1 }
   */toRgb(){let[t,e,r]=this._components;return{r:t,g:e,b:r}}/** Convert to a CSS-style rgba string: `rgba(255,255,255,1.0)`. */toRgbaString(){let[t,e,r]=this.toUint8RgbArray();return`rgba(${t},${e},${r},${this.alpha})`}toUint8RgbArray(t){let[e,r,i]=this._components;return(t=t??[])[0]=Math.round(255*e),t[1]=Math.round(255*r),t[2]=Math.round(255*i),t}toRgbArray(t){t=t??[];let[e,r,i]=this._components;return t[0]=e,t[1]=r,t[2]=i,t}/**
   * Convert to a hexadecimal number.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toNumber(); // returns 16777215
   */toNumber(){return this._int}/**
   * Convert to a hexadecimal number in little endian format (e.g., BBGGRR).
   * @example
   * import { Color } from 'pixi.js';
   * new Color(0xffcc99).toLittleEndianNumber(); // returns 0x99ccff
   * @returns {number} - The color as a number in little endian format.
   */toLittleEndianNumber(){let t=this._int;return(t>>16)+(65280&t)+((255&t)<<16)}/**
   * Multiply with another color. This action is destructive, and will
   * override the previous `value` property to be `null`.
   * @param {PIXI.ColorSource} value - The color to multiply by.
   */multiply(e){let[r,i,s,n]=t.temp.setValue(e)._components;return this._components[0]*=r,this._components[1]*=i,this._components[2]*=s,this._components[3]*=n,this.refreshInt(),this._value=null,this}/**
   * Converts color to a premultiplied alpha format. This action is destructive, and will
   * override the previous `value` property to be `null`.
   * @param alpha - The alpha to multiply by.
   * @param {boolean} [applyToRGB=true] - Whether to premultiply RGB channels.
   * @returns {PIXI.Color} - Itself.
   */premultiply(t,e=!0){return e&&(this._components[0]*=t,this._components[1]*=t,this._components[2]*=t),this._components[3]=t,this.refreshInt(),this._value=null,this}/**
   * Premultiplies alpha with current color.
   * @param {number} alpha - The alpha to multiply by.
   * @param {boolean} [applyToRGB=true] - Whether to premultiply RGB channels.
   * @returns {number} tint multiplied by alpha
   */toPremultiplied(t,e=!0){if(1===t)return -16777216+this._int;if(0===t)return e?0:this._int;let r=this._int>>16&255,i=this._int>>8&255,s=255&this._int;return e&&(r=r*t+.5|0,i=i*t+.5|0,s=s*t+.5|0),(255*t<<24)+(r<<16)+(i<<8)+s}/**
   * Convert to a hexidecimal string.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toHex(); // returns "#ffffff"
   */toHex(){let t=this._int.toString(16);return`#${"000000".substring(0,6-t.length)+t}`}/**
   * Convert to a hexidecimal string with alpha.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toHexa(); // returns "#ffffffff"
   */toHexa(){let t=Math.round(255*this._components[3]).toString(16);return this.toHex()+"00".substring(0,2-t.length)+t}/**
   * Set alpha, suitable for chaining.
   * @param alpha
   */setAlpha(t){return this._components[3]=this._clamp(t),this}/**
   * Rounds the specified color according to the step. This action is destructive, and will
   * override the previous `value` property to be `null`. The alpha component is not rounded.
   * @param steps - Number of steps which will be used as a cap when rounding colors
   * @deprecated since 7.3.0
   */round(t){let[e,r,i]=this._components;return this._components[0]=Math.round(e*t)/t,this._components[1]=Math.round(r*t)/t,this._components[2]=Math.round(i*t)/t,this.refreshInt(),this._value=null,this}toArray(t){t=t??[];let[e,r,i,s]=this._components;return t[0]=e,t[1]=r,t[2]=i,t[3]=s,t}/**
   * Normalize the input value into rgba
   * @param value - Input value
   */normalize(e){let r,i,s,n;if(("number"==typeof e||e instanceof Number)&&e>=0&&e<=16777215){let t=e;r=(t>>16&255)/255,i=(t>>8&255)/255,s=(255&t)/255,n=1}else if((Array.isArray(e)||e instanceof Float32Array)&&e.length>=3&&e.length<=4)e=this._clamp(e),[r,i,s,n=1]=e;else if((e instanceof Uint8Array||e instanceof Uint8ClampedArray)&&e.length>=3&&e.length<=4)e=this._clamp(e,0,255),[r,i,s,n=255]=e,r/=255,i/=255,s/=255,n/=255;else if("string"==typeof e||"object"==typeof e){if("string"==typeof e){let r=t.HEX_PATTERN.exec(e);r&&(e=`#${r[2]}`)}let a=iK(e);a.isValid()&&({r:r,g:i,b:s,a:n}=a.rgba,r/=255,i/=255,s/=255)}if(void 0!==r)this._components[0]=r,this._components[1]=i,this._components[2]=s,this._components[3]=n,this.refreshInt();else throw Error(`Unable to convert color ${e}`)}/** Refresh the internal color rgb number */refreshInt(){this._clamp(this._components);let[t,e,r]=this._components;this._int=(255*t<<16)+(255*e<<8)+(255*r|0)}/**
   * Clamps values to a range. Will override original values
   * @param value - Value(s) to clamp
   * @param min - Minimum value
   * @param max - Maximum value
   */_clamp(t,e=0,r=1){return"number"==typeof t?Math.min(Math.max(t,e),r):(t.forEach((i,s)=>{t[s]=Math.min(Math.max(i,e),r)}),t)}};function iJ(t,e=[]){return ig("7.2.0","utils.hex2rgb is deprecated, use Color#toRgbArray instead"),iQ.shared.setValue(t).toRgbArray(e)}function i0(t){return ig("7.2.0","utils.hex2string is deprecated, use Color#toHex instead"),iQ.shared.setValue(t).toHex()}function i1(t){return ig("7.2.0","utils.string2hex is deprecated, use Color#toNumber instead"),iQ.shared.setValue(t).toNumber()}function i2(t){return ig("7.2.0","utils.rgb2hex is deprecated, use Color#toNumber instead"),iQ.shared.setValue(t).toNumber()}iQ.shared=new iQ,/**
* Temporary Color object for static uses internally.
* As to not conflict with Color.shared.
* @ignore
*/iQ.temp=new iQ,/** Pattern for hex strings */iQ.HEX_PATTERN=/^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;const i3=function(){let t=[],e=[];for(let r=0;r<32;r++)t[r]=r,e[r]=r;t[W.NORMAL_NPM]=W.NORMAL,t[W.ADD_NPM]=W.ADD,t[W.SCREEN_NPM]=W.SCREEN,e[W.NORMAL]=W.NORMAL_NPM,e[W.ADD]=W.ADD_NPM,e[W.SCREEN]=W.SCREEN_NPM;let r=[];return r.push(e),r.push(t),r}();function i4(t,e){return i3[e?1:0][t]}function i5(t,e,r,i=!0){return ig("7.2.0","utils.premultiplyRgba has moved to Color.premultiply"),iQ.shared.setValue(t).premultiply(e,i).toArray(r??new Float32Array(4))}function i6(t,e){return ig("7.2.0","utils.premultiplyTint has moved to Color.toPremultiplied"),iQ.shared.setValue(t).toPremultiplied(e)}function i8(t,e,r,i=!0){return ig("7.2.0","utils.premultiplyTintToRgba has moved to Color.premultiply"),iQ.shared.setValue(t).premultiply(e,i).toArray(r??new Float32Array(4))}const i7=/^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i;function i9(t,e=null){let r=6*t;if((e=e||new Uint16Array(r)).length!==r)throw Error(`Out buffer length is incorrect, got ${e.length} and expected ${r}`);for(let t=0,i=0;t<r;t+=6,i+=4)e[t+0]=i+0,e[t+1]=i+1,e[t+2]=i+2,e[t+3]=i+0,e[t+4]=i+2,e[t+5]=i+3;return e}function st(t){if(4===t.BYTES_PER_ELEMENT)return t instanceof Float32Array?"Float32Array":t instanceof Uint32Array?"Uint32Array":"Int32Array";if(2===t.BYTES_PER_ELEMENT){if(t instanceof Uint16Array)return"Uint16Array"}else if(1===t.BYTES_PER_ELEMENT&&t instanceof Uint8Array)return"Uint8Array";return null}const se={Float32Array:Float32Array,Uint32Array:Uint32Array,Int32Array:Int32Array,Uint8Array:Uint8Array};function sr(t,e){let r=0,i=0,s={};for(let s=0;s<t.length;s++)i+=e[s],r+=t[s].length;let n=new ArrayBuffer(4*r),a=null,o=0;for(let r=0;r<t.length;r++){let h=e[r],l=t[r],u=st(l);s[u]||(s[u]=new se[u](n)),a=s[u];for(let t=0;t<l.length;t++){let e=(t/h|0)*i+o,r=t%h;a[e+r]=l[t]}o+=h}return new Float32Array(n)}function si(t){return t+=0===t?1:0,--t,t|=t>>>1,t|=t>>>2,t|=t>>>4,t|=t>>>8,(t|=t>>>16)+1}function ss(t){return!(t&t-1)&&!!t}function sn(t){let e=(t>65535?1:0)<<4,r=((t>>>=e)>255?1:0)<<3;return t>>>=r,e|=r,r=(t>15?1:0)<<2,t>>>=r,e|=r,r=(t>3?1:0)<<1,t>>>=r,(e|=r)|t>>1}function sa(t,e,r){let i;let s=t.length;if(e>=s||0===r)return;r=e+r>s?s-e:r;let n=s-r;for(i=e;i<n;++i)t[i]=t[i+r];t.length=n}function so(t){return 0===t?0:t<0?-1:1}let sh=0;function sl(){return++sh}const su=class{/**
   * @param left - The left coordinate value of the bounding box.
   * @param top - The top coordinate value of the bounding box.
   * @param right - The right coordinate value of the bounding box.
   * @param bottom - The bottom coordinate value of the bounding box.
   */constructor(t,e,r,i){this.left=t,this.top=e,this.right=r,this.bottom=i}/** The width of the bounding box. */get width(){return this.right-this.left}/** The height of the bounding box. */get height(){return this.bottom-this.top}/** Determines whether the BoundingBox is empty. */isEmpty(){return this.left===this.right||this.top===this.bottom}};su.EMPTY=new su(0,0,0,0);let sd=su;const sc={},sp=/* @__PURE__ */Object.create(null),sf=/* @__PURE__ */Object.create(null);function sm(){let t;for(t in sp)sp[t].destroy();for(t in sf)sf[t].destroy()}function sg(){let t;for(t in sp)delete sp[t];for(t in sf)delete sf[t]}class s_{/**
   * @param width - the width for the newly created canvas
   * @param height - the height for the newly created canvas
   * @param {number} [resolution=PIXI.settings.RESOLUTION] - The resolution / device pixel ratio of the canvas
   */constructor(t,e,r){this._canvas=tl.ADAPTER.createCanvas(),this._context=this._canvas.getContext("2d"),this.resolution=r||tl.RESOLUTION,this.resize(t,e)}/**
   * Clears the canvas that was created by the CanvasRenderTarget class.
   * @private
   */clear(){this._checkDestroyed(),this._context.setTransform(1,0,0,1,0,0),this._context.clearRect(0,0,this._canvas.width,this._canvas.height)}/**
   * Resizes the canvas to the specified width and height.
   * @param desiredWidth - the desired width of the canvas
   * @param desiredHeight - the desired height of the canvas
   */resize(t,e){this._checkDestroyed(),this._canvas.width=Math.round(t*this.resolution),this._canvas.height=Math.round(e*this.resolution)}/** Destroys this canvas. */destroy(){this._context=null,this._canvas=null}/**
   * The width of the canvas buffer in pixels.
   * @member {number}
   */get width(){return this._checkDestroyed(),this._canvas.width}set width(t){this._checkDestroyed(),this._canvas.width=Math.round(t)}/**
   * The height of the canvas buffer in pixels.
   * @member {number}
   */get height(){return this._checkDestroyed(),this._canvas.height}set height(t){this._checkDestroyed(),this._canvas.height=Math.round(t)}/** The Canvas object that belongs to this CanvasRenderTarget. */get canvas(){return this._checkDestroyed(),this._canvas}/** A CanvasRenderingContext2D object representing a two-dimensional rendering context. */get context(){return this._checkDestroyed(),this._context}_checkDestroyed(){if(null===this._canvas)throw TypeError("The CanvasRenderTarget has already been destroyed")}}function sy(t,e,r){for(let i=0,s=4*r*e;i<e;++i,s+=4)if(0!==t[s+3])return!1;return!0}function sv(t,e,r,i,s){let n=4*e;for(let e=i,a=i*n+4*r;e<=s;++e,a+=n)if(0!==t[a+3])return!1;return!0}function sx(t){let{width:e,height:r}=t,i=t.getContext("2d",{willReadFrequently:!0});if(null===i)throw TypeError("Failed to get canvas 2D context");let s=i.getImageData(0,0,e,r).data,n=0,a=0,o=e-1,h=r-1;for(;a<r&&sy(s,e,a);)++a;if(a===r)return sd.EMPTY;for(;sy(s,e,h);)--h;for(;sv(s,e,n,a,h);)++n;for(;sv(s,e,o,a,h);)--o;return++o,++h,new sd(n,a,o,h)}function sb(t){let e=sx(t),{width:r,height:i}=e,s=null;if(!e.isEmpty()){let n=t.getContext("2d");if(null===n)throw TypeError("Failed to get canvas 2D context");s=n.getImageData(e.left,e.top,r,i)}return{width:r,height:i,data:s}}function sE(t){let e=i7.exec(t);if(e)return{mediaType:e[1]?e[1].toLowerCase():void 0,subType:e[2]?e[2].toLowerCase():void 0,charset:e[3]?e[3].toLowerCase():void 0,encoding:e[4]?e[4].toLowerCase():void 0,data:e[5]}}function sT(t,e=globalThis.location){if(t.startsWith("data:"))return"";e=e||globalThis.location;let r=new URL(t,document.baseURI);return r.hostname!==e.hostname||r.port!==e.port||r.protocol!==e.protocol?"anonymous":""}function sA(t,e=1){let r=tl.RETINA_PREFIX?.exec(t);return r?parseFloat(r[1]):e}var sS=((R=sS||{}).Renderer="renderer",R.Application="application",R.RendererSystem="renderer-webgl-system",R.RendererPlugin="renderer-webgl-plugin",R.CanvasRendererSystem="renderer-canvas-system",R.CanvasRendererPlugin="renderer-canvas-plugin",R.Asset="asset",R.LoadParser="load-parser",R.ResolveParser="resolve-parser",R.CacheParser="cache-parser",R.DetectionParser="detection-parser",R);const sw=t=>{if("function"==typeof t||"object"==typeof t&&t.extension){if(!t.extension)throw Error("Extension class must have an extension object");t={..."object"!=typeof t.extension?{type:t.extension}:t.extension,ref:t}}if("object"==typeof t)t={...t};else throw Error("Invalid extension type");return"string"==typeof t.type&&(t.type=[t.type]),t},sR=(t,e)=>sw(t).priority??e,sI={/** @ignore */_addHandlers:{},/** @ignore */_removeHandlers:{},/** @ignore */_queue:{},/**
   * Remove extensions from PixiJS.
   * @param extensions - Extensions to be removed.
   * @returns {PIXI.extensions} For chaining.
   */remove(...t){return t.map(sw).forEach(t=>{t.type.forEach(e=>this._removeHandlers[e]?.(t))}),this},/**
   * Register new extensions with PixiJS.
   * @param extensions - The spread of extensions to add to PixiJS.
   * @returns {PIXI.extensions} For chaining.
   */add(...t){return t.map(sw).forEach(t=>{t.type.forEach(e=>{let r=this._addHandlers,i=this._queue;r[e]?r[e](t):(i[e]=i[e]||[],i[e].push(t))})}),this},/**
   * Internal method to handle extensions by name.
   * @param type - The extension type.
   * @param onAdd  - Function for handling when extensions are added/registered passes {@link PIXI.ExtensionFormat}.
   * @param onRemove  - Function for handling when extensions are removed/unregistered passes {@link PIXI.ExtensionFormat}.
   * @returns {PIXI.extensions} For chaining.
   */handle(t,e,r){let i=this._addHandlers,s=this._removeHandlers;if(i[t]||s[t])throw Error(`Extension type ${t} already has a handler`);i[t]=e,s[t]=r;let n=this._queue;return n[t]&&(n[t].forEach(t=>e(t)),delete n[t]),this},/**
   * Handle a type, but using a map by `name` property.
   * @param type - Type of extension to handle.
   * @param map - The object map of named extensions.
   * @returns {PIXI.extensions} For chaining.
   */handleByMap(t,e){return this.handle(t,t=>{e[t.name]=t.ref},t=>{delete e[t.name]})},/**
   * Handle a type, but using a list of extensions.
   * @param type - Type of extension to handle.
   * @param list - The list of extensions.
   * @param defaultPriority - The default priority to use if none is specified.
   * @returns {PIXI.extensions} For chaining.
   */handleByList(t,e,r=-1){return this.handle(t,t=>{e.includes(t.ref)||(e.push(t.ref),e.sort((t,e)=>sR(e,r)-sR(t,r)))},t=>{let r=e.indexOf(t.ref);-1!==r&&e.splice(r,1)})}};class sC{constructor(t){"number"==typeof t?this.rawBinaryData=new ArrayBuffer(t):t instanceof Uint8Array?this.rawBinaryData=t.buffer:this.rawBinaryData=t,this.uint32View=new Uint32Array(this.rawBinaryData),this.float32View=new Float32Array(this.rawBinaryData)}/** View on the raw binary data as a `Int8Array`. */get int8View(){return this._int8View||(this._int8View=new Int8Array(this.rawBinaryData)),this._int8View}/** View on the raw binary data as a `Uint8Array`. */get uint8View(){return this._uint8View||(this._uint8View=new Uint8Array(this.rawBinaryData)),this._uint8View}/**  View on the raw binary data as a `Int16Array`. */get int16View(){return this._int16View||(this._int16View=new Int16Array(this.rawBinaryData)),this._int16View}/** View on the raw binary data as a `Uint16Array`. */get uint16View(){return this._uint16View||(this._uint16View=new Uint16Array(this.rawBinaryData)),this._uint16View}/** View on the raw binary data as a `Int32Array`. */get int32View(){return this._int32View||(this._int32View=new Int32Array(this.rawBinaryData)),this._int32View}/**
   * Returns the view of the given type.
   * @param type - One of `int8`, `uint8`, `int16`,
   *    `uint16`, `int32`, `uint32`, and `float32`.
   * @returns - typed array of given type
   */view(t){return this[`${t}View`]}/** Destroys all buffer references. Do not use after calling this. */destroy(){this.rawBinaryData=null,this._int8View=null,this._uint8View=null,this._int16View=null,this._uint16View=null,this._int32View=null,this.uint32View=null,this.float32View=null}static sizeOf(t){switch(t){case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;default:throw Error(`${t} isn't a valid view type`)}}}const sP=["precision mediump float;","void main(void){","float test = 0.1;","%forloop%","gl_FragColor = vec4(0.0);","}"].join(`
`);class sM{constructor(){this.data=0,this.blendMode=W.NORMAL,this.polygonOffset=0,this.blend=!0,this.depthMask=!0}/**
   * Activates blending of the computed fragment color values.
   * @default true
   */get blend(){return!!(1&this.data)}set blend(t){!!(1&this.data)!==t&&(this.data^=1)}/**
   * Activates adding an offset to depth values of polygon's fragments
   * @default false
   */get offsets(){return!!(2&this.data)}set offsets(t){!!(2&this.data)!==t&&(this.data^=2)}/**
   * Activates culling of polygons.
   * @default false
   */get culling(){return!!(4&this.data)}set culling(t){!!(4&this.data)!==t&&(this.data^=4)}/**
   * Activates depth comparisons and updates to the depth buffer.
   * @default false
   */get depthTest(){return!!(8&this.data)}set depthTest(t){!!(8&this.data)!==t&&(this.data^=8)}/**
   * Enables or disables writing to the depth buffer.
   * @default true
   */get depthMask(){return!!(32&this.data)}set depthMask(t){!!(32&this.data)!==t&&(this.data^=32)}/**
   * Specifies whether or not front or back-facing polygons can be culled.
   * @default false
   */get clockwiseFrontFace(){return!!(16&this.data)}set clockwiseFrontFace(t){!!(16&this.data)!==t&&(this.data^=16)}/**
   * The blend mode to be applied when this state is set. Apply a value of `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.
   * Setting this mode to anything other than NO_BLEND will automatically switch blending on.
   * @default PIXI.BLEND_MODES.NORMAL
   */get blendMode(){return this._blendMode}set blendMode(t){this.blend=t!==W.NONE,this._blendMode=t}/**
   * The polygon offset. Setting this property to anything other than 0 will automatically enable polygon offset fill.
   * @default 0
   */get polygonOffset(){return this._polygonOffset}set polygonOffset(t){this.offsets=!!t,this._polygonOffset=t}static for2d(){let t=new sM;return t.depthTest=!1,t.blend=!0,t}}sM.prototype.toString=function(){return`[@pixi/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`};const sD=[];function sO(t,e){if(!t)return null;let r="";if("string"==typeof t){let e=/\.(\w{3,4})(?:$|\?|#)/i.exec(t);e&&(r=e[1].toLowerCase())}for(let i=sD.length-1;i>=0;--i){let s=sD[i];if(s.test&&s.test(t,r))return new s(t,e)}throw Error("Unrecognized source type to auto-detect Resource")}class sB{/**
   * @param name - The function name that will be executed on the listeners added to this Runner.
   */constructor(t){this.items=[],this._name=t,this._aliasCount=0}/* eslint-disable jsdoc/require-param, jsdoc/check-param-names *//**
   * Dispatch/Broadcast Runner to all listeners added to the queue.
   * @param {...any} params - (optional) parameters to pass to each listener
   *//*  eslint-enable jsdoc/require-param, jsdoc/check-param-names */emit(t,e,r,i,s,n,a,o){if(arguments.length>8)throw Error("max arguments reached");let{name:h,items:l}=this;this._aliasCount++;for(let u=0,d=l.length;u<d;u++)l[u][h](t,e,r,i,s,n,a,o);return l===this.items&&this._aliasCount--,this}ensureNonAliasedItems(){this._aliasCount>0&&this.items.length>1&&(this._aliasCount=0,this.items=this.items.slice(0))}/**
   * Add a listener to the Runner
   *
   * Runners do not need to have scope or functions passed to them.
   * All that is required is to pass the listening object and ensure that it has contains a function that has the same name
   * as the name provided to the Runner when it was created.
   *
   * E.g. A listener passed to this Runner will require a 'complete' function.
   *
   * ```js
   * import { Runner } from '@pixi/runner';
   *
   * const complete = new Runner('complete');
   * ```
   *
   * The scope used will be the object itself.
   * @param {any} item - The object that will be listening.
   */add(t){return t[this._name]&&(this.ensureNonAliasedItems(),this.remove(t),this.items.push(t)),this}/**
   * Remove a single listener from the dispatch queue.
   * @param {any} item - The listener that you would like to remove.
   */remove(t){let e=this.items.indexOf(t);return -1!==e&&(this.ensureNonAliasedItems(),this.items.splice(e,1)),this}/**
   * Check to see if the listener is already in the Runner
   * @param {any} item - The listener that you would like to check.
   */contains(t){return this.items.includes(t)}/** Remove all listeners from the Runner */removeAll(){return this.ensureNonAliasedItems(),this.items.length=0,this}/** Remove all references, don't use after this. */destroy(){this.removeAll(),this.items=null,this._name=null}/**
   * `true` if there are no this Runner contains no listeners
   * @readonly
   */get empty(){return 0===this.items.length}/**
   * The name of the runner.
   * @readonly
   */get name(){return this._name}}Object.defineProperties(sB.prototype,{/**
   * Alias for `emit`
   * @memberof PIXI.Runner#
   * @method dispatch
   * @see PIXI.Runner#emit
   */dispatch:{value:sB.prototype.emit},/**
   * Alias for `emit`
   * @memberof PIXI.Runner#
   * @method run
   * @see PIXI.Runner#emit
   */run:{value:sB.prototype.emit}});class sN{/**
   * @param width - Width of the resource
   * @param height - Height of the resource
   */constructor(t=0,e=0){this._width=t,this._height=e,this.destroyed=!1,this.internal=!1,this.onResize=new sB("setRealSize"),this.onUpdate=new sB("update"),this.onError=new sB("onError")}/**
   * Bind to a parent BaseTexture
   * @param baseTexture - Parent texture
   */bind(t){this.onResize.add(t),this.onUpdate.add(t),this.onError.add(t),(this._width||this._height)&&this.onResize.emit(this._width,this._height)}/**
   * Unbind to a parent BaseTexture
   * @param baseTexture - Parent texture
   */unbind(t){this.onResize.remove(t),this.onUpdate.remove(t),this.onError.remove(t)}/**
   * Trigger a resize event
   * @param width - X dimension
   * @param height - Y dimension
   */resize(t,e){(t!==this._width||e!==this._height)&&(this._width=t,this._height=e,this.onResize.emit(t,e))}/**
   * Has been validated
   * @readonly
   */get valid(){return!!this._width&&!!this._height}/** Has been updated trigger event. */update(){this.destroyed||this.onUpdate.emit()}/**
   * This can be overridden to start preloading a resource
   * or do any other prepare step.
   * @protected
   * @returns Handle the validate event
   */load(){return Promise.resolve(this)}/**
   * The width of the resource.
   * @readonly
   */get width(){return this._width}/**
   * The height of the resource.
   * @readonly
   */get height(){return this._height}/**
   * Set the style, optional to override
   * @param _renderer - yeah, renderer!
   * @param _baseTexture - the texture
   * @param _glTexture - texture instance for this webgl context
   * @returns - `true` is success
   */style(t,e,r){return!1}/** Clean up anything, this happens when destroying is ready. */dispose(){}/**
   * Call when destroying resource, unbind any BaseTexture object
   * before calling this method, as reference counts are maintained
   * internally.
   */destroy(){this.destroyed||(this.destroyed=!0,this.dispose(),this.onError.removeAll(),this.onError=null,this.onResize.removeAll(),this.onResize=null,this.onUpdate.removeAll(),this.onUpdate=null)}/**
   * Abstract, used to auto-detect resource type.
   * @param {*} _source - The source object
   * @param {string} _extension - The extension of source, if set
   */static test(t,e){return!1}}class sF extends sN{/**
   * @param source - Source buffer
   * @param options - Options
   * @param {number} options.width - Width of the texture
   * @param {number} options.height - Height of the texture
   * @param {1|2|4|8} [options.unpackAlignment=4] - The alignment of the pixel rows.
   */constructor(t,e){let{width:r,height:i}=e||{};if(!r||!i)throw Error("BufferResource width or height invalid");super(r,i),this.data=t,this.unpackAlignment=e.unpackAlignment??4}/**
   * Upload the texture to the GPU.
   * @param renderer - Upload to the renderer
   * @param baseTexture - Reference to parent texture
   * @param glTexture - glTexture
   * @returns - true is success
   */upload(t,e,r){let i=t.gl;i.pixelStorei(i.UNPACK_ALIGNMENT,this.unpackAlignment),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,e.alphaMode===te.UNPACK);let s=e.realWidth,n=e.realHeight;return r.width===s&&r.height===n?i.texSubImage2D(e.target,0,0,0,s,n,e.format,r.type,this.data):(r.width=s,r.height=n,i.texImage2D(e.target,0,r.internalFormat,s,n,0,e.format,r.type,this.data)),!0}/** Destroy and don't use after this. */dispose(){this.data=null}/**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if buffer source
   */static test(t){return null===t||t instanceof Int8Array||t instanceof Uint8Array||t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array}}const sL={scaleMode:Q.NEAREST,alphaMode:te.NPM},sU=class t extends /*@__PURE__*/U(tP){/**
   * @param {PIXI.Resource|HTMLImageElement|HTMLVideoElement|ImageBitmap|ICanvas|string} [resource=null] -
   *        The current resource to use, for things that aren't Resource objects, will be converted
   *        into a Resource.
   * @param options - Collection of options, default options inherited from {@link PIXI.BaseTexture.defaultOptions}.
   * @param {PIXI.MIPMAP_MODES} [options.mipmap] - If mipmapping is enabled for texture
   * @param {number} [options.anisotropicLevel] - Anisotropic filtering level of texture
   * @param {PIXI.WRAP_MODES} [options.wrapMode] - Wrap mode for textures
   * @param {PIXI.SCALE_MODES} [options.scaleMode] - Default scale mode, linear, nearest
   * @param {PIXI.FORMATS} [options.format] - GL format type
   * @param {PIXI.TYPES} [options.type] - GL data type
   * @param {PIXI.TARGETS} [options.target] - GL texture target
   * @param {PIXI.ALPHA_MODES} [options.alphaMode] - Pre multiply the image alpha
   * @param {number} [options.width=0] - Width of the texture
   * @param {number} [options.height=0] - Height of the texture
   * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - Resolution of the base texture
   * @param {object} [options.resourceOptions] - Optional resource options,
   *        see {@link PIXI.autoDetectResource autoDetectResource}
   */constructor(e=null,r=null){super(),r=Object.assign({},t.defaultOptions,r);let{alphaMode:i,mipmap:s,anisotropicLevel:n,scaleMode:a,width:o,height:h,wrapMode:l,format:u,type:d,target:c,resolution:p,resourceOptions:f}=r;!e||e instanceof sN||((e=sO(e,f)).internal=!0),this.resolution=p||tl.RESOLUTION,this.width=Math.round((o||0)*this.resolution)/this.resolution,this.height=Math.round((h||0)*this.resolution)/this.resolution,this._mipmap=s,this.anisotropicLevel=n,this._wrapMode=l,this._scaleMode=a,this.format=u,this.type=d,this.target=c,this.alphaMode=i,this.uid=sl(),this.touched=0,this.isPowerOfTwo=!1,this._refreshPOT(),this._glTextures={},this.dirtyId=0,this.dirtyStyleId=0,this.cacheId=null,this.valid=o>0&&h>0,this.textureCacheIds=[],this.destroyed=!1,this.resource=null,this._batchEnabled=0,this._batchLocation=0,this.parentTextureArray=null,this.setResource(e)}/**
   * Pixel width of the source of this texture
   * @readonly
   */get realWidth(){return Math.round(this.width*this.resolution)}/**
   * Pixel height of the source of this texture
   * @readonly
   */get realHeight(){return Math.round(this.height*this.resolution)}/**
   * Mipmap mode of the texture, affects downscaled images
   * @default PIXI.MIPMAP_MODES.POW2
   */get mipmap(){return this._mipmap}set mipmap(t){this._mipmap!==t&&(this._mipmap=t,this.dirtyStyleId++)}/**
   * The scale mode to apply when scaling this texture
   * @default PIXI.SCALE_MODES.LINEAR
   */get scaleMode(){return this._scaleMode}set scaleMode(t){this._scaleMode!==t&&(this._scaleMode=t,this.dirtyStyleId++)}/**
   * How the texture wraps
   * @default PIXI.WRAP_MODES.CLAMP
   */get wrapMode(){return this._wrapMode}set wrapMode(t){this._wrapMode!==t&&(this._wrapMode=t,this.dirtyStyleId++)}/**
   * Changes style options of BaseTexture
   * @param scaleMode - Pixi scalemode
   * @param mipmap - enable mipmaps
   * @returns - this
   */setStyle(t,e){let r;return void 0!==t&&t!==this.scaleMode&&(this.scaleMode=t,r=!0),void 0!==e&&e!==this.mipmap&&(this.mipmap=e,r=!0),r&&this.dirtyStyleId++,this}/**
   * Changes w/h/resolution. Texture becomes valid if width and height are greater than zero.
   * @param desiredWidth - Desired visual width
   * @param desiredHeight - Desired visual height
   * @param resolution - Optionally set resolution
   * @returns - this
   */setSize(t,e,r){return r=r||this.resolution,this.setRealSize(t*r,e*r,r)}/**
   * Sets real size of baseTexture, preserves current resolution.
   * @param realWidth - Full rendered width
   * @param realHeight - Full rendered height
   * @param resolution - Optionally set resolution
   * @returns - this
   */setRealSize(t,e,r){return this.resolution=r||this.resolution,this.width=Math.round(t)/this.resolution,this.height=Math.round(e)/this.resolution,this._refreshPOT(),this.update(),this}/**
   * Refresh check for isPowerOfTwo texture based on size
   * @private
   */_refreshPOT(){this.isPowerOfTwo=ss(this.realWidth)&&ss(this.realHeight)}/**
   * Changes resolution
   * @param resolution - res
   * @returns - this
   */setResolution(t){let e=this.resolution;return e===t||(this.resolution=t,this.valid&&(this.width=Math.round(this.width*e)/t,this.height=Math.round(this.height*e)/t,this.emit("update",this)),this._refreshPOT()),this}/**
   * Sets the resource if it wasn't set. Throws error if resource already present
   * @param resource - that is managing this BaseTexture
   * @returns - this
   */setResource(t){if(this.resource===t)return this;if(this.resource)throw Error("Resource can be set only once");return t.bind(this),this.resource=t,this}/** Invalidates the object. Texture becomes valid if width and height are greater than zero. */update(){this.valid?(this.dirtyId++,this.dirtyStyleId++,this.emit("update",this)):this.width>0&&this.height>0&&(this.valid=!0,this.emit("loaded",this),this.emit("update",this))}/**
   * Handle errors with resources.
   * @private
   * @param event - Error event emitted.
   */onError(t){this.emit("error",this,t)}/**
   * Destroys this base texture.
   * The method stops if resource doesn't want this texture to be destroyed.
   * Removes texture from all caches.
   * @fires PIXI.BaseTexture#destroyed
   */destroy(){this.resource&&(this.resource.unbind(this),this.resource.internal&&this.resource.destroy(),this.resource=null),this.cacheId&&(delete sf[this.cacheId],delete sp[this.cacheId],this.cacheId=null),this.valid=!1,this.dispose(),t.removeFromCache(this),this.textureCacheIds=null,this.destroyed=!0,this.emit("destroyed",this),this.removeAllListeners()}/**
   * Frees the texture from WebGL memory without destroying this texture object.
   * This means you can still use the texture later which will upload it to GPU
   * memory again.
   * @fires PIXI.BaseTexture#dispose
   */dispose(){this.emit("dispose",this)}/** Utility function for BaseTexture|Texture cast. */castToBaseTexture(){return this}/**
   * Helper function that creates a base texture based on the source you provide.
   * The source can be - image url, image element, canvas element. If the
   * source is an image url or an image element and not in the base texture
   * cache, it will be created and loaded.
   * @static
   * @param {HTMLImageElement|HTMLVideoElement|ImageBitmap|PIXI.ICanvas|string|string[]} source - The
   *        source to create base texture from.
   * @param options - See {@link PIXI.BaseTexture}'s constructor for options.
   * @param {string} [options.pixiIdPrefix=pixiid] - If a source has no id, this is the prefix of the generated id
   * @param {boolean} [strict] - Enforce strict-mode, see {@link PIXI.settings.STRICT_TEXTURE_CACHE}.
   * @returns {PIXI.BaseTexture} The new base texture.
   */static from(e,r,i=tl.STRICT_TEXTURE_CACHE){let s="string"==typeof e,n=null;if(s)n=e;else{if(!e._pixiId){let t=r?.pixiIdPrefix||"pixiid";e._pixiId=`${t}_${sl()}`}n=e._pixiId}let a=sf[n];if(s&&i&&!a)throw Error(`The cacheId "${n}" does not exist in BaseTextureCache.`);return a||((a=new t(e,r)).cacheId=n,t.addToCache(a,n)),a}/**
   * Create a new Texture with a BufferResource from a typed array.
   * @param buffer - The optional array to use. If no data is provided, a new Float32Array is created.
   * @param width - Width of the resource
   * @param height - Height of the resource
   * @param options - See {@link PIXI.BaseTexture}'s constructor for options.
   *        Default properties are different from the constructor's defaults.
   * @param {PIXI.FORMATS} [options.format] - The format is not given, the type is inferred from the
   *        type of the buffer: `RGBA` if Float32Array, Int8Array, Uint8Array, or Uint8ClampedArray,
   *        otherwise `RGBA_INTEGER`.
   * @param {PIXI.TYPES} [options.type] - The type is not given, the type is inferred from the
   *        type of the buffer. Maps Float32Array to `FLOAT`, Int32Array to `INT`, Uint32Array to
   *        `UNSIGNED_INT`, Int16Array to `SHORT`, Uint16Array to `UNSIGNED_SHORT`, Int8Array to `BYTE`,
   *        Uint8Array/Uint8ClampedArray to `UNSIGNED_BYTE`.
   * @param {PIXI.ALPHA_MODES} [options.alphaMode=PIXI.ALPHA_MODES.NPM]
   * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.SCALE_MODES.NEAREST]
   * @returns - The resulting new BaseTexture
   */static fromBuffer(e,r,i,s){let n,a;e=e||new Float32Array(r*i*4);let o=new sF(e,{width:r,height:i,...s?.resourceOptions});return e instanceof Float32Array?(n=Y.RGBA,a=K.FLOAT):e instanceof Int32Array?(n=Y.RGBA_INTEGER,a=K.INT):e instanceof Uint32Array?(n=Y.RGBA_INTEGER,a=K.UNSIGNED_INT):e instanceof Int16Array?(n=Y.RGBA_INTEGER,a=K.SHORT):e instanceof Uint16Array?(n=Y.RGBA_INTEGER,a=K.UNSIGNED_SHORT):e instanceof Int8Array?(n=Y.RGBA,a=K.BYTE):(n=Y.RGBA,a=K.UNSIGNED_BYTE),o.internal=!0,new t(o,Object.assign({},sL,{type:a,format:n},s))}/**
   * Adds a BaseTexture to the global BaseTextureCache. This cache is shared across the whole PIXI object.
   * @param {PIXI.BaseTexture} baseTexture - The BaseTexture to add to the cache.
   * @param {string} id - The id that the BaseTexture will be stored against.
   */static addToCache(t,e){e&&(t.textureCacheIds.includes(e)||t.textureCacheIds.push(e),sf[e]&&sf[e]!==t&&console.warn(`BaseTexture added to the cache with an id [${e}] that already had an entry`),sf[e]=t)}/**
   * Remove a BaseTexture from the global BaseTextureCache.
   * @param {string|PIXI.BaseTexture} baseTexture - id of a BaseTexture to be removed, or a BaseTexture instance itself.
   * @returns {PIXI.BaseTexture|null} The BaseTexture that was removed.
   */static removeFromCache(t){if("string"==typeof t){let e=sf[t];if(e){let r=e.textureCacheIds.indexOf(t);return r>-1&&e.textureCacheIds.splice(r,1),delete sf[t],e}}else if(t?.textureCacheIds){for(let e=0;e<t.textureCacheIds.length;++e)delete sf[t.textureCacheIds[e]];return t.textureCacheIds.length=0,t}return null}};sU.defaultOptions={/**
   * If mipmapping is enabled for texture.
   * @type {PIXI.MIPMAP_MODES}
   * @default PIXI.MIPMAP_MODES.POW2
   */mipmap:tt.POW2,/** Anisotropic filtering level of texture */anisotropicLevel:0,/**
   * Default scale mode, linear, nearest.
   * @type {PIXI.SCALE_MODES}
   * @default PIXI.SCALE_MODES.LINEAR
   */scaleMode:Q.LINEAR,/**
   * Wrap mode for textures.
   * @type {PIXI.WRAP_MODES}
   * @default PIXI.WRAP_MODES.CLAMP
   */wrapMode:J.CLAMP,/**
   * Pre multiply the image alpha
   * @type {PIXI.ALPHA_MODES}
   * @default PIXI.ALPHA_MODES.UNPACK
   */alphaMode:te.UNPACK,/**
   * GL texture target
   * @type {PIXI.TARGETS}
   * @default PIXI.TARGETS.TEXTURE_2D
   */target:q.TEXTURE_2D,/**
   * GL format type
   * @type {PIXI.FORMATS}
   * @default PIXI.FORMATS.RGBA
   */format:Y.RGBA,/**
   * GL data type
   * @type {PIXI.TYPES}
   * @default PIXI.TYPES.UNSIGNED_BYTE
   */type:K.UNSIGNED_BYTE},/** Global number of the texture batch, used by multi-texture renderers. */sU._globalBatch=0;let sk=sU;class sG{constructor(){this.texArray=null,this.blend=0,this.type=$.TRIANGLES,this.start=0,this.size=0,this.data=null}}let sH=0;class sj{/**
   * @param {PIXI.IArrayBuffer} data - the data to store in the buffer.
   * @param _static - `true` for static buffer
   * @param index - `true` for index buffer
   */constructor(t,e=!0,r=!1){this.data=t||new Float32Array(1),this._glBuffers={},this._updateID=0,this.index=r,this.static=e,this.id=sH++,this.disposeRunner=new sB("disposeBuffer")}// TODO could explore flagging only a partial upload?
/**
   * Flags this buffer as requiring an upload to the GPU.
   * @param {PIXI.IArrayBuffer|number[]} [data] - the data to update in the buffer.
   */update(t){t instanceof Array&&(t=new Float32Array(t)),this.data=t||this.data,this._updateID++}/** Disposes WebGL resources that are connected to this geometry. */dispose(){this.disposeRunner.emit(this,!1)}/** Destroys the buffer. */destroy(){this.dispose(),this.data=null}/**
   * Flags whether this is an index buffer.
   *
   * Index buffers are of type `ELEMENT_ARRAY_BUFFER`. Note that setting this property to false will make
   * the buffer of type `ARRAY_BUFFER`.
   *
   * For backwards compatibility.
   */set index(t){this.type=t?th.ELEMENT_ARRAY_BUFFER:th.ARRAY_BUFFER}get index(){return this.type===th.ELEMENT_ARRAY_BUFFER}/**
   * Helper function that creates a buffer based on an array or TypedArray
   * @param {ArrayBufferView | number[]} data - the TypedArray that the buffer will store. If this is a regular Array it will be converted to a Float32Array.
   * @returns - A new Buffer based on the data provided.
   */static from(t){return t instanceof Array&&(t=new Float32Array(t)),new sj(t)}}class sX{/**
   * @param buffer - the id of the buffer that this attribute will look for
   * @param size - the size of the attribute. If you have 2 floats per vertex (eg position x and y) this would be 2.
   * @param normalized - should the data be normalized.
   * @param {PIXI.TYPES} [type=PIXI.TYPES.FLOAT] - what type of number is the attribute. Check {@link PIXI.TYPES} to see the ones available
   * @param [stride=0] - How far apart, in bytes, the start of each value is. (used for interleaving data)
   * @param [start=0] - How far into the array to start reading values (used for interleaving data)
   * @param [instance=false] - Whether the geometry is instanced.
   * @param [divisor=1] - Divisor to use when doing instanced rendering
   */constructor(t,e=0,r=!1,i=K.FLOAT,s,n,a,o=1){this.buffer=t,this.size=e,this.normalized=r,this.type=i,this.stride=s,this.start=n,this.instance=a,this.divisor=o}/** Destroys the Attribute. */destroy(){this.buffer=null}/**
   * Helper function that creates an Attribute based on the information provided
   * @param buffer - the id of the buffer that this attribute will look for
   * @param [size=0] - the size of the attribute. If you have 2 floats per vertex (eg position x and y) this would be 2
   * @param [normalized=false] - should the data be normalized.
   * @param [type=PIXI.TYPES.FLOAT] - what type of number is the attribute. Check {@link PIXI.TYPES} to see the ones available
   * @param [stride=0] - How far apart, in bytes, the start of each value is. (used for interleaving data)
   * @returns - A new {@link PIXI.Attribute} based on the information provided
   */static from(t,e,r,i,s){return new sX(t,e,r,i,s)}}const sV={Float32Array:Float32Array,Uint32Array:Uint32Array,Int32Array:Int32Array,Uint8Array:Uint8Array},sz={5126:4,5123:2,5121:1};let sW=0;const s$={Float32Array:Float32Array,Uint32Array:Uint32Array,Int32Array:Int32Array,Uint8Array:Uint8Array,Uint16Array:Uint16Array};class sY{/**
   * @param buffers - An array of buffers. optional.
   * @param attributes - Of the geometry, optional structure of the attributes layout
   */constructor(t=[],e={}){this.buffers=t,this.indexBuffer=null,this.attributes=e,this.glVertexArrayObjects={},this.id=sW++,this.instanced=!1,this.instanceCount=1,this.disposeRunner=new sB("disposeGeometry"),this.refCount=0}/**
   *
   * Adds an attribute to the geometry
   * Note: `stride` and `start` should be `undefined` if you dont know them, not 0!
   * @param id - the name of the attribute (matching up to a shader)
   * @param {PIXI.Buffer|number[]} buffer - the buffer that holds the data of the attribute . You can also provide an Array and a buffer will be created from it.
   * @param size - the size of the attribute. If you have 2 floats per vertex (eg position x and y) this would be 2
   * @param normalized - should the data be normalized.
   * @param [type=PIXI.TYPES.FLOAT] - what type of number is the attribute. Check {@link PIXI.TYPES} to see the ones available
   * @param [stride=0] - How far apart, in bytes, the start of each value is. (used for interleaving data)
   * @param [start=0] - How far into the array to start reading values (used for interleaving data)
   * @param instance - Instancing flag
   * @returns - Returns self, useful for chaining.
   */addAttribute(t,e,r=0,i=!1,s,n,a,o=!1){if(!e)throw Error("You must pass a buffer when creating an attribute");e instanceof sj||(e instanceof Array&&(e=new Float32Array(e)),e=new sj(e));let h=t.split("|");if(h.length>1){for(let t=0;t<h.length;t++)this.addAttribute(h[t],e,r,i,s);return this}let l=this.buffers.indexOf(e);return -1===l&&(this.buffers.push(e),l=this.buffers.length-1),this.attributes[t]=new sX(l,r,i,s,n,a,o),this.instanced=this.instanced||o,this}/**
   * Returns the requested attribute.
   * @param id - The name of the attribute required
   * @returns - The attribute requested.
   */getAttribute(t){return this.attributes[t]}/**
   * Returns the requested buffer.
   * @param id - The name of the buffer required.
   * @returns - The buffer requested.
   */getBuffer(t){return this.buffers[this.getAttribute(t).buffer]}/**
   *
   * Adds an index buffer to the geometry
   * The index buffer contains integers, three for each triangle in the geometry, which reference the various attribute buffers (position, colour, UV coordinates, other UV coordinates, normal, …). There is only ONE index buffer.
   * @param {PIXI.Buffer|number[]} [buffer] - The buffer that holds the data of the index buffer. You can also provide an Array and a buffer will be created from it.
   * @returns - Returns self, useful for chaining.
   */addIndex(t){return t instanceof sj||(t instanceof Array&&(t=new Uint16Array(t)),t=new sj(t)),t.type=th.ELEMENT_ARRAY_BUFFER,this.indexBuffer=t,this.buffers.includes(t)||this.buffers.push(t),this}/**
   * Returns the index buffer
   * @returns - The index buffer.
   */getIndex(){return this.indexBuffer}/**
   * This function modifies the structure so that all current attributes become interleaved into a single buffer
   * This can be useful if your model remains static as it offers a little performance boost
   * @returns - Returns self, useful for chaining.
   */interleave(){let t;if(1===this.buffers.length||2===this.buffers.length&&this.indexBuffer)return this;let e=[],r=[],i=new sj;for(t in this.attributes){let i=this.attributes[t],s=this.buffers[i.buffer];e.push(s.data),r.push(i.size*sz[i.type]/4),i.buffer=0}for(i.data=function(t,e){let r=0,i=0,s={};for(let s=0;s<t.length;s++)i+=e[s],r+=t[s].length;let n=new ArrayBuffer(4*r),a=null,o=0;for(let r=0;r<t.length;r++){let h=e[r],l=t[r],u=st(l);s[u]||(s[u]=new sV[u](n)),a=s[u];for(let t=0;t<l.length;t++){let e=(t/h|0)*i+o,r=t%h;a[e+r]=l[t]}o+=h}return new Float32Array(n)}(e,r),t=0;t<this.buffers.length;t++)this.buffers[t]!==this.indexBuffer&&this.buffers[t].destroy();return this.buffers=[i],this.indexBuffer&&this.buffers.push(this.indexBuffer),this}/** Get the size of the geometries, in vertices. */getSize(){for(let t in this.attributes){let e=this.attributes[t];return this.buffers[e.buffer].data.length/(e.stride/4||e.size)}return 0}/** Disposes WebGL resources that are connected to this geometry. */dispose(){this.disposeRunner.emit(this,!1)}/** Destroys the geometry. */destroy(){this.dispose(),this.buffers=null,this.indexBuffer=null,this.attributes=null}/**
   * Returns a clone of the geometry.
   * @returns - A new clone of this geometry.
   */clone(){let t=new sY;for(let e=0;e<this.buffers.length;e++)t.buffers[e]=new sj(this.buffers[e].data.slice(0));for(let e in this.attributes){let r=this.attributes[e];t.attributes[e]=new sX(r.buffer,r.size,r.normalized,r.type,r.stride,r.start,r.instance)}return this.indexBuffer&&(t.indexBuffer=t.buffers[this.buffers.indexOf(this.indexBuffer)],t.indexBuffer.type=th.ELEMENT_ARRAY_BUFFER),t}/**
   * Merges an array of geometries into a new single one.
   *
   * Geometry attribute styles must match for this operation to work.
   * @param geometries - array of geometries to merge
   * @returns - Shiny new geometry!
   */static merge(t){let e;let r=new sY,i=[],s=[],n=[];for(let r=0;r<t.length;r++){e=t[r];for(let t=0;t<e.buffers.length;t++)s[t]=s[t]||0,s[t]+=e.buffers[t].data.length,n[t]=0}for(let t=0;t<e.buffers.length;t++)i[t]=new s$[st(e.buffers[t].data)](s[t]),r.buffers[t]=new sj(i[t]);for(let r=0;r<t.length;r++){e=t[r];for(let t=0;t<e.buffers.length;t++)i[t].set(e.buffers[t].data,n[t]),n[t]+=e.buffers[t].data.length}if(r.attributes=e.attributes,e.indexBuffer){r.indexBuffer=r.buffers[e.buffers.indexOf(e.indexBuffer)],r.indexBuffer.type=th.ELEMENT_ARRAY_BUFFER;let i=0,s=0,n=0,a=0;for(let t=0;t<e.buffers.length;t++)if(e.buffers[t]!==e.indexBuffer){a=t;break}for(let t in e.attributes){let r=e.attributes[t];(0|r.buffer)===a&&(s+=r.size*sz[r.type]/4)}for(let e=0;e<t.length;e++){let o=t[e].indexBuffer.data;for(let t=0;t<o.length;t++)r.indexBuffer.data[t+n]+=i;i+=t[e].buffers[a].data.length/s,n+=o.length}}return r}}class sq extends sY{/**
   * @param {boolean} [_static=false] - Optimization flag, where `false`
   *        is updated every frame, `true` doesn't change frame-to-frame.
   */constructor(t=!1){super(),this._buffer=new sj(null,t,!1),this._indexBuffer=new sj(null,t,!0),this.addAttribute("aVertexPosition",this._buffer,2,!1,K.FLOAT).addAttribute("aTextureCoord",this._buffer,2,!1,K.FLOAT).addAttribute("aColor",this._buffer,4,!0,K.UNSIGNED_BYTE).addAttribute("aTextureId",this._buffer,1,!0,K.FLOAT).addIndex(this._indexBuffer)}}const sK=2*Math.PI,sZ=180/Math.PI,sQ=Math.PI/180;var sJ=((I=sJ||{})[I.POLY=0]="POLY",I[I.RECT=1]="RECT",I[I.CIRC=2]="CIRC",I[I.ELIP=3]="ELIP",I[I.RREC=4]="RREC",I);class s0{/**
   * Creates a new `Point`
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=0] - position of the point on the y axis
   */constructor(t=0,e=0){this.x=0,this.y=0,this.x=t,this.y=e}/**
   * Creates a clone of this point
   * @returns A clone of this point
   */clone(){return new s0(this.x,this.y)}/**
   * Copies `x` and `y` from the given point into this point
   * @param p - The point to copy from
   * @returns The point instance itself
   */copyFrom(t){return this.set(t.x,t.y),this}/**
   * Copies this point's x and y into the given point (`p`).
   * @param p - The point to copy to. Can be any of type that is or extends `IPointData`
   * @returns The point (`p`) with values updated
   */copyTo(t){return t.set(this.x,this.y),t}/**
   * Accepts another point (`p`) and returns `true` if the given point is equal to this point
   * @param p - The point to check
   * @returns Returns `true` if both `x` and `y` are equal
   */equals(t){return t.x===this.x&&t.y===this.y}/**
   * Sets the point to a new `x` and `y` position.
   * If `y` is omitted, both `x` and `y` will be set to `x`.
   * @param {number} [x=0] - position of the point on the `x` axis
   * @param {number} [y=x] - position of the point on the `y` axis
   * @returns The point instance itself
   */set(t=0,e=t){return this.x=t,this.y=e,this}}s0.prototype.toString=function(){return`[@pixi/math:Point x=${this.x} y=${this.y}]`};const s1=[new s0,new s0,new s0,new s0];class s2{/**
   * @param x - The X coordinate of the upper-left corner of the rectangle
   * @param y - The Y coordinate of the upper-left corner of the rectangle
   * @param width - The overall width of the rectangle
   * @param height - The overall height of the rectangle
   */constructor(t=0,e=0,r=0,i=0){this.x=Number(t),this.y=Number(e),this.width=Number(r),this.height=Number(i),this.type=sJ.RECT}/** Returns the left edge of the rectangle. */get left(){return this.x}/** Returns the right edge of the rectangle. */get right(){return this.x+this.width}/** Returns the top edge of the rectangle. */get top(){return this.y}/** Returns the bottom edge of the rectangle. */get bottom(){return this.y+this.height}/** A constant empty rectangle. */static get EMPTY(){return new s2(0,0,0,0)}/**
   * Creates a clone of this Rectangle
   * @returns a copy of the rectangle
   */clone(){return new s2(this.x,this.y,this.width,this.height)}/**
   * Copies another rectangle to this one.
   * @param rectangle - The rectangle to copy from.
   * @returns Returns itself.
   */copyFrom(t){return this.x=t.x,this.y=t.y,this.width=t.width,this.height=t.height,this}/**
   * Copies this rectangle to another one.
   * @param rectangle - The rectangle to copy to.
   * @returns Returns given parameter.
   */copyTo(t){return t.x=this.x,t.y=this.y,t.width=this.width,t.height=this.height,t}/**
   * Checks whether the x and y coordinates given are contained within this Rectangle
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coordinates are within this Rectangle
   */contains(t,e){return!(this.width<=0)&&!(this.height<=0)&&t>=this.x&&t<this.x+this.width&&e>=this.y&&e<this.y+this.height}/**
   * Determines whether the `other` Rectangle transformed by `transform` intersects with `this` Rectangle object.
   * Returns true only if the area of the intersection is >0, this means that Rectangles
   * sharing a side are not overlapping. Another side effect is that an arealess rectangle
   * (width or height equal to zero) can't intersect any other rectangle.
   * @param {Rectangle} other - The Rectangle to intersect with `this`.
   * @param {Matrix} transform - The transformation matrix of `other`.
   * @returns {boolean} A value of `true` if the transformed `other` Rectangle intersects with `this`; otherwise `false`.
   */intersects(t,e){if(!e){let e=this.x<t.x?t.x:this.x;if((this.right>t.right?t.right:this.right)<=e)return!1;let r=this.y<t.y?t.y:this.y;return(this.bottom>t.bottom?t.bottom:this.bottom)>r}let r=this.left,i=this.right,s=this.top,n=this.bottom;if(i<=r||n<=s)return!1;let a=s1[0].set(t.left,t.top),o=s1[1].set(t.left,t.bottom),h=s1[2].set(t.right,t.top),l=s1[3].set(t.right,t.bottom);if(h.x<=a.x||o.y<=a.y)return!1;let u=Math.sign(e.a*e.d-e.b*e.c);if(0===u||(e.apply(a,a),e.apply(o,o),e.apply(h,h),e.apply(l,l),Math.max(a.x,o.x,h.x,l.x)<=r||Math.min(a.x,o.x,h.x,l.x)>=i||Math.max(a.y,o.y,h.y,l.y)<=s||Math.min(a.y,o.y,h.y,l.y)>=n))return!1;let d=u*(o.y-a.y),c=u*(a.x-o.x),p=d*r+c*s,f=d*i+c*s,m=d*r+c*n,g=d*i+c*n;if(Math.max(p,f,m,g)<=d*a.x+c*a.y||Math.min(p,f,m,g)>=d*l.x+c*l.y)return!1;let _=u*(a.y-h.y),y=u*(h.x-a.x),v=_*r+y*s,x=_*i+y*s,b=_*r+y*n,E=_*i+y*n;return!(Math.max(v,x,b,E)<=_*a.x+y*a.y||Math.min(v,x,b,E)>=_*l.x+y*l.y)}/**
   * Pads the rectangle making it grow in all directions.
   * If paddingY is omitted, both paddingX and paddingY will be set to paddingX.
   * @param paddingX - The horizontal padding amount.
   * @param paddingY - The vertical padding amount.
   * @returns Returns itself.
   */pad(t=0,e=t){return this.x-=t,this.y-=e,this.width+=2*t,this.height+=2*e,this}/**
   * Fits this rectangle around the passed one.
   * @param rectangle - The rectangle to fit.
   * @returns Returns itself.
   */fit(t){let e=Math.max(this.x,t.x),r=Math.min(this.x+this.width,t.x+t.width),i=Math.max(this.y,t.y),s=Math.min(this.y+this.height,t.y+t.height);return this.x=e,this.width=Math.max(r-e,0),this.y=i,this.height=Math.max(s-i,0),this}/**
   * Enlarges rectangle that way its corners lie on grid
   * @param resolution - resolution
   * @param eps - precision
   * @returns Returns itself.
   */ceil(t=1,e=.001){let r=Math.ceil((this.x+this.width-e)*t)/t,i=Math.ceil((this.y+this.height-e)*t)/t;return this.x=Math.floor((this.x+e)*t)/t,this.y=Math.floor((this.y+e)*t)/t,this.width=r-this.x,this.height=i-this.y,this}/**
   * Enlarges this rectangle to include the passed rectangle.
   * @param rectangle - The rectangle to include.
   * @returns Returns itself.
   */enlarge(t){let e=Math.min(this.x,t.x),r=Math.max(this.x+this.width,t.x+t.width),i=Math.min(this.y,t.y),s=Math.max(this.y+this.height,t.y+t.height);return this.x=e,this.width=r-e,this.y=i,this.height=s-i,this}}s2.prototype.toString=function(){return`[@pixi/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`};class s3{/**
   * @param x - The X coordinate of the center of this circle
   * @param y - The Y coordinate of the center of this circle
   * @param radius - The radius of the circle
   */constructor(t=0,e=0,r=0){this.x=t,this.y=e,this.radius=r,this.type=sJ.CIRC}/**
   * Creates a clone of this Circle instance
   * @returns A copy of the Circle
   */clone(){return new s3(this.x,this.y,this.radius)}/**
   * Checks whether the x and y coordinates given are contained within this circle
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coordinates are within this Circle
   */contains(t,e){if(this.radius<=0)return!1;let r=this.radius*this.radius,i=this.x-t,s=this.y-e;return i*=i,s*=s,i+s<=r}/**
   * Returns the framing rectangle of the circle as a Rectangle object
   * @returns The framing rectangle
   */getBounds(){return new s2(this.x-this.radius,this.y-this.radius,2*this.radius,2*this.radius)}}s3.prototype.toString=function(){return`[@pixi/math:Circle x=${this.x} y=${this.y} radius=${this.radius}]`};class s4{/**
   * @param x - The X coordinate of the center of this ellipse
   * @param y - The Y coordinate of the center of this ellipse
   * @param halfWidth - The half width of this ellipse
   * @param halfHeight - The half height of this ellipse
   */constructor(t=0,e=0,r=0,i=0){this.x=t,this.y=e,this.width=r,this.height=i,this.type=sJ.ELIP}/**
   * Creates a clone of this Ellipse instance
   * @returns {PIXI.Ellipse} A copy of the ellipse
   */clone(){return new s4(this.x,this.y,this.width,this.height)}/**
   * Checks whether the x and y coordinates given are contained within this ellipse
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coords are within this ellipse
   */contains(t,e){if(this.width<=0||this.height<=0)return!1;let r=(t-this.x)/this.width,i=(e-this.y)/this.height;return r*=r,i*=i,r+i<=1}/**
   * Returns the framing rectangle of the ellipse as a Rectangle object
   * @returns The framing rectangle
   */getBounds(){return new s2(this.x-this.width,this.y-this.height,this.width,this.height)}}s4.prototype.toString=function(){return`[@pixi/math:Ellipse x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`};class s5{/**
   * @param {PIXI.IPointData[]|number[]} points - This can be an array of Points
   *  that form the polygon, a flat array of numbers that will be interpreted as [x,y, x,y, ...], or
   *  the arguments passed can be all the points of the polygon e.g.
   *  `new Polygon(new Point(), new Point(), ...)`, or the arguments passed can be flat
   *  x,y values e.g. `new Polygon(x,y, x,y, x,y, ...)` where `x` and `y` are Numbers.
   */constructor(...t){let e=Array.isArray(t[0])?t[0]:t;if("number"!=typeof e[0]){let t=[];for(let r=0,i=e.length;r<i;r++)t.push(e[r].x,e[r].y);e=t}this.points=e,this.type=sJ.POLY,this.closeStroke=!0}/**
   * Creates a clone of this polygon.
   * @returns - A copy of the polygon.
   */clone(){let t=this.points.slice(),e=new s5(t);return e.closeStroke=this.closeStroke,e}/**
   * Checks whether the x and y coordinates passed to this function are contained within this polygon.
   * @param x - The X coordinate of the point to test.
   * @param y - The Y coordinate of the point to test.
   * @returns - Whether the x/y coordinates are within this polygon.
   */contains(t,e){let r=!1,i=this.points.length/2;for(let s=0,n=i-1;s<i;n=s++){let i=this.points[2*s],a=this.points[2*s+1],o=this.points[2*n],h=this.points[2*n+1];a>e!=h>e&&t<(o-i)*((e-a)/(h-a))+i&&(r=!r)}return r}}s5.prototype.toString=function(){return`[@pixi/math:PolygoncloseStroke=${this.closeStroke}points=${this.points.reduce((t,e)=>`${t}, ${e}`,"")}]`};class s6{/**
   * @param x - The X coordinate of the upper-left corner of the rounded rectangle
   * @param y - The Y coordinate of the upper-left corner of the rounded rectangle
   * @param width - The overall width of this rounded rectangle
   * @param height - The overall height of this rounded rectangle
   * @param radius - Controls the radius of the rounded corners
   */constructor(t=0,e=0,r=0,i=0,s=20){this.x=t,this.y=e,this.width=r,this.height=i,this.radius=s,this.type=sJ.RREC}/**
   * Creates a clone of this Rounded Rectangle.
   * @returns - A copy of the rounded rectangle.
   */clone(){return new s6(this.x,this.y,this.width,this.height,this.radius)}/**
   * Checks whether the x and y coordinates given are contained within this Rounded Rectangle
   * @param x - The X coordinate of the point to test.
   * @param y - The Y coordinate of the point to test.
   * @returns - Whether the x/y coordinates are within this Rounded Rectangle.
   */contains(t,e){if(this.width<=0||this.height<=0)return!1;if(t>=this.x&&t<=this.x+this.width&&e>=this.y&&e<=this.y+this.height){let r=Math.max(0,Math.min(this.radius,Math.min(this.width,this.height)/2));if(e>=this.y+r&&e<=this.y+this.height-r||t>=this.x+r&&t<=this.x+this.width-r)return!0;let i=t-(this.x+r),s=e-(this.y+r),n=r*r;if(i*i+s*s<=n||(i=t-(this.x+this.width-r))*i+s*s<=n||i*i+(s=e-(this.y+this.height-r))*s<=n||(i=t-(this.x+r))*i+s*s<=n)return!0}return!1}}s6.prototype.toString=function(){return`[@pixi/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`};class s8{/**
   * @param a - x scale
   * @param b - y skew
   * @param c - x skew
   * @param d - y scale
   * @param tx - x translation
   * @param ty - y translation
   */constructor(t=1,e=0,r=0,i=1,s=0,n=0){this.array=null,this.a=t,this.b=e,this.c=r,this.d=i,this.tx=s,this.ty=n}/**
   * Creates a Matrix object based on the given array. The Element to Matrix mapping order is as follows:
   *
   * a = array[0]
   * b = array[1]
   * c = array[3]
   * d = array[4]
   * tx = array[2]
   * ty = array[5]
   * @param array - The array that the matrix will be populated from.
   */fromArray(t){this.a=t[0],this.b=t[1],this.c=t[3],this.d=t[4],this.tx=t[2],this.ty=t[5]}/**
   * Sets the matrix properties.
   * @param a - Matrix component
   * @param b - Matrix component
   * @param c - Matrix component
   * @param d - Matrix component
   * @param tx - Matrix component
   * @param ty - Matrix component
   * @returns This matrix. Good for chaining method calls.
   */set(t,e,r,i,s,n){return this.a=t,this.b=e,this.c=r,this.d=i,this.tx=s,this.ty=n,this}/**
   * Creates an array from the current Matrix object.
   * @param transpose - Whether we need to transpose the matrix or not
   * @param [out=new Float32Array(9)] - If provided the array will be assigned to out
   * @returns The newly created array which contains the matrix
   */toArray(t,e){this.array||(this.array=new Float32Array(9));let r=e||this.array;return t?(r[0]=this.a,r[1]=this.b,r[2]=0,r[3]=this.c,r[4]=this.d,r[5]=0,r[6]=this.tx,r[7]=this.ty):(r[0]=this.a,r[1]=this.c,r[2]=this.tx,r[3]=this.b,r[4]=this.d,r[5]=this.ty,r[6]=0,r[7]=0),r[8]=1,r}/**
   * Get a new position with the current transformation applied.
   * Can be used to go from a child's coordinate space to the world coordinate space. (e.g. rendering)
   * @param pos - The origin
   * @param {PIXI.Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
   * @returns {PIXI.Point} The new point, transformed through this matrix
   */apply(t,e){e=e||new s0;let r=t.x,i=t.y;return e.x=this.a*r+this.c*i+this.tx,e.y=this.b*r+this.d*i+this.ty,e}/**
   * Get a new position with the inverse of the current transformation applied.
   * Can be used to go from the world coordinate space to a child's coordinate space. (e.g. input)
   * @param pos - The origin
   * @param {PIXI.Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
   * @returns {PIXI.Point} The new point, inverse-transformed through this matrix
   */applyInverse(t,e){e=e||new s0;let r=1/(this.a*this.d+-(this.c*this.b)),i=t.x,s=t.y;return e.x=this.d*r*i+-this.c*r*s+(this.ty*this.c-this.tx*this.d)*r,e.y=this.a*r*s+-this.b*r*i+(-this.ty*this.a+this.tx*this.b)*r,e}/**
   * Translates the matrix on the x and y.
   * @param x - How much to translate x by
   * @param y - How much to translate y by
   * @returns This matrix. Good for chaining method calls.
   */translate(t,e){return this.tx+=t,this.ty+=e,this}/**
   * Applies a scale transformation to the matrix.
   * @param x - The amount to scale horizontally
   * @param y - The amount to scale vertically
   * @returns This matrix. Good for chaining method calls.
   */scale(t,e){return this.a*=t,this.d*=e,this.c*=t,this.b*=e,this.tx*=t,this.ty*=e,this}/**
   * Applies a rotation transformation to the matrix.
   * @param angle - The angle in radians.
   * @returns This matrix. Good for chaining method calls.
   */rotate(t){let e=Math.cos(t),r=Math.sin(t),i=this.a,s=this.c,n=this.tx;return this.a=i*e-this.b*r,this.b=i*r+this.b*e,this.c=s*e-this.d*r,this.d=s*r+this.d*e,this.tx=n*e-this.ty*r,this.ty=n*r+this.ty*e,this}/**
   * Appends the given Matrix to this Matrix.
   * @param matrix - The matrix to append.
   * @returns This matrix. Good for chaining method calls.
   */append(t){let e=this.a,r=this.b,i=this.c,s=this.d;return this.a=t.a*e+t.b*i,this.b=t.a*r+t.b*s,this.c=t.c*e+t.d*i,this.d=t.c*r+t.d*s,this.tx=t.tx*e+t.ty*i+this.tx,this.ty=t.tx*r+t.ty*s+this.ty,this}/**
   * Sets the matrix based on all the available properties
   * @param x - Position on the x axis
   * @param y - Position on the y axis
   * @param pivotX - Pivot on the x axis
   * @param pivotY - Pivot on the y axis
   * @param scaleX - Scale on the x axis
   * @param scaleY - Scale on the y axis
   * @param rotation - Rotation in radians
   * @param skewX - Skew on the x axis
   * @param skewY - Skew on the y axis
   * @returns This matrix. Good for chaining method calls.
   */setTransform(t,e,r,i,s,n,a,o,h){return this.a=Math.cos(a+h)*s,this.b=Math.sin(a+h)*s,this.c=-Math.sin(a-o)*n,this.d=Math.cos(a-o)*n,this.tx=t-(r*this.a+i*this.c),this.ty=e-(r*this.b+i*this.d),this}/**
   * Prepends the given Matrix to this Matrix.
   * @param matrix - The matrix to prepend
   * @returns This matrix. Good for chaining method calls.
   */prepend(t){let e=this.tx;if(1!==t.a||0!==t.b||0!==t.c||1!==t.d){let e=this.a,r=this.c;this.a=e*t.a+this.b*t.c,this.b=e*t.b+this.b*t.d,this.c=r*t.a+this.d*t.c,this.d=r*t.b+this.d*t.d}return this.tx=e*t.a+this.ty*t.c+t.tx,this.ty=e*t.b+this.ty*t.d+t.ty,this}/**
   * Decomposes the matrix (x, y, scaleX, scaleY, and rotation) and sets the properties on to a transform.
   * @param transform - The transform to apply the properties to.
   * @returns The transform with the newly applied properties
   */decompose(t){let e=this.a,r=this.b,i=this.c,s=this.d,n=t.pivot,a=-Math.atan2(-i,s),o=Math.atan2(r,e),h=Math.abs(a+o);return h<1e-5||1e-5>Math.abs(sK-h)?(t.rotation=o,t.skew.x=t.skew.y=0):(t.rotation=0,t.skew.x=a,t.skew.y=o),t.scale.x=Math.sqrt(e*e+r*r),t.scale.y=Math.sqrt(i*i+s*s),t.position.x=this.tx+(n.x*e+n.y*i),t.position.y=this.ty+(n.x*r+n.y*s),t}/**
   * Inverts this matrix
   * @returns This matrix. Good for chaining method calls.
   */invert(){let t=this.a,e=this.b,r=this.c,i=this.d,s=this.tx,n=t*i-e*r;return this.a=i/n,this.b=-e/n,this.c=-r/n,this.d=t/n,this.tx=(r*this.ty-i*s)/n,this.ty=-(t*this.ty-e*s)/n,this}/**
   * Resets this Matrix to an identity (default) matrix.
   * @returns This matrix. Good for chaining method calls.
   */identity(){return this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this}/**
   * Creates a new Matrix object with the same values as this one.
   * @returns A copy of this matrix. Good for chaining method calls.
   */clone(){let t=new s8;return t.a=this.a,t.b=this.b,t.c=this.c,t.d=this.d,t.tx=this.tx,t.ty=this.ty,t}/**
   * Changes the values of the given matrix to be the same as the ones in this matrix
   * @param matrix - The matrix to copy to.
   * @returns The matrix given in parameter with its values updated.
   */copyTo(t){return t.a=this.a,t.b=this.b,t.c=this.c,t.d=this.d,t.tx=this.tx,t.ty=this.ty,t}/**
   * Changes the values of the matrix to be the same as the ones in given matrix
   * @param {PIXI.Matrix} matrix - The matrix to copy from.
   * @returns {PIXI.Matrix} this
   */copyFrom(t){return this.a=t.a,this.b=t.b,this.c=t.c,this.d=t.d,this.tx=t.tx,this.ty=t.ty,this}/**
   * A default (identity) matrix
   * @readonly
   */static get IDENTITY(){return new s8}/**
   * A temp matrix
   * @readonly
   */static get TEMP_MATRIX(){return new s8}}s8.prototype.toString=function(){return`[@pixi/math:Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`};const s7=[1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1,0,1],s9=[0,1,1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1],nt=[0,-1,-1,-1,0,1,1,1,0,1,1,1,0,-1,-1,-1],ne=[1,1,0,-1,-1,-1,0,1,-1,-1,0,1,1,1,0,-1],nr=[],ni=[],ns=Math.sign;!function(){for(let t=0;t<16;t++){let e=[];nr.push(e);for(let r=0;r<16;r++){let i=ns(s7[t]*s7[r]+nt[t]*s9[r]),s=ns(s9[t]*s7[r]+ne[t]*s9[r]),n=ns(s7[t]*nt[r]+nt[t]*ne[r]),a=ns(s9[t]*nt[r]+ne[t]*ne[r]);for(let t=0;t<16;t++)if(s7[t]===i&&s9[t]===s&&nt[t]===n&&ne[t]===a){e.push(t);break}}}for(let t=0;t<16;t++){let e=new s8;e.set(s7[t],s9[t],nt[t],ne[t],0,0),ni.push(e)}}();const nn={/**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 0°       | East      |
   * @readonly
   */E:0,/**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 45°↻     | Southeast |
   * @readonly
   */SE:1,/**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 90°↻     | South     |
   * @readonly
   */S:2,/**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 135°↻    | Southwest |
   * @readonly
   */SW:3,/**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 180°     | West      |
   * @readonly
   */W:4,/**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -135°/225°↻ | Northwest    |
   * @readonly
   */NW:5,/**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -90°/270°↻  | North        |
   * @readonly
   */N:6,/**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -45°/315°↻  | Northeast    |
   * @readonly
   */NE:7,/**
   * Reflection about Y-axis.
   * @readonly
   */MIRROR_VERTICAL:8,/**
   * Reflection about the main diagonal.
   * @readonly
   */MAIN_DIAGONAL:10,/**
   * Reflection about X-axis.
   * @readonly
   */MIRROR_HORIZONTAL:12,/**
   * Reflection about reverse diagonal.
   * @readonly
   */REVERSE_DIAGONAL:14,/**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The X-component of the U-axis
   *    after rotating the axes.
   */uX:t=>s7[t],/**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The Y-component of the U-axis
   *    after rotating the axes.
   */uY:t=>s9[t],/**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The X-component of the V-axis
   *    after rotating the axes.
   */vX:t=>nt[t],/**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The Y-component of the V-axis
   *    after rotating the axes.
   */vY:t=>ne[t],/**
   * @param {PIXI.GD8Symmetry} rotation - symmetry whose opposite
   *   is needed. Only rotations have opposite symmetries while
   *   reflections don't.
   * @returns {PIXI.GD8Symmetry} The opposite symmetry of `rotation`
   */inv:t=>8&t?15&t:7&-t,/**
   * Composes the two D8 operations.
   *
   * Taking `^` as reflection:
   *
   * |       | E=0 | S=2 | W=4 | N=6 | E^=8 | S^=10 | W^=12 | N^=14 |
   * |-------|-----|-----|-----|-----|------|-------|-------|-------|
   * | E=0   | E   | S   | W   | N   | E^   | S^    | W^    | N^    |
   * | S=2   | S   | W   | N   | E   | S^   | W^    | N^    | E^    |
   * | W=4   | W   | N   | E   | S   | W^   | N^    | E^    | S^    |
   * | N=6   | N   | E   | S   | W   | N^   | E^    | S^    | W^    |
   * | E^=8  | E^  | N^  | W^  | S^  | E    | N     | W     | S     |
   * | S^=10 | S^  | E^  | N^  | W^  | S    | E     | N     | W     |
   * | W^=12 | W^  | S^  | E^  | N^  | W    | S     | E     | N     |
   * | N^=14 | N^  | W^  | S^  | E^  | N    | W     | S     | E     |
   *
   * [This is a Cayley table]{@link https://en.wikipedia.org/wiki/Cayley_table}
   * @param {PIXI.GD8Symmetry} rotationSecond - Second operation, which
   *   is the row in the above cayley table.
   * @param {PIXI.GD8Symmetry} rotationFirst - First operation, which
   *   is the column in the above cayley table.
   * @returns {PIXI.GD8Symmetry} Composed operation
   */add:(t,e)=>nr[t][e],/**
   * Reverse of `add`.
   * @param {PIXI.GD8Symmetry} rotationSecond - Second operation
   * @param {PIXI.GD8Symmetry} rotationFirst - First operation
   * @returns {PIXI.GD8Symmetry} Result
   */sub:(t,e)=>nr[t][nn.inv(e)],/**
   * Adds 180 degrees to rotation, which is a commutative
   * operation.
   * @param {number} rotation - The number to rotate.
   * @returns {number} Rotated number
   */rotate180:t=>4^t,/**
   * Checks if the rotation angle is vertical, i.e. south
   * or north. It doesn't work for reflections.
   * @param {PIXI.GD8Symmetry} rotation - The number to check.
   * @returns {boolean} Whether or not the direction is vertical
   */isVertical:t=>(3&t)==2,// rotation % 4 === 2
/**
   * Approximates the vector `V(dx,dy)` into one of the
   * eight directions provided by `groupD8`.
   * @param {number} dx - X-component of the vector
   * @param {number} dy - Y-component of the vector
   * @returns {PIXI.GD8Symmetry} Approximation of the vector into
   *  one of the eight symmetries.
   */byDirection:(t,e)=>2*Math.abs(t)<=Math.abs(e)?e>=0?nn.S:nn.N:2*Math.abs(e)<=Math.abs(t)?t>0?nn.E:nn.W:e>0?t>0?nn.SE:nn.SW:t>0?nn.NE:nn.NW,/**
   * Helps sprite to compensate texture packer rotation.
   * @param {PIXI.Matrix} matrix - sprite world matrix
   * @param {PIXI.GD8Symmetry} rotation - The rotation factor to use.
   * @param {number} tx - sprite anchoring
   * @param {number} ty - sprite anchoring
   */matrixAppendRotationInv:(t,e,r=0,i=0)=>{let s=ni[nn.inv(e)];s.tx=r,s.ty=i,t.append(s)}};class na{/**
   * Creates a new `ObservablePoint`
   * @param cb - callback function triggered when `x` and/or `y` are changed
   * @param scope - owner of callback
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=0] - position of the point on the y axis
   */constructor(t,e,r=0,i=0){this._x=r,this._y=i,this.cb=t,this.scope=e}/**
   * Creates a clone of this point.
   * The callback and scope params can be overridden otherwise they will default
   * to the clone object's values.
   * @override
   * @param cb - The callback function triggered when `x` and/or `y` are changed
   * @param scope - The owner of the callback
   * @returns a copy of this observable point
   */clone(t=this.cb,e=this.scope){return new na(t,e,this._x,this._y)}/**
   * Sets the point to a new `x` and `y` position.
   * If `y` is omitted, both `x` and `y` will be set to `x`.
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=x] - position of the point on the y axis
   * @returns The observable point instance itself
   */set(t=0,e=t){return(this._x!==t||this._y!==e)&&(this._x=t,this._y=e,this.cb.call(this.scope)),this}/**
   * Copies x and y from the given point (`p`)
   * @param p - The point to copy from. Can be any of type that is or extends `IPointData`
   * @returns The observable point instance itself
   */copyFrom(t){return(this._x!==t.x||this._y!==t.y)&&(this._x=t.x,this._y=t.y,this.cb.call(this.scope)),this}/**
   * Copies this point's x and y into that of the given point (`p`)
   * @param p - The point to copy to. Can be any of type that is or extends `IPointData`
   * @returns The point (`p`) with values updated
   */copyTo(t){return t.set(this._x,this._y),t}/**
   * Accepts another point (`p`) and returns `true` if the given point is equal to this point
   * @param p - The point to check
   * @returns Returns `true` if both `x` and `y` are equal
   */equals(t){return t.x===this._x&&t.y===this._y}/** Position of the observable point on the x axis. */get x(){return this._x}set x(t){this._x!==t&&(this._x=t,this.cb.call(this.scope))}/** Position of the observable point on the y axis. */get y(){return this._y}set y(t){this._y!==t&&(this._y=t,this.cb.call(this.scope))}}na.prototype.toString=function(){return`[@pixi/math:ObservablePoint x=${this.x} y=${this.y} scope=${this.scope}]`};const no=class{constructor(){this.worldTransform=new s8,this.localTransform=new s8,this.position=new na(this.onChange,this,0,0),this.scale=new na(this.onChange,this,1,1),this.pivot=new na(this.onChange,this,0,0),this.skew=new na(this.updateSkew,this,0,0),this._rotation=0,this._cx=1,this._sx=0,this._cy=0,this._sy=1,this._localID=0,this._currentLocalID=0,this._worldID=0,this._parentID=0}/** Called when a value changes. */onChange(){this._localID++}/** Called when the skew or the rotation changes. */updateSkew(){this._cx=Math.cos(this._rotation+this.skew.y),this._sx=Math.sin(this._rotation+this.skew.y),this._cy=-Math.sin(this._rotation-this.skew.x),this._sy=Math.cos(this._rotation-this.skew.x),this._localID++}/** Updates the local transformation matrix. */updateLocalTransform(){let t=this.localTransform;this._localID!==this._currentLocalID&&(t.a=this._cx*this.scale.x,t.b=this._sx*this.scale.x,t.c=this._cy*this.scale.y,t.d=this._sy*this.scale.y,t.tx=this.position.x-(this.pivot.x*t.a+this.pivot.y*t.c),t.ty=this.position.y-(this.pivot.x*t.b+this.pivot.y*t.d),this._currentLocalID=this._localID,this._parentID=-1)}/**
   * Updates the local and the world transformation matrices.
   * @param parentTransform - The parent transform
   */updateTransform(t){let e=this.localTransform;if(this._localID!==this._currentLocalID&&(e.a=this._cx*this.scale.x,e.b=this._sx*this.scale.x,e.c=this._cy*this.scale.y,e.d=this._sy*this.scale.y,e.tx=this.position.x-(this.pivot.x*e.a+this.pivot.y*e.c),e.ty=this.position.y-(this.pivot.x*e.b+this.pivot.y*e.d),this._currentLocalID=this._localID,this._parentID=-1),this._parentID!==t._worldID){let r=t.worldTransform,i=this.worldTransform;i.a=e.a*r.a+e.b*r.c,i.b=e.a*r.b+e.b*r.d,i.c=e.c*r.a+e.d*r.c,i.d=e.c*r.b+e.d*r.d,i.tx=e.tx*r.a+e.ty*r.c+r.tx,i.ty=e.tx*r.b+e.ty*r.d+r.ty,this._parentID=t._worldID,this._worldID++}}/**
   * Decomposes a matrix and sets the transforms properties based on it.
   * @param matrix - The matrix to decompose
   */setFromMatrix(t){t.decompose(this),this._localID++}/** The rotation of the object in radians. */get rotation(){return this._rotation}set rotation(t){this._rotation!==t&&(this._rotation=t,this.updateSkew())}};no.IDENTITY=new no,no.prototype.toString=function(){return`[@pixi/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`};var nh=`varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor *= texture2D(uSampler, vTextureCoord);
}`,nl=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void){
   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
   vTextureCoord = aTextureCoord;
}
`;function nu(t,e,r){let i=t.createShader(e);return t.shaderSource(i,r),t.compileShader(i),i}function nd(t){let e=Array(t);for(let t=0;t<e.length;t++)e[t]=!1;return e}function nc(t,e){switch(t){case"float":case"int":case"uint":case"sampler2D":case"sampler2DArray":return 0;case"vec2":return new Float32Array(2*e);case"vec3":return new Float32Array(3*e);case"vec4":return new Float32Array(4*e);case"ivec2":return new Int32Array(2*e);case"ivec3":return new Int32Array(3*e);case"ivec4":return new Int32Array(4*e);case"uvec2":return new Uint32Array(2*e);case"uvec3":return new Uint32Array(3*e);case"uvec4":return new Uint32Array(4*e);case"bool":return!1;case"bvec2":return nd(2*e);case"bvec3":return nd(3*e);case"bvec4":return nd(4*e);case"mat2":return new Float32Array([1,0,0,1]);case"mat3":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}const np=[// a float cache layer
{test:t=>"float"===t.type&&1===t.size&&!t.isArray,code:t=>`
            if(uv["${t}"] !== ud["${t}"].value)
            {
                ud["${t}"].value = uv["${t}"]
                gl.uniform1f(ud["${t}"].location, uv["${t}"])
            }
            `},// handling samplers
{test:(t,e)=>("sampler2D"===t.type||"samplerCube"===t.type||"sampler2DArray"===t.type)&&1===t.size&&!t.isArray&&(null==e||void 0!==e.castToBaseTexture),code:t=>`t = syncData.textureCount++;

            renderer.texture.bind(uv["${t}"], t);

            if(ud["${t}"].value !== t)
            {
                ud["${t}"].value = t;
                gl.uniform1i(ud["${t}"].location, t);
; // eslint-disable-line max-len
            }`},// uploading pixi matrix object to mat3
{test:(t,e)=>"mat3"===t.type&&1===t.size&&!t.isArray&&void 0!==e.a,code:t=>`
            gl.uniformMatrix3fv(ud["${t}"].location, false, uv["${t}"].toArray(true));
            `,codeUbo:t=>`
                var ${t}_matrix = uv.${t}.toArray(true);

                data[offset] = ${t}_matrix[0];
                data[offset+1] = ${t}_matrix[1];
                data[offset+2] = ${t}_matrix[2];
        
                data[offset + 4] = ${t}_matrix[3];
                data[offset + 5] = ${t}_matrix[4];
                data[offset + 6] = ${t}_matrix[5];
        
                data[offset + 8] = ${t}_matrix[6];
                data[offset + 9] = ${t}_matrix[7];
                data[offset + 10] = ${t}_matrix[8];
            `},// uploading a pixi point as a vec2 with caching layer
{test:(t,e)=>"vec2"===t.type&&1===t.size&&!t.isArray&&void 0!==e.x,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v.x || cv[1] !== v.y)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    gl.uniform2f(ud["${t}"].location, v.x, v.y);
                }`,codeUbo:t=>`
                v = uv.${t};

                data[offset] = v.x;
                data[offset+1] = v.y;
            `},// caching layer for a vec2
{test:t=>"vec2"===t.type&&1===t.size&&!t.isArray,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v[0] || cv[1] !== v[1])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    gl.uniform2f(ud["${t}"].location, v[0], v[1]);
                }
            `},// upload a pixi rectangle as a vec4 with caching layer
{test:(t,e)=>"vec4"===t.type&&1===t.size&&!t.isArray&&void 0!==e.width,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    cv[2] = v.width;
                    cv[3] = v.height;
                    gl.uniform4f(ud["${t}"].location, v.x, v.y, v.width, v.height)
                }`,codeUbo:t=>`
                    v = uv.${t};

                    data[offset] = v.x;
                    data[offset+1] = v.y;
                    data[offset+2] = v.width;
                    data[offset+3] = v.height;
                `},// upload a pixi color as vec4 with caching layer
{test:(t,e)=>"vec4"===t.type&&1===t.size&&!t.isArray&&void 0!==e.red,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
                    cv[3] = v.alpha;
                    gl.uniform4f(ud["${t}"].location, v.red, v.green, v.blue, v.alpha)
                }`,codeUbo:t=>`
                    v = uv.${t};

                    data[offset] = v.red;
                    data[offset+1] = v.green;
                    data[offset+2] = v.blue;
                    data[offset+3] = v.alpha;
                `},// upload a pixi color as a vec3 with caching layer
{test:(t,e)=>"vec3"===t.type&&1===t.size&&!t.isArray&&void 0!==e.red,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.a)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
    
                    gl.uniform3f(ud["${t}"].location, v.red, v.green, v.blue)
                }`,codeUbo:t=>`
                    v = uv.${t};

                    data[offset] = v.red;
                    data[offset+1] = v.green;
                    data[offset+2] = v.blue;
                `},// a caching layer for vec4 uploading
{test:t=>"vec4"===t.type&&1===t.size&&!t.isArray,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    cv[2] = v[2];
                    cv[3] = v[3];

                    gl.uniform4f(ud["${t}"].location, v[0], v[1], v[2], v[3])
                }`}],nf={float:`
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1f(location, v);
    }`,vec2:`
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2f(location, v[0], v[1])
    }`,vec3:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3f(location, v[0], v[1], v[2])
    }`,vec4:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4f(location, v[0], v[1], v[2], v[3]);
    }`,int:`
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,ivec2:`
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,ivec3:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,ivec4:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,uint:`
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1ui(location, v);
    }`,uvec2:`
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2ui(location, v[0], v[1]);
    }`,uvec3:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3ui(location, v[0], v[1], v[2]);
    }`,uvec4:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4ui(location, v[0], v[1], v[2], v[3]);
    }`,bool:`
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1i(location, v);
    }`,bvec2:`
    if (cv[0] != v[0] || cv[1] != v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,bvec3:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,bvec4:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,mat2:"gl.uniformMatrix2fv(location, false, v)",mat3:"gl.uniformMatrix3fv(location, false, v)",mat4:"gl.uniformMatrix4fv(location, false, v)",sampler2D:`
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,samplerCube:`
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,sampler2DArray:`
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`},nm={float:"gl.uniform1fv(location, v)",vec2:"gl.uniform2fv(location, v)",vec3:"gl.uniform3fv(location, v)",vec4:"gl.uniform4fv(location, v)",mat4:"gl.uniformMatrix4fv(location, false, v)",mat3:"gl.uniformMatrix3fv(location, false, v)",mat2:"gl.uniformMatrix2fv(location, false, v)",int:"gl.uniform1iv(location, v)",ivec2:"gl.uniform2iv(location, v)",ivec3:"gl.uniform3iv(location, v)",ivec4:"gl.uniform4iv(location, v)",uint:"gl.uniform1uiv(location, v)",uvec2:"gl.uniform2uiv(location, v)",uvec3:"gl.uniform3uiv(location, v)",uvec4:"gl.uniform4uiv(location, v)",bool:"gl.uniform1iv(location, v)",bvec2:"gl.uniform2iv(location, v)",bvec3:"gl.uniform3iv(location, v)",bvec4:"gl.uniform4iv(location, v)",sampler2D:"gl.uniform1iv(location, v)",samplerCube:"gl.uniform1iv(location, v)",sampler2DArray:"gl.uniform1iv(location, v)"},ng={};let n_=ng;function ny(t,e){let r=t.getShaderSource(e).split(`
`).map((t,e)=>`${e}: ${t}`),i=t.getShaderInfoLog(e),s=i.split(`
`),n={},a=s.map(t=>parseFloat(t.replace(/^ERROR\: 0\:([\d]+)\:.*$/,"$1"))).filter(t=>!!t&&!n[t]&&(n[t]=!0,!0)),o=[""];a.forEach(t=>{r[t-1]=`%c${r[t-1]}%c`,o.push("background: #FF0000; color:#FFFFFF; font-size: 10px","font-size: 10px")});let h=r.join(`
`);o[0]=h,console.error(i),console.groupCollapsed("click to view full shader code"),console.warn(...o),console.groupEnd()}const nv={float:1,vec2:2,vec3:3,vec4:4,int:1,ivec2:2,ivec3:3,ivec4:4,uint:1,uvec2:2,uvec3:3,uvec4:4,bool:1,bvec2:2,bvec3:3,bvec4:4,mat2:4,mat3:9,mat4:16,sampler2D:1};let nx=null;const nb={FLOAT:"float",FLOAT_VEC2:"vec2",FLOAT_VEC3:"vec3",FLOAT_VEC4:"vec4",INT:"int",INT_VEC2:"ivec2",INT_VEC3:"ivec3",INT_VEC4:"ivec4",UNSIGNED_INT:"uint",UNSIGNED_INT_VEC2:"uvec2",UNSIGNED_INT_VEC3:"uvec3",UNSIGNED_INT_VEC4:"uvec4",BOOL:"bool",BOOL_VEC2:"bvec2",BOOL_VEC3:"bvec3",BOOL_VEC4:"bvec4",FLOAT_MAT2:"mat2",FLOAT_MAT3:"mat3",FLOAT_MAT4:"mat4",SAMPLER_2D:"sampler2D",INT_SAMPLER_2D:"sampler2D",UNSIGNED_INT_SAMPLER_2D:"sampler2D",SAMPLER_CUBE:"samplerCube",INT_SAMPLER_CUBE:"samplerCube",UNSIGNED_INT_SAMPLER_CUBE:"samplerCube",SAMPLER_2D_ARRAY:"sampler2DArray",INT_SAMPLER_2D_ARRAY:"sampler2DArray",UNSIGNED_INT_SAMPLER_2D_ARRAY:"sampler2DArray"};function nE(t,e){if(!nx){let e=Object.keys(nb);nx={};for(let r=0;r<e.length;++r){let i=e[r];nx[t[i]]=nb[i]}}return nx[e]}function nT(t,e,r){if("precision"!==t.substring(0,9)){let i=e;return e===ts.HIGH&&r!==ts.HIGH&&(i=ts.MEDIUM),`precision ${i} float;
${t}`}return r!==ts.HIGH&&"precision highp"===t.substring(0,15)?t.replace("precision highp","precision mediump"):t}let nA=0;const nS={},nw=class t{/**
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param name - Name for shader
   * @param extra - Extra data for shader
   */constructor(e,i,s="pixi-shader",n={}){this.extra={},this.id=nA++,this.vertexSrc=e||t.defaultVertexSrc,this.fragmentSrc=i||t.defaultFragmentSrc,this.vertexSrc=this.vertexSrc.trim(),this.fragmentSrc=this.fragmentSrc.trim(),this.extra=n,"#version"!==this.vertexSrc.substring(0,8)&&(nS[s=s.replace(/\s+/g,"-")]?(nS[s]++,s+=`-${nS[s]}`):nS[s]=1,this.vertexSrc=`#define SHADER_NAME ${s}
${this.vertexSrc}`,this.fragmentSrc=`#define SHADER_NAME ${s}
${this.fragmentSrc}`,this.vertexSrc=nT(this.vertexSrc,t.defaultVertexPrecision,ts.HIGH),this.fragmentSrc=nT(this.fragmentSrc,t.defaultFragmentPrecision,function(){if(!r){r=ts.MEDIUM;let t=function(){if(n_===ng||n_?.isContextLost()){let t;let e=tl.ADAPTER.createCanvas();tl.PREFER_ENV>=X.WEBGL2&&(t=e.getContext("webgl2",{})),t||((t=e.getContext("webgl",{})||e.getContext("experimental-webgl",{}))?t.getExtension("WEBGL_draw_buffers"):t=null),n_=t}return n_}();t&&t.getShaderPrecisionFormat&&(r=t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision?ts.HIGH:ts.MEDIUM)}return r}())),this.glPrograms={},this.syncUniforms=null}/**
   * The default vertex shader source.
   * @readonly
   */static get defaultVertexSrc(){return nl}/**
   * The default fragment shader source.
   * @readonly
   */static get defaultFragmentSrc(){return nh}/**
   * A short hand function to create a program based of a vertex and fragment shader.
   *
   * This method will also check to see if there is a cached program.
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param name - Name for shader
   * @returns A shiny new PixiJS shader program!
   */static from(e,r,i){let s=e+r,n=sc[s];return n||(sc[s]=n=new t(e,r,i)),n}};nw.defaultVertexPrecision=ts.HIGH,/**
* Default specify float precision in fragment shader.
* iOS is best set at highp due to https://github.com/pixijs/pixijs/issues/3742
* @static
* @type {PIXI.PRECISION}
* @default PIXI.PRECISION.MEDIUM
*/nw.defaultFragmentPrecision=tI.apple.device?ts.HIGH:ts.MEDIUM;let nR=0;class nI{/**
   * @param {object | Buffer} [uniforms] - Custom uniforms to use to augment the built-in ones. Or a pixi buffer.
   * @param isStatic - Uniforms wont be changed after creation.
   * @param isUbo - If true, will treat this uniform group as a uniform buffer object.
   */constructor(t,e,r){this.group=!0,this.syncUniforms={},this.dirtyId=0,this.id=nR++,this.static=!!e,this.ubo=!!r,t instanceof sj?(this.buffer=t,this.buffer.type=th.UNIFORM_BUFFER,this.autoManage=!1,this.ubo=!0):(this.uniforms=t,this.ubo&&(this.buffer=new sj(new Float32Array(1)),this.buffer.type=th.UNIFORM_BUFFER,this.autoManage=!0))}update(){this.dirtyId++,!this.autoManage&&this.buffer&&this.buffer.update()}add(t,e,r){if(this.ubo)throw Error("[UniformGroup] uniform groups in ubo mode cannot be modified, or have uniform groups nested in them");this.uniforms[t]=new nI(e,r)}static from(t,e,r){return new nI(t,e,r)}/**
   * A short hand function for creating a static UBO UniformGroup.
   * @param uniforms - the ubo item
   * @param _static - should this be updated each time it is used? defaults to true here!
   */static uboFrom(t,e){return new nI(t,e??!0,!0)}}class nC{/**
   * @param program - The program the shader will use.
   * @param uniforms - Custom uniforms to use to augment the built-in ones.
   */constructor(t,e){this.uniformBindCount=0,this.program=t,e?e instanceof nI?this.uniformGroup=e:this.uniformGroup=new nI(e):this.uniformGroup=new nI({}),this.disposeRunner=new sB("disposeShader")}// TODO move to shader system..
checkUniformExists(t,e){if(e.uniforms[t])return!0;for(let r in e.uniforms){let i=e.uniforms[r];if(!0===i.group&&this.checkUniformExists(t,i))return!0}return!1}destroy(){this.uniformGroup=null,this.disposeRunner.emit(this),this.disposeRunner.destroy()}/**
   * Shader uniform values, shortcut for `uniformGroup.uniforms`.
   * @readonly
   */get uniforms(){return this.uniformGroup.uniforms}/**
   * A short hand function to create a shader based of a vertex and fragment shader.
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param uniforms - Custom uniforms to use to augment the built-in ones.
   * @returns A shiny new PixiJS shader!
   */static from(t,e,r){let i=nw.from(t,e);return new nC(i,r)}}class nP{/**
   * @param vertexSrc - Vertex shader
   * @param fragTemplate - Fragment shader template
   */constructor(t,e){if(this.vertexSrc=t,this.fragTemplate=e,this.programCache={},this.defaultGroupCache={},!e.includes("%count%"))throw Error('Fragment template must contain "%count%".');if(!e.includes("%forloop%"))throw Error('Fragment template must contain "%forloop%".')}generateShader(t){if(!this.programCache[t]){let e=new Int32Array(t);for(let r=0;r<t;r++)e[r]=r;this.defaultGroupCache[t]=nI.from({uSamplers:e},!0);let r=this.fragTemplate;r=(r=r.replace(/%count%/gi,`${t}`)).replace(/%forloop%/gi,this.generateSampleSrc(t)),this.programCache[t]=new nw(this.vertexSrc,r)}let e={tint:new Float32Array([1,1,1,1]),translationMatrix:new s8,default:this.defaultGroupCache[t]};return new nC(this.programCache[t],e)}generateSampleSrc(t){let e="";e+=`

`;for(let r=0;r<t;r++)r>0&&(e+=`
else `),r<t-1&&(e+=`if(vTextureId < ${r}.5)`),e+=`
{
	color = texture2D(uSamplers[${r}], vTextureCoord);
}`;return e+`

`}}class nM{constructor(){this.elements=[],this.ids=[],this.count=0}clear(){for(let t=0;t<this.count;t++)this.elements[t]=null;this.count=0}}class nD{/**
   * @param renderer - The renderer this manager works for.
   */constructor(t){this.renderer=t}/** Stub method that should be used to empty the current batch by rendering objects now. */flush(){}/** Generic destruction method that frees all resources. This should be called by subclasses. */destroy(){this.renderer=null}/**
   * Stub method that initializes any state required before
   * rendering starts. It is different from the `prerender`
   * signal, which occurs every frame, in that it is called
   * whenever an object requests _this_ renderer specifically.
   */start(){}/** Stops the renderer. It should free up any state and become dormant. */stop(){this.flush()}/**
   * Keeps the object to render. It doesn't have to be
   * rendered immediately.
   * @param {PIXI.DisplayObject} _object - The object to render.
   */render(t){}}var nO=`varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;
uniform sampler2D uSamplers[%count%];

void main(void){
    vec4 color;
    %forloop%
    gl_FragColor = color * vColor;
}
`,nB=`precision highp float;
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;
attribute float aTextureId;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform vec4 tint;

varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;

void main(void){
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vTextureId = aTextureId;
    vColor = aColor * tint;
}
`;const nN=class t extends nD{/**
   * This will hook onto the renderer's `contextChange`
   * and `prerender` signals.
   * @param {PIXI.Renderer} renderer - The renderer this works for.
   */constructor(e){super(e),this.setShaderGenerator(),this.geometryClass=sq,this.vertexSize=6,this.state=sM.for2d(),this.size=4*t.defaultBatchSize,this._vertexCount=0,this._indexCount=0,this._bufferedElements=[],this._bufferedTextures=[],this._bufferSize=0,this._shader=null,this._packedGeometries=[],this._packedGeometryPoolSize=2,this._flushId=0,this._aBuffers={},this._iBuffers={},this.maxTextures=1,this.renderer.on("prerender",this.onPrerender,this),e.runners.contextChange.add(this),this._dcIndex=0,this._aIndex=0,this._iIndex=0,this._attributeBuffer=null,this._indexBuffer=null,this._tempBoundTextures=[]}/**
   * The maximum textures that this device supports.
   * @static
   * @default 32
   */static get defaultMaxTextures(){return this._defaultMaxTextures=this._defaultMaxTextures??function(t){let e=!0,r=tl.ADAPTER.getNavigator();if(tI.tablet||tI.phone){if(tI.apple.device){let t=r.userAgent.match(/OS (\d+)_(\d+)?/);t&&11>parseInt(t[1],10)&&(e=!1)}if(tI.android.device){let t=r.userAgent.match(/Android\s([0-9.]*)/);t&&7>parseInt(t[1],10)&&(e=!1)}}return e?32:4}(0),this._defaultMaxTextures}static set defaultMaxTextures(t){this._defaultMaxTextures=t}/**
   * Can we upload the same buffer in a single frame?
   * @static
   */static get canUploadSameBuffer(){return this._canUploadSameBuffer=this._canUploadSameBuffer??!tI.apple.device,this._canUploadSameBuffer}static set canUploadSameBuffer(t){this._canUploadSameBuffer=t}/**
   * @see PIXI.BatchRenderer#maxTextures
   * @deprecated since 7.1.0
   * @readonly
   */get MAX_TEXTURES(){return ig("7.1.0","BatchRenderer#MAX_TEXTURES renamed to BatchRenderer#maxTextures"),this.maxTextures}/**
   * The default vertex shader source
   * @readonly
   */static get defaultVertexSrc(){return nB}/**
   * The default fragment shader source
   * @readonly
   */static get defaultFragmentTemplate(){return nO}/**
   * Set the shader generator.
   * @param {object} [options]
   * @param {string} [options.vertex=PIXI.BatchRenderer.defaultVertexSrc] - Vertex shader source
   * @param {string} [options.fragment=PIXI.BatchRenderer.defaultFragmentTemplate] - Fragment shader template
   */setShaderGenerator({vertex:e=t.defaultVertexSrc,fragment:r=t.defaultFragmentTemplate}={}){this.shaderGenerator=new nP(e,r)}/**
   * Handles the `contextChange` signal.
   *
   * It calculates `this.maxTextures` and allocating the packed-geometry object pool.
   */contextChange(){let e=this.renderer.gl;tl.PREFER_ENV===X.WEBGL_LEGACY?this.maxTextures=1:(this.maxTextures=Math.min(e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),t.defaultMaxTextures),this.maxTextures=function(t,e){if(0===t)throw Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");let r=e.createShader(e.FRAGMENT_SHADER);for(;;){let i=sP.replace(/%forloop%/gi,function(t){let e="";for(let r=0;r<t;++r)r>0&&(e+=`
else `),r<t-1&&(e+=`if(test == ${r}.0){}`);return e}(t));if(e.shaderSource(r,i),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS))break;t=t/2|0}return t}(this.maxTextures,e)),this._shader=this.shaderGenerator.generateShader(this.maxTextures);for(let t=0;t<this._packedGeometryPoolSize;t++)this._packedGeometries[t]=new this.geometryClass;this.initFlushBuffers()}/** Makes sure that static and dynamic flush pooled objects have correct dimensions. */initFlushBuffers(){let{_drawCallPool:e,_textureArrayPool:r}=t,i=this.size/4,s=Math.floor(i/this.maxTextures)+1;for(;e.length<i;)e.push(new sG);for(;r.length<s;)r.push(new nM);for(let t=0;t<this.maxTextures;t++)this._tempBoundTextures[t]=null}/** Handles the `prerender` signal. It ensures that flushes start from the first geometry object again. */onPrerender(){this._flushId=0}/**
   * Buffers the "batchable" object. It need not be rendered immediately.
   * @param {PIXI.DisplayObject} element - the element to render when
   *    using this renderer
   */render(t){t._texture.valid&&(this._vertexCount+t.vertexData.length/2>this.size&&this.flush(),this._vertexCount+=t.vertexData.length/2,this._indexCount+=t.indices.length,this._bufferedTextures[this._bufferSize]=t._texture.baseTexture,this._bufferedElements[this._bufferSize++]=t)}buildTexturesAndDrawCalls(){let{_bufferedTextures:e,maxTextures:r}=this,i=t._textureArrayPool,s=this.renderer.batch,n=this._tempBoundTextures,a=this.renderer.textureGC.count,o=++sk._globalBatch,h=0,l=i[0],u=0;s.copyBoundTextures(n,r);for(let t=0;t<this._bufferSize;++t){let d=e[t];e[t]=null,d._batchEnabled!==o&&(l.count>=r&&(s.boundArray(l,n,o,r),this.buildDrawCalls(l,u,t),u=t,l=i[++h],++o),d._batchEnabled=o,d.touched=a,l.elements[l.count++]=d)}l.count>0&&(s.boundArray(l,n,o,r),this.buildDrawCalls(l,u,this._bufferSize),++h,++o);for(let t=0;t<n.length;t++)n[t]=null;sk._globalBatch=o}/**
   * Populating drawcalls for rendering
   * @param texArray
   * @param start
   * @param finish
   */buildDrawCalls(e,r,i){let{_bufferedElements:s,_attributeBuffer:n,_indexBuffer:a,vertexSize:o}=this,h=t._drawCallPool,l=this._dcIndex,u=this._aIndex,d=this._iIndex,c=h[l];c.start=this._iIndex,c.texArray=e;for(let t=r;t<i;++t){let i=s[t],p=i._texture.baseTexture,f=i3[p.alphaMode?1:0][i.blendMode];s[t]=null,r<t&&c.blend!==f&&(c.size=d-c.start,r=t,(c=h[++l]).texArray=e,c.start=d),this.packInterleavedGeometry(i,n,a,u,d),u+=i.vertexData.length/2*o,d+=i.indices.length,c.blend=f}r<i&&(c.size=d-c.start,++l),this._dcIndex=l,this._aIndex=u,this._iIndex=d}/**
   * Bind textures for current rendering
   * @param texArray
   */bindAndClearTexArray(t){let e=this.renderer.texture;for(let r=0;r<t.count;r++)e.bind(t.elements[r],t.ids[r]),t.elements[r]=null;t.count=0}updateGeometry(){let{_packedGeometries:e,_attributeBuffer:r,_indexBuffer:i}=this;t.canUploadSameBuffer?(e[this._flushId]._buffer.update(r.rawBinaryData),e[this._flushId]._indexBuffer.update(i),this.renderer.geometry.updateBuffers()):(this._packedGeometryPoolSize<=this._flushId&&(this._packedGeometryPoolSize++,e[this._flushId]=new this.geometryClass),e[this._flushId]._buffer.update(r.rawBinaryData),e[this._flushId]._indexBuffer.update(i),this.renderer.geometry.bind(e[this._flushId]),this.renderer.geometry.updateBuffers(),this._flushId++)}drawBatches(){let e=this._dcIndex,{gl:r,state:i}=this.renderer,s=t._drawCallPool,n=null;for(let t=0;t<e;t++){let{texArray:e,type:a,size:o,start:h,blend:l}=s[t];n!==e&&(n=e,this.bindAndClearTexArray(e)),this.state.blendMode=l,i.set(this.state),r.drawElements(a,o,r.UNSIGNED_SHORT,2*h)}}/** Renders the content _now_ and empties the current batch. */flush(){0!==this._vertexCount&&(this._attributeBuffer=this.getAttributeBuffer(this._vertexCount),this._indexBuffer=this.getIndexBuffer(this._indexCount),this._aIndex=0,this._iIndex=0,this._dcIndex=0,this.buildTexturesAndDrawCalls(),this.updateGeometry(),this.drawBatches(),this._bufferSize=0,this._vertexCount=0,this._indexCount=0)}/** Starts a new sprite batch. */start(){this.renderer.state.set(this.state),this.renderer.texture.ensureSamplerType(this.maxTextures),this.renderer.shader.bind(this._shader),t.canUploadSameBuffer&&this.renderer.geometry.bind(this._packedGeometries[this._flushId])}/** Stops and flushes the current batch. */stop(){this.flush()}/** Destroys this `BatchRenderer`. It cannot be used again. */destroy(){for(let t=0;t<this._packedGeometryPoolSize;t++)this._packedGeometries[t]&&this._packedGeometries[t].destroy();this.renderer.off("prerender",this.onPrerender,this),this._aBuffers=null,this._iBuffers=null,this._packedGeometries=null,this._attributeBuffer=null,this._indexBuffer=null,this._shader&&(this._shader.destroy(),this._shader=null),super.destroy()}/**
   * Fetches an attribute buffer from `this._aBuffers` that can hold atleast `size` floats.
   * @param size - minimum capacity required
   * @returns - buffer than can hold atleast `size` floats
   */getAttributeBuffer(t){let e=si(Math.ceil(t/8)),r=sn(e),i=8*e;this._aBuffers.length<=r&&(this._iBuffers.length=r+1);let s=this._aBuffers[i];return s||(this._aBuffers[i]=s=new sC(i*this.vertexSize*4)),s}/**
   * Fetches an index buffer from `this._iBuffers` that can
   * have at least `size` capacity.
   * @param size - minimum required capacity
   * @returns - buffer that can fit `size` indices.
   */getIndexBuffer(t){let e=si(Math.ceil(t/12)),r=sn(e),i=12*e;this._iBuffers.length<=r&&(this._iBuffers.length=r+1);let s=this._iBuffers[r];return s||(this._iBuffers[r]=s=new Uint16Array(i)),s}/**
   * Takes the four batching parameters of `element`, interleaves
   * and pushes them into the batching attribute/index buffers given.
   *
   * It uses these properties: `vertexData` `uvs`, `textureId` and
   * `indicies`. It also uses the "tint" of the base-texture, if
   * present.
   * @param {PIXI.DisplayObject} element - element being rendered
   * @param attributeBuffer - attribute buffer.
   * @param indexBuffer - index buffer
   * @param aIndex - number of floats already in the attribute buffer
   * @param iIndex - number of indices already in `indexBuffer`
   */packInterleavedGeometry(t,e,r,i,s){let{uint32View:n,float32View:a}=e,o=i/this.vertexSize,h=t.uvs,l=t.indices,u=t.vertexData,d=t._texture.baseTexture._batchLocation,c=Math.min(t.worldAlpha,1),p=iQ.shared.setValue(t._tintRGB).toPremultiplied(c,t._texture.baseTexture.alphaMode>0);for(let t=0;t<u.length;t+=2)a[i++]=u[t],a[i++]=u[t+1],a[i++]=h[t],a[i++]=h[t+1],n[i++]=p,a[i++]=d;for(let t=0;t<l.length;t++)r[s++]=o+l[t]}};nN.defaultBatchSize=4096,/** @ignore */nN.extension={name:"batch",type:sS.RendererPlugin},/**
* Pool of `BatchDrawCall` objects that `flush` used
* to create "batches" of the objects being rendered.
*
* These are never re-allocated again.
* Shared between all batch renderers because it can be only one "flush" working at the moment.
* @member {PIXI.BatchDrawCall[]}
*/nN._drawCallPool=[],/**
* Pool of `BatchDrawCall` objects that `flush` used
* to create "batches" of the objects being rendered.
*
* These are never re-allocated again.
* Shared between all batch renderers because it can be only one "flush" working at the moment.
* @member {PIXI.BatchTextureArray[]}
*/nN._textureArrayPool=[],sI.add(nN);var nF=`varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor = texture2D(uSampler, vTextureCoord);
}
`,nL=`attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`;const nU=class t extends nC{/**
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param uniforms - Custom uniforms to use to augment the built-in ones.
   */constructor(e,r,i){let s=nw.from(e||t.defaultVertexSrc,r||t.defaultFragmentSrc);super(s,i),this.padding=0,this.resolution=t.defaultResolution,this.multisample=t.defaultMultisample,this.enabled=!0,this.autoFit=!0,this.state=new sM}/**
   * Applies the filter
   * @param {PIXI.FilterSystem} filterManager - The renderer to retrieve the filter from
   * @param {PIXI.RenderTexture} input - The input render target.
   * @param {PIXI.RenderTexture} output - The target to output to.
   * @param {PIXI.CLEAR_MODES} [clearMode] - Should the output be cleared before rendering to it.
   * @param {object} [_currentState] - It's current state of filter.
   *        There are some useful properties in the currentState :
   *        target, filters, sourceFrame, destinationFrame, renderTarget, resolution
   */apply(t,e,r,i,s){t.applyFilter(this,e,r,i)}/**
   * Sets the blend mode of the filter.
   * @default PIXI.BLEND_MODES.NORMAL
   */get blendMode(){return this.state.blendMode}set blendMode(t){this.state.blendMode=t}/**
   * The resolution of the filter. Setting this to be lower will lower the quality but
   * increase the performance of the filter.
   * If set to `null` or `0`, the resolution of the current render target is used.
   * @default PIXI.Filter.defaultResolution
   */get resolution(){return this._resolution}set resolution(t){this._resolution=t}/**
   * The default vertex shader source
   * @readonly
   */static get defaultVertexSrc(){return nL}/**
   * The default fragment shader source
   * @readonly
   */static get defaultFragmentSrc(){return nF}};nU.defaultResolution=1,/**
* Default filter samples for any filter.
* @static
* @type {PIXI.MSAA_QUALITY|null}
* @default PIXI.MSAA_QUALITY.NONE
*/nU.defaultMultisample=to.NONE;let nk=nU;class nG{constructor(){this.clearBeforeRender=!0,this._backgroundColor=new iQ(0),this.alpha=1}/**
   * initiates the background system
   * @param {PIXI.IRendererOptions} options - the options for the background colors
   */init(t){this.clearBeforeRender=t.clearBeforeRender;let{backgroundColor:e,background:r,backgroundAlpha:i}=t,s=r??e;void 0!==s&&(this.color=s),this.alpha=i}/**
   * The background color to fill if not transparent.
   * @member {PIXI.ColorSource}
   */get color(){return this._backgroundColor.value}set color(t){this._backgroundColor.setValue(t)}/**
   * The background color alpha. Setting this to 0 will make the canvas transparent.
   * @member {number}
   */get alpha(){return this._backgroundColor.alpha}set alpha(t){this._backgroundColor.setAlpha(t)}/** The background color object. */get backgroundColor(){return this._backgroundColor}destroy(){}}nG.defaultOptions={/**
   * {@link PIXI.IRendererOptions.backgroundAlpha}
   * @default 1
   * @memberof PIXI.settings.RENDER_OPTIONS
   */backgroundAlpha:1,/**
   * {@link PIXI.IRendererOptions.backgroundColor}
   * @default 0x000000
   * @memberof PIXI.settings.RENDER_OPTIONS
   */backgroundColor:0,/**
   * {@link PIXI.IRendererOptions.clearBeforeRender}
   * @default true
   * @memberof PIXI.settings.RENDER_OPTIONS
   */clearBeforeRender:!0},/** @ignore */nG.extension={type:[sS.RendererSystem,sS.CanvasRendererSystem],name:"background"},sI.add(nG);class nH{/**
   * @param renderer - The renderer this System works for.
   */constructor(t){this.renderer=t,this.emptyRenderer=new nD(t),this.currentRenderer=this.emptyRenderer}/**
   * Changes the current renderer to the one given in parameter
   * @param objectRenderer - The object renderer to use.
   */setObjectRenderer(t){this.currentRenderer!==t&&(this.currentRenderer.stop(),this.currentRenderer=t,this.currentRenderer.start())}/**
   * This should be called if you wish to do some custom rendering
   * It will basically render anything that may be batched up such as sprites
   */flush(){this.setObjectRenderer(this.emptyRenderer)}/** Reset the system to an empty renderer */reset(){this.setObjectRenderer(this.emptyRenderer)}/**
   * Handy function for batch renderers: copies bound textures in first maxTextures locations to array
   * sets actual _batchLocation for them
   * @param arr - arr copy destination
   * @param maxTextures - number of copied elements
   */copyBoundTextures(t,e){let{boundTextures:r}=this.renderer.texture;for(let i=e-1;i>=0;--i)t[i]=r[i]||null,t[i]&&(t[i]._batchLocation=i)}/**
   * Assigns batch locations to textures in array based on boundTextures state.
   * All textures in texArray should have `_batchEnabled = _batchId`,
   * and their count should be less than `maxTextures`.
   * @param texArray - textures to bound
   * @param boundTextures - current state of bound textures
   * @param batchId - marker for _batchEnabled param of textures in texArray
   * @param maxTextures - number of texture locations to manipulate
   */boundArray(t,e,r,i){let{elements:s,ids:n,count:a}=t,o=0;for(let t=0;t<a;t++){let a=s[t],h=a._batchLocation;if(h>=0&&h<i&&e[h]===a){n[t]=h;continue}for(;o<i;){let i=e[o];if(i&&i._batchEnabled===r&&i._batchLocation===o){o++;continue}n[t]=o,a._batchLocation=o,e[o]=a;break}}}/**
   * @ignore
   */destroy(){this.renderer=null}}nH.extension={type:sS.RendererSystem,name:"batch"},sI.add(nH);let nj=0;class nX{/** @param renderer - The renderer this System works for. */constructor(t){this.renderer=t,this.webGLVersion=1,this.extensions={},this.supports={uint32Indices:!1},this.handleContextLost=this.handleContextLost.bind(this),this.handleContextRestored=this.handleContextRestored.bind(this)}/**
   * `true` if the context is lost
   * @readonly
   */get isLost(){return!this.gl||this.gl.isContextLost()}/**
   * Handles the context change event.
   * @param {WebGLRenderingContext} gl - New WebGL context.
   */contextChange(t){this.gl=t,this.renderer.gl=t,this.renderer.CONTEXT_UID=nj++}init(t){if(t.context)this.initFromContext(t.context);else{let e=this.renderer.background.alpha<1,r=t.premultipliedAlpha;this.preserveDrawingBuffer=t.preserveDrawingBuffer,this.useContextAlpha=t.useContextAlpha,this.powerPreference=t.powerPreference,this.initFromOptions({alpha:e,premultipliedAlpha:r,antialias:t.antialias,stencil:!0,preserveDrawingBuffer:t.preserveDrawingBuffer,powerPreference:t.powerPreference})}}/**
   * Initializes the context.
   * @protected
   * @param {WebGLRenderingContext} gl - WebGL context
   */initFromContext(t){this.gl=t,this.validateContext(t),this.renderer.gl=t,this.renderer.CONTEXT_UID=nj++,this.renderer.runners.contextChange.emit(t);let e=this.renderer.view;void 0!==e.addEventListener&&(e.addEventListener("webglcontextlost",this.handleContextLost,!1),e.addEventListener("webglcontextrestored",this.handleContextRestored,!1))}/**
   * Initialize from context options
   * @protected
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
   * @param {object} options - context attributes
   */initFromOptions(t){let e=this.createContext(this.renderer.view,t);this.initFromContext(e)}/**
   * Helper class to create a WebGL Context
   * @param canvas - the canvas element that we will get the context from
   * @param options - An options object that gets passed in to the canvas element containing the
   *    context attributes
   * @see https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement/getContext
   * @returns {WebGLRenderingContext} the WebGL context
   */createContext(t,e){let r;if(tl.PREFER_ENV>=X.WEBGL2&&(r=t.getContext("webgl2",e)),r)this.webGLVersion=2;else if(this.webGLVersion=1,!(r=t.getContext("webgl",e)||t.getContext("experimental-webgl",e)))throw Error("This browser does not support WebGL. Try using the canvas renderer");return this.gl=r,this.getExtensions(),this.gl}/** Auto-populate the {@link PIXI.ContextSystem.extensions extensions}. */getExtensions(){let{gl:t}=this,e={loseContext:t.getExtension("WEBGL_lose_context"),anisotropicFiltering:t.getExtension("EXT_texture_filter_anisotropic"),floatTextureLinear:t.getExtension("OES_texture_float_linear"),s3tc:t.getExtension("WEBGL_compressed_texture_s3tc"),s3tc_sRGB:t.getExtension("WEBGL_compressed_texture_s3tc_srgb"),// eslint-disable-line camelcase
etc:t.getExtension("WEBGL_compressed_texture_etc"),etc1:t.getExtension("WEBGL_compressed_texture_etc1"),pvrtc:t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),atc:t.getExtension("WEBGL_compressed_texture_atc"),astc:t.getExtension("WEBGL_compressed_texture_astc")};1===this.webGLVersion?Object.assign(this.extensions,e,{drawBuffers:t.getExtension("WEBGL_draw_buffers"),depthTexture:t.getExtension("WEBGL_depth_texture"),vertexArrayObject:t.getExtension("OES_vertex_array_object")||t.getExtension("MOZ_OES_vertex_array_object")||t.getExtension("WEBKIT_OES_vertex_array_object"),uint32ElementIndex:t.getExtension("OES_element_index_uint"),// Floats and half-floats
floatTexture:t.getExtension("OES_texture_float"),floatTextureLinear:t.getExtension("OES_texture_float_linear"),textureHalfFloat:t.getExtension("OES_texture_half_float"),textureHalfFloatLinear:t.getExtension("OES_texture_half_float_linear")}):2===this.webGLVersion&&Object.assign(this.extensions,e,{// Floats and half-floats
colorBufferFloat:t.getExtension("EXT_color_buffer_float")})}/**
   * Handles a lost webgl context
   * @param {WebGLContextEvent} event - The context lost event.
   */handleContextLost(t){t.preventDefault(),setTimeout(()=>{this.gl.isContextLost()&&this.extensions.loseContext&&this.extensions.loseContext.restoreContext()},0)}/** Handles a restored webgl context. */handleContextRestored(){this.renderer.runners.contextChange.emit(this.gl)}destroy(){let t=this.renderer.view;this.renderer=null,void 0!==t.removeEventListener&&(t.removeEventListener("webglcontextlost",this.handleContextLost),t.removeEventListener("webglcontextrestored",this.handleContextRestored)),this.gl.useProgram(null),this.extensions.loseContext&&this.extensions.loseContext.loseContext()}/** Handle the post-render runner event. */postrender(){this.renderer.objectRenderer.renderingToScreen&&this.gl.flush()}/**
   * Validate context.
   * @param {WebGLRenderingContext} gl - Render context.
   */validateContext(t){let e=t.getContextAttributes(),r="WebGL2RenderingContext"in globalThis&&t instanceof globalThis.WebGL2RenderingContext;r&&(this.webGLVersion=2),e&&!e.stencil&&console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");let i=r||!!t.getExtension("OES_element_index_uint");this.supports.uint32Indices=i,i||console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly")}}nX.defaultOptions={/**
   * {@link PIXI.IRendererOptions.context}
   * @default null
   * @memberof PIXI.settings.RENDER_OPTIONS
   */context:null,/**
   * {@link PIXI.IRendererOptions.antialias}
   * @default false
   * @memberof PIXI.settings.RENDER_OPTIONS
   */antialias:!1,/**
   * {@link PIXI.IRendererOptions.premultipliedAlpha}
   * @default true
   * @memberof PIXI.settings.RENDER_OPTIONS
   */premultipliedAlpha:!0,/**
   * {@link PIXI.IRendererOptions.preserveDrawingBuffer}
   * @default false
   * @memberof PIXI.settings.RENDER_OPTIONS
   */preserveDrawingBuffer:!1,/**
   * {@link PIXI.IRendererOptions.powerPreference}
   * @default default
   * @memberof PIXI.settings.RENDER_OPTIONS
   */powerPreference:"default"},/** @ignore */nX.extension={type:sS.RendererSystem,name:"context"},sI.add(nX);class nV{/**
   * @param width - Width of the frame buffer
   * @param height - Height of the frame buffer
   */constructor(t,e){if(this.width=Math.round(t),this.height=Math.round(e),!this.width||!this.height)throw Error("Framebuffer width or height is zero");this.stencil=!1,this.depth=!1,this.dirtyId=0,this.dirtyFormat=0,this.dirtySize=0,this.depthTexture=null,this.colorTextures=[],this.glFramebuffers={},this.disposeRunner=new sB("disposeFramebuffer"),this.multisample=to.NONE}/**
   * Reference to the colorTexture.
   * @readonly
   */get colorTexture(){return this.colorTextures[0]}/**
   * Add texture to the colorTexture array.
   * @param index - Index of the array to add the texture to
   * @param texture - Texture to add to the array
   */addColorTexture(t=0,e){return this.colorTextures[t]=e||new sk(null,{scaleMode:Q.NEAREST,resolution:1,mipmap:tt.OFF,width:this.width,height:this.height}),this.dirtyId++,this.dirtyFormat++,this}/**
   * Add a depth texture to the frame buffer.
   * @param texture - Texture to add.
   */addDepthTexture(t){return this.depthTexture=t||new sk(null,{scaleMode:Q.NEAREST,resolution:1,width:this.width,height:this.height,mipmap:tt.OFF,format:Y.DEPTH_COMPONENT,type:K.UNSIGNED_SHORT}),this.dirtyId++,this.dirtyFormat++,this}/** Enable depth on the frame buffer. */enableDepth(){return this.depth=!0,this.dirtyId++,this.dirtyFormat++,this}/** Enable stencil on the frame buffer. */enableStencil(){return this.stencil=!0,this.dirtyId++,this.dirtyFormat++,this}/**
   * Resize the frame buffer
   * @param width - Width of the frame buffer to resize to
   * @param height - Height of the frame buffer to resize to
   */resize(t,e){if(t=Math.round(t),e=Math.round(e),!t||!e)throw Error("Framebuffer width and height must not be zero");if(!(t===this.width&&e===this.height)){this.width=t,this.height=e,this.dirtyId++,this.dirtySize++;for(let r=0;r<this.colorTextures.length;r++){let i=this.colorTextures[r],s=i.resolution;i.setSize(t/s,e/s)}if(this.depthTexture){let r=this.depthTexture.resolution;this.depthTexture.setSize(t/r,e/r)}}}/** Disposes WebGL resources that are connected to this geometry. */dispose(){this.disposeRunner.emit(this,!1)}/** Destroys and removes the depth texture added to this framebuffer. */destroyDepthTexture(){this.depthTexture&&(this.depthTexture.destroy(),this.depthTexture=null,++this.dirtyId,++this.dirtyFormat)}}class nz extends sk{/**
   * @param options
   * @param {number} [options.width=100] - The width of the base render texture.
   * @param {number} [options.height=100] - The height of the base render texture.
   * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.BaseTexture.defaultOptions.scaleMode] - See {@link PIXI.SCALE_MODES}
   *   for possible values.
   * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - The resolution / device pixel ratio
   *   of the texture being generated.
   * @param {PIXI.MSAA_QUALITY} [options.multisample=PIXI.MSAA_QUALITY.NONE] - The number of samples of the frame buffer.
   */constructor(t={}){if("number"==typeof t){let e=arguments[0],r=arguments[1],i=arguments[2],s=arguments[3];t={width:e,height:r,scaleMode:i,resolution:s}}t.width=t.width??100,t.height=t.height??100,t.multisample??(t.multisample=to.NONE),super(null,t),this.mipmap=tt.OFF,this.valid=!0,this._clear=new iQ([0,0,0,0]),this.framebuffer=new nV(this.realWidth,this.realHeight).addColorTexture(0,this),this.framebuffer.multisample=t.multisample,this.maskStack=[],this.filterStack=[{}]}/** Color when clearning the texture. */set clearColor(t){this._clear.setValue(t)}get clearColor(){return this._clear.value}/**
   * Color object when clearning the texture.
   * @readonly
   * @since 7.2.0
   */get clear(){return this._clear}/**
   * Shortcut to `this.framebuffer.multisample`.
   * @default PIXI.MSAA_QUALITY.NONE
   */get multisample(){return this.framebuffer.multisample}set multisample(t){this.framebuffer.multisample=t}/**
   * Resizes the BaseRenderTexture.
   * @param desiredWidth - The desired width to resize to.
   * @param desiredHeight - The desired height to resize to.
   */resize(t,e){this.framebuffer.resize(t*this.resolution,e*this.resolution),this.setRealSize(this.framebuffer.width,this.framebuffer.height)}/**
   * Frees the texture and framebuffer from WebGL memory without destroying this texture object.
   * This means you can still use the texture later which will upload it to GPU
   * memory again.
   * @fires PIXI.BaseTexture#dispose
   */dispose(){this.framebuffer.dispose(),super.dispose()}/** Destroys this texture. */destroy(){super.destroy(),this.framebuffer.destroyDepthTexture(),this.framebuffer=null}}class nW extends sN{/**
   * @param {HTMLImageElement|HTMLVideoElement|ImageBitmap|PIXI.ICanvas} source
   */constructor(t){let e=t.naturalWidth||t.videoWidth||t.width,r=t.naturalHeight||t.videoHeight||t.height;super(e,r),this.source=t,this.noSubImage=!1}/**
   * Set cross origin based detecting the url and the crossorigin
   * @param element - Element to apply crossOrigin
   * @param url - URL to check
   * @param crossorigin - Cross origin value to use
   */static crossOrigin(t,e,r){void 0!==r||e.startsWith("data:")?!1!==r&&(t.crossOrigin="string"==typeof r?r:"anonymous"):t.crossOrigin=sT(e)}/**
   * Upload the texture to the GPU.
   * @param renderer - Upload to the renderer
   * @param baseTexture - Reference to parent texture
   * @param glTexture
   * @param {HTMLImageElement|HTMLVideoElement|ImageBitmap|PIXI.ICanvas} [source] - (optional)
   * @returns - true is success
   */upload(t,e,r,i){let s=t.gl,n=e.realWidth,a=e.realHeight;if(i=i||this.source,"u">typeof HTMLImageElement&&i instanceof HTMLImageElement){if(!i.complete||0===i.naturalWidth)return!1}else if("u">typeof HTMLVideoElement&&i instanceof HTMLVideoElement&&i.readyState<=1)return!1;return s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,e.alphaMode===te.UNPACK),this.noSubImage||e.target!==s.TEXTURE_2D||r.width!==n||r.height!==a?(r.width=n,r.height=a,s.texImage2D(e.target,0,r.internalFormat,e.format,r.type,i)):s.texSubImage2D(s.TEXTURE_2D,0,0,0,e.format,r.type,i),!0}/**
   * Checks if source width/height was changed, resize can cause extra baseTexture update.
   * Triggers one update in any case.
   */update(){if(this.destroyed)return;let t=this.source,e=t.naturalWidth||t.videoWidth||t.width,r=t.naturalHeight||t.videoHeight||t.height;this.resize(e,r),super.update()}/** Destroy this {@link PIXI.BaseImageResource} */dispose(){this.source=null}}class n$ extends nW{/**
   * @param source - image source or URL
   * @param options
   * @param {boolean} [options.autoLoad=true] - start loading process
   * @param {boolean} [options.createBitmap=PIXI.settings.CREATE_IMAGE_BITMAP] - whether its required to create
   *        a bitmap before upload
   * @param {boolean} [options.crossorigin=true] - Load image using cross origin
   * @param {PIXI.ALPHA_MODES} [options.alphaMode=PIXI.ALPHA_MODES.UNPACK] - Premultiply image alpha in bitmap
   */constructor(t,e){if(e=e||{},"string"==typeof t){let r=new Image;nW.crossOrigin(r,t,e.crossorigin),r.src=t,t=r}super(t),!t.complete&&this._width&&this._height&&(this._width=0,this._height=0),this.url=t.src,this._process=null,this.preserveBitmap=!1,this.createBitmap=(e.createBitmap??tl.CREATE_IMAGE_BITMAP)&&!!globalThis.createImageBitmap,this.alphaMode="number"==typeof e.alphaMode?e.alphaMode:null,this.bitmap=null,this._load=null,!1!==e.autoLoad&&this.load()}/**
   * Returns a promise when image will be loaded and processed.
   * @param createBitmap - whether process image into bitmap
   */load(t){return this._load||(void 0!==t&&(this.createBitmap=t),this._load=new Promise((t,e)=>{let r=this.source;this.url=r.src;let i=()=>{this.destroyed||(r.onload=null,r.onerror=null,this.update(),this._load=null,this.createBitmap?t(this.process()):t(this))};r.complete&&r.src?i():(r.onload=i,r.onerror=t=>{e(t),this.onError.emit(t)})})),this._load}/**
   * Called when we need to convert image into BitmapImage.
   * Can be called multiple times, real promise is cached inside.
   * @returns - Cached promise to fill that bitmap
   */process(){let t=this.source;if(null!==this._process)return this._process;if(null!==this.bitmap||!globalThis.createImageBitmap)return Promise.resolve(this);let e=globalThis.createImageBitmap,r=!t.crossOrigin||"anonymous"===t.crossOrigin;return this._process=fetch(t.src,{mode:r?"cors":"no-cors"}).then(t=>t.blob()).then(r=>e(r,0,0,t.width,t.height,{premultiplyAlpha:null===this.alphaMode||this.alphaMode===te.UNPACK?"premultiply":"none"})).then(t=>this.destroyed?Promise.reject():(this.bitmap=t,this.update(),this._process=null,Promise.resolve(this))),this._process}/**
   * Upload the image resource to GPU.
   * @param renderer - Renderer to upload to
   * @param baseTexture - BaseTexture for this resource
   * @param glTexture - GLTexture to use
   * @returns {boolean} true is success
   */upload(t,e,r){if("number"==typeof this.alphaMode&&(e.alphaMode=this.alphaMode),!this.createBitmap)return super.upload(t,e,r);if(!this.bitmap&&(this.process(),!this.bitmap))return!1;if(super.upload(t,e,r,this.bitmap),!this.preserveBitmap){let t=!0,i=e._glTextures;for(let s in i){let n=i[s];if(n!==r&&n.dirtyId!==e.dirtyId){t=!1;break}}t&&(this.bitmap.close&&this.bitmap.close(),this.bitmap=null)}return!0}/** Destroys this resource. */dispose(){this.source.onload=null,this.source.onerror=null,super.dispose(),this.bitmap&&(this.bitmap.close(),this.bitmap=null),this._process=null,this._load=null}/**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if current environment support HTMLImageElement, and source is string or HTMLImageElement
   */static test(t){return"u">typeof HTMLImageElement&&("string"==typeof t||t instanceof HTMLImageElement)}}class nY{constructor(){this.x0=0,this.y0=0,this.x1=1,this.y1=0,this.x2=1,this.y2=1,this.x3=0,this.y3=1,this.uvsFloat32=new Float32Array(8)}/**
   * Sets the texture Uvs based on the given frame information.
   * @protected
   * @param frame - The frame of the texture
   * @param baseFrame - The base frame of the texture
   * @param rotate - Rotation of frame, see {@link PIXI.groupD8}
   */set(t,e,r){let i=e.width,s=e.height;if(r){let e=t.width/2/i,n=t.height/2/s,a=t.x/i+e,o=t.y/s+n;r=nn.add(r,nn.NW),this.x0=a+e*nn.uX(r),this.y0=o+n*nn.uY(r),r=nn.add(r,2),this.x1=a+e*nn.uX(r),this.y1=o+n*nn.uY(r),r=nn.add(r,2),this.x2=a+e*nn.uX(r),this.y2=o+n*nn.uY(r),r=nn.add(r,2),this.x3=a+e*nn.uX(r),this.y3=o+n*nn.uY(r)}else this.x0=t.x/i,this.y0=t.y/s,this.x1=(t.x+t.width)/i,this.y1=t.y/s,this.x2=(t.x+t.width)/i,this.y2=(t.y+t.height)/s,this.x3=t.x/i,this.y3=(t.y+t.height)/s;this.uvsFloat32[0]=this.x0,this.uvsFloat32[1]=this.y0,this.uvsFloat32[2]=this.x1,this.uvsFloat32[3]=this.y1,this.uvsFloat32[4]=this.x2,this.uvsFloat32[5]=this.y2,this.uvsFloat32[6]=this.x3,this.uvsFloat32[7]=this.y3}}nY.prototype.toString=function(){return`[@pixi/core:TextureUvs x0=${this.x0} y0=${this.y0} x1=${this.x1} y1=${this.y1} x2=${this.x2} y2=${this.y2} x3=${this.x3} y3=${this.y3}]`};const nq=new nY;function nK(t){t.destroy=function(){},t.on=function(){},t.once=function(){},t.emit=function(){}}class nZ extends /*@__PURE__*/U(tP){/**
   * @param baseTexture - The base texture source to create the texture from
   * @param frame - The rectangle frame of the texture to show
   * @param orig - The area of original texture
   * @param trim - Trimmed rectangle of original texture
   * @param rotate - indicates how the texture was rotated by texture packer. See {@link PIXI.groupD8}
   * @param anchor - Default anchor point used for sprite placement / rotation
   * @param borders - Default borders used for 9-slice scaling. See {@link PIXI.NineSlicePlane}
   */constructor(t,e,r,i,s,n,a){if(super(),this.noFrame=!1,e||(this.noFrame=!0,e=new s2(0,0,1,1)),t instanceof nZ&&(t=t.baseTexture),this.baseTexture=t,this._frame=e,this.trim=i,this.valid=!1,this.destroyed=!1,this._uvs=nq,this.uvMatrix=null,this.orig=r||e,this._rotate=Number(s||0),!0===s)this._rotate=2;else if(this._rotate%2!=0)throw Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");this.defaultAnchor=n?new s0(n.x,n.y):new s0(0,0),this.defaultBorders=a,this._updateID=0,this.textureCacheIds=[],t.valid?this.noFrame?t.valid&&this.onBaseTextureUpdated(t):this.frame=e:t.once("loaded",this.onBaseTextureUpdated,this),this.noFrame&&t.on("update",this.onBaseTextureUpdated,this)}/**
   * Updates this texture on the gpu.
   *
   * Calls the TextureResource update.
   *
   * If you adjusted `frame` manually, please call `updateUvs()` instead.
   */update(){this.baseTexture.resource&&this.baseTexture.resource.update()}/**
   * Called when the base texture is updated
   * @protected
   * @param baseTexture - The base texture.
   */onBaseTextureUpdated(t){if(this.noFrame){if(!this.baseTexture.valid)return;this._frame.width=t.width,this._frame.height=t.height,this.valid=!0,this.updateUvs()}else this.frame=this._frame;this.emit("update",this)}/**
   * Destroys this texture
   * @param [destroyBase=false] - Whether to destroy the base texture as well
   * @fires PIXI.Texture#destroyed
   */destroy(t){if(this.baseTexture){if(t){let{resource:t}=this.baseTexture;t?.url&&sp[t.url]&&nZ.removeFromCache(t.url),this.baseTexture.destroy()}this.baseTexture.off("loaded",this.onBaseTextureUpdated,this),this.baseTexture.off("update",this.onBaseTextureUpdated,this),this.baseTexture=null}this._frame=null,this._uvs=null,this.trim=null,this.orig=null,this.valid=!1,nZ.removeFromCache(this),this.textureCacheIds=null,this.destroyed=!0,this.emit("destroyed",this),this.removeAllListeners()}/**
   * Creates a new texture object that acts the same as this one.
   * @returns - The new texture
   */clone(){let t=this._frame.clone(),e=this._frame===this.orig?t:this.orig.clone(),r=new nZ(this.baseTexture,!this.noFrame&&t,e,this.trim?.clone(),this.rotate,this.defaultAnchor,this.defaultBorders);return this.noFrame&&(r._frame=t),r}/**
   * Updates the internal WebGL UV cache. Use it after you change `frame` or `trim` of the texture.
   * Call it after changing the frame
   */updateUvs(){this._uvs===nq&&(this._uvs=new nY),this._uvs.set(this._frame,this.baseTexture,this.rotate),this._updateID++}/**
   * Helper function that creates a new Texture based on the source you provide.
   * The source can be - frame id, image url, video url, canvas element, video element, base texture
   * @param {string|PIXI.BaseTexture|HTMLImageElement|HTMLVideoElement|ImageBitmap|PIXI.ICanvas} source -
   *        Source or array of sources to create texture from
   * @param options - See {@link PIXI.BaseTexture}'s constructor for options.
   * @param {string} [options.pixiIdPrefix=pixiid] - If a source has no id, this is the prefix of the generated id
   * @param {boolean} [strict] - Enforce strict-mode, see {@link PIXI.settings.STRICT_TEXTURE_CACHE}.
   * @returns {PIXI.Texture} The newly created texture
   */static from(t,e={},r=tl.STRICT_TEXTURE_CACHE){let i="string"==typeof t,s=null;if(i)s=t;else if(t instanceof sk){if(!t.cacheId){let r=e?.pixiIdPrefix||"pixiid";t.cacheId=`${r}-${sl()}`,sk.addToCache(t,t.cacheId)}s=t.cacheId}else{if(!t._pixiId){let r=e?.pixiIdPrefix||"pixiid";t._pixiId=`${r}_${sl()}`}s=t._pixiId}let n=sp[s];if(i&&r&&!n)throw Error(`The cacheId "${s}" does not exist in TextureCache.`);return n||t instanceof sk?!n&&t instanceof sk&&(n=new nZ(t),nZ.addToCache(n,s)):(e.resolution||(e.resolution=sA(t)),(n=new nZ(new sk(t,e))).baseTexture.cacheId=s,sk.addToCache(n.baseTexture,s),nZ.addToCache(n,s)),n}/**
   * Useful for loading textures via URLs. Use instead of `Texture.from` because
   * it does a better job of handling failed URLs more effectively. This also ignores
   * `PIXI.settings.STRICT_TEXTURE_CACHE`. Works for Videos, SVGs, Images.
   * @param url - The remote URL or array of URLs to load.
   * @param options - Optional options to include
   * @returns - A Promise that resolves to a Texture.
   */static fromURL(t,e){let r=Object.assign({autoLoad:!1},e?.resourceOptions),i=nZ.from(t,Object.assign({resourceOptions:r},e),!1),s=i.baseTexture.resource;return i.baseTexture.valid?Promise.resolve(i):s.load().then(()=>Promise.resolve(i))}/**
   * Create a new Texture with a BufferResource from a typed array.
   * @param buffer - The optional array to use. If no data is provided, a new Float32Array is created.
   * @param width - Width of the resource
   * @param height - Height of the resource
   * @param options - See {@link PIXI.BaseTexture}'s constructor for options.
   *        Default properties are different from the constructor's defaults.
   * @param {PIXI.FORMATS} [options.format] - The format is not given, the type is inferred from the
   *        type of the buffer: `RGBA` if Float32Array, Int8Array, Uint8Array, or Uint8ClampedArray,
   *        otherwise `RGBA_INTEGER`.
   * @param {PIXI.TYPES} [options.type] - The type is not given, the type is inferred from the
   *        type of the buffer. Maps Float32Array to `FLOAT`, Int32Array to `INT`, Uint32Array to
   *        `UNSIGNED_INT`, Int16Array to `SHORT`, Uint16Array to `UNSIGNED_SHORT`, Int8Array to `BYTE`,
   *        Uint8Array/Uint8ClampedArray to `UNSIGNED_BYTE`.
   * @param {PIXI.ALPHA_MODES} [options.alphaMode=PIXI.ALPHA_MODES.NPM]
   * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.SCALE_MODES.NEAREST]
   * @returns - The resulting new BaseTexture
   */static fromBuffer(t,e,r,i){return new nZ(sk.fromBuffer(t,e,r,i))}/**
   * Create a texture from a source and add to the cache.
   * @param {HTMLImageElement|HTMLVideoElement|ImageBitmap|PIXI.ICanvas|string} source - The input source.
   * @param imageUrl - File name of texture, for cache and resolving resolution.
   * @param name - Human readable name for the texture cache. If no name is
   *        specified, only `imageUrl` will be used as the cache ID.
   * @param options
   * @returns - Output texture
   */static fromLoader(t,e,r,i){let s=new sk(t,Object.assign({scaleMode:sk.defaultOptions.scaleMode,resolution:sA(e)},i)),{resource:n}=s;n instanceof n$&&(n.url=e);let a=new nZ(s);return r||(r=e),sk.addToCache(a.baseTexture,r),nZ.addToCache(a,r),r!==e&&(sk.addToCache(a.baseTexture,e),nZ.addToCache(a,e)),a.baseTexture.valid?Promise.resolve(a):new Promise(t=>{a.baseTexture.once("loaded",()=>t(a))})}/**
   * Adds a Texture to the global TextureCache. This cache is shared across the whole PIXI object.
   * @param texture - The Texture to add to the cache.
   * @param id - The id that the Texture will be stored against.
   */static addToCache(t,e){e&&(t.textureCacheIds.includes(e)||t.textureCacheIds.push(e),sp[e]&&sp[e]!==t&&console.warn(`Texture added to the cache with an id [${e}] that already had an entry`),sp[e]=t)}/**
   * Remove a Texture from the global TextureCache.
   * @param texture - id of a Texture to be removed, or a Texture instance itself
   * @returns - The Texture that was removed
   */static removeFromCache(t){if("string"==typeof t){let e=sp[t];if(e){let r=e.textureCacheIds.indexOf(t);return r>-1&&e.textureCacheIds.splice(r,1),delete sp[t],e}}else if(t?.textureCacheIds){for(let e=0;e<t.textureCacheIds.length;++e)sp[t.textureCacheIds[e]]===t&&delete sp[t.textureCacheIds[e]];return t.textureCacheIds.length=0,t}return null}/**
   * Returns resolution of baseTexture
   * @readonly
   */get resolution(){return this.baseTexture.resolution}/**
   * The frame specifies the region of the base texture that this texture uses.
   * Please call `updateUvs()` after you change coordinates of `frame` manually.
   */get frame(){return this._frame}set frame(t){this._frame=t,this.noFrame=!1;let{x:e,y:r,width:i,height:s}=t,n=e+i>this.baseTexture.width,a=r+s>this.baseTexture.height;if(n||a){let t=`X: ${e} + ${i} = ${e+i} > ${this.baseTexture.width}`,o=`Y: ${r} + ${s} = ${r+s} > ${this.baseTexture.height}`;throw Error(`Texture Error: frame does not fit inside the base Texture dimensions: ${t} ${n&&a?"and":"or"} ${o}`)}this.valid=i&&s&&this.baseTexture.valid,this.trim||this.rotate||(this.orig=t),this.valid&&this.updateUvs()}/**
   * Indicates whether the texture is rotated inside the atlas
   * set to 2 to compensate for texture packer rotation
   * set to 6 to compensate for spine packer rotation
   * can be used to rotate or mirror sprites
   * See {@link PIXI.groupD8} for explanation
   */get rotate(){return this._rotate}set rotate(t){this._rotate=t,this.valid&&this.updateUvs()}/** The width of the Texture in pixels. */get width(){return this.orig.width}/** The height of the Texture in pixels. */get height(){return this.orig.height}/** Utility function for BaseTexture|Texture cast. */castToBaseTexture(){return this.baseTexture}/** An empty texture, used often to not have to create multiple empty textures. Can not be destroyed. */static get EMPTY(){return nZ._EMPTY||(nZ._EMPTY=new nZ(new sk),nK(nZ._EMPTY),nK(nZ._EMPTY.baseTexture)),nZ._EMPTY}/** A white texture of 16x16 size, used for graphics and other things Can not be destroyed. */static get WHITE(){if(!nZ._WHITE){let t=tl.ADAPTER.createCanvas(16,16),e=t.getContext("2d");t.width=16,t.height=16,e.fillStyle="white",e.fillRect(0,0,16,16),nZ._WHITE=new nZ(sk.from(t)),nK(nZ._WHITE),nK(nZ._WHITE.baseTexture)}return nZ._WHITE}}class nQ extends nZ{/**
   * @param baseRenderTexture - The base texture object that this texture uses.
   * @param frame - The rectangle frame of the texture to show.
   */constructor(t,e){super(t,e),this.valid=!0,this.filterFrame=null,this.filterPoolKey=null,this.updateUvs()}/**
   * Shortcut to `this.baseTexture.framebuffer`, saves baseTexture cast.
   * @readonly
   */get framebuffer(){return this.baseTexture.framebuffer}/**
   * Shortcut to `this.framebuffer.multisample`.
   * @default PIXI.MSAA_QUALITY.NONE
   */get multisample(){return this.framebuffer.multisample}set multisample(t){this.framebuffer.multisample=t}/**
   * Resizes the RenderTexture.
   * @param desiredWidth - The desired width to resize to.
   * @param desiredHeight - The desired height to resize to.
   * @param resizeBaseTexture - Should the baseTexture.width and height values be resized as well?
   */resize(t,e,r=!0){let i=this.baseTexture.resolution,s=Math.round(t*i)/i,n=Math.round(e*i)/i;this.valid=s>0&&n>0,this._frame.width=this.orig.width=s,this._frame.height=this.orig.height=n,r&&this.baseTexture.resize(s,n),this.updateUvs()}/**
   * Changes the resolution of baseTexture, but does not change framebuffer size.
   * @param resolution - The new resolution to apply to RenderTexture
   */setResolution(t){let{baseTexture:e}=this;e.resolution!==t&&(e.setResolution(t),this.resize(e.width,e.height,!1))}/**
   * A short hand way of creating a render texture.
   * @param options - Options
   * @param {number} [options.width=100] - The width of the render texture
   * @param {number} [options.height=100] - The height of the render texture
   * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.BaseTexture.defaultOptions.scaleMode] - See {@link PIXI.SCALE_MODES}
   *    for possible values
   * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - The resolution / device pixel ratio of the texture
   *    being generated
   * @param {PIXI.MSAA_QUALITY} [options.multisample=PIXI.MSAA_QUALITY.NONE] - The number of samples of the frame buffer
   * @returns The new render texture
   */static create(t){return new nQ(new nz(t))}}class nJ{/**
   * @param textureOptions - options that will be passed to BaseRenderTexture constructor
   * @param {PIXI.SCALE_MODES} [textureOptions.scaleMode] - See {@link PIXI.SCALE_MODES} for possible values.
   */constructor(t){this.texturePool={},this.textureOptions=t||{},this.enableFullScreen=!1,this._pixelsWidth=0,this._pixelsHeight=0}/**
   * Creates texture with params that were specified in pool constructor.
   * @param realWidth - Width of texture in pixels.
   * @param realHeight - Height of texture in pixels.
   * @param multisample - Number of samples of the framebuffer.
   */createTexture(t,e,r=to.NONE){let i=new nz(Object.assign({width:t,height:e,resolution:1,multisample:r},this.textureOptions));return new nQ(i)}/**
   * Gets a Power-of-Two render texture or fullScreen texture
   * @param minWidth - The minimum width of the render texture.
   * @param minHeight - The minimum height of the render texture.
   * @param resolution - The resolution of the render texture.
   * @param multisample - Number of samples of the render texture.
   * @returns The new render texture.
   */getOptimalTexture(t,e,r=1,i=to.NONE){let s;t=Math.max(Math.ceil(t*r-1e-6),1),e=Math.max(Math.ceil(e*r-1e-6),1),this.enableFullScreen&&t===this._pixelsWidth&&e===this._pixelsHeight?s=i>1?-i:-1:(t=si(t),e=si(e),s=((65535&t)<<16|65535&e)>>>0,i>1&&(s+=4294967296*i)),this.texturePool[s]||(this.texturePool[s]=[]);let n=this.texturePool[s].pop();return n||(n=this.createTexture(t,e,i)),n.filterPoolKey=s,n.setResolution(r),n}/**
   * Gets extra texture of the same size as input renderTexture
   *
   * `getFilterTexture(input, 0.5)` or `getFilterTexture(0.5, input)`
   * @param input - renderTexture from which size and resolution will be copied
   * @param resolution - override resolution of the renderTexture
   *  It overrides, it does not multiply
   * @param multisample - number of samples of the renderTexture
   */getFilterTexture(t,e,r){let i=this.getOptimalTexture(t.width,t.height,e||t.resolution,r||to.NONE);return i.filterFrame=t.filterFrame,i}/**
   * Place a render texture back into the pool.
   * @param renderTexture - The renderTexture to free
   */returnTexture(t){let e=t.filterPoolKey;t.filterFrame=null,this.texturePool[e].push(t)}/**
   * Alias for returnTexture, to be compliant with FilterSystem interface.
   * @param renderTexture - The renderTexture to free
   */returnFilterTexture(t){this.returnTexture(t)}/**
   * Clears the pool.
   * @param destroyTextures - Destroy all stored textures.
   */clear(t){if(t=!1!==t)for(let t in this.texturePool){let e=this.texturePool[t];if(e)for(let t=0;t<e.length;t++)e[t].destroy(!0)}this.texturePool={}}/**
   * If screen size was changed, drops all screen-sized textures,
   * sets new screen size, sets `enableFullScreen` to true
   *
   * Size is measured in pixels, `renderer.view` can be passed here, not `renderer.screen`
   * @param size - Initial size of screen.
   */setScreenSize(t){if(!(t.width===this._pixelsWidth&&t.height===this._pixelsHeight)){for(let e in this.enableFullScreen=t.width>0&&t.height>0,this.texturePool){if(!(0>Number(e)))continue;let t=this.texturePool[e];if(t)for(let e=0;e<t.length;e++)t[e].destroy(!0);this.texturePool[e]=[]}this._pixelsWidth=t.width,this._pixelsHeight=t.height}}}nJ.SCREEN_KEY=-1;class n0 extends sY{constructor(){super(),this.addAttribute("aVertexPosition",new Float32Array([0,0,1,0,1,1,0,1])).addIndex([0,1,3,2])}}class n1 extends sY{constructor(){super(),this.vertices=new Float32Array([-1,-1,1,-1,1,1,-1,1]),this.uvs=new Float32Array([0,0,1,0,1,1,0,1]),this.vertexBuffer=new sj(this.vertices),this.uvBuffer=new sj(this.uvs),this.addAttribute("aVertexPosition",this.vertexBuffer).addAttribute("aTextureCoord",this.uvBuffer).addIndex([0,1,2,0,2,3])}/**
   * Maps two Rectangle to the quad.
   * @param targetTextureFrame - The first rectangle
   * @param destinationFrame - The second rectangle
   * @returns - Returns itself.
   */map(t,e){let r=0,i=0;return this.uvs[0]=r,this.uvs[1]=i,this.uvs[2]=r+e.width/t.width,this.uvs[3]=i,this.uvs[4]=r+e.width/t.width,this.uvs[5]=i+e.height/t.height,this.uvs[6]=r,this.uvs[7]=i+e.height/t.height,r=e.x,i=e.y,this.vertices[0]=r,this.vertices[1]=i,this.vertices[2]=r+e.width,this.vertices[3]=i,this.vertices[4]=r+e.width,this.vertices[5]=i+e.height,this.vertices[6]=r,this.vertices[7]=i+e.height,this.invalidate(),this}/**
   * Legacy upload method, just marks buffers dirty.
   * @returns - Returns itself.
   */invalidate(){return this.vertexBuffer._updateID++,this.uvBuffer._updateID++,this}}class n2{constructor(){this.renderTexture=null,this.target=null,this.legacy=!1,this.resolution=1,this.multisample=to.NONE,this.sourceFrame=new s2,this.destinationFrame=new s2,this.bindingSourceFrame=new s2,this.bindingDestinationFrame=new s2,this.filters=[],this.transform=null}/** Clears the state */clear(){this.target=null,this.filters=null,this.renderTexture=null}}const n3=[new s0,new s0,new s0,new s0],n4=new s8;class n5{/**
   * @param renderer - The renderer this System works for.
   */constructor(t){this.renderer=t,this.defaultFilterStack=[{}],this.texturePool=new nJ,this.statePool=[],this.quad=new n0,this.quadUv=new n1,this.tempRect=new s2,this.activeState={},this.globalUniforms=new nI({outputFrame:new s2,inputSize:new Float32Array(4),inputPixel:new Float32Array(4),inputClamp:new Float32Array(4),resolution:1,// legacy variables
filterArea:new Float32Array(4),filterClamp:new Float32Array(4)},!0),this.forceClear=!1,this.useMaxPadding=!1}init(){this.texturePool.setScreenSize(this.renderer.view)}/**
   * Pushes a set of filters to be applied later to the system. This will redirect further rendering into an
   * input render-texture for the rest of the filtering pipeline.
   * @param {PIXI.DisplayObject} target - The target of the filter to render.
   * @param filters - The filters to apply.
   */push(t,e){let r,i;let s=this.renderer,n=this.defaultFilterStack,a=this.statePool.pop()||new n2,o=s.renderTexture;if(o.current){let t=o.current;r=t.resolution,i=t.multisample}else r=s.resolution,i=s.multisample;let h=e[0].resolution||r,l=e[0].multisample??i,u=e[0].padding,d=e[0].autoFit,c=e[0].legacy??!0;for(let t=1;t<e.length;t++){let s=e[t];h=Math.min(h,s.resolution||r),l=Math.min(l,s.multisample??i),u=this.useMaxPadding?Math.max(u,s.padding):u+s.padding,d=d&&s.autoFit,c=c||(s.legacy??!0)}1===n.length&&(this.defaultFilterStack[0].renderTexture=o.current),n.push(a),a.resolution=h,a.multisample=l,a.legacy=c,a.target=t,a.sourceFrame.copyFrom(t.filterArea||t.getBounds(!0)),a.sourceFrame.pad(u);let p=this.tempRect.copyFrom(o.sourceFrame);s.projection.transform&&this.transformAABB(n4.copyFrom(s.projection.transform).invert(),p),d?(a.sourceFrame.fit(p),(a.sourceFrame.width<=0||a.sourceFrame.height<=0)&&(a.sourceFrame.width=0,a.sourceFrame.height=0)):a.sourceFrame.intersects(p)||(a.sourceFrame.width=0,a.sourceFrame.height=0),this.roundFrame(a.sourceFrame,o.current?o.current.resolution:s.resolution,o.sourceFrame,o.destinationFrame,s.projection.transform),a.renderTexture=this.getOptimalFilterTexture(a.sourceFrame.width,a.sourceFrame.height,h,l),a.filters=e,a.destinationFrame.width=a.renderTexture.width,a.destinationFrame.height=a.renderTexture.height;let f=this.tempRect;f.x=0,f.y=0,f.width=a.sourceFrame.width,f.height=a.sourceFrame.height,a.renderTexture.filterFrame=a.sourceFrame,a.bindingSourceFrame.copyFrom(o.sourceFrame),a.bindingDestinationFrame.copyFrom(o.destinationFrame),a.transform=s.projection.transform,s.projection.transform=null,o.bind(a.renderTexture,a.sourceFrame,f),s.framebuffer.clear(0,0,0,0)}/** Pops off the filter and applies it. */pop(){let t=this.defaultFilterStack,e=t.pop(),r=e.filters;this.activeState=e;let i=this.globalUniforms.uniforms;i.outputFrame=e.sourceFrame,i.resolution=e.resolution;let s=i.inputSize,n=i.inputPixel,a=i.inputClamp;if(s[0]=e.destinationFrame.width,s[1]=e.destinationFrame.height,s[2]=1/s[0],s[3]=1/s[1],n[0]=Math.round(s[0]*e.resolution),n[1]=Math.round(s[1]*e.resolution),n[2]=1/n[0],n[3]=1/n[1],a[0]=.5*n[2],a[1]=.5*n[3],a[2]=e.sourceFrame.width*s[2]-.5*n[2],a[3]=e.sourceFrame.height*s[3]-.5*n[3],e.legacy){let t=i.filterArea;t[0]=e.destinationFrame.width,t[1]=e.destinationFrame.height,t[2]=e.sourceFrame.x,t[3]=e.sourceFrame.y,i.filterClamp=i.inputClamp}this.globalUniforms.update();let o=t[t.length-1];if(this.renderer.framebuffer.blit(),1===r.length)r[0].apply(this,e.renderTexture,o.renderTexture,tr.BLEND,e),this.returnFilterTexture(e.renderTexture);else{let t=e.renderTexture,i=this.getOptimalFilterTexture(t.width,t.height,e.resolution);i.filterFrame=t.filterFrame;let s=0;for(s=0;s<r.length-1;++s){1===s&&e.multisample>1&&((i=this.getOptimalFilterTexture(t.width,t.height,e.resolution)).filterFrame=t.filterFrame),r[s].apply(this,t,i,tr.CLEAR,e);let n=t;t=i,i=n}r[s].apply(this,t,o.renderTexture,tr.BLEND,e),s>1&&e.multisample>1&&this.returnFilterTexture(e.renderTexture),this.returnFilterTexture(t),this.returnFilterTexture(i)}e.clear(),this.statePool.push(e)}/**
   * Binds a renderTexture with corresponding `filterFrame`, clears it if mode corresponds.
   * @param filterTexture - renderTexture to bind, should belong to filter pool or filter stack
   * @param clearMode - clearMode, by default its CLEAR/YES. See {@link PIXI.CLEAR_MODES}
   */bindAndClear(t,e=tr.CLEAR){let{renderTexture:r,state:i}=this.renderer;if(t===this.defaultFilterStack[this.defaultFilterStack.length-1].renderTexture?this.renderer.projection.transform=this.activeState.transform:this.renderer.projection.transform=null,t?.filterFrame){let e=this.tempRect;e.x=0,e.y=0,e.width=t.filterFrame.width,e.height=t.filterFrame.height,r.bind(t,t.filterFrame,e)}else t!==this.defaultFilterStack[this.defaultFilterStack.length-1].renderTexture?r.bind(t):this.renderer.renderTexture.bind(t,this.activeState.bindingSourceFrame,this.activeState.bindingDestinationFrame);let s=1&i.stateId||this.forceClear;(e===tr.CLEAR||e===tr.BLIT&&s)&&this.renderer.framebuffer.clear(0,0,0,0)}/**
   * Draws a filter using the default rendering process.
   *
   * This should be called only by {@link PIXI.Filter#apply}.
   * @param filter - The filter to draw.
   * @param input - The input render target.
   * @param output - The target to output to.
   * @param clearMode - Should the output be cleared before rendering to it
   */applyFilter(t,e,r,i){let s=this.renderer;s.state.set(t.state),this.bindAndClear(r,i),t.uniforms.uSampler=e,t.uniforms.filterGlobals=this.globalUniforms,s.shader.bind(t),t.legacy=!!t.program.attributeData.aTextureCoord,t.legacy?(this.quadUv.map(e._frame,e.filterFrame),s.geometry.bind(this.quadUv),s.geometry.draw($.TRIANGLES)):(s.geometry.bind(this.quad),s.geometry.draw($.TRIANGLE_STRIP))}/**
   * Multiply _input normalized coordinates_ to this matrix to get _sprite texture normalized coordinates_.
   *
   * Use `outputMatrix * vTextureCoord` in the shader.
   * @param outputMatrix - The matrix to output to.
   * @param {PIXI.Sprite} sprite - The sprite to map to.
   * @returns The mapped matrix.
   */calculateSpriteMatrix(t,e){let{sourceFrame:r,destinationFrame:i}=this.activeState,{orig:s}=e._texture,n=t.set(i.width,0,0,i.height,r.x,r.y),a=e.worldTransform.copyTo(s8.TEMP_MATRIX);return a.invert(),n.prepend(a),n.scale(1/s.width,1/s.height),n.translate(e.anchor.x,e.anchor.y),n}/** Destroys this Filter System. */destroy(){this.renderer=null,this.texturePool.clear(!1)}/**
   * Gets a Power-of-Two render texture or fullScreen texture
   * @param minWidth - The minimum width of the render texture in real pixels.
   * @param minHeight - The minimum height of the render texture in real pixels.
   * @param resolution - The resolution of the render texture.
   * @param multisample - Number of samples of the render texture.
   * @returns - The new render texture.
   */getOptimalFilterTexture(t,e,r=1,i=to.NONE){return this.texturePool.getOptimalTexture(t,e,r,i)}/**
   * Gets extra render texture to use inside current filter
   * To be compliant with older filters, you can use params in any order
   * @param input - renderTexture from which size and resolution will be copied
   * @param resolution - override resolution of the renderTexture
   * @param multisample - number of samples of the renderTexture
   */getFilterTexture(t,e,r){if("number"==typeof t){let r=t;t=e,e=r}t=t||this.activeState.renderTexture;let i=this.texturePool.getOptimalTexture(t.width,t.height,e||t.resolution,r||to.NONE);return i.filterFrame=t.filterFrame,i}/**
   * Frees a render texture back into the pool.
   * @param renderTexture - The renderTarget to free
   */returnFilterTexture(t){this.texturePool.returnTexture(t)}/** Empties the texture pool. */emptyPool(){this.texturePool.clear(!0)}/** Calls `texturePool.resize()`, affects fullScreen renderTextures. */resize(){this.texturePool.setScreenSize(this.renderer.view)}/**
   * @param matrix - first param
   * @param rect - second param
   */transformAABB(t,e){let r=n3[0],i=n3[1],s=n3[2],n=n3[3];r.set(e.left,e.top),i.set(e.left,e.bottom),s.set(e.right,e.top),n.set(e.right,e.bottom),t.apply(r,r),t.apply(i,i),t.apply(s,s),t.apply(n,n);let a=Math.min(r.x,i.x,s.x,n.x),o=Math.min(r.y,i.y,s.y,n.y),h=Math.max(r.x,i.x,s.x,n.x),l=Math.max(r.y,i.y,s.y,n.y);e.x=a,e.y=o,e.width=h-a,e.height=l-o}roundFrame(t,e,r,i,s){if(!(t.width<=0||t.height<=0||r.width<=0||r.height<=0)){if(s){let{a:t,b:e,c:r,d:i}=s;if((Math.abs(e)>1e-4||Math.abs(r)>1e-4)&&(Math.abs(t)>1e-4||Math.abs(i)>1e-4))return}(s=s?n4.copyFrom(s):n4.identity()).translate(-r.x,-r.y).scale(i.width/r.width,i.height/r.height).translate(i.x,i.y),this.transformAABB(s,t),t.ceil(e),this.transformAABB(s.invert(),t)}}}n5.extension={type:sS.RendererSystem,name:"filter"},sI.add(n5);class n6{constructor(t){this.framebuffer=t,this.stencil=null,this.dirtyId=-1,this.dirtyFormat=-1,this.dirtySize=-1,this.multisample=to.NONE,this.msaaBuffer=null,this.blitFramebuffer=null,this.mipLevel=0}}const n8=new s2;class n7{/**
   * @param renderer - The renderer this System works for.
   */constructor(t){this.renderer=t,this.managedFramebuffers=[],this.unknownFramebuffer=new nV(10,10),this.msaaSamples=null}/** Sets up the renderer context and necessary buffers. */contextChange(){this.disposeAll(!0);let t=this.gl=this.renderer.gl;if(this.CONTEXT_UID=this.renderer.CONTEXT_UID,this.current=this.unknownFramebuffer,this.viewport=new s2,this.hasMRT=!0,this.writeDepthTexture=!0,1===this.renderer.context.webGLVersion){let e=this.renderer.context.extensions.drawBuffers,r=this.renderer.context.extensions.depthTexture;tl.PREFER_ENV===X.WEBGL_LEGACY&&(e=null,r=null),e?t.drawBuffers=t=>e.drawBuffersWEBGL(t):(this.hasMRT=!1,t.drawBuffers=()=>{}),r||(this.writeDepthTexture=!1)}else this.msaaSamples=t.getInternalformatParameter(t.RENDERBUFFER,t.RGBA8,t.SAMPLES)}/**
   * Bind a framebuffer.
   * @param framebuffer
   * @param frame - frame, default is framebuffer size
   * @param mipLevel - optional mip level to set on the framebuffer - defaults to 0
   */bind(t,e,r=0){let{gl:i}=this;if(t){let s=t.glFramebuffers[this.CONTEXT_UID]||this.initFramebuffer(t);this.current!==t&&(this.current=t,i.bindFramebuffer(i.FRAMEBUFFER,s.framebuffer)),s.mipLevel!==r&&(t.dirtyId++,t.dirtyFormat++,s.mipLevel=r),s.dirtyId!==t.dirtyId&&(s.dirtyId=t.dirtyId,s.dirtyFormat!==t.dirtyFormat?(s.dirtyFormat=t.dirtyFormat,s.dirtySize=t.dirtySize,this.updateFramebuffer(t,r)):s.dirtySize!==t.dirtySize&&(s.dirtySize=t.dirtySize,this.resizeFramebuffer(t)));for(let e=0;e<t.colorTextures.length;e++){let r=t.colorTextures[e];this.renderer.texture.unbind(r.parentTextureArray||r)}if(t.depthTexture&&this.renderer.texture.unbind(t.depthTexture),e){let t=e.width>>r,i=e.height>>r,s=t/e.width;this.setViewport(e.x*s,e.y*s,t,i)}else{let e=t.width>>r,i=t.height>>r;this.setViewport(0,0,e,i)}}else this.current&&(this.current=null,i.bindFramebuffer(i.FRAMEBUFFER,null)),e?this.setViewport(e.x,e.y,e.width,e.height):this.setViewport(0,0,this.renderer.width,this.renderer.height)}/**
   * Set the WebGLRenderingContext's viewport.
   * @param x - X position of viewport
   * @param y - Y position of viewport
   * @param width - Width of viewport
   * @param height - Height of viewport
   */setViewport(t,e,r,i){let s=this.viewport;t=Math.round(t),e=Math.round(e),r=Math.round(r),i=Math.round(i),(s.width!==r||s.height!==i||s.x!==t||s.y!==e)&&(s.x=t,s.y=e,s.width=r,s.height=i,this.gl.viewport(t,e,r,i))}/**
   * Get the size of the current width and height. Returns object with `width` and `height` values.
   * @readonly
   */get size(){return this.current?{x:0,y:0,width:this.current.width,height:this.current.height}:{x:0,y:0,width:this.renderer.width,height:this.renderer.height}}/**
   * Clear the color of the context
   * @param r - Red value from 0 to 1
   * @param g - Green value from 0 to 1
   * @param b - Blue value from 0 to 1
   * @param a - Alpha value from 0 to 1
   * @param {PIXI.BUFFER_BITS} [mask=BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH] - Bitwise OR of masks
   *  that indicate the buffers to be cleared, by default COLOR and DEPTH buffers.
   */clear(t,e,r,i,s=z.COLOR|z.DEPTH){let{gl:n}=this;n.clearColor(t,e,r,i),n.clear(s)}/**
   * Initialize framebuffer for this context
   * @protected
   * @param framebuffer
   * @returns - created GLFramebuffer
   */initFramebuffer(t){let{gl:e}=this,r=new n6(e.createFramebuffer());return r.multisample=this.detectSamples(t.multisample),t.glFramebuffers[this.CONTEXT_UID]=r,this.managedFramebuffers.push(t),t.disposeRunner.add(this),r}/**
   * Resize the framebuffer
   * @param framebuffer
   * @protected
   */resizeFramebuffer(t){let{gl:e}=this,r=t.glFramebuffers[this.CONTEXT_UID];if(r.stencil){let i;e.bindRenderbuffer(e.RENDERBUFFER,r.stencil),i=1===this.renderer.context.webGLVersion?e.DEPTH_STENCIL:t.depth&&t.stencil?e.DEPTH24_STENCIL8:t.depth?e.DEPTH_COMPONENT24:e.STENCIL_INDEX8,r.msaaBuffer?e.renderbufferStorageMultisample(e.RENDERBUFFER,r.multisample,i,t.width,t.height):e.renderbufferStorage(e.RENDERBUFFER,i,t.width,t.height)}let i=t.colorTextures,s=i.length;e.drawBuffers||(s=Math.min(s,1));for(let n=0;n<s;n++){let s=i[n],a=s.parentTextureArray||s;this.renderer.texture.bind(a,0),0===n&&r.msaaBuffer&&(e.bindRenderbuffer(e.RENDERBUFFER,r.msaaBuffer),e.renderbufferStorageMultisample(e.RENDERBUFFER,r.multisample,a._glTextures[this.CONTEXT_UID].internalFormat,t.width,t.height))}t.depthTexture&&this.writeDepthTexture&&this.renderer.texture.bind(t.depthTexture,0)}/**
   * Update the framebuffer
   * @param framebuffer
   * @param mipLevel
   * @protected
   */updateFramebuffer(t,e){let{gl:r}=this,i=t.glFramebuffers[this.CONTEXT_UID],s=t.colorTextures,n=s.length;r.drawBuffers||(n=Math.min(n,1)),i.multisample>1&&this.canMultisampleFramebuffer(t)?i.msaaBuffer=i.msaaBuffer||r.createRenderbuffer():i.msaaBuffer&&(r.deleteRenderbuffer(i.msaaBuffer),i.msaaBuffer=null,i.blitFramebuffer&&(i.blitFramebuffer.dispose(),i.blitFramebuffer=null));let a=[];for(let o=0;o<n;o++){let n=s[o],h=n.parentTextureArray||n;this.renderer.texture.bind(h,0),0===o&&i.msaaBuffer?(r.bindRenderbuffer(r.RENDERBUFFER,i.msaaBuffer),r.renderbufferStorageMultisample(r.RENDERBUFFER,i.multisample,h._glTextures[this.CONTEXT_UID].internalFormat,t.width,t.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,i.msaaBuffer)):(r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+o,n.target,h._glTextures[this.CONTEXT_UID].texture,e),a.push(r.COLOR_ATTACHMENT0+o))}if(a.length>1&&r.drawBuffers(a),t.depthTexture&&this.writeDepthTexture){let i=t.depthTexture;this.renderer.texture.bind(i,0),r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,i._glTextures[this.CONTEXT_UID].texture,e)}if((t.stencil||t.depth)&&!(t.depthTexture&&this.writeDepthTexture)){let e,s;i.stencil=i.stencil||r.createRenderbuffer(),1===this.renderer.context.webGLVersion?(e=r.DEPTH_STENCIL_ATTACHMENT,s=r.DEPTH_STENCIL):t.depth&&t.stencil?(e=r.DEPTH_STENCIL_ATTACHMENT,s=r.DEPTH24_STENCIL8):t.depth?(e=r.DEPTH_ATTACHMENT,s=r.DEPTH_COMPONENT24):(e=r.STENCIL_ATTACHMENT,s=r.STENCIL_INDEX8),r.bindRenderbuffer(r.RENDERBUFFER,i.stencil),i.msaaBuffer?r.renderbufferStorageMultisample(r.RENDERBUFFER,i.multisample,s,t.width,t.height):r.renderbufferStorage(r.RENDERBUFFER,s,t.width,t.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,e,r.RENDERBUFFER,i.stencil)}else i.stencil&&(r.deleteRenderbuffer(i.stencil),i.stencil=null)}/**
   * Returns true if the frame buffer can be multisampled.
   * @param framebuffer
   */canMultisampleFramebuffer(t){return 1!==this.renderer.context.webGLVersion&&t.colorTextures.length<=1&&!t.depthTexture}/**
   * Detects number of samples that is not more than a param but as close to it as possible
   * @param samples - number of samples
   * @returns - recommended number of samples
   */detectSamples(t){let{msaaSamples:e}=this,r=to.NONE;if(t<=1||null===e)return r;for(let i=0;i<e.length;i++)if(e[i]<=t){r=e[i];break}return 1===r&&(r=to.NONE),r}/**
   * Only works with WebGL2
   *
   * blits framebuffer to another of the same or bigger size
   * after that target framebuffer is bound
   *
   * Fails with WebGL warning if blits multisample framebuffer to different size
   * @param framebuffer - by default it blits "into itself", from renderBuffer to texture.
   * @param sourcePixels - source rectangle in pixels
   * @param destPixels - dest rectangle in pixels, assumed to be the same as sourcePixels
   */blit(t,e,r){let{current:i,renderer:s,gl:n,CONTEXT_UID:a}=this;if(2!==s.context.webGLVersion||!i)return;let o=i.glFramebuffers[a];if(!o)return;if(!t){if(!o.msaaBuffer)return;let e=i.colorTextures[0];if(!e)return;o.blitFramebuffer||(o.blitFramebuffer=new nV(i.width,i.height),o.blitFramebuffer.addColorTexture(0,e)),(t=o.blitFramebuffer).colorTextures[0]!==e&&(t.colorTextures[0]=e,t.dirtyId++,t.dirtyFormat++),(t.width!==i.width||t.height!==i.height)&&(t.width=i.width,t.height=i.height,t.dirtyId++,t.dirtySize++)}e||((e=n8).width=i.width,e.height=i.height),r||(r=e);let h=e.width===r.width&&e.height===r.height;this.bind(t),n.bindFramebuffer(n.READ_FRAMEBUFFER,o.framebuffer),n.blitFramebuffer(e.left,e.top,e.right,e.bottom,r.left,r.top,r.right,r.bottom,n.COLOR_BUFFER_BIT,h?n.NEAREST:n.LINEAR),n.bindFramebuffer(n.READ_FRAMEBUFFER,t.glFramebuffers[this.CONTEXT_UID].framebuffer)}/**
   * Disposes framebuffer.
   * @param framebuffer - framebuffer that has to be disposed of
   * @param contextLost - If context was lost, we suppress all delete function calls
   */disposeFramebuffer(t,e){let r=t.glFramebuffers[this.CONTEXT_UID],i=this.gl;if(!r)return;delete t.glFramebuffers[this.CONTEXT_UID];let s=this.managedFramebuffers.indexOf(t);s>=0&&this.managedFramebuffers.splice(s,1),t.disposeRunner.remove(this),e||(i.deleteFramebuffer(r.framebuffer),r.msaaBuffer&&i.deleteRenderbuffer(r.msaaBuffer),r.stencil&&i.deleteRenderbuffer(r.stencil)),r.blitFramebuffer&&this.disposeFramebuffer(r.blitFramebuffer,e)}/**
   * Disposes all framebuffers, but not textures bound to them.
   * @param [contextLost=false] - If context was lost, we suppress all delete function calls
   */disposeAll(t){let e=this.managedFramebuffers;this.managedFramebuffers=[];for(let r=0;r<e.length;r++)this.disposeFramebuffer(e[r],t)}/**
   * Forcing creation of stencil buffer for current framebuffer, if it wasn't done before.
   * Used by MaskSystem, when its time to use stencil mask for Graphics element.
   *
   * Its an alternative for public lazy `framebuffer.enableStencil`, in case we need stencil without rebind.
   * @private
   */forceStencil(){let t,e;let r=this.current;if(!r)return;let i=r.glFramebuffers[this.CONTEXT_UID];if(!i||i.stencil&&r.stencil)return;r.stencil=!0;let s=r.width,n=r.height,a=this.gl,o=i.stencil=a.createRenderbuffer();a.bindRenderbuffer(a.RENDERBUFFER,o),1===this.renderer.context.webGLVersion?(t=a.DEPTH_STENCIL_ATTACHMENT,e=a.DEPTH_STENCIL):r.depth?(t=a.DEPTH_STENCIL_ATTACHMENT,e=a.DEPTH24_STENCIL8):(t=a.STENCIL_ATTACHMENT,e=a.STENCIL_INDEX8),i.msaaBuffer?a.renderbufferStorageMultisample(a.RENDERBUFFER,i.multisample,e,s,n):a.renderbufferStorage(a.RENDERBUFFER,e,s,n),a.framebufferRenderbuffer(a.FRAMEBUFFER,t,a.RENDERBUFFER,o)}/** Resets framebuffer stored state, binds screen framebuffer. Should be called before renderTexture reset(). */reset(){this.current=this.unknownFramebuffer,this.viewport=new s2}destroy(){this.renderer=null}}n7.extension={type:sS.RendererSystem,name:"framebuffer"},sI.add(n7);const n9={5126:4,5123:2,5121:1};class at{/** @param renderer - The renderer this System works for. */constructor(t){this.renderer=t,this._activeGeometry=null,this._activeVao=null,this.hasVao=!0,this.hasInstance=!0,this.canUseUInt32ElementIndex=!1,this.managedGeometries={}}/** Sets up the renderer context and necessary buffers. */contextChange(){this.disposeAll(!0);let t=this.gl=this.renderer.gl,e=this.renderer.context;if(this.CONTEXT_UID=this.renderer.CONTEXT_UID,2!==e.webGLVersion){let e=this.renderer.context.extensions.vertexArrayObject;tl.PREFER_ENV===X.WEBGL_LEGACY&&(e=null),e?(t.createVertexArray=()=>e.createVertexArrayOES(),t.bindVertexArray=t=>e.bindVertexArrayOES(t),t.deleteVertexArray=t=>e.deleteVertexArrayOES(t)):(this.hasVao=!1,t.createVertexArray=()=>null,t.bindVertexArray=()=>null,t.deleteVertexArray=()=>null)}if(2!==e.webGLVersion){let e=t.getExtension("ANGLE_instanced_arrays");e?(t.vertexAttribDivisor=(t,r)=>e.vertexAttribDivisorANGLE(t,r),t.drawElementsInstanced=(t,r,i,s,n)=>e.drawElementsInstancedANGLE(t,r,i,s,n),t.drawArraysInstanced=(t,r,i,s)=>e.drawArraysInstancedANGLE(t,r,i,s)):this.hasInstance=!1}this.canUseUInt32ElementIndex=2===e.webGLVersion||!!e.extensions.uint32ElementIndex}/**
   * Binds geometry so that is can be drawn. Creating a Vao if required
   * @param geometry - Instance of geometry to bind.
   * @param shader - Instance of shader to use vao for.
   */bind(t,e){e=e||this.renderer.shader.shader;let{gl:r}=this,i=t.glVertexArrayObjects[this.CONTEXT_UID],s=!1;i||(this.managedGeometries[t.id]=t,t.disposeRunner.add(this),t.glVertexArrayObjects[this.CONTEXT_UID]=i={},s=!0);let n=i[e.program.id]||this.initGeometryVao(t,e,s);this._activeGeometry=t,this._activeVao!==n&&(this._activeVao=n,this.hasVao?r.bindVertexArray(n):this.activateVao(t,e.program)),this.updateBuffers()}/** Reset and unbind any active VAO and geometry. */reset(){this.unbind()}/** Update buffers of the currently bound geometry. */updateBuffers(){let t=this._activeGeometry,e=this.renderer.buffer;for(let r=0;r<t.buffers.length;r++){let i=t.buffers[r];e.update(i)}}/**
   * Check compatibility between a geometry and a program
   * @param geometry - Geometry instance.
   * @param program - Program instance.
   */checkCompatibility(t,e){let r=t.attributes,i=e.attributeData;for(let t in i)if(!r[t])throw Error(`shader and geometry incompatible, geometry missing the "${t}" attribute`)}/**
   * Takes a geometry and program and generates a unique signature for them.
   * @param geometry - To get signature from.
   * @param program - To test geometry against.
   * @returns - Unique signature of the geometry and program
   */getSignature(t,e){let r=t.attributes,i=e.attributeData,s=["g",t.id];for(let t in r)i[t]&&s.push(t,i[t].location);return s.join("-")}/**
   * Creates or gets Vao with the same structure as the geometry and stores it on the geometry.
   * If vao is created, it is bound automatically. We use a shader to infer what and how to set up the
   * attribute locations.
   * @param geometry - Instance of geometry to to generate Vao for.
   * @param shader - Instance of the shader.
   * @param incRefCount - Increment refCount of all geometry buffers.
   */initGeometryVao(t,e,r=!0){let i=this.gl,s=this.CONTEXT_UID,n=this.renderer.buffer,a=e.program;a.glPrograms[s]||this.renderer.shader.generateProgram(e),this.checkCompatibility(t,a);let o=this.getSignature(t,a),h=t.glVertexArrayObjects[this.CONTEXT_UID],l=h[o];if(l)return h[a.id]=l,l;let u=t.buffers,d=t.attributes,c={},p={};for(let t in u)c[t]=0,p[t]=0;for(let t in d)!d[t].size&&a.attributeData[t]?d[t].size=a.attributeData[t].size:d[t].size||console.warn(`PIXI Geometry attribute '${t}' size cannot be determined (likely the bound shader does not have the attribute)`),c[d[t].buffer]+=d[t].size*n9[d[t].type];for(let t in d){let e=d[t],r=e.size;void 0===e.stride&&(c[e.buffer]===r*n9[e.type]?e.stride=0:e.stride=c[e.buffer]),void 0===e.start&&(e.start=p[e.buffer],p[e.buffer]+=r*n9[e.type])}l=i.createVertexArray(),i.bindVertexArray(l);for(let t=0;t<u.length;t++){let e=u[t];n.bind(e),r&&e._glBuffers[s].refCount++}return this.activateVao(t,a),h[a.id]=l,h[o]=l,i.bindVertexArray(null),n.unbind(th.ARRAY_BUFFER),l}/**
   * Disposes geometry.
   * @param geometry - Geometry with buffers. Only VAO will be disposed
   * @param [contextLost=false] - If context was lost, we suppress deleteVertexArray
   */disposeGeometry(t,e){if(!this.managedGeometries[t.id])return;delete this.managedGeometries[t.id];let r=t.glVertexArrayObjects[this.CONTEXT_UID],i=this.gl,s=t.buffers,n=this.renderer?.buffer;if(t.disposeRunner.remove(this),r){if(n)for(let t=0;t<s.length;t++){let r=s[t]._glBuffers[this.CONTEXT_UID];r&&(r.refCount--,0!==r.refCount||e||n.dispose(s[t],e))}if(!e){for(let t in r)if("g"===t[0]){let e=r[t];this._activeVao===e&&this.unbind(),i.deleteVertexArray(e)}}delete t.glVertexArrayObjects[this.CONTEXT_UID]}}/**
   * Dispose all WebGL resources of all managed geometries.
   * @param [contextLost=false] - If context was lost, we suppress `gl.delete` calls
   */disposeAll(t){let e=Object.keys(this.managedGeometries);for(let r=0;r<e.length;r++)this.disposeGeometry(this.managedGeometries[e[r]],t)}/**
   * Activate vertex array object.
   * @param geometry - Geometry instance.
   * @param program - Shader program instance.
   */activateVao(t,e){let r=this.gl,i=this.CONTEXT_UID,s=this.renderer.buffer,n=t.buffers,a=t.attributes;t.indexBuffer&&s.bind(t.indexBuffer);let o=null;for(let t in a){let h=a[t],l=n[h.buffer],u=l._glBuffers[i];if(e.attributeData[t]){o!==u&&(s.bind(l),o=u);let i=e.attributeData[t].location;if(r.enableVertexAttribArray(i),r.vertexAttribPointer(i,h.size,h.type||r.FLOAT,h.normalized,h.stride,h.start),h.instance){if(this.hasInstance)r.vertexAttribDivisor(i,h.divisor);else throw Error("geometry error, GPU Instancing is not supported on this device")}}}}/**
   * Draws the currently bound geometry.
   * @param type - The type primitive to render.
   * @param size - The number of elements to be rendered. If not specified, all vertices after the
   *  starting vertex will be drawn.
   * @param start - The starting vertex in the geometry to start drawing from. If not specified,
   *  drawing will start from the first vertex.
   * @param instanceCount - The number of instances of the set of elements to execute. If not specified,
   *  all instances will be drawn.
   */draw(t,e,r,i){let{gl:s}=this,n=this._activeGeometry;if(n.indexBuffer){let a=n.indexBuffer.data.BYTES_PER_ELEMENT,o=2===a?s.UNSIGNED_SHORT:s.UNSIGNED_INT;2===a||4===a&&this.canUseUInt32ElementIndex?n.instanced?s.drawElementsInstanced(t,e||n.indexBuffer.data.length,o,(r||0)*a,i||1):s.drawElements(t,e||n.indexBuffer.data.length,o,(r||0)*a):console.warn("unsupported index buffer type: uint32")}else n.instanced?s.drawArraysInstanced(t,r,e||n.getSize(),i||1):s.drawArrays(t,r,e||n.getSize());return this}/** Unbind/reset everything. */unbind(){this.gl.bindVertexArray(null),this._activeVao=null,this._activeGeometry=null}destroy(){this.renderer=null}}at.extension={type:sS.RendererSystem,name:"geometry"},sI.add(at);const ae=new s8;class ar{/**
   * @param texture - observed texture
   * @param clampMargin - Changes frame clamping, 0.5 by default. Use -0.5 for extra border.
   */constructor(t,e){this._texture=t,this.mapCoord=new s8,this.uClampFrame=new Float32Array(4),this.uClampOffset=new Float32Array(2),this._textureID=-1,this._updateID=0,this.clampOffset=0,this.clampMargin=typeof e>"u"?.5:e,this.isSimple=!1}/** Texture property. */get texture(){return this._texture}set texture(t){this._texture=t,this._textureID=-1}/**
   * Multiplies uvs array to transform
   * @param uvs - mesh uvs
   * @param [out=uvs] - output
   * @returns - output
   */multiplyUvs(t,e){void 0===e&&(e=t);let r=this.mapCoord;for(let i=0;i<t.length;i+=2){let s=t[i],n=t[i+1];e[i]=s*r.a+n*r.c+r.tx,e[i+1]=s*r.b+n*r.d+r.ty}return e}/**
   * Updates matrices if texture was changed.
   * @param [forceUpdate=false] - if true, matrices will be updated any case
   * @returns - Whether or not it was updated
   */update(t){let e=this._texture;if(!e||!e.valid||!t&&this._textureID===e._updateID)return!1;this._textureID=e._updateID,this._updateID++;let r=e._uvs;this.mapCoord.set(r.x1-r.x0,r.y1-r.y0,r.x3-r.x0,r.y3-r.y0,r.x0,r.y0);let i=e.orig,s=e.trim;s&&(ae.set(i.width/s.width,0,0,i.height/s.height,-s.x/s.width,-s.y/s.height),this.mapCoord.append(ae));let n=e.baseTexture,a=this.uClampFrame,o=this.clampMargin/n.resolution,h=this.clampOffset;return a[0]=(e._frame.x+o+h)/n.width,a[1]=(e._frame.y+o+h)/n.height,a[2]=(e._frame.x+e._frame.width-o+h)/n.width,a[3]=(e._frame.y+e._frame.height-o+h)/n.height,this.uClampOffset[0]=h/n.realWidth,this.uClampOffset[1]=h/n.realHeight,this.isSimple=e._frame.width===n.width&&e._frame.height===n.height&&0===e.rotate,!0}}var ai=`varying vec2 vMaskCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D mask;
uniform float alpha;
uniform float npmAlpha;
uniform vec4 maskClamp;

void main(void)
{
    float clip = step(3.5,
        step(maskClamp.x, vMaskCoord.x) +
        step(maskClamp.y, vMaskCoord.y) +
        step(vMaskCoord.x, maskClamp.z) +
        step(vMaskCoord.y, maskClamp.w));

    vec4 original = texture2D(uSampler, vTextureCoord);
    vec4 masky = texture2D(mask, vMaskCoord);
    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);

    original *= (alphaMul * masky.r * alpha * clip);

    gl_FragColor = original;
}
`,as=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 otherMatrix;

varying vec2 vMaskCoord;
varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;
}
`;class an extends nk{/** @ignore */constructor(t,e,r){let i=null;"string"!=typeof t&&void 0===e&&void 0===r&&(i=t,t=void 0,e=void 0,r=void 0),super(t||as,e||ai,r),this.maskSprite=i,this.maskMatrix=new s8}/**
   * Sprite mask
   * @type {PIXI.DisplayObject}
   */get maskSprite(){return this._maskSprite}set maskSprite(t){this._maskSprite=t,this._maskSprite&&(this._maskSprite.renderable=!1)}/**
   * Applies the filter
   * @param filterManager - The renderer to retrieve the filter from
   * @param input - The input render target.
   * @param output - The target to output to.
   * @param clearMode - Should the output be cleared before rendering to it.
   */apply(t,e,r,i){let s=this._maskSprite,n=s._texture;n.valid&&(n.uvMatrix||(n.uvMatrix=new ar(n,0)),n.uvMatrix.update(),this.uniforms.npmAlpha=n.baseTexture.alphaMode?0:1,this.uniforms.mask=n,this.uniforms.otherMatrix=t.calculateSpriteMatrix(this.maskMatrix,s).prepend(n.uvMatrix.mapCoord),this.uniforms.alpha=s.worldAlpha,this.uniforms.maskClamp=n.uvMatrix.uClampFrame,t.applyFilter(this,e,r,i))}}class aa{/**
   * Create MaskData
   * @param {PIXI.DisplayObject} [maskObject=null] - object that describes the mask
   */constructor(t=null){this.type=tn.NONE,this.autoDetect=!0,this.maskObject=t||null,this.pooled=!1,this.isMaskData=!0,this.resolution=null,this.multisample=nk.defaultMultisample,this.enabled=!0,this.colorMask=15,this._filters=null,this._stencilCounter=0,this._scissorCounter=0,this._scissorRect=null,this._scissorRectLocal=null,this._colorMask=15,this._target=null}/**
   * The sprite mask filter.
   * If set to `null`, the default sprite mask filter is used.
   * @default null
   */get filter(){return this._filters?this._filters[0]:null}set filter(t){t?this._filters?this._filters[0]=t:this._filters=[t]:this._filters=null}/** Resets the mask data after popMask(). */reset(){this.pooled&&(this.maskObject=null,this.type=tn.NONE,this.autoDetect=!0),this._target=null,this._scissorRectLocal=null}/**
   * Copies counters from maskData above, called from pushMask().
   * @param maskAbove
   */copyCountersOrReset(t){t?(this._stencilCounter=t._stencilCounter,this._scissorCounter=t._scissorCounter,this._scissorRect=t._scissorRect):(this._stencilCounter=0,this._scissorCounter=0,this._scissorRect=null)}}class ao{/**
   * @param renderer - The renderer this System works for.
   */constructor(t){this.renderer=t,this.enableScissor=!0,this.alphaMaskPool=[],this.maskDataPool=[],this.maskStack=[],this.alphaMaskIndex=0}/**
   * Changes the mask stack that is used by this System.
   * @param maskStack - The mask stack
   */setMaskStack(t){this.maskStack=t,this.renderer.scissor.setMaskStack(t),this.renderer.stencil.setMaskStack(t)}/**
   * Enables the mask and appends it to the current mask stack.
   *
   * NOTE: The batch renderer should be flushed beforehand to prevent pending renders from being masked.
   * @param {PIXI.DisplayObject} target - Display Object to push the mask to
   * @param {PIXI.MaskData|PIXI.Sprite|PIXI.Graphics|PIXI.DisplayObject} maskDataOrTarget - The masking data.
   */push(t,e){let r=e;if(!r.isMaskData){let t=this.maskDataPool.pop()||new aa;t.pooled=!0,t.maskObject=e,r=t}let i=0!==this.maskStack.length?this.maskStack[this.maskStack.length-1]:null;if(r.copyCountersOrReset(i),r._colorMask=i?i._colorMask:15,r.autoDetect&&this.detect(r),r._target=t,r.type!==tn.SPRITE&&this.maskStack.push(r),r.enabled)switch(r.type){case tn.SCISSOR:this.renderer.scissor.push(r);break;case tn.STENCIL:this.renderer.stencil.push(r);break;case tn.SPRITE:r.copyCountersOrReset(null),this.pushSpriteMask(r);break;case tn.COLOR:this.pushColorMask(r)}r.type===tn.SPRITE&&this.maskStack.push(r)}/**
   * Removes the last mask from the mask stack and doesn't return it.
   *
   * NOTE: The batch renderer should be flushed beforehand to render the masked contents before the mask is removed.
   * @param {PIXI.IMaskTarget} target - Display Object to pop the mask from
   */pop(t){let e=this.maskStack.pop();if(!(!e||e._target!==t)){if(e.enabled)switch(e.type){case tn.SCISSOR:this.renderer.scissor.pop(e);break;case tn.STENCIL:this.renderer.stencil.pop(e.maskObject);break;case tn.SPRITE:this.popSpriteMask(e);break;case tn.COLOR:this.popColorMask(e)}if(e.reset(),e.pooled&&this.maskDataPool.push(e),0!==this.maskStack.length){let t=this.maskStack[this.maskStack.length-1];t.type===tn.SPRITE&&t._filters&&(t._filters[0].maskSprite=t.maskObject)}}}/**
   * Sets type of MaskData based on its maskObject.
   * @param maskData
   */detect(t){let e=t.maskObject;e?e.isSprite?t.type=tn.SPRITE:this.enableScissor&&this.renderer.scissor.testScissor(t)?t.type=tn.SCISSOR:t.type=tn.STENCIL:t.type=tn.COLOR}/**
   * Applies the Mask and adds it to the current filter stack.
   * @param maskData - Sprite to be used as the mask.
   */pushSpriteMask(t){let{maskObject:e}=t,r=t._target,i=t._filters;i||(i=this.alphaMaskPool[this.alphaMaskIndex])||(i=this.alphaMaskPool[this.alphaMaskIndex]=[new an]),i[0].resolution=t.resolution,i[0].multisample=t.multisample,i[0].maskSprite=e;let s=r.filterArea;r.filterArea=e.getBounds(!0),this.renderer.filter.push(r,i),r.filterArea=s,t._filters||this.alphaMaskIndex++}/**
   * Removes the last filter from the filter stack and doesn't return it.
   * @param maskData - Sprite to be used as the mask.
   */popSpriteMask(t){this.renderer.filter.pop(),t._filters?t._filters[0].maskSprite=null:(this.alphaMaskIndex--,this.alphaMaskPool[this.alphaMaskIndex][0].maskSprite=null)}/**
   * Pushes the color mask.
   * @param maskData - The mask data
   */pushColorMask(t){let e=t._colorMask,r=t._colorMask=e&t.colorMask;r!==e&&this.renderer.gl.colorMask((1&r)!=0,(2&r)!=0,(4&r)!=0,(8&r)!=0)}/**
   * Pops the color mask.
   * @param maskData - The mask data
   */popColorMask(t){let e=t._colorMask,r=this.maskStack.length>0?this.maskStack[this.maskStack.length-1]._colorMask:15;r!==e&&this.renderer.gl.colorMask((1&r)!=0,(2&r)!=0,(4&r)!=0,(8&r)!=0)}destroy(){this.renderer=null}}ao.extension={type:sS.RendererSystem,name:"mask"},sI.add(ao);class ah{/**
   * @param renderer - The renderer this System works for.
   */constructor(t){this.renderer=t,this.maskStack=[],this.glConst=0}/** Gets count of masks of certain type. */getStackLength(){return this.maskStack.length}/**
   * Changes the mask stack that is used by this System.
   * @param {PIXI.MaskData[]} maskStack - The mask stack
   */setMaskStack(t){let{gl:e}=this.renderer,r=this.getStackLength();this.maskStack=t;let i=this.getStackLength();i!==r&&(0===i?e.disable(this.glConst):(e.enable(this.glConst),this._useCurrent()))}/**
   * Setup renderer to use the current mask data.
   * @private
   */_useCurrent(){}/** Destroys the mask stack. */destroy(){this.renderer=null,this.maskStack=null}}const al=new s8,au=[],ad=class t extends ah{/**
   * @param {PIXI.Renderer} renderer - The renderer this System works for.
   */constructor(t){super(t),this.glConst=tl.ADAPTER.getWebGLRenderingContext().SCISSOR_TEST}getStackLength(){let t=this.maskStack[this.maskStack.length-1];return t?t._scissorCounter:0}/**
   * evaluates _boundsTransformed, _scissorRect for MaskData
   * @param maskData
   */calcScissorRect(t){if(t._scissorRectLocal)return;let e=t._scissorRect,{maskObject:r}=t,{renderer:i}=this,s=i.renderTexture,n=r.getBounds(!0,au.pop()??new s2);this.roundFrameToPixels(n,s.current?s.current.resolution:i.resolution,s.sourceFrame,s.destinationFrame,i.projection.transform),e&&n.fit(e),t._scissorRectLocal=n}static isMatrixRotated(t){if(!t)return!1;let{a:e,b:r,c:i,d:s}=t;return(Math.abs(r)>1e-4||Math.abs(i)>1e-4)&&(Math.abs(e)>1e-4||Math.abs(s)>1e-4)}/**
   * Test, whether the object can be scissor mask with current renderer projection.
   * Calls "calcScissorRect()" if its true.
   * @param maskData - mask data
   * @returns whether Whether the object can be scissor mask
   */testScissor(e){let{maskObject:r}=e;if(!r.isFastRect||!r.isFastRect()||t.isMatrixRotated(r.worldTransform)||t.isMatrixRotated(this.renderer.projection.transform))return!1;this.calcScissorRect(e);let i=e._scissorRectLocal;return i.width>0&&i.height>0}roundFrameToPixels(e,r,i,s,n){t.isMatrixRotated(n)||((n=n?al.copyFrom(n):al.identity()).translate(-i.x,-i.y).scale(s.width/i.width,s.height/i.height).translate(s.x,s.y),this.renderer.filter.transformAABB(n,e),e.fit(s),e.x=Math.round(e.x*r),e.y=Math.round(e.y*r),e.width=Math.round(e.width*r),e.height=Math.round(e.height*r))}/**
   * Applies the Mask and adds it to the current stencil stack.
   * @author alvin
   * @param maskData - The mask data.
   */push(t){t._scissorRectLocal||this.calcScissorRect(t);let{gl:e}=this.renderer;t._scissorRect||e.enable(e.SCISSOR_TEST),t._scissorCounter++,t._scissorRect=t._scissorRectLocal,this._useCurrent()}/**
   * This should be called after a mask is popped off the mask stack. It will rebind the scissor box to be latest with the
   * last mask in the stack.
   *
   * This can also be called when you directly modify the scissor box and want to restore PixiJS state.
   * @param maskData - The mask data.
   */pop(t){let{gl:e}=this.renderer;t&&au.push(t._scissorRectLocal),this.getStackLength()>0?this._useCurrent():e.disable(e.SCISSOR_TEST)}/**
   * Setup renderer to use the current scissor data.
   * @private
   */_useCurrent(){let t;let e=this.maskStack[this.maskStack.length-1]._scissorRect;t=this.renderer.renderTexture.current?e.y:this.renderer.height-e.height-e.y,this.renderer.gl.scissor(e.x,t,e.width,e.height)}};ad.extension={type:sS.RendererSystem,name:"scissor"},sI.add(ad);class ac extends ah{/**
   * @param renderer - The renderer this System works for.
   */constructor(t){super(t),this.glConst=tl.ADAPTER.getWebGLRenderingContext().STENCIL_TEST}getStackLength(){let t=this.maskStack[this.maskStack.length-1];return t?t._stencilCounter:0}/**
   * Applies the Mask and adds it to the current stencil stack.
   * @param maskData - The mask data
   */push(t){let e=t.maskObject,{gl:r}=this.renderer,i=t._stencilCounter;0===i&&(this.renderer.framebuffer.forceStencil(),r.clearStencil(0),r.clear(r.STENCIL_BUFFER_BIT),r.enable(r.STENCIL_TEST)),t._stencilCounter++;let s=t._colorMask;0!==s&&(t._colorMask=0,r.colorMask(!1,!1,!1,!1)),r.stencilFunc(r.EQUAL,i,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.INCR),e.renderable=!0,e.render(this.renderer),this.renderer.batch.flush(),e.renderable=!1,0!==s&&(t._colorMask=s,r.colorMask((1&s)!=0,(2&s)!=0,(4&s)!=0,(8&s)!=0)),this._useCurrent()}/**
   * Pops stencil mask. MaskData is already removed from stack
   * @param {PIXI.DisplayObject} maskObject - object of popped mask data
   */pop(t){let e=this.renderer.gl;if(0===this.getStackLength())e.disable(e.STENCIL_TEST);else{let r=0!==this.maskStack.length?this.maskStack[this.maskStack.length-1]:null,i=r?r._colorMask:15;0!==i&&(r._colorMask=0,e.colorMask(!1,!1,!1,!1)),e.stencilOp(e.KEEP,e.KEEP,e.DECR),t.renderable=!0,t.render(this.renderer),this.renderer.batch.flush(),t.renderable=!1,0!==i&&(r._colorMask=i,e.colorMask((1&i)!=0,(2&i)!=0,(4&i)!=0,(8&i)!=0)),this._useCurrent()}}/**
   * Setup renderer to use the current stencil data.
   * @private
   */_useCurrent(){let t=this.renderer.gl;t.stencilFunc(t.EQUAL,this.getStackLength(),4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP)}}ac.extension={type:sS.RendererSystem,name:"stencil"},sI.add(ac);class ap{constructor(t){this.renderer=t,this.plugins={},Object.defineProperties(this.plugins,{extract:{enumerable:!1,get:()=>(ig("7.0.0","renderer.plugins.extract has moved to renderer.extract"),t.extract)},prepare:{enumerable:!1,get:()=>(ig("7.0.0","renderer.plugins.prepare has moved to renderer.prepare"),t.prepare)},interaction:{enumerable:!1,get:()=>(ig("7.0.0","renderer.plugins.interaction has been deprecated, use renderer.events"),t.events)}})}/**
   * Initialize the plugins.
   * @protected
   */init(){let t=this.rendererPlugins;for(let e in t)this.plugins[e]=new t[e](this.renderer)}destroy(){for(let t in this.plugins)this.plugins[t].destroy(),this.plugins[t]=null}}ap.extension={type:[sS.RendererSystem,sS.CanvasRendererSystem],name:"_plugin"},sI.add(ap);class af{/** @param renderer - The renderer this System works for. */constructor(t){this.renderer=t,this.destinationFrame=null,this.sourceFrame=null,this.defaultFrame=null,this.projectionMatrix=new s8,this.transform=null}/**
   * Updates the projection-matrix based on the sourceFrame → destinationFrame mapping provided.
   *
   * NOTE: It is expected you call `renderer.framebuffer.setViewport(destinationFrame)` after this. This is because
   * the framebuffer viewport converts shader vertex output in normalized device coordinates to window coordinates.
   *
   * NOTE-2: {@link PIXI.RenderTextureSystem#bind} updates the projection-matrix when you bind a render-texture.
   * It is expected
   * that you dirty the current bindings when calling this manually.
   * @param destinationFrame - The rectangle in the render-target to render the contents into. If rendering to the canvas,
   *  the origin is on the top-left; if rendering to a render-texture, the origin is on the bottom-left.
   * @param sourceFrame - The rectangle in world space that contains the contents being rendered.
   * @param resolution - The resolution of the render-target, which is the ratio of
   *  world-space (or CSS) pixels to physical pixels.
   * @param root - Whether the render-target is the screen. This is required because rendering to textures
   *  is y-flipped (i.e. upside down relative to the screen).
   */update(t,e,r,i){this.destinationFrame=t||this.destinationFrame||this.defaultFrame,this.sourceFrame=e||this.sourceFrame||t,this.calculateProjection(this.destinationFrame,this.sourceFrame,r,i),this.transform&&this.projectionMatrix.append(this.transform);let s=this.renderer;s.globalUniforms.uniforms.projectionMatrix=this.projectionMatrix,s.globalUniforms.update(),s.shader.shader&&s.shader.syncUniformGroup(s.shader.shader.uniforms.globals)}/**
   * Calculates the `projectionMatrix` to map points inside `sourceFrame` to inside `destinationFrame`.
   * @param _destinationFrame - The destination frame in the render-target.
   * @param sourceFrame - The source frame in world space.
   * @param _resolution - The render-target's resolution, i.e. ratio of CSS to physical pixels.
   * @param root - Whether rendering into the screen. Otherwise, if rendering to a framebuffer, the projection
   *  is y-flipped.
   */calculateProjection(t,e,r,i){let s=this.projectionMatrix,n=i?-1:1;s.identity(),s.a=1/e.width*2,s.d=n*(1/e.height*2),s.tx=-1-e.x*s.a,s.ty=-n-e.y*s.d}/**
   * Sets the transform of the active render target to the given matrix.
   * @param _matrix - The transformation matrix
   */setTransform(t){}destroy(){this.renderer=null}}af.extension={type:sS.RendererSystem,name:"projection"},sI.add(af);const am=new no,ag=new s2;class a_{constructor(t){this.renderer=t,this._tempMatrix=new s8}/**
   * A Useful function that returns a texture of the display object that can then be used to create sprites
   * This can be quite useful if your displayObject is complicated and needs to be reused multiple times.
   * @param displayObject - The displayObject the object will be generated from.
   * @param {IGenerateTextureOptions} options - Generate texture options.
   * @param {PIXI.Rectangle} options.region - The region of the displayObject, that shall be rendered,
   *        if no region is specified, defaults to the local bounds of the displayObject.
   * @param {number} [options.resolution] - If not given, the renderer's resolution is used.
   * @param {PIXI.MSAA_QUALITY} [options.multisample] - If not given, the renderer's multisample is used.
   * @returns a shiny new texture of the display object passed in
   */generateTexture(t,e){let{region:r,...i}=e||{},s=r?.copyTo(ag)||t.getLocalBounds(ag,!0),n=i.resolution||this.renderer.resolution;s.width=Math.max(s.width,1/n),s.height=Math.max(s.height,1/n),i.width=s.width,i.height=s.height,i.resolution=n,i.multisample??(i.multisample=this.renderer.multisample);let a=nQ.create(i);this._tempMatrix.tx=-s.x,this._tempMatrix.ty=-s.y;let o=t.transform;return t.transform=am,this.renderer.render(t,{renderTexture:a,transform:this._tempMatrix,skipUpdateTransform:!!t.parent,blit:!0}),t.transform=o,a}destroy(){}}a_.extension={type:[sS.RendererSystem,sS.CanvasRendererSystem],name:"textureGenerator"},sI.add(a_);const ay=new s2,av=new s2;class ax{/**
   * @param renderer - The renderer this System works for.
   */constructor(t){this.renderer=t,this.defaultMaskStack=[],this.current=null,this.sourceFrame=new s2,this.destinationFrame=new s2,this.viewportFrame=new s2}contextChange(){let t=this.renderer?.gl.getContextAttributes();this._rendererPremultipliedAlpha=!!(t&&t.alpha&&t.premultipliedAlpha)}/**
   * Bind the current render texture.
   * @param renderTexture - RenderTexture to bind, by default its `null` - the screen.
   * @param sourceFrame - Part of world that is mapped to the renderTexture.
   * @param destinationFrame - Part of renderTexture, by default it has the same size as sourceFrame.
   */bind(t=null,e,r){let i,s,n;let a=this.renderer;this.current=t,t?(n=(i=t.baseTexture).resolution,e||(ay.width=t.frame.width,ay.height=t.frame.height,e=ay),r||(av.x=t.frame.x,av.y=t.frame.y,av.width=e.width,av.height=e.height,r=av),s=i.framebuffer):(n=a.resolution,e||(ay.width=a._view.screen.width,ay.height=a._view.screen.height,e=ay),r||((r=ay).width=e.width,r.height=e.height));let o=this.viewportFrame;o.x=r.x*n,o.y=r.y*n,o.width=r.width*n,o.height=r.height*n,t||(o.y=a.view.height-(o.y+o.height)),o.ceil(),this.renderer.framebuffer.bind(s,o),this.renderer.projection.update(r,e,n,!s),t?this.renderer.mask.setMaskStack(i.maskStack):this.renderer.mask.setMaskStack(this.defaultMaskStack),this.sourceFrame.copyFrom(e),this.destinationFrame.copyFrom(r)}/**
   * Erases the render texture and fills the drawing area with a colour.
   * @param clearColor - The color as rgba, default to use the renderer backgroundColor
   * @param [mask=BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH] - Bitwise OR of masks
   *  that indicate the buffers to be cleared, by default COLOR and DEPTH buffers.
   */clear(t,e){let r=this.current?this.current.baseTexture.clear:this.renderer.background.backgroundColor,i=iQ.shared.setValue(t||r);(this.current&&this.current.baseTexture.alphaMode>0||!this.current&&this._rendererPremultipliedAlpha)&&i.premultiply(i.alpha);let s=this.destinationFrame,n=this.current?this.current.baseTexture:this.renderer._view.screen,a=s.width!==n.width||s.height!==n.height;if(a){let{x:t,y:e,width:r,height:i}=this.viewportFrame;t=Math.round(t),e=Math.round(e),r=Math.round(r),i=Math.round(i),this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST),this.renderer.gl.scissor(t,e,r,i)}this.renderer.framebuffer.clear(i.red,i.green,i.blue,i.alpha,e),a&&this.renderer.scissor.pop()}resize(){this.bind(null)}/** Resets render-texture state. */reset(){this.bind(null)}destroy(){this.renderer=null}}ax.extension={type:sS.RendererSystem,name:"renderTexture"},sI.add(ax);class ab{/**
   * Makes a new Pixi program.
   * @param program - webgl program
   * @param uniformData - uniforms
   */constructor(t,e){this.program=t,this.uniformData=e,this.uniformGroups={},this.uniformDirtyGroups={},this.uniformBufferBindings={}}/** Destroys this program. */destroy(){this.uniformData=null,this.uniformGroups=null,this.uniformDirtyGroups=null,this.uniformBufferBindings=null,this.program=null}}function aE(t,e,r,i,s){r.buffer.update(s)}const aT={float:`
        data[offset] = v;
    `,vec2:`
        data[offset] = v[0];
        data[offset+1] = v[1];
    `,vec3:`
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

    `,vec4:`
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];
        data[offset+3] = v[3];
    `,mat2:`
        data[offset] = v[0];
        data[offset+1] = v[1];

        data[offset+4] = v[2];
        data[offset+5] = v[3];
    `,mat3:`
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];

        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];
    `,mat4:`
        for(var i = 0; i < 16; i++)
        {
            data[offset + i] = v[i];
        }
    `},aA={float:4,vec2:8,vec3:12,vec4:16,int:4,ivec2:8,ivec3:12,ivec4:16,uint:4,uvec2:8,uvec3:12,uvec4:16,bool:4,bvec2:8,bvec3:12,bvec4:16,mat2:32,mat3:48,mat4:64};let aS=0;const aw={textureCount:0,uboCount:0};class aR{/** @param renderer - The renderer this System works for. */constructor(t){this.destroyed=!1,this.renderer=t,this.systemCheck(),this.gl=null,this.shader=null,this.program=null,this.cache={},this._uboCache={},this.id=aS++}/**
   * Overrideable function by `@pixi/unsafe-eval` to silence
   * throwing an error if platform doesn't support unsafe-evals.
   * @private
   */systemCheck(){if(!function(){if("boolean"==typeof i)return i;try{i=!0===Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")}catch{i=!1}return i}())throw Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.")}contextChange(t){this.gl=t,this.reset()}/**
   * Changes the current shader to the one given in parameter.
   * @param shader - the new shader
   * @param dontSync - false if the shader should automatically sync its uniforms.
   * @returns the glProgram that belongs to the shader.
   */bind(t,e){t.disposeRunner.add(this),t.uniforms.globals=this.renderer.globalUniforms;let r=t.program,i=r.glPrograms[this.renderer.CONTEXT_UID]||this.generateProgram(t);return this.shader=t,this.program!==r&&(this.program=r,this.gl.useProgram(i.program)),e||(aw.textureCount=0,aw.uboCount=0,this.syncUniformGroup(t.uniformGroup,aw)),i}/**
   * Uploads the uniforms values to the currently bound shader.
   * @param uniforms - the uniforms values that be applied to the current shader
   */setUniforms(t){let e=this.shader.program,r=e.glPrograms[this.renderer.CONTEXT_UID];e.syncUniforms(r.uniformData,t,this.renderer)}/* eslint-disable @typescript-eslint/explicit-module-boundary-types *//**
   * Syncs uniforms on the group
   * @param group - the uniform group to sync
   * @param syncData - this is data that is passed to the sync function and any nested sync functions
   */syncUniformGroup(t,e){let r=this.getGlProgram();t.static&&t.dirtyId===r.uniformDirtyGroups[t.id]||(r.uniformDirtyGroups[t.id]=t.dirtyId,this.syncUniforms(t,r,e))}/**
   * Overrideable by the @pixi/unsafe-eval package to use static syncUniforms instead.
   * @param group
   * @param glProgram
   * @param syncData
   */syncUniforms(t,e,r){(t.syncUniforms[this.shader.program.id]||this.createSyncGroups(t))(e.uniformData,t.uniforms,this.renderer,r)}createSyncGroups(t){let e=this.getSignature(t,this.shader.program.uniformData,"u");return this.cache[e]||(this.cache[e]=function(t,e){let r=[`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];for(let i in t.uniforms){let s=e[i];if(!s){t.uniforms[i]?.group===!0&&(t.uniforms[i].ubo?r.push(`
                        renderer.shader.syncUniformBufferGroup(uv.${i}, '${i}');
                    `):r.push(`
                        renderer.shader.syncUniformGroup(uv.${i}, syncData);
                    `));continue}let n=t.uniforms[i],a=!1;for(let t=0;t<np.length;t++)if(np[t].test(s,n)){r.push(np[t].code(i,n)),a=!0;break}if(!a){let t=(1!==s.size||s.isArray?nm:nf)[s.type].replace("location",`ud["${i}"].location`);r.push(`
            cu = ud["${i}"];
            cv = cu.value;
            v = uv["${i}"];
            ${t};`)}}return Function("ud","uv","renderer","syncData",r.join(`
`))}(t,this.shader.program.uniformData)),t.syncUniforms[this.shader.program.id]=this.cache[e],t.syncUniforms[this.shader.program.id]}/**
   * Syncs uniform buffers
   * @param group - the uniform buffer group to sync
   * @param name - the name of the uniform buffer
   */syncUniformBufferGroup(t,e){let r=this.getGlProgram();if(!t.static||0!==t.dirtyId||!r.uniformGroups[t.id]){t.dirtyId=0;let i=r.uniformGroups[t.id]||this.createSyncBufferGroup(t,r,e);t.buffer.update(),i(r.uniformData,t.uniforms,this.renderer,aw,t.buffer)}this.renderer.buffer.bindBufferBase(t.buffer,r.uniformBufferBindings[e])}/**
   * Will create a function that uploads a uniform buffer using the STD140 standard.
   * The upload function will then be cached for future calls
   * If a group is manually managed, then a simple upload function is generated
   * @param group - the uniform buffer group to sync
   * @param glProgram - the gl program to attach the uniform bindings to
   * @param name - the name of the uniform buffer (must exist on the shader)
   */createSyncBufferGroup(t,e,r){let{gl:i}=this.renderer;this.renderer.buffer.bind(t.buffer);let s=this.gl.getUniformBlockIndex(e.program,r);e.uniformBufferBindings[r]=this.shader.uniformBindCount,i.uniformBlockBinding(e.program,s,this.shader.uniformBindCount),this.shader.uniformBindCount++;let n=this.getSignature(t,this.shader.program.uniformData,"ubo"),a=this._uboCache[n];if(a||(a=this._uboCache[n]=function(t,e){if(!t.autoManage)return{size:0,syncFunc:aE};let r=function(t,e){let r=[];for(let i in t)e[i]&&r.push(e[i]);return r.sort((t,e)=>t.index-e.index),r}(t.uniforms,e),{uboElements:i,size:s}=function(t){let e=t.map(t=>({data:t,offset:0,dataLen:0,dirty:0})),r=0,i=0,s=0;for(let t=0;t<e.length;t++){let n=e[t];if(r=aA[n.data.type],n.data.size>1&&(r=Math.max(r,16)*n.data.size),n.dataLen=r,i%r!=0&&i<16){let t=i%r%16;i+=t,s+=t}i+r>16?(s=16*Math.ceil(s/16),n.offset=s,s+=r,i=r):(n.offset=s,i+=r,s+=r)}return{uboElements:e,size:s=16*Math.ceil(s/16)}}(r),n=[`
    var v = null;
    var v2 = null;
    var cv = null;
    var t = 0;
    var gl = renderer.gl
    var index = 0;
    var data = buffer.data;
    `];for(let e=0;e<i.length;e++){let r=i[e],s=t.uniforms[r.data.name],a=r.data.name,o=!1;for(let t=0;t<np.length;t++){let e=np[t];if(e.codeUbo&&e.test(r.data,s)){n.push(`offset = ${r.offset/4};`,np[t].codeUbo(r.data.name,s)),o=!0;break}}if(!o){if(r.data.size>1){let t=nv[r.data.type],e=Math.max(aA[r.data.type]/16,1),i=t/e,s=(4-i%4)%4;n.push(`
                cv = ud.${a}.value;
                v = uv.${a};
                offset = ${r.offset/4};

                t = 0;

                for(var i=0; i < ${r.data.size*e}; i++)
                {
                    for(var j = 0; j < ${i}; j++)
                    {
                        data[offset++] = v[t++];
                    }
                    offset += ${s};
                }

                `)}else{let t=aT[r.data.type];n.push(`
                cv = ud.${a}.value;
                v = uv.${a};
                offset = ${r.offset/4};
                ${t};
                `)}}}return n.push(`
       renderer.buffer.update(buffer);
    `),{size:s,// eslint-disable-next-line no-new-func
syncFunc:Function("ud","uv","renderer","syncData","buffer",n.join(`
`))}}(t,this.shader.program.uniformData)),t.autoManage){let e=new Float32Array(a.size/4);t.buffer.update(e)}return e.uniformGroups[t.id]=a.syncFunc,e.uniformGroups[t.id]}/**
   * Takes a uniform group and data and generates a unique signature for them.
   * @param group - The uniform group to get signature of
   * @param group.uniforms
   * @param uniformData - Uniform information generated by the shader
   * @param preFix
   * @returns Unique signature of the uniform group
   */getSignature(t,e,r){let i=t.uniforms,s=[`${r}-`];for(let t in i)s.push(t),e[t]&&s.push(e[t].type);return s.join("-")}/**
   * Returns the underlying GLShade rof the currently bound shader.
   *
   * This can be handy for when you to have a little more control over the setting of your uniforms.
   * @returns The glProgram for the currently bound Shader for this context
   */getGlProgram(){return this.shader?this.shader.program.glPrograms[this.renderer.CONTEXT_UID]:null}/**
   * Generates a glProgram version of the Shader provided.
   * @param shader - The shader that the glProgram will be based on.
   * @returns A shiny new glProgram!
   */generateProgram(t){let e=this.gl,r=t.program,i=function(t,e){let r=nu(t,t.VERTEX_SHADER,e.vertexSrc),i=nu(t,t.FRAGMENT_SHADER,e.fragmentSrc),s=t.createProgram();t.attachShader(s,r),t.attachShader(s,i);let n=e.extra?.transformFeedbackVaryings;if(n&&("function"!=typeof t.transformFeedbackVaryings?console.warn("TransformFeedback is not supported but TransformFeedbackVaryings are given."):t.transformFeedbackVaryings(s,n.names,"separate"===n.bufferMode?t.SEPARATE_ATTRIBS:t.INTERLEAVED_ATTRIBS)),t.linkProgram(s),t.getProgramParameter(s,t.LINK_STATUS)||t.getProgramParameter(s,t.LINK_STATUS)||(t.getShaderParameter(r,t.COMPILE_STATUS)||ny(t,r),t.getShaderParameter(i,t.COMPILE_STATUS)||ny(t,i),console.error("PixiJS Error: Could not initialize shader."),""!==t.getProgramInfoLog(s)&&console.warn("PixiJS Warning: gl.getProgramInfoLog()",t.getProgramInfoLog(s))),e.attributeData=function(t,e){let r={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let i=e.getActiveAttrib(t,s);if(i.name.startsWith("gl_"))continue;let n=nE(e,i.type),a={type:n,name:i.name,size:nv[n],location:e.getAttribLocation(t,i.name)};r[i.name]=a}return r}(s,t),e.uniformData=function(t,e){let r={},i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;s++){let i=e.getActiveUniform(t,s),n=i.name.replace(/\[.*?\]$/,""),a=!!i.name.match(/\[.*?\]$/),o=nE(e,i.type);r[n]={name:n,index:s,type:o,size:i.size,isArray:a,value:nc(o,i.size)}}return r}(s,t),!/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(e.vertexSrc)){let r=Object.keys(e.attributeData);r.sort((t,e)=>t>e?1:-1);for(let i=0;i<r.length;i++)e.attributeData[r[i]].location=i,t.bindAttribLocation(s,i,r[i]);t.linkProgram(s)}t.deleteShader(r),t.deleteShader(i);let a={};for(let r in e.uniformData){let i=e.uniformData[r];a[r]={location:t.getUniformLocation(s,r),value:nc(i.type,i.size)}}return new ab(s,a)}(e,r);return r.glPrograms[this.renderer.CONTEXT_UID]=i,i}/** Resets ShaderSystem state, does not affect WebGL state. */reset(){this.program=null,this.shader=null}/**
   * Disposes shader.
   * If disposing one equals with current shader, set current as null.
   * @param shader - Shader object
   */disposeShader(t){this.shader===t&&(this.shader=null)}/** Destroys this System and removes all its textures. */destroy(){this.renderer=null,this.destroyed=!0}}aR.extension={type:sS.RendererSystem,name:"shader"},sI.add(aR);class aI{constructor(t){this.renderer=t}/**
   * It all starts here! This initiates every system, passing in the options for any system by name.
   * @param options - the config for the renderer and all its systems
   */run(t){let{renderer:e}=this;e.runners.init.emit(e.options),t.hello&&console.log(`PixiJS 7.3.1 - ${e.rendererLogId} - https://pixijs.com`),e.resize(e.screen.width,e.screen.height)}destroy(){}}aI.defaultOptions={/**
   * {@link PIXI.IRendererOptions.hello}
   * @default false
   * @memberof PIXI.settings.RENDER_OPTIONS
   */hello:!1},/** @ignore */aI.extension={type:[sS.RendererSystem,sS.CanvasRendererSystem],name:"startup"},sI.add(aI);const aC=class t{constructor(){this.gl=null,this.stateId=0,this.polygonOffset=0,this.blendMode=W.NONE,this._blendEq=!1,this.map=[],this.map[0]=this.setBlend,this.map[1]=this.setOffset,this.map[2]=this.setCullFace,this.map[3]=this.setDepthTest,this.map[4]=this.setFrontFace,this.map[5]=this.setDepthMask,this.checks=[],this.defaultState=new sM,this.defaultState.blend=!0}contextChange(t){this.gl=t,this.blendModes=function(t,e=[]){return e[W.NORMAL]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[W.ADD]=[t.ONE,t.ONE],e[W.MULTIPLY]=[t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA],e[W.SCREEN]=[t.ONE,t.ONE_MINUS_SRC_COLOR,t.ONE,t.ONE_MINUS_SRC_ALPHA],e[W.OVERLAY]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[W.DARKEN]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[W.LIGHTEN]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[W.COLOR_DODGE]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[W.COLOR_BURN]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[W.HARD_LIGHT]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[W.SOFT_LIGHT]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[W.DIFFERENCE]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[W.EXCLUSION]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[W.HUE]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[W.SATURATION]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[W.COLOR]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[W.LUMINOSITY]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[W.NONE]=[0,0],e[W.NORMAL_NPM]=[t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA],e[W.ADD_NPM]=[t.SRC_ALPHA,t.ONE,t.ONE,t.ONE],e[W.SCREEN_NPM]=[t.SRC_ALPHA,t.ONE_MINUS_SRC_COLOR,t.ONE,t.ONE_MINUS_SRC_ALPHA],e[W.SRC_IN]=[t.DST_ALPHA,t.ZERO],e[W.SRC_OUT]=[t.ONE_MINUS_DST_ALPHA,t.ZERO],e[W.SRC_ATOP]=[t.DST_ALPHA,t.ONE_MINUS_SRC_ALPHA],e[W.DST_OVER]=[t.ONE_MINUS_DST_ALPHA,t.ONE],e[W.DST_IN]=[t.ZERO,t.SRC_ALPHA],e[W.DST_OUT]=[t.ZERO,t.ONE_MINUS_SRC_ALPHA],e[W.DST_ATOP]=[t.ONE_MINUS_DST_ALPHA,t.SRC_ALPHA],e[W.XOR]=[t.ONE_MINUS_DST_ALPHA,t.ONE_MINUS_SRC_ALPHA],e[W.SUBTRACT]=[t.ONE,t.ONE,t.ONE,t.ONE,t.FUNC_REVERSE_SUBTRACT,t.FUNC_ADD],e}(t),this.set(this.defaultState),this.reset()}/**
   * Sets the current state
   * @param {*} state - The state to set.
   */set(t){if(t=t||this.defaultState,this.stateId!==t.data){let e=this.stateId^t.data,r=0;for(;e;)1&e&&this.map[r].call(this,!!(t.data&1<<r)),e>>=1,r++;this.stateId=t.data}for(let e=0;e<this.checks.length;e++)this.checks[e](this,t)}/**
   * Sets the state, when previous state is unknown.
   * @param {*} state - The state to set
   */forceState(t){t=t||this.defaultState;for(let e=0;e<this.map.length;e++)this.map[e].call(this,!!(t.data&1<<e));for(let e=0;e<this.checks.length;e++)this.checks[e](this,t);this.stateId=t.data}/**
   * Sets whether to enable or disable blending.
   * @param value - Turn on or off WebGl blending.
   */setBlend(e){this.updateCheck(t.checkBlendMode,e),this.gl[e?"enable":"disable"](this.gl.BLEND)}/**
   * Sets whether to enable or disable polygon offset fill.
   * @param value - Turn on or off webgl polygon offset testing.
   */setOffset(e){this.updateCheck(t.checkPolygonOffset,e),this.gl[e?"enable":"disable"](this.gl.POLYGON_OFFSET_FILL)}/**
   * Sets whether to enable or disable depth test.
   * @param value - Turn on or off webgl depth testing.
   */setDepthTest(t){this.gl[t?"enable":"disable"](this.gl.DEPTH_TEST)}/**
   * Sets whether to enable or disable depth mask.
   * @param value - Turn on or off webgl depth mask.
   */setDepthMask(t){this.gl.depthMask(t)}/**
   * Sets whether to enable or disable cull face.
   * @param {boolean} value - Turn on or off webgl cull face.
   */setCullFace(t){this.gl[t?"enable":"disable"](this.gl.CULL_FACE)}/**
   * Sets the gl front face.
   * @param {boolean} value - true is clockwise and false is counter-clockwise
   */setFrontFace(t){this.gl.frontFace(this.gl[t?"CW":"CCW"])}/**
   * Sets the blend mode.
   * @param {number} value - The blend mode to set to.
   */setBlendMode(t){if(t===this.blendMode)return;this.blendMode=t;let e=this.blendModes[t],r=this.gl;2===e.length?r.blendFunc(e[0],e[1]):r.blendFuncSeparate(e[0],e[1],e[2],e[3]),6===e.length?(this._blendEq=!0,r.blendEquationSeparate(e[4],e[5])):this._blendEq&&(this._blendEq=!1,r.blendEquationSeparate(r.FUNC_ADD,r.FUNC_ADD))}/**
   * Sets the polygon offset.
   * @param {number} value - the polygon offset
   * @param {number} scale - the polygon offset scale
   */setPolygonOffset(t,e){this.gl.polygonOffset(t,e)}// used
/** Resets all the logic and disables the VAOs. */reset(){this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this.forceState(this.defaultState),this._blendEq=!0,this.blendMode=-1,this.setBlendMode(0)}/**
   * Checks to see which updates should be checked based on which settings have been activated.
   *
   * For example, if blend is enabled then we should check the blend modes each time the state is changed
   * or if polygon fill is activated then we need to check if the polygon offset changes.
   * The idea is that we only check what we have too.
   * @param func - the checking function to add or remove
   * @param value - should the check function be added or removed.
   */updateCheck(t,e){let r=this.checks.indexOf(t);e&&-1===r?this.checks.push(t):e||-1===r||this.checks.splice(r,1)}/**
   * A private little wrapper function that we call to check the blend mode.
   * @param system - the System to perform the state check on
   * @param state - the state that the blendMode will pulled from
   */static checkBlendMode(t,e){t.setBlendMode(e.blendMode)}/**
   * A private little wrapper function that we call to check the polygon offset.
   * @param system - the System to perform the state check on
   * @param state - the state that the blendMode will pulled from
   */static checkPolygonOffset(t,e){t.setPolygonOffset(1,e.polygonOffset)}/**
   * @ignore
   */destroy(){this.gl=null}};aC.extension={type:sS.RendererSystem,name:"state"},sI.add(aC);class aP extends /*@__PURE__*/U(tP){constructor(){super(...arguments),this.runners={},this._systemsHash={}}/**
   * Set up a system with a collection of SystemClasses and runners.
   * Systems are attached dynamically to this class when added.
   * @param config - the config for the system manager
   */setup(t){this.addRunners(...t.runners);let e=(t.priority??[]).filter(e=>t.systems[e]),r=[...e,...Object.keys(t.systems).filter(t=>!e.includes(t))];for(let e of r)this.addSystem(t.systems[e],e)}/**
   * Create a bunch of runners based of a collection of ids
   * @param runnerIds - the runner ids to add
   */addRunners(...t){t.forEach(t=>{this.runners[t]=new sB(t)})}/**
   * Add a new system to the renderer.
   * @param ClassRef - Class reference
   * @param name - Property name for system, if not specified
   *        will use a static `name` property on the class itself. This
   *        name will be assigned as s property on the Renderer so make
   *        sure it doesn't collide with properties on Renderer.
   * @returns Return instance of renderer
   */addSystem(t,e){let r=new t(this);if(this[e])throw Error(`Whoops! The name "${e}" is already in use`);for(let t in this[e]=r,this._systemsHash[e]=r,this.runners)this.runners[t].add(r);return this}/**
   * A function that will run a runner and call the runners function but pass in different options
   * to each system based on there name.
   *
   * E.g. If you have two systems added called `systemA` and `systemB` you could call do the following:
   *
   * ```js
   * system.emitWithCustomOptions(init, {
   *     systemA: {...optionsForA},
   *     systemB: {...optionsForB},
   * });
   * ```
   *
   * `init` would be called on system A passing `optionsForA` and on system B passing `optionsForB`.
   * @param runner - the runner to target
   * @param options - key value options for each system
   */emitWithCustomOptions(t,e){let r=Object.keys(this._systemsHash);t.items.forEach(i=>{let s=r.find(t=>this._systemsHash[t]===i);i[t.name](e[s])})}/** destroy the all runners and systems. Its apps job to */destroy(){Object.values(this.runners).forEach(t=>{t.destroy()}),this._systemsHash={}}}const aM=class t{/** @param renderer - The renderer this System works for. */constructor(e){this.renderer=e,this.count=0,this.checkCount=0,this.maxIdle=t.defaultMaxIdle,this.checkCountMax=t.defaultCheckCountMax,this.mode=t.defaultMode}/**
   * Checks to see when the last time a texture was used.
   * If the texture has not been used for a specified amount of time, it will be removed from the GPU.
   */postrender(){this.renderer.objectRenderer.renderingToScreen&&(this.count++,this.mode!==ti.MANUAL&&(this.checkCount++,this.checkCount>this.checkCountMax&&(this.checkCount=0,this.run())))}/**
   * Checks to see when the last time a texture was used.
   * If the texture has not been used for a specified amount of time, it will be removed from the GPU.
   */run(){let t=this.renderer.texture,e=t.managedTextures,r=!1;for(let i=0;i<e.length;i++){let s=e[i];s.resource&&this.count-s.touched>this.maxIdle&&(t.destroyTexture(s,!0),e[i]=null,r=!0)}if(r){let t=0;for(let r=0;r<e.length;r++)null!==e[r]&&(e[t++]=e[r]);e.length=t}}/**
   * Removes all the textures within the specified displayObject and its children from the GPU.
   * @param {PIXI.DisplayObject} displayObject - the displayObject to remove the textures from.
   */unload(t){let e=this.renderer.texture,r=t._texture;r&&!r.framebuffer&&e.destroyTexture(r);for(let e=t.children.length-1;e>=0;e--)this.unload(t.children[e])}destroy(){this.renderer=null}};aM.defaultMode=ti.AUTO,/**
* Default maximum idle frames before a texture is destroyed by garbage collection.
* @static
* @default 3600
* @see PIXI.TextureGCSystem#maxIdle
*/aM.defaultMaxIdle=3600,/**
* Default frames between two garbage collections.
* @static
* @default 600
* @see PIXI.TextureGCSystem#checkCountMax
*/aM.defaultCheckCountMax=600,/** @ignore */aM.extension={type:sS.RendererSystem,name:"textureGC"},sI.add(aM);class aD{constructor(t){this.texture=t,this.width=-1,this.height=-1,this.dirtyId=-1,this.dirtyStyleId=-1,this.mipmap=!1,this.wrapMode=33071,this.type=K.UNSIGNED_BYTE,this.internalFormat=Y.RGBA,this.samplerType=0}}class aO{/**
   * @param renderer - The renderer this system works for.
   */constructor(t){this.renderer=t,this.boundTextures=[],this.currentLocation=-1,this.managedTextures=[],this._unknownBoundTextures=!1,this.unknownTexture=new sk,this.hasIntegerTextures=!1}/** Sets up the renderer context and necessary buffers. */contextChange(){let t=this.gl=this.renderer.gl;this.CONTEXT_UID=this.renderer.CONTEXT_UID,this.webGLVersion=this.renderer.context.webGLVersion,this.internalFormats="WebGL2RenderingContext"in globalThis&&t instanceof globalThis.WebGL2RenderingContext?{[K.UNSIGNED_BYTE]:{[Y.RGBA]:t.RGBA8,[Y.RGB]:t.RGB8,[Y.RG]:t.RG8,[Y.RED]:t.R8,[Y.RGBA_INTEGER]:t.RGBA8UI,[Y.RGB_INTEGER]:t.RGB8UI,[Y.RG_INTEGER]:t.RG8UI,[Y.RED_INTEGER]:t.R8UI,[Y.ALPHA]:t.ALPHA,[Y.LUMINANCE]:t.LUMINANCE,[Y.LUMINANCE_ALPHA]:t.LUMINANCE_ALPHA},[K.BYTE]:{[Y.RGBA]:t.RGBA8_SNORM,[Y.RGB]:t.RGB8_SNORM,[Y.RG]:t.RG8_SNORM,[Y.RED]:t.R8_SNORM,[Y.RGBA_INTEGER]:t.RGBA8I,[Y.RGB_INTEGER]:t.RGB8I,[Y.RG_INTEGER]:t.RG8I,[Y.RED_INTEGER]:t.R8I},[K.UNSIGNED_SHORT]:{[Y.RGBA_INTEGER]:t.RGBA16UI,[Y.RGB_INTEGER]:t.RGB16UI,[Y.RG_INTEGER]:t.RG16UI,[Y.RED_INTEGER]:t.R16UI,[Y.DEPTH_COMPONENT]:t.DEPTH_COMPONENT16},[K.SHORT]:{[Y.RGBA_INTEGER]:t.RGBA16I,[Y.RGB_INTEGER]:t.RGB16I,[Y.RG_INTEGER]:t.RG16I,[Y.RED_INTEGER]:t.R16I},[K.UNSIGNED_INT]:{[Y.RGBA_INTEGER]:t.RGBA32UI,[Y.RGB_INTEGER]:t.RGB32UI,[Y.RG_INTEGER]:t.RG32UI,[Y.RED_INTEGER]:t.R32UI,[Y.DEPTH_COMPONENT]:t.DEPTH_COMPONENT24},[K.INT]:{[Y.RGBA_INTEGER]:t.RGBA32I,[Y.RGB_INTEGER]:t.RGB32I,[Y.RG_INTEGER]:t.RG32I,[Y.RED_INTEGER]:t.R32I},[K.FLOAT]:{[Y.RGBA]:t.RGBA32F,[Y.RGB]:t.RGB32F,[Y.RG]:t.RG32F,[Y.RED]:t.R32F,[Y.DEPTH_COMPONENT]:t.DEPTH_COMPONENT32F},[K.HALF_FLOAT]:{[Y.RGBA]:t.RGBA16F,[Y.RGB]:t.RGB16F,[Y.RG]:t.RG16F,[Y.RED]:t.R16F},[K.UNSIGNED_SHORT_5_6_5]:{[Y.RGB]:t.RGB565},[K.UNSIGNED_SHORT_4_4_4_4]:{[Y.RGBA]:t.RGBA4},[K.UNSIGNED_SHORT_5_5_5_1]:{[Y.RGBA]:t.RGB5_A1},[K.UNSIGNED_INT_2_10_10_10_REV]:{[Y.RGBA]:t.RGB10_A2,[Y.RGBA_INTEGER]:t.RGB10_A2UI},[K.UNSIGNED_INT_10F_11F_11F_REV]:{[Y.RGB]:t.R11F_G11F_B10F},[K.UNSIGNED_INT_5_9_9_9_REV]:{[Y.RGB]:t.RGB9_E5},[K.UNSIGNED_INT_24_8]:{[Y.DEPTH_STENCIL]:t.DEPTH24_STENCIL8},[K.FLOAT_32_UNSIGNED_INT_24_8_REV]:{[Y.DEPTH_STENCIL]:t.DEPTH32F_STENCIL8}}:{[K.UNSIGNED_BYTE]:{[Y.RGBA]:t.RGBA,[Y.RGB]:t.RGB,[Y.ALPHA]:t.ALPHA,[Y.LUMINANCE]:t.LUMINANCE,[Y.LUMINANCE_ALPHA]:t.LUMINANCE_ALPHA},[K.UNSIGNED_SHORT_5_6_5]:{[Y.RGB]:t.RGB},[K.UNSIGNED_SHORT_4_4_4_4]:{[Y.RGBA]:t.RGBA},[K.UNSIGNED_SHORT_5_5_5_1]:{[Y.RGBA]:t.RGBA}},this.samplerTypes="WebGL2RenderingContext"in globalThis&&t instanceof globalThis.WebGL2RenderingContext?{[t.RGB]:Z.FLOAT,[t.RGBA]:Z.FLOAT,[t.ALPHA]:Z.FLOAT,[t.LUMINANCE]:Z.FLOAT,[t.LUMINANCE_ALPHA]:Z.FLOAT,[t.R8]:Z.FLOAT,[t.R8_SNORM]:Z.FLOAT,[t.RG8]:Z.FLOAT,[t.RG8_SNORM]:Z.FLOAT,[t.RGB8]:Z.FLOAT,[t.RGB8_SNORM]:Z.FLOAT,[t.RGB565]:Z.FLOAT,[t.RGBA4]:Z.FLOAT,[t.RGB5_A1]:Z.FLOAT,[t.RGBA8]:Z.FLOAT,[t.RGBA8_SNORM]:Z.FLOAT,[t.RGB10_A2]:Z.FLOAT,[t.RGB10_A2UI]:Z.FLOAT,[t.SRGB8]:Z.FLOAT,[t.SRGB8_ALPHA8]:Z.FLOAT,[t.R16F]:Z.FLOAT,[t.RG16F]:Z.FLOAT,[t.RGB16F]:Z.FLOAT,[t.RGBA16F]:Z.FLOAT,[t.R32F]:Z.FLOAT,[t.RG32F]:Z.FLOAT,[t.RGB32F]:Z.FLOAT,[t.RGBA32F]:Z.FLOAT,[t.R11F_G11F_B10F]:Z.FLOAT,[t.RGB9_E5]:Z.FLOAT,[t.R8I]:Z.INT,[t.R8UI]:Z.UINT,[t.R16I]:Z.INT,[t.R16UI]:Z.UINT,[t.R32I]:Z.INT,[t.R32UI]:Z.UINT,[t.RG8I]:Z.INT,[t.RG8UI]:Z.UINT,[t.RG16I]:Z.INT,[t.RG16UI]:Z.UINT,[t.RG32I]:Z.INT,[t.RG32UI]:Z.UINT,[t.RGB8I]:Z.INT,[t.RGB8UI]:Z.UINT,[t.RGB16I]:Z.INT,[t.RGB16UI]:Z.UINT,[t.RGB32I]:Z.INT,[t.RGB32UI]:Z.UINT,[t.RGBA8I]:Z.INT,[t.RGBA8UI]:Z.UINT,[t.RGBA16I]:Z.INT,[t.RGBA16UI]:Z.UINT,[t.RGBA32I]:Z.INT,[t.RGBA32UI]:Z.UINT,[t.DEPTH_COMPONENT16]:Z.FLOAT,[t.DEPTH_COMPONENT24]:Z.FLOAT,[t.DEPTH_COMPONENT32F]:Z.FLOAT,[t.DEPTH_STENCIL]:Z.FLOAT,[t.DEPTH24_STENCIL8]:Z.FLOAT,[t.DEPTH32F_STENCIL8]:Z.FLOAT}:{[t.RGB]:Z.FLOAT,[t.RGBA]:Z.FLOAT,[t.ALPHA]:Z.FLOAT,[t.LUMINANCE]:Z.FLOAT,[t.LUMINANCE_ALPHA]:Z.FLOAT,[t.DEPTH_STENCIL]:Z.FLOAT};let e=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS);this.boundTextures.length=e;for(let t=0;t<e;t++)this.boundTextures[t]=null;this.emptyTextures={};let r=new aD(t.createTexture());t.bindTexture(t.TEXTURE_2D,r.texture),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,new Uint8Array(4)),this.emptyTextures[t.TEXTURE_2D]=r,this.emptyTextures[t.TEXTURE_CUBE_MAP]=new aD(t.createTexture()),t.bindTexture(t.TEXTURE_CUBE_MAP,this.emptyTextures[t.TEXTURE_CUBE_MAP].texture);for(let e=0;e<6;e++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,null);t.texParameteri(t.TEXTURE_CUBE_MAP,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_CUBE_MAP,t.TEXTURE_MIN_FILTER,t.LINEAR);for(let t=0;t<this.boundTextures.length;t++)this.bind(null,t)}/**
   * Bind a texture to a specific location
   *
   * If you want to unbind something, please use `unbind(texture)` instead of `bind(null, textureLocation)`
   * @param texture - Texture to bind
   * @param [location=0] - Location to bind at
   */bind(t,e=0){let{gl:r}=this;if(t=t?.castToBaseTexture(),t?.valid&&!t.parentTextureArray){t.touched=this.renderer.textureGC.count;let i=t._glTextures[this.CONTEXT_UID]||this.initTexture(t);this.boundTextures[e]!==t&&(this.currentLocation!==e&&(this.currentLocation=e,r.activeTexture(r.TEXTURE0+e)),r.bindTexture(t.target,i.texture)),i.dirtyId!==t.dirtyId?(this.currentLocation!==e&&(this.currentLocation=e,r.activeTexture(r.TEXTURE0+e)),this.updateTexture(t)):i.dirtyStyleId!==t.dirtyStyleId&&this.updateTextureStyle(t),this.boundTextures[e]=t}else this.currentLocation!==e&&(this.currentLocation=e,r.activeTexture(r.TEXTURE0+e)),r.bindTexture(r.TEXTURE_2D,this.emptyTextures[r.TEXTURE_2D].texture),this.boundTextures[e]=null}/** Resets texture location and bound textures Actual `bind(null, i)` calls will be performed at next `unbind()` call */reset(){this._unknownBoundTextures=!0,this.hasIntegerTextures=!1,this.currentLocation=-1;for(let t=0;t<this.boundTextures.length;t++)this.boundTextures[t]=this.unknownTexture}/**
   * Unbind a texture.
   * @param texture - Texture to bind
   */unbind(t){let{gl:e,boundTextures:r}=this;if(this._unknownBoundTextures){this._unknownBoundTextures=!1;for(let t=0;t<r.length;t++)r[t]===this.unknownTexture&&this.bind(null,t)}for(let i=0;i<r.length;i++)r[i]===t&&(this.currentLocation!==i&&(e.activeTexture(e.TEXTURE0+i),this.currentLocation=i),e.bindTexture(t.target,this.emptyTextures[t.target].texture),r[i]=null)}/**
   * Ensures that current boundTextures all have FLOAT sampler type,
   * see {@link PIXI.SAMPLER_TYPES} for explanation.
   * @param maxTextures - number of locations to check
   */ensureSamplerType(t){let{boundTextures:e,hasIntegerTextures:r,CONTEXT_UID:i}=this;if(r)for(let r=t-1;r>=0;--r){let t=e[r];t&&t._glTextures[i].samplerType!==Z.FLOAT&&this.renderer.texture.unbind(t)}}/**
   * Initialize a texture
   * @private
   * @param texture - Texture to initialize
   */initTexture(t){let e=new aD(this.gl.createTexture());return e.dirtyId=-1,t._glTextures[this.CONTEXT_UID]=e,this.managedTextures.push(t),t.on("dispose",this.destroyTexture,this),e}initTextureType(t,e){e.internalFormat=this.internalFormats[t.type]?.[t.format]??t.format,e.samplerType=this.samplerTypes[e.internalFormat]??Z.FLOAT,2===this.webGLVersion&&t.type===K.HALF_FLOAT?e.type=this.gl.HALF_FLOAT:e.type=t.type}/**
   * Update a texture
   * @private
   * @param {PIXI.BaseTexture} texture - Texture to initialize
   */updateTexture(t){let e=t._glTextures[this.CONTEXT_UID];if(!e)return;let r=this.renderer;if(this.initTextureType(t,e),t.resource?.upload(r,t,e))e.samplerType!==Z.FLOAT&&(this.hasIntegerTextures=!0);else{let i=t.realWidth,s=t.realHeight,n=r.gl;(e.width!==i||e.height!==s||e.dirtyId<0)&&(e.width=i,e.height=s,n.texImage2D(t.target,0,e.internalFormat,i,s,0,t.format,e.type,null))}t.dirtyStyleId!==e.dirtyStyleId&&this.updateTextureStyle(t),e.dirtyId=t.dirtyId}/**
   * Deletes the texture from WebGL
   * @private
   * @param texture - the texture to destroy
   * @param [skipRemove=false] - Whether to skip removing the texture from the TextureManager.
   */destroyTexture(t,e){let{gl:r}=this;if((t=t.castToBaseTexture())._glTextures[this.CONTEXT_UID]&&(this.unbind(t),r.deleteTexture(t._glTextures[this.CONTEXT_UID].texture),t.off("dispose",this.destroyTexture,this),delete t._glTextures[this.CONTEXT_UID],!e)){let e=this.managedTextures.indexOf(t);-1!==e&&sa(this.managedTextures,e,1)}}/**
   * Update texture style such as mipmap flag
   * @private
   * @param {PIXI.BaseTexture} texture - Texture to update
   */updateTextureStyle(t){let e=t._glTextures[this.CONTEXT_UID];e&&(t.mipmap!==tt.POW2&&2===this.webGLVersion||t.isPowerOfTwo?e.mipmap=t.mipmap>=1:e.mipmap=!1,2===this.webGLVersion||t.isPowerOfTwo?e.wrapMode=t.wrapMode:e.wrapMode=J.CLAMP,t.resource?.style(this.renderer,t,e)||this.setStyle(t,e),e.dirtyStyleId=t.dirtyStyleId)}/**
   * Set style for texture
   * @private
   * @param texture - Texture to update
   * @param glTexture
   */setStyle(t,e){let r=this.gl;if(e.mipmap&&t.mipmap!==tt.ON_MANUAL&&r.generateMipmap(t.target),r.texParameteri(t.target,r.TEXTURE_WRAP_S,e.wrapMode),r.texParameteri(t.target,r.TEXTURE_WRAP_T,e.wrapMode),e.mipmap){r.texParameteri(t.target,r.TEXTURE_MIN_FILTER,t.scaleMode===Q.LINEAR?r.LINEAR_MIPMAP_LINEAR:r.NEAREST_MIPMAP_NEAREST);let e=this.renderer.context.extensions.anisotropicFiltering;if(e&&t.anisotropicLevel>0&&t.scaleMode===Q.LINEAR){let i=Math.min(t.anisotropicLevel,r.getParameter(e.MAX_TEXTURE_MAX_ANISOTROPY_EXT));r.texParameterf(t.target,e.TEXTURE_MAX_ANISOTROPY_EXT,i)}}else r.texParameteri(t.target,r.TEXTURE_MIN_FILTER,t.scaleMode===Q.LINEAR?r.LINEAR:r.NEAREST);r.texParameteri(t.target,r.TEXTURE_MAG_FILTER,t.scaleMode===Q.LINEAR?r.LINEAR:r.NEAREST)}destroy(){this.renderer=null}}aO.extension={type:sS.RendererSystem,name:"texture"},sI.add(aO);class aB{/**
   * @param renderer - The renderer this System works for.
   */constructor(t){this.renderer=t}/** Sets up the renderer context and necessary buffers. */contextChange(){this.gl=this.renderer.gl,this.CONTEXT_UID=this.renderer.CONTEXT_UID}/**
   * Bind TransformFeedback and buffers
   * @param transformFeedback - TransformFeedback to bind
   */bind(t){let{gl:e,CONTEXT_UID:r}=this,i=t._glTransformFeedbacks[r]||this.createGLTransformFeedback(t);e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,i)}/** Unbind TransformFeedback */unbind(){let{gl:t}=this;t.bindTransformFeedback(t.TRANSFORM_FEEDBACK,null)}/**
   * Begin TransformFeedback
   * @param drawMode - DrawMode for TransformFeedback
   * @param shader - A Shader used by TransformFeedback. Current bound shader will be used if not provided.
   */beginTransformFeedback(t,e){let{gl:r,renderer:i}=this;e&&i.shader.bind(e),r.beginTransformFeedback(t)}/** End TransformFeedback */endTransformFeedback(){let{gl:t}=this;t.endTransformFeedback()}/**
   * Create TransformFeedback and bind buffers
   * @param tf - TransformFeedback
   * @returns WebGLTransformFeedback
   */createGLTransformFeedback(t){let{gl:e,renderer:r,CONTEXT_UID:i}=this,s=e.createTransformFeedback();t._glTransformFeedbacks[i]=s,e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,s);for(let s=0;s<t.buffers.length;s++){let n=t.buffers[s];n&&(r.buffer.update(n),n._glBuffers[i].refCount++,e.bindBufferBase(e.TRANSFORM_FEEDBACK_BUFFER,s,n._glBuffers[i].buffer||null))}return e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,null),t.disposeRunner.add(this),s}/**
   * Disposes TransfromFeedback
   * @param {PIXI.TransformFeedback} tf - TransformFeedback
   * @param {boolean} [contextLost=false] - If context was lost, we suppress delete TransformFeedback
   */disposeTransformFeedback(t,e){let r=t._glTransformFeedbacks[this.CONTEXT_UID],i=this.gl;t.disposeRunner.remove(this);let s=this.renderer.buffer;if(s)for(let r=0;r<t.buffers.length;r++){let i=t.buffers[r];if(!i)continue;let n=i._glBuffers[this.CONTEXT_UID];n&&(n.refCount--,0!==n.refCount||e||s.dispose(i,e))}r&&(e||i.deleteTransformFeedback(r),delete t._glTransformFeedbacks[this.CONTEXT_UID])}destroy(){this.renderer=null}}aB.extension={type:sS.RendererSystem,name:"transformFeedback"},sI.add(aB);class aN{constructor(t){this.renderer=t}/**
   * initiates the view system
   * @param {PIXI.ViewOptions} options - the options for the view
   */init(t){this.screen=new s2(0,0,t.width,t.height),this.element=t.view||tl.ADAPTER.createCanvas(),this.resolution=t.resolution||tl.RESOLUTION,this.autoDensity=!!t.autoDensity}/**
   * Resizes the screen and canvas to the specified dimensions.
   * @param desiredScreenWidth - The new width of the screen.
   * @param desiredScreenHeight - The new height of the screen.
   */resizeView(t,e){this.element.width=Math.round(t*this.resolution),this.element.height=Math.round(e*this.resolution);let r=this.element.width/this.resolution,i=this.element.height/this.resolution;this.screen.width=r,this.screen.height=i,this.autoDensity&&(this.element.style.width=`${r}px`,this.element.style.height=`${i}px`),this.renderer.emit("resize",r,i),this.renderer.runners.resize.emit(this.screen.width,this.screen.height)}/**
   * Destroys this System and optionally removes the canvas from the dom.
   * @param {boolean} [removeView=false] - Whether to remove the canvas from the DOM.
   */destroy(t){t&&this.element.parentNode?.removeChild(this.element),this.renderer=null,this.element=null,this.screen=null}}aN.defaultOptions={/**
   * {@link PIXI.IRendererOptions.width}
   * @default 800
   * @memberof PIXI.settings.RENDER_OPTIONS
   */width:800,/**
   * {@link PIXI.IRendererOptions.height}
   * @default 600
   * @memberof PIXI.settings.RENDER_OPTIONS
   */height:600,/**
   * {@link PIXI.IRendererOptions.resolution}
   * @type {number}
   * @default PIXI.settings.RESOLUTION
   * @memberof PIXI.settings.RENDER_OPTIONS
   */resolution:void 0,/**
   * {@link PIXI.IRendererOptions.autoDensity}
   * @default false
   * @memberof PIXI.settings.RENDER_OPTIONS
   */autoDensity:!1},/** @ignore */aN.extension={type:[sS.RendererSystem,sS.CanvasRendererSystem],name:"_view"},sI.add(aN),tl.PREFER_ENV=X.WEBGL2,tl.STRICT_TEXTURE_CACHE=!1,tl.RENDER_OPTIONS={...nX.defaultOptions,...nG.defaultOptions,...aN.defaultOptions,...aI.defaultOptions},Object.defineProperties(tl,{/**
   * @static
   * @name WRAP_MODE
   * @memberof PIXI.settings
   * @type {PIXI.WRAP_MODES}
   * @deprecated since 7.1.0
   * @see PIXI.BaseTexture.defaultOptions.wrapMode
   */WRAP_MODE:{get:()=>sk.defaultOptions.wrapMode,set(t){ig("7.1.0","settings.WRAP_MODE is deprecated, use BaseTexture.defaultOptions.wrapMode"),sk.defaultOptions.wrapMode=t}},/**
   * @static
   * @name SCALE_MODE
   * @memberof PIXI.settings
   * @type {PIXI.SCALE_MODES}
   * @deprecated since 7.1.0
   * @see PIXI.BaseTexture.defaultOptions.scaleMode
   */SCALE_MODE:{get:()=>sk.defaultOptions.scaleMode,set(t){ig("7.1.0","settings.SCALE_MODE is deprecated, use BaseTexture.defaultOptions.scaleMode"),sk.defaultOptions.scaleMode=t}},/**
   * @static
   * @name MIPMAP_TEXTURES
   * @memberof PIXI.settings
   * @type {PIXI.MIPMAP_MODES}
   * @deprecated since 7.1.0
   * @see PIXI.BaseTexture.defaultOptions.mipmap
   */MIPMAP_TEXTURES:{get:()=>sk.defaultOptions.mipmap,set(t){ig("7.1.0","settings.MIPMAP_TEXTURES is deprecated, use BaseTexture.defaultOptions.mipmap"),sk.defaultOptions.mipmap=t}},/**
   * @static
   * @name ANISOTROPIC_LEVEL
   * @memberof PIXI.settings
   * @type {number}
   * @deprecated since 7.1.0
   * @see PIXI.BaseTexture.defaultOptions.anisotropicLevel
   */ANISOTROPIC_LEVEL:{get:()=>sk.defaultOptions.anisotropicLevel,set(t){ig("7.1.0","settings.ANISOTROPIC_LEVEL is deprecated, use BaseTexture.defaultOptions.anisotropicLevel"),sk.defaultOptions.anisotropicLevel=t}},/**
   * Default filter resolution.
   * @static
   * @name FILTER_RESOLUTION
   * @memberof PIXI.settings
   * @deprecated since 7.1.0
   * @type {number|null}
   * @see PIXI.Filter.defaultResolution
   */FILTER_RESOLUTION:{get:()=>(ig("7.1.0","settings.FILTER_RESOLUTION is deprecated, use Filter.defaultResolution"),nk.defaultResolution),set(t){nk.defaultResolution=t}},/**
   * Default filter samples.
   * @static
   * @name FILTER_MULTISAMPLE
   * @memberof PIXI.settings
   * @deprecated since 7.1.0
   * @type {PIXI.MSAA_QUALITY}
   * @see PIXI.Filter.defaultMultisample
   */FILTER_MULTISAMPLE:{get:()=>(ig("7.1.0","settings.FILTER_MULTISAMPLE is deprecated, use Filter.defaultMultisample"),nk.defaultMultisample),set(t){nk.defaultMultisample=t}},/**
   * The maximum textures that this device supports.
   * @static
   * @name SPRITE_MAX_TEXTURES
   * @memberof PIXI.settings
   * @deprecated since 7.1.0
   * @see PIXI.BatchRenderer.defaultMaxTextures
   * @type {number}
   */SPRITE_MAX_TEXTURES:{get:()=>nN.defaultMaxTextures,set(t){ig("7.1.0","settings.SPRITE_MAX_TEXTURES is deprecated, use BatchRenderer.defaultMaxTextures"),nN.defaultMaxTextures=t}},/**
   * The default sprite batch size.
   *
   * The default aims to balance desktop and mobile devices.
   * @static
   * @name SPRITE_BATCH_SIZE
   * @memberof PIXI.settings
   * @see PIXI.BatchRenderer.defaultBatchSize
   * @deprecated since 7.1.0
   * @type {number}
   */SPRITE_BATCH_SIZE:{get:()=>nN.defaultBatchSize,set(t){ig("7.1.0","settings.SPRITE_BATCH_SIZE is deprecated, use BatchRenderer.defaultBatchSize"),nN.defaultBatchSize=t}},/**
   * Can we upload the same buffer in a single frame?
   * @static
   * @name CAN_UPLOAD_SAME_BUFFER
   * @memberof PIXI.settings
   * @see PIXI.BatchRenderer.canUploadSameBuffer
   * @deprecated since 7.1.0
   * @type {boolean}
   */CAN_UPLOAD_SAME_BUFFER:{get:()=>nN.canUploadSameBuffer,set(t){ig("7.1.0","settings.CAN_UPLOAD_SAME_BUFFER is deprecated, use BatchRenderer.canUploadSameBuffer"),nN.canUploadSameBuffer=t}},/**
   * Default Garbage Collection mode.
   * @static
   * @name GC_MODE
   * @memberof PIXI.settings
   * @type {PIXI.GC_MODES}
   * @deprecated since 7.1.0
   * @see PIXI.TextureGCSystem.defaultMode
   */GC_MODE:{get:()=>aM.defaultMode,set(t){ig("7.1.0","settings.GC_MODE is deprecated, use TextureGCSystem.defaultMode"),aM.defaultMode=t}},/**
   * Default Garbage Collection max idle.
   * @static
   * @name GC_MAX_IDLE
   * @memberof PIXI.settings
   * @type {number}
   * @deprecated since 7.1.0
   * @see PIXI.TextureGCSystem.defaultMaxIdle
   */GC_MAX_IDLE:{get:()=>aM.defaultMaxIdle,set(t){ig("7.1.0","settings.GC_MAX_IDLE is deprecated, use TextureGCSystem.defaultMaxIdle"),aM.defaultMaxIdle=t}},/**
   * Default Garbage Collection maximum check count.
   * @static
   * @name GC_MAX_CHECK_COUNT
   * @memberof PIXI.settings
   * @type {number}
   * @deprecated since 7.1.0
   * @see PIXI.TextureGCSystem.defaultCheckCountMax
   */GC_MAX_CHECK_COUNT:{get:()=>aM.defaultCheckCountMax,set(t){ig("7.1.0","settings.GC_MAX_CHECK_COUNT is deprecated, use TextureGCSystem.defaultCheckCountMax"),aM.defaultCheckCountMax=t}},/**
   * Default specify float precision in vertex shader.
   * @static
   * @name PRECISION_VERTEX
   * @memberof PIXI.settings
   * @type {PIXI.PRECISION}
   * @deprecated since 7.1.0
   * @see PIXI.Program.defaultVertexPrecision
   */PRECISION_VERTEX:{get:()=>nw.defaultVertexPrecision,set(t){ig("7.1.0","settings.PRECISION_VERTEX is deprecated, use Program.defaultVertexPrecision"),nw.defaultVertexPrecision=t}},/**
   * Default specify float precision in fragment shader.
   * @static
   * @name PRECISION_FRAGMENT
   * @memberof PIXI.settings
   * @type {PIXI.PRECISION}
   * @deprecated since 7.1.0
   * @see PIXI.Program.defaultFragmentPrecision
   */PRECISION_FRAGMENT:{get:()=>nw.defaultFragmentPrecision,set(t){ig("7.1.0","settings.PRECISION_FRAGMENT is deprecated, use Program.defaultFragmentPrecision"),nw.defaultFragmentPrecision=t}}});var aF=((C=aF||{})[C.INTERACTION=50]="INTERACTION",C[C.HIGH=25]="HIGH",C[C.NORMAL=0]="NORMAL",C[C.LOW=-25]="LOW",C[C.UTILITY=-50]="UTILITY",C);class aL{/**
   * Constructor
   * @private
   * @param fn - The listener function to be added for one update
   * @param context - The listener context
   * @param priority - The priority for emitting
   * @param once - If the handler should fire once
   */constructor(t,e=null,r=0,i=!1){this.next=null,this.previous=null,this._destroyed=!1,this.fn=t,this.context=e,this.priority=r,this.once=i}/**
   * Simple compare function to figure out if a function and context match.
   * @private
   * @param fn - The listener function to be added for one update
   * @param context - The listener context
   * @returns `true` if the listener match the arguments
   */match(t,e=null){return this.fn===t&&this.context===e}/**
   * Emit by calling the current function.
   * @private
   * @param deltaTime - time since the last emit.
   * @returns Next ticker
   */emit(t){this.fn&&(this.context?this.fn.call(this.context,t):this.fn(t));let e=this.next;return this.once&&this.destroy(!0),this._destroyed&&(this.next=null),e}/**
   * Connect to the list.
   * @private
   * @param previous - Input node, previous listener
   */connect(t){this.previous=t,t.next&&(t.next.previous=this),this.next=t.next,t.next=this}/**
   * Destroy and don't use after this.
   * @private
   * @param hard - `true` to remove the `next` reference, this
   *        is considered a hard destroy. Soft destroy maintains the next reference.
   * @returns The listener to redirect while emitting or removing.
   */destroy(t=!1){this._destroyed=!0,this.fn=null,this.context=null,this.previous&&(this.previous.next=this.next),this.next&&(this.next.previous=this.previous);let e=this.next;return this.next=t?null:e,this.previous=null,e}}const aU=class t{constructor(){this.autoStart=!1,this.deltaTime=1,this.lastTime=-1,this.speed=1,this.started=!1,this._requestId=null,this._maxElapsedMS=100,this._minElapsedMS=0,this._protected=!1,this._lastFrame=-1,this._head=new aL(null,null,1/0),this.deltaMS=1/t.targetFPMS,this.elapsedMS=1/t.targetFPMS,this._tick=t=>{this._requestId=null,this.started&&(this.update(t),this.started&&null===this._requestId&&this._head.next&&(this._requestId=requestAnimationFrame(this._tick)))}}/**
   * Conditionally requests a new animation frame.
   * If a frame has not already been requested, and if the internal
   * emitter has listeners, a new frame is requested.
   * @private
   */_requestIfNeeded(){null===this._requestId&&this._head.next&&(this.lastTime=performance.now(),this._lastFrame=this.lastTime,this._requestId=requestAnimationFrame(this._tick))}/**
   * Conditionally cancels a pending animation frame.
   * @private
   */_cancelIfNeeded(){null!==this._requestId&&(cancelAnimationFrame(this._requestId),this._requestId=null)}/**
   * Conditionally requests a new animation frame.
   * If the ticker has been started it checks if a frame has not already
   * been requested, and if the internal emitter has listeners. If these
   * conditions are met, a new frame is requested. If the ticker has not
   * been started, but autoStart is `true`, then the ticker starts now,
   * and continues with the previous conditions to request a new frame.
   * @private
   */_startIfPossible(){this.started?this._requestIfNeeded():this.autoStart&&this.start()}/**
   * Register a handler for tick events. Calls continuously unless
   * it is removed or the ticker is stopped.
   * @param fn - The listener function to be added for updates
   * @param context - The listener context
   * @param {number} [priority=PIXI.UPDATE_PRIORITY.NORMAL] - The priority for emitting
   * @returns This instance of a ticker
   */add(t,e,r=aF.NORMAL){return this._addListener(new aL(t,e,r))}/**
   * Add a handler for the tick event which is only execute once.
   * @param fn - The listener function to be added for one update
   * @param context - The listener context
   * @param {number} [priority=PIXI.UPDATE_PRIORITY.NORMAL] - The priority for emitting
   * @returns This instance of a ticker
   */addOnce(t,e,r=aF.NORMAL){return this._addListener(new aL(t,e,r,!0))}/**
   * Internally adds the event handler so that it can be sorted by priority.
   * Priority allows certain handler (user, AnimatedSprite, Interaction) to be run
   * before the rendering.
   * @private
   * @param listener - Current listener being added.
   * @returns This instance of a ticker
   */_addListener(t){let e=this._head.next,r=this._head;if(e){for(;e;){if(t.priority>e.priority){t.connect(r);break}r=e,e=e.next}t.previous||t.connect(r)}else t.connect(r);return this._startIfPossible(),this}/**
   * Removes any handlers matching the function and context parameters.
   * If no handlers are left after removing, then it cancels the animation frame.
   * @param fn - The listener function to be removed
   * @param context - The listener context to be removed
   * @returns This instance of a ticker
   */remove(t,e){let r=this._head.next;for(;r;)r=r.match(t,e)?r.destroy():r.next;return this._head.next||this._cancelIfNeeded(),this}/**
   * The number of listeners on this ticker, calculated by walking through linked list
   * @readonly
   * @member {number}
   */get count(){if(!this._head)return 0;let t=0,e=this._head;for(;e=e.next;)t++;return t}/** Starts the ticker. If the ticker has listeners a new animation frame is requested at this point. */start(){this.started||(this.started=!0,this._requestIfNeeded())}/** Stops the ticker. If the ticker has requested an animation frame it is canceled at this point. */stop(){this.started&&(this.started=!1,this._cancelIfNeeded())}/** Destroy the ticker and don't use after this. Calling this method removes all references to internal events. */destroy(){if(!this._protected){this.stop();let t=this._head.next;for(;t;)t=t.destroy(!0);this._head.destroy(),this._head=null}}/**
   * Triggers an update. An update entails setting the
   * current {@link PIXI.Ticker#elapsedMS},
   * the current {@link PIXI.Ticker#deltaTime},
   * invoking all listeners with current deltaTime,
   * and then finally setting {@link PIXI.Ticker#lastTime}
   * with the value of currentTime that was provided.
   * This method will be called automatically by animation
   * frame callbacks if the ticker instance has been started
   * and listeners are added.
   * @param {number} [currentTime=performance.now()] - the current time of execution
   */update(e=performance.now()){let r;if(e>this.lastTime){if((r=this.elapsedMS=e-this.lastTime)>this._maxElapsedMS&&(r=this._maxElapsedMS),r*=this.speed,this._minElapsedMS){let t=e-this._lastFrame|0;if(t<this._minElapsedMS)return;this._lastFrame=e-t%this._minElapsedMS}this.deltaMS=r,this.deltaTime=this.deltaMS*t.targetFPMS;let i=this._head,s=i.next;for(;s;)s=s.emit(this.deltaTime);i.next||this._cancelIfNeeded()}else this.deltaTime=this.deltaMS=this.elapsedMS=0;this.lastTime=e}/**
   * The frames per second at which this ticker is running.
   * The default is approximately 60 in most modern browsers.
   * **Note:** This does not factor in the value of
   * {@link PIXI.Ticker#speed}, which is specific
   * to scaling {@link PIXI.Ticker#deltaTime}.
   * @member {number}
   * @readonly
   */get FPS(){return 1e3/this.elapsedMS}/**
   * Manages the maximum amount of milliseconds allowed to
   * elapse between invoking {@link PIXI.Ticker#update}.
   * This value is used to cap {@link PIXI.Ticker#deltaTime},
   * but does not effect the measured value of {@link PIXI.Ticker#FPS}.
   * When setting this property it is clamped to a value between
   * `0` and `Ticker.targetFPMS * 1000`.
   * @member {number}
   * @default 10
   */get minFPS(){return 1e3/this._maxElapsedMS}set minFPS(e){let r=Math.min(this.maxFPS,e),i=Math.min(Math.max(0,r)/1e3,t.targetFPMS);this._maxElapsedMS=1/i}/**
   * Manages the minimum amount of milliseconds required to
   * elapse between invoking {@link PIXI.Ticker#update}.
   * This will effect the measured value of {@link PIXI.Ticker#FPS}.
   * If it is set to `0`, then there is no limit; PixiJS will render as many frames as it can.
   * Otherwise it will be at least `minFPS`
   * @member {number}
   * @default 0
   */get maxFPS(){return this._minElapsedMS?Math.round(1e3/this._minElapsedMS):0}set maxFPS(t){if(0===t)this._minElapsedMS=0;else{let e=Math.max(this.minFPS,t);this._minElapsedMS=1/(e/1e3)}}/**
   * The shared ticker instance used by {@link PIXI.AnimatedSprite} and by
   * {@link PIXI.VideoResource} to update animation frames / video textures.
   *
   * It may also be used by {@link PIXI.Application} if created with the `sharedTicker` option property set to true.
   *
   * The property {@link PIXI.Ticker#autoStart} is set to `true` for this instance.
   * Please follow the examples for usage, including how to opt-out of auto-starting the shared ticker.
   * @example
   * import { Ticker } from 'pixi.js';
   *
   * const ticker = Ticker.shared;
   * // Set this to prevent starting this ticker when listeners are added.
   * // By default this is true only for the PIXI.Ticker.shared instance.
   * ticker.autoStart = false;
   *
   * // FYI, call this to ensure the ticker is stopped. It should be stopped
   * // if you have not attempted to render anything yet.
   * ticker.stop();
   *
   * // Call this when you are ready for a running shared ticker.
   * ticker.start();
   * @example
   * import { autoDetectRenderer, Container } from 'pixi.js';
   *
   * // You may use the shared ticker to render...
   * const renderer = autoDetectRenderer();
   * const stage = new Container();
   * document.body.appendChild(renderer.view);
   * ticker.add((time) => renderer.render(stage));
   *
   * // Or you can just update it manually.
   * ticker.autoStart = false;
   * ticker.stop();
   * const animate = (time) => {
   *     ticker.update(time);
   *     renderer.render(stage);
   *     requestAnimationFrame(animate);
   * };
   * animate(performance.now());
   * @member {PIXI.Ticker}
   * @static
   */static get shared(){if(!t._shared){let e=t._shared=new t;e.autoStart=!0,e._protected=!0}return t._shared}/**
   * The system ticker instance used by {@link PIXI.BasePrepare} for core timing
   * functionality that shouldn't usually need to be paused, unlike the `shared`
   * ticker which drives visual animations and rendering which may want to be paused.
   *
   * The property {@link PIXI.Ticker#autoStart} is set to `true` for this instance.
   * @member {PIXI.Ticker}
   * @static
   */static get system(){if(!t._system){let e=t._system=new t;e.autoStart=!0,e._protected=!0}return t._system}};aU.targetFPMS=.06,Object.defineProperties(tl,{/**
   * Target frames per millisecond.
   * @static
   * @name TARGET_FPMS
   * @memberof PIXI.settings
   * @type {number}
   * @deprecated since 7.1.0
   * @see PIXI.Ticker.targetFPMS
   */TARGET_FPMS:{get:()=>aU.targetFPMS,set(t){ig("7.1.0","settings.TARGET_FPMS is deprecated, use Ticker.targetFPMS"),aU.targetFPMS=t}}});class ak{/**
   * Initialize the plugin with scope of application instance
   * @static
   * @private
   * @param {object} [options] - See application options
   */static init(t){t=Object.assign({autoStart:!0,sharedTicker:!1},t),Object.defineProperty(this,"ticker",{set(t){this._ticker&&this._ticker.remove(this.render,this),this._ticker=t,t&&t.add(this.render,this,aF.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=t.sharedTicker?aU.shared:new aU,t.autoStart&&this.start()}/**
   * Clean up the ticker, scoped to application.
   * @static
   * @private
   */static destroy(){if(this._ticker){let t=this._ticker;this.ticker=null,t.destroy()}}}ak.extension=sS.Application,sI.add(ak);const aG=[];sI.handleByList(sS.Renderer,aG);var aH=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,aj=`attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`;class aX{constructor(t){this.renderer=t}contextChange(t){let e;if(1===this.renderer.context.webGLVersion){let r=t.getParameter(t.FRAMEBUFFER_BINDING);t.bindFramebuffer(t.FRAMEBUFFER,null),e=t.getParameter(t.SAMPLES),t.bindFramebuffer(t.FRAMEBUFFER,r)}else{let r=t.getParameter(t.DRAW_FRAMEBUFFER_BINDING);t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),e=t.getParameter(t.SAMPLES),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,r)}e>=to.HIGH?this.multisample=to.HIGH:e>=to.MEDIUM?this.multisample=to.MEDIUM:e>=to.LOW?this.multisample=to.LOW:this.multisample=to.NONE}destroy(){}}aX.extension={type:sS.RendererSystem,name:"_multisample"},sI.add(aX);class aV{constructor(t){this.buffer=t||null,this.updateID=-1,this.byteLength=-1,this.refCount=0}}class az{/**
   * @param {PIXI.Renderer} renderer - The renderer this System works for.
   */constructor(t){this.renderer=t,this.managedBuffers={},this.boundBufferBases={}}/**
   * @ignore
   */destroy(){this.renderer=null}/** Sets up the renderer context and necessary buffers. */contextChange(){this.disposeAll(!0),this.gl=this.renderer.gl,this.CONTEXT_UID=this.renderer.CONTEXT_UID}/**
   * This binds specified buffer. On first run, it will create the webGL buffers for the context too
   * @param buffer - the buffer to bind to the renderer
   */bind(t){let{gl:e,CONTEXT_UID:r}=this,i=t._glBuffers[r]||this.createGLBuffer(t);e.bindBuffer(t.type,i.buffer)}unbind(t){let{gl:e}=this;e.bindBuffer(t,null)}/**
   * Binds an uniform buffer to at the given index.
   *
   * A cache is used so a buffer will not be bound again if already bound.
   * @param buffer - the buffer to bind
   * @param index - the base index to bind it to.
   */bindBufferBase(t,e){let{gl:r,CONTEXT_UID:i}=this;if(this.boundBufferBases[e]!==t){let s=t._glBuffers[i]||this.createGLBuffer(t);this.boundBufferBases[e]=t,r.bindBufferBase(r.UNIFORM_BUFFER,e,s.buffer)}}/**
   * Binds a buffer whilst also binding its range.
   * This will make the buffer start from the offset supplied rather than 0 when it is read.
   * @param buffer - the buffer to bind
   * @param index - the base index to bind at, defaults to 0
   * @param offset - the offset to bind at (this is blocks of 256). 0 = 0, 1 = 256, 2 = 512 etc
   */bindBufferRange(t,e,r){let{gl:i,CONTEXT_UID:s}=this;r=r||0;let n=t._glBuffers[s]||this.createGLBuffer(t);i.bindBufferRange(i.UNIFORM_BUFFER,e||0,n.buffer,256*r,256)}/**
   * Will ensure the data in the buffer is uploaded to the GPU.
   * @param {PIXI.Buffer} buffer - the buffer to update
   */update(t){let{gl:e,CONTEXT_UID:r}=this,i=t._glBuffers[r]||this.createGLBuffer(t);if(t._updateID!==i.updateID){if(i.updateID=t._updateID,e.bindBuffer(t.type,i.buffer),i.byteLength>=t.data.byteLength)e.bufferSubData(t.type,0,t.data);else{let r=t.static?e.STATIC_DRAW:e.DYNAMIC_DRAW;i.byteLength=t.data.byteLength,e.bufferData(t.type,t.data,r)}}}/**
   * Disposes buffer
   * @param {PIXI.Buffer} buffer - buffer with data
   * @param {boolean} [contextLost=false] - If context was lost, we suppress deleteVertexArray
   */dispose(t,e){if(!this.managedBuffers[t.id])return;delete this.managedBuffers[t.id];let r=t._glBuffers[this.CONTEXT_UID],i=this.gl;t.disposeRunner.remove(this),r&&(e||i.deleteBuffer(r.buffer),delete t._glBuffers[this.CONTEXT_UID])}/**
   * dispose all WebGL resources of all managed buffers
   * @param {boolean} [contextLost=false] - If context was lost, we suppress `gl.delete` calls
   */disposeAll(t){let e=Object.keys(this.managedBuffers);for(let r=0;r<e.length;r++)this.dispose(this.managedBuffers[e[r]],t)}/**
   * creates and attaches a GLBuffer object tied to the current context.
   * @param buffer
   * @protected
   */createGLBuffer(t){let{CONTEXT_UID:e,gl:r}=this;return t._glBuffers[e]=new aV(r.createBuffer()),this.managedBuffers[t.id]=t,t.disposeRunner.add(this),t._glBuffers[e]}}az.extension={type:sS.RendererSystem,name:"buffer"},sI.add(az);class aW{// renderers scene graph!
constructor(t){this.renderer=t}/**
   * Renders the object to its WebGL view.
   * @param displayObject - The object to be rendered.
   * @param options - the options to be passed to the renderer
   */render(t,e){let r,i,s,n;let a=this.renderer;if(e&&(r=e.renderTexture,i=e.clear,s=e.transform,n=e.skipUpdateTransform),this.renderingToScreen=!r,a.runners.prerender.emit(),a.emit("prerender"),a.projection.transform=s,!a.context.isLost){if(r||(this.lastObjectRendered=t),!n){let e=t.enableTempParent();t.updateTransform(),t.disableTempParent(e)}a.renderTexture.bind(r),a.batch.currentRenderer.start(),(i??a.background.clearBeforeRender)&&a.renderTexture.clear(),t.render(a),a.batch.currentRenderer.flush(),r&&(e.blit&&a.framebuffer.blit(),r.baseTexture.update()),a.runners.postrender.emit(),a.projection.transform=null,a.emit("postrender")}}destroy(){this.renderer=null,this.lastObjectRendered=null}}aW.extension={type:sS.RendererSystem,name:"objectRenderer"},sI.add(aW);const a$=class t extends aP{/**
   * @param {PIXI.IRendererOptions} [options] - See {@link PIXI.settings.RENDER_OPTIONS} for defaults.
   */constructor(e){super(),this.type=V.WEBGL,e=Object.assign({},tl.RENDER_OPTIONS,e),this.gl=null,this.CONTEXT_UID=0,this.globalUniforms=new nI({projectionMatrix:new s8},!0);let r={runners:["init","destroy","contextChange","resolutionChange","reset","update","postrender","prerender","resize"],systems:t.__systems,priority:["_view","textureGenerator","background","_plugin","startup",// low level WebGL systems
"context","state","texture","buffer","geometry","framebuffer","transformFeedback",// high level pixi specific rendering
"mask","scissor","stencil","projection","textureGC","filter","renderTexture","batch","objectRenderer","_multisample"]};this.setup(r),"useContextAlpha"in e&&(ig("7.0.0","options.useContextAlpha is deprecated, use options.premultipliedAlpha and options.backgroundAlpha instead"),e.premultipliedAlpha=e.useContextAlpha&&"notMultiplied"!==e.useContextAlpha,e.backgroundAlpha=!1===e.useContextAlpha?1:e.backgroundAlpha),this._plugin.rendererPlugins=t.__plugins,this.options=e,this.startup.run(this.options)}/**
   * Create renderer if WebGL is available. Overrideable
   * by the **@pixi/canvas-renderer** package to allow fallback.
   * throws error if WebGL is not available.
   * @param options
   * @private
   */static test(t){return!t?.forceCanvas&&iA()}/**
   * Renders the object to its WebGL view.
   * @param displayObject - The object to be rendered.
   * @param {object} [options] - Object to use for render options.
   * @param {PIXI.RenderTexture} [options.renderTexture] - The render texture to render to.
   * @param {boolean} [options.clear=true] - Should the canvas be cleared before the new render.
   * @param {PIXI.Matrix} [options.transform] - A transform to apply to the render texture before rendering.
   * @param {boolean} [options.skipUpdateTransform=false] - Should we skip the update transform pass?
   */render(t,e){this.objectRenderer.render(t,e)}/**
   * Resizes the WebGL view to the specified width and height.
   * @param desiredScreenWidth - The desired width of the screen.
   * @param desiredScreenHeight - The desired height of the screen.
   */resize(t,e){this._view.resizeView(t,e)}/**
   * Resets the WebGL state so you can render things however you fancy!
   * @returns Returns itself.
   */reset(){return this.runners.reset.emit(),this}/** Clear the frame buffer. */clear(){this.renderTexture.bind(),this.renderTexture.clear()}/**
   * Removes everything from the renderer (event listeners, spritebatch, etc...)
   * @param [removeView=false] - Removes the Canvas element from the DOM.
   *  See: https://github.com/pixijs/pixijs/issues/2233
   */destroy(t=!1){this.runners.destroy.items.reverse(),this.emitWithCustomOptions(this.runners.destroy,{_view:t}),super.destroy()}/** Collection of plugins */get plugins(){return this._plugin.plugins}/** The number of msaa samples of the canvas. */get multisample(){return this._multisample.multisample}/**
   * Same as view.width, actual number of pixels in the canvas by horizontal.
   * @member {number}
   * @readonly
   * @default 800
   */get width(){return this._view.element.width}/**
   * Same as view.height, actual number of pixels in the canvas by vertical.
   * @default 600
   */get height(){return this._view.element.height}/** The resolution / device pixel ratio of the renderer. */get resolution(){return this._view.resolution}set resolution(t){this._view.resolution=t,this.runners.resolutionChange.emit(t)}/** Whether CSS dimensions of canvas view should be resized to screen dimensions automatically. */get autoDensity(){return this._view.autoDensity}/** The canvas element that everything is drawn to.*/get view(){return this._view.element}/**
   * Measurements of the screen. (0, 0, screenWidth, screenHeight).
   *
   * Its safe to use as filterArea or hitArea for the whole stage.
   * @member {PIXI.Rectangle}
   */get screen(){return this._view.screen}/** the last object rendered by the renderer. Useful for other plugins like interaction managers */get lastObjectRendered(){return this.objectRenderer.lastObjectRendered}/** Flag if we are rendering to the screen vs renderTexture */get renderingToScreen(){return this.objectRenderer.renderingToScreen}/** When logging Pixi to the console, this is the name we will show */get rendererLogId(){return`WebGL ${this.context.webGLVersion}`}/**
   * This sets weather the screen is totally cleared between each frame withthe background color and alpha
   * @deprecated since 7.0.0
   */get clearBeforeRender(){return ig("7.0.0","renderer.clearBeforeRender has been deprecated, please use renderer.background.clearBeforeRender instead."),this.background.clearBeforeRender}/**
   * Pass-thru setting for the canvas' context `alpha` property. This is typically
   * not something you need to fiddle with. If you want transparency, use `backgroundAlpha`.
   * @deprecated since 7.0.0
   * @member {boolean}
   */get useContextAlpha(){return ig("7.0.0","renderer.useContextAlpha has been deprecated, please use renderer.context.premultipliedAlpha instead."),this.context.useContextAlpha}/**
   * readonly drawing buffer preservation
   * we can only know this if Pixi created the context
   * @deprecated since 7.0.0
   */get preserveDrawingBuffer(){return ig("7.0.0","renderer.preserveDrawingBuffer has been deprecated, we cannot truly know this unless pixi created the context"),this.context.preserveDrawingBuffer}/**
   * The background color to fill if not transparent
   * @member {number}
   * @deprecated since 7.0.0
   */get backgroundColor(){return ig("7.0.0","renderer.backgroundColor has been deprecated, use renderer.background.color instead."),this.background.color}set backgroundColor(t){ig("7.0.0","renderer.backgroundColor has been deprecated, use renderer.background.color instead."),this.background.color=t}/**
   * The background color alpha. Setting this to 0 will make the canvas transparent.
   * @member {number}
   * @deprecated since 7.0.0
   */get backgroundAlpha(){return ig("7.0.0","renderer.backgroundAlpha has been deprecated, use renderer.background.alpha instead."),this.background.alpha}/**
   * @deprecated since 7.0.0
   */set backgroundAlpha(t){ig("7.0.0","renderer.backgroundAlpha has been deprecated, use renderer.background.alpha instead."),this.background.alpha=t}/**
   * @deprecated since 7.0.0
   */get powerPreference(){return ig("7.0.0","renderer.powerPreference has been deprecated, we can only know this if pixi creates the context"),this.context.powerPreference}/**
   * Useful function that returns a texture of the display object that can then be used to create sprites
   * This can be quite useful if your displayObject is complicated and needs to be reused multiple times.
   * @param displayObject - The displayObject the object will be generated from.
   * @param {IGenerateTextureOptions} options - Generate texture options.
   * @param {PIXI.Rectangle} options.region - The region of the displayObject, that shall be rendered,
   *        if no region is specified, defaults to the local bounds of the displayObject.
   * @param {number} [options.resolution] - If not given, the renderer's resolution is used.
   * @param {PIXI.MSAA_QUALITY} [options.multisample] - If not given, the renderer's multisample is used.
   * @returns A texture of the graphics object.
   */generateTexture(t,e){return this.textureGenerator.generateTexture(t,e)}};a$.extension={type:sS.Renderer,priority:1},/**
* Collection of installed plugins. These are included by default in PIXI, but can be excluded
* by creating a custom build. Consult the README for more information about creating custom
* builds and excluding plugins.
* @private
*/a$.__plugins={},/**
* The collection of installed systems.
* @private
*/a$.__systems={},sI.handleByMap(sS.RendererPlugin,a$.__plugins),sI.handleByMap(sS.RendererSystem,a$.__systems),sI.add(a$);class aY extends sN{/**
   * @param length
   * @param options - Options to for Resource constructor
   * @param {number} [options.width] - Width of the resource
   * @param {number} [options.height] - Height of the resource
   */constructor(t,e){let{width:r,height:i}=e||{};super(r,i),this.items=[],this.itemDirtyIds=[];for(let e=0;e<t;e++){let t=new sk;this.items.push(t),this.itemDirtyIds.push(-2)}this.length=t,this._load=null,this.baseTexture=null}/**
   * Used from ArrayResource and CubeResource constructors.
   * @param resources - Can be resources, image elements, canvas, etc. ,
   *  length should be same as constructor length
   * @param options - Detect options for resources
   */initFromArray(t,e){for(let r=0;r<this.length;r++)t[r]&&(t[r].castToBaseTexture?this.addBaseTextureAt(t[r].castToBaseTexture(),r):t[r]instanceof sN?this.addResourceAt(t[r],r):this.addResourceAt(sO(t[r],e),r))}/** Destroy this BaseImageResource. */dispose(){for(let t=0,e=this.length;t<e;t++)this.items[t].destroy();this.items=null,this.itemDirtyIds=null,this._load=null}/**
   * Set a resource by ID
   * @param resource
   * @param index - Zero-based index of resource to set
   * @returns - Instance for chaining
   */addResourceAt(t,e){if(!this.items[e])throw Error(`Index ${e} is out of bounds`);return t.valid&&!this.valid&&this.resize(t.width,t.height),this.items[e].setResource(t),this}/**
   * Set the parent base texture.
   * @param baseTexture
   */bind(t){if(null!==this.baseTexture)throw Error("Only one base texture per TextureArray is allowed");super.bind(t);for(let e=0;e<this.length;e++)this.items[e].parentTextureArray=t,this.items[e].on("update",t.update,t)}/**
   * Unset the parent base texture.
   * @param baseTexture
   */unbind(t){super.unbind(t);for(let e=0;e<this.length;e++)this.items[e].parentTextureArray=null,this.items[e].off("update",t.update,t)}/**
   * Load all the resources simultaneously
   * @returns - When load is resolved
   */load(){if(this._load)return this._load;let t=this.items.map(t=>t.resource).filter(t=>t).map(t=>t.load());return this._load=Promise.all(t).then(()=>{let{realWidth:t,realHeight:e}=this.items[0];return this.resize(t,e),this.update(),Promise.resolve(this)}),this._load}}const aq=class t extends aY{/**
   * @param {Array<string|PIXI.Resource>} [source] - Collection of URLs or resources
   *        to use as the sides of the cube.
   * @param options - ImageResource options
   * @param {number} [options.width] - Width of resource
   * @param {number} [options.height] - Height of resource
   * @param {number} [options.autoLoad=true] - Whether to auto-load resources
   * @param {number} [options.linkBaseTexture=true] - In case BaseTextures are supplied,
   *   whether to copy them or use
   */constructor(e,r){let{width:i,height:s,autoLoad:n,linkBaseTexture:a}=r||{};if(e&&e.length!==t.SIDES)throw Error(`Invalid length. Got ${e.length}, expected 6`);super(6,{width:i,height:s});for(let e=0;e<t.SIDES;e++)this.items[e].target=q.TEXTURE_CUBE_MAP_POSITIVE_X+e;this.linkBaseTexture=!1!==a,e&&this.initFromArray(e,r),!1!==n&&this.load()}/**
   * Add binding.
   * @param baseTexture - parent base texture
   */bind(t){super.bind(t),t.target=q.TEXTURE_CUBE_MAP}addBaseTextureAt(t,e,r){if(void 0===r&&(r=this.linkBaseTexture),!this.items[e])throw Error(`Index ${e} is out of bounds`);if(!this.linkBaseTexture||t.parentTextureArray||Object.keys(t._glTextures).length>0){if(t.resource)this.addResourceAt(t.resource,e);else throw Error("CubeResource does not support copying of renderTexture.")}else t.target=q.TEXTURE_CUBE_MAP_POSITIVE_X+e,t.parentTextureArray=this.baseTexture,this.items[e]=t;return t.valid&&!this.valid&&this.resize(t.realWidth,t.realHeight),this.items[e]=t,this}/**
   * Upload the resource
   * @param renderer
   * @param _baseTexture
   * @param glTexture
   * @returns {boolean} true is success
   */upload(e,r,i){let s=this.itemDirtyIds;for(let n=0;n<t.SIDES;n++){let t=this.items[n];(s[n]<t.dirtyId||i.dirtyId<r.dirtyId)&&(t.valid&&t.resource?(t.resource.upload(e,t,i),s[n]=t.dirtyId):s[n]<-1&&(e.gl.texImage2D(t.target,0,i.internalFormat,r.realWidth,r.realHeight,0,r.format,i.type,null),s[n]=-1))}return!0}/**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if source is an array of 6 elements
   */static test(e){return Array.isArray(e)&&e.length===t.SIDES}};aq.SIDES=6;class aK extends nW{/**
   * @param source - ImageBitmap or URL to use.
   * @param options - Options to use.
   */constructor(t,e){let r,i,s;e=e||{},"string"==typeof t?(r=aK.EMPTY,i=t,s=!0):(r=t,i=null,s=!1),super(r),this.url=i,this.crossOrigin=e.crossOrigin??!0,this.alphaMode="number"==typeof e.alphaMode?e.alphaMode:null,this.ownsImageBitmap=e.ownsImageBitmap??s,this._load=null,!1!==e.autoLoad&&this.load()}load(){return this._load||(this._load=new Promise(async(t,e)=>{if(null===this.url){t(this);return}try{let e=await tl.ADAPTER.fetch(this.url,{mode:this.crossOrigin?"cors":"no-cors"});if(this.destroyed)return;let r=await e.blob();if(this.destroyed)return;let i=await createImageBitmap(r,{premultiplyAlpha:null===this.alphaMode||this.alphaMode===te.UNPACK?"premultiply":"none"});if(this.destroyed){i.close();return}this.source=i,this.update(),t(this)}catch(t){if(this.destroyed)return;e(t),this.onError.emit(t)}})),this._load}/**
   * Upload the image bitmap resource to GPU.
   * @param renderer - Renderer to upload to
   * @param baseTexture - BaseTexture for this resource
   * @param glTexture - GLTexture to use
   * @returns {boolean} true is success
   */upload(t,e,r){return this.source instanceof ImageBitmap?("number"==typeof this.alphaMode&&(e.alphaMode=this.alphaMode),super.upload(t,e,r)):(this.load(),!1)}/** Destroys this resource. */dispose(){this.ownsImageBitmap&&this.source instanceof ImageBitmap&&this.source.close(),super.dispose(),this._load=null}/**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if current environment support ImageBitmap, and source is string or ImageBitmap
   */static test(t){return!!globalThis.createImageBitmap&&"u">typeof ImageBitmap&&("string"==typeof t||t instanceof ImageBitmap)}/**
   * ImageBitmap cannot be created synchronously, so a empty placeholder canvas is needed when loading from URLs.
   * Only for internal usage.
   * @returns The cached placeholder canvas.
   */static get EMPTY(){return aK._EMPTY=aK._EMPTY??tl.ADAPTER.createCanvas(0,0),aK._EMPTY}}const aZ=class t extends nW{/**
   * @param sourceBase64 - Base64 encoded SVG element or URL for SVG file.
   * @param {object} [options] - Options to use
   * @param {number} [options.scale=1] - Scale to apply to SVG. Overridden by...
   * @param {number} [options.width] - Rasterize SVG this wide. Aspect ratio preserved if height not specified.
   * @param {number} [options.height] - Rasterize SVG this high. Aspect ratio preserved if width not specified.
   * @param {boolean} [options.autoLoad=true] - Start loading right away.
   */constructor(t,e){e=e||{},super(tl.ADAPTER.createCanvas()),this._width=0,this._height=0,this.svg=t,this.scale=e.scale||1,this._overrideWidth=e.width,this._overrideHeight=e.height,this._resolve=null,this._crossorigin=e.crossorigin,this._load=null,!1!==e.autoLoad&&this.load()}load(){return this._load||(this._load=new Promise(e=>{if(this._resolve=()=>{this.update(),e(this)},t.SVG_XML.test(this.svg.trim())){if(!btoa)throw Error("Your browser doesn't support base64 conversions.");this.svg=`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(this.svg)))}`}this._loadSvg()})),this._load}/** Loads an SVG image from `imageUrl` or `data URL`. */_loadSvg(){let t=new Image;nW.crossOrigin(t,this.svg,this._crossorigin),t.src=this.svg,t.onerror=e=>{this._resolve&&(t.onerror=null,this.onError.emit(e))},t.onload=()=>{if(!this._resolve)return;let e=t.width,r=t.height;if(!e||!r)throw Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");let i=e*this.scale,s=r*this.scale;(this._overrideWidth||this._overrideHeight)&&(i=this._overrideWidth||this._overrideHeight/r*e,s=this._overrideHeight||this._overrideWidth/e*r),i=Math.round(i),s=Math.round(s);let n=this.source;n.width=i,n.height=s,n._pixiId=`canvas_${sl()}`,n.getContext("2d").drawImage(t,0,0,e,r,0,0,i,s),this._resolve(),this._resolve=null}}/**
   * Get size from an svg string using a regular expression.
   * @param svgString - a serialized svg element
   * @returns - image extension
   */static getSize(e){let r=t.SVG_SIZE.exec(e),i={};return r&&(i[r[1]]=Math.round(parseFloat(r[3])),i[r[5]]=Math.round(parseFloat(r[7]))),i}/** Destroys this texture. */dispose(){super.dispose(),this._resolve=null,this._crossorigin=null}/**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @param {string} extension - The extension of source, if set
   * @returns {boolean} - If the source is a SVG source or data file
   */static test(e,r){return"svg"===r||"string"==typeof e&&e.startsWith("data:image/svg+xml")||"string"==typeof e&&t.SVG_XML.test(e)}};aZ.SVG_XML=/^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m,/**
* Regular expression for SVG size.
* @example &lt;svg width="100" height="100"&gt;&lt;/svg&gt;
* @readonly
*/aZ.SVG_SIZE=/<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i;const aQ=class t extends nW{/**
   * @param {HTMLVideoElement|object|string|Array<string|object>} source - Video element to use.
   * @param {object} [options] - Options to use
   * @param {boolean} [options.autoLoad=true] - Start loading the video immediately
   * @param {boolean} [options.autoPlay=true] - Start playing video immediately
   * @param {number} [options.updateFPS=0] - How many times a second to update the texture from the video.
   * Leave at 0 to update at every render.
   * @param {boolean} [options.crossorigin=true] - Load image using cross origin
   * @param {boolean} [options.loop=false] - Loops the video
   * @param {boolean} [options.muted=false] - Mutes the video audio, useful for autoplay
   * @param {boolean} [options.playsinline=true] - Prevents opening the video on mobile devices
   */constructor(e,r){if(r=r||{},!(e instanceof HTMLVideoElement)){let i=document.createElement("video");!1!==r.autoLoad&&i.setAttribute("preload","auto"),!1!==r.playsinline&&(i.setAttribute("webkit-playsinline",""),i.setAttribute("playsinline","")),!0===r.muted&&(i.setAttribute("muted",""),i.muted=!0),!0===r.loop&&i.setAttribute("loop",""),!1!==r.autoPlay&&i.setAttribute("autoplay",""),"string"==typeof e&&(e=[e]);let s=e[0].src||e[0];nW.crossOrigin(i,s,r.crossorigin);for(let r=0;r<e.length;++r){let s=document.createElement("source"),{src:n,mime:a}=e[r];if((n=n||e[r]).startsWith("data:"))a=n.slice(5,n.indexOf(";"));else if(!n.startsWith("blob:")){let e=n.split("?").shift().toLowerCase(),r=e.slice(e.lastIndexOf(".")+1);a=a||t.MIME_TYPES[r]||`video/${r}`}s.src=n,a&&(s.type=a),i.appendChild(s)}e=i}super(e),this.noSubImage=!0,this._autoUpdate=!0,this._isConnectedToTicker=!1,this._updateFPS=r.updateFPS||0,this._msToNextUpdate=0,this.autoPlay=!1!==r.autoPlay,this._videoFrameRequestCallback=this._videoFrameRequestCallback.bind(this),this._videoFrameRequestCallbackHandle=null,this._load=null,this._resolve=null,this._reject=null,this._onCanPlay=this._onCanPlay.bind(this),this._onError=this._onError.bind(this),this._onPlayStart=this._onPlayStart.bind(this),this._onPlayStop=this._onPlayStop.bind(this),this._onSeeked=this._onSeeked.bind(this),!1!==r.autoLoad&&this.load()}/**
   * Trigger updating of the texture.
   * @param _deltaTime - time delta since last tick
   */update(t=0){if(!this.destroyed){if(this._updateFPS){let t=aU.shared.elapsedMS*this.source.playbackRate;this._msToNextUpdate=Math.floor(this._msToNextUpdate-t)}(!this._updateFPS||this._msToNextUpdate<=0)&&(super.update(),this._msToNextUpdate=this._updateFPS?Math.floor(1e3/this._updateFPS):0)}}_videoFrameRequestCallback(){this.update(),this.destroyed?this._videoFrameRequestCallbackHandle=null:this._videoFrameRequestCallbackHandle=this.source.requestVideoFrameCallback(this._videoFrameRequestCallback)}/**
   * Start preloading the video resource.
   * @returns {Promise<void>} Handle the validate event
   */load(){if(this._load)return this._load;let t=this.source;return(t.readyState===t.HAVE_ENOUGH_DATA||t.readyState===t.HAVE_FUTURE_DATA)&&t.width&&t.height&&(t.complete=!0),t.addEventListener("play",this._onPlayStart),t.addEventListener("pause",this._onPlayStop),t.addEventListener("seeked",this._onSeeked),this._isSourceReady()?this._onCanPlay():(t.addEventListener("canplay",this._onCanPlay),t.addEventListener("canplaythrough",this._onCanPlay),t.addEventListener("error",this._onError,!0)),this._load=new Promise((e,r)=>{this.valid?e(this):(this._resolve=e,this._reject=r,t.load())}),this._load}/**
   * Handle video error events.
   * @param event
   */_onError(t){this.source.removeEventListener("error",this._onError,!0),this.onError.emit(t),this._reject&&(this._reject(t),this._reject=null,this._resolve=null)}/**
   * Returns true if the underlying source is playing.
   * @returns - True if playing.
   */_isSourcePlaying(){let t=this.source;return!t.paused&&!t.ended&&this._isSourceReady()}/**
   * Returns true if the underlying source is ready for playing.
   * @returns - True if ready.
   */_isSourceReady(){return this.source.readyState>2}/** Runs the update loop when the video is ready to play. */_onPlayStart(){this.valid||this._onCanPlay(),this._configureAutoUpdate()}/** Fired when a pause event is triggered, stops the update loop. */_onPlayStop(){this._configureAutoUpdate()}/** Fired when the video is completed seeking to the current playback position. */_onSeeked(){this._autoUpdate&&!this._isSourcePlaying()&&(this._msToNextUpdate=0,this.update(),this._msToNextUpdate=0)}/** Fired when the video is loaded and ready to play. */_onCanPlay(){let t=this.source;t.removeEventListener("canplay",this._onCanPlay),t.removeEventListener("canplaythrough",this._onCanPlay);let e=this.valid;this._msToNextUpdate=0,this.update(),this._msToNextUpdate=0,!e&&this._resolve&&(this._resolve(this),this._resolve=null,this._reject=null),this._isSourcePlaying()?this._onPlayStart():this.autoPlay&&t.play()}/** Destroys this texture. */dispose(){this._configureAutoUpdate();let t=this.source;t&&(t.removeEventListener("play",this._onPlayStart),t.removeEventListener("pause",this._onPlayStop),t.removeEventListener("seeked",this._onSeeked),t.removeEventListener("canplay",this._onCanPlay),t.removeEventListener("canplaythrough",this._onCanPlay),t.removeEventListener("error",this._onError,!0),t.pause(),t.src="",t.load()),super.dispose()}/** Should the base texture automatically update itself, set to true by default. */get autoUpdate(){return this._autoUpdate}set autoUpdate(t){t!==this._autoUpdate&&(this._autoUpdate=t,this._configureAutoUpdate())}/**
   * How many times a second to update the texture from the video. Leave at 0 to update at every render.
   * A lower fps can help performance, as updating the texture at 60fps on a 30ps video may not be efficient.
   */get updateFPS(){return this._updateFPS}set updateFPS(t){t!==this._updateFPS&&(this._updateFPS=t,this._configureAutoUpdate())}_configureAutoUpdate(){this._autoUpdate&&this._isSourcePlaying()?!this._updateFPS&&this.source.requestVideoFrameCallback?(this._isConnectedToTicker&&(aU.shared.remove(this.update,this),this._isConnectedToTicker=!1,this._msToNextUpdate=0),null===this._videoFrameRequestCallbackHandle&&(this._videoFrameRequestCallbackHandle=this.source.requestVideoFrameCallback(this._videoFrameRequestCallback))):(null!==this._videoFrameRequestCallbackHandle&&(this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),this._videoFrameRequestCallbackHandle=null),this._isConnectedToTicker||(aU.shared.add(this.update,this),this._isConnectedToTicker=!0,this._msToNextUpdate=0)):(null!==this._videoFrameRequestCallbackHandle&&(this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),this._videoFrameRequestCallbackHandle=null),this._isConnectedToTicker&&(aU.shared.remove(this.update,this),this._isConnectedToTicker=!1,this._msToNextUpdate=0))}/**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @param {string} extension - The extension of source, if set
   * @returns {boolean} `true` if video source
   */static test(e,r){return globalThis.HTMLVideoElement&&e instanceof HTMLVideoElement||t.TYPES.includes(r)}};aQ.TYPES=["mp4","m4v","webm","ogg","ogv","h264","avi","mov"],/**
* Map of video MIME types that can't be directly derived from file extensions.
* @readonly
*/aQ.MIME_TYPES={ogv:"video/ogg",mov:"video/quicktime",m4v:"video/mp4"},sD.push(aK,n$,class extends nW{/**
   * @param source - Canvas element to use
   */// eslint-disable-next-line @typescript-eslint/no-useless-constructor
constructor(t){super(t)}/**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if source is HTMLCanvasElement or OffscreenCanvas
   */static test(t){let{OffscreenCanvas:e}=globalThis;return!!e&&t instanceof e||globalThis.HTMLCanvasElement&&t instanceof HTMLCanvasElement}},aQ,aZ,sF,aq,class extends aY{/**
   * @param source - Number of items in array or the collection
   *        of image URLs to use. Can also be resources, image elements, canvas, etc.
   * @param options - Options to apply to {@link PIXI.autoDetectResource}
   * @param {number} [options.width] - Width of the resource
   * @param {number} [options.height] - Height of the resource
   */constructor(t,e){let r,i;let{width:s,height:n}=e||{};Array.isArray(t)?(r=t,i=t.length):i=t,super(i,{width:s,height:n}),r&&this.initFromArray(r,e)}/**
   * Set a baseTexture by ID,
   * ArrayResource just takes resource from it, nothing more
   * @param baseTexture
   * @param index - Zero-based index of resource to set
   * @returns - Instance for chaining
   */addBaseTextureAt(t,e){if(t.resource)this.addResourceAt(t.resource,e);else throw Error("ArrayResource does not support RenderTexture");return this}/**
   * Add binding
   * @param baseTexture
   */bind(t){super.bind(t),t.target=q.TEXTURE_2D_ARRAY}/**
   * Upload the resources to the GPU.
   * @param renderer
   * @param texture
   * @param glTexture
   * @returns - whether texture was uploaded
   */upload(t,e,r){let{length:i,itemDirtyIds:s,items:n}=this,{gl:a}=t;r.dirtyId<0&&a.texImage3D(a.TEXTURE_2D_ARRAY,0,r.internalFormat,this._width,this._height,i,0,e.format,r.type,null);for(let t=0;t<i;t++){let i=n[t];s[t]<i.dirtyId&&(s[t]=i.dirtyId,i.valid&&a.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,t,i.resource.width,i.resource.height,1,e.format,r.type,i.resource.source))}return!0}});class aJ{constructor(){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this.rect=null,this.updateID=-1}/**
   * Checks if bounds are empty.
   * @returns - True if empty.
   */isEmpty(){return this.minX>this.maxX||this.minY>this.maxY}/** Clears the bounds and resets. */clear(){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0}/**
   * Can return Rectangle.EMPTY constant, either construct new rectangle, either use your rectangle
   * It is not guaranteed that it will return tempRect
   * @param rect - Temporary object will be used if AABB is not empty
   * @returns - A rectangle of the bounds
   */getRectangle(t){return this.minX>this.maxX||this.minY>this.maxY?s2.EMPTY:((t=t||new s2(0,0,1,1)).x=this.minX,t.y=this.minY,t.width=this.maxX-this.minX,t.height=this.maxY-this.minY,t)}/**
   * This function should be inlined when its possible.
   * @param point - The point to add.
   */addPoint(t){this.minX=Math.min(this.minX,t.x),this.maxX=Math.max(this.maxX,t.x),this.minY=Math.min(this.minY,t.y),this.maxY=Math.max(this.maxY,t.y)}/**
   * Adds a point, after transformed. This should be inlined when its possible.
   * @param matrix
   * @param point
   */addPointMatrix(t,e){let{a:r,b:i,c:s,d:n,tx:a,ty:o}=t,h=r*e.x+s*e.y+a,l=i*e.x+n*e.y+o;this.minX=Math.min(this.minX,h),this.maxX=Math.max(this.maxX,h),this.minY=Math.min(this.minY,l),this.maxY=Math.max(this.maxY,l)}/**
   * Adds a quad, not transformed
   * @param vertices - The verts to add.
   */addQuad(t){let e=this.minX,r=this.minY,i=this.maxX,s=this.maxY,n=t[0],a=t[1];e=n<e?n:e,r=a<r?a:r,i=n>i?n:i,s=a>s?a:s,n=t[2],a=t[3],e=n<e?n:e,r=a<r?a:r,i=n>i?n:i,s=a>s?a:s,n=t[4],a=t[5],e=n<e?n:e,r=a<r?a:r,i=n>i?n:i,s=a>s?a:s,n=t[6],a=t[7],e=n<e?n:e,r=a<r?a:r,i=n>i?n:i,s=a>s?a:s,this.minX=e,this.minY=r,this.maxX=i,this.maxY=s}/**
   * Adds sprite frame, transformed.
   * @param transform - transform to apply
   * @param x0 - left X of frame
   * @param y0 - top Y of frame
   * @param x1 - right X of frame
   * @param y1 - bottom Y of frame
   */addFrame(t,e,r,i,s){this.addFrameMatrix(t.worldTransform,e,r,i,s)}/**
   * Adds sprite frame, multiplied by matrix
   * @param matrix - matrix to apply
   * @param x0 - left X of frame
   * @param y0 - top Y of frame
   * @param x1 - right X of frame
   * @param y1 - bottom Y of frame
   */addFrameMatrix(t,e,r,i,s){let n=t.a,a=t.b,o=t.c,h=t.d,l=t.tx,u=t.ty,d=this.minX,c=this.minY,p=this.maxX,f=this.maxY,m=n*e+o*r+l,g=a*e+h*r+u;d=m<d?m:d,c=g<c?g:c,p=m>p?m:p,f=g>f?g:f,m=n*i+o*r+l,g=a*i+h*r+u,d=m<d?m:d,c=g<c?g:c,p=m>p?m:p,f=g>f?g:f,m=n*e+o*s+l,g=a*e+h*s+u,d=m<d?m:d,c=g<c?g:c,p=m>p?m:p,f=g>f?g:f,m=n*i+o*s+l,g=a*i+h*s+u,d=m<d?m:d,c=g<c?g:c,p=m>p?m:p,f=g>f?g:f,this.minX=d,this.minY=c,this.maxX=p,this.maxY=f}/**
   * Adds screen vertices from array
   * @param vertexData - calculated vertices
   * @param beginOffset - begin offset
   * @param endOffset - end offset, excluded
   */addVertexData(t,e,r){let i=this.minX,s=this.minY,n=this.maxX,a=this.maxY;for(let o=e;o<r;o+=2){let e=t[o],r=t[o+1];i=e<i?e:i,s=r<s?r:s,n=e>n?e:n,a=r>a?r:a}this.minX=i,this.minY=s,this.maxX=n,this.maxY=a}/**
   * Add an array of mesh vertices
   * @param transform - mesh transform
   * @param vertices - mesh coordinates in array
   * @param beginOffset - begin offset
   * @param endOffset - end offset, excluded
   */addVertices(t,e,r,i){this.addVerticesMatrix(t.worldTransform,e,r,i)}/**
   * Add an array of mesh vertices.
   * @param matrix - mesh matrix
   * @param vertices - mesh coordinates in array
   * @param beginOffset - begin offset
   * @param endOffset - end offset, excluded
   * @param padX - x padding
   * @param padY - y padding
   */addVerticesMatrix(t,e,r,i,s=0,n=s){let a=t.a,o=t.b,h=t.c,l=t.d,u=t.tx,d=t.ty,c=this.minX,p=this.minY,f=this.maxX,m=this.maxY;for(let t=r;t<i;t+=2){let r=e[t],i=e[t+1],g=a*r+h*i+u,_=l*i+o*r+d;c=Math.min(c,g-s),f=Math.max(f,g+s),p=Math.min(p,_-n),m=Math.max(m,_+n)}this.minX=c,this.minY=p,this.maxX=f,this.maxY=m}/**
   * Adds other {@link PIXI.Bounds}.
   * @param bounds - The Bounds to be added
   */addBounds(t){let e=this.minX,r=this.minY,i=this.maxX,s=this.maxY;this.minX=t.minX<e?t.minX:e,this.minY=t.minY<r?t.minY:r,this.maxX=t.maxX>i?t.maxX:i,this.maxY=t.maxY>s?t.maxY:s}/**
   * Adds other Bounds, masked with Bounds.
   * @param bounds - The Bounds to be added.
   * @param mask - TODO
   */addBoundsMask(t,e){let r=t.minX>e.minX?t.minX:e.minX,i=t.minY>e.minY?t.minY:e.minY,s=t.maxX<e.maxX?t.maxX:e.maxX,n=t.maxY<e.maxY?t.maxY:e.maxY;if(r<=s&&i<=n){let t=this.minX,e=this.minY,a=this.maxX,o=this.maxY;this.minX=r<t?r:t,this.minY=i<e?i:e,this.maxX=s>a?s:a,this.maxY=n>o?n:o}}/**
   * Adds other Bounds, multiplied by matrix. Bounds shouldn't be empty.
   * @param bounds - other bounds
   * @param matrix - multiplicator
   */addBoundsMatrix(t,e){this.addFrameMatrix(e,t.minX,t.minY,t.maxX,t.maxY)}/**
   * Adds other Bounds, masked with Rectangle.
   * @param bounds - TODO
   * @param area - TODO
   */addBoundsArea(t,e){let r=t.minX>e.x?t.minX:e.x,i=t.minY>e.y?t.minY:e.y,s=t.maxX<e.x+e.width?t.maxX:e.x+e.width,n=t.maxY<e.y+e.height?t.maxY:e.y+e.height;if(r<=s&&i<=n){let t=this.minX,e=this.minY,a=this.maxX,o=this.maxY;this.minX=r<t?r:t,this.minY=i<e?i:e,this.maxX=s>a?s:a,this.maxY=n>o?n:o}}/**
   * Pads bounds object, making it grow in all directions.
   * If paddingY is omitted, both paddingX and paddingY will be set to paddingX.
   * @param paddingX - The horizontal padding amount.
   * @param paddingY - The vertical padding amount.
   */pad(t=0,e=t){this.isEmpty()||(this.minX-=t,this.maxX+=t,this.minY-=e,this.maxY+=e)}/**
   * Adds padded frame. (x0, y0) should be strictly less than (x1, y1)
   * @param x0 - left X of frame
   * @param y0 - top Y of frame
   * @param x1 - right X of frame
   * @param y1 - bottom Y of frame
   * @param padX - padding X
   * @param padY - padding Y
   */addFramePad(t,e,r,i,s,n){t-=s,e-=n,r+=s,i+=n,this.minX=this.minX<t?this.minX:t,this.maxX=this.maxX>r?this.maxX:r,this.minY=this.minY<e?this.minY:e,this.maxY=this.maxY>i?this.maxY:i}}class a0 extends tC.EventEmitter{constructor(){super(),this.tempDisplayObjectParent=null,this.transform=new no,this.alpha=1,this.visible=!0,this.renderable=!0,this.cullable=!1,this.cullArea=null,this.parent=null,this.worldAlpha=1,this._lastSortedIndex=0,this._zIndex=0,this.filterArea=null,this.filters=null,this._enabledFilters=null,this._bounds=new aJ,this._localBounds=null,this._boundsID=0,this._boundsRect=null,this._localBoundsRect=null,this._mask=null,this._maskRefCount=0,this._destroyed=!1,this.isSprite=!1,this.isMask=!1}/**
   * Mixes all enumerable properties and methods from a source object to DisplayObject.
   * @param source - The source of properties and methods to mix in.
   */static mixin(t){let e=Object.keys(t);for(let r=0;r<e.length;++r){let i=e[r];Object.defineProperty(a0.prototype,i,Object.getOwnPropertyDescriptor(t,i))}}/**
   * Fired when this DisplayObject is added to a Container.
   * @instance
   * @event added
   * @param {PIXI.Container} container - The container added to.
   *//**
   * Fired when this DisplayObject is removed from a Container.
   * @instance
   * @event removed
   * @param {PIXI.Container} container - The container removed from.
   *//**
   * Fired when this DisplayObject is destroyed. This event is emitted once
   * destroy is finished.
   * @instance
   * @event destroyed
   *//** Readonly flag for destroyed display objects. */get destroyed(){return this._destroyed}/** Recursively updates transform of all objects from the root to this one internal function for toLocal() */_recursivePostUpdateTransform(){this.parent?(this.parent._recursivePostUpdateTransform(),this.transform.updateTransform(this.parent.transform)):this.transform.updateTransform(this._tempDisplayObjectParent.transform)}/** Updates the object transform for rendering. TODO - Optimization pass! */updateTransform(){this._boundsID++,this.transform.updateTransform(this.parent.transform),this.worldAlpha=this.alpha*this.parent.worldAlpha}/**
   * Calculates and returns the (world) bounds of the display object as a [Rectangle]{@link PIXI.Rectangle}.
   *
   * This method is expensive on containers with a large subtree (like the stage). This is because the bounds
   * of a container depend on its children's bounds, which recursively causes all bounds in the subtree to
   * be recalculated. The upside, however, is that calling `getBounds` once on a container will indeed update
   * the bounds of all children (the whole subtree, in fact). This side effect should be exploited by using
   * `displayObject._bounds.getRectangle()` when traversing through all the bounds in a scene graph. Otherwise,
   * calling `getBounds` on each object in a subtree will cause the total cost to increase quadratically as
   * its height increases.
   *
   * The transforms of all objects in a container's **subtree** and of all **ancestors** are updated.
   * The world bounds of all display objects in a container's **subtree** will also be recalculated.
   *
   * The `_bounds` object stores the last calculation of the bounds. You can use to entirely skip bounds
   * calculation if needed.
   *
   * ```js
   * const lastCalculatedBounds = displayObject._bounds.getRectangle(optionalRect);
   * ```
   *
   * Do know that usage of `getLocalBounds` can corrupt the `_bounds` of children (the whole subtree, actually). This
   * is a known issue that has not been solved. See [getLocalBounds]{@link PIXI.DisplayObject#getLocalBounds} for more
   * details.
   *
   * `getBounds` should be called with `skipUpdate` equal to `true` in a render() call. This is because the transforms
   * are guaranteed to be update-to-date. In fact, recalculating inside a render() call may cause corruption in certain
   * cases.
   * @param skipUpdate - Setting to `true` will stop the transforms of the scene graph from
   *  being updated. This means the calculation returned MAY be out of date BUT will give you a
   *  nice performance boost.
   * @param rect - Optional rectangle to store the result of the bounds calculation.
   * @returns - The minimum axis-aligned rectangle in world space that fits around this object.
   */getBounds(t,e){return t||(this.parent?(this._recursivePostUpdateTransform(),this.updateTransform()):(this.parent=this._tempDisplayObjectParent,this.updateTransform(),this.parent=null)),this._bounds.updateID!==this._boundsID&&(this.calculateBounds(),this._bounds.updateID=this._boundsID),e||(this._boundsRect||(this._boundsRect=new s2),e=this._boundsRect),this._bounds.getRectangle(e)}/**
   * Retrieves the local bounds of the displayObject as a rectangle object.
   * @param rect - Optional rectangle to store the result of the bounds calculation.
   * @returns - The rectangular bounding area.
   */getLocalBounds(t){t||(this._localBoundsRect||(this._localBoundsRect=new s2),t=this._localBoundsRect),this._localBounds||(this._localBounds=new aJ);let e=this.transform,r=this.parent;this.parent=null,this._tempDisplayObjectParent.worldAlpha=r?.worldAlpha??1,this.transform=this._tempDisplayObjectParent.transform;let i=this._bounds,s=this._boundsID;this._bounds=this._localBounds;let n=this.getBounds(!1,t);return this.parent=r,this.transform=e,this._bounds=i,this._bounds.updateID+=this._boundsID-s,n}/**
   * Calculates the global position of the display object.
   * @param position - The world origin to calculate from.
   * @param point - A Point object in which to store the value, optional
   *  (otherwise will create a new Point).
   * @param skipUpdate - Should we skip the update transform.
   * @returns - A point object representing the position of this object.
   */toGlobal(t,e,r=!1){return r||(this._recursivePostUpdateTransform(),this.parent?this.displayObjectUpdateTransform():(this.parent=this._tempDisplayObjectParent,this.displayObjectUpdateTransform(),this.parent=null)),this.worldTransform.apply(t,e)}/**
   * Calculates the local position of the display object relative to another point.
   * @param position - The world origin to calculate from.
   * @param from - The DisplayObject to calculate the global position from.
   * @param point - A Point object in which to store the value, optional
   *  (otherwise will create a new Point).
   * @param skipUpdate - Should we skip the update transform
   * @returns - A point object representing the position of this object
   */toLocal(t,e,r,i){return e&&(t=e.toGlobal(t,r,i)),i||(this._recursivePostUpdateTransform(),this.parent?this.displayObjectUpdateTransform():(this.parent=this._tempDisplayObjectParent,this.displayObjectUpdateTransform(),this.parent=null)),this.worldTransform.applyInverse(t,r)}/**
   * Set the parent Container of this DisplayObject.
   * @param container - The Container to add this DisplayObject to.
   * @returns - The Container that this DisplayObject was added to.
   */setParent(t){if(!t||!t.addChild)throw Error("setParent: Argument must be a Container");return t.addChild(this),t}/** Remove the DisplayObject from its parent Container. If the DisplayObject has no parent, do nothing. */removeFromParent(){this.parent?.removeChild(this)}/**
   * Convenience function to set the position, scale, skew and pivot at once.
   * @param x - The X position
   * @param y - The Y position
   * @param scaleX - The X scale value
   * @param scaleY - The Y scale value
   * @param rotation - The rotation
   * @param skewX - The X skew value
   * @param skewY - The Y skew value
   * @param pivotX - The X pivot value
   * @param pivotY - The Y pivot value
   * @returns - The DisplayObject instance
   */setTransform(t=0,e=0,r=1,i=1,s=0,n=0,a=0,o=0,h=0){return this.position.x=t,this.position.y=e,this.scale.x=r||1,this.scale.y=i||1,this.rotation=s,this.skew.x=n,this.skew.y=a,this.pivot.x=o,this.pivot.y=h,this}/**
   * Base destroy method for generic display objects. This will automatically
   * remove the display object from its parent Container as well as remove
   * all current event listeners and internal references. Do not use a DisplayObject
   * after calling `destroy()`.
   * @param _options
   */destroy(t){this.removeFromParent(),this._destroyed=!0,this.transform=null,this.parent=null,this._bounds=null,this.mask=null,this.cullArea=null,this.filters=null,this.filterArea=null,this.hitArea=null,this.eventMode="auto",this.interactiveChildren=!1,this.emit("destroyed"),this.removeAllListeners()}/**
   * @protected
   * @member {PIXI.Container}
   */get _tempDisplayObjectParent(){return null===this.tempDisplayObjectParent&&(this.tempDisplayObjectParent=new a1),this.tempDisplayObjectParent}/**
   * Used in Renderer, cacheAsBitmap and other places where you call an `updateTransform` on root.
   *
   * ```js
   * const cacheParent = elem.enableTempParent();
   * elem.updateTransform();
   * elem.disableTempParent(cacheParent);
   * ```
   * @returns - Current parent
   */enableTempParent(){let t=this.parent;return this.parent=this._tempDisplayObjectParent,t}/**
   * Pair method for `enableTempParent`
   * @param cacheParent - Actual parent of element
   */disableTempParent(t){this.parent=t}/**
   * The position of the displayObject on the x axis relative to the local coordinates of the parent.
   * An alias to position.x
   */get x(){return this.position.x}set x(t){this.transform.position.x=t}/**
   * The position of the displayObject on the y axis relative to the local coordinates of the parent.
   * An alias to position.y
   */get y(){return this.position.y}set y(t){this.transform.position.y=t}/**
   * Current transform of the object based on world (parent) factors.
   * @readonly
   */get worldTransform(){return this.transform.worldTransform}/**
   * Current transform of the object based on local factors: position, scale, other stuff.
   * @readonly
   */get localTransform(){return this.transform.localTransform}/**
   * The coordinate of the object relative to the local coordinates of the parent.
   * @since 4.0.0
   */get position(){return this.transform.position}set position(t){this.transform.position.copyFrom(t)}/**
   * The scale factors of this object along the local coordinate axes.
   *
   * The default scale is (1, 1).
   * @since 4.0.0
   */get scale(){return this.transform.scale}set scale(t){this.transform.scale.copyFrom(t)}/**
   * The center of rotation, scaling, and skewing for this display object in its local space. The `position`
   * is the projection of `pivot` in the parent's local space.
   *
   * By default, the pivot is the origin (0, 0).
   * @since 4.0.0
   */get pivot(){return this.transform.pivot}set pivot(t){this.transform.pivot.copyFrom(t)}/**
   * The skew factor for the object in radians.
   * @since 4.0.0
   */get skew(){return this.transform.skew}set skew(t){this.transform.skew.copyFrom(t)}/**
   * The rotation of the object in radians.
   * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
   */get rotation(){return this.transform.rotation}set rotation(t){this.transform.rotation=t}/**
   * The angle of the object in degrees.
   * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
   */get angle(){return this.transform.rotation*sZ}set angle(t){this.transform.rotation=t*sQ}/**
   * The zIndex of the displayObject.
   *
   * If a container has the sortableChildren property set to true, children will be automatically
   * sorted by zIndex value; a higher value will mean it will be moved towards the end of the array,
   * and thus rendered on top of other display objects within the same container.
   * @see PIXI.Container#sortableChildren
   */get zIndex(){return this._zIndex}set zIndex(t){this._zIndex=t,this.parent&&(this.parent.sortDirty=!0)}/**
   * Indicates if the object is globally visible.
   * @readonly
   */get worldVisible(){let t=this;do{if(!t.visible)return!1;t=t.parent}while(t)return!0}/**
   * Sets a mask for the displayObject. A mask is an object that limits the visibility of an
   * object to the shape of the mask applied to it. In PixiJS a regular mask must be a
   * {@link PIXI.Graphics} or a {@link PIXI.Sprite} object. This allows for much faster masking in canvas as it
   * utilities shape clipping. Furthermore, a mask of an object must be in the subtree of its parent.
   * Otherwise, `getLocalBounds` may calculate incorrect bounds, which makes the container's width and height wrong.
   * To remove a mask, set this property to `null`.
   *
   * For sprite mask both alpha and red channel are used. Black mask is the same as transparent mask.
   * @example
   * import { Graphics, Sprite } from 'pixi.js';
   *
   * const graphics = new Graphics();
   * graphics.beginFill(0xFF3300);
   * graphics.drawRect(50, 250, 100, 100);
   * graphics.endFill();
   *
   * const sprite = new Sprite(texture);
   * sprite.mask = graphics;
   * @todo At the moment, CanvasRenderer doesn't support Sprite as mask.
   */get mask(){return this._mask}set mask(t){if(this._mask!==t){if(this._mask){let t=this._mask.isMaskData?this._mask.maskObject:this._mask;t&&(t._maskRefCount--,0===t._maskRefCount&&(t.renderable=!0,t.isMask=!1))}if(this._mask=t,this._mask){let t=this._mask.isMaskData?this._mask.maskObject:this._mask;t&&(0===t._maskRefCount&&(t.renderable=!1,t.isMask=!0),t._maskRefCount++)}}}}class a1 extends a0{constructor(){super(...arguments),this.sortDirty=null}}a0.prototype.displayObjectUpdateTransform=a0.prototype.updateTransform;const a2=new s8;function a3(t,e){return t.zIndex===e.zIndex?t._lastSortedIndex-e._lastSortedIndex:t.zIndex-e.zIndex}const a4=class t extends a0{constructor(){super(),this.children=[],this.sortableChildren=t.defaultSortableChildren,this.sortDirty=!1}/**
   * Overridable method that can be used by Container subclasses whenever the children array is modified.
   * @param _length
   */onChildrenChange(t){}/**
   * Adds one or more children to the container.
   *
   * Multiple items can be added like so: `myContainer.addChild(thingOne, thingTwo, thingThree)`
   * @param {...PIXI.DisplayObject} children - The DisplayObject(s) to add to the container
   * @returns {PIXI.DisplayObject} - The first child that was added.
   */addChild(...t){if(t.length>1)for(let e=0;e<t.length;e++)this.addChild(t[e]);else{let e=t[0];e.parent&&e.parent.removeChild(e),e.parent=this,this.sortDirty=!0,e.transform._parentID=-1,this.children.push(e),this._boundsID++,this.onChildrenChange(this.children.length-1),this.emit("childAdded",e,this,this.children.length-1),e.emit("added",this)}return t[0]}/**
   * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown.
   * If the child is already in this container, it will be moved to the specified index.
   * @param {PIXI.DisplayObject} child - The child to add.
   * @param {number} index - The absolute index where the child will be positioned at the end of the operation.
   * @returns {PIXI.DisplayObject} The child that was added.
   */addChildAt(t,e){if(e<0||e>this.children.length)throw Error(`${t}addChildAt: The index ${e} supplied is out of bounds ${this.children.length}`);return t.parent&&t.parent.removeChild(t),t.parent=this,this.sortDirty=!0,t.transform._parentID=-1,this.children.splice(e,0,t),this._boundsID++,this.onChildrenChange(e),t.emit("added",this),this.emit("childAdded",t,this,e),t}/**
   * Swaps the position of 2 Display Objects within this container.
   * @param child - First display object to swap
   * @param child2 - Second display object to swap
   */swapChildren(t,e){if(t===e)return;let r=this.getChildIndex(t),i=this.getChildIndex(e);this.children[r]=e,this.children[i]=t,this.onChildrenChange(r<i?r:i)}/**
   * Returns the index position of a child DisplayObject instance
   * @param child - The DisplayObject instance to identify
   * @returns - The index position of the child display object to identify
   */getChildIndex(t){let e=this.children.indexOf(t);if(-1===e)throw Error("The supplied DisplayObject must be a child of the caller");return e}/**
   * Changes the position of an existing child in the display object container
   * @param child - The child DisplayObject instance for which you want to change the index number
   * @param index - The resulting index number for the child display object
   */setChildIndex(t,e){if(e<0||e>=this.children.length)throw Error(`The index ${e} supplied is out of bounds ${this.children.length}`);let r=this.getChildIndex(t);tC.removeItems(this.children,r,1),this.children.splice(e,0,t),this.onChildrenChange(e)}/**
   * Returns the child at the specified index
   * @param index - The index to get the child at
   * @returns - The child at the given index, if any.
   */getChildAt(t){if(t<0||t>=this.children.length)throw Error(`getChildAt: Index (${t}) does not exist.`);return this.children[t]}/**
   * Removes one or more children from the container.
   * @param {...PIXI.DisplayObject} children - The DisplayObject(s) to remove
   * @returns {PIXI.DisplayObject} The first child that was removed.
   */removeChild(...t){if(t.length>1)for(let e=0;e<t.length;e++)this.removeChild(t[e]);else{let e=t[0],r=this.children.indexOf(e);if(-1===r)return null;e.parent=null,e.transform._parentID=-1,tC.removeItems(this.children,r,1),this._boundsID++,this.onChildrenChange(r),e.emit("removed",this),this.emit("childRemoved",e,this,r)}return t[0]}/**
   * Removes a child from the specified index position.
   * @param index - The index to get the child from
   * @returns The child that was removed.
   */removeChildAt(t){let e=this.getChildAt(t);return e.parent=null,e.transform._parentID=-1,tC.removeItems(this.children,t,1),this._boundsID++,this.onChildrenChange(t),e.emit("removed",this),this.emit("childRemoved",e,this,t),e}/**
   * Removes all children from this container that are within the begin and end indexes.
   * @param beginIndex - The beginning position.
   * @param endIndex - The ending position. Default value is size of the container.
   * @returns - List of removed children
   */removeChildren(t=0,e=this.children.length){let r;let i=e-t;if(i>0&&i<=e){r=this.children.splice(t,i);for(let t=0;t<r.length;++t)r[t].parent=null,r[t].transform&&(r[t].transform._parentID=-1);this._boundsID++,this.onChildrenChange(t);for(let t=0;t<r.length;++t)r[t].emit("removed",this),this.emit("childRemoved",r[t],this,t);return r}if(0===i&&0===this.children.length)return[];throw RangeError("removeChildren: numeric values are outside the acceptable range.")}/** Sorts children by zIndex. Previous order is maintained for 2 children with the same zIndex. */sortChildren(){let t=!1;for(let e=0,r=this.children.length;e<r;++e){let r=this.children[e];r._lastSortedIndex=e,t||0===r.zIndex||(t=!0)}t&&this.children.length>1&&this.children.sort(a3),this.sortDirty=!1}/** Updates the transform on all children of this container for rendering. */updateTransform(){this.sortableChildren&&this.sortDirty&&this.sortChildren(),this._boundsID++,this.transform.updateTransform(this.parent.transform),this.worldAlpha=this.alpha*this.parent.worldAlpha;for(let t=0,e=this.children.length;t<e;++t){let e=this.children[t];e.visible&&e.updateTransform()}}/**
   * Recalculates the bounds of the container.
   *
   * This implementation will automatically fit the children's bounds into the calculation. Each child's bounds
   * is limited to its mask's bounds or filterArea, if any is applied.
   */calculateBounds(){this._bounds.clear(),this._calculateBounds();for(let t=0;t<this.children.length;t++){let e=this.children[t];if(!(!e.visible||!e.renderable)){if(e.calculateBounds(),e._mask){let t=e._mask.isMaskData?e._mask.maskObject:e._mask;t?(t.calculateBounds(),this._bounds.addBoundsMask(e._bounds,t._bounds)):this._bounds.addBounds(e._bounds)}else e.filterArea?this._bounds.addBoundsArea(e._bounds,e.filterArea):this._bounds.addBounds(e._bounds)}}this._bounds.updateID=this._boundsID}/**
   * Retrieves the local bounds of the displayObject as a rectangle object.
   *
   * Calling `getLocalBounds` may invalidate the `_bounds` of the whole subtree below. If using it inside a render()
   * call, it is advised to call `getBounds()` immediately after to recalculate the world bounds of the subtree.
   * @param rect - Optional rectangle to store the result of the bounds calculation.
   * @param skipChildrenUpdate - Setting to `true` will stop re-calculation of children transforms,
   *  it was default behaviour of pixi 4.0-5.2 and caused many problems to users.
   * @returns - The rectangular bounding area.
   */getLocalBounds(t,e=!1){let r=super.getLocalBounds(t);if(!e)for(let t=0,e=this.children.length;t<e;++t){let e=this.children[t];e.visible&&e.updateTransform()}return r}/**
   * Recalculates the content bounds of this object. This should be overriden to
   * calculate the bounds of this specific object (not including children).
   * @protected
   */_calculateBounds(){}/**
   * Renders this object and its children with culling.
   * @protected
   * @param {PIXI.Renderer} renderer - The renderer
   */_renderWithCulling(e){let r,i;let s=e.renderTexture.sourceFrame;if(!(s.width>0&&s.height>0))return;this.cullArea?(r=this.cullArea,i=this.worldTransform):this._render!==t.prototype._render&&(r=this.getBounds(!0));let n=e.projection.transform;if(n&&(i?(i=a2.copyFrom(i)).prepend(n):i=n),r&&s.intersects(r,i))this._render(e);else if(this.cullArea)return;for(let t=0,r=this.children.length;t<r;++t){let r=this.children[t],i=r.cullable;r.cullable=i||!this.cullArea,r.render(e),r.cullable=i}}/**
   * Renders the object using the WebGL renderer.
   *
   * The [_render]{@link PIXI.Container#_render} method is be overriden for rendering the contents of the
   * container itself. This `render` method will invoke it, and also invoke the `render` methods of all
   * children afterward.
   *
   * If `renderable` or `visible` is false or if `worldAlpha` is not positive or if `cullable` is true and
   * the bounds of this object are out of frame, this implementation will entirely skip rendering.
   * See {@link PIXI.DisplayObject} for choosing between `renderable` or `visible`. Generally,
   * setting alpha to zero is not recommended for purely skipping rendering.
   *
   * When your scene becomes large (especially when it is larger than can be viewed in a single screen), it is
   * advised to employ **culling** to automatically skip rendering objects outside of the current screen.
   * See [cullable]{@link PIXI.DisplayObject#cullable} and [cullArea]{@link PIXI.DisplayObject#cullArea}.
   * Other culling methods might be better suited for a large number static objects; see
   * [@pixi-essentials/cull]{@link https://www.npmjs.com/package/@pixi-essentials/cull} and
   * [pixi-cull]{@link https://www.npmjs.com/package/pixi-cull}.
   *
   * The [renderAdvanced]{@link PIXI.Container#renderAdvanced} method is internally used when when masking or
   * filtering is applied on a container. This does, however, break batching and can affect performance when
   * masking and filtering is applied extensively throughout the scene graph.
   * @param renderer - The renderer
   */render(t){if(!(!this.visible||this.worldAlpha<=0||!this.renderable)){if(this._mask||this.filters?.length)this.renderAdvanced(t);else if(this.cullable)this._renderWithCulling(t);else{this._render(t);for(let e=0,r=this.children.length;e<r;++e)this.children[e].render(t)}}}/**
   * Render the object using the WebGL renderer and advanced features.
   * @param renderer - The renderer
   */renderAdvanced(t){let e=this.filters,r=this._mask;if(e){this._enabledFilters||(this._enabledFilters=[]),this._enabledFilters.length=0;for(let t=0;t<e.length;t++)e[t].enabled&&this._enabledFilters.push(e[t])}let i=e&&this._enabledFilters?.length||r&&(!r.isMaskData||r.enabled&&(r.autoDetect||r.type!==tn.NONE));if(i&&t.batch.flush(),e&&this._enabledFilters?.length&&t.filter.push(this,this._enabledFilters),r&&t.mask.push(this,this._mask),this.cullable)this._renderWithCulling(t);else{this._render(t);for(let e=0,r=this.children.length;e<r;++e)this.children[e].render(t)}i&&t.batch.flush(),r&&t.mask.pop(this),e&&this._enabledFilters?.length&&t.filter.pop()}/**
   * To be overridden by the subclasses.
   * @param _renderer - The renderer
   */_render(t){}/**
   * Removes all internal references and listeners as well as removes children from the display list.
   * Do not use a Container after calling `destroy`.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.children=false] - if set to true, all the children will have their destroy
   *  method called as well. 'options' will be passed on to those calls.
   * @param {boolean} [options.texture=false] - Only used for child Sprites if options.children is set to true
   *  Should it destroy the texture of the child sprite
   * @param {boolean} [options.baseTexture=false] - Only used for child Sprites if options.children is set to true
   *  Should it destroy the base texture of the child sprite
   */destroy(t){super.destroy(),this.sortDirty=!1;let e="boolean"==typeof t?t:t?.children,r=this.removeChildren(0,this.children.length);if(e)for(let e=0;e<r.length;++e)r[e].destroy(t)}/** The width of the Container, setting this will actually modify the scale to achieve the value set. */get width(){return this.scale.x*this.getLocalBounds().width}set width(t){let e=this.getLocalBounds().width;0!==e?this.scale.x=t/e:this.scale.x=1,this._width=t}/** The height of the Container, setting this will actually modify the scale to achieve the value set. */get height(){return this.scale.y*this.getLocalBounds().height}set height(t){let e=this.getLocalBounds().height;0!==e?this.scale.y=t/e:this.scale.y=1,this._height=t}};a4.defaultSortableChildren=!1;let a5=a4;a5.prototype.containerUpdateTransform=a5.prototype.updateTransform,Object.defineProperties(tl,{/**
   * Sets the default value for the container property 'sortableChildren'.
   * @static
   * @name SORTABLE_CHILDREN
   * @memberof PIXI.settings
   * @deprecated since 7.1.0
   * @type {boolean}
   * @see PIXI.Container.defaultSortableChildren
   */SORTABLE_CHILDREN:{get:()=>a5.defaultSortableChildren,set(t){tC.deprecation("7.1.0","settings.SORTABLE_CHILDREN is deprecated, use Container.defaultSortableChildren"),a5.defaultSortableChildren=t}}});const a6=new s0,a8=new Uint16Array([0,1,2,0,2,3]);class a7 extends a5{/** @param texture - The texture for this sprite. */constructor(t){super(),this._anchor=new na(this._onAnchorUpdate,this,t?t.defaultAnchor.x:0,t?t.defaultAnchor.y:0),this._texture=null,this._width=0,this._height=0,this._tintColor=new iQ(16777215),this._tintRGB=null,this.tint=16777215,this.blendMode=W.NORMAL,this._cachedTint=16777215,this.uvs=null,this.texture=t||nZ.EMPTY,this.vertexData=new Float32Array(8),this.vertexTrimmedData=null,this._transformID=-1,this._textureID=-1,this._transformTrimmedID=-1,this._textureTrimmedID=-1,this.indices=a8,this.pluginName="batch",this.isSprite=!0,this._roundPixels=tl.ROUND_PIXELS}/** When the texture is updated, this event will fire to update the scale and frame. */_onTextureUpdate(){this._textureID=-1,this._textureTrimmedID=-1,this._cachedTint=16777215,this._width&&(this.scale.x=tC.sign(this.scale.x)*this._width/this._texture.orig.width),this._height&&(this.scale.y=tC.sign(this.scale.y)*this._height/this._texture.orig.height)}/** Called when the anchor position updates. */_onAnchorUpdate(){this._transformID=-1,this._transformTrimmedID=-1}/** Calculates worldTransform * vertices, store it in vertexData. */calculateVertices(){let t=this._texture;if(this._transformID===this.transform._worldID&&this._textureID===t._updateID)return;this._textureID!==t._updateID&&(this.uvs=this._texture._uvs.uvsFloat32),this._transformID=this.transform._worldID,this._textureID=t._updateID;let e=this.transform.worldTransform,r=e.a,i=e.b,s=e.c,n=e.d,a=e.tx,o=e.ty,h=this.vertexData,l=t.trim,u=t.orig,d=this._anchor,c=0,p=0,f=0,m=0;if(l?(c=(p=l.x-d._x*u.width)+l.width,f=(m=l.y-d._y*u.height)+l.height):(c=(p=-d._x*u.width)+u.width,f=(m=-d._y*u.height)+u.height),h[0]=r*p+s*m+a,h[1]=n*m+i*p+o,h[2]=r*c+s*m+a,h[3]=n*m+i*c+o,h[4]=r*c+s*f+a,h[5]=n*f+i*c+o,h[6]=r*p+s*f+a,h[7]=n*f+i*p+o,this._roundPixels){let t=tl.RESOLUTION;for(let e=0;e<h.length;++e)h[e]=Math.round(h[e]*t)/t}}/**
   * Calculates worldTransform * vertices for a non texture with a trim. store it in vertexTrimmedData.
   *
   * This is used to ensure that the true width and height of a trimmed texture is respected.
   */calculateTrimmedVertices(){if(this.vertexTrimmedData){if(this._transformTrimmedID===this.transform._worldID&&this._textureTrimmedID===this._texture._updateID)return}else this.vertexTrimmedData=new Float32Array(8);this._transformTrimmedID=this.transform._worldID,this._textureTrimmedID=this._texture._updateID;let t=this._texture,e=this.vertexTrimmedData,r=t.orig,i=this._anchor,s=this.transform.worldTransform,n=s.a,a=s.b,o=s.c,h=s.d,l=s.tx,u=s.ty,d=-i._x*r.width,c=d+r.width,p=-i._y*r.height,f=p+r.height;if(e[0]=n*d+o*p+l,e[1]=h*p+a*d+u,e[2]=n*c+o*p+l,e[3]=h*p+a*c+u,e[4]=n*c+o*f+l,e[5]=h*f+a*c+u,e[6]=n*d+o*f+l,e[7]=h*f+a*d+u,this._roundPixels){let t=tl.RESOLUTION;for(let r=0;r<e.length;++r)e[r]=Math.round(e[r]*t)/t}}/**
   *
   * Renders the object using the WebGL renderer
   * @param renderer - The webgl renderer to use.
   */_render(t){this.calculateVertices(),t.batch.setObjectRenderer(t.plugins[this.pluginName]),t.plugins[this.pluginName].render(this)}/** Updates the bounds of the sprite. */_calculateBounds(){let t=this._texture.trim,e=this._texture.orig;t&&(t.width!==e.width||t.height!==e.height)?(this.calculateTrimmedVertices(),this._bounds.addQuad(this.vertexTrimmedData)):(this.calculateVertices(),this._bounds.addQuad(this.vertexData))}/**
   * Gets the local bounds of the sprite object.
   * @param rect - Optional output rectangle.
   * @returns The bounds.
   */getLocalBounds(t){return 0===this.children.length?(this._localBounds||(this._localBounds=new aJ),this._localBounds.minX=-(this._texture.orig.width*this._anchor._x),this._localBounds.minY=-(this._texture.orig.height*this._anchor._y),this._localBounds.maxX=this._texture.orig.width*(1-this._anchor._x),this._localBounds.maxY=this._texture.orig.height*(1-this._anchor._y),t||(this._localBoundsRect||(this._localBoundsRect=new s2),t=this._localBoundsRect),this._localBounds.getRectangle(t)):super.getLocalBounds.call(this,t)}/**
   * Tests if a point is inside this sprite
   * @param point - the point to test
   * @returns The result of the test
   */containsPoint(t){this.worldTransform.applyInverse(t,a6);let e=this._texture.orig.width,r=this._texture.orig.height,i=-e*this.anchor.x,s=0;return a6.x>=i&&a6.x<i+e&&(s=-r*this.anchor.y,a6.y>=s&&a6.y<s+r)}/**
   * Destroys this sprite and optionally its texture and children.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param [options.children=false] - if set to true, all the children will have their destroy
   *      method called as well. 'options' will be passed on to those calls.
   * @param [options.texture=false] - Should it destroy the current texture of the sprite as well
   * @param [options.baseTexture=false] - Should it destroy the base texture of the sprite as well
   */destroy(t){if(super.destroy(t),this._texture.off("update",this._onTextureUpdate,this),this._anchor=null,"boolean"==typeof t?t:t?.texture){let e="boolean"==typeof t?t:t?.baseTexture;this._texture.destroy(!!e)}this._texture=null}// some helper functions..
/**
   * Helper function that creates a new sprite based on the source you provide.
   * The source can be - frame id, image url, video url, canvas element, video element, base texture
   * @param {string|PIXI.Texture|HTMLImageElement|HTMLVideoElement|ImageBitmap|PIXI.ICanvas} source
   *     - Source to create texture from
   * @param {object} [options] - See {@link PIXI.BaseTexture}'s constructor for options.
   * @returns The newly created sprite
   */static from(t,e){let r=t instanceof nZ?t:nZ.from(t,e);return new a7(r)}/**
   * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
   *
   * Advantages can include sharper image quality (like text) and faster rendering on canvas.
   * The main disadvantage is movement of objects may appear less smooth.
   *
   * To set the global default, change {@link PIXI.settings.ROUND_PIXELS}.
   * @default false
   */set roundPixels(t){this._roundPixels!==t&&(this._transformID=-1,this._transformTrimmedID=-1),this._roundPixels=t}get roundPixels(){return this._roundPixels}/** The width of the sprite, setting this will actually modify the scale to achieve the value set. */get width(){return Math.abs(this.scale.x)*this._texture.orig.width}set width(t){let e=tC.sign(this.scale.x)||1;this.scale.x=e*t/this._texture.orig.width,this._width=t}/** The height of the sprite, setting this will actually modify the scale to achieve the value set. */get height(){return Math.abs(this.scale.y)*this._texture.orig.height}set height(t){let e=tC.sign(this.scale.y)||1;this.scale.y=e*t/this._texture.orig.height,this._height=t}/**
   * The anchor sets the origin point of the sprite. The default value is taken from the {@link PIXI.Texture|Texture}
   * and passed to the constructor.
   *
   * The default is `(0,0)`, this means the sprite's origin is the top left.
   *
   * Setting the anchor to `(0.5,0.5)` means the sprite's origin is centered.
   *
   * Setting the anchor to `(1,1)` would mean the sprite's origin point will be the bottom right corner.
   *
   * If you pass only single parameter, it will set both x and y to the same value as shown in the example below.
   * @example
   * import { Sprite } from 'pixi.js';
   *
   * const sprite = new Sprite(Texture.WHITE);
   * sprite.anchor.set(0.5); // This will set the origin to center. (0.5) is same as (0.5, 0.5).
   */get anchor(){return this._anchor}set anchor(t){this._anchor.copyFrom(t)}/**
   * The tint applied to the sprite. This is a hex value.
   *
   * A value of 0xFFFFFF will remove any tint effect.
   * @default 0xFFFFFF
   */get tint(){return this._tintColor.value}set tint(t){this._tintColor.setValue(t),this._tintRGB=this._tintColor.toLittleEndianNumber()}/**
   * Get the tint as a RGB integer.
   * @ignore
   */get tintValue(){return this._tintColor.toNumber()}/** The texture that the sprite is using. */get texture(){return this._texture}set texture(t){this._texture!==t&&(this._texture&&this._texture.off("update",this._onTextureUpdate,this),this._texture=t||nZ.EMPTY,this._cachedTint=16777215,this._textureID=-1,this._textureTrimmedID=-1,t&&(t.baseTexture.valid?this._onTextureUpdate():t.once("update",this._onTextureUpdate,this)))}}const a9=new s8;a0.prototype._cacheAsBitmap=!1,a0.prototype._cacheData=null,a0.prototype._cacheAsBitmapResolution=null,a0.prototype._cacheAsBitmapMultisample=null;class ot{constructor(){this.textureCacheId=null,this.originalRender=null,this.originalRenderCanvas=null,this.originalCalculateBounds=null,this.originalGetLocalBounds=null,this.originalUpdateTransform=null,this.originalDestroy=null,this.originalMask=null,this.originalFilterArea=null,this.originalContainsPoint=null,this.sprite=null}}Object.defineProperties(a0.prototype,{/**
   * The resolution to use for cacheAsBitmap. By default this will use the renderer's resolution
   * but can be overriden for performance. Lower values will reduce memory usage at the expense
   * of render quality. A falsey value of `null` or `0` will default to the renderer's resolution.
   * If `cacheAsBitmap` is set to `true`, this will re-render with the new resolution.
   * @member {number|null} cacheAsBitmapResolution
   * @memberof PIXI.DisplayObject#
   * @default null
   */cacheAsBitmapResolution:{get(){return this._cacheAsBitmapResolution},set(t){t!==this._cacheAsBitmapResolution&&(this._cacheAsBitmapResolution=t,this.cacheAsBitmap&&(this.cacheAsBitmap=!1,this.cacheAsBitmap=!0))}},/**
   * The number of samples to use for cacheAsBitmap. If set to `null`, the renderer's
   * sample count is used.
   * If `cacheAsBitmap` is set to `true`, this will re-render with the new number of samples.
   * @member {number|null} cacheAsBitmapMultisample
   * @memberof PIXI.DisplayObject#
   * @default null
   */cacheAsBitmapMultisample:{get(){return this._cacheAsBitmapMultisample},set(t){t!==this._cacheAsBitmapMultisample&&(this._cacheAsBitmapMultisample=t,this.cacheAsBitmap&&(this.cacheAsBitmap=!1,this.cacheAsBitmap=!0))}},/**
   * Set this to true if you want this display object to be cached as a bitmap.
   * This basically takes a snapshot of the display object as it is at that moment. It can
   * provide a performance benefit for complex static displayObjects.
   * To remove simply set this property to `false`
   *
   * IMPORTANT GOTCHA - Make sure that all your textures are preloaded BEFORE setting this property to true
   * as it will take a snapshot of what is currently there. If the textures have not loaded then they will not appear.
   * @member {boolean}
   * @memberof PIXI.DisplayObject#
   */cacheAsBitmap:{get(){return this._cacheAsBitmap},set(t){let e;this._cacheAsBitmap!==t&&(this._cacheAsBitmap=t,t?(this._cacheData||(this._cacheData=new ot),(e=this._cacheData).originalRender=this.render,e.originalRenderCanvas=this.renderCanvas,e.originalUpdateTransform=this.updateTransform,e.originalCalculateBounds=this.calculateBounds,e.originalGetLocalBounds=this.getLocalBounds,e.originalDestroy=this.destroy,e.originalContainsPoint=this.containsPoint,e.originalMask=this._mask,e.originalFilterArea=this.filterArea,this.render=this._renderCached,this.renderCanvas=this._renderCachedCanvas,this.destroy=this._cacheAsBitmapDestroy):((e=this._cacheData).sprite&&this._destroyCachedDisplayObject(),this.render=e.originalRender,this.renderCanvas=e.originalRenderCanvas,this.calculateBounds=e.originalCalculateBounds,this.getLocalBounds=e.originalGetLocalBounds,this.destroy=e.originalDestroy,this.updateTransform=e.originalUpdateTransform,this.containsPoint=e.originalContainsPoint,this._mask=e.originalMask,this.filterArea=e.originalFilterArea))}}}),a0.prototype._renderCached=function(t){this.visible&&!(this.worldAlpha<=0)&&this.renderable&&(this._initCachedDisplayObject(t),this._cacheData.sprite.transform._worldID=this.transform._worldID,this._cacheData.sprite.worldAlpha=this.worldAlpha,this._cacheData.sprite._render(t))},a0.prototype._initCachedDisplayObject=function(t){if(this._cacheData?.sprite)return;let e=this.alpha;this.alpha=1,t.batch.flush();let r=this.getLocalBounds(new s2,!0);if(this.filters?.length){let t=this.filters[0].padding;r.pad(t)}let i=this.cacheAsBitmapResolution||t.resolution;r.ceil(i),r.width=Math.max(r.width,1/i),r.height=Math.max(r.height,1/i);let s=t.renderTexture.current,n=t.renderTexture.sourceFrame.clone(),a=t.renderTexture.destinationFrame.clone(),o=t.projection.transform,h=nQ.create({width:r.width,height:r.height,resolution:i,multisample:this.cacheAsBitmapMultisample??t.multisample}),l=`cacheAsBitmap_${tC.uid()}`;this._cacheData.textureCacheId=l,sk.addToCache(h.baseTexture,l),nZ.addToCache(h,l);let u=this.transform.localTransform.copyTo(a9).invert().translate(-r.x,-r.y);this.render=this._cacheData.originalRender,t.render(this,{renderTexture:h,clear:!0,transform:u,skipUpdateTransform:!1}),t.framebuffer.blit(),t.projection.transform=o,t.renderTexture.bind(s,n,a),this.render=this._renderCached,this.updateTransform=this.displayObjectUpdateTransform,this.calculateBounds=this._calculateCachedBounds,this.getLocalBounds=this._getCachedLocalBounds,this._mask=null,this.filterArea=null,this.alpha=e;let d=new a7(h);d.transform.worldTransform=this.transform.worldTransform,d.anchor.x=-(r.x/r.width),d.anchor.y=-(r.y/r.height),d.alpha=e,d._bounds=this._bounds,this._cacheData.sprite=d,this.transform._parentID=-1,this.parent?this.updateTransform():(this.enableTempParent(),this.updateTransform(),this.disableTempParent(null)),this.containsPoint=d.containsPoint.bind(d)},a0.prototype._renderCachedCanvas=function(t){this.visible&&!(this.worldAlpha<=0)&&this.renderable&&(this._initCachedDisplayObjectCanvas(t),this._cacheData.sprite.worldAlpha=this.worldAlpha,this._cacheData.sprite._renderCanvas(t))},a0.prototype._initCachedDisplayObjectCanvas=function(t){if(this._cacheData?.sprite)return;let e=this.getLocalBounds(new s2,!0),r=this.alpha;this.alpha=1;let i=t.canvasContext.activeContext,s=t._projTransform,n=this.cacheAsBitmapResolution||t.resolution;e.ceil(n),e.width=Math.max(e.width,1/n),e.height=Math.max(e.height,1/n);let a=nQ.create({width:e.width,height:e.height,resolution:n}),o=`cacheAsBitmap_${tC.uid()}`;this._cacheData.textureCacheId=o,sk.addToCache(a.baseTexture,o),nZ.addToCache(a,o),this.transform.localTransform.copyTo(a9),a9.invert(),a9.tx-=e.x,a9.ty-=e.y,this.renderCanvas=this._cacheData.originalRenderCanvas,t.render(this,{renderTexture:a,clear:!0,transform:a9,skipUpdateTransform:!1}),t.canvasContext.activeContext=i,t._projTransform=s,this.renderCanvas=this._renderCachedCanvas,this.updateTransform=this.displayObjectUpdateTransform,this.calculateBounds=this._calculateCachedBounds,this.getLocalBounds=this._getCachedLocalBounds,this._mask=null,this.filterArea=null,this.alpha=r;let h=new a7(a);h.transform.worldTransform=this.transform.worldTransform,h.anchor.x=-(e.x/e.width),h.anchor.y=-(e.y/e.height),h.alpha=r,h._bounds=this._bounds,this._cacheData.sprite=h,this.transform._parentID=-1,this.parent?this.updateTransform():(this.parent=t._tempDisplayObjectParent,this.updateTransform(),this.parent=null),this.containsPoint=h.containsPoint.bind(h)},a0.prototype._calculateCachedBounds=function(){this._bounds.clear(),this._cacheData.sprite.transform._worldID=this.transform._worldID,this._cacheData.sprite._calculateBounds(),this._bounds.updateID=this._boundsID},a0.prototype._getCachedLocalBounds=function(){return this._cacheData.sprite.getLocalBounds(null)},a0.prototype._destroyCachedDisplayObject=function(){this._cacheData.sprite._texture.destroy(!0),this._cacheData.sprite=null,sk.removeFromCache(this._cacheData.textureCacheId),nZ.removeFromCache(this._cacheData.textureCacheId),this._cacheData.textureCacheId=null},a0.prototype._cacheAsBitmapDestroy=function(t){this.cacheAsBitmap=!1,this.destroy(t)},a0.prototype.name=null,a5.prototype.getChildByName=function(t,e){for(let e=0,r=this.children.length;e<r;e++)if(this.children[e].name===t)return this.children[e];if(e)for(let e=0,r=this.children.length;e<r;e++){let r=this.children[e];if(!r.getChildByName)continue;let i=r.getChildByName(t,!0);if(i)return i}return null},a0.prototype.getGlobalPosition=function(t=new s0,e=!1){return this.parent?this.parent.toGlobal(this.position,t,e):(t.x=this.position.x,t.y=this.position.y),t};var oe=`varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float uAlpha;

void main(void)
{
   gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;
}
`;const or={5:[.153388,.221461,.250301],7:[.071303,.131514,.189879,.214607],9:[.028532,.067234,.124009,.179044,.20236],11:[.0093,.028002,.065984,.121703,.175713,.198596],13:[.002406,.009255,.027867,.065666,.121117,.174868,.197641],15:[489e-6,.002403,.009246,.02784,.065602,.120999,.174697,.197448]},oi=["varying vec2 vBlurTexCoords[%size%];","uniform sampler2D uSampler;","void main(void)","{","    gl_FragColor = vec4(0.0);","    %blur%","}"].join(`
`),os=`
    attribute vec2 aVertexPosition;

    uniform mat3 projectionMatrix;

    uniform float strength;

    varying vec2 vBlurTexCoords[%size%];

    uniform vec4 inputSize;
    uniform vec4 outputFrame;

    vec4 filterVertexPosition( void )
    {
        vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

        return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
    }

    vec2 filterTextureCoord( void )
    {
        return aVertexPosition * (outputFrame.zw * inputSize.zw);
    }

    void main(void)
    {
        gl_Position = filterVertexPosition();

        vec2 textureCoord = filterTextureCoord();
        %blur%
    }`;class on extends nk{/**
   * @param horizontal - Do pass along the x-axis (`true`) or y-axis (`false`).
   * @param strength - The strength of the blur filter.
   * @param quality - The quality of the blur filter.
   * @param {number|null} [resolution=PIXI.Filter.defaultResolution] - The resolution of the blur filter.
   * @param kernelSize - The kernelSize of the blur filter.Options: 5, 7, 9, 11, 13, 15.
   */constructor(t,e=8,r=4,i=nk.defaultResolution,s=5){let n=function(t,e){let r=Math.ceil(t/2),i=os,s="",n;n=e?"vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * strength, 0.0);":"vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * strength);";for(let e=0;e<t;e++){let t=n.replace("%index%",e.toString());s+=(t=t.replace("%sampleIndex%",`${e-(r-1)}.0`))+`
`}return(i=i.replace("%blur%",s)).replace("%size%",t.toString())}(s,t),a=function(t){let e;let r=or[t],i=r.length,s=oi,n="";for(let s=0;s<t;s++){let a="gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;".replace("%index%",s.toString());e=s,s>=i&&(e=t-s-1),n+=(a=a.replace("%value%",r[e].toString()))+`
`}return(s=s.replace("%blur%",n)).replace("%size%",t.toString())}(s);super(n,a),this.horizontal=t,this.resolution=i,this._quality=0,this.quality=r,this.blur=e}/**
   * Applies the filter.
   * @param filterManager - The manager.
   * @param input - The input target.
   * @param output - The output target.
   * @param clearMode - How to clear
   */apply(t,e,r,i){if(r?this.horizontal?this.uniforms.strength=1/r.width*(r.width/e.width):this.uniforms.strength=1/r.height*(r.height/e.height):this.horizontal?this.uniforms.strength=1/t.renderer.width*(t.renderer.width/e.width):this.uniforms.strength=1/t.renderer.height*(t.renderer.height/e.height),this.uniforms.strength*=this.strength,this.uniforms.strength/=this.passes,1===this.passes)t.applyFilter(this,e,r,i);else{let s=t.getFilterTexture(),n=t.renderer,a=e,o=s;this.state.blend=!1,t.applyFilter(this,a,o,tr.CLEAR);for(let e=1;e<this.passes-1;e++){t.bindAndClear(a,tr.BLIT),this.uniforms.uSampler=o;let e=o;o=a,a=e,n.shader.bind(this),n.geometry.draw(5)}this.state.blend=!0,t.applyFilter(this,o,r,i),t.returnFilterTexture(s)}}/**
   * Sets the strength of both the blur.
   * @default 16
   */get blur(){return this.strength}set blur(t){this.padding=1+2*Math.abs(t),this.strength=t}/**
   * Sets the quality of the blur by modifying the number of passes. More passes means higher
   * quality bluring but the lower the performance.
   * @default 4
   */get quality(){return this._quality}set quality(t){this._quality=t,this.passes=t}}var oa=`varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float m[20];
uniform float uAlpha;

void main(void)
{
    vec4 c = texture2D(uSampler, vTextureCoord);

    if (uAlpha == 0.0) {
        gl_FragColor = c;
        return;
    }

    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (c.a > 0.0) {
      c.rgb /= c.a;
    }

    vec4 result;

    result.r = (m[0] * c.r);
        result.r += (m[1] * c.g);
        result.r += (m[2] * c.b);
        result.r += (m[3] * c.a);
        result.r += m[4];

    result.g = (m[5] * c.r);
        result.g += (m[6] * c.g);
        result.g += (m[7] * c.b);
        result.g += (m[8] * c.a);
        result.g += m[9];

    result.b = (m[10] * c.r);
       result.b += (m[11] * c.g);
       result.b += (m[12] * c.b);
       result.b += (m[13] * c.a);
       result.b += m[14];

    result.a = (m[15] * c.r);
       result.a += (m[16] * c.g);
       result.a += (m[17] * c.b);
       result.a += (m[18] * c.a);
       result.a += m[19];

    vec3 rgb = mix(c.rgb, result.rgb, uAlpha);

    // Premultiply alpha again.
    rgb *= result.a;

    gl_FragColor = vec4(rgb, result.a);
}
`;class oo extends nk{constructor(){let t={m:new Float32Array([1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0]),uAlpha:1};super(aj,oa,t),this.alpha=1}/**
   * Transforms current matrix and set the new one
   * @param {number[]} matrix - 5x4 matrix
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */_loadMatrix(t,e=!1){let r=t;e&&(this._multiply(r,this.uniforms.m,t),r=this._colorMatrix(r)),this.uniforms.m=r}/**
   * Multiplies two mat5's
   * @private
   * @param out - 5x4 matrix the receiving matrix
   * @param a - 5x4 matrix the first operand
   * @param b - 5x4 matrix the second operand
   * @returns {number[]} 5x4 matrix
   */_multiply(t,e,r){return t[0]=e[0]*r[0]+e[1]*r[5]+e[2]*r[10]+e[3]*r[15],t[1]=e[0]*r[1]+e[1]*r[6]+e[2]*r[11]+e[3]*r[16],t[2]=e[0]*r[2]+e[1]*r[7]+e[2]*r[12]+e[3]*r[17],t[3]=e[0]*r[3]+e[1]*r[8]+e[2]*r[13]+e[3]*r[18],t[4]=e[0]*r[4]+e[1]*r[9]+e[2]*r[14]+e[3]*r[19]+e[4],t[5]=e[5]*r[0]+e[6]*r[5]+e[7]*r[10]+e[8]*r[15],t[6]=e[5]*r[1]+e[6]*r[6]+e[7]*r[11]+e[8]*r[16],t[7]=e[5]*r[2]+e[6]*r[7]+e[7]*r[12]+e[8]*r[17],t[8]=e[5]*r[3]+e[6]*r[8]+e[7]*r[13]+e[8]*r[18],t[9]=e[5]*r[4]+e[6]*r[9]+e[7]*r[14]+e[8]*r[19]+e[9],t[10]=e[10]*r[0]+e[11]*r[5]+e[12]*r[10]+e[13]*r[15],t[11]=e[10]*r[1]+e[11]*r[6]+e[12]*r[11]+e[13]*r[16],t[12]=e[10]*r[2]+e[11]*r[7]+e[12]*r[12]+e[13]*r[17],t[13]=e[10]*r[3]+e[11]*r[8]+e[12]*r[13]+e[13]*r[18],t[14]=e[10]*r[4]+e[11]*r[9]+e[12]*r[14]+e[13]*r[19]+e[14],t[15]=e[15]*r[0]+e[16]*r[5]+e[17]*r[10]+e[18]*r[15],t[16]=e[15]*r[1]+e[16]*r[6]+e[17]*r[11]+e[18]*r[16],t[17]=e[15]*r[2]+e[16]*r[7]+e[17]*r[12]+e[18]*r[17],t[18]=e[15]*r[3]+e[16]*r[8]+e[17]*r[13]+e[18]*r[18],t[19]=e[15]*r[4]+e[16]*r[9]+e[17]*r[14]+e[18]*r[19]+e[19],t}/**
   * Create a Float32 Array and normalize the offset component to 0-1
   * @param {number[]} matrix - 5x4 matrix
   * @returns {number[]} 5x4 matrix with all values between 0-1
   */_colorMatrix(t){let e=new Float32Array(t);return e[4]/=255,e[9]/=255,e[14]/=255,e[19]/=255,e}/**
   * Adjusts brightness
   * @param b - value of the brigthness (0-1, where 0 is black)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */brightness(t,e){let r=[t,0,0,0,0,0,t,0,0,0,0,0,t,0,0,0,0,0,1,0];this._loadMatrix(r,e)}/**
   * Sets each channel on the diagonal of the color matrix.
   * This can be used to achieve a tinting effect on Containers similar to the tint field of some
   * display objects like Sprite, Text, Graphics, and Mesh.
   * @param color - Color of the tint. This is a hex value.
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */tint(t,e){let[r,i,s]=iQ.shared.setValue(t).toArray(),n=[r,0,0,0,0,0,i,0,0,0,0,0,s,0,0,0,0,0,1,0];this._loadMatrix(n,e)}/**
   * Set the matrices in grey scales
   * @param scale - value of the grey (0-1, where 0 is black)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */greyscale(t,e){let r=[t,t,t,0,0,t,t,t,0,0,t,t,t,0,0,0,0,0,1,0];this._loadMatrix(r,e)}/**
   * Set the black and white matrice.
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */blackAndWhite(t){this._loadMatrix([.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0],t)}/**
   * Set the hue property of the color
   * @param rotation - in degrees
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */hue(t,e){t=(t||0)/180*Math.PI;let r=Math.cos(t),i=Math.sin(t),s=1/3,n=(0,Math.sqrt)(s),a=r+(1-r)*s,o=s*(1-r)-n*i,h=s*(1-r)+n*i,l=s*(1-r)+n*i,u=r+s*(1-r),d=s*(1-r)-n*i,c=s*(1-r)-n*i,p=s*(1-r)+n*i,f=r+s*(1-r),m=[a,o,h,0,0,l,u,d,0,0,c,p,f,0,0,0,0,0,1,0];this._loadMatrix(m,e)}/**
   * Set the contrast matrix, increase the separation between dark and bright
   * Increase contrast : shadows darker and highlights brighter
   * Decrease contrast : bring the shadows up and the highlights down
   * @param amount - value of the contrast (0-1)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */contrast(t,e){let r=(t||0)+1,i=-.5*(r-1),s=[r,0,0,0,i,0,r,0,0,i,0,0,r,0,i,0,0,0,1,0];this._loadMatrix(s,e)}/**
   * Set the saturation matrix, increase the separation between colors
   * Increase saturation : increase contrast, brightness, and sharpness
   * @param amount - The saturation amount (0-1)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */saturate(t=0,e){let r=2*t/3+1,i=-((r-1)*.5),s=[r,i,i,0,0,i,r,i,0,0,i,i,r,0,0,0,0,0,1,0];this._loadMatrix(s,e)}/** Desaturate image (remove color) Call the saturate function */desaturate(){this.saturate(-1)}/**
   * Negative image (inverse of classic rgb matrix)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */negative(t){this._loadMatrix([-1,0,0,1,0,0,-1,0,1,0,0,0,-1,1,0,0,0,0,1,0],t)}/**
   * Sepia image
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */sepia(t){this._loadMatrix([.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0],t)}/**
   * Color motion picture process invented in 1916 (thanks Dominic Szablewski)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */technicolor(t){this._loadMatrix([1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0],t)}/**
   * Polaroid filter
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */polaroid(t){this._loadMatrix([1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0],t)}/**
   * Filter who transforms : Red -> Blue and Blue -> Red
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */toBGR(t){this._loadMatrix([0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0],t)}/**
   * Color reversal film introduced by Eastman Kodak in 1935. (thanks Dominic Szablewski)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */kodachrome(t){this._loadMatrix([1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0],t)}/**
   * Brown delicious browni filter (thanks Dominic Szablewski)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */browni(t){this._loadMatrix([.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0],t)}/**
   * Vintage filter (thanks Dominic Szablewski)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */vintage(t){this._loadMatrix([.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0],t)}/**
   * We don't know exactly what it does, kind of gradient map, but funny to play with!
   * @param desaturation - Tone values.
   * @param toned - Tone values.
   * @param lightColor - Tone values, example: `0xFFE580`
   * @param darkColor - Tone values, example: `0xFFE580`
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */colorTone(t,e,r,i,s){t=t||.2,e=e||.15,r=r||16770432,i=i||3375104;let n=iQ.shared,[a,o,h]=n.setValue(r).toArray(),[l,u,d]=n.setValue(i).toArray(),c=[.3,.59,.11,0,0,a,o,h,t,0,l,u,d,e,0,a-l,o-u,h-d,0,0];this._loadMatrix(c,s)}/**
   * Night effect
   * @param intensity - The intensity of the night effect.
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */night(t,e){t=t||.1;let r=[-2*t,-t,0,0,0,-t,0,t,0,0,0,t,2*t,0,0,0,0,0,1,0];this._loadMatrix(r,e)}/**
   * Predator effect
   *
   * Erase the current matrix by setting a new indepent one
   * @param amount - how much the predator feels his future victim
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */predator(t,e){this._loadMatrix([// row 1
11.224130630493164*t,-4.794486999511719*t,-2.8746118545532227*t,0*t,.40342438220977783*t,// row 2
-3.6330697536468506*t,9.193157196044922*t,-2.951810836791992*t,0*t,-1.316135048866272*t,// row 3
-3.2184197902679443*t,-4.2375030517578125*t,7.476448059082031*t,0*t,.8044459223747253*t,// row 4
0,0,0,1,0],e)}/**
   * LSD effect
   *
   * Multiply the current matrix
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */lsd(t){this._loadMatrix([2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0],t)}/** Erase the current matrix by setting the default one. */reset(){this._loadMatrix([1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],!1)}/**
   * The matrix of the color matrix filter
   * @member {number[]}
   * @default [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
   */get matrix(){return this.uniforms.m}set matrix(t){this.uniforms.m=t}/**
   * The opacity value to use when mixing the original and resultant colors.
   *
   * When the value is 0, the original color is used without modification.
   * When the value is 1, the result color is used.
   * When in the range (0, 1) the color is interpolated between the original and result by this amount.
   * @default 1
   */get alpha(){return this.uniforms.uAlpha}set alpha(t){this.uniforms.uAlpha=t}}oo.prototype.grayscale=oo.prototype.greyscale;var oh=`varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform vec2 scale;
uniform mat2 rotation;
uniform sampler2D uSampler;
uniform sampler2D mapSampler;

uniform highp vec4 inputSize;
uniform vec4 inputClamp;

void main(void)
{
  vec4 map =  texture2D(mapSampler, vFilterCoord);

  map -= 0.5;
  map.xy = scale * inputSize.zw * (rotation * map.xy);

  gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), inputClamp.xy, inputClamp.zw));
}
`,ol=`attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;
uniform mat3 filterMatrix;

varying vec2 vTextureCoord;
varying vec2 vFilterCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
	gl_Position = filterVertexPosition();
	vTextureCoord = filterTextureCoord();
	vFilterCoord = ( filterMatrix * vec3( vTextureCoord, 1.0)  ).xy;
}
`,ou=`varying vec2 v_rgbNW;
varying vec2 v_rgbNE;
varying vec2 v_rgbSW;
varying vec2 v_rgbSE;
varying vec2 v_rgbM;

varying vec2 vFragCoord;
uniform sampler2D uSampler;
uniform highp vec4 inputSize;


/**
 Basic FXAA implementation based on the code on geeks3d.com with the
 modification that the texture2DLod stuff was removed since it's
 unsupported by WebGL.

 --

 From:
 https://github.com/mitsuhiko/webgl-meincraft

 Copyright (c) 2011 by Armin Ronacher.

 Some rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are
 met:

 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.

 * Redistributions in binary form must reproduce the above
 copyright notice, this list of conditions and the following
 disclaimer in the documentation and/or other materials provided
 with the distribution.

 * The names of the contributors may not be used to endorse or
 promote products derived from this software without specific
 prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

#ifndef FXAA_REDUCE_MIN
#define FXAA_REDUCE_MIN   (1.0/ 128.0)
#endif
#ifndef FXAA_REDUCE_MUL
#define FXAA_REDUCE_MUL   (1.0 / 8.0)
#endif
#ifndef FXAA_SPAN_MAX
#define FXAA_SPAN_MAX     8.0
#endif

//optimized version for mobile, where dependent
//texture reads can be a bottleneck
vec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 inverseVP,
          vec2 v_rgbNW, vec2 v_rgbNE,
          vec2 v_rgbSW, vec2 v_rgbSE,
          vec2 v_rgbM) {
    vec4 color;
    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;
    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;
    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;
    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;
    vec4 texColor = texture2D(tex, v_rgbM);
    vec3 rgbM  = texColor.xyz;
    vec3 luma = vec3(0.299, 0.587, 0.114);
    float lumaNW = dot(rgbNW, luma);
    float lumaNE = dot(rgbNE, luma);
    float lumaSW = dot(rgbSW, luma);
    float lumaSE = dot(rgbSE, luma);
    float lumaM  = dot(rgbM,  luma);
    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));

    mediump vec2 dir;
    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));

    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *
                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);

    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);
    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),
              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),
                  dir * rcpDirMin)) * inverseVP;

    vec3 rgbA = 0.5 * (
                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +
                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);
    vec3 rgbB = rgbA * 0.5 + 0.25 * (
                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +
                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);

    float lumaB = dot(rgbB, luma);
    if ((lumaB < lumaMin) || (lumaB > lumaMax))
        color = vec4(rgbA, texColor.a);
    else
        color = vec4(rgbB, texColor.a);
    return color;
}

void main() {

      vec4 color;

      color = fxaa(uSampler, vFragCoord, inputSize.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);

      gl_FragColor = color;
}
`,od=`
attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 v_rgbNW;
varying vec2 v_rgbNE;
varying vec2 v_rgbSW;
varying vec2 v_rgbSE;
varying vec2 v_rgbM;

varying vec2 vFragCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

void texcoords(vec2 fragCoord, vec2 inverseVP,
               out vec2 v_rgbNW, out vec2 v_rgbNE,
               out vec2 v_rgbSW, out vec2 v_rgbSE,
               out vec2 v_rgbM) {
    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;
    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;
    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;
    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;
    v_rgbM = vec2(fragCoord * inverseVP);
}

void main(void) {

   gl_Position = filterVertexPosition();

   vFragCoord = aVertexPosition * outputFrame.zw;

   texcoords(vFragCoord, inputSize.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);
}
`,oc=`precision highp float;

varying vec2 vTextureCoord;
varying vec4 vColor;

uniform float uNoise;
uniform float uSeed;
uniform sampler2D uSampler;

float rand(vec2 co)
{
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec4 color = texture2D(uSampler, vTextureCoord);
    float randomValue = rand(gl_FragCoord.xy * uSeed);
    float diff = (randomValue - 0.5) * uNoise;

    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (color.a > 0.0) {
        color.rgb /= color.a;
    }

    color.r += diff;
    color.g += diff;
    color.b += diff;

    // Premultiply alpha again.
    color.rgb *= color.a;

    gl_FragColor = color;
}
`;const op={AlphaFilter:class extends nk{/**
   * @param alpha - Amount of alpha from 0 to 1, where 0 is transparent
   */constructor(t=1){super(aH,oe,{uAlpha:1}),this.alpha=t}/**
   * Coefficient for alpha multiplication
   * @default 1
   */get alpha(){return this.uniforms.uAlpha}set alpha(t){this.uniforms.uAlpha=t}},BlurFilter:class extends nk{/**
   * @param strength - The strength of the blur filter.
   * @param quality - The quality of the blur filter.
   * @param {number|null} [resolution=PIXI.Filter.defaultResolution] - The resolution of the blur filter.
   * @param kernelSize - The kernelSize of the blur filter.Options: 5, 7, 9, 11, 13, 15.
   */constructor(t=8,e=4,r=nk.defaultResolution,i=5){super(),this._repeatEdgePixels=!1,this.blurXFilter=new on(!0,t,e,r,i),this.blurYFilter=new on(!1,t,e,r,i),this.resolution=r,this.quality=e,this.blur=t,this.repeatEdgePixels=!1}/**
   * Applies the filter.
   * @param filterManager - The manager.
   * @param input - The input target.
   * @param output - The output target.
   * @param clearMode - How to clear
   */apply(t,e,r,i){let s=Math.abs(this.blurXFilter.strength),n=Math.abs(this.blurYFilter.strength);if(s&&n){let s=t.getFilterTexture();this.blurXFilter.apply(t,e,s,tr.CLEAR),this.blurYFilter.apply(t,s,r,i),t.returnFilterTexture(s)}else n?this.blurYFilter.apply(t,e,r,i):this.blurXFilter.apply(t,e,r,i)}updatePadding(){this._repeatEdgePixels?this.padding=0:this.padding=2*Math.max(Math.abs(this.blurXFilter.strength),Math.abs(this.blurYFilter.strength))}/**
   * Sets the strength of both the blurX and blurY properties simultaneously
   * @default 2
   */get blur(){return this.blurXFilter.blur}set blur(t){this.blurXFilter.blur=this.blurYFilter.blur=t,this.updatePadding()}/**
   * Sets the number of passes for blur. More passes means higher quality bluring.
   * @default 1
   */get quality(){return this.blurXFilter.quality}set quality(t){this.blurXFilter.quality=this.blurYFilter.quality=t}/**
   * Sets the strength of the blurX property
   * @default 2
   */get blurX(){return this.blurXFilter.blur}set blurX(t){this.blurXFilter.blur=t,this.updatePadding()}/**
   * Sets the strength of the blurY property
   * @default 2
   */get blurY(){return this.blurYFilter.blur}set blurY(t){this.blurYFilter.blur=t,this.updatePadding()}/**
   * Sets the blendmode of the filter
   * @default PIXI.BLEND_MODES.NORMAL
   */get blendMode(){return this.blurYFilter.blendMode}set blendMode(t){this.blurYFilter.blendMode=t}/**
   * If set to true the edge of the target will be clamped
   * @default false
   */get repeatEdgePixels(){return this._repeatEdgePixels}set repeatEdgePixels(t){this._repeatEdgePixels=t,this.updatePadding()}},BlurFilterPass:/**
   * @class
   * @memberof PIXI.filters
   * @deprecated since 7.1.0
   * @see PIXI.BlurFilterPass
   */on,ColorMatrixFilter:/**
   * @class
   * @memberof PIXI.filters
   * @deprecated since 7.1.0
   * @see PIXI.ColorMatrixFilter
   */oo,DisplacementFilter:class extends nk{/**
   * @param {PIXI.Sprite} sprite - The sprite used for the displacement map. (make sure its added to the scene!)
   * @param scale - The scale of the displacement
   */constructor(t,e){let r=new s8;t.renderable=!1,super(ol,oh,{mapSampler:t._texture,filterMatrix:r,scale:{x:1,y:1},rotation:new Float32Array([1,0,0,1])}),this.maskSprite=t,this.maskMatrix=r,null==e&&(e=20),this.scale=new s0(e,e)}/**
   * Applies the filter.
   * @param filterManager - The manager.
   * @param input - The input target.
   * @param output - The output target.
   * @param clearMode - clearMode.
   */apply(t,e,r,i){this.uniforms.filterMatrix=t.calculateSpriteMatrix(this.maskMatrix,this.maskSprite),this.uniforms.scale.x=this.scale.x,this.uniforms.scale.y=this.scale.y;let s=this.maskSprite.worldTransform,n=Math.sqrt(s.a*s.a+s.b*s.b),a=Math.sqrt(s.c*s.c+s.d*s.d);0!==n&&0!==a&&(this.uniforms.rotation[0]=s.a/n,this.uniforms.rotation[1]=s.b/n,this.uniforms.rotation[2]=s.c/a,this.uniforms.rotation[3]=s.d/a),t.applyFilter(this,e,r,i)}/** The texture used for the displacement map. Must be power of 2 sized texture. */get map(){return this.uniforms.mapSampler}set map(t){this.uniforms.mapSampler=t}},FXAAFilter:class extends nk{constructor(){super(od,ou)}},NoiseFilter:class extends nk{/**
   * @param {number} [noise=0.5] - The noise intensity, should be a normalized value in the range [0, 1].
   * @param {number} [seed] - A random seed for the noise generation. Default is `Math.random()`.
   */constructor(t=.5,e=Math.random()){super(aj,oc,{uNoise:0,uSeed:0}),this.noise=t,this.seed=e}/**
   * The amount of noise to apply, this value should be in the range (0, 1].
   * @default 0.5
   */get noise(){return this.uniforms.uNoise}set noise(t){this.uniforms.uNoise=t}/** A seed value to apply to the random noise generation. `Math.random()` is a good value to use. */get seed(){return this.uniforms.uSeed}set seed(t){this.uniforms.uSeed=t}}};Object.entries(op).forEach(([t,e])=>{Object.defineProperty(op,t,{get:()=>(tC.deprecation("7.1.0",`filters.${t} has moved to ${t}`),e)})});const of=new class{constructor(){this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this.tickerAdded=!1,this._pauseUpdate=!0}/**
   * Initializes the event ticker.
   * @param events - The event system.
   */init(t){this.removeTickerListener(),this.events=t,this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this.tickerAdded=!1,this._pauseUpdate=!0}/** Whether to pause the update checks or not. */get pauseUpdate(){return this._pauseUpdate}set pauseUpdate(t){this._pauseUpdate=t}/** Adds the ticker listener. */addTickerListener(){this.tickerAdded||!this.domElement||(aU.system.add(this.tickerUpdate,this,aF.INTERACTION),this.tickerAdded=!0)}/** Removes the ticker listener. */removeTickerListener(){this.tickerAdded&&(aU.system.remove(this.tickerUpdate,this),this.tickerAdded=!1)}/** Sets flag to not fire extra events when the user has already moved there mouse */pointerMoved(){this._didMove=!0}/** Updates the state of interactive objects. */update(){if(!this.domElement||this._pauseUpdate)return;if(this._didMove){this._didMove=!1;return}let t=this.events.rootPointerEvent;this.events.supportsTouchEvents&&"touch"===t.pointerType||globalThis.document.dispatchEvent(new PointerEvent("pointermove",{clientX:t.clientX,clientY:t.clientY}))}/**
   * Updates the state of interactive objects if at least {@link interactionFrequency}
   * milliseconds have passed since the last invocation.
   *
   * Invoked by a throttled ticker update from {@link PIXI.Ticker.system}.
   * @param deltaTime - time delta since the last call
   */tickerUpdate(t){this._deltaTime+=t,this._deltaTime<this.interactionFrequency||(this._deltaTime=0,this.update())}};class om{/**
   * @param manager - The event boundary which manages this event. Propagation can only occur
   *  within the boundary's jurisdiction.
   */constructor(t){this.bubbles=!0,this.cancelBubble=!0,this.cancelable=!1,this.composed=!1,this.defaultPrevented=!1,this.eventPhase=om.prototype.NONE,this.propagationStopped=!1,this.propagationImmediatelyStopped=!1,this.layer=new s0,this.page=new s0,this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,this.manager=t}/** @readonly */get layerX(){return this.layer.x}/** @readonly */get layerY(){return this.layer.y}/** @readonly */get pageX(){return this.page.x}/** @readonly */get pageY(){return this.page.y}/**
   * Fallback for the deprecated @code{PIXI.InteractionEvent.data}.
   * @deprecated since 7.0.0
   */get data(){return this}/** The propagation path for this event. Alias for {@link PIXI.EventBoundary.propagationPath}. */composedPath(){return this.manager&&(!this.path||this.path[this.path.length-1]!==this.target)&&(this.path=this.target?this.manager.propagationPath(this.target):[]),this.path}/**
   * Unimplemented method included for implementing the DOM interface {@code Event}. It will throw an {@code Error}.
   * @deprecated
   * @param _type
   * @param _bubbles
   * @param _cancelable
   */initEvent(t,e,r){throw Error("initEvent() is a legacy DOM API. It is not implemented in the Federated Events API.")}/**
   * Unimplemented method included for implementing the DOM interface {@code UIEvent}. It will throw an {@code Error}.
   * @deprecated
   * @param _typeArg
   * @param _bubblesArg
   * @param _cancelableArg
   * @param _viewArg
   * @param _detailArg
   */initUIEvent(t,e,r,i,s){throw Error("initUIEvent() is a legacy DOM API. It is not implemented in the Federated Events API.")}/** Prevent default behavior of PixiJS and the user agent. */preventDefault(){this.nativeEvent instanceof Event&&this.nativeEvent.cancelable&&this.nativeEvent.preventDefault(),this.defaultPrevented=!0}/**
   * Stop this event from propagating to any addition listeners, including on the
   * {@link PIXI.FederatedEventTarget.currentTarget currentTarget} and also the following
   * event targets on the propagation path.
   */stopImmediatePropagation(){this.propagationImmediatelyStopped=!0}/**
   * Stop this event from propagating to the next {@link PIXI.FederatedEventTarget}. The rest of the listeners
   * on the {@link PIXI.FederatedEventTarget.currentTarget currentTarget} will still be notified.
   */stopPropagation(){this.propagationStopped=!0}}class og extends om{constructor(){super(...arguments),this.client=new s0,this.movement=new s0,this.offset=new s0,this.global=new s0,this.screen=new s0}/** @readonly */get clientX(){return this.client.x}/** @readonly */get clientY(){return this.client.y}/**
   * Alias for {@link PIXI.FederatedMouseEvent.clientX this.clientX}.
   * @readonly
   */get x(){return this.clientX}/**
   * Alias for {@link PIXI.FederatedMouseEvent.clientY this.clientY}.
   * @readonly
   */get y(){return this.clientY}/** @readonly */get movementX(){return this.movement.x}/** @readonly */get movementY(){return this.movement.y}/** @readonly */get offsetX(){return this.offset.x}/** @readonly */get offsetY(){return this.offset.y}/** @readonly */get globalX(){return this.global.x}/** @readonly */get globalY(){return this.global.y}/**
   * The pointer coordinates in the renderer's screen. Alias for {@code screen.x}.
   * @readonly
   */get screenX(){return this.screen.x}/**
   * The pointer coordinates in the renderer's screen. Alias for {@code screen.y}.
   * @readonly
   */get screenY(){return this.screen.y}/**
   * This will return the local coordinates of the specified displayObject for this InteractionData
   * @param {PIXI.DisplayObject} displayObject - The DisplayObject that you would like the local
   *  coords off
   * @param {PIXI.IPointData} point - A Point object in which to store the value, optional (otherwise
   *  will create a new point)
   * @param {PIXI.IPointData} globalPos - A Point object containing your custom global coords, optional
   *  (otherwise will use the current global coords)
   * @returns - A point containing the coordinates of the InteractionData position relative
   *  to the DisplayObject
   */getLocalPosition(t,e,r){return t.worldTransform.applyInverse(r||this.global,e)}/**
   * Whether the modifier key was pressed when this event natively occurred.
   * @param key - The modifier key.
   */getModifierState(t){return"getModifierState"in this.nativeEvent&&this.nativeEvent.getModifierState(t)}/**
   * Not supported.
   * @param _typeArg
   * @param _canBubbleArg
   * @param _cancelableArg
   * @param _viewArg
   * @param _detailArg
   * @param _screenXArg
   * @param _screenYArg
   * @param _clientXArg
   * @param _clientYArg
   * @param _ctrlKeyArg
   * @param _altKeyArg
   * @param _shiftKeyArg
   * @param _metaKeyArg
   * @param _buttonArg
   * @param _relatedTargetArg
   * @deprecated since 7.0.0
   */// eslint-disable-next-line max-params
initMouseEvent(t,e,r,i,s,n,a,o,h,l,u,d,c,p,f){throw Error("Method not implemented.")}}class o_ extends og{constructor(){super(...arguments),this.width=0,this.height=0,this.isPrimary=!1}// Only included for completeness for now
getCoalescedEvents(){return"pointermove"===this.type||"mousemove"===this.type||"touchmove"===this.type?[this]:[]}// Only included for completeness for now
getPredictedEvents(){throw Error("getPredictedEvents is not supported!")}}class oy extends og{constructor(){super(...arguments),this.DOM_DELTA_PIXEL=0,this.DOM_DELTA_LINE=1,this.DOM_DELTA_PAGE=2}}oy.DOM_DELTA_PIXEL=0,/** Units specified in lines. */oy.DOM_DELTA_LINE=1,/** Units specified in pages. */oy.DOM_DELTA_PAGE=2;const ov=new s0,ox=new s0;class ob{/**
   * @param rootTarget - The holder of the event boundary.
   */constructor(t){this.dispatch=new tC.EventEmitter,this.moveOnAll=!1,this.enableGlobalMoveEvents=!0,this.mappingState={trackingData:{}},this.eventPool=/* @__PURE__ */new Map,this._allInteractiveElements=[],this._hitElements=[],this._isPointerMoveEvent=!1,this.rootTarget=t,this.hitPruneFn=this.hitPruneFn.bind(this),this.hitTestFn=this.hitTestFn.bind(this),this.mapPointerDown=this.mapPointerDown.bind(this),this.mapPointerMove=this.mapPointerMove.bind(this),this.mapPointerOut=this.mapPointerOut.bind(this),this.mapPointerOver=this.mapPointerOver.bind(this),this.mapPointerUp=this.mapPointerUp.bind(this),this.mapPointerUpOutside=this.mapPointerUpOutside.bind(this),this.mapWheel=this.mapWheel.bind(this),this.mappingTable={},this.addEventMapping("pointerdown",this.mapPointerDown),this.addEventMapping("pointermove",this.mapPointerMove),this.addEventMapping("pointerout",this.mapPointerOut),this.addEventMapping("pointerleave",this.mapPointerOut),this.addEventMapping("pointerover",this.mapPointerOver),this.addEventMapping("pointerup",this.mapPointerUp),this.addEventMapping("pointerupoutside",this.mapPointerUpOutside),this.addEventMapping("wheel",this.mapWheel)}/**
   * Adds an event mapping for the event `type` handled by `fn`.
   *
   * Event mappings can be used to implement additional or custom events. They take an event
   * coming from the upstream scene (or directly from the {@link PIXI.EventSystem}) and dispatch new downstream events
   * generally trickling down and bubbling up to {@link PIXI.EventBoundary.rootTarget this.rootTarget}.
   *
   * To modify the semantics of existing events, the built-in mapping methods of EventBoundary should be overridden
   * instead.
   * @param type - The type of upstream event to map.
   * @param fn - The mapping method. The context of this function must be bound manually, if desired.
   */addEventMapping(t,e){this.mappingTable[t]||(this.mappingTable[t]=[]),this.mappingTable[t].push({fn:e,priority:0}),this.mappingTable[t].sort((t,e)=>t.priority-e.priority)}/**
   * Dispatches the given event
   * @param e
   * @param type
   */dispatchEvent(t,e){t.propagationStopped=!1,t.propagationImmediatelyStopped=!1,this.propagate(t,e),this.dispatch.emit(e||t.type,t)}/**
   * Maps the given upstream event through the event boundary and propagates it downstream.
   * @param e
   */mapEvent(t){if(!this.rootTarget)return;let e=this.mappingTable[t.type];if(e)for(let r=0,i=e.length;r<i;r++)e[r].fn(t);else console.warn(`[EventBoundary]: Event mapping not defined for ${t.type}`)}/**
   * Finds the DisplayObject that is the target of a event at the given coordinates.
   *
   * The passed (x,y) coordinates are in the world space above this event boundary.
   * @param x
   * @param y
   */hitTest(t,e){of.pauseUpdate=!0;let r=this._isPointerMoveEvent&&this.enableGlobalMoveEvents?"hitTestMoveRecursive":"hitTestRecursive",i=this[r](this.rootTarget,this.rootTarget.eventMode,ov.set(t,e),this.hitTestFn,this.hitPruneFn);return i&&i[0]}/**
   * Propagate the passed event from from {@link PIXI.EventBoundary.rootTarget this.rootTarget} to its
   * target {@code e.target}.
   * @param e - The event to propagate.
   * @param type
   */propagate(t,e){if(!t.target)return;let r=t.composedPath();t.eventPhase=t.CAPTURING_PHASE;for(let i=0,s=r.length-1;i<s;i++)if(t.currentTarget=r[i],this.notifyTarget(t,e),t.propagationStopped||t.propagationImmediatelyStopped)return;if(t.eventPhase=t.AT_TARGET,t.currentTarget=t.target,this.notifyTarget(t,e),!(t.propagationStopped||t.propagationImmediatelyStopped)){t.eventPhase=t.BUBBLING_PHASE;for(let i=r.length-2;i>=0;i--)if(t.currentTarget=r[i],this.notifyTarget(t,e),t.propagationStopped||t.propagationImmediatelyStopped)return}}/**
   * Emits the event {@code e} to all interactive display objects. The event is propagated in the bubbling phase always.
   *
   * This is used in the `globalpointermove` event.
   * @param e - The emitted event.
   * @param type - The listeners to notify.
   * @param targets - The targets to notify.
   */all(t,e,r=this._allInteractiveElements){if(0===r.length)return;t.eventPhase=t.BUBBLING_PHASE;let i=Array.isArray(e)?e:[e];for(let e=r.length-1;e>=0;e--)i.forEach(i=>{t.currentTarget=r[e],this.notifyTarget(t,i)})}/**
   * Finds the propagation path from {@link PIXI.EventBoundary.rootTarget rootTarget} to the passed
   * {@code target}. The last element in the path is {@code target}.
   * @param target
   */propagationPath(t){let e=[t];for(let r=0;r<2048&&t!==this.rootTarget;r++){if(!t.parent)throw Error("Cannot find propagation path to disconnected target");e.push(t.parent),t=t.parent}return e.reverse(),e}hitTestMoveRecursive(t,e,r,i,s,n=!1){let a=!1;if(this._interactivePrune(t))return null;if(("dynamic"===t.eventMode||"dynamic"===e)&&(of.pauseUpdate=!1),t.interactiveChildren&&t.children){let o=t.children;for(let h=o.length-1;h>=0;h--){let l=o[h],u=this.hitTestMoveRecursive(l,this._isInteractive(e)?e:l.eventMode,r,i,s,n||s(t,r));if(u){if(u.length>0&&!u[u.length-1].parent)continue;let e=t.isInteractive();(u.length>0||e)&&(e&&this._allInteractiveElements.push(t),u.push(t)),0===this._hitElements.length&&(this._hitElements=u),a=!0}}}let o=this._isInteractive(e),h=t.isInteractive();return h&&h&&this._allInteractiveElements.push(t),n||this._hitElements.length>0?null:a?this._hitElements:o&&!s(t,r)&&i(t,r)?h?[t]:[]:null}/**
   * Recursive implementation for {@link PIXI.EventBoundary.hitTest hitTest}.
   * @param currentTarget - The DisplayObject that is to be hit tested.
   * @param eventMode - The event mode for the `currentTarget` or one of its parents.
   * @param location - The location that is being tested for overlap.
   * @param testFn - Callback that determines whether the target passes hit testing. This callback
   *  can assume that `pruneFn` failed to prune the display object.
   * @param pruneFn - Callback that determiness whether the target and all of its children
   *  cannot pass the hit test. It is used as a preliminary optimization to prune entire subtrees
   *  of the scene graph.
   * @returns An array holding the hit testing target and all its ancestors in order. The first element
   *  is the target itself and the last is {@link PIXI.EventBoundary.rootTarget rootTarget}. This is the opposite
   *  order w.r.t. the propagation path. If no hit testing target is found, null is returned.
   */hitTestRecursive(t,e,r,i,s){if(this._interactivePrune(t)||s(t,r))return null;if(("dynamic"===t.eventMode||"dynamic"===e)&&(of.pauseUpdate=!1),t.interactiveChildren&&t.children){let n=t.children;for(let a=n.length-1;a>=0;a--){let o=n[a],h=this.hitTestRecursive(o,this._isInteractive(e)?e:o.eventMode,r,i,s);if(h){if(h.length>0&&!h[h.length-1].parent)continue;let e=t.isInteractive();return(h.length>0||e)&&h.push(t),h}}}let n=this._isInteractive(e),a=t.isInteractive();return n&&i(t,r)?a?[t]:[]:null}_isInteractive(t){return"static"===t||"dynamic"===t}_interactivePrune(t){return!!(!t||t.isMask||!t.visible||!t.renderable||"none"===t.eventMode||"passive"===t.eventMode&&!t.interactiveChildren||t.isMask)}/**
   * Checks whether the display object or any of its children cannot pass the hit test at all.
   *
   * {@link PIXI.EventBoundary}'s implementation uses the {@link PIXI.DisplayObject.hitArea hitArea}
   * and {@link PIXI.DisplayObject._mask} for pruning.
   * @param displayObject
   * @param location
   */hitPruneFn(t,e){if(t.hitArea&&(t.worldTransform.applyInverse(e,ox),!t.hitArea.contains(ox.x,ox.y)))return!0;if(t._mask){let r=t._mask.isMaskData?t._mask.maskObject:t._mask;if(r&&!r.containsPoint?.(e))return!0}return!1}/**
   * Checks whether the display object passes hit testing for the given location.
   * @param displayObject
   * @param location
   * @returns - Whether `displayObject` passes hit testing for `location`.
   */hitTestFn(t,e){return"passive"!==t.eventMode&&(!!t.hitArea||!!t.containsPoint&&t.containsPoint(e))}/**
   * Notify all the listeners to the event's `currentTarget`.
   *
   * If the `currentTarget` contains the property `on<type>`, then it is called here,
   * simulating the behavior from version 6.x and prior.
   * @param e - The event passed to the target.
   * @param type
   */notifyTarget(t,e){e=e??t.type;let r=`on${e}`;t.currentTarget[r]?.(t);let i=t.eventPhase===t.CAPTURING_PHASE||t.eventPhase===t.AT_TARGET?`${e}capture`:e;this.notifyListeners(t,i),t.eventPhase===t.AT_TARGET&&this.notifyListeners(t,e)}/**
   * Maps the upstream `pointerdown` events to a downstream `pointerdown` event.
   *
   * `touchstart`, `rightdown`, `mousedown` events are also dispatched for specific pointer types.
   * @param from
   */mapPointerDown(t){if(!(t instanceof o_)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}let e=this.createPointerEvent(t);if(this.dispatchEvent(e,"pointerdown"),"touch"===e.pointerType)this.dispatchEvent(e,"touchstart");else if("mouse"===e.pointerType||"pen"===e.pointerType){let t=2===e.button;this.dispatchEvent(e,t?"rightdown":"mousedown")}let r=this.trackingData(t.pointerId);r.pressTargetsByButton[t.button]=e.composedPath(),this.freeEvent(e)}/**
   * Maps the upstream `pointermove` to downstream `pointerout`, `pointerover`, and `pointermove` events, in that order.
   *
   * The tracking data for the specific pointer has an updated `overTarget`. `mouseout`, `mouseover`,
   * `mousemove`, and `touchmove` events are fired as well for specific pointer types.
   * @param from - The upstream `pointermove` event.
   */mapPointerMove(t){if(!(t instanceof o_)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}this._allInteractiveElements.length=0,this._hitElements.length=0,this._isPointerMoveEvent=!0;let e=this.createPointerEvent(t);this._isPointerMoveEvent=!1;let r="mouse"===e.pointerType||"pen"===e.pointerType,i=this.trackingData(t.pointerId),s=this.findMountedTarget(i.overTargets);if(i.overTargets?.length>0&&s!==e.target){let i="mousemove"===t.type?"mouseout":"pointerout",n=this.createPointerEvent(t,i,s);if(this.dispatchEvent(n,"pointerout"),r&&this.dispatchEvent(n,"mouseout"),!e.composedPath().includes(s)){let i=this.createPointerEvent(t,"pointerleave",s);for(i.eventPhase=i.AT_TARGET;i.target&&!e.composedPath().includes(i.target);)i.currentTarget=i.target,this.notifyTarget(i),r&&this.notifyTarget(i,"mouseleave"),i.target=i.target.parent;this.freeEvent(i)}this.freeEvent(n)}if(s!==e.target){let i="mousemove"===t.type?"mouseover":"pointerover",n=this.clonePointerEvent(e,i);this.dispatchEvent(n,"pointerover"),r&&this.dispatchEvent(n,"mouseover");let a=s?.parent;for(;a&&a!==this.rootTarget.parent&&a!==e.target;)a=a.parent;if(!a||a===this.rootTarget.parent){let t=this.clonePointerEvent(e,"pointerenter");for(t.eventPhase=t.AT_TARGET;t.target&&t.target!==s&&t.target!==this.rootTarget.parent;)t.currentTarget=t.target,this.notifyTarget(t),r&&this.notifyTarget(t,"mouseenter"),t.target=t.target.parent;this.freeEvent(t)}this.freeEvent(n)}let n=[],a=this.enableGlobalMoveEvents??!0;this.moveOnAll?n.push("pointermove"):this.dispatchEvent(e,"pointermove"),a&&n.push("globalpointermove"),"touch"===e.pointerType&&(this.moveOnAll?n.splice(1,0,"touchmove"):this.dispatchEvent(e,"touchmove"),a&&n.push("globaltouchmove")),r&&(this.moveOnAll?n.splice(1,0,"mousemove"):this.dispatchEvent(e,"mousemove"),a&&n.push("globalmousemove"),this.cursor=e.target?.cursor),n.length>0&&this.all(e,n),this._allInteractiveElements.length=0,this._hitElements.length=0,i.overTargets=e.composedPath(),this.freeEvent(e)}/**
   * Maps the upstream `pointerover` to downstream `pointerover` and `pointerenter` events, in that order.
   *
   * The tracking data for the specific pointer gets a new `overTarget`.
   * @param from - The upstream `pointerover` event.
   */mapPointerOver(t){if(!(t instanceof o_)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}let e=this.trackingData(t.pointerId),r=this.createPointerEvent(t),i="mouse"===r.pointerType||"pen"===r.pointerType;this.dispatchEvent(r,"pointerover"),i&&this.dispatchEvent(r,"mouseover"),"mouse"===r.pointerType&&(this.cursor=r.target?.cursor);let s=this.clonePointerEvent(r,"pointerenter");for(s.eventPhase=s.AT_TARGET;s.target&&s.target!==this.rootTarget.parent;)s.currentTarget=s.target,this.notifyTarget(s),i&&this.notifyTarget(s,"mouseenter"),s.target=s.target.parent;e.overTargets=r.composedPath(),this.freeEvent(r),this.freeEvent(s)}/**
   * Maps the upstream `pointerout` to downstream `pointerout`, `pointerleave` events, in that order.
   *
   * The tracking data for the specific pointer is cleared of a `overTarget`.
   * @param from - The upstream `pointerout` event.
   */mapPointerOut(t){if(!(t instanceof o_)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}let e=this.trackingData(t.pointerId);if(e.overTargets){let r="mouse"===t.pointerType||"pen"===t.pointerType,i=this.findMountedTarget(e.overTargets),s=this.createPointerEvent(t,"pointerout",i);this.dispatchEvent(s),r&&this.dispatchEvent(s,"mouseout");let n=this.createPointerEvent(t,"pointerleave",i);for(n.eventPhase=n.AT_TARGET;n.target&&n.target!==this.rootTarget.parent;)n.currentTarget=n.target,this.notifyTarget(n),r&&this.notifyTarget(n,"mouseleave"),n.target=n.target.parent;e.overTargets=null,this.freeEvent(s),this.freeEvent(n)}this.cursor=null}/**
   * Maps the upstream `pointerup` event to downstream `pointerup`, `pointerupoutside`,
   * and `click`/`rightclick`/`pointertap` events, in that order.
   *
   * The `pointerupoutside` event bubbles from the original `pointerdown` target to the most specific
   * ancestor of the `pointerdown` and `pointerup` targets, which is also the `click` event's target. `touchend`,
   * `rightup`, `mouseup`, `touchendoutside`, `rightupoutside`, `mouseupoutside`, and `tap` are fired as well for
   * specific pointer types.
   * @param from - The upstream `pointerup` event.
   */mapPointerUp(t){if(!(t instanceof o_)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}let e=performance.now(),r=this.createPointerEvent(t);if(this.dispatchEvent(r,"pointerup"),"touch"===r.pointerType)this.dispatchEvent(r,"touchend");else if("mouse"===r.pointerType||"pen"===r.pointerType){let t=2===r.button;this.dispatchEvent(r,t?"rightup":"mouseup")}let i=this.trackingData(t.pointerId),s=this.findMountedTarget(i.pressTargetsByButton[t.button]),n=s;if(s&&!r.composedPath().includes(s)){let e=s;for(;e&&!r.composedPath().includes(e);){if(r.currentTarget=e,this.notifyTarget(r,"pointerupoutside"),"touch"===r.pointerType)this.notifyTarget(r,"touchendoutside");else if("mouse"===r.pointerType||"pen"===r.pointerType){let t=2===r.button;this.notifyTarget(r,t?"rightupoutside":"mouseupoutside")}e=e.parent}delete i.pressTargetsByButton[t.button],n=e}if(n){let s=this.clonePointerEvent(r,"click");s.target=n,s.path=null,i.clicksByButton[t.button]||(i.clicksByButton[t.button]={clickCount:0,target:s.target,timeStamp:e});let a=i.clicksByButton[t.button];if(a.target===s.target&&e-a.timeStamp<200?++a.clickCount:a.clickCount=1,a.target=s.target,a.timeStamp=e,s.detail=a.clickCount,"mouse"===s.pointerType){let t=2===s.button;this.dispatchEvent(s,t?"rightclick":"click")}else"touch"===s.pointerType&&this.dispatchEvent(s,"tap");this.dispatchEvent(s,"pointertap"),this.freeEvent(s)}this.freeEvent(r)}/**
   * Maps the upstream `pointerupoutside` event to a downstream `pointerupoutside` event, bubbling from the original
   * `pointerdown` target to `rootTarget`.
   *
   * (The most specific ancestor of the `pointerdown` event and the `pointerup` event must the
   * `{@link PIXI.EventBoundary}'s root because the `pointerup` event occurred outside of the boundary.)
   *
   * `touchendoutside`, `mouseupoutside`, and `rightupoutside` events are fired as well for specific pointer
   * types. The tracking data for the specific pointer is cleared of a `pressTarget`.
   * @param from - The upstream `pointerupoutside` event.
   */mapPointerUpOutside(t){if(!(t instanceof o_)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}let e=this.trackingData(t.pointerId),r=this.findMountedTarget(e.pressTargetsByButton[t.button]),i=this.createPointerEvent(t);if(r){let s=r;for(;s;)i.currentTarget=s,this.notifyTarget(i,"pointerupoutside"),"touch"===i.pointerType?this.notifyTarget(i,"touchendoutside"):("mouse"===i.pointerType||"pen"===i.pointerType)&&this.notifyTarget(i,2===i.button?"rightupoutside":"mouseupoutside"),s=s.parent;delete e.pressTargetsByButton[t.button]}this.freeEvent(i)}/**
   * Maps the upstream `wheel` event to a downstream `wheel` event.
   * @param from - The upstream `wheel` event.
   */mapWheel(t){if(!(t instanceof oy)){console.warn("EventBoundary cannot map a non-wheel event as a wheel event");return}let e=this.createWheelEvent(t);this.dispatchEvent(e),this.freeEvent(e)}/**
   * Finds the most specific event-target in the given propagation path that is still mounted in the scene graph.
   *
   * This is used to find the correct `pointerup` and `pointerout` target in the case that the original `pointerdown`
   * or `pointerover` target was unmounted from the scene graph.
   * @param propagationPath - The propagation path was valid in the past.
   * @returns - The most specific event-target still mounted at the same location in the scene graph.
   */findMountedTarget(t){if(!t)return null;let e=t[0];for(let r=1;r<t.length&&t[r].parent===e;r++)e=t[r];return e}/**
   * Creates an event whose {@code originalEvent} is {@code from}, with an optional `type` and `target` override.
   *
   * The event is allocated using {@link PIXI.EventBoundary#allocateEvent this.allocateEvent}.
   * @param from - The {@code originalEvent} for the returned event.
   * @param [type=from.type] - The type of the returned event.
   * @param target - The target of the returned event.
   */createPointerEvent(t,e,r){let i=this.allocateEvent(o_);return this.copyPointerData(t,i),this.copyMouseData(t,i),this.copyData(t,i),i.nativeEvent=t.nativeEvent,i.originalEvent=t,i.target=r??this.hitTest(i.global.x,i.global.y)??this._hitElements[0],"string"==typeof e&&(i.type=e),i}/**
   * Creates a wheel event whose {@code originalEvent} is {@code from}.
   *
   * The event is allocated using {@link PIXI.EventBoundary#allocateEvent this.allocateEvent}.
   * @param from - The upstream wheel event.
   */createWheelEvent(t){let e=this.allocateEvent(oy);return this.copyWheelData(t,e),this.copyMouseData(t,e),this.copyData(t,e),e.nativeEvent=t.nativeEvent,e.originalEvent=t,e.target=this.hitTest(e.global.x,e.global.y),e}/**
   * Clones the event {@code from}, with an optional {@code type} override.
   *
   * The event is allocated using {@link PIXI.EventBoundary#allocateEvent this.allocateEvent}.
   * @param from - The event to clone.
   * @param [type=from.type] - The type of the returned event.
   */clonePointerEvent(t,e){let r=this.allocateEvent(o_);return r.nativeEvent=t.nativeEvent,r.originalEvent=t.originalEvent,this.copyPointerData(t,r),this.copyMouseData(t,r),this.copyData(t,r),r.target=t.target,r.path=t.composedPath().slice(),r.type=e??r.type,r}/**
   * Copies wheel {@link PIXI.FederatedWheelEvent} data from {@code from} into {@code to}.
   *
   * The following properties are copied:
   * + deltaMode
   * + deltaX
   * + deltaY
   * + deltaZ
   * @param from
   * @param to
   */copyWheelData(t,e){e.deltaMode=t.deltaMode,e.deltaX=t.deltaX,e.deltaY=t.deltaY,e.deltaZ=t.deltaZ}/**
   * Copies pointer {@link PIXI.FederatedPointerEvent} data from {@code from} into {@code to}.
   *
   * The following properties are copied:
   * + pointerId
   * + width
   * + height
   * + isPrimary
   * + pointerType
   * + pressure
   * + tangentialPressure
   * + tiltX
   * + tiltY
   * @param from
   * @param to
   */copyPointerData(t,e){t instanceof o_&&e instanceof o_&&(e.pointerId=t.pointerId,e.width=t.width,e.height=t.height,e.isPrimary=t.isPrimary,e.pointerType=t.pointerType,e.pressure=t.pressure,e.tangentialPressure=t.tangentialPressure,e.tiltX=t.tiltX,e.tiltY=t.tiltY,e.twist=t.twist)}/**
   * Copies mouse {@link PIXI.FederatedMouseEvent} data from {@code from} to {@code to}.
   *
   * The following properties are copied:
   * + altKey
   * + button
   * + buttons
   * + clientX
   * + clientY
   * + metaKey
   * + movementX
   * + movementY
   * + pageX
   * + pageY
   * + x
   * + y
   * + screen
   * + shiftKey
   * + global
   * @param from
   * @param to
   */copyMouseData(t,e){t instanceof og&&e instanceof og&&(e.altKey=t.altKey,e.button=t.button,e.buttons=t.buttons,e.client.copyFrom(t.client),e.ctrlKey=t.ctrlKey,e.metaKey=t.metaKey,e.movement.copyFrom(t.movement),e.screen.copyFrom(t.screen),e.shiftKey=t.shiftKey,e.global.copyFrom(t.global))}/**
   * Copies base {@link PIXI.FederatedEvent} data from {@code from} into {@code to}.
   *
   * The following properties are copied:
   * + isTrusted
   * + srcElement
   * + timeStamp
   * + type
   * @param from - The event to copy data from.
   * @param to - The event to copy data into.
   */copyData(t,e){e.isTrusted=t.isTrusted,e.srcElement=t.srcElement,e.timeStamp=performance.now(),e.type=t.type,e.detail=t.detail,e.view=t.view,e.which=t.which,e.layer.copyFrom(t.layer),e.page.copyFrom(t.page)}/**
   * @param id - The pointer ID.
   * @returns The tracking data stored for the given pointer. If no data exists, a blank
   *  state will be created.
   */trackingData(t){return this.mappingState.trackingData[t]||(this.mappingState.trackingData[t]={pressTargetsByButton:{},clicksByButton:{},overTarget:null}),this.mappingState.trackingData[t]}/**
   * Allocate a specific type of event from {@link PIXI.EventBoundary#eventPool this.eventPool}.
   *
   * This allocation is constructor-agnostic, as long as it only takes one argument - this event
   * boundary.
   * @param constructor - The event's constructor.
   */allocateEvent(t){this.eventPool.has(t)||this.eventPool.set(t,[]);let e=this.eventPool.get(t).pop()||new t(this);return e.eventPhase=e.NONE,e.currentTarget=null,e.path=null,e.target=null,e}/**
   * Frees the event and puts it back into the event pool.
   *
   * It is illegal to reuse the event until it is allocated again, using `this.allocateEvent`.
   *
   * It is also advised that events not allocated from {@link PIXI.EventBoundary#allocateEvent this.allocateEvent}
   * not be freed. This is because of the possibility that the same event is freed twice, which can cause
   * it to be allocated twice & result in overwriting.
   * @param event - The event to be freed.
   * @throws Error if the event is managed by another event boundary.
   */freeEvent(t){if(t.manager!==this)throw Error("It is illegal to free an event not managed by this EventBoundary!");let e=t.constructor;this.eventPool.has(e)||this.eventPool.set(e,[]),this.eventPool.get(e).push(t)}/**
   * Similar to {@link PIXI.EventEmitter.emit}, except it stops if the `propagationImmediatelyStopped` flag
   * is set on the event.
   * @param e - The event to call each listener with.
   * @param type - The event key.
   */notifyListeners(t,e){let r=t.currentTarget._events[e];if(r&&t.currentTarget.isInteractive()){if("fn"in r)r.once&&t.currentTarget.removeListener(e,r.fn,void 0,!0),r.fn.call(r.context,t);else for(let i=0,s=r.length;i<s&&!t.propagationImmediatelyStopped;i++)r[i].once&&t.currentTarget.removeListener(e,r[i].fn,void 0,!0),r[i].fn.call(r[i].context,t)}}}const oE={touchstart:"pointerdown",touchend:"pointerup",touchendoutside:"pointerupoutside",touchmove:"pointermove",touchcancel:"pointercancel"},oT=class t{/**
   * @param {PIXI.Renderer} renderer
   */constructor(e){this.supportsTouchEvents="ontouchstart"in globalThis,this.supportsPointerEvents=!!globalThis.PointerEvent,this.domElement=null,this.resolution=1,this.renderer=e,this.rootBoundary=new ob(null),of.init(this),this.autoPreventDefault=!0,this.eventsAdded=!1,this.rootPointerEvent=new o_(null),this.rootWheelEvent=new oy(null),this.cursorStyles={default:"inherit",pointer:"pointer"},this.features=new Proxy({...t.defaultEventFeatures},{set:(t,e,r)=>("globalMove"===e&&(this.rootBoundary.enableGlobalMoveEvents=r),t[e]=r,!0)}),this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onPointerOverOut=this.onPointerOverOut.bind(this),this.onWheel=this.onWheel.bind(this)}/**
   * The default interaction mode for all display objects.
   * @see PIXI.DisplayObject.eventMode
   * @type {PIXI.EventMode}
   * @readonly
   * @since 7.2.0
   */static get defaultEventMode(){return this._defaultEventMode}/**
   * Runner init called, view is available at this point.
   * @ignore
   */init(e){let{view:r,resolution:i}=this.renderer;this.setTargetElement(r),this.resolution=i,t._defaultEventMode=e.eventMode??"auto",Object.assign(this.features,e.eventFeatures??{}),this.rootBoundary.enableGlobalMoveEvents=this.features.globalMove}/**
   * Handle changing resolution.
   * @ignore
   */resolutionChange(t){this.resolution=t}/** Destroys all event listeners and detaches the renderer. */destroy(){this.setTargetElement(null),this.renderer=null}/**
   * Sets the current cursor mode, handling any callbacks or CSS style changes.
   * @param mode - cursor mode, a key from the cursorStyles dictionary
   */setCursor(t){t=t||"default";let e=!0;if(globalThis.OffscreenCanvas&&this.domElement instanceof OffscreenCanvas&&(e=!1),this.currentCursor===t)return;this.currentCursor=t;let r=this.cursorStyles[t];if(r)switch(typeof r){case"string":e&&(this.domElement.style.cursor=r);break;case"function":r(t);break;case"object":e&&Object.assign(this.domElement.style,r)}else e&&"string"==typeof t&&!Object.prototype.hasOwnProperty.call(this.cursorStyles,t)&&(this.domElement.style.cursor=t)}/**
   * The global pointer event.
   * Useful for getting the pointer position without listening to events.
   * @since 7.2.0
   */get pointer(){return this.rootPointerEvent}/**
   * Event handler for pointer down events on {@link PIXI.EventSystem#domElement this.domElement}.
   * @param nativeEvent - The native mouse/pointer/touch event.
   */onPointerDown(t){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;let e=this.normalizeToPointerData(t);this.autoPreventDefault&&e[0].isNormalized&&(t.cancelable||!("cancelable"in t))&&t.preventDefault();for(let t=0,r=e.length;t<r;t++){let r=e[t],i=this.bootstrapEvent(this.rootPointerEvent,r);this.rootBoundary.mapEvent(i)}this.setCursor(this.rootBoundary.cursor)}/**
   * Event handler for pointer move events on on {@link PIXI.EventSystem#domElement this.domElement}.
   * @param nativeEvent - The native mouse/pointer/touch events.
   */onPointerMove(t){if(!this.features.move)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,of.pointerMoved();let e=this.normalizeToPointerData(t);for(let t=0,r=e.length;t<r;t++){let r=this.bootstrapEvent(this.rootPointerEvent,e[t]);this.rootBoundary.mapEvent(r)}this.setCursor(this.rootBoundary.cursor)}/**
   * Event handler for pointer up events on {@link PIXI.EventSystem#domElement this.domElement}.
   * @param nativeEvent - The native mouse/pointer/touch event.
   */onPointerUp(t){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;let e=t.target;t.composedPath&&t.composedPath().length>0&&(e=t.composedPath()[0]);let r=e!==this.domElement?"outside":"",i=this.normalizeToPointerData(t);for(let t=0,e=i.length;t<e;t++){let e=this.bootstrapEvent(this.rootPointerEvent,i[t]);e.type+=r,this.rootBoundary.mapEvent(e)}this.setCursor(this.rootBoundary.cursor)}/**
   * Event handler for pointer over & out events on {@link PIXI.EventSystem#domElement this.domElement}.
   * @param nativeEvent - The native mouse/pointer/touch event.
   */onPointerOverOut(t){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;let e=this.normalizeToPointerData(t);for(let t=0,r=e.length;t<r;t++){let r=this.bootstrapEvent(this.rootPointerEvent,e[t]);this.rootBoundary.mapEvent(r)}this.setCursor(this.rootBoundary.cursor)}/**
   * Passive handler for `wheel` events on {@link PIXI.EventSystem.domElement this.domElement}.
   * @param nativeEvent - The native wheel event.
   */onWheel(t){if(!this.features.wheel)return;let e=this.normalizeWheelEvent(t);this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,this.rootBoundary.mapEvent(e)}/**
   * Sets the {@link PIXI.EventSystem#domElement domElement} and binds event listeners.
   *
   * To deregister the current DOM element without setting a new one, pass {@code null}.
   * @param element - The new DOM element.
   */setTargetElement(t){this.removeEvents(),this.domElement=t,of.domElement=t,this.addEvents()}/** Register event listeners on {@link PIXI.Renderer#domElement this.domElement}. */addEvents(){if(this.eventsAdded||!this.domElement)return;of.addTickerListener();let t=this.domElement.style;t&&(globalThis.navigator.msPointerEnabled?(t.msContentZooming="none",t.msTouchAction="none"):this.supportsPointerEvents&&(t.touchAction="none")),this.supportsPointerEvents?(globalThis.document.addEventListener("pointermove",this.onPointerMove,!0),this.domElement.addEventListener("pointerdown",this.onPointerDown,!0),this.domElement.addEventListener("pointerleave",this.onPointerOverOut,!0),this.domElement.addEventListener("pointerover",this.onPointerOverOut,!0),globalThis.addEventListener("pointerup",this.onPointerUp,!0)):(globalThis.document.addEventListener("mousemove",this.onPointerMove,!0),this.domElement.addEventListener("mousedown",this.onPointerDown,!0),this.domElement.addEventListener("mouseout",this.onPointerOverOut,!0),this.domElement.addEventListener("mouseover",this.onPointerOverOut,!0),globalThis.addEventListener("mouseup",this.onPointerUp,!0),this.supportsTouchEvents&&(this.domElement.addEventListener("touchstart",this.onPointerDown,!0),this.domElement.addEventListener("touchend",this.onPointerUp,!0),this.domElement.addEventListener("touchmove",this.onPointerMove,!0))),this.domElement.addEventListener("wheel",this.onWheel,{passive:!0,capture:!0}),this.eventsAdded=!0}/** Unregister event listeners on {@link PIXI.EventSystem#domElement this.domElement}. */removeEvents(){if(!this.eventsAdded||!this.domElement)return;of.removeTickerListener();let t=this.domElement.style;globalThis.navigator.msPointerEnabled?(t.msContentZooming="",t.msTouchAction=""):this.supportsPointerEvents&&(t.touchAction=""),this.supportsPointerEvents?(globalThis.document.removeEventListener("pointermove",this.onPointerMove,!0),this.domElement.removeEventListener("pointerdown",this.onPointerDown,!0),this.domElement.removeEventListener("pointerleave",this.onPointerOverOut,!0),this.domElement.removeEventListener("pointerover",this.onPointerOverOut,!0),globalThis.removeEventListener("pointerup",this.onPointerUp,!0)):(globalThis.document.removeEventListener("mousemove",this.onPointerMove,!0),this.domElement.removeEventListener("mousedown",this.onPointerDown,!0),this.domElement.removeEventListener("mouseout",this.onPointerOverOut,!0),this.domElement.removeEventListener("mouseover",this.onPointerOverOut,!0),globalThis.removeEventListener("mouseup",this.onPointerUp,!0),this.supportsTouchEvents&&(this.domElement.removeEventListener("touchstart",this.onPointerDown,!0),this.domElement.removeEventListener("touchend",this.onPointerUp,!0),this.domElement.removeEventListener("touchmove",this.onPointerMove,!0))),this.domElement.removeEventListener("wheel",this.onWheel,!0),this.domElement=null,this.eventsAdded=!1}/**
   * Maps x and y coords from a DOM object and maps them correctly to the PixiJS view. The
   * resulting value is stored in the point. This takes into account the fact that the DOM
   * element could be scaled and positioned anywhere on the screen.
   * @param  {PIXI.IPointData} point - the point that the result will be stored in
   * @param  {number} x - the x coord of the position to map
   * @param  {number} y - the y coord of the position to map
   */mapPositionToPoint(t,e,r){let i=this.domElement.isConnected?this.domElement.getBoundingClientRect():{x:0,y:0,width:this.domElement.width,height:this.domElement.height,left:0,top:0},s=1/this.resolution;t.x=(e-i.left)*(this.domElement.width/i.width)*s,t.y=(r-i.top)*(this.domElement.height/i.height)*s}/**
   * Ensures that the original event object contains all data that a regular pointer event would have
   * @param event - The original event data from a touch or mouse event
   * @returns An array containing a single normalized pointer event, in the case of a pointer
   *  or mouse event, or a multiple normalized pointer events if there are multiple changed touches
   */normalizeToPointerData(t){let e=[];if(this.supportsTouchEvents&&t instanceof TouchEvent)for(let r=0,i=t.changedTouches.length;r<i;r++){let i=t.changedTouches[r];typeof i.button>"u"&&(i.button=0),typeof i.buttons>"u"&&(i.buttons=1),typeof i.isPrimary>"u"&&(i.isPrimary=1===t.touches.length&&"touchstart"===t.type),typeof i.width>"u"&&(i.width=i.radiusX||1),typeof i.height>"u"&&(i.height=i.radiusY||1),typeof i.tiltX>"u"&&(i.tiltX=0),typeof i.tiltY>"u"&&(i.tiltY=0),typeof i.pointerType>"u"&&(i.pointerType="touch"),typeof i.pointerId>"u"&&(i.pointerId=i.identifier||0),typeof i.pressure>"u"&&(i.pressure=i.force||.5),typeof i.twist>"u"&&(i.twist=0),typeof i.tangentialPressure>"u"&&(i.tangentialPressure=0),typeof i.layerX>"u"&&(i.layerX=i.offsetX=i.clientX),typeof i.layerY>"u"&&(i.layerY=i.offsetY=i.clientY),i.isNormalized=!0,i.type=t.type,e.push(i)}else(!globalThis.MouseEvent||t instanceof MouseEvent&&(!this.supportsPointerEvents||!(t instanceof globalThis.PointerEvent)))&&(typeof t.isPrimary>"u"&&(t.isPrimary=!0),typeof t.width>"u"&&(t.width=1),typeof t.height>"u"&&(t.height=1),typeof t.tiltX>"u"&&(t.tiltX=0),typeof t.tiltY>"u"&&(t.tiltY=0),typeof t.pointerType>"u"&&(t.pointerType="mouse"),typeof t.pointerId>"u"&&(t.pointerId=1),typeof t.pressure>"u"&&(t.pressure=.5),typeof t.twist>"u"&&(t.twist=0),typeof t.tangentialPressure>"u"&&(t.tangentialPressure=0),t.isNormalized=!0),e.push(t);return e}/**
   * Normalizes the native {@link https://w3c.github.io/uievents/#interface-wheelevent WheelEvent}.
   *
   * The returned {@link PIXI.FederatedWheelEvent} is a shared instance. It will not persist across
   * multiple native wheel events.
   * @param nativeEvent - The native wheel event that occurred on the canvas.
   * @returns A federated wheel event.
   */normalizeWheelEvent(t){let e=this.rootWheelEvent;return this.transferMouseData(e,t),e.deltaX=t.deltaX,e.deltaY=t.deltaY,e.deltaZ=t.deltaZ,e.deltaMode=t.deltaMode,this.mapPositionToPoint(e.screen,t.clientX,t.clientY),e.global.copyFrom(e.screen),e.offset.copyFrom(e.screen),e.nativeEvent=t,e.type=t.type,e}/**
   * Normalizes the `nativeEvent` into a federateed {@link PIXI.FederatedPointerEvent}.
   * @param event
   * @param nativeEvent
   */bootstrapEvent(t,e){return t.originalEvent=null,t.nativeEvent=e,t.pointerId=e.pointerId,t.width=e.width,t.height=e.height,t.isPrimary=e.isPrimary,t.pointerType=e.pointerType,t.pressure=e.pressure,t.tangentialPressure=e.tangentialPressure,t.tiltX=e.tiltX,t.tiltY=e.tiltY,t.twist=e.twist,this.transferMouseData(t,e),this.mapPositionToPoint(t.screen,e.clientX,e.clientY),t.global.copyFrom(t.screen),t.offset.copyFrom(t.screen),t.isTrusted=e.isTrusted,"pointerleave"===t.type&&(t.type="pointerout"),t.type.startsWith("mouse")&&(t.type=t.type.replace("mouse","pointer")),t.type.startsWith("touch")&&(t.type=oE[t.type]||t.type),t}/**
   * Transfers base & mouse event data from the {@code nativeEvent} to the federated event.
   * @param event
   * @param nativeEvent
   */transferMouseData(t,e){t.isTrusted=e.isTrusted,t.srcElement=e.srcElement,t.timeStamp=performance.now(),t.type=e.type,t.altKey=e.altKey,t.button=e.button,t.buttons=e.buttons,t.client.x=e.clientX,t.client.y=e.clientY,t.ctrlKey=e.ctrlKey,t.metaKey=e.metaKey,t.movement.x=e.movementX,t.movement.y=e.movementY,t.page.x=e.pageX,t.page.y=e.pageY,t.relatedTarget=null,t.shiftKey=e.shiftKey}};function oA(t){return"dynamic"===t||"static"===t}oT.extension={name:"events",type:[sS.RendererSystem,sS.CanvasRendererSystem]},/**
* The event features that are enabled by the EventSystem
* This option only is available when using **@pixi/events** package
* (included in the **pixi.js** and **pixi.js-legacy** bundle), otherwise it will be ignored.
* @since 7.2.0
*/oT.defaultEventFeatures={move:!0,globalMove:!0,click:!0,wheel:!0},sI.add(oT),a0.mixin({/**
   * Property-based event handler for the `click` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onclick = (event) => {
   *  //some function here that happens on click
   * }
   */onclick:null,/**
   * Property-based event handler for the `mousedown` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmousedown = (event) => {
   *  //some function here that happens on mousedown
   * }
   */onmousedown:null,/**
   * Property-based event handler for the `mouseenter` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmouseenter = (event) => {
   *  //some function here that happens on mouseenter
   * }
   */onmouseenter:null,/**
   * Property-based event handler for the `mouseleave` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmouseleave = (event) => {
   *  //some function here that happens on mouseleave
   * }
   */onmouseleave:null,/**
   * Property-based event handler for the `mousemove` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmousemove = (event) => {
   *  //some function here that happens on mousemove
   * }
   */onmousemove:null,/**
   * Property-based event handler for the `globalmousemove` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onglobalmousemove = (event) => {
   *  //some function here that happens on globalmousemove
   * }
   */onglobalmousemove:null,/**
   * Property-based event handler for the `mouseout` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmouseout = (event) => {
   *  //some function here that happens on mouseout
   * }
   */onmouseout:null,/**
   * Property-based event handler for the `mouseover` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmouseover = (event) => {
   *  //some function here that happens on mouseover
   * }
   */onmouseover:null,/**
   * Property-based event handler for the `mouseup` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmouseup = (event) => {
   *  //some function here that happens on mouseup
   * }
   */onmouseup:null,/**
   * Property-based event handler for the `mouseupoutside` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmouseupoutside = (event) => {
   *  //some function here that happens on mouseupoutside
   * }
   */onmouseupoutside:null,/**
   * Property-based event handler for the `pointercancel` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointercancel = (event) => {
   *  //some function here that happens on pointercancel
   * }
   */onpointercancel:null,/**
   * Property-based event handler for the `pointerdown` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointerdown = (event) => {
   *  //some function here that happens on pointerdown
   * }
   */onpointerdown:null,/**
   * Property-based event handler for the `pointerenter` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointerenter = (event) => {
   *  //some function here that happens on pointerenter
   * }
   */onpointerenter:null,/**
   * Property-based event handler for the `pointerleave` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointerleave = (event) => {
   *  //some function here that happens on pointerleave
   * }
   */onpointerleave:null,/**
   * Property-based event handler for the `pointermove` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointermove = (event) => {
   *  //some function here that happens on pointermove
   * }
   */onpointermove:null,/**
   * Property-based event handler for the `globalpointermove` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onglobalpointermove = (event) => {
   *  //some function here that happens on globalpointermove
   * }
   */onglobalpointermove:null,/**
   * Property-based event handler for the `pointerout` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointerout = (event) => {
   *  //some function here that happens on pointerout
   * }
   */onpointerout:null,/**
   * Property-based event handler for the `pointerover` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointerover = (event) => {
   *  //some function here that happens on pointerover
   * }
   */onpointerover:null,/**
   * Property-based event handler for the `pointertap` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointertap = (event) => {
   *  //some function here that happens on pointertap
   * }
   */onpointertap:null,/**
   * Property-based event handler for the `pointerup` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointerup = (event) => {
   *  //some function here that happens on pointerup
   * }
   */onpointerup:null,/**
   * Property-based event handler for the `pointerupoutside` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointerupoutside = (event) => {
   *  //some function here that happens on pointerupoutside
   * }
   */onpointerupoutside:null,/**
   * Property-based event handler for the `rightclick` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onrightclick = (event) => {
   *  //some function here that happens on rightclick
   * }
   */onrightclick:null,/**
   * Property-based event handler for the `rightdown` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onrightdown = (event) => {
   *  //some function here that happens on rightdown
   * }
   */onrightdown:null,/**
   * Property-based event handler for the `rightup` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onrightup = (event) => {
   *  //some function here that happens on rightup
   * }
   */onrightup:null,/**
   * Property-based event handler for the `rightupoutside` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onrightupoutside = (event) => {
   *  //some function here that happens on rightupoutside
   * }
   */onrightupoutside:null,/**
   * Property-based event handler for the `tap` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.ontap = (event) => {
   *  //some function here that happens on tap
   * }
   */ontap:null,/**
   * Property-based event handler for the `touchcancel` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.ontouchcancel = (event) => {
   *  //some function here that happens on touchcancel
   * }
   */ontouchcancel:null,/**
   * Property-based event handler for the `touchend` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.ontouchend = (event) => {
   *  //some function here that happens on touchend
   * }
   */ontouchend:null,/**
   * Property-based event handler for the `touchendoutside` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.ontouchendoutside = (event) => {
   *  //some function here that happens on touchendoutside
   * }
   */ontouchendoutside:null,/**
   * Property-based event handler for the `touchmove` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.ontouchmove = (event) => {
   *  //some function here that happens on touchmove
   * }
   */ontouchmove:null,/**
   * Property-based event handler for the `globaltouchmove` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onglobaltouchmove = (event) => {
   *  //some function here that happens on globaltouchmove
   * }
   */onglobaltouchmove:null,/**
   * Property-based event handler for the `touchstart` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.ontouchstart = (event) => {
   *  //some function here that happens on touchstart
   * }
   */ontouchstart:null,/**
   * Property-based event handler for the `wheel` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onwheel = (event) => {
   *  //some function here that happens on wheel
   * }
   */onwheel:null,/**
   * @ignore
   */_internalInteractive:void 0,/**
   * Enable interaction events for the DisplayObject. Touch, pointer and mouse
   * @memberof PIXI.DisplayObject#
   */get interactive(){return this._internalInteractive??oA(oT.defaultEventMode)},set interactive(value){tC.deprecation("7.2.0","Setting interactive is deprecated, use eventMode = 'none'/'passive'/'auto'/'static'/'dynamic' instead."),this._internalInteractive=value,this.eventMode=value?"static":"auto"},/**
   * @ignore
   */_internalEventMode:void 0,/**
   * Enable interaction events for the DisplayObject. Touch, pointer and mouse.
   * This now replaces the `interactive` property.
   * There are 5 types of interaction settings:
   * - `'none'`: Ignores all interaction events, even on its children.
   * - `'passive'`: Does not emit events and ignores all hit testing on itself and non-interactive children.
   * Interactive children will still emit events.
   * - `'auto'`: Does not emit events but is hit tested if parent is interactive. Same as `interactive = false` in v7
   * - `'static'`: Emit events and is hit tested. Same as `interaction = true` in v7
   * - `'dynamic'`: Emits events and is hit tested but will also receive mock interaction events fired from a ticker to
   * allow for interaction when the mouse isn't moving
   * @example
   * import { Sprite } from 'pixi.js';
   *
   * const sprite = new Sprite(texture);
   * sprite.eventMode = 'static';
   * sprite.on('tap', (event) => {
   *     // Handle event
   * });
   * @memberof PIXI.DisplayObject#
   * @since 7.2.0
   */get eventMode(){return this._internalEventMode??oT.defaultEventMode},set eventMode(value){this._internalInteractive=oA(value),this._internalEventMode=value},/**
   * Determines if the displayObject is interactive or not
   * @returns {boolean} Whether the displayObject is interactive or not
   * @memberof PIXI.DisplayObject#
   * @since 7.2.0
   * @example
   * import { Sprite } from 'pixi.js';
   * const sprite = new Sprite(texture);
   * sprite.eventMode = 'static';
   * sprite.isInteractive(); // true
   *
   * sprite.eventMode = 'dynamic';
   * sprite.isInteractive(); // true
   *
   * sprite.eventMode = 'none';
   * sprite.isInteractive(); // false
   *
   * sprite.eventMode = 'passive';
   * sprite.isInteractive(); // false
   *
   * sprite.eventMode = 'auto';
   * sprite.isInteractive(); // false
   */isInteractive(){return"static"===this.eventMode||"dynamic"===this.eventMode},/**
   * Determines if the children to the displayObject can be clicked/touched
   * Setting this to false allows PixiJS to bypass a recursive `hitTest` function
   * @memberof PIXI.Container#
   */interactiveChildren:!0,/**
   * Interaction shape. Children will be hit first, then this shape will be checked.
   * Setting this will cause this shape to be checked in hit tests rather than the displayObject's bounds.
   * @example
   * import { Rectangle, Sprite } from 'pixi.js';
   *
   * const sprite = new Sprite(texture);
   * sprite.interactive = true;
   * sprite.hitArea = new Rectangle(0, 0, 100, 100);
   * @member {PIXI.IHitArea}
   * @memberof PIXI.DisplayObject#
   */hitArea:null,/**
   * Unlike `on` or `addListener` which are methods from EventEmitter, `addEventListener`
   * seeks to be compatible with the DOM's `addEventListener` with support for options.
   * **IMPORTANT:** _Only_ available if using the `@pixi/events` package.
   * @memberof PIXI.DisplayObject
   * @param type - The type of event to listen to.
   * @param listener - The listener callback or object.
   * @param options - Listener options, used for capture phase.
   * @example
   * // Tell the user whether they did a single, double, triple, or nth click.
   * button.addEventListener('click', {
   *     handleEvent(e): {
   *         let prefix;
   *
   *         switch (e.detail) {
   *             case 1: prefix = 'single'; break;
   *             case 2: prefix = 'double'; break;
   *             case 3: prefix = 'triple'; break;
   *             default: prefix = e.detail + 'th'; break;
   *         }
   *
   *         console.log('That was a ' + prefix + 'click');
   *     }
   * });
   *
   * // But skip the first click!
   * button.parent.addEventListener('click', function blockClickOnce(e) {
   *     e.stopImmediatePropagation();
   *     button.parent.removeEventListener('click', blockClickOnce, true);
   * }, {
   *     capture: true,
   * });
   */addEventListener(t,e,r){let i="boolean"==typeof r&&r||"object"==typeof r&&r.capture,s="function"==typeof e?void 0:e;t=i?`${t}capture`:t,e="function"==typeof e?e:e.handleEvent,this.on(t,e,s)},/**
   * Unlike `off` or `removeListener` which are methods from EventEmitter, `removeEventListener`
   * seeks to be compatible with the DOM's `removeEventListener` with support for options.
   * **IMPORTANT:** _Only_ available if using the `@pixi/events` package.
   * @memberof PIXI.DisplayObject
   * @param type - The type of event the listener is bound to.
   * @param listener - The listener callback or object.
   * @param options - The original listener options. This is required to deregister a capture phase listener.
   */removeEventListener(t,e,r){let i="boolean"==typeof r&&r||"object"==typeof r&&r.capture,s="function"==typeof e?void 0:e;t=i?`${t}capture`:t,e="function"==typeof e?e:e.handleEvent,this.off(t,e,s)},/**
   * Dispatch the event on this {@link PIXI.DisplayObject} using the event's {@link PIXI.EventBoundary}.
   *
   * The target of the event is set to `this` and the `defaultPrevented` flag is cleared before dispatch.
   *
   * **IMPORTANT:** _Only_ available if using the `@pixi/events` package.
   * @memberof PIXI.DisplayObject
   * @param e - The event to dispatch.
   * @returns Whether the {@link PIXI.FederatedEvent.preventDefault preventDefault}() method was not invoked.
   * @example
   * // Reuse a click event!
   * button.dispatchEvent(clickEvent);
   */dispatchEvent(t){if(!(t instanceof om))throw Error("DisplayObject cannot propagate events outside of the Federated Events API");return t.defaultPrevented=!1,t.path=null,t.target=this,t.manager.dispatchEvent(t),!t.defaultPrevented}}),a0.mixin({/**
   *  Flag for if the object is accessible. If true AccessibilityManager will overlay a
   *   shadow div with attributes set
   * @member {boolean}
   * @memberof PIXI.DisplayObject#
   */accessible:!1,/**
   * Sets the title attribute of the shadow div
   * If accessibleTitle AND accessibleHint has not been this will default to 'displayObject [tabIndex]'
   * @member {?string}
   * @memberof PIXI.DisplayObject#
   */accessibleTitle:null,/**
   * Sets the aria-label attribute of the shadow div
   * @member {string}
   * @memberof PIXI.DisplayObject#
   */accessibleHint:null,/**
   * @member {number}
   * @memberof PIXI.DisplayObject#
   * @private
   * @todo Needs docs.
   */tabIndex:0,/**
   * @member {boolean}
   * @memberof PIXI.DisplayObject#
   * @todo Needs docs.
   */_accessibleActive:!1,/**
   * @member {boolean}
   * @memberof PIXI.DisplayObject#
   * @todo Needs docs.
   */_accessibleDiv:null,/**
   * Specify the type of div the accessible layer is. Screen readers treat the element differently
   * depending on this type. Defaults to button.
   * @member {string}
   * @memberof PIXI.DisplayObject#
   * @default 'button'
   */accessibleType:"button",/**
   * Specify the pointer-events the accessible div will use
   * Defaults to auto.
   * @member {string}
   * @memberof PIXI.DisplayObject#
   * @default 'auto'
   */accessiblePointerEvents:"auto",/**
   * Setting to false will prevent any children inside this container to
   * be accessible. Defaults to true.
   * @member {boolean}
   * @memberof PIXI.DisplayObject#
   * @default true
   */accessibleChildren:!0,renderId:-1});class oS{// 2fps
/**
   * @param {PIXI.CanvasRenderer|PIXI.Renderer} renderer - A reference to the current renderer
   */constructor(t){this.debug=!1,this._isActive=!1,this._isMobileAccessibility=!1,this.pool=[],this.renderId=0,this.children=[],this.androidUpdateCount=0,this.androidUpdateFrequency=500,this._hookDiv=null,(tC.isMobile.tablet||tC.isMobile.phone)&&this.createTouchHook();let e=document.createElement("div");e.style.width="100px",e.style.height="100px",e.style.position="absolute",e.style.top="0px",e.style.left="0px",e.style.zIndex="2",this.div=e,this.renderer=t,this._onKeyDown=this._onKeyDown.bind(this),this._onMouseMove=this._onMouseMove.bind(this),globalThis.addEventListener("keydown",this._onKeyDown,!1)}/**
   * Value of `true` if accessibility is currently active and accessibility layers are showing.
   * @member {boolean}
   * @readonly
   */get isActive(){return this._isActive}/**
   * Value of `true` if accessibility is enabled for touch devices.
   * @member {boolean}
   * @readonly
   */get isMobileAccessibility(){return this._isMobileAccessibility}/**
   * Creates the touch hooks.
   * @private
   */createTouchHook(){let t=document.createElement("button");t.style.width="1px",t.style.height="1px",t.style.position="absolute",t.style.top="-1000px",t.style.left="-1000px",t.style.zIndex="2",t.style.backgroundColor="#FF0000",t.title="select to enable accessibility for this content",t.addEventListener("focus",()=>{this._isMobileAccessibility=!0,this.activate(),this.destroyTouchHook()}),document.body.appendChild(t),this._hookDiv=t}/**
   * Destroys the touch hooks.
   * @private
   */destroyTouchHook(){this._hookDiv&&(document.body.removeChild(this._hookDiv),this._hookDiv=null)}/**
   * Activating will cause the Accessibility layer to be shown.
   * This is called when a user presses the tab key.
   * @private
   */activate(){this._isActive||(this._isActive=!0,globalThis.document.addEventListener("mousemove",this._onMouseMove,!0),globalThis.removeEventListener("keydown",this._onKeyDown,!1),this.renderer.on("postrender",this.update,this),this.renderer.view.parentNode?.appendChild(this.div))}/**
   * Deactivating will cause the Accessibility layer to be hidden.
   * This is called when a user moves the mouse.
   * @private
   */deactivate(){!this._isActive||this._isMobileAccessibility||(this._isActive=!1,globalThis.document.removeEventListener("mousemove",this._onMouseMove,!0),globalThis.addEventListener("keydown",this._onKeyDown,!1),this.renderer.off("postrender",this.update),this.div.parentNode?.removeChild(this.div))}/**
   * This recursive function will run through the scene graph and add any new accessible objects to the DOM layer.
   * @private
   * @param {PIXI.Container} displayObject - The DisplayObject to check.
   */updateAccessibleObjects(t){if(!t.visible||!t.accessibleChildren)return;t.accessible&&t.isInteractive()&&(t._accessibleActive||this.addChild(t),t.renderId=this.renderId);let e=t.children;if(e)for(let t=0;t<e.length;t++)this.updateAccessibleObjects(e[t])}/**
   * Before each render this function will ensure that all divs are mapped correctly to their DisplayObjects.
   * @private
   */update(){let t=performance.now();if(tC.isMobile.android.device&&t<this.androidUpdateCount||(this.androidUpdateCount=t+this.androidUpdateFrequency,!this.renderer.renderingToScreen))return;this.renderer.lastObjectRendered&&this.updateAccessibleObjects(this.renderer.lastObjectRendered);let{x:e,y:r,width:i,height:s}=this.renderer.view.getBoundingClientRect(),{width:n,height:a,resolution:o}=this.renderer,h=i/n*o,l=s/a*o,u=this.div;u.style.left=`${e}px`,u.style.top=`${r}px`,u.style.width=`${n}px`,u.style.height=`${a}px`;for(let t=0;t<this.children.length;t++){let e=this.children[t];if(e.renderId!==this.renderId)e._accessibleActive=!1,tC.removeItems(this.children,t,1),this.div.removeChild(e._accessibleDiv),this.pool.push(e._accessibleDiv),e._accessibleDiv=null,t--;else{u=e._accessibleDiv;let t=e.hitArea,r=e.worldTransform;e.hitArea?(u.style.left=`${(r.tx+t.x*r.a)*h}px`,u.style.top=`${(r.ty+t.y*r.d)*l}px`,u.style.width=`${t.width*r.a*h}px`,u.style.height=`${t.height*r.d*l}px`):(t=e.getBounds(),this.capHitArea(t),u.style.left=`${t.x*h}px`,u.style.top=`${t.y*l}px`,u.style.width=`${t.width*h}px`,u.style.height=`${t.height*l}px`,u.title!==e.accessibleTitle&&null!==e.accessibleTitle&&(u.title=e.accessibleTitle),u.getAttribute("aria-label")!==e.accessibleHint&&null!==e.accessibleHint&&u.setAttribute("aria-label",e.accessibleHint)),(e.accessibleTitle!==u.title||e.tabIndex!==u.tabIndex)&&(u.title=e.accessibleTitle,u.tabIndex=e.tabIndex,this.debug&&this.updateDebugHTML(u))}}this.renderId++}/**
   * private function that will visually add the information to the
   * accessability div
   * @param {HTMLElement} div -
   */updateDebugHTML(t){t.innerHTML=`type: ${t.type}</br> title : ${t.title}</br> tabIndex: ${t.tabIndex}`}/**
   * Adjust the hit area based on the bounds of a display object
   * @param {PIXI.Rectangle} hitArea - Bounds of the child
   */capHitArea(t){t.x<0&&(t.width+=t.x,t.x=0),t.y<0&&(t.height+=t.y,t.y=0);let{width:e,height:r}=this.renderer;t.x+t.width>e&&(t.width=e-t.x),t.y+t.height>r&&(t.height=r-t.y)}/**
   * Adds a DisplayObject to the accessibility manager
   * @private
   * @param {PIXI.DisplayObject} displayObject - The child to make accessible.
   */addChild(t){let e=this.pool.pop();e||((e=document.createElement("button")).style.width="100px",e.style.height="100px",e.style.backgroundColor=this.debug?"rgba(255,255,255,0.5)":"transparent",e.style.position="absolute",e.style.zIndex="2",e.style.borderStyle="none",navigator.userAgent.toLowerCase().includes("chrome")?e.setAttribute("aria-live","off"):e.setAttribute("aria-live","polite"),navigator.userAgent.match(/rv:.*Gecko\//)?e.setAttribute("aria-relevant","additions"):e.setAttribute("aria-relevant","text"),e.addEventListener("click",this._onClick.bind(this)),e.addEventListener("focus",this._onFocus.bind(this)),e.addEventListener("focusout",this._onFocusOut.bind(this))),e.style.pointerEvents=t.accessiblePointerEvents,e.type=t.accessibleType,t.accessibleTitle&&null!==t.accessibleTitle?e.title=t.accessibleTitle:t.accessibleHint&&null!==t.accessibleHint||(e.title=`displayObject ${t.tabIndex}`),t.accessibleHint&&null!==t.accessibleHint&&e.setAttribute("aria-label",t.accessibleHint),this.debug&&this.updateDebugHTML(e),t._accessibleActive=!0,t._accessibleDiv=e,e.displayObject=t,this.children.push(t),this.div.appendChild(t._accessibleDiv),t._accessibleDiv.tabIndex=t.tabIndex}/**
   * Dispatch events with the EventSystem.
   * @param e
   * @param type
   * @private
   */_dispatchEvent(t,e){let{displayObject:r}=t.target,i=this.renderer.events.rootBoundary,s=Object.assign(new om(i),{target:r});i.rootTarget=this.renderer.lastObjectRendered,e.forEach(t=>i.dispatchEvent(s,t))}/**
   * Maps the div button press to pixi's EventSystem (click)
   * @private
   * @param {MouseEvent} e - The click event.
   */_onClick(t){this._dispatchEvent(t,["click","pointertap","tap"])}/**
   * Maps the div focus events to pixi's EventSystem (mouseover)
   * @private
   * @param {FocusEvent} e - The focus event.
   */_onFocus(t){t.target.getAttribute("aria-live")||t.target.setAttribute("aria-live","assertive"),this._dispatchEvent(t,["mouseover"])}/**
   * Maps the div focus events to pixi's EventSystem (mouseout)
   * @private
   * @param {FocusEvent} e - The focusout event.
   */_onFocusOut(t){t.target.getAttribute("aria-live")||t.target.setAttribute("aria-live","polite"),this._dispatchEvent(t,["mouseout"])}/**
   * Is called when a key is pressed
   * @private
   * @param {KeyboardEvent} e - The keydown event.
   */_onKeyDown(t){9===t.keyCode&&this.activate()}/**
   * Is called when the mouse moves across the renderer element
   * @private
   * @param {MouseEvent} e - The mouse event.
   */_onMouseMove(t){0===t.movementX&&0===t.movementY||this.deactivate()}/** Destroys the accessibility manager */destroy(){this.destroyTouchHook(),this.div=null,globalThis.document.removeEventListener("mousemove",this._onMouseMove,!0),globalThis.removeEventListener("keydown",this._onKeyDown),this.pool=null,this.children=null,this.renderer=null}}oS.extension={name:"accessibility",type:[sS.RendererPlugin,sS.CanvasRendererPlugin]},sI.add(oS);const ow=class t{/**
   * @param options - The optional application and renderer parameters.
   */constructor(e){this.stage=new a5,e=Object.assign({forceCanvas:!1},e),this.renderer=function(t){for(let e of aG)if(e.test(t))return new e(t);throw Error("Unable to auto-detect a suitable renderer.")}(e),t._plugins.forEach(t=>{t.init.call(this,e)})}/** Render the current stage. */render(){this.renderer.render(this.stage)}/**
   * Reference to the renderer's canvas element.
   * @member {PIXI.ICanvas}
   * @readonly
   */get view(){return this.renderer?.view}/**
   * Reference to the renderer's screen rectangle. Its safe to use as `filterArea` or `hitArea` for the whole screen.
   * @member {PIXI.Rectangle}
   * @readonly
   */get screen(){return this.renderer?.screen}/**
   * Destroy and don't use after this.
   * @param {boolean} [removeView=false] - Automatically remove canvas from DOM.
   * @param {object|boolean} [stageOptions] - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [stageOptions.children=false] - if set to true, all the children will have their destroy
   *  method called as well. 'stageOptions' will be passed on to those calls.
   * @param {boolean} [stageOptions.texture=false] - Only used for child Sprites if stageOptions.children is set
   *  to true. Should it destroy the texture of the child sprite
   * @param {boolean} [stageOptions.baseTexture=false] - Only used for child Sprites if stageOptions.children is set
   *  to true. Should it destroy the base texture of the child sprite
   */destroy(e,r){let i=t._plugins.slice(0);i.reverse(),i.forEach(t=>{t.destroy.call(this)}),this.stage.destroy(r),this.stage=null,this.renderer.destroy(e),this.renderer=null}};ow._plugins=[],sI.handleByList(sS.Application,ow._plugins);class oR{/**
   * Initialize the plugin with scope of application instance
   * @static
   * @private
   * @param {object} [options] - See application options
   */static init(t){Object.defineProperty(this,"resizeTo",/**
       * The HTML element or window to automatically resize the
       * renderer's view element to match width and height.
       * @member {Window|HTMLElement}
       * @name resizeTo
       * @memberof PIXI.Application#
       */{set(t){globalThis.removeEventListener("resize",this.queueResize),this._resizeTo=t,t&&(globalThis.addEventListener("resize",this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this.cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this.cancelResize=()=>{this._resizeId&&(cancelAnimationFrame(this._resizeId),this._resizeId=null)},this.resize=()=>{let t,e;if(this._resizeTo){if(this.cancelResize(),this._resizeTo===globalThis.window)t=globalThis.innerWidth,e=globalThis.innerHeight;else{let{clientWidth:r,clientHeight:i}=this._resizeTo;t=r,e=i}this.renderer.resize(t,e),this.render()}},this._resizeId=null,this._resizeTo=null,this.resizeTo=t.resizeTo||null}/**
   * Clean up the ticker, scoped to application
   * @static
   * @private
   */static destroy(){globalThis.removeEventListener("resize",this.queueResize),this.cancelResize(),this.cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}}oR.extension=sS.Application,sI.add(oR);const oI={loader:sS.LoadParser,resolver:sS.ResolveParser,cache:sS.CacheParser,detection:sS.DetectionParser};sI.handle(sS.Asset,t=>{let e=t.ref;Object.entries(oI).filter(([t])=>!!e[t]).forEach(([t,r])=>sI.add(Object.assign(e[t],// ExtensionMetadata, the use cases here is priority for LoaderParsers
    {extension:e[t].extension??r})))},t=>{let e=t.ref;Object.keys(oI).filter(t=>!!e[t]).forEach(t=>sI.remove(e[t]))});class oC{/**
   * @param loader
   * @param verbose - should the loader log to the console
   */constructor(t,e=!1){this._loader=t,this._assetList=[],this._isLoading=!1,this._maxConcurrent=1,this.verbose=e}/**
   * Adds an array of assets to load.
   * @param assetUrls - assets to load
   */add(t){t.forEach(t=>{this._assetList.push(t)}),this.verbose&&console.log("[BackgroundLoader] assets: ",this._assetList),this._isActive&&!this._isLoading&&this._next()}/**
   * Loads the next set of assets. Will try to load as many assets as it can at the same time.
   *
   * The max assets it will try to load at one time will be 4.
   */async _next(){if(this._assetList.length&&this._isActive){this._isLoading=!0;let t=[],e=Math.min(this._assetList.length,this._maxConcurrent);for(let r=0;r<e;r++)t.push(this._assetList.pop());await this._loader.load(t),this._isLoading=!1,this._next()}}/**
   * Activate/Deactivate the loading. If set to true then it will immediately continue to load the next asset.
   * @returns whether the class is active
   */get active(){return this._isActive}set active(t){this._isActive!==t&&(this._isActive=t,t&&!this._isLoading&&this._next())}}function oP(t,e){if(Array.isArray(e)){for(let r of e)if(t.startsWith(`data:${r}`))return!0;return!1}return t.startsWith(`data:${e}`)}function oM(t,e){let r=t.split("?")[0],i=tC.path.extname(r).toLowerCase();return Array.isArray(e)?e.includes(i):i===e}const oD=(t,e,r=!1)=>(Array.isArray(t)||(t=[t]),e?t.map(t=>"string"==typeof t||r?e(t):t):t),oO=(t,e)=>{let r=e.split("?")[1];return r&&(t+=`?${r}`),t},oB=t=>!Array.isArray(t),oN=new class{constructor(){this._parsers=[],this._cache=/* @__PURE__ */new Map,this._cacheMap=/* @__PURE__ */new Map}/** Clear all entries. */reset(){this._cacheMap.clear(),this._cache.clear()}/**
   * Check if the key exists
   * @param key - The key to check
   */has(t){return this._cache.has(t)}/**
   * Fetch entry by key
   * @param key - The key of the entry to get
   */get(t){let e=this._cache.get(t);return e||console.warn(`[Assets] Asset id ${t} was not found in the Cache`),e}/**
   * Set a value by key or keys name
   * @param key - The key or keys to set
   * @param value - The value to store in the cache or from which cacheable assets will be derived.
   */set(t,e){let r;let i=oD(t);for(let t=0;t<this.parsers.length;t++){let s=this.parsers[t];if(s.test(e)){r=s.getCacheableAssets(i,e);break}}r||(r={},i.forEach(t=>{r[t]=e}));let s=Object.keys(r),n={cacheKeys:s,keys:i};i.forEach(t=>{this._cacheMap.set(t,n)}),s.forEach(t=>{this._cache.has(t)&&this._cache.get(t)!==e&&console.warn("[Cache] already has key:",t),this._cache.set(t,r[t])}),e instanceof nZ&&i.forEach(t=>{e.baseTexture!==nZ.EMPTY.baseTexture&&sk.addToCache(e.baseTexture,t),nZ.addToCache(e,t)})}/**
   * Remove entry by key
   *
   * This function will also remove any associated alias from the cache also.
   * @param key - The key of the entry to remove
   */remove(t){if(!this._cacheMap.has(t)){console.warn(`[Assets] Asset id ${t} was not found in the Cache`);return}let e=this._cacheMap.get(t);e.cacheKeys.forEach(t=>{this._cache.delete(t)}),e.keys.forEach(t=>{this._cacheMap.delete(t)})}/** All loader parsers registered */get parsers(){return this._parsers}};class oF{constructor(){this._parsers=[],this._parsersValidated=!1,this.parsers=new Proxy(this._parsers,{set:(t,e,r)=>(this._parsersValidated=!1,t[e]=r,!0)}),this.promiseCache={}}/** function used for testing */reset(){this._parsersValidated=!1,this.promiseCache={}}/**
   * Used internally to generate a promise for the asset to be loaded.
   * @param url - The URL to be loaded
   * @param data - any custom additional information relevant to the asset being loaded
   * @returns - a promise that will resolve to an Asset for example a Texture of a JSON object
   */_getLoadPromiseAndParser(t,e){let r={promise:null,parser:null};return r.promise=(async()=>{let i=null,s=null;if(e.loadParser&&((s=this._parserHash[e.loadParser])||console.warn(`[Assets] specified load parser "${e.loadParser}" not found while loading ${t}`)),!s){for(let r=0;r<this.parsers.length;r++){let i=this.parsers[r];if(i.load&&i.test?.(t,e,this)){s=i;break}}if(!s)return console.warn(`[Assets] ${t} could not be loaded as we don't know how to parse it, ensure the correct parser has been added`),null}i=await s.load(t,e,this),r.parser=s;for(let t=0;t<this.parsers.length;t++){let s=this.parsers[t];s.parse&&s.parse&&await s.testParse?.(i,e,this)&&(i=await s.parse(i,e,this)||i,r.parser=s)}return i})(),r}async load(t,e){this._parsersValidated||this._validateParsers();let r=0,i={},s=oB(t),n=oD(t,t=>({alias:[t],src:t})),a=n.length,o=n.map(async t=>{let s=tC.path.toAbsolute(t.src);if(!i[t.src])try{this.promiseCache[s]||(this.promiseCache[s]=this._getLoadPromiseAndParser(s,t)),i[t.src]=await this.promiseCache[s].promise,e&&e(++r/a)}catch(e){throw delete this.promiseCache[s],delete i[t.src],Error(`[Loader.load] Failed to load ${s}.
${e}`)}});return await Promise.all(o),s?i[n[0].src]:i}/**
   * Unloads one or more assets. Any unloaded assets will be destroyed, freeing up memory for your app.
   * The parser that created the asset, will be the one that unloads it.
   * @example
   * // Single asset:
   * const asset = await Loader.load('cool.png');
   *
   * await Loader.unload('cool.png');
   *
   * console.log(asset.destroyed); // true
   * @param assetsToUnloadIn - urls that you want to unload, or a single one!
   */async unload(t){let e=oD(t,t=>({alias:[t],src:t})).map(async t=>{let e=tC.path.toAbsolute(t.src),r=this.promiseCache[e];if(r){let i=await r.promise;delete this.promiseCache[e],r.parser?.unload?.(i,t,this)}});await Promise.all(e)}/** validates our parsers, right now it only checks for name conflicts but we can add more here as required! */_validateParsers(){this._parsersValidated=!0,this._parserHash=this._parsers.filter(t=>t.name).reduce((t,e)=>(t[e.name]&&console.warn(`[Assets] loadParser name conflict "${e.name}"`),{...t,[e.name]:e}),{})}}var oL=((P=oL||{})[P.Low=0]="Low",P[P.Normal=1]="Normal",P[P.High=2]="High",P);const oU={extension:{type:sS.LoadParser,priority:oL.Low},name:"loadJson",test:t=>oP(t,"application/json")||oM(t,".json"),load:async t=>await (await tl.ADAPTER.fetch(t)).json()};sI.add(oU);const ok={name:"loadTxt",extension:{type:sS.LoadParser,priority:oL.Low},test:t=>oP(t,"text/plain")||oM(t,".txt"),load:async t=>await (await tl.ADAPTER.fetch(t)).text()};sI.add(ok);const oG=["normal","bold","100","200","300","400","500","600","700","800","900"],oH=[".ttf",".otf",".woff",".woff2"],oj=["font/ttf","font/otf","font/woff","font/woff2"],oX=/^(--|-?[A-Z_])[0-9A-Z_-]*$/i,oV={extension:{type:sS.LoadParser,priority:oL.Low},name:"loadWebFont",test:t=>oP(t,oj)||oM(t,oH),async load(t,e){let r=tl.ADAPTER.getFontFaceSet();if(r){let i=[],s=e.data?.family??function(t){let e=tC.path.extname(t),r=tC.path.basename(t,e).replace(/(-|_)/g," ").toLowerCase().split(" ").map(t=>t.charAt(0).toUpperCase()+t.slice(1)),i=r.length>0;for(let t of r)if(!t.match(oX)){i=!1;break}let s=r.join(" ");return i||(s=`"${s.replace(/[\\"]/g,"\\$&")}"`),s}(t),n=e.data?.weights?.filter(t=>oG.includes(t))??["normal"],a=e.data??{};for(let e=0;e<n.length;e++){let o=n[e],h=new FontFace(s,`url(${encodeURI(t)})`,{...a,weight:o});await h.load(),r.add(h),i.push(h)}return 1===i.length?i[0]:i}return console.warn("[loadWebFont] FontFace API is not supported. Skipping loading font"),null},unload(t){(Array.isArray(t)?t:[t]).forEach(t=>tl.ADAPTER.getFontFaceSet().delete(t))}};sI.add(oV);let oz=0,oW;const o$={id:"checkImageBitmap",code:`
    async function checkImageBitmap()
    {
        try
        {
            if (typeof createImageBitmap !== 'function') return false;

            const response = await fetch('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=');
            const imageBlob =  await response.blob();
            const imageBitmap = await createImageBitmap(imageBlob);

            return imageBitmap.width === 1 && imageBitmap.height === 1;
        }
        catch (e)
        {
            return false;
        }
    }
    checkImageBitmap().then((result) => { self.postMessage(result); });
    `},oY={id:"loadImageBitmap",code:`
    async function loadImageBitmap(url)
    {
        const response = await fetch(url);

        if (!response.ok)
        {
            throw new Error(\`[WorkerManager.loadImageBitmap] Failed to fetch \${url}: \`
                + \`\${response.status} \${response.statusText}\`);
        }

        const imageBlob =  await response.blob();
        const imageBitmap = await createImageBitmap(imageBlob);

        return imageBitmap;
    }
    self.onmessage = async (event) =>
    {
        try
        {
            const imageBitmap = await loadImageBitmap(event.data.data[0]);

            self.postMessage({
                data: imageBitmap,
                uuid: event.data.uuid,
                id: event.data.id,
            }, [imageBitmap]);
        }
        catch(e)
        {
            self.postMessage({
                error: e,
                uuid: event.data.uuid,
                id: event.data.id,
            });
        }
    };`},oq=new class{constructor(){this._initialized=!1,this._createdWorkers=0,this.workerPool=[],this.queue=[],this.resolveHash={}}isImageBitmapSupported(){return void 0!==this._isImageBitmapSupported||(this._isImageBitmapSupported=new Promise(t=>{let e=URL.createObjectURL(new Blob([o$.code],{type:"application/javascript"})),r=new Worker(e);r.addEventListener("message",i=>{r.terminate(),URL.revokeObjectURL(e),t(i.data)})})),this._isImageBitmapSupported}loadImageBitmap(t){return this._run("loadImageBitmap",[t])}async _initWorkers(){this._initialized||(this._initialized=!0)}getWorker(){void 0===oW&&(oW=navigator.hardwareConcurrency||4);let t=this.workerPool.pop();return!t&&this._createdWorkers<oW&&(s||(s=URL.createObjectURL(new Blob([oY.code],{type:"application/javascript"}))),this._createdWorkers++,(t=new Worker(s)).addEventListener("message",t=>{this.complete(t.data),this.returnWorker(t.target),this.next()})),t}returnWorker(t){this.workerPool.push(t)}complete(t){void 0!==t.error?this.resolveHash[t.uuid].reject(t.error):this.resolveHash[t.uuid].resolve(t.data),this.resolveHash[t.uuid]=null}async _run(t,e){await this._initWorkers();let r=new Promise((r,i)=>{this.queue.push({id:t,arguments:e,resolve:r,reject:i})});return this.next(),r}next(){if(!this.queue.length)return;let t=this.getWorker();if(!t)return;let e=this.queue.pop(),r=e.id;this.resolveHash[oz]={resolve:e.resolve,reject:e.reject},t.postMessage({data:e.arguments,uuid:oz++,id:r})}};function oK(t,e,r){t.resource.internal=!0;let i=new nZ(t),s=()=>{delete e.promiseCache[r],oN.has(r)&&oN.remove(r)};return i.baseTexture.once("destroyed",()=>{r in e.promiseCache&&(console.warn("[Assets] A BaseTexture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the BaseTexture."),s())}),i.once("destroyed",()=>{t.destroyed||(console.warn("[Assets] A Texture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the Texture."),s())}),i}const oZ=[".jpeg",".jpg",".png",".webp",".avif"],oQ=["image/jpeg","image/png","image/webp","image/avif"];async function oJ(t){let e=await tl.ADAPTER.fetch(t);if(!e.ok)throw Error(`[loadImageBitmap] Failed to fetch ${t}: ${e.status} ${e.statusText}`);let r=await e.blob();return await createImageBitmap(r)}const o0={name:"loadTextures",extension:{type:sS.LoadParser,priority:oL.High},config:{preferWorkers:!0,preferCreateImageBitmap:!0,crossOrigin:"anonymous"},test:t=>oP(t,oQ)||oM(t,oZ),async load(t,e,r){let i;let s=globalThis.createImageBitmap&&this.config.preferCreateImageBitmap;i=s?this.config.preferWorkers&&await oq.isImageBitmapSupported()?await oq.loadImageBitmap(t):await oJ(t):await new Promise((e,r)=>{let i=new Image;i.crossOrigin=this.config.crossOrigin,i.src=t,i.complete?e(i):(i.onload=()=>e(i),i.onerror=t=>r(t))});let n={...e.data};n.resolution??(n.resolution=tC.getResolutionOfUrl(t)),s&&n.resourceOptions?.ownsImageBitmap===void 0&&(n.resourceOptions={...n.resourceOptions},n.resourceOptions.ownsImageBitmap=!0);let a=new sk(i,n);return a.resource.src=t,oK(a,r,t)},unload(t){t.destroy(!0)}};sI.add(o0);const o1={extension:{type:sS.LoadParser,priority:oL.High},name:"loadSVG",test:t=>oP(t,"image/svg+xml")||oM(t,".svg"),testParse:async t=>aZ.test(t),async parse(t,e,r){let i=new aZ(t,e?.data?.resourceOptions);await i.load();let s=new sk(i,{resolution:tC.getResolutionOfUrl(t),...e?.data});return s.resource.src=e.src,oK(s,r,e.src)},load:async(t,e)=>(await tl.ADAPTER.fetch(t)).text(),unload:o0.unload};sI.add(o1);const o2=[".mp4",".m4v",".webm",".ogv"],o3=["video/mp4","video/webm","video/ogg"],o4={name:"loadVideo",extension:{type:sS.LoadParser,priority:oL.High},config:{defaultAutoPlay:!0},test:t=>oP(t,o3)||oM(t,o2),async load(t,e,r){let i;let s=await (await tl.ADAPTER.fetch(t)).blob(),n=URL.createObjectURL(s);try{let s={autoPlay:this.config.defaultAutoPlay,...e?.data?.resourceOptions},a=new aQ(n,s);await a.load();let o=new sk(a,{alphaMode:await tC.detectVideoAlphaMode(),resolution:tC.getResolutionOfUrl(t),...e?.data});o.resource.src=t,(i=oK(o,r,t)).baseTexture.once("destroyed",()=>{URL.revokeObjectURL(n)})}catch(t){throw URL.revokeObjectURL(n),t}return i},unload(t){t.destroy(!0)}};sI.add(o4);class o5{constructor(){this._defaultBundleIdentifierOptions={connector:"-",createBundleAssetId:(t,e)=>`${t}${this._bundleIdConnector}${e}`,extractAssetIdFromBundle:(t,e)=>e.replace(`${t}${this._bundleIdConnector}`,"")},this._bundleIdConnector=this._defaultBundleIdentifierOptions.connector,this._createBundleAssetId=this._defaultBundleIdentifierOptions.createBundleAssetId,this._extractAssetIdFromBundle=this._defaultBundleIdentifierOptions.extractAssetIdFromBundle,this._assetMap={},this._preferredOrder=[],this._parsers=[],this._resolverHash={},this._bundles={}}/**
   * Override how the resolver deals with generating bundle ids.
   * must be called before any bundles are added
   * @param bundleIdentifier - the bundle identifier options
   */setBundleIdentifier(t){if(this._bundleIdConnector=t.connector??this._bundleIdConnector,this._createBundleAssetId=t.createBundleAssetId??this._createBundleAssetId,this._extractAssetIdFromBundle=t.extractAssetIdFromBundle??this._extractAssetIdFromBundle,"bar"!==this._extractAssetIdFromBundle("foo",this._createBundleAssetId("foo","bar")))throw Error("[Resolver] GenerateBundleAssetId are not working correctly")}/**
   * Let the resolver know which assets you prefer to use when resolving assets.
   * Multiple prefer user defined rules can be added.
   * @example
   * resolver.prefer({
   *     // first look for something with the correct format, and then then correct resolution
   *     priority: ['format', 'resolution'],
   *     params:{
   *         format:'webp', // prefer webp images
   *         resolution: 2, // prefer a resolution of 2
   *     }
   * })
   * resolver.add('foo', ['bar@2x.webp', 'bar@2x.png', 'bar.webp', 'bar.png']);
   * resolver.resolveUrl('foo') // => 'bar@2x.webp'
   * @param preferOrders - the prefer options
   */prefer(...t){t.forEach(t=>{this._preferredOrder.push(t),t.priority||(t.priority=Object.keys(t.params))}),this._resolverHash={}}/**
   * Set the base path to prepend to all urls when resolving
   * @example
   * resolver.basePath = 'https://home.com/';
   * resolver.add('foo', 'bar.ong');
   * resolver.resolveUrl('foo', 'bar.png'); // => 'https://home.com/bar.png'
   * @param basePath - the base path to use
   */set basePath(t){this._basePath=t}get basePath(){return this._basePath}/**
   * Set the root path for root-relative URLs. By default the `basePath`'s root is used. If no `basePath` is set, then the
   * default value for browsers is `window.location.origin`
   * @example
   * // Application hosted on https://home.com/some-path/index.html
   * resolver.basePath = 'https://home.com/some-path/';
   * resolver.rootPath = 'https://home.com/';
   * resolver.add('foo', '/bar.png');
   * resolver.resolveUrl('foo', '/bar.png'); // => 'https://home.com/bar.png'
   * @param rootPath - the root path to use
   */set rootPath(t){this._rootPath=t}get rootPath(){return this._rootPath}/**
   * All the active URL parsers that help the parser to extract information and create
   * an asset object-based on parsing the URL itself.
   *
   * Can be added using the extensions API
   * @example
   * resolver.add('foo', [
   *     {
   *         resolution: 2,
   *         format: 'png',
   *         src: 'image@2x.png',
   *     },
   *     {
   *         resolution:1,
   *         format:'png',
   *         src: 'image.png',
   *     },
   * ]);
   *
   * // With a url parser the information such as resolution and file format could extracted from the url itself:
   * extensions.add({
   *     extension: ExtensionType.ResolveParser,
   *     test: loadTextures.test, // test if url ends in an image
   *     parse: (value: string) =>
   *     ({
   *         resolution: parseFloat(settings.RETINA_PREFIX.exec(value)?.[1] ?? '1'),
   *         format: value.split('.').pop(),
   *         src: value,
   *     }),
   * });
   *
   * // Now resolution and format can be extracted from the url
   * resolver.add('foo', [
   *     'image@2x.png',
   *     'image.png',
   * ]);
   */get parsers(){return this._parsers}/** Used for testing, this resets the resolver to its initial state */reset(){this.setBundleIdentifier(this._defaultBundleIdentifierOptions),this._assetMap={},this._preferredOrder=[],this._resolverHash={},this._rootPath=null,this._basePath=null,this._manifest=null,this._bundles={},this._defaultSearchParams=null}/**
   * Sets the default URL search parameters for the URL resolver. The urls can be specified as a string or an object.
   * @param searchParams - the default url parameters to append when resolving urls
   */setDefaultSearchParams(t){"string"==typeof t?this._defaultSearchParams=t:this._defaultSearchParams=Object.keys(t).map(e=>`${encodeURIComponent(e)}=${encodeURIComponent(t[e])}`).join("&")}/**
   * Returns the aliases for a given asset
   * @param asset - the asset to get the aliases for
   */getAlias(t){let{alias:e,name:r,src:i,srcs:s}=t;return oD(e||r||i||s,t=>"string"==typeof t?t:Array.isArray(t)?t.map(t=>t?.src??t?.srcs??t):t?.src||t?.srcs?t.src??t.srcs:t,!0)}/**
   * Add a manifest to the asset resolver. This is a nice way to add all the asset information in one go.
   * generally a manifest would be built using a tool.
   * @param manifest - the manifest to add to the resolver
   */addManifest(t){this._manifest&&console.warn("[Resolver] Manifest already exists, this will be overwritten"),this._manifest=t,t.bundles.forEach(t=>{this.addBundle(t.name,t.assets)})}/**
   * This adds a bundle of assets in one go so that you can resolve them as a group.
   * For example you could add a bundle for each screen in you pixi app
   * @example
   * resolver.addBundle('animals', {
   *     bunny: 'bunny.png',
   *     chicken: 'chicken.png',
   *     thumper: 'thumper.png',
   * });
   *
   * const resolvedAssets = await resolver.resolveBundle('animals');
   * @param bundleId - The id of the bundle to add
   * @param assets - A record of the asset or assets that will be chosen from when loading via the specified key
   */addBundle(t,e){let r=[];Array.isArray(e)?e.forEach(e=>{let i;let s=e.src??e.srcs,n=e.alias??e.name;if("string"==typeof n){let e=this._createBundleAssetId(t,n);r.push(e),i=[n,e]}else{let e=n.map(e=>this._createBundleAssetId(t,e));r.push(...e),i=[...n,...e]}this.add({...e,alias:i,src:s})}):Object.keys(e).forEach(i=>{let s=[i,this._createBundleAssetId(t,i)];if("string"==typeof e[i])this.add({alias:s,src:e[i]});else if(Array.isArray(e[i]))this.add({alias:s,src:e[i]});else{let t=e[i],r=t.src??t.srcs;this.add({...t,alias:s,src:Array.isArray(r)?r:[r]})}r.push(...s)}),this._bundles[t]=r}/**
   * Tells the resolver what keys are associated with witch asset.
   * The most important thing the resolver does
   * @example
   * // Single key, single asset:
   * resolver.add({alias: 'foo', src: 'bar.png');
   * resolver.resolveUrl('foo') // => 'bar.png'
   *
   * // Multiple keys, single asset:
   * resolver.add({alias: ['foo', 'boo'], src: 'bar.png'});
   * resolver.resolveUrl('foo') // => 'bar.png'
   * resolver.resolveUrl('boo') // => 'bar.png'
   *
   * // Multiple keys, multiple assets:
   * resolver.add({alias: ['foo', 'boo'], src: ['bar.png', 'bar.webp']});
   * resolver.resolveUrl('foo') // => 'bar.png'
   *
   * // Add custom data attached to the resolver
   * Resolver.add({
   *     alias: 'bunnyBooBooSmooth',
   *     src: 'bunny{png,webp}',
   *     data: { scaleMode:SCALE_MODES.NEAREST }, // Base texture options
   * });
   *
   * resolver.resolve('bunnyBooBooSmooth') // => { src: 'bunny.png', data: { scaleMode: SCALE_MODES.NEAREST } }
   * @param aliases - the key or keys that you will reference when loading this asset
   * @param srcs - the asset or assets that will be chosen from when loading via the specified key
   * @param data - asset-specific data that will be passed to the loaders
   * - Useful if you want to initiate loaded objects with specific data
   * @param format - the format of the asset
   * @param loadParser - the name of the load parser to use
   */add(t,e,r,i,s){let n;let a=[];"string"==typeof t||Array.isArray(t)&&"string"==typeof t[0]?(tC.deprecation("7.2.0",`Assets.add now uses an object instead of individual parameters.
Please use Assets.add({ alias, src, data, format, loadParser }) instead.`),a.push({alias:t,src:e,data:r,format:i,loadParser:s})):Array.isArray(t)?a.push(...t):a.push(t),n=t=>{this.hasKey(t)&&console.warn(`[Resolver] already has key: ${t} overwriting`)},oD(a).forEach(t=>{let{src:e,srcs:r}=t,{data:i,format:s,loadParser:a}=t,o=oD(e||r).map(t=>"string"==typeof t?function(t){let e=t.match(/\{(.*?)\}/g),r=[];if(e){let i=[];e.forEach(t=>{let e=t.substring(1,t.length-1).split(",");i.push(e)}),function t(e,r,i,s,n){let a=r[i];for(let o=0;o<a.length;o++){let h=a[o];i<r.length-1?t(e.replace(s[i],h),r,i+1,s,n):n.push(e.replace(s[i],h))}}(t,i,0,e,r)}else r.push(t);return r}(t):Array.isArray(t)?t:[t]),h=this.getAlias(t);Array.isArray(h)?h.forEach(n):n(h);let l=[];o.forEach(t=>{t.forEach(t=>{let e={};if("object"!=typeof t){e.src=t;for(let r=0;r<this._parsers.length;r++){let i=this._parsers[r];if(i.test(t)){e=i.parse(t);break}}}else i=t.data??i,s=t.format??s,a=t.loadParser??a,e={...e,...t};if(!h)throw Error(`[Resolver] alias is undefined for this asset: ${e.src}`);e=this.buildResolvedAsset(e,{aliases:h,data:i,format:s,loadParser:a}),l.push(e)})}),h.forEach(t=>{this._assetMap[t]=l})})}// TODO: this needs an overload like load did in Assets
/**
   * If the resolver has had a manifest set via setManifest, this will return the assets urls for
   * a given bundleId or bundleIds.
   * @example
   * // Manifest Example
   * const manifest = {
   *     bundles: [
   *         {
   *             name: 'load-screen',
   *             assets: [
   *                 {
   *                     name: 'background',
   *                     srcs: 'sunset.png',
   *                 },
   *                 {
   *                     name: 'bar',
   *                     srcs: 'load-bar.{png,webp}',
   *                 },
   *             ],
   *         },
   *         {
   *             name: 'game-screen',
   *             assets: [
   *                 {
   *                     name: 'character',
   *                     srcs: 'robot.png',
   *                 },
   *                 {
   *                     name: 'enemy',
   *                     srcs: 'bad-guy.png',
   *                 },
   *             ],
   *         },
   *     ]
   * };
   *
   * resolver.setManifest(manifest);
   * const resolved = resolver.resolveBundle('load-screen');
   * @param bundleIds - The bundle ids to resolve
   * @returns All the bundles assets or a hash of assets for each bundle specified
   */resolveBundle(t){let e=oB(t);t=oD(t);let r={};return t.forEach(t=>{let e=this._bundles[t];if(e){let i=this.resolve(e),s={};for(let e in i){let r=i[e];s[this._extractAssetIdFromBundle(t,e)]=r}r[t]=s}}),e?r[t[0]]:r}/**
   * Does exactly what resolve does, but returns just the URL rather than the whole asset object
   * @param key - The key or keys to resolve
   * @returns - The URLs associated with the key(s)
   */resolveUrl(t){let e=this.resolve(t);if("string"!=typeof t){let t={};for(let r in e)t[r]=e[r].src;return t}return e.src}resolve(t){let e=oB(t);t=oD(t);let r={};return t.forEach(t=>{if(!this._resolverHash[t]){if(this._assetMap[t]){let e=this._assetMap[t],r=e[0],i=this._getPreferredOrder(e);i?.priority.forEach(t=>{i.params[t].forEach(r=>{let i=e.filter(e=>!!e[t]&&e[t]===r);i.length&&(e=i)})}),this._resolverHash[t]=e[0]??r}else this._resolverHash[t]=this.buildResolvedAsset({alias:[t],src:t},{})}r[t]=this._resolverHash[t]}),e?r[t[0]]:r}/**
   * Checks if an asset with a given key exists in the resolver
   * @param key - The key of the asset
   */hasKey(t){return!!this._assetMap[t]}/**
   * Checks if a bundle with the given key exists in the resolver
   * @param key - The key of the bundle
   */hasBundle(t){return!!this._bundles[t]}/**
   * Internal function for figuring out what prefer criteria an asset should use.
   * @param assets
   */_getPreferredOrder(t){for(let e=0;e<t.length;e++){let e=t[0],r=this._preferredOrder.find(t=>t.params.format.includes(e.format));if(r)return r}return this._preferredOrder[0]}/**
   * Appends the default url parameters to the url
   * @param url - The url to append the default parameters to
   * @returns - The url with the default parameters appended
   */_appendDefaultSearchParams(t){if(!this._defaultSearchParams)return t;let e=/\?/.test(t)?"&":"?";return`${t}${e}${this._defaultSearchParams}`}buildResolvedAsset(t,e){let{aliases:r,data:i,loadParser:s,format:n}=e;return(this._basePath||this._rootPath)&&(t.src=tC.path.toAbsolute(t.src,this._basePath,this._rootPath)),t.alias=r??t.alias??[t.src],t.src=this._appendDefaultSearchParams(t.src),t.data={...i||{},...t.data},t.loadParser=s??t.loadParser,t.format=n??t.src.split(".").pop(),t.srcs=t.src,t.name=t.alias,t}}const o6=new class{constructor(){this._detections=[],this._initialized=!1,this.resolver=new o5,this.loader=new oF,this.cache=oN,this._backgroundLoader=new oC(this.loader),this._backgroundLoader.active=!0,this.reset()}/**
   * Best practice is to call this function before any loading commences
   * Initiating is the best time to add any customization to the way things are loaded.
   *
   * you do not need to call this for the Asset class to work, only if you want to set any initial properties
   * @param options - options to initialize the Asset manager with
   */async init(t={}){if(this._initialized){console.warn("[Assets]AssetManager already initialized, did you load before calling this Asset.init()?");return}if(this._initialized=!0,t.defaultSearchParams&&this.resolver.setDefaultSearchParams(t.defaultSearchParams),t.basePath&&(this.resolver.basePath=t.basePath),t.bundleIdentifier&&this.resolver.setBundleIdentifier(t.bundleIdentifier),t.manifest){let e=t.manifest;"string"==typeof e&&(e=await this.load(e)),this.resolver.addManifest(e)}let e=t.texturePreference?.resolution??1,r=await this._detectFormats({preferredFormats:t.texturePreference?.format,skipDetections:t.skipDetections,detections:this._detections});this.resolver.prefer({params:{format:r,resolution:"number"==typeof e?[e]:e}}),t.preferences&&this.setPreferences(t.preferences)}/**
   * Allows you to specify how to resolve any assets load requests.
   * There are a few ways to add things here as shown below:
   * @example
   * import { Assets } from 'pixi.js';
   *
   * // Simple
   * Assets.add({alias: 'bunnyBooBoo', src: 'bunny.png'});
   * const bunny = await Assets.load('bunnyBooBoo');
   *
   * // Multiple keys:
   * Assets.add({alias: ['burger', 'chicken'], src: 'bunny.png'});
   *
   * const bunny = await Assets.load('burger');
   * const bunny2 = await Assets.load('chicken');
   *
   * // passing options to to the object
   * Assets.add({
   *     alias: 'bunnyBooBooSmooth',
   *     src: 'bunny{png,webp}',
   *     data: { scaleMode: SCALE_MODES.NEAREST }, // Base texture options
   * });
   *
   * // Multiple assets
   *
   * // The following all do the same thing:
   *
   * Assets.add({alias: 'bunnyBooBoo', src: 'bunny{png,webp}'});
   *
   * Assets.add({
   *     alias: 'bunnyBooBoo',
   *     src: [
   *         'bunny.png',
   *         'bunny.webp',
   *    ],
   * });
   *
   * const bunny = await Assets.load('bunnyBooBoo'); // Will try to load WebP if available
   * @param aliases - the key or keys that you will reference when loading this asset
   * @param srcs - the asset or assets that will be chosen from when loading via the specified key
   * @param data - asset-specific data that will be passed to the loaders
   * - Useful if you want to initiate loaded objects with specific data
   * @param format - the format of the asset
   * @param loadParser - the name of the load parser to use
   */add(t,e,r,i,s){this.resolver.add(t,e,r,i,s)}async load(t,e){this._initialized||await this.init();let r=oB(t),i=oD(t).map(t=>{if("string"!=typeof t){let e=this.resolver.getAlias(t);return e.some(t=>!this.resolver.hasKey(t))&&this.add(t),Array.isArray(e)?e[0]:e}return this.resolver.hasKey(t)||this.add({alias:t,src:t}),t}),s=this.resolver.resolve(i),n=await this._mapLoadToResolve(s,e);return r?n[i[0]]:n}/**
   * This adds a bundle of assets in one go so that you can load them as a group.
   * For example you could add a bundle for each screen in you pixi app
   * @example
   * import { Assets } from 'pixi.js';
   *
   * Assets.addBundle('animals', {
   *     bunny: 'bunny.png',
   *     chicken: 'chicken.png',
   *     thumper: 'thumper.png',
   * });
   *
   * const assets = await Assets.loadBundle('animals');
   * @param bundleId - the id of the bundle to add
   * @param assets - a record of the asset or assets that will be chosen from when loading via the specified key
   */addBundle(t,e){this.resolver.addBundle(t,e)}/**
   * Bundles are a way to load multiple assets at once.
   * If a manifest has been provided to the init function then you can load a bundle, or bundles.
   * you can also add bundles via `addBundle`
   * @example
   * import { Assets } from 'pixi.js';
   *
   * // Manifest Example
   * const manifest = {
   *     bundles: [
   *         {
   *             name: 'load-screen',
   *             assets: [
   *                 {
   *                     name: 'background',
   *                     srcs: 'sunset.png',
   *                 },
   *                 {
   *                     name: 'bar',
   *                     srcs: 'load-bar.{png,webp}',
   *                 },
   *             ],
   *         },
   *         {
   *             name: 'game-screen',
   *             assets: [
   *                 {
   *                     name: 'character',
   *                     srcs: 'robot.png',
   *                 },
   *                 {
   *                     name: 'enemy',
   *                     srcs: 'bad-guy.png',
   *                 },
   *             ],
   *         },
   *     ]
   * };
   *
   * await Asset.init({ manifest });
   *
   * // Load a bundle...
   * loadScreenAssets = await Assets.loadBundle('load-screen');
   * // Load another bundle...
   * gameScreenAssets = await Assets.loadBundle('game-screen');
   * @param bundleIds - the bundle id or ids to load
   * @param onProgress - Optional function that is called when progress on asset loading is made.
   * The function is passed a single parameter, `progress`, which represents the percentage (0.0 - 1.0)
   * of the assets loaded. Do not use this function to detect when assets are complete and available,
   * instead use the Promise returned by this function.
   * @returns all the bundles assets or a hash of assets for each bundle specified
   */async loadBundle(t,e){this._initialized||await this.init();let r=!1;"string"==typeof t&&(r=!0,t=[t]);let i=this.resolver.resolveBundle(t),s={},n=Object.keys(i),a=0,o=0,h=()=>{e?.(++a/o)},l=n.map(t=>{let e=i[t];return o+=Object.keys(e).length,this._mapLoadToResolve(e,h).then(e=>{s[t]=e})});return await Promise.all(l),r?s[t[0]]:s}/**
   * Initiate a background load of some assets. It will passively begin to load these assets in the background.
   * So when you actually come to loading them you will get a promise that resolves to the loaded assets immediately
   *
   * An example of this might be that you would background load game assets after your inital load.
   * then when you got to actually load your game screen assets when a player goes to the game - the loading
   * would already have stared or may even be complete, saving you having to show an interim load bar.
   * @example
   * import { Assets } from 'pixi.js';
   *
   * Assets.backgroundLoad('bunny.png');
   *
   * // later on in your app...
   * await Assets.loadBundle('bunny.png'); // Will resolve quicker as loading may have completed!
   * @param urls - the url / urls you want to background load
   */async backgroundLoad(t){this._initialized||await this.init(),"string"==typeof t&&(t=[t]);let e=this.resolver.resolve(t);this._backgroundLoader.add(Object.values(e))}/**
   * Initiate a background of a bundle, works exactly like backgroundLoad but for bundles.
   * this can only be used if the loader has been initiated with a manifest
   * @example
   * import { Assets } from 'pixi.js';
   *
   * await Assets.init({
   *     manifest: {
   *         bundles: [
   *             {
   *                 name: 'load-screen',
   *                 assets: [...],
   *             },
   *             ...
   *         ],
   *     },
   * });
   *
   * Assets.backgroundLoadBundle('load-screen');
   *
   * // Later on in your app...
   * await Assets.loadBundle('load-screen'); // Will resolve quicker as loading may have completed!
   * @param bundleIds - the bundleId / bundleIds you want to background load
   */async backgroundLoadBundle(t){this._initialized||await this.init(),"string"==typeof t&&(t=[t]);let e=this.resolver.resolveBundle(t);Object.values(e).forEach(t=>{this._backgroundLoader.add(Object.values(t))})}/**
   * Only intended for development purposes.
   * This will wipe the resolver and caches.
   * You will need to reinitialize the Asset
   */reset(){this.resolver.reset(),this.loader.reset(),this.cache.reset(),this._initialized=!1}get(t){if("string"==typeof t)return oN.get(t);let e={};for(let r=0;r<t.length;r++)e[r]=oN.get(t[r]);return e}/**
   * helper function to map resolved assets back to loaded assets
   * @param resolveResults - the resolve results from the resolver
   * @param onProgress - the progress callback
   */async _mapLoadToResolve(t,e){let r=Object.values(t),i=Object.keys(t);this._backgroundLoader.active=!1;let s=await this.loader.load(r,e);this._backgroundLoader.active=!0;let n={};return r.forEach((t,e)=>{let r=s[t.src],a=[t.src];t.alias&&a.push(...t.alias),n[i[e]]=r,oN.set(a,r)}),n}/**
   * Unload an asset or assets. As the Assets class is responsible for creating the assets via the `load` function
   * this will make sure to destroy any assets and release them from memory.
   * Once unloaded, you will need to load the asset again.
   *
   * Use this to help manage assets if you find that you have a large app and you want to free up memory.
   *
   * - it's up to you as the developer to make sure that textures are not actively being used when you unload them,
   * Pixi won't break but you will end up with missing assets. Not a good look for the user!
   * @example
   * import { Assets } from 'pixi.js';
   *
   * // Load a URL:
   * const myImageTexture = await Assets.load('http://some.url.com/image.png'); // => returns a texture
   *
   * await Assets.unload('http://some.url.com/image.png')
   *
   * // myImageTexture will be destroyed now.
   *
   * // Unload multiple assets:
   * const textures = await Assets.unload(['thumper', 'chicko']);
   * @param urls - the urls to unload
   */async unload(t){this._initialized||await this.init();let e=oD(t).map(t=>"string"!=typeof t?t.src:t),r=this.resolver.resolve(e);await this._unloadFromResolved(r)}/**
   * Bundles are a way to manage multiple assets at once.
   * this will unload all files in a bundle.
   *
   * once a bundle has been unloaded, you need to load it again to have access to the assets.
   * @example
   * import { Assets } from 'pixi.js';
   *
   * Assets.addBundle({
   *     'thumper': 'http://some.url.com/thumper.png',
   * })
   *
   * const assets = await Assets.loadBundle('thumper');
   *
   * // Now to unload...
   *
   * await Assets.unloadBundle('thumper');
   *
   * // All assets in the assets object will now have been destroyed and purged from the cache
   * @param bundleIds - the bundle id or ids to unload
   */async unloadBundle(t){this._initialized||await this.init(),t=oD(t);let e=this.resolver.resolveBundle(t),r=Object.keys(e).map(t=>this._unloadFromResolved(e[t]));await Promise.all(r)}async _unloadFromResolved(t){let e=Object.values(t);e.forEach(t=>{oN.remove(t.src)}),await this.loader.unload(e)}/**
   * Detects the supported formats for the browser, and returns an array of supported formats, respecting
   * the users preferred formats order.
   * @param options - the options to use when detecting formats
   * @param options.preferredFormats - the preferred formats to use
   * @param options.skipDetections - if we should skip the detections altogether
   * @param options.detections - the detections to use
   * @returns - the detected formats
   */async _detectFormats(t){let e=[];for(let r of(t.preferredFormats&&(e=Array.isArray(t.preferredFormats)?t.preferredFormats:[t.preferredFormats]),t.detections))t.skipDetections||await r.test()?e=await r.add(e):t.skipDetections||(e=await r.remove(e));return e=e.filter((t,r)=>e.indexOf(t)===r)}/** All the detection parsers currently added to the Assets class. */get detections(){return this._detections}/**
   * @deprecated since 7.2.0
   * @see {@link Assets.setPreferences}
   */get preferWorkers(){return o0.config.preferWorkers}set preferWorkers(t){tC.deprecation("7.2.0","Assets.prefersWorkers is deprecated, use Assets.setPreferences({ preferWorkers: true }) instead."),this.setPreferences({preferWorkers:t})}/**
   * General setter for preferences. This is a helper function to set preferences on all parsers.
   * @param preferences - the preferences to set
   */setPreferences(t){this.loader.parsers.forEach(e=>{e.config&&Object.keys(e.config).filter(e=>e in t).forEach(r=>{e.config[r]=t[r]})})}};sI.handleByList(sS.LoadParser,o6.loader.parsers).handleByList(sS.ResolveParser,o6.resolver.parsers).handleByList(sS.CacheParser,o6.cache.parsers).handleByList(sS.DetectionParser,o6.detections);const o8={extension:sS.CacheParser,test:t=>Array.isArray(t)&&t.every(t=>t instanceof nZ),getCacheableAssets:(t,e)=>{let r={};return t.forEach(t=>{e.forEach((e,i)=>{r[t+(0===i?"":i+1)]=e})}),r}};sI.add(o8);const o7={extension:{type:sS.DetectionParser,priority:1},test:async()=>new Promise(t=>{let e=new Image;e.onload=()=>{t(!0)},e.onerror=()=>{t(!1)},e.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="}),add:async t=>[...t,"avif"],remove:async t=>t.filter(t=>"avif"!==t)};sI.add(o7);const o9={extension:{type:sS.DetectionParser,priority:0},test:async()=>new Promise(t=>{let e=new Image;e.onload=()=>{t(!0)},e.onerror=()=>{t(!1)},e.src="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="}),add:async t=>[...t,"webp"],remove:async t=>t.filter(t=>"webp"!==t)};sI.add(o9);const ht=["png","jpg","jpeg"],he={extension:{type:sS.DetectionParser,priority:-1},test:()=>Promise.resolve(!0),add:async t=>[...t,...ht],remove:async t=>t.filter(t=>!ht.includes(t))};sI.add(he);const hr="WorkerGlobalScope"in globalThis&&globalThis instanceof globalThis.WorkerGlobalScope;function hi(t){return!hr&&""!==document.createElement("video").canPlayType(t)}const hs={extension:{type:sS.DetectionParser,priority:0},test:async()=>hi("video/webm"),add:async t=>[...t,"webm"],remove:async t=>t.filter(t=>"webm"!==t)};sI.add(hs);const hn={extension:{type:sS.DetectionParser,priority:0},test:async()=>hi("video/mp4"),add:async t=>[...t,"mp4","m4v"],remove:async t=>t.filter(t=>"mp4"!==t&&"m4v"!==t)};sI.add(hn);const ha={extension:{type:sS.DetectionParser,priority:0},test:async()=>hi("video/ogg"),add:async t=>[...t,"ogv"],remove:async t=>t.filter(t=>"ogv"!==t)};sI.add(ha);const ho={extension:sS.ResolveParser,test:o0.test,parse:t=>({resolution:parseFloat(tl.RETINA_PREFIX.exec(t)?.[1]??"1"),format:t.split(".").pop(),src:t})};sI.add(ho);var hh=((M=hh||{})[M.COMPRESSED_RGB_S3TC_DXT1_EXT=33776]="COMPRESSED_RGB_S3TC_DXT1_EXT",M[M.COMPRESSED_RGBA_S3TC_DXT1_EXT=33777]="COMPRESSED_RGBA_S3TC_DXT1_EXT",M[M.COMPRESSED_RGBA_S3TC_DXT3_EXT=33778]="COMPRESSED_RGBA_S3TC_DXT3_EXT",M[M.COMPRESSED_RGBA_S3TC_DXT5_EXT=33779]="COMPRESSED_RGBA_S3TC_DXT5_EXT",M[M.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT=35917]="COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT",M[M.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT=35918]="COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT",M[M.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT=35919]="COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT",M[M.COMPRESSED_SRGB_S3TC_DXT1_EXT=35916]="COMPRESSED_SRGB_S3TC_DXT1_EXT",M[M.COMPRESSED_R11_EAC=37488]="COMPRESSED_R11_EAC",M[M.COMPRESSED_SIGNED_R11_EAC=37489]="COMPRESSED_SIGNED_R11_EAC",M[M.COMPRESSED_RG11_EAC=37490]="COMPRESSED_RG11_EAC",M[M.COMPRESSED_SIGNED_RG11_EAC=37491]="COMPRESSED_SIGNED_RG11_EAC",M[M.COMPRESSED_RGB8_ETC2=37492]="COMPRESSED_RGB8_ETC2",M[M.COMPRESSED_RGBA8_ETC2_EAC=37496]="COMPRESSED_RGBA8_ETC2_EAC",M[M.COMPRESSED_SRGB8_ETC2=37493]="COMPRESSED_SRGB8_ETC2",M[M.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC=37497]="COMPRESSED_SRGB8_ALPHA8_ETC2_EAC",M[M.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2=37494]="COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2",M[M.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2=37495]="COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2",M[M.COMPRESSED_RGB_PVRTC_4BPPV1_IMG=35840]="COMPRESSED_RGB_PVRTC_4BPPV1_IMG",M[M.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG=35842]="COMPRESSED_RGBA_PVRTC_4BPPV1_IMG",M[M.COMPRESSED_RGB_PVRTC_2BPPV1_IMG=35841]="COMPRESSED_RGB_PVRTC_2BPPV1_IMG",M[M.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG=35843]="COMPRESSED_RGBA_PVRTC_2BPPV1_IMG",M[M.COMPRESSED_RGB_ETC1_WEBGL=36196]="COMPRESSED_RGB_ETC1_WEBGL",M[M.COMPRESSED_RGB_ATC_WEBGL=35986]="COMPRESSED_RGB_ATC_WEBGL",M[M.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL=35986]="COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL",M[M.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL=34798]="COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL",M[M.COMPRESSED_RGBA_ASTC_4x4_KHR=37808]="COMPRESSED_RGBA_ASTC_4x4_KHR",M);const hl={// WEBGL_compressed_texture_s3tc
33776:.5,33777:.5,33778:1,33779:1,// WEBGL_compressed_texture_s3tc
35916:.5,35917:.5,35918:1,35919:1,// WEBGL_compressed_texture_etc
37488:.5,37489:.5,37490:1,37491:1,37492:.5,37496:1,37493:.5,37497:1,37494:.5,// ~~
37495:.5,// ~~
// WEBGL_compressed_texture_pvrtc
35840:.5,35842:.5,35841:.25,35843:.25,// WEBGL_compressed_texture_etc1
36196:.5,// @see https://www.khronos.org/registry/OpenGL/extensions/AMD/AMD_compressed_ATC_texture.txt
// WEBGL_compressed_texture_atc
35986:.5,35986:1,34798:1,// @see https://registry.khronos.org/OpenGL/extensions/KHR/KHR_texture_compression_astc_hdr.txt
// WEBGL_compressed_texture_astc
/* eslint-disable-next-line camelcase */37808:1};function hu(){a={s3tc:n.getExtension("WEBGL_compressed_texture_s3tc"),s3tc_sRGB:n.getExtension("WEBGL_compressed_texture_s3tc_srgb"),/* eslint-disable-line camelcase */etc:n.getExtension("WEBGL_compressed_texture_etc"),etc1:n.getExtension("WEBGL_compressed_texture_etc1"),pvrtc:n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),atc:n.getExtension("WEBGL_compressed_texture_atc"),astc:n.getExtension("WEBGL_compressed_texture_astc")}}const hd={extension:{type:sS.DetectionParser,priority:2},test:async()=>{let t=tl.ADAPTER.createCanvas().getContext("webgl");return t?(n=t,!0):(console.warn("WebGL not available for compressed textures."),!1)},add:async t=>{a||hu();let e=[];for(let t in a)a[t]&&e.push(t);return[...e,...t]},remove:async t=>(a||hu(),t.filter(t=>!(t in a)))};sI.add(hd);class hc extends sF{/**
   * @param source - The buffer/URL of the texture file.
   * @param {PIXI.IBlobResourceOptions} [options]
   * @param {boolean} [options.autoLoad=false] - Whether to fetch the data immediately;
   *  you can fetch it later via {@link PIXI.BlobResource#load}.
   * @param {number} [options.width=1] - The width in pixels.
   * @param {number} [options.height=1] - The height in pixels.
   * @param {1|2|4|8} [options.unpackAlignment=4] - The alignment of the pixel rows.
   */constructor(t,e={width:1,height:1,autoLoad:!0}){let r,i;"string"==typeof t?(r=t,i=new Uint8Array):(r=null,i=t),super(i,e),this.origin=r,this.buffer=i?new sC(i):null,this._load=null,this.loaded=!1,null!==this.origin&&!1!==e.autoLoad&&this.load(),null===this.origin&&this.buffer&&(this._load=Promise.resolve(this),this.loaded=!0,this.onBlobLoaded(this.buffer.rawBinaryData))}onBlobLoaded(t){}/** Loads the blob */load(){return this._load||(this._load=fetch(this.origin).then(t=>t.blob()).then(t=>t.arrayBuffer()).then(t=>(this.data=new Uint32Array(t),this.buffer=new sC(t),this.loaded=!0,this.onBlobLoaded(t),this.update(),this))),this._load}}class hp extends hc{/**
   * @param source - the buffer/URL holding the compressed texture data
   * @param options
   * @param {PIXI.INTERNAL_FORMATS} options.format - the compression format
   * @param {number} options.width - the image width in pixels.
   * @param {number} options.height - the image height in pixels.
   * @param {number} [options.level=1] - the mipmap levels stored in the compressed texture, including level 0.
   * @param {number} [options.levelBuffers] - the buffers for each mipmap level. `CompressedTextureResource` can allows you
   *      to pass `null` for `source`, for cases where each level is stored in non-contiguous memory.
   */constructor(t,e){super(t,e),this.format=e.format,this.levels=e.levels||1,this._width=e.width,this._height=e.height,this._extension=hp._formatToExtension(this.format),(e.levelBuffers||this.buffer)&&(this._levelBuffers=e.levelBuffers||hp._createLevelBuffers(t instanceof Uint8Array?t:this.buffer.uint8View,this.format,this.levels,4,4,this.width,this.height))}/**
   * @override
   * @param renderer - A reference to the current renderer
   * @param _texture - the texture
   * @param _glTexture - texture instance for this webgl context
   */upload(t,e,r){let i=t.gl;if(!t.context.extensions[this._extension])throw Error(`${this._extension} textures are not supported on the current machine`);if(!this._levelBuffers)return!1;i.pixelStorei(i.UNPACK_ALIGNMENT,4);for(let t=0,e=this.levels;t<e;t++){let{levelID:e,levelWidth:r,levelHeight:s,levelBuffer:n}=this._levelBuffers[t];i.compressedTexImage2D(i.TEXTURE_2D,e,this.format,r,s,0,n)}return!0}/** @protected */onBlobLoaded(){this._levelBuffers=hp._createLevelBuffers(this.buffer.uint8View,this.format,this.levels,4,4,this.width,this.height)}/**
   * Returns the key (to ContextSystem#extensions) for the WebGL extension supporting the compression format
   * @private
   * @param format - the compression format to get the extension for.
   */static _formatToExtension(t){if(t>=33776&&t<=33779)return"s3tc";if(t>=37488&&t<=37497)return"etc";if(t>=35840&&t<=35843)return"pvrtc";if(t>=36196)return"etc1";if(t>=35986&&t<=34798)return"atc";throw Error("Invalid (compressed) texture format given!")}/**
   * Pre-creates buffer views for each mipmap level
   * @private
   * @param buffer -
   * @param format - compression formats
   * @param levels - mipmap levels
   * @param blockWidth -
   * @param blockHeight -
   * @param imageWidth - width of the image in pixels
   * @param imageHeight - height of the image in pixels
   */static _createLevelBuffers(t,e,r,i,s,n,a){let o=Array(r),h=t.byteOffset,l=n,u=a,d=l+i-1&~(i-1),c=u+s-1&~(s-1),p=d*c*hl[e];for(let n=0;n<r;n++)o[n]={levelID:n,levelWidth:r>1?l:d,levelHeight:r>1?u:c,levelBuffer:new Uint8Array(t.buffer,h,p)},h+=p,u=u>>1||1,p=(d=(l=l>>1||1)+i-1&~(i-1))*(c=u+s-1&~(s-1))*hl[e];return o}}const hf={FOURCC:2},hm={DXGI_FORMAT:0,RESOURCE_DIMENSION:1,MISC_FLAG:2,ARRAY_SIZE:3},hg={827611204:hh.COMPRESSED_RGBA_S3TC_DXT1_EXT,861165636:hh.COMPRESSED_RGBA_S3TC_DXT3_EXT,894720068:hh.COMPRESSED_RGBA_S3TC_DXT5_EXT},h_={// WEBGL_compressed_texture_s3tc
70:hh.COMPRESSED_RGBA_S3TC_DXT1_EXT,71:hh.COMPRESSED_RGBA_S3TC_DXT1_EXT,73:hh.COMPRESSED_RGBA_S3TC_DXT3_EXT,74:hh.COMPRESSED_RGBA_S3TC_DXT3_EXT,76:hh.COMPRESSED_RGBA_S3TC_DXT5_EXT,77:hh.COMPRESSED_RGBA_S3TC_DXT5_EXT,// WEBGL_compressed_texture_s3tc_srgb
72:hh.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT,75:hh.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT,78:hh.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT},hy=[171,75,84,88,32,49,49,187,13,10,26,10],hv={ENDIANNESS:12,GL_TYPE:16,GL_FORMAT:24,GL_INTERNAL_FORMAT:28,PIXEL_WIDTH:36,PIXEL_HEIGHT:40,PIXEL_DEPTH:44,NUMBER_OF_ARRAY_ELEMENTS:48,NUMBER_OF_FACES:52,NUMBER_OF_MIPMAP_LEVELS:56,BYTES_OF_KEY_VALUE_DATA:60},hx={[K.UNSIGNED_BYTE]:1,[K.UNSIGNED_SHORT]:2,[K.INT]:4,[K.UNSIGNED_INT]:4,[K.FLOAT]:4,[K.HALF_FLOAT]:8},hb={[Y.RGBA]:4,[Y.RGB]:3,[Y.RG]:2,[Y.RED]:1,[Y.LUMINANCE]:1,[Y.LUMINANCE_ALPHA]:2,[Y.ALPHA]:1},hE={[K.UNSIGNED_SHORT_4_4_4_4]:2,[K.UNSIGNED_SHORT_5_5_5_1]:2,[K.UNSIGNED_SHORT_5_6_5]:2},hT={extension:{type:sS.LoadParser,priority:oL.High},name:"loadDDS",test:t=>oM(t,".dds"),async load(t,e,r){let i=await (await tl.ADAPTER.fetch(t)).arrayBuffer(),s=(function(t){let e=new Uint32Array(t);if(542327876!==e[0])throw Error("Invalid DDS file magic word");let r=new Uint32Array(t,0,124/Uint32Array.BYTES_PER_ELEMENT),i=r[3],s=r[4],n=r[7],a=new Uint32Array(t,19*Uint32Array.BYTES_PER_ELEMENT,32/Uint32Array.BYTES_PER_ELEMENT),o=a[1];if(4&o){let r=a[hf.FOURCC];if(808540228!==r){let e=hg[r],a=new Uint8Array(t,128);return[new hp(a,{format:e,width:s,height:i,levels:n})]}let o=new Uint32Array(e.buffer,128,20/Uint32Array.BYTES_PER_ELEMENT),h=o[hm.DXGI_FORMAT],l=o[hm.RESOURCE_DIMENSION],u=o[hm.MISC_FLAG],d=o[hm.ARRAY_SIZE],c=h_[h];if(void 0===c)throw Error(`DDSParser cannot parse texture data with DXGI format ${h}`);if(4===u)throw Error("DDSParser does not support cubemap textures");if(6===l)throw Error("DDSParser does not supported 3D texture data");let p=[];if(1===d)p.push(new Uint8Array(t,148));else{let e=hl[c],r=0,a=s,o=i;for(let t=0;t<n;t++){let t=Math.max(1,a+3&-4),i=Math.max(1,o+3&-4),s=t*i*e;r+=s,a>>>=1,o>>>=1}let h=148;for(let e=0;e<d;e++)p.push(new Uint8Array(t,h,r)),h+=r}return p.map(t=>new hp(t,{format:c,width:s,height:i,levels:n}))}throw 64&o?Error("DDSParser does not support uncompressed texture data."):512&o?Error("DDSParser does not supported YUV uncompressed texture data."):131072&o?Error("DDSParser does not support single-channel (lumninance) texture data!"):2&o?Error("DDSParser does not support single-channel (alpha) texture data!"):Error("DDSParser failed to load a texture file due to an unknown reason!")})(i).map(i=>{let s=new sk(i,{mipmap:tt.OFF,alphaMode:te.NO_PREMULTIPLIED_ALPHA,resolution:tC.getResolutionOfUrl(t),...e.data});return oK(s,r,t)});return 1===s.length?s[0]:s},unload(t){Array.isArray(t)?t.forEach(t=>t.destroy(!0)):t.destroy(!0)}};sI.add(hT);const hA={extension:{type:sS.LoadParser,priority:oL.High},name:"loadKTX",test:t=>oM(t,".ktx"),async load(t,e,r){let i=await (await tl.ADAPTER.fetch(t)).arrayBuffer(),{compressed:s,uncompressed:n,kvData:a}=function(t,e,r=!1){let i;let s=new DataView(e);if(!function(t,e){for(let r=0;r<hy.length;r++)if(e.getUint8(r)!==hy[r])return console.error(`${t} is not a valid *.ktx file!`),!1;return!0}(t,s))return null;let n=67305985===s.getUint32(hv.ENDIANNESS,!0),a=s.getUint32(hv.GL_TYPE,n),o=s.getUint32(hv.GL_FORMAT,n),h=s.getUint32(hv.GL_INTERNAL_FORMAT,n),l=s.getUint32(hv.PIXEL_WIDTH,n),u=s.getUint32(hv.PIXEL_HEIGHT,n)||1,d=s.getUint32(hv.PIXEL_DEPTH,n)||1,c=s.getUint32(hv.NUMBER_OF_ARRAY_ELEMENTS,n)||1,p=s.getUint32(hv.NUMBER_OF_FACES,n),f=s.getUint32(hv.NUMBER_OF_MIPMAP_LEVELS,n),m=s.getUint32(hv.BYTES_OF_KEY_VALUE_DATA,n);if(0===u||1!==d)throw Error("Only 2D textures are supported");if(1!==p)throw Error("CubeTextures are not supported by KTXLoader yet!");if(1!==c)throw Error("WebGL does not support array textures");let g=l+3&-4,_=u+3&-4,y=Array(c),v=l*u;if(0===a&&(v=g*_),void 0===(i=0!==a?hx[a]?hx[a]*hb[o]:hE[a]:hl[h]))throw Error("Unable to resolve the pixel format stored in the *.ktx file!");let x=r?function(t,e,r){let i=/* @__PURE__ */new Map,s=0;for(;s<e;){let n=t.getUint32(64+s,r),a=64+s+4,o=3-(n+3)%4;if(0===n||n>e-s){console.error("KTXLoader: keyAndValueByteSize out of bounds");break}let h=0;for(;h<n&&0!==t.getUint8(a+h);h++);if(-1===h){console.error("KTXLoader: Failed to find null byte terminating kvData key");break}let l=new TextDecoder().decode(new Uint8Array(t.buffer,a,h)),u=new DataView(t.buffer,a+h+1,n-h-1);i.set(l,u),s+=4+n+o}return i}(s,m,n):null,b=v*i,E=l,T=u,A=g,S=_,w=64+m;for(let t=0;t<f;t++){let r=s.getUint32(w,n),o=w+4;for(let r=0;r<c;r++){let i=y[r];i||(i=y[r]=Array(f)),i[t]={levelID:t,// don't align mipWidth when texture not compressed! (glType not zero)
levelWidth:f>1||0!==a?E:A,levelHeight:f>1||0!==a?T:S,levelBuffer:new Uint8Array(e,o,b)},o+=b}w+=r+4,w=w%4!=0?w+4-w%4:w,T=T>>1||1,b=(A=(E=E>>1||1)+4-1&-4)*(S=T+4-1&-4)*i}return 0!==a?{uncompressed:y.map(t=>{let e=t[0].levelBuffer,r=!1;return a===K.FLOAT?e=new Float32Array(t[0].levelBuffer.buffer,t[0].levelBuffer.byteOffset,t[0].levelBuffer.byteLength/4):a===K.UNSIGNED_INT?(r=!0,e=new Uint32Array(t[0].levelBuffer.buffer,t[0].levelBuffer.byteOffset,t[0].levelBuffer.byteLength/4)):a===K.INT&&(r=!0,e=new Int32Array(t[0].levelBuffer.buffer,t[0].levelBuffer.byteOffset,t[0].levelBuffer.byteLength/4)),{resource:new sF(e,{width:t[0].levelWidth,height:t[0].levelHeight}),type:a,format:r?function(t){switch(t){case Y.RGBA:return Y.RGBA_INTEGER;case Y.RGB:return Y.RGB_INTEGER;case Y.RG:return Y.RG_INTEGER;case Y.RED:return Y.RED_INTEGER;default:return t}}(o):o}}),kvData:x}:{compressed:y.map(t=>new hp(null,{format:h,width:l,height:u,levels:f,levelBuffers:t})),kvData:x}}(t,i),o=s??n,h={mipmap:tt.OFF,alphaMode:te.NO_PREMULTIPLIED_ALPHA,resolution:tC.getResolutionOfUrl(t),...e.data},l=o.map(e=>{o===n&&Object.assign(h,{type:e.type,format:e.format});let i=e.resource??e,s=new sk(i,h);return s.ktxKeyValueData=a,oK(s,r,t)});return 1===l.length?l[0]:l},unload(t){Array.isArray(t)?t.forEach(t=>t.destroy(!0)):t.destroy(!0)}};sI.add(hA);const hS={extension:sS.ResolveParser,test:t=>{let e=t.split("?")[0].split(".").pop();return["basis","ktx","dds"].includes(e)},parse:t=>{if("ktx"===t.split("?")[0].split(".").pop()){let e=[".s3tc.ktx",".s3tc_sRGB.ktx",".etc.ktx",".etc1.ktx",".pvrt.ktx",".atc.ktx",".astc.ktx"];if(e.some(e=>t.endsWith(e)))return{resolution:parseFloat(tl.RETINA_PREFIX.exec(t)?.[1]??"1"),format:e.find(e=>t.endsWith(e)),src:t}}return{resolution:parseFloat(tl.RETINA_PREFIX.exec(t)?.[1]??"1"),format:t.split(".").pop(),src:t}}};sI.add(hS);const hw=new s2,hR=class t{/**
   * @param renderer - A reference to the current renderer
   */constructor(t){this.renderer=t,this._rendererPremultipliedAlpha=!1}contextChange(){let t=this.renderer?.gl.getContextAttributes();this._rendererPremultipliedAlpha=!!(t&&t.alpha&&t.premultipliedAlpha)}/**
   * Will return a HTML Image of the target
   * @param target - A displayObject or renderTexture
   *  to convert. If left empty will use the main renderer
   * @param format - Image format, e.g. "image/jpeg" or "image/webp".
   * @param quality - JPEG or Webp compression from 0 to 1. Default is 0.92.
   * @param frame - The frame the extraction is restricted to.
   * @returns - HTML Image of the target
   */async image(t,e,r,i){let s=new Image;return s.src=await this.base64(t,e,r,i),s}/**
   * Will return a base64 encoded string of this target. It works by calling
   *  `Extract.canvas` and then running toDataURL on that.
   * @param target - A displayObject or renderTexture
   *  to convert. If left empty will use the main renderer
   * @param format - Image format, e.g. "image/jpeg" or "image/webp".
   * @param quality - JPEG or Webp compression from 0 to 1. Default is 0.92.
   * @param frame - The frame the extraction is restricted to.
   * @returns - A base64 encoded string of the texture.
   */async base64(t,e,r,i){let s=this.canvas(t,i);if(void 0!==s.toBlob)return new Promise((t,i)=>{s.toBlob(e=>{if(!e){i(Error("ICanvas.toBlob failed!"));return}let r=new FileReader;r.onload=()=>t(r.result),r.onerror=i,r.readAsDataURL(e)},e,r)});if(void 0!==s.toDataURL)return s.toDataURL(e,r);if(void 0!==s.convertToBlob){let t=await s.convertToBlob({type:e,quality:r});return new Promise((e,r)=>{let i=new FileReader;i.onload=()=>e(i.result),i.onerror=r,i.readAsDataURL(t)})}throw Error("Extract.base64() requires ICanvas.toDataURL, ICanvas.toBlob, or ICanvas.convertToBlob to be implemented")}/**
   * Creates a Canvas element, renders this target to it and then returns it.
   * @param target - A displayObject or renderTexture
   *  to convert. If left empty will use the main renderer
   * @param frame - The frame the extraction is restricted to.
   * @returns - A Canvas element with the texture rendered on.
   */canvas(e,r){let{pixels:i,width:s,height:n,flipY:a,premultipliedAlpha:o}=this._rawPixels(e,r);a&&t._flipY(i,s,n),o&&t._unpremultiplyAlpha(i);let h=new tC.CanvasRenderTarget(s,n,1),l=new ImageData(new Uint8ClampedArray(i.buffer),s,n);return h.context.putImageData(l,0,0),h.canvas}/**
   * Will return a one-dimensional array containing the pixel data of the entire texture in RGBA
   * order, with integer values between 0 and 255 (included).
   * @param target - A displayObject or renderTexture
   *  to convert. If left empty will use the main renderer
   * @param frame - The frame the extraction is restricted to.
   * @returns - One-dimensional array containing the pixel data of the entire texture
   */pixels(e,r){let{pixels:i,width:s,height:n,flipY:a,premultipliedAlpha:o}=this._rawPixels(e,r);return a&&t._flipY(i,s,n),o&&t._unpremultiplyAlpha(i),i}_rawPixels(t,e){let r=this.renderer;if(!r)throw Error("The Extract has already been destroyed");let i,s=!1,n=!1,a,o=!1;t&&(t instanceof nQ?a=t:(a=r.generateTexture(t,{region:e,resolution:r.resolution,multisample:r.multisample}),o=!0,e&&(hw.width=e.width,hw.height=e.height,e=hw)));let h=r.gl;if(a){if(i=a.baseTexture.resolution,e=e??a.frame,s=!1,n=a.baseTexture.alphaMode>0&&a.baseTexture.format===Y.RGBA,!o){r.renderTexture.bind(a);let t=a.framebuffer.glFramebuffers[r.CONTEXT_UID];t.blitFramebuffer&&r.framebuffer.bind(t.blitFramebuffer)}}else i=r.resolution,e||((e=hw).width=r.width/i,e.height=r.height/i),s=!0,n=this._rendererPremultipliedAlpha,r.renderTexture.bind();let l=Math.max(Math.round(e.width*i),1),u=Math.max(Math.round(e.height*i),1),d=new Uint8Array(4*l*u);return h.readPixels(Math.round(e.x*i),Math.round(e.y*i),l,u,h.RGBA,h.UNSIGNED_BYTE,d),o&&a?.destroy(!0),{pixels:d,width:l,height:u,flipY:s,premultipliedAlpha:n}}/** Destroys the extract. */destroy(){this.renderer=null}static _flipY(t,e,r){let i=e<<2,s=r>>1,n=new Uint8Array(i);for(let e=0;e<s;e++){let s=e*i,a=(r-e-1)*i;n.set(t.subarray(s,s+i)),t.copyWithin(s,a,a+i),t.set(n,a)}}static _unpremultiplyAlpha(t){t instanceof Uint8ClampedArray&&(t=new Uint8Array(t.buffer));let e=t.length;for(let r=0;r<e;r+=4){let e=t[r+3];if(0!==e){let i=255.001/e;t[r]=t[r]*i+.5,t[r+1]=t[r+1]*i+.5,t[r+2]=t[r+2]*i+.5}}}};hR.extension={name:"extract",type:sS.RendererSystem},sI.add(hR);const hI={build(t){let e,r,i,s,n,a;let o=t.points;if(t.type===sJ.CIRC){let o=t.shape;e=o.x,r=o.y,n=a=o.radius,i=s=0}else if(t.type===sJ.ELIP){let o=t.shape;e=o.x,r=o.y,n=o.width,a=o.height,i=s=0}else{let o=t.shape,h=o.width/2,l=o.height/2;e=o.x+h,r=o.y+l,n=a=Math.max(0,Math.min(o.radius,Math.min(h,l))),i=h-n,s=l-a}if(!(n>=0&&a>=0&&i>=0&&s>=0)){o.length=0;return}let h=Math.ceil(2.3*Math.sqrt(n+a)),l=8*h+(i?4:0)+(s?4:0);if(o.length=l,0===l)return;if(0===h){o.length=8,o[0]=o[6]=e+i,o[1]=o[3]=r+s,o[2]=o[4]=e-i,o[5]=o[7]=r-s;return}let u=0,d=4*h+(i?2:0)+2,c=d,p=l;{let t=i+n,a=s,h=e+t,l=e-t,f=r+a;if(o[u++]=h,o[u++]=f,o[--d]=f,o[--d]=l,s){let t=r-a;o[c++]=l,o[c++]=t,o[--p]=t,o[--p]=h}}for(let t=1;t<h;t++){let l=Math.PI/2*(t/h),f=i+Math.cos(l)*n,m=s+Math.sin(l)*a,g=e+f,_=e-f,y=r+m,v=r-m;o[u++]=g,o[u++]=y,o[--d]=y,o[--d]=_,o[c++]=_,o[c++]=v,o[--p]=v,o[--p]=g}{let t=i,n=s+a,h=e+t,l=e-t,d=r+n,c=r-n;o[u++]=h,o[u++]=d,o[--p]=c,o[--p]=h,i&&(o[u++]=l,o[u++]=d,o[--p]=c,o[--p]=l)}},triangulate(t,e){let r,i;let s=t.points,n=e.points,a=e.indices;if(0===s.length)return;let o=n.length/2,h=o;if(t.type!==sJ.RREC){let e=t.shape;r=e.x,i=e.y}else{let e=t.shape;r=e.x+e.width/2,i=e.y+e.height/2}let l=t.matrix;n.push(t.matrix?l.a*r+l.c*i+l.tx:r,t.matrix?l.b*r+l.d*i+l.ty:i),o++,n.push(s[0],s[1]);for(let t=2;t<s.length;t+=2)n.push(s[t],s[t+1]),a.push(o++,h,o);a.push(h+1,h,o)}};function hC(t,e=!1){let r=t.length;if(r<6)return;let i=0;for(let e=0,s=t[r-2],n=t[r-1];e<r;e+=2){let r=t[e],a=t[e+1];i+=(r-s)*(a+n),s=r,n=a}if(!e&&i>0||e&&i<=0){let e=r/2;for(let i=e+e%2;i<r;i+=2){let e=r-i-2,s=r-i-1,n=i,a=i+1;[t[e],t[n]]=[t[n],t[e]],[t[s],t[a]]=[t[a],t[s]]}}}const hP={build(t){t.points=t.shape.points.slice()},triangulate(t,e){let r=t.points,i=t.holes,s=e.points,n=e.indices;if(r.length>=6){hC(r,!1);let t=[];for(let e=0;e<i.length;e++){let s=i[e];hC(s.points,!0),t.push(r.length/2),r=r.concat(s.points)}let e=tC.earcut(r,t,2);if(!e)return;let a=s.length/2;for(let t=0;t<e.length;t+=3)n.push(e[t]+a),n.push(e[t+1]+a),n.push(e[t+2]+a);for(let t=0;t<r.length;t++)s.push(r[t])}}};var hM=((D=hM||{}).MITER="miter",D.BEVEL="bevel",D.ROUND="round",D),hD=((O=hD||{}).BUTT="butt",O.ROUND="round",O.SQUARE="square",O);const hO={adaptive:!0,maxLength:10,minSegments:8,maxSegments:2048,epsilon:1e-4,_segmentsCount(t,e=20){if(!this.adaptive||!t||isNaN(t))return e;let r=Math.ceil(t/this.maxLength);return r<this.minSegments?r=this.minSegments:r>this.maxSegments&&(r=this.maxSegments),r}};class hB{/**
   * Calculate information of the arc for {@link PIXI.Graphics.arcTo}.
   * @private
   * @param x1 - The x-coordinate of the first control point of the arc
   * @param y1 - The y-coordinate of the first control point of the arc
   * @param x2 - The x-coordinate of the second control point of the arc
   * @param y2 - The y-coordinate of the second control point of the arc
   * @param radius - The radius of the arc
   * @param points - Collection of points to add to
   * @returns - If the arc length is valid, return center of circle, radius and other info otherwise `null`.
   */static curveTo(t,e,r,i,s,n){let a=n[n.length-2],o=n[n.length-1]-e,h=a-t,l=i-e,u=r-t,d=Math.abs(o*u-h*l);if(d<1e-8||0===s)return(n[n.length-2]!==t||n[n.length-1]!==e)&&n.push(t,e),null;let c=o*o+h*h,p=l*l+u*u,f=o*l+h*u,m=s*Math.sqrt(c)/d,g=s*Math.sqrt(p)/d,_=m*f/c,y=g*f/p,v=m*u+g*h,x=m*l+g*o;return{cx:v+t,cy:x+e,radius:s,startAngle:Math.atan2(o*(g+_)-x,h*(g+_)-v),endAngle:Math.atan2(l*(m+y)-x,u*(m+y)-v),anticlockwise:h*l>u*o}}/**
   * The arc method creates an arc/curve (used to create circles, or parts of circles).
   * @private
   * @param _startX - Start x location of arc
   * @param _startY - Start y location of arc
   * @param cx - The x-coordinate of the center of the circle
   * @param cy - The y-coordinate of the center of the circle
   * @param radius - The radius of the circle
   * @param startAngle - The starting angle, in radians (0 is at the 3 o'clock position
   *  of the arc's circle)
   * @param endAngle - The ending angle, in radians
   * @param _anticlockwise - Specifies whether the drawing should be
   *  counter-clockwise or clockwise. False is default, and indicates clockwise, while true
   *  indicates counter-clockwise.
   * @param points - Collection of points to add to
   */static arc(t,e,r,i,s,n,a,o,h){let l=a-n,u=hO._segmentsCount(Math.abs(l)*s,40*Math.ceil(Math.abs(l)/sK)),d=l/(2*u),c=2*d,p=Math.cos(d),f=Math.sin(d),m=u-1,g=m%1/m;for(let t=0;t<=m;++t){let e=t+g*t,a=d+n+c*e,o=Math.cos(a),l=-Math.sin(a);h.push((p*o+f*l)*s+r,(-(p*l)+f*o)*s+i)}}}class hN{constructor(){this.reset()}/**
   * Begin batch part.
   * @param style
   * @param startIndex
   * @param attribStart
   */begin(t,e,r){this.reset(),this.style=t,this.start=e,this.attribStart=r}/**
   * End batch part.
   * @param endIndex
   * @param endAttrib
   */end(t,e){this.attribSize=e-this.attribStart,this.size=t-this.start}reset(){this.style=null,this.size=0,this.start=0,this.attribStart=0,this.attribSize=0}}class hF{/**
   * Calculate length of bezier curve.
   * Analytical solution is impossible, since it involves an integral that does not integrate in general.
   * Therefore numerical solution is used.
   * @private
   * @param fromX - Starting point x
   * @param fromY - Starting point y
   * @param cpX - Control point x
   * @param cpY - Control point y
   * @param cpX2 - Second Control point x
   * @param cpY2 - Second Control point y
   * @param toX - Destination point x
   * @param toY - Destination point y
   * @returns - Length of bezier curve
   */static curveLength(t,e,r,i,s,n,a,o){let h=0,l=0,u=0,d=0,c=0,p=0,f=0,m=0,g=0,_=0,y=0,v=t,x=e;for(let b=1;b<=10;++b)d=(u=(l=b/10)*l)*l,m=(f=(p=(c=1-l)*c)*c)*t+3*p*l*r+3*c*u*s+d*a,g=f*e+3*p*l*i+3*c*u*n+d*o,_=v-m,y=x-g,v=m,x=g,h+=Math.sqrt(_*_+y*y);return h}/**
   * Calculate the points for a bezier curve and then draws it.
   *
   * Ignored from docs since it is not directly exposed.
   * @ignore
   * @param cpX - Control point x
   * @param cpY - Control point y
   * @param cpX2 - Second Control point x
   * @param cpY2 - Second Control point y
   * @param toX - Destination point x
   * @param toY - Destination point y
   * @param points - Path array to push points into
   */static curveTo(t,e,r,i,s,n,a){let o=a[a.length-2],h=a[a.length-1];a.length-=2;let l=hO._segmentsCount(hF.curveLength(o,h,t,e,r,i,s,n)),u=0,d=0,c=0,p=0,f=0;a.push(o,h);for(let m=1,g=0;m<=l;++m)c=(d=(u=1-(g=m/l))*u)*u,f=(p=g*g)*g,a.push(c*o+3*d*g*t+3*u*p*r+f*s,c*h+3*d*g*e+3*u*p*i+f*n)}}function hL(t,e,r,i,s,n,a,o){let h,l;a?(h=i,l=-r):(h=-i,l=r);let u=t-r*s+h,d=e-i*s+l,c=t+r*n+h,p=e+i*n+l;return o.push(u,d,c,p),2}function hU(t,e,r,i,s,n,a,o){let h=r-t,l=i-e,u=Math.atan2(h,l),d=Math.atan2(s-t,n-e);o&&u<d?u+=2*Math.PI:!o&&u>d&&(d+=2*Math.PI);let c=u,p=d-u,f=Math.sqrt(h*h+l*l),m=(15*Math.abs(p)*Math.sqrt(f)/Math.PI>>0)+1,g=p/m;if(c+=g,o){a.push(t,e,r,i);for(let r=1,i=c;r<m;r++,i+=g)a.push(t,e,t+Math.sin(i)*f,e+Math.cos(i)*f);a.push(t,e,s,n)}else{a.push(r,i,t,e);for(let r=1,i=c;r<m;r++,i+=g)a.push(t+Math.sin(i)*f,e+Math.cos(i)*f,t,e);a.push(s,n,t,e)}return 2*m}function hk(t,e){t.lineStyle.native?function(t,e){let r=0,i=t.shape,s=t.points||i.points,n=i.type!==sJ.POLY||i.closeStroke;if(0===s.length)return;let a=e.points,o=e.indices,h=s.length/2,l=a.length/2,u=l;for(a.push(s[0],s[1]),r=1;r<h;r++)a.push(s[2*r],s[2*r+1]),o.push(u,u+1),u++;n&&o.push(u,l)}(t,e):function(t,e){let r=t.shape,i=t.points||r.points.slice(),s=e.closePointEps;if(0===i.length)return;let n=t.lineStyle,a=new s0(i[0],i[1]),o=new s0(i[i.length-2],i[i.length-1]),h=r.type!==sJ.POLY||r.closeStroke,l=Math.abs(a.x-o.x)<s&&Math.abs(a.y-o.y)<s;if(h){i=i.slice(),l&&(i.pop(),i.pop(),o.set(i[i.length-2],i[i.length-1]));let t=(a.x+o.x)*.5,e=(o.y+a.y)*.5;i.unshift(t,e),i.push(t,e)}let u=e.points,d=i.length/2,c=i.length,p=u.length/2,f=n.width/2,m=f*f,g=n.miterLimit*n.miterLimit,_=i[0],y=i[1],v=i[2],x=i[3],b=0,E=0,T=-(y-x),A=_-v,S=0,w=0,R=Math.sqrt(T*T+A*A);T/=R,A/=R,T*=f,A*=f;let I=n.alignment,C=(1-I)*2,P=2*I;h||(n.cap===hD.ROUND?c+=hU(_-T*(C-P)*.5,y-A*(C-P)*.5,_-T*C,y-A*C,_+T*P,y+A*P,u,!0)+2:n.cap===hD.SQUARE&&(c+=hL(_,y,T,A,C,P,!0,u))),u.push(_-T*C,y-A*C,_+T*P,y+A*P);for(let t=1;t<d-1;++t){_=i[(t-1)*2],y=i[(t-1)*2+1],v=i[2*t],x=i[2*t+1],b=i[(t+1)*2],E=i[(t+1)*2+1],R=Math.sqrt((T=-(y-x))*T+(A=_-v)*A),T/=R,A/=R,T*=f,A*=f,R=Math.sqrt((S=-(x-E))*S+(w=v-b)*w),S/=R,w/=R,S*=f,w*=f;let e=v-_,r=y-x,s=v-b,a=E-x,o=e*s+r*a,h=r*s-a*e,l=h<0;if(Math.abs(h)<.001*Math.abs(o)){u.push(v-T*C,x-A*C,v+T*P,x+A*P),o>=0&&(n.join===hM.ROUND?c+=hU(v,x,v-T*C,x-A*C,v-S*C,x-w*C,u,!1)+4:c+=2,u.push(v-S*P,x-w*P,v+S*C,x+w*C));continue}let d=(-T+_)*(-A+x)-(-T+v)*(-A+y),p=(-S+b)*(-w+x)-(-S+v)*(-w+E),I=(e*p-s*d)/h,M=(a*d-r*p)/h,D=(I-v)*(I-v)+(M-x)*(M-x),O=v+(I-v)*C,B=x+(M-x)*C,N=v-(I-v)*P,F=x-(M-x)*P,L=Math.min(e*e+r*r,s*s+a*a),U=l?C:P,k=L+U*U*m,G=D<=k,H=n.join;if(H===hM.MITER&&D/m>g&&(H=hM.BEVEL),G)switch(H){case hM.MITER:u.push(O,B,N,F);break;case hM.BEVEL:l?u.push(O,B,v+T*P,x+A*P,O,B,v+S*P,x+w*P):u.push(v-T*C,x-A*C,N,F,v-S*C,x-w*C,N,F),c+=2;break;case hM.ROUND:l?(u.push(O,B,v+T*P,x+A*P),c+=hU(v,x,v+T*P,x+A*P,v+S*P,x+w*P,u,!0)+4,u.push(O,B,v+S*P,x+w*P)):(u.push(v-T*C,x-A*C,N,F),c+=hU(v,x,v-T*C,x-A*C,v-S*C,x-w*C,u,!1)+4,u.push(v-S*C,x-w*C,N,F))}else{switch(u.push(v-T*C,x-A*C,v+T*P,x+A*P),H){case hM.MITER:l?u.push(N,F,N,F):u.push(O,B,O,B),c+=2;break;case hM.ROUND:l?c+=hU(v,x,v+T*P,x+A*P,v+S*P,x+w*P,u,!0)+2:c+=hU(v,x,v-T*C,x-A*C,v-S*C,x-w*C,u,!1)+2}u.push(v-S*C,x-w*C,v+S*P,x+w*P),c+=2}}_=i[(d-2)*2],y=i[(d-2)*2+1],v=i[(d-1)*2],R=Math.sqrt((T=-(y-(x=i[(d-1)*2+1])))*T+(A=_-v)*A),T/=R,A/=R,T*=f,A*=f,u.push(v-T*C,x-A*C,v+T*P,x+A*P),h||(n.cap===hD.ROUND?c+=hU(v-T*(C-P)*.5,x-A*(C-P)*.5,v-T*C,x-A*C,v+T*P,x+A*P,u,!1)+2:n.cap===hD.SQUARE&&(c+=hL(v,x,T,A,C,P,!1,u)));let M=e.indices,D=hO.epsilon*hO.epsilon;for(let t=p;t<c+p-2;++t)_=u[2*t],y=u[2*t+1],v=u[(t+1)*2],x=u[(t+1)*2+1],b=u[(t+2)*2],Math.abs(_*(x-(E=u[(t+2)*2+1]))+v*(E-y)+b*(y-x))<D||M.push(t,t+1,t+2)}(t,e)}class hG{/**
   * Calculate length of quadratic curve
   * @see {@link http://www.malczak.linuxpl.com/blog/quadratic-bezier-curve-length/}
   * for the detailed explanation of math behind this.
   * @private
   * @param fromX - x-coordinate of curve start point
   * @param fromY - y-coordinate of curve start point
   * @param cpX - x-coordinate of curve control point
   * @param cpY - y-coordinate of curve control point
   * @param toX - x-coordinate of curve end point
   * @param toY - y-coordinate of curve end point
   * @returns - Length of quadratic curve
   */static curveLength(t,e,r,i,s,n){let a=t-2*r+s,o=e-2*i+n,h=2*r-2*t,l=2*i-2*e,u=4*(a*a+o*o),d=4*(a*h+o*l),c=h*h+l*l,p=2*Math.sqrt(u+d+c),f=Math.sqrt(u),m=2*u*f,g=2*Math.sqrt(c),_=d/f;return(m*p+f*d*(p-g)+(4*c*u-d*d)*Math.log((2*f+_+p)/(_+g)))/(4*m)}/**
   * Calculate the points for a quadratic bezier curve and then draws it.
   * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
   * @private
   * @param cpX - Control point x
   * @param cpY - Control point y
   * @param toX - Destination point x
   * @param toY - Destination point y
   * @param points - Points to add segments to.
   */static curveTo(t,e,r,i,s){let n=s[s.length-2],a=s[s.length-1],o=hO._segmentsCount(hG.curveLength(n,a,t,e,r,i)),h=0,l=0;for(let u=1;u<=o;++u){let d=u/o;h=n+(t-n)*d,l=a+(e-a)*d,s.push(h+(t+(r-t)*d-h)*d,l+(e+(i-e)*d-l)*d)}}}const hH={[sJ.POLY]:hP,[sJ.CIRC]:hI,[sJ.ELIP]:hI,[sJ.RECT]:{build(t){let e=t.shape,r=e.x,i=e.y,s=e.width,n=e.height,a=t.points;a.length=0,s>=0&&n>=0&&a.push(r,i,r+s,i,r+s,i+n,r,i+n)},triangulate(t,e){let r=t.points,i=e.points;if(0===r.length)return;let s=i.length/2;i.push(r[0],r[1],r[2],r[3],r[6],r[7],r[4],r[5]),e.indices.push(s,s+1,s+2,s+1,s+2,s+3)}},[sJ.RREC]:{build(t){hI.build(t)},triangulate(t,e){hI.triangulate(t,e)}}},hj=[],hX=[];class hV{/**
   * @param {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} shape - The shape object to draw.
   * @param fillStyle - the width of the line to draw
   * @param lineStyle - the color of the line to draw
   * @param matrix - Transform matrix
   */constructor(t,e=null,r=null,i=null){this.points=[],this.holes=[],this.shape=t,this.lineStyle=r,this.fillStyle=e,this.matrix=i,this.type=t.type}/**
   * Creates a new GraphicsData object with the same values as this one.
   * @returns - Cloned GraphicsData object
   */clone(){return new hV(this.shape,this.fillStyle,this.lineStyle,this.matrix)}/** Destroys the Graphics data. */destroy(){this.shape=null,this.holes.length=0,this.holes=null,this.points.length=0,this.points=null,this.lineStyle=null,this.fillStyle=null}}const hz=new s0,hW=class t extends sq{// eslint-disable-next-line @typescript-eslint/no-useless-constructor
constructor(){super(),this.closePointEps=1e-4,this.boundsPadding=0,this.uvsFloat32=null,this.indicesUint16=null,this.batchable=!1,this.points=[],this.colors=[],this.uvs=[],this.indices=[],this.textureIds=[],this.graphicsData=[],this.drawCalls=[],this.batchDirty=-1,this.batches=[],this.dirty=0,this.cacheDirty=-1,this.clearDirty=0,this.shapeIndex=0,this._bounds=new aJ,this.boundsDirty=-1}/**
   * Get the current bounds of the graphic geometry.
   *
   * Since 6.5.0, bounds of the graphics geometry are calculated based on the vertices of generated geometry.
   * Since shapes or strokes with full transparency (`alpha: 0`) will not generate geometry, they are not considered
   * when calculating bounds for the graphics geometry. See PR [#8343]{@link https://github.com/pixijs/pixijs/pull/8343}
   * and issue [#8623]{@link https://github.com/pixijs/pixijs/pull/8623}.
   * @readonly
   */get bounds(){return this.updateBatches(),this.boundsDirty!==this.dirty&&(this.boundsDirty=this.dirty,this.calculateBounds()),this._bounds}/** Call if you changed graphicsData manually. Empties all batch buffers. */invalidate(){this.boundsDirty=-1,this.dirty++,this.batchDirty++,this.shapeIndex=0,this.points.length=0,this.colors.length=0,this.uvs.length=0,this.indices.length=0,this.textureIds.length=0;for(let t=0;t<this.drawCalls.length;t++)this.drawCalls[t].texArray.clear(),hX.push(this.drawCalls[t]);this.drawCalls.length=0;for(let t=0;t<this.batches.length;t++){let e=this.batches[t];e.reset(),hj.push(e)}this.batches.length=0}/**
   * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
   * @returns - This GraphicsGeometry object. Good for chaining method calls
   */clear(){return this.graphicsData.length>0&&(this.invalidate(),this.clearDirty++,this.graphicsData.length=0),this}/**
   * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
   * @param {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} shape - The shape object to draw.
   * @param fillStyle - Defines style of the fill.
   * @param lineStyle - Defines style of the lines.
   * @param matrix - Transform applied to the points of the shape.
   * @returns - Returns geometry for chaining.
   */drawShape(t,e=null,r=null,i=null){let s=new hV(t,e,r,i);return this.graphicsData.push(s),this.dirty++,this}/**
   * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
   * @param {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} shape - The shape object to draw.
   * @param matrix - Transform applied to the points of the shape.
   * @returns - Returns geometry for chaining.
   */drawHole(t,e=null){if(!this.graphicsData.length)return null;let r=new hV(t,null,null,e),i=this.graphicsData[this.graphicsData.length-1];return r.lineStyle=i.lineStyle,i.holes.push(r),this.dirty++,this}/** Destroys the GraphicsGeometry object. */destroy(){super.destroy();for(let t=0;t<this.graphicsData.length;++t)this.graphicsData[t].destroy();this.points.length=0,this.points=null,this.colors.length=0,this.colors=null,this.uvs.length=0,this.uvs=null,this.indices.length=0,this.indices=null,this.indexBuffer.destroy(),this.indexBuffer=null,this.graphicsData.length=0,this.graphicsData=null,this.drawCalls.length=0,this.drawCalls=null,this.batches.length=0,this.batches=null,this._bounds=null}/**
   * Check to see if a point is contained within this geometry.
   * @param point - Point to check if it's contained.
   * @returns {boolean} `true` if the point is contained within geometry.
   */containsPoint(t){let e=this.graphicsData;for(let r=0;r<e.length;++r){let i=e[r];if(i.fillStyle.visible&&i.shape&&(i.matrix?i.matrix.applyInverse(t,hz):hz.copyFrom(t),i.shape.contains(hz.x,hz.y))){let t=!1;if(i.holes){for(let e=0;e<i.holes.length;e++)if(i.holes[e].shape.contains(hz.x,hz.y)){t=!0;break}}if(!t)return!0}}return!1}/**
   * Generates intermediate batch data. Either gets converted to drawCalls
   * or used to convert to batch objects directly by the Graphics object.
   */updateBatches(){if(!this.graphicsData.length){this.batchable=!0;return}if(!this.validateBatching())return;this.cacheDirty=this.dirty;let t=this.uvs,e=this.graphicsData,r=null,i=null;this.batches.length>0&&(i=(r=this.batches[this.batches.length-1]).style);for(let s=this.shapeIndex;s<e.length;s++){this.shapeIndex++;let n=e[s],a=n.fillStyle,o=n.lineStyle;hH[n.type].build(n),n.matrix&&this.transformPoints(n.points,n.matrix),(a.visible||o.visible)&&this.processHoles(n.holes);for(let e=0;e<2;e++){let s=0===e?a:o;if(!s.visible)continue;let h=s.texture.baseTexture,l=this.indices.length,u=this.points.length/2;h.wrapMode=J.REPEAT,0===e?this.processFill(n):this.processLine(n);let d=this.points.length/2-u;0!==d&&(r&&!this._compareStyles(i,s)&&(r.end(l,u),r=null),r||((r=hj.pop()||new hN).begin(s,l,u),this.batches.push(r),i=s),this.addUvs(this.points,t,s.texture,u,d,s.matrix))}}let s=this.indices.length,n=this.points.length/2;if(r&&r.end(s,n),0===this.batches.length){this.batchable=!0;return}let a=n>65535;this.indicesUint16&&this.indices.length===this.indicesUint16.length&&a===this.indicesUint16.BYTES_PER_ELEMENT>2?this.indicesUint16.set(this.indices):this.indicesUint16=a?new Uint32Array(this.indices):new Uint16Array(this.indices),this.batchable=this.isBatchable(),this.batchable?this.packBatches():this.buildDrawCalls()}/**
   * Affinity check
   * @param styleA
   * @param styleB
   */_compareStyles(t,e){return!(!t||!e||t.texture.baseTexture!==e.texture.baseTexture||t.color+t.alpha!==e.color+e.alpha||!!t.native!=!!e.native)}/** Test geometry for batching process. */validateBatching(){if(this.dirty===this.cacheDirty||!this.graphicsData.length)return!1;for(let t=0,e=this.graphicsData.length;t<e;t++){let e=this.graphicsData[t],r=e.fillStyle,i=e.lineStyle;if(r&&!r.texture.baseTexture.valid||i&&!i.texture.baseTexture.valid)return!1}return!0}/** Offset the indices so that it works with the batcher. */packBatches(){this.batchDirty++,this.uvsFloat32=new Float32Array(this.uvs);let t=this.batches;for(let e=0,r=t.length;e<r;e++){let r=t[e];for(let t=0;t<r.size;t++){let e=r.start+t;this.indicesUint16[e]=this.indicesUint16[e]-r.attribStart}}}/**
   * Checks to see if this graphics geometry can be batched.
   * Currently it needs to be small enough and not contain any native lines.
   */isBatchable(){if(this.points.length>131070)return!1;let e=this.batches;for(let t=0;t<e.length;t++)if(e[t].style.native)return!1;return this.points.length<2*t.BATCHABLE_SIZE}/** Converts intermediate batches data to drawCalls. */buildDrawCalls(){let t=++sk._globalBatch;for(let t=0;t<this.drawCalls.length;t++)this.drawCalls[t].texArray.clear(),hX.push(this.drawCalls[t]);this.drawCalls.length=0;let e=this.colors,r=this.textureIds,i=hX.pop();i||((i=new sG).texArray=new nM),i.texArray.count=0,i.start=0,i.size=0,i.type=$.TRIANGLES;let s=0,n=null,a=0,o=!1,h=$.TRIANGLES,l=0;this.drawCalls.push(i);for(let u=0;u<this.batches.length;u++){let d=this.batches[u],c=d.style,p=c.texture.baseTexture;!!c.native!==o&&(h=(o=!!c.native)?$.LINES:$.TRIANGLES,n=null,s=8,t++),n!==p&&(n=p,p._batchEnabled!==t&&(8===s&&(t++,s=0,i.size>0&&((i=hX.pop())||((i=new sG).texArray=new nM),this.drawCalls.push(i)),i.start=l,i.size=0,i.texArray.count=0,i.type=h),p.touched=1,p._batchEnabled=t,p._batchLocation=s,p.wrapMode=J.REPEAT,i.texArray.elements[i.texArray.count++]=p,s++)),i.size+=d.size,l+=d.size,a=p._batchLocation,this.addColors(e,c.color,c.alpha,d.attribSize,d.attribStart),this.addTextureIds(r,a,d.attribSize,d.attribStart)}sk._globalBatch=t,this.packAttributes()}/** Packs attributes to single buffer. */packAttributes(){let t=this.points,e=this.uvs,r=this.colors,i=this.textureIds,s=new ArrayBuffer(12*t.length),n=new Float32Array(s),a=new Uint32Array(s),o=0;for(let s=0;s<t.length/2;s++)n[o++]=t[2*s],n[o++]=t[2*s+1],n[o++]=e[2*s],n[o++]=e[2*s+1],a[o++]=r[s],n[o++]=i[s];this._buffer.update(s),this._indexBuffer.update(this.indicesUint16)}/**
   * Process fill part of Graphics.
   * @param data
   */processFill(t){t.holes.length?hP.triangulate(t,this):hH[t.type].triangulate(t,this)}/**
   * Process line part of Graphics.
   * @param data
   */processLine(t){hk(t,this);for(let e=0;e<t.holes.length;e++)hk(t.holes[e],this)}/**
   * Process the holes data.
   * @param holes
   */processHoles(t){for(let e=0;e<t.length;e++){let r=t[e];hH[r.type].build(r),r.matrix&&this.transformPoints(r.points,r.matrix)}}/** Update the local bounds of the object. Expensive to use performance-wise. */calculateBounds(){let t=this._bounds;t.clear(),t.addVertexData(this.points,0,this.points.length),t.pad(this.boundsPadding,this.boundsPadding)}/**
   * Transform points using matrix.
   * @param points - Points to transform
   * @param matrix - Transform matrix
   */transformPoints(t,e){for(let r=0;r<t.length/2;r++){let i=t[2*r],s=t[2*r+1];t[2*r]=e.a*i+e.c*s+e.tx,t[2*r+1]=e.b*i+e.d*s+e.ty}}/**
   * Add colors.
   * @param colors - List of colors to add to
   * @param color - Color to add
   * @param alpha - Alpha to use
   * @param size - Number of colors to add
   * @param offset
   */addColors(t,e,r,i,s=0){let n=iQ.shared.setValue(e).toLittleEndianNumber(),a=iQ.shared.setValue(n).toPremultiplied(r);t.length=Math.max(t.length,s+i);for(let e=0;e<i;e++)t[s+e]=a}/**
   * Add texture id that the shader/fragment wants to use.
   * @param textureIds
   * @param id
   * @param size
   * @param offset
   */addTextureIds(t,e,r,i=0){t.length=Math.max(t.length,i+r);for(let s=0;s<r;s++)t[i+s]=e}/**
   * Generates the UVs for a shape.
   * @param verts - Vertices
   * @param uvs - UVs
   * @param texture - Reference to Texture
   * @param start - Index buffer start index.
   * @param size - The size/length for index buffer.
   * @param matrix - Optional transform for all points.
   */addUvs(t,e,r,i,s,n=null){let a=0,o=e.length,h=r.frame;for(;a<s;){let r=t[(i+a)*2],s=t[(i+a)*2+1];if(n){let t=n.a*r+n.c*s+n.tx;s=n.b*r+n.d*s+n.ty,r=t}a++,e.push(r/h.width,s/h.height)}let l=r.baseTexture;(h.width<l.width||h.height<l.height)&&this.adjustUvs(e,r,o,s)}/**
   * Modify uvs array according to position of texture region
   * Does not work with rotated or trimmed textures
   * @param uvs - array
   * @param texture - region
   * @param start - starting index for uvs
   * @param size - how many points to adjust
   */adjustUvs(t,e,r,i){let s=e.baseTexture,n=r+2*i,a=e.frame,o=a.width/s.width,h=a.height/s.height,l=a.x/a.width,u=a.y/a.height,d=Math.floor(t[r]+1e-6),c=Math.floor(t[r+1]+1e-6);for(let e=r+2;e<n;e+=2)d=Math.min(d,Math.floor(t[e]+1e-6)),c=Math.min(c,Math.floor(t[e+1]+1e-6));l-=d,u-=c;for(let e=r;e<n;e+=2)t[e]=(t[e]+l)*o,t[e+1]=(t[e+1]+u)*h}};hW.BATCHABLE_SIZE=100;class h${constructor(){this.color=16777215,this.alpha=1,this.texture=nZ.WHITE,this.matrix=null,this.visible=!1,this.reset()}/** Clones the object */clone(){let t=new h$;return t.color=this.color,t.alpha=this.alpha,t.texture=this.texture,t.matrix=this.matrix,t.visible=this.visible,t}/** Reset */reset(){this.color=16777215,this.alpha=1,this.texture=nZ.WHITE,this.matrix=null,this.visible=!1}/** Destroy and don't use after this. */destroy(){this.texture=null,this.matrix=null}}class hY extends h${constructor(){super(...arguments),this.width=0,this.alignment=.5,this.native=!1,this.cap=hD.BUTT,this.join=hM.MITER,this.miterLimit=10}/** Clones the object. */clone(){let t=new hY;return t.color=this.color,t.alpha=this.alpha,t.texture=this.texture,t.matrix=this.matrix,t.visible=this.visible,t.width=this.width,t.alignment=this.alignment,t.native=this.native,t.cap=this.cap,t.join=this.join,t.miterLimit=this.miterLimit,t}/** Reset the line style to default. */reset(){super.reset(),this.color=0,this.alignment=.5,this.width=0,this.native=!1,this.cap=hD.BUTT,this.join=hM.MITER,this.miterLimit=10}}const hq={},hK=class t extends a5{/**
   * @param geometry - Geometry to use, if omitted will create a new GraphicsGeometry instance.
   */constructor(t=null){super(),this.shader=null,this.pluginName="batch",this.currentPath=null,this.batches=[],this.batchTint=-1,this.batchDirty=-1,this.vertexData=null,this._fillStyle=new h$,this._lineStyle=new hY,this._matrix=null,this._holeMode=!1,this.state=sM.for2d(),this._geometry=t||new hW,this._geometry.refCount++,this._transformID=-1,this._tintColor=new iQ(16777215),this.blendMode=W.NORMAL}/**
   * Includes vertex positions, face indices, normals, colors, UVs, and
   * custom attributes within buffers, reducing the cost of passing all
   * this data to the GPU. Can be shared between multiple Mesh or Graphics objects.
   * @readonly
   */get geometry(){return this._geometry}/**
   * Creates a new Graphics object with the same values as this one.
   * Note that only the geometry of the object is cloned, not its transform (position,scale,etc)
   * @returns - A clone of the graphics object
   */clone(){return this.finishPoly(),new t(this._geometry)}/**
   * The blend mode to be applied to the graphic shape. Apply a value of
   * `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.  Note that, since each
   * primitive in the GraphicsGeometry list is rendered sequentially, modes
   * such as `PIXI.BLEND_MODES.ADD` and `PIXI.BLEND_MODES.MULTIPLY` will
   * be applied per-primitive.
   * @default PIXI.BLEND_MODES.NORMAL
   */set blendMode(t){this.state.blendMode=t}get blendMode(){return this.state.blendMode}/**
   * The tint applied to each graphic shape. This is a hex value. A value of
   * 0xFFFFFF will remove any tint effect.
   * @default 0xFFFFFF
   */get tint(){return this._tintColor.value}set tint(t){this._tintColor.setValue(t)}/**
   * The current fill style.
   * @readonly
   */get fill(){return this._fillStyle}/**
   * The current line style.
   * @readonly
   */get line(){return this._lineStyle}lineStyle(t=null,e=0,r,i=.5,s=!1){return"number"==typeof t&&(t={width:t,color:e,alpha:r,alignment:i,native:s}),this.lineTextureStyle(t)}/**
   * Like line style but support texture for line fill.
   * @param [options] - Collection of options for setting line style.
   * @param {number} [options.width=0] - width of the line to draw, will update the objects stored style
   * @param {PIXI.Texture} [options.texture=PIXI.Texture.WHITE] - Texture to use
   * @param {PIXI.ColorSource} [options.color=0x0] - color of the line to draw, will update the objects stored style.
   *  Default 0xFFFFFF if texture present.
   * @param {number} [options.alpha=1] - alpha of the line to draw, will update the objects stored style
   * @param {PIXI.Matrix} [options.matrix=null] - Texture matrix to transform texture
   * @param {number} [options.alignment=0.5] - alignment of the line to draw, (0 = inner, 0.5 = middle, 1 = outer).
   *        WebGL only.
   * @param {boolean} [options.native=false] - If true the lines will be draw using LINES instead of TRIANGLE_STRIP
   * @param {PIXI.LINE_CAP}[options.cap=PIXI.LINE_CAP.BUTT] - line cap style
   * @param {PIXI.LINE_JOIN}[options.join=PIXI.LINE_JOIN.MITER] - line join style
   * @param {number}[options.miterLimit=10] - miter limit ratio
   * @returns {PIXI.Graphics} This Graphics object. Good for chaining method calls
   */lineTextureStyle(t){let e={width:0,texture:nZ.WHITE,color:t?.texture?16777215:0,matrix:null,alignment:.5,native:!1,cap:hD.BUTT,join:hM.MITER,miterLimit:10};t=Object.assign(e,t),this.normalizeColor(t),this.currentPath&&this.startPoly();let r=t.width>0&&t.alpha>0;return r?(t.matrix&&(t.matrix=t.matrix.clone(),t.matrix.invert()),Object.assign(this._lineStyle,{visible:r},t)):this._lineStyle.reset(),this}/**
   * Start a polygon object internally.
   * @protected
   */startPoly(){if(this.currentPath){let t=this.currentPath.points,e=this.currentPath.points.length;e>2&&(this.drawShape(this.currentPath),this.currentPath=new s5,this.currentPath.closeStroke=!1,this.currentPath.points.push(t[e-2],t[e-1]))}else this.currentPath=new s5,this.currentPath.closeStroke=!1}/**
   * Finish the polygon object.
   * @protected
   */finishPoly(){this.currentPath&&(this.currentPath.points.length>2?(this.drawShape(this.currentPath),this.currentPath=null):this.currentPath.points.length=0)}/**
   * Moves the current drawing position to x, y.
   * @param x - the X coordinate to move to
   * @param y - the Y coordinate to move to
   * @returns - This Graphics object. Good for chaining method calls
   */moveTo(t,e){return this.startPoly(),this.currentPath.points[0]=t,this.currentPath.points[1]=e,this}/**
   * Draws a line using the current line style from the current drawing position to (x, y);
   * The current drawing position is then set to (x, y).
   * @param x - the X coordinate to draw to
   * @param y - the Y coordinate to draw to
   * @returns - This Graphics object. Good for chaining method calls
   */lineTo(t,e){this.currentPath||this.moveTo(0,0);let r=this.currentPath.points,i=r[r.length-2],s=r[r.length-1];return(i!==t||s!==e)&&r.push(t,e),this}/**
   * Initialize the curve
   * @param x
   * @param y
   */_initCurve(t=0,e=0){this.currentPath?0===this.currentPath.points.length&&(this.currentPath.points=[t,e]):this.moveTo(t,e)}/**
   * Calculate the points for a quadratic bezier curve and then draws it.
   * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
   * @param cpX - Control point x
   * @param cpY - Control point y
   * @param toX - Destination point x
   * @param toY - Destination point y
   * @returns - This Graphics object. Good for chaining method calls
   */quadraticCurveTo(t,e,r,i){this._initCurve();let s=this.currentPath.points;return 0===s.length&&this.moveTo(0,0),hG.curveTo(t,e,r,i,s),this}/**
   * Calculate the points for a bezier curve and then draws it.
   * @param cpX - Control point x
   * @param cpY - Control point y
   * @param cpX2 - Second Control point x
   * @param cpY2 - Second Control point y
   * @param toX - Destination point x
   * @param toY - Destination point y
   * @returns This Graphics object. Good for chaining method calls
   */bezierCurveTo(t,e,r,i,s,n){return this._initCurve(),hF.curveTo(t,e,r,i,s,n,this.currentPath.points),this}/**
   * The `arcTo` method creates an arc/curve between two tangents on the canvas.
   * The first tangent is from the start point to the first control point,
   * and the second tangent is from the first control point to the second control point.
   * Note that the second control point is not necessarily the end point of the arc.
   *
   * "borrowed" from https://code.google.com/p/fxcanvas/ - thanks google!
   * @param x1 - The x-coordinate of the first control point of the arc
   * @param y1 - The y-coordinate of the first control point of the arc
   * @param x2 - The x-coordinate of the second control point of the arc
   * @param y2 - The y-coordinate of the second control point of the arc
   * @param radius - The radius of the arc
   * @returns - This Graphics object. Good for chaining method calls
   */arcTo(t,e,r,i,s){this._initCurve(t,e);let n=this.currentPath.points,a=hB.curveTo(t,e,r,i,s,n);if(a){let{cx:t,cy:e,radius:r,startAngle:i,endAngle:s,anticlockwise:n}=a;this.arc(t,e,r,i,s,n)}return this}/**
   * The arc method creates an arc/curve (used to create circles, or parts of circles).
   * @param cx - The x-coordinate of the center of the circle
   * @param cy - The y-coordinate of the center of the circle
   * @param radius - The radius of the circle
   * @param startAngle - The starting angle, in radians (0 is at the 3 o'clock position
   *  of the arc's circle)
   * @param endAngle - The ending angle, in radians
   * @param anticlockwise - Specifies whether the drawing should be
   *  counter-clockwise or clockwise. False is default, and indicates clockwise, while true
   *  indicates counter-clockwise.
   * @returns - This Graphics object. Good for chaining method calls
   */arc(t,e,r,i,s,n=!1){if(i===s||(!n&&s<=i?s+=sK:n&&i<=s&&(i+=sK),s-i==0))return this;let a=t+Math.cos(i)*r,o=e+Math.sin(i)*r,h=this._geometry.closePointEps,l=this.currentPath?this.currentPath.points:null;if(l){let t=Math.abs(l[l.length-2]-a),e=Math.abs(l[l.length-1]-o);t<h&&e<h||l.push(a,o)}else this.moveTo(a,o),l=this.currentPath.points;return hB.arc(a,o,t,e,r,i,s,n,l),this}/**
   * Specifies a simple one-color fill that subsequent calls to other Graphics methods
   * (such as lineTo() or drawCircle()) use when drawing.
   * @param {PIXI.ColorSource} color - the color of the fill
   * @param alpha - the alpha of the fill, will override the color's alpha
   * @returns - This Graphics object. Suitable for chaining method calls
   */beginFill(t=0,e){return this.beginTextureFill({texture:nZ.WHITE,color:t,alpha:e})}/**
   * Normalize the color input from options for line style or fill
   * @param {PIXI.IFillStyleOptions} options - Fill style object.
   */normalizeColor(t){let e=iQ.shared.setValue(t.color??0);t.color=e.toNumber(),t.alpha??(t.alpha=e.alpha)}/**
   * Begin the texture fill.
   * Note: The wrap mode of the texture is forced to REPEAT on render.
   * @param options - Fill style object.
   * @param {PIXI.Texture} [options.texture=PIXI.Texture.WHITE] - Texture to fill
   * @param {PIXI.ColorSource} [options.color=0xffffff] - Background to fill behind texture
   * @param {number} [options.alpha] - Alpha of fill, overrides the color's alpha
   * @param {PIXI.Matrix} [options.matrix=null] - Transform matrix
   * @returns {PIXI.Graphics} This Graphics object. Good for chaining method calls
   */beginTextureFill(t){let e={texture:nZ.WHITE,color:16777215,matrix:null};t=Object.assign(e,t),this.normalizeColor(t),this.currentPath&&this.startPoly();let r=t.alpha>0;return r?(t.matrix&&(t.matrix=t.matrix.clone(),t.matrix.invert()),Object.assign(this._fillStyle,{visible:r},t)):this._fillStyle.reset(),this}/**
   * Applies a fill to the lines and shapes that were added since the last call to the beginFill() method.
   * @returns - This Graphics object. Good for chaining method calls
   */endFill(){return this.finishPoly(),this._fillStyle.reset(),this}/**
   * Draws a rectangle shape.
   * @param x - The X coord of the top-left of the rectangle
   * @param y - The Y coord of the top-left of the rectangle
   * @param width - The width of the rectangle
   * @param height - The height of the rectangle
   * @returns - This Graphics object. Good for chaining method calls
   */drawRect(t,e,r,i){return this.drawShape(new s2(t,e,r,i))}/**
   * Draw a rectangle shape with rounded/beveled corners.
   * @param x - The X coord of the top-left of the rectangle
   * @param y - The Y coord of the top-left of the rectangle
   * @param width - The width of the rectangle
   * @param height - The height of the rectangle
   * @param radius - Radius of the rectangle corners
   * @returns - This Graphics object. Good for chaining method calls
   */drawRoundedRect(t,e,r,i,s){return this.drawShape(new s6(t,e,r,i,s))}/**
   * Draws a circle.
   * @param x - The X coordinate of the center of the circle
   * @param y - The Y coordinate of the center of the circle
   * @param radius - The radius of the circle
   * @returns - This Graphics object. Good for chaining method calls
   */drawCircle(t,e,r){return this.drawShape(new s3(t,e,r))}/**
   * Draws an ellipse.
   * @param x - The X coordinate of the center of the ellipse
   * @param y - The Y coordinate of the center of the ellipse
   * @param width - The half width of the ellipse
   * @param height - The half height of the ellipse
   * @returns - This Graphics object. Good for chaining method calls
   */drawEllipse(t,e,r,i){return this.drawShape(new s4(t,e,r,i))}/**
   * Draws a polygon using the given path.
   * @param {number[]|PIXI.IPointData[]|PIXI.Polygon} path - The path data used to construct the polygon.
   * @returns - This Graphics object. Good for chaining method calls
   */drawPolygon(...t){let e,r=!0,i=t[0];i.points?(r=i.closeStroke,e=i.points):e=Array.isArray(t[0])?t[0]:t;let s=new s5(e);return s.closeStroke=r,this.drawShape(s),this}/**
   * Draw any shape.
   * @param {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} shape - Shape to draw
   * @returns - This Graphics object. Good for chaining method calls
   */drawShape(t){return this._holeMode?this._geometry.drawHole(t,this._matrix):this._geometry.drawShape(t,this._fillStyle.clone(),this._lineStyle.clone(),this._matrix),this}/**
   * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
   * @returns - This Graphics object. Good for chaining method calls
   */clear(){return this._geometry.clear(),this._lineStyle.reset(),this._fillStyle.reset(),this._boundsID++,this._matrix=null,this._holeMode=!1,this.currentPath=null,this}/**
   * True if graphics consists of one rectangle, and thus, can be drawn like a Sprite and
   * masked with gl.scissor.
   * @returns - True if only 1 rect.
   */isFastRect(){let t=this._geometry.graphicsData;return 1===t.length&&t[0].shape.type===sJ.RECT&&!t[0].matrix&&!t[0].holes.length&&!(t[0].lineStyle.visible&&t[0].lineStyle.width)}/**
   * Renders the object using the WebGL renderer
   * @param renderer - The renderer
   */_render(t){this.finishPoly();let e=this._geometry;e.updateBatches(),e.batchable?(this.batchDirty!==e.batchDirty&&this._populateBatches(),this._renderBatched(t)):(t.batch.flush(),this._renderDirect(t))}/** Populating batches for rendering. */_populateBatches(){let t=this._geometry,e=this.blendMode,r=t.batches.length;this.batchTint=-1,this._transformID=-1,this.batchDirty=t.batchDirty,this.batches.length=r,this.vertexData=new Float32Array(t.points);for(let i=0;i<r;i++){let r=t.batches[i],s=r.style.color,n=new Float32Array(this.vertexData.buffer,8*r.attribStart,2*r.attribSize),a=new Float32Array(t.uvsFloat32.buffer,8*r.attribStart,2*r.attribSize),o=new Uint16Array(t.indicesUint16.buffer,2*r.start,r.size),h={vertexData:n,blendMode:e,indices:o,uvs:a,_batchRGB:iQ.shared.setValue(s).toRgbArray(),_tintRGB:s,_texture:r.style.texture,alpha:r.style.alpha,worldAlpha:1};this.batches[i]=h}}/**
   * Renders the batches using the BathedRenderer plugin
   * @param renderer - The renderer
   */_renderBatched(t){if(this.batches.length){t.batch.setObjectRenderer(t.plugins[this.pluginName]),this.calculateVertices(),this.calculateTints();for(let e=0,r=this.batches.length;e<r;e++){let r=this.batches[e];r.worldAlpha=this.worldAlpha*r.alpha,t.plugins[this.pluginName].render(r)}}}/**
   * Renders the graphics direct
   * @param renderer - The renderer
   */_renderDirect(t){let e=this._resolveDirectShader(t),r=this._geometry,i=this.worldAlpha,s=e.uniforms,n=r.drawCalls;s.translationMatrix=this.transform.worldTransform,iQ.shared.setValue(this._tintColor).premultiply(i).toArray(s.tint),t.shader.bind(e),t.geometry.bind(r,e),t.state.set(this.state);for(let e=0,i=n.length;e<i;e++)this._renderDrawCallDirect(t,r.drawCalls[e])}/**
   * Renders specific DrawCall
   * @param renderer
   * @param drawCall
   */_renderDrawCallDirect(t,e){let{texArray:r,type:i,size:s,start:n}=e,a=r.count;for(let e=0;e<a;e++)t.texture.bind(r.elements[e],e);t.geometry.draw(i,s,n)}/**
   * Resolves shader for direct rendering
   * @param renderer - The renderer
   */_resolveDirectShader(t){let e=this.shader,r=this.pluginName;if(!e){if(!hq[r]){let{maxTextures:e}=t.plugins[r],i=new Int32Array(e);for(let t=0;t<e;t++)i[t]=t;let s={tint:new Float32Array([1,1,1,1]),translationMatrix:new s8,default:nI.from({uSamplers:i},!0)},n=t.plugins[r]._shader.program;hq[r]=new nC(n,s)}e=hq[r]}return e}/**
   * Retrieves the bounds of the graphic shape as a rectangle object.
   * @see PIXI.GraphicsGeometry#bounds
   */_calculateBounds(){this.finishPoly();let t=this._geometry;if(!t.graphicsData.length)return;let{minX:e,minY:r,maxX:i,maxY:s}=t.bounds;this._bounds.addFrame(this.transform,e,r,i,s)}/**
   * Tests if a point is inside this graphics object
   * @param point - the point to test
   * @returns - the result of the test
   */containsPoint(e){return this.worldTransform.applyInverse(e,t._TEMP_POINT),this._geometry.containsPoint(t._TEMP_POINT)}/** Recalculate the tint by applying tint to batches using Graphics tint. */calculateTints(){if(this.batchTint!==this.tint){this.batchTint=this._tintColor.toNumber();for(let t=0;t<this.batches.length;t++){let e=this.batches[t];e._tintRGB=iQ.shared.setValue(this._tintColor).multiply(e._batchRGB).toLittleEndianNumber()}}}/** If there's a transform update or a change to the shape of the geometry, recalculate the vertices. */calculateVertices(){let t=this.transform._worldID;if(this._transformID===t)return;this._transformID=t;let e=this.transform.worldTransform,r=e.a,i=e.b,s=e.c,n=e.d,a=e.tx,o=e.ty,h=this._geometry.points,l=this.vertexData,u=0;for(let t=0;t<h.length;t+=2){let e=h[t],d=h[t+1];l[u++]=r*e+s*d+a,l[u++]=n*d+i*e+o}}/**
   * Closes the current path.
   * @returns - Returns itself.
   */closePath(){let t=this.currentPath;return t&&(t.closeStroke=!0,this.finishPoly()),this}/**
   * Apply a matrix to the positional data.
   * @param matrix - Matrix to use for transform current shape.
   * @returns - Returns itself.
   */setMatrix(t){return this._matrix=t,this}/**
   * Begin adding holes to the last draw shape
   * IMPORTANT: holes must be fully inside a shape to work
   * Also weirdness ensues if holes overlap!
   * Ellipses, Circles, Rectangles and Rounded Rectangles cannot be holes or host for holes in CanvasRenderer,
   * please use `moveTo` `lineTo`, `quadraticCurveTo` if you rely on pixi-legacy bundle.
   * @returns - Returns itself.
   */beginHole(){return this.finishPoly(),this._holeMode=!0,this}/**
   * End adding holes to the last draw shape.
   * @returns - Returns itself.
   */endHole(){return this.finishPoly(),this._holeMode=!1,this}/**
   * Destroys the Graphics object.
   * @param options - Options parameter. A boolean will act as if all
   *  options have been set to that value
   * @param {boolean} [options.children=false] - if set to true, all the children will have
   *  their destroy method called as well. 'options' will be passed on to those calls.
   * @param {boolean} [options.texture=false] - Only used for child Sprites if options.children is set to true
   *  Should it destroy the texture of the child sprite
   * @param {boolean} [options.baseTexture=false] - Only used for child Sprites if options.children is set to true
   *  Should it destroy the base texture of the child sprite
   */destroy(t){this._geometry.refCount--,0===this._geometry.refCount&&this._geometry.dispose(),this._matrix=null,this.currentPath=null,this._lineStyle.destroy(),this._lineStyle=null,this._fillStyle.destroy(),this._fillStyle=null,this._geometry=null,this.shader=null,this.vertexData=null,this.batches.length=0,this.batches=null,super.destroy(t)}};hK.curves=hO,/**
* Temporary point to use for containsPoint.
* @private
*/hK._TEMP_POINT=new s0;class hZ{/**
   * @param uvBuffer - Buffer with normalized uv's
   * @param uvMatrix - Material UV matrix
   */constructor(t,e){this.uvBuffer=t,this.uvMatrix=e,this.data=null,this._bufferUpdateId=-1,this._textureUpdateId=-1,this._updateID=0}/**
   * Updates
   * @param forceUpdate - force the update
   */update(t){if(!t&&this._bufferUpdateId===this.uvBuffer._updateID&&this._textureUpdateId===this.uvMatrix._updateID)return;this._bufferUpdateId=this.uvBuffer._updateID,this._textureUpdateId=this.uvMatrix._updateID;let e=this.uvBuffer.data;this.data&&this.data.length===e.length||(this.data=new Float32Array(e.length)),this.uvMatrix.multiplyUvs(e,this.data),this._updateID++}}const hQ=new s0,hJ=new s5,h0=class t extends a5{/**
   * @param geometry - The geometry the mesh will use.
   * @param {PIXI.MeshMaterial} shader - The shader the mesh will use.
   * @param state - The state that the WebGL context is required to be in to render the mesh
   *        if no state is provided, uses {@link PIXI.State.for2d} to create a 2D state for PixiJS.
   * @param drawMode - The drawMode, can be any of the {@link PIXI.DRAW_MODES} constants.
   */constructor(t,e,r,i=$.TRIANGLES){super(),this.geometry=t,this.shader=e,this.state=r||sM.for2d(),this.drawMode=i,this.start=0,this.size=0,this.uvs=null,this.indices=null,this.vertexData=new Float32Array(1),this.vertexDirty=-1,this._transformID=-1,this._roundPixels=tl.ROUND_PIXELS,this.batchUvs=null}/**
   * Includes vertex positions, face indices, normals, colors, UVs, and
   * custom attributes within buffers, reducing the cost of passing all
   * this data to the GPU. Can be shared between multiple Mesh objects.
   */get geometry(){return this._geometry}set geometry(t){this._geometry!==t&&(this._geometry&&(this._geometry.refCount--,0===this._geometry.refCount&&this._geometry.dispose()),this._geometry=t,this._geometry&&this._geometry.refCount++,this.vertexDirty=-1)}/**
   * To change mesh uv's, change its uvBuffer data and increment its _updateID.
   * @readonly
   */get uvBuffer(){return this.geometry.buffers[1]}/**
   * To change mesh vertices, change its uvBuffer data and increment its _updateID.
   * Incrementing _updateID is optional because most of Mesh objects do it anyway.
   * @readonly
   */get verticesBuffer(){return this.geometry.buffers[0]}/** Alias for {@link PIXI.Mesh#shader}. */set material(t){this.shader=t}get material(){return this.shader}/**
   * The blend mode to be applied to the Mesh. Apply a value of
   * `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.
   * @default PIXI.BLEND_MODES.NORMAL;
   */set blendMode(t){this.state.blendMode=t}get blendMode(){return this.state.blendMode}/**
   * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
   * Advantages can include sharper image quality (like text) and faster rendering on canvas.
   * The main disadvantage is movement of objects may appear less smooth.
   * To set the global default, change {@link PIXI.settings.ROUND_PIXELS}
   * @default false
   */set roundPixels(t){this._roundPixels!==t&&(this._transformID=-1),this._roundPixels=t}get roundPixels(){return this._roundPixels}/**
   * The multiply tint applied to the Mesh. This is a hex value. A value of
   * `0xFFFFFF` will remove any tint effect.
   *
   * Null for non-MeshMaterial shaders
   * @default 0xFFFFFF
   */get tint(){return"tint"in this.shader?this.shader.tint:null}set tint(t){this.shader.tint=t}/**
   * The tint color as a RGB integer
   * @ignore
   */get tintValue(){return this.shader.tintValue}/** The texture that the Mesh uses. Null for non-MeshMaterial shaders */get texture(){return"texture"in this.shader?this.shader.texture:null}set texture(t){this.shader.texture=t}/**
   * Standard renderer draw.
   * @param renderer - Instance to renderer.
   */_render(e){let r=this.geometry.buffers[0].data;this.shader.batchable&&this.drawMode===$.TRIANGLES&&r.length<2*t.BATCHABLE_SIZE?this._renderToBatch(e):this._renderDefault(e)}/**
   * Standard non-batching way of rendering.
   * @param renderer - Instance to renderer.
   */_renderDefault(t){let e=this.shader;e.alpha=this.worldAlpha,e.update&&e.update(),t.batch.flush(),e.uniforms.translationMatrix=this.transform.worldTransform.toArray(!0),t.shader.bind(e),t.state.set(this.state),t.geometry.bind(this.geometry,e),t.geometry.draw(this.drawMode,this.size,this.start,this.geometry.instanceCount)}/**
   * Rendering by using the Batch system.
   * @param renderer - Instance to renderer.
   */_renderToBatch(t){let e=this.geometry,r=this.shader;r.uvMatrix&&(r.uvMatrix.update(),this.calculateUvs()),this.calculateVertices(),this.indices=e.indexBuffer.data,this._tintRGB=r._tintRGB,this._texture=r.texture;let i=this.material.pluginName;t.batch.setObjectRenderer(t.plugins[i]),t.plugins[i].render(this)}/** Updates vertexData field based on transform and vertices. */calculateVertices(){let t=this.geometry.buffers[0],e=t.data,r=t._updateID;if(r===this.vertexDirty&&this._transformID===this.transform._worldID)return;this._transformID=this.transform._worldID,this.vertexData.length!==e.length&&(this.vertexData=new Float32Array(e.length));let i=this.transform.worldTransform,s=i.a,n=i.b,a=i.c,o=i.d,h=i.tx,l=i.ty,u=this.vertexData;for(let t=0;t<u.length/2;t++){let r=e[2*t],i=e[2*t+1];u[2*t]=s*r+a*i+h,u[2*t+1]=n*r+o*i+l}if(this._roundPixels){let t=tl.RESOLUTION;for(let e=0;e<u.length;++e)u[e]=Math.round(u[e]*t)/t}this.vertexDirty=r}/** Updates uv field based on from geometry uv's or batchUvs. */calculateUvs(){let t=this.geometry.buffers[1],e=this.shader;e.uvMatrix.isSimple?this.uvs=t.data:(this.batchUvs||(this.batchUvs=new hZ(t,e.uvMatrix)),this.batchUvs.update(),this.uvs=this.batchUvs.data)}/**
   * Updates the bounds of the mesh as a rectangle. The bounds calculation takes the worldTransform into account.
   * there must be a aVertexPosition attribute present in the geometry for bounds to be calculated correctly.
   */_calculateBounds(){this.calculateVertices(),this._bounds.addVertexData(this.vertexData,0,this.vertexData.length)}/**
   * Tests if a point is inside this mesh. Works only for PIXI.DRAW_MODES.TRIANGLES.
   * @param point - The point to test.
   * @returns - The result of the test.
   */containsPoint(t){if(!this.getBounds().contains(t.x,t.y))return!1;this.worldTransform.applyInverse(t,hQ);let e=this.geometry.getBuffer("aVertexPosition").data,r=hJ.points,i=this.geometry.getIndex().data,s=i.length,n=4===this.drawMode?3:1;for(let t=0;t+2<s;t+=n){let s=2*i[t],n=2*i[t+1],a=2*i[t+2];if(r[0]=e[s],r[1]=e[s+1],r[2]=e[n],r[3]=e[n+1],r[4]=e[a],r[5]=e[a+1],hJ.contains(hQ.x,hQ.y))return!0}return!1}destroy(t){super.destroy(t),this._cachedTexture&&(this._cachedTexture.destroy(),this._cachedTexture=null),this.geometry=null,this.shader=null,this.state=null,this.uvs=null,this.indices=null,this.vertexData=null}};h0.BATCHABLE_SIZE=100;class h1 extends sY{/**
   * @param {Float32Array|number[]} [vertices] - Positional data on geometry.
   * @param {Float32Array|number[]} [uvs] - Texture UVs.
   * @param {Uint16Array|number[]} [index] - IndexBuffer
   */constructor(t,e,r){super();let i=new sj(t),s=new sj(e,!0),n=new sj(r,!0,!0);this.addAttribute("aVertexPosition",i,2,!1,K.FLOAT).addAttribute("aTextureCoord",s,2,!1,K.FLOAT).addIndex(n),this._updateId=-1}/**
   * If the vertex position is updated.
   * @readonly
   * @private
   */get vertexDirtyId(){return this.buffers[0]._updateID}}var h2=`varying vec2 vTextureCoord;
uniform vec4 uColor;

uniform sampler2D uSampler;

void main(void)
{
    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;
}
`,h3=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTextureMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;
}
`;class h4 extends nC{/**
   * @param uSampler - Texture that material uses to render.
   * @param options - Additional options
   * @param {number} [options.alpha=1] - Default alpha.
   * @param {PIXI.ColorSource} [options.tint=0xFFFFFF] - Default tint.
   * @param {string} [options.pluginName='batch'] - Renderer plugin for batching.
   * @param {PIXI.Program} [options.program=0xFFFFFF] - Custom program.
   * @param {object} [options.uniforms] - Custom uniforms.
   */constructor(t,e){let r={uSampler:t,alpha:1,uTextureMatrix:s8.IDENTITY,uColor:new Float32Array([1,1,1,1])};(e=Object.assign({tint:16777215,alpha:1,pluginName:"batch"},e)).uniforms&&Object.assign(r,e.uniforms),super(e.program||nw.from(h3,h2),r),this._colorDirty=!1,this.uvMatrix=new ar(t),this.batchable=void 0===e.program,this.pluginName=e.pluginName,this._tintColor=new iQ(e.tint),this._tintRGB=this._tintColor.toLittleEndianNumber(),this._colorDirty=!0,this.alpha=e.alpha}/** Reference to the texture being rendered. */get texture(){return this.uniforms.uSampler}set texture(t){this.uniforms.uSampler!==t&&(!this.uniforms.uSampler.baseTexture.alphaMode!=!t.baseTexture.alphaMode&&(this._colorDirty=!0),this.uniforms.uSampler=t,this.uvMatrix.texture=t)}/**
   * This gets automatically set by the object using this.
   * @default 1
   */set alpha(t){t!==this._alpha&&(this._alpha=t,this._colorDirty=!0)}get alpha(){return this._alpha}/**
   * Multiply tint for the material.
   * @default 0xFFFFFF
   */set tint(t){t!==this.tint&&(this._tintColor.setValue(t),this._tintRGB=this._tintColor.toLittleEndianNumber(),this._colorDirty=!0)}get tint(){return this._tintColor.value}/**
   * Get the internal number from tint color
   * @ignore
   */get tintValue(){return this._tintColor.toNumber()}/** Gets called automatically by the Mesh. Intended to be overridden for custom {@link PIXI.MeshMaterial} objects. */update(){if(this._colorDirty){this._colorDirty=!1;let t=this.texture.baseTexture.alphaMode;iQ.shared.setValue(this._tintColor).premultiply(this._alpha,t).toArray(this.uniforms.uColor)}this.uvMatrix.update()&&(this.uniforms.uTextureMatrix=this.uvMatrix.mapCoord)}}class h5{/**
   * @param {object} properties - The properties to upload.
   * @param {boolean[]} dynamicPropertyFlags - Flags for which properties are dynamic.
   * @param {number} size - The size of the batch.
   */constructor(t,e,r){this.geometry=new sY,this.indexBuffer=null,this.size=r,this.dynamicProperties=[],this.staticProperties=[];for(let r=0;r<t.length;++r){let i=t[r];i={attributeName:i.attributeName,size:i.size,uploadFunction:i.uploadFunction,type:i.type||K.FLOAT,offset:i.offset},e[r]?this.dynamicProperties.push(i):this.staticProperties.push(i)}this.staticStride=0,this.staticBuffer=null,this.staticData=null,this.staticDataUint32=null,this.dynamicStride=0,this.dynamicBuffer=null,this.dynamicData=null,this.dynamicDataUint32=null,this._updateID=0,this.initBuffers()}/** Sets up the renderer context and necessary buffers. */initBuffers(){let t=this.geometry,e=0;this.indexBuffer=new sj(tC.createIndicesForQuads(this.size),!0,!0),t.addIndex(this.indexBuffer),this.dynamicStride=0;for(let t=0;t<this.dynamicProperties.length;++t){let r=this.dynamicProperties[t];r.offset=e,e+=r.size,this.dynamicStride+=r.size}let r=new ArrayBuffer(this.size*this.dynamicStride*16);this.dynamicData=new Float32Array(r),this.dynamicDataUint32=new Uint32Array(r),this.dynamicBuffer=new sj(this.dynamicData,!1,!1);let i=0;this.staticStride=0;for(let t=0;t<this.staticProperties.length;++t){let e=this.staticProperties[t];e.offset=i,i+=e.size,this.staticStride+=e.size}let s=new ArrayBuffer(this.size*this.staticStride*16);this.staticData=new Float32Array(s),this.staticDataUint32=new Uint32Array(s),this.staticBuffer=new sj(this.staticData,!0,!1);for(let e=0;e<this.dynamicProperties.length;++e){let r=this.dynamicProperties[e];t.addAttribute(r.attributeName,this.dynamicBuffer,0,r.type===K.UNSIGNED_BYTE,r.type,4*this.dynamicStride,4*r.offset)}for(let e=0;e<this.staticProperties.length;++e){let r=this.staticProperties[e];t.addAttribute(r.attributeName,this.staticBuffer,0,r.type===K.UNSIGNED_BYTE,r.type,4*this.staticStride,4*r.offset)}}/**
   * Uploads the dynamic properties.
   * @param children - The children to upload.
   * @param startIndex - The index to start at.
   * @param amount - The number to upload.
   */uploadDynamic(t,e,r){for(let i=0;i<this.dynamicProperties.length;i++){let s=this.dynamicProperties[i];s.uploadFunction(t,e,r,s.type===K.UNSIGNED_BYTE?this.dynamicDataUint32:this.dynamicData,this.dynamicStride,s.offset)}this.dynamicBuffer._updateID++}/**
   * Uploads the static properties.
   * @param children - The children to upload.
   * @param startIndex - The index to start at.
   * @param amount - The number to upload.
   */uploadStatic(t,e,r){for(let i=0;i<this.staticProperties.length;i++){let s=this.staticProperties[i];s.uploadFunction(t,e,r,s.type===K.UNSIGNED_BYTE?this.staticDataUint32:this.staticData,this.staticStride,s.offset)}this.staticBuffer._updateID++}/** Destroys the ParticleBuffer. */destroy(){this.indexBuffer=null,this.dynamicProperties=null,this.dynamicBuffer=null,this.dynamicData=null,this.dynamicDataUint32=null,this.staticProperties=null,this.staticBuffer=null,this.staticData=null,this.staticDataUint32=null,this.geometry.destroy()}}var h6=`varying vec2 vTextureCoord;
varying vec4 vColor;

uniform sampler2D uSampler;

void main(void){
    vec4 color = texture2D(uSampler, vTextureCoord) * vColor;
    gl_FragColor = color;
}`,h8=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;

attribute vec2 aPositionCoord;
attribute float aRotation;

uniform mat3 translationMatrix;
uniform vec4 uColor;

varying vec2 vTextureCoord;
varying vec4 vColor;

void main(void){
    float x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);
    float y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);

    vec2 v = vec2(x, y);
    v = v + aPositionCoord;

    gl_Position = vec4((translationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vColor = aColor * uColor;
}
`;class h7 extends nD{/**
   * @param renderer - The renderer this sprite batch works for.
   */constructor(t){super(t),this.shader=null,this.properties=null,this.tempMatrix=new s8,this.properties=[// verticesData
{attributeName:"aVertexPosition",size:2,uploadFunction:this.uploadVertices,offset:0},// positionData
{attributeName:"aPositionCoord",size:2,uploadFunction:this.uploadPosition,offset:0},// rotationData
{attributeName:"aRotation",size:1,uploadFunction:this.uploadRotation,offset:0},// uvsData
{attributeName:"aTextureCoord",size:2,uploadFunction:this.uploadUvs,offset:0},// tintData
{attributeName:"aColor",size:1,type:K.UNSIGNED_BYTE,uploadFunction:this.uploadTint,offset:0}],this.shader=nC.from(h8,h6,{}),this.state=sM.for2d()}/**
   * Renders the particle container object.
   * @param container - The container to render using this ParticleRenderer.
   */render(t){let e=t.children,r=t._maxSize,i=t._batchSize,s=this.renderer,n=e.length;if(0===n)return;n>r&&!t.autoResize&&(n=r);let a=t._buffers;a||(a=t._buffers=this.generateBuffers(t));let o=e[0]._texture.baseTexture,h=o.alphaMode>0;this.state.blendMode=tC.correctBlendMode(t.blendMode,h),s.state.set(this.state);let l=s.gl,u=t.worldTransform.copyTo(this.tempMatrix);u.prepend(s.globalUniforms.uniforms.projectionMatrix),this.shader.uniforms.translationMatrix=u.toArray(!0),this.shader.uniforms.uColor=iQ.shared.setValue(t.tintRgb).premultiply(t.worldAlpha,h).toArray(this.shader.uniforms.uColor),this.shader.uniforms.uSampler=o,this.renderer.shader.bind(this.shader);let d=!1;for(let r=0,o=0;r<n;r+=i,o+=1){let h=n-r;h>i&&(h=i),o>=a.length&&a.push(this._generateOneMoreBuffer(t));let u=a[o];u.uploadDynamic(e,r,h);let c=t._bufferUpdateIDs[o]||0;(d=d||u._updateID<c)&&(u._updateID=t._updateID,u.uploadStatic(e,r,h)),s.geometry.bind(u.geometry),l.drawElements(l.TRIANGLES,6*h,l.UNSIGNED_SHORT,0)}}/**
   * Creates one particle buffer for each child in the container we want to render and updates internal properties.
   * @param container - The container to render using this ParticleRenderer
   * @returns - The buffers
   */generateBuffers(t){let e=[],r=t._maxSize,i=t._batchSize,s=t._properties;for(let t=0;t<r;t+=i)e.push(new h5(this.properties,s,i));return e}/**
   * Creates one more particle buffer, because container has autoResize feature.
   * @param container - The container to render using this ParticleRenderer
   * @returns - The generated buffer
   */_generateOneMoreBuffer(t){let e=t._batchSize,r=t._properties;return new h5(this.properties,r,e)}/**
   * Uploads the vertices.
   * @param children - the array of sprites to render
   * @param startIndex - the index to start from in the children array
   * @param amount - the amount of children that will have their vertices uploaded
   * @param array - The vertices to upload.
   * @param stride - Stride to use for iteration.
   * @param offset - Offset to start at.
   */uploadVertices(t,e,r,i,s,n){let a=0,o=0,h=0,l=0;for(let u=0;u<r;++u){let r=t[e+u],d=r._texture,c=r.scale.x,p=r.scale.y,f=d.trim,m=d.orig;f?(a=(o=f.x-r.anchor.x*m.width)+f.width,h=(l=f.y-r.anchor.y*m.height)+f.height):(a=m.width*(1-r.anchor.x),o=-(m.width*r.anchor.x),h=m.height*(1-r.anchor.y),l=-(m.height*r.anchor.y)),i[n]=o*c,i[n+1]=l*p,i[n+s]=a*c,i[n+s+1]=l*p,i[n+2*s]=a*c,i[n+2*s+1]=h*p,i[n+3*s]=o*c,i[n+3*s+1]=h*p,n+=4*s}}/**
   * Uploads the position.
   * @param children - the array of sprites to render
   * @param startIndex - the index to start from in the children array
   * @param amount - the amount of children that will have their positions uploaded
   * @param array - The vertices to upload.
   * @param stride - Stride to use for iteration.
   * @param offset - Offset to start at.
   */uploadPosition(t,e,r,i,s,n){for(let a=0;a<r;a++){let r=t[e+a].position;i[n]=r.x,i[n+1]=r.y,i[n+s]=r.x,i[n+s+1]=r.y,i[n+2*s]=r.x,i[n+2*s+1]=r.y,i[n+3*s]=r.x,i[n+3*s+1]=r.y,n+=4*s}}/**
   * Uploads the rotation.
   * @param children - the array of sprites to render
   * @param startIndex - the index to start from in the children array
   * @param amount - the amount of children that will have their rotation uploaded
   * @param array - The vertices to upload.
   * @param stride - Stride to use for iteration.
   * @param offset - Offset to start at.
   */uploadRotation(t,e,r,i,s,n){for(let a=0;a<r;a++){let r=t[e+a].rotation;i[n]=r,i[n+s]=r,i[n+2*s]=r,i[n+3*s]=r,n+=4*s}}/**
   * Uploads the UVs.
   * @param children - the array of sprites to render
   * @param startIndex - the index to start from in the children array
   * @param amount - the amount of children that will have their rotation uploaded
   * @param array - The vertices to upload.
   * @param stride - Stride to use for iteration.
   * @param offset - Offset to start at.
   */uploadUvs(t,e,r,i,s,n){for(let a=0;a<r;++a){let r=t[e+a]._texture._uvs;r?(i[n]=r.x0,i[n+1]=r.y0,i[n+s]=r.x1,i[n+s+1]=r.y1,i[n+2*s]=r.x2,i[n+2*s+1]=r.y2,i[n+3*s]=r.x3,i[n+3*s+1]=r.y3):(i[n]=0,i[n+1]=0,i[n+s]=0,i[n+s+1]=0,i[n+2*s]=0,i[n+2*s+1]=0,i[n+3*s]=0,i[n+3*s+1]=0),n+=4*s}}/**
   * Uploads the tint.
   * @param children - the array of sprites to render
   * @param startIndex - the index to start from in the children array
   * @param amount - the amount of children that will have their rotation uploaded
   * @param array - The vertices to upload.
   * @param stride - Stride to use for iteration.
   * @param offset - Offset to start at.
   */uploadTint(t,e,r,i,s,n){for(let a=0;a<r;++a){let r=t[e+a],o=iQ.shared.setValue(r._tintRGB).toPremultiplied(r.alpha,r.texture.baseTexture.alphaMode>0);i[n]=o,i[n+s]=o,i[n+2*s]=o,i[n+3*s]=o,n+=4*s}}/** Destroys the ParticleRenderer. */destroy(){super.destroy(),this.shader&&(this.shader.destroy(),this.shader=null),this.tempMatrix=null}}h7.extension={name:"particle",type:sS.RendererPlugin},sI.add(h7);var h9=((B=h9||{})[B.LINEAR_VERTICAL=0]="LINEAR_VERTICAL",B[B.LINEAR_HORIZONTAL=1]="LINEAR_HORIZONTAL",B);const lt={// TextMetrics requires getImageData readback for measuring fonts.
willReadFrequently:!0},le=class t{/**
   * Checking that we can use modern canvas 2D API.
   *
   * Note: This is an unstable API, Chrome < 94 use `textLetterSpacing`, later versions use `letterSpacing`.
   * @see PIXI.TextMetrics.experimentalLetterSpacing
   * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/letterSpacing
   * @see https://developer.chrome.com/origintrials/#/view_trial/3585991203293757441
   */static get experimentalLetterSpacingSupported(){let e=t._experimentalLetterSpacingSupported;if(void 0!==e){let r=tl.ADAPTER.getCanvasRenderingContext2D().prototype;e=t._experimentalLetterSpacingSupported="letterSpacing"in r||"textLetterSpacing"in r}return e}/**
   * @param text - the text that was measured
   * @param style - the style that was measured
   * @param width - the measured width of the text
   * @param height - the measured height of the text
   * @param lines - an array of the lines of text broken by new lines and wrapping if specified in style
   * @param lineWidths - an array of the line widths for each line matched to `lines`
   * @param lineHeight - the measured line height for this style
   * @param maxLineWidth - the maximum line width for all measured lines
   * @param {PIXI.IFontMetrics} fontProperties - the font properties object from TextMetrics.measureFont
   */constructor(t,e,r,i,s,n,a,o,h){this.text=t,this.style=e,this.width=r,this.height=i,this.lines=s,this.lineWidths=n,this.lineHeight=a,this.maxLineWidth=o,this.fontProperties=h}/**
   * Measures the supplied string of text and returns a Rectangle.
   * @param text - The text to measure.
   * @param style - The text style to use for measuring
   * @param wordWrap - Override for if word-wrap should be applied to the text.
   * @param canvas - optional specification of the canvas to use for measuring.
   * @returns Measured width and height of the text.
   */static measureText(e,r,i,s=t._canvas){i=i??r.wordWrap;let n=r.toFontString(),a=t.measureFont(n);0===a.fontSize&&(a.fontSize=r.fontSize,a.ascent=r.fontSize);let o=s.getContext("2d",lt);o.font=n;let h=(i?t.wordWrap(e,r,s):e).split(/(?:\r\n|\r|\n)/),l=Array(h.length),u=0;for(let e=0;e<h.length;e++){let i=t._measureText(h[e],r.letterSpacing,o);l[e]=i,u=Math.max(u,i)}let d=u+r.strokeThickness;r.dropShadow&&(d+=r.dropShadowDistance);let c=r.lineHeight||a.fontSize+r.strokeThickness,p=Math.max(c,a.fontSize+2*r.strokeThickness)+r.leading+(h.length-1)*(c+r.leading);return r.dropShadow&&(p+=r.dropShadowDistance),new t(e,r,d,p,h,l,c+r.leading,u,a)}static _measureText(e,r,i){let s=!1;t.experimentalLetterSpacingSupported&&(t.experimentalLetterSpacing?(i.letterSpacing=`${r}px`,i.textLetterSpacing=`${r}px`,s=!0):(i.letterSpacing="0px",i.textLetterSpacing="0px"));let n=i.measureText(e).width;return n>0&&(s?n-=r:n+=(t.graphemeSegmenter(e).length-1)*r),n}/**
   * Applies newlines to a string to have it optimally fit into the horizontal
   * bounds set by the Text object's wordWrapWidth property.
   * @param text - String to apply word wrapping to
   * @param style - the style to use when wrapping
   * @param canvas - optional specification of the canvas to use for measuring.
   * @returns New string with new lines applied where required
   */static wordWrap(e,r,i=t._canvas){let s=i.getContext("2d",lt),n=0,a="",o="",h=/* @__PURE__ */Object.create(null),{letterSpacing:l,whiteSpace:u}=r,d=t.collapseSpaces(u),c=t.collapseNewlines(u),p=!d,f=r.wordWrapWidth+l,m=t.tokenize(e);for(let e=0;e<m.length;e++){let i=m[e];if(t.isNewline(i)){if(!c){o+=t.addLine(a),p=!d,a="",n=0;continue}i=" "}if(d){let e=t.isBreakingSpace(i),r=t.isBreakingSpace(a[a.length-1]);if(e&&r)continue}let u=t.getFromCache(i,l,h,s);if(u>f){if(""!==a&&(o+=t.addLine(a),a="",n=0),t.canBreakWords(i,r.breakWords)){let e=t.wordWrapSplit(i);for(let u=0;u<e.length;u++){let d=e[u],c=d,m=1;for(;e[u+m];){let s=e[u+m];if(t.canBreakChars(c,s,i,u,r.breakWords))break;d+=s,c=s,m++}u+=m-1;let g=t.getFromCache(d,l,h,s);g+n>f&&(o+=t.addLine(a),p=!1,a="",n=0),a+=d,n+=g}}else{a.length>0&&(o+=t.addLine(a),a="",n=0);let r=e===m.length-1;o+=t.addLine(i,!r),p=!1,a="",n=0}}else u+n>f&&(p=!1,o+=t.addLine(a),a="",n=0),(a.length>0||!t.isBreakingSpace(i)||p)&&(a+=i,n+=u)}return o+t.addLine(a,!1)}/**
   * Convienience function for logging each line added during the wordWrap method.
   * @param line    - The line of text to add
   * @param newLine - Add new line character to end
   * @returns A formatted line
   */static addLine(e,r=!0){return e=t.trimRight(e),e=r?`${e}
`:e}/**
   * Gets & sets the widths of calculated characters in a cache object
   * @param key            - The key
   * @param letterSpacing  - The letter spacing
   * @param cache          - The cache
   * @param context        - The canvas context
   * @returns The from cache.
   */static getFromCache(e,r,i,s){let n=i[e];return"number"!=typeof n&&(n=t._measureText(e,r,s)+r,i[e]=n),n}/**
   * Determines whether we should collapse breaking spaces.
   * @param whiteSpace - The TextStyle property whiteSpace
   * @returns Should collapse
   */static collapseSpaces(t){return"normal"===t||"pre-line"===t}/**
   * Determines whether we should collapse newLine chars.
   * @param whiteSpace - The white space
   * @returns should collapse
   */static collapseNewlines(t){return"normal"===t}/**
   * Trims breaking whitespaces from string.
   * @param text - The text
   * @returns Trimmed string
   */static trimRight(e){if("string"!=typeof e)return"";for(let r=e.length-1;r>=0;r--){let i=e[r];if(!t.isBreakingSpace(i))break;e=e.slice(0,-1)}return e}/**
   * Determines if char is a newline.
   * @param char - The character
   * @returns True if newline, False otherwise.
   */static isNewline(e){return"string"==typeof e&&t._newlines.includes(e.charCodeAt(0))}/**
   * Determines if char is a breaking whitespace.
   *
   * It allows one to determine whether char should be a breaking whitespace
   * For example certain characters in CJK langs or numbers.
   * It must return a boolean.
   * @param char - The character
   * @param [_nextChar] - The next character
   * @returns True if whitespace, False otherwise.
   */static isBreakingSpace(e,r){return"string"==typeof e&&t._breakingSpaces.includes(e.charCodeAt(0))}/**
   * Splits a string into words, breaking-spaces and newLine characters
   * @param text - The text
   * @returns A tokenized array
   */static tokenize(e){let r=[],i="";if("string"!=typeof e)return r;for(let s=0;s<e.length;s++){let n=e[s],a=e[s+1];if(t.isBreakingSpace(n,a)||t.isNewline(n)){""!==i&&(r.push(i),i=""),r.push(n);continue}i+=n}return""!==i&&r.push(i),r}/**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It allows one to customise which words should break
   * Examples are if the token is CJK or numbers.
   * It must return a boolean.
   * @param _token - The token
   * @param breakWords - The style attr break words
   * @returns Whether to break word or not
   */static canBreakWords(t,e){return e}/**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It allows one to determine whether a pair of characters
   * should be broken by newlines
   * For example certain characters in CJK langs or numbers.
   * It must return a boolean.
   * @param _char - The character
   * @param _nextChar - The next character
   * @param _token - The token/word the characters are from
   * @param _index - The index in the token of the char
   * @param _breakWords - The style attr break words
   * @returns whether to break word or not
   */static canBreakChars(t,e,r,i,s){return!0}/**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It is called when a token (usually a word) has to be split into separate pieces
   * in order to determine the point to break a word.
   * It must return an array of characters.
   * @param token - The token to split
   * @returns The characters of the token
   * @see TextMetrics.graphemeSegmenter
   */static wordWrapSplit(e){return t.graphemeSegmenter(e)}/**
   * Calculates the ascent, descent and fontSize of a given font-style
   * @param font - String representing the style of the font
   * @returns Font properties object
   */static measureFont(e){if(t._fonts[e])return t._fonts[e];let r={ascent:0,descent:0,fontSize:0},i=t._canvas,s=t._context;s.font=e;let n=t.METRICS_STRING+t.BASELINE_SYMBOL,a=Math.ceil(s.measureText(n).width),o=Math.ceil(s.measureText(t.BASELINE_SYMBOL).width),h=Math.ceil(t.HEIGHT_MULTIPLIER*o);if(o=o*t.BASELINE_MULTIPLIER|0,0===a||0===h)return t._fonts[e]=r,r;i.width=a,i.height=h,s.fillStyle="#f00",s.fillRect(0,0,a,h),s.font=e,s.textBaseline="alphabetic",s.fillStyle="#000",s.fillText(n,0,o);let l=s.getImageData(0,0,a,h).data,u=l.length,d=4*a,c=0,p=0,f=!1;for(c=0;c<o;++c){for(let t=0;t<d;t+=4)if(255!==l[p+t]){f=!0;break}if(f)break;p+=d}for(r.ascent=o-c,p=u-d,f=!1,c=h;c>o;--c){for(let t=0;t<d;t+=4)if(255!==l[p+t]){f=!0;break}if(f)break;p-=d}return r.descent=c-o,r.fontSize=r.ascent+r.descent,t._fonts[e]=r,r}/**
   * Clear font metrics in metrics cache.
   * @param {string} [font] - font name. If font name not set then clear cache for all fonts.
   */static clearMetrics(e=""){e?delete t._fonts[e]:t._fonts={}}/**
   * Cached canvas element for measuring text
   * TODO: this should be private, but isn't because of backward compat, will fix later.
   * @ignore
   */static get _canvas(){if(!t.__canvas){let e;try{let r=new OffscreenCanvas(0,0);if(r.getContext("2d",lt)?.measureText)return t.__canvas=r,r;e=tl.ADAPTER.createCanvas()}catch{e=tl.ADAPTER.createCanvas()}e.width=e.height=10,t.__canvas=e}return t.__canvas}/**
   * TODO: this should be private, but isn't because of backward compat, will fix later.
   * @ignore
   */static get _context(){return t.__context||(t.__context=t._canvas.getContext("2d",lt)),t.__context}};le.METRICS_STRING="|\xc9q\xc5",/** Baseline symbol for calculate font metrics. */le.BASELINE_SYMBOL="M",/** Baseline multiplier for calculate font metrics. */le.BASELINE_MULTIPLIER=1.4,/** Height multiplier for setting height of canvas to calculate font metrics. */le.HEIGHT_MULTIPLIER=2,/**
* A Unicode "character", or "grapheme cluster", can be composed of multiple Unicode code points,
* such as letters with diacritical marks (e.g. `'\u0065\u0301'`, letter e with acute)
* or emojis with modifiers (e.g. `'\uD83E\uDDD1\u200D\uD83D\uDCBB'`, technologist).
* The new `Intl.Segmenter` API in ES2022 can split the string into grapheme clusters correctly. If it is not available,
* PixiJS will fallback to use the iterator of String, which can only spilt the string into code points.
* If you want to get full functionality in environments that don't support `Intl.Segmenter` (such as Firefox),
* you can use other libraries such as [grapheme-splitter]{@link https://www.npmjs.com/package/grapheme-splitter}
* or [graphemer]{@link https://www.npmjs.com/package/graphemer} to create a polyfill. Since these libraries can be
* relatively large in size to handle various Unicode grapheme clusters properly, PixiJS won't use them directly.
*/le.graphemeSegmenter=(()=>{if("function"==typeof Intl?.Segmenter){let t=new Intl.Segmenter;return e=>[...t.segment(e)].map(t=>t.segment)}return t=>[...t]})(),/**
* New rendering behavior for letter-spacing which uses Chrome's new native API. This will
* lead to more accurate letter-spacing results because it does not try to manually draw
* each character. However, this Chrome API is experimental and may not serve all cases yet.
* @see PIXI.TextMetrics.experimentalLetterSpacingSupported
*/le.experimentalLetterSpacing=!1,/** Cache of {@see PIXI.TextMetrics.FontMetrics} objects. */le._fonts={},/** Cache of new line chars. */le._newlines=[10,// line feed
13],/** Cache of breaking spaces. */le._breakingSpaces=[9,// character tabulation
32,// space
8192,// en quad
8193,// em quad
8194,// en space
8195,// em space
8196,// three-per-em space
8197,// four-per-em space
8198,// six-per-em space
8200,// punctuation space
8201,// thin space
8202,// hair space
8287,// medium mathematical space
12288];const lr=["serif","sans-serif","monospace","cursive","fantasy","system-ui"],li=class t{/**
   * @param style - TextStyle properties to be set on the text. See {@link PIXI.TextStyle.defaultStyle}
   *       for the default values.
   */constructor(t){this.styleID=0,this.reset(),la(this,t,t)}/**
   * Creates a new TextStyle object with the same values as this one.
   * Note that the only the properties of the object are cloned.
   *
   * @return New cloned TextStyle object
   */clone(){let e={};return la(e,this,t.defaultStyle),new t(e)}/** Resets all properties to the defaults specified in TextStyle.prototype._default */reset(){la(this,t.defaultStyle,t.defaultStyle)}/**
   * Alignment for multiline text, does not affect single line text.
   *
   * @member {'left'|'center'|'right'|'justify'}
   */get align(){return this._align}set align(t){this._align!==t&&(this._align=t,this.styleID++)}/** Indicates if lines can be wrapped within words, it needs wordWrap to be set to true. */get breakWords(){return this._breakWords}set breakWords(t){this._breakWords!==t&&(this._breakWords=t,this.styleID++)}/** Set a drop shadow for the text. */get dropShadow(){return this._dropShadow}set dropShadow(t){this._dropShadow!==t&&(this._dropShadow=t,this.styleID++)}/** Set alpha for the drop shadow. */get dropShadowAlpha(){return this._dropShadowAlpha}set dropShadowAlpha(t){this._dropShadowAlpha!==t&&(this._dropShadowAlpha=t,this.styleID++)}/** Set a angle of the drop shadow. */get dropShadowAngle(){return this._dropShadowAngle}set dropShadowAngle(t){this._dropShadowAngle!==t&&(this._dropShadowAngle=t,this.styleID++)}/** Set a shadow blur radius. */get dropShadowBlur(){return this._dropShadowBlur}set dropShadowBlur(t){this._dropShadowBlur!==t&&(this._dropShadowBlur=t,this.styleID++)}/** A fill style to be used on the dropshadow e.g., 'red', '#00FF00'. */get dropShadowColor(){return this._dropShadowColor}set dropShadowColor(t){let e=ln(t);this._dropShadowColor!==e&&(this._dropShadowColor=e,this.styleID++)}/** Set a distance of the drop shadow. */get dropShadowDistance(){return this._dropShadowDistance}set dropShadowDistance(t){this._dropShadowDistance!==t&&(this._dropShadowDistance=t,this.styleID++)}/**
   * A canvas fillstyle that will be used on the text e.g., 'red', '#00FF00'.
   *
   * Can be an array to create a gradient e.g., `['#000000','#FFFFFF']`
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle|MDN}
   *
   * @member {string|string[]|number|number[]|CanvasGradient|CanvasPattern}
   */get fill(){return this._fill}set fill(t){let e=ln(t);this._fill!==e&&(this._fill=e,this.styleID++)}/**
   * If fill is an array of colours to create a gradient, this can change the type/direction of the gradient.
   *
   * @type {PIXI.TEXT_GRADIENT}
   */get fillGradientType(){return this._fillGradientType}set fillGradientType(t){this._fillGradientType!==t&&(this._fillGradientType=t,this.styleID++)}/**
   * If fill is an array of colours to create a gradient, this array can set the stop points
   * (numbers between 0 and 1) for the color, overriding the default behaviour of evenly spacing them.
   */get fillGradientStops(){return this._fillGradientStops}set fillGradientStops(t){(function(t,e){if(!Array.isArray(t)||!Array.isArray(e)||t.length!==e.length)return!1;for(let r=0;r<t.length;++r)if(t[r]!==e[r])return!1;return!0})(this._fillGradientStops,t)||(this._fillGradientStops=t,this.styleID++)}/**
   * The font family, can be a single font name, or a list of names where the first
   * is the preferred font.
   */get fontFamily(){return this._fontFamily}set fontFamily(t){this.fontFamily!==t&&(this._fontFamily=t,this.styleID++)}/**
   * The font size
   * (as a number it converts to px, but as a string, equivalents are '26px','20pt','160%' or '1.6em')
   */get fontSize(){return this._fontSize}set fontSize(t){this._fontSize!==t&&(this._fontSize=t,this.styleID++)}/**
   * The font style.
   *
   * @member {'normal'|'italic'|'oblique'}
   */get fontStyle(){return this._fontStyle}set fontStyle(t){this._fontStyle!==t&&(this._fontStyle=t,this.styleID++)}/**
   * The font variant.
   *
   * @member {'normal'|'small-caps'}
   */get fontVariant(){return this._fontVariant}set fontVariant(t){this._fontVariant!==t&&(this._fontVariant=t,this.styleID++)}/**
   * The font weight.
   *
   * @member {'normal'|'bold'|'bolder'|'lighter'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'}
   */get fontWeight(){return this._fontWeight}set fontWeight(t){this._fontWeight!==t&&(this._fontWeight=t,this.styleID++)}/** The amount of spacing between letters, default is 0. */get letterSpacing(){return this._letterSpacing}set letterSpacing(t){this._letterSpacing!==t&&(this._letterSpacing=t,this.styleID++)}/** The line height, a number that represents the vertical space that a letter uses. */get lineHeight(){return this._lineHeight}set lineHeight(t){this._lineHeight!==t&&(this._lineHeight=t,this.styleID++)}/** The space between lines. */get leading(){return this._leading}set leading(t){this._leading!==t&&(this._leading=t,this.styleID++)}/**
   * The lineJoin property sets the type of corner created, it can resolve spiked text issues.
   * Default is 'miter' (creates a sharp corner).
   *
   * @member {'miter'|'round'|'bevel'}
   */get lineJoin(){return this._lineJoin}set lineJoin(t){this._lineJoin!==t&&(this._lineJoin=t,this.styleID++)}/**
   * The miter limit to use when using the 'miter' lineJoin mode.
   *
   * This can reduce or increase the spikiness of rendered text.
   */get miterLimit(){return this._miterLimit}set miterLimit(t){this._miterLimit!==t&&(this._miterLimit=t,this.styleID++)}/**
   * Occasionally some fonts are cropped. Adding some padding will prevent this from happening
   * by adding padding to all sides of the text.
   */get padding(){return this._padding}set padding(t){this._padding!==t&&(this._padding=t,this.styleID++)}/**
   * A canvas fillstyle that will be used on the text stroke, e.g., 'blue', '#FCFF00'
   */get stroke(){return this._stroke}set stroke(t){let e=ln(t);this._stroke!==e&&(this._stroke=e,this.styleID++)}/**
   * A number that represents the thickness of the stroke.
   *
   * @default 0
   */get strokeThickness(){return this._strokeThickness}set strokeThickness(t){this._strokeThickness!==t&&(this._strokeThickness=t,this.styleID++)}/**
   * The baseline of the text that is rendered.
   *
   * @member {'alphabetic'|'top'|'hanging'|'middle'|'ideographic'|'bottom'}
   */get textBaseline(){return this._textBaseline}set textBaseline(t){this._textBaseline!==t&&(this._textBaseline=t,this.styleID++)}/** Trim transparent borders. */get trim(){return this._trim}set trim(t){this._trim!==t&&(this._trim=t,this.styleID++)}/**
   * How newlines and spaces should be handled.
   * Default is 'pre' (preserve, preserve).
   *
   *  value       | New lines     |   Spaces
   *  ---         | ---           |   ---
   * 'normal'     | Collapse      |   Collapse
   * 'pre'        | Preserve      |   Preserve
   * 'pre-line'   | Preserve      |   Collapse
   *
   * @member {'normal'|'pre'|'pre-line'}
   */get whiteSpace(){return this._whiteSpace}set whiteSpace(t){this._whiteSpace!==t&&(this._whiteSpace=t,this.styleID++)}/** Indicates if word wrap should be used. */get wordWrap(){return this._wordWrap}set wordWrap(t){this._wordWrap!==t&&(this._wordWrap=t,this.styleID++)}/** The width at which text will wrap, it needs wordWrap to be set to true. */get wordWrapWidth(){return this._wordWrapWidth}set wordWrapWidth(t){this._wordWrapWidth!==t&&(this._wordWrapWidth=t,this.styleID++)}/**
   * Generates a font style string to use for `TextMetrics.measureFont()`.
   *
   * @return Font style string, for passing to `TextMetrics.measureFont()`
   */toFontString(){let t="number"==typeof this.fontSize?`${this.fontSize}px`:this.fontSize,e=this.fontFamily;Array.isArray(this.fontFamily)||(e=this.fontFamily.split(","));for(let t=e.length-1;t>=0;t--){let r=e[t].trim();/([\"\'])[^\'\"]+\1/.test(r)||lr.includes(r)||(r=`"${r}"`),e[t]=r}return`${this.fontStyle} ${this.fontVariant} ${this.fontWeight} ${t} ${e.join(",")}`}};li.defaultStyle={/**
   * See {@link PIXI.TextStyle.align}
   * @type {'left'|'center'|'right'|'justify'}
   */align:"left",/** See {@link PIXI.TextStyle.breakWords} */breakWords:!1,/** See {@link PIXI.TextStyle.dropShadow} */dropShadow:!1,/** See {@link PIXI.TextStyle.dropShadowAlpha} */dropShadowAlpha:1,/**
   * See {@link PIXI.TextStyle.dropShadowAngle}
   * @type {number}
   * @default Math.PI / 6
   */dropShadowAngle:Math.PI/6,/** See {@link PIXI.TextStyle.dropShadowBlur} */dropShadowBlur:0,/**
   * See {@link PIXI.TextStyle.dropShadowColor}
   * @type {string|number}
   */dropShadowColor:"black",/** See {@link PIXI.TextStyle.dropShadowDistance} */dropShadowDistance:5,/**
   * See {@link PIXI.TextStyle.fill}
   * @type {string|string[]|number|number[]|CanvasGradient|CanvasPattern}
   */fill:"black",/**
   * See {@link PIXI.TextStyle.fillGradientType}
   * @type {PIXI.TEXT_GRADIENT}
   * @default PIXI.TEXT_GRADIENT.LINEAR_VERTICAL
   */fillGradientType:h9.LINEAR_VERTICAL,/**
   * See {@link PIXI.TextStyle.fillGradientStops}
   * @type {number[]}
   * @default []
   */fillGradientStops:[],/**
   * See {@link PIXI.TextStyle.fontFamily}
   * @type {string|string[]}
   */fontFamily:"Arial",/**
   * See {@link PIXI.TextStyle.fontSize}
   * @type {number|string} 
   */fontSize:26,/**
   * See {@link PIXI.TextStyle.fontStyle}
   * @type {'normal'|'italic'|'oblique'}
   */fontStyle:"normal",/**
   * See {@link PIXI.TextStyle.fontVariant}
   * @type {'normal'|'small-caps'}
   */fontVariant:"normal",/**
   * See {@link PIXI.TextStyle.fontWeight}
   * @type {'normal'|'bold'|'bolder'|'lighter'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'}
   */fontWeight:"normal",/** See {@link PIXI.TextStyle.leading} */leading:0,/** See {@link PIXI.TextStyle.letterSpacing} */letterSpacing:0,/** See {@link PIXI.TextStyle.lineHeight} */lineHeight:0,/**
   * See {@link PIXI.TextStyle.lineJoin}
   * @type {'miter'|'round'|'bevel'}
   */lineJoin:"miter",/** See {@link PIXI.TextStyle.miterLimit} */miterLimit:10,/** See {@link PIXI.TextStyle.padding} */padding:0,/**
   * See {@link PIXI.TextStyle.stroke}
   * @type {string|number}
   */stroke:"black",/** See {@link PIXI.TextStyle.strokeThickness} */strokeThickness:0,/**
   * See {@link PIXI.TextStyle.textBaseline} 
   * @type {'alphabetic'|'top'|'hanging'|'middle'|'ideographic'|'bottom'}
   */textBaseline:"alphabetic",/** See {@link PIXI.TextStyle.trim} */trim:!1,/**
   * See {@link PIXI.TextStyle.whiteSpace}
   * @type {'normal'|'pre'|'pre-line'}
   */whiteSpace:"pre",/** See {@link PIXI.TextStyle.wordWrap} */wordWrap:!1,/** See {@link PIXI.TextStyle.wordWrapWidth} */wordWrapWidth:100};let ls=li;function ln(t){let e=iQ.shared,r=t=>{let r=e.setValue(t);return 1===r.alpha?r.toHex():r.toRgbaString()};return Array.isArray(t)?t.map(r):r(t)}function la(t,e,r){for(let i in r)Array.isArray(e[i])?t[i]=e[i].slice():t[i]=e[i]}const lo={texture:!0,children:!1,baseTexture:!0},lh=class t extends a7{/**
   * @param text - The string that you would like the text to display
   * @param style - The style parameters
   * @param canvas - The canvas element for drawing text
   */constructor(e,r,i){let s=!1;i||(i=tl.ADAPTER.createCanvas(),s=!0),i.width=3,i.height=3;let n=nZ.from(i);n.orig=new s2,n.trim=new s2,super(n),this._ownCanvas=s,this.canvas=i,this.context=i.getContext("2d",{// required for trimming to work without warnings
willReadFrequently:!0}),this._resolution=t.defaultResolution??tl.RESOLUTION,this._autoResolution=t.defaultAutoResolution,this._text=null,this._style=null,this._styleListener=null,this._font="",this.text=e,this.style=r,this.localStyleID=-1}/**
   * @see PIXI.TextMetrics.experimentalLetterSpacing
   * @deprecated since 7.1.0
   */static get experimentalLetterSpacing(){return le.experimentalLetterSpacing}static set experimentalLetterSpacing(t){tC.deprecation("7.1.0","Text.experimentalLetterSpacing is deprecated, use TextMetrics.experimentalLetterSpacing"),le.experimentalLetterSpacing=t}/**
   * Renders text to its canvas, and updates its texture.
   *
   * By default this is used internally to ensure the texture is correct before rendering,
   * but it can be used called externally, for example from this class to 'pre-generate' the texture from a piece of text,
   * and then shared across multiple Sprites.
   * @param respectDirty - Whether to abort updating the text if the Text isn't dirty and the function is called.
   */updateText(t){let e,r;let i=this._style;if(this.localStyleID!==i.styleID&&(this.dirty=!0,this.localStyleID=i.styleID),!this.dirty&&t)return;this._font=this._style.toFontString();let s=this.context,n=le.measureText(this._text||" ",this._style,this._style.wordWrap,this.canvas),a=n.width,o=n.height,h=n.lines,l=n.lineHeight,u=n.lineWidths,d=n.maxLineWidth,c=n.fontProperties;this.canvas.width=Math.ceil(Math.ceil(Math.max(1,a)+2*i.padding)*this._resolution),this.canvas.height=Math.ceil(Math.ceil(Math.max(1,o)+2*i.padding)*this._resolution),s.scale(this._resolution,this._resolution),s.clearRect(0,0,this.canvas.width,this.canvas.height),s.font=this._font,s.lineWidth=i.strokeThickness,s.textBaseline=i.textBaseline,s.lineJoin=i.lineJoin,s.miterLimit=i.miterLimit;let p=i.dropShadow?2:1;for(let t=0;t<p;++t){let a=i.dropShadow&&0===t,p=a?Math.ceil(Math.max(1,o)+2*i.padding):0,f=p*this._resolution;if(a){s.fillStyle="black",s.strokeStyle="black";let t=i.dropShadowColor,e=i.dropShadowBlur*this._resolution,r=i.dropShadowDistance*this._resolution;s.shadowColor=iQ.shared.setValue(t).setAlpha(i.dropShadowAlpha).toRgbaString(),s.shadowBlur=e,s.shadowOffsetX=Math.cos(i.dropShadowAngle)*r,s.shadowOffsetY=Math.sin(i.dropShadowAngle)*r+f}else s.fillStyle=this._generateFillStyle(i,h,n),s.strokeStyle=i.stroke,s.shadowColor="black",s.shadowBlur=0,s.shadowOffsetX=0,s.shadowOffsetY=0;let m=(l-c.fontSize)/2;l-c.fontSize<0&&(m=0);for(let t=0;t<h.length;t++)e=i.strokeThickness/2,r=i.strokeThickness/2+t*l+c.ascent+m,"right"===i.align?e+=d-u[t]:"center"===i.align&&(e+=(d-u[t])/2),i.stroke&&i.strokeThickness&&this.drawLetterSpacing(h[t],e+i.padding,r+i.padding-p,!0),i.fill&&this.drawLetterSpacing(h[t],e+i.padding,r+i.padding-p)}this.updateTexture()}/**
   * Render the text with letter-spacing.
   * @param text - The text to draw
   * @param x - Horizontal position to draw the text
   * @param y - Vertical position to draw the text
   * @param isStroke - Is this drawing for the outside stroke of the
   *  text? If not, it's for the inside fill
   */drawLetterSpacing(t,e,r,i=!1){let s=this._style.letterSpacing,n=!1;if(le.experimentalLetterSpacingSupported&&(le.experimentalLetterSpacing?(this.context.letterSpacing=`${s}px`,this.context.textLetterSpacing=`${s}px`,n=!0):(this.context.letterSpacing="0px",this.context.textLetterSpacing="0px")),0===s||n){i?this.context.strokeText(t,e,r):this.context.fillText(t,e,r);return}let a=e,o=le.graphemeSegmenter(t),h=this.context.measureText(t).width,l=0;for(let t=0;t<o.length;++t){let e=o[t];i?this.context.strokeText(e,a,r):this.context.fillText(e,a,r);let n="";for(let e=t+1;e<o.length;++e)n+=o[e];a+=h-(l=this.context.measureText(n).width)+s,h=l}}/** Updates texture size based on canvas size. */updateTexture(){let t=this.canvas;if(this._style.trim){let e=tC.trimCanvas(t);e.data&&(t.width=e.width,t.height=e.height,this.context.putImageData(e.data,0,0))}let e=this._texture,r=this._style,i=r.trim?0:r.padding,s=e.baseTexture;e.trim.width=e._frame.width=t.width/this._resolution,e.trim.height=e._frame.height=t.height/this._resolution,e.trim.x=-i,e.trim.y=-i,e.orig.width=e._frame.width-2*i,e.orig.height=e._frame.height-2*i,this._onTextureUpdate(),s.setRealSize(t.width,t.height,this._resolution),e.updateUvs(),this.dirty=!1}/**
   * Renders the object using the WebGL renderer
   * @param renderer - The renderer
   */_render(t){this._autoResolution&&this._resolution!==t.resolution&&(this._resolution=t.resolution,this.dirty=!0),this.updateText(!0),super._render(t)}/** Updates the transform on all children of this container for rendering. */updateTransform(){this.updateText(!0),super.updateTransform()}getBounds(t,e){return this.updateText(!0),-1===this._textureID&&(t=!1),super.getBounds(t,e)}/**
   * Gets the local bounds of the text object.
   * @param rect - The output rectangle.
   * @returns The bounds.
   */getLocalBounds(t){return this.updateText(!0),super.getLocalBounds.call(this,t)}/** Calculates the bounds of the Text as a rectangle. The bounds calculation takes the worldTransform into account. */_calculateBounds(){this.calculateVertices(),this._bounds.addQuad(this.vertexData)}/**
   * Generates the fill style. Can automatically generate a gradient based on the fill style being an array
   * @param style - The style.
   * @param lines - The lines of text.
   * @param metrics
   * @returns The fill style
   */_generateFillStyle(t,e,r){let i;let s=t.fill;if(!Array.isArray(s))return s;if(1===s.length)return s[0];let n=t.dropShadow?t.dropShadowDistance:0,a=t.padding||0,o=this.canvas.width/this._resolution-n-2*a,h=this.canvas.height/this._resolution-n-2*a,l=s.slice(),u=t.fillGradientStops.slice();if(!u.length){let t=l.length+1;for(let e=1;e<t;++e)u.push(e/t)}if(l.unshift(s[0]),u.unshift(0),l.push(s[s.length-1]),u.push(1),t.fillGradientType===h9.LINEAR_VERTICAL){i=this.context.createLinearGradient(o/2,a,o/2,h+a);let s=r.fontProperties.fontSize+t.strokeThickness;for(let t=0;t<e.length;t++){let n=r.lineHeight*(t-1)+s,a=r.lineHeight*t,o=a;t>0&&n>a&&(o=(a+n)/2);let d=a+s,c=r.lineHeight*(t+1),p=d;t+1<e.length&&c<d&&(p=(d+c)/2);let f=(p-o)/h;for(let t=0;t<l.length;t++){let e=Math.min(1,Math.max(0,o/h+("number"==typeof u[t]?u[t]:t/l.length)*f));e=Number(e.toFixed(5)),i.addColorStop(e,l[t])}}}else{i=this.context.createLinearGradient(a,h/2,o+a,h/2);let t=l.length+1,e=1;for(let r=0;r<l.length;r++){let s;s="number"==typeof u[r]?u[r]:e/t,i.addColorStop(s,l[r]),e++}}return i}/**
   * Destroys this text object.
   *
   * Note* Unlike a Sprite, a Text object will automatically destroy its baseTexture and texture as
   * the majority of the time the texture will not be shared with any other Sprites.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.children=false] - if set to true, all the children will have their
   *  destroy method called as well. 'options' will be passed on to those calls.
   * @param {boolean} [options.texture=true] - Should it destroy the current texture of the sprite as well
   * @param {boolean} [options.baseTexture=true] - Should it destroy the base texture of the sprite as well
   */destroy(t){"boolean"==typeof t&&(t={children:t}),t=Object.assign({},lo,t),super.destroy(t),this._ownCanvas&&(this.canvas.height=this.canvas.width=0),this.context=null,this.canvas=null,this._style=null}/** The width of the Text, setting this will actually modify the scale to achieve the value set. */get width(){return this.updateText(!0),Math.abs(this.scale.x)*this._texture.orig.width}set width(t){this.updateText(!0);let e=tC.sign(this.scale.x)||1;this.scale.x=e*t/this._texture.orig.width,this._width=t}/** The height of the Text, setting this will actually modify the scale to achieve the value set. */get height(){return this.updateText(!0),Math.abs(this.scale.y)*this._texture.orig.height}set height(t){this.updateText(!0);let e=tC.sign(this.scale.y)||1;this.scale.y=e*t/this._texture.orig.height,this._height=t}/**
   * Set the style of the text.
   *
   * Set up an event listener to listen for changes on the style object and mark the text as dirty.
   *
   * If setting the `style` can also be partial {@link PIXI.ITextStyle}.
   */get style(){return this._style}set style(t){(t=t||{})instanceof ls?this._style=t:this._style=new ls(t),this.localStyleID=-1,this.dirty=!0}/** Set the copy for the text object. To split a line you can use '\n'. */get text(){return this._text}set text(t){t=String(t??""),this._text!==t&&(this._text=t,this.dirty=!0)}/**
   * The resolution / device pixel ratio of the canvas.
   *
   * This is set to automatically match the renderer resolution by default, but can be overridden by setting manually.
   * @default 1
   */get resolution(){return this._resolution}set resolution(t){this._autoResolution=!1,this._resolution!==t&&(this._resolution=t,this.dirty=!0)}};lh.defaultAutoResolution=!0;class ll{/**
   * @param maxItemsPerFrame - The maximum number of items that can be prepared each frame.
   */constructor(t){this.maxItemsPerFrame=t,this.itemsLeft=0}/** Resets any counting properties to start fresh on a new frame. */beginFrame(){this.itemsLeft=this.maxItemsPerFrame}/**
   * Checks to see if another item can be uploaded. This should only be called once per item.
   * @returns If the item is allowed to be uploaded.
   */allowedToUpload(){return this.itemsLeft-- >0}}function lu(t,e){let r=!1;if(t?._textures?.length){for(let i=0;i<t._textures.length;i++)if(t._textures[i]instanceof nZ){let s=t._textures[i].baseTexture;e.includes(s)||(e.push(s),r=!0)}}return r}function ld(t,e){if(t.baseTexture instanceof sk){let r=t.baseTexture;return e.includes(r)||e.push(r),!0}return!1}function lc(t,e){if(t._texture&&t._texture instanceof nZ){let r=t._texture.baseTexture;return e.includes(r)||e.push(r),!0}return!1}function lp(t,e){return e instanceof lh&&(e.updateText(!0),!0)}function lf(t,e){if(e instanceof ls){let t=e.toFontString();return le.measureFont(t),!0}return!1}function lm(t,e){if(t instanceof lh){e.includes(t.style)||e.push(t.style),e.includes(t)||e.push(t);let r=t._texture.baseTexture;return e.includes(r)||e.push(r),!0}return!1}function lg(t,e){return t instanceof ls&&(e.includes(t)||e.push(t),!0)}const l_=class t{/**
   * @param {PIXI.IRenderer} renderer - A reference to the current renderer
   */constructor(e){this.limiter=new ll(t.uploadsPerFrame),this.renderer=e,this.uploadHookHelper=null,this.queue=[],this.addHooks=[],this.uploadHooks=[],this.completes=[],this.ticking=!1,this.delayedTick=()=>{this.queue&&this.prepareItems()},this.registerFindHook(lm),this.registerFindHook(lg),this.registerFindHook(lu),this.registerFindHook(ld),this.registerFindHook(lc),this.registerUploadHook(lp),this.registerUploadHook(lf)}/**
   * Upload all the textures and graphics to the GPU.
   * @method PIXI.BasePrepare#upload
   * @param {PIXI.DisplayObject|PIXI.Container|PIXI.BaseTexture|PIXI.Texture|PIXI.Graphics|PIXI.Text} [item] -
   *        Container or display object to search for items to upload or the items to upload themselves,
   *        or optionally ommitted, if items have been added using {@link PIXI.BasePrepare#add `prepare.add`}.
   */upload(t){return new Promise(e=>{t&&this.add(t),this.queue.length?(this.completes.push(e),this.ticking||(this.ticking=!0,aU.system.addOnce(this.tick,this,aF.UTILITY))):e()})}/**
   * Handle tick update
   * @private
   */tick(){setTimeout(this.delayedTick,0)}/**
   * Actually prepare items. This is handled outside of the tick because it will take a while
   * and we do NOT want to block the current animation frame from rendering.
   * @private
   */prepareItems(){for(this.limiter.beginFrame();this.queue.length&&this.limiter.allowedToUpload();){let t=this.queue[0],e=!1;if(t&&!t._destroyed){for(let r=0,i=this.uploadHooks.length;r<i;r++)if(this.uploadHooks[r](this.uploadHookHelper,t)){this.queue.shift(),e=!0;break}}e||this.queue.shift()}if(this.queue.length)aU.system.addOnce(this.tick,this,aF.UTILITY);else{this.ticking=!1;let t=this.completes.slice(0);this.completes.length=0;for(let e=0,r=t.length;e<r;e++)t[e]()}}/**
   * Adds hooks for finding items.
   * @param {Function} addHook - Function call that takes two parameters: `item:*, queue:Array`
   *          function must return `true` if it was able to add item to the queue.
   * @returns Instance of plugin for chaining.
   */registerFindHook(t){return t&&this.addHooks.push(t),this}/**
   * Adds hooks for uploading items.
   * @param {Function} uploadHook - Function call that takes two parameters: `prepare:CanvasPrepare, item:*` and
   *          function must return `true` if it was able to handle upload of item.
   * @returns Instance of plugin for chaining.
   */registerUploadHook(t){return t&&this.uploadHooks.push(t),this}/**
   * Manually add an item to the uploading queue.
   * @param {PIXI.DisplayObject|PIXI.Container|PIXI.BaseTexture|PIXI.Texture|PIXI.Graphics|PIXI.Text|*} item - Object to
   *        add to the queue
   * @returns Instance of plugin for chaining.
   */add(t){for(let e=0,r=this.addHooks.length;e<r&&!this.addHooks[e](t,this.queue);e++);if(t instanceof a5)for(let e=t.children.length-1;e>=0;e--)this.add(t.children[e]);return this}/** Destroys the plugin, don't use after this. */destroy(){this.ticking&&aU.system.remove(this.tick,this),this.ticking=!1,this.addHooks=null,this.uploadHooks=null,this.renderer=null,this.completes=null,this.queue=null,this.limiter=null,this.uploadHookHelper=null}};l_.uploadsPerFrame=4;let ly=l_;function lv(t,e){return e instanceof sk&&(e._glTextures[t.CONTEXT_UID]||t.texture.bind(e),!0)}function lx(t,e){if(!(e instanceof hK))return!1;let{geometry:r}=e;e.finishPoly(),r.updateBatches();let{batches:i}=r;for(let e=0;e<i.length;e++){let{texture:r}=i[e].style;r&&lv(t,r.baseTexture)}return r.batchable||t.geometry.bind(r,e._resolveDirectShader(t)),!0}function lb(t,e){return t instanceof hK&&(e.push(t),!0)}Object.defineProperties(tl,{/**
   * Default number of uploads per frame using prepare plugin.
   * @static
   * @memberof PIXI.settings
   * @name UPLOADS_PER_FRAME
   * @deprecated since 7.1.0
   * @see PIXI.BasePrepare.uploadsPerFrame
   * @type {number}
   */UPLOADS_PER_FRAME:{get:()=>ly.uploadsPerFrame,set(t){tC.deprecation("7.1.0","settings.UPLOADS_PER_FRAME is deprecated, use prepare.BasePrepare.uploadsPerFrame"),ly.uploadsPerFrame=t}}});class lE extends ly{/**
   * @param {PIXI.Renderer} renderer - A reference to the current renderer
   */constructor(t){super(t),this.uploadHookHelper=this.renderer,this.registerFindHook(lb),this.registerUploadHook(lv),this.registerUploadHook(lx)}}lE.extension={name:"prepare",type:sS.RendererSystem},sI.add(lE),new s0;var lT=`#version 300 es
#define SHADER_NAME Tiling-Sprite-100

precision lowp float;

in vec2 vTextureCoord;

out vec4 fragmentColor;

uniform sampler2D uSampler;
uniform vec4 uColor;
uniform mat3 uMapCoord;
uniform vec4 uClampFrame;
uniform vec2 uClampOffset;

void main(void)
{
    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);
    coord = (uMapCoord * vec3(coord, 1.0)).xy;
    vec2 unclamped = coord;
    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

    vec4 texSample = texture(uSampler, coord, unclamped == coord ? 0.0f : -32.0f);// lod-bias very negative to force lod 0

    fragmentColor = texSample * uColor;
}
`,lA=`#version 300 es
#define SHADER_NAME Tiling-Sprite-300

precision lowp float;

in vec2 aVertexPosition;
in vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTransform;

out vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;
}
`,lS=`#version 100
#ifdef GL_EXT_shader_texture_lod
    #extension GL_EXT_shader_texture_lod : enable
#endif
#define SHADER_NAME Tiling-Sprite-100

precision lowp float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 uColor;
uniform mat3 uMapCoord;
uniform vec4 uClampFrame;
uniform vec2 uClampOffset;

void main(void)
{
    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);
    coord = (uMapCoord * vec3(coord, 1.0)).xy;
    vec2 unclamped = coord;
    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

    #ifdef GL_EXT_shader_texture_lod
        vec4 texSample = unclamped == coord
            ? texture2D(uSampler, coord) 
            : texture2DLodEXT(uSampler, coord, 0);
    #else
        vec4 texSample = texture2D(uSampler, coord);
    #endif

    gl_FragColor = texSample * uColor;
}
`,lw=`#version 100
#define SHADER_NAME Tiling-Sprite-100

precision lowp float;

attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTransform;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;
}
`,lR=`#version 100
#define SHADER_NAME Tiling-Sprite-Simple-100

precision lowp float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 uColor;

void main(void)
{
    vec4 texSample = texture2D(uSampler, vTextureCoord);
    gl_FragColor = texSample * uColor;
}
`;const lI=new s8;class lC extends nD{/**
   * constructor for renderer
   * @param {PIXI.Renderer} renderer - The renderer this tiling awesomeness works for.
   */constructor(t){super(t),t.runners.contextChange.add(this),this.quad=new n1,this.state=sM.for2d()}/** Creates shaders when context is initialized. */contextChange(){let t=this.renderer,e={globals:t.globalUniforms};this.simpleShader=nC.from(lw,lR,e),this.shader=t.context.webGLVersion>1?nC.from(lA,lT,e):nC.from(lw,lS,e)}/**
   * @param {PIXI.TilingSprite} ts - tilingSprite to be rendered
   */render(t){let e=this.renderer,r=this.quad,i=r.vertices;i[0]=i[6]=-(t._width*t.anchor.x),i[1]=i[3]=-(t._height*t.anchor.y),i[2]=i[4]=t._width*(1-t.anchor.x),i[5]=i[7]=t._height*(1-t.anchor.y);let s=t.uvRespectAnchor?t.anchor.x:0,n=t.uvRespectAnchor?t.anchor.y:0;(i=r.uvs)[0]=i[6]=-s,i[1]=i[3]=-n,i[2]=i[4]=1-s,i[5]=i[7]=1-n,r.invalidate();let a=t._texture,o=a.baseTexture,h=o.alphaMode>0,l=t.tileTransform.localTransform,u=t.uvMatrix,d=o.isPowerOfTwo&&a.frame.width===o.width&&a.frame.height===o.height;d&&(o._glTextures[e.CONTEXT_UID]?d=o.wrapMode!==J.CLAMP:o.wrapMode===J.CLAMP&&(o.wrapMode=J.REPEAT));let c=d?this.simpleShader:this.shader,p=a.width,f=a.height,m=t._width,g=t._height;lI.set(l.a*p/m,l.b*p/g,l.c*f/m,l.d*f/g,l.tx/m,l.ty/g),lI.invert(),d?lI.prepend(u.mapCoord):(c.uniforms.uMapCoord=u.mapCoord.toArray(!0),c.uniforms.uClampFrame=u.uClampFrame,c.uniforms.uClampOffset=u.uClampOffset),c.uniforms.uTransform=lI.toArray(!0),c.uniforms.uColor=iQ.shared.setValue(t.tint).premultiply(t.worldAlpha,h).toArray(c.uniforms.uColor),c.uniforms.translationMatrix=t.transform.worldTransform.toArray(!0),c.uniforms.uSampler=a,e.shader.bind(c),e.geometry.bind(r),this.state.blendMode=tC.correctBlendMode(t.blendMode,h),e.state.set(this.state),e.geometry.draw(this.renderer.gl.TRIANGLES,6,0)}}lC.extension={name:"tilingSprite",type:sS.RendererPlugin},sI.add(lC);const lP=class t{/**
   * @param texture - Reference to the source BaseTexture object.
   * @param {object} data - Spritesheet image data.
   * @param resolutionFilename - The filename to consider when determining
   *        the resolution of the spritesheet. If not provided, the imageUrl will
   *        be used on the BaseTexture.
   */constructor(t,e,r=null){this.linkedSheets=[],this._texture=t instanceof nZ?t:null,this.baseTexture=t instanceof sk?t:this._texture.baseTexture,this.textures={},this.animations={},this.data=e;let i=this.baseTexture.resource;this.resolution=this._updateResolution(r||(i?i.url:null)),this._frames=this.data.frames,this._frameKeys=Object.keys(this._frames),this._batchIndex=0,this._callback=null}/**
   * Generate the resolution from the filename or fallback
   * to the meta.scale field of the JSON data.
   * @param resolutionFilename - The filename to use for resolving
   *        the default resolution.
   * @returns Resolution to use for spritesheet.
   */_updateResolution(t=null){let{scale:e}=this.data.meta,r=tC.getResolutionOfUrl(t,null);return null===r&&(r=parseFloat(e??"1")),1!==r&&this.baseTexture.setResolution(r),r}/**
   * Parser spritesheet from loaded data. This is done asynchronously
   * to prevent creating too many Texture within a single process.
   * @method PIXI.Spritesheet#parse
   */parse(){return new Promise(e=>{this._callback=e,this._batchIndex=0,this._frameKeys.length<=t.BATCH_SIZE?(this._processFrames(0),this._processAnimations(),this._parseComplete()):this._nextBatch()})}/**
   * Process a batch of frames
   * @param initialFrameIndex - The index of frame to start.
   */_processFrames(e){let r=e,i=t.BATCH_SIZE;for(;r-e<i&&r<this._frameKeys.length;){let t=this._frameKeys[r],e=this._frames[t],i=e.frame;if(i){let r=null,s=null,n=!1!==e.trimmed&&e.sourceSize?e.sourceSize:e.frame,a=new s2(0,0,Math.floor(n.w)/this.resolution,Math.floor(n.h)/this.resolution);r=e.rotated?new s2(Math.floor(i.x)/this.resolution,Math.floor(i.y)/this.resolution,Math.floor(i.h)/this.resolution,Math.floor(i.w)/this.resolution):new s2(Math.floor(i.x)/this.resolution,Math.floor(i.y)/this.resolution,Math.floor(i.w)/this.resolution,Math.floor(i.h)/this.resolution),!1!==e.trimmed&&e.spriteSourceSize&&(s=new s2(Math.floor(e.spriteSourceSize.x)/this.resolution,Math.floor(e.spriteSourceSize.y)/this.resolution,Math.floor(i.w)/this.resolution,Math.floor(i.h)/this.resolution)),this.textures[t]=new nZ(this.baseTexture,r,a,s,e.rotated?2:0,e.anchor,e.borders),nZ.addToCache(this.textures[t],t.toString())}r++}}/** Parse animations config. */_processAnimations(){let t=this.data.animations||{};for(let e in t){this.animations[e]=[];for(let r=0;r<t[e].length;r++){let i=t[e][r];this.animations[e].push(this.textures[i])}}}/** The parse has completed. */_parseComplete(){let t=this._callback;this._callback=null,this._batchIndex=0,t.call(this,this.textures)}/** Begin the next batch of textures. */_nextBatch(){this._processFrames(this._batchIndex*t.BATCH_SIZE),this._batchIndex++,setTimeout(()=>{this._batchIndex*t.BATCH_SIZE<this._frameKeys.length?this._nextBatch():(this._processAnimations(),this._parseComplete())},0)}/**
   * Destroy Spritesheet and don't use after this.
   * @param {boolean} [destroyBase=false] - Whether to destroy the base texture as well
   */destroy(t=!1){for(let t in this.textures)this.textures[t].destroy();this._frames=null,this._frameKeys=null,this.data=null,this.textures=null,t&&(this._texture?.destroy(),this.baseTexture.destroy()),this._texture=null,this.baseTexture=null,this.linkedSheets=[]}};lP.BATCH_SIZE=1e3;const lM=["jpg","png","jpeg","avif","webp"],lD={extension:sS.Asset,/** Handle the caching of the related Spritesheet Textures */cache:{test:t=>t instanceof lP,getCacheableAssets:(t,e)=>(function t(e,r,i){let s={};if(e.forEach(t=>{s[t]=r}),Object.keys(r.textures).forEach(t=>{s[t]=r.textures[t]}),!i){let i=tC.path.dirname(e[0]);r.linkedSheets.forEach((e,n)=>{let a=t([`${i}/${r.data.meta.related_multi_packs[n]}`],e,!0);Object.assign(s,a)})}return s})(t,e,!1)},/** Resolve the the resolution of the asset. */resolver:{test:t=>{let e=t.split("?")[0].split("."),r=e.pop(),i=e.pop();return"json"===r&&lM.includes(i)},parse:t=>{let e=t.split(".");return{resolution:parseFloat(tl.RETINA_PREFIX.exec(t)?.[1]??"1"),format:e[e.length-2],src:t}}},/**
   * Loader plugin that parses sprite sheets!
   * once the JSON has been loaded this checks to see if the JSON is spritesheet data.
   * If it is, we load the spritesheets image and parse the data into PIXI.Spritesheet
   * All textures in the sprite sheet are then added to the cache
   * @ignore
   */loader:{name:"spritesheetLoader",extension:{type:sS.LoadParser,priority:oL.Normal},testParse:async(t,e)=>".json"===tC.path.extname(e.src).toLowerCase()&&!!t.frames,async parse(t,e,r){let i=tC.path.dirname(e.src);i&&i.lastIndexOf("/")!==i.length-1&&(i+="/");let s=i+t.meta.image;s=oO(s,e.src);let n=(await r.load([s]))[s],a=new lP(n.baseTexture,t,e.src);await a.parse();let o=t?.meta?.related_multi_packs;if(Array.isArray(o)){let t=[];for(let s of o){if("string"!=typeof s)continue;let n=i+s;e.data?.ignoreMultiPack||(n=oO(n,e.src),t.push(r.load({src:n,data:{ignoreMultiPack:!0}})))}let s=await Promise.all(t);a.linkedSheets=s,s.forEach(t=>{t.linkedSheets=[a].concat(a.linkedSheets.filter(e=>e!==t))})}return a},unload(t){t.destroy(!0)}}};sI.add(lD);class lO{constructor(){this.info=[],this.common=[],this.page=[],this.char=[],this.kerning=[],this.distanceField=[]}}class lB{/**
   * Check if resource refers to txt font data.
   * @param data
   * @returns - True if resource could be treated as font data, false otherwise.
   */static test(t){return"string"==typeof t&&t.startsWith("info face=")}/**
   * Convert text font data to a javascript object.
   * @param txt - Raw string data to be converted
   * @returns - Parsed font data
   */static parse(t){let e=t.match(/^[a-z]+\s+.+$/gm),r={info:[],common:[],page:[],char:[],chars:[],kerning:[],kernings:[],distanceField:[]};for(let t in e){let i=e[t].match(/^[a-z]+/gm)[0],s=e[t].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm),n={};for(let t in s){let e=s[t].split("="),r=e[0],i=e[1].replace(/"/gm,""),a=parseFloat(i),o=isNaN(a)?i:a;n[r]=o}r[i].push(n)}let i=new lO;return r.info.forEach(t=>i.info.push({face:t.face,size:parseInt(t.size,10)})),r.common.forEach(t=>i.common.push({lineHeight:parseInt(t.lineHeight,10)})),r.page.forEach(t=>i.page.push({id:parseInt(t.id,10),file:t.file})),r.char.forEach(t=>i.char.push({id:parseInt(t.id,10),page:parseInt(t.page,10),x:parseInt(t.x,10),y:parseInt(t.y,10),width:parseInt(t.width,10),height:parseInt(t.height,10),xoffset:parseInt(t.xoffset,10),yoffset:parseInt(t.yoffset,10),xadvance:parseInt(t.xadvance,10)})),r.kerning.forEach(t=>i.kerning.push({first:parseInt(t.first,10),second:parseInt(t.second,10),amount:parseInt(t.amount,10)})),r.distanceField.forEach(t=>i.distanceField.push({distanceRange:parseInt(t.distanceRange,10),fieldType:t.fieldType})),i}}class lN{/**
   * Check if resource refers to xml font data.
   * @param data
   * @returns - True if resource could be treated as font data, false otherwise.
   */static test(t){return"string"!=typeof t&&"getElementsByTagName"in t&&t.getElementsByTagName("page").length&&null!==t.getElementsByTagName("info")[0].getAttribute("face")}/**
   * Convert the XML into BitmapFontData that we can use.
   * @param xml
   * @returns - Data to use for BitmapFont
   */static parse(t){let e=new lO,r=t.getElementsByTagName("info"),i=t.getElementsByTagName("common"),s=t.getElementsByTagName("page"),n=t.getElementsByTagName("char"),a=t.getElementsByTagName("kerning"),o=t.getElementsByTagName("distanceField");for(let t=0;t<r.length;t++)e.info.push({face:r[t].getAttribute("face"),size:parseInt(r[t].getAttribute("size"),10)});for(let t=0;t<i.length;t++)e.common.push({lineHeight:parseInt(i[t].getAttribute("lineHeight"),10)});for(let t=0;t<s.length;t++)e.page.push({id:parseInt(s[t].getAttribute("id"),10)||0,file:s[t].getAttribute("file")});for(let t=0;t<n.length;t++){let r=n[t];e.char.push({id:parseInt(r.getAttribute("id"),10),page:parseInt(r.getAttribute("page"),10)||0,x:parseInt(r.getAttribute("x"),10),y:parseInt(r.getAttribute("y"),10),width:parseInt(r.getAttribute("width"),10),height:parseInt(r.getAttribute("height"),10),xoffset:parseInt(r.getAttribute("xoffset"),10),yoffset:parseInt(r.getAttribute("yoffset"),10),xadvance:parseInt(r.getAttribute("xadvance"),10)})}for(let t=0;t<a.length;t++)e.kerning.push({first:parseInt(a[t].getAttribute("first"),10),second:parseInt(a[t].getAttribute("second"),10),amount:parseInt(a[t].getAttribute("amount"),10)});for(let t=0;t<o.length;t++)e.distanceField.push({fieldType:o[t].getAttribute("fieldType"),distanceRange:parseInt(o[t].getAttribute("distanceRange"),10)});return e}}class lF{/**
   * Check if resource refers to text xml font data.
   * @param data
   * @returns - True if resource could be treated as font data, false otherwise.
   */static test(t){return!!("string"==typeof t&&t.includes("<font>"))&&lN.test(tl.ADAPTER.parseXML(t))}/**
   * Convert the text XML into BitmapFontData that we can use.
   * @param xmlTxt
   * @returns - Data to use for BitmapFont
   */static parse(t){return lN.parse(tl.ADAPTER.parseXML(t))}}const lL=[lB,lN,lF];function lU(t){return t.codePointAt?t.codePointAt(0):t.charCodeAt(0)}function lk(t){return Array.from?Array.from(t):t.split("")}const lG=class t{/**
   * @param data
   * @param textures
   * @param ownsTextures - Setting to `true` will destroy page textures
   *        when the font is uninstalled.
   */constructor(t,e,r){let[i]=t.info,[s]=t.common,[n]=t.page,[a]=t.distanceField,o=tC.getResolutionOfUrl(n.file),h={};this._ownsTextures=r,this.font=i.face,this.size=i.size,this.lineHeight=s.lineHeight/o,this.chars={},this.pageTextures=h;for(let r=0;r<t.page.length;r++){let{id:i,file:s}=t.page[r];h[i]=e instanceof Array?e[r]:e[s],a?.fieldType&&"none"!==a.fieldType&&(h[i].baseTexture.alphaMode=te.NO_PREMULTIPLIED_ALPHA,h[i].baseTexture.mipmap=tt.OFF)}for(let e=0;e<t.char.length;e++){let{id:r,page:i}=t.char[e],{x:s,y:n,width:a,height:l,xoffset:u,yoffset:d,xadvance:c}=t.char[e];s/=o,n/=o,a/=o,l/=o,u/=o,d/=o,c/=o;let p=new s2(s+h[i].frame.x/o,n+h[i].frame.y/o,a,l);this.chars[r]={xOffset:u,yOffset:d,xAdvance:c,kerning:{},texture:new nZ(h[i].baseTexture,p),page:i}}for(let e=0;e<t.kerning.length;e++){let{first:r,second:i,amount:s}=t.kerning[e];r/=o,i/=o,s/=o,this.chars[i]&&(this.chars[i].kerning[r]=s)}this.distanceFieldRange=a?.distanceRange,this.distanceFieldType=a?.fieldType?.toLowerCase()??"none"}/** Remove references to created glyph textures. */destroy(){for(let t in this.chars)this.chars[t].texture.destroy(),this.chars[t].texture=null;for(let t in this.pageTextures)this._ownsTextures&&this.pageTextures[t].destroy(!0),this.pageTextures[t]=null;this.chars=null,this.pageTextures=null}/**
   * Register a new bitmap font.
   * @param data - The
   *        characters map that could be provided as xml or raw string.
   * @param textures - List of textures for each page.
   * @param ownsTextures - Set to `true` to destroy page textures
   *        when the font is uninstalled. By default fonts created with
   *        `BitmapFont.from` or from the `BitmapFontLoader` are `true`.
   * @returns {PIXI.BitmapFont} Result font object with font, size, lineHeight
   *         and char fields.
   */static install(e,r,i){let s;if(e instanceof lO)s=e;else{let t=function(t){for(let e=0;e<lL.length;e++)if(lL[e].test(t))return lL[e];return null}(e);if(!t)throw Error("Unrecognized data format for font.");s=t.parse(e)}r instanceof nZ&&(r=[r]);let n=new t(s,r,i);return t.available[n.font]=n,n}/**
   * Remove bitmap font by name.
   * @param name - Name of the font to uninstall.
   */static uninstall(e){let r=t.available[e];if(!r)throw Error(`No font found named '${e}'`);r.destroy(),delete t.available[e]}/**
   * Generates a bitmap-font for the given style and character set. This does not support
   * kernings yet. With `style` properties, only the following non-layout properties are used:
   *
   * - {@link PIXI.TextStyle#dropShadow|dropShadow}
   * - {@link PIXI.TextStyle#dropShadowDistance|dropShadowDistance}
   * - {@link PIXI.TextStyle#dropShadowColor|dropShadowColor}
   * - {@link PIXI.TextStyle#dropShadowBlur|dropShadowBlur}
   * - {@link PIXI.TextStyle#dropShadowAngle|dropShadowAngle}
   * - {@link PIXI.TextStyle#fill|fill}
   * - {@link PIXI.TextStyle#fillGradientStops|fillGradientStops}
   * - {@link PIXI.TextStyle#fillGradientType|fillGradientType}
   * - {@link PIXI.TextStyle#fontFamily|fontFamily}
   * - {@link PIXI.TextStyle#fontSize|fontSize}
   * - {@link PIXI.TextStyle#fontVariant|fontVariant}
   * - {@link PIXI.TextStyle#fontWeight|fontWeight}
   * - {@link PIXI.TextStyle#lineJoin|lineJoin}
   * - {@link PIXI.TextStyle#miterLimit|miterLimit}
   * - {@link PIXI.TextStyle#stroke|stroke}
   * - {@link PIXI.TextStyle#strokeThickness|strokeThickness}
   * - {@link PIXI.TextStyle#textBaseline|textBaseline}
   * @param name - The name of the custom font to use with BitmapText.
   * @param textStyle - Style options to render with BitmapFont.
   * @param options - Setup options for font or name of the font.
   * @returns Font generated by style options.
   * @example
   * import { BitmapFont, BitmapText } from 'pixi.js';
   *
   * BitmapFont.from('TitleFont', {
   *     fontFamily: 'Arial',
   *     fontSize: 12,
   *     strokeThickness: 2,
   *     fill: 'purple',
   * });
   *
   * const title = new BitmapText('This is the title', { fontName: 'TitleFont' });
   */static from(e,r,i){if(!e)throw Error("[BitmapFont] Property `name` is required.");let{chars:s,padding:n,resolution:a,textureWidth:o,textureHeight:h,...l}=Object.assign({},t.defaultOptions,i),u=function(t){"string"==typeof t&&(t=[t]);let e=[];for(let r=0,i=t.length;r<i;r++){let i=t[r];if(Array.isArray(i)){if(2!==i.length)throw Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${i.length}.`);let t=i[0].charCodeAt(0),r=i[1].charCodeAt(0);if(r<t)throw Error("[BitmapFont]: Invalid character range.");for(let i=t;i<=r;i++)e.push(String.fromCharCode(i))}else e.push(...lk(i))}if(0===e.length)throw Error("[BitmapFont]: Empty set when resolving characters.");return e}(s),d=r instanceof ls?r:new ls(r),c=new lO;c.info[0]={face:d.fontFamily,size:d.fontSize},c.common[0]={lineHeight:d.fontSize};let p=0,f=0,m,g,_,y=0,v=[],x=[];for(let t=0;t<u.length;t++){m||((m=tl.ADAPTER.createCanvas()).width=o,m.height=h,g=m.getContext("2d"),_=new sk(m,{resolution:a,...l}),v.push(_),x.push(new nZ(_)),c.page.push({id:x.length-1,file:""}));let e=u[t],r=le.measureText(e,d,!1,m),i=r.width,s=Math.ceil(r.height),b=Math.ceil(("italic"===d.fontStyle?2:1)*i);if(f>=h-s*a){if(0===f)throw Error(`[BitmapFont] textureHeight ${h}px is too small (fontFamily: '${d.fontFamily}', fontSize: ${d.fontSize}px, char: '${e}')`);--t,m=null,g=null,_=null,f=0,p=0,y=0;continue}if(y=Math.max(s+r.fontProperties.descent,y),b*a+p>=o){if(0===p)throw Error(`[BitmapFont] textureWidth ${o}px is too small (fontFamily: '${d.fontFamily}', fontSize: ${d.fontSize}px, char: '${e}')`);--t,f+=y*a,f=Math.ceil(f),p=0,y=0;continue}!function(t,e,r,i,s,n,a){let o=r.text,h=r.fontProperties;e.translate(i,s),e.scale(n,n);let l=a.strokeThickness/2,u=-(a.strokeThickness/2);if(e.font=a.toFontString(),e.lineWidth=a.strokeThickness,e.textBaseline=a.textBaseline,e.lineJoin=a.lineJoin,e.miterLimit=a.miterLimit,e.fillStyle=function(t,e,r,i,s,n){let a;let o=r.fill;if(!Array.isArray(o))return o;if(1===o.length)return o[0];let h=r.dropShadow?r.dropShadowDistance:0,l=r.padding||0,u=t.width/i-h-2*l,d=t.height/i-h-2*l,c=o.slice(),p=r.fillGradientStops.slice();if(!p.length){let t=c.length+1;for(let e=1;e<t;++e)p.push(e/t)}if(c.unshift(o[0]),p.unshift(0),c.push(o[o.length-1]),p.push(1),r.fillGradientType===h9.LINEAR_VERTICAL){a=e.createLinearGradient(u/2,l,u/2,d+l);let t=0,i=(n.fontProperties.fontSize+r.strokeThickness)/d;for(let e=0;e<s.length;e++){let r=n.lineHeight*e;for(let e=0;e<c.length;e++){let s=0;s="number"==typeof p[e]?p[e]:e/c.length;let n=r/d+s*i,o=Math.max(t,n);o=Math.min(o,1),a.addColorStop(o,c[e]),t=o}}}else{a=e.createLinearGradient(l,d/2,u+l,d/2);let t=c.length+1,r=1;for(let e=0;e<c.length;e++){let i;i="number"==typeof p[e]?p[e]:r/t,a.addColorStop(i,c[e]),r++}}return a}(t,e,a,n,[o],r),e.strokeStyle=a.stroke,a.dropShadow){let t=a.dropShadowColor,r=a.dropShadowBlur*n,i=a.dropShadowDistance*n;e.shadowColor=iQ.shared.setValue(t).setAlpha(a.dropShadowAlpha).toRgbaString(),e.shadowBlur=r,e.shadowOffsetX=Math.cos(a.dropShadowAngle)*i,e.shadowOffsetY=Math.sin(a.dropShadowAngle)*i}else e.shadowColor="black",e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0;a.stroke&&a.strokeThickness&&e.strokeText(o,l,u+r.lineHeight-h.descent),a.fill&&e.fillText(o,l,u+r.lineHeight-h.descent),e.setTransform(1,0,0,1,0,0),e.fillStyle="rgba(0, 0, 0, 0)"}(m,g,r,p,f,a,d);let E=lU(r.text);c.char.push({id:E,page:x.length-1,x:p/a,y:f/a,width:b,height:s,xoffset:0,yoffset:0,xadvance:i-(d.dropShadow?d.dropShadowDistance:0)-(d.stroke?d.strokeThickness:0)}),p+=(b+2*n)*a,p=Math.ceil(p)}if(!i?.skipKerning)for(let t=0,e=u.length;t<e;t++){let r=u[t];for(let t=0;t<e;t++){let e=u[t],i=g.measureText(r).width,s=g.measureText(e).width,n=g.measureText(r+e).width-(i+s);n&&c.kerning.push({first:lU(r),second:lU(e),amount:n})}}let b=new t(c,x,!0);return void 0!==t.available[e]&&t.uninstall(e),t.available[e]=b,b}};lG.ALPHA=[["a","z"],["A","Z"]," "],/**
* This character set includes all decimal digits (from 0 to 9).
* @type {string[][]}
* @example
* BitmapFont.from('ExampleFont', style, { chars: BitmapFont.NUMERIC })
*/lG.NUMERIC=[["0","9"]],/**
* This character set is the union of `BitmapFont.ALPHA` and `BitmapFont.NUMERIC`.
* @type {string[][]}
*/lG.ALPHANUMERIC=[["a","z"],["A","Z"],["0","9"]," "],/**
* This character set consists of all the ASCII table.
* @member {string[][]}
* @see http://www.asciitable.com/
*/lG.ASCII=[[" ","~"]],/**
* Collection of default options when using `BitmapFont.from`.
* @property {number} [resolution=1] -
* @property {number} [textureWidth=512] -
* @property {number} [textureHeight=512] -
* @property {number} [padding=4] -
* @property {string|string[]|string[][]} chars = PIXI.BitmapFont.ALPHANUMERIC
*/lG.defaultOptions={resolution:1,textureWidth:512,textureHeight:512,padding:4,chars:lG.ALPHANUMERIC},/** Collection of available/installed fonts. */lG.available={};var lH=`// Pixi texture info\r
varying vec2 vTextureCoord;\r
uniform sampler2D uSampler;\r
\r
// Tint\r
uniform vec4 uColor;\r
\r
// on 2D applications fwidth is screenScale / glyphAtlasScale * distanceFieldRange\r
uniform float uFWidth;\r
\r
void main(void) {\r
\r
  // To stack MSDF and SDF we need a non-pre-multiplied-alpha texture.\r
  vec4 texColor = texture2D(uSampler, vTextureCoord);\r
\r
  // MSDF\r
  float median = texColor.r + texColor.g + texColor.b -\r
                  min(texColor.r, min(texColor.g, texColor.b)) -\r
                  max(texColor.r, max(texColor.g, texColor.b));\r
  // SDF\r
  median = min(median, texColor.a);\r
\r
  float screenPxDistance = uFWidth * (median - 0.5);\r
  float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);\r
  if (median < 0.01) {\r
    alpha = 0.0;\r
  } else if (median > 0.99) {\r
    alpha = 1.0;\r
  }\r
\r
  // Gamma correction for coverage-like alpha\r
  float luma = dot(uColor.rgb, vec3(0.299, 0.587, 0.114));\r
  float gamma = mix(1.0, 1.0 / 2.2, luma);\r
  float coverage = pow(uColor.a * alpha, gamma);  \r
\r
  // NPM Textures, NPM outputs\r
  gl_FragColor = vec4(uColor.rgb, coverage);\r
}\r
`,lj=`// Mesh material default fragment\r
attribute vec2 aVertexPosition;\r
attribute vec2 aTextureCoord;\r
\r
uniform mat3 projectionMatrix;\r
uniform mat3 translationMatrix;\r
uniform mat3 uTextureMatrix;\r
\r
varying vec2 vTextureCoord;\r
\r
void main(void)\r
{\r
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\r
\r
    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;\r
}\r
`;const lX=[],lV=[],lz=[],lW=class t extends a5{/**
   * @param text - A string that you would like the text to display.
   * @param style - The style parameters.
   * @param {string} style.fontName - The installed BitmapFont name.
   * @param {number} [style.fontSize] - The size of the font in pixels, e.g. 24. If undefined,
   *.     this will default to the BitmapFont size.
   * @param {string} [style.align='left'] - Alignment for multiline text ('left', 'center', 'right' or 'justify'),
   *      does not affect single line text.
   * @param {PIXI.ColorSource} [style.tint=0xFFFFFF] - The tint color.
   * @param {number} [style.letterSpacing=0] - The amount of spacing between letters.
   * @param {number} [style.maxWidth=0] - The max width of the text before line wrapping.
   */constructor(e,r={}){super();let{align:i,tint:s,maxWidth:n,letterSpacing:a,fontName:o,fontSize:h}=Object.assign({},t.styleDefaults,r);if(!lG.available[o])throw Error(`Missing BitmapFont "${o}"`);this._activePagesMeshData=[],this._textWidth=0,this._textHeight=0,this._align=i,this._tintColor=new iQ(s),this._font=void 0,this._fontName=o,this._fontSize=h,this.text=e,this._maxWidth=n,this._maxLineHeight=0,this._letterSpacing=a,this._anchor=new na(()=>{this.dirty=!0},this,0,0),this._roundPixels=tl.ROUND_PIXELS,this.dirty=!0,this._resolution=tl.RESOLUTION,this._autoResolution=!0,this._textureCache={}}/** Renders text and updates it when needed. This should only be called if the BitmapFont is regenerated. */updateText(){let t=lG.available[this._fontName],e=this.fontSize,r=e/t.size,i=new s0,s=[],n=[],a=[],o=this._text.replace(/(?:\r\n|\r)/g,`
`)||" ",h=lk(o),l=this._maxWidth*t.size/e,u="none"===t.distanceFieldType?lX:lV,d=null,c=0,p=0,f=0,m=-1,g=0,_=0,y=0,v=0;for(let e=0;e<h.length;e++){let r=h[e],o=lU(r);if(/(?:\s)/.test(r)&&(m=e,g=c,v++),"\r"===r||r===`
`){n.push(c),a.push(-1),p=Math.max(p,c),++f,++_,i.x=0,i.y+=t.lineHeight,d=null,v=0;continue}let u=t.chars[o];if(!u)continue;d&&u.kerning[d]&&(i.x+=u.kerning[d]);let x=lz.pop()||{texture:nZ.EMPTY,line:0,charCode:0,prevSpaces:0,position:new s0};x.texture=u.texture,x.line=f,x.charCode=o,x.position.x=Math.round(i.x+u.xOffset+this._letterSpacing/2),x.position.y=Math.round(i.y+u.yOffset),x.prevSpaces=v,s.push(x),c=x.position.x+Math.max(u.xAdvance-u.xOffset,u.texture.orig.width),i.x+=u.xAdvance+this._letterSpacing,y=Math.max(y,u.yOffset+u.texture.height),d=o,-1!==m&&l>0&&i.x>l&&(++_,tC.removeItems(s,1+m-_,1+e-m),e=m,m=-1,n.push(g),a.push(s.length>0?s[s.length-1].prevSpaces:0),p=Math.max(p,g),f++,i.x=0,i.y+=t.lineHeight,d=null,v=0)}let x=h[h.length-1];"\r"!==x&&x!==`
`&&(/(?:\s)/.test(x)&&(c=g),n.push(c),p=Math.max(p,c),a.push(-1));let b=[];for(let t=0;t<=f;t++){let e=0;"right"===this._align?e=p-n[t]:"center"===this._align?e=(p-n[t])/2:"justify"===this._align&&(e=a[t]<0?0:(p-n[t])/a[t]),b.push(e)}let E=s.length,T={},A=[],S=this._activePagesMeshData;u.push(...S);for(let e=0;e<E;e++){let r=s[e].texture,i=r.baseTexture.uid;if(!T[i]){let e=u.pop();if(!e){let r,i;let s=new h1;"none"===t.distanceFieldType?(r=new h4(nZ.EMPTY),i=W.NORMAL):(r=new h4(nZ.EMPTY,{program:nw.from(lj,lH),uniforms:{uFWidth:0}}),i=W.NORMAL_NPM);let n=new h0(s,r);n.blendMode=i,e={index:0,indexCount:0,vertexCount:0,uvsCount:0,total:0,mesh:n,vertices:null,uvs:null,indices:null}}e.index=0,e.indexCount=0,e.vertexCount=0,e.uvsCount=0,e.total=0;let{_textureCache:s}=this;s[i]=s[i]||new nZ(r.baseTexture),e.mesh.texture=s[i],e.mesh.tint=this._tintColor.value,A.push(e),T[i]=e}T[i].total++}for(let t=0;t<S.length;t++)A.includes(S[t])||this.removeChild(S[t].mesh);for(let t=0;t<A.length;t++)A[t].mesh.parent!==this&&this.addChild(A[t].mesh);for(let t in this._activePagesMeshData=A,T){let e=T[t],r=e.total;if(!(e.indices?.length>6*r)||e.vertices.length<2*h0.BATCHABLE_SIZE)e.vertices=new Float32Array(8*r),e.uvs=new Float32Array(8*r),e.indices=new Uint16Array(6*r);else{let t=e.total,r=e.vertices;for(let e=8*t;e<r.length;e++)r[e]=0}e.mesh.size=6*r}for(let t=0;t<E;t++){let e=s[t],i=e.position.x+b[e.line]*("justify"===this._align?e.prevSpaces:1);this._roundPixels&&(i=Math.round(i));let n=i*r,a=e.position.y*r,o=e.texture,h=T[o.baseTexture.uid],l=o.frame,u=o._uvs,d=h.index++;h.indices[6*d+0]=0+4*d,h.indices[6*d+1]=1+4*d,h.indices[6*d+2]=2+4*d,h.indices[6*d+3]=0+4*d,h.indices[6*d+4]=2+4*d,h.indices[6*d+5]=3+4*d,h.vertices[8*d+0]=n,h.vertices[8*d+1]=a,h.vertices[8*d+2]=n+l.width*r,h.vertices[8*d+3]=a,h.vertices[8*d+4]=n+l.width*r,h.vertices[8*d+5]=a+l.height*r,h.vertices[8*d+6]=n,h.vertices[8*d+7]=a+l.height*r,h.uvs[8*d+0]=u.x0,h.uvs[8*d+1]=u.y0,h.uvs[8*d+2]=u.x1,h.uvs[8*d+3]=u.y1,h.uvs[8*d+4]=u.x2,h.uvs[8*d+5]=u.y2,h.uvs[8*d+6]=u.x3,h.uvs[8*d+7]=u.y3}for(let e in this._textWidth=p*r,this._textHeight=(i.y+t.lineHeight)*r,T){let t=T[e];if(0!==this.anchor.x||0!==this.anchor.y){let e=0,r=this._textWidth*this.anchor.x,i=this._textHeight*this.anchor.y;for(let s=0;s<t.total;s++)t.vertices[e++]-=r,t.vertices[e++]-=i,t.vertices[e++]-=r,t.vertices[e++]-=i,t.vertices[e++]-=r,t.vertices[e++]-=i,t.vertices[e++]-=r,t.vertices[e++]-=i}this._maxLineHeight=y*r;let i=t.mesh.geometry.getBuffer("aVertexPosition"),s=t.mesh.geometry.getBuffer("aTextureCoord"),n=t.mesh.geometry.getIndex();i.data=t.vertices,s.data=t.uvs,n.data=t.indices,i.update(),s.update(),n.update()}for(let t=0;t<s.length;t++)lz.push(s[t]);this._font=t,this.dirty=!1}updateTransform(){this.validate(),this.containerUpdateTransform()}_render(t){this._autoResolution&&this._resolution!==t.resolution&&(this._resolution=t.resolution,this.dirty=!0);let{distanceFieldRange:e,distanceFieldType:r,size:i}=lG.available[this._fontName];if("none"!==r){let{a:r,b:s,c:n,d:a}=this.worldTransform,o=(Math.abs(Math.sqrt(r*r+s*s))+Math.abs(Math.sqrt(n*n+a*a)))/2,h=this.fontSize/i,l=t._view.resolution;for(let t of this._activePagesMeshData)t.mesh.shader.uniforms.uFWidth=o*e*h*l}super._render(t)}/**
   * Validates text before calling parent's getLocalBounds
   * @returns - The rectangular bounding area
   */getLocalBounds(){return this.validate(),super.getLocalBounds()}/**
   * Updates text when needed
   * @private
   */validate(){let t=lG.available[this._fontName];if(!t)throw Error(`Missing BitmapFont "${this._fontName}"`);this._font!==t&&(this.dirty=!0),this.dirty&&this.updateText()}/**
   * The tint of the BitmapText object.
   * @default 0xffffff
   */get tint(){return this._tintColor.value}set tint(t){if(this.tint!==t){this._tintColor.setValue(t);for(let e=0;e<this._activePagesMeshData.length;e++)this._activePagesMeshData[e].mesh.tint=t}}/**
   * The alignment of the BitmapText object.
   * @member {string}
   * @default 'left'
   */get align(){return this._align}set align(t){this._align!==t&&(this._align=t,this.dirty=!0)}/** The name of the BitmapFont. */get fontName(){return this._fontName}set fontName(t){if(!lG.available[t])throw Error(`Missing BitmapFont "${t}"`);this._fontName!==t&&(this._fontName=t,this.dirty=!0)}/** The size of the font to display. */get fontSize(){return this._fontSize??lG.available[this._fontName].size}set fontSize(t){this._fontSize!==t&&(this._fontSize=t,this.dirty=!0)}/**
   * The anchor sets the origin point of the text.
   *
   * The default is `(0,0)`, this means the text's origin is the top left.
   *
   * Setting the anchor to `(0.5,0.5)` means the text's origin is centered.
   *
   * Setting the anchor to `(1,1)` would mean the text's origin point will be the bottom right corner.
   */get anchor(){return this._anchor}set anchor(t){"number"==typeof t?this._anchor.set(t):this._anchor.copyFrom(t)}/** The text of the BitmapText object. */get text(){return this._text}set text(t){t=String(t??""),this._text!==t&&(this._text=t,this.dirty=!0)}/**
   * The max width of this bitmap text in pixels. If the text provided is longer than the
   * value provided, line breaks will be automatically inserted in the last whitespace.
   * Disable by setting the value to 0.
   */get maxWidth(){return this._maxWidth}set maxWidth(t){this._maxWidth!==t&&(this._maxWidth=t,this.dirty=!0)}/**
   * The max line height. This is useful when trying to use the total height of the Text,
   * i.e. when trying to vertically align.
   * @readonly
   */get maxLineHeight(){return this.validate(),this._maxLineHeight}/**
   * The width of the overall text, different from fontSize,
   * which is defined in the style object.
   * @readonly
   */get textWidth(){return this.validate(),this._textWidth}/** Additional space between characters. */get letterSpacing(){return this._letterSpacing}set letterSpacing(t){this._letterSpacing!==t&&(this._letterSpacing=t,this.dirty=!0)}/**
   * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
   * Advantages can include sharper image quality (like text) and faster rendering on canvas.
   * The main disadvantage is movement of objects may appear less smooth.
   * To set the global default, change {@link PIXI.settings.ROUND_PIXELS}
   * @default PIXI.settings.ROUND_PIXELS
   */get roundPixels(){return this._roundPixels}set roundPixels(t){t!==this._roundPixels&&(this._roundPixels=t,this.dirty=!0)}/**
   * The height of the overall text, different from fontSize,
   * which is defined in the style object.
   * @readonly
   */get textHeight(){return this.validate(),this._textHeight}/**
   * The resolution / device pixel ratio of the canvas.
   *
   * This is set to automatically match the renderer resolution by default, but can be overridden by setting manually.
   * @default 1
   */get resolution(){return this._resolution}set resolution(t){this._autoResolution=!1,this._resolution!==t&&(this._resolution=t,this.dirty=!0)}destroy(t){let{_textureCache:e}=this,r="none"===lG.available[this._fontName].distanceFieldType?lX:lV;for(let t of(r.push(...this._activePagesMeshData),this._activePagesMeshData))this.removeChild(t.mesh);for(let t in this._activePagesMeshData=[],r.filter(t=>e[t.mesh.texture.baseTexture.uid]).forEach(t=>{t.mesh.texture=nZ.EMPTY}),e)e[t].destroy(),delete e[t];this._font=null,this._tintColor=null,this._textureCache=null,super.destroy(t)}};lW.styleDefaults={align:"left",tint:16777215,maxWidth:0,letterSpacing:0};const l$=[".xml",".fnt"],lY={extension:{type:sS.LoadParser,priority:oL.Normal},name:"loadBitmapFont",test:t=>l$.includes(tC.path.extname(t).toLowerCase()),testParse:async t=>lB.test(t)||lF.test(t),async parse(t,e,r){let i=lB.test(t)?lB.parse(t):lF.parse(t),{src:s}=e,{page:n}=i,a=[];for(let t=0;t<n.length;++t){let e=n[t].file,r=tC.path.join(tC.path.dirname(s),e);r=oO(r,s),a.push(r)}let o=await r.load(a),h=a.map(t=>o[t]);return lG.install(i,h,!0)},load:async(t,e)=>(await tl.ADAPTER.fetch(t)).text(),unload(t){t.destroy()}};sI.add(lY);const lq=class t extends ls{constructor(){super(...arguments),this._fonts=[],this._overrides=[],this._stylesheet="",this.fontsDirty=!1}/**
   * Convert a TextStyle to HTMLTextStyle
   * @param originalStyle
   * @example
   * import {TextStyle } from 'pixi.js';
   * import {HTMLTextStyle} from '@pixi/text-html';
   * const style = new TextStyle();
   * const htmlStyle = HTMLTextStyle.from(style);
   */static from(e){return new t(Object.keys(t.defaultOptions).reduce((t,r)=>({...t,[r]:e[r]}),{}))}/** Clear the current font */cleanFonts(){this._fonts.length>0&&(this._fonts.forEach(e=>{URL.revokeObjectURL(e.src),e.refs--,0===e.refs&&(e.fontFace&&document.fonts.delete(e.fontFace),delete t.availableFonts[e.originalUrl])}),this.fontFamily="Arial",this._fonts.length=0,this.styleID++,this.fontsDirty=!0)}/**
   * Because of how HTMLText renders, fonts need to be imported
   * @param url
   * @param options
   */loadFont(e,r={}){let{availableFonts:i}=t;if(i[e]){let t=i[e];return this._fonts.push(t),t.refs++,this.styleID++,this.fontsDirty=!0,Promise.resolve()}return tl.ADAPTER.fetch(e).then(t=>t.blob()).then(async t=>new Promise((e,r)=>{let i=URL.createObjectURL(t),s=new FileReader;s.onload=()=>e([i,s.result]),s.onerror=r,s.readAsDataURL(t)})).then(async([t,s])=>{let n=Object.assign({family:tC.path.basename(e,tC.path.extname(e)),weight:"normal",style:"normal",display:"auto",src:t,dataSrc:s,refs:1,originalUrl:e,fontFace:null},r);i[e]=n,this._fonts.push(n),this.styleID++;let a=new FontFace(n.family,`url(${n.src})`,{weight:n.weight,style:n.style,display:n.display});n.fontFace=a,await a.load(),document.fonts.add(a),await document.fonts.ready,this.styleID++,this.fontsDirty=!0})}/**
   * Add a style override, this can be any CSS property
   * it will override any built-in style. This is the
   * property and the value as a string (e.g., `color: red`).
   * This will override any other internal style.
   * @param {string} value - CSS style(s) to add.
   * @example
   * style.addOverride('background-color: red');
   */addOverride(...t){let e=t.filter(t=>!this._overrides.includes(t));e.length>0&&(this._overrides.push(...e),this.styleID++)}/**
   * Remove any overrides that match the value.
   * @param {string} value - CSS style to remove.
   * @example
   * style.removeOverride('background-color: red');
   */removeOverride(...t){let e=t.filter(t=>this._overrides.includes(t));e.length>0&&(this._overrides=this._overrides.filter(t=>!e.includes(t)),this.styleID++)}/**
   * Internally converts all of the style properties into CSS equivalents.
   * @param scale
   * @returns The CSS style string, for setting `style` property of root HTMLElement.
   */toCSS(t){return[`transform: scale(${t})`,"transform-origin: top left","display: inline-block",`color: ${this.normalizeColor(this.fill)}`,`font-size: ${this.fontSize}px`,`font-family: ${this.fontFamily}`,`font-weight: ${this.fontWeight}`,`font-style: ${this.fontStyle}`,`font-variant: ${this.fontVariant}`,`letter-spacing: ${this.letterSpacing}px`,`text-align: ${this.align}`,`padding: ${this.padding}px`,`white-space: ${this.whiteSpace}`,...this.lineHeight?[`line-height: ${this.lineHeight}px`]:[],...this.wordWrap?[`word-wrap: ${this.breakWords?"break-all":"break-word"}`,`max-width: ${this.wordWrapWidth}px`]:[],...this.strokeThickness?[`-webkit-text-stroke-width: ${this.strokeThickness}px`,`-webkit-text-stroke-color: ${this.normalizeColor(this.stroke)}`,`text-stroke-width: ${this.strokeThickness}px`,`text-stroke-color: ${this.normalizeColor(this.stroke)}`,"paint-order: stroke"]:[],...this.dropShadow?[this.dropShadowToCSS()]:[],...this._overrides].join(";")}/** Get the font CSS styles from the loaded font, If available. */toGlobalCSS(){return this._fonts.reduce((t,e)=>`${t}
            @font-face {
                font-family: "${e.family}";
                src: url('${e.dataSrc}');
                font-weight: ${e.weight};
                font-style: ${e.style};
                font-display: ${e.display};
            }`,this._stylesheet)}/** Internal stylesheet contents, useful for creating rules for rendering */get stylesheet(){return this._stylesheet}set stylesheet(t){this._stylesheet!==t&&(this._stylesheet=t,this.styleID++)}/**
   * Convert numerical colors into hex-strings
   * @param color
   */normalizeColor(t){return Array.isArray(t)&&(t=tC.rgb2hex(t)),"number"==typeof t?tC.hex2string(t):t}/** Convert the internal drop-shadow settings to CSS text-shadow */dropShadowToCSS(){let t=this.normalizeColor(this.dropShadowColor),e=this.dropShadowAlpha,r=Math.round(Math.cos(this.dropShadowAngle)*this.dropShadowDistance),i=Math.round(Math.sin(this.dropShadowAngle)*this.dropShadowDistance);t.startsWith("#")&&e<1&&(t+=(255*e|0).toString(16).padStart(2,"0"));let s=`${r}px ${i}px`;return this.dropShadowBlur>0?`text-shadow: ${s} ${this.dropShadowBlur}px ${t}`:`text-shadow: ${s} ${t}`}/** Resets all properties to the defaults specified in TextStyle.prototype._default */reset(){Object.assign(this,t.defaultOptions)}/**
   * Called after the image is loaded but before drawing to the canvas.
   * Mostly used to handle Safari's font loading bug.
   * @ignore
   */onBeforeDraw(){let{fontsDirty:t}=this;return this.fontsDirty=!1,this.isSafari&&this._fonts.length>0&&t?new Promise(t=>setTimeout(t,100)):Promise.resolve()}/**
   * Proving that Safari is the new IE
   * @ignore
   */get isSafari(){let{userAgent:t}=tl.ADAPTER.getNavigator();return/^((?!chrome|android).)*safari/i.test(t)}set fillGradientStops(t){console.warn("[HTMLTextStyle] fillGradientStops is not supported by HTMLText")}get fillGradientStops(){return super.fillGradientStops}set fillGradientType(t){console.warn("[HTMLTextStyle] fillGradientType is not supported by HTMLText")}get fillGradientType(){return super.fillGradientType}set miterLimit(t){console.warn("[HTMLTextStyle] miterLimit is not supported by HTMLText")}get miterLimit(){return super.miterLimit}set trim(t){console.warn("[HTMLTextStyle] trim is not supported by HTMLText")}get trim(){return super.trim}set textBaseline(t){console.warn("[HTMLTextStyle] textBaseline is not supported by HTMLText")}get textBaseline(){return super.textBaseline}set leading(t){console.warn("[HTMLTextStyle] leading is not supported by HTMLText")}get leading(){return super.leading}set lineJoin(t){console.warn("[HTMLTextStyle] lineJoin is not supported by HTMLText")}get lineJoin(){return super.lineJoin}};lq.availableFonts={},/**
* List of default options, these are largely the same as TextStyle,
* with the exception of whiteSpace, which is set to 'normal' by default.
*/lq.defaultOptions={/** Align */align:"left",/** Break words */breakWords:!1,/** Drop shadow */dropShadow:!1,/** Drop shadow alpha */dropShadowAlpha:1,/**
   * Drop shadow angle
   * @type {number}
   * @default Math.PI / 6
   */dropShadowAngle:Math.PI/6,/** Drop shadow blur */dropShadowBlur:0,/** Drop shadow color */dropShadowColor:"black",/** Drop shadow distance */dropShadowDistance:5,/** Fill */fill:"black",/** Font family */fontFamily:"Arial",/** Font size */fontSize:26,/** Font style */fontStyle:"normal",/** Font variant */fontVariant:"normal",/** Font weight */fontWeight:"normal",/** Letter spacing */letterSpacing:0,/** Line height */lineHeight:0,/** Padding */padding:0,/** Stroke */stroke:"black",/** Stroke thickness */strokeThickness:0,/** White space */whiteSpace:"normal",/** Word wrap */wordWrap:!1,/** Word wrap width */wordWrapWidth:100};const lK=class t extends a7{/**
   * @param {string} [text] - Text contents
   * @param {PIXI.HTMLTextStyle|PIXI.TextStyle|PIXI.ITextStyle} [style] - Style setting to use.
   *        Strongly recommend using an HTMLTextStyle object. Providing a PIXI.TextStyle
   *        will convert the TextStyle to an HTMLTextStyle and will no longer be linked.
   */constructor(e="",r={}){super(nZ.EMPTY),this._text=null,this._style=null,this._autoResolution=!0,this.localStyleID=-1,this.dirty=!1,this._updateID=0,this.ownsStyle=!1;let i=new Image,s=nZ.from(i,{scaleMode:tl.SCALE_MODE,resourceOptions:{autoLoad:!1}});s.orig=new s2,s.trim=new s2,this.texture=s;let n="http://www.w3.org/2000/svg",a="http://www.w3.org/1999/xhtml",o=document.createElementNS(n,"svg"),h=document.createElementNS(n,"foreignObject"),l=document.createElementNS(a,"div"),u=document.createElementNS(a,"style");h.setAttribute("width","10000"),h.setAttribute("height","10000"),h.style.overflow="hidden",o.appendChild(h),this.maxWidth=t.defaultMaxWidth,this.maxHeight=t.defaultMaxHeight,this._domElement=l,this._styleElement=u,this._svgRoot=o,this._foreignObject=h,this._foreignObject.appendChild(u),this._foreignObject.appendChild(l),this._image=i,this._loadImage=new Image,this._autoResolution=t.defaultAutoResolution,this._resolution=t.defaultResolution??tl.RESOLUTION,this.text=e,this.style=r}/**
   * Calculate the size of the output text without actually drawing it.
   * This includes the `padding` in the `style` object.
   * This can be used as a fast-pass to do things like text-fitting.
   * @param {object} [overrides] - Overrides for the text, style, and resolution.
   * @param {string} [overrides.text] - The text to measure, if not specified, the current text is used.
   * @param {PIXI.HTMLTextStyle} [overrides.style] - The style to measure, if not specified, the current style is used.
   * @param {number} [overrides.resolution] - The resolution to measure, if not specified, the current resolution is used.
   * @returns {PIXI.ISize} Width and height of the measured text.
   */measureText(t){let{text:e,style:r,resolution:i}=Object.assign({text:this._text,style:this._style,resolution:this._resolution},t);Object.assign(this._domElement,{innerHTML:e,style:r.toCSS(i)}),this._styleElement.textContent=r.toGlobalCSS(),document.body.appendChild(this._svgRoot);let s=this._domElement.getBoundingClientRect();this._svgRoot.remove();let{width:n,height:a}=s;(n>this.maxWidth||a>this.maxHeight)&&console.warn("[HTMLText] Large expanse of text, increase HTMLText.maxWidth or HTMLText.maxHeight property.");let o=Math.min(this.maxWidth,Math.ceil(n)),h=Math.min(this.maxHeight,Math.ceil(a));return this._svgRoot.setAttribute("width",o.toString()),this._svgRoot.setAttribute("height",h.toString()),e!==this._text&&(this._domElement.innerHTML=this._text),r!==this._style&&(Object.assign(this._domElement,{style:this._style?.toCSS(i)}),this._styleElement.textContent=this._style?.toGlobalCSS()),{width:o+2*r.padding,height:h+2*r.padding}}/**
   * Manually refresh the text.
   * @public
   * @param {boolean} respectDirty - Whether to abort updating the
   *        text if the Text isn't dirty and the function is called.
   */async updateText(t=!0){let{style:e,_image:r,_loadImage:i}=this;if(this.localStyleID!==e.styleID&&(this.dirty=!0,this.localStyleID=e.styleID),!this.dirty&&t)return;let{width:s,height:n}=this.measureText();r.width=i.width=Math.ceil(Math.max(1,s)),r.height=i.height=Math.ceil(Math.max(1,n)),this._updateID++;let a=this._updateID;await new Promise(t=>{i.onload=async()=>{if(a<this._updateID){t();return}await e.onBeforeDraw(),r.src=i.src,i.onload=null,i.src="",this.updateTexture(),t()};let s=new XMLSerializer().serializeToString(this._svgRoot);i.src=`data:image/svg+xml;charset=utf8,${encodeURIComponent(s)}`})}/** The raw image element that is rendered under-the-hood. */get source(){return this._image}/**
   * Update the texture resource.
   * @private
   */updateTexture(){let{style:t,texture:e,_image:r,resolution:i}=this,{padding:s}=t,{baseTexture:n}=e;e.trim.width=e._frame.width=r.width/i,e.trim.height=e._frame.height=r.height/i,e.trim.x=-s,e.trim.y=-s,e.orig.width=e._frame.width-2*s,e.orig.height=e._frame.height-2*s,this._onTextureUpdate(),n.setRealSize(r.width,r.height,i),this.dirty=!1}/**
   * Renders the object using the WebGL renderer
   * @param {PIXI.Renderer} renderer - The renderer
   * @private
   */_render(t){this._autoResolution&&this._resolution!==t.resolution&&(this._resolution=t.resolution,this.dirty=!0),this.updateText(!0),super._render(t)}/**
   * Renders the object using the Canvas Renderer.
   * @private
   * @param {PIXI.CanvasRenderer} renderer - The renderer
   */_renderCanvas(t){this._autoResolution&&this._resolution!==t.resolution&&(this._resolution=t.resolution,this.dirty=!0),this.updateText(!0),super._renderCanvas(t)}/**
   * Get the local bounds.
   * @param {PIXI.Rectangle} rect - Input rectangle.
   * @returns {PIXI.Rectangle} Local bounds
   */getLocalBounds(t){return this.updateText(!0),super.getLocalBounds(t)}_calculateBounds(){this.updateText(!0),this.calculateVertices(),this._bounds.addQuad(this.vertexData)}/**
   * Handle dirty style changes
   * @private
   */_onStyleChange(){this.dirty=!0}/**
   * Destroy this Text object. Don't use after calling.
   * @param {boolean|object} options - Same as Sprite destroy options.
   */destroy(e){"boolean"==typeof e&&(e={children:e}),e=Object.assign({},t.defaultDestroyOptions,e),super.destroy(e),this.ownsStyle&&this._style?.cleanFonts(),this._style=null,this._svgRoot?.remove(),this._svgRoot=null,this._domElement?.remove(),this._domElement=null,this._foreignObject?.remove(),this._foreignObject=null,this._styleElement?.remove(),this._styleElement=null,this._loadImage.src="",this._loadImage.onload=null,this._loadImage=null,this._image.src="",this._image=null}/**
   * Get the width in pixels.
   * @member {number}
   */get width(){return this.updateText(!0),Math.abs(this.scale.x)*this._image.width/this.resolution}set width(t){this.updateText(!0);let e=tC.sign(this.scale.x)||1;this.scale.x=e*t/this._image.width/this.resolution,this._width=t}/**
   * Get the height in pixels.
   * @member {number}
   */get height(){return this.updateText(!0),Math.abs(this.scale.y)*this._image.height/this.resolution}set height(t){this.updateText(!0);let e=tC.sign(this.scale.y)||1;this.scale.y=e*t/this._image.height/this.resolution,this._height=t}/** The base style to render with text. */get style(){return this._style}set style(t){this._style!==t&&((t=t||{})instanceof lq?(this.ownsStyle=!1,this._style=t):t instanceof ls?(console.warn("[HTMLText] Cloning TextStyle, if this is not what you want, use HTMLTextStyle"),this.ownsStyle=!0,this._style=lq.from(t)):(this.ownsStyle=!0,this._style=new lq(t)),this.localStyleID=-1,this.dirty=!0)}/**
   * Contents of text. This can be HTML text and include tags.
   * @example
   * const text = new HTMLText('This is a <em>styled</em> text!');
   * @member {string}
   */get text(){return this._text}set text(t){t=String(""===t||null==t?" ":t),t=this.sanitiseText(t),this._text!==t&&(this._text=t,this.dirty=!0)}/**
   * The resolution / device pixel ratio of the canvas.
   * This is set to automatically match the renderer resolution by default, but can be overridden by setting manually.
   * @member {number}
   * @default 1
   */get resolution(){return this._resolution}set resolution(t){this._autoResolution=!1,this._resolution!==t&&(this._resolution=t,this.dirty=!0)}/**
   * Sanitise text - replace `<br>` with `<br/>`, `&nbsp;` with `&#160;`
   * @param text
   * @see https://www.sitepoint.com/community/t/xhtml-1-0-transitional-xml-parsing-error-entity-nbsp-not-defined/3392/3
   */sanitiseText(t){return t.replace(/<br>/gi,"<br/>").replace(/<hr>/gi,"<hr/>").replace(/&nbsp;/gi,"&#160;")}};lK.defaultDestroyOptions={texture:!0,children:!1,baseTexture:!0},/** Default maxWidth, set at construction */lK.defaultMaxWidth=2024,/** Default maxHeight, set at construction */lK.defaultMaxHeight=2024,/** Default autoResolution for all HTMLText objects */lK.defaultAutoResolution=!0;const lZ=new ow({background:"#333",resizeTo:window});document.body.appendChild(lZ.view);const lQ=new lh("DND Torch Game",{fontSize:50,fill:"#fff"});lZ.stage.addChild(lQ);let lJ=0;lZ.ticker.add(t=>{lJ+=t,lQ.y=20*Math.sin(lJ/100)+50,lQ.x=20*Math.sin(lJ/80)+50,lQ.angle=3*Math.sin(lJ/120),lQ.scale.set(Math.sin(lJ/60)/5+1)});//# sourceMappingURL=index.3f43cc62.js.map

//# sourceMappingURL=index.3f43cc62.js.map
