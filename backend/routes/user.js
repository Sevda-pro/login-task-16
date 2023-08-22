const express=require("express")
const path=require("path")
const router=express.Router();
const controller = require('../controllers/login');
router.route("/").post( controller.createCustomer);
router.route("/users").get( controller.findAllCustomer);
router.route("/login").post( controller.findCustomer);
module.exports=router;
