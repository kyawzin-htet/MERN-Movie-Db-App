const express = require("express");
const userRoute= require("./user.route.js");
const mediaRoute =require("./media.route.js");
const personRoute =require("./person.route.js");
const reviewRoute = require("./review.route.js");

const router = express.Router();

router.use("/user", userRoute);
router.use("/person", personRoute);
router.use("/reviews", reviewRoute);
router.use("/:mediaType", mediaRoute);

module.exports = router;