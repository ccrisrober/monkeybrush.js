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

namespace logger {
	let priority: LogLevel = LogLevel.ALL;
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