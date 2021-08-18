import * as mongoose from "mongoose";
/// variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// const logger = require("../utils/logger");

export default function makeConnection():void {
  const mongooseURI: string =
    process.env.NODE_ENV === "test"
      ? process.env.MONGOOSE_TEST_DB
      : process.env.MONGOOSE_URI;
  // const mongooseURI = process.env.MONGOOSE_URI;
  const mongooseOptions: object =
    process.env.NODE_ENV === "test"
      ? { useNewUrlParser: true, useUnifiedTopology: false }
      : { useNewUrlParser: true, useUnifiedTopology: true };

   mongoose
    .connect(mongooseURI, mongooseOptions)
    .then(() => {
      console.info("\nMongoose connected to: " + mongooseURI + "\n");
    })
    .catch((err) =>
      console.error(
        "Error on connection to:/n",
        mongooseURI,
        "\n Error: \n",
        err
      )
    );
};
