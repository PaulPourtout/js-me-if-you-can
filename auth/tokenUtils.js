const jwt = require('jsonwebtoken');

module.exports = {
    createToken: (payload, tokenExpiration) => {
        console.log('token generation')
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: tokenExpiration
        });
    },
    // Middleware to check token validity
    checkToken: (req, res, next) => {
        const token = req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.json({success: false, message: 'Failed to authenticate token'});
                } else {
                    req.decoded = decoded;
                    next()
                }
            })
        } else {
            return res.json({
                success: false,
                message: 'No token provided'
            })
        }
    }
}