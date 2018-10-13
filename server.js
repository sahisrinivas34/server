const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const couchdb = require('node-couchdb');
var users,activity;
    const couch = new  couchdb({auth : {
        user : 'admin',
        pass : 'nikhil007'
    }});
 const app = express();
//  app.use(cors());
//  var corsOptions = {
//   origin: 'http://localhost:4200',
//   optionsSuccessStatus: 200 
// }
app.use(express.static(__dirname));
app.use(bodyParser.json());
//getting users
app.get('/',(req,res)=>{
  res.send("server running!")
})

  app.get('/users',function(req,res){
    couch.get("users","_all_docs").then(({data,header,status}) => res.send(data),(err)=>res.send(err) );
  });
  app.get('/activity/:user/:date',function(req,res){
    const user = req.params.user;
    const date = req.params.date;
    console.log(user+date)
    couch.get("activity",user).then(({data,header,status}) => res.send(data),(err)=>res.send(err) );
  });
  app.listen(7113,function(){
      console.log("server running on 7k");
  })