import * as winston from 'winston';
import * as colors from 'colors';
import { LEVEL } from 'triple-beam';
import * as util from 'util';
import {
    winstonFileName,
    winstonDirName
} from "../config/winston.config"


import * as fs from "fs"

if (!fs.existsSync(winstonDirName)) {
    fs.mkdirSync(winstonDirName)
}

export class Logger {


    public static toString(msgs: any): string {
        if (typeof msgs === 'string') {
            return msgs;
        }

        const mm: any[] = [];

        for (const m of msgs) {
            mm.push(util.format(m));
        }

        return mm.join(' ');
    }

    public static getLogger(name: string): Logger {
        return new Logger(name);
    }

    public myFormat:any  = winston.format.printf((info) => {
        return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    });

    public options: winston.LoggerOptions = {
        exitOnError: false,
        level: 'debug',
    };

    public logger: winston.Logger;

    private name: string;

    private colormap: any = {
        debug: colors.gray,
        info: colors.cyan, // (msg: string):string => { return msg; },
        warn: colors.magenta,
        error: colors.red
    };

    constructor(name: string) {
        this.name = name;

        this.options.format = winston.format.combine(
            winston.format((info) => {
                info.level = info.level.toUpperCase();

                return info;
            })(),
            // winston.format.colorize({ all: true }),
            winston.format.timestamp({ format: 'MMM DD hh:mm:ss' }),
            winston.format.label({ label: name }),
            winston.format.printf((info) => {
                return this.logprint(info);
            })
        );
        this.options.transports = [
            new winston.transports.Console(),
            new winston.transports.File({
                dirname: winstonDirName,
                filename: `${this.name}-${winstonFileName}`
            })
        ];

        this.logger = winston.createLogger(this.options);
    }

    public logprint(info: any): string {

        const colorize: any = this.colormap[info[LEVEL]] || colors.zebra;

        let logmsg: string = [  `${colors.yellow(info.timestamp)}`,
                                `[${colors.green(info.label)}]`,
                                `${colorize(info.level)}: `]
                                .join(" ");

        logmsg += colorize(Logger.toString(info.message));

        return logmsg;
    }

    get logopts(): any {
        return this.options;
    }

    public debug(format: any, ...params: any[]): void {
        this.logger.debug([format].concat(params));
    }

    public info(format: any, ...params: any[]): void {
        this.logger.info([format].concat(params));
    }

    public warn(format: any, ...params: any[]): void {
        this.logger.warn([format].concat(params));
    }

    public error(format: any, ...params: any[]): void {
        this.logger.error([format].concat(params));
    }
}