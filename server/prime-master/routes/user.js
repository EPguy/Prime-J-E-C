const express = require("express");
const router = express.Router();
var userController = require('../controllers/user.controller');

router.get("/confirmEmail", userController.confirmEmail);
router.get("/check", userController.check);
router.get("/findEmail",userController.findEmail);

router.post("/editProfile", userController.editProfile);
router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post('/upload', userController.upload);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword', userController.resetPassword);
module.exports = router;


/* https://miryang.dev/2019/04/25/nodejs-page-3/ */