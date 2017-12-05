var mongoose=require("mongoose")
var Comment=require("./Comment")
var campgroundSchema= mongoose.Schema(
    {
        name:String,
        price:String,
        url:String,
        description:String,
        author:{
            id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            username:String
        },
        comments:[{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Comment"
        }]
        
    })
var Campground=mongoose.model("Campground",campgroundSchema);
// Campground.find({},function(err,camps)
//     {
//         if(err){console.log(err)}
//         else{console.log("we are in model/campground")}
//     })
module.exports = Campground
