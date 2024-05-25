/**
 * @name                                    log.ts
 * @description                             ?
*/


/* ---------------------------------------- PACK ----------------------------------------  */

    import fs                               from 'fs';
    import path                             from 'path';
    import { removeAnsiCodes }              from '@je-es/ansi';
    import { combine }                      from '@je-es/style';
    import * as Patterns                    from './patterns';

/* ---------------------------------------- ---- ----------------------------------------  */


/* ---------------------------------------- INIT ----------------------------------------  */

    /**
     * Options for the log function.
     *
     * @param {string} title       - The title of the message
     * @param {string} tcolor      - The color of the title
     * @param {string} level       - The level of the message
     * @param {string} to          - The destination of the message
     * @param {boolean} minify     - Whether to minify the message
     * @param {number} up          - The number of stack-levels to go up
    */
    export interface logOptions
    {
        title       ?: string;
        tcolor      ?: string;
        level       ?: 'err' | 'log' | 'debug' | 'warn';
        to          ?: string;
        minify      ?: boolean;
        up          ?: number;
    }

    // Position of the function call in the code.
    export interface PositionOptions
    {
        path        : string;
        line        : number;
        col         : number;
        func        : string;
    }

    declare const window: any;
    declare const document: any;
    declare const navigator: any;

/* ---------------------------------------- ---- ----------------------------------------  */


/* ---------------------------------------- CORE ----------------------------------------  */

    /**
     * A function that logs a message to the terminal or a file based on the provided options.
     *
     * @param {string} msg                  - The message to be logged
     * @param {logOptions} [options={}]     - The options object to configure the logging behavior
     * @returns {void | boolean}            - Returns void if the message is successfully logged, otherwise returns false
    */
    export const log
    = (msg: string, options: logOptions = {})
    : void | boolean =>
    {
        // set default options
        {
            options.level           = options.level                         || 'log';
            options.to              = options.to                            || 'terminal';
            options.minify          = options.minify                        || false;
        }

        // create log message
        let     logMsg          = '';
        {
            const   pos             = Helpers.getPos(options.minify, options.up ? 1 : 0);
            const   at              = Helpers.getAT(options.minify);
            // const isBrowser =
            logMsg += combine
            (
                [
                    {
                        pattern: Patterns.inBraceketsPattern,
                        msg: at,
                    },

                    { pattern: Patterns.spacePattern, },

                    {
                        pattern: Patterns.positionPattern,
                        values: { 'path': pos.path, 'line': pos.line + '', 'col': pos.col + '', 'func': pos.func }
                    },

                    { pattern: Patterns.newLinePattern, },

                    {
                        pattern: options.level == 'err' ? Patterns.messageErrPattern : options.level == 'warn' ? Patterns.messageWarnPattern : options.level == 'debug' ? Patterns.messageDebugPattern : Patterns.messageLogPattern,
                        msg: msg
                    },

                    { pattern: Patterns.newLinePattern, },
                ]
            );
        }

        // log message
        {
            // clean ANSI codes if needed
            if((typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof navigator !== 'undefined') || options.to != 'terminal')
            logMsg = removeAnsiCodes(logMsg);

            if (options.to === 'terminal')
            {
                console.log(logMsg);
            }

            else
            {
                if (!fs.existsSync(path.dirname(options.to)))
                fs.mkdirSync(path.dirname(options.to), { recursive: true });

                if (fs.existsSync(options.to) && fs.statSync(options.to).size > 10 * 1024 * 1024)
                fs.renameSync(options.to, options.to + '.' + new Date().toISOString().replace(/:/g, '-'));

                fs.appendFileSync(options.to, logMsg + '\n');
            }
        }
    };

    /**
     * Logs an error message to the terminal or a file.
     *
     * @param {string} msg - The error message to be logged.
     * @return {void | boolean} Returns void if the message is successfully logged, otherwise returns false.
    */
    export const err
    = (msg: string)
    : void | boolean => log(msg, { level: 'err' });

    /**
     * Logs a warning message to the terminal or a file.
     *
     * @param {string} msg - The warning message to be logged.
     * @return {void | boolean} Returns void if the message is successfully logged, otherwise returns false.
    */
    export const warn
    = (msg: string)
    : void | boolean => log(msg, { level: 'warn' });

    /**
     * Logs a debug message to the terminal or a file.
     *
     * @param {string} msg - The debug message to be logged.
     * @return {void | boolean} Returns void if the message is successfully logged, otherwise returns false.
    */
    export const debug
    = (msg: string)
    : void | boolean => log(msg, { level: 'debug' });

/* ---------------------------------------- ---- ----------------------------------------  */


/* ---------------------------------------- HELP ----------------------------------------  */

    const Helpers =
    {
        getTitle: function (options: logOptions): string
        {
            if (options.title) return options.title;
            if (options.level) return options.level.toUpperCase();
            return 'NONE';
        },

        getTitleColor: function (options: logOptions): string
        {
            if (options.tcolor) return options.tcolor;

            const title = this.getTitle(options);

            const titleColorMap: { [key: string]: string } = {
                'INFO': 'green',
                'LOG': 'green',
                'SUCCESS': 'green',
                'OK': 'green',
                'DEBUG': 'cyan',
                'ERROR': 'red',
                'FAIL': 'red',
                'NO': 'red',
                'WARN': 'yellow',
            };

            return titleColorMap[title] || 'white';
        },

        getAT: function (minify: boolean): string
        {
            const _getTime = (): string => {
                const date = new Date();
                const _hh = date.getHours();
                const mm = date.getMinutes();
                const ss = date.getSeconds();
                const am_pm = _hh >= 12 ? 'PM' : 'AM';
                const hh = _hh % 12;

                return (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss) + ' ' + am_pm;
            };

            const _getDate = (): string => {
                const date = new Date();
                const yyyy = date.getFullYear();
                const mm = date.getMonth() + 1;
                const dd = date.getDate();
                return yyyy + '-' + (mm < 10 ? '0' + mm : mm) + '-' + (dd < 10 ? '0' + dd : dd);
            };

            if (minify) return _getTime();
            return _getDate() + ' ' + _getTime();
        },

        getPos: function (minify: boolean, level: number = 0): PositionOptions
        {
            // default level of stack
            level += 4;

            const _getPos = (level: number): PositionOptions =>
                {
                const pos: PositionOptions = {
                    path: '',
                    line: 0,
                    col: 0,
                    func: ''
                };

                const stackTrace = (new Error()).stack?.split('\n');
                const callerInfo = stackTrace ? stackTrace[level]?.match(/at\s+(.*)\s+\((.*):(\d+):(\d+)\)/) : null;

                if (callerInfo) {
                    pos.path = callerInfo[2];
                    pos.line = parseInt(callerInfo[3]);
                    pos.col = parseInt(callerInfo[4]);
                    pos.func = callerInfo[1].trim();
                }

                return pos;
            };

            const _minifyPath = (path: string, fully: boolean = true): string =>
                {
                const parts = path.split(/[\\\/]/);

                if (parts.length < 4) return path;
                if (fully) return parts[parts.length - 1];

                return '...' + '\\' + parts.slice(-3).join('\\');
            };

            let pos = _getPos(level);

            if (minify) {
                pos.path = _minifyPath(pos.path);
            }

            return pos;
        },
    };

/* ---------------------------------------- ---- ----------------------------------------  */