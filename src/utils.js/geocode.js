const request=require("request");
const getGeocode=(address,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=address&access_token=pk.eyJ1Ijoia2lzaGFuMDE0NSIsImEiOiJja3A2ZGViamwwaThtMm9wOXVxdzFmeG10In0.rd9Mn1hd8ZDN7OjwVzs9Xw`
    request({ url:url,json:true},(error,responce)=>{
        if(error){
            callback("Unable to connect to the internet",undefined)
        }
        else if(responce.body.features.length==0)
        {
            callback("Invalid input",undefined)
        }
        else{
           callback(undefined,{
               longitude:`${responce.body.features[0].center[0]}`,
               latitude:`${responce.body.features[0].center[1]}`,
               location:`${responce.body.features[0].place_name}`
           })
        }
    });
}
module.exports=getGeocode;