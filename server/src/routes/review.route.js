const express = require("express");
const {body} = require("express-validator");
const reviewController = require("../controllers/review.controller.js");
const tokenMiddleware = require("../middlewares/token.middleware.js");
const requestHandler = require("../handlers/request.handler.js");

const router = express.Router({mergeParams: true});

router.get(
    "/",
    tokenMiddleware.auth,
    reviewController.getReviewsOfUser
  );
  
  router.post(
    "/",
    tokenMiddleware.auth,
    body("mediaId")
      .exists().withMessage("mediaId is required")
      .isLength({ min: 1 }).withMessage("mediaId can not be empty"),
    body("content")
      .exists().withMessage("content is required")
      .isLength({ min: 1 }).withMessage("content can not be empty"),
    body("mediaType")
      .exists().withMessage("mediaType is required")
      .custom(type => ["movie", "tv"].includes(type)).withMessage("mediaType invalid"),
    body("mediaTitle")
      .exists().withMessage("mediaTitle is required"),
    body("mediaPoster")
      .exists().withMessage("mediaPoster is required"),
    requestHandler.validate,
    reviewController.create
  );
  
  router.delete(
    "/:reviewId",
    tokenMiddleware.auth,
    reviewController.remove
  );

module.exports = router;