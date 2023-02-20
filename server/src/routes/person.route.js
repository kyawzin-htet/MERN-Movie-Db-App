const express = require("express");
const personController = require("../controllers/person.controller.js");

const router = express.Router({mergeParams: true});

router.get(
    "/:personId/medias",
    personController.personMedias
)

router.get(
    "/:personId",
    personController.personDetail
)

module.exports = router;