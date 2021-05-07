const mongoose = require("mongoose");
const tokenFunc = require("../../utils/tokenFunc");
const jwt = require("jsonwebtoken");

describe("Authentication token", () => {
  it("should return a valid JWT", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: false,
    };
    const testToken = tokenFunc(payload);
    const decoded = jwt.verify(testToken, process.env.JWT_Key);
    expect(decoded).toMatchObject(payload);
  });
});
