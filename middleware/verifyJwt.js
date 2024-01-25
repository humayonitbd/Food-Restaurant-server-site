
const jwt = require('jsonwebtoken');
const verifyJwt = (req, res, next) => {
    if (!req) {
        return res.status(500).send('Internal Server Error');
    }

    const authHeader = req.headers.authorization;
    console.log("authHeader",authHeader)

    if (!authHeader) {
        return res.status(401).send('Unauthorized access!');
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_JWT_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access' });
        }
        req.decoded = decoded;
        next();
    });
};

module.exports = verifyJwt;
