var Module = typeof Module != "undefined" ? Module : {};

if (!Module.expectedDataFileDownloads) {
 Module.expectedDataFileDownloads = 0;
}

Module.expectedDataFileDownloads++;

(function() {
 if (Module["ENVIRONMENT_IS_PTHREAD"] || Module["$ww"]) return;
 var loadPackage = function(metadata) {
  var PACKAGE_PATH = "";
  if (typeof window === "object") {
   PACKAGE_PATH = window["encodeURIComponent"](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf("/")) + "/");
  } else if (typeof process === "undefined" && typeof location !== "undefined") {
   PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf("/")) + "/");
  }
  var PACKAGE_NAME = "/Users/ccuddigan/Github/delve-framework/zig-out/web/frustums.data";
  var REMOTE_PACKAGE_BASE = "frustums.data";
  if (typeof Module["locateFilePackage"] === "function" && !Module["locateFile"]) {
   Module["locateFile"] = Module["locateFilePackage"];
   err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)");
  }
  var REMOTE_PACKAGE_NAME = Module["locateFile"] ? Module["locateFile"](REMOTE_PACKAGE_BASE, "") : REMOTE_PACKAGE_BASE;
  var REMOTE_PACKAGE_SIZE = metadata["remote_package_size"];
  function fetchRemotePackage(packageName, packageSize, callback, errback) {
   if (typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string") {
    require("fs").readFile(packageName, function(err, contents) {
     if (err) {
      errback(err);
     } else {
      callback(contents.buffer);
     }
    });
    return;
   }
   var xhr = new XMLHttpRequest;
   xhr.open("GET", packageName, true);
   xhr.responseType = "arraybuffer";
   xhr.onprogress = function(event) {
    var url = packageName;
    var size = packageSize;
    if (event.total) size = event.total;
    if (event.loaded) {
     if (!xhr.addedTotal) {
      xhr.addedTotal = true;
      if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
      Module.dataFileDownloads[url] = {
       loaded: event.loaded,
       total: size
      };
     } else {
      Module.dataFileDownloads[url].loaded = event.loaded;
     }
     var total = 0;
     var loaded = 0;
     var num = 0;
     for (var download in Module.dataFileDownloads) {
      var data = Module.dataFileDownloads[download];
      total += data.total;
      loaded += data.loaded;
      num++;
     }
     total = Math.ceil(total * Module.expectedDataFileDownloads / num);
     if (Module["setStatus"]) Module["setStatus"](`Downloading data... (${loaded}/${total})`);
    } else if (!Module.dataFileDownloads) {
     if (Module["setStatus"]) Module["setStatus"]("Downloading data...");
    }
   };
   xhr.onerror = function(event) {
    throw new Error("NetworkError for: " + packageName);
   };
   xhr.onload = function(event) {
    if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) {
     var packageData = xhr.response;
     callback(packageData);
    } else {
     throw new Error(xhr.statusText + " : " + xhr.responseURL);
    }
   };
   xhr.send(null);
  }
  function handleError(error) {
   console.error("package error:", error);
  }
  var fetchedCallback = null;
  var fetched = Module["getPreloadedPackage"] ? Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;
  if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
   if (fetchedCallback) {
    fetchedCallback(data);
    fetchedCallback = null;
   } else {
    fetched = data;
   }
  }, handleError);
  function runWithFS() {
   function assert(check, msg) {
    if (!check) throw msg + (new Error).stack;
   }
   Module["FS_createPath"]("/", "assets", true, true);
   Module["FS_createPath"]("/assets", "3d_dot_party", true, true);
   Module["FS_createPath"]("/assets", "meshes", true, true);
   Module["FS_createPath"]("/assets", "shaders", true, true);
   Module["FS_createPath"]("/assets", "sprites", true, true);
   Module["FS_createPath"]("/assets", "textures", true, true);
   /** @constructor */ function DataRequest(start, end, audio) {
    this.start = start;
    this.end = end;
    this.audio = audio;
   }
   DataRequest.prototype = {
    requests: {},
    open: function(mode, name) {
     this.name = name;
     this.requests[name] = this;
     Module["addRunDependency"](`fp ${this.name}`);
    },
    send: function() {},
    onload: function() {
     var byteArray = this.byteArray.subarray(this.start, this.end);
     this.finish(byteArray);
    },
    finish: function(byteArray) {
     var that = this;
     Module["FS_createDataFile"](this.name, null, byteArray, true, true, true);
     Module["removeRunDependency"](`fp ${that.name}`);
     this.requests[this.name] = null;
    }
   };
   var files = metadata["files"];
   for (var i = 0; i < files.length; ++i) {
    new DataRequest(files[i]["start"], files[i]["end"], files[i]["audio"] || 0).open("GET", files[i]["filename"]);
   }
   function processPackageData(arrayBuffer) {
    assert(arrayBuffer, "Loading data file failed.");
    assert(arrayBuffer.constructor.name === ArrayBuffer.name, "bad input to processPackageData");
    var byteArray = new Uint8Array(arrayBuffer);
    var curr;
    DataRequest.prototype.byteArray = byteArray;
    var files = metadata["files"];
    for (var i = 0; i < files.length; ++i) {
     DataRequest.prototype.requests[files[i].filename].onload();
    }
    Module["removeRunDependency"]("datafile_/Users/ccuddigan/Github/delve-framework/zig-out/web/frustums.data");
   }
   Module["addRunDependency"]("datafile_/Users/ccuddigan/Github/delve-framework/zig-out/web/frustums.data");
   if (!Module.preloadResults) Module.preloadResults = {};
   Module.preloadResults[PACKAGE_NAME] = {
    fromCache: false
   };
   if (fetched) {
    processPackageData(fetched);
    fetched = null;
   } else {
    fetchedCallback = processPackageData;
   }
  }
  if (Module["calledRun"]) {
   runWithFS();
  } else {
   if (!Module["preRun"]) Module["preRun"] = [];
   Module["preRun"].push(runWithFS);
  }
 };
 loadPackage({
  "files": [ {
   "filename": "/assets/.DS_Store",
   "start": 0,
   "end": 10244
  }, {
   "filename": "/assets/3d_dot_party/config.json",
   "start": 10244,
   "end": 10324
  }, {
   "filename": "/assets/3d_dot_party/main.lua",
   "start": 10324,
   "end": 12370
  }, {
   "filename": "/assets/3d_dot_party/palette.gif",
   "start": 12370,
   "end": 12484
  }, {
   "filename": "/assets/3d_dot_party/pico.lua",
   "start": 12484,
   "end": 16841
  }, {
   "filename": "/assets/font.gif",
   "start": 16841,
   "end": 18787
  }, {
   "filename": "/assets/main.lua",
   "start": 18787,
   "end": 20779
  }, {
   "filename": "/assets/meshes/.DS_Store",
   "start": 20779,
   "end": 26927
  }, {
   "filename": "/assets/meshes/SciFiHelmet.bin",
   "start": 26927,
   "end": 3670775
  }, {
   "filename": "/assets/meshes/SciFiHelmet.gltf",
   "start": 3670775,
   "end": 3675236
  }, {
   "filename": "/assets/meshes/SciFiHelmet_BaseColor_512.png",
   "start": 3675236,
   "end": 4168136
  }, {
   "filename": "/assets/meshes/SciFiHelmet_Emissive_512.png",
   "start": 4168136,
   "end": 4246421
  }, {
   "filename": "/assets/meshes/Suzanne.gltf",
   "start": 4246421,
   "end": 4250151
  }, {
   "filename": "/assets/meshes/Suzanne_BaseColor.png",
   "start": 4250151,
   "end": 4379485
  }, {
   "filename": "/assets/palette.gif",
   "start": 4379485,
   "end": 4379599
  }, {
   "filename": "/assets/sample-9s.mp3",
   "start": 4379599,
   "end": 4533661,
   "audio": 1
  }, {
   "filename": "/assets/sample-shoot.wav",
   "start": 4533661,
   "end": 4542994,
   "audio": 1
  }, {
   "filename": "/assets/shaders/default.glsl",
   "start": 4542994,
   "end": 4544410
  }, {
   "filename": "/assets/shaders/emissive.glsl",
   "start": 4544410,
   "end": 4546073
  }, {
   "filename": "/assets/sprites/.DS_Store",
   "start": 4546073,
   "end": 4552221
  }, {
   "filename": "/assets/sprites/cat-anim-sheet.png",
   "start": 4552221,
   "end": 4552938
  }, {
   "filename": "/assets/sprites/explosion.json",
   "start": 4552938,
   "end": 4555246
  }, {
   "filename": "/assets/sprites/treesheet.png",
   "start": 4555246,
   "end": 4568750
  }, {
   "filename": "/assets/test.lua",
   "start": 4568750,
   "end": 4568918
  }, {
   "filename": "/assets/textures/tech_1.png",
   "start": 4568918,
   "end": 4571908
  }, {
   "filename": "/assets/textures/tech_10.png",
   "start": 4571908,
   "end": 4574807
  }, {
   "filename": "/assets/textures/tech_11.png",
   "start": 4574807,
   "end": 4577741
  }, {
   "filename": "/assets/textures/tech_12.png",
   "start": 4577741,
   "end": 4580876
  }, {
   "filename": "/assets/textures/tech_13.png",
   "start": 4580876,
   "end": 4584072
  }, {
   "filename": "/assets/textures/tech_14.png",
   "start": 4584072,
   "end": 4587056
  }, {
   "filename": "/assets/textures/tech_15.png",
   "start": 4587056,
   "end": 4589953
  }, {
   "filename": "/assets/textures/tech_16.png",
   "start": 4589953,
   "end": 4593090
  }, {
   "filename": "/assets/textures/tech_17.png",
   "start": 4593090,
   "end": 4596555
  }, {
   "filename": "/assets/textures/tech_18.png",
   "start": 4596555,
   "end": 4600130
  }, {
   "filename": "/assets/textures/tech_2.png",
   "start": 4600130,
   "end": 4602972
  }, {
   "filename": "/assets/textures/tech_3.png",
   "start": 4602972,
   "end": 4605898
  }, {
   "filename": "/assets/textures/tech_4.png",
   "start": 4605898,
   "end": 4608999
  }, {
   "filename": "/assets/textures/tech_5.png",
   "start": 4608999,
   "end": 4611903
  }, {
   "filename": "/assets/textures/tech_6.png",
   "start": 4611903,
   "end": 4614789
  }, {
   "filename": "/assets/textures/tech_7.png",
   "start": 4614789,
   "end": 4617867
  }, {
   "filename": "/assets/textures/tech_8.png",
   "start": 4617867,
   "end": 4621013
  }, {
   "filename": "/assets/textures/tech_9.png",
   "start": 4621013,
   "end": 4624130
  } ],
  "remote_package_size": 4624130
 });
})();

var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];

var thisProgram = "./this.program";

var quit_ = (status, toThrow) => {
 throw toThrow;
};

var ENVIRONMENT_IS_WEB = typeof window == "object";

var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";

var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";

var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

var scriptDirectory = "";

function locateFile(path) {
 if (Module["locateFile"]) {
  return Module["locateFile"](path, scriptDirectory);
 }
 return scriptDirectory + path;
}

var read_, readAsync, readBinary;

if (ENVIRONMENT_IS_NODE) {
 var fs = require("fs");
 var nodePath = require("path");
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = nodePath.dirname(scriptDirectory) + "/";
 } else {
  scriptDirectory = __dirname + "/";
 }
 read_ = (filename, binary) => {
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  return fs.readFileSync(filename, binary ? undefined : "utf8");
 };
 readBinary = filename => {
  var ret = read_(filename, true);
  if (!ret.buffer) {
   ret = new Uint8Array(ret);
  }
  return ret;
 };
 readAsync = (filename, onload, onerror, binary = true) => {
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  fs.readFile(filename, binary ? undefined : "utf8", (err, data) => {
   if (err) onerror(err); else onload(binary ? data.buffer : data);
  });
 };
 if (!Module["thisProgram"] && process.argv.length > 1) {
  thisProgram = process.argv[1].replace(/\\/g, "/");
 }
 arguments_ = process.argv.slice(2);
 if (typeof module != "undefined") {
  module["exports"] = Module;
 }
 process.on("uncaughtException", ex => {
  if (ex !== "unwind" && !(ex instanceof ExitStatus) && !(ex.context instanceof ExitStatus)) {
   throw ex;
  }
 });
 quit_ = (status, toThrow) => {
  process.exitCode = status;
  throw toThrow;
 };
} else  if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = self.location.href;
 } else if (typeof document != "undefined" && document.currentScript) {
  scriptDirectory = document.currentScript.src;
 }
 if (scriptDirectory.startsWith("blob:")) {
  scriptDirectory = "";
 } else {
  scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
 }
 {
  read_ = url => {
   var xhr = new XMLHttpRequest;
   xhr.open("GET", url, false);
   xhr.send(null);
   return xhr.responseText;
  };
  if (ENVIRONMENT_IS_WORKER) {
   readBinary = url => {
    var xhr = new XMLHttpRequest;
    xhr.open("GET", url, false);
    xhr.responseType = "arraybuffer";
    xhr.send(null);
    return new Uint8Array(/** @type{!ArrayBuffer} */ (xhr.response));
   };
  }
  readAsync = (url, onload, onerror) => {
   var xhr = new XMLHttpRequest;
   xhr.open("GET", url, true);
   xhr.responseType = "arraybuffer";
   xhr.onload = () => {
    if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
     onload(xhr.response);
     return;
    }
    onerror();
   };
   xhr.onerror = onerror;
   xhr.send(null);
  };
 }
} else  {}

var out = Module["print"] || console.log.bind(console);

var err = Module["printErr"] || console.error.bind(console);

Object.assign(Module, moduleOverrides);

moduleOverrides = null;

if (Module["arguments"]) arguments_ = Module["arguments"];

if (Module["thisProgram"]) thisProgram = Module["thisProgram"];

if (Module["quit"]) quit_ = Module["quit"];

var wasmBinary;

if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];

/** @param {number|boolean=} isFloat */ function getSafeHeapType(bytes, isFloat) {
 switch (bytes) {
 case 1:
  return "i8";

 case 2:
  return "i16";

 case 4:
  return isFloat ? "float" : "i32";

 case 8:
  return isFloat ? "double" : "i64";

 default:
  abort(`getSafeHeapType() invalid bytes=${bytes}`);
 }
}

/** @param {number|boolean=} isFloat */ function SAFE_HEAP_STORE(dest, value, bytes, isFloat) {
 if (dest <= 0) abort(`segmentation fault storing ${bytes} bytes to address ${dest}`);
 if (dest % bytes !== 0) abort(`alignment error storing to address ${dest}, which was expected to be aligned to a multiple of ${bytes}`);
 if (runtimeInitialized) {
  var brk = _sbrk(0);
  if (dest + bytes > brk) abort(`segmentation fault, exceeded the top of the available dynamic heap when storing ${bytes} bytes to address ${dest}. DYNAMICTOP=${brk}`);
  if (brk < _emscripten_stack_get_base()) abort(`brk >= _emscripten_stack_get_base() (brk=${brk}, _emscripten_stack_get_base()=${_emscripten_stack_get_base()})`);
  if (brk > wasmMemory.buffer.byteLength) abort(`brk <= wasmMemory.buffer.byteLength (brk=${brk}, wasmMemory.buffer.byteLength=${wasmMemory.buffer.byteLength})`);
 }
 setValue_safe(dest, value, getSafeHeapType(bytes, isFloat));
 return value;
}

function SAFE_HEAP_STORE_D(dest, value, bytes) {
 return SAFE_HEAP_STORE(dest, value, bytes, true);
}

/** @param {number|boolean=} isFloat */ function SAFE_HEAP_LOAD(dest, bytes, unsigned, isFloat) {
 if (dest <= 0) abort(`segmentation fault loading ${bytes} bytes from address ${dest}`);
 if (dest % bytes !== 0) abort(`alignment error loading from address ${dest}, which was expected to be aligned to a multiple of ${bytes}`);
 if (runtimeInitialized) {
  var brk = _sbrk(0);
  if (dest + bytes > brk) abort(`segmentation fault, exceeded the top of the available dynamic heap when loading ${bytes} bytes from address ${dest}. DYNAMICTOP=${brk}`);
  if (brk < _emscripten_stack_get_base()) abort(`brk >= _emscripten_stack_get_base() (brk=${brk}, _emscripten_stack_get_base()=${_emscripten_stack_get_base()})`);
  if (brk > wasmMemory.buffer.byteLength) abort(`brk <= wasmMemory.buffer.byteLength (brk=${brk}, wasmMemory.buffer.byteLength=${wasmMemory.buffer.byteLength})`);
 }
 var type = getSafeHeapType(bytes, isFloat);
 var ret = getValue_safe(dest, type);
 if (unsigned) ret = unSign(ret, parseInt(type.substr(1), 10));
 return ret;
}

function SAFE_HEAP_LOAD_D(dest, bytes, unsigned) {
 return SAFE_HEAP_LOAD(dest, bytes, unsigned, true);
}

function SAFE_FT_MASK(value, mask) {
 var ret = value & mask;
 if (ret !== value) {
  abort(`Function table mask error: function pointer is ${value} which is masked by ${mask}, the likely cause of this is that the function pointer is being called by the wrong type.`);
 }
 return ret;
}

function segfault() {
 abort("segmentation fault");
}

function alignfault() {
 abort("alignment fault");
}

function intArrayFromBase64(s) {
 if (typeof ENVIRONMENT_IS_NODE != "undefined" && ENVIRONMENT_IS_NODE) {
  var buf = Buffer.from(s, "base64");
  return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
 }
 var decoded = atob(s);
 var bytes = new Uint8Array(decoded.length);
 for (var i = 0; i < decoded.length; ++i) {
  bytes[i] = decoded.charCodeAt(i);
 }
 return bytes;
}

function tryParseAsDataURI(filename) {
 if (!isDataURI(filename)) {
  return;
 }
 return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}

var wasmMemory;

var ABORT = false;

var EXITSTATUS;

/** @type {function(*, string=)} */ function assert(condition, text) {
 if (!condition) {
  abort(text);
 }
}

var HEAP, /** @type {!Int8Array} */ HEAP8, /** @type {!Uint8Array} */ HEAPU8, /** @type {!Int16Array} */ HEAP16, /** @type {!Uint16Array} */ HEAPU16, /** @type {!Int32Array} */ HEAP32, /** @type {!Uint32Array} */ HEAPU32, /** @type {!Float32Array} */ HEAPF32, /** @type {!Float64Array} */ HEAPF64;

function updateMemoryViews() {
 var b = wasmMemory.buffer;
 Module["HEAP8"] = HEAP8 = new Int8Array(b);
 Module["HEAP16"] = HEAP16 = new Int16Array(b);
 Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
 Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
 Module["HEAP32"] = HEAP32 = new Int32Array(b);
 Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
 Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
 Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
}

function writeStackCookie() {
 var max = _emscripten_stack_get_end();
 if (max == 0) {
  max += 4;
 }
 SAFE_HEAP_STORE(((max) >> 2) * 4, 34821223, 4);
 SAFE_HEAP_STORE((((max) + (4)) >> 2) * 4, 2310721022, 4);
}

function checkStackCookie() {
 if (ABORT) return;
 var max = _emscripten_stack_get_end();
 if (max == 0) {
  max += 4;
 }
 var cookie1 = SAFE_HEAP_LOAD(((max) >> 2) * 4, 4, 1);
 var cookie2 = SAFE_HEAP_LOAD((((max) + (4)) >> 2) * 4, 4, 1);
 if (cookie1 != 34821223 || cookie2 != 2310721022) {
  abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
 }
}

var __ATPRERUN__ = [];

var __ATINIT__ = [];

var __ATMAIN__ = [];

var __ATEXIT__ = [];

var __ATPOSTRUN__ = [];

var runtimeInitialized = false;

