const helmet = require("helmet");
// const compression = require("compression")

module.exports = function (app) {
  app.use(helmet());
  //   app.use(compression());
};

// Compression should be commented out for production (not installed yet)
// Helmet can be used on development, as well as production
