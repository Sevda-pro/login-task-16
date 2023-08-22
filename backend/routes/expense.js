const express=require("express")
const path=require("path")
const router=express.Router();
const controller=require('../controllers/expense');
const auth=require('../middleware/auth');

router.route("/create").post(auth.authenticate, controller.createCustomer);
router.route("/Alldata").get( auth.authenticate, controller.findAllCustomer);
router.route("/delete/:id").delete( auth.authenticate,controller.deleteCustomer);
module.exports=router;