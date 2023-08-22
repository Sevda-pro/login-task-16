const db = require("../util/db.config")
const Expense = db.expenses
const User=db.customers
const sequelize=db.sequelize
const path=require("path")
const jwt=require("jsonwebtoken")
const publicPath = path.join(__dirname, './public');

async function createCustomer(req, res) {
    const t=await sequelize.transaction();
    if (!req.body) {
        return res.status(400).send({
            message: "Bad Data"
        })
    }
    // const { Expense, desc, Category } = req.body;

    const customerObject = {
        Price: req.body.Price,
       ProductName: req.body.ProductName,
        BelongsTo:req.body.BelongsTo,
        customerId: req.user.id,
    }
    Expense.create((customerObject),{transaction:t}).then((data) => {
        const total=Number(req.user.total_expense)+Number(req.body.Price)
        User.update({
            total_expense:total
        },{
            where:{id:req.user.id},
            transaction:t
        }).then(async(resp)=>{
            await t.commit();
           return res.status(200).json({expense:data})
        }).catch(async(err)=>{
            await t.rollback()
            return res.status(500).json({success:false,error: err})
        })
    }).catch(async(err) => {
        await t.rollback()
        res.status(500).send(err);
    })
}
function findAllCustomer(req, res) {
	
 Expense.findAll({ where :{customerId: req.user.id }}).then((data) => {
    res.status(200).send(data)
}).catch(error => {
    res.status(500).json({error,success:false});
})
	
};
function findCustomer(req, res) {
    Expense.findByPk(req.params.email).then(data => {
        res.send(data);
    }).catch(error => {
        res.status(500).send(error);
    })
}
function updateCustomer(req, res) {

}
function deleteCustomer(req, res) {

   Expense.destroy({ where: { ProductName: req.params.id } }).then((exp) => {
    const total=Number(req.user.total_expense)-Number(exp)
    User.update({
        total_expense:total
    },{
        where:{id:req.user.id},
     
    }).then(async(resp)=>{
       return res.status(200).json({expense:data})
    }).catch(async(err)=>{
        return res.status(500).json({success:false,error: err})
    })
       
    }).catch(error => {
        res.status(500).send(error);
    })
}

module.exports = {createCustomer, findAllCustomer, findCustomer, updateCustomer, deleteCustomer }