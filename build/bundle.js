/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "57db5973088df7a7bb40"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var App_1 = __webpack_require__(1);
	var core_1 = __webpack_require__(3);
	var input_1 = __webpack_require__(6);
	var postProcess_1 = __webpack_require__(14);
	var texture2d_1 = __webpack_require__(20);
	var program_1 = __webpack_require__(22);
	var programManager_1 = __webpack_require__(24);
	var resourceMap_1 = __webpack_require__(12);
	var loaders_1 = __webpack_require__(25);
	var timer_1 = __webpack_require__(13);
	var pointLight_1 = __webpack_require__(26);
	var vector3_1 = __webpack_require__(29);
	var _demoCamera_1 = __webpack_require__(30);
	var sampler_1 = __webpack_require__(31);
	var ProgramCte_1 = __webpack_require__(23);
	var TextureType_1 = __webpack_require__(32);
	"use strict";
	var camera = new _demoCamera_1.default(new Float32Array([-2.7, -1.4, 11.8]));
	var SimpleConfig = function SimpleConfig() {
	    return {
	        max: 10,
	        resume: true,
	        render: "0"
	    };
	};
	var view = void 0;
	var projection = void 0;
	var tex2d = void 0;
	var _light = new pointLight_1.default(new vector3_1.default(-5.0, 0.0, 0.0));
	var identityMatrix = mat4.create();
	mat4.identity(identityMatrix);
	var angle = 0;
	var text = SimpleConfig();
	function loadAssets() {
	    loaders_1.default.loadImage("descarga (4).png", "exampleImg");
	    loaders_1.default.loadImage("assets/images/canyon/back.jpg");
	    loaders_1.default.loadImage("assets/images/canyon/bottom.jpg");
	    loaders_1.default.loadImage("assets/images/canyon/front.jpg");
	    loaders_1.default.loadImage("assets/images/canyon/left.jpg");
	    loaders_1.default.loadImage("assets/images/canyon/right.jpg");
	    loaders_1.default.loadImage("assets/images/canyon/top.jpg");
	}
	var mainShader = "pp";
	function initialize(app) {
	    programManager_1.default.addWithFun("pp", function () {
	        var prog2 = new program_1.default();
	        prog2.addShader("#version 300 es\n            precision highp float;\n            layout(location = 0) in vec3 vertPosition;\n            uniform float tcdiv;\n            out vec2 texCoord;\n            void main(void) {\n                texCoord = vec2(vertPosition.xy * 0.5) + vec2(0.5);\n                //texCoord.x *= tcdiv / 5.0;\n                //texCoord.y *= tcdiv / 5.0;\n                gl_Position = vec4(vertPosition, 1.0);\n            }", ProgramCte_1.default.shader_type.vertex, ProgramCte_1.default.mode.read_text);
	        prog2.addShader("#version 300 es\n            precision highp float;\n            uniform sampler2D dataTexture;\n\n            out vec4 fragColor;\n            in vec2 texCoord;\n\n            uniform float tcdiv;\n\n            void main() {\n\n                if(length(texCoord - 0.5) > 0.5){\n                    discard;\n                }\n                vec2 tc = texCoord * vec2(tcdiv / 5.0);\n                //fragColor = vec4(texCoord, 0.0, 1.0);\n                fragColor = vec4(texture(dataTexture, tc).rgb, 1.0);\n            }", ProgramCte_1.default.shader_type.fragment, ProgramCte_1.default.mode.read_text);
	        prog2.compile();
	        prog2.addUniforms(["tcdiv"]);
	        console.log(prog2);
	        return prog2;
	    });
	    var cubeImage = resourceMap_1.default.retrieveAsset("exampleImg");
	    tex2d = new texture2d_1.default(cubeImage, {
	        flipY: true,
	        minFilter: TextureType_1.default.Linear,
	        magFilter: TextureType_1.default.Linear,
	        wrapS: TextureType_1.default.Clamp2Edge,
	        wrapT: TextureType_1.default.Clamp2Edge
	    });
	    var gl = core_1.default.getInstance().getGL();
	    samplerA = new sampler_1.Sampler();
	    samplerA.setParams({
	        minFilter: gl.NEAREST,
	        magFilter: gl.NEAREST,
	        wrapS: gl.CLAMP_TO_EDGE,
	        wrapT: gl.CLAMP_TO_EDGE
	    });
	    samplerB = new sampler_1.Sampler();
	    samplerB.setParams({
	        minFilter: gl.LINEAR,
	        magFilter: gl.LINEAR,
	        wrapS: gl.REPEAT,
	        wrapT: gl.REPEAT
	    });
	    samplerC = new sampler_1.Sampler();
	    samplerC.setParams({
	        minFilter: gl.NEAREST,
	        magFilter: gl.LINEAR,
	        wrapS: gl.MIRRORED_REPEAT,
	        wrapT: gl.MIRRORED_REPEAT
	    });
	    cameraUpdateCb();
	}
	;
	var samplerA = void 0;
	var samplerB = void 0;
	var samplerC = void 0;
	function drawScene(app) {
	    core_1.default.getInstance().clearColorAndDepth();
	    var prog = programManager_1.default.get(mainShader);
	    prog.use();
	    tex2d.bind(0);
	    var renderMode = text.render;
	    var mode = void 0;
	    switch (renderMode) {
	        case "0":
	            mode = samplerA;
	            break;
	        case "1":
	            mode = samplerB;
	            break;
	        case "2":
	            mode = samplerC;
	            break;
	    }
	    mode.bind(0);
	    prog.sendUniform1i("texSampler", 0);
	    prog.sendUniform1f("tcdiv", text.max);
	    postProcess_1.default.bind();
	    postProcess_1.default.render();
	}
	function cameraUpdateCb() {
	    var canvas = core_1.default.getInstance().canvas();
	    view = camera.GetViewMatrix();
	    projection = camera.GetProjectionMatrix(canvas.width, canvas.height);
	    var prog = programManager_1.default.get(mainShader);
	    prog.use();
	    prog.sendUniformMat4("view", view);
	    prog.sendUniformMat4("projection", projection);
	    prog.sendUniformVec3("viewPos", camera.position);
	}
	function updateScene(app, dt) {
	    if (input_1.default.getInstance().isButtonClicked(input_1.default.mouseButton.Left)) {
	        console.log("Mouse left clicked");
	    }
	    camera.timeElapsed = timer_1.default.deltaTime() / 10.0;
	    camera.update(cameraUpdateCb);
	    angle += timer_1.default.deltaTime() * 0.001;
	}
	;
	window.onload = function () {
	    new App_1.default({
	        webglVersion: 2,
	        loadAssets: loadAssets,
	        initialize: initialize,
	        update: updateScene,
	        draw: drawScene,
	        cameraUpdate: cameraUpdateCb,
	        textCB: function textCB(gui) {
	            gui.add(text, "max", 5, 100);
	            gui.add(text, "render", {
	                simple: 0,
	                lines: 1,
	                points: 2
	            });
	        }
	    }, text).start();
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var _decorators_1 = __webpack_require__(2);
	var core_1 = __webpack_require__(3);
	var input_1 = __webpack_require__(6);
	var resourceMap_1 = __webpack_require__(12);
	var timer_1 = __webpack_require__(13);
	"use strict";
	var App = function () {
	    function App(init, text) {
	        _classCallCheck(this, App);
	
	        this._resume = true;
	        if (!init.webglVersion) {
	            init.webglVersion = 2;
	        }
	        this._appFunctions = init;
	        console.log(this._appFunctions);
	        document.title = init.title || "WebGL" + init.webglVersion + " app";
	        this.__init__(text);
	    }
	
	    _createClass(App, [{
	        key: "webglVersion",
	        value: function webglVersion() {
	            return this._appFunctions.webglVersion;
	        }
	    }, {
	        key: "__init__",
	        value: function __init__(text) {
	            core_1.default.getInstance().initialize([1.0, 0.0, 1.0, 1.0]);
	            this.gui = new dat.GUI();
	            this._appFunctions.textCB(this.gui);
	            var self = this;
	            this.gui.add(text, "resume", true).onChange(function (v) {
	                if (v === true) {
	                    self.resume();
	                } else {
	                    self.pause();
	                }
	            });
	            this.stats = new Stats();
	            this.stats.setMode(0);
	            document.body.appendChild(this.stats.domElement);
	            this._appFunctions.loadAssets();
	        }
	    }, {
	        key: "start",
	        value: function start() {
	            var self = this;
	            resourceMap_1.default.setLoadCompleteCallback(function () {
	                console.log("ALL RESOURCES LOADED!!!!");
	                self._appFunctions.initialize(self);
	                document.getElementById("spinner").remove();
	                try {
	                    (function __render__(dt) {
	                        requestAnimationFrame(__render__);
	                        input_1.default.getInstance().update();
	                        self.stats.begin();
	                        dt *= 0.001;
	                        timer_1.default.update();
	                        if (self._resume) {
	                            self._appFunctions.update(self, dt);
	                            self._appFunctions.draw(self, dt);
	                        }
	                        self.stats.end();
	                    })(0.0);
	                } catch (e) {
	                    VanillaToasts.create({
	                        title: "Error:",
	                        text: "" + e,
	                        type: "error"
	                    });
	                    throw e;
	                }
	            });
	            return this;
	        }
	    }, {
	        key: "pause",
	        value: function pause() {
	            console.log("PAUSE");
	            this._resume = false;
	        }
	    }, {
	        key: "resume",
	        value: function resume() {
	            console.log("RESUME");
	            this._resume = true;
	        }
	    }, {
	        key: "__resize__",
	        value: function __resize__() {
	            var canvas = core_1.default.getInstance().canvas();
	            var realToCSSPixels = window.devicePixelRatio || 1;
	            var displayWidth = Math.floor(canvas.clientWidth * realToCSSPixels);
	            var displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);
	            if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
	                canvas.width = displayWidth;
	                canvas.height = displayHeight;
	                core_1.default.getInstance().changeViewport(0, 0, canvas.width, canvas.height);
	                this.cameraUpdateCb();
	            }
	        }
	    }]);
	
	    return App;
	}();
	App = __decorate([_decorators_1.default.sealed], App);
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = App;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    sealed: function sealed(constructor) {
	        Object.seal(constructor);
	        Object.seal(constructor.prototype);
	    }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var context_1 = __webpack_require__(4);
	var input_1 = __webpack_require__(6);
	"use strict";
	
	var Core = function () {
	    function Core() {
	        _classCallCheck(this, Core);
	
	        if (Core._instance) {
	            throw new Error("Error: Instantiation failed: Use Core.getInstance() instead of new.");
	        }
	        this._gl = context_1.default.getContext();
	        input_1.default.getInstance();
	        Core._instance = this;
	    }
	
	    _createClass(Core, [{
	        key: "initialize",
	        value: function initialize(color) {
	            var gl = this._gl;
	            this.init();
	            gl.clearColor(color[0], color[1], color[2], color[3]);
	        }
	    }, {
	        key: "clearColorAndDepth",
	        value: function clearColorAndDepth() {
	            this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
	        }
	    }, {
	        key: "changeViewport",
	        value: function changeViewport(x, y, w, h) {
	            this._gl.viewport(x, y, w, h);
	        }
	    }, {
	        key: "canvas",
	        value: function canvas() {
	            return this._gl.canvas;
	        }
	    }, {
	        key: "init",
	        value: function init() {
	            depth_1.default.enable();
	            depth_1.default.comparison(ComparisonFunc_1.default.Less);
	            cull_1.default.enable();
	            blend_1.default.disable();
	        }
	    }, {
	        key: "getGL",
	        value: function getGL() {
	            return this._gl;
	        }
	    }], [{
	        key: "getInstance",
	        value: function getInstance() {
	            if (!Core._instance) {
	                console.log("Creando core");
	                Core._instance = new Core();
	            }
	            return Core._instance;
	        }
	    }]);
	
	    return Core;
	}();
	
	Core._instance = new Core();
	;
	context_1.default.getContext();
	Core.getInstance();
	var depth_1 = __webpack_require__(7);
	var cull_1 = __webpack_require__(8);
	var blend_1 = __webpack_require__(9);
	var ComparisonFunc_1 = __webpack_require__(11);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Core;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var log_1 = __webpack_require__(5);
	
	var Context = function () {
	    function Context() {
	        _classCallCheck(this, Context);
	    }
	
	    _createClass(Context, null, [{
	        key: "getContext",
	        value: function getContext(canvasName) {
	            if (!Context._gl) {
	                if (!canvasName) {
	                    log_1.default.info("Not canvas. Create one ...");
	                    this._canvas = document.createElement("canvas");
	                    this._canvas.width = 800;
	                    this._canvas.height = 800;
	                    document.body.appendChild(this._canvas);
	                } else {
	                    this._canvas = document.getElementById(canvasName);
	                }
	                log_1.default.info("Get context");
	                Context._gl = Context._getContext(this._canvas);
	                if (!Context._gl) {
	                    document.write("<br><b>WebGL is not supported!</b>");
	                    throw new Error("WebGL is not supported!");
	                }
	                log_1.default.info("WebGL2RenderingContext OK :)");
	                Context._getVendors();
	            }
	            return Context._gl;
	        }
	    }, {
	        key: "_getContext",
	        value: function _getContext(canvas) {
	            var contexts = "webgl2,webgl,experimental-webgl2".split(",");
	            var gl = void 0;
	            var ctx = void 0;
	            for (var i = 0; i < contexts.length; ++i) {
	                ctx = contexts[i];
	                gl = canvas.getContext(contexts[i]);
	                if (gl) {
	                    return gl;
	                }
	            }
	            return null;
	        }
	    }, {
	        key: "_getVendors",
	        value: function _getVendors() {
	            var vendors = "ms,moz,webkit,o".split(",");
	            if (!window.requestAnimationFrame) {
	                var vendor = void 0;
	                for (var i = 0; i < vendors.length; ++i) {
	                    vendor = vendors[i];
	                    window.requestAnimationFrame = window[vendor + "RequestAnimationFrame"];
	                    window.cancelAnimationFrame = window[vendor + "CancelAnimationFrame"] || window[vendor + "CancelRequestAnimationFrame"];
	                    if (window.requestAnimationFrame) {
	                        break;
	                    }
	                }
	            }
	            if (!window.requestAnimationFrame) {
	                (function () {
	                    var lastTime = 0;
	                    window.requestAnimationFrame = function (cb) {
	                        var currTime = Date.now();
	                        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	                        var id = window.setTimeout(function () {
	                            cb(currTime + timeToCall);
	                        }, timeToCall);
	                        lastTime = currTime + timeToCall;
	                        return id;
	                    };
	                })();
	            }
	            if (!window.cancelAnimationFrame) {
	                window.cancelAnimationFrame = function (id) {
	                    clearTimeout(id);
	                };
	            }
	            ;
	        }
	    }]);
	
	    return Context;
	}();
	
	Context._gl = null;
	Context._canvas = null;
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Context;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	var consoleAppender = void 0,
	    logger = void 0;
	logger = log4javascript.getLogger("my_logger");
	consoleAppender = new log4javascript.BrowserConsoleAppender();
	logger.addAppender(consoleAppender);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = logger;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var context_1 = __webpack_require__(4);
	"use strict";
	
	var Input = function () {
	    function Input() {
	        _classCallCheck(this, Input);
	
	        this.keys = {
	            Left_Shift: 16,
	            Left: 37,
	            Up: 38,
	            Right: 39,
	            Down: 40,
	            Space: 32,
	            Zero: 48,
	            One: 49,
	            Two: 50,
	            Three: 51,
	            Four: 52,
	            Five: 53,
	            Six: 54,
	            Seven: 55,
	            Eight: 56,
	            Nine: 57,
	            A: 65,
	            D: 68,
	            E: 69,
	            F: 70,
	            G: 71,
	            I: 73,
	            J: 74,
	            K: 75,
	            L: 76,
	            M: 77,
	            N: 78,
	            O: 79,
	            P: 80,
	            Q: 81,
	            R: 82,
	            S: 83,
	            W: 87,
	            LastKeyCode: 222
	        };
	        this._keyPreviusState = [];
	        this._isKeyPressed = [];
	        this._isKeyClicked = [];
	        this._buttonPreviousState = [];
	        this._isButtonPressed = [];
	        this._isButtonClicked = [];
	        this._mousePosX = -1;
	        this._mousePosY = -1;
	        if (Input._instance) {
	            throw new Error("Error: Instantiation failed: Use Input.getInstance() instead of new.");
	        }
	        for (var i = 0; i < this.keys["LastKeyCode"]; ++i) {
	            this._isKeyPressed[i] = false;
	            this._keyPreviusState[i] = false;
	            this._isKeyClicked[i] = false;
	        }
	        for (var _i = 0; _i < 3; ++_i) {
	            this._buttonPreviousState[_i] = false;
	            this._isButtonClicked[_i] = false;
	            this._isButtonPressed[_i] = false;
	        }
	        var self = this;
	        window.addEventListener("keyup", function (ev) {
	            if (ev.keyCode === 40 || ev.keyCode === 38) {
	                ev.preventDefault();
	            }
	            self._onKeyUp(ev);
	        });
	        window.addEventListener("keydown", function (ev) {
	            if (ev.keyCode === 40 || ev.keyCode === 38) {
	                ev.preventDefault();
	            }
	            self._onKeyDown(ev);
	        });
	        window.addEventListener("mousedown", function (ev) {
	            self._onMouseDown(ev);
	        });
	        window.addEventListener("mousemove", function (ev) {
	            self._onMouseMove(ev);
	        });
	        window.addEventListener("mouseup", function (ev) {
	            self._onMouseUp(ev);
	        });
	        Input._instance = this;
	    }
	
	    _createClass(Input, [{
	        key: "update",
	        value: function update() {
	            for (var i = 0; i < this.keys["LastKeyCode"]; ++i) {
	                this._isKeyClicked[i] = !this._keyPreviusState[i] && this._isKeyPressed[i];
	                this._keyPreviusState[i] = this._isKeyPressed[i];
	            }
	            for (var _i2 = 0; _i2 < 3; ++_i2) {
	                this._isButtonClicked[_i2] = !this._buttonPreviousState[_i2] && this._isButtonPressed[_i2];
	                this._buttonPreviousState[_i2] = this._isButtonPressed[_i2];
	            }
	        }
	    }, {
	        key: "isKeyPressed",
	        value: function isKeyPressed(keycode) {
	            return this._isKeyPressed[keycode];
	        }
	    }, {
	        key: "isKeyClicked",
	        value: function isKeyClicked(keycode) {
	            return this._isKeyClicked[keycode];
	        }
	    }, {
	        key: "_onKeyDown",
	        value: function _onKeyDown(ev) {
	            this._isKeyPressed[ev.keyCode] = true;
	        }
	    }, {
	        key: "_onKeyUp",
	        value: function _onKeyUp(ev) {
	            this._isKeyPressed[ev.keyCode] = false;
	        }
	    }, {
	        key: "_onMouseMove",
	        value: function _onMouseMove(ev) {
	            var inside = false;
	            var canvas = context_1.default.getContext().canvas;
	            var bbox = canvas.getBoundingClientRect();
	            var x = (ev.clientX - bbox.left - canvas.height / 2) / (canvas.height / 2);
	            var y = (canvas.width / 2 - (ev.clientY - bbox.top)) / (canvas.width / 2);
	            if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
	                this._mousePosX = x;
	                this._mousePosY = canvas.height - 1 - y;
	                inside = true;
	            }
	            return inside;
	        }
	    }, {
	        key: "_onMouseDown",
	        value: function _onMouseDown(ev) {
	            if (this._onMouseMove(ev)) {
	                this._isButtonPressed[ev.button] = true;
	            }
	        }
	    }, {
	        key: "_onMouseUp",
	        value: function _onMouseUp(ev) {
	            this._onMouseMove(ev);
	            this._isButtonPressed[ev.button] = false;
	        }
	    }, {
	        key: "isButtonPressed",
	        value: function isButtonPressed(button) {
	            return this._isButtonPressed[button];
	        }
	    }, {
	        key: "isButtonClicked",
	        value: function isButtonClicked(button) {
	            return this._isButtonClicked[button];
	        }
	    }, {
	        key: "getMousePosX",
	        value: function getMousePosX() {
	            return this._mousePosX;
	        }
	    }, {
	        key: "getMousePosY",
	        value: function getMousePosY() {
	            return this._mousePosY;
	        }
	    }], [{
	        key: "getInstance",
	        value: function getInstance() {
	            return Input._instance;
	        }
	    }]);
	
	    return Input;
	}();
	
	Input._instance = new Input();
	Input.mouseButton = {
	    Left: 0,
	    Middle: 1,
	    Right: 2
	};
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Input;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var context_1 = __webpack_require__(4);
	"use strict";
	
	var Depth = function () {
	    function Depth() {
	        _classCallCheck(this, Depth);
	    }
	
	    _createClass(Depth, null, [{
	        key: "enable",
	        value: function enable() {
	            var gl = context_1.default.getContext();
	            gl.enable(gl.DEPTH_TEST);
	        }
	    }, {
	        key: "use",
	        value: function use() {
	            var gl = context_1.default.getContext();
	            gl.depthMask(true);
	        }
	    }, {
	        key: "comparison",
	        value: function comparison(compFunc) {
	            var gl = context_1.default.getContext();
	            gl.depthFunc(compFunc);
	        }
	    }, {
	        key: "currentComparation",
	        value: function currentComparation() {
	            var gl = context_1.default.getContext();
	            return gl.getParameter(gl.DEPTH_FUNC);
	        }
	    }, {
	        key: "depthRange",
	        value: function depthRange() {
	            var znear = arguments.length <= 0 || arguments[0] === undefined ? 0.0 : arguments[0];
	            var zfar = arguments.length <= 1 || arguments[1] === undefined ? 1.0 : arguments[1];
	
	            var gl = context_1.default.getContext();
	            if (znear > zfar || znear < 0.0 || zfar > 1.0) {
	                console.warn("Values out of range [(znear < zfar), (znear > 0), (zfar < 1)]");
	                return;
	            }
	            gl.depthRange(znear, zfar);
	        }
	    }, {
	        key: "clear",
	        value: function clear() {
	            var gl = context_1.default.getContext();
	            gl.clear(gl.DEPTH_BUFFER_BIT);
	        }
	    }, {
	        key: "unuse",
	        value: function unuse() {
	            var gl = context_1.default.getContext();
	            gl.depthMask(false);
	        }
	    }, {
	        key: "disable",
	        value: function disable() {
	            var gl = context_1.default.getContext();
	            gl.disable(gl.DEPTH_TEST);
	        }
	    }, {
	        key: "isEnabled",
	        value: function isEnabled() {
	            var gl = context_1.default.getContext();
	            return gl.isEnabled(gl.DEPTH_TEST);
	        }
	    }]);
	
	    return Depth;
	}();
	
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Depth;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var context_1 = __webpack_require__(4);
	"use strict";
	
	var Cull = function () {
	    function Cull() {
	        _classCallCheck(this, Cull);
	    }
	
	    _createClass(Cull, null, [{
	        key: "enable",
	        value: function enable() {
	            var gl = context_1.default.getContext();
	            gl.enable(gl.CULL_FACE);
	        }
	    }, {
	        key: "getMode",
	        value: function getMode() {
	            var gl = context_1.default.getContext();
	            return gl.getParameter(gl.CULL_FACE_MODE);
	        }
	    }, {
	        key: "setMode",
	        value: function setMode(mode) {
	            var gl = context_1.default.getContext();
	            gl.cullFace(mode);
	        }
	    }, {
	        key: "disable",
	        value: function disable() {
	            var gl = context_1.default.getContext();
	            gl.disable(gl.CULL_FACE);
	        }
	    }, {
	        key: "isEnabled",
	        value: function isEnabled() {
	            var gl = context_1.default.getContext();
	            return gl.isEnabled(gl.CULL_FACE);
	        }
	    }]);
	
	    return Cull;
	}();
	
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Cull;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var context_1 = __webpack_require__(4);
	var BlendingType_1 = __webpack_require__(10);
	"use strict";
	
	var Blend = function () {
	    function Blend() {
	        _classCallCheck(this, Blend);
	    }
	
	    _createClass(Blend, [{
	        key: "getBlendEquRGB",
	        value: function getBlendEquRGB() {
	            var gl = context_1.default.getContext();
	            return gl.getParameter(gl.BLEND_EQUATION_RGB);
	        }
	    }, {
	        key: "getBlendEquAlpha",
	        value: function getBlendEquAlpha() {
	            var gl = context_1.default.getContext();
	            return gl.getParameter(gl.BLEND_EQUATION_ALPHA);
	        }
	    }], [{
	        key: "enable",
	        value: function enable() {
	            var gl = context_1.default.getContext();
	            gl.enable(gl.BLEND);
	        }
	    }, {
	        key: "equation",
	        value: function equation(mode) {
	            var gl = context_1.default.getContext();
	            gl.blendEquation(mode);
	        }
	    }, {
	        key: "equationSeparate",
	        value: function equationSeparate(modeRGB, modeAlpha) {
	            var gl = context_1.default.getContext();
	            gl.blendEquationSeparate(modeRGB, modeAlpha);
	        }
	    }, {
	        key: "color",
	        value: function color() {
	            var red = arguments.length <= 0 || arguments[0] === undefined ? 0.0 : arguments[0];
	            var green = arguments.length <= 1 || arguments[1] === undefined ? 0.0 : arguments[1];
	            var blue = arguments.length <= 2 || arguments[2] === undefined ? 0.0 : arguments[2];
	            var alpha = arguments.length <= 3 || arguments[3] === undefined ? 0.0 : arguments[3];
	
	            var gl = context_1.default.getContext();
	            gl.blendColor(red, green, blue, alpha);
	        }
	    }, {
	        key: "func",
	        value: function func() {
	            var sfactor = arguments.length <= 0 || arguments[0] === undefined ? BlendingType_1.default.One : arguments[0];
	            var dfactor = arguments.length <= 1 || arguments[1] === undefined ? BlendingType_1.default.Zero : arguments[1];
	
	            var gl = context_1.default.getContext();
	            gl.blendFunc(sfactor, dfactor);
	        }
	    }, {
	        key: "funcSeparate",
	        value: function funcSeparate() {
	            var srcRGB = arguments.length <= 0 || arguments[0] === undefined ? BlendingType_1.default.One : arguments[0];
	            var dstRGB = arguments.length <= 1 || arguments[1] === undefined ? BlendingType_1.default.Zero : arguments[1];
	            var srcAlpha = arguments.length <= 2 || arguments[2] === undefined ? BlendingType_1.default.One : arguments[2];
	            var dstAlpha = arguments.length <= 3 || arguments[3] === undefined ? BlendingType_1.default.Zero : arguments[3];
	
	            var gl = context_1.default.getContext();
	            gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
	        }
	    }, {
	        key: "disable",
	        value: function disable() {
	            var gl = context_1.default.getContext();
	            gl.disable(gl.BLEND);
	        }
	    }, {
	        key: "isEnabled",
	        value: function isEnabled() {
	            var gl = context_1.default.getContext();
	            return gl.isEnabled(gl.BLEND);
	        }
	    }]);
	
	    return Blend;
	}();
	
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Blend;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var context_1 = __webpack_require__(4);
	"use strict";
	var gl = context_1.default.getContext();
	var BlendingType;
	(function (BlendingType) {
	    BlendingType[BlendingType["Zero"] = gl.ZERO] = "Zero";
	    BlendingType[BlendingType["One"] = gl.ONE] = "One";
	    BlendingType[BlendingType["SrcColor"] = gl.SRC_COLOR] = "SrcColor";
	    BlendingType[BlendingType["OneMinusSrcColor"] = gl.ONE_MINUS_SRC_COLOR] = "OneMinusSrcColor";
	    BlendingType[BlendingType["SrcAlpha"] = gl.SRC_ALPHA] = "SrcAlpha";
	    BlendingType[BlendingType["OneMinusSrcAlpha"] = gl.ONE_MINUS_SRC_ALPHA] = "OneMinusSrcAlpha";
	    BlendingType[BlendingType["DstAlpha"] = gl.DST_ALPHA] = "DstAlpha";
	    BlendingType[BlendingType["OneMinusDstAlpha"] = gl.ONE_MINUS_DST_ALPHA] = "OneMinusDstAlpha";
	    BlendingType[BlendingType["DstColor"] = gl.DST_COLOR] = "DstColor";
	    BlendingType[BlendingType["OneMinusDstColor"] = gl.ONE_MINUS_DST_COLOR] = "OneMinusDstColor";
	    BlendingType[BlendingType["SrcAlphaSaturate"] = gl.SRC_ALPHA_SATURATE] = "SrcAlphaSaturate";
	    BlendingType[BlendingType["CteColor"] = gl.CONSTANT_COLOR] = "CteColor";
	    BlendingType[BlendingType["OneMinusCteColor"] = gl.ONE_MINUS_CONSTANT_COLOR] = "OneMinusCteColor";
	    BlendingType[BlendingType["CteAlpha"] = gl.CONSTANT_ALPHA] = "CteAlpha";
	    BlendingType[BlendingType["OneMinusCteAlpha"] = gl.ONE_MINUS_CONSTANT_ALPHA] = "OneMinusCteAlpha";
	})(BlendingType || (BlendingType = {}));
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = BlendingType;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var context_1 = __webpack_require__(4);
	"use strict";
	var gl = context_1.default.getContext();
	var ComparisonFunc;
	(function (ComparisonFunc) {
	    ComparisonFunc[ComparisonFunc["Never"] = gl.NEVER] = "Never";
	    ComparisonFunc[ComparisonFunc["Always"] = gl.ALWAYS] = "Always";
	    ComparisonFunc[ComparisonFunc["Less"] = gl.LESS] = "Less";
	    ComparisonFunc[ComparisonFunc["Equal"] = gl.EQUAL] = "Equal";
	    ComparisonFunc[ComparisonFunc["NotEqual"] = gl.NOTEQUAL] = "NotEqual";
	    ComparisonFunc[ComparisonFunc["LessEqual"] = gl.LEQUAL] = "LessEqual";
	    ComparisonFunc[ComparisonFunc["Greater"] = gl.GREATER] = "Greater";
	    ComparisonFunc[ComparisonFunc["GreaterEqual"] = gl.GEQUAL] = "GreaterEqual";
	})(ComparisonFunc || (ComparisonFunc = {}));
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ComparisonFunc;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ResourceMap;
	(function (ResourceMap) {
	    var MapEntry = function () {
	        function MapEntry(resName) {
	            _classCallCheck(this, MapEntry);
	
	            this._asset = resName;
	            this._refCount = 1;
	        }
	
	        _createClass(MapEntry, [{
	            key: "getAsset",
	            value: function getAsset() {
	                return this._asset;
	            }
	        }, {
	            key: "setAsset",
	            value: function setAsset(name) {
	                this._asset = name;
	            }
	        }, {
	            key: "count",
	            value: function count() {
	                return this._refCount;
	            }
	        }, {
	            key: "incCount",
	            value: function incCount() {
	                this._refCount++;
	            }
	        }, {
	            key: "decCount",
	            value: function decCount() {
	                this._refCount--;
	            }
	        }]);
	
	        return MapEntry;
	    }();
	
	    ResourceMap.MapEntry = MapEntry;
	    var _numOutstandingLoads = 0;
	    var _loadCompleteCallback = null;
	    ResourceMap._resourceMap = {};
	    function asyncLoadRequested(resName) {
	        ResourceMap._resourceMap[resName] = new MapEntry(resName);
	        ++_numOutstandingLoads;
	    }
	    ResourceMap.asyncLoadRequested = asyncLoadRequested;
	    ;
	    function asyncLoadFailed(resName) {
	        VanillaToasts.create({
	            title: resName + " completed",
	            text: "",
	            type: "error",
	            timeout: 2500
	        });
	        --_numOutstandingLoads;
	        _checkForAllLoadCompleted();
	    }
	    ResourceMap.asyncLoadFailed = asyncLoadFailed;
	    function asyncLoadCompleted(resName, loadedAsset) {
	        if (!isAssetLoaded(resName)) {
	            VanillaToasts.create({
	                title: "asyncLoadCompleted: [" + resName + "] not in map!",
	                text: "",
	                type: "error",
	                timeout: 2500
	            });
	        }
	        VanillaToasts.create({
	            title: resName + " completed",
	            text: "",
	            type: "success",
	            timeout: 1500
	        });
	        ResourceMap._resourceMap[resName].setAsset(loadedAsset);
	        --_numOutstandingLoads;
	        _checkForAllLoadCompleted();
	    }
	    ResourceMap.asyncLoadCompleted = asyncLoadCompleted;
	    ;
	    function _checkForAllLoadCompleted() {
	        if (_numOutstandingLoads === 0 && _loadCompleteCallback !== null) {
	            var funToCall = _loadCompleteCallback;
	            _loadCompleteCallback = null;
	            funToCall();
	        }
	    }
	    ;
	    function setLoadCompleteCallback(fn) {
	        _loadCompleteCallback = fn;
	        _checkForAllLoadCompleted();
	    }
	    ResourceMap.setLoadCompleteCallback = setLoadCompleteCallback;
	    ;
	    function retrieveAsset(resName) {
	        var r = null;
	        if (resName in ResourceMap._resourceMap) {
	            r = ResourceMap._resourceMap[resName].getAsset();
	        } else {
	            alert("retrieveAsset: [" + resName + "] not in map!");
	        }
	        return r;
	    }
	    ResourceMap.retrieveAsset = retrieveAsset;
	    ;
	    function isAssetLoaded(resName) {
	        return resName in ResourceMap._resourceMap;
	    }
	    ResourceMap.isAssetLoaded = isAssetLoaded;
	    ;
	    function incAssetRefCount(resName) {
	        ResourceMap._resourceMap[resName].incCount();
	    }
	    ResourceMap.incAssetRefCount = incAssetRefCount;
	    ;
	    function unloadAsset(resName) {
	        var c = 0;
	        if (resName in ResourceMap._resourceMap) {
	            ResourceMap._resourceMap[resName].decCount();
	            c = ResourceMap._resourceMap[resName].count();
	            if (c === 0) {
	                delete ResourceMap._resourceMap[resName];
	            }
	        }
	        return c;
	    }
	    ResourceMap.unloadAsset = unloadAsset;
	    ;
	})(ResourceMap || (ResourceMap = {}));
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ResourceMap;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	var Timer;
	(function (Timer) {
	    var _lastTime = Date.now();
	    var _deltaTime = 0.0;
	    var _currentTime = void 0,
	        _timeElapsed = void 0;
	    function update() {
	        _currentTime = Date.now();
	        _timeElapsed = _currentTime - _lastTime;
	        _deltaTime = _timeElapsed;
	        _lastTime = _currentTime;
	    }
	    Timer.update = update;
	    function deltaTime() {
	        return _deltaTime;
	    }
	    Timer.deltaTime = deltaTime;
	})(Timer || (Timer = {}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Timer;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var core_ts_1 = __webpack_require__(3);
	var vertexArray_ts_1 = __webpack_require__(15);
	var vertexBuffer_ts_1 = __webpack_require__(17);
	var UsageType_ts_1 = __webpack_require__(19);
	var BufferType_ts_1 = __webpack_require__(18);
	"use strict";
	var gl = core_ts_1.default.getInstance().getGL();
	
	var PostProcess = function () {
	    function PostProcess() {
	        _classCallCheck(this, PostProcess);
	    }
	
	    _createClass(PostProcess, null, [{
	        key: "initialize",
	        value: function initialize() {
	            if (!PostProcess._planeVAO) {
	                var positions = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0];
	                PostProcess._planeVAO = new vertexArray_ts_1.default();
	                this._planeVertexVBO = new vertexBuffer_ts_1.default(BufferType_ts_1.default.Array);
	                this._planeVertexVBO.bufferData(new Float32Array(positions), UsageType_ts_1.default.StaticDraw);
	                this._planeVertexVBO.vertexAttribPointer(0, 2, gl.FLOAT);
	                PostProcess._planeVAO.unbind();
	            }
	        }
	    }, {
	        key: "bind",
	        value: function bind() {
	            PostProcess._planeVAO.bind();
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            PostProcess._planeVAO.bind();
	            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	            PostProcess._planeVAO.unbind();
	        }
	    }]);
	
	    return PostProcess;
	}();
	
	PostProcess._planeVAO = null;
	PostProcess._planeVertexVBO = null;
	;
	PostProcess.initialize();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = PostProcess;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var core_1 = __webpack_require__(3);
	var extensions_1 = __webpack_require__(16);
	"use strict";
	var gl = core_1.default.getInstance().getGL();
	
	var VertexArray = function () {
	    function VertexArray(vao) {
	        _classCallCheck(this, VertexArray);
	
	        if (vao !== undefined) {
	            this._handle = vao;
	        } else {
	            if (gl instanceof WebGL2RenderingContext) {
	                this._handle = gl.createVertexArray();
	            } else {
	                var ext = extensions_1.default.get("OES_vertex_array_object");
	                if (ext) {
	                    this._handle = ext.createVertexArrayOES();
	                }
	            }
	        }
	        this.bind();
	    }
	
	    _createClass(VertexArray, [{
	        key: "bind",
	        value: function bind() {
	            if (gl instanceof WebGL2RenderingContext) {
	                gl.bindVertexArray(this._handle);
	                return;
	            }
	            var ext = extensions_1.default.get("OES_vertex_array_object");
	            if (ext) {
	                ext.bindVertexArrayOES(this._handle);
	            }
	        }
	    }, {
	        key: "unbind",
	        value: function unbind() {
	            if (gl instanceof WebGL2RenderingContext) {
	                gl.bindVertexArray(null);
	                return;
	            }
	            var ext = extensions_1.default.get("OES_vertex_array_object");
	            if (ext) {
	                ext.bindVertexArrayOES(null);
	            }
	        }
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            this.bind();
	            if (gl instanceof WebGL2RenderingContext) {
	                gl.deleteVertexArray(this._handle);
	                return;
	            }
	            var ext = extensions_1.default.get("OES_vertex_array_object");
	            if (ext) {
	                ext.deleteVertexArrayOES(this._handle);
	            }
	        }
	    }], [{
	        key: "wrap",
	        value: function wrap(vao) {
	            return new VertexArray(vao);
	        }
	    }, {
	        key: "isSupported",
	        value: function isSupported() {
	            return gl instanceof WebGL2RenderingContext || extensions_1.default.get("OES_vertex_array_object");
	        }
	    }]);
	
	    return VertexArray;
	}();
	
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = VertexArray;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var core_1 = __webpack_require__(3);
	"use strict";
	var gl = core_1.default.getInstance().getGL();
	var extensions;
	(function (extensions) {
	    var _extensions = {};
	    function get(name) {
	        if (name in _extensions) {
	            return _extensions[name];
	        }
	        var ext = gl.getExtension(name) || gl.getExtension("WEBKIT_" + name) || gl.getExtension("MOZ_" + name);
	        if (ext === null) {
	            console.warn(name + " extension not supported.");
	            return;
	        }
	        _extensions[name] = ext;
	        return ext;
	    }
	    extensions.get = get;
	})(extensions || (extensions = {}));
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = extensions;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var core_1 = __webpack_require__(3);
	var BufferType_1 = __webpack_require__(18);
	var UsageType_1 = __webpack_require__(19);
	"use strict";
	var gl = core_1.default.getInstance().getGL();
	
	var VertexBuffer = function () {
	    function VertexBuffer() {
	        var type = arguments.length <= 0 || arguments[0] === undefined ? BufferType_1.default.Array : arguments[0];
	
	        _classCallCheck(this, VertexBuffer);
	
	        this._type = BufferType_1.default.Array;
	        this._buffer = gl.createBuffer();
	        this._type = type;
	        this.bind();
	    }
	
	    _createClass(VertexBuffer, [{
	        key: "bind",
	        value: function bind(type) {
	            if (type !== undefined) {
	                this._type = type;
	            }
	            gl.bindBuffer(this._type, this._buffer);
	        }
	    }, {
	        key: "unbind",
	        value: function unbind() {
	            gl.bindBuffer(this._type, null);
	        }
	    }, {
	        key: "getBufferType",
	        value: function getBufferType() {
	            return this._type;
	        }
	    }, {
	        key: "getBuffer",
	        value: function getBuffer() {
	            return this._buffer;
	        }
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            gl.bindBuffer(this._type, 0);
	            if (!this._buffer) {
	                gl.deleteBuffer(this._buffer);
	            }
	            this._buffer = null;
	        }
	    }, {
	        key: "bufferData",
	        value: function bufferData(data) {
	            var usage = arguments.length <= 1 || arguments[1] === undefined ? UsageType_1.default.StaticDraw : arguments[1];
	
	            this.bind();
	            gl.bufferData(this._type, data, usage);
	        }
	    }, {
	        key: "attribDivisor",
	        value: function attribDivisor(position, length, divisor) {
	            var stride = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	
	            this.bind();
	            gl.enableVertexAttribArray(position);
	            gl.vertexAttribPointer(position, length, gl.FLOAT, false, length * Float32Array.BYTES_PER_ELEMENT, 0);
	            gl.vertexAttribDivisor(position, divisor);
	        }
	    }, {
	        key: "vertexAttribPointer",
	        value: function vertexAttribPointer(attribLocation, numElems, type) {
	            var normalized = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	            var offset = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
	
	            this.bind();
	            gl.enableVertexAttribArray(attribLocation);
	            gl.vertexAttribPointer(attribLocation, numElems, type, normalized, numElems * Float32Array.BYTES_PER_ELEMENT, offset);
	        }
	    }, {
	        key: "copySub",
	        value: function copySub(readTarget, writeTarget, readOffset, writeOffset, size) {
	            gl.copyBufferSubData(readTarget, writeTarget, readOffset, writeOffset, size);
	        }
	    }]);
	
	    return VertexBuffer;
	}();
	
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = VertexBuffer;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var context_1 = __webpack_require__(4);
	"use strict";
	var gl = context_1.default.getContext();
	var BufferType;
	(function (BufferType) {
	    BufferType[BufferType["Array"] = gl.ARRAY_BUFFER] = "Array";
	    BufferType[BufferType["ElementArray"] = gl.ELEMENT_ARRAY_BUFFER] = "ElementArray";
	    BufferType[BufferType["TransformFeedback"] = gl.TRANSFORM_FEEDBACK_BUFFER] = "TransformFeedback";
	    BufferType[BufferType["Uniform"] = gl.UNIFORM_BUFFER] = "Uniform";
	    BufferType[BufferType["PixelPack"] = gl.PIXEL_PACK_BUFFER] = "PixelPack";
	    BufferType[BufferType["PixelUnpack"] = gl.PIXEL_UNPACK_BUFFER] = "PixelUnpack";
	    BufferType[BufferType["CopyRead"] = gl.COPY_READ_BUFFER] = "CopyRead";
	    BufferType[BufferType["CopyWrite"] = gl.COPY_WRITE_BUFFER] = "CopyWrite";
	})(BufferType || (BufferType = {}));
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = BufferType;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var context_1 = __webpack_require__(4);
	"use strict";
	var gl = context_1.default.getContext();
	var UsageType;
	(function (UsageType) {
	    UsageType[UsageType["StaticDraw"] = gl.STATIC_DRAW] = "StaticDraw";
	    UsageType[UsageType["DynamicDraw"] = gl.DYNAMIC_DRAW] = "DynamicDraw";
	    UsageType[UsageType["StreamDraw"] = gl.STREAM_DRAW] = "StreamDraw";
	    UsageType[UsageType["StaticRead"] = gl.STATIC_READ] = "StaticRead";
	    UsageType[UsageType["DynamicRead"] = gl.DYNAMIC_READ] = "DynamicRead";
	    UsageType[UsageType["StreamRead"] = gl.STREAM_READ] = "StreamRead";
	    UsageType[UsageType["StaticCopy"] = gl.STATIC_COPY] = "StaticCopy";
	    UsageType[UsageType["DynamicCopy"] = gl.DYNAMIC_COPY] = "DynamicCopy";
	    UsageType[UsageType["StreamCopy"] = gl.STREAM_COPY] = "StreamCopy";
	})(UsageType || (UsageType = {}));
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = UsageType;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var core_1 = __webpack_require__(3);
	var texture_1 = __webpack_require__(21);
	var extensions_1 = __webpack_require__(16);
	"use strict";
	var gl = core_1.default.getInstance().getGL();
	
	var Texture2D = function (_texture_1$default) {
	    _inherits(Texture2D, _texture_1$default);
	
	    function Texture2D(data) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	        var onSuccess = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	        _classCallCheck(this, Texture2D);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Texture2D).call(this, gl.TEXTURE_2D));
	
	        _this._flipY = Boolean(options.flipY);
	        _this._handle = gl.createTexture();
	        var _internalformat = options.internalFormat || gl.RGBA;
	        var _format = options.format || gl.RGBA;
	        var _type = options.type || gl.UNSIGNED_BYTE;
	        var _level = options.level || 0;
	        _this._minFilter = options.minFilter || gl.NEAREST;
	        _this._magFilter = options.magFilter || gl.NEAREST;
	        var wraps = [options.wrapS || options.wrap || gl.CLAMP_TO_EDGE, options.wrapT || options.wrap || gl.CLAMP_TO_EDGE];
	        _this.bind();
	        gl.texImage2D(_this._target, _level, _internalformat, _format, _type, data);
	        gl.texParameteri(_this._target, gl.TEXTURE_MIN_FILTER, _this._minFilter);
	        gl.texParameteri(_this._target, gl.TEXTURE_MAG_FILTER, _this._magFilter);
	        _this.wrap(wraps);
	        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, _this._flipY === true ? 1 : 0);
	        if (onSuccess) {
	            onSuccess();
	        }
	        return _this;
	    }
	
	    _createClass(Texture2D, [{
	        key: "genMipMap",
	        value: function genMipMap() {
	            this.bind();
	            gl.generateMipmap(this._target);
	        }
	    }, {
	        key: "wrap",
	        value: function wrap(modes) {
	            if (modes.length !== 2) {
	                throw new Error("Must specify wrapS, wrapT modes");
	            }
	            this.bind();
	            gl.texParameteri(this._target, gl.TEXTURE_WRAP_S, modes[0]);
	            gl.texParameteri(this._target, gl.TEXTURE_WRAP_T, modes[1]);
	            this._wraps = modes;
	        }
	    }, {
	        key: "minFilter",
	        value: function minFilter(filter) {
	            this.bind();
	            gl.texParameteri(this._target, gl.TEXTURE_MIN_FILTER, filter);
	            this._minFilter = filter;
	        }
	    }, {
	        key: "magFilter",
	        value: function magFilter(filter) {
	            this.bind();
	            gl.texParameteri(this._target, gl.TEXTURE_MAG_FILTER, filter);
	            this._magFilter = filter;
	        }
	    }, {
	        key: "bind",
	        value: function bind(slot) {
	            if (typeof slot === "number") {
	                gl.activeTexture(gl.TEXTURE0 + slot);
	            }
	            gl.bindTexture(this._target, this._handle);
	        }
	    }, {
	        key: "unbind",
	        value: function unbind() {
	            gl.bindTexture(this._target, null);
	        }
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            gl.deleteTexture(this._handle);
	            this._handle = null;
	        }
	    }, {
	        key: "setAnisotropic",
	        value: function setAnisotropic() {
	            var level = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	            level = Math.floor(level);
	            var ext = extensions_1.default.get("EXT_texture_filter_anisotropic");
	            var max_anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
	            if (max_anisotropy < level) {
	                gl.texParameterf(this._target, ext.TEXTURE_MAX_ANISOTROPY_EXT, level);
	            }
	        }
	    }]);
	
	    return Texture2D;
	}(texture_1.default);
	
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Texture2D;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var core_1 = __webpack_require__(3);
	"use strict";
	
	var Texture = function () {
	    function Texture(target) {
	        _classCallCheck(this, Texture);
	
	        this._target = target;
	    }
	
	    _createClass(Texture, [{
	        key: "handle",
	        value: function handle() {
	            return this._handle;
	        }
	    }, {
	        key: "resize",
	        value: function resize(size) {}
	    }, {
	        key: "setLOD",
	        value: function setLOD(lod) {
	            var gl = core_1.default.getInstance().getGL();
	            if (gl instanceof WebGL2RenderingContext) {
	                gl.texParameterf(this._target, gl.TEXTURE_MIN_LOD, lod);
	                gl.texParameterf(this._target, gl.TEXTURE_MAX_LOD, lod);
	            } else {
	                console.log("TEXTURE LOD isn´t supported");
	            }
	        }
	    }, {
	        key: "getHeight",
	        value: function getHeight() {
	            return -1;
	        }
	    }, {
	        key: "getWidth",
	        value: function getWidth() {
	            return -1;
	        }
	    }, {
	        key: "target",
	        get: function get() {
	            return this._target;
	        }
	    }]);
	
	    return Texture;
	}();
	
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Texture;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var core_1 = __webpack_require__(3);
	var ProgramCte_1 = __webpack_require__(23);
	"use strict";
	
	var Program = function () {
	    function Program() {
	        _classCallCheck(this, Program);
	
	        this.uniformLocations = {};
	        this.attribLocations = {};
	        this._shaders = [];
	    }
	
	    _createClass(Program, [{
	        key: "addAttributesArgs",
	        value: function addAttributesArgs() {
	            for (var _len = arguments.length, attrs = Array(_len), _key = 0; _key < _len; _key++) {
	                attrs[_key] = arguments[_key];
	            }
	
	            this.addAttributes(attrs);
	        }
	    }, {
	        key: "addAttributes",
	        value: function addAttributes(attrs) {
	            var gl = core_1.default.getInstance().getGL();
	            for (var attr in attrs) {
	                attr = attrs[attr];
	                var attrID = gl.getAttribLocation(this._compiledShader, attr);
	                if (attrID < 0) {
	                    console.error(attr + " undefined");
	                    continue;
	                }
	                this.attribLocations[attr] = attrID;
	            }
	        }
	    }, {
	        key: "addUniformsArgs",
	        value: function addUniformsArgs() {
	            for (var _len2 = arguments.length, unifs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                unifs[_key2] = arguments[_key2];
	            }
	
	            this.addUniforms(unifs);
	        }
	    }, {
	        key: "addUniforms",
	        value: function addUniforms(unifs) {
	            var gl = core_1.default.getInstance().getGL();
	            for (var unif in unifs) {
	                unif = unifs[unif];
	                var unifID = gl.getUniformLocation(this._compiledShader, unif);
	                if (unifID < 0) {
	                    console.error(unif + " undefined");
	                    continue;
	                }
	                this.uniformLocations[unif] = unifID;
	            }
	        }
	    }, {
	        key: "program",
	        value: function program() {
	            return this._compiledShader;
	        }
	    }, {
	        key: "addShader",
	        value: function addShader(shader_, type, _mode) {
	            var shader = void 0;
	            if (type < 0) {
	                throw new Error("SHADER TYPE UNDEFINED");
	            }
	            if (_mode === ProgramCte_1.default.mode.read_file) {
	                shader = this.loadAndCompileWithFile(shader_, type);
	            } else if (_mode === ProgramCte_1.default.mode.read_script) {
	                shader = this.loadAndCompile(shader_, type);
	            } else if (_mode === ProgramCte_1.default.mode.read_text) {
	                shader = this.loadAndCompileFromText(shader_, type);
	            }
	            this._shaders.push(shader);
	        }
	    }, {
	        key: "_compile",
	        value: function _compile() {
	            var gl = core_1.default.getInstance().getGL();
	            this._compiledShader = gl.createProgram();
	            for (var i = 0; i < this._shaders.length; ++i) {
	                gl.attachShader(this._compiledShader, this._shaders[i]);
	            }
	        }
	    }, {
	        key: "_link",
	        value: function _link() {
	            var gl = core_1.default.getInstance().getGL();
	            gl.linkProgram(this._compiledShader);
	            if (!gl.getProgramParameter(this._compiledShader, gl.LINK_STATUS)) {
	                alert("ERROR");
	                console.warn("Error in program linking:" + gl.getProgramInfoLog(this._compiledShader));
	                console.log({
	                    vertex: this._vertexSource,
	                    fragment: this._fragmentSource
	                });
	                throw "SHADER ERROR";
	            }
	            return true;
	        }
	    }, {
	        key: "compile",
	        value: function compile() {
	            var gl = core_1.default.getInstance().getGL();
	            this._compiledShader = gl.createProgram();
	            for (var i = 0; i < this._shaders.length; ++i) {
	                gl.attachShader(this._compiledShader, this._shaders[i]);
	            }
	            gl.linkProgram(this._compiledShader);
	            if (!gl.getProgramParameter(this._compiledShader, gl.LINK_STATUS)) {
	                alert("ERROR");
	                console.warn("Error in program linking:" + gl.getProgramInfoLog(this._compiledShader));
	                console.log({
	                    vertex: this._vertexSource,
	                    fragment: this._fragmentSource
	                });
	                throw "SHADER ERROR";
	            }
	            return true;
	        }
	    }, {
	        key: "loadAndCompileWithFile",
	        value: function loadAndCompileWithFile(filePath, shaderType) {
	            var request = new XMLHttpRequest();
	            request.open("GET", filePath, false);
	            try {
	                request.send();
	            } catch (err) {
	                alert("ERROR: " + filePath);
	                console.log("ERROR: " + filePath);
	                return null;
	            }
	            var shaderSource = request.responseText;
	            if (shaderSource === null) {
	                alert("WARNING: " + filePath + " failed");
	                console.log(this._fragmentSource);
	                throw "SHADER ERROR";
	            }
	            return this.compileShader(shaderSource, shaderType);
	        }
	    }, {
	        key: "loadAndCompileFromText",
	        value: function loadAndCompileFromText(shaderSource, shaderType) {
	            if (shaderSource === null) {
	                alert("WARNING: " + shaderSource + " failed");
	                console.log(this._fragmentSource);
	                throw "SHADER ERROR";
	            }
	            return this.compileShader(shaderSource, shaderType);
	        }
	    }, {
	        key: "loadAndCompile",
	        value: function loadAndCompile(id, shaderType) {
	            var shaderText = void 0,
	                shaderSource = void 0;
	            shaderText = document.getElementById(id);
	            shaderSource = shaderText.firstChild.textContent;
	            if (shaderSource === null) {
	                alert("WARNING: " + id + " failed");
	                console.log(this._fragmentSource);
	                throw "SHADER ERROR";
	            }
	            return this.compileShader(shaderSource, shaderType);
	        }
	    }, {
	        key: "compileShader",
	        value: function compileShader(shaderSource, shaderType) {
	            var gl = core_1.default.getInstance().getGL();
	            var compiledShader = void 0;
	            if (shaderType === gl.VERTEX_SHADER) {
	                this._vertexSource = shaderSource;
	            } else if (shaderType === gl.FRAGMENT_SHADER) {
	                this._fragmentSource = shaderSource;
	            }
	            compiledShader = gl.createShader(shaderType);
	            gl.shaderSource(compiledShader, shaderSource);
	            gl.compileShader(compiledShader);
	            if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
	                alert("ERROR: " + gl.getShaderInfoLog(compiledShader));
	                console.log("ERROR: " + gl.getShaderInfoLog(compiledShader));
	                console.log({
	                    vertex: this._vertexSource,
	                    fragment: this._fragmentSource
	                });
	                throw "SHADER ERROR";
	            }
	            return compiledShader;
	        }
	    }, {
	        key: "use",
	        value: function use() {
	            var gl = core_1.default.getInstance().getGL();
	            gl.useProgram(this._compiledShader);
	        }
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            var _this = this;
	
	            var gl = core_1.default.getInstance().getGL();
	            this._shaders.forEach(function (shader) {
	                gl.detachShader(_this.compileShader, shader);
	            });
	            gl.deleteShader(this._compiledShader);
	        }
	    }, {
	        key: "sendUniform1f",
	        value: function sendUniform1f(name, value) {
	            var gl = core_1.default.getInstance().getGL();
	            gl.uniform1f(this.uniformLocations[name], value);
	        }
	    }, {
	        key: "sendUniform1i",
	        value: function sendUniform1i(name, value) {
	            var gl = core_1.default.getInstance().getGL();
	            gl.uniform1i(this.uniformLocations[name], value);
	        }
	    }, {
	        key: "sendUniform1b",
	        value: function sendUniform1b(name, value) {
	            var gl = core_1.default.getInstance().getGL();
	            gl.uniform1i(this.uniformLocations[name], value === true ? 1 : 0);
	        }
	    }, {
	        key: "sendUniformVec3",
	        value: function sendUniformVec3(name, value) {
	            var gl = core_1.default.getInstance().getGL();
	            gl.uniform3fv(this.uniformLocations[name], value);
	        }
	    }, {
	        key: "sendUniformMat4",
	        value: function sendUniformMat4(name, value) {
	            var transpose = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	
	            var gl = core_1.default.getInstance().getGL();
	            gl.uniformMatrix4fv(this.uniformLocations[name], transpose, value);
	        }
	    }, {
	        key: "unifAndAttribs",
	        value: function unifAndAttribs() {
	            var gl = core_1.default.getInstance().getGL();
	            console.log("UNIFORMS");
	            var numUniforms = gl.getProgramParameter(this._compiledShader, gl.ACTIVE_UNIFORMS);
	            var result = [];
	            for (var i = 0; i < numUniforms; ++i) {
	                var info = gl.getActiveUniform(this._compiledShader, i);
	                console.log(info);
	                var type = Program.getType(gl, info.type);
	                if (info.size > 1) {
	                    for (var j = 0; j < info.size; ++j) {
	                        result.push({
	                            name: info.name.replace("[0]", "[" + j + "]"),
	                            type: type,
	                            id: i
	                        });
	                    }
	                } else {
	                    result.push({
	                        name: info.name,
	                        type: type,
	                        id: i
	                    });
	                }
	            }
	            console.log(result);
	            console.log("ATTRIBUTES");
	            var numAttributes = gl.getProgramParameter(this._compiledShader, gl.ACTIVE_ATTRIBUTES);
	            result = [];
	            for (var _i = 0; _i < numAttributes; ++_i) {
	                var _info = gl.getActiveAttrib(this._compiledShader, _i);
	                if (_info) {
	                    result.push({
	                        name: _info.name,
	                        type: Program.getType(gl, _info.type),
	                        id: _i
	                    });
	                }
	            }
	            console.log(result);
	        }
	    }], [{
	        key: "getType",
	        value: function getType(gl, type) {
	            if (!Program.GL_TABLE) {
	                var typeNames = Object.keys(Program.GL_TO_GLSL_TYPES);
	                Program.GL_TABLE = {};
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;
	
	                try {
	                    for (var _iterator = typeNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var tn = _step.value;
	
	                        var cte = gl[tn];
	                        if (typeof cte !== "undefined") {
	                            Program.GL_TABLE[cte] = Program.GL_TO_GLSL_TYPES[tn];
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	
	                console.log(Program.GL_TABLE);
	            }
	            return Program.GL_TABLE[type];
	        }
	    }]);
	
	    return Program;
	}();
	
	Program.GL_TO_GLSL_TYPES = {
	    "FLOAT": "float",
	    "FLOAT_VEC2": "vec2",
	    "FLOAT_VEC3": "vec3",
	    "FLOAT_VEC4": "vec4",
	    "INT": "int",
	    "INT_VEC2": "ivec2",
	    "INT_VEC3": "ivec3",
	    "INT_VEC4": "ivec4",
	    "BOOL": "bool",
	    "BOOL_VEC2": "bvec2",
	    "BOOL_VEC3": "bvec3",
	    "BOOL_VEC4": "bvec4",
	    "FLOAT_MAT2": "mat2",
	    "FLOAT_MAT3": "mat3",
	    "FLOAT_MAT4": "mat4",
	    "SAMPLER_2D": "sampler2D",
	    "SAMPLER_CUBE": "samplerCube",
	    "FLOAT_MAT2x3": "mat2x3",
	    "FLOAT_MAT2x4": "mat2x4",
	    "FLOAT_MAT3x2": "mat3x2",
	    "FLOAT_MAT3x4": "mat3x4",
	    "FLOAT_MAT4x2": "mat4x2",
	    "FLOAT_MAT4x3": "mat4x3",
	    "UNSIGNED_INT": "uint",
	    "UNSIGNED_INT_VEC2": "uvec2",
	    "UNSIGNED_INT_VEC3": "uvec3",
	    "UNSIGNED_INT_VEC4": "uvec4",
	    "UNSIGNED_INT_SAMPLER_2D": "usampler2D",
	    "UNSIGNED_INT_SAMPLER_3D": "usampler3D",
	    "UNSIGNED_INT_SAMPLER_2D_ARRAY": "usampler2DArray",
	    "UNSIGNED_INT_SAMPLER_CUBE": "usamplerCube",
	    "INT_SAMPLER_2D": "isampler2D",
	    "INT_SAMPLER_3D": "isampler3D",
	    "INT_SAMPLER_2D_ARRAY": "isampler2DArray",
	    "INT_SAMPLER_CUBE": "isamplerCube"
	};
	Program.GL_TABLE = null;
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Program;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var context_1 = __webpack_require__(4);
	"use strict";
	var gl = context_1.default.getContext();
	var ProgramCte;
	(function (ProgramCte) {
	    (function (mode) {
	        mode[mode["read_file"] = 0] = "read_file";
	        mode[mode["read_script"] = 1] = "read_script";
	        mode[mode["read_text"] = 2] = "read_text";
	    })(ProgramCte.mode || (ProgramCte.mode = {}));
	    var mode = ProgramCte.mode;
	    ;
	    (function (shader_type) {
	        shader_type[shader_type["vertex"] = gl.VERTEX_SHADER] = "vertex";
	        shader_type[shader_type["fragment"] = gl.FRAGMENT_SHADER] = "fragment";
	    })(ProgramCte.shader_type || (ProgramCte.shader_type = {}));
	    var shader_type = ProgramCte.shader_type;
	})(ProgramCte || (ProgramCte = {}));
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ProgramCte;

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	"use strict";
	
	;
	;
	var ProgramManager;
	(function (ProgramManager) {
	    var _progDictionary = {};
	    function get(name) {
	        var prog = _progDictionary[name];
	        if (!prog) {
	            throw new Error("Program " + name + " undefined");
	        }
	        return prog;
	    }
	    ProgramManager.get = get;
	    function getCB(name, cb) {
	        var prog = get(name);
	        if (!prog) {
	            throw new Error("Program " + name + " undefined");
	        }
	        cb(prog);
	    }
	    ProgramManager.getCB = getCB;
	    function addWithFun(name, fn) {
	        add(name, fn());
	    }
	    ProgramManager.addWithFun = addWithFun;
	    function add(name, prog) {
	        if (!prog) {
	            throw new Error("Program " + name + " undefined");
	        }
	        _progDictionary[name] = prog;
	    }
	    ProgramManager.add = add;
	    function destroy() {
	        for (var key in _progDictionary) {
	            _progDictionary[key].destroy();
	        }
	        _progDictionary = {};
	    }
	    ProgramManager.destroy = destroy;
	})(ProgramManager || (ProgramManager = {}));
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ProgramManager;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var resourceMap_1 = __webpack_require__(12);
	"use strict";
	var loaders;
	(function (loaders) {
	    function _getAlias(imageSrc, alias) {
	        return alias.length < 1 ? imageSrc : alias;
	    }
	    function loadVideo(videoSrc) {
	        var alias = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
	    }
	    loaders.loadVideo = loadVideo;
	    function loadImage(imageSrc) {
	        var alias = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
	
	        alias = _getAlias(imageSrc, alias);
	        if (!resourceMap_1.default.isAssetLoaded(alias)) {
	            (function () {
	                var img = new Image();
	                resourceMap_1.default.asyncLoadRequested(alias);
	                img.onload = function () {
	                    resourceMap_1.default.asyncLoadCompleted(alias, img);
	                };
	                img.onerror = function (err) {
	                    resourceMap_1.default.asyncLoadFailed(alias);
	                };
	                img.src = imageSrc;
	            })();
	        } else {
	            resourceMap_1.default.incAssetRefCount(alias);
	        }
	    }
	    loaders.loadImage = loadImage;
	    function unloadImage(imageSrc) {
	        resourceMap_1.default.unloadAsset(imageSrc);
	    }
	    loaders.unloadImage = unloadImage;
	    function loadAudio(clipName) {
	        var _this = this;
	
	        var alias = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
	
	        alias = _getAlias(clipName, alias);
	        if (!resourceMap_1.default.isAssetLoaded(alias)) {
	            (function () {
	                resourceMap_1.default.asyncLoadRequested(alias);
	                var request = new XMLHttpRequest();
	                request.open("GET", clipName, true);
	                request.responseType = "arraybuffer";
	                request.onload = function () {
	                    this._audioContext.decodeAudioData(request.response, function (buffer) {
	                        resourceMap_1.default.asyncLoadCompleted(alias, buffer);
	                    });
	                }.bind(_this);
	                request.send();
	            })();
	        }
	    }
	    loaders.loadAudio = loadAudio;
	    function unloadAudio(clipName) {
	        resourceMap_1.default.unloadAsset(clipName);
	    }
	    loaders.unloadAudio = unloadAudio;
	    function loadHDRImage(imageSrc, width, height) {
	        var _this2 = this;
	
	        var alias = arguments.length <= 3 || arguments[3] === undefined ? "" : arguments[3];
	
	        alias = _getAlias(imageSrc, alias);
	        if (!resourceMap_1.default.isAssetLoaded(alias)) {
	            (function () {
	                resourceMap_1.default.asyncLoadRequested(alias);
	                var request = new XMLHttpRequest();
	                request.open("GET", imageSrc, true);
	                request.responseType = "arraybuffer";
	                request.onload = function () {
	                    var arrayBuffer = request.response;
	                    if (arrayBuffer) {
	                        var bytes = new Uint8Array(arrayBuffer);
	                        var data = new Float32Array(width * height * 3);
	                        var byteIdx = 0;
	                        for (; byteIdx < bytes.length; byteIdx++) {
	                            if (bytes[byteIdx] === 0x0A && bytes[byteIdx + 1] === 0x0A) {
	                                byteIdx = byteIdx + 2;
	                                break;
	                            }
	                        }
	                        for (; byteIdx < bytes.length; byteIdx++) {
	                            if (bytes[byteIdx] === 0x0A) {
	                                byteIdx = byteIdx + 1;
	                                break;
	                            }
	                        }
	                        var idx = 0;
	                        for (var row = 0; row < height; row++) {
	                            for (var col = 0; col < width; col++) {
	                                var r = bytes[byteIdx++];
	                                var g = bytes[byteIdx++];
	                                var b = bytes[byteIdx++];
	                                var e = bytes[byteIdx++];
	                                var expFactor = Math.pow(2, e - 128);
	                                data[idx++] = r / 256 * expFactor;
	                                data[idx++] = g / 256 * expFactor;
	                                data[idx++] = b / 256 * expFactor;
	                            }
	                        }
	                        resourceMap_1.default.asyncLoadCompleted(alias, data);
	                    }
	                }.bind(_this2);
	                request.send();
	            })();
	        } else {
	            resourceMap_1.default.incAssetRefCount(alias);
	        }
	    }
	    loaders.loadHDRImage = loadHDRImage;
	    function unloadHDRImage(imageSrc) {
	        resourceMap_1.default.unloadAsset(imageSrc);
	    }
	    loaders.unloadHDRImage = unloadHDRImage;
	})(loaders || (loaders = {}));
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = loaders;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var light_1 = __webpack_require__(27);
	var vector3_1 = __webpack_require__(29);
	"use strict";
	
	var PointLight = function (_light_1$default) {
	    _inherits(PointLight, _light_1$default);
	
	    function PointLight() {
	        var position = arguments.length <= 0 || arguments[0] === undefined ? new vector3_1.default(0.0, 0.0, 0.0) : arguments[0];
	
	        _classCallCheck(this, PointLight);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PointLight).call(this));
	
	        _this._position = position;
	        return _this;
	    }
	
	    _createClass(PointLight, [{
	        key: "addTransform",
	        value: function addTransform() {
	            var x = arguments.length <= 0 || arguments[0] === undefined ? 0.0 : arguments[0];
	            var y = arguments.length <= 1 || arguments[1] === undefined ? 0.0 : arguments[1];
	            var z = arguments.length <= 2 || arguments[2] === undefined ? 0.0 : arguments[2];
	
	            this._position.x += x;
	            this._position.y += y;
	            this._position.z += z;
	        }
	    }, {
	        key: "position",
	        get: function get() {
	            return this._position;
	        },
	        set: function set(position) {
	            this._position = position;
	        }
	    }]);
	
	    return PointLight;
	}(light_1.default);
	
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = PointLight;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var color_1 = __webpack_require__(28);
	var vector3_1 = __webpack_require__(29);
	"use strict";
	
	var Light = function () {
	    function Light() {
	        _classCallCheck(this, Light);
	
	        this._intensity = 1.0;
	        this._color = new color_1.default(1.0, 1.0, 1.0);
	        this._enable = true;
	        this._attenuation = new vector3_1.default(1.0, 0.014, 0.0007);
	    }
	
	    _createClass(Light, [{
	        key: "setConstantAtt",
	        value: function setConstantAtt(value) {
	            this._attenuation.x = value;
	        }
	    }, {
	        key: "setLinearAtt",
	        value: function setLinearAtt(value) {
	            this._attenuation.y = value;
	        }
	    }, {
	        key: "setQuadraticAtt",
	        value: function setQuadraticAtt(value) {
	            this._attenuation.z = value;
	        }
	    }, {
	        key: "attenuation",
	        get: function get() {
	            return this._attenuation;
	        }
	    }, {
	        key: "intensity",
	        get: function get() {
	            return this._intensity;
	        },
	        set: function set(intensity) {
	            this._intensity = intensity;
	        }
	    }, {
	        key: "color",
	        get: function get() {
	            return this._color;
	        },
	        set: function set(color) {
	            this._color = color;
	        }
	    }]);
	
	    return Light;
	}();
	
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Light;

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Color = function () {
	    function Color(r, g, b) {
	        _classCallCheck(this, Color);
	
	        this._color = new Array(3);
	        this.setRGB(r, g, b);
	    }
	
	    _createClass(Color, [{
	        key: "setRGB",
	        value: function setRGB(r, g, b) {
	            this.r = r;
	            this.g = g;
	            this.b = b;
	            return this;
	        }
	    }, {
	        key: "toHSL",
	        value: function toHSL() {
	            var max = Math.max(this.r, this.g, this.b),
	                min = Math.min(this.r, this.g, this.b);
	            var h = void 0,
	                s = void 0,
	                l = (max + min) / 2;
	            if (max === min) {
	                h = s = 0;
	            } else {
	                var d = max - min;
	                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	                switch (max) {
	                    case this.r:
	                        h = (this.g - this.b) / d + (this.g < this.b ? 6 : 0);
	                        break;
	                    case this.g:
	                        h = (this.b - this.r) / d + 2;
	                        break;
	                    case this.b:
	                        h = (this.r - this.g) / d + 4;
	                        break;
	                }
	                h /= 6;
	            }
	            return new Color(h, s, l);
	        }
	    }, {
	        key: "r",
	        get: function get() {
	            return this._color[0];
	        },
	        set: function set(r) {
	            this._color[0] = r;
	        }
	    }, {
	        key: "g",
	        get: function get() {
	            return this._color[1];
	        },
	        set: function set(g) {
	            this._color[1] = g;
	        }
	    }, {
	        key: "b",
	        get: function get() {
	            return this._color[2];
	        },
	        set: function set(b) {
	            this._color[2] = b;
	        }
	    }]);
	
	    return Color;
	}();
	
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Color;

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Vector3 = function () {
	    function Vector3(x, y, z) {
	        _classCallCheck(this, Vector3);
	
	        this.x = x;
	        this.y = y;
	        this.z = z;
	    }
	
	    _createClass(Vector3, [{
	        key: "isEqual",
	        value: function isEqual(other) {
	            return this.x === other.x && this.y === other.y && this.z === other.z;
	        }
	    }]);
	
	    return Vector3;
	}();
	
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Vector3;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var input_1 = __webpack_require__(6);
	"use strict";
	
	var Camera2 = function () {
	    function Camera2() {
	        var position = arguments.length <= 0 || arguments[0] === undefined ? vec3.fromValues(0, 0, 0) : arguments[0];
	        var up = arguments.length <= 1 || arguments[1] === undefined ? vec3.fromValues(0, 1, 0) : arguments[1];
	        var yaw = arguments.length <= 2 || arguments[2] === undefined ? -90.0 : arguments[2];
	        var pitch = arguments.length <= 3 || arguments[3] === undefined ? 0.0 : arguments[3];
	
	        _classCallCheck(this, Camera2);
	
	        this.movSpeed = 0.05;
	        this.mouseSensivity = 0.25;
	        this._updateCamera = false;
	        this.view = mat4.create();
	        this.proj = mat4.create();
	        this.front = vec3.fromValues(0, 0, -1);
	        this.position = position;
	        this.worldUp = up;
	        this.yaw = yaw;
	        this.pitch = pitch;
	        this.right = vec3.create();
	        this.up = vec3.create();
	        this.updateCameraVectors();
	    }
	
	    _createClass(Camera2, [{
	        key: "GetPos",
	        value: function GetPos() {
	            return this.position;
	        }
	    }, {
	        key: "update",
	        value: function update(callback) {
	            this._updateCamera = false;
	            var speed = 1.0;
	            if (input_1.default.getInstance().isKeyPressed(input_1.default.getInstance().keys.Left_Shift)) {
	                speed = 2.5;
	            }
	            if (input_1.default.getInstance().isKeyPressed(input_1.default.getInstance().keys.W)) {
	                this.processKeyboard(4, speed);
	                this._updateCamera = true;
	            }
	            if (input_1.default.getInstance().isKeyPressed(input_1.default.getInstance().keys.S)) {
	                this.processKeyboard(5, speed);
	                this._updateCamera = true;
	            }
	            if (input_1.default.getInstance().isKeyPressed(input_1.default.getInstance().keys.A)) {
	                this.processKeyboard(2, speed);
	                this._updateCamera = true;
	            }
	            if (input_1.default.getInstance().isKeyPressed(input_1.default.getInstance().keys.D)) {
	                this.processKeyboard(3, speed);
	                this._updateCamera = true;
	            }
	            if (input_1.default.getInstance().isKeyPressed(input_1.default.getInstance().keys.E)) {
	                this.processKeyboard(0, speed);
	                this._updateCamera = true;
	            }
	            if (input_1.default.getInstance().isKeyPressed(input_1.default.getInstance().keys.Q)) {
	                this.processKeyboard(1, speed);
	                this._updateCamera = true;
	            }
	            if (input_1.default.getInstance().isKeyPressed(38)) {
	                this.processMouseMovement(0.0, 2.5);
	                this._updateCamera = true;
	            }
	            if (input_1.default.getInstance().isKeyPressed(40)) {
	                this.processMouseMovement(0.0, -2.5);
	                this._updateCamera = true;
	            }
	            if (input_1.default.getInstance().isKeyPressed(37)) {
	                this.processMouseMovement(-2.5, 0.0);
	                this._updateCamera = true;
	            }
	            if (input_1.default.getInstance().isKeyPressed(39)) {
	                this.processMouseMovement(2.5, 0.0);
	                this._updateCamera = true;
	            }
	            if (this._updateCamera && callback) {
	                callback();
	            }
	        }
	    }, {
	        key: "processKeyboard",
	        value: function processKeyboard(direction) {
	            var speed = arguments.length <= 1 || arguments[1] === undefined ? 1.0 : arguments[1];
	
	            if (this.timeElapsed > 25) {
	                return;
	            }
	            var velocity = this.movSpeed * this.timeElapsed * speed;
	            if (direction === 0) {
	                this.position = vec3.scaleAndAdd(this.position, this.position, this.front, velocity);
	            } else if (direction === 1) {
	                this.position = vec3.scaleAndAdd(this.position, this.position, this.front, -velocity);
	            } else if (direction === 2) {
	                this.position = vec3.scaleAndAdd(this.position, this.position, this.right, -velocity);
	            } else if (direction === 3) {
	                this.position = vec3.scaleAndAdd(this.position, this.position, this.right, velocity);
	            } else if (direction === 4) {
	                this.position = vec3.scaleAndAdd(this.position, this.position, this.up, velocity);
	            } else if (direction === 5) {
	                this.position = vec3.scaleAndAdd(this.position, this.position, this.up, -velocity);
	            }
	        }
	    }, {
	        key: "processMouseMovement",
	        value: function processMouseMovement(xOffset, yOffset) {
	            xOffset *= this.movSpeed * 2.0 * this.timeElapsed;
	            yOffset *= this.movSpeed * 2.0 * this.timeElapsed;
	            this.yaw += xOffset;
	            this.pitch += yOffset;
	            if (this.pitch > 89.0) {
	                this.pitch = 89.0;
	            }
	            if (this.pitch < -89.0) {
	                this.pitch = -89.0;
	            }
	            this.updateCameraVectors();
	        }
	    }, {
	        key: "updateCameraVectors",
	        value: function updateCameraVectors() {
	            var front = vec3.fromValues(Math.cos(glMatrix.toRadian(this.yaw)) * Math.cos(glMatrix.toRadian(this.pitch)), Math.sin(glMatrix.toRadian(this.pitch)), Math.sin(glMatrix.toRadian(this.yaw)) * Math.cos(glMatrix.toRadian(this.pitch)));
	            this.front = vec3.normalize(this.front, front);
	            this.right = vec3.cross(this.right, this.front, this.worldUp);
	            this.right = vec3.normalize(this.right, this.right);
	            this.up = vec3.cross(this.up, this.right, this.front);
	            this.up = vec3.normalize(this.up, this.up);
	        }
	    }, {
	        key: "GetViewMatrix",
	        value: function GetViewMatrix() {
	            var aux = vec3.create();
	            this.view = mat4.lookAt(this.view, this.position, vec3.add(aux, this.position, this.front), this.up);
	            return this.view;
	        }
	    }, {
	        key: "GetOrthoProjectionMatrix",
	        value: function GetOrthoProjectionMatrix(w, h) {
	            var ymax = 0.001 * Math.tan(45.0 * Math.PI / 360);
	            var ymin = -ymax;
	            var xmin = ymin * (w * 1.0) / (h * 1.0);
	            var xmax = ymax * (w * 1.0) / (h * 1.0);
	            this.proj = mat4.ortho(this.proj, xmin, xmax, ymin, ymax, 0.001, 1000.0);
	            return this.proj;
	        }
	    }, {
	        key: "GetProjectionMatrix",
	        value: function GetProjectionMatrix(w, h) {
	            this.proj = mat4.perspective(this.proj, 45.0, w * 1.0 / (h * 1.0), 0.001, 1000.0);
	            return this.proj;
	        }
	    }]);
	
	    return Camera2;
	}();
	
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Camera2;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var core_1 = __webpack_require__(3);
	"use strict";
	var gl = core_1.default.getInstance().getGL();
	;
	
	var Sampler = function () {
	    function Sampler() {
	        _classCallCheck(this, Sampler);
	
	        this._handle = gl.createSampler();
	    }
	
	    _createClass(Sampler, [{
	        key: "setParams",
	        value: function setParams(params) {
	            if (params.minFilter) {
	                this.parameteri(gl.TEXTURE_MIN_FILTER, params.minFilter);
	            }
	            if (params.magFilter) {
	                this.parameteri(gl.TEXTURE_MAG_FILTER, params.magFilter);
	            }
	            if (params.wrapS) {
	                this.parameteri(gl.TEXTURE_WRAP_S, params.wrapS);
	            }
	            if (params.wrapT) {
	                this.parameteri(gl.TEXTURE_WRAP_T, params.wrapT);
	            }
	            if (params.wrapR) {
	                this.parameteri(gl.TEXTURE_WRAP_R, params.wrapR);
	            }
	            if (params.minLOD) {
	                this.parameterf(gl.TEXTURE_MIN_LOD, params.minLOD);
	            }
	            if (params.maxLOD) {
	                this.parameterf(gl.TEXTURE_MAX_LOD, params.maxLOD);
	            }
	            if (params.compareFunc) {
	                this.parameteri(gl.TEXTURE_COMPARE_FUNC, params.compareFunc);
	            }
	            if (params.compareMode) {
	                this.parameteri(gl.TEXTURE_COMPARE_MODE, params.compareMode);
	            }
	        }
	    }, {
	        key: "bind",
	        value: function bind(unit) {
	            gl.bindSampler(unit, this._handle);
	        }
	    }, {
	        key: "unbind",
	        value: function unbind(unit) {
	            gl.bindSampler(unit, null);
	        }
	    }, {
	        key: "parameteri",
	        value: function parameteri(name, param) {
	            gl.samplerParameteri(this._handle, name, param);
	        }
	    }, {
	        key: "parameterf",
	        value: function parameterf(name, param) {
	            gl.samplerParameterf(this._handle, name, param);
	        }
	    }, {
	        key: "getParameter",
	        value: function getParameter(name) {
	            return gl.getSamplerParameter(this._handle, name);
	        }
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            gl.deleteSampler(this._handle);
	        }
	    }, {
	        key: "isValid",
	        value: function isValid() {
	            return gl.isSampler(this._handle);
	        }
	    }]);
	
	    return Sampler;
	}();
	
	exports.Sampler = Sampler;
	;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var context_1 = __webpack_require__(4);
	"use strict";
	var gl = context_1.default.getContext();
	var TextureType;
	(function (TextureType) {
	    TextureType[TextureType["Nearest"] = gl.NEAREST] = "Nearest";
	    TextureType[TextureType["Linear"] = gl.LINEAR] = "Linear";
	    TextureType[TextureType["Clamp2Edge"] = gl.CLAMP_TO_EDGE] = "Clamp2Edge";
	})(TextureType || (TextureType = {}));
	;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = TextureType;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map