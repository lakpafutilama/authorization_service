const { add, createLogger, format, transports, config } = require("winston");
const { combine, timestamp, simple, printf } = format;

require("dotenv").config();
require("winston-syslog").Syslog;

const zone = process.env.TIMEZONE;

const timezoned = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: zone,
  });
};

const logger = createLogger({
  levels: config.syslog.levels,
  format: combine(
    timestamp({ format: timezoned }),
    simple(),
    printf(
      (info) =>
        `${info.level.toUpperCase()} : ${info.message} [${[info.timestamp]}]`
    )
  ),
  transports: [
    new transports.Syslog(),
    new transports.File({ filename: "logs/logs.log" }),
    new transports.File({ level: "error", filename: "logs/errors.log" }),
  ],
});

const loggerInfo = (functionName, req, response, res) => {
  const log = JSON.stringify({
    method: req.method.toUpperCase(),
    url: req.originalUrl,
    statusCode: res.statusCode,
    payload: req.body,
    function: functionName,
    response,
  });
  logger.info(log);
  return;
};
const loggerError = (functionName, req, message, res) => {
  const log = JSON.stringify({
    method: req.method.toUpperCase(),
    url: req.originalUrl,
    statusCode: res.statusCode,
    payload: req.body,
    function: functionName,
    message,
  });
  logger.error(log);
  return;
};

module.exports = { logger, loggerInfo, loggerError };
