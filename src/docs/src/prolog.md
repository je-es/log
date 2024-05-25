# [@je-es/log](../../../README.md) : Project Log

> This part of the package provides simple functionality for project log proccess.

- #### 🌟 Syntax


    ```ts
    // 📥 IMPORT
    import { setup } from '@je-es/log';

    // 🌠 USE
    setup( { ? } );
    ```

- #### 🌌 Examples

    ```ts
    // Setup the project logger
    setup( { mainDirectory: __dirname } );
    ```

    ```ts
    // 🌟 and more  ..
    ```

---

### API

  | Name                            | Desc                                         |
  | ------------------------------- | -------------------------------------------- |
  | [ProjectLogger](#projectlogger) | Function to log a string into terminal/file. |
  | [setup](#setup)                 | Class to manage the project logger.          |

---

- #### setup

    ```ts
    /**
     * Initializes the global log object with the provided options and logs a debug message.
     *
     * @param {LoggerOptions} options - The options for configuring the logger. Defaults to an empty object.
     * @return {void} This function does not return anything.
    */
    const setup
    = (options: LoggerOptions = { })
    : void
    ```

- #### ProjectLogger

    ```ts
    /**
     * Class to manage the project logger.
     *
     * @param {LoggerOptions} options - The options object.
    */
    class ProjectLogger
    ```

---

> **Made with ❤ by [Maysara Elshewehy](https://github.com/Maysara-Elshewehy)**
