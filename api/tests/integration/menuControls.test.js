const request = require("supertest");
const DB_Data = require("../../models/menuModels");
const User_Data = require("../../models/userModels");
const tokenFunc = require("../../utils/tokenFunc");

let server;
const baseURL = "/menu_api/pizzaMenu/";

describe("Integration test: Menu", () => {
  ///
  beforeEach(() => {
    server = require("../../../index");
  });

  afterEach(async () => {
    server.close();
    await DB_Data.deleteOne({});
  });
  ///
  describe("Get method for /", () => {
    it("should return complete collection of items", async () => {
      DB_Data.collection.insertMany([
        { name: "test1", price: 1, ingredients: ["test1"] },
        { name: "test2", price: 2, ingredients: ["test2"] },
      ]);
      const res = await request(server).get(baseURL + "getMenu");
      expect(res.status).toBe(200);
      expect(res.body.length).not.toBe(0);
      expect(res.body.some((g) => g.name === "test1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "test2")).toBeTruthy();
    });
  });
  ///
  describe("Get method for /:id", () => {
    it("should return one specific item", async () => {
      const item = new DB_Data({
        name: "Test3",
        price: 3,
        ingredients: ["test3"],
      });
      await item.save();
      const res = await request(server).get(baseURL + "getItem/" + item._id);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", item.name);
    });
    it("should return 404 for invalid id", async () => {
      const res = await request(server).get(baseURL + "getItem/1234");
      expect(res.status).toBe(404);
    });
  });

  describe("Post method for posting new item", () => {
    let token;
    beforeEach(async () => {
      const existingUser = await User_Data.findOne({
        email: "john@smith.com",
      });
      token = tokenFunc({
        _id: existingUser._id,
        isAdmin: false,
      });
    });
    ///
    const call = async (payload) => {
      return await request(server)
        .post(baseURL + "addPizza")
        .set("x-auth-token", token)
        .send(payload);
    };
    ///
    it("should return 401 for user not logged in", async () => {
      token = " ";
      const res = await call({
        name: "Test4",
        price: 4,
        ingredients: ["test4"],
      });
      expect(res.status).toBe(401);
    });
    it("should return 400 if data is too short", async () => {
      const res = await call({
        name: "T4",
        price: 4,
        ingredients: ["test4"],
      });
      expect(res.status).toBe(400);
    });
    it("should return 400 if data is too long", async () => {
      const longString = new Array(102).join("a");
      const res = await call({
        name: longString,
        price: 4,
        ingredients: ["test4"],
      });
      expect(res.status).toBe(400);
    });
    it("should return 400 if data is too short", async () => {
      const res = await call({
        name: "T4",
        price: 4,
        ingredients: ["test4"],
      });
      expect(res.status).toBe(400);
    });
    it("should save the data", async () => {
      const res = await call({
        name: "test5",
        price: 5,
        ingredients: ["test5"],
      });
      const newItem = DB_Data.find({ name: "test5" });
      expect(res.status).toBe(201);
      expect(newItem).not.toBeNull();
    });
    it("should have a valid id and return data", async () => {
      const res = await call({
        name: "test6",
        price: 6,
        ingredients: ["test6"],
      });
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "test6");
    });
  });
});