function preRun() {
 if (Module["preRun"]) {
  if (typeof Module["preRun"] == "function") Module["preRun"] = [ Module["preRun"] ];
  while (Module["preRun"].length) {
   addOnPreRun(Module["preRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
 runtimeInitialized = true;
 checkStackCookie();
 if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
 FS.ignorePermissions = false;
 TTY.init();
 callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
 checkStackCookie();
 callRuntimeCallbacks(__ATMAIN__);
}

function postRun() {
 checkStackCookie();
 if (Module["postRun"]) {
  if (typeof Module["postRun"] == "function") Module["postRun"] = [ Module["postRun"] ];
  while (Module["postRun"].length) {
   addOnPostRun(Module["postRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
 __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
 __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
 __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {}

function addOnPostRun(cb) {
 __ATPOSTRUN__.unshift(cb);
}

var runDependencies = 0;

var runDependencyWatcher = null;

var dependenciesFulfilled = null;

function getUniqueRunDependency(id) {
 return id;
}

function addRunDependency(id) {
 runDependencies++;
 Module["monitorRunDependencies"]?.(runDependencies);
}

function removeRunDependency(id) {
 runDependencies--;
 Module["monitorRunDependencies"]?.(runDependencies);
 if (runDependencies == 0) {
  if (runDependencyWatcher !== null) {
   clearInterval(runDependencyWatcher);
   runDependencyWatcher = null;
  }
  if (dependenciesFulfilled) {
   var callback = dependenciesFulfilled;
   dependenciesFulfilled = null;
   callback();
  }
 }
}

/** @param {string|number=} what */ function abort(what) {
 Module["onAbort"]?.(what);
 what = "Aborted(" + what + ")";
 err(what);
 ABORT = true;
 EXITSTATUS = 1;
 what += ". Build with -sASSERTIONS for more info.";
 /** @suppress {checkTypes} */ var e = new WebAssembly.RuntimeError(what);
 throw e;
}

var dataURIPrefix = "data:application/octet-stream;base64,";

/**
 * Indicates whether filename is a base64 data URI.
 * @noinline
 */ var isDataURI = filename => filename.startsWith(dataURIPrefix);

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */ var isFileURI = filename => filename.startsWith("file://");

var wasmBinaryFile;

wasmBinaryFile = "frustums.wasm";

if (!isDataURI(wasmBinaryFile)) {
 wasmBinaryFile = locateFile(wasmBinaryFile);
}

function getBinarySync(file) {
 if (file == wasmBinaryFile && wasmBinary) {
  return new Uint8Array(wasmBinary);
 }
 if (readBinary) {
  return readBinary(file);
 }
 throw "both async and sync fetching of the wasm failed";
}

function getBinaryPromise(binaryFile) {
 if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
  if (typeof fetch == "function" && !isFileURI(binaryFile)) {
   return fetch(binaryFile, {
    credentials: "same-origin"
   }).then(response => {
    if (!response["ok"]) {
     throw `failed to load wasm binary file at '${binaryFile}'`;
    }
    return response["arrayBuffer"]();
   }).catch(() => getBinarySync(binaryFile));
  } else if (readAsync) {
   return new Promise((resolve, reject) => {
    readAsync(binaryFile, response => resolve(new Uint8Array(/** @type{!ArrayBuffer} */ (response))), reject);
   });
  }
 }
 return Promise.resolve().then(() => getBinarySync(binaryFile));
}

var wasmOffsetConverter;

/** @constructor */ function WasmOffsetConverter(wasmBytes, wasmModule) {
 var offset = 8;
 var funcidx = 0;
 this.offset_map = {};
 this.func_starts = [];
 this.name_map = {};
 this.import_functions = 0;
 var buffer = wasmBytes;
 function unsignedLEB128() {
  var result = 0;
  var shift = 0;
  do {
   var byte = buffer[offset++];
   result += (byte & 127) << shift;
   shift += 7;
  } while (byte & 128);
  return result;
 }
 function skipLimits() {
  var flags = unsignedLEB128();
  unsignedLEB128();
  var hasMax = (flags & 1) != 0;
  if (hasMax) {
   unsignedLEB128();
  }
 }
 binary_parse: while (offset < buffer.length) {
  var start = offset;
  var type = buffer[offset++];
  var end = unsignedLEB128() + offset;
  switch (type) {
  case 2:
   var count = unsignedLEB128();
   while (count-- > 0) {
    offset = unsignedLEB128() + offset;
    offset = unsignedLEB128() + offset;
    var kind = buffer[offset++];
    switch (kind) {
    case 0:
     ++funcidx;
     unsignedLEB128();
     break;

    case 1:
     unsignedLEB128();
     skipLimits();
     break;

    case 2:
     skipLimits();
     break;

    case 3:
     offset += 2;
     break;

    case 4:
     ++offset;
     unsignedLEB128();
     break;
    }
   }
   this.import_functions = funcidx;
   break;

  case 10:
   var count = unsignedLEB128();
   while (count-- > 0) {
    var size = unsignedLEB128();
    this.offset_map[funcidx++] = offset;
    this.func_starts.push(offset);
    offset += size;
   }
   break binary_parse;
  }
  offset = end;
 }
 var sections = WebAssembly.Module.customSections(wasmModule, "name");
 var nameSection = sections.length ? sections[0] : undefined;
 if (nameSection) {
  buffer = new Uint8Array(nameSection);
  offset = 0;
  while (offset < buffer.length) {
   var subsection_type = buffer[offset++];
   var len = unsignedLEB128();
   if (subsection_type != 1) {
    offset += len;
    continue;
   }
   var count = unsignedLEB128();
   while (count-- > 0) {
    var index = unsignedLEB128();
    var length = unsignedLEB128();
    this.name_map[index] = UTF8ArrayToString(buffer, offset, length);
    offset += length;
   }
  }
 }
}

WasmOffsetConverter.prototype.convert = function(funcidx, offset) {
 return this.offset_map[funcidx] + offset;
};

WasmOffsetConverter.prototype.getIndex = function(offset) {
 var lo = 0;
 var hi = this.func_starts.length;
 var mid;
 while (lo < hi) {
  mid = Math.floor((lo + hi) / 2);
  if (this.func_starts[mid] > offset) {
   hi = mid;
  } else {
   lo = mid + 1;
  }
 }
 return lo + this.import_functions - 1;
};

WasmOffsetConverter.prototype.isSameFunc = function(offset1, offset2) {
 return this.getIndex(offset1) == this.getIndex(offset2);
};

WasmOffsetConverter.prototype.getName = function(offset) {
 var index = this.getIndex(offset);
 return this.name_map[index] || ("wasm-function[" + index + "]");
};

function instantiateArrayBuffer(binaryFile, imports, receiver) {
 var savedBinary;
 return getBinaryPromise(binaryFile).then(binary => {
  savedBinary = binary;
  return WebAssembly.instantiate(binary, imports);
 }).then(instance => {
  wasmOffsetConverter = new WasmOffsetConverter(savedBinary, instance.module);
  return instance;
 }).then(receiver, reason => {
  err(`failed to asynchronously prepare wasm: ${reason}`);
  abort(reason);
 });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
 if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) &&  !isFileURI(binaryFile) &&  !ENVIRONMENT_IS_NODE && typeof fetch == "function") {
  return fetch(binaryFile, {
   credentials: "same-origin"
  }).then(response => {
   /** @suppress {checkTypes} */ var result = WebAssembly.instantiateStreaming(response, imports);
   var clonedResponsePromise = response.clone().arrayBuffer();
   return result.then(function(instantiationResult) {
    clonedResponsePromise.then(arrayBufferResult => {
     wasmOffsetConverter = new WasmOffsetConverter(new Uint8Array(arrayBufferResult), instantiationResult.module);
     callback(instantiationResult);
    }, reason => err(`failed to initialize offset-converter: ${reason}`));
   }, function(reason) {
    err(`wasm streaming compile failed: ${reason}`);
    err("falling back to ArrayBuffer instantiation");
    return instantiateArrayBuffer(binaryFile, imports, callback);
   });
  });
 }
 return instantiateArrayBuffer(binaryFile, imports, callback);
}

function createWasm() {
 var info = {
  "env": wasmImports,
  "wasi_snapshot_preview1": wasmImports
 };
 /** @param {WebAssembly.Module=} module*/ function receiveInstance(instance, module) {
  wasmExports = instance.exports;
  wasmMemory = wasmExports["memory"];
  updateMemoryViews();
  wasmTable = wasmExports["__indirect_function_table"];
  addOnInit(wasmExports["__wasm_call_ctors"]);
  removeRunDependency("wasm-instantiate");
  return wasmExports;
 }
 addRunDependency("wasm-instantiate");
 function receiveInstantiationResult(result) {
  receiveInstance(result["instance"]);
 }
 if (Module["instantiateWasm"]) {
  try {
   return Module["instantiateWasm"](info, receiveInstance);
  } catch (e) {
   err(`Module.instantiateWasm callback failed with error: ${e}`);
   return false;
  }
 }
 instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult);
 return {};
}

var tempDouble;

var tempI64;

function slog_js_log(level, c_str) {
 const str = UTF8ToString(c_str);
 switch (level) {
 case 0:
  console.error(str);
  break;

 case 1:
  console.error(str);
  break;

 case 2:
  console.warn(str);
  break;

 default:
  console.info(str);
  break;
 }
}

function sapp_js_add_beforeunload_listener() {
 Module.sokol_beforeunload = event => {
  if (__sapp_html5_get_ask_leave_site() != 0) {
   event.preventDefault();
   event.returnValue = " ";
  }
 };
 window.addEventListener("beforeunload", Module.sokol_beforeunload);
}

function sapp_js_remove_beforeunload_listener() {
 window.removeEventListener("beforeunload", Module.sokol_beforeunload);
}

function sapp_js_add_clipboard_listener() {
 Module.sokol_paste = event => {
  const pasted_str = event.clipboardData.getData("text");
  withStackSave(() => {
   const cstr = stringToUTF8OnStack(pasted_str);
   __sapp_emsc_onpaste(cstr);
  });
 };
 window.addEventListener("paste", Module.sokol_paste);
}

function sapp_js_remove_clipboard_listener() {
 window.removeEventListener("paste", Module.sokol_paste);
}

function sapp_js_write_clipboard(c_str) {
 const str = UTF8ToString(c_str);
 const ta = document.createElement("textarea");
 ta.setAttribute("autocomplete", "off");
 ta.setAttribute("autocorrect", "off");
 ta.setAttribute("autocapitalize", "off");
 ta.setAttribute("spellcheck", "false");
 ta.style.left = -100 + "px";
 ta.style.top = -100 + "px";
 ta.style.height = 1;
 ta.style.width = 1;
 ta.value = str;
 document.body.appendChild(ta);
 ta.select();
 document.execCommand("copy");
 document.body.removeChild(ta);
}

function sapp_js_add_dragndrop_listeners(canvas_name_cstr) {
 Module.sokol_drop_files = [];
 const canvas_name = UTF8ToString(canvas_name_cstr);
 const canvas = document.getElementById(canvas_name);
 Module.sokol_dragenter = event => {
  event.stopPropagation();
  event.preventDefault();
 };
 Module.sokol_dragleave = event => {
  event.stopPropagation();
  event.preventDefault();
 };
 Module.sokol_dragover = event => {
  event.stopPropagation();
  event.preventDefault();
 };
 Module.sokol_drop = event => {
  event.stopPropagation();
  event.preventDefault();
  const files = event.dataTransfer.files;
  Module.sokol_dropped_files = files;
  __sapp_emsc_begin_drop(files.length);
  for (let i = 0; i < files.length; i++) {
   withStackSave(() => {
    const cstr = stringToUTF8OnStack(files[i].name);
    __sapp_emsc_drop(i, cstr);
   });
  }
  let mods = 0;
  if (event.shiftKey) {
   mods |= 1;
  }
  if (event.ctrlKey) {
   mods |= 2;
  }
  if (event.altKey) {
   mods |= 4;
  }
  if (event.metaKey) {
   mods |= 8;
  }
  __sapp_emsc_end_drop(event.clientX, event.clientY, mods);
 };
 canvas.addEventListener("dragenter", Module.sokol_dragenter, false);
 canvas.addEventListener("dragleave", Module.sokol_dragleave, false);
 canvas.addEventListener("dragover", Module.sokol_dragover, false);
 canvas.addEventListener("drop", Module.sokol_drop, false);
}

function sapp_js_dropped_file_size(index) {
 /** @suppress {missingProperties} */ const files = Module.sokol_dropped_files;
 if ((index < 0) || (index >= files.length)) {
  return 0;
 } else {
  return files[index].size;
 }
}

function sapp_js_fetch_dropped_file(index, callback, buf_ptr, buf_size, user_data) {
 const reader = new FileReader;
 reader.onload = loadEvent => {
  const content = loadEvent.target.result;
  if (content.byteLength > buf_size) {
   __sapp_emsc_invoke_fetch_cb(index, 0, 1, callback, 0, buf_ptr, buf_size, user_data);
  } else {
   HEAPU8.set(new Uint8Array(content), buf_ptr);
   __sapp_emsc_invoke_fetch_cb(index, 1, 0, callback, content.byteLength, buf_ptr, buf_size, user_data);
  }
 };
 reader.onerror = () => {
  __sapp_emsc_invoke_fetch_cb(index, 0, 2, callback, 0, buf_ptr, buf_size, user_data);
 };
 /** @suppress {missingProperties} */ const files = Module.sokol_dropped_files;
 reader.readAsArrayBuffer(files[index]);
}

function sapp_js_remove_dragndrop_listeners(canvas_name_cstr) {
 const canvas_name = UTF8ToString(canvas_name_cstr);
 const canvas = document.getElementById(canvas_name);
 canvas.removeEventListener("dragenter", Module.sokol_dragenter);
 canvas.removeEventListener("dragleave", Module.sokol_dragleave);
 canvas.removeEventListener("dragover", Module.sokol_dragover);
 canvas.removeEventListener("drop", Module.sokol_drop);
}

function sapp_js_init(c_str_target) {
 const target_str = UTF8ToString(c_str_target);
 Module.sapp_emsc_target = document.getElementById(target_str);
 if (!Module.sapp_emsc_target) {
  console.log("sokol_app.h: invalid target:" + target_str);
 }
 if (!Module.sapp_emsc_target.requestPointerLock) {
  console.log("sokol_app.h: target doesn't support requestPointerLock:" + target_str);
 }
}

function sapp_js_request_pointerlock() {
 if (Module.sapp_emsc_target) {
  if (Module.sapp_emsc_target.requestPointerLock) {
   Module.sapp_emsc_target.requestPointerLock();
  }
 }
}

function sapp_js_exit_pointerlock() {
 if (document.exitPointerLock) {
  document.exitPointerLock();
 }
}

function sapp_js_set_cursor(cursor_type, shown) {
 if (Module.sapp_emsc_target) {
  let cursor;
  if (shown === 0) {
   cursor = "none";
  } else switch (cursor_type) {
  case 0:
   cursor = "auto";
   break;

  case 1:
   cursor = "default";
   break;

  case 2:
   cursor = "text";
   break;

  case 3:
   cursor = "crosshair";
   break;

  case 4:
   cursor = "pointer";
   break;

  case 5:
   cursor = "ew-resize";
   break;

  case 6:
   cursor = "ns-resize";
   break;

  case 7:
   cursor = "nwse-resize";
   break;

  case 8:
   cursor = "nesw-resize";
   break;

  case 9:
   cursor = "all-scroll";
   break;

  case 10:
   cursor = "not-allowed";
   break;

  default:
   cursor = "auto";
   break;
  }
  Module.sapp_emsc_target.style.cursor = cursor;
 }
}

function sapp_js_clear_favicon() {
 const link = document.getElementById("sokol-app-favicon");
 if (link) {
  document.head.removeChild(link);
 }
}

function sapp_js_set_favicon(w, h, pixels) {
 const canvas = document.createElement("canvas");
 canvas.width = w;
 canvas.height = h;
 const ctx = canvas.getContext("2d");
 const img_data = ctx.createImageData(w, h);
 img_data.data.set(HEAPU8.subarray(pixels, pixels + w * h * 4));
 ctx.putImageData(img_data, 0, 0);
 const new_link = document.createElement("link");
 new_link.id = "sokol-app-favicon";
 new_link.rel = "shortcut icon";
 new_link.href = canvas.toDataURL();
 document.head.appendChild(new_link);
}

/** @constructor */ function ExitStatus(status) {
 this.name = "ExitStatus";
 this.message = `Program terminated with exit(${status})`;
 this.status = status;
}

var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;

/**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */ var UTF8ArrayToString = (heapOrArray, idx, maxBytesToRead) => {
 var endIdx = idx + maxBytesToRead;
 var endPtr = idx;
 while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
 if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
  return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
 }
 var str = "";
 while (idx < endPtr) {
  var u0 = heapOrArray[idx++];
  if (!(u0 & 128)) {
   str += String.fromCharCode(u0);
   continue;
  }
  var u1 = heapOrArray[idx++] & 63;
  if ((u0 & 224) == 192) {
   str += String.fromCharCode(((u0 & 31) << 6) | u1);
   continue;
  }
  var u2 = heapOrArray[idx++] & 63;
  if ((u0 & 240) == 224) {
   u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
  } else {
   u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
  }
  if (u0 < 65536) {
   str += String.fromCharCode(u0);
  } else {
   var ch = u0 - 65536;
   str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
  }
 }
 return str;
};

var callRuntimeCallbacks = callbacks => {
 while (callbacks.length > 0) {
  callbacks.shift()(Module);
 }
};

/**
     * @param {number} ptr
     * @param {string} type
     */ function getValue(ptr, type = "i8") {
 if (type.endsWith("*")) type = "*";
 switch (type) {
 case "i1":
  return SAFE_HEAP_LOAD(ptr, 1, 0);

 case "i8":
  return SAFE_HEAP_LOAD(ptr, 1, 0);

 case "i16":
  return SAFE_HEAP_LOAD(((ptr) >> 1) * 2, 2, 0);

 case "i32":
  return SAFE_HEAP_LOAD(((ptr) >> 2) * 4, 4, 0);

 case "i64":
  abort("to do getValue(i64) use WASM_BIGINT");

 case "float":
  return SAFE_HEAP_LOAD_D(((ptr) >> 2) * 4, 4, 0);

 case "double":
  return SAFE_HEAP_LOAD_D(((ptr) >> 3) * 8, 8, 0);

 case "*":
  return SAFE_HEAP_LOAD(((ptr) >> 2) * 4, 4, 1);

 default:
  abort(`invalid type for getValue: ${type}`);
 }
}

function getValue_safe(ptr, type = "i8") {
 if (type.endsWith("*")) type = "*";
 switch (type) {
 case "i1":
  return HEAP8[ptr];

 case "i8":
  return HEAP8[ptr];

 case "i16":
  return HEAP16[((ptr) >> 1)];

 case "i32":
  return HEAP32[((ptr) >> 2)];

 case "i64":
  abort("to do getValue(i64) use WASM_BIGINT");

 case "float":
  return HEAPF32[((ptr) >> 2)];

 case "double":
  return HEAPF64[((ptr) >> 3)];

 case "*":
  return HEAPU32[((ptr) >> 2)];

 default:
  abort(`invalid type for getValue: ${type}`);
 }
}

var noExitRuntime = Module["noExitRuntime"] || true;

var ptrToString = ptr => {
 ptr >>>= 0;
 return "0x" + ptr.toString(16).padStart(8, "0");
};

/**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */ function setValue(ptr, value, type = "i8") {
 if (type.endsWith("*")) type = "*";
 switch (type) {
 case "i1":
  SAFE_HEAP_STORE(ptr, value, 1);
  break;

 case "i8":
  SAFE_HEAP_STORE(ptr, value, 1);
  break;

 case "i16":
  SAFE_HEAP_STORE(((ptr) >> 1) * 2, value, 2);
  break;

 case "i32":
  SAFE_HEAP_STORE(((ptr) >> 2) * 4, value, 4);
  break;

 case "i64":
  abort("to do setValue(i64) use WASM_BIGINT");

 case "float":
  SAFE_HEAP_STORE_D(((ptr) >> 2) * 4, value, 4);
  break;

 case "double":
  SAFE_HEAP_STORE_D(((ptr) >> 3) * 8, value, 8);
  break;

 case "*":
  SAFE_HEAP_STORE(((ptr) >> 2) * 4, value, 4);
  break;

 default:
  abort(`invalid type for setValue: ${type}`);
 }
}

function setValue_safe(ptr, value, type = "i8") {
 if (type.endsWith("*")) type = "*";
 switch (type) {
 case "i1":
  HEAP8[ptr] = value;
  break;

 case "i8":
  HEAP8[ptr] = value;
  break;

 case "i16":
  HEAP16[((ptr) >> 1)] = value;
  break;

 case "i32":
  HEAP32[((ptr) >> 2)] = value;
  break;

 case "i64":
  abort("to do setValue(i64) use WASM_BIGINT");

 case "float":
  HEAPF32[((ptr) >> 2)] = value;
  break;

 case "double":
  HEAPF64[((ptr) >> 3)] = value;
  break;

 case "*":
  HEAPU32[((ptr) >> 2)] = value;
  break;

 default:
  abort(`invalid type for setValue: ${type}`);
 }
}

var stackRestore = val => __emscripten_stack_restore(val);

var stackSave = () => _emscripten_stack_get_current();

var unSign = (value, bits) => {
 if (value >= 0) {
  return value;
 }
 return bits <= 32 ? 2 * Math.abs(1 << (bits - 1)) + value : Math.pow(2, bits) + value;
};

/**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */ var UTF8ToString = (ptr, maxBytesToRead) => ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";

var ___assert_fail = (condition, filename, line, func) => {
 abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [ filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function" ]);
};

var nowIsMonotonic = 1;

var __emscripten_get_now_is_monotonic = () => nowIsMonotonic;

var __emscripten_memcpy_js = (dest, src, num) => HEAPU8.copyWithin(dest, src, src + num);

var _abort = () => {
 abort("");
};

var _emscripten_set_main_loop_timing = (mode, value) => {
 Browser.mainLoop.timingMode = mode;
 Browser.mainLoop.timingValue = value;
 if (!Browser.mainLoop.func) {
  return 1;
 }
 if (!Browser.mainLoop.running) {
  Browser.mainLoop.running = true;
 }
 if (mode == 0) {
  Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
   var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
   setTimeout(Browser.mainLoop.runner, timeUntilNextTick);
  };
  Browser.mainLoop.method = "timeout";
 } else if (mode == 1) {
  Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
   Browser.requestAnimationFrame(Browser.mainLoop.runner);
  };
  Browser.mainLoop.method = "rAF";
 } else if (mode == 2) {
  if (typeof Browser.setImmediate == "undefined") {
   if (typeof setImmediate == "undefined") {
    var setImmediates = [];
    var emscriptenMainLoopMessageId = "setimmediate";
    /** @param {Event} event */ var Browser_setImmediate_messageHandler = event => {
     if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
      event.stopPropagation();
      setImmediates.shift()();
     }
    };
    addEventListener("message", Browser_setImmediate_messageHandler, true);
    Browser.setImmediate = /** @type{function(function(): ?, ...?): number} */ (function Browser_emulated_setImmediate(func) {
     setImmediates.push(func);
     if (ENVIRONMENT_IS_WORKER) {
      if (Module["setImmediates"] === undefined) Module["setImmediates"] = [];
      Module["setImmediates"].push(func);
      postMessage({
       target: emscriptenMainLoopMessageId
      });
     } else postMessage(emscriptenMainLoopMessageId, "*");
    });
   } else {
    Browser.setImmediate = setImmediate;
   }
  }
  Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
   Browser.setImmediate(Browser.mainLoop.runner);
  };
  Browser.mainLoop.method = "immediate";
 }
 return 0;
};

var _emscripten_get_now;

_emscripten_get_now = () => performance.now();

/**
     * @param {number=} arg
     * @param {boolean=} noSetTiming
     */ var setMainLoop = (browserIterationFunc, fps, simulateInfiniteLoop, arg, noSetTiming) => {
 Browser.mainLoop.func = browserIterationFunc;
 Browser.mainLoop.arg = arg;
 /** @type{number} */ var thisMainLoopId = (() => Browser.mainLoop.currentlyRunningMainloop)();
 function checkIsRunning() {
  if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) {
   return false;
  }
  return true;
 }
 Browser.mainLoop.running = false;
 Browser.mainLoop.runner = function Browser_mainLoop_runner() {
  if (ABORT) return;
  if (Browser.mainLoop.queue.length > 0) {
   var start = Date.now();
   var blocker = Browser.mainLoop.queue.shift();
   blocker.func(blocker.arg);
   if (Browser.mainLoop.remainingBlockers) {
    var remaining = Browser.mainLoop.remainingBlockers;
    var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
    if (blocker.counted) {
     Browser.mainLoop.remainingBlockers = next;
    } else {
     next = next + .5;
     Browser.mainLoop.remainingBlockers = (8 * remaining + next) / 9;
    }
   }
   Browser.mainLoop.updateStatus();
   if (!checkIsRunning()) return;
   setTimeout(Browser.mainLoop.runner, 0);
   return;
  }
  if (!checkIsRunning()) return;
  Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
  if (Browser.mainLoop.timingMode == 1 && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
   Browser.mainLoop.scheduler();
   return;
  } else if (Browser.mainLoop.timingMode == 0) {
   Browser.mainLoop.tickStartTime = _emscripten_get_now();
  }
  Browser.mainLoop.runIter(browserIterationFunc);
  checkStackCookie();
  if (!checkIsRunning()) return;
  if (typeof SDL == "object") SDL.audio?.queueNewAudioData?.();
  Browser.mainLoop.scheduler();
 };
 if (!noSetTiming) {
  if (fps && fps > 0) {
   _emscripten_set_main_loop_timing(0, 1e3 / fps);
  } else {
   _emscripten_set_main_loop_timing(1, 1);
  }
  Browser.mainLoop.scheduler();
 }
 if (simulateInfiniteLoop) {
  throw "unwind";
 }
};

var handleException = e => {
 if (e instanceof ExitStatus || e == "unwind") {
  return EXITSTATUS;
 }
 checkStackCookie();
 if (e instanceof WebAssembly.RuntimeError) {
  if (_emscripten_stack_get_current() <= 0) {
   err("Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 16777216)");
  }
 }
 quit_(1, e);
};

var runtimeKeepaliveCounter = 0;

var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;

var _proc_exit = code => {
 EXITSTATUS = code;
 if (!keepRuntimeAlive()) {
  Module["onExit"]?.(code);
  ABORT = true;
 }
 quit_(code, new ExitStatus(code));
};

/** @param {boolean|number=} implicit */ var exitJS = (status, implicit) => {
 EXITSTATUS = status;
 _proc_exit(status);
};

var _exit = exitJS;

var maybeExit = () => {
 if (!keepRuntimeAlive()) {
  try {
   _exit(EXITSTATUS);
  } catch (e) {
   handleException(e);
  }
 }
};

var callUserCallback = func => {
 if (ABORT) {
  return;
 }
 try {
  func();
  maybeExit();
 } catch (e) {
  handleException(e);
 }
};

/** @param {number=} timeout */ var safeSetTimeout = (func, timeout) => setTimeout(() => {
 callUserCallback(func);
}, timeout);

var warnOnce = text => {
 warnOnce.shown ||= {};
 if (!warnOnce.shown[text]) {
  warnOnce.shown[text] = 1;
  if (ENVIRONMENT_IS_NODE) text = "warning: " + text;
  err(text);
 }
};

var preloadPlugins = Module["preloadPlugins"] || [];

