const check = require("../models/authorization");

require("dotenv").config();

const ownerships = process.env.OWNERSHIP;

function checkPayload(req, res, next) {
  const result =
    check.find((data) => data.ownership === req.params.ownership) || {};
  res.result = result;
  // ownership validate
  if (Object.keys(result).length == 0) {
    res.send("Ownership not found");
    return;
  }

  // if (!ownerships.includes(req.params.ownership))
  //  res.send("Ownership not found")
  if (Object.keys(req.query).length != 0) {
    //for payload keys validation
    const payloadKeys = Object.keys(req.query);
    const dataKeys = ["olt", "master", "ds", "submaster", "extender"];
    if (
      payloadKeys.every((value) => {
        return dataKeys.includes(value);
      }) == false
    ) {
      res.send("Invalid key");
      return;
    }
  } else if (
    Object.keys(req.query).length == 0 &&
    req.params.ownership != "worldlink"
  ) {
    res.send("Payloads required");
    return;
  }
  next();
}

module.exports = checkPayload;
