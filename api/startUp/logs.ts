import Logger from "../utils/logger";

export default function (): void {
  process.on("uncaughtException", (except: any) => {
    Logger.error(except.message, except);
    process.exit(1);
  });
  process.on("unhandledRejection", (except) => {
    Logger.error(except);
    process.exit(1);
  });
};
