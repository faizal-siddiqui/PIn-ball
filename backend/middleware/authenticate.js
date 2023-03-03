const jwt = require('jsonwebtoken');
require('dotenv').config();


const authenticate = (req, res, next) => {
    const token = req.headers.tkn
    if(token){
        jwt.verify(token, process.env.key, (err,decoded)=>{
            if(decoded){
                req.body.user = decoded.userId
                next();
            }else{
                res.send('plz login not authenticated')
            }
        })
    }else{
        res.send('not logged in')
    }
}

module.exports={
    authenticate
}