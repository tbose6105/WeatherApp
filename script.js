const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = hoursIn12HrFormat + ':' + minutes+ ' ' + `<span id="am-pm">${ampm}</span>`
    
    dateEl.innerHTML = days[day] +', ' + date+ ' ' + months[month]
}, 1000);

let weather = {
    apiKey: "8f36109295c4937ccc5912a8821a3692",
    fetchWeather: function (city,state,country) {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "," + state + "," + country + "&units=imperial&appid=" + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        /*Today's (0 Day) Forecast*/
        const { temp, feels_like, temp_min, temp_max, pressure, humidity } = data.list[0].main;
        console.log(temp,feels_like,temp_min,temp_max,pressure,humidity);
        document.querySelector(".temp0").innerText = temp + " °F";
        document.querySelector(".mintemp0").innerText = temp_min + " °F";
        document.querySelector(".maxtemp0").innerText = temp_max + " °F";
        document.querySelector(".pressure0").innerText = pressure + " in. Hg";
        document.querySelector(".humidity0").innerText = humidity + " %";
        document.querySelector(".feelslike0").innerText = feels_like + " °F";
        /*1st Day's Forecast*/
        const { temp_min1, temp_max1 } = data.list[1].main;
        const { icon } = data.weather[1];
        console.log(temp_min1,temp_max1);
        document.querySelector(".w-icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        document.querySelector("#mintemp1").innerText = "Min Temp: " + temp_min1 + " °F";
        document.querySelector("#maxtemp1").innerText = "Max Temp: " + temp_max1 + " °F";
        /*2nd Day's Forecast*/
        const { temp_min2, temp_max2 } = data.list[2].main;
        console.log(temp_min2,temp_max2);
        document.querySelector("#mintemp2").innerText = "Min Temp: " + temp_min2 + " °F";
        document.querySelector("#maxtemp2").innerText = "Max Temp: " + temp_max2 + " °F";
        /*3rd Day's Forecast*/
        const { temp_min3, temp_max3 } = data.list[3].main;
        console.log(temp_min3,temp_max3);
        document.querySelector("#mintemp3").innerText = "Min Temp: " + temp_min3 + " °F";
        document.querySelector("#maxtemp3").innerText = "Max Temp: " + temp_max3 + " °F";
         /*4th Day's Forecast*/
         const { temp_min4, temp_max4 } = data.list[4].main;
         console.log(temp_min4,temp_max4);
         document.querySelector("#mintemp4").innerText = "Min Temp: " + temp_min4 + " °F";
         document.querySelector("#maxtemp4").innerText = "Max Temp: " + temp_max4 + " °F";
          /*5th Day's Forecast*/
        const { temp_min5, temp_max5 } = data.list[5].main;
        console.log(temp_min5,temp_max5);
        document.querySelector("#mintemp5").innerText = "Min Temp: " + temp_min5 + " °F";
        document.querySelector("#maxtemp5").innerText = "Max Temp: " + temp_max5 + " °F";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

let btnClear = document.querySelector(".clear");
let inputs = document.querySelectorAll('input');

btnClear.addEventListener('click', () => {
    inputs.forEach(input => input.value = '');
});