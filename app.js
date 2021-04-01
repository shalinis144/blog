const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const db=require('./queries');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)

app.post('/login',async(req,res)=>{
  let id=req.body.id;
  let username=req.body.username;
  let password=req.body.password;
  let result= await db.authenticate(id,username,password);
  // console.log(result);
  res.send(result);

});

app.post('/register',async(req,res)=>{
  let name=req.body.name;
  let username=req.body.username;
  let password1=req.body.password1;
  let password2=req.body.password2;
  let results= await db.registration(name,username,password1,password2);
  res.send(results);

});

app.post('/adminApproval',async(req,res)=>{
  var result=await db.getStatusAdmin(req.body.id);
  res.send(result);
});


app.listen(3000,function(){
console.log("Server started at port 3000");
});