var Browser = {
 mainLoop: {
  running: false,
  scheduler: null,
  method: "",
  currentlyRunningMainloop: 0,
  func: null,
  arg: 0,
  timingMode: 0,
  timingValue: 0,
  currentFrameNumber: 0,
  queue: [],
  pause() {
   Browser.mainLoop.scheduler = null;
   Browser.mainLoop.currentlyRunningMainloop++;
  },
  resume() {
   Browser.mainLoop.currentlyRunningMainloop++;
   var timingMode = Browser.mainLoop.timingMode;
   var timingValue = Browser.mainLoop.timingValue;
   var func = Browser.mainLoop.func;
   Browser.mainLoop.func = null;
   setMainLoop(func, 0, false, Browser.mainLoop.arg, true);
   _emscripten_set_main_loop_timing(timingMode, timingValue);
   Browser.mainLoop.scheduler();
  },
  updateStatus() {
   if (Module["setStatus"]) {
    var message = Module["statusMessage"] || "Please wait...";
    var remaining = Browser.mainLoop.remainingBlockers;
    var expected = Browser.mainLoop.expectedBlockers;
    if (remaining) {
     if (remaining < expected) {
      Module["setStatus"](`{message} ({expected - remaining}/{expected})`);
     } else {
      Module["setStatus"](message);
     }
    } else {
     Module["setStatus"]("");
    }
   }
  },
  runIter(func) {
   if (ABORT) return;
   if (Module["preMainLoop"]) {
    var preRet = Module["preMainLoop"]();
    if (preRet === false) {
     return;
    }
   }
   callUserCallback(func);
   Module["postMainLoop"]?.();
  }
 },
 isFullscreen: false,
 pointerLock: false,
 moduleContextCreatedCallbacks: [],
 workers: [],
 init() {
  if (Browser.initted) return;
  Browser.initted = true;
  var imagePlugin = {};
  imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
   return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
  };
  imagePlugin["handle"] = function imagePlugin_handle(byteArray, name, onload, onerror) {
   var b = new Blob([ byteArray ], {
    type: Browser.getMimetype(name)
   });
   if (b.size !== byteArray.length) {
    b = new Blob([ (new Uint8Array(byteArray)).buffer ], {
     type: Browser.getMimetype(name)
    });
   }
   var url = URL.createObjectURL(b);
   var img = new Image;
   img.onload = () => {
    var canvas = /** @type {!HTMLCanvasElement} */ (document.createElement("canvas"));
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    preloadedImages[name] = canvas;
    URL.revokeObjectURL(url);
    onload?.(byteArray);
   };
   img.onerror = event => {
    err(`Image ${url} could not be decoded`);
    onerror?.();
   };
   img.src = url;
  };
  preloadPlugins.push(imagePlugin);
  var audioPlugin = {};
  audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
   return !Module.noAudioDecoding && name.substr(-4) in {
    ".ogg": 1,
    ".wav": 1,
    ".mp3": 1
   };
  };
  audioPlugin["handle"] = function audioPlugin_handle(byteArray, name, onload, onerror) {
   var done = false;
   function finish(audio) {
    if (done) return;
    done = true;
    preloadedAudios[name] = audio;
    onload?.(byteArray);
   }
   function fail() {
    if (done) return;
    done = true;
    preloadedAudios[name] = new Audio;
    onerror?.();
   }
   var b = new Blob([ byteArray ], {
    type: Browser.getMimetype(name)
   });
   var url = URL.createObjectURL(b);
   var audio = new Audio;
   audio.addEventListener("canplaythrough", () => finish(audio), false);
   audio.onerror = function audio_onerror(event) {
    if (done) return;
    err(`warning: browser could not fully decode audio ${name}, trying slower base64 approach`);
    function encode64(data) {
     var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
     var PAD = "=";
     var ret = "";
     var leftchar = 0;
     var leftbits = 0;
     for (var i = 0; i < data.length; i++) {
      leftchar = (leftchar << 8) | data[i];
      leftbits += 8;
      while (leftbits >= 6) {
       var curr = (leftchar >> (leftbits - 6)) & 63;
       leftbits -= 6;
       ret += BASE[curr];
      }
     }
     if (leftbits == 2) {
      ret += BASE[(leftchar & 3) << 4];
      ret += PAD + PAD;
     } else if (leftbits == 4) {
      ret += BASE[(leftchar & 15) << 2];
      ret += PAD;
     }
     return ret;
    }
    audio.src = "data:audio/x-" + name.substr(-3) + ";base64," + encode64(byteArray);
    finish(audio);
   };
   audio.src = url;
   safeSetTimeout(() => {
    finish(audio);
   },  1e4);
  };
  preloadPlugins.push(audioPlugin);
  function pointerLockChange() {
   Browser.pointerLock = document["pointerLockElement"] === Module["canvas"] || document["mozPointerLockElement"] === Module["canvas"] || document["webkitPointerLockElement"] === Module["canvas"] || document["msPointerLockElement"] === Module["canvas"];
  }
  var canvas = Module["canvas"];
  if (canvas) {
   canvas.requestPointerLock = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"] || canvas["webkitRequestPointerLock"] || canvas["msRequestPointerLock"] || (() => {});
   canvas.exitPointerLock = document["exitPointerLock"] || document["mozExitPointerLock"] || document["webkitExitPointerLock"] || document["msExitPointerLock"] || (() => {});
   canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
   document.addEventListener("pointerlockchange", pointerLockChange, false);
   document.addEventListener("mozpointerlockchange", pointerLockChange, false);
   document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
   document.addEventListener("mspointerlockchange", pointerLockChange, false);
   if (Module["elementPointerLock"]) {
    canvas.addEventListener("click", ev => {
     if (!Browser.pointerLock && Module["canvas"].requestPointerLock) {
      Module["canvas"].requestPointerLock();
      ev.preventDefault();
     }
    }, false);
   }
  }
 },
 createContext(/** @type {HTMLCanvasElement} */ canvas, useWebGL, setInModule, webGLContextAttributes) {
  if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx;
  var ctx;
  var contextHandle;
  if (useWebGL) {
   var contextAttributes = {
    antialias: false,
    alpha: false,
    majorVersion: (typeof WebGL2RenderingContext != "undefined") ? 2 : 1
   };
   if (webGLContextAttributes) {
    for (var attribute in webGLContextAttributes) {
     contextAttributes[attribute] = webGLContextAttributes[attribute];
    }
   }
   if (typeof GL != "undefined") {
    contextHandle = GL.createContext(canvas, contextAttributes);
    if (contextHandle) {
     ctx = GL.getContext(contextHandle).GLctx;
    }
   }
  } else {
   ctx = canvas.getContext("2d");
  }
  if (!ctx) return null;
  if (setInModule) {
   Module.ctx = ctx;
   if (useWebGL) GL.makeContextCurrent(contextHandle);
   Module.useWebGL = useWebGL;
   Browser.moduleContextCreatedCallbacks.forEach(callback => callback());
   Browser.init();
  }
  return ctx;
 },
 destroyContext(canvas, useWebGL, setInModule) {},
 fullscreenHandlersInstalled: false,
 lockPointer: undefined,
 resizeCanvas: undefined,
 requestFullscreen(lockPointer, resizeCanvas) {
  Browser.lockPointer = lockPointer;
  Browser.resizeCanvas = resizeCanvas;
  if (typeof Browser.lockPointer == "undefined") Browser.lockPointer = true;
  if (typeof Browser.resizeCanvas == "undefined") Browser.resizeCanvas = false;
  var canvas = Module["canvas"];
  function fullscreenChange() {
   Browser.isFullscreen = false;
   var canvasContainer = canvas.parentNode;
   if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvasContainer) {
    canvas.exitFullscreen = Browser.exitFullscreen;
    if (Browser.lockPointer) canvas.requestPointerLock();
    Browser.isFullscreen = true;
    if (Browser.resizeCanvas) {
     Browser.setFullscreenCanvasSize();
    } else {
     Browser.updateCanvasDimensions(canvas);
    }
   } else {
    canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
    canvasContainer.parentNode.removeChild(canvasContainer);
    if (Browser.resizeCanvas) {
     Browser.setWindowedCanvasSize();
    } else {
     Browser.updateCanvasDimensions(canvas);
    }
   }
   Module["onFullScreen"]?.(Browser.isFullscreen);
   Module["onFullscreen"]?.(Browser.isFullscreen);
  }
  if (!Browser.fullscreenHandlersInstalled) {
   Browser.fullscreenHandlersInstalled = true;
   document.addEventListener("fullscreenchange", fullscreenChange, false);
   document.addEventListener("mozfullscreenchange", fullscreenChange, false);
   document.addEventListener("webkitfullscreenchange", fullscreenChange, false);
   document.addEventListener("MSFullscreenChange", fullscreenChange, false);
  }
  var canvasContainer = document.createElement("div");
  canvas.parentNode.insertBefore(canvasContainer, canvas);
  canvasContainer.appendChild(canvas);
  canvasContainer.requestFullscreen = canvasContainer["requestFullscreen"] || canvasContainer["mozRequestFullScreen"] || canvasContainer["msRequestFullscreen"] || (canvasContainer["webkitRequestFullscreen"] ? () => canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null) || (canvasContainer["webkitRequestFullScreen"] ? () => canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null);
  canvasContainer.requestFullscreen();
 },
 exitFullscreen() {
  if (!Browser.isFullscreen) {
   return false;
  }
  var CFS = document["exitFullscreen"] || document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["msExitFullscreen"] || document["webkitCancelFullScreen"] || (() => {});
  CFS.apply(document, []);
  return true;
 },
 nextRAF: 0,
 fakeRequestAnimationFrame(func) {
  var now = Date.now();
  if (Browser.nextRAF === 0) {
   Browser.nextRAF = now + 1e3 / 60;
  } else {
   while (now + 2 >= Browser.nextRAF) {
    Browser.nextRAF += 1e3 / 60;
   }
  }
  var delay = Math.max(Browser.nextRAF - now, 0);
  setTimeout(func, delay);
 },
 requestAnimationFrame(func) {
  if (typeof requestAnimationFrame == "function") {
   requestAnimationFrame(func);
   return;
  }
  var RAF = Browser.fakeRequestAnimationFrame;
  RAF(func);
 },
 safeSetTimeout(func, timeout) {
  return safeSetTimeout(func, timeout);
 },
 safeRequestAnimationFrame(func) {
  return Browser.requestAnimationFrame(() => {
   callUserCallback(func);
  });
 },
 getMimetype(name) {
  return {
   "jpg": "image/jpeg",
   "jpeg": "image/jpeg",
   "png": "image/png",
   "bmp": "image/bmp",
   "ogg": "audio/ogg",
   "wav": "audio/wav",
   "mp3": "audio/mpeg"
  }[name.substr(name.lastIndexOf(".") + 1)];
 },
 getUserMedia(func) {
  window.getUserMedia ||= navigator["getUserMedia"] || navigator["mozGetUserMedia"];
  window.getUserMedia(func);
 },
 getMovementX(event) {
  return event["movementX"] || event["mozMovementX"] || event["webkitMovementX"] || 0;
 },
 getMovementY(event) {
  return event["movementY"] || event["mozMovementY"] || event["webkitMovementY"] || 0;
 },
 getMouseWheelDelta(event) {
  var delta = 0;
  switch (event.type) {
  case "DOMMouseScroll":
   delta = event.detail / 3;
   break;

  case "mousewheel":
   delta = event.wheelDelta / 120;
   break;

  case "wheel":
   delta = event.deltaY;
   switch (event.deltaMode) {
   case 0:
    delta /= 100;
    break;

   case 1:
    delta /= 3;
    break;

   case 2:
    delta *= 80;
    break;

   default:
    throw "unrecognized mouse wheel delta mode: " + event.deltaMode;
   }
   break;

  default:
   throw "unrecognized mouse wheel event: " + event.type;
  }
  return delta;
 },
 mouseX: 0,
 mouseY: 0,
 mouseMovementX: 0,
 mouseMovementY: 0,
 touches: {},
 lastTouches: {},
 calculateMouseCoords(pageX, pageY) {
  var rect = Module["canvas"].getBoundingClientRect();
  var cw = Module["canvas"].width;
  var ch = Module["canvas"].height;
  var scrollX = ((typeof window.scrollX != "undefined") ? window.scrollX : window.pageXOffset);
  var scrollY = ((typeof window.scrollY != "undefined") ? window.scrollY : window.pageYOffset);
  var adjustedX = pageX - (scrollX + rect.left);
  var adjustedY = pageY - (scrollY + rect.top);
  adjustedX = adjustedX * (cw / rect.width);
  adjustedY = adjustedY * (ch / rect.height);
  return {
   x: adjustedX,
   y: adjustedY
  };
 },
 setMouseCoords(pageX, pageY) {
  const {x: x, y: y} = Browser.calculateMouseCoords(pageX, pageY);
  Browser.mouseMovementX = x - Browser.mouseX;
  Browser.mouseMovementY = y - Browser.mouseY;
  Browser.mouseX = x;
  Browser.mouseY = y;
 },
 calculateMouseEvent(event) {
  if (Browser.pointerLock) {
   if (event.type != "mousemove" && ("mozMovementX" in event)) {
    Browser.mouseMovementX = Browser.mouseMovementY = 0;
   } else {
    Browser.mouseMovementX = Browser.getMovementX(event);
    Browser.mouseMovementY = Browser.getMovementY(event);
   }
   Browser.mouseX += Browser.mouseMovementX;
   Browser.mouseY += Browser.mouseMovementY;
  } else {
   if (event.type === "touchstart" || event.type === "touchend" || event.type === "touchmove") {
    var touch = event.touch;
    if (touch === undefined) {
     return;
    }
    var coords = Browser.calculateMouseCoords(touch.pageX, touch.pageY);
    if (event.type === "touchstart") {
     Browser.lastTouches[touch.identifier] = coords;
     Browser.touches[touch.identifier] = coords;
    } else if (event.type === "touchend" || event.type === "touchmove") {
     var last = Browser.touches[touch.identifier];
     last ||= coords;
     Browser.lastTouches[touch.identifier] = last;
     Browser.touches[touch.identifier] = coords;
    }
    return;
   }
   Browser.setMouseCoords(event.pageX, event.pageY);
  }
 },
 resizeListeners: [],
 updateResizeListeners() {
  var canvas = Module["canvas"];
  Browser.resizeListeners.forEach(listener => listener(canvas.width, canvas.height));
 },
 setCanvasSize(width, height, noUpdates) {
  var canvas = Module["canvas"];
  Browser.updateCanvasDimensions(canvas, width, height);
  if (!noUpdates) Browser.updateResizeListeners();
 },
 windowedWidth: 0,
 windowedHeight: 0,
 setFullscreenCanvasSize() {
  if (typeof SDL != "undefined") {
   var flags = SAFE_HEAP_LOAD(((SDL.screen) >> 2) * 4, 4, 1);
   flags = flags | 8388608;
   SAFE_HEAP_STORE(((SDL.screen) >> 2) * 4, flags, 4);
  }
  Browser.updateCanvasDimensions(Module["canvas"]);
  Browser.updateResizeListeners();
 },
 setWindowedCanvasSize() {
  if (typeof SDL != "undefined") {
   var flags = SAFE_HEAP_LOAD(((SDL.screen) >> 2) * 4, 4, 1);
   flags = flags & ~8388608;
   SAFE_HEAP_STORE(((SDL.screen) >> 2) * 4, flags, 4);
  }
  Browser.updateCanvasDimensions(Module["canvas"]);
  Browser.updateResizeListeners();
 },
 updateCanvasDimensions(canvas, wNative, hNative) {
  if (wNative && hNative) {
   canvas.widthNative = wNative;
   canvas.heightNative = hNative;
  } else {
   wNative = canvas.widthNative;
   hNative = canvas.heightNative;
  }
  var w = wNative;
  var h = hNative;
  if (Module["forcedAspectRatio"] && Module["forcedAspectRatio"] > 0) {
   if (w / h < Module["forcedAspectRatio"]) {
    w = Math.round(h * Module["forcedAspectRatio"]);
   } else {
    h = Math.round(w / Module["forcedAspectRatio"]);
   }
  }
  if (((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvas.parentNode) && (typeof screen != "undefined")) {
   var factor = Math.min(screen.width / w, screen.height / h);
   w = Math.round(w * factor);
   h = Math.round(h * factor);
  }
  if (Browser.resizeCanvas) {
   if (canvas.width != w) canvas.width = w;
   if (canvas.height != h) canvas.height = h;
   if (typeof canvas.style != "undefined") {
    canvas.style.removeProperty("width");
    canvas.style.removeProperty("height");
   }
  } else {
   if (canvas.width != wNative) canvas.width = wNative;
   if (canvas.height != hNative) canvas.height = hNative;
   if (typeof canvas.style != "undefined") {
    if (w != wNative || h != hNative) {
     canvas.style.setProperty("width", w + "px", "important");
     canvas.style.setProperty("height", h + "px", "important");
    } else {
     canvas.style.removeProperty("width");
     canvas.style.removeProperty("height");
    }
   }
  }
 }
};

var _emscripten_cancel_main_loop = () => {
 Browser.mainLoop.pause();
 Browser.mainLoop.func = null;
};

var _emscripten_date_now = () => Date.now();

var __emscripten_runtime_keepalive_clear = () => {
 noExitRuntime = false;
 runtimeKeepaliveCounter = 0;
};

var _emscripten_force_exit = status => {
 __emscripten_runtime_keepalive_clear();
 _exit(status);
};

var _emscripten_get_device_pixel_ratio = () => (typeof devicePixelRatio == "number" && devicePixelRatio) || 1;

var withStackSave = f => {
 var stack = stackSave();
 var ret = f();
 stackRestore(stack);
 return ret;
};

var JSEvents = {
 removeAllEventListeners() {
  while (JSEvents.eventHandlers.length) {
   JSEvents._removeHandler(JSEvents.eventHandlers.length - 1);
  }
  JSEvents.deferredCalls = [];
 },
 inEventHandler: 0,
 deferredCalls: [],
 deferCall(targetFunction, precedence, argsList) {
  function arraysHaveEqualContent(arrA, arrB) {
   if (arrA.length != arrB.length) return false;
   for (var i in arrA) {
    if (arrA[i] != arrB[i]) return false;
   }
   return true;
  }
  for (var i in JSEvents.deferredCalls) {
   var call = JSEvents.deferredCalls[i];
   if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
    return;
   }
  }
  JSEvents.deferredCalls.push({
   targetFunction: targetFunction,
   precedence: precedence,
   argsList: argsList
  });
  JSEvents.deferredCalls.sort((x, y) => x.precedence < y.precedence);
 },
 removeDeferredCalls(targetFunction) {
  for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
   if (JSEvents.deferredCalls[i].targetFunction == targetFunction) {
    JSEvents.deferredCalls.splice(i, 1);
    --i;
   }
  }
 },
 canPerformEventHandlerRequests() {
  if (navigator.userActivation) {
   return navigator.userActivation.isActive;
  }
  return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
 },
 runDeferredCalls() {
  if (!JSEvents.canPerformEventHandlerRequests()) {
   return;
  }
  for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
   var call = JSEvents.deferredCalls[i];
   JSEvents.deferredCalls.splice(i, 1);
   --i;
   call.targetFunction(...call.argsList);
  }
 },
 eventHandlers: [],
 removeAllHandlersOnTarget: (target, eventTypeString) => {
  for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
   if (JSEvents.eventHandlers[i].target == target && (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
    JSEvents._removeHandler(i--);
   }
  }
 },
 _removeHandler(i) {
  var h = JSEvents.eventHandlers[i];
  h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
  JSEvents.eventHandlers.splice(i, 1);
 },
 registerOrRemoveHandler(eventHandler) {
  if (!eventHandler.target) {
   return -4;
  }
  if (eventHandler.callbackfunc) {
   eventHandler.eventListenerFunc = function(event) {
    ++JSEvents.inEventHandler;
    JSEvents.currentEventHandler = eventHandler;
    JSEvents.runDeferredCalls();
    eventHandler.handlerFunc(event);
    JSEvents.runDeferredCalls();
    --JSEvents.inEventHandler;
   };
   eventHandler.target.addEventListener(eventHandler.eventTypeString, eventHandler.eventListenerFunc, eventHandler.useCapture);
   JSEvents.eventHandlers.push(eventHandler);
  } else {
   for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
    if (JSEvents.eventHandlers[i].target == eventHandler.target && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
     JSEvents._removeHandler(i--);
    }
   }
  }
  return 0;
 },
 getNodeNameForTarget(target) {
  if (!target) return "";
  if (target == window) return "#window";
  if (target == screen) return "#screen";
  return target?.nodeName || "";
 },
 fullscreenEnabled() {
  return document.fullscreenEnabled ||  document.webkitFullscreenEnabled;
 }
};

var maybeCStringToJsString = cString => cString > 2 ? UTF8ToString(cString) : cString;

/** @type {Object} */ var specialHTMLTargets = [ 0, typeof document != "undefined" ? document : 0, typeof window != "undefined" ? window : 0 ];

var findEventTarget = target => {
 target = maybeCStringToJsString(target);
 var domElement = specialHTMLTargets[target] || (typeof document != "undefined" ? document.querySelector(target) : undefined);
 return domElement;
};

var getBoundingClientRect = e => specialHTMLTargets.indexOf(e) < 0 ? e.getBoundingClientRect() : {
 "left": 0,
 "top": 0
};

var _emscripten_get_element_css_size = (target, width, height) => {
 target = findEventTarget(target);
 if (!target) return -4;
 var rect = getBoundingClientRect(target);
 SAFE_HEAP_STORE_D(((width) >> 3) * 8, rect.width, 8);
 SAFE_HEAP_STORE_D(((height) >> 3) * 8, rect.height, 8);
 return 0;
};

var _emscripten_performance_now = () => performance.now();

var wasmTableMirror = [];

var wasmTable;

var getWasmTableEntry = funcPtr => {
 var func = wasmTableMirror[funcPtr];
 if (!func) {
  if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
  wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
 }
 return func;
};

var _emscripten_request_animation_frame_loop = (cb, userData) => {
 function tick(timeStamp) {
  if (getWasmTableEntry(cb)(timeStamp, userData)) {
   requestAnimationFrame(tick);
  }
 }
 return requestAnimationFrame(tick);
};

var getHeapMax = () =>  2147483648;

var growMemory = size => {
 var b = wasmMemory.buffer;
 var pages = (size - b.byteLength + 65535) / 65536;
 try {
  wasmMemory.grow(pages);
  updateMemoryViews();
  return 1;
 } /*success*/ catch (e) {}
};

var _emscripten_resize_heap = requestedSize => {
 var oldSize = HEAPU8.length;
 requestedSize >>>= 0;
 var maxHeapSize = getHeapMax();
 if (requestedSize > maxHeapSize) {
  return false;
 }
 var alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
 for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
  var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
  overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
  var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
  var replacement = growMemory(newSize);
  if (replacement) {
   return true;
  }
 }
 return false;
};

/** @returns {number} */ var convertFrameToPC = frame => {
 var match;
 if (match = /\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(frame)) {
  return +match[1];
 } else if (match = /\bwasm-function\[(\d+)\]:(\d+)/.exec(frame)) {
  return wasmOffsetConverter.convert(+match[1], +match[2]);
 } else if (match = /:(\d+):\d+(?:\)|$)/.exec(frame)) {
  return 2147483648 | +match[1];
 }
 return 0;
};

function jsStackTrace() {
 return (new Error).stack.toString();
}

var _emscripten_return_address = level => {
 var callstack = jsStackTrace().split("\n");
 if (callstack[0] == "Error") {
  callstack.shift();
 }
 var caller = callstack[level + 3];
 return convertFrameToPC(caller);
};

var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
 if (!(maxBytesToWrite > 0)) return 0;
 var startIdx = outIdx;
 var endIdx = outIdx + maxBytesToWrite - 1;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) {
   var u1 = str.charCodeAt(++i);
   u = 65536 + ((u & 1023) << 10) | (u1 & 1023);
  }
  if (u <= 127) {
   if (outIdx >= endIdx) break;
   heap[outIdx++] = u;
  } else if (u <= 2047) {
   if (outIdx + 1 >= endIdx) break;
   heap[outIdx++] = 192 | (u >> 6);
   heap[outIdx++] = 128 | (u & 63);
  } else if (u <= 65535) {
   if (outIdx + 2 >= endIdx) break;
   heap[outIdx++] = 224 | (u >> 12);
   heap[outIdx++] = 128 | ((u >> 6) & 63);
   heap[outIdx++] = 128 | (u & 63);
  } else {
   if (outIdx + 3 >= endIdx) break;
   heap[outIdx++] = 240 | (u >> 18);
   heap[outIdx++] = 128 | ((u >> 12) & 63);
   heap[outIdx++] = 128 | ((u >> 6) & 63);
   heap[outIdx++] = 128 | (u & 63);
  }
 }
 heap[outIdx] = 0;
 return outIdx - startIdx;
};

var stringToUTF8 = (str, outPtr, maxBytesToWrite) => stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);

var registerFocusEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
 if (!JSEvents.focusEvent) JSEvents.focusEvent = _malloc(256);
 var focusEventHandlerFunc = (e = event) => {
  var nodeName = JSEvents.getNodeNameForTarget(e.target);
  var id = e.target.id ? e.target.id : "";
  var focusEvent = JSEvents.focusEvent;
  stringToUTF8(nodeName, focusEvent + 0, 128);
  stringToUTF8(id, focusEvent + 128, 128);
  if (getWasmTableEntry(callbackfunc)(eventTypeId, focusEvent, userData)) e.preventDefault();
 };
 var eventHandler = {
  target: findEventTarget(target),
  eventTypeString: eventTypeString,
  callbackfunc: callbackfunc,
  handlerFunc: focusEventHandlerFunc,
  useCapture: useCapture
 };
 return JSEvents.registerOrRemoveHandler(eventHandler);
};

var _emscripten_set_blur_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerFocusEventCallback(target, userData, useCapture, callbackfunc, 12, "blur", targetThread);

var findCanvasEventTarget = findEventTarget;

var _emscripten_set_canvas_element_size = (target, width, height) => {
 var canvas = findCanvasEventTarget(target);
 if (!canvas) return -4;
 canvas.width = width;
 canvas.height = height;
 return 0;
};

var _emscripten_set_focus_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerFocusEventCallback(target, userData, useCapture, callbackfunc, 13, "focus", targetThread);

var registerKeyEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
 if (!JSEvents.keyEvent) JSEvents.keyEvent = _malloc(176);
 var keyEventHandlerFunc = e => {
  var keyEventData = JSEvents.keyEvent;
  SAFE_HEAP_STORE_D(((keyEventData) >> 3) * 8, e.timeStamp, 8);
  var idx = ((keyEventData) >> 2);
  SAFE_HEAP_STORE((idx + 2) * 4, e.location, 4);
  SAFE_HEAP_STORE((idx + 3) * 4, e.ctrlKey, 4);
  SAFE_HEAP_STORE((idx + 4) * 4, e.shiftKey, 4);
  SAFE_HEAP_STORE((idx + 5) * 4, e.altKey, 4);
  SAFE_HEAP_STORE((idx + 6) * 4, e.metaKey, 4);
  SAFE_HEAP_STORE((idx + 7) * 4, e.repeat, 4);
  SAFE_HEAP_STORE((idx + 8) * 4, e.charCode, 4);
  SAFE_HEAP_STORE((idx + 9) * 4, e.keyCode, 4);
  SAFE_HEAP_STORE((idx + 10) * 4, e.which, 4);
  stringToUTF8(e.key || "", keyEventData + 44, 32);
  stringToUTF8(e.code || "", keyEventData + 76, 32);
  stringToUTF8(e.char || "", keyEventData + 108, 32);
  stringToUTF8(e.locale || "", keyEventData + 140, 32);
  if (getWasmTableEntry(callbackfunc)(eventTypeId, keyEventData, userData)) e.preventDefault();
 };
 var eventHandler = {
  target: findEventTarget(target),
  eventTypeString: eventTypeString,
  callbackfunc: callbackfunc,
  handlerFunc: keyEventHandlerFunc,
  useCapture: useCapture
 };
 return JSEvents.registerOrRemoveHandler(eventHandler);
};

var _emscripten_set_keydown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerKeyEventCallback(target, userData, useCapture, callbackfunc, 2, "keydown", targetThread);

var _emscripten_set_keypress_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerKeyEventCallback(target, userData, useCapture, callbackfunc, 1, "keypress", targetThread);

var _emscripten_set_keyup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerKeyEventCallback(target, userData, useCapture, callbackfunc, 3, "keyup", targetThread);

var _emscripten_set_main_loop = (func, fps, simulateInfiniteLoop) => {
 var browserIterationFunc = getWasmTableEntry(func);
 setMainLoop(browserIterationFunc, fps, simulateInfiniteLoop);
};

var fillMouseEventData = (eventStruct, e, target) => {
 SAFE_HEAP_STORE_D(((eventStruct) >> 3) * 8, e.timeStamp, 8);
 var idx = ((eventStruct) >> 2);
 SAFE_HEAP_STORE((idx + 2) * 4, e.screenX, 4);
 SAFE_HEAP_STORE((idx + 3) * 4, e.screenY, 4);
 SAFE_HEAP_STORE((idx + 4) * 4, e.clientX, 4);
 SAFE_HEAP_STORE((idx + 5) * 4, e.clientY, 4);
 SAFE_HEAP_STORE((idx + 6) * 4, e.ctrlKey, 4);
 SAFE_HEAP_STORE((idx + 7) * 4, e.shiftKey, 4);
 SAFE_HEAP_STORE((idx + 8) * 4, e.altKey, 4);
 SAFE_HEAP_STORE((idx + 9) * 4, e.metaKey, 4);
 SAFE_HEAP_STORE((idx * 2 + 20) * 2, e.button, 2);
 SAFE_HEAP_STORE((idx * 2 + 21) * 2, e.buttons, 2);
 SAFE_HEAP_STORE((idx + 11) * 4, e["movementX"], 4);
 SAFE_HEAP_STORE((idx + 12) * 4, e["movementY"], 4);
 var rect = getBoundingClientRect(target);
 SAFE_HEAP_STORE((idx + 13) * 4, e.clientX - (rect.left | 0), 4);
 SAFE_HEAP_STORE((idx + 14) * 4, e.clientY - (rect.top | 0), 4);
};

var registerMouseEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
 if (!JSEvents.mouseEvent) JSEvents.mouseEvent = _malloc(72);
 target = findEventTarget(target);
 var mouseEventHandlerFunc = (e = event) => {
  fillMouseEventData(JSEvents.mouseEvent, e, target);
  if (getWasmTableEntry(callbackfunc)(eventTypeId, JSEvents.mouseEvent, userData)) e.preventDefault();
 };
 var eventHandler = {
  target: target,
  allowsDeferredCalls: eventTypeString != "mousemove" && eventTypeString != "mouseenter" && eventTypeString != "mouseleave",
  eventTypeString: eventTypeString,
  callbackfunc: callbackfunc,
  handlerFunc: mouseEventHandlerFunc,
  useCapture: useCapture
 };
 return JSEvents.registerOrRemoveHandler(eventHandler);
};

var _emscripten_set_mousedown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerMouseEventCallback(target, userData, useCapture, callbackfunc, 5, "mousedown", targetThread);

var _emscripten_set_mouseenter_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerMouseEventCallback(target, userData, useCapture, callbackfunc, 33, "mouseenter", targetThread);

var _emscripten_set_mouseleave_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerMouseEventCallback(target, userData, useCapture, callbackfunc, 34, "mouseleave", targetThread);

