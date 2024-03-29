
document.querySelector("form").addEventListener("submit",(e)=>{
    e.preventDefault();
    const searchCity = document.querySelector("input").value;
    fetch(`/weather?address=${searchCity}`).then((responce)=>{
            return responce.json();
    }).then((data)=>{
        if(data.error)
        {
            const errorMsg=document.getElementById("forecast");
            errorMsg.innerText=data.error;
            document.getElementById("loaction") = "";
        }
        else{
            const locationMsg=document.getElementById("location");
            const forecastMsg=document.getElementById("forecast")
            locationMsg.innerText=data.location
            forecastMsg.innerText=data.forecast

        }
    })
    document.querySelector("input").value="";
})