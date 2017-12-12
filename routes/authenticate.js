var express=require("express");
var router=express.Router();
var passport=require("passport")
var User=require("../models/user")




//Restful route's index 

router.get("/",function(req,res)
    {
        res.render("landingPage");
    });
    




//===============
//Auth routes
//===============

router.get("/register",function(req,res)
    {
        res.render("signup")
    })
    
router.post("/register",function(req,res)
    {
        User.register(new User( {username:req.body.username}),req.body.password,function(err,user){
          
            if(err)
            {
                console.log(err)
                console.log(req.body.username)
                req.flash("error",err.message)
                return res.render("signup")
            }
            
            passport.authenticate("local")(req, res, function(){
               req.flash("success","Welcome to yelp camps"+" "+ req.body.username)
               res.redirect("/campground"); 
            });
        })
    })

//=====================
// login routes
//=====================

router.get("/login",function(req,res)
    {
        res.render("login")
    })
router.post("/login",passport.authenticate("local",
    {
        successRedirect:"/campground",
        failureRedirect:"/login"
    }),function(req,res){
        console.log(req.user);
        
        }
    )
//=======================
//logout routes
//=======================
router.get("/logout",function(req,res)
    {
        req.logout();
        req.flash("success","You Have Successfully Logged Out")
        res.redirect("/campground")
    })
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }
    
module.exports=router
