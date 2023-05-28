const express = require("express");
const checkAccess = require("../controllers/access");
const checkPayload = require("../middlewares/checkPayloads");
const router = express.Router();

router.get("/:ownership/is_allow", checkPayload, checkAccess);

module.exports = router;
