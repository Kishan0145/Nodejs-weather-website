const path = require('path')
const express = require('express');
const  hbs=require("hbs");
const geocode=require("./utils.js/geocode");
const forecast=require("./utils.js/forecast");

const app = express();

// Define path for static,views and partials
const publicDirectoryPath=path.join(__dirname,"../public");
const viewPath=path.join(__dirname,"../tempelate/views");
const partialPath=path.join(__dirname,"../tempelate/partials");

// Set up handeler engine,views location and partials
app.set("view engine","hbs");
app.set("views",viewPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather",
        name:"Kishan Sharma"
    })
})
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About",
        name:"Kishan Sharma"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        msg:"Do you need any help!!",
        name:"Kishan Sharma"
    });
});

app.get("/weather",(req,res)=>{
    if(!req.query.address)
    {
        res.send({
            error:"You have to provide the address",
        })
    }
    else{
        geocode(req.query.address,(error,geocodeData)=>{
            if(error)
            {
                res.send({error});
            }
            else{
                const lati=geocodeData.latitude;
                const longi=geocodeData.longitude;
                const loca=geocodeData.location;
                forecast(lati,longi,(error,forecastData)=>{
                    if(error)
                    {
                        res.send({error});
                    }
                    else{
                        res.send({
                            forecast:forecastData,
                            location:loca,
                            address:req.query.address
                        })    
                    }
                })

            }
        })

    }
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        errorMsg:"This help page is not exisited",
        name:"Kishan Sharma"
    })
})
app.get("*",(req,res)=>{
    res.render("404",{
        errorMsg:"404 Page not found",
        name:"Kishan Sharma"
    });
})
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Server is litening at Port 3000"+port);
})