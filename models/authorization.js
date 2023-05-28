const check = [
  {
    ownership: "worldlink2",
    access_level: "partial",
    allow: {
      olt: ["JWL"],
      master: [],
      ds: [],
      submaster: [],
      extender: [],
    },
    restrict: {
      olt: [],
      master: [],
      ds: ["1212"],
      submaster: [],
      extender: ["1234"],
    },
  },
  {
    ownership: "worldlink",
    access_level: "full",
  },
];

module.exports = check;
