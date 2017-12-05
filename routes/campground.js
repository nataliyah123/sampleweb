var express=require("express")
var router=express.Router()
var Campground=require("../models/campground")
var middlewareobj=require("../middleware")



router.get("/",function(req,res)
    {
        // console.log("We are in campground")
       
            Campground.find({},function(err,allcampground)
            {
                if(err){console.log("something went wrong")}
                else{
                    res.render("campground/campground",{camps:allcampground})
                }
            })
            


    })
router.post("/",middlewareobj.isLoggedIn,function(req,res)
    {
        var newName=req.body.name;
        var price=req.body.price;
        var newUrl=req.body.url;
        var description=req.body.description;
        var author={id:req.user._id,username:req.user.username}
        console.log(author.username)
        var newadded= {name:newName,price:price,url:newUrl,description:description,author:author}
        Campground.create(newadded,function(err,newcamps){
            if(err)
                 {console.log("something went wrong in campground post route")}
            else {
                console.log("added");
                // console.log(Campground)
                
                res.redirect("/campground")
                }
                
            })
        
        
    })    
router.get("/new",middlewareobj.isLoggedIn,function(req,res)
    {
        res.render("campground/new.ejs")
    })
    
 //show route 
router.get("/:id",function(req,res)

    {
        Campground.findById(req.params.id).populate("comments").exec(function(err,foundcamp)
        {           
            if(err||!foundcamp){
                req.flash("error","Campground not found")
                res.redirect("/campground")
                console.log("There is some error in campgroundground id single item show route")}
            else{
                // console.log("we are in myapp.js show route");
                // console.log(foundcamp)
                res.render("campground/show",{foundcamp:foundcamp})
            }
        })
        
    })
//edit form 
router.get("/:id/edit",middlewareobj.checkOwnerShip,function(req,res)
    {
        Campground.findById(req.params.id,function(err,foundcamp)
        {
            if(err){
                
                res.redirect("/campground")
            }else
            {
                res.render("campground/edit",{campground:foundcamp})   
            }
        })
    })
router.put("/:id",function(req,res)
    {
        
            Campground.findByIdAndUpdate(req.params.id,req.body.campground, {new: true},function(err,foundcamp)
            {
                if(err){
                    res.redirect("/campground")
                }else
                {
                    // console.log(req.body.campground)
                    res.redirect("/campground/"+req.params.id)
                }
            })
        
        
    })
router.delete("/:id",function(req,res)
    {
        Campground.findByIdAndRemove(req.params.id,function(err)
            {
                if(err){("error",err)
                    
                    res.redirect("/campground");
                }else {
                    req.flash("success", "The campground is successfully deleted");
                    res.redirect("/campground");
                }
                // res.send("the camp is deleted")
            })
    })
//middlewares

    
module.exports=router