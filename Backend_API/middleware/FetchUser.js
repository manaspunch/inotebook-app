const jwt = require('jsonwebtoken');
const JWT_SECRET = "manasgood$boy123";

const fetchUSer = (req, res, next) => {

    // Get the user from the JWT token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate user by using a VALID token..!" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate user by using a VALID token..!" });
    }

}

module.exports = fetchUSer;