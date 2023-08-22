const express = require("express")
const cors = require("cors")
const path = require("path")
const bodyParser = require('body-parser')
const user_route = require("./routes/user")
const expense_route = require("./routes/expense")
const purchase_route = require("./routes/purchase")
const premium_route = require("./routes/premium")
const password_route = require("./routes/password")
const app = express();
const publicPath = path.join(__dirname, 'public');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const db = require('./util/db.config')
db.customers.hasMany(db.expenses)
db.expenses.belongsTo(db.customers)
db.customers.hasMany(db.orders)
db.orders.belongsTo(db.customers)
db.ResetPassword.belongsTo(db.customers);
db.customers.hasMany(db.ResetPassword);
db.sequelize.sync({ alter: true }).then(() => {
  console.log("ok report")
}).catch(() => {
  console.log("error")
})

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, 'userlogin.html'));
});
app.get("/exp", (req, res) => {
  res.sendFile(path.join(publicPath, 'Expense.html'));
});

app.get("/new", (req, res) => {
  res.sendFile(path.join(publicPath, 'userregister.html'));
});
app.get("/forgotpassword", (req, res) => {
  res.sendFile(path.join(publicPath, 'forgetp.html'));
});
app.use("/password", password_route)
app.use("/purchase", purchase_route)
app.use("/user", user_route)
app.use("/expense", expense_route)
app.use("/premium", premium_route)
app.listen(3001);
