/**
 * @name                                    tools.ts
 * @description                             tools module
*/


/* ---------------------------------------- PACK ----------------------------------------  */

    import * as ansi                        from '@je-es/ansi';
    import * as style                       from '@je-es/style';
    import fs                               from 'fs';
    import path                             from 'path';

/* ---------------------------------------- ---- ----------------------------------------  */


/* ---------------------------------------- TYPE ----------------------------------------  */

    export interface i_log
    {
        level           ?: 'info' | 'warn' | 'error' | 'debug';
        minify          ?: boolean;
        to              ?: 'terminal' | string;
        up              ?: boolean;
    }

    export interface i_loc
    {
        path            : string;
        line            : number;
        col             : number;
        func            : string;
    }

    export interface i_logger
    {
        root            ?: string;
        save            ?: boolean;
        minify          ?: boolean;
    }

    export interface i_logger_f
    {
        filePath        ?: string;
        save            ?: boolean;
    }

    declare const window        : any;
    declare const navigator     : any;

/* ---------------------------------------- ---- ----------------------------------------  */


/* ---------------------------------------- CORE ----------------------------------------  */

    export const Helpers   =
    {
        isBrowser: (): boolean =>
        {
            return (typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof navigator !== 'undefined');
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

        getLoc: function (minify: boolean, up ?: boolean): i_loc
        {
            // default level of stack
            const level = up ? 5 : 4;

            const _getPos = (level: number): i_loc =>
                {
                const loc: i_loc = {
                    path: '',
                    line: 0,
                    col: 0,
                    func: ''
                };

                const stackTrace = (new Error()).stack?.split('\n');
                const callerInfo = stackTrace ? stackTrace[level]?.match(/at\s+(.*)\s+\((.*):(\d+):(\d+)\)/) : null;

                if (callerInfo) {
                    loc.path = callerInfo[2];
                    loc.line = parseInt(callerInfo[3]);
                    loc.col = parseInt(callerInfo[4]);
                    loc.func = callerInfo[1].trim();
                }

                return loc;
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

        getColor
        : (type: 'info' | 'warn' | 'error' | 'debug')
        : string =>
        {
            let color = '';

            switch(type)
            {
                case 'info'     : color = 'cyan'; break;
                case 'warn'     : color = 'yellow'; break;
                case 'error'    : color = 'red'; break;
                case 'debug'    : color = 'magenta'; break;
            }

            return color;
        }
    };

    export const Patterns  =
    {
        time       :
        {
            name        : 'time',
            style       :
            {
                prefix      : { val: '[', fg: 'grey' },
                suffix      : { val: ']', fg: 'grey' },
                fg          : 'grey',
            }
        },

        location    :
        [
            {
                name        : 'path',
                style       :
                {
                    prefix      : { val: '[', fg: 'grey' },
                    fg          : 'blue',
                },
                autoEnd     : false,
            },

            {
                name        : 'line',
                style       :
                {
                    prefix      : { val: ':', fg: 'grey' },
                    fg          : 'yellow',
                },
                autoEnd     : false,
            },

            {
                name        : 'col',
                style       :
                {
                    prefix      : { val: ':', fg: 'grey' },
                    fg          : 'yellow',
                },
                autoEnd     : false,
            },

            {
                name        : 'func',
                style       :
                {
                    prefix      : { val: ':', fg: 'grey' },
                    suffix      : { val: ']', fg: 'grey' },
                    fg          : 'magenta',
                },
                autoEnd     : false,
            },
        ],

        msg
        : (type: 'info' | 'warn' | 'error' | 'debug')
        : style.t_pattern =>
        {
            return {
                name        : 'title',
                style       :
                {
                    prefix      : { val: '==> ', fg: 'grey' },
                    fg          : Helpers.getColor(type),
                    attr        : 'bold',
                }
            };
        }
    };

/* ---------------------------------------- ---- ----------------------------------------  */