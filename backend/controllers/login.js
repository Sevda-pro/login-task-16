const bcrypt = require("bcrypt")
const db = require( "../util/db.config")
const Customer = db.customers
const jwt = require("jsonwebtoken");
// var cookieParser = require('cookie-parser')
// var ls = require('local-storage');

function generateAccessToken(id, premium) {
	let x = jwt.sign({ userId: id, isPremiumUser: premium }, "secretKey");
	return x;
}
function createCustomer(req, res) {
    if (!req.body) {
        return res.status(400).send({
            message: "Bad Data"
        });
    }
    const n = req.body.name;
    const em = req.body.email;
    const p = req.body.password;

    // Check if a customer with the same email already exists
    Customer.findOne({
        where: { Email: em }
    })
        .then(existingCustomer => {
            if (existingCustomer) {
                return res.status(409).send({
                    message: "Customer already exists"
                });
            }

            // Hash the password
            bcrypt.hash(p, 10, (err, hash) => {
                const customerObject = {
                    Name: n,
                    Email: em,
                    Password: hash,
                }
                // Create the new customer
                Customer.create(customerObject)
                    .then(data => {
                        res.redirect("/")
                    })
                    .catch(err => {
                        res.status(500).send(err);
                    });
            });
        })
}

function findAllCustomer(req, res) {
    Customer.findAll().then((data) => {
        res.status(200).send(data)
    })
}
function findCustomer(req, res) {
    let v1 = req.body.email
    let v2 = req.body.password

    Customer.findOne({
        where: { Email: v1 }
    }).then(existingCustomer => {
        if (existingCustomer) {
            // Customer with the provided email found
            bcrypt.compare(v2, existingCustomer.Password, (err, result) => {
                if (err) {
                    return res.status(401).send({
                        message: "error"
                    });
                }
                if(result && existingCustomer.isPremiumUser==true)
                {
                    return res.status(200).json({ message: "login successfully", success: true,prime:true, token: generateAccessToken(existingCustomer.id,existingCustomer.isPremiumUser) });
                }
                if (result) {
                    return res.status(200).json({ message: "login successfully", success: true,prime:false, token: generateAccessToken(existingCustomer.id,existingCustomer.isPremiumUser) });
                } else {
                    return res.status(400).send({
                        message: "password not matched"
                    });
                }
            });
            
        }
        else {
            return res.status(404).send("Customer not found");
        }
    });

}
function updateCustomer(req, res) {

}
function deleteCustomer(req, res) {
    Customer.destroy({ where: { ProductName: req.params.id } }).then(() => {
        res.send("updated data");
    }).catch(error => {
        res.status(500).send(error);
    })
}

module.exports = { createCustomer, findAllCustomer, findCustomer, updateCustomer, deleteCustomer ,generateAccessToken}