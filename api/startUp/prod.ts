// import helmet = require("helmet");
// const compression = require("compression")
import * as  helmet from "helmet";

export default function prod(app: any): void {
  app.use(helmet());
  //   app.use(compression());
};

// Compression should be commented out for production (not installed yet)
// Helmet can be used on development, as well as production
