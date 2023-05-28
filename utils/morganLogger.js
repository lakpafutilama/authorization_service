const morgan = require("morgan");
const fs = require("fs");

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
  ":method :status :url :user-agent  - :response-time ms  [:date[web]]",
  {
    stream: {
      write: function (str) {
        accessLogStream.write(str);
        console.log(str);
      },
    },
  }
);

module.exports = logger;
