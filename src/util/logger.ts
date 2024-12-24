import { ensureDirSync } from '@std/fs';
import * as log from '@std/log';
import serverConfig from '../serverConfig.ts';

await log.setup({
    handlers: {
        console: new log.ConsoleHandler('DEBUG', {
            formatter: (rec) => `${rec.levelName} ${rec.msg}`,
        }),
        file: new log.RotatingFileHandler('INFO', {
            filename: './logs/logs.txt',
            maxBytes: 15000,
            maxBackupCount: 5,
            formatter: (rec) => {
                try {
                    return JSON.stringify({
                        time: rec.datetime,
                        level: rec.levelName,
                        data: rec.msg,
                    });
                } catch (err) {
                    return rec.msg;
                }
            },
        }),
    },
    loggers: {
        development: {
            level: 'DEBUG',
            handlers: ['console'],
        },
        production: {
            level: 'INFO',
            handlers: ['file', 'console'],
        },
    },
});

ensureDirSync('./logs');

const logger = log.getLogger(serverConfig.ENV);
if (logger.handlers.length === 0) {
    console.error(`NO LOGGER REGISTERED !!!`);
}

export default logger;
