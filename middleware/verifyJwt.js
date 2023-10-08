
const verifyJwt=(req, res, next)=>{
    // const authHeader = req.headers.authorization;

    // if(!authHeader){
    //     return res.status(401).send('unauthorized access!')
    // }
    // const token = authHeader.split(' ')[1];
    // jwt.verify(token, process.env.ACCESS_JWT_TOKEN, function(err, decoded){
    //     if(err){
    //         return res.status(403).send({message: 'forbiden access'})
    //     }
    //     req.decoded = decoded;
    //     next();
    // })
    res.send("jwt setup confirm")
    next();


}

module.exports = verifyJwt;