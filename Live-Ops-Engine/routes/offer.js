const express = require("express")
// for encrypting our password we use bcrypt
// const bcrypt = require("bcrypt")
// const salt = 10;
const router = express.Router();
const jwt = require("jsonwebtoken")
const SECRET_CODE = "dsfkosldfklklsdm";
const {offer} = require("../schemas/offer-schema")

const getUserByToken = (token) =>{
    return new Promise((resolve, reject)=>{
        if(token){
            let userData
            try{
                userData = jwt.verify(token, SECRET_CODE);
                resolve(userData);
            }
            catch(err){
                reject("Invalid token")
            }
        }
        else{
            reject("Invalid Token")
        }
    })
}

router.post("/list", async(req, res)=>{
    const validOffers = [];
    offer.find().then((offers)=>{
        // console.log(offers,"offer list")
        offers.filter((offer)=>{
            const rules = offer.target.split("and")
            //['age > 30', 'installed_days < 5' ]
            // console.log(rules)
            rules.forEach((rule)=>{
                let ruleKey = {};
                if(rule.includes(">")){
                    ruleKey = {key: rule.trim().split(">")[0].trim(), value: parseInt(rule.trim().split(">")[1]), operator: ">"}
                    if(req.body[ruleKey.key]> ruleKey.value){
                        validOffers.push(offer);
                    }
                    console.log(validOffers)
                } else {
                    ruleKey = {key: rule.trim().split("<")[0], value: parseInt(rule.trim().split("<")[1]), operator: "<"}
                    if(req.body[ruleKey.key]< ruleKey.value){
                        validOffers.push(offer);
                    }
                    console.log(validOffers)
                }
                
                // console.log(ruleKey)
            })
            // if(rule[0].contains[">"]){

            // } else {

            // }
            // const validAge = rule[0].split(">")[]
            // const validInstalledDays = 
        })
        res.status(200).send(validOffers);

    }).catch(()=>{
        res.status(500).send("Internal Server Error")
    })

})

router.post("/create", async(req, res)=>{
    //find the user
    getUserByToken(req.headers.authorization).then((user)=>{
        //create a offer based on user.
        offer.create({...req.body, username: user.username}).then((offer)=>{
            res.status(200).send(offer);
        }).catch((err)=>{
            res.status(400).send({message: err.message})
        })
        // res.status(200).send(user)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

router.put("/update", async()=>{
    offer.updateOne("identifier data", "new Data");
});

router.delete("/delete", async()=>{
    offer.deleteOne({_id: req.body.id});
});

module.exports = router;