var _emscripten_set_mousemove_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerMouseEventCallback(target, userData, useCapture, callbackfunc, 8, "mousemove", targetThread);

var _emscripten_set_mouseup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerMouseEventCallback(target, userData, useCapture, callbackfunc, 6, "mouseup", targetThread);

var fillPointerlockChangeEventData = eventStruct => {
 var pointerLockElement = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement;
 var isPointerlocked = !!pointerLockElement;
 SAFE_HEAP_STORE(((eventStruct) >> 2) * 4, isPointerlocked, 4);
 var nodeName = JSEvents.getNodeNameForTarget(pointerLockElement);
 var id = pointerLockElement?.id || "";
 stringToUTF8(nodeName, eventStruct + 4, 128);
 stringToUTF8(id, eventStruct + 132, 128);
};

var registerPointerlockChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
 if (!JSEvents.pointerlockChangeEvent) JSEvents.pointerlockChangeEvent = _malloc(260);
 var pointerlockChangeEventHandlerFunc = (e = event) => {
  var pointerlockChangeEvent = JSEvents.pointerlockChangeEvent;
  fillPointerlockChangeEventData(pointerlockChangeEvent);
  if (getWasmTableEntry(callbackfunc)(eventTypeId, pointerlockChangeEvent, userData)) e.preventDefault();
 };
 var eventHandler = {
  target: target,
  eventTypeString: eventTypeString,
  callbackfunc: callbackfunc,
  handlerFunc: pointerlockChangeEventHandlerFunc,
  useCapture: useCapture
 };
 return JSEvents.registerOrRemoveHandler(eventHandler);
};

/** @suppress {missingProperties} */ var _emscripten_set_pointerlockchange_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
 if (!document || !document.body || (!document.body.requestPointerLock && !document.body.mozRequestPointerLock && !document.body.webkitRequestPointerLock && !document.body.msRequestPointerLock)) {
  return -1;
 }
 target = findEventTarget(target);
 if (!target) return -4;
 registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mozpointerlockchange", targetThread);
 registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "webkitpointerlockchange", targetThread);
 registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mspointerlockchange", targetThread);
 return registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "pointerlockchange", targetThread);
};

var registerPointerlockErrorEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
 var pointerlockErrorEventHandlerFunc = (e = event) => {
  if (getWasmTableEntry(callbackfunc)(eventTypeId, 0, userData)) e.preventDefault();
 };
 var eventHandler = {
  target: target,
  eventTypeString: eventTypeString,
  callbackfunc: callbackfunc,
  handlerFunc: pointerlockErrorEventHandlerFunc,
  useCapture: useCapture
 };
 return JSEvents.registerOrRemoveHandler(eventHandler);
};

/** @suppress {missingProperties} */ var _emscripten_set_pointerlockerror_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
 if (!document || !document.body.requestPointerLock && !document.body.mozRequestPointerLock && !document.body.webkitRequestPointerLock && !document.body.msRequestPointerLock) {
  return -1;
 }
 target = findEventTarget(target);
 if (!target) return -4;
 registerPointerlockErrorEventCallback(target, userData, useCapture, callbackfunc, 38, "mozpointerlockerror", targetThread);
 registerPointerlockErrorEventCallback(target, userData, useCapture, callbackfunc, 38, "webkitpointerlockerror", targetThread);
 registerPointerlockErrorEventCallback(target, userData, useCapture, callbackfunc, 38, "mspointerlockerror", targetThread);
 return registerPointerlockErrorEventCallback(target, userData, useCapture, callbackfunc, 38, "pointerlockerror", targetThread);
};

var registerUiEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
 if (!JSEvents.uiEvent) JSEvents.uiEvent = _malloc(36);
 target = findEventTarget(target);
 var uiEventHandlerFunc = (e = event) => {
  if (e.target != target) {
   return;
  }
  var b = document.body;
  if (!b) {
   return;
  }
  var uiEvent = JSEvents.uiEvent;
  SAFE_HEAP_STORE(((uiEvent) >> 2) * 4, 0, 4);
  SAFE_HEAP_STORE((((uiEvent) + (4)) >> 2) * 4, b.clientWidth, 4);
  SAFE_HEAP_STORE((((uiEvent) + (8)) >> 2) * 4, b.clientHeight, 4);
  SAFE_HEAP_STORE((((uiEvent) + (12)) >> 2) * 4, innerWidth, 4);
  SAFE_HEAP_STORE((((uiEvent) + (16)) >> 2) * 4, innerHeight, 4);
  SAFE_HEAP_STORE((((uiEvent) + (20)) >> 2) * 4, outerWidth, 4);
  SAFE_HEAP_STORE((((uiEvent) + (24)) >> 2) * 4, outerHeight, 4);
  SAFE_HEAP_STORE((((uiEvent) + (28)) >> 2) * 4, pageXOffset | 0, 4);
  SAFE_HEAP_STORE((((uiEvent) + (32)) >> 2) * 4, pageYOffset | 0, 4);
  if (getWasmTableEntry(callbackfunc)(eventTypeId, uiEvent, userData)) e.preventDefault();
 };
 var eventHandler = {
  target: target,
  eventTypeString: eventTypeString,
  callbackfunc: callbackfunc,
  handlerFunc: uiEventHandlerFunc,
  useCapture: useCapture
 };
 return JSEvents.registerOrRemoveHandler(eventHandler);
};

var _emscripten_set_resize_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerUiEventCallback(target, userData, useCapture, callbackfunc, 10, "resize", targetThread);

var registerTouchEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
 if (!JSEvents.touchEvent) JSEvents.touchEvent = _malloc(1696);
 target = findEventTarget(target);
 var touchEventHandlerFunc = e => {
  var t, touches = {}, et = e.touches;
  for (var i = 0; i < et.length; ++i) {
   t = et[i];
   t.isChanged = t.onTarget = 0;
   touches[t.identifier] = t;
  }
  for (var i = 0; i < e.changedTouches.length; ++i) {
   t = e.changedTouches[i];
   t.isChanged = 1;
   touches[t.identifier] = t;
  }
  for (var i = 0; i < e.targetTouches.length; ++i) {
   touches[e.targetTouches[i].identifier].onTarget = 1;
  }
  var touchEvent = JSEvents.touchEvent;
  SAFE_HEAP_STORE_D(((touchEvent) >> 3) * 8, e.timeStamp, 8);
  var idx = ((touchEvent) >> 2);
  SAFE_HEAP_STORE((idx + 3) * 4, e.ctrlKey, 4);
  SAFE_HEAP_STORE((idx + 4) * 4, e.shiftKey, 4);
  SAFE_HEAP_STORE((idx + 5) * 4, e.altKey, 4);
  SAFE_HEAP_STORE((idx + 6) * 4, e.metaKey, 4);
  idx += 7;
  var targetRect = getBoundingClientRect(target);
  var numTouches = 0;
  for (var i in touches) {
   t = touches[i];
   SAFE_HEAP_STORE((idx + 0) * 4, t.identifier, 4);
   SAFE_HEAP_STORE((idx + 1) * 4, t.screenX, 4);
   SAFE_HEAP_STORE((idx + 2) * 4, t.screenY, 4);
   SAFE_HEAP_STORE((idx + 3) * 4, t.clientX, 4);
   SAFE_HEAP_STORE((idx + 4) * 4, t.clientY, 4);
   SAFE_HEAP_STORE((idx + 5) * 4, t.pageX, 4);
   SAFE_HEAP_STORE((idx + 6) * 4, t.pageY, 4);
   SAFE_HEAP_STORE((idx + 7) * 4, t.isChanged, 4);
   SAFE_HEAP_STORE((idx + 8) * 4, t.onTarget, 4);
   SAFE_HEAP_STORE((idx + 9) * 4, t.clientX - (targetRect.left | 0), 4);
   SAFE_HEAP_STORE((idx + 10) * 4, t.clientY - (targetRect.top | 0), 4);
   idx += 13;
   if (++numTouches > 31) {
    break;
   }
  }
  SAFE_HEAP_STORE((((touchEvent) + (8)) >> 2) * 4, numTouches, 4);
  if (getWasmTableEntry(callbackfunc)(eventTypeId, touchEvent, userData)) e.preventDefault();
 };
 var eventHandler = {
  target: target,
  allowsDeferredCalls: eventTypeString == "touchstart" || eventTypeString == "touchend",
  eventTypeString: eventTypeString,
  callbackfunc: callbackfunc,
  handlerFunc: touchEventHandlerFunc,
  useCapture: useCapture
 };
 return JSEvents.registerOrRemoveHandler(eventHandler);
};

var _emscripten_set_touchcancel_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerTouchEventCallback(target, userData, useCapture, callbackfunc, 25, "touchcancel", targetThread);

var _emscripten_set_touchend_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerTouchEventCallback(target, userData, useCapture, callbackfunc, 23, "touchend", targetThread);

var _emscripten_set_touchmove_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerTouchEventCallback(target, userData, useCapture, callbackfunc, 24, "touchmove", targetThread);

var _emscripten_set_touchstart_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerTouchEventCallback(target, userData, useCapture, callbackfunc, 22, "touchstart", targetThread);

var webgl_enable_ANGLE_instanced_arrays = ctx => {
 var ext = ctx.getExtension("ANGLE_instanced_arrays");
 if (ext) {
  ctx["vertexAttribDivisor"] = (index, divisor) => ext["vertexAttribDivisorANGLE"](index, divisor);
  ctx["drawArraysInstanced"] = (mode, first, count, primcount) => ext["drawArraysInstancedANGLE"](mode, first, count, primcount);
  ctx["drawElementsInstanced"] = (mode, count, type, indices, primcount) => ext["drawElementsInstancedANGLE"](mode, count, type, indices, primcount);
  return 1;
 }
};

var webgl_enable_OES_vertex_array_object = ctx => {
 var ext = ctx.getExtension("OES_vertex_array_object");
 if (ext) {
  ctx["createVertexArray"] = () => ext["createVertexArrayOES"]();
  ctx["deleteVertexArray"] = vao => ext["deleteVertexArrayOES"](vao);
  ctx["bindVertexArray"] = vao => ext["bindVertexArrayOES"](vao);
  ctx["isVertexArray"] = vao => ext["isVertexArrayOES"](vao);
  return 1;
 }
};

var webgl_enable_WEBGL_draw_buffers = ctx => {
 var ext = ctx.getExtension("WEBGL_draw_buffers");
 if (ext) {
  ctx["drawBuffers"] = (n, bufs) => ext["drawBuffersWEBGL"](n, bufs);
  return 1;
 }
};

var webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance = ctx =>  !!(ctx.dibvbi = ctx.getExtension("WEBGL_draw_instanced_base_vertex_base_instance"));

var webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance = ctx => !!(ctx.mdibvbi = ctx.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance"));

var webgl_enable_WEBGL_multi_draw = ctx => !!(ctx.multiDrawWebgl = ctx.getExtension("WEBGL_multi_draw"));

var getEmscriptenSupportedExtensions = ctx => {
 var supportedExtensions = [  "ANGLE_instanced_arrays", "EXT_blend_minmax", "EXT_disjoint_timer_query", "EXT_frag_depth", "EXT_shader_texture_lod", "EXT_sRGB", "OES_element_index_uint", "OES_fbo_render_mipmap", "OES_standard_derivatives", "OES_texture_float", "OES_texture_half_float", "OES_texture_half_float_linear", "OES_vertex_array_object", "WEBGL_color_buffer_float", "WEBGL_depth_texture", "WEBGL_draw_buffers",  "EXT_color_buffer_float", "EXT_conservative_depth", "EXT_disjoint_timer_query_webgl2", "EXT_texture_norm16", "NV_shader_noperspective_interpolation", "WEBGL_clip_cull_distance",  "EXT_color_buffer_half_float", "EXT_depth_clamp", "EXT_float_blend", "EXT_texture_compression_bptc", "EXT_texture_compression_rgtc", "EXT_texture_filter_anisotropic", "KHR_parallel_shader_compile", "OES_texture_float_linear", "WEBGL_blend_func_extended", "WEBGL_compressed_texture_astc", "WEBGL_compressed_texture_etc", "WEBGL_compressed_texture_etc1", "WEBGL_compressed_texture_s3tc", "WEBGL_compressed_texture_s3tc_srgb", "WEBGL_debug_renderer_info", "WEBGL_debug_shaders", "WEBGL_lose_context", "WEBGL_multi_draw" ];
 return (ctx.getSupportedExtensions() || []).filter(ext => supportedExtensions.includes(ext));
};

var GL = {
 counter: 1,
 buffers: [],
 programs: [],
 framebuffers: [],
 renderbuffers: [],
 textures: [],
 shaders: [],
 vaos: [],
 contexts: [],
 offscreenCanvases: {},
 queries: [],
 samplers: [],
 transformFeedbacks: [],
 syncs: [],
 stringCache: {},
 stringiCache: {},
 unpackAlignment: 4,
 recordError: errorCode => {
  if (!GL.lastError) {
   GL.lastError = errorCode;
  }
 },
 getNewId: table => {
  var ret = GL.counter++;
  for (var i = table.length; i < ret; i++) {
   table[i] = null;
  }
  return ret;
 },
 genObject: (n, buffers, createFunction, objectTable) => {
  for (var i = 0; i < n; i++) {
   var buffer = GLctx[createFunction]();
   var id = buffer && GL.getNewId(objectTable);
   if (buffer) {
    buffer.name = id;
    objectTable[id] = buffer;
   } else {
    GL.recordError(1282);
   }
   SAFE_HEAP_STORE((((buffers) + (i * 4)) >> 2) * 4, id, 4);
  }
 },
 getSource: (shader, count, string, length) => {
  var source = "";
  for (var i = 0; i < count; ++i) {
   var len = length ? SAFE_HEAP_LOAD((((length) + (i * 4)) >> 2) * 4, 4, 1) : undefined;
   source += UTF8ToString(SAFE_HEAP_LOAD((((string) + (i * 4)) >> 2) * 4, 4, 1), len);
  }
  return source;
 },
 createContext: (/** @type {HTMLCanvasElement} */ canvas, webGLContextAttributes) => {
  if (!canvas.getContextSafariWebGL2Fixed) {
   canvas.getContextSafariWebGL2Fixed = canvas.getContext;
   /** @type {function(this:HTMLCanvasElement, string, (Object|null)=): (Object|null)} */ function fixedGetContext(ver, attrs) {
    var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
    return ((ver == "webgl") == (gl instanceof WebGLRenderingContext)) ? gl : null;
   }
   canvas.getContext = fixedGetContext;
  }
  var ctx = (webGLContextAttributes.majorVersion > 1) ? canvas.getContext("webgl2", webGLContextAttributes) : (canvas.getContext("webgl", webGLContextAttributes));
  if (!ctx) return 0;
  var handle = GL.registerContext(ctx, webGLContextAttributes);
  return handle;
 },
 registerContext: (ctx, webGLContextAttributes) => {
  var handle = GL.getNewId(GL.contexts);
  var context = {
   handle: handle,
   attributes: webGLContextAttributes,
   version: webGLContextAttributes.majorVersion,
   GLctx: ctx
  };
  if (ctx.canvas) ctx.canvas.GLctxObject = context;
  GL.contexts[handle] = context;
  if (typeof webGLContextAttributes.enableExtensionsByDefault == "undefined" || webGLContextAttributes.enableExtensionsByDefault) {
   GL.initExtensions(context);
  }
  return handle;
 },
 makeContextCurrent: contextHandle => {
  GL.currentContext = GL.contexts[contextHandle];
  Module.ctx = GLctx = GL.currentContext?.GLctx;
  return !(contextHandle && !GLctx);
 },
 getContext: contextHandle => GL.contexts[contextHandle],
 deleteContext: contextHandle => {
  if (GL.currentContext === GL.contexts[contextHandle]) {
   GL.currentContext = null;
  }
  if (typeof JSEvents == "object") {
   JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
  }
  if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas) {
   GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
  }
  GL.contexts[contextHandle] = null;
 },
 initExtensions: context => {
  context ||= GL.currentContext;
  if (context.initExtensionsDone) return;
  context.initExtensionsDone = true;
  var GLctx = context.GLctx;
  webgl_enable_ANGLE_instanced_arrays(GLctx);
  webgl_enable_OES_vertex_array_object(GLctx);
  webgl_enable_WEBGL_draw_buffers(GLctx);
  webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);
  webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx);
  if (context.version >= 2) {
   GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query_webgl2");
  }
  if (context.version < 2 || !GLctx.disjointTimerQueryExt) {
   GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
  }
  webgl_enable_WEBGL_multi_draw(GLctx);
  getEmscriptenSupportedExtensions(GLctx).forEach(ext => {
   if (!ext.includes("lose_context") && !ext.includes("debug")) {
    GLctx.getExtension(ext);
   }
  });
 }
};

var registerWebGlEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
 var webGlEventHandlerFunc = (e = event) => {
  if (getWasmTableEntry(callbackfunc)(eventTypeId, 0, userData)) e.preventDefault();
 };
 var eventHandler = {
  target: findEventTarget(target),
  eventTypeString: eventTypeString,
  callbackfunc: callbackfunc,
  handlerFunc: webGlEventHandlerFunc,
  useCapture: useCapture
 };
 JSEvents.registerOrRemoveHandler(eventHandler);
};

var _emscripten_set_webglcontextlost_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
 registerWebGlEventCallback(target, userData, useCapture, callbackfunc, 31, "webglcontextlost", targetThread);
 return 0;
};

var _emscripten_set_webglcontextrestored_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
 registerWebGlEventCallback(target, userData, useCapture, callbackfunc, 32, "webglcontextrestored", targetThread);
 return 0;
};

var registerWheelEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
 if (!JSEvents.wheelEvent) JSEvents.wheelEvent = _malloc(104);
 var wheelHandlerFunc = (e = event) => {
  var wheelEvent = JSEvents.wheelEvent;
  fillMouseEventData(wheelEvent, e, target);
  SAFE_HEAP_STORE_D((((wheelEvent) + (72)) >> 3) * 8, e["deltaX"], 8);
  SAFE_HEAP_STORE_D((((wheelEvent) + (80)) >> 3) * 8, e["deltaY"], 8);
  SAFE_HEAP_STORE_D((((wheelEvent) + (88)) >> 3) * 8, e["deltaZ"], 8);
  SAFE_HEAP_STORE((((wheelEvent) + (96)) >> 2) * 4, e["deltaMode"], 4);
  if (getWasmTableEntry(callbackfunc)(eventTypeId, wheelEvent, userData)) e.preventDefault();
 };
 var eventHandler = {
  target: target,
  allowsDeferredCalls: true,
  eventTypeString: eventTypeString,
  callbackfunc: callbackfunc,
  handlerFunc: wheelHandlerFunc,
  useCapture: useCapture
 };
 return JSEvents.registerOrRemoveHandler(eventHandler);
};

var _emscripten_set_wheel_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
 target = findEventTarget(target);
 if (!target) return -4;
 if (typeof target.onwheel != "undefined") {
  return registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, "wheel", targetThread);
 } else {
  return -1;
 }
};

var webglPowerPreferences = [ "default", "low-power", "high-performance" ];

/** @suppress {duplicate } */ var _emscripten_webgl_do_create_context = (target, attributes) => {
 var a = ((attributes) >> 2);
 var powerPreference = SAFE_HEAP_LOAD((a + (24 >> 2)) * 4, 4, 0);
 var contextAttributes = {
  "alpha": !!SAFE_HEAP_LOAD((a + (0 >> 2)) * 4, 4, 0),
  "depth": !!SAFE_HEAP_LOAD((a + (4 >> 2)) * 4, 4, 0),
  "stencil": !!SAFE_HEAP_LOAD((a + (8 >> 2)) * 4, 4, 0),
  "antialias": !!SAFE_HEAP_LOAD((a + (12 >> 2)) * 4, 4, 0),
  "premultipliedAlpha": !!SAFE_HEAP_LOAD((a + (16 >> 2)) * 4, 4, 0),
  "preserveDrawingBuffer": !!SAFE_HEAP_LOAD((a + (20 >> 2)) * 4, 4, 0),
  "powerPreference": webglPowerPreferences[powerPreference],
  "failIfMajorPerformanceCaveat": !!SAFE_HEAP_LOAD((a + (28 >> 2)) * 4, 4, 0),
  majorVersion: SAFE_HEAP_LOAD((a + (32 >> 2)) * 4, 4, 0),
  minorVersion: SAFE_HEAP_LOAD((a + (36 >> 2)) * 4, 4, 0),
  enableExtensionsByDefault: SAFE_HEAP_LOAD((a + (40 >> 2)) * 4, 4, 0),
  explicitSwapControl: SAFE_HEAP_LOAD((a + (44 >> 2)) * 4, 4, 0),
  proxyContextToMainThread: SAFE_HEAP_LOAD((a + (48 >> 2)) * 4, 4, 0),
  renderViaOffscreenBackBuffer: SAFE_HEAP_LOAD((a + (52 >> 2)) * 4, 4, 0)
 };
 var canvas = findCanvasEventTarget(target);
 if (!canvas) {
  return 0;
 }
 if (contextAttributes.explicitSwapControl) {
  return 0;
 }
 var contextHandle = GL.createContext(canvas, contextAttributes);
 return contextHandle;
};

var _emscripten_webgl_create_context = _emscripten_webgl_do_create_context;

var _emscripten_webgl_enable_extension = (contextHandle, extension) => {
 var context = GL.getContext(contextHandle);
 var extString = UTF8ToString(extension);
 if (extString.startsWith("GL_")) extString = extString.substr(3);
 if (extString == "ANGLE_instanced_arrays") webgl_enable_ANGLE_instanced_arrays(GLctx);
 if (extString == "OES_vertex_array_object") webgl_enable_OES_vertex_array_object(GLctx);
 if (extString == "WEBGL_draw_buffers") webgl_enable_WEBGL_draw_buffers(GLctx);
 if (extString == "WEBGL_draw_instanced_base_vertex_base_instance") webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);
 if (extString == "WEBGL_multi_draw_instanced_base_vertex_base_instance") webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx);
 if (extString == "WEBGL_multi_draw") webgl_enable_WEBGL_multi_draw(GLctx);
 var ext = context.GLctx.getExtension(extString);
 return !!ext;
};

var _emscripten_webgl_make_context_current = contextHandle => {
 var success = GL.makeContextCurrent(contextHandle);
 return success ? 0 : -5;
};

/** @param {number=} offset */ var doWritev = (stream, iov, iovcnt, offset) => {
 var ret = 0;
 for (var i = 0; i < iovcnt; i++) {
  var ptr = SAFE_HEAP_LOAD(((iov) >> 2) * 4, 4, 1);
  var len = SAFE_HEAP_LOAD((((iov) + (4)) >> 2) * 4, 4, 1);
  iov += 8;
  var curr = FS.write(stream, HEAP8, ptr, len, offset);
  if (curr < 0) return -1;
  ret += curr;
  if (typeof offset != "undefined") {
   offset += curr;
  }
 }
 return ret;
};

var PATH = {
 isAbs: path => path.charAt(0) === "/",
 splitPath: filename => {
  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  return splitPathRe.exec(filename).slice(1);
 },
 normalizeArray: (parts, allowAboveRoot) => {
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
   var last = parts[i];
   if (last === ".") {
    parts.splice(i, 1);
   } else if (last === "..") {
    parts.splice(i, 1);
    up++;
   } else if (up) {
    parts.splice(i, 1);
    up--;
   }
  }
  if (allowAboveRoot) {
   for (;up; up--) {
    parts.unshift("..");
   }
  }
  return parts;
 },
 normalize: path => {
  var isAbsolute = PATH.isAbs(path), trailingSlash = path.substr(-1) === "/";
  path = PATH.normalizeArray(path.split("/").filter(p => !!p), !isAbsolute).join("/");
  if (!path && !isAbsolute) {
   path = ".";
  }
  if (path && trailingSlash) {
   path += "/";
  }
  return (isAbsolute ? "/" : "") + path;
 },
 dirname: path => {
  var result = PATH.splitPath(path), root = result[0], dir = result[1];
  if (!root && !dir) {
   return ".";
  }
  if (dir) {
   dir = dir.substr(0, dir.length - 1);
  }
  return root + dir;
 },
 basename: path => {
  if (path === "/") return "/";
  path = PATH.normalize(path);
  path = path.replace(/\/$/, "");
  var lastSlash = path.lastIndexOf("/");
  if (lastSlash === -1) return path;
  return path.substr(lastSlash + 1);
 },
 join: (...paths) => PATH.normalize(paths.join("/")),
 join2: (l, r) => PATH.normalize(l + "/" + r)
};

var initRandomFill = () => {
 if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
  return view => crypto.getRandomValues(view);
 } else if (ENVIRONMENT_IS_NODE) {
  try {
   var crypto_module = require("crypto");
   var randomFillSync = crypto_module["randomFillSync"];
   if (randomFillSync) {
    return view => crypto_module["randomFillSync"](view);
   }
   var randomBytes = crypto_module["randomBytes"];
   return view => (view.set(randomBytes(view.byteLength)),  view);
  } catch (e) {}
 }
 abort("initRandomDevice");
};

var randomFill = view => (randomFill = initRandomFill())(view);

var PATH_FS = {
 resolve: (...args) => {
  var resolvedPath = "", resolvedAbsolute = false;
  for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
   var path = (i >= 0) ? args[i] : FS.cwd();
   if (typeof path != "string") {
    throw new TypeError("Arguments to path.resolve must be strings");
   } else if (!path) {
    return "";
   }
   resolvedPath = path + "/" + resolvedPath;
   resolvedAbsolute = PATH.isAbs(path);
  }
  resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(p => !!p), !resolvedAbsolute).join("/");
  return ((resolvedAbsolute ? "/" : "") + resolvedPath) || ".";
 },
 relative: (from, to) => {
  from = PATH_FS.resolve(from).substr(1);
  to = PATH_FS.resolve(to).substr(1);
  function trim(arr) {
   var start = 0;
   for (;start < arr.length; start++) {
    if (arr[start] !== "") break;
   }
   var end = arr.length - 1;
   for (;end >= 0; end--) {
    if (arr[end] !== "") break;
   }
   if (start > end) return [];
   return arr.slice(start, end - start + 1);
  }
  var fromParts = trim(from.split("/"));
  var toParts = trim(to.split("/"));
  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
   if (fromParts[i] !== toParts[i]) {
    samePartsLength = i;
    break;
   }
  }
  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
   outputParts.push("..");
  }
  outputParts = outputParts.concat(toParts.slice(samePartsLength));
  return outputParts.join("/");
 }
};

