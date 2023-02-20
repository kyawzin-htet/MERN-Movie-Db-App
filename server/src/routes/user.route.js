const express = require("express");
const {body} = require("express-validator");
const favouriteController = require("../controllers/favourite.controller.js");
const userController = require("../controllers/user.controller.js");
const requestHandler = require("../handlers/request.handler.js");
const userModel = require("../models/user.model.js");
const tokenMiddleware = require("../middlewares/token.middleware.js");

const router = express.Router();

router.post(
  "/signup",
  body("username")
    .exists().withMessage("username is required")
    .isLength({ min: 8 }).withMessage("username minimum 8 characters")
    .custom(async value => {
      const user = await userModel.findOne({ username: value });
      if (user) return Promise.reject("username already used");
    }),
  body("password")
    .exists().withMessage("password is required")
    .isLength({ min: 8 }).withMessage("password minimum 8 characters"),
  body("confirmPassword")
    .exists().withMessage("confirmPassword is required")
    .isLength({ min: 8 }).withMessage("confirmPassword minimum 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error("confirmPassword not match");
      return true;
    }),
  body("displayName")
    .exists().withMessage("displayName is required")
    .isLength({ min: 8 }).withMessage("displayName minimum 8 characters"),
  requestHandler.validate,
  userController.signup
);

router.post(
  "/signin",
  body("username")
    .exists().withMessage("username is required")
    .isLength({ min: 8 }).withMessage("username minimum 8 characters"),
  body("password")
    .exists().withMessage("password is required")
    .isLength({ min: 8 }).withMessage("password minimum 8 characters"),
  requestHandler.validate,
  userController.signin
);

router.put(
  "/update-password",
  tokenMiddleware.auth,
  body("password")
    .exists().withMessage("password is required")
    .isLength({ min: 8 }).withMessage("password minimum 8 characters"),

  body("newPassword")
    .exists().withMessage("newPassword is required")
    .isLength({ min: 8 }).withMessage("newPassword minimum 8 characters"),

  body("confirmNewPassword")
    .exists().withMessage("confirmNewPassword is required")
    .isLength({ min: 8 }).withMessage("confirmNewPassword minimum 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) throw new Error("confirmNewPassword not match");
      return true;
    }),
  requestHandler.validate,
  userController.updatePassword
);

router.get(
  "/info",
  tokenMiddleware.auth,
  userController.getInfo,
);

router.get(
  "/favourites",
  tokenMiddleware.auth,
  favouriteController.getFavouriteOfUser,
);


router.post(
    "/favourites",
    tokenMiddleware.auth,
    body("mediaType")
      .exists().withMessage("mediaType is required")
      .custom(type => ["movie", "tv"].includes(type)).withMessage("mediaType invalid"),
    body("mediaId")
      .exists().withMessage("mediaId is required")
      .isLength({ min: 1 }).withMessage("mediaId can not be empty"),
    body("mediaTitle")
      .exists().withMessage("mediaTitle is required"),
    body("mediaPoster")
      .exists().withMessage("mediaPoster is required"),
    body("mediaRate")
      .exists().withMessage("mediaRate is required"),
    requestHandler.validate,
    favouriteController.addFavourite
);

router.delete(
    "/favourites/:favouriteId",
    tokenMiddleware.auth,
    favouriteController.removeFavourite
);

module.exports = router;