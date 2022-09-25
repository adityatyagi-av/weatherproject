const express=require("express");
const https = require("https");
const bodyParser =require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");

    });

     
app.post("/", function(req, res){
    const query=req.body.cityName;
    const apiKey="key";
      const url="https://api.openweathermap.org/data/2.5/weather?&q="+query+"&appid="+apiKey+"";
    https.get(url,function(response){
        console.log(response.statusCode);
    
        response.on("data",function(data){
            console.log(data);
            const weatherData= JSON.parse(data);
            const temp=weatherData.main.temp;
            const tempDescription =weatherData.weather[0].description
            const tempImage =weatherData.weather[0].icon
            const imageUrl ="http://openweathermap.org/img/wn/"+ tempImage+ "@2x.png";

            res.write("<p>the weather is currently"+tempDescription+"</p>");
            res.write("The temperature in "+query+" is "+temp+"degree Kelvin");
            res.write("<img src="+imageUrl+">");
            res.send();    
        });
    })
});


  




app.listen(3000,function(){
    console.log("server is running on the port 3000");
})