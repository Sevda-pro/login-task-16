const db = require("../util/db.config");
const User = db.customers
const Expenses = db.expenses

const getusers = async (req, res) => {
   try{
    const lbusers=await User.findAll({
        order:[['total_expense','DESC']]
    })
   
    res.status(200).json(lbusers)
}
catch(err){
    res.status(500).json(err)
}

}


module.exports = { getusers };