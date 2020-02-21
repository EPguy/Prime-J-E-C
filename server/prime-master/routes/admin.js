const express = require("express");
const router = express.Router();
var adminController = require('../controllers/admin.controller');

router.post("/accept",adminController.accept);
router.post("/refuse",adminController.refuse);
router.post("/editUserInfo",adminController.editUserInfo)
router.post("/create",adminController.create);


router.get("/joinUsers",adminController.JoinUsers);
router.get("/requestJoin",adminController.requestJoin);


module.exports = router;
    