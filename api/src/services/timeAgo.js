const TimeAgo = require("javascript-time-ago");
const es = require("javascript-time-ago/locale/es.json");

TimeAgo.addDefaultLocale(es);

const timeAgo1 = new TimeAgo("es");
const result = timeAgo1.format(Date.now() - 60 * 1000);
console.log("timeAgo", result);
