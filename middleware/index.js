var middlewareobj={}
var Campground=require("../models/campground")
var Comment=require("../models/Comment")

middlewareobj.checkOwnerShip=function(req,res,next)
        {
           if(req.isAuthenticated()){
               Campground.findById(req.params.id,function(err,foundcamp)
               {
                   if(err ||!foundcamp ){
                       req.flash("error","Camp not found")
                       res.redirect("back")}
                   else{
                       if(foundcamp.author.id.equals(req.user._id))
                       {
                           next();
                       }else{
                           req.flash("error","You don't have the permission to do that")
                           res.redirect("back")
                       }
                   }
               })
           }else{
               req.flash("error","You are not logged in ")
               res.redirect("back")
           }
        }
middlewareobj.checkCommentOwnerShip =function(req,res,next)
        {
           if(req.isAuthenticated()){
               Comment.findById(req.params.comment_id,function(err,foundcomment)
               {
                   if(err||!foundcomment){
                       req.flash("error","Comment not found")
                       res.redirect("/campground")}
                   else{
                       if(foundcomment.author.id.equals(req.user._id))
                       {
                           next();
                       }else{
                           req.flash("error","you don't have the permission to do that")
                           res.redirect("back")
                       }
                   }
               })
           }else{
               req.flash("error","You are not logged in")
               res.redirect("/login")
           }
        }
        


middlewareobj.isLoggedIn=function(req,res,next)
    {
        if(req.isAuthenticated()){
            
            return next();
        }
        req.flash("error","You need to be loggedIn to do that")
        res.redirect("/login")
    }



module.exports=middlewareobj