
var express=require("express");
var router=express.Router;
var router  = express.Router({mergeParams: true});
var Campground=require("../models/campground")
var Comment=require("../models/Comment")
var middlewareobj=require("../middleware")

// ======================================================
   
   //Comments Routes: connecting comments with campground
// ======================================================
router.get("/new",middlewareobj.isLoggedIn,function(req,res)
    {
       Campground.findById(req.params.id,function(err,foundcamp)
        {
            if(err){console.log(err)}
            else{
                console.log(foundcamp)
                res.render("comment/new",{foundcamp:foundcamp})
            }
            
        })
    })
    
router.post("/",function(req,res)
    {
        Campground.findById(req.params.id,function(err,foundcamp)
        {
            if(err){if(err){console.log(err)};res.redirect("/campgrounds");}
            else{
                Comment.create(req.body.comment,function(err,foundcomment)
                {
                    if(err){console.log(err)}
                    else{
                        foundcomment.author.id=req.user._id
                        foundcomment.author.username=req.user.username
                        
                        foundcomment.save()
                        foundcamp.comments.push(foundcomment)
                        foundcamp.save()
                        req.flash("success","Your comment is sucessfully added")
                        res.redirect("/campground/"+ foundcamp._id)
                    }
                })
                
            }
            
        })
    })
//edit route for comments
router.get("/:comment_id/edit",middlewareobj.checkCommentOwnerShip,function(req,res)
    {   
        Campground.findById(req.params.id,function(err,foundcamp)
        {
            if(err||!foundcamp){
                req.flash("error","Campground not found");
                return res.redirect("/campground")
            }
        
            Comment.findById(req.params.comment_id,function(err,foundcomment){
                if(err||!foundcomment){
                    req.flash("error","Comment not found")
                    res.redirect("/campground");
                }
                else{
                    res.render("comment/edit",{foundcomment:foundcomment,foundcamp_id:req.params.id})
                }
            })
        })
    })
//update comment route
router.put("/:comment_id/",middlewareobj.checkCommentOwnerShip,function(req,res)
    {
        Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,foundcomment)
        {
            if(err){
                res.redirect("/campground")
            }else{
            res.redirect("/campground/"+req.params.id)
            }
        })
        
    })
router.delete("/:comment_id",middlewareobj.checkCommentOwnerShip,function(req,res)
    {
        Comment.findByIdAndRemove(req.params.comment_id,function(err)
        {
            if(err){
                res.redirect("back")
              }else{
                  req.flash("success","Comment is successfully deleted !!!")
                  res.redirect("/campground/"+req.params.id)
              }
        })
    })
    


module.exports=router
    