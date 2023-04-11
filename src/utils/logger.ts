//src/utils/logger.ts
import serverLogger from "./serverLogger";
import clientLogger from "./clientLogger";

let logger: typeof clientLogger;

if (typeof window !== "undefined") {
  logger = clientLogger;
} else {
  const { default: serverLogger } = require("./serverLogger");
  logger = serverLogger;
}

export default logger;

