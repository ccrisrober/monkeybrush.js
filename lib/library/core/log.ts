/// <reference path="../../typings/log4javascript.d.ts" />

//var log = log4javascript.getDefaultLogger();
//log.setLevel(log4javascript.Level.INFO);

var consoleAppender, logger;
logger = log4javascript.getLogger('my_logger');
consoleAppender = new log4javascript.BrowserConsoleAppender();
logger.addAppender(consoleAppender);

export default logger;