var FS_stdin_getChar_buffer = [];

var lengthBytesUTF8 = str => {
 var len = 0;
 for (var i = 0; i < str.length; ++i) {
  var c = str.charCodeAt(i);
  if (c <= 127) {
   len++;
  } else if (c <= 2047) {
   len += 2;
  } else if (c >= 55296 && c <= 57343) {
   len += 4;
   ++i;
  } else {
   len += 3;
  }
 }
 return len;
};

/** @type {function(string, boolean=, number=)} */ function intArrayFromString(stringy, dontAddNull, length) {
 var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
 var u8array = new Array(len);
 var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
 if (dontAddNull) u8array.length = numBytesWritten;
 return u8array;
}

var FS_stdin_getChar = () => {
 if (!FS_stdin_getChar_buffer.length) {
  var result = null;
  if (ENVIRONMENT_IS_NODE) {
   var BUFSIZE = 256;
   var buf = Buffer.alloc(BUFSIZE);
   var bytesRead = 0;
   /** @suppress {missingProperties} */ var fd = process.stdin.fd;
   try {
    bytesRead = fs.readSync(fd, buf);
   } catch (e) {
    if (e.toString().includes("EOF")) bytesRead = 0; else throw e;
   }
   if (bytesRead > 0) {
    result = buf.slice(0, bytesRead).toString("utf-8");
   } else {
    result = null;
   }
  } else if (typeof window != "undefined" && typeof window.prompt == "function") {
   result = window.prompt("Input: ");
   if (result !== null) {
    result += "\n";
   }
  } else if (typeof readline == "function") {
   result = readline();
   if (result !== null) {
    result += "\n";
   }
  }
  if (!result) {
   return null;
  }
  FS_stdin_getChar_buffer = intArrayFromString(result, true);
 }
 return FS_stdin_getChar_buffer.shift();
};

var TTY = {
 ttys: [],
 init() {},
 shutdown() {},
 register(dev, ops) {
  TTY.ttys[dev] = {
   input: [],
   output: [],
   ops: ops
  };
  FS.registerDevice(dev, TTY.stream_ops);
 },
 stream_ops: {
  open(stream) {
   var tty = TTY.ttys[stream.node.rdev];
   if (!tty) {
    throw new FS.ErrnoError(43);
   }
   stream.tty = tty;
   stream.seekable = false;
  },
  close(stream) {
   stream.tty.ops.fsync(stream.tty);
  },
  fsync(stream) {
   stream.tty.ops.fsync(stream.tty);
  },
  read(stream, buffer, offset, length, pos) {
   /* ignored */ if (!stream.tty || !stream.tty.ops.get_char) {
    throw new FS.ErrnoError(60);
   }
   var bytesRead = 0;
   for (var i = 0; i < length; i++) {
    var result;
    try {
     result = stream.tty.ops.get_char(stream.tty);
    } catch (e) {
     throw new FS.ErrnoError(29);
    }
    if (result === undefined && bytesRead === 0) {
     throw new FS.ErrnoError(6);
    }
    if (result === null || result === undefined) break;
    bytesRead++;
    buffer[offset + i] = result;
   }
   if (bytesRead) {
    stream.node.timestamp = Date.now();
   }
   return bytesRead;
  },
  write(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.put_char) {
    throw new FS.ErrnoError(60);
   }
   try {
    for (var i = 0; i < length; i++) {
     stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
    }
   } catch (e) {
    throw new FS.ErrnoError(29);
   }
   if (length) {
    stream.node.timestamp = Date.now();
   }
   return i;
  }
 },
 default_tty_ops: {
  get_char(tty) {
   return FS_stdin_getChar();
  },
  put_char(tty, val) {
   if (val === null || val === 10) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  fsync(tty) {
   if (tty.output && tty.output.length > 0) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  },
  ioctl_tcgets(tty) {
   return {
    c_iflag: 25856,
    c_oflag: 5,
    c_cflag: 191,
    c_lflag: 35387,
    c_cc: [ 3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
   };
  },
  ioctl_tcsets(tty, optional_actions, data) {
   return 0;
  },
  ioctl_tiocgwinsz(tty) {
   return [ 24, 80 ];
  }
 },
 default_tty1_ops: {
  put_char(tty, val) {
   if (val === null || val === 10) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  fsync(tty) {
   if (tty.output && tty.output.length > 0) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  }
 }
};

var zeroMemory = (address, size) => {
 HEAPU8.fill(0, address, address + size);
 return address;
};

var alignMemory = (size, alignment) => Math.ceil(size / alignment) * alignment;

var mmapAlloc = size => {
 abort();
};

var MEMFS = {
 ops_table: null,
 mount(mount) {
  return MEMFS.createNode(null, "/", 16384 | 511, /* 0777 */ 0);
 },
 createNode(parent, name, mode, dev) {
  if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
   throw new FS.ErrnoError(63);
  }
  MEMFS.ops_table ||= {
   dir: {
    node: {
     getattr: MEMFS.node_ops.getattr,
     setattr: MEMFS.node_ops.setattr,
     lookup: MEMFS.node_ops.lookup,
     mknod: MEMFS.node_ops.mknod,
     rename: MEMFS.node_ops.rename,
     unlink: MEMFS.node_ops.unlink,
     rmdir: MEMFS.node_ops.rmdir,
     readdir: MEMFS.node_ops.readdir,
     symlink: MEMFS.node_ops.symlink
    },
    stream: {
     llseek: MEMFS.stream_ops.llseek
    }
   },
   file: {
    node: {
     getattr: MEMFS.node_ops.getattr,
     setattr: MEMFS.node_ops.setattr
    },
    stream: {
     llseek: MEMFS.stream_ops.llseek,
     read: MEMFS.stream_ops.read,
     write: MEMFS.stream_ops.write,
     allocate: MEMFS.stream_ops.allocate,
     mmap: MEMFS.stream_ops.mmap,
     msync: MEMFS.stream_ops.msync
    }
   },
   link: {
    node: {
     getattr: MEMFS.node_ops.getattr,
     setattr: MEMFS.node_ops.setattr,
     readlink: MEMFS.node_ops.readlink
    },
    stream: {}
   },
   chrdev: {
    node: {
     getattr: MEMFS.node_ops.getattr,
     setattr: MEMFS.node_ops.setattr
    },
    stream: FS.chrdev_stream_ops
   }
  };
  var node = FS.createNode(parent, name, mode, dev);
  if (FS.isDir(node.mode)) {
   node.node_ops = MEMFS.ops_table.dir.node;
   node.stream_ops = MEMFS.ops_table.dir.stream;
   node.contents = {};
  } else if (FS.isFile(node.mode)) {
   node.node_ops = MEMFS.ops_table.file.node;
   node.stream_ops = MEMFS.ops_table.file.stream;
   node.usedBytes = 0;
   node.contents = null;
  } else if (FS.isLink(node.mode)) {
   node.node_ops = MEMFS.ops_table.link.node;
   node.stream_ops = MEMFS.ops_table.link.stream;
  } else if (FS.isChrdev(node.mode)) {
   node.node_ops = MEMFS.ops_table.chrdev.node;
   node.stream_ops = MEMFS.ops_table.chrdev.stream;
  }
  node.timestamp = Date.now();
  if (parent) {
   parent.contents[name] = node;
   parent.timestamp = node.timestamp;
  }
  return node;
 },
 getFileDataAsTypedArray(node) {
  if (!node.contents) return new Uint8Array(0);
  if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
  return new Uint8Array(node.contents);
 },
 expandFileStorage(node, newCapacity) {
  var prevCapacity = node.contents ? node.contents.length : 0;
  if (prevCapacity >= newCapacity) return;
  var CAPACITY_DOUBLING_MAX = 1024 * 1024;
  newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) >>> 0);
  if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
  var oldContents = node.contents;
  node.contents = new Uint8Array(newCapacity);
  if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
 },
 resizeFileStorage(node, newSize) {
  if (node.usedBytes == newSize) return;
  if (newSize == 0) {
   node.contents = null;
   node.usedBytes = 0;
  } else {
   var oldContents = node.contents;
   node.contents = new Uint8Array(newSize);
   if (oldContents) {
    node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
   }
   node.usedBytes = newSize;
  }
 },
 node_ops: {
  getattr(node) {
   var attr = {};
   attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
   attr.ino = node.id;
   attr.mode = node.mode;
   attr.nlink = 1;
   attr.uid = 0;
   attr.gid = 0;
   attr.rdev = node.rdev;
   if (FS.isDir(node.mode)) {
    attr.size = 4096;
   } else if (FS.isFile(node.mode)) {
    attr.size = node.usedBytes;
   } else if (FS.isLink(node.mode)) {
    attr.size = node.link.length;
   } else {
    attr.size = 0;
   }
   attr.atime = new Date(node.timestamp);
   attr.mtime = new Date(node.timestamp);
   attr.ctime = new Date(node.timestamp);
   attr.blksize = 4096;
   attr.blocks = Math.ceil(attr.size / attr.blksize);
   return attr;
  },
  setattr(node, attr) {
   if (attr.mode !== undefined) {
    node.mode = attr.mode;
   }
   if (attr.timestamp !== undefined) {
    node.timestamp = attr.timestamp;
   }
   if (attr.size !== undefined) {
    MEMFS.resizeFileStorage(node, attr.size);
   }
  },
  lookup(parent, name) {
   throw FS.genericErrors[44];
  },
  mknod(parent, name, mode, dev) {
   return MEMFS.createNode(parent, name, mode, dev);
  },
  rename(old_node, new_dir, new_name) {
   if (FS.isDir(old_node.mode)) {
    var new_node;
    try {
     new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {}
    if (new_node) {
     for (var i in new_node.contents) {
      throw new FS.ErrnoError(55);
     }
    }
   }
   delete old_node.parent.contents[old_node.name];
   old_node.parent.timestamp = Date.now();
   old_node.name = new_name;
   new_dir.contents[new_name] = old_node;
   new_dir.timestamp = old_node.parent.timestamp;
   old_node.parent = new_dir;
  },
  unlink(parent, name) {
   delete parent.contents[name];
   parent.timestamp = Date.now();
  },
  rmdir(parent, name) {
   var node = FS.lookupNode(parent, name);
   for (var i in node.contents) {
    throw new FS.ErrnoError(55);
   }
   delete parent.contents[name];
   parent.timestamp = Date.now();
  },
  readdir(node) {
   var entries = [ ".", ".." ];
   for (var key of Object.keys(node.contents)) {
    entries.push(key);
   }
   return entries;
  },
  symlink(parent, newname, oldpath) {
   var node = MEMFS.createNode(parent, newname, 511 | /* 0777 */ 40960, 0);
   node.link = oldpath;
   return node;
  },
  readlink(node) {
   if (!FS.isLink(node.mode)) {
    throw new FS.ErrnoError(28);
   }
   return node.link;
  }
 },
 stream_ops: {
  read(stream, buffer, offset, length, position) {
   var contents = stream.node.contents;
   if (position >= stream.node.usedBytes) return 0;
   var size = Math.min(stream.node.usedBytes - position, length);
   if (size > 8 && contents.subarray) {
    buffer.set(contents.subarray(position, position + size), offset);
   } else {
    for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
   }
   return size;
  },
  write(stream, buffer, offset, length, position, canOwn) {
   if (buffer.buffer === HEAP8.buffer) {
    canOwn = false;
   }
   if (!length) return 0;
   var node = stream.node;
   node.timestamp = Date.now();
   if (buffer.subarray && (!node.contents || node.contents.subarray)) {
    if (canOwn) {
     node.contents = buffer.subarray(offset, offset + length);
     node.usedBytes = length;
     return length;
    } else if (node.usedBytes === 0 && position === 0) {
     node.contents = buffer.slice(offset, offset + length);
     node.usedBytes = length;
     return length;
    } else if (position + length <= node.usedBytes) {
     node.contents.set(buffer.subarray(offset, offset + length), position);
     return length;
    }
   }
   MEMFS.expandFileStorage(node, position + length);
   if (node.contents.subarray && buffer.subarray) {
    node.contents.set(buffer.subarray(offset, offset + length), position);
   } else {
    for (var i = 0; i < length; i++) {
     node.contents[position + i] = buffer[offset + i];
    }
   }
   node.usedBytes = Math.max(node.usedBytes, position + length);
   return length;
  },
  llseek(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     position += stream.node.usedBytes;
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(28);
   }
   return position;
  },
  allocate(stream, offset, length) {
   MEMFS.expandFileStorage(stream.node, offset + length);
   stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
  },
  mmap(stream, length, position, prot, flags) {
   if (!FS.isFile(stream.node.mode)) {
    throw new FS.ErrnoError(43);
   }
   var ptr;
   var allocated;
   var contents = stream.node.contents;
   if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
    allocated = false;
    ptr = contents.byteOffset;
   } else {
    if (position > 0 || position + length < contents.length) {
     if (contents.subarray) {
      contents = contents.subarray(position, position + length);
     } else {
      contents = Array.prototype.slice.call(contents, position, position + length);
     }
    }
    allocated = true;
    ptr = mmapAlloc(length);
    if (!ptr) {
     throw new FS.ErrnoError(48);
    }
    HEAP8.set(contents, ptr);
   }
   return {
    ptr: ptr,
    allocated: allocated
   };
  },
  msync(stream, buffer, offset, length, mmapFlags) {
   MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
   return 0;
  }
 }
};

/** @param {boolean=} noRunDep */ var asyncLoad = (url, onload, onerror, noRunDep) => {
 var dep = !noRunDep ? getUniqueRunDependency(`al ${url}`) : "";
 readAsync(url, arrayBuffer => {
  onload(new Uint8Array(arrayBuffer));
  if (dep) removeRunDependency(dep);
 }, event => {
  if (onerror) {
   onerror();
  } else {
   throw `Loading data file "${url}" failed.`;
  }
 });
 if (dep) addRunDependency(dep);
};

var FS_createDataFile = (parent, name, fileData, canRead, canWrite, canOwn) => {
 FS.createDataFile(parent, name, fileData, canRead, canWrite, canOwn);
};

var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
 if (typeof Browser != "undefined") Browser.init();
 var handled = false;
 preloadPlugins.forEach(plugin => {
  if (handled) return;
  if (plugin["canHandle"](fullname)) {
   plugin["handle"](byteArray, fullname, finish, onerror);
   handled = true;
  }
 });
 return handled;
};

var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
 var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
 var dep = getUniqueRunDependency(`cp ${fullname}`);
 function processData(byteArray) {
  function finish(byteArray) {
   preFinish?.();
   if (!dontCreateFile) {
    FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
   }
   onload?.();
   removeRunDependency(dep);
  }
  if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
   onerror?.();
   removeRunDependency(dep);
  })) {
   return;
  }
  finish(byteArray);
 }
 addRunDependency(dep);
 if (typeof url == "string") {
  asyncLoad(url, processData, onerror);
 } else {
  processData(url);
 }
};

var FS_modeStringToFlags = str => {
 var flagModes = {
  "r": 0,
  "r+": 2,
  "w": 512 | 64 | 1,
  "w+": 512 | 64 | 2,
  "a": 1024 | 64 | 1,
  "a+": 1024 | 64 | 2
 };
 var flags = flagModes[str];
 if (typeof flags == "undefined") {
  throw new Error(`Unknown file open mode: ${str}`);
 }
 return flags;
};

var FS_getMode = (canRead, canWrite) => {
 var mode = 0;
 if (canRead) mode |= 292 | 73;
 if (canWrite) mode |= 146;
 return mode;
};

