const morgan = require("morgan");
const fs = require("fs");
const moment = require("moment-timezone");

const accessLogStream = fs.createWriteStream("./access.log", {
  flags: "a",
});

// const logger = morgan(
//   ":method :status :url :user-agent - :response-time ms :date[web]",
//   {
//     stream: accessLogStream,
//   }
// );

// write in file and console the log
const logger = morgan(
  ":method :status :url :user-agent  - :response-time ms  [:date[Asia/Kathmandu]]",
  {
    stream: {
      write: function (str) {
        accessLogStream.write(str);
        console.log(str);
      },
    },
  }
);

// setting local timezone
morgan.token("date", (req, res, tz) => {
  return moment().tz(tz).format("YYYY-MM-DD HH:mm:ss");
});

module.exports = logger;
