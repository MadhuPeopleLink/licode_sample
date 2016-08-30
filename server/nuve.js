/*
*/
/*
 MIT
*/
var Url=require("url"),spawn=require("child_process").spawn,fs=require("fs"),XMLHttpRequest=function(){var b=this,o=require("http"),p=require("https"),j,c,e={},n={"User-Agent":"node.js",Accept:"*/*"},h=!1,l=!1,m=n;this.UNSENT=0;this.OPENED=1;this.HEADERS_RECEIVED=2;this.LOADING=3;this.DONE=4;this.readyState=this.UNSENT;this.onreadystatechange=null;this.responseXML=this.responseText="";this.statusText=this.status=null;this.open=function(a,b,f,c,g){e={method:a,url:b.toString(),async:"boolean"!==typeof f?
!0:f,user:c||null,password:g||null};this.abort();i(this.OPENED)};this.setRequestHeader=function(a,b){if(this.readyState!=this.OPENED)throw"INVALID_STATE_ERR: setRequestHeader can only be called when state is OPEN";if(h)throw"INVALID_STATE_ERR: send flag is true";m[a]=b};this.getResponseHeader=function(a){return this.readyState>this.OPENED&&c.headers[a]&&!l?c.headers[a]:null};this.getAllResponseHeaders=function(){if(this.readyState<this.HEADERS_RECEIVED||l)return"";var a="",b;for(b in c.headers)a+=
b+": "+c.headers[b]+"\r\n";return a.substr(0,a.length-2)};this.send=function(a){if(this.readyState!=this.OPENED)throw"INVALID_STATE_ERR: connection must be opened before send() is called";if(h)throw"INVALID_STATE_ERR: send has already been called";var k=!1,f=Url.parse(e.url);switch(f.protocol){case "https:":k=!0;case "http:":var d=f.hostname;break;case void 0:case "":d="localhost";break;default:throw"Protocol not supported.";}var g=f.port||(k?443:80),f=f.pathname+(f.search?f.search:"");this.setRequestHeader("Host",
d);if(e.user){"undefined"==typeof e.password&&(e.password="");var n=new Buffer(e.user+":"+e.password);m.Authorization="Basic "+n.toString("base64")}"GET"==e.method||"HEAD"==e.method?a=null:a&&(this.setRequestHeader("Content-Length",Buffer.byteLength(a)),m["Content-Type"]||this.setRequestHeader("Content-Type","text/plain;charset=UTF-8"));d={host:d,port:g,path:f,method:e.method,headers:m};l=!1;if(!e.hasOwnProperty("async")||e.async){k=k?p.request:o.request;h=!0;if("function"===typeof b.onreadystatechange)b.onreadystatechange();
j=k(d,function(a){c=a;c.setEncoding("utf8");i(b.HEADERS_RECEIVED);b.status=c.statusCode;c.on("data",function(a){if(a)b.responseText=b.responseText+a;h&&i(b.LOADING)});c.on("end",function(){if(h){i(b.DONE);h=false}});c.on("error",function(a){b.handleError(a)})}).on("error",function(a){b.handleError(a)});a&&j.write(a);j.end()}else{g=".node-xmlhttprequest-sync-"+process.pid;fs.writeFileSync(g,"","utf8");a="var http = require('http'), https = require('https'), fs = require('fs');var doRequest = http"+
(k?"s":"")+".request;var options = "+JSON.stringify(d)+";var responseText = '';var req = doRequest(options, function(response) {response.setEncoding('utf8');response.on('data', function(chunk) {responseText += chunk;});response.on('end', function() {fs.writeFileSync('"+g+"', 'NODE-XMLHTTPREQUEST-STATUS:' + response.statusCode + ',' + responseText, 'utf8');});response.on('error', function(error) {fs.writeFileSync('"+g+"', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');});}).on('error', function(error) {fs.writeFileSync('"+
g+"', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');});"+(a?"req.write('"+a.replace(/'/g,"\\'")+"');":"")+"req.end();";for(syncProc=spawn(process.argv[0],["-e",a]);""==(b.responseText=fs.readFileSync(g,"utf8")););syncProc.stdin.end();fs.unlinkSync(g);b.responseText.match(/^NODE-XMLHTTPREQUEST-ERROR:/)?(a=b.responseText.replace(/^NODE-XMLHTTPREQUEST-ERROR:/,""),b.handleError(a)):(b.status=b.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:([0-9]*),.*/,"$1"),b.responseText=b.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:[0-9]*,(.*)/,
"$1"),i(b.DONE))}};this.handleError=function(a){this.status=503;this.statusText=a;this.responseText=a.stack;l=!0;i(this.DONE)};this.abort=function(){j&&(j.abort(),j=null);m=n;this.responseXML=this.responseText="";l=!0;if(this.readyState!==this.UNSENT&&(this.readyState!==this.OPENED||h)&&this.readyState!==this.DONE)h=!1,i(this.DONE);this.readyState=this.UNSENT};var d={};this.addEventListener=function(a,b){a in d||(d[a]=[]);d[a].push(b)};var i=function(a){b.readyState=a;if("function"===typeof b.onreadystatechange)b.onreadystatechange();
if("readystatechange"in d)for(var a=d.readystatechange.length,c=0;c<a;c++)d.readystatechange[c].call(b)}};
var CryptoJS=CryptoJS||function(g,f){var k={},h=k.lib={},c=h.Base=function(){function i(){}return{extend:function(a){i.prototype=this;var e=new i;a&&e.mixIn(a);e.$super=this;return e},create:function(){var i=this.extend();i.init.apply(i,arguments);return i},init:function(){},mixIn:function(i){for(var a in i)i.hasOwnProperty(a)&&(this[a]=i[a]);i.hasOwnProperty("toString")&&(this.toString=i.toString)},clone:function(){return this.$super.extend(this)}}}(),e=h.WordArray=c.extend({init:function(i,a){i=
this.words=i||[];this.sigBytes=a!=f?a:4*i.length},toString:function(i){return(i||b).stringify(this)},concat:function(i){var a=this.words,e=i.words,c=this.sigBytes,i=i.sigBytes;this.clamp();if(c%4)for(var b=0;b<i;b++)a[c+b>>>2]|=(e[b>>>2]>>>24-8*(b%4)&255)<<24-8*((c+b)%4);else if(65535<e.length)for(b=0;b<i;b+=4)a[c+b>>>2]=e[b>>>2];else a.push.apply(a,e);this.sigBytes+=i;return this},clamp:function(){var a=this.words,b=this.sigBytes;a[b>>>2]&=4294967295<<32-8*(b%4);a.length=g.ceil(b/4)},clone:function(){var a=
c.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var b=[],c=0;c<a;c+=4)b.push(4294967296*g.random()|0);return e.create(b,a)}}),d=k.enc={},b=d.Hex={stringify:function(a){for(var b=a.words,a=a.sigBytes,e=[],c=0;c<a;c++){var d=b[c>>>2]>>>24-8*(c%4)&255;e.push((d>>>4).toString(16));e.push((d&15).toString(16))}return e.join("")},parse:function(a){for(var b=a.length,c=[],d=0;d<b;d+=2)c[d>>>3]|=parseInt(a.substr(d,2),16)<<24-4*(d%8);return e.create(c,b/2)}},l=d.Latin1={stringify:function(a){for(var b=
a.words,a=a.sigBytes,c=[],e=0;e<a;e++)c.push(String.fromCharCode(b[e>>>2]>>>24-8*(e%4)&255));return c.join("")},parse:function(a){for(var b=a.length,c=[],d=0;d<b;d++)c[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return e.create(c,b)}},a=d.Utf8={stringify:function(a){try{return decodeURIComponent(escape(l.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return l.parse(unescape(encodeURIComponent(a)))}},j=h.BufferedBlockAlgorithm=c.extend({reset:function(){this._data=e.create();
this._nDataBytes=0},_append:function(b){"string"==typeof b&&(b=a.parse(b));this._data.concat(b);this._nDataBytes+=b.sigBytes},_process:function(a){var b=this._data,c=b.words,d=b.sigBytes,j=this.blockSize,l=d/(4*j),l=a?g.ceil(l):g.max((l|0)-this._minBufferSize,0),a=l*j,d=g.min(4*a,d);if(a){for(var h=0;h<a;h+=j)this._doProcessBlock(c,h);h=c.splice(0,a);b.sigBytes-=d}return e.create(h,d)},clone:function(){var a=c.clone.call(this);a._data=this._data.clone();return a},_minBufferSize:0});h.Hasher=j.extend({init:function(){this.reset()},
reset:function(){j.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);this._doFinalize();return this._hash},clone:function(){var a=j.clone.call(this);a._hash=this._hash.clone();return a},blockSize:16,_createHelper:function(a){return function(b,c){return a.create(c).finalize(b)}},_createHmacHelper:function(a){return function(b,c){return o.HMAC.create(a,c).finalize(b)}}});var o=k.algo={};return k}(Math);
(function(){var g=CryptoJS,f=g.lib,k=f.WordArray,f=f.Hasher,h=[],c=g.algo.SHA1=f.extend({_doReset:function(){this._hash=k.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(c,d){for(var b=this._hash.words,l=b[0],a=b[1],j=b[2],g=b[3],i=b[4],f=0;80>f;f++){if(16>f)h[f]=c[d+f]|0;else{var k=h[f-3]^h[f-8]^h[f-14]^h[f-16];h[f]=k<<1|k>>>31}k=(l<<5|l>>>27)+i+h[f];k=20>f?k+((a&j|~a&g)+1518500249):40>f?k+((a^j^g)+1859775393):60>f?k+((a&j|a&g|j&g)-1894007588):k+((a^j^g)-
899497514);i=g;g=j;j=a<<30|a>>>2;a=l;l=k}b[0]=b[0]+l|0;b[1]=b[1]+a|0;b[2]=b[2]+j|0;b[3]=b[3]+g|0;b[4]=b[4]+i|0},_doFinalize:function(){var c=this._data,d=c.words,b=8*this._nDataBytes,f=8*c.sigBytes;d[f>>>5]|=128<<24-f%32;d[(f+64>>>9<<4)+15]=b;c.sigBytes=4*d.length;this._process()}});g.SHA1=f._createHelper(c);g.HmacSHA1=f._createHmacHelper(c)})();
(function(){var g=CryptoJS,f=g.enc.Utf8;g.algo.HMAC=g.lib.Base.extend({init:function(g,h){g=this._hasher=g.create();"string"==typeof h&&(h=f.parse(h));var c=g.blockSize,e=4*c;h.sigBytes>e&&(h=g.finalize(h));for(var d=this._oKey=h.clone(),b=this._iKey=h.clone(),l=d.words,a=b.words,j=0;j<c;j++)l[j]^=1549556828,a[j]^=909522486;d.sigBytes=b.sigBytes=e;this.reset()},reset:function(){var f=this._hasher;f.reset();f.update(this._iKey)},update:function(f){this._hasher.update(f);return this},finalize:function(f){var g=
this._hasher,f=g.finalize(f);g.reset();return g.finalize(this._oKey.clone().concat(f))}})})();var N=N||{};N.authors=["aalonsog@dit.upm.es","prodriguez@dit.upm.es","jcervino@dit.upm.es"];N.version=0.1;N=N||{};
N.Base64=function(){var g,f,k,h,c,e,d,b,l;g="A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9,+,/".split(",");f=[];for(c=0;c<g.length;c+=1)f[g[c]]=c;e=function(a){k=a;h=0};d=function(){var a;if(!k||h>=k.length)return-1;a=k.charCodeAt(h)&255;h+=1;return a};b=function(){if(!k)return-1;for(;;){if(h>=k.length)return-1;var a=k.charAt(h);h+=1;if(f[a])return f[a];if("A"===a)return 0}};l=function(a){a=a.toString(16);1===a.length&&(a=
"0"+a);return unescape("%"+a)};return{encodeBase64:function(a){var b,c,f;e(a);a="";b=Array(3);c=0;for(f=!1;!f&&-1!==(b[0]=d());)if(b[1]=d(),b[2]=d(),a+=g[b[0]>>2],-1!==b[1]?(a+=g[b[0]<<4&48|b[1]>>4],-1!==b[2]?(a+=g[b[1]<<2&60|b[2]>>6],a+=g[b[2]&63]):(a+=g[b[1]<<2&60],a+="=",f=!0)):(a+=g[b[0]<<4&48],a+="=",a+="=",f=!0),c+=4,76<=c)a+="\n",c=0;return a},decodeBase64:function(a){var c,d;e(a);a="";c=Array(4);for(d=!1;!d&&-1!==(c[0]=b())&&-1!==(c[1]=b());)c[2]=b(),c[3]=b(),a+=l(c[0]<<2&255|c[1]>>4),-1!==
c[2]?(a+=l(c[1]<<4&255|c[2]>>2),-1!==c[3]?a+=l(c[2]<<6&255|c[3]):d=!0):d=!0;return a}}}(N);N=N||{};
N.API=function(g){var f,k,h;f=function(c,e,d,b,f,a,j,o){var i,p,r,q,n,m;void 0===a?(i=g.API.params.service,p=g.API.params.key,f=g.API.params.url+f):(i=a.service,p=a.key,f=a.url+f);""===i||""===p?console.log("ServiceID and Key are required!!"):(a=(new Date).getTime(),r=Math.floor(99999*Math.random()),q=a+","+r,n="MAuth realm=http://marte3.dit.upm.es,mauth_signature_method=HMAC_SHA1",j&&o&&(j=h(j),n=n+",mauth_username="+j+",mauth_role="+o,q+=","+j+","+o),j=k(q,p),n=n+",mauth_serviceid="+i+",mauth_cnonce="+r+
",mauth_timestamp="+a+",mauth_signature="+j,m=new XMLHttpRequest,m.onreadystatechange=function(){if(m.readyState===4)switch(m.status){case 100:case 200:case 201:case 202:case 203:case 204:case 205:c(m.responseText);break;case 400:e!==void 0&&e("400 Bad Request");break;case 401:e!==void 0&&e("401 Unauthorized");break;case 403:e!==void 0&&e("403 Forbidden");break;default:e!==void 0&&e(m.status+" Error"+m.responseText)}},m.open(d,f,!0),m.setRequestHeader("Authorization",n),void 0!==b)?(m.setRequestHeader("Content-Type",
"application/json"),m.send(JSON.stringify(b))):m.send()};k=function(c,e){var d;d=CryptoJS.HmacSHA1(c,e).toString(CryptoJS.enc.Hex);return g.Base64.encodeBase64(d)};h=function(c){var c=c.toLowerCase(),e={a:"[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]",ae:"\u00e6",c:"\u00e7",e:"[\u00e8\u00e9\u00ea\u00eb]",i:"[\u00ec\u00ed\u00ee\u00ef]",n:"\u00f1",o:"[\u00f2\u00f3\u00f4\u00f5\u00f6]",oe:"\u0153",u:"[\u00f9\u00fa\u00fb\u0171\u00fc]",y:"[\u00fd\u00ff]"},d;for(d in e)c=c.replace(RegExp(e[d],"g"),d);return c};
return{params:{service:void 0,key:void 0,url:void 0},init:function(c,e,d){g.API.params.service=c;g.API.params.key=e;g.API.params.url=d},createRoom:function(c,e,d,b,g){b||(b={});f(function(a){a=JSON.parse(a);e(a)},d,"POST",{name:c,options:b},"rooms",g)},getRooms:function(c,e,d){f(c,e,"GET",void 0,"rooms",d)},getRoom:function(c,e,d,b){f(e,d,"GET",void 0,"rooms/"+c,b)},updateRoom:function(c,e,d,b,g,a){f(d,b,"PUT",{name:e,options:g},"rooms/"+c,a)},patchRoom:function(c,e,d,b,g,a){f(d,b,"PATCH",{name:e,
options:g},"rooms/"+c,a)},deleteRoom:function(c,e,d,b){f(e,d,"DELETE",void 0,"rooms/"+c,b)},createToken:function(c,e,d,b,g,a){f(b,g,"POST",void 0,"rooms/"+c+"/tokens",a,e,d)},createService:function(c,e,d,b,g){f(d,b,"POST",{name:c,key:e},"services/",g)},getServices:function(c,e,d){f(c,e,"GET",void 0,"services/",d)},getService:function(c,e,d,b){f(e,d,"GET",void 0,"services/"+c,b)},deleteService:function(c,e,d,b){f(e,d,"DELETE",void 0,"services/"+c,b)},getUsers:function(c,e,d,b){f(e,d,"GET",void 0,"rooms/"+
c+"/users/",b)},getUser:function(c,e,d,b,g){f(d,b,"GET",void 0,"rooms/"+c+"/users/"+e,g)},deleteUser:function(c,e,d,b,g){f(d,b,"DELETE",void 0,"rooms/"+c+"/users/"+e,g)}}}(N);
module.exports = N;