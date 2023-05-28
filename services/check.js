const isAllow = (data, payloads) => {
  if (data.access_level == "full") {
    return true;
  }
  let check;
  const payloadKey = Object.keys(payloads);
  for (key of payloadKey) {
    // console.log(key);
    if (key == "olt") check = checkOlt(data, payloads[key]);
    else if (key == "master") check = checkMaster(data, payloads[key]);
    else if (key == "ds") check = checkDs(data, payloads[key]);
    else if (key == "submaster") check = checkSubmaster(data, payloads[key]);
    else if (key == "extender") check = checkExtender(data, payloads[key]);
    if (check === false) break;
    else check = true;
  }
  return check;
};

function checkOlt(data, payload) {
  if (Object.keys(data.allow.olt).length) {
    if (data.restrict.olt.includes(payload)) return false;
  } else {
    if (!data.allow.olt.includes(payload)) return false;
  }
}

function checkMaster(data, payload) {
  if (Object.keys(data.allow.master).length == 0) {
    if (data.restrict.master.includes(payload)) return false;
  } else {
    if (!data.allow.master.includes(payload)) return false;
  }
}

function checkDs(data, payload) {
  if (Object.keys(data.allow.ds).length == 0) {
    if (data.restrict.ds.includes(payload)) return false;
  } else {
    if (!data.allow.ds.includes(payload)) return false;
  }
}

function checkSubmaster(data, payload) {
  if (Object.keys(data.allow.submaster).length == 0) {
    if (data.restrict.submaster.includes(payload)) return false;
  } else {
    if (!data.allow.submaster.includes(payload)) return false;
  }
}

function checkExtender(data, payload) {
  if (Object.keys(data.allow.extender).length == 0) {
    if (data.restrict.extender.includes(payload)) return false;
  } else {
    if (!data.allow.extender.includes(payload)) return false;
  }
}

module.exports = isAllow;
