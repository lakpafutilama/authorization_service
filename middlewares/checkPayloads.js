const { loggerError } = require("../logger/logs");
const check = require("../models/authorization");

function checkPayload(req, res, next) {
  const result =
    check.find((data) => data.ownership === req.params.ownership) || {};
  res.result = result;

  // ownership validate
  if (Object.keys(result).length == 0) {
    const message = "Ownership not found";
    res.status(404).send(message);
    loggerError("checkPayload", req, message, res);
    return;
  }

  if (
    Object.keys(req.query).length == 0 &&
    req.params.ownership != "worldlink"
  ) {
    const message = "Payloads required";
    res.status(400).send(message);
    loggerError("checkPayload", req, message, res);
    return;
  } else if (Object.keys(req.query).length != 0) {
    //for payload keys validation
    const payloadKeys = Object.keys(req.query);
    const dataKeys = ["olt", "master", "ds", "submaster", "extender"];
    if (
      payloadKeys.every((value) => {
        return dataKeys.includes(value);
      }) == false
    ) {
      const message = "Invalid key";
      res.send(message);
      loggerError("checkPayload", req, message, res);
      return;
    }
  }
  next();
}

module.exports = checkPayload;
