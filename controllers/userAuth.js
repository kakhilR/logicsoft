const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signup = (req,res)=>{
    const {
        userName,
        email,
        password } = req.body
    if(!email || !password || !userName){
        return res.status(400).json({error:"all fileds are required"})
    }
    User.findOne({email:req.body.email}).then((user) => {
        if(user){
            return res.status(400).json({error:"user already exists"})
        }
        bcrypt.hash(password,10).then(hashedpassword=>{
            const _user = new User({
                email,
                password:hashedpassword,
                userName,
            });
            _user.save().then(data=>{
                return res.status(200).json({message:"sucessfully registered",data})
            }).catch(err=>{
                return res.status(401).json({error:err.message})
            })

        })
    }).catch((err) =>{return res.status(401).json(err.message)})
}

exports.signin = (req,res)=>{
    const {email,password} = req.body
    if(!email|| !password){
        return res.status(422).json({error:"please enter a valid email or password"})
    }
    User.findOne({email:email}).then((user)=>{
        if(!user){
            return res.status(422).json({message:"No user found with such email"})
        }
        bcrypt.compare(password,user.password).then(doMatch=>{
            if(doMatch){
                // return res.status(200).json({message:"sucessfully logged in "})
                const token = jwt.sign({_id: user.id,},process.env.SECRET_KEY,{expiresIn:'10h'});
                const {_id,userName,email} = user;
                res.json({token,saveduser:{_id,userName,email}})
            }
            else{
                return res.status(422).json({message:"invalid email or password"})
            }
        })
    }).catch(err=>{
        return res.status(400).json(err.message)
    })
}