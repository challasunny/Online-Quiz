var express=require('express')
var app=express();
var bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
var session=require('express-session')
app.use(session({secret:"keyboard cat",cookie:{maxAge:60000}}))
var question=require("./questions.json")
var users=require("./users.json")
var utils=require("./utils")
app.set('view engine','pug');
app.use(express.static(__dirname + "/public"))
app.post("/check",function(req,res){
     var x=users.find((user)=>{
        if(user.username==req.body.username &&
           user.password==req.body.password){
         return true;
           }
    })
    if(x){
        req.session.username=req.body.username
        req.session.password=req.body.password
        res.render("dashboard",{user:req.session.username,languages:utils.getAllLanguages()});
    }
    else{
        res.sendFile(__dirname + "/public/loginerror.html");
    }
})
app.get("/getQuestionsbylanguages/:l",function(req,res){
    res.render("quiz",{name:req.params.l,user:req.session.username, questions:utils.getQuestionsbylanguageName(req.params.l)});
})
app.get("/logout",function(req,res){
    req.session.destroy(()=>{
        res.sendFile(__dirname + "/public/login.html")
    })
})
app.post("/evaluation",function(req,res){
    res.render("quiz",{score:utils.check()})
})
app.get("/",function(req,res){
    res.sendFile(__dirname + "/public/login.html");
})
function authenticate(req,res,next){
    if(req.session){
        next();
    }
    else{
        res.sendFile(__dirname + "/public/login.html");
    }
}
app.use("/",authenticate)
app.listen(2999,function(){
    console.log("server running on 2999");
})