var FS = {
 root: null,
 mounts: [],
 devices: {},
 streams: [],
 nextInode: 1,
 nameTable: null,
 currentPath: "/",
 initialized: false,
 ignorePermissions: true,
 ErrnoError: class {
  constructor(errno) {
   this.name = "ErrnoError";
   this.errno = errno;
  }
 },
 genericErrors: {},
 filesystems: null,
 syncFSRequests: 0,
 FSStream: class {
  constructor() {
   this.shared = {};
  }
  get object() {
   return this.node;
  }
  set object(val) {
   this.node = val;
  }
  get isRead() {
   return (this.flags & 2097155) !== 1;
  }
  get isWrite() {
   return (this.flags & 2097155) !== 0;
  }
  get isAppend() {
   return (this.flags & 1024);
  }
  get flags() {
   return this.shared.flags;
  }
  set flags(val) {
   this.shared.flags = val;
  }
  get position() {
   return this.shared.position;
  }
  set position(val) {
   this.shared.position = val;
  }
 },
 FSNode: class {
  constructor(parent, name, mode, rdev) {
   if (!parent) {
    parent = this;
   }
   this.parent = parent;
   this.mount = parent.mount;
   this.mounted = null;
   this.id = FS.nextInode++;
   this.name = name;
   this.mode = mode;
   this.node_ops = {};
   this.stream_ops = {};
   this.rdev = rdev;
   this.readMode = 292 | /*292*/ 73;
   /*73*/ this.writeMode = 146;
  }
  /*146*/ get read() {
   return (this.mode & this.readMode) === this.readMode;
  }
  set read(val) {
   val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
  }
  get write() {
   return (this.mode & this.writeMode) === this.writeMode;
  }
  set write(val) {
   val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
  }
  get isFolder() {
   return FS.isDir(this.mode);
  }
  get isDevice() {
   return FS.isChrdev(this.mode);
  }
 },
 lookupPath(path, opts = {}) {
  path = PATH_FS.resolve(path);
  if (!path) return {
   path: "",
   node: null
  };
  var defaults = {
   follow_mount: true,
   recurse_count: 0
  };
  opts = Object.assign(defaults, opts);
  if (opts.recurse_count > 8) {
   throw new FS.ErrnoError(32);
  }
  var parts = path.split("/").filter(p => !!p);
  var current = FS.root;
  var current_path = "/";
  for (var i = 0; i < parts.length; i++) {
   var islast = (i === parts.length - 1);
   if (islast && opts.parent) {
    break;
   }
   current = FS.lookupNode(current, parts[i]);
   current_path = PATH.join2(current_path, parts[i]);
   if (FS.isMountpoint(current)) {
    if (!islast || (islast && opts.follow_mount)) {
     current = current.mounted.root;
    }
   }
   if (!islast || opts.follow) {
    var count = 0;
    while (FS.isLink(current.mode)) {
     var link = FS.readlink(current_path);
     current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
     var lookup = FS.lookupPath(current_path, {
      recurse_count: opts.recurse_count + 1
     });
     current = lookup.node;
     if (count++ > 40) {
      throw new FS.ErrnoError(32);
     }
    }
   }
  }
  return {
   path: current_path,
   node: current
  };
 },
 getPath(node) {
  var path;
  while (true) {
   if (FS.isRoot(node)) {
    var mount = node.mount.mountpoint;
    if (!path) return mount;
    return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
   }
   path = path ? `${node.name}/${path}` : node.name;
   node = node.parent;
  }
 },
 hashName(parentid, name) {
  var hash = 0;
  for (var i = 0; i < name.length; i++) {
   hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
  }
  return ((parentid + hash) >>> 0) % FS.nameTable.length;
 },
 hashAddNode(node) {
  var hash = FS.hashName(node.parent.id, node.name);
  node.name_next = FS.nameTable[hash];
  FS.nameTable[hash] = node;
 },
 hashRemoveNode(node) {
  var hash = FS.hashName(node.parent.id, node.name);
  if (FS.nameTable[hash] === node) {
   FS.nameTable[hash] = node.name_next;
  } else {
   var current = FS.nameTable[hash];
   while (current) {
    if (current.name_next === node) {
     current.name_next = node.name_next;
     break;
    }
    current = current.name_next;
   }
  }
 },
 lookupNode(parent, name) {
  var errCode = FS.mayLookup(parent);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  var hash = FS.hashName(parent.id, name);
  for (var node = FS.nameTable[hash]; node; node = node.name_next) {
   var nodeName = node.name;
   if (node.parent.id === parent.id && nodeName === name) {
    return node;
   }
  }
  return FS.lookup(parent, name);
 },
 createNode(parent, name, mode, rdev) {
  var node = new FS.FSNode(parent, name, mode, rdev);
  FS.hashAddNode(node);
  return node;
 },
 destroyNode(node) {
  FS.hashRemoveNode(node);
 },
 isRoot(node) {
  return node === node.parent;
 },
 isMountpoint(node) {
  return !!node.mounted;
 },
 isFile(mode) {
  return (mode & 61440) === 32768;
 },
 isDir(mode) {
  return (mode & 61440) === 16384;
 },
 isLink(mode) {
  return (mode & 61440) === 40960;
 },
 isChrdev(mode) {
  return (mode & 61440) === 8192;
 },
 isBlkdev(mode) {
  return (mode & 61440) === 24576;
 },
 isFIFO(mode) {
  return (mode & 61440) === 4096;
 },
 isSocket(mode) {
  return (mode & 49152) === 49152;
 },
 flagsToPermissionString(flag) {
  var perms = [ "r", "w", "rw" ][flag & 3];
  if ((flag & 512)) {
   perms += "w";
  }
  return perms;
 },
 nodePermissions(node, perms) {
  if (FS.ignorePermissions) {
   return 0;
  }
  if (perms.includes("r") && !(node.mode & 292)) {
   return 2;
  } else if (perms.includes("w") && !(node.mode & 146)) {
   return 2;
  } else if (perms.includes("x") && !(node.mode & 73)) {
   return 2;
  }
  return 0;
 },
 mayLookup(dir) {
  if (!FS.isDir(dir.mode)) return 54;
  var errCode = FS.nodePermissions(dir, "x");
  if (errCode) return errCode;
  if (!dir.node_ops.lookup) return 2;
  return 0;
 },
 mayCreate(dir, name) {
  try {
   var node = FS.lookupNode(dir, name);
   return 20;
  } catch (e) {}
  return FS.nodePermissions(dir, "wx");
 },
 mayDelete(dir, name, isdir) {
  var node;
  try {
   node = FS.lookupNode(dir, name);
  } catch (e) {
   return e.errno;
  }
  var errCode = FS.nodePermissions(dir, "wx");
  if (errCode) {
   return errCode;
  }
  if (isdir) {
   if (!FS.isDir(node.mode)) {
    return 54;
   }
   if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
    return 10;
   }
  } else {
   if (FS.isDir(node.mode)) {
    return 31;
   }
  }
  return 0;
 },
 mayOpen(node, flags) {
  if (!node) {
   return 44;
  }
  if (FS.isLink(node.mode)) {
   return 32;
  } else if (FS.isDir(node.mode)) {
   if (FS.flagsToPermissionString(flags) !== "r" ||  (flags & 512)) {
    return 31;
   }
  }
  return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
 },
 MAX_OPEN_FDS: 4096,
 nextfd() {
  for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
   if (!FS.streams[fd]) {
    return fd;
   }
  }
  throw new FS.ErrnoError(33);
 },
 getStreamChecked(fd) {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  return stream;
 },
 getStream: fd => FS.streams[fd],
 createStream(stream, fd = -1) {
  stream = Object.assign(new FS.FSStream, stream);
  if (fd == -1) {
   fd = FS.nextfd();
  }
  stream.fd = fd;
  FS.streams[fd] = stream;
  return stream;
 },
 closeStream(fd) {
  FS.streams[fd] = null;
 },
 dupStream(origStream, fd = -1) {
  var stream = FS.createStream(origStream, fd);
  stream.stream_ops?.dup?.(stream);
  return stream;
 },
 chrdev_stream_ops: {
  open(stream) {
   var device = FS.getDevice(stream.node.rdev);
   stream.stream_ops = device.stream_ops;
   stream.stream_ops.open?.(stream);
  },
  llseek() {
   throw new FS.ErrnoError(70);
  }
 },
 major: dev => ((dev) >> 8),
 minor: dev => ((dev) & 255),
 makedev: (ma, mi) => ((ma) << 8 | (mi)),
 registerDevice(dev, ops) {
  FS.devices[dev] = {
   stream_ops: ops
  };
 },
 getDevice: dev => FS.devices[dev],
 getMounts(mount) {
  var mounts = [];
  var check = [ mount ];
  while (check.length) {
   var m = check.pop();
   mounts.push(m);
   check.push(...m.mounts);
  }
  return mounts;
 },
 syncfs(populate, callback) {
  if (typeof populate == "function") {
   callback = populate;
   populate = false;
  }
  FS.syncFSRequests++;
  if (FS.syncFSRequests > 1) {
   err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
  }
  var mounts = FS.getMounts(FS.root.mount);
  var completed = 0;
  function doCallback(errCode) {
   FS.syncFSRequests--;
   return callback(errCode);
  }
  function done(errCode) {
   if (errCode) {
    if (!done.errored) {
     done.errored = true;
     return doCallback(errCode);
    }
    return;
   }
   if (++completed >= mounts.length) {
    doCallback(null);
   }
  }
  mounts.forEach(mount => {
   if (!mount.type.syncfs) {
    return done(null);
   }
   mount.type.syncfs(mount, populate, done);
  });
 },
 mount(type, opts, mountpoint) {
  var root = mountpoint === "/";
  var pseudo = !mountpoint;
  var node;
  if (root && FS.root) {
   throw new FS.ErrnoError(10);
  } else if (!root && !pseudo) {
   var lookup = FS.lookupPath(mountpoint, {
    follow_mount: false
   });
   mountpoint = lookup.path;
   node = lookup.node;
   if (FS.isMountpoint(node)) {
    throw new FS.ErrnoError(10);
   }
   if (!FS.isDir(node.mode)) {
    throw new FS.ErrnoError(54);
   }
  }
  var mount = {
   type: type,
   opts: opts,
   mountpoint: mountpoint,
   mounts: []
  };
  var mountRoot = type.mount(mount);
  mountRoot.mount = mount;
  mount.root = mountRoot;
  if (root) {
   FS.root = mountRoot;
  } else if (node) {
   node.mounted = mount;
   if (node.mount) {
    node.mount.mounts.push(mount);
   }
  }
  return mountRoot;
 },
 unmount(mountpoint) {
  var lookup = FS.lookupPath(mountpoint, {
   follow_mount: false
  });
  if (!FS.isMountpoint(lookup.node)) {
   throw new FS.ErrnoError(28);
  }
  var node = lookup.node;
  var mount = node.mounted;
  var mounts = FS.getMounts(mount);
  Object.keys(FS.nameTable).forEach(hash => {
   var current = FS.nameTable[hash];
   while (current) {
    var next = current.name_next;
    if (mounts.includes(current.mount)) {
     FS.destroyNode(current);
    }
    current = next;
   }
  });
  node.mounted = null;
  var idx = node.mount.mounts.indexOf(mount);
  node.mount.mounts.splice(idx, 1);
 },
 lookup(parent, name) {
  return parent.node_ops.lookup(parent, name);
 },
 mknod(path, mode, dev) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  if (!name || name === "." || name === "..") {
   throw new FS.ErrnoError(28);
  }
  var errCode = FS.mayCreate(parent, name);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.mknod) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.mknod(parent, name, mode, dev);
 },
 create(path, mode) {
  mode = mode !== undefined ? mode : 438;
  /* 0666 */ mode &= 4095;
  mode |= 32768;
  return FS.mknod(path, mode, 0);
 },
 mkdir(path, mode) {
  mode = mode !== undefined ? mode : 511;
  /* 0777 */ mode &= 511 | 512;
  mode |= 16384;
  return FS.mknod(path, mode, 0);
 },
 mkdirTree(path, mode) {
  var dirs = path.split("/");
  var d = "";
  for (var i = 0; i < dirs.length; ++i) {
   if (!dirs[i]) continue;
   d += "/" + dirs[i];
   try {
    FS.mkdir(d, mode);
   } catch (e) {
    if (e.errno != 20) throw e;
   }
  }
 },
 mkdev(path, mode, dev) {
  if (typeof dev == "undefined") {
   dev = mode;
   mode = 438;
  }
  /* 0666 */ mode |= 8192;
  return FS.mknod(path, mode, dev);
 },
 symlink(oldpath, newpath) {
  if (!PATH_FS.resolve(oldpath)) {
   throw new FS.ErrnoError(44);
  }
  var lookup = FS.lookupPath(newpath, {
   parent: true
  });
  var parent = lookup.node;
  if (!parent) {
   throw new FS.ErrnoError(44);
  }
  var newname = PATH.basename(newpath);
  var errCode = FS.mayCreate(parent, newname);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.symlink) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.symlink(parent, newname, oldpath);
 },
 rename(old_path, new_path) {
  var old_dirname = PATH.dirname(old_path);
  var new_dirname = PATH.dirname(new_path);
  var old_name = PATH.basename(old_path);
  var new_name = PATH.basename(new_path);
  var lookup, old_dir, new_dir;
  lookup = FS.lookupPath(old_path, {
   parent: true
  });
  old_dir = lookup.node;
  lookup = FS.lookupPath(new_path, {
   parent: true
  });
  new_dir = lookup.node;
  if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
  if (old_dir.mount !== new_dir.mount) {
   throw new FS.ErrnoError(75);
  }
  var old_node = FS.lookupNode(old_dir, old_name);
  var relative = PATH_FS.relative(old_path, new_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(28);
  }
  relative = PATH_FS.relative(new_path, old_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(55);
  }
  var new_node;
  try {
   new_node = FS.lookupNode(new_dir, new_name);
  } catch (e) {}
  if (old_node === new_node) {
   return;
  }
  var isdir = FS.isDir(old_node.mode);
  var errCode = FS.mayDelete(old_dir, old_name, isdir);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!old_dir.node_ops.rename) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
   throw new FS.ErrnoError(10);
  }
  if (new_dir !== old_dir) {
   errCode = FS.nodePermissions(old_dir, "w");
   if (errCode) {
    throw new FS.ErrnoError(errCode);
   }
  }
  FS.hashRemoveNode(old_node);
  try {
   old_dir.node_ops.rename(old_node, new_dir, new_name);
  } catch (e) {
   throw e;
  } finally {
   FS.hashAddNode(old_node);
  }
 },
 rmdir(path) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var errCode = FS.mayDelete(parent, name, true);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.rmdir) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  parent.node_ops.rmdir(parent, name);
  FS.destroyNode(node);
 },
 readdir(path) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  if (!node.node_ops.readdir) {
   throw new FS.ErrnoError(54);
  }
  return node.node_ops.readdir(node);
 },
 unlink(path) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  if (!parent) {
   throw new FS.ErrnoError(44);
  }
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var errCode = FS.mayDelete(parent, name, false);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.unlink) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  parent.node_ops.unlink(parent, name);
  FS.destroyNode(node);
 },
 readlink(path) {
  var lookup = FS.lookupPath(path);
  var link = lookup.node;
  if (!link) {
   throw new FS.ErrnoError(44);
  }
  if (!link.node_ops.readlink) {
   throw new FS.ErrnoError(28);
  }
  return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
 },
 stat(path, dontFollow) {
  var lookup = FS.lookupPath(path, {
   follow: !dontFollow
  });
  var node = lookup.node;
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (!node.node_ops.getattr) {
   throw new FS.ErrnoError(63);
  }
  return node.node_ops.getattr(node);
 },
 lstat(path) {
  return FS.stat(path, true);
 },
 chmod(path, mode, dontFollow) {
  var node;
  if (typeof path == "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   mode: (mode & 4095) | (node.mode & ~4095),
   timestamp: Date.now()
  });
 },
 lchmod(path, mode) {
  FS.chmod(path, mode, true);
 },
 fchmod(fd, mode) {
  var stream = FS.getStreamChecked(fd);
  FS.chmod(stream.node, mode);
 },
 chown(path, uid, gid, dontFollow) {
  var node;
  if (typeof path == "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   timestamp: Date.now()
  });
 },
 lchown(path, uid, gid) {
  FS.chown(path, uid, gid, true);
 },
 fchown(fd, uid, gid) {
  var stream = FS.getStreamChecked(fd);
  FS.chown(stream.node, uid, gid);
 },
 truncate(path, len) {
  if (len < 0) {
   throw new FS.ErrnoError(28);
  }
  var node;
  if (typeof path == "string") {
   var lookup = FS.lookupPath(path, {
    follow: true
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isDir(node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!FS.isFile(node.mode)) {
   throw new FS.ErrnoError(28);
  }
  var errCode = FS.nodePermissions(node, "w");
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  node.node_ops.setattr(node, {
   size: len,
   timestamp: Date.now()
  });
 },
 ftruncate(fd, len) {
  var stream = FS.getStreamChecked(fd);
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(28);
  }
  FS.truncate(stream.node, len);
 },
 utime(path, atime, mtime) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  node.node_ops.setattr(node, {
   timestamp: Math.max(atime, mtime)
  });
 },
 open(path, flags, mode) {
  if (path === "") {
   throw new FS.ErrnoError(44);
  }
  flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
  mode = typeof mode == "undefined" ? 438 : /* 0666 */ mode;
  if ((flags & 64)) {
   mode = (mode & 4095) | 32768;
  } else {
   mode = 0;
  }
  var node;
  if (typeof path == "object") {
   node = path;
  } else {
   path = PATH.normalize(path);
   try {
    var lookup = FS.lookupPath(path, {
     follow: !(flags & 131072)
    });
    node = lookup.node;
   } catch (e) {}
  }
  var created = false;
  if ((flags & 64)) {
   if (node) {
    if ((flags & 128)) {
     throw new FS.ErrnoError(20);
    }
   } else {
    node = FS.mknod(path, mode, 0);
    created = true;
   }
  }
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (FS.isChrdev(node.mode)) {
   flags &= ~512;
  }
  if ((flags & 65536) && !FS.isDir(node.mode)) {
   throw new FS.ErrnoError(54);
  }
  if (!created) {
   var errCode = FS.mayOpen(node, flags);
   if (errCode) {
    throw new FS.ErrnoError(errCode);
   }
  }
  if ((flags & 512) && !created) {
   FS.truncate(node, 0);
  }
  flags &= ~(128 | 512 | 131072);
  var stream = FS.createStream({
   node: node,
   path: FS.getPath(node),
   flags: flags,
   seekable: true,
   position: 0,
   stream_ops: node.stream_ops,
   ungotten: [],
   error: false
  });
  if (stream.stream_ops.open) {
   stream.stream_ops.open(stream);
  }
  if (Module["logReadFiles"] && !(flags & 1)) {
   if (!FS.readFiles) FS.readFiles = {};
   if (!(path in FS.readFiles)) {
    FS.readFiles[path] = 1;
   }
  }
  return stream;
 },
 close(stream) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (stream.getdents) stream.getdents = null;
  try {
   if (stream.stream_ops.close) {
    stream.stream_ops.close(stream);
   }
  } catch (e) {
   throw e;
  } finally {
   FS.closeStream(stream.fd);
  }
  stream.fd = null;
 },
 isClosed(stream) {
  return stream.fd === null;
 },
 llseek(stream, offset, whence) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (!stream.seekable || !stream.stream_ops.llseek) {
   throw new FS.ErrnoError(70);
  }
  if (whence != 0 && whence != 1 && whence != 2) {
   throw new FS.ErrnoError(28);
  }
  stream.position = stream.stream_ops.llseek(stream, offset, whence);
  stream.ungotten = [];
  return stream.position;
 },
 read(stream, buffer, offset, length, position) {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.read) {
   throw new FS.ErrnoError(28);
  }
  var seeking = typeof position != "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
  if (!seeking) stream.position += bytesRead;
  return bytesRead;
 },
 write(stream, buffer, offset, length, position, canOwn) {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.write) {
   throw new FS.ErrnoError(28);
  }
  if (stream.seekable && stream.flags & 1024) {
   FS.llseek(stream, 0, 2);
  }
  var seeking = typeof position != "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
  if (!seeking) stream.position += bytesWritten;
  return bytesWritten;
 },
 allocate(stream, offset, length) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (offset < 0 || length <= 0) {
   throw new FS.ErrnoError(28);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(43);
  }
  if (!stream.stream_ops.allocate) {
   throw new FS.ErrnoError(138);
  }
  stream.stream_ops.allocate(stream, offset, length);
 },
 mmap(stream, length, position, prot, flags) {
  if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
   throw new FS.ErrnoError(2);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(2);
  }
  if (!stream.stream_ops.mmap) {
   throw new FS.ErrnoError(43);
  }
  return stream.stream_ops.mmap(stream, length, position, prot, flags);
 },
 msync(stream, buffer, offset, length, mmapFlags) {
  if (!stream.stream_ops.msync) {
   return 0;
  }
  return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
 },
 ioctl(stream, cmd, arg) {
  if (!stream.stream_ops.ioctl) {
   throw new FS.ErrnoError(59);
  }
  return stream.stream_ops.ioctl(stream, cmd, arg);
 },
 readFile(path, opts = {}) {
  opts.flags = opts.flags || 0;
  opts.encoding = opts.encoding || "binary";
  if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
   throw new Error(`Invalid encoding type "${opts.encoding}"`);
  }
  var ret;
  var stream = FS.open(path, opts.flags);
  var stat = FS.stat(path);
  var length = stat.size;
  var buf = new Uint8Array(length);
  FS.read(stream, buf, 0, length, 0);
  if (opts.encoding === "utf8") {
   ret = UTF8ArrayToString(buf, 0);
  } else if (opts.encoding === "binary") {
   ret = buf;
  }
  FS.close(stream);
  return ret;
 },
 writeFile(path, data, opts = {}) {
  opts.flags = opts.flags || 577;
  var stream = FS.open(path, opts.flags, opts.mode);
  if (typeof data == "string") {
   var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
   var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
   FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
  } else if (ArrayBuffer.isView(data)) {
   FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
  } else {
   throw new Error("Unsupported data type");
  }
  FS.close(stream);
 },
 cwd: () => FS.currentPath,
 chdir(path) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  if (lookup.node === null) {
   throw new FS.ErrnoError(44);
  }
  if (!FS.isDir(lookup.node.mode)) {
   throw new FS.ErrnoError(54);
  }
  var errCode = FS.nodePermissions(lookup.node, "x");
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  FS.currentPath = lookup.path;
 },
 createDefaultDirectories() {
  FS.mkdir("/tmp");
  FS.mkdir("/home");
  FS.mkdir("/home/web_user");
 },
 createDefaultDevices() {
  FS.mkdir("/dev");
  FS.registerDevice(FS.makedev(1, 3), {
   read: () => 0,
   write: (stream, buffer, offset, length, pos) => length
  });
  FS.mkdev("/dev/null", FS.makedev(1, 3));
  TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
  TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
  FS.mkdev("/dev/tty", FS.makedev(5, 0));
  FS.mkdev("/dev/tty1", FS.makedev(6, 0));
  var randomBuffer = new Uint8Array(1024), randomLeft = 0;
  var randomByte = () => {
   if (randomLeft === 0) {
    randomLeft = randomFill(randomBuffer).byteLength;
   }
   return randomBuffer[--randomLeft];
  };
  FS.createDevice("/dev", "random", randomByte);
  FS.createDevice("/dev", "urandom", randomByte);
  FS.mkdir("/dev/shm");
  FS.mkdir("/dev/shm/tmp");
 },
 createSpecialDirectories() {
  FS.mkdir("/proc");
  var proc_self = FS.mkdir("/proc/self");
  FS.mkdir("/proc/self/fd");
  FS.mount({
   mount() {
    var node = FS.createNode(proc_self, "fd", 16384 | 511, /* 0777 */ 73);
    node.node_ops = {
     lookup(parent, name) {
      var fd = +name;
      var stream = FS.getStreamChecked(fd);
      var ret = {
       parent: null,
       mount: {
        mountpoint: "fake"
       },
       node_ops: {
        readlink: () => stream.path
       }
      };
      ret.parent = ret;
      return ret;
     }
    };
    return node;
   }
  }, {}, "/proc/self/fd");
 },
 createStandardStreams() {
  if (Module["stdin"]) {
   FS.createDevice("/dev", "stdin", Module["stdin"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdin");
  }
  if (Module["stdout"]) {
   FS.createDevice("/dev", "stdout", null, Module["stdout"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdout");
  }
  if (Module["stderr"]) {
   FS.createDevice("/dev", "stderr", null, Module["stderr"]);
  } else {
   FS.symlink("/dev/tty1", "/dev/stderr");
  }
  var stdin = FS.open("/dev/stdin", 0);
  var stdout = FS.open("/dev/stdout", 1);
  var stderr = FS.open("/dev/stderr", 1);
 },
 staticInit() {
  [ 44 ].forEach(code => {
   FS.genericErrors[code] = new FS.ErrnoError(code);
   FS.genericErrors[code].stack = "<generic error, no stack>";
  });
  FS.nameTable = new Array(4096);
  FS.mount(MEMFS, {}, "/");
  FS.createDefaultDirectories();
  FS.createDefaultDevices();
  FS.createSpecialDirectories();
  FS.filesystems = {
   "MEMFS": MEMFS
  };
 },
 init(input, output, error) {
  FS.init.initialized = true;
  Module["stdin"] = input || Module["stdin"];
  Module["stdout"] = output || Module["stdout"];
  Module["stderr"] = error || Module["stderr"];
  FS.createStandardStreams();
 },
 quit() {
  FS.init.initialized = false;
  for (var i = 0; i < FS.streams.length; i++) {
   var stream = FS.streams[i];
   if (!stream) {
    continue;
   }
   FS.close(stream);
  }
 },
 findObject(path, dontResolveLastLink) {
  var ret = FS.analyzePath(path, dontResolveLastLink);
  if (!ret.exists) {
   return null;
  }
  return ret.object;
 },
 analyzePath(path, dontResolveLastLink) {
  try {
   var lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   path = lookup.path;
  } catch (e) {}
  var ret = {
   isRoot: false,
   exists: false,
   error: 0,
   name: null,
   path: null,
   object: null,
   parentExists: false,
   parentPath: null,
   parentObject: null
  };
  try {
   var lookup = FS.lookupPath(path, {
    parent: true
   });
   ret.parentExists = true;
   ret.parentPath = lookup.path;
   ret.parentObject = lookup.node;
   ret.name = PATH.basename(path);
   lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   ret.exists = true;
   ret.path = lookup.path;
   ret.object = lookup.node;
   ret.name = lookup.node.name;
   ret.isRoot = lookup.path === "/";
  } catch (e) {
   ret.error = e.errno;
  }
  return ret;
 },
 createPath(parent, path, canRead, canWrite) {
  parent = typeof parent == "string" ? parent : FS.getPath(parent);
  var parts = path.split("/").reverse();
  while (parts.length) {
   var part = parts.pop();
   if (!part) continue;
   var current = PATH.join2(parent, part);
   try {
    FS.mkdir(current);
   } catch (e) {}
   parent = current;
  }
  return current;
 },
 createFile(parent, name, properties, canRead, canWrite) {
  var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
  var mode = FS_getMode(canRead, canWrite);
  return FS.create(path, mode);
 },
 createDataFile(parent, name, data, canRead, canWrite, canOwn) {
  var path = name;
  if (parent) {
   parent = typeof parent == "string" ? parent : FS.getPath(parent);
   path = name ? PATH.join2(parent, name) : parent;
  }
  var mode = FS_getMode(canRead, canWrite);
  var node = FS.create(path, mode);
  if (data) {
   if (typeof data == "string") {
    var arr = new Array(data.length);
    for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
    data = arr;
   }
   FS.chmod(node, mode | 146);
   var stream = FS.open(node, 577);
   FS.write(stream, data, 0, data.length, 0, canOwn);
   FS.close(stream);
   FS.chmod(node, mode);
  }
 },
 createDevice(parent, name, input, output) {
  var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
  var mode = FS_getMode(!!input, !!output);
  if (!FS.createDevice.major) FS.createDevice.major = 64;
  var dev = FS.makedev(FS.createDevice.major++, 0);
  FS.registerDevice(dev, {
   open(stream) {
    stream.seekable = false;
   },
   close(stream) {
    if (output?.buffer?.length) {
     output(10);
    }
   },
   read(stream, buffer, offset, length, pos) {
    /* ignored */ var bytesRead = 0;
    for (var i = 0; i < length; i++) {
     var result;
     try {
      result = input();
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
     if (result === undefined && bytesRead === 0) {
      throw new FS.ErrnoError(6);
     }
     if (result === null || result === undefined) break;
     bytesRead++;
     buffer[offset + i] = result;
    }
    if (bytesRead) {
     stream.node.timestamp = Date.now();
    }
    return bytesRead;
   },
   write(stream, buffer, offset, length, pos) {
    for (var i = 0; i < length; i++) {
     try {
      output(buffer[offset + i]);
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
    }
    if (length) {
     stream.node.timestamp = Date.now();
    }
    return i;
   }
  });
  return FS.mkdev(path, mode, dev);
 },
 forceLoadFile(obj) {
  if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
  if (typeof XMLHttpRequest != "undefined") {
   throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
  } else if (read_) {
   try {
    obj.contents = intArrayFromString(read_(obj.url), true);
    obj.usedBytes = obj.contents.length;
   } catch (e) {
    throw new FS.ErrnoError(29);
   }
  } else {
   throw new Error("Cannot load without read() or XMLHttpRequest.");
  }
 },
 createLazyFile(parent, name, url, canRead, canWrite) {
  class LazyUint8Array {
   constructor() {
    this.lengthKnown = false;
    this.chunks = [];
   }
   get(idx) {
    if (idx > this.length - 1 || idx < 0) {
     return undefined;
    }
    var chunkOffset = idx % this.chunkSize;
    var chunkNum = (idx / this.chunkSize) | 0;
    return this.getter(chunkNum)[chunkOffset];
   }
   setDataGetter(getter) {
    this.getter = getter;
   }
   cacheLength() {
    var xhr = new XMLHttpRequest;
    xhr.open("HEAD", url, false);
    xhr.send(null);
    if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
    var datalength = Number(xhr.getResponseHeader("Content-length"));
    var header;
    var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
    var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
    var chunkSize = 1024 * 1024;
    if (!hasByteServing) chunkSize = datalength;
    var doXHR = (from, to) => {
     if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
     if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
     var xhr = new XMLHttpRequest;
     xhr.open("GET", url, false);
     if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
     xhr.responseType = "arraybuffer";
     if (xhr.overrideMimeType) {
      xhr.overrideMimeType("text/plain; charset=x-user-defined");
     }
     xhr.send(null);
     if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
     if (xhr.response !== undefined) {
      return new Uint8Array(/** @type{Array<number>} */ (xhr.response || []));
     }
     return intArrayFromString(xhr.responseText || "", true);
    };
    var lazyArray = this;
    lazyArray.setDataGetter(chunkNum => {
     var start = chunkNum * chunkSize;
     var end = (chunkNum + 1) * chunkSize - 1;
     end = Math.min(end, datalength - 1);
     if (typeof lazyArray.chunks[chunkNum] == "undefined") {
      lazyArray.chunks[chunkNum] = doXHR(start, end);
     }
     if (typeof lazyArray.chunks[chunkNum] == "undefined") throw new Error("doXHR failed!");
     return lazyArray.chunks[chunkNum];
    });
    if (usesGzip || !datalength) {
     chunkSize = datalength = 1;
     datalength = this.getter(0).length;
     chunkSize = datalength;
     out("LazyFiles on gzip forces download of the whole file when length is accessed");
    }
    this._length = datalength;
    this._chunkSize = chunkSize;
    this.lengthKnown = true;
   }
   get length() {
    if (!this.lengthKnown) {
     this.cacheLength();
    }
    return this._length;
   }
   get chunkSize() {
    if (!this.lengthKnown) {
     this.cacheLength();
    }
    return this._chunkSize;
   }
  }
  if (typeof XMLHttpRequest != "undefined") {
   if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
   var lazyArray = new LazyUint8Array;
   var properties = {
    isDevice: false,
    contents: lazyArray
   };
  } else {
   var properties = {
    isDevice: false,
    url: url
   };
  }
  var node = FS.createFile(parent, name, properties, canRead, canWrite);
  if (properties.contents) {
   node.contents = properties.contents;
  } else if (properties.url) {
   node.contents = null;
   node.url = properties.url;
  }
  Object.defineProperties(node, {
   usedBytes: {
    get: function() {
     return this.contents.length;
    }
   }
  });
  var stream_ops = {};
  var keys = Object.keys(node.stream_ops);
  keys.forEach(key => {
   var fn = node.stream_ops[key];
   stream_ops[key] = (...args) => {
    FS.forceLoadFile(node);
    return fn(...args);
   };
  });
  function writeChunks(stream, buffer, offset, length, position) {
   var contents = stream.node.contents;
   if (position >= contents.length) return 0;
   var size = Math.min(contents.length - position, length);
   if (contents.slice) {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents[position + i];
    }
   } else {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents.get(position + i);
    }
   }
   return size;
  }
  stream_ops.read = (stream, buffer, offset, length, position) => {
   FS.forceLoadFile(node);
   return writeChunks(stream, buffer, offset, length, position);
  };
  stream_ops.mmap = (stream, length, position, prot, flags) => {
   FS.forceLoadFile(node);
   var ptr = mmapAlloc(length);
   if (!ptr) {
    throw new FS.ErrnoError(48);
   }
   writeChunks(stream, HEAP8, ptr, length, position);
   return {
    ptr: ptr,
    allocated: true
   };
  };
  node.stream_ops = stream_ops;
  return node;
 }
};

var SYSCALLS = {
 DEFAULT_POLLMASK: 5,
 calculateAt(dirfd, path, allowEmpty) {
  if (PATH.isAbs(path)) {
   return path;
  }
  var dir;
  if (dirfd === -100) {
   dir = FS.cwd();
  } else {
   var dirstream = SYSCALLS.getStreamFromFD(dirfd);
   dir = dirstream.path;
  }
  if (path.length == 0) {
   if (!allowEmpty) {
    throw new FS.ErrnoError(44);
   }
   return dir;
  }
  return PATH.join2(dir, path);
 },
 doStat(func, path, buf) {
  var stat = func(path);
  SAFE_HEAP_STORE(((buf) >> 2) * 4, stat.dev, 4);
  SAFE_HEAP_STORE((((buf) + (4)) >> 2) * 4, stat.mode, 4);
  SAFE_HEAP_STORE((((buf) + (8)) >> 2) * 4, stat.nlink, 4);
  SAFE_HEAP_STORE((((buf) + (12)) >> 2) * 4, stat.uid, 4);
  SAFE_HEAP_STORE((((buf) + (16)) >> 2) * 4, stat.gid, 4);
  SAFE_HEAP_STORE((((buf) + (20)) >> 2) * 4, stat.rdev, 4);
  (tempI64 = [ stat.size >>> 0, (tempDouble = stat.size, (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
  SAFE_HEAP_STORE((((buf) + (24)) >> 2) * 4, tempI64[0], 4), SAFE_HEAP_STORE((((buf) + (28)) >> 2) * 4, tempI64[1], 4));
  SAFE_HEAP_STORE((((buf) + (32)) >> 2) * 4, 4096, 4);
  SAFE_HEAP_STORE((((buf) + (36)) >> 2) * 4, stat.blocks, 4);
  var atime = stat.atime.getTime();
  var mtime = stat.mtime.getTime();
  var ctime = stat.ctime.getTime();
  (tempI64 = [ Math.floor(atime / 1e3) >>> 0, (tempDouble = Math.floor(atime / 1e3), 
  (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
  SAFE_HEAP_STORE((((buf) + (40)) >> 2) * 4, tempI64[0], 4), SAFE_HEAP_STORE((((buf) + (44)) >> 2) * 4, tempI64[1], 4));
  SAFE_HEAP_STORE((((buf) + (48)) >> 2) * 4, (atime % 1e3) * 1e3, 4);
  (tempI64 = [ Math.floor(mtime / 1e3) >>> 0, (tempDouble = Math.floor(mtime / 1e3), 
  (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
  SAFE_HEAP_STORE((((buf) + (56)) >> 2) * 4, tempI64[0], 4), SAFE_HEAP_STORE((((buf) + (60)) >> 2) * 4, tempI64[1], 4));
  SAFE_HEAP_STORE((((buf) + (64)) >> 2) * 4, (mtime % 1e3) * 1e3, 4);
  (tempI64 = [ Math.floor(ctime / 1e3) >>> 0, (tempDouble = Math.floor(ctime / 1e3), 
  (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
  SAFE_HEAP_STORE((((buf) + (72)) >> 2) * 4, tempI64[0], 4), SAFE_HEAP_STORE((((buf) + (76)) >> 2) * 4, tempI64[1], 4));
  SAFE_HEAP_STORE((((buf) + (80)) >> 2) * 4, (ctime % 1e3) * 1e3, 4);
  (tempI64 = [ stat.ino >>> 0, (tempDouble = stat.ino, (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
  SAFE_HEAP_STORE((((buf) + (88)) >> 2) * 4, tempI64[0], 4), SAFE_HEAP_STORE((((buf) + (92)) >> 2) * 4, tempI64[1], 4));
  return 0;
 },
 doMsync(addr, stream, len, flags, offset) {
  if (!FS.isFile(stream.node.mode)) {
   throw new FS.ErrnoError(43);
  }
  if (flags & 2) {
   return 0;
  }
  var buffer = HEAPU8.slice(addr, addr + len);
  FS.msync(stream, buffer, offset, len, flags);
 },
 getStreamFromFD(fd) {
  var stream = FS.getStreamChecked(fd);
  return stream;
 },
 varargs: undefined,
 getStr(ptr) {
  var ret = UTF8ToString(ptr);
  return ret;
 }
};

function _fd_write(fd, iov, iovcnt, pnum) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var num = doWritev(stream, iov, iovcnt);
  SAFE_HEAP_STORE(((pnum) >> 2) * 4, num, 4);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

var _glActiveTexture = x0 => GLctx.activeTexture(x0);

var _glAttachShader = (program, shader) => {
 GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
};

var _glBindBuffer = (target, buffer) => {
 if (target == 35051) /*GL_PIXEL_PACK_BUFFER*/ {
  GLctx.currentPixelPackBufferBinding = buffer;
 } else if (target == 35052) /*GL_PIXEL_UNPACK_BUFFER*/ {
  GLctx.currentPixelUnpackBufferBinding = buffer;
 }
 GLctx.bindBuffer(target, GL.buffers[buffer]);
};

var _glBindFramebuffer = (target, framebuffer) => {
 GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
};

var _glBindRenderbuffer = (target, renderbuffer) => {
 GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer]);
};

var _glBindSampler = (unit, sampler) => {
 GLctx.bindSampler(unit, GL.samplers[sampler]);
};

var _glBindTexture = (target, texture) => {
 GLctx.bindTexture(target, GL.textures[texture]);
};

var _glBindVertexArray = vao => {
 GLctx.bindVertexArray(GL.vaos[vao]);
};

var _glBlendColor = (x0, x1, x2, x3) => GLctx.blendColor(x0, x1, x2, x3);

var _glBlendEquationSeparate = (x0, x1) => GLctx.blendEquationSeparate(x0, x1);

var _glBlendFuncSeparate = (x0, x1, x2, x3) => GLctx.blendFuncSeparate(x0, x1, x2, x3);

var _glBlitFramebuffer = (x0, x1, x2, x3, x4, x5, x6, x7, x8, x9) => GLctx.blitFramebuffer(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9);

var _glBufferData = (target, size, data, usage) => {
 if (GL.currentContext.version >= 2) {
  if (data && size) {
   GLctx.bufferData(target, HEAPU8, usage, data, size);
  } else {
   GLctx.bufferData(target, size, usage);
  }
  return;
 }
 GLctx.bufferData(target, data ? HEAPU8.subarray(data, data + size) : size, usage);
};

var _glBufferSubData = (target, offset, size, data) => {
 if (GL.currentContext.version >= 2) {
  size && GLctx.bufferSubData(target, offset, HEAPU8, data, size);
  return;
 }
 GLctx.bufferSubData(target, offset, HEAPU8.subarray(data, data + size));
};

var _glClearBufferfi = (x0, x1, x2, x3) => GLctx.clearBufferfi(x0, x1, x2, x3);

var _glClearBufferfv = (buffer, drawbuffer, value) => {
 GLctx.clearBufferfv(buffer, drawbuffer, HEAPF32, ((value) >> 2));
};

var _glClearBufferiv = (buffer, drawbuffer, value) => {
 GLctx.clearBufferiv(buffer, drawbuffer, HEAP32, ((value) >> 2));
};

var _glColorMask = (red, green, blue, alpha) => {
 GLctx.colorMask(!!red, !!green, !!blue, !!alpha);
};

var _glCompileShader = shader => {
 GLctx.compileShader(GL.shaders[shader]);
};

var _glCompressedTexImage2D = (target, level, internalFormat, width, height, border, imageSize, data) => {
 if (GL.currentContext.version >= 2) {
  if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
   GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, imageSize, data);
   return;
  }
  GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, HEAPU8, data, imageSize);
  return;
 }
 GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, data ? HEAPU8.subarray((data), data + imageSize) : null);
};

var _glCompressedTexImage3D = (target, level, internalFormat, width, height, depth, border, imageSize, data) => {
 if (GLctx.currentPixelUnpackBufferBinding) {
  GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, imageSize, data);
 } else {
  GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, HEAPU8, data, imageSize);
 }
};

var _glCreateProgram = () => {
 var id = GL.getNewId(GL.programs);
 var program = GLctx.createProgram();
 program.name = id;
 program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
 program.uniformIdCounter = 1;
 GL.programs[id] = program;
 return id;
};

var _glCreateShader = shaderType => {
 var id = GL.getNewId(GL.shaders);
 GL.shaders[id] = GLctx.createShader(shaderType);
 return id;
};

var _glCullFace = x0 => GLctx.cullFace(x0);

var _glDeleteBuffers = (n, buffers) => {
 for (var i = 0; i < n; i++) {
  var id = SAFE_HEAP_LOAD((((buffers) + (i * 4)) >> 2) * 4, 4, 0);
  var buffer = GL.buffers[id];
  if (!buffer) continue;
  GLctx.deleteBuffer(buffer);
  buffer.name = 0;
  GL.buffers[id] = null;
  if (id == GLctx.currentPixelPackBufferBinding) GLctx.currentPixelPackBufferBinding = 0;
  if (id == GLctx.currentPixelUnpackBufferBinding) GLctx.currentPixelUnpackBufferBinding = 0;
 }
};

var _glDeleteFramebuffers = (n, framebuffers) => {
 for (var i = 0; i < n; ++i) {
  var id = SAFE_HEAP_LOAD((((framebuffers) + (i * 4)) >> 2) * 4, 4, 0);
  var framebuffer = GL.framebuffers[id];
  if (!framebuffer) continue;
  GLctx.deleteFramebuffer(framebuffer);
  framebuffer.name = 0;
  GL.framebuffers[id] = null;
 }
};

var _glDeleteProgram = id => {
 if (!id) return;
 var program = GL.programs[id];
 if (!program) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 GLctx.deleteProgram(program);
 program.name = 0;
 GL.programs[id] = null;
};

var _glDeleteRenderbuffers = (n, renderbuffers) => {
 for (var i = 0; i < n; i++) {
  var id = SAFE_HEAP_LOAD((((renderbuffers) + (i * 4)) >> 2) * 4, 4, 0);
  var renderbuffer = GL.renderbuffers[id];
  if (!renderbuffer) continue;
  GLctx.deleteRenderbuffer(renderbuffer);
  renderbuffer.name = 0;
  GL.renderbuffers[id] = null;
 }
};

var _glDeleteSamplers = (n, samplers) => {
 for (var i = 0; i < n; i++) {
  var id = SAFE_HEAP_LOAD((((samplers) + (i * 4)) >> 2) * 4, 4, 0);
  var sampler = GL.samplers[id];
  if (!sampler) continue;
  GLctx.deleteSampler(sampler);
  sampler.name = 0;
  GL.samplers[id] = null;
 }
};

var _glDeleteShader = id => {
 if (!id) return;
 var shader = GL.shaders[id];
 if (!shader) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 GLctx.deleteShader(shader);
 GL.shaders[id] = null;
};

var _glDeleteTextures = (n, textures) => {
 for (var i = 0; i < n; i++) {
  var id = SAFE_HEAP_LOAD((((textures) + (i * 4)) >> 2) * 4, 4, 0);
  var texture = GL.textures[id];
  if (!texture) continue;
  GLctx.deleteTexture(texture);
  texture.name = 0;
  GL.textures[id] = null;
 }
};

var _glDeleteVertexArrays = (n, vaos) => {
 for (var i = 0; i < n; i++) {
  var id = SAFE_HEAP_LOAD((((vaos) + (i * 4)) >> 2) * 4, 4, 0);
  GLctx.deleteVertexArray(GL.vaos[id]);
  GL.vaos[id] = null;
 }
};

var _glDepthFunc = x0 => GLctx.depthFunc(x0);

var _glDepthMask = flag => {
 GLctx.depthMask(!!flag);
};

var _glDisable = x0 => GLctx.disable(x0);

var _glDisableVertexAttribArray = index => {
 GLctx.disableVertexAttribArray(index);
};

var _glDrawArrays = (mode, first, count) => {
 GLctx.drawArrays(mode, first, count);
};

var _glDrawArraysInstanced = (mode, first, count, primcount) => {
 GLctx.drawArraysInstanced(mode, first, count, primcount);
};

var _glDrawElements = (mode, count, type, indices) => {
 GLctx.drawElements(mode, count, type, indices);
};

var _glDrawElementsInstanced = (mode, count, type, indices, primcount) => {
 GLctx.drawElementsInstanced(mode, count, type, indices, primcount);
};

var _glEnable = x0 => GLctx.enable(x0);

var _glEnableVertexAttribArray = index => {
 GLctx.enableVertexAttribArray(index);
};

var _glFrontFace = x0 => GLctx.frontFace(x0);

var _glGenBuffers = (n, buffers) => {
 GL.genObject(n, buffers, "createBuffer", GL.buffers);
};

var _glGenRenderbuffers = (n, renderbuffers) => {
 GL.genObject(n, renderbuffers, "createRenderbuffer", GL.renderbuffers);
};

var _glGenSamplers = (n, samplers) => {
 GL.genObject(n, samplers, "createSampler", GL.samplers);
};

var _glGenTextures = (n, textures) => {
 GL.genObject(n, textures, "createTexture", GL.textures);
};

var _glGenVertexArrays = (n, arrays) => {
 GL.genObject(n, arrays, "createVertexArray", GL.vaos);
};

var _glGetAttribLocation = (program, name) => GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));

var _glGetError = () => {
 var error = GLctx.getError() || GL.lastError;
 GL.lastError = 0;
 /*GL_NO_ERROR*/ return error;
};

var writeI53ToI64 = (ptr, num) => {
 SAFE_HEAP_STORE(((ptr) >> 2) * 4, num, 4);
 var lower = SAFE_HEAP_LOAD(((ptr) >> 2) * 4, 4, 1);
 SAFE_HEAP_STORE((((ptr) + (4)) >> 2) * 4, (num - lower) / 4294967296, 4);
};

var webglGetExtensions = function $webglGetExtensions() {
 var exts = getEmscriptenSupportedExtensions(GLctx);
 exts = exts.concat(exts.map(e => "GL_" + e));
 return exts;
};

var emscriptenWebGLGet = (name_, p, type) => {
 if (!p) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 var ret = undefined;
 switch (name_) {
 case 36346:
  ret = 1;
  break;

 case 36344:
  if (type != 0 && type != 1) {
   GL.recordError(1280);
  }
  return;

 case 34814:
 case 36345:
  ret = 0;
  break;

 case 34466:
  var formats = GLctx.getParameter(34467);
  /*GL_COMPRESSED_TEXTURE_FORMATS*/ ret = formats ? formats.length : 0;
  break;

 case 33309:
  if (GL.currentContext.version < 2) {
   GL.recordError(1282);
   /* GL_INVALID_OPERATION */ return;
  }
  ret = webglGetExtensions().length;
  break;

 case 33307:
 case 33308:
  if (GL.currentContext.version < 2) {
   GL.recordError(1280);
   return;
  }
  ret = name_ == 33307 ? 3 : 0;
  break;
 }
 if (ret === undefined) {
  var result = GLctx.getParameter(name_);
  switch (typeof result) {
  case "number":
   ret = result;
   break;

  case "boolean":
   ret = result ? 1 : 0;
   break;

  case "string":
   GL.recordError(1280);
   return;

  case "object":
   if (result === null) {
    switch (name_) {
    case 34964:
    case 35725:
    case 34965:
    case 36006:
    case 36007:
    case 32873:
    case 34229:
    case 36662:
    case 36663:
    case 35053:
    case 35055:
    case 36010:
    case 35097:
    case 35869:
    case 32874:
    case 36389:
    case 35983:
    case 35368:
    case 34068:
     {
      ret = 0;
      break;
     }

    default:
     {
      GL.recordError(1280);
      return;
     }
    }
   } else if (result instanceof Float32Array || result instanceof Uint32Array || result instanceof Int32Array || result instanceof Array) {
    for (var i = 0; i < result.length; ++i) {
     switch (type) {
     case 0:
      SAFE_HEAP_STORE((((p) + (i * 4)) >> 2) * 4, result[i], 4);
      break;

     case 2:
      SAFE_HEAP_STORE_D((((p) + (i * 4)) >> 2) * 4, result[i], 4);
      break;

     case 4:
      SAFE_HEAP_STORE((p) + (i), result[i] ? 1 : 0, 1);
      break;
     }
    }
    return;
   } else {
    try {
     ret = result.name | 0;
    } catch (e) {
     GL.recordError(1280);
     err(`GL_INVALID_ENUM in glGet${type}v: Unknown object returned from WebGL getParameter(${name_})! (error: ${e})`);
     return;
    }
   }
   break;

  default:
   GL.recordError(1280);
   err(`GL_INVALID_ENUM in glGet${type}v: Native code calling glGet${type}v(${name_}) and it returns ${result} of type ${typeof (result)}!`);
   return;
  }
 }
 switch (type) {
 case 1:
  writeI53ToI64(p, ret);
  break;

 case 0:
  SAFE_HEAP_STORE(((p) >> 2) * 4, ret, 4);
  break;

 case 2:
  SAFE_HEAP_STORE_D(((p) >> 2) * 4, ret, 4);
  break;

 case 4:
  SAFE_HEAP_STORE(p, ret ? 1 : 0, 1);
  break;
 }
};

var _glGetIntegerv = (name_, p) => emscriptenWebGLGet(name_, p, 0);

var _glGetProgramInfoLog = (program, maxLength, length, infoLog) => {
 var log = GLctx.getProgramInfoLog(GL.programs[program]);
 if (log === null) log = "(unknown error)";
 var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
 if (length) SAFE_HEAP_STORE(((length) >> 2) * 4, numBytesWrittenExclNull, 4);
};

var _glGetProgramiv = (program, pname, p) => {
 if (!p) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 if (program >= GL.counter) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 program = GL.programs[program];
 if (pname == 35716) {
  var log = GLctx.getProgramInfoLog(program);
  if (log === null) log = "(unknown error)";
  SAFE_HEAP_STORE(((p) >> 2) * 4, log.length + 1, 4);
 } else if (pname == 35719) /* GL_ACTIVE_UNIFORM_MAX_LENGTH */ {
  if (!program.maxUniformLength) {
   for (var i = 0; i < GLctx.getProgramParameter(program, 35718); /*GL_ACTIVE_UNIFORMS*/ ++i) {
    program.maxUniformLength = Math.max(program.maxUniformLength, GLctx.getActiveUniform(program, i).name.length + 1);
   }
  }
  SAFE_HEAP_STORE(((p) >> 2) * 4, program.maxUniformLength, 4);
 } else if (pname == 35722) /* GL_ACTIVE_ATTRIBUTE_MAX_LENGTH */ {
  if (!program.maxAttributeLength) {
   for (var i = 0; i < GLctx.getProgramParameter(program, 35721); /*GL_ACTIVE_ATTRIBUTES*/ ++i) {
    program.maxAttributeLength = Math.max(program.maxAttributeLength, GLctx.getActiveAttrib(program, i).name.length + 1);
   }
  }
  SAFE_HEAP_STORE(((p) >> 2) * 4, program.maxAttributeLength, 4);
 } else if (pname == 35381) /* GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH */ {
  if (!program.maxUniformBlockNameLength) {
   for (var i = 0; i < GLctx.getProgramParameter(program, 35382); /*GL_ACTIVE_UNIFORM_BLOCKS*/ ++i) {
    program.maxUniformBlockNameLength = Math.max(program.maxUniformBlockNameLength, GLctx.getActiveUniformBlockName(program, i).length + 1);
   }
  }
  SAFE_HEAP_STORE(((p) >> 2) * 4, program.maxUniformBlockNameLength, 4);
 } else {
  SAFE_HEAP_STORE(((p) >> 2) * 4, GLctx.getProgramParameter(program, pname), 4);
 }
};

var _glGetShaderInfoLog = (shader, maxLength, length, infoLog) => {
 var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
 if (log === null) log = "(unknown error)";
 var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
 if (length) SAFE_HEAP_STORE(((length) >> 2) * 4, numBytesWrittenExclNull, 4);
};

var _glGetShaderiv = (shader, pname, p) => {
 if (!p) {
  GL.recordError(1281);
  /* GL_INVALID_VALUE */ return;
 }
 if (pname == 35716) {
  var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
  if (log === null) log = "(unknown error)";
  var logLength = log ? log.length + 1 : 0;
  SAFE_HEAP_STORE(((p) >> 2) * 4, logLength, 4);
 } else if (pname == 35720) {
  var source = GLctx.getShaderSource(GL.shaders[shader]);
  var sourceLength = source ? source.length + 1 : 0;
  SAFE_HEAP_STORE(((p) >> 2) * 4, sourceLength, 4);
 } else {
  SAFE_HEAP_STORE(((p) >> 2) * 4, GLctx.getShaderParameter(GL.shaders[shader], pname), 4);
 }
};

var stringToNewUTF8 = str => {
 var size = lengthBytesUTF8(str) + 1;
 var ret = _malloc(size);
 if (ret) stringToUTF8(str, ret, size);
 return ret;
};

var _glGetStringi = (name, index) => {
 if (GL.currentContext.version < 2) {
  GL.recordError(1282);
  return 0;
 }
 var stringiCache = GL.stringiCache[name];
 if (stringiCache) {
  if (index < 0 || index >= stringiCache.length) {
   GL.recordError(1281);
   /*GL_INVALID_VALUE*/ return 0;
  }
  return stringiCache[index];
 }
 switch (name) {
 case 7939:
  /* GL_EXTENSIONS */ var exts = webglGetExtensions().map(stringToNewUTF8);
  stringiCache = GL.stringiCache[name] = exts;
  if (index < 0 || index >= stringiCache.length) {
   GL.recordError(1281);
   /*GL_INVALID_VALUE*/ return 0;
  }
  return stringiCache[index];

 default:
  GL.recordError(1280);
  /*GL_INVALID_ENUM*/ return 0;
 }
};

/** @suppress {checkTypes} */ var jstoi_q = str => parseInt(str);

/** @noinline */ var webglGetLeftBracePos = name => name.slice(-1) == "]" && name.lastIndexOf("[");

var webglPrepareUniformLocationsBeforeFirstUse = program => {
 var uniformLocsById = program.uniformLocsById,  uniformSizeAndIdsByName = program.uniformSizeAndIdsByName,  i, j;
 if (!uniformLocsById) {
  program.uniformLocsById = uniformLocsById = {};
  program.uniformArrayNamesById = {};
  for (i = 0; i < GLctx.getProgramParameter(program, 35718); /*GL_ACTIVE_UNIFORMS*/ ++i) {
   var u = GLctx.getActiveUniform(program, i);
   var nm = u.name;
   var sz = u.size;
   var lb = webglGetLeftBracePos(nm);
   var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
   var id = program.uniformIdCounter;
   program.uniformIdCounter += sz;
   uniformSizeAndIdsByName[arrayName] = [ sz, id ];
   for (j = 0; j < sz; ++j) {
    uniformLocsById[id] = j;
    program.uniformArrayNamesById[id++] = arrayName;
   }
  }
 }
};

var _glGetUniformLocation = (program, name) => {
 name = UTF8ToString(name);
 if (program = GL.programs[program]) {
  webglPrepareUniformLocationsBeforeFirstUse(program);
  var uniformLocsById = program.uniformLocsById;
  var arrayIndex = 0;
  var uniformBaseName = name;
  var leftBrace = webglGetLeftBracePos(name);
  if (leftBrace > 0) {
   arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0;
   uniformBaseName = name.slice(0, leftBrace);
  }
  var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
  if (sizeAndId && arrayIndex < sizeAndId[0]) {
   arrayIndex += sizeAndId[1];
   if ((uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name))) {
    return arrayIndex;
   }
  }
 } else {
  GL.recordError(1281);
 }
 /* GL_INVALID_VALUE */ return -1;
};

var tempFixedLengthArray = [];

var _glInvalidateFramebuffer = (target, numAttachments, attachments) => {
 var list = tempFixedLengthArray[numAttachments];
 for (var i = 0; i < numAttachments; i++) {
  list[i] = SAFE_HEAP_LOAD((((attachments) + (i * 4)) >> 2) * 4, 4, 0);
 }
 GLctx.invalidateFramebuffer(target, list);
};

var _glLinkProgram = program => {
 program = GL.programs[program];
 GLctx.linkProgram(program);
 program.uniformLocsById = 0;
 program.uniformSizeAndIdsByName = {};
};

var _glPixelStorei = (pname, param) => {
 if (pname == 3317) /* GL_UNPACK_ALIGNMENT */ {
  GL.unpackAlignment = param;
 }
 GLctx.pixelStorei(pname, param);
};

var _glPolygonOffset = (x0, x1) => GLctx.polygonOffset(x0, x1);

var _glReadBuffer = x0 => GLctx.readBuffer(x0);

var _glRenderbufferStorageMultisample = (x0, x1, x2, x3, x4) => GLctx.renderbufferStorageMultisample(x0, x1, x2, x3, x4);

var _glSamplerParameterf = (sampler, pname, param) => {
 GLctx.samplerParameterf(GL.samplers[sampler], pname, param);
};

var _glSamplerParameteri = (sampler, pname, param) => {
 GLctx.samplerParameteri(GL.samplers[sampler], pname, param);
};

var _glScissor = (x0, x1, x2, x3) => GLctx.scissor(x0, x1, x2, x3);

var _glShaderSource = (shader, count, string, length) => {
 var source = GL.getSource(shader, count, string, length);
 GLctx.shaderSource(GL.shaders[shader], source);
};

var _glStencilFunc = (x0, x1, x2) => GLctx.stencilFunc(x0, x1, x2);

var _glStencilFuncSeparate = (x0, x1, x2, x3) => GLctx.stencilFuncSeparate(x0, x1, x2, x3);

var _glStencilMask = x0 => GLctx.stencilMask(x0);

var _glStencilOp = (x0, x1, x2) => GLctx.stencilOp(x0, x1, x2);

var _glStencilOpSeparate = (x0, x1, x2, x3) => GLctx.stencilOpSeparate(x0, x1, x2, x3);

var computeUnpackAlignedImageSize = (width, height, sizePerPixel, alignment) => {
 function roundedToNextMultipleOf(x, y) {
  return (x + y - 1) & -y;
 }
 var plainRowSize = width * sizePerPixel;
 var alignedRowSize = roundedToNextMultipleOf(plainRowSize, alignment);
 return height * alignedRowSize;
};

var colorChannelsInGlTextureFormat = format => {
 var colorChannels = {
  5: 3,
  6: 4,
  8: 2,
  29502: 3,
  29504: 4,
  26917: 2,
  26918: 2,
  29846: 3,
  29847: 4
 };
 return colorChannels[format - 6402] || 1;
};

var heapObjectForWebGLType = type => {
 type -= 5120;
 if (type == 0) return HEAP8;
 if (type == 1) return HEAPU8;
 if (type == 2) return HEAP16;
 if (type == 4) return HEAP32;
 if (type == 6) return HEAPF32;
 if (type == 5 || type == 28922 || type == 28520 || type == 30779 || type == 30782) return HEAPU32;
 return HEAPU16;
};

var toTypedArrayIndex = (pointer, heap) => pointer >>> (31 - Math.clz32(heap.BYTES_PER_ELEMENT));

var emscriptenWebGLGetTexPixelData = (type, format, width, height, pixels, internalFormat) => {
 var heap = heapObjectForWebGLType(type);
 var sizePerPixel = colorChannelsInGlTextureFormat(format) * heap.BYTES_PER_ELEMENT;
 var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel, GL.unpackAlignment);
 return heap.subarray(toTypedArrayIndex(pixels, heap), toTypedArrayIndex(pixels + bytes, heap));
};

var _glTexImage2D = (target, level, internalFormat, width, height, border, format, type, pixels) => {
 if (GL.currentContext.version >= 2) {
  if (GLctx.currentPixelUnpackBufferBinding) {
   GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
   return;
  }
  if (pixels) {
   var heap = heapObjectForWebGLType(type);
   var index = toTypedArrayIndex(pixels, heap);
   GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, heap, index);
   return;
  }
 }
 var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null;
 GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixelData);
};

var _glTexImage3D = (target, level, internalFormat, width, height, depth, border, format, type, pixels) => {
 if (GLctx.currentPixelUnpackBufferBinding) {
  GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, pixels);
 } else if (pixels) {
  var heap = heapObjectForWebGLType(type);
  GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, heap, toTypedArrayIndex(pixels, heap));
 } else {
  GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, null);
 }
};

var _glTexParameteri = (x0, x1, x2) => GLctx.texParameteri(x0, x1, x2);

var webglGetUniformLocation = location => {
 var p = GLctx.currentProgram;
 if (p) {
  var webglLoc = p.uniformLocsById[location];
  if (typeof webglLoc == "number") {
   p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(p, p.uniformArrayNamesById[location] + (webglLoc > 0 ? `[${webglLoc}]` : ""));
  }
  return webglLoc;
 } else {
  GL.recordError(1282);
 }
};

var miniTempWebGLFloatBuffers = [];

var _glUniform1fv = (location, count, value) => {
 if (GL.currentContext.version >= 2) {
  count && GLctx.uniform1fv(webglGetUniformLocation(location), HEAPF32, ((value) >> 2), count);
  return;
 }
 if (count <= 288) {
  var view = miniTempWebGLFloatBuffers[count];
  for (var i = 0; i < count; ++i) {
   view[i] = SAFE_HEAP_LOAD_D((((value) + (4 * i)) >> 2) * 4, 4, 0);
  }
 } else {
  var view = HEAPF32.subarray((((value) >> 2)), ((value + count * 4) >> 2));
 }
 GLctx.uniform1fv(webglGetUniformLocation(location), view);
};

var _glUniform1i = (location, v0) => {
 GLctx.uniform1i(webglGetUniformLocation(location), v0);
};

var miniTempWebGLIntBuffers = [];

var _glUniform1iv = (location, count, value) => {
 if (GL.currentContext.version >= 2) {
  count && GLctx.uniform1iv(webglGetUniformLocation(location), HEAP32, ((value) >> 2), count);
  return;
 }
 if (count <= 288) {
  var view = miniTempWebGLIntBuffers[count];
  for (var i = 0; i < count; ++i) {
   view[i] = SAFE_HEAP_LOAD((((value) + (4 * i)) >> 2) * 4, 4, 0);
  }
 } else {
  var view = HEAP32.subarray((((value) >> 2)), ((value + count * 4) >> 2));
 }
 GLctx.uniform1iv(webglGetUniformLocation(location), view);
};

var _glUniform2fv = (location, count, value) => {
 if (GL.currentContext.version >= 2) {
  count && GLctx.uniform2fv(webglGetUniformLocation(location), HEAPF32, ((value) >> 2), count * 2);
  return;
 }
 if (count <= 144) {
  var view = miniTempWebGLFloatBuffers[2 * count];
  for (var i = 0; i < 2 * count; i += 2) {
   view[i] = SAFE_HEAP_LOAD_D((((value) + (4 * i)) >> 2) * 4, 4, 0);
   view[i + 1] = SAFE_HEAP_LOAD_D((((value) + (4 * i + 4)) >> 2) * 4, 4, 0);
  }
 } else {
  var view = HEAPF32.subarray((((value) >> 2)), ((value + count * 8) >> 2));
 }
 GLctx.uniform2fv(webglGetUniformLocation(location), view);
};

var _glUniform2iv = (location, count, value) => {
 if (GL.currentContext.version >= 2) {
  count && GLctx.uniform2iv(webglGetUniformLocation(location), HEAP32, ((value) >> 2), count * 2);
  return;
 }
 if (count <= 144) {
  var view = miniTempWebGLIntBuffers[2 * count];
  for (var i = 0; i < 2 * count; i += 2) {
   view[i] = SAFE_HEAP_LOAD((((value) + (4 * i)) >> 2) * 4, 4, 0);
   view[i + 1] = SAFE_HEAP_LOAD((((value) + (4 * i + 4)) >> 2) * 4, 4, 0);
  }
 } else {
  var view = HEAP32.subarray((((value) >> 2)), ((value + count * 8) >> 2));
 }
 GLctx.uniform2iv(webglGetUniformLocation(location), view);
};

var _glUniform3fv = (location, count, value) => {
 if (GL.currentContext.version >= 2) {
  count && GLctx.uniform3fv(webglGetUniformLocation(location), HEAPF32, ((value) >> 2), count * 3);
  return;
 }
 if (count <= 96) {
  var view = miniTempWebGLFloatBuffers[3 * count];
  for (var i = 0; i < 3 * count; i += 3) {
   view[i] = SAFE_HEAP_LOAD_D((((value) + (4 * i)) >> 2) * 4, 4, 0);
   view[i + 1] = SAFE_HEAP_LOAD_D((((value) + (4 * i + 4)) >> 2) * 4, 4, 0);
   view[i + 2] = SAFE_HEAP_LOAD_D((((value) + (4 * i + 8)) >> 2) * 4, 4, 0);
  }
 } else {
  var view = HEAPF32.subarray((((value) >> 2)), ((value + count * 12) >> 2));
 }
 GLctx.uniform3fv(webglGetUniformLocation(location), view);
};

var _glUniform3iv = (location, count, value) => {
 if (GL.currentContext.version >= 2) {
  count && GLctx.uniform3iv(webglGetUniformLocation(location), HEAP32, ((value) >> 2), count * 3);
  return;
 }
 if (count <= 96) {
  var view = miniTempWebGLIntBuffers[3 * count];
  for (var i = 0; i < 3 * count; i += 3) {
   view[i] = SAFE_HEAP_LOAD((((value) + (4 * i)) >> 2) * 4, 4, 0);
   view[i + 1] = SAFE_HEAP_LOAD((((value) + (4 * i + 4)) >> 2) * 4, 4, 0);
   view[i + 2] = SAFE_HEAP_LOAD((((value) + (4 * i + 8)) >> 2) * 4, 4, 0);
  }
 } else {
  var view = HEAP32.subarray((((value) >> 2)), ((value + count * 12) >> 2));
 }
 GLctx.uniform3iv(webglGetUniformLocation(location), view);
};

var _glUniform4fv = (location, count, value) => {
 if (GL.currentContext.version >= 2) {
  count && GLctx.uniform4fv(webglGetUniformLocation(location), HEAPF32, ((value) >> 2), count * 4);
  return;
 }
 if (count <= 72) {
  var view = miniTempWebGLFloatBuffers[4 * count];
  var heap = HEAPF32;
  value = ((value) >> 2);
  for (var i = 0; i < 4 * count; i += 4) {
   var dst = value + i;
   view[i] = heap[dst];
   view[i + 1] = heap[dst + 1];
   view[i + 2] = heap[dst + 2];
   view[i + 3] = heap[dst + 3];
  }
 } else {
  var view = HEAPF32.subarray((((value) >> 2)), ((value + count * 16) >> 2));
 }
 GLctx.uniform4fv(webglGetUniformLocation(location), view);
};

var _glUniform4iv = (location, count, value) => {
 if (GL.currentContext.version >= 2) {
  count && GLctx.uniform4iv(webglGetUniformLocation(location), HEAP32, ((value) >> 2), count * 4);
  return;
 }
 if (count <= 72) {
  var view = miniTempWebGLIntBuffers[4 * count];
  for (var i = 0; i < 4 * count; i += 4) {
   view[i] = SAFE_HEAP_LOAD((((value) + (4 * i)) >> 2) * 4, 4, 0);
   view[i + 1] = SAFE_HEAP_LOAD((((value) + (4 * i + 4)) >> 2) * 4, 4, 0);
   view[i + 2] = SAFE_HEAP_LOAD((((value) + (4 * i + 8)) >> 2) * 4, 4, 0);
   view[i + 3] = SAFE_HEAP_LOAD((((value) + (4 * i + 12)) >> 2) * 4, 4, 0);
  }
 } else {
  var view = HEAP32.subarray((((value) >> 2)), ((value + count * 16) >> 2));
 }
 GLctx.uniform4iv(webglGetUniformLocation(location), view);
};

var _glUniformMatrix4fv = (location, count, transpose, value) => {
 if (GL.currentContext.version >= 2) {
  count && GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value) >> 2), count * 16);
  return;
 }
 if (count <= 18) {
  var view = miniTempWebGLFloatBuffers[16 * count];
  var heap = HEAPF32;
  value = ((value) >> 2);
  for (var i = 0; i < 16 * count; i += 16) {
   var dst = value + i;
   view[i] = heap[dst];
   view[i + 1] = heap[dst + 1];
   view[i + 2] = heap[dst + 2];
   view[i + 3] = heap[dst + 3];
   view[i + 4] = heap[dst + 4];
   view[i + 5] = heap[dst + 5];
   view[i + 6] = heap[dst + 6];
   view[i + 7] = heap[dst + 7];
   view[i + 8] = heap[dst + 8];
   view[i + 9] = heap[dst + 9];
   view[i + 10] = heap[dst + 10];
   view[i + 11] = heap[dst + 11];
   view[i + 12] = heap[dst + 12];
   view[i + 13] = heap[dst + 13];
   view[i + 14] = heap[dst + 14];
   view[i + 15] = heap[dst + 15];
  }
 } else {
  var view = HEAPF32.subarray((((value) >> 2)), ((value + count * 64) >> 2));
 }
 GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, view);
};

