const express=require("express")
const router=express.Router();
const controller=require('../controllers/payment');
const auth=require('../middleware/auth');

router.route("/premiummembership").get( auth.authenticate, controller.purchasePremium);
router.route('/updatetransactionstatus/success').post(auth.authenticate,controller.updateTransactionStatus)
router.route('/updatetransactionstatus/failed').post(auth.authenticate,controller.updateTransactionStatusFailed)
module.exports=router;