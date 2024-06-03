/**
 * @name                                    log.ts
 * @description                             log module
*/


/* ---------------------------------------- PACK ----------------------------------------  */

    import { i_log, Helpers, Patterns }     from './tools';
    import * as ansi                        from '@je-es/ansi';
    import * as style                       from '@je-es/style';
    import fs                               from 'fs';
    import path                             from 'path';

/* ---------------------------------------- ---- ----------------------------------------  */


/* ---------------------------------------- TYPE ----------------------------------------  */


/* ---------------------------------------- ---- ----------------------------------------  */


/* ---------------------------------------- CORE ----------------------------------------  */

    /**
     * Logs a message with optional styling and file logging.
     *
     * @param {string} msg - The message to log.
     * @param {i_log} [options={}] - The options for logging.
     * @param {('info' | 'warn' | 'error' | 'debug')} [options.level='info'] - The log level.
     * @param {boolean} [options.minify=false] - Whether to minify the log message.
     * @param {('terminal' | string)} [options.to='terminal'] - The destination for logging.
     *
     * @return {void} This function does not return anything.
    */
    export const log
    = (msg: string, options: i_log = { })
    : void =>
    {
        try
        {
            // set default
            {
                if(!options.level)  options.level   = 'info';
                if(!options.minify) options.minify  = false;
                if(!options.to)     options.to      = 'terminal';
            }

            // styling the message
            if(!Helpers.isBrowser())
            {
                const _msg = msg;

                msg = '';
                msg += style.design(Patterns.time, Helpers.getAT(options.minify)) + ' ';
                msg += style.design(Patterns.location, Helpers.getLoc(options.minify)) + '\n';

                msg += style.design(Patterns.msg(options.level), _msg);

                msg += '\n';
            }

            // terminal
            console.log(msg);

            // file
            if(!(!options.to || options.to === 'terminal'))
            {
                msg = ansi.removeAnsi(msg) + '\n';

                if (!fs.existsSync(path.dirname(options.to)))
                fs.mkdirSync(path.dirname(options.to), { recursive: true });

                if (fs.existsSync(options.to) && fs.statSync(options.to).size > 10 * 1024 * 1024)
                fs.renameSync(options.to, options.to + '.' + new Date().toISOString().replace(/:/g, '-'));

                fs.appendFileSync(options.to, msg);
            }
        }

        catch (err)
        {
            console.error(err);
        }
    }

/* ---------------------------------------- ---- ----------------------------------------  */