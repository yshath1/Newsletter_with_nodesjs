
const express = require('express')
const bodyParser = require('body-parser')
const { request } = require('express')
const https=require("https");
const res = require('express/lib/response');

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
const port = 3000

app.use(express.static("public"))
app.get('/', (req, res) => {
  res.sendFile(__dirname+"/index.html")
})



app.post('/', (req, res) => {
  //from user input
  const firstName=req.body.fname;
  const lastName=req.body.lname;
  const email=req.body.email;

  //mailchip
  const data={
    members:[{
      email_address:email,
      status:"subscribed",
      FNAME:firstName,
      LNAME:lastName
    }]
  }
//to json format
const jsonData=JSON.stringify(data);

//mailchimp url 
const url="https://us8.api.mailchimp.com/3.0/lists/032fd78428";
const options ={
  method:"POST",
  auth:"shaka2022:"+apikey
}
const request=https.request(url,options,function (response) {
  if (response.statusCode===200) {
    res.sendFile(__dirname+"/success.html")
}else{
  res.sendFile(__dirname+"/failure.html")
}
  response.on("data",function (data) {
  console.log(JSON.parse(data));
  });
});

request.write(jsonData);
request.end();

});

app.post("/success",function (req,res) {
  res.redirect("/")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})


