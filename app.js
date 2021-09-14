// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0
const iconElement =document.querySelector(".weather-icon");
const tempElement =document.querySelector(".temperature-value p");
const descElement =document.querySelector(".temperature-description p");
const locationElement =document.querySelector(".location p");
const notificationElement =document.querySelector(".notification");

const weather = {};
weather.temperature = {
    unit:"celsius"
}
const KELVIN = 273;
const Key = "82005d27a116c2880c8f0fcb866998a0";

if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML= "<p>Browser doesn't support Geolocation</p>";}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getweather(latitude,longitude);
    
}

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML= `<p>${error.message}</p>`
}

function getweather(latitude,longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Key}`;
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country; 

        })
        .then(function(){
            displaywether();
        })
    }
function displaywether(){
    console.log(weather)
    iconElement.innerHTML=`<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML=`${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML= weather.description;
    locationElement.innerHTML=`${weather.city},${weather.country}`;

}

function ctof(temperature){
return (temperature*9/5)+32;
}

tempElement.addEventListener("click",function () {
    if(weather.temperature.value=== undefined) return;

    if(weather.temperature.unit == "celsius"){
        let fahranheit = ctof(weather.temperature.value);
        fahranheit = Math.floor(fahranheit);
        tempElement.innerHTML=`${fahranheit}°<span>F</span>`;
        weather.temperature.unit = "F";
    }
    else{
        tempElement.innerHTML=`${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }

});