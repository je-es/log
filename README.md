# [@je-es](https://github.com/je-es)/log

> Designed specifically for Node.js environments, offers a robust logging solution to streamline event tracking and debugging processes.



- #### 📥 Usage

    ```Bash
    npm i @je-es/log
    ```

- #### 🌟 Syntax

    ```ts
    import { log } from '@je-es/log';

    log(' ? ',
    {
        level           ?: 'info' | 'warn' | 'error' | 'debug';
        minify          ?: boolean;
        to              ?: 'terminal' | string;
    });
    ```

    ```ts
    import { logger } from '@je-es/log';

    const logger = new logger(
    {
        root            ?: string;  // the main directory
        save            ?: boolean; // save logs to files ?
    });

    logger.<info|warn|error|debug>(' ? ',
    {
        filePath        ?: string;  // default is : root + /logs/level.log
        save            ?: boolean; // ignore logger.save
    });
    ```

---

### Documentation

  - [API](./src/docs/src/api.md)

---

> **Made with ❤ by [Maysara Elshewehy](https://github.com/Maysara-Elshewehy)**