var _glUseProgram = program => {
 program = GL.programs[program];
 GLctx.useProgram(program);
 GLctx.currentProgram = program;
};

var _glVertexAttribDivisor = (index, divisor) => {
 GLctx.vertexAttribDivisor(index, divisor);
};

var _glVertexAttribPointer = (index, size, type, normalized, stride, ptr) => {
 GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
};

var _glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);

var stackAlloc = sz => __emscripten_stack_alloc(sz);

var stringToUTF8OnStack = str => {
 var size = lengthBytesUTF8(str) + 1;
 var ret = stackAlloc(size);
 stringToUTF8(str, ret, size);
 return ret;
};

var FS_unlink = path => FS.unlink(path);

Module["requestFullscreen"] = Browser.requestFullscreen;

Module["requestAnimationFrame"] = Browser.requestAnimationFrame;

Module["setCanvasSize"] = Browser.setCanvasSize;

Module["pauseMainLoop"] = Browser.mainLoop.pause;

Module["resumeMainLoop"] = Browser.mainLoop.resume;

Module["getUserMedia"] = Browser.getUserMedia;

Module["createContext"] = Browser.createContext;

var preloadedImages = {};

var preloadedAudios = {};

var GLctx;

FS.createPreloadedFile = FS_createPreloadedFile;

