const express = require("express");
const app =  express();
const posts = [];
const bodyParser = require("body-parser");
var _ = require('lodash');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set("view engine","ejs");
app.use(express.static("public"));
app.get("/",function(req,res){
    res.render("main",{titles:posts});
});
app.get("/about",function(req,res){
    res.render("about");
});
app.get("/contact",function(req,res){
    res.render("faqs");
});
app.get("/compose",function(req,res){
    res.render("backend");
});
app.post("/compose",function(req,res){
    let content = req.body.posttitle;
    let bodies =  req.body.postbody;
    const postu = {
        title:content,
        body:bodies
    }
    posts.push(postu);
    console.log(posts);
    res.redirect("/");
});
app.get("/posts/:id",function(req,res){
   posts.forEach(function(post){
       if(_.lowerCase(req.params.id)===_.lowerCase(post.title)){
           res.render("posting",{titlecontent:post.title,content:post.body})
       }
   })
});
app.listen(3000,function(){
    console.log("we're listening on the port 3000");
})