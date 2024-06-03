/**
 * @name                                    log.ts
 * @description                             log module
*/


/* ---------------------------------------- PACK ----------------------------------------  */

    import { i_logger, i_logger_f,  Helpers } from './tools';
    import { log }                          from './log';
    import path                             from 'path';

/* ---------------------------------------- ---- ----------------------------------------  */


/* ---------------------------------------- CORE ----------------------------------------  */

    /**
     * Logger class.
     *
     * @param {i_logger} options - The options object.
    */
    export class logger
    {
        options: i_logger;

        /**
         * Set options for the ProjectLogger.
         *
         * @param {i_logger} options - The options object.
        */
        constructor(options: i_logger)
        {
            // set options
            this.options =
            {
                root    : options.root || __dirname,
                save    : options.save !== undefined ? options.save : true,
                minify  : options.minify !== undefined ? options.minify : false,
            };
        }

        /**
        * Logs a message to the terminal and optionally to a file.
        *
        * @param {string} msg - The message to be logged.
        * @param {i_logger_f} [options={}] - Optional parameters for logging.
        */
        error
        = (msg: string, options: i_logger_f = {})
        : void =>
        {
            // file + terminal
            if((options.save || (typeof options.save === 'undefined' && this.options.save)))
            log(msg,
            {
                minify: this.options.minify,
                level: 'error',
                to: options.filePath ? options.filePath : path.join(this.options.root!, './logs/errors.log'),
            });

            // terminal
            else
            log(msg,
                {
                    level: 'error',
                    minify: true,
                });
        };

        /**
        * Logs a message to the terminal with a debug level.
        *
        * @param {string} msg - The message to log.
        * @param {i_logger_f} [options={}] - Additional options for the log.
        */
        debug
        = (msg: string, options: i_logger_f = {})
        : void =>
        {
            if (process.env && process.env.debug && process.env.debug !== 'false')
            {
                // file + terminal
                if((options.save || (typeof options.save === 'undefined' && this.options.save)))
                log(msg,
                {
                    minify: this.options.minify,
                    level: 'debug',
                    to: options.filePath ? options.filePath : path.join(this.options.root!, './logs/debug.log'),
                });

                // terminal
                else
                log(msg,
                {
                    level: 'debug',
                    minify: true,
                });
            }
        };

        /**
        * Logs a message to the terminal with a warn level.
        *
        * @param {string} msg - The message to log.
        * @param {i_logger_f} [options={}] - Additional options for the log.
        */
        warn
        = (msg: string, options: i_logger_f = {})
        : void =>
        {
            // file + terminal
            if((options.save || (typeof options.save === 'undefined' && this.options.save)))
            log(msg,
            {
                minify: this.options.minify,
                level: 'warn',
                to: options.filePath ? options.filePath : path.join(this.options.root!, './logs/warn.log'),
            });

            // terminal
            else
            log(msg,
            {
                level: 'warn',
                minify: true,
            });
        };

        /**
        * Logs a message to the terminal with a info level.
        *
        * @param {string} msg - The message to log.
        * @param {i_logger_f} [options={}] - Additional options for the log.
        */
        info
        = (msg: string, options: i_logger_f = {})
        : void =>
        {
            // file + terminal
            if((options.save || (typeof options.save === 'undefined' && this.options.save)))
            log(msg,
            {
                minify: this.options.minify,
                level: 'info',
                to: options.filePath ? options.filePath : path.join(this.options.root!, './logs/info.log'),
            });

            // terminal
            else
            log(msg,
            {
                level: 'info',
                minify: true,
            });
        };
    }

/* ---------------------------------------- ---- ----------------------------------------  */