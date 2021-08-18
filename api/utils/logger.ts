import {createLogger, format, transports} from "winston";
const { combine, colorize, timestamp, prettyPrint, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp}: ${level}\n  => ${message}`;
});

let logTransport: any;
let logLevel: string;
if (process.env.NODE_ENV === "development") {
  logTransport = [new transports.Console()];
  logLevel = "info";
} else {
  logTransport = [new transports.File({ filename: "logFile.log" })];
  logLevel = "error";
}

const logger: any = createLogger({
  level: logLevel,
  format: combine(
    format.colorize(),
    timestamp({ format: "HH:mm:ss" }),
    myFormat,
    format.errors({ stack: true })
  ),
  transports: logTransport,
});

export default logger;
