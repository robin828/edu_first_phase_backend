
const jwt =  require('jsonwebtoken')


module.exports = function(req, res, next){
    const token = req.header('auth_token');
    if(!token) return res.status(401).send("Access Denied")

    try {
        const verified = jwt.verify(token, "shjvshfu")
        req.user = verified
        console.log("ghghjh", verified)
        next();
    } catch (error) {
        res.status(400).send("invalid token")
    }
}