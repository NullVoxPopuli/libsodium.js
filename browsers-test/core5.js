var Module=typeof Module!=="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}var arguments_=[];var thisProgram="./this.program";var quit_=function(status,toThrow){throw toThrow};var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_HAS_NODE=false;var ENVIRONMENT_IS_SHELL=false;ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_HAS_NODE=typeof process==="object"&&typeof process.versions==="object"&&typeof process.versions.node==="string";ENVIRONMENT_IS_NODE=ENVIRONMENT_HAS_NODE&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;if(ENVIRONMENT_IS_NODE){scriptDirectory=__dirname+"/";var nodeFS;var nodePath;read_=function shell_read(filename,binary){var ret;ret=tryParseAsDataURI(filename);if(!ret){if(!nodeFS)nodeFS=require("fs");if(!nodePath)nodePath=require("path");filename=nodePath["normalize"](filename);ret=nodeFS["readFileSync"](filename)}return binary?ret:ret.toString()};readBinary=function readBinary(filename){var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);if(typeof module!=="undefined"){module["exports"]=Module}process["on"]("unhandledRejection",abort);quit_=function(status){process["exit"](status)};Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_SHELL){if(typeof read!="undefined"){read_=function shell_read(f){var data=tryParseAsDataURI(f);if(data){return intArrayToString(data)}return read(f)}}readBinary=function readBinary(f){var data;data=tryParseAsDataURI(f);if(data){return data}if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){arguments_=scriptArgs}else if(typeof arguments!="undefined"){arguments_=arguments}if(typeof quit==="function"){quit_=function(status){quit(status)}}if(typeof print!=="undefined"){if(typeof console==="undefined")console={};console.log=print;console.warn=console.error=typeof printErr!=="undefined"?printErr:print}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.lastIndexOf("/")+1)}else{scriptDirectory=""}read_=function shell_read(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){readBinary=function readBinary(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}}}readAsync=function readAsync(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()};xhr.onerror=onerror;xhr.send(null)};setWindowTitle=function(title){document.title=title}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var asm2wasmImports={"f64-rem":function(x,y){return x%y},"debugger":function(){}};var functionPointers=new Array(8);var tempRet0=0;var getTempRet0=function(){return tempRet0};var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];if(typeof WebAssembly!=="object"){err("no native wasm support detected")}var wasmMemory;var wasmTable;var ABORT=false;var EXITSTATUS=0;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(u8Array,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(u8Array[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&u8Array.subarray&&UTF8Decoder){return UTF8Decoder.decode(u8Array.subarray(idx,endPtr))}else{var str="";while(idx<endPtr){var u0=u8Array[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=u8Array[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=u8Array[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|u8Array[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023}if(u<=127){if(outIdx>=endIdx)break;outU8Array[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;outU8Array[outIdx++]=192|u>>6;outU8Array[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;outU8Array[outIdx++]=224|u>>12;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;outU8Array[outIdx++]=240|u>>18;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}}outU8Array[outIdx]=0;return outIdx-startIdx}function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127)++len;else if(u<=2047)len+=2;else if(u<=65535)len+=3;else len+=4}return len}var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;function allocateUTF8OnStack(str){var size=lengthBytesUTF8(str)+1;var ret=stackAlloc(size);stringToUTF8Array(str,HEAP8,ret,size);return ret}var PAGE_SIZE=16384;var WASM_PAGE_SIZE=65536;var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferViews(){Module["HEAP8"]=HEAP8=new Int8Array(buffer);Module["HEAP16"]=HEAP16=new Int16Array(buffer);Module["HEAP32"]=HEAP32=new Int32Array(buffer);Module["HEAPU8"]=HEAPU8=new Uint8Array(buffer);Module["HEAPU16"]=HEAPU16=new Uint16Array(buffer);Module["HEAPU32"]=HEAPU32=new Uint32Array(buffer);Module["HEAPF32"]=HEAPF32=new Float32Array(buffer);Module["HEAPF64"]=HEAPF64=new Float64Array(buffer)}var DYNAMIC_BASE=5248576,DYNAMICTOP_PTR=5664;var INITIAL_TOTAL_MEMORY=Module["TOTAL_MEMORY"]||16777216;if(Module["wasmMemory"]){wasmMemory=Module["wasmMemory"]}else{wasmMemory=new WebAssembly.Memory({"initial":INITIAL_TOTAL_MEMORY/WASM_PAGE_SIZE})}if(wasmMemory){buffer=wasmMemory.buffer}INITIAL_TOTAL_MEMORY=buffer.byteLength;updateGlobalBufferViews();HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Module["dynCall_v"](func)}else{Module["dynCall_vi"](func,callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return String.prototype.startsWith?filename.startsWith(dataURIPrefix):filename.indexOf(dataURIPrefix)===0}var wasmBinaryFile="data:application/octet-stream;base64,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AiAAIAEgA0EPcUEgahEAACEEDAELIAFFIAIsAEtBAEhyBH9BAAUCfyABIQMDQCAAIANBf2oiBWosAABBCkcEQCAFBEAgBSEDDAIFQQAMAwsACwsgAigCJCEEIAIgACADIARBD3FBIGoRAAAiBCADSQ0CIAAgA2ohACABIANrIQEgAigCFCEEIAMLCyEFIAQgACABEFIaIAIgASACKAIUajYCFCABIAVqIQQLIAQLYQEBfyAAIAAsAEoiASABQf8BanI6AEogACgCACIBQQhxBH8gACABQSByNgIAQX8FIABBADYCCCAAQQA2AgQgACAAKAIsIgE2AhwgACABNgIUIAAgASAAKAIwajYCEEEACwvhAgEHfyMBIQcjAUEwaiQBIAdBIGohBSAHIgMgACgCHCIENgIAIAMgACgCFCAEayIENgIEIAMgATYCCCADIAI2AgwgA0EQaiIBIAAoAjw2AgAgASADNgIEIAFBAjYCCAJAAkAgAiAEaiIEQZIBIAEQBRAcIgZGDQBBAiEIIAMhASAGIQMDQCADQQBOBEAgAUEIaiABIAMgASgCBCIJSyIGGyIBIAMgCUEAIAYbayIJIAEoAgBqNgIAIAEgASgCBCAJazYCBCAFIAAoAjw2AgAgBSABNgIEIAUgCCAGQR90QR91aiIINgIIIAQgA2siBEGSASAFEAUQHCIDRg0CDAELCyAAQQA2AhAgAEEANgIcIABBADYCFCAAIAAoAgBBIHI2AgAgCEECRgR/QQAFIAIgASgCBGsLIQIMAQsgACAAKAIsIgEgACgCMGo2AhAgACABNgIcIAAgATYCFAsgByQBIAILEAAgAEIANwIAIABCADcCCAsKAEEHIAAgARAACwoAQQYgACABEAALCgBBBSAAIAEQAAsKAEEEIAAgARAACwoAQQMgACABEAALCgBBAiAAIAEQAAsKAEEBIAAgARAACwoAQQAgACABEAALDABBByAAIAEgAhASCwwAQQYgACABIAIQEgsMAEEFIAAgASACEBILDABBBCAAIAEgAhASCwwAQQMgACABIAIQEgsMAEECIAAgASACEBILDABBASAAIAEgAhASCwwAQQAgACABIAIQEgsMAEEHIAAgASACEAELDABBBiAAIAEgAhABCwwAQQUgACABIAIQAQsMAEEEIAAgASACEAELDABBAyAAIAEgAhAB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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(){try{if(wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(wasmBinaryFile);if(binary){return binary}if(readBinary){return readBinary(wasmBinaryFile)}else{throw"both async and sync fetching of the wasm failed"}}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&typeof fetch==="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary()})}return new Promise(function(resolve,reject){resolve(getBinary())})}function createWasm(env){var info={"env":env,"global":{"NaN":NaN,Infinity:Infinity},"global.Math":Math,"asm2wasm":asm2wasmImports};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiatedSource(output){receiveInstance(output["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming==="function"&&!isDataURI(wasmBinaryFile)&&typeof fetch==="function"){fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiatedSource,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");instantiateArrayBuffer(receiveInstantiatedSource)})})}else{return instantiateArrayBuffer(receiveInstantiatedSource)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return{}}Module["asm"]=function(global,env,providedBuffer){env["memory"]=wasmMemory;env["table"]=wasmTable=new WebAssembly.Table({"initial":80,"maximum":80,"element":"anyfunc"});env["__memory_base"]=1024;env["__table_base"]=0;var exports=createWasm(env);return exports};var ASM_CONSTS=[function(){return Module.getRandomValue()},function(){if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}];function _emscripten_asm_const_i(code){return ASM_CONSTS[code]()}var PATH={splitPath:function(filename){var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;return splitPathRe.exec(filename).slice(1)},normalizeArray:function(parts,allowAboveRoot){var up=0;for(var i=parts.length-1;i>=0;i--){var last=parts[i];if(last==="."){parts.splice(i,1)}else if(last===".."){parts.splice(i,1);up++}else if(up){parts.splice(i,1);up--}}if(allowAboveRoot){for(;up;up--){parts.unshift("..")}}return parts},normalize:function(path){var isAbsolute=path.charAt(0)==="/",trailingSlash=path.substr(-1)==="/";path=PATH.normalizeArray(path.split("/").filter(function(p){return!!p}),!isAbsolute).join("/");if(!path&&!isAbsolute){path="."}if(path&&trailingSlash){path+="/"}return(isAbsolute?"/":"")+path},dirname:function(path){var result=PATH.splitPath(path),root=result[0],dir=result[1];if(!root&&!dir){return"."}if(dir){dir=dir.substr(0,dir.length-1)}return root+dir},basename:function(path){if(path==="/")return"/";var lastSlash=path.lastIndexOf("/");if(lastSlash===-1)return path;return path.substr(lastSlash+1)},extname:function(path){return PATH.splitPath(path)[3]},join:function(){var paths=Array.prototype.slice.call(arguments,0);return PATH.normalize(paths.join("/"))},join2:function(l,r){return PATH.normalize(l+"/"+r)}};var SYSCALLS={buffers:[null,[],[]],printChar:function(stream,curr){var buffer=SYSCALLS.buffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}},varargs:0,get:function(varargs){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(){var ret=UTF8ToString(SYSCALLS.get());return ret},get64:function(){var low=SYSCALLS.get(),high=SYSCALLS.get();return low},getZero:function(){SYSCALLS.get()}};function ___syscall140(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(),offset_high=SYSCALLS.get(),offset_low=SYSCALLS.get(),result=SYSCALLS.get(),whence=SYSCALLS.get();return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall146(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.get(),iov=SYSCALLS.get(),iovcnt=SYSCALLS.get();var ret=0;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];for(var j=0;j<len;j++){SYSCALLS.printChar(stream,HEAPU8[ptr+j])}ret+=len}return ret}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall54(which,varargs){SYSCALLS.varargs=varargs;try{return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall6(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD();return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function _abort(){Module["abort"]()}function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest)}function ___setErrNo(value){if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;return value}function _sysconf(name){switch(name){case 30:return PAGE_SIZE;case 85:var maxHeapSize=2*1024*1024*1024-65536;return maxHeapSize/PAGE_SIZE;case 132:case 133:case 12:case 137:case 138:case 15:case 235:case 16:case 17:case 18:case 19:case 20:case 149:case 13:case 10:case 236:case 153:case 9:case 21:case 22:case 159:case 154:case 14:case 77:case 78:case 139:case 80:case 81:case 82:case 68:case 67:case 164:case 11:case 29:case 47:case 48:case 95:case 52:case 51:case 46:return 200809;case 79:return 0;case 27:case 246:case 127:case 128:case 23:case 24:case 160:case 161:case 181:case 182:case 242:case 183:case 184:case 243:case 244:case 245:case 165:case 178:case 179:case 49:case 50:case 168:case 169:case 175:case 170:case 171:case 172:case 97:case 76:case 32:case 173:case 35:return-1;case 176:case 177:case 7:case 155:case 8:case 157:case 125:case 126:case 92:case 93:case 129:case 130:case 131:case 94:case 91:return 1;case 74:case 60:case 69:case 70:case 4:return 1024;case 31:case 42:case 72:return 32;case 87:case 26:case 33:return 2147483647;case 34:case 1:return 47839;case 38:case 36:return 99;case 43:case 37:return 2048;case 0:return 2097152;case 3:return 65536;case 28:return 32768;case 44:return 32767;case 75:return 16384;case 39:return 1e3;case 89:return 700;case 71:return 256;case 40:return 255;case 2:return 100;case 180:return 64;case 25:return 20;case 5:return 16;case 6:return 6;case 73:return 4;case 84:{if(typeof navigator==="object")return navigator["hardwareConcurrency"]||1;return 1}}___setErrNo(22);return-1}var ASSERTIONS=false;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){if(ASSERTIONS){assert(false,"Character code "+chr+" ("+String.fromCharCode(chr)+")  at offset "+i+" not in 0x00-0xFF.")}chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}var decodeBase64=typeof atob==="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE==="boolean"&&ENVIRONMENT_IS_NODE){var buf;try{buf=Buffer.from(s,"base64")}catch(_){buf=new Buffer(s,"base64")}return new Uint8Array(buf.buffer,buf.byteOffset,buf.byteLength)}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}function jsCall_ii(index,a1){return functionPointers[index](a1)}function jsCall_iidiiii(index,a1,a2,a3,a4,a5,a6){return functionPointers[index](a1,a2,a3,a4,a5,a6)}function jsCall_iiii(index,a1,a2,a3){return functionPointers[index](a1,a2,a3)}function jsCall_jiji(index,a1,a2,a3){return functionPointers[index](a1,a2,a3)}function jsCall_vii(index,a1,a2){functionPointers[index](a1,a2)}var asmGlobalArg={};var asmLibraryArg={"e":abort,"l":getTempRet0,"d":jsCall_ii,"c":jsCall_iidiiii,"b":jsCall_iiii,"k":jsCall_jiji,"a":jsCall_vii,"j":___syscall140,"f":___syscall146,"i":___syscall54,"h":___syscall6,"o":_abort,"g":_emscripten_asm_const_i,"n":_emscripten_memcpy_big,"m":_sysconf};var asm=Module["asm"](asmGlobalArg,asmLibraryArg,buffer);Module["asm"]=asm;var ___errno_location=Module["___errno_location"]=function(){return Module["asm"]["p"].apply(null,arguments)};var _main=Module["_main"]=function(){return Module["asm"]["q"].apply(null,arguments)};var stackAlloc=Module["stackAlloc"]=function(){return Module["asm"]["r"].apply(null,arguments)};Module["asm"]=asm;var calledRun;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}var calledMain=false;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(args){args=args||[];var argc=args.length+1;var argv=stackAlloc((argc+1)*4);HEAP32[argv>>2]=allocateUTF8OnStack(thisProgram);for(var i=1;i<argc;i++){HEAP32[(argv>>2)+i]=allocateUTF8OnStack(args[i-1])}HEAP32[(argv>>2)+argc]=0;try{var ret=Module["_main"](argc,argv);exit(ret,true)}catch(e){if(e instanceof ExitStatus){return}else if(e=="SimulateInfiniteLoop"){Module["noExitRuntime"]=true;return}else{var toLog=e;if(e&&typeof e==="object"&&e.stack){toLog=[e,e.stack]}err("exception thrown: "+toLog);quit_(1,e)}}finally{calledMain=true}}function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0)return;function doRun(){if(calledRun)return;calledRun=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain(args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}Module["run"]=run;function exit(status,implicit){if(implicit&&Module["noExitRuntime"]&&status===0){return}if(Module["noExitRuntime"]){}else{ABORT=true;EXITSTATUS=status;exitRuntime();if(Module["onExit"])Module["onExit"](status)}quit_(status,new ExitStatus(status))}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what+="";out(what);err(what);ABORT=true;EXITSTATUS=1;throw"abort("+what+"). Build with -s ASSERTIONS=1 for more info."}Module["abort"]=abort;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;Module["noExitRuntime"]=true;run();
