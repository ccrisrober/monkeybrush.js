// TODO: Add priority checking

"use strict";

enum LogLevel {
	ALL,
	DEBUG,
	ERROR,
	WARN,
	INFO,
	OFF
};
/**
namespace logger {
	let priority: LogLevel = LogLevel.ALL;
	//export function trace(...args: string[]) {
	//	console.trace("", args);
	//}
	export function log(...args: string[]) {
		console.log(args);
	}
	export function debug(...args: string[]) {
		console.debug("", args);
	}
	export function warn(...args: string[]) {
		console.warn(args);
	}
	export function info(...args: string[]) {
		console.info(args);
	}
	export function error(...args: string[]) {
		console.error(args);
	}
	export function setPriority(p: LogLevel) {
		priority = p;
	}
}
/**/
/**
namespace logger {
	function _noop() {};
	export var logger = {};
	var _levels = ["trace", "debug", "info", "warn", "error", "fatal"];
	var _currLevel = _levels[2];
	function _shouldLog(level: string) {
		return _levels.indexOf(level) >= _levels.indexOf(_currLevel);
	}
	_levels.forEach((level: string) => {
		logger[level] = _shouldLog(level) ? log: _noop;
		function log() {
			var prefix: any = "";
			var normalizedLevel;
			switch (level) {
				case "trace": 
					normalizedLevel = "info"; 
					break
				case "debug": 
					normalizedLevel = "info"; 
					break
				case "fatal": 
					normalizedLevel = "error"; 
					break
				default: normalizedLevel = level
			}
			if (prefix) {
				if (typeof prefix === 'function') prefix = prefix()
				//arguments[0] = util.format(prefix, arguments[0])
			}
			//console[normalizedLevel](util.format.apply(util, arguments))
		}
	});
}
/**/