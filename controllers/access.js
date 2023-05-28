const isAllow = require("../services/check");

require("dotenv").config();

async function checkAccess(req, res) {
  const access = isAllow(res.result, req.query);
  res.send({ isAllow: access });
}

module.exports = checkAccess;
