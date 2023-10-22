const express=require('express');
const bodyparser=require('body-parser');
const _=require('lodash');
const app=express();

app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("assets"));

const contenthome="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const contentabout="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const contentcontact="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

//TEMPORARY DATABASE
let posts=[]


app.get('/',function(req,res){
    res.render('home',{wpage:"HOME",homecontent:contenthome,pos:posts});
})
app.get('/about',function(req,res){
    res.render('about',{wpage:"ABOUT",homecontent:contentabout});
})
app.get('/contact-us',function(req,res){
    res.render('compose');
})
app.get('/compose',function(req,res){
    res.render('compose');
})
app.get('/posts/:postname',function(req,res){
   const newreqe=_.lowerCase(req.params.postname);
   posts.forEach(function(po){
    const storedtit=_.lowerCase(po.title);

    if(storedtit===newreqe){   
        res.render('posti',{titles:po.title, description: po.post});
    }
 })
})

app.get('/blog',function(req,res){
    res.render('blo',{tit:'yo',dex:"bo"});
})

//COMPOSE
app.post('/compose',function(req,res){
    posts.push(req.body);
    res.redirect('/');
})

app.listen(3000,function(err){
    if(err){
        console.log("here is the error: ",err)
        return;
    }
    console.log('server is up and running');
})