const rollup = require("rollup");
const build = require("stream-replace-string/build/cjs.cjs");

build(rollup).then(() => {
  console.log("done building");
});
