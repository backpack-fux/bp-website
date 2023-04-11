//src/utils/serverLogger.ts
import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const consoleTransport = new transports.Console({
  format: format.simple(),
});

const fileTransport = new transports.File({
  filename: "logs/server.log",
  format: combine(timestamp(), myFormat),
});

const serverLogger = createLogger({
  level: "info",
  format: combine(timestamp(), myFormat),
  transports: [consoleTransport, fileTransport],
});

export default serverLogger;
