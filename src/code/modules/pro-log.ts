/**
 * @name                                    pro-log.ts
 * @description                             Project logger
*/


/* ---------------------------------------- PACK ----------------------------------------  */

    import path                             from 'path';
    import { log }                          from './log';
    import 'dotenv/config';

/* ---------------------------------------- ---- ----------------------------------------  */


/* ---------------------------------------- INIT ----------------------------------------  */

    interface LoggerOptions
    {
        projectName     ?: string;
        mainDirectory   ?: string;
        saveToFile      ?: boolean;
        // saveGlobally    ?: boolean;
    }

    interface logOptions
    {
        filePath        ?: string;
    }

/* ---------------------------------------- ---- ----------------------------------------  */


/* ---------------------------------------- CORE ----------------------------------------  */

    /**
     * Class to manage the project logger.
     *
     * @param {LoggerOptions} options - The options object.
    */
    class ProjectLogger
    {
        options: LoggerOptions;

        /**
         * Set options for the ProjectLogger.
         *
         * @param {LoggerOptions} options - The options object.
         */
        constructor(options: LoggerOptions)
        {
            // set options
            this.options = {
                projectName: options.projectName || 'project',
                mainDirectory: options.mainDirectory || __dirname,
                saveToFile: options.saveToFile !== undefined ? options.saveToFile : true,
            };

            // save main directory globally
            // if(!(options.saveGlobally === false))
            // {
                (global as any).mainDirectory = this.options.mainDirectory;
            // }
        }

        /**
         * Logs a message to the terminal and optionally to a file.
         *
         * @param {string} msg - The message to be logged.
         * @param {logOptions} [options={}] - Optional parameters for logging.
         */
        err
        = (msg: string, options: logOptions = {})
        : void =>
        {
            // terminal
            log(msg,
            {
                level: 'err',
                up: 1,
                minify: true,
            });

            // file
            if (this.options.saveToFile)
            {
                log(msg, {
                    level: 'err',
                    to: options.filePath ? options.filePath : path.join(this.options.mainDirectory!, './logs/errors.log'),
                    up: 1,
                });
            }
        };

        /**
         * Logs a message to the terminal with a debug level.
         *
         * @param {string} msg - The message to log.
         * @param {logOptions} [options={}] - Additional options for the log.
         */
        debug
        = (msg: string, options: logOptions = {})
        : void =>
        {
            if (process.env && process.env.debug && process.env.debug !== 'false')
            {
                // terminal
                log(msg,
                {
                    level: 'debug',
                    up: 1,
                    minify: true,
                });

                // file
                if (this.options.saveToFile)
                {
                    log(msg, {
                        level: 'debug',
                        to: options.filePath ? options.filePath : path.join(this.options.mainDirectory!, './logs/debug.log'),
                        up: 1,
                    });
                }
            }
        };

        /**
         * Logs a message to the terminal with a warn level.
         *
         * @param {string} msg - The message to log.
         * @param {logOptions} [options={}] - Additional options for the log.
         */
        warn
        = (msg: string, options: logOptions = {})
        : void =>
        {
            // terminal
            log(msg,
            {
                level: 'warn',
                up: 1,
                minify: true,
            });

            // file
            if (this.options.saveToFile)
            {
                log(msg, {
                    level: 'warn',
                    to: options.filePath ? options.filePath : path.join(this.options.mainDirectory!, './logs/warn.log'),
                    up: 1,
                });
            }
        };

        /**
         * Logs a message to the terminal with a info level.
         *
         * @param {string} msg - The message to log.
         * @param {logOptions} [options={}] - Additional options for the log.
         */
        log
        = (msg: string, options: logOptions = {})
        : void =>
        {
            // terminal
            log(msg,
            {
                level: 'debug',
                up: 1,
                minify: true,
            });

            // file
            if (this.options.saveToFile)
            {
                log(msg, {
                    level: 'debug',
                    to: options.filePath ? options.filePath : path.join(this.options.mainDirectory!, './logs/info.log'),
                    up: 1,
                });
            }
        };
    }

    /**
     * Initializes the global log object with the provided options and logs a debug message.
     *
     * @param {LoggerOptions} options - The options for configuring the logger. Defaults to an empty object.
     * @return {void} This function does not return anything.
    */
    export const setup
    = (options: LoggerOptions = { })
    : void =>
    {
        (global as any).log = new ProjectLogger(options);

        (global as any).log.debug('Prolog is ready');
    }

/* ---------------------------------------- ---- ----------------------------------------  */