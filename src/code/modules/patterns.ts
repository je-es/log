import { patternType} from '@je-es/style';

export const inBraceketsPattern : patternType =
[
    [
        {
            options:
            {
                prefix  : { value: '[', style: { fg: '#222' } },
                suffix  : { value: ']', style: { fg: '#222' } },
                ansi    : {  fg: '#222' }
            }
        }
    ]
];

export const messageErrPattern : patternType =
[
    [
        {
            options:
            {
                prefix  : { value: '==> ', style: { fg: 'red' } },
                ansi    : {  fg: 'white' }
            }
        }
    ]
];

export const messageLogPattern : patternType =
[
    [
        {
            options:
            {
                prefix  : { value: '==> ', style: { fg: 'white' } },
                ansi    : {  fg: 'white' }
            }
        }
    ]
];


export const messageDebugPattern : patternType =
[
    [
        {
            options:
            {
                prefix  : { value: '==> ', style: { fg: 'cyan' } },
                ansi    : {  fg: 'white' }
            }
        }
    ]
];


export const messageWarnPattern : patternType =
[
    [
        {
            options:
            {
                prefix  : { value: '==> ', style: { fg: 'yellow' } },
                ansi    : {  fg: 'white' }
            }
        }
    ]
];

export const positionPattern : patternType =
[
    [
        {
            value: '[',
            options: { ansi: { fg: '#222' }, },
        },

        {
            gvalue: 'path',
            options: { ansi: { fg: 'blue' }, },
        },

        {
            value: ':',
            options: { ansi: { fg: '#222' }, },
        },

        {
            gvalue: 'line',
            options: { ansi: { fg: 'yellow' }, },

        },

        {
            value: ':',
            options: { ansi: { fg: '#222' }, },
        },

        {
            gvalue: 'col',
            options: { ansi: { fg: 'yellow' }, },

        },

        {
            value: ' ',
            options: { ansi: { fg: '#222' }, },
        },

        {
            gvalue: 'func',
            options: { ansi: { fg: 'magenta' }, },
        },

        {
            value: ']',
            options: { ansi: { fg: '#222' }, },
        },
    ]
];


export const spacePattern : patternType =
[
    [
        {
            value: ' ',
            options: {  },
        },
    ]
];
export const newLinePattern : patternType =
[
    [
        {
            value: '\n',
            options: {  },
        },
    ]
];

