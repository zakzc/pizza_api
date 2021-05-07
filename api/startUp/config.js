module.exports = function () {
  if (!process.env.JWT_Key) {
    throw new Error("Fatal Error: no web token key");
  }
};
