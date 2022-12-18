// jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req,res){
    const firstName=req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const data = {
      members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
      ]  
    };

    const jsonData = JSON.stringify(data);
    const url ="https://us21.api.mailchimp.com/3.0/lists/4bcf3cbb34"

    const options ={
        method: "POST",
        auth: "mannu:52e6d20d64843ef62674584b4bd611f4-us21"

    }

    const request = https.request(url,options,function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end()


    console.log(firstName,lastName,email);
});
app.post("/failure",function(req,res){
    res.redirect("/");
});
app.listen(process.env.PORT || 4000,function() {
    console.log("server is running at 4000");
});
// api key
// 52e6d20d64843ef62674584b4bd611f4-us21
//list id
//4bcf3cbb34