FS.staticInit();

Module["FS_createPath"] = FS.createPath;

Module["FS_createDataFile"] = FS.createDataFile;

Module["FS_createPreloadedFile"] = FS.createPreloadedFile;

Module["FS_unlink"] = FS.unlink;

Module["FS_createLazyFile"] = FS.createLazyFile;

Module["FS_createDevice"] = FS.createDevice;

for (var i = 0; i < 32; ++i) tempFixedLengthArray.push(new Array(i));

var miniTempWebGLFloatBuffersStorage = new Float32Array(288);

for (/**@suppress{duplicate}*/ var i = 0; i < 288; ++i) {
 miniTempWebGLFloatBuffers[i] = miniTempWebGLFloatBuffersStorage.subarray(0, i);
}

var miniTempWebGLIntBuffersStorage = new Int32Array(288);

for (/**@suppress{duplicate}*/ var i = 0; i < 288; ++i) {
 miniTempWebGLIntBuffers[i] = miniTempWebGLIntBuffersStorage.subarray(0, i);
}

var wasmImports = {
 /** @export */ __assert_fail: ___assert_fail,
 /** @export */ _emscripten_get_now_is_monotonic: __emscripten_get_now_is_monotonic,
 /** @export */ _emscripten_memcpy_js: __emscripten_memcpy_js,
 /** @export */ abort: _abort,
 /** @export */ alignfault: alignfault,
 /** @export */ emscripten_cancel_main_loop: _emscripten_cancel_main_loop,
 /** @export */ emscripten_date_now: _emscripten_date_now,
 /** @export */ emscripten_force_exit: _emscripten_force_exit,
 /** @export */ emscripten_get_device_pixel_ratio: _emscripten_get_device_pixel_ratio,
 /** @export */ emscripten_get_element_css_size: _emscripten_get_element_css_size,
 /** @export */ emscripten_get_now: _emscripten_get_now,
 /** @export */ emscripten_performance_now: _emscripten_performance_now,
 /** @export */ emscripten_request_animation_frame_loop: _emscripten_request_animation_frame_loop,
 /** @export */ emscripten_resize_heap: _emscripten_resize_heap,
 /** @export */ emscripten_return_address: _emscripten_return_address,
 /** @export */ emscripten_set_blur_callback_on_thread: _emscripten_set_blur_callback_on_thread,
 /** @export */ emscripten_set_canvas_element_size: _emscripten_set_canvas_element_size,
 /** @export */ emscripten_set_focus_callback_on_thread: _emscripten_set_focus_callback_on_thread,
 /** @export */ emscripten_set_keydown_callback_on_thread: _emscripten_set_keydown_callback_on_thread,
 /** @export */ emscripten_set_keypress_callback_on_thread: _emscripten_set_keypress_callback_on_thread,
 /** @export */ emscripten_set_keyup_callback_on_thread: _emscripten_set_keyup_callback_on_thread,
 /** @export */ emscripten_set_main_loop: _emscripten_set_main_loop,
 /** @export */ emscripten_set_mousedown_callback_on_thread: _emscripten_set_mousedown_callback_on_thread,
 /** @export */ emscripten_set_mouseenter_callback_on_thread: _emscripten_set_mouseenter_callback_on_thread,
 /** @export */ emscripten_set_mouseleave_callback_on_thread: _emscripten_set_mouseleave_callback_on_thread,
 /** @export */ emscripten_set_mousemove_callback_on_thread: _emscripten_set_mousemove_callback_on_thread,
 /** @export */ emscripten_set_mouseup_callback_on_thread: _emscripten_set_mouseup_callback_on_thread,
 /** @export */ emscripten_set_pointerlockchange_callback_on_thread: _emscripten_set_pointerlockchange_callback_on_thread,
 /** @export */ emscripten_set_pointerlockerror_callback_on_thread: _emscripten_set_pointerlockerror_callback_on_thread,
 /** @export */ emscripten_set_resize_callback_on_thread: _emscripten_set_resize_callback_on_thread,
 /** @export */ emscripten_set_touchcancel_callback_on_thread: _emscripten_set_touchcancel_callback_on_thread,
 /** @export */ emscripten_set_touchend_callback_on_thread: _emscripten_set_touchend_callback_on_thread,
 /** @export */ emscripten_set_touchmove_callback_on_thread: _emscripten_set_touchmove_callback_on_thread,
 /** @export */ emscripten_set_touchstart_callback_on_thread: _emscripten_set_touchstart_callback_on_thread,
 /** @export */ emscripten_set_webglcontextlost_callback_on_thread: _emscripten_set_webglcontextlost_callback_on_thread,
 /** @export */ emscripten_set_webglcontextrestored_callback_on_thread: _emscripten_set_webglcontextrestored_callback_on_thread,
 /** @export */ emscripten_set_wheel_callback_on_thread: _emscripten_set_wheel_callback_on_thread,
 /** @export */ emscripten_webgl_create_context: _emscripten_webgl_create_context,
 /** @export */ emscripten_webgl_enable_extension: _emscripten_webgl_enable_extension,
 /** @export */ emscripten_webgl_make_context_current: _emscripten_webgl_make_context_current,
 /** @export */ exit: _exit,
 /** @export */ fd_write: _fd_write,
 /** @export */ glActiveTexture: _glActiveTexture,
 /** @export */ glAttachShader: _glAttachShader,
 /** @export */ glBindBuffer: _glBindBuffer,
 /** @export */ glBindFramebuffer: _glBindFramebuffer,
 /** @export */ glBindRenderbuffer: _glBindRenderbuffer,
 /** @export */ glBindSampler: _glBindSampler,
 /** @export */ glBindTexture: _glBindTexture,
 /** @export */ glBindVertexArray: _glBindVertexArray,
 /** @export */ glBlendColor: _glBlendColor,
 /** @export */ glBlendEquationSeparate: _glBlendEquationSeparate,
 /** @export */ glBlendFuncSeparate: _glBlendFuncSeparate,
 /** @export */ glBlitFramebuffer: _glBlitFramebuffer,
 /** @export */ glBufferData: _glBufferData,
 /** @export */ glBufferSubData: _glBufferSubData,
 /** @export */ glClearBufferfi: _glClearBufferfi,
 /** @export */ glClearBufferfv: _glClearBufferfv,
 /** @export */ glClearBufferiv: _glClearBufferiv,
 /** @export */ glColorMask: _glColorMask,
 /** @export */ glCompileShader: _glCompileShader,
 /** @export */ glCompressedTexImage2D: _glCompressedTexImage2D,
 /** @export */ glCompressedTexImage3D: _glCompressedTexImage3D,
 /** @export */ glCreateProgram: _glCreateProgram,
 /** @export */ glCreateShader: _glCreateShader,
 /** @export */ glCullFace: _glCullFace,
 /** @export */ glDeleteBuffers: _glDeleteBuffers,
 /** @export */ glDeleteFramebuffers: _glDeleteFramebuffers,
 /** @export */ glDeleteProgram: _glDeleteProgram,
 /** @export */ glDeleteRenderbuffers: _glDeleteRenderbuffers,
 /** @export */ glDeleteSamplers: _glDeleteSamplers,
 /** @export */ glDeleteShader: _glDeleteShader,
 /** @export */ glDeleteTextures: _glDeleteTextures,
 /** @export */ glDeleteVertexArrays: _glDeleteVertexArrays,
 /** @export */ glDepthFunc: _glDepthFunc,
 /** @export */ glDepthMask: _glDepthMask,
 /** @export */ glDisable: _glDisable,
 /** @export */ glDisableVertexAttribArray: _glDisableVertexAttribArray,
 /** @export */ glDrawArrays: _glDrawArrays,
 /** @export */ glDrawArraysInstanced: _glDrawArraysInstanced,
 /** @export */ glDrawElements: _glDrawElements,
 /** @export */ glDrawElementsInstanced: _glDrawElementsInstanced,
 /** @export */ glEnable: _glEnable,
 /** @export */ glEnableVertexAttribArray: _glEnableVertexAttribArray,
 /** @export */ glFrontFace: _glFrontFace,
 /** @export */ glGenBuffers: _glGenBuffers,
 /** @export */ glGenRenderbuffers: _glGenRenderbuffers,
 /** @export */ glGenSamplers: _glGenSamplers,
 /** @export */ glGenTextures: _glGenTextures,
 /** @export */ glGenVertexArrays: _glGenVertexArrays,
 /** @export */ glGetAttribLocation: _glGetAttribLocation,
 /** @export */ glGetError: _glGetError,
 /** @export */ glGetIntegerv: _glGetIntegerv,
 /** @export */ glGetProgramInfoLog: _glGetProgramInfoLog,
 /** @export */ glGetProgramiv: _glGetProgramiv,
 /** @export */ glGetShaderInfoLog: _glGetShaderInfoLog,
 /** @export */ glGetShaderiv: _glGetShaderiv,
 /** @export */ glGetStringi: _glGetStringi,
 /** @export */ glGetUniformLocation: _glGetUniformLocation,
 /** @export */ glInvalidateFramebuffer: _glInvalidateFramebuffer,
 /** @export */ glLinkProgram: _glLinkProgram,
 /** @export */ glPixelStorei: _glPixelStorei,
 /** @export */ glPolygonOffset: _glPolygonOffset,
 /** @export */ glReadBuffer: _glReadBuffer,
 /** @export */ glRenderbufferStorageMultisample: _glRenderbufferStorageMultisample,
 /** @export */ glSamplerParameterf: _glSamplerParameterf,
 /** @export */ glSamplerParameteri: _glSamplerParameteri,
 /** @export */ glScissor: _glScissor,
 /** @export */ glShaderSource: _glShaderSource,
 /** @export */ glStencilFunc: _glStencilFunc,
 /** @export */ glStencilFuncSeparate: _glStencilFuncSeparate,
 /** @export */ glStencilMask: _glStencilMask,
 /** @export */ glStencilOp: _glStencilOp,
 /** @export */ glStencilOpSeparate: _glStencilOpSeparate,
 /** @export */ glTexImage2D: _glTexImage2D,
 /** @export */ glTexImage3D: _glTexImage3D,
 /** @export */ glTexParameteri: _glTexParameteri,
 /** @export */ glUniform1fv: _glUniform1fv,
 /** @export */ glUniform1i: _glUniform1i,
 /** @export */ glUniform1iv: _glUniform1iv,
 /** @export */ glUniform2fv: _glUniform2fv,
 /** @export */ glUniform2iv: _glUniform2iv,
 /** @export */ glUniform3fv: _glUniform3fv,
 /** @export */ glUniform3iv: _glUniform3iv,
 /** @export */ glUniform4fv: _glUniform4fv,
 /** @export */ glUniform4iv: _glUniform4iv,
 /** @export */ glUniformMatrix4fv: _glUniformMatrix4fv,
 /** @export */ glUseProgram: _glUseProgram,
 /** @export */ glVertexAttribDivisor: _glVertexAttribDivisor,
 /** @export */ glVertexAttribPointer: _glVertexAttribPointer,
 /** @export */ glViewport: _glViewport,
 /** @export */ sapp_js_add_beforeunload_listener: sapp_js_add_beforeunload_listener,
 /** @export */ sapp_js_add_clipboard_listener: sapp_js_add_clipboard_listener,
 /** @export */ sapp_js_add_dragndrop_listeners: sapp_js_add_dragndrop_listeners,
 /** @export */ sapp_js_clear_favicon: sapp_js_clear_favicon,
 /** @export */ sapp_js_exit_pointerlock: sapp_js_exit_pointerlock,
 /** @export */ sapp_js_init: sapp_js_init,
 /** @export */ sapp_js_remove_beforeunload_listener: sapp_js_remove_beforeunload_listener,
 /** @export */ sapp_js_remove_clipboard_listener: sapp_js_remove_clipboard_listener,
 /** @export */ sapp_js_remove_dragndrop_listeners: sapp_js_remove_dragndrop_listeners,
 /** @export */ sapp_js_request_pointerlock: sapp_js_request_pointerlock,
 /** @export */ sapp_js_set_favicon: sapp_js_set_favicon,
 /** @export */ segfault: segfault,
 /** @export */ slog_js_log: slog_js_log
};

var wasmExports = createWasm();

var ___wasm_call_ctors = () => (___wasm_call_ctors = wasmExports["__wasm_call_ctors"])();

var _main = Module["_main"] = (a0, a1) => (_main = Module["_main"] = wasmExports["main"])(a0, a1);

var __sapp_emsc_onpaste = Module["__sapp_emsc_onpaste"] = a0 => (__sapp_emsc_onpaste = Module["__sapp_emsc_onpaste"] = wasmExports["_sapp_emsc_onpaste"])(a0);

var __sapp_html5_get_ask_leave_site = Module["__sapp_html5_get_ask_leave_site"] = () => (__sapp_html5_get_ask_leave_site = Module["__sapp_html5_get_ask_leave_site"] = wasmExports["_sapp_html5_get_ask_leave_site"])();

var __sapp_emsc_begin_drop = Module["__sapp_emsc_begin_drop"] = a0 => (__sapp_emsc_begin_drop = Module["__sapp_emsc_begin_drop"] = wasmExports["_sapp_emsc_begin_drop"])(a0);

var __sapp_emsc_drop = Module["__sapp_emsc_drop"] = (a0, a1) => (__sapp_emsc_drop = Module["__sapp_emsc_drop"] = wasmExports["_sapp_emsc_drop"])(a0, a1);

var __sapp_emsc_end_drop = Module["__sapp_emsc_end_drop"] = (a0, a1, a2) => (__sapp_emsc_end_drop = Module["__sapp_emsc_end_drop"] = wasmExports["_sapp_emsc_end_drop"])(a0, a1, a2);

var __sapp_emsc_invoke_fetch_cb = Module["__sapp_emsc_invoke_fetch_cb"] = (a0, a1, a2, a3, a4, a5, a6, a7) => (__sapp_emsc_invoke_fetch_cb = Module["__sapp_emsc_invoke_fetch_cb"] = wasmExports["_sapp_emsc_invoke_fetch_cb"])(a0, a1, a2, a3, a4, a5, a6, a7);

var _emscripten_get_sbrk_ptr = () => (_emscripten_get_sbrk_ptr = wasmExports["emscripten_get_sbrk_ptr"])();

var _sbrk = a0 => (_sbrk = wasmExports["sbrk"])(a0);

var _malloc = a0 => (_malloc = wasmExports["malloc"])(a0);

var _emscripten_stack_init = () => (_emscripten_stack_init = wasmExports["emscripten_stack_init"])();

var _emscripten_stack_get_free = () => (_emscripten_stack_get_free = wasmExports["emscripten_stack_get_free"])();

var _emscripten_stack_get_base = () => (_emscripten_stack_get_base = wasmExports["emscripten_stack_get_base"])();

var _emscripten_stack_get_end = () => (_emscripten_stack_get_end = wasmExports["emscripten_stack_get_end"])();

var __emscripten_stack_restore = a0 => (__emscripten_stack_restore = wasmExports["_emscripten_stack_restore"])(a0);

var __emscripten_stack_alloc = a0 => (__emscripten_stack_alloc = wasmExports["_emscripten_stack_alloc"])(a0);

var _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports["emscripten_stack_get_current"])();

var ___start_em_js = Module["___start_em_js"] = 92991;

var ___stop_em_js = Module["___stop_em_js"] = 98761;

Module["addRunDependency"] = addRunDependency;

Module["removeRunDependency"] = removeRunDependency;

Module["FS_createPath"] = FS.createPath;

Module["FS_createLazyFile"] = FS.createLazyFile;

Module["FS_createDevice"] = FS.createDevice;

Module["FS_createPreloadedFile"] = FS.createPreloadedFile;

Module["FS_createDataFile"] = FS.createDataFile;

Module["FS_unlink"] = FS.unlink;

var calledRun;

dependenciesFulfilled = function runCaller() {
 if (!calledRun) run();
 if (!calledRun) dependenciesFulfilled = runCaller;
};

function callMain(args = []) {
 var entryFunction = _main;
 args.unshift(thisProgram);
 var argc = args.length;
 var argv = stackAlloc((argc + 1) * 4);
 var argv_ptr = argv;
 args.forEach(arg => {
  SAFE_HEAP_STORE(((argv_ptr) >> 2) * 4, stringToUTF8OnStack(arg), 4);
  argv_ptr += 4;
 });
 SAFE_HEAP_STORE(((argv_ptr) >> 2) * 4, 0, 4);
 try {
  var ret = entryFunction(argc, argv);
  exitJS(ret, /* implicit = */ true);
  return ret;
 } catch (e) {
  return handleException(e);
 }
}

function stackCheckInit() {
 _emscripten_stack_init();
 writeStackCookie();
}

function run(args = arguments_) {
 if (runDependencies > 0) {
  return;
 }
 stackCheckInit();
 preRun();
 if (runDependencies > 0) {
  return;
 }
 function doRun() {
  if (calledRun) return;
  calledRun = true;
  Module["calledRun"] = true;
  if (ABORT) return;
  initRuntime();
  preMain();
  if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
  if (shouldRunNow) callMain(args);
  postRun();
 }
 if (Module["setStatus"]) {
  Module["setStatus"]("Running...");
  setTimeout(function() {
   setTimeout(function() {
    Module["setStatus"]("");
   }, 1);
   doRun();
  }, 1);
 } else {
  doRun();
 }
 checkStackCookie();
}

if (Module["preInit"]) {
 if (typeof Module["preInit"] == "function") Module["preInit"] = [ Module["preInit"] ];
 while (Module["preInit"].length > 0) {
  Module["preInit"].pop()();
 }
}

var shouldRunNow = true;

if (Module["noInitialRun"]) shouldRunNow = false;

run();
