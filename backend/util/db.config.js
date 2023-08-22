const Sequelize=require('sequelize')


const sequelize=new Sequelize('customer','root','Sahil123@',{
    host:'localhost',
    port:3306,
    dialect:'mysql'
})
const db={}
db.Sequelize=Sequelize;
db.sequelize=sequelize;
db.customers = require("../models/loginmodel")(sequelize, Sequelize); 
db.expenses = require("../models/expensemodel")(sequelize, Sequelize); 
db.orders = require("../models/order")(sequelize, Sequelize); 
db.ResetPassword = require("../models/reset")(sequelize, Sequelize); 
module.exports=db;