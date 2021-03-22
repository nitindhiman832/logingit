const express = require('express');
const app = express();
const request = require('request');
const superagent = require('superagent');
const port= 6700;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());



app.post('/users',(req,res)=>{
    console.log("<<<<<",req.body)
    superagent
    .post('https://github.com/login/oauth/access_token')
    .send({
        client_secret:'afe2fdbf3477aa4d0bd8fc98f952c1ca12d92cb5',
        client_id:'089406082637802259c4',
        code:req.body.code
    })
    .set('Accept','application/json')
    .end((err,result)=>{
        if(err) throw err;
        var acctoken=result.body.access_token;
        const option={
            url:"https://api.github.com/user",
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Authorization':'token '+acctoken,
                'User-Agent':'mycone',
            }
        }
        var output;
        request(option,(err,response,body)=>{
            output = body;
            console.log(output)
            return res.send(output)
        })
    })
})
app.listen(port,()=>{
    console.log(`Server is running on pornt number ${port}`);
})