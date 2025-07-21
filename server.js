const express=require("express");
const app=express();
const session=require("express-session")
const flash=require("connect-flash");
const { connect } = require("mongoose");

const sessionOptions={secret:"mysupersecretstring",resave:false,saveUninitialized:true}

app.get("/test",(req,res)=>{
    res.send("test sucessfull")
})

app.use(session(sessionOptions));

app.get("/register",(req,res)=>{
    let {name="anoymous"}=req.query;
    req.session.name=name;
    res.flash("success","user registerd !")
    res.redirect("/hello")

})
app.get("/hello",(req,res)=>{
    res.send(`hello ${ req.session.name}`)
})
// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
//     }
//     res.send(`yow sent a request ${req.session.count} times`)
// })

app.listen(3000,()=>{
    console.log("server is the listing on the port 3000")
})
