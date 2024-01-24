const jwt = require('jsonwebtoken')
const secretkey = 'acharya'

const auth = (req,res,next)=>{

    const data = req.headers['authorization']
    console.log(data,'token');
    const token = data.split(' ')[1]
    console.log(token);

    if(token){
    jwt.verify(token,secretkey,(err,validate)=>{
        if(err){
            return res.send('Error while accessing',err)
        }
        if(validate){
            return next()
        }
        return res.send('user is not authorized')
    })
}
else{
    return res.send({msg:"Email id is not registered"})
}
}


module.exports = auth