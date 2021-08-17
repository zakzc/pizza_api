import * as logger from "../utils/logger";

module.exports = function () {
  process.on("uncaughtException", (except: any) => {
    logger.error(except.message, except);
    process.exit(1);
  });
  process.on("unhandledRejection", (except) => {
    logger.error(except);
    process.exit(1);
  });
};
