const express = require("express")

// for encrypting our password we use bcrypt
const bcrypt = require("bcrypt")
const salt = 10;
const router = express.Router();
const jwt = require("jsonwebtoken")
const SECRET_CODE = "dsfkosldfklklsdm";
const {user} = require("../schemas/user-schema")

router.post("/signup", async(req, res)=>{
    //create a user in db
    //username password email
    //encrypt then store
    //encrypt the password
    bcrypt.genSalt(salt, (saltErr, saltValue)=>{
        if(saltErr){(
            res.status(401).send("Unable to process"))
        } else {
            bcrypt.hash(req.body.password, saltValue, (hashErr, hashValue)=>{
                if(hashErr){
                    res.status(401).send("Unable to process")
                } else {
                    user.create({username: req.body.username, password: hashValue, email: req.body.email| "", mobile: req.body.mobile| ""}).then((user)=>{
                        res.status(200).send(user);

                    }).catch((err)=>{
                        res.status(400).send(err.message)
                    })
                }
            })
        }
    })
    // user.create({})
});


router.post("/login", async(req, res)=>{
    // READ a user in db
    //username & password
    //authenctication
    //step 1:- does user exist or not
    //verify password and generate jwt
    user.findOne({username: req.body.username}).then((user)=>{
        if(!user){
            res.status(401).send("User does not exist!")
        }
        else {
            if(!bcrypt.compareSync(req.body.password, user.password)){
                res.status(401).send("Invalid Password")
            } else{
                const token = jwt.sign({id: user._id, username: user.username}, SECRET_CODE)   //1. data  2. secret  3. algo type
                res.status(200).send({message:"User loggedIn Successfully", token: token});
                //token is necessary to avoid re-login in every single red-directed page. We keep sending
                //token at eatch request. We extract user info from that token and check user info.(authenctication)
                //Password helps in authenctication, eatchtime we call api, with the help of token
                // the user info is automatically known.
                //to difficult to decode, we use secret key
                // hacker can try different payload to crack or de-crypt the password
            }
        }
    })
});

module.exports = router;