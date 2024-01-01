const fsPromis = require("fs").promises;
const path = require("path");
const fs = require("fs");

async function errorLogger(code, from, message) {
  let time = new Date().toString("en-US", {
    timezone: "asia/calcutta",
  });

  let log = `${time}\t${code}\t${from}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "ERRORS", "logs.txt"))) {
      await fsPromis.mkdir(path.join(__dirname, "ERRORS", "logs.txt"));
    }
    await fsPromis.appendFile(
      path.join(__dirname, "..", "ERRORS", "logs.txt"),
      log
    );
  } catch (error) {
    console.error(error);
  }
}
module.exports = { errorLogger };
