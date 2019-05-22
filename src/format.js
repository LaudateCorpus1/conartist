const prettier = require("prettier");

function formatCode(code) {
  return prettier.format(code, { parser: "babel" });
}

function formatJson(json) {
  json = typeof json === "string" ? JSON.parse(json) : json;
  return JSON.stringify(json, null, 2);
}

module.exports = {
  formatCode,
  formatJson
};
