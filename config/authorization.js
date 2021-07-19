const jwt = require('jsonwebtoken');

module.exports = {
    authorization: (req,res, next) => {
    
        if (!req.headers.authorization) {
            res.status(401).end();
            return;
        }
    
        const token = req.headers.authorization;
    
        var decoded = jwt.verify(token.slice(7), process.env.JWTSECRET);
        req.id = decoded.data
        next()
    }
    
}