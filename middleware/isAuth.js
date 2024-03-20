
const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ msg: 'not authorized' });
    }

    try {
        const dcryp = jwt.verify(token, 'masai');
        req.user = dcryp.user;
        next();
    } catch (error) {
        
        res.status(401).json({ msg: ' token not  found' });
    }
};

module.exports = {
    isAuth
}
