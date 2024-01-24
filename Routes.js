const express = require('express')
const routes = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('./auth')
const saltRound = 10
const secretkey = 'acharya'

let arr = []
routes.post('/register',(req,res)=>{
    const data = req.body // body parsing

    // register mailid compare 
    const account = arr.find((item)=>item.email === data.email)
    if(account){
        return res.send({msg:"This email is already exist"})
    }

    // password hashSync
    data.password = bcrypt.hashSync(data.password,saltRound)

    arr.push(data)
    console.log(data);

    // token generation 
    const token = jwt.sign({user:data.email},secretkey)
    console.log(token);

    res.send({msg:'User Registered successfully',token:token})
})

routes.post('/login',(req,res)=>{
    const loginData = req.body // body parsing

    // verify the login email with register email 
    const account = arr.find((item)=>item.email === loginData.email)
    console.log(account,'account');

    if(account){
        // login password compare with register password
        const login = bcrypt.compareSync(loginData.password,account.password)
        console.log(login,'login');

        if(login){
            const token = jwt.sign({user:loginData.email},secretkey,{expiresIn:'365d'})
            return res.send({msg:'user loged in sucessfully',token:token})
        }
        else{
            return res.send('password is incorrect')
        }

    }
    else{
        return res.send('user is not registered')
    }
})

routes.get('/home',(req,res)=>{
    res.send({msg:'welcome to home page'})
})

routes.get('/dashboard',auth,(req,res)=>{
    res.send({msg:'welcome to Dashboard'})
})

module.exports = routes
