// init
const mongoose = require("mongoose");
const MenuList = require("../models/menuModels");
// utils
const _ = require("lodash");
const validateMenu = require("../utils/validateMenu");
// logs
const logger = require("../utils/logger");

async function addNewMenuItem(req, res) {
  const validationError = validateMenu(req.body);
  if (validationError) return res.status(400).send(validationError);
  logger.info("Adding Menu item");
  const menuItemToAdd = _.pick(req.body, [
    "name",
    "price",
    "ingredients",
    "chef",
  ]);
  const doesItemExist = await MenuList.exists({ name: menuItemToAdd.name });
  if (doesItemExist)
    return res.status(400).send("An item with this name already exists");
  try {
    newMenuItem = new MenuList({
      name: menuItemToAdd.name,
      price: menuItemToAdd.price,
      ingredients: menuItemToAdd.ingredients,
      chef: menuItemToAdd.chef,
    });
    // save
    await newMenuItem.save();
    logger.info("Item saved");
    res.status(201).send(newMenuItem);
  } catch (err) {
    logger.error("Adding item failed. Error:\n", err);
    res.status(400).send("Error adding new item.");
  }
}

async function getCompleteMenu(req, res, next) {
  const menu = await MenuList.find().sort();
  res.status(200).send(menu);
}

async function getMenuItem(req, res) {
  logger.info("Get menu item");
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send("Invalid ID requested");
  }
  const pizza = await MenuList.findById(req.params.id);
  if (!pizza) {
    res.status(404).send("Item not found");
  }
  res.status(200).send(pizza);
}

async function updateMenu(req, res) {
  const validationError = validateMenu(req.body);
  if (validationError) return res.status(400).send(validationError);
  logger.info("Updating Menu item");
  let newMenuItem = await MenuList.findById(req.params.id);
  if (!newMenuItem) return res.status(400).send("Menu item does not exist");
  try {
    itemToUpdate = new MenuList({
      name: req.body.name,
      price: req.body.price,
      ingredients: req.body.ingredients,
      chef: req.body.chef,
    });
    itemToUpdate.save();
    logger.info("Item saved");
    res.status(201).send(itemToUpdate);
  } catch (err) {
    logger.error("Adding item failed. Error:\n", err);
    res.status(400).send("error on update process");
  }
}

async function deleteMenuItem(req, res) {
  logger.info("Delete item");
  await pizzaMenu.findByIdAndRemove(req.params.id);
  return res.status(401).send(pizzaMenu);
}

exports.addNewMenuItem = addNewMenuItem;
exports.getCompleteMenu = getCompleteMenu;
exports.getMenuItem = getMenuItem;
exports.updateMenu = updateMenu;
exports.deleteMenuItem = deleteMenuItem;
