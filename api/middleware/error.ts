import logger from "../utils/logger"

export default function errorMessage(err: any, req: any, res: any, next: any) {
  logger.error(err.message, err);
  res.status(500).send("Server error.");
};
