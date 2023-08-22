const db = require("../util/db.config");
const jwt = require("jsonwebtoken");
const User=db.customers
const authenticate = async (req, res, next) => {
	try {
		const token = req.header("Authorization");
		console.log("token here is",token);
		const user = jwt.verify(token, "secretKey");
		let currUser = await User.findByPk(user.userId);
		req.user = currUser;
		next();
	} catch (error) { 
		console.log(error);
		return res.status(403).json({message:error});
	}
};



module.exports = { authenticate };
 