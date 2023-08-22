const express=require("express")
const router=express.Router();
const controller=require('../controllers/premium');
const auth=require('../middleware/auth');
router.route('/leaderboard').get(auth.authenticate,controller.getusers)
module.exports=router;