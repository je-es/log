# [@je-es/log](../../../README.md) : Log

> This part of the package provides simple functionality for logging to terminal/file.

- #### 🌟 Syntax


    ```ts
    // 📥 IMPORT
    import { log } from '@je-es/log';

    // 🌠 USE
    log ( '?', { ? } );
    ```

- #### 🌌 Examples

    ```ts
    // Log to terminal
    log ( ' ? ' );
    ```

    ```ts
    // Log to file
    log ( ' ? ', { to: './logs/errors.log', level: 'err' });
    ```

    ```ts
    // 🌟 and more  ..
    ```
---

### API

  | Name                      | Desc                                         |
  | ------------------------- | -------------------------------------------- |
  | [log](#log)               | Function to log a string into terminal/file. |
  | [err](#err)               | Function to log as error.                    |
  | [warn](#warn)             | Function to log as warning.                  |
  | [debug](#debug)           | Function to log as debug.                    |
  | [logOptions](#logoptions) | Interface for the log function options.      |

---

- #### log

    ```ts
    /**
     * A function that logs a message to the terminal or a file based on the provided options.
     *
     * @param {string} msg                  - The message to be logged
     * @param {logOptions} [options={}]     - The options object to configure the logging behavior
     * @returns {void | boolean}            - Returns void if the message is successfully logged, otherwise returns false
    */
    export const log
    = (msg: string, options: logOptions = {})
    : void | boolean
    ```

- #### err

    ```ts
    /**
     * Logs an error message to the terminal or a file.
     *
     * @param {string} msg - The error message to be logged.
     * @return {void | boolean} Returns void if the message is successfully logged, otherwise returns false.
    */
    export const err
    = (msg: string)
    : void | boolean
    ```

- #### warn

    ```ts
    /**
     * Logs a warning message to the terminal or a file.
     *
     * @param {string} msg - The warning message to be logged.
     * @return {void | boolean} Returns void if the message is successfully logged, otherwise returns false.
    */
    export const warn
    = (msg: string)
    : void | boolean
    ```

- #### debug

    ```ts
    /**
     * Logs a debug message to the terminal or a file.
     *
     * @param {string} msg - The debug message to be logged.
     * @return {void | boolean} Returns void if the message is successfully logged, otherwise returns false.
    */
    export const debug
    = (msg: string)
    : void | boolean
    ```

- ##### logOptions

    ```ts
    /**
     * Options for the log function.
        *
        * @param {string} title       - The title of the message
        * @param {string} tcolor      - The color of the title
        * @param {string} level       - The level of the message
        * @param {string} to          - The destination of the message
        * @param {boolean} minify     - Whether to minify the message
    */
    export interface logOptions
    {
        title       ?: string;
        tcolor      ?: string;
        level       ?: 'err' | 'log' | 'debug' | 'warn';
        to          ?: string;
        minify      ?: boolean;
    }
    ```

---

> **Made with ❤ by [Maysara Elshewehy](https://github.com/Maysara-Elshewehy)**
