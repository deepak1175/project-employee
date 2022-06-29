const jwt = require('jsonwebtoken');
const JWT_SECRET = 'deepakisagoodboy';
const dotenv = require('dotenv');
dotenv.config();
const authenticate = (req,res, next) => {
    try {
        const token = req.headers["x-access-token"];

        const decode = jwt.verify(token, JWT_SECRET);
        req.user = decode;
        next();

    } catch (error) {
        if(error.name == 'TokenExpiredError'){
res.status(401).json({
    error: 'Token expired'
})
        } else {
         res.json({
             error: 'Authentication failed'
         })
    }
}
}


module.exports = authenticate;