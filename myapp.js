var session=require("cookie-session");
var exps=require("express");
// var exp=exps();
var requ=require("request");
var bodyparser= require("body-parser");
var mongoose=require("mongoose");
var User=require("./models/user");
var flash=require("connect-flash");
var passport=require("passport");
var passportlocal=require("passport-local");
var passportlocalmongoose=require("passport-local-mongoose");
var seedDB=require("./seed");
var methodoverride=require("method-override");
var Campground=require("./models/campground.js");
var Comment=require("./models/Comment.js");
var campgroundRouter=require("./routes/campground");
var commentRouter=require("./routes/comment");
var authRouter=require("./routes/authenticate");

var exp=exps();
console.log(process.env.DATABASEURL);
mongoose.Promise = global.Promise;
const url=process.env.DATABASEURL//||"mongodb://localhost/yelp_basic_v6";
      
// mongoose.connect("mongodb://localhost/yelp_basic_v6",{ useMongoClient: true });
mongoose.connect("mongodb://ibia:ibia@ds111882.mlab.com:11882/yelp_camp||mongodb://localhost/yelp_basic_v6",{ useMongoClient: true })
// mongoose.connect(url,{useMongoClient:true})
//       .then(() => console.log(`Database connected!`))
//       .catch(err => console.log(`Database connection error: ${err.message}`));
mongoose.Promise = global.Promise; 
exp.use(exps.static(__dirname+"/public"));
exp.use(flash());
// seedDB();
exp.use(bodyparser.urlencoded({extended:true}));
exp.use(methodoverride("_method"))
exp.set("view engine","ejs");
// exp.use(require("express-session")(
//     {
//         secret:"what the hell is your problem",
//         resave:false,
//         saveUninitialized:false
//     }))
var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
exp.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: {
    secure: true,
    // httpOnly: true,
    expires: expiryDate
  }
}))

exp.use(passport.initialize());
exp.use(passport.session());
//==============
//Our middleware
//==============

exp.use(function(req,res,next)
    {
        res.locals.currentUser=req.user;
        res.locals.error=req.flash("error");
        res.locals.success=req.flash("success")
        next();
    })


passport.use(new passportlocal(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


//routes    
exp.use("/campground",campgroundRouter)
exp.use("/campground/:id/comments",commentRouter)
exp.use(authRouter)


exp.listen(process.env.PORT,process.env.IP);
