const request=require("request");
const forecast=(lati,longi,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=fb28e93bdb89b159622225ee89a2f0b5&query=${lati},${longi}`;
    request({url:url,json:true},(error,responce)=>{
        if(error){
            callback("Unable to connect to the internet",undefined);
        }else if(responce.body.error)
        {
            callback("Invalid input",undefined)
        }
        else{
            callback(undefined,`It is currently ${responce.body.current.temperature} degree out but it feelslike ${responce.body.current.feelslike}`);
        }

    });
}
module.exports=forecast