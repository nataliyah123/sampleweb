var mongoose=require("mongoose")
var Campground=require("./models/campground")
var Comment = require("./models/Comment")
var data=[
    { name:"forest camps",url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvIDfaYio56wi8BVb_01-1-tI-bo6A6Jmr4e1_Xd-cjiLPLiIBxw"} ,
    { name:"monument valley",url:"http://cdn.camptrend.com/wp-content/uploads/2016/10/Kevin-Kaminski-Monument-Valley-Sunrise-camptrend.jpg"},
    { name:"Reflection-Canyon",url:"http://cdn.camptrend.com/wp-content/uploads/2016/06/Julia-Reflection-Canyon-camptrend.jpg"}
    ]

function seedDB(){
    
    Campground.remove({},function(err)
    {
        if(err){console.log(err)}
        // else{
        //         data.forEach(function(seed)
        //         {
        //           Campground.create(seed,function(err,campground)
        //           {
        //               if(err){console.log(err)}
        //               else{
        //                   console.log("we are in seed file camp create");
        //                   Comment.create({comment:"These places are superb",author:"colin"},function(err,comment)
        //                     {
        //                         if(err){console.log(err)}
        //                         else{
        //                             console.log(comment)
        //                             campground.comments.push(comment);
        //                             campground.save()
        //                         }
        //                     })
        //               }
        //           })  
        //         })
        //     }
        
        
    })
}

    
module.exports=seedDB
    

